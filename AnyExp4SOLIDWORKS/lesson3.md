::: {rst-class} break
:::

# Creating Human-Machine Integrated Analysis Model

In this lesson, we will create a model with a human body using a template. We
will then add the fitness machine created in the previous lesson and connect the
human body to the fitness machine.

If you did not finish the previous lesson, please download the
{download}`FitnessMachine_Mate_Config3.zip <Downloads/FitnessMachine_Mate_Config3.zip>` 
file in order to get the correct set of files for starting this lesson.

## Create a Human Model from a Main File Template

First, let us start a new human model from the template 'HumanStanding' which
we will call "FitnessMachine_With_Human" and place in the same folder as our 
Fitness Machine model. Do this by clicking on 'New from Template' under 'File' 
in the top menu. 

```{image} _static/lesson3/lesson3_image1.png
:alt: Human template dialog
:align: center
:width: 60%
```

After we create the model, we should make sure that the definitions in the
`libdef.any` files are set to use the right body model as explained in the
tutorial {doc}`Getting Started <../A_Getting_started/lesson1>`. When we load 
this model, we can see that we have a standing full human body model.

```{image} _static/lesson3/lesson3_image2.png
:alt: Model view Full body
:align: center
```

To keep things simple, start by switching off the muscles by setting the
BM statements for the muscle definitions of arms, legs and trunk to
`_MUSCLES_NONE_`. Add the following in `Model/BodyModelConfiguration.any`:

```AnyScriptDoc
...

#define BM_MANNEQUIN_DRIVER_DEFAULT ON

// Enable the TLEM2 lower extremity model
#define BM_LEG_MODEL _LEG_MODEL_TLEM2_

// Switch off all muscles of the body model
§#define BM_LEG_MUSCLES_BOTH _MUSCLES_NONE_
#define BM_TRUNK_MUSCLES _MUSCLES_NONE_
#define BM_ARM_MUSCLES_BOTH _MUSCLES_NONE_§

```

Next, we will equip the model with a center of mass (CoM) of the human model.
For this we must add an extra virtual segment that follows the CoM. We will make
the virtual segment massless, since it is not a real segment. We use the CoM
measure (AnyKinCoM) to drive this dummy segment. The code for doing this is
prepared in {download}`CoM\_View.any <Downloads/CoM_View.any>`. This kind of CoM
segment can be used not only for visualization, but also for kinematic
constraints of the human model.

Furthermore, we will extend the human model with reference frames
attached to the human segments for interfacing with the machine. This
will of course be done at the hands and feet, but also at the pelvis,
which we may want to control. We add nodes (AnyRefNode) at the palms of
the hands, the toes of the feet, and at the center of the pelvis. Please
see {download}`HumanRefNodes.any <Downloads/HumanRefNodes.any>`.

Please save these files in the Model subfolder and let us include them in the 
`AnyFolder Model` by editing the main file.

```AnyScriptDoc
// Compose the model used by the study
AnyFolder Model = 
{  
  AnyVector CenterOfMassXZ = {0,0};
  
  // Definition for CoM(Center of Mass) of Human Model
  §#include "Model\CoM_View.any"§

  // Definition of additional AnyRefNode object in the human model
  §#include "Model\HumanRefNodes.any"§

  ...

```

If you reload the model, you will see the dummy CoM segment and
some AnyRefNode objects like this:

```{image} _static/lesson3/lesson3_image3.png
:alt: Model view Rear Fullbody without muscles
:align: center
```

## Insert the Fitness Machine into the Model

We are now ready to include the fitness machine. The first step is to
copy the fitness machine we created in the previous lesson to the Input
subfolder of our model. Next, we will add the fitness machine to the
model by including the `FitnessMachine.any` file to the `AnyFolder Model`. 
You should put all the files (including the FitnessMachine.any file) from the
previous lesson into the Input subfolder of your model which is created by 
the template. 

```AnyScriptDoc
// Compose the model used by the study
  AnyFolder Model = 
  {  
     AnyVector CenterOfMassXZ = {0,0};
     
     // Definition for CoM(Center of Mass) of Human Model
     #include "Model\CoM_View.any"
 
     // Definition of additional AnyRefNode object in the human model
     #include "Model\HumanRefNodes.any"
     
     // AnyScript file for the fitness machine from SolidWorks
     §#include "Input\FitnessMachine.any"§

```

In addition, we will modify the predefined `AnyBodyStudy` object
like we did in Lesson 2 to prepare for an actual dynamic analysis.

```AnyScriptDoc
AnyBodyStudy Study =
{
  // Include the Model within the Study
  AnyFolder &Model = .Model;  
  
  Gravity={0.0, -9.81, 0.0};
  §tStart = 0;
  tEnd = 1; §
  nStep = §61§;
  
  // Overdeterminate solver is needed while using the 
  // soft default mannequin drivers.
  Kinematics.SolverType = KinSolOverDeterminate;
  InitialConditions.SolverType = Kinematics.SolverType ;
};

```

:::{note}
At first, when you load the AnyBody model with the fitness machine included, it
may appear invisible due to the reflection of light in the model view. To make
it visible, simply rotate the model a bit.
::: 

Similar to the previous lesson, we will add a driver for the fitness machine to
make the model kinematically determinate. To do this, we can use the
{download}`MachineOperation.any <Downloads/MachineOperation.any>` file which
defines drivers similar to what we created in Lesson 2.

```AnyScriptDoc
AnyFolder MachineOperation =
{
    AnyVar T_period = 1.0;
    AnyVar angular_vel = 360.0 / T_period;
    AnyVar phase_offset = 0;

    AnyKinEqSimpleDriver Rotation_Drv =
    {
        AnyRevoluteJoint& jnt = Main.Model.FitnessMachine.Mates.Hinge_MainCylinder;
        DriverPos = {.phase_offset};
        DriverVel = pi/180*{-.angular_vel};
        Reaction.Type = {Off};
    };

    AnyForce ResistanceTorque =
    {
        AnyVar coeff_term = 85;
        AnyVar const_term = coeff_term;
        AnyRevoluteJoint& jnt = Main.Model.FitnessMachine.Mates.Hinge_MainCylinder;
        F = {coeff_term * sin(jnt.Pos[0]*2+pi/2) + const_term};
    };
};

```

Save this file in the Model subfolder and include it
in `AnyFolder Model`.

```AnyScriptDoc
AnyFolder Model = 
  {  
    AnyVector CenterOfMassXZ = {0,0};
    
    // Definition for CoM(Center of Mass) of Human Model
    #include "Model\CoM_View.any"
    
    ...

    AnyFolder ModelEnvironmentConnection = 
    {
      // This file contains all contraints to simulate the standing human
      #include "Model/JointsAndDrivers.any"
      
      // Ground reaction force prediction
      #include "Model/GRFPrediction.any"
      
      // Include drivers of the fitness machine
      §#include "Model\MachineOperation.any"§
    };
  };

```

Notice that the drivers have been placed in a separate folder called 
`ModelEnvironmentConnection`. This is a typical setup used in most
models.

When we now load the model, we will see that our human is positioned forward of the
machine. We need to change its position so it is relative to the fitness machine. 
We do this by changing the mannequin of the model. Since we do not want to
spend too much time positioning the human model in this tutorial, we
will use the file {download}`Mannequin.any <Downloads/Mannequin.any>`. Save 
the file in the Model subfolder to overwrite the existing 'Mannequin.any' file.

When we now load the model, we will see that our human is located on the fitness
machine, and if we run the 'Kinematics' operation the machine is moving but the
human does not follow the movement. Now, the only thing missing is to connect our body model
to the machine.

## Connecting Human Model and Fitness Machine

The first step to connect our human with the machine is
to undefine the default drivers of the human model. We do this by
changing a BM statement in the folder `Model/BodyModelConfiguration.any`:

```AnyScriptDoc
#path __BM_PLUGIN_FILE__ "BodyModelConfiguration.any"
#define BM_CONFIG_PLUGIN __BM_PLUGIN_FILE__

#define BM_MANNEQUIN_DRIVER_DEFAULT §OFF§

// Enable the TLEM2 lower extremity model
#define BM_LEG_MODEL _LEG_MODEL_TLEM2_

// Switch off all muscles of the body model
#define BM_LEG_MUSCLES_BOTH _MUSCLES_NONE_
#define BM_TRUNK_MUSCLES _MUSCLES_NONE_
#define BM_ARM_MUSCLES_BOTH _MUSCLES_NONE_

```

For the model to be able to load now, we have to exclude some definitions.
Go to the file `Model/JointsAndDrivers.any` and comment out the following 
lines:

```AnyScriptDoc
#ifndef EXCLUDE_COM_BALANCE_DRIVERS
  
  ...
   
  Main.Model.DefaultMannequinDrivers.DefaultWeakDriverWeight = 0.01;
  §//Main.Model.DefaultMannequinDrivers.AnkleDriverLeftFlexion.WeakDriverWeight = 0.001;
  //Main.Model.DefaultMannequinDrivers.AnkleDriverRightFlexion.WeakDriverWeight = 0.001;§
#endif

```

```AnyScriptDoc
#ifndef EXCLUDE_FOOT_CONSTRAINTS
  
  §// Main.Model.DefaultMannequinDrivers.PelvisGroundDriverPosX.WeakDriverWeight = 0;
  // Main.Model.DefaultMannequinDrivers.PelvisGroundDriverPosY.WeakDriverWeight = 0;
  // Main.Model.DefaultMannequinDrivers.PelvisGroundDriverPosZ.WeakDriverWeight = 0;
  // Main.Model.DefaultMannequinDrivers.PelvisGroundDriverRotX.WeakDriverWeight = 0;
  // Main.Model.DefaultMannequinDrivers.PelvisGroundDriverRotY.WeakDriverWeight = 0;
  // Main.Model.DefaultMannequinDrivers.PelvisGroundDriverRotZ.WeakDriverWeight = 0;§

  ...

```

These lines define some default mannequin driver values, but since we have
undefined the default drivers of the model, these values do not exist anymore.

When you load the model now, you will see the following warning message:

```none
Model Warning: Study 'Main.Study' contains too few kinematic constraints to be kinematically determinate.
```

If you look at the Object Description of your AnyBodyStudy object by double-clicking
on 'Study' in the model tree, you can find the information about the number of DOF's 
and constraints of the model.

```none
Total number of rigid-body d.o.f.: 414
Total number of constraints:
Joints: 246
Drivers: 100
Other: 38
Total: 384
```

This means that we are missing 30 constraints. These were the degrees
of freedom released when we removed the default drivers.
This implies that the AnyBody human model contains 30
degrees of freedom. So we have to define 30 other constraints for the human
model.

The AnyExp4SOLIDWORKS translator searches for user-defined reference
entities with a certain prefix. You select the prefix in the options
dialog for the translator. We will use some of these reference systems
for interfacing. In this model you can find this information in the
`FitnessMachine.any` file or simply in the Model Tree of the loaded
model. Uncomment the following lines in the `FitnessMachine.any` file:

```AnyScriptDoc
AnyFolder FitnessMachine =
  {
    AnyKinEqType _ANY_CTYPE_ = Hard;

    AnyFolder _ANY_INTERFACE_ =
    {
      ////LIST OF USER-DEFINED REFERENCE COORDINATE SYSTEMS
      §AnyRefFrame& Pedal___1____ANY_TOE1 = .Pedal___1.ANY_TOE1;
      AnyRefFrame& Pedal___1____ANY_CENTER = .Pedal___1.ANY_CENTER;
      AnyRefFrame& Pedal___1____ANY_TOE2 = .Pedal___1.ANY_TOE2;
      AnyRefFrame& ANY_LEFT_HAND1 = .Handle___1.ANY_LEFT_HAND1;
      AnyRefFrame& ANY_LEFT_HAND2 = .Handle___1.ANY_LEFT_HAND2;
      AnyRefFrame& ANY_PELVIS = .MainBase___1.ANY_PELVIS;
      AnyRefFrame& ANY_RIGHT_HAND1 = .Handle___2.ANY_RIGHT_HAND1;
      AnyRefFrame& ANY_RIGHT_HAND2 = .Handle___2.ANY_RIGHT_HAND2;
      AnyRefFrame& Pedal___2____ANY_TOE1 = .Pedal___2.ANY_TOE1;
      AnyRefFrame& Pedal___2____ANY_CENTER = .Pedal___2.ANY_CENTER;
      AnyRefFrame& Pedal___2____ANY_TOE2 = .Pedal___2.ANY_TOE2;§
      ////LIST OF USER-DEFINED REFERENCE COORDINATE SYSTEMS
    };

```

Now we will create the missing 30 constraints to govern the motion.

We will prepare this as a separate AnyScript file, which we will name
"JointsAndDrivers.any". You can download this file here
{download}`JointsAndDrivers.any <Downloads/JointsAndDrivers.any>` and save it into
the Model subfolder to overwrite the existing file. Starting from 
the bottom of the human (which is the top of the file) the constraints applied are as 
follows:

- Feet are fixed to the pedals, though with a unilateral force normal to the
  pedal, since the feet are not “glued” to the pedal.
- Hip abduction is fixed at its initial condition value.
- Pelvis is constrained to the fitness machine with a cylindrical joint along
  the vertical axis.
- Pelvis thorax angles are driven to their initial condition values.
- Neck rotation angles are driven to their initial condition values.
- The sterno-clavicular joint angles are fixed at their initial condition values
  (however, if the shoulder rhythm is used, this driver is excluded).
- Glenohumeral abduction is fixed at its initial condition value.
- Hands are fixed to the handles.

In this JointAndDrivers.any file, you will see that only the connections
at the hands and feet have reaction types set to ‘On’. The other
constraints are just for kinematics, i.e. the voluntary motion, which is
not associated with any reaction forces; this motion is kinetically
produced by the muscles of the human.

Finally, we should remove the supporting reaction forces and moments at
the hip segments because this model now has enough supporting forces
and moments at the hands and feet. You can simply just comment out the
`GRFPrediction.any` file in `FitnessMachine_With_Human.main.any`.

```AnyScriptDoc
...
AnyFolder ModelEnvironmentConnection = 
{
  // This file contains all contraints to simulate the standing human
  #include "Model/JointsAndDrivers.any"
  
  // Ground reaction force prediction
  §// #include "Model/GRFPrediction.any"§
  
  // Include drivers of the fitness machine
  #include "Model\MachineOperation.any"
};
...

```

Now you can load the model, and if you run the 'InitialConditions' or
the 'Kinematics' operation of the AnyBodyStudy object, you will see that
all drivers and constraints are ready for analysis and that the motion
appears reasonable.

```{image} _static/lesson3/lesson3_image4.png
:alt: Model view Full Body on Fitnessmachine
:align: center
```

The final task is to switch on the muscles of the human body again by
commenting out the BM statements that we introduced in the
beginning of this lesson under `Model/BodyModelConfiguration.any`.

```AnyScriptDoc
#path __BM_PLUGIN_FILE__ "BodyModelConfiguration.any"
#define BM_CONFIG_PLUGIN __BM_PLUGIN_FILE__

#define BM_MANNEQUIN_DRIVER_DEFAULT OFF

// Enable the TLEM2 lower extremity model
#define BM_LEG_MODEL _LEG_MODEL_TLEM2_

// Switch off all muscles of the body model
§// #define BM_LEG_MUSCLES_BOTH _MUSCLES_NONE_
// #define BM_TRUNK_MUSCLES _MUSCLES_NONE_
// #define BM_ARM_MUSCLES_BOTH _MUSCLES_NONE_§

```

Now you are ready to run the 'InverseDynamics' operation, which should
now run successfully.

```{image} _static/lesson3/lesson3_image5.png
:alt: Model view Full Body on Fitnessmachine with muscles
:align: center
```

A zip file with the final version of this model can be downloaded here:
{download}`FitnessMachine_With_Human.zip <Downloads/FitnessMachine_With_Human.zip>`.
