# Python_-_Files_and_Exceptions(2)

Files and Exceptions

File
Files are suitable for storing results that are needed for an extended period of time, and for holding input values for a programme that will run several times.
Files are classified as text file or binary file
Text files: Can only contains characters using an encoding system such as ASCII and UTF-8. can be viewed and modified using any text editor. 
Binary files: sequence of bits. Can contain any type of data, not just characters. E.g. images, sound, videos.

Opening a File
A file must be opened before data values can be read from it and before new data value are written to it.
Files are opened by calling the 
open
 function.
The 
open
 function takes two arguments: The string that contains the name of the file and the string that indicates the 
access mode 
for the file.
Access modes: read (denoted by “
r
”), write (denoted by “
w
”) and append (denoted by “
a
”)
A 
file object 
is returned by the open function.
Once a file is opened, methods can be applied to the file object to read data from the file or to write data to the file.
The file should be closed once all of the values have been read or written using the 
close
 function.

Reading Input from a File
Can only read from a file when it is in read mode otherwise it crashes if it is in any other mode.
Readline
 method reads one line from the file and returns it as a string, much  like the input function reads a line of text typed on the keyboard.
Readline
 returns an empty string when there is no further data to read from the file.
Our list: numbers

Reading Input from a File
Sometimes it is helpful to read all of the data from the file instead of reading one line at a time..
The
 read 
method or the 
readline
s method can help accomplish that.
The 
read 
method will return the entire content of the file as one string – further processing is required to break the string into smaller pieces
Readlines returns a list where each element is one line from the file. Once all the lines have been read, a loop can be used to process each element in the list. 

Writing Output to a File
When a file is opened in 
write
 mode, a new empty file is created
So if that file already existed then it will be deleted and all data in it will be lost.
Open an existing file in 
append
 mode to write data at the end of that file.
If the file opened in 
append
 mode does not exist, then a new file will be created.
The 
write
 method can be used to write data opened either to 
write
 mode or 
append
 mode.
It takes one argument, a string. Convert other value types to string using the 
str
 function.
Unlike 
print method
, the 
write
 method does not automatically move to the next line.  
\n 
denotes end of line marker.
This programme writes the numbers from 1 up to (including) a number entered by the user to a file

Reading and Writing to a 
.csv 
File
.CSV (Comma Separated Values) is associated with importing and exporting spreadsheets and databases.
Allows greater control over data
When opening a
 .csv 
file, you must specify how that file will be used. The options are:
Code
Description
‘w’
Creates a new file and writes to that file. If the file already exist, a new file will be created, overwriting the existing file
‘x’
Creates a new file and writes to that file. If
 the file already exits, the programme will crash rather than overwriting it.
‘r’
Opens for reading only and will not allow you to make any changes. 
‘a’
Opens for writing, appending to the end of the file

Reading and Writing to a 
.csv 
File
A .csv file cannot be altered, only added to. If you need to alter the file, you need to write it to a temporary list. This code reads the original file and write it to a list called “
tmp
”
Writes from a list to a new csv file called “NewStars.csv”

More code example - Writing and reading
The 
file.close
() function at the end of the code tells Python the task of creating or reading 
is complete.

Command Line Arguments
Being able to provide input from the command line is beneficial when writing scripts that use multiple programmes to automate some tasks and programmes that are scheduled to run periodically.
Any command line argument provided when the programme was executed are stored into a variable named
 
argv
 
(argument vector) that resides in 
sys
 (system)
This programme demonstrates accessing the argument vector.

Command Line Arguments
Command line arguments can be used to supply any input values to the programme that can be typed on the command line such as integers, floating-point numbers, and strings

Exceptions
Exceptions
 are those errors that the user can make. For example, a user can supply a non-numeric value when a numeric value was expected.
By default a Python programme will crash when an
 exception 
occurs.
So the programmer must indicate where an 
exception
 might occur in order to catch it.
The programmer must also indicate what code to run to handle the 
exception
 when it happens.
Try
 and 
except
 are used.
The code that might cause an exception that we want to catch is place inside the 
try
 block
The 
try
 block is immediately followed by one or more 
except
 blocks.
When an 
exception
 occurs inside  a 
try
 block, execution immediately jump to the appropriate 
except
 block without running any remaining statements in the 
try
 block.
An 
except
 block that does not specify a particular 
exception
 will catch any type of 
exception
 (that is not caught by another 
except
 block associated to the same 
try
 block.
The
 except 
block only execute when an 
exception
 occurs.

Exceptions example code
A user can re-enter the name of the file. However this can also cause an exception. A loop is used to run until the user enters the name of the file successfully. 
The try 
and except are inside the loop 
Quits when the file requested by the user is not found which is not always ideal.

