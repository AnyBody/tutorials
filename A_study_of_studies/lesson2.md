::: {rst-class} break
:::

# Lesson 2: Initial Conditions

Before we look at the InitialConditions operation, let us just notice
that when the model is loaded, the segments of the model are positioned
in space according to their definition in terms of the `r0` and `Axes0`
properties in each segment's definition. 

```{literalinclude} Snippets/lesson2/snip.arm2d-1.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

**These are called the load-time positions.**

The figure below shows an attempt to position the forearm and upper arm
correctly at load time. While this is beneficial, perfect positioning isn't
necessary. In complex models, segments and muscles may appear disorganized at
load time. To view the model's correct assembly for the first time step, use the
InitialConditions operation.

```{image} _static/lesson2/image1.png
:alt: Load-time positions
:class: bg-primary
:align: center
```

When you run the `InitialConditions` operation, it will attempt to put the
model in the position it has at `time = tStart`. This may or may not be
possible, and in the development stages of a model, when the joints and
drivers are not yet fully defined, it is definitely not possible, and
this is the reason why the system does not run `InitialConditions` automatically when you
load the model.


In our toy "amr2d" model running the `InitialConditions` operation produces a
correctly assembled arm:

```{image} _static/lesson2/image2.png
:alt: InitialConditions positions
:class: bg-primary
:align: center
```

To correctly connect the model at the joints, a kinematic analysis is necessary. This means the model must be kinematically determinate, with the right number and relationship of joints and drivers. Achieving this balance may take several iterations during model development. During these iterations, you can load the model to visualize it. This is why the loading the model simply positions the segments where the user placed them.


Instead of running the InitialConditions operation outright, you can step
through it to understand its workings. Do this by clicking the "Step" button,
not the "Run" button.

```{image} _static/lesson2/image3.png
:alt: Step through InitialConditions
:class: bg-primary
:align: center
```

The first step resets the model to its initial load-time conditions, useful for
identifying kinematic issues. The second step positions the segments according
to the joints. The third step, though not visibly impactful in this simple
model, positions muscles wrapping over surfaces.

Consider the InitialConditions study as the first step of a kinematic analysis, which we'll cover in {doc}`the next lesson. <lesson3>`.

