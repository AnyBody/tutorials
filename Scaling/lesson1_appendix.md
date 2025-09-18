---
myst:
  substitutions:
    image1: |-
      ```{image} _static/lesson1_appendix/image2.png
      :width: 80%
      ```
    image10: |-
      ```{image} _static/lesson1_appendix/image10.png
      :width: 80%
      ```
    image11: |-
      ```{image} _static/lesson1_appendix/image11.png
      :width: 80%
      ```
    image12: |-
      ```{image} _static/lesson1_appendix/image12.png
      :width: 80%
      ```
    image13: |-
      ```{image} _static/lesson1_appendix/image13.png
      :width: 80%
      ```
    image2: |-
      ```{image} _static/lesson1_appendix/image3.png
      :width: 80%
      ```
    image3: |-
      ```{image} _static/lesson1_appendix/image4.png
      :width: 80%
      ```
    image4: |-
      ```{image} _static/lesson1_appendix/image5.png
      :width: 80%
      ```
---

# Appendix: Morphing based on landmarks

This tutorial is an appendix to the {doc}`Lesson 1 <lesson1>`, where
construction of an advanced scaling function is introduced.

This lesson is a brief introduction to the interpolation functions based on
the nonlinear Radial Basis Functions (RBF) approach, which is used as
the core of advanced transformations. `AnyFunTransform3DRBF` and
`AnyFunTransform3DSTL` classes are covered by this lesson.

## Nonlinear Point Based Scaling Transformation

Most of the described scaling schemes are based on anthropometric
measurements and linear scaling transforms. As such they do not
reconstruct needed bone morphology to a very high level of detail, i.e.
local deformities of certain bone features may not be covered by such
scaling. However, there is still a wide range of applications for them.
But in this lesson we will focus on the nonlinear transformation.

The morphing function described in this lesson transforms (not necessary in a
linear manner) a set of given points (source landmarks) into a set of known
subject-specific points (target landmarks). For this purpose the following
approximation is constructed:

\begin{gather*}
f\left( y \right) = \sum_{j = 1}^{n}{c_{j}\phi(\left\| y - x_{j} \right\|)} + p_{q}(y)
\end{gather*}

where $c_{j}$ are the coefficients of the RBF functions
$\phi$, computed based on the source and target landmarks,
$p$ is the polynomial of order $q$, and $\phi$ is the
RBF function, which can take different forms. Here, we are just looking
at one of the following forms:

- $\phi\left( r \right) = e^{- \text{ar}^{2}},\ a > 0$, –
  Gaussian function, or
- $\phi(r) = r^{2} \bullet ln(r)$ – thin plate spline, or
- $\phi\left( r \right) = \sqrt{r^{2} - a},\ \ a < r^{2}$, –
  multiquadratic function.

Other forms can be found in the reference manual.

To define such a transform in AnyScript we can use a template provided
by the AnyBody Modeling System:

```AnyScriptDoc
AnyFunTransform3DRBF <ObjectName> = {
  //PreTransforms = {};
  /*RBFDef = {
    Type = RBF_Gaussian;
    Param = 1;
  };*/
  Points0 = ;
  //RBFCoefs = {};
  //PolynomDegree = -1;
  //PolynomCoefs = {};
  //PointNames = ;
  //PointDescriptions = ;
  //Points1 = ;
  /*BoundingBox = {
    Type = BB_Cartesian;
    ScaleXYZ = {2, 2, 2};
    DivisionFactorXYZ = {1, 1, 1};
  };*/
  //BoundingBoxOnOff = Off;
};
```

The `PreTransforms` member allows inclusion of other transforms to be a
part of the transform that is being constructed. The pre-transforms will
be applied on both, source landmarks, Points0, and on the object that
will be processed using this transform.

The `Points0` variable is a $k\times 3$ matrix of the source
landmark coordinates, where k is the number of source points. `Points1` is
the matrix of target landmarks of the same size. These two entities
alone define a 3D RBF transform.

The `PolynomDegree` variable corresponds to the $q$ degree of the
polynomial term of the aforementioned approximation. Recommended degree
is 1, i.e. a linear component. This kind of approximation gives good
results in our empirical observations.

`RBFDef.Type` defines a type of the RBF function. Possible options are
`RBF_Gaussian` (default), `RBF_ThinPlate`, `RBF_Biharmonic`,
`RBF_Triharmonic`, `RBF_MultiQuadratic`, and `RBF_InverseMultiQuadratic` as
can be found in the reference manual. This type of specification is an
important parameter as it defines the interpolation/extrapolation
behavior of the RBF transform. Further, we will demonstrate the
difference of using different radial basis functions.

`RBFDef.Param` corresponds to the parameter $a$ mentioned in the
definitions of the Gaussian and the multiquadratic RBF function. By
varying this parameter it is possible to change the behavior of a chosen
RBF function, e.g. prescribe a local effect of the landmarks.

`PointNames` is a string array to give text identifiers for the landmarks.
This can be used to be output to landmarks to process in external
packages. Similarly, `PointDescriptions` is an additional storage for more
detailed information on how to locate the landmarks.

An alternative way to define an RBF transform is to specify the required
approximation coefficients explicitly. This can be done by defining the
`RBFCoefs` and `PolynomCoefs` variables. However, this is a very demanding
and non-intuitive procedure and the preferable way is to define the
corresponding sets of landmarks.

As it is clear from the description the following block describes a
bounding box. This bounding box is computed on provided source landmarks
and used to construct additional landmarks for the construction
algorithm. It will internally increase the size of `Points0` and `Points1`
members to $(k + n) \times 3$. This is done to improve the
extrapolation behavior of the `AnyFunTransform3DRBF` object. Please note
that it will use the same bounding box points for both, source and
target set, and, therefore, using `BoundingBoxOnOff` requires the landmark sets
to be registered prior to using this feature. The latter can be done by using
`AnyFunTransform3DLin2` or others.

There are two ways to compute an auxiliary bounding box – the first way
is to compute it in the Cartesian coordinate system, the other way is to
look at the principal axes. This can be changed by modifying the
`BoundingBox.Type` parameter to be either `BB_Cartesian` or
`BB_PrincipalAxes`.

The parameter `BoundingBox.ScaleXYZ` defines a vector of scaling factors
that will be applied to the bounding box dimensions, which will expand
or shrink the field of the extrapolation improvements.

The next parameter is `BoundingBox.DivisionFactorXYZ`. This parameter
specifies how many additional auxiliary points we require for the
transform construction along different axes. For example, we can request
to divide the Y axis by three points instead of two by setting this
vector to {1,2,1}.

Finally, the `BoundingBoxOnOff` flag is a switch for the inclusion or
exclusion of the auxiliary landmarks for the construction of the
transform.

## Nonlinear Surface Based Scaling Transformation

The previous section describes an interpolation and extrapolation
transform that works on discrete points in space. However, often the
selection of these landmarks is unintuitive and we may require an
automated tool to assist us in this task. A surface-based RBF class,
`AnyFunTransform3DSTL`, was developed for this purpose:

```AnyScriptDoc
AnyFunTransform3DSTL <ObjectName> =
{
  //PreTransforms = ;
  /*RBFDef =
  {
  Type = RBF_Gaussian;
  Param = 1;
  };*/
  //FileName0 = ;
  //ScaleXYZ0 = {1, 1, 1};
  //SurfaceObjects0 = ;
  //FileName1 = ;
  //ScaleXYZ1 = {1, 1, 1};
  //SurfaceObjects1 = ;
  NumPoints = 0;
  //UseClosestPointMatchingOnOff = On;
  //PolynomDegree = -1;
  //PolynomCoefs = ;
  /*BoundingBox =
  {
  Type = BB_Cartesian;
  ScaleXYZ = {2, 2, 2};
  DivisionFactorXYZ = {1, 1, 1};
  };*/
  //BoundingBoxOnOff = Off;
};
```

Similarly to the `AnyFunTransform3DRBF`, the pre-transforms will be
included into the transformation that is being constructed. As well as
that auxiliary bounding box points will be added to the transform
exactly like in `AnyFunTransform3DRBF`.

`FileName0` and `FileName1` specify surface files that will be used for the
construction of the transform. The underlying method is exactly the same
as in the `AnyFunTransform3DRBF`, except that source and landmarks now
will be found automatically.

`ScaleXYZ0` and `ScaleXYZ1` members are scaling vectors that can be used to
scale or mirror the surfaces. For example, unit change from millimeters
to meters can be done by multiplying the components of the vectors with
0.001.

However, it is best to use `SurfaceObjects0` and `SurfaceObjects1` to define
the input, since these objects can also be pretransformed using various
linear and nonlinear transformations, i.e. registration from the
coordinate system of the CT scanner to the anatomical frame.
`SurfaceObjects0` and `SurfaceObjects1` expect references to the AnySurfSTL
objects, that already contain `ScaleXYZ`, and, thus, will not use
`ScaleXYZ0`/`ScaleXYZ1`.

The `NumPoints` parameter specifies how many landmarks will be used to construct a
transformation. This number of source landmarks is seeded on the vertices of the
source STL surface. To find matching pairs the closest points are found
on the target surface. Please note that it is assumed that the
geometries are well aligned using `AnyFunTransform3DLin2` or
`AnyFunTransform3DRBF`, and therefore, the error of the closest point
algorithm is negligible.

## RBF Point-Based Scaling Example

This section introduces an example of using `AnyFunTransform3DRBF`
function. We have prepared a model, where the transform is already
constructed using some pre-defined settings. The intention of this example
is to see how different parameters affect the scaling law. Thus, we will
adjust the parameters and observe how that changes the results.

Let us start by downloading the model:
{download}`AppendixA.zip <Downloads/appendixa.zip>`

The downloaded model consists of a two-component transformation pipeline (the
first step is a point-based affine, the second one is an RBF transform), a set
of points aligned in a grid, and the source and target surfaces that will be
used to check the result of the morphing. The origin of the coordinate system is
also drawn as a grey sphere used as a visual reference. If we load the model and
look at the Model View, you can observe two surfaces and two point clouds – a
red point cloud corresponding to the point cloud prior to the RBF transform, and
a blue point cloud corresponding to the result of application of the RBF transform:

```{image} _static/lesson1_appendix/image1.png
:alt: Point cloud and surfaces beginning
:class: bg-primary
:align: center
:width: 55%
```

Now we take a look at the content of the file `grid.any`. This file
contains a matrix of grid coordinates that is used to exemplify how
the morphing works and show the deformations. It is possible to
switch on and off grid planes. This can be done by setting the corresponding
flags to 0 or 1. For example, if the `GridAll` flag is set to 1, all grid planes
will be visualized. The other way around, if `GridAll` is 0 and only `GridX5`
is set to 1, then just the fifth grid plane will be visualized. This
functionality was added to enable more flexible visualization to better
understand the behaviour of the transform in this tutorial. Thus, we
will switch on and off some layers during this lesson to explain some
effects. Please note that if `GridX11` is switched off then it is required
to remove the comma at the end of the AnyScript block, which contains
the last plane of the grid.

Let us proceed to the explanation of the first block of parameters in the main
script. At first, we change the `RBFDef.Param` and see how this internal parameter
of radial basis function affects the behavior of the scaling law. Let us try to
set it to *0.2*, *2*, *20*, and *200*.

```{literalinclude} Snippets/lesson1Appendix/snip.AppendixA.main-1.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

:::{rst-class} plain
:::

| 0.2 {{ image1 }} | 2 {{ image2 }} |
| -------------- | -------------- |
| 20 {{ image3 }} | 200 {{ image4 }} |

We can see strange behaviour of the deformation field that is hard to
explain, however, you can notice that the deformed grid is approaching
the origin of the coordinate system, when the parameter increases. Let
us look back at the definition of the Gaussian radial basis function:
$\phi\left( r \right) = e^{- \text{ar}^{2}}$. We can see that
the exponential nature will decrease the influence of the *r* component.
However, if the parameter is too large the influence of radial distances
will be minor and insignificant. Thus, it is necessary to keep the
balance between this parameter and expected size of the object being
scaled.

You can also notice that the suggested morphing is not that good;
however, just 4 landmarks were used to construct this transform. Now we
know the recommendations on `RBFDef.Param` require it to be rather small.
Let us fix this parameter to 0.2 and try to increase the number of
landmarks by uncommenting all the landmarks provided in the example for
both source and target sets – will it increase the accuracy?

```{literalinclude} Snippets/lesson1Appendix/snip.AppendixA.main-2.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

```{literalinclude} Snippets/lesson1Appendix/snip.AppendixA.main-2.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 2
:end-before: //# END SNIPPET 2
```

```{image} _static/lesson1_appendix/image6.png
:alt: Param 0.2 and many landmarks
:class: bg-primary
:align: center
:width: 80%
```

Now we see that the scaling does not work at all. The problem here is
that the Gaussian type of the RBF transform is sensitive to the number
of landmarks, and does not work well with a too large number of them.
The solution here is to switch `RBFDef.Type` to `RBF_ThinPlate`:

```AnyScriptDoc
AnyFunTransform3DRBF RBFTransform = {
  PreTransforms = {};
  RBFDef = {
    Type = RBF_§ThinPlate§;
    Param = 0.2;
  };
...
```

```{image} _static/lesson1_appendix/image7.png
:alt: Param 0.2 and RBF_ThinPlate
:class: bg-primary
:align: center
:width: 80%
```

This modification fixes the problem for the bony surfaces and their
vicinities – now they look alike. Thus, it is recommended to use
`RBF_Gaussian` type only with low number of landmarks. `RBF_ThinPlate` is
recommended for larger numbers. However, you may also choose between
`RBF_ThinPlate` and `RBF_Gaussian` based on their performance.

Now we can morph the bone surface itself and some points that are close
to the surface. But what about the extrapolation problem, which is
supposed to handle all muscle/ligament attachments and other points? It
is clear that in such form this solution is not viable, and even
dangerous as the last picture shows. There are two not necessarily
exclusive approaches to handle this problem.

The first solution is to look back at the equation of approximation and
notice that at this point we are still not utilizing the polynomial
term. Let us try to switch it on and set the `PolynomDegree` to 1,
which is recommended by the reference manual. Now our approximation
looks smoother and probably more reasonable:

```{image} _static/lesson1_appendix/image8.png
:alt: PolynomDegree 1
:class: bg-primary
:align: center
:width: 90%
```

However, one may still think that the extrapolated points are lying too
far out. There is one more modification that may affect this solution.
We can define the behavior of the extrapolation by suggesting the
boundaries of the transform. The bounding box member enables us to take
its points as both source and target landmarks making a candidate point
for extrapolation to be transformed into itself. Let us try to switch on
the bounding box corners and face points to be included as landmarks:

```{literalinclude} Snippets/lesson1Appendix/snip.AppendixA.main-3.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

```{image} _static/lesson1_appendix/image9.png
:alt: Bounding box on
:class: bg-primary
:align: center
:width: 80%
```

You can notice that the face and corner points on the bounding box,
which was increased by a factor of 2, also improved extrapolation and
suggested that the extrapolated points will now lie within similar
distance from the original surface.

This model allows changing other parameters of the bounding box as well:
one can modify the size of the bounding box to capture more points and
expand the extrapolation field; you can also seed more points on the
faces and corners by defining `DivisionFactorXYZ` to strengthen
extrapolation at the boundaries.

This section gave an overview of how to use the `AnyFunTransform3DRBF`
class. So now this model can be used for further investigation of the
RBF behaviour. 

## RBF Surface-Based Scaling Example

For the second part of the lesson we will describe and explain how to
work with the `AnyFunTransform3DSTL` class. This class was implemented to
simplify subject-specific modeling by including source and target
surfaces into an RBF transform, where all source and target landmarks
will be found automatically or semi-automatically.

This transform and underlying equations are exactly the same as in the
`AnyFunTransform3DRBF` class. The only things that you can control are how
to seed the landmarks on the provided surfaces, i.e. how dense they
should be, and allow topologically equivalent surfaces to be morphed
using vertex-vertex correspondence. Thus, this part of the lesson will
not cover the RBF part, but it will only cover the landmark-related
part. For simplicity, exactly the same RBF parameters will be used as in
the paragraph before.

Let us try to play with settings of this transform. We will use the
model from the first part of this lesson with all modifications and an
additional `AnyFunTransform3DSTL` object. Please download this model,
{download}`AppendixB.Main.any <Downloads/appendixb.Main.any>`, into the same
folder – that will make sure that all common files are in place.

Let us start by modifying the number of landmarks. Such modification
plays two slightly different roles in the construction of the non-linear
RBF transform. First of all, it allows controlling the density of points
and, therefore, the accuracy of the constructed transform. For example,
if we request NumPoints to be 4, we will face the same situation that we
experience in the first lesson. Thus, increasing this number should
hypothetically improve the morphing. However, nothing comes for free –
the sizes of allocated matrices will also increase, and the speed of the
model construction will decrease to some degree. Additionally, by
increasing the number of points we increase the probability of covering
all small and sharp features of the bone by landmarks. Please note that
the surface vertices are selected as landmarks by uniformly distributing
them across all vertex indices. That may cause the situation when a bony
feature consists of a small number of vertices and, therefore, may
appear to be not included in the landmark set. Changing the number of
requested landmarks may fix this problem. Thus, it is a general
recommendation to change the number of landmarks until the desired or an
acceptable accuracy is reached. Let us change the number of points to
the values of *20*, *200*, *400*, and *1000*:

```{literalinclude} Snippets/lesson1Appendix/snip.AppendixB.main-4.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

:::{rst-class} plain
:::

| 20 {{ image10 }} | 200 {{ image11 }} |
| --------------- | --------------- |
| 400 {{ image12 }} | 1000 {{ image13 }} |

These images highlight how the increase in the landmark number affects
the accuracy of the transform. With just 20 landmarks most of the
bony processes are not being captured. Increasing to 200 landmarks
leads to rather coarse, but better, morphing. This, of course, may be
sufficient for some applications. Further increase changes the surface
even more. Please note that the outer grid is not affected much by the
change of this number. Therefore, this increase will only affect muscle
and ligament attachment nodes that are on or close to the surface.

A last possible modification is to utilize topologically equivalent
surfaces to construct the scaling law. That only requires setting the
`UseClosestPointMatchingOnOff` flag to be `Off` and supplying surfaces,
which have corresponding vertices and connectivity matrices.
