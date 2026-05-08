% Disable inline anyscript highlighting.

```{highlight} none
```

::: {rst-class} break
:::



# Lesson 2: ANSYS Interface

This chapter shows how to use AnyBody features to apply boundary
conditions to a Finite Element Model generated in ANSYS. This is current
work in progress; we assume the workflow will be even smoother in the
future. 

You need an additional add-on to the AnyBody Modeling System to
run this tutorial. This is needed to convert the AnyBody output to ANSYS
APDL code. Please, download the tool named "AnyFE Tool for Ansys (APDL code generator)" from the 
[AnyBody Technology webpage](https://www.anybodytech.com/resources/customer-downloads#fe-interface-tools).

The model we will have a look at is a clavicle midshaft fracture. We will
analyze the muscle forces acting on the clavicle during lifting his arm and
analyze the stress in the implant. The template model "Human Standing" taken
from the AMMR version 3.1.4 will be used. The basic general workflow to perform
analyses like this is shown in the figure below.

```{image} _static/lesson2/image1.png
:alt: FEA tutorial flow chart
:class: bg-primary
:align: center
:width: 70%
```

Here we will focus on the link between AnyBody and ANSYS. So we assume
we have a “ready to go” Finite Element model which basically only lacks
its boundary conditions. *(This model could be e.g. generated from
medical image data. The AnyBody model has to be scaled to fit to the
actual case (it can be beneficial to import the .stl file of the bone in
question into the AMS to scale the model accordingly. Please note, the
bone will not actually change the musculoskeletal system if you don’t
change the model definition). Please refer to scaling tutorial for
details on this matter.)*

In this tutorial we will use a bone derived from a standard scaled
AnyBody model, so no scaling has to be applied here.

## Building the AnyBody Model

Let’s start with the AnyBody part. We have to make sure the two models in the
two systems are aligned. The idea is to include local reference frames in both
systems which will be used for all further data transfer. Open template model
"Human Standing" from the AMMR, or better make a copy of the whole model folder
and use this one. In this tutorial AMMR version 3.1.4 is used, but the same
workflow should work equally well for newer versions as well. 

For convenience we will reduce the model detail by excluding the left arm and
switching off the muscles in all body parts, except the right arm. This is done
in the `BodyModelConfiguration.any` file with the following code,

```{literalinclude} Snippets/Lesson2/Model/BodyModelConfiguration.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

Next we define the local ref frame on the clavicle. All forces will be later
exported with respect to this coordinate system. You can either use a
pre-defined reference system in the AMS or create a new one. Insert the
following lines in the file `Environment.any` below the definition of the global
reference frame to create a new node and local reference frame located in the
Sternoclavicular joint:

```{literalinclude} Snippets/Lesson2/Model/Environment.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

Now, when reloading the model should look like the below image, with the
reference frame shown.

```{image} _static/lesson2/image2.png
:alt: Clavicular reference frame
:align: center
```

Next, we have to define the same local coordinate system in the ANSYS
model. Download the prepared ANSYS file
{download}`here <Downloads/clavicular_base.zip>` and save it in your working
directory. Load the `clavicular_base.db` in the Mechanical
APDL (ANSYS) environment and have a look.

In the Mechanical APDL (ANSYS) environment (ANSYS Classic), a simple way to
define the local coordinate system is to modify the location of the work plane.
From the top menu selecet 'WorkPlane' -> 'Align WP with' -> 'Nodes +' to define
the origin and direction of the work plane. Once the work plane is in place
create a local coordinate system at the workplane origin and give it the number
1000, by selecting 'WorkPlane' -> Local Coordinate Systems' -> 'Create Local CS'
-> 'At WP origin...'. In fact you can give the local coordinate system any
number, but we have to refer to the coordinate system later, so we have to know
its name.

```{image} _static/lesson2/image3.png
:alt: ANSYS nodes
:class: bg-primary
:align: center
```

This shows the clavicle model, which contains a midshaft fracture,
modeled with a reduced stiffness and treated with a plate fixation.

Next, we want to analyze the forces in the AnyBody Model. Change the
`Mannequin.any` file to create the desired motion. We want to analyze a simple
lifting case, so all we specify is flexion in the shoulder joint. Open the
`Mannequin.any` file and look for the `PostureVel` folder. Set
`GlenohumeralFlexion = 150/Main.Study.tEnd`, this determines the joint
velocity necessary to reach 150 degree flexion taking into account the
simulation time.

```{literalinclude} Snippets/Lesson2/Model/Mannequin.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

We also want to alter the initial starting position for the motion.
In the `Posture` folder also in the `Mannequin.any file`, make the changes indicated below.

```{literalinclude} Snippets/Lesson2/Model/Mannequin.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 2
:end-before: //# END SNIPPET 2
```

We want this motion to be done in 10 seconds and analyze 5 time steps.
This can be set in the main file. In the Study folder and change the
end time of the study to `tEnd = 10` and the number of time steps to `nStep = 5`.

```{literalinclude} Snippets/Lesson2/HumanStanding.main.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 1
:end-before: //# END SNIPPET 1
```

Now, we have to specify which forces we want to export to the FE model.
For this we make use of the Class inserter. Place you cursor in the
Study folder in the main file, below the code shown above and select the
Classes tab on the right side of the main file window. Search for the
class named "AnyMechOutputFileForceExport", right click on it and choose
*Insert class template.* This will insert the class necessary for force
export.

```AnyScriptDoc
AnyMechOutputFileForceExport <ObjectName> = {
    FileName = "";
    /*NumberFormat = 
    {
    Digits = 15;
    Width = 23;
    Style = ScientificNumber;
    FormatStr = "";
    };*/
    //UseRefFrameOnOff = Off;
    //AllSegmentsInStudyOnOff = Off;
    //XMLformatOnOff = Off;
    //RefFrame = Null;
    //Segments = ;
    //MeshRefFrames = ;
    //ForceObjectExclude = ;
    //ForceObjectList = ;
    //AnySeg &<Insert name0> = <Insert object reference (or full object definition)>;
    //AnySeg &<Insert name1> = <Insert object reference (or full object definition)>; You can make any number of AnySeg objects!
    //AnyRefFrame &<Insert name0> = <Insert object reference (or full object definition)>;
    //AnyRefFrame &<Insert name1> = <Insert object reference (or full object definition)>; You can make any number of AnyRefFrame objects!
};
```

Create two new folders in your working directory (meaning the folder containing
your main file) named `files_in` and one named `files_out`. This will be used to
store the FE files. Change the inserted class as shown below. These definitions
specify that a new xml-file named "clavload.xml" will be created in the
"files_in" folder, in which  all forces acting on the segment Clavicula will be
written. The `UseRefFrameOnOff` option allows giving a reference frame in which
all forces are reported. This option is switched on and `RefFrame` specifies
this reference frame as the one we created before. If the below path for the
reference frame is not correct, you can find it by browsing the model tree on
the left side of the main file window to the right clavicle and right click
*Insert object name*.

```{literalinclude} Snippets/Lesson2/HumanStanding.main.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 2
:end-before: //# END SNIPPET 2
```

This class will write all the muscle and joint forces for all time steps in one
xml-file. We need one more step to convert the xml file to ANSYS APDL language.
The add-on "AnyFE Tool for Ansys (APDL code generator)" you downloaded at the
beginning of this tutorial is necessary to do so. This tool is available at the
[AnyBody Technology webpage](https://www.anybodytech.com/resources/customer-downloads#fe-interface-tools).

Save the downloaded files in your working directory. In the downloaded folder
"AnyFE2APDL" an executable named "AnyFE2APDL.exe" is included. This file
translates the xml code to APDL. The downloaded folder "examples" contains a
template for the APDL specification named "APDLTemplate.txt". You can call the
converter tool either by a shell prompt or from inside AnyBody. To call it
inside the AnyBody model, use the class `AnyOperationShellExec` for this. The
name of the executable, its working directory (specified as the "AnyFE2APDL"
folder) and the options for the call of the executable file have to be given.
The options specify the input file (`-i`) as the "clavload.xml" in the
"files_in" folder, and the output file folder (`-o`) as the "files_out" folder.
The `–t` option gives the template for the APDL conversion, here given as the
"APDLTemplate.txt". Please, adjust the path corresponding to your setup and
insert this code below the study folder:

```{literalinclude} Snippets/Lesson2/HumanStanding.main.any
:language: AnyScriptDoc
:start-after: //# BEGIN SNIPPET 3
:end-before: //# END SNIPPET 3
```

For the operation `AnyOperationShellExec` to work, you must include your AnyBody license
file in the same folder as the executable "AnyFE2APDL.exe". To find your license file,
click 'Help' in the top menu of your AnyBody window. Then click
'Registration...' and 'View license status'. A window will open where the
location of your license file is shown under the heading 'License file(s):'. Go
to the file location and copy your license file to the folder where the AnyFE2APDL
converter is located. (IMPORTANT: do not delete the original license file when
copying it)

```{image} _static/lesson2/image5.png
:alt: License file location
:class: bg-primary
:align: center
```

The basic procedure of the conversion done by the AnyFE2APDL tool is:

- Create local coordinate systems for each muscle insertion and joint
  point
- Apply forces to the points
- Create beam connections between the force application points and the
  bone surface

Let’s have a closer look at the APDL template. Open the APDLTemplate.txt
file in a text editor. It is structured in three sections; a head
string, a tail string and a final string. The first string contains
basic definitions, the second applies the forces and creates the beam
connections for each force point, the third gives some solution options
and a solve command. The file is created in a way that it assumes the
local coordinate, in which all forces are given, is named 1000, and
the material numbers of implant and fracture are between 50 and 60. The
template can be altered to fit to your actual problem. 

**👉 Now**, one thing you have to change is the name of the file and the path to
your FE model. Please, open the template file and change the line shown below to
fit to your setup. You have to include the path to your model and name the file
'clavicular_base' as below.

```console
RESUME,'clavicular_base','db','C:\Users\jha\Desktop\AnsysTutorial\HumanStanding',0,0
```

Finally, we also need to adjust the scaling between the AnyBody and Ansys models
defined in the template file. By default the template uses a scaling of 1000,
but in this case we have a scaling of 1. Set 'scale = 1' in the
template file as shown below.

```console
!Definition of the beam elements connecting the muscle insertion points with the bone surfaces
/prep7
scale =1
```

Now, we are ready to run the analysis and convert the data. Reload the
Anybody model. Select `RunApplication` in the Operations tree. This
will automatically run the `Calibration` and `InverseDynamics` studies. Next,
select `ConvertToAPDL` and run it. This will create 5 files in the
`files_out` folder written in APDL language.

## Running the ANSYS Analysis

Open ANSYS Mechanical Utility and read the input of each individual file by
clicking 'File' -> 'Read input from...'. This will load the model and apply the
boundary conditions. You can either read one input file at a time or simply read
the "outputfileList" file to input all files in one go. Once all files are loaded, 
you can solve the model and post-process the results. 

Below you see a contour plot of the total displacement magnitude (vector sum). 

```{image} _static/lesson2/image4.png
:alt: Ansys stresses
:class: bg-primary
:align: center
```

This concludes the tutorial about how to use AnyBody Modeling System to generate
boundary conitions for a Finite Element Model in Ansys. In the next chapter we
will have a look at how to use the same workflow to generate boundary conditions
for a Finite Element Model in Abaqus.
