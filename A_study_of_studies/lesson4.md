::: {rst-class} break
:::

# Lesson 4: Inverse Dynamics

In this lesson we will briefly touch the heart of the AnyBody Modeling
System: the `AnyBodyStudy` class and its `InverseDynamics` operation. This
operation is similar to the `Kinematics` operation we've discussed before, but
it goes a step further by calculating the forces in the system. This is also
known as kinetic or dynamic analysis.

```{literalinclude} Snippets/lesson2/snip.arm2d-1.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 2
:end-before: //# END SNIPPET 2
```

You might think that calculating forces in a rigid body mechanical system is
straightforward. After all, isn't it just about setting up equilibrium equations
and solving them? Well, it's a bit more complex than that, especially when it
comes to biomechanics.

In biomechanics, we often deal with statically indeterminate systems. This means
we don't have enough equilibrium equations to resolve the forces in the system.
Plus, we have to consider the muscles, which can only pull, not push. This adds
another layer of complexity to the problem.

But don't worry! The `AnyBodyStudy` class is designed to handle these
complexities. It uses algorithms that are tailored for musculoskeletal systems.
These algorithms deal with the two fundamental challenges of musculoskeltal systems:

- The statical indeterminacy of the musculoskeletal system
- Unilateral forces elements.

There's also the `AnyMechStudy` class, which contains a simpler
`InverseDynamics` operation. This operation doesn't deal with the complexities
of musculoskeletal systems. Instead, it solves the basic inverse dynamics
problem for a simple mechanical system, finding the reaction forces that balance
the system.

To wrap up this tutorial on studies, let's put what we've learned into practice.
Try running the `InverseDynamics` operations in the arm model,
{download}`arm2d.zip <Downloads/arm2d/arm2d.zip>`, and the slider crank mechanism,
{download}`demo.SliderCrank3D.any <Downloads/Demo.SliderCrank3D.any>`. You'll
see forces being calculated in both cases. Notice how the slider crank study
uses the simpler `AnyMechStudy`, while the arm model uses `AnyBodyStudy`.

```{literalinclude} Snippets/lesson4/snip.SliderCrank3D-1.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

If you try to use `AnyMechStudy` in the arm model, the analysis will fail. This
is because `AnyMechStudy` doesn't recognize the muscles as unknown forces. It
treats them as known forces, which leads to an imbalance in the moments exerted
about the elbow and shoulder joints by the external load.

For more details on inverse dynamics of musculoskeletal systems, check out our
{doc}`special tutorial on the topic <../MuscleRecruitment/Inverse_dynamics>`.