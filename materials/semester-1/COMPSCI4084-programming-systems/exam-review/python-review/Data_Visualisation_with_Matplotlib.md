# Data_Visualisation_with_Matplotlib

Line Charts
The simplest chart
Linear chart is a sequence of data points connected by a line.
Each point consists of a pair values
(
x,y
)
You can use the 
color
 and 
linestyle
 kwargs to define the stroke.
The table below presents the different colour codes

A simple Interactive Chart
A simple plot: A blue line connection the points
Set the properties of the plot. Each pair of values(
x,y
) is represented by a red dot.

Matplotlib
We can visualise a dataset 
in 
Jupyter
 Notebook using Pandas and Matplotlib libraries.
Matplotlib
 is a python specialising in the development of two dimensional chart (including 3D charts)
Most used tool in the graphical representation of data.
The 
pyplot
 package provides classic Python interface for programming the 
matplotlib
 library.
Pyplot requires the import of 
Numpy
 package separately.
At the beginning, you need to import pyplot and rename is as plt:
		
import matplotlib.pyplot as plt

Data Visualisation with Matplotlib

Histograms
A histogram consists of adjacent rectangles erected on the 
x-axis
, split into discrete intervals called 
bins
. X-axis is used to reference numerical values.
The 
hist
()
function allows you to represent a histogram
.
Practical example: 
Let’s generate a population of 100 random values from 0 to 100 using 
random.randint
() 
function as seen below. 

Histograms
Now we will create the histogram of these samples by passing as an argument the 
hist
() 
function.
We want to divide the occurrences in 20 bins (if not specified, the default value is 10 bins)
To do that, we have to use the kwarg 
bin
.
The histogram shows the number of occurrences in each bin
Default: 10 bins
20 bins
1
2
3
4
5
6
7
8
9
10

Bar Charts
Another common type of chart, similar to histogram but the x-axis is used to reference categories.
The 
bar() 
function is used to create a bar chart.
This bar chart shows that the indices are drawn on the x-axis. But because each bar corresponds to a category, it would be best if we can specify the categories through the tick label.

Bar Chart
The tick label is defined by a list of strings passed to the 
xticks
() 
function.
For the location of the ticks, we have to pass a list containing the values corresponding to their positions on the x-axis as the first argument of the 
xticks
() function.

It is possible to plot three different trends in the same plots.
The example below shows three sinusoidal trends.

Using the kwargs
The object that makes up the chart have many attributes that characterise them. The attributes are all default values but can be set through the use of 
keyword args 
known as 
kwargs
.
These keywords are passed as arguments to functions.
For example the thickness of a line can be changed if we set the 
linewidth
 keyword.

Working with Multiple Figures and Axes
V
arious subplots can be represented in a single figure.
The 
subplot() 
function subdivides the figure in different drawing areas. It also used to focus the commands on a specific subplot.
The argument passed to the 
subplot() 
function sets the mode of subdivision and determines which is the current subplot. The 
current subplot 
will be the only figure affected by the commands.
The 
subplot() 
function is composed of three integers.
 
the first number determines how many parts the figure is split into vertically
The second determines how many parts the figure is split into horizontally.
The third number selects which is the current subplot on which we can direct commands.

Handling Date Values

Saving charts as Image

Adding a Legend
A legend is added in the upper-right corner by default.
You can use the 
loc
 keyword to change this behaviour. This can be achieved by assigning numbers from 0 to 10 to the 
loc
 kwarg. Each number characterises one of the corner of the chart and the default value is 1, the upper-right corner.
In this example, the 
loc
 
kwargs was set to 2, which is upper-left

Adding a Grid and a Legend
The 
grid() 
function and 
legend() 
function

Adding a Title and Text
The 
text() 
function and the 
title() 
function

Examples: two sinusoidal trends (sine and cosine)
In the first image below, the canvas is divided in two horizontal subplots with number 
211
 and 
212
 as arguments to the 
subplot() 
function.
In the second one, the canvas is divided in two vertical subplots (121 and 122)
Working with Multiple Figures and Axes

Line charts with 
D
ataframe
The visualisation of the data in a 
dataframe
 as a linear chart is very easy.
Pass 
the 
dataframe
 as an argument to the plot() function to obtain a 
multiseries
 linear chart

Bar Chart – Using kwargs
We can add a specific kwarg as an argument in the 
bar() 
function.
In the next example, we add the standard deviation values of the bar through the 
yerr
 kwarg along with a list containing the standard deviations.
The kwarg is usually combined with another kwarg called 
error_kw
, which, in turn, can be used with other kwargs such: 
eColor
: specifies the colour of the error bars)
c
apsize
: defines the width of the transverse lines that mark the ends of the error bars.
The 
alpha
 kwarg indicates the degree of transparency of the coloured bar. Alpha is a value ranging from
 0 
to 
1
. When the value is 0 the object is completely transparent to become gradually more significant as it increases. When the value reaches 1, the colour is fully represented.
A legend is recommended. We use the kwarg 
label
 to identify the series we represent.

Horizontal Bar Charts
Horizontal bar chart are implemented using the 
barh() 
function.
The arguments and the kwargs valid for the bar() function remain the same for this function.
The only change is that the roles of the axes are reversed. Now the categories are represented on the y-axis and the 
numreical
 values are on the x-axis.

Advanced chart – Contour plot
Contour plot or contour map is suitable for displaying three-dimensional surfaces.
You need to 
z =
f
(
x,y
) 
for generating a three-dimensional surface.
Define a range of  values for 
x,y
 that will define the area of the map to be displayed.
Then calculate the z values for each pair 
(
x,y
), 
applying the function 
f
(
x,y
) 
in order to obtain a matrix of z values.
Finally, use the 
contour() 
function to generate the contour of the map.
Areas delimited by the curves of level are filled by a colour gradient, defined by a colour map. For example negative values can indicate dark shades of blue and move to yellow and then red with the increase of positive values.

You can choose among a large number of 
color
 map available by specifying them with the 
cmap
 
kwarg.
Same example as previous with the ‘hot’ 
color
 map gradient.
To add a colour scale as a reference by the side of the graph, use the 
colorbar
() 
function.
Advanced chart – Contour plot

Using mplot3d Toolkit for 3D Surfaces
The mplot3d 
toolkits is included in all standard installation of 
matplotlib
 and allows us to extend the capabilities of visualisation to 3D data.
We use an object 
called 
Axes3D
from 
mpl_toolkits.mplot3d import Axes3D
In this example, we use the same function: 
z 
=
f
(
x,y
)
used for contour map
Once we have calculated the 
meshgrid
, we can view the surface with the 
plot_surface() 
function.

Use 
cmap
 kwarg to change the 
color
. Rotate the surface by using the 
view_init
() 
function.
The 
elev
 kwarg adjust the height at which the surface is seen and the 
azim
 kwarg adjusts the angle of rotation of the 
surface.
In this example, the 3D surface is rotated and observed from a higher viewpoint.
Using mplot3d Toolkit for 3D Surfaces

Scatter Plots in 3D
The most used among all 3D views is the 3d scatter plot. With this type of visualisation, you can identify if the points follow particular trends and if they tend to cluster.
We use the 
scatter() 
function as the 2D case but applied on the Axes3D object. By doing this, we can visualise different series all together in the same 3D representation.

Subplots Within Other subplots
Since we are talking of frames (i.e. Axes objects), we need to separate the main Axes (i.e., the general chart) from the frame we want to add that will need another instance of Axes.
To do this we use the 
figure() 
function to get the Figure object on which we define two different Axes objects using the 
add_axes() 
function

Box Plots

Scatter Plot
Scatter() 
function 
can be used to create scatter plots where the properties of each individual point (size, face 
color
, edge 
color
, etc.) can be individually controlled or mapped to data.

Pie chart with a pandas 
Dataframe
The pie chart can only represent 
one series at a time
.
In this example, we display only the values of the first series by specifying 
df[‘series1’].
The 
kind
 kwarg is used to specify the type of chart in the 
plot() 
function.
To represent a perfectly circular pie chart, we use the 
figsize
 
k
warg

Multiseries
 Bar Charts
As with line charts, bar charts can be used to display larger series of values.
In a simple bar chart, each index corresponds to a bar and is assigned to the x-axis. These represents categories.
In a 
multiseries
 bar chart, the bars must share the same category.
To overcome that issue, the space occupied by an index is divided as many parts as the bars sharing that index.
It is advisable to add space which will serve as the gap to separate a category with respect to the next.

Uses 
barh() 
function instead of 
bar() 
function.
Uses 
yticks
() 
function instead of 
xticks
() 
function.
Reverse the range of values covered by the axes in the 
axis() 
function.
Multiseries
 Horizontal Bar Chart

Bar Chart – Using kwargs

U
se the 
plot() 
function applied to the 
dataframe
 object.
S
pecify inside a kwarg called 
kind
 to which you have to assign the type of chart you want to represent, which in this case is 
bar 
for vertical bar chart and 
barh
 for a horizontal bar chart
.
Multiseries
 Bar Chart with pandas 
Dataframe

Other Bar Chart
In this example, you want to represent one of the two series in a negative form.
Use the 
facecolor
 kwargs to colour the inner colour of the bar in a different way.
In order to add the 
y 
value with a label at the end of each bar (
good for readability
), you can use a 
for loop 
in which the 
text() 
function will show the 
y
 value. 
You can adjust the label position using the 
ha
 and 
va
, which control the horizontal and vertical alignment.

Pie chart
Use the 
pie() 
function to inherently calculate the percentage occupied by each value.
Use the 
explode
 kwarg to highlight a slice. E.g. Samsung
Use the 
title() 
function to add a title
Set the 
axis() 
function at end to ‘equal’ to have a perfectly spherical pie chart.
User the 
startangle
 to adjust the rotation of the pie. It takes an integer value between 0 and 360 which are the degree of rotation. (0 is the default)
Use the 
autopct
 kwarg to add to the center of each slice a text label showing the corresponding value.
Use the 
shadow
 kwarg to add a shadow to an image by setting it to True.

Stacked Bar Chart with pandas 
D
ataframe
Use a kwarg called 
stacked

