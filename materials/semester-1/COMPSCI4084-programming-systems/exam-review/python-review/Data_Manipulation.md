# Data_Manipulation

The merge() 
function is used to combine data through the connection of the rows using one or more keys (
id
 field in this example).
The returned 
d
ataframe
 consists of all rows that have an ID in common
Merged files without specifying any column
Data Manipulation - Merging

Data Manipulation - Pivoting
After putting together the data in order to unify the values collected from different sources, the values can be arranged and rearranged by column values on rows or vice versa. This is operation is know as 
pivoting
. 
In pivoting you have two basic operations:
Stacking
 – rotates or pivots the data structure converting columns to rows
Unstacking
 – converts row to columns

Combining
Sometimes, a combination of data cannot be obtained either with merging or with concatenation.
This can be applied to series using the  
combine_first
() function 
For example we want the two datasets to have indexes that overlap partially or entirely. 

The same logic of concatenation applied to the series can be applied to the 
dataframe
Data manipulation - Concatenating 
Dataframes

To create a hierarchical index on the concatenation, use the 
keys
 option.
In the case of combinations between series along the axis = 1 the keys become the column headers of the 
dataframe
.
Data Manipulation - Concatenating 
Series

Data Manipulation - Concatenating 
Series
With pandas library and its data structure like 
series
 and 
dataframe
, having labelled axes allows further generalisation of the concatenation of arrays.
The 
concat
() 
function

Data 
Manapulation
 - Concatenating
Concatenation
 is another type of data combination.
N
umPy
 provides a 
concatenate() 
function to combine arrays

Instead of considering the columns of a 
dataframe
 as keys, indexes could be used as keys for merging. Set
 left_index 
or 
right_index
 options to True to activate which indexes to consider.
The 
join() 
function is more convenient when you want to merge by indexes. When some columns in frame3 have the same name as the columns in frame4, rename the columns in frame4 before launching the 
join() 
function.
Data Manipulation - Merging

When two dataframes have columns with the same name, it is necessary to explicitly define the name of the key column in the 
on
 option.
 
Data Manipulation - Merging
Criteria for merging: ID
Criteria for merging: brand

Data Preparation - Pivoting
Using the stack() function on the 
dataframe
, you get the pivoting of columns in rows, thus producing a series
Initial 
dataframe
Reassemble the table with unstack() function
You can also unstack on a different level

Pivoting a type of dataset that have entries on various columns, sometimes duplicated lines – e.g.. A log file that is accumulating data. 
This can be difficult to read and in fully understanding the relationship between the key values and the rest of the columns.
Instead of long format, the data can be arranged in a table that is 
wide
 using the 
pivot() 
function.
Pivoting from ‘Long’ to ‘Wide’ format
Pivot() function allows you to transform a 
dataframe
 from the 
long
 to the 
wide
 type. More efficient and takes less space
Long type: difficult to read and understanding in more complex data

Data preparation - Removing
The last stage of data preparation is the removal of columns and rows.
In order to remove a 
column
, use 
del
 command applied to the 
dataframe
 with the column name specified.
To remove a 
row
, use the 
drop()
 function with the label of the corresponding index as argument
Initial 
dataframe
Removing a column called 
ball
Removing a row called 
white

Data Aggregation – Hierarchical Grouping – using various columns

Data Aggregation – Grouping to a single column of data
Define a 
dataframe
 containing numeric and string values
Access the price1 column and call the 
groupby
() function with the 
color
Dataframe
 divided into groups of rows
mean of groups in price1
Sum of groups in price1

Data Aggregation
Last stage of data manipulation.
I
nvolves a transformation that produce a single integer from an array.
Pandas provide a flexible tool for data aggregation: 
GroupBy
The process of 
GroupBy
 is divided into various phases:
Splitting
 – Division into groups
Applying
 – Application of a function on each group
Combining
 – Combination of all the results obtained by different groups.

Pandas - Data Manipulation

Adding Values via Mapping
The 
map() 
function applied to a series or to a column of a 
dataframe
 accepts a function or an object containing a 
dict
 
with mapping.
Initial 
dataframe
 without the price column
Define a dictionary object that contains a list of prices for each type of item.
Add the price column to the frame using 
map()

Replacing values via mapping
To replace the incorrect values, 
first
 define a mapping of correspondences containing as a key the new value.
Initial 
dataframe
 with incorrect values: 
rosso
 and 
verde
Use the 
replace() 
function with the mapping as argument to replace the incorrect values

Data Transformation - Mapping
Mapping is the creation of a list of matches between two different values, with the ability to bind a value to a particular label or string.
The 
replace() 
function replaces values
The 
map() 
function creates a new column.
The 
rename() 
function replaces the index values.

Data Transformation – Removing Duplicates
The 
duplicated() 
function detect the rows that are duplicated. It returns 
True
 if a row is duplicate and 
False
 if it is not.
The 
drop_duplicates() 
function will return the 
dataframe
 without duplicate rows
Identify the duplicate rows and in this case these are rows 1, 3 and 4
delete duplicated rows
Detect duplicated rows
Initial 
dataframe

Replacing values via mapping

