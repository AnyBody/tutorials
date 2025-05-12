::: {rst-class} break
:::

# Lesson 3: Via-point Muscles

Although the name of the muscle class we have used so far is
`AnyMuscleViaPoint`, the example has only shown the muscle passing in a
straight line between two points. Real muscles in the body rarely do so.
They are usually constrained by various obstacles on their way from
origin to insertion, either by connective tissues or by the contact with
bone surfaces.

In the former case, the muscle tends to pass as a piecewise straight
line between the constrained points, and this is relatively easy to
accomplish by means of an `AnyMuscleViaPoint`. In the latter case, the
muscle may engage and release contact with the bone surfaces it
encounters. This wrapping over bones is a problem of contact mechanics
and optimization. It requires a different muscle class and it is
computationally much more demanding. In this lesson we shall look at
AnyMuscleViaPoints and postpone the discussion of wrapping to the next
lesson.

Anatomically, via point muscles are mostly found in the lower
extremities and in the spine, while the arms and shoulders almost
exclusively have wrapping muscles.

```{image} _static/lesson3/image1.jpeg
:alt: Old leg Muscle wrapping
:align: center
:width: 25%
```

*Most muscles in the legs can be modeled
reasonably with via point muscles.*

```{image} _static/lesson3/image2.jpeg
:alt: Deltoid muscles
:align: center
:width: 25%
```

*The deltoid muscle wraps over the head
of the humerus.*

## Via Point Muscles

Via point muscles pass through a set of at least two points on their way
from origin to insertion. Each of the via points must be attached to a
segment or the global reference frame of the model. The first and the
last of the point sequence are special because the muscle is rigidly
fixed to them and hence transfers forces in its local longitudinal
direction to them. Conversely, the muscle passes through the interior
via points like a thread through the eye of a needle. This means that
the muscle transfers only forces to interior via points along a line
that bisects the angle formed by the muscle on the two sides of the via
point.

Let us modify the model we have been working on to investigate the
properties of via point muscles. Initially we edit the bulging to
facilitate study of the muscle path.

```{literalinclude} Snippets/lesson3/snip.Muscles.main-1.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

We then move the insertion point of the muscle a bit further out and
closer to the axis of the Arm segment to make room for a via point:

```{literalinclude} Snippets/lesson3/snip.Muscles.main-1.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 2
:end-before: //# END SNIPPET 2
```

The next step is to introduce a new point on the Arm segment to function
as the via point:

```{literalinclude} Snippets/lesson3/snip.Muscles.main-2.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

We can then introduce the new point in the sequence of points defining
the muscle:

```{literalinclude} Snippets/lesson3/snip.Muscles.main-2.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 2
:end-before: //# END SNIPPET 2
```

The figure below shows the result:

```{image} _static/lesson3/image3.jpeg
:alt: Simple model with via point muscle
:align: center
:width: 40%
```

A muscle can pass through an unlimited number of via points, and the
points can be attached to different segments. This can be used to create
rather complex kinematic behaviors of muscles, but it also requires care
in the definition to avoid unrealistic muscle paths when the via points
move around with the different segments.

From-the-point of view of kinematic robustness, the wrapping muscles are
easier to handle than via point muscles, but the price is much higher
computationally. Wrapping muscles is the subject of {doc}`Lesson 4 <lesson4>`.

