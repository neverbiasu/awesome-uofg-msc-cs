# python-Basics

Python - Basics

Storing and Manipulating Values
Variable
: A container for a value.
Variables are created using assignment statement. 
The variable can be called whatever you want except Python 
dedicated word
.
The following statement creates a variable named 
y
 and stores 
20
 in it. 
Other examples are seen below.
number1
 = 
100
number2
 = 
20
answer
 = 
number1 + number2
Print (
answer
)
Variable names
Values stored in variables
Python dedicated word
Y = 20

String
: technical name for text. Text values need to be in speech marks (‘’) or (“”) but numbers do not.
Be careful when inputting the following characters into strings as they have special meaning in Python and Python can get confuse if you use them in a string: “ ‘ \
Working with strings
Multiple-Line String
: If you want to put a string across multiple lines, you can either use the line break (
\n
) or you can enclose the entire thing in triple quotes. This will ensure that the formatting of the text remains the same.
Same result for both codes
Codes
Symbol
How to type this into a Python string
“
\
“
‘
\
‘
\
\\

In Python, strings are an immutable 
iterable
 data type. 
Immutable
: This means you cannot change an existing string (their state or content). Cannot be changed after it is created.
If you want to make a change you create a new string that is a variation on the original.
Calling the same method with the same variable or value will guarantee the same output.
 
Iterable
:
 
Anything that can be looped over, that appear on the right-side of the loop.
Working with strings
Other Python objects that are immutable: 
int
, float, bool, 
unicode
, tuple
Other Python objects that are 
iterable
: 
Lists, tuples, dictionaries
, and 
sets

Working with strings
Concatenation
Operator 
+ 
can be used to concatenate the strings. Concatenation means joining together.
Strings can be manipulated with operators and passed to functions. Operations include
Concatenation
Computing the length of a string
Extracting individual characters from a string.

Working with strings
!! String or integer as variable !!
If you define a variable as a string, even if it only contains numbers, you cannot later use that string as part of a calculation unless you convert it to a number. Same applies to defining a variable as integer or floating-point number. You will have to convert it as a string for concatenation to work.
The example on the left throws an error. For this to work, convert the 2
nd
 line into this:         
age = 
str
(
int
(input("Enter your age: ")))
or add this line after the 2
nd
 line:          
age = 
str
(age)
 the you get the result below.

Working with strings
Finding the string’s length
The number of characters in a string is referred to as a string’s length and is computed by calling the 
len
() function. 

Working with strings
Each character in a string has a unique integer index. The first character in a string has index 0.
The last character in a string has an index which is equal to the length of the string, minus one.
A single character in a string is accessed by placing its index inside square brackets after the name of the variable containing the string.
Consecutive characters can be accessed by including two indices, separated by a colon, inside the square bracket
Slicing: taking a small piece of something bigger

Working with strings
Slicing: taking a small piece of something bigger

Working with strings
Strip Strings: 
Python strings have the strip(), 
lstrip
(), 
rstrip
() methods for removing any character from both end of the string.
If the character to be removed are not specified then white-space will be removed.

Working with strings
Split Strings:
 
Split() method break the strings into a number of strings depending on the specified separator.
 
Str.split
(separator, 
maxsplit
)
Example 1: The  separator is white space ‘ ’. We get four strings.
Example 2: The  separator is the full stop ‘. ’. We get two strings.
Example 3: we split after 5 characters. We get 7 strings.
In this example,  separator is white space‘ ’. However, we used 
maxsplit
 (1) which tells to the maximum number of times we want to split the string. We get two strings.
If we don’t use a 
maxsplit
 number, there is no limit to the number of splits performed like in example 1.

Python is 
case sensitive. 
text = 
str.lower
(text)
 changes the text to lower case. As Python is case sensitive, this changes the data input by the user into lower case so it is easier to check. 
text = 
str.upper
(text)
changes the text in upper case.
text = 
str.title
(text)
transforms the text in a title.
Indentation
 is important: It shows the lines that are dependent on others.
Lower, Upper case, Indentation
Working with strings

Working with strings
Testing
A string can be tested for truth value. The return type will be in Boolean value (True or False)
Regular Expression (
RegEx
)
is a sequence of characters that forms a search pattern.
RegEx
 can be used to check if a string contains the specified search pattern.
RegEx
 Module in Python is called 
re

Working with strings
RegEx
 Functions
The re module offers a set of functions that allows us to search a string for a match
Find more at: https://www.w3schools.com/python/python_regex.asp
Function
Description
findall
Returns a list containing all matches
search
Returns a 
Match object
 if there is a match anywhere in the string
split
Returns a list where the string has been split at each match
sub
Replaces one or many matches with a string

Formatting
Integers
, 
floating-point
 numbers and 
strings
 can be formatted so that they occupy at least some minimum width.
Python uses format specifiers, a sequence of characters that describe the formatting.
Floating-point: 
.7f 
indicates that 7 digits should appear to the right of the decimal point.
%5.2f 
format tells Python that the total of at least 5 spaces should be used to display a number, with 2 digits to the right of the decimal point. 
“%d” % x 
(value stored in x is formatted as a decimal (based 10) integer
“%f” % y 
(value is stored in y is formatted as a floating point number)

