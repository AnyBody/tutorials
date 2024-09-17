::: {rst-class} break
:::

# Lesson 1: Starting with a New Model

In this tutorial, we will create a model of a single leg stepping on a
pedal.

## Creating a model from templates

The toolbar button "Template" will generate a pop-up menu that looks like the image below.
Select the "Human" template, set the "Target Folder" as per your convenience, but you must set the target name as “MyPedal”:

```{image} _static/lesson1/image2.png
:alt: New template model button
:class: bg-primary
:align: center
```

```{image} _static/lesson1/image3.png
:alt: New Template dialog
:class: bg-primary
:align: center
```

If you press the OK button, it will open an editor window of
“MyPedal.main.any” file that includes the following lines:

```{literalinclude} Snippets/lesson1/MyPedal-1/MyPedal.main.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

When you load the model, you should see the following image in your model view:

```{image} _static/lesson1/image4.png
:alt: Model view Full body
:class: bg-primary
:align: center
```

Double-clicking the following line:

```{literalinclude} Snippets/lesson1/MyPedal-2/MyPedal.main.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

Opens up the “Environment.any” file which is created by the Human template.

```{literalinclude} Snippets/lesson1/MyPedal-2/Model/Environment.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

For this model, the only environment objects will be the global reference frame (i.e. ground),
and the pedal which the foot will be stepping on. You can define the global reference frame within the
environment folder as follows:


```{literalinclude} Snippets/lesson1/MyPedal-3/Model/Environment.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

Click the "Save" button or Ctrl-S to save what you have typed in this Environment.any file and reload the model.

(model-structure)=

## The model structure

Let us first review the structure of the model in slightly more
detail. This structure creates a clear division between the human body parts
and the applications we hook them up to.

```{image} _static/lesson1/image1.png
:alt: ModelTree
:class: bg-primary
:align: center
```

**Just below “Main”, you see the "HumanModel" folder which holds all the body
parts that are imported from the AMMR, such as segments (bones), joints, muscles etc.**

Information for scaling the size of the default human model is also stored here.
In general, you won’t need to modify this information directly.

The "Model" folder comes next this holds information specific to the application you're creating.
In this case, this is the pedal model. The "Model" folder is sub-divided into three sub-folders:

- **HumanModel** - This is a local reference to the "Main.HumanModel", located within the "Model" folder.
  {ref}`This section <reference-objects>` can help you recollect what reference objects are.
- **Environment** - This contains external hardware such as chairs,
  bicycles, tools, or, in the present case, a pedal.
- **ModelEnvironmentConnection** - This holds the measures and drivers that link the body model together to the environment.

## Add pedal segment

The pedal will be hinged at one end, with the foot pushing down at the other.
We will define the pedal segment and the hinge in the "Environment.any" file:

This is achieved by the following lines:

```{literalinclude} Snippets/lesson1/MyPedal-4//Model/Environment.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

If you reload the model, you will see the new segment in the model:

```{image} _static/lesson1/image5.png
:alt: Model view new segment
:class: bg-primary
:align: center
```

In the next lesson, we shall look at how you can customize the human model to fit the purpose of your
simulation using AnyBody.
