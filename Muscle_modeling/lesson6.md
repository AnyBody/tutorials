::: {rst-class} break
:::

# Lesson 6: Generalizing muscles as recruited actuators

Physiological muscles are incredible machines. Despite numerous attempts, it has
been challenging to create technical actuators that are as lightweight and
efficient as natural muscles. Additionally, mathematical modeling of muscles is
a complex task. However, once the modeling is complete, we can leverage certain
muscle properties to our advantage. We aim to develop "muscles" with a more
versatile formulation compared to physiological muscles, which are limited to
acting along strings.


:::{seealso}
:class: margin
There is an  {doc}`an entire tutorial lesson <../The_mechanical_elements/lesson4>` devoted to the subject *Kinematic Measures* in the
section on {doc}`The Mechanical Elements <../The_mechanical_elements/intro>`. 
:::
The solution to our problem involves two classes: `AnyRecruitedActuator` and `AnyMuscleGeneric`. These classes can act on *Kinematic Measures*, which are an abstract 
classes representing anything you can measure on a model..

For example:

* A recruited actuator that works on a distance measure between two points acts
  as a linear force provider or a reaction provider, meaning that the force is
  not predetermined but will adjust to achieve equilibrium.
* A recruited actuator that works on an angular measure, such as a joint angle,
  acts as a torque provider.
* A recruited actuator that works on a Center of Mass measure acts as an
  abstract force that affects all segments of the body contributing to the
  center of mass.

Both classes are similar, but `AnyRecruitedActuator` is used for
non-physiological elements like boundary conditions, contact forces, and
residual forces. On the other hand, `AnyMuscleGeneric` is used for forces and
moments that still represent the effect of real muscles, such as joint torques.
The activity of `AnyMuscleGeneric` is included in the 'MaxMuscleActivity' output
variable of the model.

In this lesson, we will demonstrate how recruited actuators (and generic muscles) can be used for various modeling tasks.

## Recruited joint torque providers

One of the goals of the AnyBody Modeling System is to create detailed models of
the musculoskeletal system. However, there are cases where traditional inverse
dynamics analysis is useful. In this type of analysis, the muscles are not
considered and the body is balanced solely by joint torques. This approach can
provide valuable insights into the function of limbs and joints, and it is
computationally efficient.

:::{note}
Since we imagine the joint torques is the sum of our real muscle contributions we 
will use the class `AnyMuscleGeneric` instead of `AnyRecruitedActuator`.
:::


You can perform joint torque inverse dynamics by using a generic muscle
(`AnyMuscleGeneric`). This replaces the body's natural muscles at the joints.
The "muscle forces" that the generic muscles calculate will be the same as the
joint torques.

The previous examples aren't ideal for exploring joint torques. So, you should
[download a new example](Downloads/MuscleDemo.6.any) to start with. This example
is a simplified version of the simple arm example from the "Getting Started with
AnyScript" tutorial, but with the muscles removed. The model consists of two
segments - an upper arm and a forearm. It's attached to the global reference
frame at the shoulder and has a 100 N vertical load acting downwards at the
hand.

```{image} _static/lesson6/image1.jpeg
:alt: Arm 2D
:align: center
```

Currently, the model can't perform an inverse dynamics analysis because it lacks
muscles. If you try to run the InverseDynamics operation, you'll see an error
message:

```
NOTICE(OBJ1): MuscleDemo.6.any(103): ArmStudy.InverseDynamics: No muscles in the model.
ERROR(OBJ1): MuscleDemo.6.any(103): ArmStudy.InverseDynamics: No solution found: There are fewer unknown forces (muscles and reactions) than dynamic equations.
```

This error message means that the model can't be balanced without muscles. But
we won't add real muscles. Instead, we'll add generic muscles to the revolute
joints. The easiest way to add a generic muscle is from the class tree. Just
place your cursor after the Drivers folder, find the AnyGeneralMuscle in the
class tree, and insert a template.

```AnyScriptDoc
  AnyFolder Drivers = {

   //---------------------------------
   AnyKinEqSimpleDriver ShoulderMotion = {
     AnyRevoluteJoint &Jnt = ..Jnts.Shoulder;
     DriverPos = {-1.7};
     DriverVel = {0.4};
     Reaction.Type = {0};
   }; // Shoulder driver

   //---------------------------------
   AnyKinEqSimpleDriver ElbowMotion = {
     AnyRevoluteJoint &Jnt = ..Jnts.Elbow;
     DriverPos = {1.5};
     DriverVel = {0.7};
     Reaction.Type = {0};
   }; // Elbow driver
 }; // Driver folder

§AnyMuscleGeneric <ObjectName> = 
    {
      //viewForce.Visible = Off;
      //MetabModel = Global.Null;
      //FatigueModel = Global.Null;
      //MuscleModel = Global.Null;
      //Type = NonPositive;
      AnyMuscleModel &<Insert name0> = <Insert object reference (or full object definition)>;
      AnyKinMeasure &<Insert name0> = <Insert object reference (or full object definition)>;
    };§
```

Just as normal muscles, generic muscles must be associated with a muscle
model. Let us insert a simple one:

```AnyScriptDoc
§AnyMuscleModel <ObjectName> = {
   F0 = 0;
   //Lf0 = 0;
   //Vol0 = 0;
 };§

AnyMuscleGeneric <ObjectName> = 
{
  //viewForce.Visible = Off;
  //MetabModel = Global.Null;
  //FatigueModel = Global.Null;
  //MuscleModel = Global.Null;
  //Type = NonPositive;
  AnyMuscleModel &<Insert name0> = <Insert object reference (or full object definition)>;
  AnyKinMeasure &<Insert name0> = <Insert object reference (or full object definition)>;
};

```

The empty fields in the muscle model must be filled in:

```AnyScriptDoc
AnyMuscleModel §MusModel§ = {
  §F0 = 100.0;§
};
```

Note that the simple muscle model class has the optional memebers (parameters) of `Lf0` and 
`Vol0` that are usually left out for use with `AnyMuscleGeneric`.

We shall associate the muscle with the shoulder joint:

```AnyScriptDoc
AnyMuscleModel MusModel = {
  F0 = 100.0;
};

AnyMuscleGeneric §ShoulderTorque§ = 
{
  //viewForce.Visible = Off;
  //Type = NonPositive;
  AnyMuscleModel §&Model = .MusModel§;
  AnyKinMeasure §&Angle = .Jnts.Shoulder§;
};

```

Providing a torque for the shoulder is not enough. We also need a torque
in the elbow:

```AnyScriptDoc
AnyMuscleGeneric ShoulderTorque = 
{
  //viewForce.Visible = Off;
  //Type = NonPositive;
  AnyMuscleModel &Model = .MusModel;
  AnyKinMeasure &Angle = .Jnts.Shoulder;
};

§AnyMuscleGeneric ElbowTorque = 
{
  //viewForce.Visible = Off;
  //Type = NonPositive;
  AnyMuscleModel &Model = .MusModel;
  AnyKinMeasure &Angle = .Jnts.Elbow;
};§
```

Having provided torques for the shoulder and elbow we can try to run the 
inverse dynamic analysis again. 

If you try to run the program now, you'll encounter a new error message:

```
ERROR(OBJ.MCH.MUS4) :   MuscleDemo.6.any(122)  :   ArmStudy.InverseDynamics  :  Muscle recruitment solver :  infeasible problem with upper bounds
```


This error occurs because generic muscles, like normal muscles, can only act in
one direction. The Type variable controls this direction. If the muscle acts in
the positive direction of the joint angle, set Type = NonNegative. If it acts in
the negative direction, set Type = NonPositive.

:::{note} The terms NonNegative and NonPositive can be confusing. They will be
changed in future software versions. The current terms were chosen to show that
the force/moment can also be zero, meaning it can be zero or positive/negative.
:::

In this case, the external load tends to move in the negative angle direction
for both the shoulder and elbow. So, the muscles should counteract in the
positive direction.


```AnyScriptDoc
AnyMuscleGeneric ShoulderTorque = 
{
  //viewForce.Visible = Off;
  §Type = NonNegative;§
  AnyMuscleModel &Model = .MusModel;
  AnyKinMeasure &Angle = .Jnts.Shoulder;
};

AnyMuscleGeneric ElbowTorque = 
{
  //viewForce.Visible = Off;
  §Type = NonNegative;§
  AnyMuscleModel &Model = .MusModel;
  AnyKinMeasure &Angle = .Jnts.Elbow;
};

```

Now, you can run the InverseDynamics operation. After running it, open a new
Chart View. Look up the two joint torques as the Fm property of the general
muscles. You can plot both of them at the same time using an asterisk (`*`), as
shown below:

```{image} _static/lesson6/image2.png
:alt: Chart view, Torques
:align: center
```

In this example, we used the same strength (muscle model) for both joints. But
in reality, maximum joint torque varies a lot. For example, knee extension
strength is much larger than elbow extension strength. If you're modeling this,
you can define joint torque muscles with strengths similar to the available
joint torque. This way, the system can estimate how much of each joint's
strength is used in a given situation. You can also define different strengths
for extension and flexion muscles in a joint. This can account for the
difference in strength in the knee in these two directions.


:::{admonition} **Important Remark:**
:class: tip  
Another benefit of using generic muscles as joint torque providers is that you
can handle closed loops and other statically indeterminate situations.
Traditional inverse dynamics can't treat these because the equilibrium equations
don't have a unique solution. The muscle recruitment algorithm will distribute
the load between joints based on their individual strengths. So, it's important
to have reasonable estimates of joint strengths for this type of situation 
::: 

## Contact and other boundary conditions

Muscles can only exert force in one direction, which is a characteristic shared
by many mechanical phenomena, especially contact phenomena. Here are some
examples of contact problems in biomechanics:


- The contact between a foot and the floor
- The contact between the upper thighs and a chair seat
- The contact between two surfaces in a joint

Muscle forces and contact forces both have limits. Muscle forces are limited by
muscle strength. Contact forces may seem unlimited, but they can be limited by
friction and pressure on the tissues. For example, if you have a stone in your
shoe, you'll likely put less weight on that foot.

Muscles create equilibrium and are constrained by available contact forces.
These forces often have different limits in different directions. For example,
there's a high limit in compression against a supporting surface, a smaller
limit for friction, and no reaction in tension. This is similar to how muscles
work, and these conditions affect the entire system's mechanics.

```{image} _static/lesson6/image3.png
:alt: Simple arm wall
:align: center
```

We'll make some changes to the simple arm model to explore contact in more
detail. Let's imagine that the model's hand has a vertical wall for support. We
need to change the kinematics so the arm slides along the wall. It's hard to
figure out the joint angle variations needed for vertical hand movement, so
we'll drive the hand directly instead.

```AnyScriptDoc
 AnyFolder Jnts = {

   //---------------------------------
   AnyRevoluteJoint Shoulder = {
     Axis = z;
     AnyRefNode &GroundNode = ..GlobalRef.Shoulder;
     AnyRefNode &UpperArmNode = ..Segs.UpperArm.ShoulderNode;
   }; // Shoulder joint

   AnyRevoluteJoint Elbow = {
     Axis = z;
     AnyRefNode &UpperArmNode = ..Segs.UpperArm.ElbowNode;
     AnyRefNode &LowerArmNode = ..Segs.LowerArm.ElbowNode;
   }; // Elbow joint

 }; // Jnts folder

§AnyKinLinear HandPos = {
   AnyRefFrame &ref1 = .GlobalRef.Shoulder;
   AnyRefFrame &ref2 = .Segs.LowerArm.PalmNode;
 };§

 

 AnyFolder Drivers = {
  §AnyKinEqSimpleDriver HandDriver = {
     AnyKinLinear &Measure = ..HandPos;
     MeasureOrganizer = {0,1};
     DriverPos = {0.45, -0.6};
     DriverVel = {0, 0.5};
     Reaction.Type = {Off, Off};
   };§

 § /*§
   //---------------------------------
   AnyKinEqSimpleDriver ShoulderMotion = {
      AnyRevoluteJoint &Jnt = ..Jnts.Shoulder;
      DriverPos = {-1.7};
      DriverVel = {0.4};
      Reaction.Type = {Off};
   }; // Shoulder driver

   //---------------------------------
   AnyKinEqSimpleDriver ElbowMotion = {
      AnyRevoluteJoint &Jnt = ..Jnts.Elbow;
      DriverPos = {1.5};
      DriverVel = {0.7};
      Reaction.Type = {Off};
   }; // Elbow driver

 §*/§

 }; // Driver folder
```

The previous two joint angle drivers have been disabled to avoid making the
system kinematically over-determined. The new driver now controls the two
degrees of freedom that were previously managed by the disabled drivers.

The line `Reaction.Type = {Off, Off};` indicates that the wall currently doesn't
provide any reaction forces to the arm.

When you plot the `MaxMuscleActivity`, you'll see that the muscle activity
remains fairly constant. This is because the moment arms are also constant. The
gravity and the applied load of 100 N are both vertical. You might think that a
horizontal support wouldn't make much of a difference. But let's test this by
turning on the horizontal support of the driver.

```{image} _static/lesson6/image4.gif
:alt: no reaction MaxMuscleActivity plot
:align: center
```

The muscle activity stays fairly constant. This is because the moment arms are
also constant. Both the gravity and the applied load of 100 N are vertical. You
might think that a horizontal support wouldn't make much of a difference. But
let's test this by turning on the horizontal support of the driver:

```AnyScriptDoc
Reaction.Type = {§On§, Off};
```

This shows that mechanics can be more complex than expected. Even this simple
mechanical system behaves differently from what we might anticipate:

```{image} _static/lesson6/image5.gif
:alt: Full reaction MaxMuscleActivity plot
:align: center
```

You'll see that the muscle activity is much lower at the start of the movement
when the reaction is on, and it's similar towards the end of the movement. It
seems like the muscles can use the horizontal reaction force to their advantage,
depending on the posture of the mechanism.

However, real walls don't work like that; they can only provide reaction
pressure, not tension. We can simulate this with a Recruited Actuator. First,
let's switch the reaction off again:

```AnyScriptDoc
Reaction.Type = {§Off§, Off};
```

Subsequently we define a `AnyRecruitedActutor` object:

```AnyScriptDoc
      
 }; // Driver folder
  
 §AnyRecruitedActuator WallReaction = {
   Type = NonPositive;
   Volume = 1e-6; // Ignore this value. Only used in special volume weighted recruitement
   Strength = 10000;
   AnyKinMeasureOrg Org = {
     AnyKinMeasure &wall = ..HandPos;
     MeasureOrganizer = {0};
   };
 };§
```

Two things to note here:

1. The recruited actuator is much stronger than the joint muscles. This is
   because we assume the wall is very strong.
2. The ForceDirection (`Type`) property is `NonPositive`. This means the force works
   in the opposite direction of the Kinematic measure, i.e., in the negative
   global x direction, just like a contact force with the wall would.

When you run the `InverseDynamics` operation again and plot the two joint
torques, you'll see the following graph. You can plot them simultaneously with
the specification line `Main.ArmStudy.Output.Model.*Torque.Fm`:

```{image} _static/lesson6/image6.gif
:alt: Joint torques plot
:align: center
```

The red curve represents the shoulder joint torque, and the green curve
represents the elbow torque. Notice that the envelope of these two curves is
identical to the MaxMuscleActivity curve we plotted earlier for the case of no
support.

You might think that the support would be beneficial in the final stages of the
movement where the arm could rest against the wall. It is beneficial for the
elbow, but the reaction force also increases the torque about the shoulder.
Since the shoulder (red curve) has the higher load of the two, this limits the
benefit of the support.

Let's see what happens if we turn the reaction force the other way, like if the
hand could pull against the far side of the wall:

```AnyScriptDoc
AnyRecruitedActuator WallReaction = {
   Type = §NonNegative§;
   Volume = 1e-6; // Ignore this value. Only used in special volume weighted recruitement
   Strength = 10000;
   AnyKinMeasureOrg Org = {
     AnyKinMeasure &wall = ..HandPos;
     MeasureOrganizer = {0};
   };
 };
```

When you run the model again and look at the same graphs, you'll see this:

```{image} _static/lesson6/image7.gif
:alt: Joint torques plot 2
:align: center
```

The wall is helpful in the initial stages of the movement. The torque generated
by the reaction force benefits both joints. In the later stages, the wall
slightly reduces the muscle forces, but it increases the elbow torque. This
happens because the elbow can exert more force than needed to carry the load,
creating additional pressure against the wall. This, in turn, reduces the
shoulder torque.

This example shows how complex body mechanics can be. Even this very simplified
case would have different outcomes if the model's parameters were different. For
example, if the shoulder were much stronger than the elbow, the elbow wouldn't
be able to help the shoulder in the latter case because the elbow would have a
higher load compared to its strength. Conversely, the shoulder could help the
elbow in the former case by generating an additional force pushing against the
wall.


This concludes the part of this tutorial dealing with muscles. But we're not
done yet.  The {doc}`next lesson <lesson7>` deals with the important topic of
ligament modeling.

