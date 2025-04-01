::: {rst-class} break
:::

(A_Getting_started_modeling)=
# Introduction: Getting Started with Modeling

Developing accurate models of the human body from scratch is an enormous task.
It is thus practical to use the models in the 
[The AnyBody Managed Model Repository](https://anyscript.org/ammr/)
as a starting template for a new application.

The following elements of the AnyScript language make such templating easier:

- Include files - Which aid templating and sharing model components across different applications
- Body model parameters - For customizing the default AMMR body models

The AMMR installation folder also contains a library of 
[demo applications](https://anyscript.org/ammr/Applications/index.html) 
such as MoCap gait, cycling, leg-press exercises etc. If any of these
applications are similar to your end goal you can use the models. To do this,
navigate to the ‘AMMR’ folder in your file explorer and open the ‘Application’
folder. Here, you will find all the available models and examples. Navigate to
the model you want to work on and copy its containing folder and paste it into
your working director. Now, you can safely modify them as required. 

**But in this tutorial, you will build a model from the bottom-up using the AMMR model templates.**

This tutorial is based on version {{ AMMR_VERSION_SHORT }} of the AnyBody Managed Model
Repository. This is the latest AMMR version and the tutorial may not be fully relevant
if you are using an AnyBody Modeling System prior to version {{ AMS_VERSION_SHORT }}. 

With that done, please proceed to Lesson 1: {doc}`Starting with a new Model <lesson1>` using a template.