# Python_-_Data_Structures

Data Structures

Data Structure
So far we have used  variables that can store a single item in them.
 
if you use the 
random.choice
([“blue”, “red”, “black”]) we are picking a random item from the list of possible options. 
One item can hold several pieces of data and in our example above, a collection of colours.
There are several ways that collections of data can be stored as a single item in Python.
List
, 
Strings
, 
Tuples
, 
Dictionary
, 
Deque
, Heap

Lists
List can store different types of data at the same time.
Lists are
 
iterable
: can be looped over
List can be broken in little element called index. The element are numbered sequentially with integer (index), starting from 0. 
Most common way to store a collection of data under one variable name in Python
The square brackets define the group of data as a list.
A list can have another list inside (see example)
Index for each element in the main list. Notice the list inside is considered as a single element with an index of 2
Our list with a list inside it
Index for elements inside second list
Will display element at index 2 of our list
This will display the element at index 0 in our second list
This is the output of the code above

List - Accessing individual elements
The data in a list does not all have to be of the same type. For example, the same list can store both strings and integers or floating point numbers.
List are mutable: The content of a list can change while the programme is running.
An individual list can be updated using an assignment statement. 
The name of the list followed by the element’s index enclosed in squared bracket. In this case we want to replace “Orange” which is at index 1 with “purple”

Loops and List
A 
for
 loop executes once for each item in a collection. The collection can be a range of integer or a list.
Sometimes lists are constructed which iterate over a list’s indices instead of its value using 
len
 function.
Len
 can be used with the 
range 
function: it will construct a collection of integers that includes all of the indices for a list
The first argument is 1 and the second argument is the length of 
data
, which is 4. As a result, range returns a collection of sequential integers from 1 up to and including 3, which is all the indices for all the elements except the first 

Loops and List
A 
while
 loop can also be used when working with lists.

Additional List Operations
Tasks such as inserting a new element into a list and removing an element from a list are performed by applying a method to a list.
A 
method
, much like a function, is a collection of statements that can be called upon to perform a task.
Elements can be added at the end of the list using the 
append
 method
Element can be inserted at any location using the 
insert 
method 
This ask the user to enter a colour and will add it to the end of the list
Here, our new element “I have remove.

Additional List Operations
del
 our_list[4] – deletes item with index 4. This means the 5
th
 item which is 7.
any_list
.sort
 – will sort the any_list into alphabetical order and saves the list in a new order.
This does not work if the list is storing data of different type such as the list we have been using: our_list[].
The 
pop
 method is used to remove an element at a particular index from the list. If the index of the element to be removed is not given as an argument, the last element from the list is removed.
The 
remove
 method can also be used to remove a value from the list. When executed, it removes the first occurrence of its argument from the list 

Rearranging the elements in a List
Two elements in a list can be swapped using a series of assignments statements.
The reverse method will reverse the order of the elements in the list.
The sort method sorts the element in ascending order.
Both sort and reverse can be applied without any argument.

Searching a List
Python’s in operator allows us to determine whether or not a particular value is in the list. If presents, the expression evaluates to True, otherwise False.
The index method is used to identify the position of a particular value with a list

Dictionaries
Allows you to store the data, look up a key then return a value.
The content can be changed while the programme is running
Unlike a list or tuple, does not have an order. It uses a key instead of index.
Determine by the use of braces {}
Each
 value 
in a dictionary must have a 
key
 associated with it. 
The dictionary key can be integers, floating-point numbers or  strings
The value associated with a key can be integers, floating-point numbers, strings or a Boolean value; it can also be a list or another dictionary.
Key-value pair
: A dictionary and its associated value
Key must be unique but values do not have to be unique.
Example2: Creates a dictionary called “colours” where each key is assigned a value.
The key is an integer and value is a string
Example1: the key is a string and value is a floating-point number
Makes changes to the data associated with key

Dictionary – Accessing, Modifying and Adding Values
Accessing a value in a dictionary is similar to accessing a value in a list.
You can access all the dictionary keys by turning the 
dictionaryName.keys
 into a list as seen in the example below. 

Removing a Key-Value Pair & Additional Dictionary operations
A key-value pair is removed using
 
pop
 
the method.
The key to be removed must be provided as argument. When the method is executed, both the key and its value are removed.
The 
len
 function determines how many key-value pairs are in a dictionary. It returns 0 if the dictionary is empty.
The
 in 
operator determines whether or not a particular key or value is present in the dictionary.
The 
in
 operator used with the 
values
 method can be used to determine whether or not a value is present in a dictionary

Loops and Dictionaries
A 
for
 
loop can be used to iterate over all of the keys in a dictionary
A 
for
 loop can also be used to iterate over the values in a dictionary instead of the keys. This is done by applying the 
values
 method, which does not take an argument.

Loops and Dictionaries
Some problems involving dictionary are better solved with a 
while
 loop than 
for
 loops.
For example, the following programme uses a while loop to read strings from a user until 5 unique values have been entered. Then all of the strings are displayed with their counts

Tuples
Similar to list, just few differences:
Once you have created a tuple, it cannot be changed. 
Immutable
 data type. 
Iterable
 - It can be looped over.
Similar to a string, a tuple does not support item assignment.
Tuples are good for storing data that you don’t want to be accidentally changed. They are usually used for menu items that would not need to be changed. 
The round brackets 
()
 determine a tuple.

Tuples
Create and display a tuple
Display the index of an item in a tuple
Display an item given a known index in a tuple

Numeric Arrays
Pythons arrays can only store numbers.
These numbers can have varying ranges, but all pieces of data must have the same data type (see table below).
When you create an array, you need to define the type of data it will contain.
You cannot change that type while the programme is running

Numeric Arrays –example code

Numeric Arrays
Output from the code we in the previous slide

2D Lists and dictionaries
A 2Dlist uses a standard Python indexing.

