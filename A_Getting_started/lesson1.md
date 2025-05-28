::: {rst-class} break
:::

# Lesson 1: Creating a Standing Model

The standing model can be found in the AMMR folder under Applications/Examples.
The main file is called StandingModel.Main.any.

**While this file can be opened with the "File->Open" menu in AnyBody, do not do
this! This tutorial will teach you an easier way to use the Standing Model as a
starting template.**

Key (modifiable) features of the standing model are:

- Both feet are always connected to the ground.
- The posture is defined by the joint angles for all major joints except the ankles.
- The model automatically balances itself by maintaining its center of mass
  vertically above the ankle joints. For example, if the arms move forward, the
  entire body moves backward to maintain balance.
- External forces can be applied to predefined nodes on the model. Muscle forces
  may change to resist these forces and maintain balance.

(model-templates)=

## Model templates

To create a new standing model using the template model in the AMMR, click the
"Create New from template" button ![Model_button](_static/lesson1/image_1.png)
in the toolbar:

```{image} _static/lesson1/image_2.png
:alt: Toolbar
:class: bg-primary
:align: center
```

The Template dialogue opens and displays a list of pre-defined templates
supported in the AMMR.

**Choose the "Human Standing" template and select the
folder you want to save your new Human Standing model in.** To demonstrate, let us
save the model in the 'AnyBody.{{ AMS_VERSION_X }}/AMMR.v{{ AMMR_VERSION }}-Demo' directory
which we extracted in the {doc}`introduction <intro>` of this tutorial.

Give the model a name, for example {file}`MyStandingHuman`, and press OK to save.

```{image} _static/lesson1/image_3b.png
:alt: Template
:class: bg-primary
:align: center
```

Your new ‘MyStandingHuman.main.any’ file opens in the script Editor. The
location of the file is shown in the title bar:

```{image} _static/lesson1/image_4.png
:alt: Script editor
:class: bg-primary
:align: center
```

:::{warning} 
If you saved your model in an other location be sure to modify the file
{file}`../libdef.any` so it points to AnyBody Managed Model Repository you
want to use. 
:::

(loading-a-model)=

## Loading a model

To see the 3D graphical representation of the model you need to load it.

Load/reload is a frequent operation and has been assigned the function key F7.
You may also load your model by clicking ![Load](_static/lesson1/image_6.png)
in the toolbar.

This action will load whatever file is chosen in the text editor. If a file is
already loaded, the above action will simply reload the file until you give
another file loading priority by right-clicking its tab and select “Load Model”.

```{image} _static/lesson1/image_7.png
:alt: Load Model
:class: bg-primary
:align: center
```

## The model view

When loading is completed, the Model View window opens and shows the standing
model. You can open it manually from View -> Model Views.

```{image} _static/lesson1/image_5.png
:alt: Model view
:class: bg-primary
:align: center
:width: 70%
```

The icons in the toolbar at the top of the Model View window allow you to modify
the image: zoom, pan, rotate, etc. They should be mostly self-explanatory. Now
is a good time to play a bit around with them and to familiarize yourself with
the options.

In practical use it is often necessary to change quickly between these
functions, so keyboard shortcuts have been provided:

- The *Ctrl* button activates the Pan function.
- The *Shift* button activates the Zoom function.
- The *Ctrl-Shift* combination activates the rotation function.
- If you have a scrolling wheel on your mouse, this will zoom the model
  in and out.

## Understanding the AnyScript Model Structure

This Human Standing Model is a model from the AnyBody Managed Model Repository
(AMMR). It uses the [Human Model](https://anyscript.org/ammr/beta/body/models.html#the-body-model)
from the AMMR, which is used by most models you will encounter when using the AMMR.
Regardless of complexity, all models share a common structure used to set them
up.

The models will typically have the following overall structure (*notice*, the
AnyScript below is not excatly the same as the Standing Model used in this
tutorial, but contains the same overall structure):

```AnyScriptDoc
// Include the libdef file from the AMMR
#include "libdef.any"

Main =
{
  // Define the BodyModel configuration
  #include "Model/BodyModelConfiguration.any"

  // Include the Human model from AMMR
  #include "<ANYBODY_PATH_BODY>/HumanModel.any"

  // Define desired posture or movement of the model
  #include "Model\Mannequin.any"

  // Compose the model
  AnyFolder Model =
  {
    AnyFolder &BodyModel = .HumanModel.BodyModel;
    AnyFolder Drivers = {...};
    AnyFolder Environment = {...};
  };

  // Configuring the Study
  AnyBodyStudy Study =
  {
    AnyFolder &Model= .Model;
    Gravity = {0.0, -9.81,0.0}; // Gravity Vector
    nStep = 10; // Number of steps
    tStart = 0; // Start time
    tEnd = 10.0; // End time
  };
};
```

Let us go through the different components of this structure to understand how they work.

**Path to AMMR:** 

:::{note} 
:class: margin 
Your can open a file by double-clicking on its name in the AnyScript.
:::

```AnyScriptDoc
#include "libdef.any"
```

This means your model will include the content of the file called `libdef.any`.
This file references to another `libdef.any` file located at the top-level
folder of the AMMR, which specifies the AMMR directories to use in your model.
You can have multiple versions of AMMR available on your computer, and this
points to the version you wish to use. This line should be at the very beginning
of your `main.any` file.

**Configuring the Human Model:**

```AnyScriptDoc
Main =
{
  // Define the BodyModel configuration
  #include "Model/BodyModelConfiguration.any"
```

Here, the main declaration of the model, `Main = {}`, is initiated, and file now
becomes the main model file. All basic AnyScript contains a main file that
defines the model’s structure, contents and the operations to be performed. 

The file `BodyModelConfiguration.any` is included, which defines what parts of the
human body model are included, through a number of switches called Body Model 
(BM) parameters. BM parameters are always prefixed with `BM_` inside AnyScript.
The values of these parameters are defined by `#define` and `#path` statements.

**Including the Human Model**

```AnyScriptDoc
#include "<ANYBODY_PATH_BODY>/HumanModel.any"
```

The AMMR contains multiple musculoskeletal models. The above line includes the
Human Model from the AMMR. The file path `<ANYBODY_PATH_BODY>` is defined in
`libdef.any`. 

It is important that the configuration statements are placed
before this line.

**Defining the Posture and Movement**

```AnyScriptDoc
#include "Model\Mannequin.any"
```

This includes the file `Mannequin.any` which defines the posture and movement of
the human body model.

**Composing the Model**

```AnyScriptDoc
AnyFolder Model =
{
  AnyFolder &BodyModel = .HumanModel.BodyModel;
  AnyFolder Drivers = {...};
  AnyFolder Environment = {...};
};
```

This is where we combine the `Body` from the Human Model with extra things like
drivers, external loads, and constraints. It could also be any models of the
environment which the body interacts with or many other things.

**The Study section**

```AnyScriptDoc
AnyBodyStudy Study =
{
  AnyFolder &Model= .Model;
  Gravity = {0.0, -9.81,0.0}; // Gravity Vector
  nStep = 10; // Number of steps
  tStart = 0; // Start time
  tEnd = 10.0; // End time
};
```

The `AnyBodyStudy` is where you configure and define your simulation. It
specifies start and end times of the simulation, and the number of steps. It also
configures which solvers are used.

Only the model elements which are referenced to within the Study will be
included in the simulation. In this case, the line `AnyFolder &Model= .Model;`
references to the Model folder, meaning everything in the Model folder is part of the
simulation.

You can now proceed to {doc}`lesson2`.

