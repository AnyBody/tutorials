::: {rst-class} break
:::

# Lesson 4: Kinetics - Computing Forces

In this lesson, you will compute forces and investigate the ergonomics of the pedal arrangement.

We will presume that the pedal is loaded by a spring, the force of which the leg
must overcome when stepping on the pedal. In this lesson, we will step
by step define the spring force and look at its effect on the leg.

## Generalized forces

When you say "a support torque applied to a joint", in AnyBody terms, you are saying -
"A generalized force applied to a kinematic measure of the joint angle".

Similarly "a force applied to a segment along Y axis" becomes - "A generalized force
applied to the Y component of a measure of the segment's position".

```{note} 
Since AnyBody speaks the language of generalized forces, we will simply call them "forces" henceforth. Physically speaking,
this generalized force will manifest as a rotational torque or a linear force, depending on the type of measure it is applied to.
```

You must create an `AnyForce` object in order to apply a generalized force to a measure.

## Include pedal spring force

We will therefore create an `AnyForce` object, for applying the spring force.
Since this is not a part of the human body, it is logical to place it in the `Environment.any` file. Here's what
to add:

```{literalinclude} Snippets/lesson4/MyPedal-1/Model/Environment.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

The `AnyForce` object named "Spring" contains a reference to the "HingeJoint". Since HingeJoint
is a rotational measure, the force is actually a torque applied to the hinge.

`F` is the actual generalized force vector, with each vector component corresponding to a
component of the kinematic measure. `F` is proportional to `HingeJoint.Pos`,
which is the hinge angle. Stiffness is initially set to 0.0 (Nm/rad), to investigate the effect of having
no spring. The minus sign in the expression means that the spring will always oppose motions away from the neutral angle.

## Turn off default reaction forces

As mentioned in this {ref}`previous section <driver-reactions>`,
the "Reaction.Type" property for all kinematic drivers that act on muscle-actuated joints must be set to "Off" in `JointsAndDrivers.any`.

```{literalinclude} Snippets/lesson4/MyPedal-1/Model/JointsAndDrivers.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

You should also remove the additional reactions on the pelvis which are
created by the model template. The purpose of these additional reactions
on the pelvis is to provide the necessary supports on the human pelvis
to run the inverse dynamics if users may not define enough support
forces on either both feet or pelvis.

Since your model has a joint named "SeatPelvis" between ground and pelvis (which will apply the default reaction forces),
you can comment out `Model/Reactions.any` in the main file:

```{literalinclude} Snippets/lesson4/MyPedal-1/MyPedal.main.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

## Adding muscles

There is one more thing we have to do: The human model has no muscles at
the moment. This can be corrected by a simple change of BM statements in
the `Model/BodyModelConfiguration.any` file. Since the model specifically focuses on the right leg, we can add the following code to add muscles:

```{literalinclude} Snippets/lesson4/MyPedal-1/Model/BodyModelConfiguration.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

## Investigating results

Now, reload the model and run the `RunApplication` operation from the operations drop-down menu:

```{image} _static/lesson4/image2.png
:alt: InverseDynamics_End
:class: bg-primary
:align: center
```

Plot `Main.Study.Output.Model.BodyModel.SelectedOutput.Right.Leg.Muscles.Envelope` (see {ref}`this for help <chart-view>`).
It expresses the maximum muscle activation level seen across all the muscles
in the right leg at a given instant:

```{image} _static/lesson4/image3.png
:alt: Chart view Muscles.Envelope
:class: bg-primary
:align: center
```

Holding the leg out in the air like that without the support
of a pedal spring and holding up the weight of the pedal as well
requires about 6.5% to 10.5% of the leg’s strength.

Now, let us study the effect of spring stiffness. In `Environment.any`, we change the spring stiffness:

```AnyScriptDoc
F = §-10§*.HingeJoint.Pos;
```

This produces the following envelope curve:

```{image} _static/lesson4/image4.png
:alt: Chart view Muscles.Envelope 2
:class: bg-primary
:align: center
```

Obviously, the level is lower now since the spring supports the leg. The envelope is at around 2%, so the
spring really seems to help. This can make it easier for the operator to
control the pedal and thereby enhance the operability.

The completed model is available here:
{download}`MyPedal.zip <Downloads/MyPedal.zip>`.

The AnyBody Modeling System is all about making this type of
investigation easy. The mechanical model we have put together in four
simple lessons has a complexity worthy of a Ph.D. project if you develop
it bottom up. In AnyBody, this is a matter of a few hours of work when
using the predefined models of the repository.
