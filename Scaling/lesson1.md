::: {rst-class} break
:::

# Lesson 1: Personalizing Individual Segments Based on Geometric Data from Medical Images

This tutorial presumes that you have read the [AMMR documentation](https://anyscript.org/ammr/Scaling/intro.html)
and know how to personalize your model using information about height, weight,
and individual segment lengths.

This lesson introduces an advanced approach to scaling based on a sequence of
affine and non-affine transformations. Each of these transforms is constructed
based either on subject-specific geometry or on a set of landmarks selected on
the bone surface. As opposed to the simple scaling laws explained in the AMMR
documentation, this lesson is rather methodological than conceptual and provides
a good overview of how to pipeline and combine different 3D transforms to obtain
subject-specific morphing and registration between frames of reference.

## Linear Point-Based Scaling

Scaling schemes described in the AMMR documentation are based on
anthropometric measurements and affine transform scaling. Such schemes
are good assumptions when more accurate measurements are not feasible or not
available. Therefore, these schemes are used quite often. However, a
natural next step would be to improve the precision of a model by
utilizing subject-specific geometry available from the medical images. Medical images
contain more subject-specific information about the bone shapes and local
deformities that cannot be handled by the anthropometric regression
equations.

The simplest inclusion of the subject-specific bone shape from medical
image data is to find the affine (linear) transformation that fits a
number of corresponding points that are selected on the source and the
target geometries. These points could be fitted e.g. in a least-squares
manner. This approach is similar to utilizing external body measurements
as it relies on a linear transform. However, it is less dependent on the
bone orientation and prior knowledge of dimensions to be measured. For
example, you can locate any two points on source and target surface
consistently without thinking of how a segment length was measured.

Let us make a simple example of using landmark-based affine scaling.
First, please download two femur surfaces,
{download}`SourceFemur.stl <Downloads/SourceFemur.stl>` and
{download}`TargetFemur.stl <Downloads/TargetFemur.stl>` and save them in your
working directory. These femur geometries will be used for the rest of
this tutorial. The source surface is an unscaled femur used in the
standard AnyBody models in the AMMR. The target surface is a femur
reconstructed from a CT image and saved as a surface mesh in STL format
(courtesy of Prof. Sebastian Dendorfer, OTH Regensburg,
Germany).

Next, please download the AnyScript file
{download}`lesson1a.main.any <Downloads/lesson1a.Main.any>`. This file contains
a model with two segments which contain the definition of a surface
each, one for the source (bone color) and one for the target (yellow) bone. When we load this
model, the Model View should show the following picture:

```{image} _static/lesson1/image1.png
:alt: Modelview of initial load
:class: bg-primary
:align: center
:width: 65%
```

To define a new scaling function let us insert a new `AnyFunTransform3DLin2`
object after the target segment:

```{literalinclude} Snippets/lesson1/snip.Femur.main-1.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

The `AnyFunTransform3DLin2` object allows us to build a transform that
fits a set of source and target landmarks in a least-squares manner.
The object constructs a linear transforms in a full
affine (linear transformation with translation, rotation, size-scaling
and skewing, i.e. 12 degrees of freedom), uniform (orthogonal rotation
with uniform scaling and translation, i.e., 9 d.o.f.), or rigid-body
manner (orthogonal rotation of unscaled object with translation, i.e., 6
d.o.f.). Please note that the `AnyFunTransform3DLin2` object utilizes the
vtk-function/filter *vtkLandmarkTransform*, and, therefore inherits its
modes:

- `VTK_LANDMARK_AFFINE`
- `VTK_LANDMARK_SIMILARITY`
- `VTK_LANDMARK_RIGIDBODY`

A description of this function can be found
[here](https://vtk.org/doc/release/7.1/html/classvtkLandmarkTransform.html).

For this example we want to register our source surface into the target one by using a
full affine transform. Therefore, we select several corresponding points
on the surfaces and put them into the two point-sets called "Points0" and
"Points1", which are the source and target points, respectively. As the next
step, we change the mode of the `AnyFunTransform3DLin2` object to
`VTK_LANDMARK_AFFINE` to use the affine transform:

```{literalinclude} Snippets/lesson1/snip.Femur.main-2.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

The selected points on the surface represent specific anatomical
landmarks and points described in the comments of the AnyScript code.
Final modification before we can use the constructed linear transform is
to give this transformation a name and apply it to the source surface:

```{literalinclude} Snippets/lesson1/snip.Femur.main-2.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 2
:end-before: //# END SNIPPET 2
```

Reloading the model and looking at the bones shown in the Model View, we
can see that these bones are now merged. It will produce the following picture.

```{image} _static/lesson1/image2.png
:alt: Target and scaled source bone
:class: bg-primary
:align: center
:width: 70%
```

The source bone is now transformed, i.e., translated, scaled and
skewed to match the target bone. To clearly view the difference between
the *transformed* and the original *source surface*, let us add a new
`AnyFunTransform3DLin2` called "MyTransform2" to the model that we place
after "MyTransform". The intention is to construct a reverse rigid-body
registration transform between target and source surface. Please note,
the roles of the source points "Points0" and target points "Points1" are swapped,
and the transformation mode is set to `VTK_LANDMARK_RIGIDBODY`.

Additionally to that, a combination transform, containing the forward affine
and back registration transforms, is added and named "MyTransform3":

```{literalinclude} Snippets/lesson1/snip.Femur.main-3.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

Finally, let us look at the effect of the constructed transform. We
comment the transform used in the visualization of the source surface
and create another surface that will show the combined transformation
that we just constructed:

```{literalinclude} Snippets/lesson1/snip.Femur.main-3.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 2
:end-before: //# END SNIPPET 2
```

```{image} _static/lesson1/image3.png
:alt: Original and scaled source bone
:class: bg-primary
:align: center
:width: 60%
```

Looking at the Model View, we can see that the femur is now scaled. It
became longer and now aligns with the original source femur position.
From the previous picture, we also know that geometry is matching the
target quite well too (and if you want to convince yourself, you can superimpose the
target geometry using the "MyTransform2" reverse registration transformation
in the visualization of the target surface).

With this example, we have shown how to morph the source into the target
with a full affine scaling and subsequently applying a reverse
registration to move the morphed geometry back.

Notice that it is possible to reverse the combination, i.e., to apply
the registration step first and then the scaling/morphing step. For
instance, make a transformation similar to "MyTransform", but insert
"MyTransform2" as pre-transformation. In this tutorial lesson, we shall
however stay with the concept we presented so far.

If the morphing accuracy is sufficient for your task you can proceed
with your modeling and stop at this step. However, for the purpose of
this tutorial, the desired accuracy has not been reached - some local
features still do not match the target features, e.g. the lesser and the
greater trochanter. The following steps explain how to capture more
details and improve morphing for even better match.

## Incorporating Landmark-Based Nonlinearities into the Scaling Function

The next level of detail can be achieved by introducing local nonlinear deformations
by means of the `AnyFunTransform3DRBF` class. This class represents a nonlinear
interpolation/extrapolation transformation, which is based on the Radial Basis Functions (RBF)
method and uses landmarks selected on source and target surfaces. Detailed behaviour
of this transform is described in an {doc}`appendix tutorial <lesson1_appendix>`.
However, the focus of this tutorial is to demonstrate available pipelines of transforms. For
simplicity, we use a preselected set of femoral landmarks and RBF settings.

We start with the model from the previous steps to introduce the landmark-based
nonlinear scaling. Several tranformations will build up into a pipeline, where
pre-transforms will be used to inherit obtained accuracy throughout different steps.
You can find the complete model here: {download}`lesson1b.Main.any <Downloads/lesson1b.Main.any>`.
The following tutorial shows how to add an RBF transform with the recommended settings
into the previously created model.

First of all, let us configure the visualization of the transformation.
Now that we know how to compare source and scaled geometries as well as
reverse registration, we can switch off the registration step.

```{literalinclude} Snippets/lesson1/snip.Femur.main-4.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

This will return our morphed geometry back to the target bone location and we
can observe the improvements as we go. Let us now define an RBF transformation,
`AnyFunTransform3DRBF`, and another `AnyDrawSurf` object that will show the
difference between the *affine scaling* and the new transformation pipeline
employing *nonlinear RBF transformations*, both placed on top of the target
bone. For a better contrast of the different surfaces, we will also add some
colors to the drawing of the surfaces.

First, insert the following code below "MyTransform3" to define the  new RBF
transformation:

```{literalinclude} Snippets/lesson1/snip.Femur.main-4.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 2
:end-before: //# END SNIPPET 2
```

To visualize the effect of this transformation, now add a new `AnyDrawSurf` object
in the "SourceFemur" segment.

```{literalinclude} Snippets/lesson1/snip.Femur.main-4.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 3
:end-before: //# END SNIPPET 3
```

Loading the model, should now show the target bone (yellow), the affine scaled
bone (grey), and the RBF-scaled bone (red) on top of each other, as shown in the
figure below:

```{image} _static/lesson1/image4.png
:alt: Target, linear, and RBF scaling
:class: bg-primary
:align: center
:width: 55%
```

This code constructs a transform, which deforms the source geometry
into the target geometry using the thin-plate interpolation method and minimizes
the distance between the selected key points (landmarks). This can be used
when certain muscle attachment areas/points need to be scaled. Using this
allows us improving the model by making some local features more accurate
for the sensitive analyses. Please note that `MyTransform` object was
included as a pre-transform as a rough scaling preceding the nonlinear
RBF function, and it will be applied to the source entities, i.e. achieving
the result of the previous step. 

:::{tip}
Placing your mouse over objects in the Model View shows the name of the object.
:::

However, it is still possible to improve the fitting of the femur surfaces and, thus,
improve the accuracy of the model. Looking at the Model View you can notice that
the red and yellow surfaces are slightly different, e.g. at the femoral head region.
This is caused by the nature of the interpolation and a low number of control points.
The following section will describe how to utilize surface information for the
construction of an improved scaling law.

## Incorporating Surface-Based Nonlinearities into the Scaling Function

In this section, next improvement to the morphing is added by utilizing
surface information. The surfaces will be requested to be morphed into each
other, which will at the same time deform all related soft tissue attachment
points accordingly. The `AnyFunTransform3DSTL` class is used for this purpose.
This class constructs an RBF transformation similarly to the `AnyFunTransform3DRBF`
by using either 1) corresponding vertices on the STL surfaces or 2) seeding a number
of vertices on one surface and finding a matching closest point on the second.

:::{note}
For constructing a transformation using the vertices of STL surfaces, the surfaces
have to be topologically equivalent, i.e. the surfaces have the same number of
triangles and each neighbor and vertices represent the same features on both surfaces.
:::

For the latter option, we require an acceptable pre-registration
transform, e.g. the RBF transform that was described previously, in
order for the closest point search to make sense. Due to the implementation
specifics, most of the RBF recommendations apply to this class as well.
More details about how to create this kind of transforms are described in the
{doc}`appendix to this tutorial <lesson1_appendix>`. However, for this example, the
recommended settings mentioned before will be used again.

You can download the model with all modifications so far 
{download}`here <Downloads/lesson1c.Main.any>`.
Now let us repeat the step from the previous section first by defining the new 
scaling transformation using `AnyFunTransform3DSTL` and naming it "MySTLTransform":

```{literalinclude} Snippets/lesson1/snip.Femur.main-5.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

Then we add a new `AnyDrawSurf` object to visualize the surface of this new
transformation:

```{literalinclude} Snippets/lesson1/snip.Femur.main-5.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 2
:end-before: //# END SNIPPET 2
```

```{image} _static/lesson1/image5.png
:alt: Target, linear, and RBF, RBF-STL scaling
:class: bg-primary
:align: center
:width: 60%
```

Please note again the transform from the previous section of this
tutorial was included as a pre-transform, which means we will start working with
the result of the previous step. Reloading the model, we can now see all steps
of scaling in one place and can switch them on and off. For example, let us try
to hide affine and RBF scaled femurs to see the final results:

```{image} _static/lesson1/image6.png
:alt: RBF, RBF-STL scaling
:class: bg-primary
:align: center
:width: 60%
```

If we just look at the yellow target surface and the blue STL-transformed
surface, we can see that the surfaces now match each other very well. That means
that now the subject-specificity will be taken into account in the inverse
dynamics simulation. The final model can be downloaded 
{download}`here <Downloads/lesson1d.Main.any>`.

```{toctree}
:hidden: true

 Lesson 1 appendix <lesson1_appendix>
```

Finally, the only thing left is to include this scaling function into an
actual model. {doc}`Lesson 2 <lesson2>` describes how this can be
done.