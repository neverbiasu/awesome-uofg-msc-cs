# Lecture 01 - Vectors and Matrices

Introduction to Data Science and Systems
Lecture 1:Vectors and Matrices
Dr
 
Nicolas Pugeault

Intended Learning Outcomes
what a vector is and a what a vector space is
the standard operations on vectors: addition and multiplication
what a norm is and how it can be used to measure vectors
what an inner product is and how it gives rise to geometry of vectors
how mathematical vectors map onto numerical arrays
the different p-norms and their uses
important computational uses of vector representations
how to 
characterise
 vector data with a mean vector and a covariance matrix
the properties of high-dimensional vector spaces
the basic notation for matrices
the view of matrices as linear maps
how basic geometric transforms are implemented using matrices
how matrix multiplication is defined and its algebraic properties
the basic anatomy of matrices

Text, as represented by strings in memory, has 
weak structure
. 
There are 
comparison functions
 for strings (e.g. edit distance, Hamming distance)
,
 
but
 
only character-level semantics
String operations
 are character-level operations like concatenation or reversal
,
 
but
 
not
 
useful
 
for
 machine translation system
Example: Text and translation

Words aren't enough
Original
"The craft held fast to 
the bank of the burn
."
(the vessel stayed moored to 
the edge of the stream
)
Dictionary lookup (
naiive
)
French: "
L'artisanat
 
tenu
 
rapide
 
à
 la Banque de la 
brûlure
."
(the artisanal skill held quickly to 
the financial institution of the burn wounds
)
Danish: "
Håndværket
 
holdt
 fast 
til
 
banken
 
af
 
brænden
"
(The craftmanship held fast 
to the bank [financial institution] of fire
)
Correct(
ish
)
French: "Le bateau se 
tenait
 
fermement
 
à
 la rive du 
ruisseau
."
(the boat was firmly attached to the 
riverbank
)
Danish: "
Farttøjet
 
holdt
 fast 
i
 
bredden
 
af
 
åen
"
(The vessel held fast at 
the bank of the river
)

Solution
 
--
 
to place them in a vector space
Imbue
 
text fragments with additional mathematical structure -- 
to place them in a vector space
Fragments might be words, partial words or whole sentences

T
he structure of a (topological) vector space
W
hat words are like 
salamander
? 
Distance
/metric
 functions
:
 
norm
E.g.
 
the neighbourhood of the vector corresponding to salamander, which might include words like axolotl or waterdog
What is the equivalent of a 
king
, but with a 
woman
 instead of a 
man
? 
Operation
 
functions:
 
subtraction,
 
mean
Famously, the original word2vec paper should that on their test data, the equation
King
 
−
 
Man
 
+
 
Woman
 
=
 
Queen

Vector spaces
V
ectors
 to be ordered tuples of real numbers
A vector has a fixed dimension 
n
E
ach element of the vector as representing a distance in a 
direction orthogonal
 to all the other elements.
Orthogonal just means "independent", or, geometrically speaking "at 90 degrees".
We write vectors with a bold lower case letter:

Vector spaces
For example, a length-3 vector might be used to represent a spatial position in 
Cartesian
 coordinates, with three orthogonal measurements for each vector. 
Consider the 3D vector [5, 7, 3]
Each of these vectors [1,0,0], [0,1,0], [0,0,1] is pointing in a independent direction (orthogonal direction) and has length one.

Points in space
Notation:
 means the 
set of real numbers
.
 means the set of non-negative 
reals
.
 means the set of tuples of exactly 
 real numbers (
vector
).
 means the set of 
 arrays (matrix) 
of real numbers with exactly 
 rows of 
 elements.
The notation 
 says that the 
operation
 defines a map from a pair of 
 dimensional vectors to a real number.
 

Points in space
Vector spaces
Any vector of given dimension 
n
 lies in a 
vector space
, called 
 
 
,
 
along with the operations of
:
scalar multiplication
 so that 
 is defined for any scalar 
. For real vectors, 
, elementwis
e
 scaling.
vector addition
 so that 
 vectors 
 of equal dimension. For real vectors, 
 the elementwise sum
 

Points in space
T
wo additional operations
A
 
norm
 
 which allows the length of vectors to be measured.
A
n 
inner product 
 
⟨
x
,
y
⟩ 
​
or 
 which allows the 
angles
 of two vectors to be compared. The inner product of two orthogonal vectors is 0 . For real vectors 
 

Topological and inner product spaces
With a norm a vector space is a 
normed
 
vector
 
space
/
topological vector space
. 
With an inner product, a vector space is an
 inner product space
, and we can talk about the angle between two vectors.
Topological/geometrical
 
space:
 
a set whose elements are called points
Metric
 
space:
define
 
distance between points,
 
e.g.
 
norm
Normed
 
vector
 
space:
a vector space
 
with
 
norm
 
defined
 
Vector
 
space
     

Topological and inner product spaces
With a norm a vector space is a 
normed vector space
.
With an inner product, a vector space is an 
inner product space
Relationship between 
Inner Product 
and 
Norm
:
If you have an inner product on a vector space, you can derive a norm from it:
 
However, not all norms come from an inner product. 
 

V
ectors
Points in space
Arrows pointing from the origin
Tuples of numbers
These are all valid ways of thinking about vectors.
The "
points in space
" mental model is probably the most useful 
vectors to represent 
data
; data lies in space
matrices to represent 
operations
 on data; matrices warp space.

Relation to arrays
1D floating point arrays
 
are
we called "vectors"
floating point numbers 
are 
NOT
 real numbers

Uses of vectors
They are a 
lingua franca
 for data
.
 
Because vectors can be
composed
 (via addition),
compared
 (via norms/inner products)
and 
weighted
 (by scaling),
In
 
Numpy
,
 
they map onto the efficient 
ndarray
 data structure, so we can operate on them efficiently and concisely.

Vector data
Datasets are commonly stored as 2D 
tables
. 
Observations
one element of the vector
 
(feature)
Each 
row
 can be seen as a vector in
 
 
 

Geometric operations
Use
 
vectors
 
in
 
3D
 
space
T
ransformations in 3D space include:
scaling
rotation
flipping (mirroring)
translation (shifting)
The 
Cobra Mk. III
 spaceship model above is defined by these vectors specifying the vertices in 3D space

Machine learning applications
Machine learning relies heavily on vector representation. A typical machine learning process involves:
transforming some data onto 
feature vectors
creating a function that transforms 
feature vectors
 to a prediction (e.g. a class label)
Most machine learning algorithms can be seen as doing geometric operations: 
comparing distances
, 
warping space
, 
computing angles
, and so on.
E.g.
 
k nearest neighbours

Example:
 
irises
 
classification
The
 
irises
 
classification
 
task:
 
T
he measurements of the dimensions of the sepals and petals of irises allows classification of species
Training
 
data
:
 
[
sepal
 
height,
 
petal]
 
Labels
:
 
species
 
of
 
irises
k
 nearest 
neighbours
U
sing a 
norm
 to compute distances
The output prediction is the class label that occurs most times among these 
k
 neighbours

Example:
 
irises
 
classification
k
 nearest 
neighbours
Calculate
 
distance
 
between
 
training
 
examples
 
and
 
the
 
target
 
using
 
norm
Finding
 
the
 
closest
 
k
 
neighbors
 
(e.g.
 
3,
 
5,
 
10),
 
voting
 
for
 
the
 
most
 
majority

Example:
 
irises
 
classification
The
 
choice
 
of
 
k
 
might
 
significantly
 
affect
 
the
 
prediction
 
result
The
 
distance
 
function
 
(norm
 
or
 
cosine
 
similarity)
 
is
 
something
 
need
 
to
 
be
 
considered

Example:
 
Image compression
Images
 
can
 
be
 
represented
 
as
 
2D arrays of brightness
Groups of pixels -- for example, rectangular patches -- can be 
unraveled
 into a vector. 
E.g.
 
An 8x8 image patch would be 
unraveled
 to a 64-dimensional vector.
 
S
plitting
 images into patches, and treating each patch as a vector 
x
_
1
,…,
x
_
n
The vectors are 
clustered
 to find a small number of vectors 
y
_
1
,…,
y
_
m
, 
m
<<
n
 
that are a reasonable approximation of nearby vectors. 
the vectors for the small number of representative vectors 
y
_
i
 are stored (the 
codebook
)

Basic vector operations
Standard operations
:
getting the length of vectors
 
(
n
orm
)
computing dot (inner), outer and cross products.
Addition and multiplication
 
--
 
form 
weighted sums
 of vectors
See
 
the
 
lecture
 
note
 
for
 
codes

Basic vector operations
Many
 standard statistics and operations can be directly applied.
Linear interpolation:
 
to construct 
new
 data points within the range of 
known
 data points.
See
 
the
 
lecture
 
note
 
for
 
codes

How big is that vector?
The Euclidean length of a vector x (written as ||x||) can be computed directly using 
np.linalg.norm
()
. 
This is equal to:

Different norms
Euclidean norm
 or 
Euclidean distance measure
-norms
 or 
Minkowski
 norms
,
 
which
 
is
 
defined
 
by:
 

Different norms
Every dashed line has the 
same
 distance to the origin as measured in that norm. The points of equal distance in that norm appear as a connected line.

Unit vectors and 
normalisation
A unit vector has norm 1
 
(the definition of a unit vector depends on the norm used
)
Normalising for the 
Euclidean norm
 can be done by scaling the vector 
x
 by 
If we think of vectors in the physics sense of having a 
direction
 and 
length
, a unit vector is "
pure direction
".
 

Inner products of vectors
An 
inner product
 
 measures the 
angle
 between two real vectors
.
It is related to the cosine distance:
For unit vectors, we can forget about the denominator, since 
, so 
.
 
The computation of the 
inner product
, for real-valued vectors in 
, is simply the sum of the elementwise products:
 

Inner
 product
 
in
 
N
umpy
The inner product is only defined between vectors of the same dimension, and only in inner product spaces.
-
 
ValueError
Don’t
 
mix
 
it
 
with
 
the
 
d
ot product
Inner products of vectors

Basic vector statistics
Some
 
statistics
 that generalise the statistics of ordinary real numbers
mean vector
 of a collection of 
N
 
vectors
The mean vector is the 
geometric centroid
 of a set of vectors and can be thought of as capturing "
centre of mass
" of those vectors.
axis
=
0
 
for
 
the
 
purpose
 
of
 
mean
 
vector

C
enter a dataset 
We can 
center
 a dataset stored as an array of vectors to 
zero mean
 by just subtracting the mean vector from every row.

High-dimensional vector spaces
Data
 science often involves 
high dimensional vector spaces
High-dimensional can mean any 
d
>3
; 
a 20-dimensional feature set might be called medium-dimensional; 
a 1000-dimensional might be called high-dimensional; 
a 1M-dimensional dataset might be called extremely high-dimensional
Curse of dimensionality
:
 
Many algorithms that work really well in low dimensions break down in higher dimensions. 

Example: sailing weather station
Task:
 
to measure local atmospheric conditions during voyages
Input
:
 
wind speed, temperature, humidity, sunshine hours, etc.
,
 
over
 
10,000 measurements
Output:
 
is it likely to be above 30C tomorrow?

Temperature
 
(1D)
Temperature
 
&
 
Humidity
 
(3D)
Example: sailing weather station
Now there are 20 bins in each dimension, for 400 bins total. 
Now there are 20 bins in
 
total
 
for
 
this
 dimension

Example: sailing weather station
If we had 10 different measurements  (air temperature, air humidity, latitude, longitude, wind speed, wind direction, precipitation, time of day, solar power, sea temperature)
we wanted to subdivide them into 20 bins each
How
 
many
 
bins
 
in
 
total?

Example: sailing weather station
If we had 10 different measurements  (air temperature, air humidity, latitude, longitude, wind speed, wind direction, precipitation, time of day, solar power, sea temperature)
W
e wanted to subdivide them into 20 bins each
How
 
many
 
bins
 
in
 
total?
even using 8 bit unsigned integers this would be 10TB of memory
But we only have 10,000 measurements
We
 would need a histogram with 
20^10
 bins -- over 
10 trillion
 bins.

Example: sailing weather station
If we had 10 different measurements  (air temperature, air humidity, latitude, longitude, wind speed, wind direction, precipitation, time of day, solar power, sea temperature)
W
e wanted to subdivide them into 20 bins each
How
 
many
 
bins
 
in
 
total?
even using 8 bit unsigned integers this would be 10TB of memory
But we only have 10,000 measurements
We
 would need a histogram with 
20^10
 bins -- over 
10 trillion
 bins.
Curse of dimensionality: as dimension increases generalisation gets harder 
exponentially

Matrices and linear operators
Matrices
 
are
 
2D arrays of reals 
that
 
define
 
linear maps
;
Vectors represent “points in space"
Matrices represent 
operations
 that do things to those points in space.
The 
operations
 represented by matrices are a particular class of 
functions
 on 
vectors

Operations with matrices
There are many things we can do with matrices:
They can be 
added
 and 
subtracted
 
They can be 
scaled
 with a scalar 
They can be 
transposed
 
; this exchanges rows and columns
They can be 
applied
 to vectors 
; this applies a matrix to a vector.
They can be 
multiplied
 together 
; this composes the effect of two matrices
 

Intro to matrix notation
We write matrices as a capital letter
,
 
e.g.
 
A
:
where
 
e
ach element of the matrix 
 A
 is written as 
A
i,j
,
 
for the 
i
th
 row and 
j
th
 column.

Matrices as maps
We saw vectors as 
points in space
,
 
and
 
matrices
 
as 
vector
 
transform
 in space
. 
Matrices represent 
linear maps
 -- these are functions applied to vectors which outputs vectors. 
(
applying some function 
f
(
x
)
 to the vectors
)
A
 
n
×
m
 matrix 
A
 represents a function 
f
(
x
)
  taking 
m
 dimensional vectors to 
n
 dimensional vectors (
)
Matrices capture a special set of functions that preserve important properties of the vectors they act on.
 

Linear
 maps 
Linearity
the transform of the sum of two vectors is the 
same
 as the sum of the transform of two vectors
the transform of a scalar multiple of a vector is the 
same
 as the scalar multiple of the transform of a vector
Anything which is linear is easy. Anything which isn't linear is hard.

Transforms and projections
Matrices
 represent 
linear
 
maps
 or
 
linear functions
.
A 
linear map 
is any function 
 which satisfies the 
linearity
 requirements.
If the map represented by the matrix is 
 then it maps from a vector space onto the 
same
 vector space (e.g. from 
 ), and it is called a 
linear transform.
If the map has the property 
 or equivalently 
 then the operation is called a 
linear projection
; 
for example, projecting 3D points onto a plane; applying this transform to a set of vectors twice is the same as appl
y
ing it once.
 

Geometric intuition (cube -> parallelepiped)
A
 matrix to transform a 
cube
 of vector space 
centered
 on the origin in one space to a 
parallelotope
 in another space, with the origin staying fixed
.
A 
parallelotope
 is the generalisation of a 
parallelogram
A 
parallelogram
 is a 
2-parallelotope
 
A 
parallelepiped
 is a 
3-parallelotope
Matrix
 
could
 
possibly
 transform a 
cube
 
(3D)
 
into
 
a
 
2-parallelotope
parallelotope

Examples
 
-
 
effect of linear transforms
linear transforms (linear maps
 
:
 
 
 
 
), on the 2D plane.
We forms the product 
 
x
, which "applies" the matrix to the vector 
x
.
 

Examples
 
-
 
effect of linear transforms
linear transforms (linear maps
 
:
 
 
 
 
), on the 2D plane.
We forms the product 
 
x
, which "applies" the matrix to the vector 
x
.
 

Examples
 
-
 
effect of linear transforms
linear transforms (linear maps
 
:
 
 
 
 
), on the 2D plane.
We forms the product 
 
x
, which "applies" the matrix to the vector 
x
.
 

Examples
 
-
 
effect of linear transforms
linear transforms (linear maps
 
:
 
 
 
 
), on the 2D plane.
We forms the product 
 
x
, which "applies" the matrix to the vector 
x
.
 

Examples
 
-
 
effect of linear transforms
linear transforms (linear maps
 
:
 
 
 
 
), on the 2D plane.
We forms the product 
 
x
, which "applies" the matrix to the vector 
x
.
 

Examples
 
-
 
effect of linear transforms
linear transforms (linear maps
 
:
 
 
 
 
), on the 2D plane.
We forms the product 
 
x
, which "applies" the matrix to the vector 
x
.
 

Matrix operations
The
 
addition of matrices of 
equal size
 
is simple elementwise addition
.

Matrix operations
The
 
scalar multiplication 
cA
 
is
 
to
 
multiply
 
each element by 
c
.

Application to vectors
We can apply a matrix to a vector
,
 
equivalent to applying the function f(x)
 
to
 
x.
If 
 is 
, and 
 is 
, then this will map from an 
 dimensional vector space to an 
 dimensional vector space
:
 
.
All application of a matrix to a vector does is form a weighted sum of the elements of the vector
.
 
This is a linear combination (equivalent to a "weighted sum") of the components.
 

Application to vectors
In particular, we take each element of 
, multiply it with the corresponding column of 
, and sum these columns together.
Set 
 (the 
-dimensional zero vector)
For each column 
 in 
. Note that 
 is scalar times vector, and has 
 elements. 
 here means the 
 
th
 column of 
.
 

Let’s
 
have
 
a
 
try
f(x)=Ax

Let’s
 
have
 
a
 
try
f(x)=Ax
The traditional matrix multiplication approach (row-by-column)

Let’s
 
have
 
a
 
try
f(x)=Ax
An
 
alterative
 
way
 
:

Application to vectors
We can use @ to form products of vectors and matrices in 
Numpy

Matrix multiplication
Matrix multiplication
 defines the product 
C
=
AB
, where 
A,B,C
 are all matrices.
Matrix multiplication is defined such that if 
A
 
represents linear transform 
f
(
x
)  and 
B
 
represents linear transform 
g
(
x
), then 
BA
x
=
g
(
f
(
x
))
Multiplying two matrices is equivalent to composing the linear functions they represent, and it results in a matrix which has that affect.
Note that the composition of linear maps is read right to left. To apply the transformation 
A
, 
then
 
B
, we form the product 
BA
, and so on.

Multiplication algorithm
If
 
C
=
AB
 
then
Multiplication
 is 
only
 defined for two matrices 
A
,
B
 if:
A
 is 
p
×
q
 and
B
 is 
q
×
r
.
This
 gives rise to many important uses of matrices
,
 
for example, the product of a scaling matrix and a rotation matrix is a scale-and-rotate matrix. 

Multiplication algorithm
Matrix multiplication is of course built in to NumPy
Matrix multiplication is applied by 
np.dot
(
a,b
)
 or by the syntax 
a @ b

Time complexity of multiplication
Matrix multiplication has, in the general case, of time complexity O(
pqr
), or for multiplying two square matrices O(n
3
).
However, there are many special forms of matrices for which this complexity can be reduced, such as diagonal, triangular, sparse and banded matrices.
 
(later)
There
 
are some accelerated algorithms for general multiplication. The time complexity of all of them is >O(N
2
)
 
but <O(N
3
). 

Transposition
The 
transpose
 of a matrix 
A
 is written 
A
T
 and has the same elements, but with the rows and columns exchanged.
Two
 
ways
 
of
 
using
 
numpy
A.T
np.transpose
(A)

Special
 
m
atrix multiplication
outer product
:
 
the product of a Mx1 with a 1xN vector
,
 
which
 is an 
M
×
N
  
matrix
inner product
:
 
the
 product of a 1xN with an Nx1 vector is a 1x1 matrix
,
 
which
 
is
 
a
 
scalar

Matrix
 multiplication 
as
 
c
omposed maps
We saw vectors as 
points in space
,
 
and
 
matrices
 
as 
vector
 
transform
 in space
. 
Multiplication is composition
:
 
If 
A
 
represents 
f
(
x
)
  and 
B
 represents 
g
(
x
)
, then the product 
BA
 
represents 
g
(
f
(
x
))
.
BA
x
=
B
(
A
x
)
  means do 
A
 to 
x
, then do 
B
 to the 
result

nonuniform scaling
rotation
Composed maps

Composed maps
Nonuniform scaling matrix: 
scale_x
Rotation matrix: rot30

Composed maps
Nonuniform scaling matrix: 
scale_x
Rotation matrix: rot30

Concatenation of transforms
Many software operations take advantage of the definition of matrix multiplication as the composition of linear maps.
In a graphics processing pipeline, for example, all of the operations to position, scale and orient visible objects are represented as matrix transforms. 
Multiple operations can be combined into 
one single matrix operation
.

Commutativity
 
and
 
Transpose
The order of multiplication is important. 
Matrix multiplication does 
not
 commute
Transpose order switching
It is also true that

An example matrix for measuring spread: covariance matrices
mean vector
:
 
the 
geometric centroid
 of a set of vectors
variance
:
 
measures the spread of a dataset
In the multidimensional case
:
 
covariance

Generate
 
data
 
examples
500
x
5
 
matrix
Compute
 
covariance
 
using
 
np.cov
()
5
x
5
 
matrix
An example matrix for measuring spread: covariance matrices

Covariance ellipses
For a
  
2-D
 
dataset
mean vector
:
 
1
x
2
Covariance
 
matrix:
 
2
x
2
The mean vector captures the idea of "
centre
" 
The
 
covariance matrix captures
 
the "spread" of a collection of points in a vector space.

D
iagonal
 
matrix
np.diag
(x)
Identity
 
matrix
np.eye
(n)
Zero
 
matrix
np
.
zeros
()
Upper triangular
Lower triangular
Special matrix forms

Beyond
 
this course
3blue1brown Linear Algebra series
 (
strongly recommended
)
Introduction to applied linear algebra
 
by S. Boyd and L. 
Vandenberghe
Linear Algebra Done Right
 
by Sheldon 
Axler
 (excellent introduction to the "pure math" side of linear algebra) ISBN-13: 978-0387982588
Coding the Matrix: Linear Algebra through Applications to Computer Science
 
by Philip N Klein
 (top quality textbook on how linear algebra is implemented, all in Python) ISBN-13: 978-0615880990
Linear Algebra and Learning from Data
 
Gilbert Strang
, ISBN-13: 978-069219638-0, explains many detailed aspects of linear algebra and how they relate to data science.
The Matrix Cookbook
 
by 
Kaare
 Brandt Petersen 
and 
Michael 
Syskind
 Pedersen
. If you need to do a tricky calculation with matrices, this book will probably tell you how to do it.

Thank
 
you
Contact:
 
Nicolas.Pugeault@Glasgow.ac.uk

