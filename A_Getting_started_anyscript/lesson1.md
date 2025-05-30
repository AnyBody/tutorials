::: {rst-class} break
:::

# Lesson 1: Basic Concepts

:::{note}
**To follow this tutorial, it is recommended to first watch the
introductory video found at this link:** "{doc}`Tutorial Overview <../index>`".
:::

To create an AnyScript model from scratch, go to "File menu -> New from
template…". This will bring up a new window where you choose "Basic Main",
provide a "Target Name" (e.g. *NewModel*), and click OK. This is similar to
{ref}`this step <model-templates>` from the previous tutorial.

The new file that opens in the text editor contains a basic skeleton for your
model, based on a built-in template.

```{image} _static/lesson1/image2.png
:alt: Script editor 
:class: bg-primary
:width: 100%
:align: center
```

## What are Classes?

Let's have a look at what the system has generated for you. If you ignore most
of the text and comments (green lines beginning with {literal}`//`), the overall
structure of the model looks like this:

:::{admonition} tl;dr 
:class: tip margin dropdown 
When you load the model, the
name assigned to a pair of braces, and all the contents between the braces will
show up as folders and sub-folders in the Model Tree.

The code creates two objects - `MyModel` & `MyStudy` - which perform very
specific functions, which depend on the pre-preprogrammed object types
(`AnyFolder` & `AnyBodyStudy`) used to create these objects. These inbuilt
object types are also known as CLASSES. 
:::

```AnyScriptDoc
Main = {

   AnyFolder MyModel = {
   };

   AnyBodyStudy MyStudy = {
   };

};
```

What you see is a hierarchy of braces - the outermost pair of braces is named
`Main = {}`. Everything else in the model goes between these braces, and any
basic AnyScript must contain this Main folder.

"MyModel" (of class type `AnyFolder`) is simply an organizational folder for
containing the entire model you are going to build. Let us change the folder
name "MyModel" to "ArmModel".

The object named "MyStudy" (of class type `AnyBodyStudy`) is a collection of
simulation tasks that you want to perform with your model. The {doc}`Study of
Studies <../A_study_of_studies/intro>` tutorial contains much more information
on simulation studies.

Generally, when declaring an object in AnyScript, you typically start
with the class type, followed by a chosen object name, and then assign it a
value. The value can be a number, a string, or another object. `<ClassName>
<objectname> = <value>;`.

**👉 Now** reename `MyStudy` to `ArmModelStudy`, and replace all occurences of
`MyModel` with `ArmModel`.

:::{attention} 
:class: margin 
All changes you need to do in your model will be
highlighted in <span style="color:red">red</span> in future tutorials. 
:::

## What does this file contain so far?

```{literalinclude} Snippets/lesson1/snip.NewModel.main-1.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

Within `ArmModel = {}` is an object named `GlobalRef`, created with the
`AnyFixedRefFrame` class. This object is the global reference frame for your
model.

You will notice "Todo:" comments inside the braces, to which we will return
later.

:::{note} 
The model objects that you create henceforth must be placed within the
"ArmModel" folder and should go between its pair of braces. 
:::

## Loading an AnyBody model

You should be ready to load the model now. If cannot recollect how this is done,
refer to {ref}`this section <loading-a-model>`  from a previous tutorial.

You may get message similar to the one below, in the Output Window.

```none
Loading  Main  :  "C:\..\NewModel.main.any"
Scanning...
Parsing...
Constructing model tree...
Linking identifiers...
Evaluating constants...
Configuring model...
Evaluating model...
Loaded successfully.
Elapsed Time : 0.030000

```

## Basic troubleshooting

If you mistype something, you will get an error message. A common mistake is to
forget a semicolon somewhere. Try removing a semicolon and re-load the model,
which may give you an error message like this:

:::{attention} 
:class: margin 
The error messages may look different depending on
which semi-colon you removed. Missing semicolons can be tricky, so keep that in
mind. 
:::

```none
ERROR(SCR.PRS11) : C:\\...\\NewModel.main.any(26) : 'EOF' unexpected Model loading skipped
```

The message contains clickable links for both error code and the location of the
error in your file. Upon clicking the file link, the text cursor jumps to the
exact problematic line in the file. Remember that an error can sometimes be
caused by something you mistyped earlier in the file.

Clicking the error code, e.g: `ERROR(SCR.PRS11)` opens a pop-up window with a
complete explanation:

```{image} _static/lesson1/image5.png
:alt: Error code
:class: bg-primary
:width: 100%
:align: center
```

We now assume that you have removed the errors and have loaded the model
successfully. If you are up to it, let's continue onward to {doc}`Lesson
2: Segments <lesson2>`


