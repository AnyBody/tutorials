::: {rst-class} break
:::

# Scaling and Personalizing your model

Musculoskeletal models must be adaptable to sizes and anatomy of various individuals
to be useful for product design and to be used for applications, where high geometric
accuracy is required, e.g. surface articulations and patient-specific pre-operative
planning. A general method for scaling musculoskeletal models has been implemented
in the AMMR. It allows the usage of built-in, user-defined anthropometric scaling
laws as well as individual segment morphing.

:::{seealso}
In the [AMMR documentation](https://anyscript.org/ammr/Scaling/intro.html) you will find 
instructions on how to configure the model to use the built-in *scaling laws* 
and provide general anthropometric information.
:::

Scaling schemes described in the AMMR documentation are based on
anthropometric measurements and affine transform scaling. Such schemes
are good assumptions when more accurate measurements are not feasible or not
available. Therefore, these schemes are used quite often. However, a
natural next step would be to improve the precision of a model by
utilizing subject-specific geometry available from the medical images. Medical images
contain more subject-specific information about the bone shapes and local
deformities that cannot be handled by the anthropometric regression
equations.

This tutorial introduces an advanced procedure of model personalization by means of
nonlinear morphing for both, bone surface and relevant soft tissue attachment sites,
to take a subject-specific shape. In this example, bone geometries segmented from medical
images will be used to demonstrate how geometrically accurate subject-specific models can
be constructed. Before proceeding with this tutorial, it is recommended that you are familiar
with the basic scaling laws and concepts presented in the 
[AMMR documentation](https://anyscript.org/ammr/Scaling/intro.html).

::::{if-builder:: html
```{rubric} Tutorial content
```
::::

```{toctree}
:maxdepth: 1

Lesson 1: Scaling Based on Medical Images <lesson1>
Lesson 2: Including a Custom Scaling Function into Your Model <lesson2>
```
