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
For more information about the scaling laws, see the 
[AMMR Scaling documentation](https://anyscript.org/ammr/Scaling/intro.html).
:::

Scaling schemes described in the AMMR documentation are based on anthropometric
measurements and affine transform scaling. Such schemes are good assumptions
when more accurate measurements are not feasible or not available. Therefore,
these schemes are used quite often. Currently, there are six built-in scaling
laws available in AnyBody, which can be seen in the table below. The first three
lessons of this tutorial will explain what these scaling laws are and how to
configure your model to use them.

```{eval-rst}
.. list-table::
   :widths: 3 7
   :header-rows: 1

   * - Scaling law
     - Description
   * - ``ScalingStandard``
     - Scale to a standard size; i.e. use 50th percentile sizes for a European male
   * - ``ScalingNone``
     - Do not scale; i.e. use underlying cadaveric dataset as is
   * - ``ScalingUniform``
     - Scale segments equally in all directions; input is joint to
       joint distances
   * - ``ScalingLengthMass``
     - Scale taking mass into account; input is joint to
       joint distances and mass
   * - ``ScalingLengthMassFat``
     - Scale taking mass and fat into account; input
       is joint to joint distances
   * - ``ScalingXYZ``
     - Scale taking mass and fat into account; scale segments along X, Y, Z axes;
       input is scale factors along X, Y, Z axes.
```

If improved precision of the scaling is needed, a natural next step would be to
utilize subject-specific geometry available from the medical images. Medical
images contain more subject-specific information about the bone shapes and local
deformities that cannot be handled by the anthropometric regression equations.

The last two lessons in this tutorial introduce an advanced procedure of model
personalization by means of nonlinear morphing for both bone surface and
relevant soft tissue attachment sites, to take a subject-specific shape. In this
example, bone geometries segmented from medical images will be used to
demonstrate how geometrically accurate subject-specific models can be
constructed.

::::{if-builder:: html
```{rubric} Tutorial content
```
::::

```{toctree}
:maxdepth: 1

Lesson 1: Joint to joint scaling methods <lesson1>
Lesson 2: Scaling based on External Body Measurements <lesson2>
Lesson 3: Scaling using segmental scaling vectors <lesson3>
Lesson 4: Scaling Based on Medical Images <lesson4>
Lesson 5: Including a Custom Scaling Function into Your Model <lesson5>
```
