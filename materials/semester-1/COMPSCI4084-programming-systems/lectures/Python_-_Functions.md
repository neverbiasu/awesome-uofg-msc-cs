# Python_-_Functions

Functions with Parameters
Now we want to update our function to enable the user to change the outline (previously 
asterix
) with a different character and fill it with different characters. We add two additional parameters: 
outline
 and 
fill
Output when the function call includes all 4 arguments 
Output when the function call includes the first 2 arguments. The default ones asterisk and empty space are used for 3
rd
 and 4th argument

Functions with Parameters
Our basic example of function, 
drawBox
 works correctly but it is not flexible, so not very useful. 
For it to be useful and flexible, we want our function to draw boxes of many different sizes. 
Our function will take 
arguments
 (see 
previous slide). 
It will receive these argument values in 
parameter variables 
that are included inside the parentheses when the function is defined.
In our example we will add two parameters to the definition of 
drawBox
 which contains 
the 
width and height of the box.

Calling Pre-defined Functions
Many programmes perform many tasks. Some examples: reading input values from the keyboard, sorting a list, and computing the square root of a number, etc.
Python provides 
functions
 that perform these common tasks. These functions have been defined by the people that created Python.
The programme that we create will call these functions so we don’t have to solve these tasks ourselves.
Many functions require values when they are called such as a list of name to sort or the number for which the Square root will be computed. These values are known as 
arguments
 and are placed inside the parentheses when the function is called.
A function call can have many arguments separated by a comma.
Example: This assignment statement calls the 
round
 
function,
 
which rounds a number to the nearest integer. When it is run, the output is:

Defining & Calling Your Functions
A function begins with a line that consists of 
def
, followed by the 
name
 of the function that is being defined, followed by an 
open parenthesis
, a 
close parenthesis 
and a 
colon
.
That line is followed by the body of the function, which is a collection of statements that will execute when the function is called.
A 
function
 is a set of statements that take inputs, do some specific computation and produces output
.
A function is called by its name followed by parentheses.
Calling the function created by the user
output

Functions
A 
function
 is a group of statements that exist within a program for the purpose of performing a specific 
task.
A function is a reusable portion of a program
We 
can break the programme’s code into sections called 
functions
.
 This makes it easier to develop and debug a programme as it grows.
It can be called from 
many locations
.
The 
statements are 
named
 by 
defining
 a function. The statements are 
executed
 by 
calling
 a function.

Functions

Return Values
Our 
drawBox
 function only outputs characters on the screen.
Many functions can take an argument, compute a value that is stored in a variable and used later in the programme.
For example the 
input
 function reads value typed by the user and then returns it so that it can be used later in the programme. Similarly, the 
sqrt
 function in the math module computes the square root of its argument and returns this value that will be used in other calculation
A function returns a value using a 
return
 function
The returned s

Variables in Functions
Local variable
: a variable is created inside a function. Only exists when the function is executing and can only be accessed within the body of that function. Cannot be access when the function returns.
Variables created with assignment statements in the body of a function are also local variables.
The 
drawBox
 function uses several variables.
Parameter variable such as 
width
 and 
fill
 that are created when the function is called
The 
for
 loop control variable, 
i
, that is created when the loops begins to execute.

Turtle Graphics
You can draw intricate shapes using  
turtle
 in Python using programmes 
that repeat simple 
moves such as loops.
As seen in the example, a pentagon is drawn using the code next to it.
Using
 nested 
loops (a loop inside a loop) a beautiful pattern is created.

Random
You can generate random values in Python using 
random 
library
.
These random values can be:
Random numbers  within a specified range.
A
 random choice from a range of items that are input.
n
umber1 = random.random 
will select a random floating-point number between 0 and 1 and stores it in a variable called number1. It is multiplied by 100 to get a larger number
Creates a random floating-point number by creating two random integers within two large range and dividing one by another
Number4: Selects a random whole number between 0 and 9 (inclusive)
Pick a random number between 0 and 100 (inclusive) in steps of ten i.e. 0,10,20,
Picks a random value from the options “red”, “blue” and “green” and stores it as the variable “colour”

Function code example

Maths with Python
As mentioned in the previous slide, Python can perform several mathematical functions. Data is either integer (a whole number) or floating-point number (number with a decimal place). In order to use some of the mathematical functions (e.g. 
math.sqrt
.(num1) 
and 
math.pi
), you will need to import the maths library.  
print(round(
num
, 2)) 
displays the number rounded to two decimals
**
 means to the power of (e.g. 
10
2
 is 
10**2
).
m
ath.sqrt
(number1)
: The square root of a number
n
umber1 = float(input(“Enter number: “))
 Allows numbers with a decimal point dividing the integer and fraction part.
math.pi
 gives the pi to 15 decimal places
x
 // y
: Whole number division (e.g
.
 
15//2 
gives the answer 
7
x
 % y
: Finds the remainder (e.g. 
15%2
 gives the answer 
1
)

I
nput and Output Functions
Read input
Python reads input from keyboard by calling the 
input()
 function.
a = input(): 
A value type by the user will be stored in the variable called a.
The input function always returns a string
Display output
p
rint() 
function. 
Can be called with one argument.
Can print multiple values.
Arguments to a function call can be values and variables. 

Importing Functions into Other Programmes
Import function
Functions like input and print are used in many programmes and are available in those programmes. The less commonly used function are stored in  libraries/modules and need to be imported when needed.
For example, additional mathematical functions are stored in the 
math
 module. Functions in 
math
 module include 
sqrt
, 
ceil
 and 
sin.
A function imported from a module is called by using the module name, followed by a period, followed by the name of the function and its arguments. 
A function call from different locations is easy when the function definition and call locations are in the same file.
If you want to call a function that you wrote for a previous programme while solving a new problem, use the 
import 
keyword, followed by the name of the Python file that contains the function you want (without 
.
py
 
extension). This calls all those functions but also run those programme.
If we only want to call those functions without running the programme, create a function called 
main
 that will contains the statements needed to solve the problems.  Add this line of code to ensure that the 
main
 function does not execute when the file has been imported into another programme.

