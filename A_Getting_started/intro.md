::: {rst-class} break
:::

# Getting Started Tutorial

:::{note} 
The AnyBody software comes with an inbuilt model repository - The
AnyBody Managed Model Repository (AMMR). This tutorial starts with unpacking a
local version of the AMMR. You can skip to {doc}`lesson 1 <lesson1>` if you have
already done this. 
:::

## Goals for this tutorial

This tutorial takes a top-down approach and aims to accomplish the following:

1. Create a new standing model using the Human Standing template model
2. Learn how to load & change the posture of the human model, and use 
the model view window
3. Run an inverse dynamics analysis and review the results

This tutorial relies heavily on using the AnyBody Managed Model Repository (AMMR). 
Follow the steps below to unpack a local version of the AMMR.

# Seting Up the AMMR

*The AnyBody Managed Model Repository* (AMMR) is a comprehensive open library of
musculoskeletal models and examples designed to use with the AnyBody Modeling
System. It allows users to configure and combine different body models, which
can be easily integrated into their own simulations and analyses.

The AnyBody Managed Model Repository (AMMR) is included with the AnyBody
Modeling System, but it needs to be manually installed or unpacked after
installing AnyBody. You can install the AMMR from the AnyBody Assistant dialog
that appears when AnyBody starts.

To get a copy of the latest AMMR files, press the Demo tab in the AnyBody
assistant dialog box. Then select the “Install the demo repository by clicking
this link”

```{figure} _static/intro/image1.png
:alt: AMMR setup
:class: bg-primary
:align: center
```

This installs a copy of the AMMR locally in your documents folder by default. If
there are multiple users using your computer, each of them will have to follow
this guide. It is good practice to create a second local copy of the AMMR so
that you do not overwrite the original AMMR folder by accident. There you can
initialise a git repository in which you can version you models, keep a backup,
or share them easily with the community.

:::{important} 
AnyBody Modelling System comes with a version of AMMR (not necessarily the
latest) placed in the installation folder of the software. Do not directly use
these files for your actual work as updates or reinstallation of AnyBody can
overwrite your changes. So always **copy the files from the AMMR folder to your** 
**working folder** before using them. 
:::

# AMMR structure

Open a file manager and navigate to the directory where you unpacked the
repository (default is your documents folder). You should see a folder structure
that includes the following subfolders:

- **Application**: Includes demo simulations of activities such as cycling,
  lifting a box, or propelling a wheelchair.
- **Body**: Contains models of body parts and collections of body parts such as
  the lumbar spine model, leg models, etc., which are used by the applications.

A closer inspection of the Application branch reveals that it has four subfolders:

- The **Beta** folder contains models that are unfinished but may still be useful.
- The **Examples** folder contains many models of various activities of daily
  living, and it is likely that you will find a model that is similar to your
  own end goal.
- The **MocapExamples** folder contains models utilizing the AnyMoCap framework.
  If you have your own motion capture data, this is a good place to start,
  whether you want to analyze multi-trial/subject MoCap data or a single subject
  wearing an inertial MoCap suit.
- The **Validation** folder contains models that have been used for validation
  purposes, typically by comparison of the model predictions with experimental
  measurements.

:::{admonition} **Continue**
:class: seealso

With that knowledge, you are all set to go, and you can proceed with
{doc}`Lesson 1: Creating the standing model <lesson1>` using the template. :::
