# Numpy_Library

Numpy

Create an array and Type of Data
Create an array using the array() function
the array() function can accept tuples and sequences of tuples
Numpy arrays are designed to contain a variety of data types, not just integers
The array() function also accepts tuples and interconnected list
Using the dtype option as argument of the array() function

Dtype Option and Intrinsic Creation of an Array
We can use the 
dtype
 option as argument to explicitly define the dtype object.
The 
zeros() 
function creates a full array of zeros with dimensions defined by the shape argument.
The 
ones() 
function creates an array full of ones.
The 
arange
() 
function generates 
NumPy
 arrays with numerical sequences.
The 
reshape() 
function divides a linear array in different parts in the manner specified by the shape argument.
The 
linespace
() 
function takes as its two arguments the initial and the end values of the sequence, but the third argument defines the number of elements into which we want the interval to split.
Another way to create arrays is using the 
random()
function

Arithmetic
Adding and multiplying an array by a scalar
Element-wise
 operation:
 operators are applied only between corresponding elements
a
b
a + b

Arithmetic operators for Functions
We can multiply the array by the sine or square root of the elements of array 
b
Element-wise
 multidimensional operation

The Matrix Product
Many tools for data analysis use the
 * 
operator as a matrix product when it is applied to two matrices.
Using 
NumPy
, this kind of product is indicated by the 
dot() 
function.
This operation is not element-wise
The result at each position is the sum of the products of each element of the corresponding row of the first matrix with the corresponding element of the column of the second matrix.

The Matrix Product
Using 
NumPy
, this kind of product is indicated by the 
dot() 
function.
This operation is not element-wise
0*1+1*1+2*1=3
3*1+4*1+5*1=12

Transpose - Trace - Inverse
We can use the 
transpose()
function to flip the original matrix.
This is achieve by switching its rows with its columns. Transpose does not modify the original array. This example shows two ways of doing it.
The 
trace
 of a square 
matrix
 is the sum of the diagonal elements. Use 
trace() 
function
The
 
inverse
 
of a matrix A is a matrix that, when multiplied by A results in the identity.
 The notation for this inverse matrix is A
–1.
 This code finds the invers of A.

Increment and Decrement Operators
In Python, there are no operators called ++ or - - to increase or decrease.
In Python, to increase we use the 
+=
To decrease, we use the 
-=
These are useful if we want to change the values in an array without generating a new array.

Shape manipulation
It is possible to convert a one-dimensional array into a matrix using the 
reshape() 
function.
The 
reshape() 
returns a new array and therefore create new objects.
We want to modify the object by modifying the shape, we have to assign a tuple containing the new dimensions directly to its shape attributes.
The 
ravel() 
function is used to convert a two-dimensional array into a one-dimensional array
The 
transpose() 
function is used to invert the columns with the rows

Array Manipulation: Joining
You can merge multiple arrays to form a new one that contains all of the arrays. This concept is known as 
stacking
 in Numpy.
The 
vstack
() 
function (vertical stacking) combines the second array as new rows of the first array
For the 
hstack
() 
function (horizontal stacking), the second array is added to the column of the first array.
The
 
column_stack
() 
function and 
row_stack() 
function can also be used for stacking however, these are generally used for one-dimensional arrays which are stacked as column or rows in order to form a new two dimensional array

In Numpy, we have the 
hsplit
() 
function to divide the array horizontally.
 
The 
vsplit
() 
function to split it vertically
Array Manipulation – Splitting Arrays
4x4 matrix A
Matrix A is split horizontally into two 2x4 (2 columns by 4 rows) matrices, B and C. 
2x4
 means 2 columns by 4 rows. 
Matrix A is split vertically into two 4x2 matrices, B and C. 
4x2
 means (4 columns by 2 rows) 

The 
split() 
function allows us to split the array into 
nonsymmetrical
 parts.
Passing the array as an argument, you have to also specify the indexes of the part to be divided.
The option 
axis =1 
means the indexes will be the columns and the option 
axis = 0 
means they will be the row indexes.
E.g. If we want to divide the matrix into three parts, 
the first part 
will include the first column, the second part will include the second and third column and the third part will include the last column
Array Manipulation – Splitting Arrays

Array Indexing
You can also use negative index with 
numpy
. Negative indexes cause the final element to move gradually toward the first element. In this case the first element is the one with the more negative value.
Uses square brackets (
[
 
]
) to index the element of the array.
Index allows you to extract a value, select items or assign a new value.
To select many items at the same time, pass the array of indexes in square brackets
In this bidimensional matrix, we extract the element of the third column in the second row by inserting the pair [1, 2].

Array slicing
In 
numpy
, we can create new arrays by slicing an existing array.
We must use the slice syntax which is a sequence of numbers separated by colons (:) within square brackets.
Extract from 3
rd
 element to 5th 
Extract an item, skip a specific number, extract next & skip 
Extract first item then every second item until max index of array
Extract first 5 items
In two-dimensional array, the slicing syntax is defined separately for the rows and columns
Extract first row only
Extract smaller matrix with contiguous rows or columns
Extract all values in first column
Extract smaller matrix with non-contiguous rows or columns

Iterating an Array
For a two-dimensional matrix iteration is like applying two nested loops with the 
for 
construct. The first loop scan the rows of arrays and the second loop  scans the columns. A 
for loop 
will always scan according to the first axis
Here we are using the for loop on 
A.flat
 
to make an iteration element by element. 
Better, we can leave it to 
numpy
 to manage the iteration using the 
apply_along_axis() 
function which takes 3 arguments: the aggregate function, the axis on which the iteration will be applied, and the array. Example calculate the average values first by column then by row.
We can use a predefined function in 
numpy
 or define our own function. The 
ufunc
 
which performs one iteration element by element.

Will get the 
numpy
 version
 Test whether none of the elements of a given array is zero
 Test whether any of the elements of the array is non-zero
create an element-wise comparison (greater, greater_equal, less and less_equal) of two given arrays
Creates a 3x3 matrix – diagonal element are 1 and the rest 0
  convert a given list into an array and then convert it into a list again
  This program computes the x and y coordinates for points on a sine curve and plot the points using 
matplotlib

 Using 
numpy
  
savetxt
() and load txt() functions to save a given array to a text file and load it
Reading and Writing Array Data on files
Numpy
  save() and load() functions allows us to save and retrieve data stored in binary format. 

Copies or Views of Objects
Assigning array1 to array2 is just another way to call array1.
When we slice an array, the object returned is a 
view
 
of the original array. We are pointing to the same object. If the first array change the second array also change.
Use the 
copy() 
function to generate a complete and distinct array With this function, any changes made in the original array won’t affect the second array. 

