# Lecture_5_Optimisation_II

Introduction to Data Science and Systems
Lecture 
5
: 
Optimisation II
Dr
 
Nicolas Pugeault

D
eep
 neural networks

D
eep neural networks
Deep learning
 or 
deep neural networks
 have become a major part of modern machine learning research. 
They have had astonishing success in fields like speech recognition, machine translation, image classification and image synthesis. 
The basic problem of deep learning is one of finding an approximating function. 

A linear map (matrix multiplication), that rotates, translates the input (“paper”)
A nonlinear function that squashes the input (“folds”)
Formally: 
 
Deep Neural Networks as Origami

Activation
 
function
nonlinear 
(
activation
)
 
function 
G
(
x
)
nonlinear functions
 are essential in neural networks because they allow the network to model complex, real-world data by introducing 
nonlinearity
. 
Without them, a neural network would be limited to solving simple 
linear problems
, no matter how deep or wide the network is.

A
 
3-layer
 
deep
 
neural
 
network
 
(DNN)
h(x1,x2)
g(h1,h2,h3,h4)
f(g1,g2,g3,g4,g5)
[o1,o2,o3]
[x1,x2]
DNN
: 
 

Why not use heuristic search?
Heuristic search methods like random search, simulated annealing and genetic algorithms are easy to understand, easy to implement and have few restrictions on the problems they can be applied to. 
However
 
…
They can be very slow; it may take many iterations to approach a minimum and require significant computation to compute each iteration.
There is no guarantee of convergence, or even of progress. The search can get stuck, or drift slowly over plateaus.
There are a huge number of 
hyperparameters
 that can be tweaked (temperature schedules, size of population, memory structure, etc.). How should these be chosen? Optimal choice of these parameters becomes an optimisation problem in itself.

Why not use heuristic search?
For optimisation problems like 
deep neural networks
, heuristic search is hopelessly inadequate. 
 
--
 
1000b
 
parameters
Instead, 
first-order
 optimisation is applied. 
First-order algorithms
, that we will discuss today, can be 
orders of magnitude
 faster than heuristic search.
Gravity applies a force perpendicular to the plane of the surface. The surface applies a force to the ball along the direction of the 
surface normal
, the vector that points "straight out" from the surface. This results in a force component in 
the direction of the steepest slope
 of the surface, accelerating the ball in that direction

How
 
do
 
we
 
find
 
minimum
 
of
 
a
 
scalar
 
function?
We find where the derivative is zero
: 
Derivative:
 
The derivative of a 
scalar
 
function

And
 
for
 
a
 
function
 
of
 
two
 
variables?
We need to set the derivative of the function to zero 
with respect to each variable: 
 
The derivative of a 
scalar
 
function

The derivative of a
 
scalar
 function 
 with respect to vector 
 
The derivative of a 
scalar
 
function

Derivative of a 
vector
 function 
 with respect to vector 
.
 
 
The derivative of a 
scalar
 
function

Jacobian: matrix of derivatives
We can collect this derivative information into a matrix called the 
Jacobian matrix
, which characterises the slope 
at a specific point 
x
.
This simply tells us how much each 
component
 of the output changes as we change any component of the input -- the generalised "slope" of a vector-valued function. 

Gradient vector: one row of the Jacobian
∇
f
(
x
)
 is the 
gradient vector
 of 
a (scalar) function 
of a vector, the equivalent of the first derivative for vector functions. 
This tells us how much 
f
(
x
)
 would vary if we made tiny changes to each dimension 
independently
. 
We will work with 
scalar
 objective functions 
L
(
θ
)
 
of parameter vectors 
θ.
∇
L(
θ) 
is a vector 
which points in the direction of the steepest change in 
L(
θ).

Hessian: Jacobian of the gradient vector
 
is the 
Hessian
 matrix
 of a (scalar) function of a vector, the equivalent of the 
second
 derivative for vector functions.
Following our rule above, it's just the Jacobian of a 
vector
 valued function, so we know:
 is matrix valued map 
 

Differentiable objective functions
For some objective functions, we can compute the (
exact
) derivatives of the objective function with respect to the parameters 
. 
For example, if the objective function has a single scalar parameter 
 and the function is:
	then, from basic calculus, the derivative with respect to 
 is just:
If we know the derivative, we can use this to move in "good directions" -- down the slope of the objective function towards a minimum.
This becomes slightly more involved for multidimensional 
objective functions
 (where 
 has more than one component) where we have a gradient vector instead of a simple scalar derivative (written 
 ). 
 

Orders: zeroth, first, second
Iterative algorithms can be classified according to the order of derivative they require:
a 
zeroth order
 
optimisation
 algorithm only requires evaluation of the objective function 
. Examples include random search and simulated annealing.
a 
first order 
optimisation
 algorithm requires evaluation of 
 and its derivative 
. This class includes the family of gradient descent methods.
a 
second order 
optimisation
 
algorithm requires evaluation 
 and 
 . These methods include quasi-Newtonian 
optimisation
.
 

Optimisation
 with derivatives
If we know (or can compute) the 
gradient
 an objective function, we know the 
slope
 of the function at any given point. This gives us both:
the direction of fastest increase and
the steepness of that slope.
This is 
the
 major application of calculus.
Knowing the 
derivative
 of the objective function is sufficient to dramatically improve the efficiency of optimisation.
This 
gradient vector always points in the direction of the steepest slope
.

Differentiability
A 
smooth function
 has continuous derivatives up to some order. 
Smoother
 functions are typically 
easier
 to do iterative optimisation on, because 
small
 changes in the current approximation are likely to lead to 
small
 changes in the objective function. 
We say a function is C
n
 continuous
 if the 
n
th derivative is continuous
 
(
smoothness class
)
.
Image: left-to-right, top-to-bottom discontinuous, 
C0
, 
C1
, 
C2
 continuous functions

continuous derivatives vs differentiable
There is a difference between 
having continuous derivatives
 and 
knowing what those derivatives are
.
First order optimisation uses the (first) derivatives of the objective function with respect to the parameters. These techniques can only be applied if the objective function is:
At least 
continuous
 i.e. no step changes anywhere in the function or its derivative
differentiable
 
(
Analytically we can derive the derivative
)
 
i.e. gradient is defined everywhere
(though we will see that these constraints can be relaxed a bit in practice).
Many objective functions satisfy these conditions, and first-order methods can be vastly more efficient than zeroth-order methods. For particular classes of functions (e.g. convex) there are known bounds on number of steps required to converge for specific first-order optimizers.

Lipschitz Continuity
First (and higher) order optimization require a loss function 
 to be 
Lipschitz continuous
: 
its 
gradient is bounded
 and the function cannot change more quickly than some constant. 
In other words, there is a maximum steepness:  
 for all 
 and some 
K is called the 
Lispchitz
 constant
Where sup is the 
supremum, 
the smallest value that is larger than (or equal to) every value of this function
 

Small Lipschitz constant

Large Lipschitz constant

compute the derivative 
solve for the derivative being zero (i.e. solve 
 for 
 ). This finds all turning points or optima of the function.
then check if any of the solutions has positive second derivative 
, which indicates the solution is a minimum. 
 
 Example
:
  
find the minimum of
We can solve for:
 
=
 
0
and the second derivative is
and check the sign to find if we have a minimum.
 
Analytical derivatives

G
radient : physical 
optimisation
C
onsidering
 a ball rolling on a (smooth) surface, which represents the value of the objective function across a 2D domain (i.e. if we had a parameter vector 
θ 
with two elements).
Gravity
 applies a force in 
the direction of the steepest slope
 of the surface, accelerating the ball in that direction.
T
he 
gradient
 can be understood by thinking of it as a vector that points in the direction of the steepest ascent (or descent) on a surface representing a function

G
radient : physical 
optimisation
This 
gradient vector always points in the direction of the steepest slope
.
Downhill is not always the shortest route
,
 
but
 
can
 
safely
 
find
 
a
 
good
 
local
 
minima

Gradient descent
The basic first-order algorithm is called 
gradient descent
 and it is very simple, starting from some initial guess 
θ
(0)
:
where 
δ
 
is a scaling hyperparameter -- the 
step size
. The 
step size
 might be fixed, or might be chosen adaptively according to an algorithm like 
line search
.
This means is that the optimiser will make moves where the objective function drops most quickly.

Gradient descent

Gradient descent from different initial conditions

Converged in 19 steps 
、
Converged in 
2
 steps 
Converged in 606 steps
Converged in 
301
 steps 
 
Why step size matters

The definition of the derivative is well known:
Why do we need the actual gradient? Why not just evaluate f(
x+h
) and f(x-y) at all points? 
This is called 
finite differences.
 
Why not use numerical differences?

The definition of the derivative is well known:
Why do we need the actual gradient? Why not just evaluate f(
x+h
) and f(x-y) at all points? 
This is called 
finite differences.
Issues:
 
Numerical stability
Curse of dimensionality (again!)
 
Why not use numerical differences?

Improving gradient descent
Gradient descent can be very efficient, and often 
much
 better than zeroth-order methods. However, it has drawbacks:

Programming language advances
Vectorised programming
Example:
 NumPy, eigen, nd4j, J
Provides native operations over 
tensors
, potentially with 
GPU
 acceleration.
Differentiable programming
Examples:
 
autograd
, JAX, 
pytorch
, 
tensorflow
Automatically differentiates
 vectorised code, producing exact derivatives of tensor algorithms.
Probabilistic programming
Examples:
 
pymc
, stan, 
edward
, Uber, Pyro, 
webppl
Allows values to be uncertain, with (tensor, differentiable) random variables as first class values.

The magic behind modern advances in data science
Automatic differentiation can take a function, usually written a 
subset
 of a full programming language, and automatically construct a function that evaluates the exact derivative at any given point. This makes it feasible to perform first-order 
optimisation
.
Some of the most common implementations of this technique are in deep learning software packages like 
TensorFlow
, 
Theano
, 
Torch/
PyTorch
. 
These provide a way of defining a 
computational graph
 (implicitly or explicitly) which defines the operations to be performed, and from which the corresponding derivative computation can be derived. 
These implementations tend to be focused on the operations used in neural networks, like matrix multiplication and elementwise nonlinear functions, and they tend not to include branching or iteration (or support very limited forms of conditional/looping expressions).

Autograd
Other software, like 
autograd
 provides automatic differentiation for virtually any NumPy code. The example below is from the 
autograd
 documentation. It is a drop in replacement which just "magically" estimates derivatives (although only some operations are supported).

Autograd
Use
 
Autograd

Autograd
Vectorised example

How do animals evolve camouflage?
It either gets eaten by a predator who sees it or the predator does not see it 
 discontinuous fitness function!
Answer: 
although every 
specific
 case is a simple binary choice, it is 
averaged 
over many random instances, where the conditions will be slightly different
(maybe it is nearly dark, maybe the predator has bad eyes, maybe the weather is foggy)
 
Averaging over all of those cases, some very minor change in 
colouring
 might offer an advantage. 
This is called
 stochastic relaxation
Stochastic relaxation
See 
"The Blind Watchmaker"
 by 
Richard Dawkins, 
for a discussion of this topic. 

Issue: 
Gradient descent can only be applied to function with continuous gradient (Lipschitz continuous)
If our loss function is a step function, we would not be able to optimise on it.
But if, for example we approximate a step functions with different randomly perturbated thresholds, then the average becomes continuous. 
Stochastic relaxation Example

Stochastic Gradient Descent
Issue: 
Gradient descent evaluates the objective function and its gradient at each iteration before making a step. This can be very expensive to do, particularly when 
optimising
 function approximations with large data sets (e.g. in machine learning). 
But:
 If the loss can be broken into small parts, for example a sum:
Then,
 
because the gradient is a linear operator
,
 we can write:
Then the optimiser can do gradient descent on randomly selected parts in turns which may be much faster and will (hopefully) converge to the same solution. 
 

Stochastic Gradient Descent
For example, remember approximation problems
Where the difference between the model’s output and target is minimised, 
summing over all training examples, 
we can sum the gradients over all examples individually.
This means we can take random subsets of training examples (a 
mini-batch
), and do gradient updates on each, requiring fewer evaluations per update. 
 

GD
 
vs
 
SGD
 
vs
 
mini-batch
 
SGD
In 
original
 
SGD
, you use only 
ONE
 
training example
s
 before updating the gradients. 
When the training set is large, SGD can be faster. 
But the parameters will “oscillate” toward the minimum rather than converge smoothly.
Mini-batch
 
is a middle ground between batch 
GD
 
and
 
SGD.

Because mini-batch gradient descent makes a parameter update after seeing just a subset of examples, the direction of the update has some variance, and so the path taken by mini-batch gradient descent will “oscillate” toward convergence. 
Using momentum can reduce these oscillations.
 
Momentum
 accumulates the gradient of the past steps to determine the direction to go. 
Momentum

Second-order derivatives
If the first order derivatives represent the "slope" of a function, the second order derivatives represent the "curvature" of a function.
For every parameter component 
θ
i
 the Hessian stores how the 
steepness
 of every other 
θ
j changes.

Hessian: Jacobian of the gradient vector
 
is the 
Hessian
 matrix
 of a (scalar) function of a vector, the equivalent of the 
second
 derivative for vector functions.
Following our rule above, it's just the Jacobian of a 
vector
 valued function, so we know:
 is matrix valued map 
 

Imagine I am on a hill.
The 
altitude
 I am at is the value of the 
objective function
.
The 
parameters
 I can vary are my position 
North/South
 and 
East/West
.
The 
gradient vector
 is the change in altitude as I take a step North or a step East, which are the two parameters. This is the local 
steepness
 at the place I am at on the hill.
The 
Hessian
 captures 
how much steeper 
the hill get 
stepping Northwards
 
as I go 
North
 and 
also
 how much steeper the hill 
gets
 
Eastwards
 
as I step 
North
; similarly for stepping East. So there is a 
2x2 matrix 
describing these changes in steepness.
Second-order derivatives

The Hessian matrix captures important properties about the 
type of critical point
 that we saw in the previous lecture. In particular, the 
eigenvalues
 of the Hessian tell us what kind of point we have.
If all eigenvalues are all strictly positive, the matrix is called 
positive definite
 and the point is a 
minimum
.
If all eigenvalues are all strictly negative (
negative definite
) and the point is a 
maximum
.
If eigenvalues have mixed sign the point is a 
saddle
 point.
If the eigenvalues are all positive/negative, but with some zeros, the matrix is 
semidefinite
 and the point is plateau/ridge.
Eigenvalues of the Hessian & types of critical points

Newton-Conjugate Gradient
Newton‘s Method
:
 
Uses second-order information (Hessian matrix) to account for curvature.
Conjugate Gradient (CG):
	Efficiently solves linear systems involving the Hessian without direct inversion.
Newton-CG typically converges faster than gradient descent because it uses second-order information (the Hessian), making it more effective, especially for problems with high curvature.
A full computation of the Hessian matrix (second-order derivatives) is both memory-intensive and computationally costly for large datasets.
 
Evaluating the Hessian matrix requires 
d
2
 computations, and 
d
2
 storage.

Why 
Newton-CG
 
converges faster
?
A
djust
 the step size and direction more accurately
Near a local minimum, Newton‘s method converges quadratically—meaning the error decreases
 
exponentially with each iteration, requiring fewer steps to achieve a highly accurate solution.
See:
 
IDSS - 
optimisation
 III - lecture 
codes.ipynb

Use the right algorithm
If you know the problem is 
least-squares
 use a specialised least-squares solver. You might be able to solve directly, for example with the pseudo-inverse.
If you know the problem is 
convex
, use a convex solver. This is radically more efficient than any other choice if its applicable.
If you know the derivatives of the objective function, or can compute them using automatic differentiation, use a 
first-order
 method (or second order, if you can)
If you don't know any of these things, use a general purpose 
zeroth-order
 solver like 
simulated annealing
 or a 
genetic 
algorithm
.

Use the right algorithm
If you know the problem is 
least-squares
 use a specialised least-squares solver. You might be able to solve directly, for example with the pseudo-inverse.
If you know the problem is 
convex
, use a convex solver. This is radically more efficient than any other choice if its applicable.
If you know the derivatives of the objective function, or can compute them using automatic differentiation, use a 
first-order
 method (or second order, if you can)
If you don't know any of these things, use a general-purpose 
zeroth-order
 solver like 
simulated annealing
 or a 
genetic algorithm
.

Thank
 
you
 
for
 
you
 
attention!
Contact:
 
Nicolas.Pugeault@Glasgow.ac.uk

Example Optimisation exam question
December 2023 Exam paper

