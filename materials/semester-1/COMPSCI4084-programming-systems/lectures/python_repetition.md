# python_repetition

Repetition

For Loops
A 
for loop 
allows Python to keep repeating the code a set number of times.
A 
for loop 
is also  known as 
counting loop
.
A for loop executes once 
for
 each item in the 
collection
.
The 
collection
 can be a range of integers, the letters in a string or values stored in a data structure such as list.
Format of for loop: 
      
for 
<variable> 
in 
<collection>
    <body>
This loop uses a variable called “
i
” to keep track of times the loop has been repeated. It will start 
i
 at 
1
 and repeating the loop, adding 
1
 to 
i
 each time and displaying the value of 
i
 until it reaches 
5
, where it will stop. It will not repeat the loop the fifth time and only has the following output: 
1, 2, 3, 4

For Loops: Examples
This range function includes a third value which shows how much is added to 
i
 in each loop (in this case, 2). The output will be: 1, 3, 5, 7, 9
This will display each character in a string called “word” as a separate output(e.g. on a separate line)
This range will 
subtract 4 
from 
i
 each time. The output will be: 20, 16, 12, 8, 4 

While Loops
A 
while loop 
causes one or more statements to execute as long as, or while, a condition is met (evaluates to 
True)
.
In a 
while loop
, the condition is checked before the code is run which means it could skip the loop altogether if the condition is not being met at the beginning.
It is important, to make sure the correct conditions are in place to run the loop before it starts.
Start
Again = “yes”
Does again = “yes”?
Output “Hello”
Do you want to loop again?
Stop
It will keep repeating this code until the user enters anything other than yes

While Loops - example
Example 1: 
This programme will create a variable called total and store the value as 0. It will ask the user to enter a number and will add it to the total. It will keep repeating this as long as the total is still below 100. When the total equals 100 or more, it will stop running the loop and display the total.
Example 2: 
Self –explanatory comments

Nested Loops
The statements inside the body of a loop can include another loop. 
This is known as 
nested loop
In this example of 
nested loop
, we have a 
for loop 
inside a 
while loop
. 

