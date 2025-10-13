::: {rst-class} break
:::

# Lesson 5: Definition of Muscles and External Forces

:::{note}
Here's an AnyScript file to start on if you have not completed the
previous lesson: {download}`demo.lesson5.any <Downloads/demo.lesson5.any>`.
:::

The model so far has been capable of motion despite lacking muscles.
This is because a kinematic analysis that does not consider forces.

Skeletal muscles produce movement by pulling on our bones. Muscle actions are
coordinated in complicated patterns determined by our central nervous system.

AnyBody helps you predict realistic muscle activation patterns for a given
movement and external load.

## Creating a muscle model

The exact behaviour of muscle tissue is a widely researched (and debated) topic.

AnyBody offers several models of varying sophistication, for modelling muscle
behaviour. A detailed introduction to muscle modeling can be found here
{doc}`its own tutorial <../Muscle_modeling/intro>`.

Here, we will create a very simple muscle model and use it to model our arm
model muscles. We start by creating a folder for the muscles:

```{literalinclude} Snippets/lesson5/snip.NewModel.main-1.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

The next step is to create a muscle model that defines the properties that will
be assumed common for all the muscles.

:::{note}
Since properties such as Max muscle strength, fiber length etc. differ between muscles, realistic AMMR human body models
define unique muscle models for each muscle element.
:::

```{literalinclude} Snippets/lesson5/snip.NewModel.main-2.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

## Creating a muscle

Since muscles can only pull, we need to define at least one
muscle on each side of every revolute joint.

When working with models containing three-dimensional spherical joints, you may need more muscles.
It can be quite difficult to figure out the minimum number of muscles required
to drive a complex body model.

Let's add just one muscle to start with, the elbow-flexor muscle named Brachialis:

```{literalinclude} Snippets/lesson5/snip.NewModel.main-3.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

**This muscle is created by the** `AnyMuscleViaPoint` **class**. These are muscles which begin at
an origin point, pass through a number of pre-defined via points, and finally terminate
at the insertion.

`Org` **and** `Ins` **are the origin and insertion of the Brachialis**. They are reference objects,
pointing to reference nodes named "Brachialis" that have already been created on the "UpperArm" and "ForeArm".

The Brachialis muscle in our model lacks via-points. However if a muscle has via points, we must insert
reference objects to respective via-point nodes in the lines between `Org` and `Ins`, in the correct order.

The physiological behavior of the muscle is defined by the first line:

```{literalinclude} Snippets/lesson5/snip.NewModel.main-4.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

You can see that it points right back to the muscle model we have already created ({ref}`Notice the two leading dots <relative-folder-path>`). Finally, the following line displays the muscle in your model view window:

```{literalinclude} Snippets/lesson5/snip.NewModel.main-4.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 2
:end-before: //# END SNIPPET 2
```

Upon re-loading the model, you should see a thick, red line connecting the muscle's origin and
insertion points. There are other ways to visualize muscles, and these are described here in a {doc}`dedicated muscletutorial <../Muscle_modeling/intro>`.

The muscle path may appear strange because the mechanism hasn't been assembled by a kinematic analysis.

## Adding more muscles

All the other muscles are defined in the same way. Your model should resemble the image seen further below:

```{literalinclude} Snippets/lesson5/snip.NewModel.main-5.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

```{image} _static/lesson5/image1.png
:alt: Upper and lower arm with muscles
:class: bg-primary
:align: center
:width: 50%
```

## The InitialConditions analysis

Your model (in the image above) doesn't appear to be connected properly at the elbow because AnyBody only enforces the
joint constraints during a simulation.

Use the operation drop down menu to run the "InitialConditions" operation. If you don't remember
how this is done, refer to {ref}`this prior tutorial <running-analysis>`.

The assembled model should resemble the following figure.

```{image} _static/lesson5/image2.png
:alt: Upper and lower arm initial conditions
:class: bg-primary
:align: center
:width: 50%
```

(driver-reactions)=

## Switching off driver reactions when muscles do the job (Important!)

Even though you haven't added any external forces to your model, the model still
requires some assistive force to hold up its own weight. Note that you've specified
a gravity vector in the "ArmModelStudy" object.

:::{note}
:class: margin
A kinematic constraint needs to be enforced by an accompanying constraint force.
For example, when you lean on a table, the normal reaction force on your hand
maintains the surface-surface constraint between hand and table. Were it not for
the force you would have fallen, with your hand passing through the table
surface. Similarly motion constraints such as joint angle motions need a driving
force to maintain the specified trajectory.
:::

By default, all drivers in your model apply the necessary constraint forces
(also called driver reactions) for their respective kinematic constraints.

The constraint "force" is actually a **generalized force** i.e. whether it is
actually a force or torque depends on the type of measure that driver
constrains. For example, a driver on a rotational measure, will apply torques,
while one on a linear measure will apply forces. AnyBody reports all of these
simply as "forces", and it is up to you to interpret them.

The drivers for shoulder and elbow motion thus default to applying the
**required constraint reaction torques to sustain the joint motions**. This is
problematic, since we wish the muscles forces to be causing the motion instead.

**👉 Now** The default driver reactions must therefore be switched off by
setting the `Reaction.Type` property, for the muscles to cause the motion and
not the drivers.

```{literalinclude} Snippets/lesson5/snip.NewModel.main-6.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

On the other hand, the driver reactions come in handy in models under
development, while you are still adding muscles or other force elements to
enforce the constraints. The driver reactions will allow you to successfully run
inverse dynamic simulations at the intermediate model stages, by ensuring
dynamic consistency.

The single `Off` is encapsulated in braces, `{Off}`, because it is a vector. A
driver can theoretically have any number of total DOF from all the measures that
it drives. Therefore all data in a driver are vector quantities, even when it is
a 1 DOF driver.

(AnyKinMotion)=
### An Alternative Driver - AnyKinMotion

As an alternative to the `AnyKinDriver` class and setting the
`Reaction.Type={Off}`, you can also use the `AnyKinMotion` class. This other
driver is basically identical to the general `AnyKinDriver`, except that all
constraint reaction forces are by default switched off. This implies that this driver only
specifies motion but not a mechanical actuator that produces the motion. In
contrast, AnyKinDriver has reaction forces switched on by default, implying
that the object is an “infinitely strong” mechanical actuator that will produce
the motion no matter the external loads.

In the following studies, try using both drivers, to see that they generate the
same result. Make the following changes to use the `AnyKinMotion` driver (note,
the line defining the `Reaction.Type` is not needed):

```{literalinclude} Snippets/lesson5/snip.NewModel.main-7.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

Another important option for both of the drivers, is that you can define a
**driver function** - meaning the function for the movement of the driver. This is
done by defining a time-dependent function for the `AnyParamFun` option.
`AnyParamFun` is the base class for parameter functions that are functions of a
single scalar (floating point) quantity. 

AnyBody contains a number of predefined function types that you can find in the
Classes Tree or in the Reference Manual, for instance `AnyFunPolynomial`. As the
name indicates, this is polynomial driver function:

```AnyScriptDoc
AnyKinMotion ShoulderMotion = {
    AnyRevoluteJoint &Jnt = ..Jnts.Shoulder;
    DriverPos0 = {-100*pi/180};
    DriverVel0 = {30*pi/180};
    §AnyFunPolynomial DriverFun = {
        PolyCoef = {{0, 1, -0.9}};
    };§
};
```

In the matrix `PolyCoef`, each row contains the coefficients for a time
function driving one degree of freedom. The revolute joint we are
driving only has one degree of freedom, so the matrix only has one row,
but it still has to be defined as a matrix rather than a vector, i.e.
with double braces at each end. The polynomial coefficients then come in
increasing order and define the following driver function:

$$
\textrm{Joint angle} = 0 + 1t - 0.9t^2 \textrm{[rad]}
$$

To get higher polynomial orders, simply add more terms to the vector. A common
use is to drive motion either in a very standardized way, for instance with
constant velocity or constant acceleration, or to drive a motion by data to
which a polynomial has been fitted.

:::{note}
In the following, **we will NOT use any driver function**, but simply the default
option. So, do not insert the above defined `AnyFunPolynomial DriverFun`. 
Furthermore, it is optional to use either the `AnyKinMotion` or the `AnyKinDriver` class.
:::

## The InverseDynamicAnalysis and plotting muscle forces

Run the the **InverseDynamicAnalysis** operation from the operations drop-down menu.
In this analysis, the AnyBody system computes all muscle, joint forces and much more.

Review the instructions from {ref}`this prior tutorial <chart-view>` on plotting simulation results.

To plot the muscle forces in the brachialis muscle, open
`Main.Study.Output.Model.Muscles.Brachialis` in the chart view's model tree, and
plot the variable named `Fm`. You should get a curve that looks like the one
below.

```{image} _static/lesson5/image3.png
:alt: Brachialis muscle force
:class: bg-primary
:align: center
:width: 75%
```

The drop in muscle force with movement progression is due to the decreasing
moment arm of the gravity vector about the elbow joint, as the elbow flexes.
Therefore lesser the muscle force.

If you look at the muscle force in the BicepsLong, you see a different pattern:

```{image} _static/lesson5/image4.png
:alt: Biceps long muscle force
:class: bg-primary
:align: center
:width: 75%
```

This muscle's force increases during the movement because this muscle supports
both, the shoulder and the elbow. In addition, it collaborates both with
DeltoidusA on shoulder flexion, and with the other elbow flexors, and all these
muscles have to adjust their work in relation to each other.

## Creating external loads

You may want to investigate the model's behavior in different loading
situations, such as when the hand is carrying a dumbbell. Let us imagine that
the model is performing a dumbbell curl.

We start by creating a node on the forearm at the location of the palm. Add this
within the curly braces of the "ForeArm" object:

```{literalinclude} Snippets/lesson5/snip.NewModel.main-6.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 2
:end-before: //# END SNIPPET 2
```

The next step is to add an external force. We make a new sub-folder for this
purpose, within ArmModel:

```{literalinclude} Snippets/lesson5/snip.NewModel.main-6.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 3
:end-before: //# END SNIPPET 3
```

Now you can reload the model and re-run inverse dynamics to analyze how the
model reacts to a downward force of 100 N (approximately 10 kg dumbbell weight).
The BicepsLong force again, you should see this:

```{image} _static/lesson5/image5.png
:alt: Biceps long with added force
:class: bg-primary
:align: center
:width: 75%
```

:::{note}
:class: margin
Applied forces do not have to be constant. They can change with time and other
properties in the model.  Please refer to the 
{doc}`tutorial on forces<../The_mechanical_elements/intro>` for more details.
:::

The muscle force is obviously much larger than before, and the
development is also different. It now reaches a maximum during the
movement and drops off again.

**The model you've built here was anatomically simplified, and it can be a
difficult job to define a realistic body model from scratch. We recommend that users
start out with the body models available in the** 
[AnyBody Managed Model Repository](https://www.anybodytech.com/software/ammr/).

Now, let's continue to {doc}`Lesson 6: Adding real bone geometrics <lesson6>`.