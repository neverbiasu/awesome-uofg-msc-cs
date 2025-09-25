# Pandas-reading and writing

Interacting with Databases – SQLite3 
Create a dataframe 
that will be used 
to create a new table on the SQLite3 database
Implement the connection to the SQLite3 database
Convert the dataframe
Read the database with the 
read_sql
() function with the name of the table and the engine

The DataFrame
A common data structure used in Python is a 
nested dict
. When it is passed directly as an argument to the DataFrame() constructor, pandas will treat external keys as column names and internal keys as labels for indexes.
Fields with no match are assigned the 
NaN
 value.
Transposition
: columns become row and rows become columns. It is achieved by adding the T attribute to its operation

The DataFrame
Tabular structure very similar to a spreadsheet.
Designed to extend series to multiple dimensions.
Consists of an ordered collection of columns, each of which can contain a value of a different type (numeric, string, Boolean, etc.)
Unlike series which have an index array containing labels associated with each elements, the dataframe has two index arrays.
It can be understood as a dictionary of series where the keys are the column names and the values are the series that will form the columns of the dataframe
Define a dataframe
We can select the data we want to display. Use column option to specify the sequence of columns. dataframe

The Series
We can create a series from a previously defined dictionary. The array of the index is filled with the keys while the data are filled with their values.
We can also define the array indexes separately. As seen, if there is a mismatch, pandas will add the NaN value.
We can perform operations between two series. Series can align data addressed differently between them by identifying their corresponding labels.

The Series – NaN Values
NaN
 (Not a Number) is used in pandas data structures to indicate the presence of an empty field or a non-numeric 
element. To define a missing value, we enter 
np.NaN
.
The 
isnull() 
and 
notnull() 
functions are useful to identify the indexes without a value.
The 
isnull() 
returns 
True
 at NaN values in the series. 
The 
notnull() 
returns 
True
 if they are not NaN.
These functions are often put inside filters to make a condition

The Series – Evaluating Values
The 
unique () 
function will tell us all the values contained in a series, excluding duplicates
The
 value_counts() 
will return the unique values but also calculate the occurrences within a series.
The 
isin() 
function tells us if the values are contained in the data structure. Boolean values returned can be can be very useful when filtering data in a series or in a column of a dataframe.

The Series
Declaring a series
Selecting one internal element
Selecting multiple elements
Assigning a value to an item using its index. 
Declaring a series, assigning an index
Assigning a value to an item using 
its label
Filtering values
Operators (+,-,* and /) and mathematical function that are applicable to 
NumPy
 array can be extended to Series

Basic introduction
pandas (
Python Data Analysis 
Library) is a library specialized for data analysis and used a series of I/O API functions to read and write data as dataframe objects.
Python IDE (Integrated Development Environment):
Jupyter
 Notebook or 
Spyder
.
E
asiest 
way to get Pandas set up is to install it through a package like the Anaconda distribution
.
Primary data structures on which all transactions are centred (generally made during the analysis): 
Series: 
Object of the library designed to represent one-dimensional data structure.
 
Dataframes: 
More complex data structure designed to contain cases with several dimensions.
 

Pandas: 
Data 
S
tructures, Reading 
and Writing

Reading Data in CSV or Text files
Most common operation for data analysis is to read the data contained in a .CSV file of even a text file.
To achieve the, we must import the following libraries 
numpy
 
and 
pandas
 in our 
Jupyter
 Notebook
The 
read_csv()
 function will read the content of the 
.csv 
file and convert it to a 
dataframe object.
Original texting.csv and texting.txt files as seen in the spreadsheet and notepad

When using 
read_table
() 
function to read a csv or txt file, specify the delimiter otherwise, the data will not be in a tabulated format.
Reading Data in CSV or Text files
Output of 
read_table
() 
function without specifying the delimiter
Output of 
read_table
() 
function with specified delimiter

pd.read_csv
('Documents/texting.csv', 
header=None
): 
This will tell pandas to assign the default name to the columns.
You can specify 
the names directly by assigning a list of labels to the name 
options 
pd.read_csv
('Documents/texting.csv', 
names=[‘
white’,’red’,’blue’,’green’,
’animal
]
)
Create a dataframe with a hierarchical structure by extending the functionality of the 
read_csv()
function by adding the 
index_col
 option.
Reading Data in CSV or Text files
Original Hierarchical data

p
andas.io.sql
 module provides a unified interface independent of the DB called 
sqlalchemy
. This interface simplifies the connection mode, regardless of the commands will be always be the same.
The 
create_engine() 
function is used to make a connection.
Example of code for connecting different databases.
Interacting with Databases

Reading and Writing HTML & Excel Files
t
o_html
() 
function will convert a dataframe into an HTML table.
r
ead_html
() 
function returns a list of dataframes even if there is only one table.
t
o_excel
() 
function to 
convert a dataframe into a spreadsheet on Excel.
read_excel
() 
read the data contained in the excel file and convert it into a dataframe

Writing Data in CSV
to_csv
() 
: Function used to write the data contained in a dataframe to a csv file.
The 
index
 and 
header
 to 
False
 options are used to remove the default indexes and columns that are marked on the file by default.

Reading TXT Files into Parts
To read only a portion of the file, you can specify the numbers of lines on which to parse. You can use the 
nrows
 and 
skiprows
 options.
Original dataframe
Dataframe after using 
nrows
 and 
skiprows

With the 
skiprows
 
option, you can exclude the lines you want.
Using 
RegExp
 to Parse TXT files - Examples
Original texting2.txt file dataframe
texting2.txt file dataframe after skipping the first three rows

Using 
RegExp
 to Parse TXT files - Examples
This example extract the numeric part from a texting3.txt file. Header option = None because the column heading is not in the texting3.txt file.

Sometimes the files on which to parse the data do not show separators such as comma or a semicolon. 
Regular expressions can be used as criteria for value separation.
Using 
RegExp
 to Parse TXT files
.
Single character, except newline
\d
Digit
\D
Non-digit character
\s
Whitespace character
\S
Non-whitespace character
\n
New line character
\t
Tab character
\
uxxxx
Unicode character specified by the hexadecimal number 
xxxx

