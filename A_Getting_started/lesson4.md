::: {rst-class} break
:::

# Lesson 4: Understanding Simulations

Now that you have a basic understanding of the AnyBody Modeling System and have
had some hands-on experience, this lesson will give you a deeper understanding
of what studies and operations are - the core components of all simulations in
AnyBody. 

In the AnyBody Modeling System, all types of simulations, whether they are pure
mechanical system analysis, musculoskeletal analysis or design analysis, are
carried out by objects that are referred to as “studies”. Studies have
operations that can be executed to perform the analysis. 

Meaning, studies and operations are the mechanisms used to specify tasks to
be performed on the model. Think of a study as a collector that brings together
a model definition, the operations that execute the model, and the results to be
analyzed afterwards. Meaning, operations are the tasks performed on the model.
They can be executed from the AnyBody interface, generating and storing output
in the study based on the function of the specific operation.

## Why Do We Need Studies?

You might wonder why we need studies. After all, couldn’t you just load a model
and have operations readily available in the AnyBody interface? The answer lies
in the flexibility that studies offer.

Studies are defined as special classes, allowing you to have multiple studies in
the same model. As objects in the model, you can have as many studies as you
need (or as many as your computer can handle), and they don’t necessarily have
to operate on the same model definition, even if they share elements.

For instance, you might want to perform different operations on the same model,
or perform the same operation on nearly identical models, and then compare the
results. With two studies, you can do this within a single AnyBody model.

## The Hierarchy of Study Classes

Studies are derived from a base class called `AnyStudy`, and the operations found
within studies are also defined as classes, all derived from the base class
`AnyOperation`.

Here's a look at the hierarchy of study classes in AnyBody:


- `AnyStudy` (Base class for all studies)

  - `AnyTimeStudy` (Base class for time variation studies)

    - `AnyKinStudy`

      - `AnyMechStudy`
      - `AnyBodyStudy`
      - `AnyBodyCalibrationStudy`

  - `AnyDesStudy` (design variable studies, see *a separate tutorial*)


## Mechanical Studies

Mechanical studies, derived from `AnyMechStudyBase`, are quite similar, but they
contain different sets of available operations. The base class is empty, with
`AnyKinStudy` extending it with functionality for kinematic analysis.
`AnyMechStudy` further extends this with kinetic (dynamic) analysis of basic
mechanical systems.

`AnyBodyStudy` is the most frequently used study by AnyBody users, as it extends
the kinematic analysis functions with operations for kinetic (dynamic) analysis
of musculoskeletal systems, which is the core functionality of the AnyBody
Modeling System. It also contains almost all of the operations found in other
mechanical studies. `AnyBodyCalibrationStudy` provides additional functionality
to adjust/calibrate the musculoskeletal models systematically.

## Understanding the Structure of a Study

A study in AnyBody is essentially a folder that contains specifications. These
specifications are placed between a pair of braces and become part of the study.
A study has predefined properties that you can set, must set, or cannot modify.

When you create a new model using `File` -> `New from Template...`, the system
automatically inserts an AnyBodyStudy in the main file. It looks like this:

```AnyScriptDoc
// The study: Operations to be performed on the model
AnyBodyStudy MyStudy = {
  AnyFolder &Model = .MyModel;
  Gravity = {0.0, -9.81, 0.0};
};
```

This study contains all the necessary elements. The first word after
`AnyBodyStudy` defines the name of the study, which in this case is "MyStudy". The
last line `Gravity = {0.0, -9.81, 0.0};` assigns a value to the Gravity
variable, which specifies the gravitational acceleration vector affecting the
model.

An `AnyBodyStudy` has many more predefined properties that you can modify. You
can view these properties using the Model Tree View, which is attached to the
left of the Main Frame. Double-clicking any object in the Model Tree will show
you properties of the objects in the Object Description dialog box.

Most of the properties deal with solution methods, tolerances, and other
advanced user features. However, some properties are essential for all users:

* `tStart`: The time at which the study begins. Usually, this is zero.
* `tEnd`: The time at which the study ends. This often needs to be set by the user.
* `nStep`: Specifies how many steps the system should use to go from tStart to tEnd.

Let's take a closer look at the first line of the study:

```AnyScriptDoc
AnyFolder &Model = .MyModel;
```

:::{note}
:class: margin
You can choose to point to some subfolders of `MyModel` instead of the entire
model. This means the study would work on just a subset of the model. For
example, you might want to compare two nearly identical models. In this case,
you can put all common parts in one folder and the distinctive parts in separate
folders. Then, you can create two studies that reference the common part and
their respective distinctive parts.
:::

Here, "AnyFolder" is a type definition. Unlike the predefined properties
discussed above, this line introduces a new property to the study. This is a
key aspect of studies: you can add almost anything to a study, and the study
doesn't need to know its type in advance.

This line defines a variable called "Model" and assigns it to `.MyModel`. In 
this case, `MyModel` is the folder that contains the entire model. The prefix `.`
before `MyModel` indicates that it's one level up from where it's referenced.

By assigning `MyModel` to the Model variable, the entire model comes under the
influence of the study. The `&` before "Model" means that Model doesn't get
replicated inside the study. Instead, it's a pointer to `MyModel`. If you're
familiar with C, C++, or Java programming, you'll recognize this as the concept
of pointers. If not, think of a pointer as a reference to something defined
elsewhere. When you access it, you're actually interacting with what it points
to.

## The Standard Operations in a Study 

When you create an `AnyBodyStudy`, it automatically includes three standard
operations in the study tree. These operations represent different actions you
can perform on the model elements that the study points to:

* `InitialConditions`: This operation reads the values of all drivers
  included in the study, and sets the model to match these drivers at the
  start time (tStart). Meaning it puts the model in the position it has at
  `time=tStart`. The model is first initialized into the positions from
  load time, and the kinematics is then solved in a few steps. This is
  especially helpful for inspecting the specified initial positions if you're
  having issues with the initial configuration of the mechanism. The
  `InitialConditions` can only run successfully if all joints and drivers are
  fully defined.

  Note, that the the model's positions after running `InitialConditions`
  is different from the position after just loading the model, called
  the load-time position.

* `Kinematics`: This operation performs a kinematic analysis, which is a
  simulation of the model's movement without calculating any forces. This means
  you can run a Kinematics operation as soon as you've uniquely defined the
  movement and the model is kinematically determinate. You don't need any
  muscles in the model for this operation.

  The data you can extract from the Kinematics study includes positions,
  velocities, and accelerations.

* `InverseDynamics`: This operation simulates the forces involved in the given
  movement or posture, along with anything that can be derived from them. The
  InverseDynamics operation uses the Kinematics operation as a subroutine, so it
  requires a correctly defined movement or posture, as well as the necessary
  muscles or motors to drive the model.
  This is also known as kinetic or dynamic analysis.

:::{admonition} Note on InverseDynamics
:class: note
You might think that calculating forces in a rigid body mechanical system is
straightforward. After all, isn’t it just about setting up equilibrium equations
and solving them? Well, it’s a bit more complex than that, especially when it
comes to biomechanics.

In biomechanics, we often deal with statically indeterminate systems. This means
we don’t have enough equilibrium equations to resolve the forces in the system.
Plus, we have to consider that muscles can only pull, not push. This adds
another layer of complexity to the problem.

The `AnyBodyStudy` class is designed to handle these complexities. It uses
algorithms that are tailored for musculoskeletal systems.

There’s also the `AnyMechStudy` class, which contains a simpler InverseDynamics
operation. This operation doesn’t deal with the complexities of musculoskeletal
systems. Instead, it solves the basic inverse dynamics problem for a simple
mechanical system, finding the reaction forces that balance the system.
:::

When you execute each of these operations, they compile their output in the
Output section under the study tree. This allows you to easily access and
analyze the results of each operation.

