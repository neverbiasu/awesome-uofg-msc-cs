
# Introduction to Data Science and Systems 2025-2026

## Week 4: Optimisation I

Parameters, objective functions, classification of optimisation problems

University of Glasgow - material prepared by John H. Williamson (adapted to IDSS by NP and ZM), v20252026a

### Summary

By the end of this unit you should know:

*   what an objective function, constraint function and a parameter vector is in the context of optimisation
*   how to play the piano
*   the difference between discrete and continuous optimisation
*   convex and nonconvex optimisation and how to recognise them
*   what constrained optimisation is and the difference between soft and hard constraints
*   key properties of objective functions, including convexity and continuity
*   basic uses of optimisation and how to come up with objective functions
*   what linear least squares is
*   how iterative optimisation works
*   the principles of heuristic optimisation
*   the properties of random search, with the metaheuristics: locality, memory, temperature and population

Latex macros

Example: a synthesizer

Introduction to optimisation

What is optimisation?

Optimisation is the process of adjusting things to make them better. In computer science, we want to do this automatically by a algorithm. An enormous number of problems can be framed as optimisation, and there are a plethora of algorithms which can then do the automatic adjustment efficiently, in that they find the best adjustments in few steps. In this sense, optimisation is search, and optimisation algorithms search efficiently using mathematical structure of the problem space.

Optimisation is at the heart of machine learning; it is a critical part of all kinds of manufacturing and industrial processes, from shipbuilding to circuit design; it can even be used to automatically make scatterplot graphs easier to read.

One algorithm to rule them all: no special cases

Optimisation algorithms allow us to apply standard algorithms to an enormous number of problems. We don't have special cases for every specific problem; instead we formulate the problems so that generic algorithms can solve them. As a consequence, to apply optimisation algorithms, the problems must be specified formally. There is a real art in specifying problems so that optimisation can tackle them.

What is often called "artificial intelligence" often comes down to optimisation. With optimisation we can specify problems, instead of solutions.

Parameters and objective function

Image credit: derived from](https://flickr.com/photos/doctorow/14638932732 "Enticingly technical synthesizer 1, Control Voltage, Mississippi Street, Portland, Oregon, USA") by gruntzooki CC (BY-SA)

There are two parts to an optimisation problem:

*   **parameters**: the things we can adjust, which might be a scalar or vector or other array of values, denoted θ. The parameters exist in a **parameter space** -- the set of all possible configurations of parameters denoted . This space is often a **vector space** like IR”, but doesn't need to be. For example, the set of all knob/slider positions on the synthesizer panel above could be considered points in a subset of a vector space. If the parameters do lie in a vector space, we talk about the **parameter vector** θ.
*   **the objective function**: a function that maps the parameters onto a *single numerical measure* of how good the configuration is. L(θ). The output of the objective function is a single scalar. The objective function is sometimes called the *loss function*, the *cost function*, *fitness function*, *utility function*, *energy surface*, all of which refer to (roughly) the same concept. It is a quantitative ("objective") measure of "goodness".

The desired output of the optimisation algorithm is the parameter configuration that minimises the objective function.

Writing this mathematically, this is the `arg min` (the argument that produces the minimum value) of the objective function:

`0* = arg min L(0) θΕΘ`

*   0* is the configuration that we want to find; the one for which the objective function is lowest.
*   → is the set of all possible configurations that could take on, e.g. RN.

Most optimisation problems have one more component:

*   **constraints**: the limitations on the parameters. This defines a region of the parameter space that is feasible, the **feasible set** or **feasible region**. For example, the synthesizer above has knobs with a fixed physical range, say 0-10; it isn't possible to turn them up to 11. Most optimisation problems have constraints of some kind;

"design a plane (adjust parameters) that flies as fast as possible (objective function), and costs less than $180M (constraints).

We usually think of the objective function as a **cost** which is *minimised*. Any maximisation problem can be reframed as a minimisation problem by a simple switch of sign, so this does not lose generality. If if we wanted to optimise the knob settings on our synthesizer to make a really good piano sound ("maximise goodness"), we could instead frame this as a problem of minimising the difference between the sound produced and the sound of a piano. We would, of course, need to have a **precise** way of measuring this difference; one that results in a single real number measure of cost.

Minimising differences

As in this example, it is common to have express problems in a form where the objective function is a **distance between an output and a reference is measured**. Not every objective function has this form, but many do.

That is, we have some function y' = f(x; 0) that produces an output from an input x governed by a set of parameters θ, and we measure the difference between the output and some reference y (e.g. using a vector norm):

`L(0) = ||y' – y|| = || f(x; 0) – y||`

This is very common in **approximation problems**, where we want to find a function that approximates a set of measured observations. This is the core problem of machine learning.

Note that the notation f(x; 0) just means that the output of f depends both on some (vector) input x and on a parameter vector θ. Optimisation only ever adjusts 0, and the vector x is considered fixed during optimisation (it might, for example, represent a collection of real-world measurements). In the synthesizer example, x might represent the keys pressed, which affect the sound but we *do not* optimise; while θ represents the knob settings which affect that sound and we *do* optimise.

Evaluating the objective function

It may be **expensive** to evaluate the objective function. For example:

*   the computation might take a long time (invert a 10000x10000 matrix);
*   or it might require a real-world experiment to be performed (do the users like the new app layout?);
*   or it might be dangerous (which wire on the bomb should I cut next?);
*   or it might require data that must be bought and paid for (literally expensive).

In all cases, it will take some computational power to evaluate the objective function, and therefore will have a time cost.

This means that a *good* optimisation algorithm will find the optimal configuration of parameters with *few* queries (evaluations of the objective function). To do this, there must be mathematical **structure** which can help guide the search. Without any structure at all, the best that could be done would be to randomly guess parameter configurations and choose the lowest cost configuration after some number of iterations. This isn't typically a feasible approach.

Discrete vs. continuous

If the parameters are in a continuous space (typically Rº), the problem is one of **continuous optimization**; if the parameters are discrete, the problem is **discrete optimization**. Continuous optimisation is usually easier because we can exploit the concept of **smoothness** and **continuity**.

Properties of optimisation

Every optimisation problem has two parts:

*   **Parameters**, the things that can be adjusted.
*   **Objective function**, which measures how good a particular set of parameters are.

An optimisation problem usually also has:

*   **Constraints**, that define the feasible set of parameters.

The **objective function** is a function of *the parameters* which returns a *single scalar value*, representing how good that parameter set is.

Throwing a stone

For example, if I wanted to optimise how far I could throw a stone, I might be able to adjust the throwing angle. This is the **parameter** I could tweak (just one parameter θ = [a], in this case).

The objective function must be a function which depends on this parameter. I would have to *simulate* throwing the ball to work out how far it went and try and make it go further and further.

Focus: continuous optimisation in real vector spaces

This course will focus on optimisation of continuous problems in R”. That is

θ∈R" = [01, 02, ..., θη],

and the optimisation problem is one of:

`0* = arg min L(0), subject to constraints`
`DER"`

This it the problem of searching a continuous vector space to find the point where L(0) is smallest. We will typically encounter problems where the objective function is *smooth* and *continuous* in this vector space; note that the parameters being elements of a continuous space does not necessarily imply that the objective function is continuous in that space.

Some optimisation algorithms are **iterative**, in that they generate successively better approximations to a solution. Other methods are **direct**, like linear least squares (which we'll briefly discuss), and involving finding a minimum exactly in one step. We will focus primarily on **iterative, approximate** optimisation in this course.

A function of space

The objective function maps points in space to values; i.e. it defines a curve/surface/density/etc. which varies across space. We want to find, as quickly as possible, a point in space where this is as small as possible, without going through any "walls" we have defined via constraints.

Geometric median: optimisation in R2

*   **Problem** Find the median of a >1D dataset. The standard median is computed by sorting and then selecting the middle element (with various rules for even sized datasets). This doesn't work for higher dimensions, and there is no straightforward direct algorithm. But there is an easy definition of the median: it is the vector that minimises the sum of distances to all vectors in the dataset.

A very simple optimisation example is to find a point that minimises the distance to a collection of other points (with respect to some norm). We can define:

*   **parameters** 0 = [x, y . . .], a position in 2D.
*   **objective function** the sum of distances between a point and a collection of target points xi:

`L(0) = ∑ ||0 – Xi||2`
`i`

This will try and find a point in space (represented as θ) which minimises the distances to the target points. We can solve this, starting from some random initial condition (guess for θ):

An example of optimisation in RN

We can work in higher dimensions just as easily. A slightly different problem is to try and find a layout of points in such that the points are **evenly spaced** (with respect to some norm). In this case we have to optimise a whole collection of points, which we can do by rolling them all up into a single parameter vector.

We can define:

*   **parameters** 0 = [x1, Y1, X2,Y2, . . .], an array of positions (p₁ = (x1, Yi)) of points in 2D. Note: we have "unpacked" a sequence of 2D points into a higher dimensional vector, so that a *whole configuration* of points is a single point in a vector space.
*   **loss function** the sum of squares of differences between the Euclidean pairwise distances between points and some target distance:

`ΣΣ(α - ||Pi - Pj ||2) 2`
`i j`

This will try and find a configuration of points that are all a units apart.

We again start from some random initial condition, with 64 2D points; a 128 dimensional 0.

Constrained optimisation

If a problem has constraints on the parameters beyond purely minimising the objective function then the problem is **constrained optimisation**. For example, in the synthesizer above, it's not much use if the optimal solution requires one the knobs to be turned to an impossible value; the parameter space is limited in extent on every dimension. This limits the **feasible set** of the parameters.

A constrained optimisation might be written in terms of an equality constraint:

`arg min L(0) subject to c(0) = 0,`
`θΕΘ`

or an inequality:

`0* = arg min L(0) subject to c(0) ≤ 0,`
`θΕΘ`

where c(0) is a function that represents the constraints.

*   An **equality** constraint can be thought of as constraining the parameters to a **surface**, to represent a tradeoff. For example, c(0) = ||0||2 1 forces the parameters to lie on the surface of a unit sphere. An equality constraint might be used when trading off items where the total value must remain unchanged (e.g. the payload weight in a satellite might be fixed in advance).
*   An **inequality** constraint can be thought of as constraining the parameters to a **volume**, to represent bounds on the values. For example, c(0) = ||0||∞ 10 forces the parameters to lie within a box extending (-10, 10) around the origin -- perhaps the range of the knobs on the synthesizer.

Common constraint types

A **box constraint** is a simple kind of constraint, and is just a requirement that 0 lie within a box inside Rn; for example, that every element 0 < θ; < 1 (all parameters in the positive unit cube) or θi > 0 (all parameters in the positive **orthant**). This is an inequality constraint with a simple form of c(0). Many optimisation algorithms support box constraints.

A **convex constraint** is another simple kind of constraint, where the constraint is a collection of inequalities on a convex sum of the parameters θ. Βox constraints are a specific subclass of convex constraints. This is equivalent to the feasible set being limited by the intersection of many of **planes/hyperplanes** (possibly an infinite number in the case of curved convex constraints).

Unconstrained optimization does not apply any constraints to the parameters, and any parameter configuration in the search space is possible. In many problems, pure unconstrained optimisation will lead to unhelpful results ("the airplane will get the best lift if the wing is two hundred miles long" -- which might be true but impossible to construct).

Constraints and penalties

Unconstrained optimisation rarely gives useful answers on its own. Consider the example of the airfoil. Increasing lift might be achieved by making the airfoil length longer and longer. At some point, this might become physically impossible to build.

Although we often represent θ as being in RN, the feasible set is typically not the entire vector space. There are two approaches to deal with this:

Constrained optimisation

*   Use an optimisation algorithm that supports hard constraints inherently. This is straightforward for certain kinds of optimisation, but trickier for general optimisation. Typically constraints will be specified as either a **convex region** or a simple (hyper)rectangular region of the space (a **box constraint**).
*   **Pros**:
    *   Guarantees that solution will satisfy constraints.
    *   May be able to use constraints to speed up optimisation.
*   **Cons**:
    *   may be less efficient than unconstrained optimization.
    *   Fewer algorithms available for optimisation.
    *   may be hard to specify feasible region with the parameters available in the optimiser.

Soft constraints

*   Apply penalties to the objective function to "discourage" solutions that violate the constraints. This is particularly appropriate if the constraints really are soft (it doesn't perhaps matter if the maximum airfoil length is 1.5m or 1.6m, but it can't be 10m). In this case, the penalties are just terms added to the objective function. The optimiser stays the same, but the objective function is modified.

`L'(0) = L(0) + λ(θ),`

where (0) is a **penalty function** with an increasing value as the constraints are more egregiously violated.

*   **Pros**
    *   any optimiser can be used
    *   can deal with soft constraints sensibly
*   **Cons**:
    *   may not respect important constraints, particularly if they are very sharp
    *   can be hard to formulate constraints as penalties
    *   cannot take advantage of efficient search in constrained regions of space

Relaxation of objective functions

It can be much harder to solve discrete optimization and constrained optimization problems efficiently; some algorithms try and find similar continuous or unconstrained optimization problems to solve instead. This is called **relaxation**; a **relaxed** version of the problem is solved instead of the original hard optimization problem. For example, sometimes the constraints in a problem can be absorbed into the objective function, to convert a constrained problem to an unconstrained problem.

Penalisation

**Penalisation** refers to terms which augment an objective function to minimise some other property of the solution, typically to approximate constrained optimisation. This is widely used in approximation problems to find solutions that **generalise well**; that is which are tuned to approximate some data, but not *too* closely.

This is a relaxation of a problem with hard constraints (which needs specialised algorithms) to a problem with a simple objective function which works with any objective function. If you have encountered **Lagrange multipliers** before, these are an example of a relaxation of hard constraints to penalty terms.

Penalty functions

A **penalty function** is just a term added to an objective function which will disfavour "bad solutions".

We can return to the stone throwing example, and extend our model. Say I can control the angle of a stone throw; perhaps I can also control how hard I throw it. But there is a maximum limit to my strength. This is a constraint (an inequality constraint, which limits the maximum value of the strength parameter).

*   Objective function: how far away does the stone land?
*   L(0) = throwąistance(0)
*   Parameters: angle of the throw a and strength of the throw v (exit velocity), θ = [α, υ]
*   Constraint: strength of throw 0 υ Uk, more than zero and less than some maximum strength.

There are two options:

*   Use a constrained optimisation algorithm, which will not even search solutions which exceed the maximum strength.
*   Change the objective function to make over-strenuous throwing unacceptable.

Option 1: constrained optimisation

Use a (pre-existing) algorithm which already supports constraints directly. Guarantees solutions will lie inside bounds.

Option 2: add a penalty term

`L'(0) = L(0) + x(theta)`

Properties of the objective function

Convexity, global and local minima

An objective function may have **local minima**. A **local minimum** is any point where the objective functions increases in every direction around that point (that parameter setting). Any change in the parameters at that point increases the objective function.

An objective function is **convex** if it has a *single, global minimum*. For example, every quadratic function is a parabola (in any number of dimensions), and thus has exactly one minimum. Other functions might have regions that have local minimums but which **aren't** the smallest possible value the function could take on.

**Convexity** implies that finding any minimum is equivalent to finding the global minimum -- the guaranteed best possible solution. This minimum is the global minimum. In a convex problem, if we find a minimum, we can stop searching. If we can show there is *no* minimum, we can also stop searching.

Images: examples of convex and non-convex objective functions

Convex optimisation

If the objective function is **convex and** any constraints form convex portions of the search space, then the problem is **convex optimisation**. There are very efficient methods for solving convex optimisation problems, even with tens of thousands of variables. These include:

*   the constraints and objective function are linear (**linear programming**)
*   quadratic objective function and linear constraints (**quadratic programming**)
*   or a some specialised cases (**semi-quadratic programming, quadratically constrained quadratic program**).

These are incredible powerful algorithms for solving these specific classes of optimisation problems.

Nonconvex problems require the use of **iterative** methods (although ways of *approximating* nonconvex problems with convex problems do exist).

Continuity

An objective function is **continuous** if for some very small adjustment to θ there is an *arbitrarily* small change in L(0). This means that there will never be "nasty surprises" if we move slowly enough through the space of θ; no sudden jumps in value.

If a function is discontinuous, local search methods are not guaranteed to converge to a solution. Optimisation for discontinuous objective functions is typically much harder than for continuous functions. This is because there could be arbitrary changes in the objective function for any adjustment to the parameters.

Continuity is what can make continuous optimisation easier than discrete optimisation. As we will see next week, being continuous and **differentiable** makes continuous optimisation even more powerful.

Algorithms

Direct convex optimisation: least squares

Sometimes we have an optimisation problem which we can specify such that the solution can be computed in one step. An example is **linear least squares**, which solves objective functions of the form:

`arg min L(x) = || Ax - y||2,`
`x`

that is, it finds x that is closest to the solution Ax = y in the sense of minimising the squared L2 norm. The squaring of the norm just makes the algebra easier to derive.

This equation is **convex** -- it is a quadratic function and even in multiple dimensions it must have a single, global minimum, which can be found directly. The reason we *know* it is convex is that it has no terms with powers greater than 2 (no x³ etc.) and so is quadratic. Quadratic functions only ever have zero or one minimum.

The solution is given by solving the system of **normal equations**:

`(ATA) x = Ay`

and therefore our solution is

`x* = (ATA) Ay`

which can also be written as

`x* = A+y`

where A+ is the **Pseudo-Inverse** of A.

Line fitting

We will examine this process for the simplest possible **linear regression** example: finding gradient *m* and offset *c* for the line equation

`y = mx + c`

such that the squared distance to a set of observed (x, y) data points is minimised. This is a search over the 0 = [m, c] space; these are the parameters. The objective function is L(0) = ∑i(y - mxi - c)², for some known data points [Xo, Yo], [X1, Y1], etc.

We can solve this directly using the **pseudo-inverse** via the SVD. This is a problem that can be solved directly in one step.

For demonstration, we will use a line with the equation

`y = 2x + 1, m = 2, c = 1`

where we have a collection of noisy observations from this function.

Iterative optimisation

**Iterative optimisation** involves making a series of steps in parameter space. There is a **current parameter vector** (or collection of them) which is adjusted at each iteration, hopefully decreasing the objective function, until optimisation terminates after some **termination criteria** have been met.

Iterative optimisation algorithm:

1.  choose a starting point x_0
2.  while objective function changing
    A.  adjust parameters
    B.  evaluate objective function
    C.  if better solution found than any so far, record it
3.  return best parameter set found

Regular search: grid search

**Grid search**, is a straightforward but inefficient optimisation algorithm for multidimensional problems. The parameter space is simply sampled by equally dividing the feasible set in each dimension, usually with a fixed number of divisions per dimension.

The objective function is evaluated at each θ on this grid, and the lowest loss θ found so far is tracked. This is simple, and can work for 1D optimisation problems. It is sometimes used to optimise *hyperparameters* of machine learning problems where the objective function may be complex but finding the absolute minimum isn't essential.

Revenge of the curse of dimensionality

Why bother optimising? Why not just search every possible
parameter configuration?

Even in relatively small parameter spaces, and where the objective function is known to be smooth this doesn't scale well. Simply divide up each dimension into a number of points (maybe 8), and then try every combination on the grid of points that this forms, choosing the smallest result.

[Image: grid search breaks down in high dimensions]

While this is fine in 1D (just check 8 points) and 2D (just check 64 points), it breaks down completely if you have a 100 dimensional parameter space. This would need

evaluations of the objective function! The synthesizer above has around 100 dimensions, as an example.

Even just 3 points in each dimension is totally unreasonable:

Density of grid search

If the objective function is not very smooth, then a much denser grid would be required to catch any minima.

Real optimisation problems might have hundreds, thousands or even billions of parameters (in big machine learning problems). Grid search and similar schemes are *exponential* in the number of dimensions of the parameter space.

Pros

*   Works for any continuous parameter space.
*   Requires no knowledge of the objective function.
*   Trivial to implement.

Cons

*   **Incredibly** inefficient
*   Must specify search space bounds in advance.
*   Highly biased to finding things near the "early corners" of the space.
*   Depends heavily on number of divisions chosen.
*   Hard to tune so that minima are not missed entirely.

Hyperparameters

Grid seach depends on the **range** searched and the spacing of the **divisions** of the grid. Most optimisation algorithms have similar properties that can be tweaked.

These properties, which affect the way in which the optimiser finds a solution, are called **hyperparameters**. They are not parameters of the objective function, but they do affect the results obtained.

A perfect optimiser would have no hyperparameters -- a solution should not depend on how it was found. But in practice, all useful optimisers have some number of hyperparameters which will affect their performance. Fewer hyperparameters is usually better, as it is less cumbersome to tune the optimiser to work.

Simple stochastic: random search

The simplest such algorithm, which makes **no** assumptions other than we can draw random samples from the parameter space, is **random search**.

The process is simple:

*   Guess a random parameter 0
*   Check the objective function L(0)
*   If L(0) < L(0*) (the previous best parameter 0*), set 0* = 0

There are many possibilities for a termination condition, such as stopping after a certain number of iterations after the last change in the best loss. The simple code below uses a simple fixed iteration count and therefore makes no guarantee that it finds a good solution at all.

Pros

*   Random search cannot get trapped in local minima, because it uses no local structure to guide the search.
*   Requires no knowledge of the structure of the objective function - not even a topology.
*   Very simple to implement.
*   Better than grid search, almost always.

Cons

*   **Extremely inefficient** and is usually only appropriate if there is no other mathematical structure to exploit.
*   Must be possible to randomly sample from the parameter space (usually not a problem, though).
*   Results do not necessarily get better over time. Best result might be found in the first step or a million steps later. There is no way to predict how the optimisation will proceed.

bogosort

The (joke) sorting algorithm **bogosort** uses random search to sort sequences. The algorithm is simple:

*   randomise the order of the sequence
*   check if it is sorted
    *   if it is, stop; otherwise, repeat

This is amazingly inefficient, taking O(n!) time to find a solution, which is even worse than exponential time. In this application, the parameter space (all possible orderings) is so huge that random search is truly hopeless. It is particularly poor because of the binary nature of the loss function -- either it is perfect, or it is disregarded, so we will never even get approximately correct results.

However, it is a correct implementation of a sorting algorithm.

Metaheuristics

There are a number of standard **meta-heuristics** than can be used to improve random search.

These are:

*   **Locality** which takes advantage of the fact the objective function is likely to have similar values for similar parameter configurations. This assumes **continuity** of the objective function.
*   **Temperature** which can change the rate of movement in the parameter space over the course of an optimisation. This assumes the existence of local optima.
*   **Population** which can track multiple simultaneous parameter configurations and select/mix among them.
*   **Memory** which can record good or bad steps in the past and avoid/revisit them.

Locality

**Local search** refers to the class of algorithms that make *incremental* changes to a solution. These can be much more efficient than random search or grid search when there is some continuity to the objective function. However, they are subject to becoming trapped in **local minima**, and not reaching the **global minimum**. Since they are usually exclusively used for nonconvex problems, this can be a problem.

This implies that the output of the optimisation depends on the **initial conditions**. The result might find one local minimum starting from one location, and a different local minimum from another starting parameter set.

Local search can be thought of forming **trajectory** (a path) through the parameter space, which should hopefully move from high loss towards lower loss.

Hill climbing: local search

**Hill climbing** is a modification of random search which assumes some topology of the parameter space, so that there is a meaningful concept of a **neighbourhood** of a parameter vector; that we can make incremental changes to it. Hill climbing is a form of **local search**, and instead of drawing samples randomly from the parameter space, randomly samples configurations *near* the current best parameter vector. It makes incremental adjustments, keeping transitions to neighbouring states only if they improve the loss.

**Simple hill climbing** adjusts just one of the parameter vector elements at a time, examining each "direction" in turn, and taking a step if it improves things. **Stochastic hill climbing** makes a random adjustment to the parameter vector, then either accepts or rejects the step depending on whether the result is an improvement.

The name *hill climbing* comes from the fact that the algorithm randomly wanders around, only ever taking uphill (or downhill, for minimisation) steps. Because hill climbing is a **local search** algorithm, it is vulnerable to getting stuck in local minima. Basic hill climbing has no defence against minima and will easily get trapped in poor solutions if they exist. Simple hill climbing can also get stuck behind **ridges** and all forms of hill climbing struggle with **plateaus** where the loss function changes slowly.

Pros

*   Not much more complicated than random search
*   Can be *much* faster than random search

Cons

*   Hard to choose how much of an adjustment to make
*   Can get stuck in minima
*   Struggles with objective function regions that are relatively flat
*   Requires that the objective function be (approximately) continuous

Again, there are many ways this basic algorithm can be tweaked:

*   **adaptive local search** where the size of the neighbourhood can be adapted (e.g. if no improvement in *n* iterations, increase size of random steps)
*   **multiple restarts** can be used to try and avoid getting stuck in local minima by running the process several times for random initial guesses. This is another meta-heuristic -- a heuristic applied to the search algorithm itself.

Temperature

Simulated annealing: temperature schedules and minima escaping

**Simulated annealing** extends hill-climbing with the ability to sometimes randomly go uphill, instead of always going downhill. It uses a **temperature schedule** that allows more uphill steps at the start of the optimisation and fewer ones later in the process. This is used to overcome ridges and avoid getting stuck in local minima.

The idea is that allowing random "bad jumps" early in a process can help find a better overall configuration.

Image: hill climbing would get stuck in the local minimum at the left. Simulated annealing would sometimes accept "bad" local changes to ride over hills and get to a better minimum.

The "temperature schedule" comes from the idea of **annealing** metals. Molten metals have molecules bouncing around all over the place. As they cool, the random bouncing gets smaller and smaller as the molecules lock together into a tight lattice. Fast cooling results in less well structured metals than slow cooling.

More complicated example: finding evenly spaced points

This isn't very impressive for the line fitting, which is a very simple convex function; there are no local minima to get trapped in. We can look at the problem of finding a collection of points that are evenly spaced. This is non-convex (and has an infinite number of equal minima), and much harder to solve than fitting a line to some points.

This is a task particularly suited to simulated annealing-style approaches.

Population

Another nature-inspired variant of random search is to use a **population** of multiple competing potential solutions, and to apply some analogue of **evolution** to solving optimisation. This involves some of:

*   **mutation** (introducing random variation)
*   **natural selection** (solution selection)
*   **breeding** (interchange between solutions)

This class of algorithms are often called **genetic algorithms** for obvious reasons. All genetic algorithms maintain some population of potential solutions (a set of vectors 01, 02, 03, . . .), and some rule which is used to preserve some members of the population and cull others. The parameter set is referred to as the **genotype** of a solution.

Simple population approaches simply use small random perturbations and a simple selection rule like "keep the top 25% of solutions, ordered by loss". Each iteration will perturb the solutions slightly by random mutation, cull the weakest solutions, then copy the remaining "fittest" solutions a number of times to produce the offspring for the next step. The population size is held constant from iteration to iteration. This is just random local search with population. The idea is that this can explore a larger area of the space than simple local search and maintain multiple possible hypotheses about what might be good during that time.

Crossover rules

More advanced algorithms introduce some form of **breeding** or **crossover**. David Mackay's chapter "Why have Sex? Information Acquisition and Evolution " explains some of the motivation for introducing sexual reproduction. Crossover introduces some combination of the fittest solutions as the next iteration (sexual reproduction), instead of simply copying the "parents" (asexual reproduction).

In other words, crossover "merges" two possible parameter vectors @mum and Odad to form a new child parameter dbaby (although of course we are not limited to just two sexes). Crossover works well when the parameter vector can be partitioned into distinct components, where offspring can plausibly inherit good qualities from both parents. It works less well when the crossover simply becomes a mishmash of parent qualities which average out.

Genetic algorithms have been used for many practical problems which are hard to solve with existing techinques, like antenna design for spacecraft.

Image: The 2006 NASA ST5 spacecraft antenna. This complicated shape was found by an evolutionary computer design program to create the best radiation pattern. Source: Wikipedia, public domain

There is a very interesting article on Damn Interesting about a genetic algorithm which "learned" to use a subtle hardware feature the designers didn't even know about to optimise a circuit; an example of how the general approach of optimisation can help solve problems without expert insight.

Animation from Flexible Muscle-Based Locomotion for Bipedal Creatures Geijtenbeek, T., van de Panne, M. & Stappen, A.F. van der (2013)

There are many, many variations of genetic algorithms, including isolating populations to get "island-like" specialised selection, variable mutation rates, hybrid simulated annealing approaches, and so on.

Genetic algorithms: population search

Pros

*   Easy to understand and applicable to many problems.
*   Requires only weak knowledge of the objective function
*   Can be applied to problems with both discrete and continuous components.
*   Some robustness against local minima, although hard to control.
*   Great flexibility in parameterisation: mutation schemes, crossover schemes, fitness functions, selection functions, etc.

Cons

*   Many, many "hyperparameters" to tune which radically affect the performance of the optimisation. How should you choose them?
*   No guarantee of convergence; *ad hoc*.
*   (Very) slow compared to using stronger knowledge of the objective function.
*   Many evaluations of objective function are required: one per population member per iteration.

Memory

The optimisation algorithms we have seen so far are **memoryless**. They investigate some part of the solution space, check the loss, then move on. They may end up checking the same, or very similar, solutions over and over again. This inefficiency can be mitigated using some form of **memory**, where the optimiser remembers where "good" and "bad" bits of the parameters space are, and makes decisions using this memory. In particular, we want to remember good **paths in solution space**.

Memory + population

Ant colony optimisation

.Original Image (without the meme text!) by Sam Droege shared public domain

Ants are really good at finding food (exploration), and then leading the whole colony to the food source to explore and extract all of the food (exploitation). They do this, without requiring any complex coordination. Instead, ants wander about until they find something to eat. Then, they leave a trail of *pheromones* (smells) behind them and wander back to the anthill. Other ants can follow this trail to find the food and check the whole area for any really tasty bits.

**Ant colony optimisation** combines memory and population heuristics. It uses the idea of **stigmergy** to optimise problems:

stigmergy: A mechanism of spontaneous, indirect coordination between agents or actions, where the trace left in the environment by an action stimulates the performance of a subsequent action. [wiktionary.org]

.Stigmergy explains how *termites* are able to construct vast, sophisticated "buildings" to live in despite their tiny brains. Image by david55king shared CC BY

In terms of optimisation this means:

*   having a population of parameter sets ("ants")
*   having a memory of good paths through the space ("pheromones")

Ants who find good parts of the space (i.e. low objective function) leave a trail of positive "pheromones", by storing marker vectors. Other ants will move towards those pheromones, and eventually follow paths that lead to good solutions. Over time (i.e. as iterations increase), the pheromones evaporate so that the ants don't get constrained into one tiny part of the space. Instead of using the physical environment, we use auxiliary data structures to memorise good paths through the parameter space, to avoid repetitious searching.

ACO is particularly well suited to path-finding and route-finding algorithms, where the memory structure of the pheromone trail corresponds to the solution structure.

Pros

*   Can be very effective in spaces where good solutions are separated by large, narrow valleys.
*   Can use fewer evaluations of the objective function than genetic algorithm if pheromones are effective.
*   When it works, it really works.

Cons

*   Moderately complex algorithm to implement.
*   No guarantee of convergence; *ad hoc*.
*   Even *more* hyperparameters than genetic algorithms.
*   People think you work with ants.

Quality of optimisation

Convergence

An optimisation algorithm is said to **converge** to a **solution**. In convex optimisation, this means that the **global minimum** has been found and the problem is solved. In non-convex optimisation, this means a **local minimum** has been found from which the algorithm cannot escape.

A good optimisation algorithm converges quickly. This means that the drop in the objective function should be steep, so that each iteration is making a big difference. A bad optimisation algorithm does not converge at all (it may wander forever, or diverge to infinity). Many optimisation algorithms only converge under certain conditions; the convergence depends on the initial conditions of the optimisation.

Guarantees of convergence

Some optimisation algorithms are guaranteed to converge if a solution exists; while others (like most heuristic optimisation algorithms) are not guaranteed to converge even if the problem has a solution. For example, a random search might wander the space of possibilities forever, never finding the specific configuration that minimises (or even reduces) the loss.

For iterative solutions, a plot of the objective function value against iteration is a helpful tool in diagnosing convergence problems. Ideally, the loss should drop as fast as possible.

Example

This example shows the linear regression problem with the heuristic methods and gradient descent (which is *much* faster). This problem is convex and has no local minima, so hill climbing and simulated annealing have similar performance.

Tuning optimisation

Optimisation turns specific problems into ones that can be solved with a general algorithm, as long as we can write down an objective function. However, optimisation algorithms have **hyperparameters**, which affect the way in which the search for the optimum value is carried out. Using optimisers effectively requires adjusting these hyperparameters.

Use the right algorithm

*   If you know the problem is **least-squares** use a specialised least-squares solver. You might be able to solve directly, for example with the pseudo-inverse.
*   If you know the problem is **convex**, use a convex solver. This is radically more efficient than any other choice if its applicable.
*   If you know the derivatives of the objective function, or can compute them using automatic differentiation, use a **first-order** method (or second order, if you can)
*   If you don't know any of these things, use a general purpose **zeroth-order** solver like **simulated annealing** or a **genetic algorithm**.

What can go wrong?

Slow progress

Slow progress typically occurs in local search where the steps made are too small. For example, gradient descent with a very small d or hill climbing with a tiny neighbourhood function will only be able to search a very small portion of the space. This will correspond to a very slowly decreasing loss plot.

Noisy and diverging performance

Local search can also become unstable, particularly if jumps or steps are too large an the optimiser bounces around hopelessly. The optimisation can diverge if the objective function has infinitely decreasing values in some direction ("the abyss"), and this typically requires constraints to limit the **feasible set**.

Getting stuck

Some optimisers can get stuck, usually at critical points of the objective function.

*   **Plateaus** can cause memoryless algorithms to wander, and derivative-based algorithms to cease moving entirely. Techniques like **momentum** and other forms of **memory** can limit this effect.
*   **Local minima** can completely trap pure local search methods and halt progress. Some metaheuristics, like random restart can mitigate this.
*   **Saddle points** can trap or slow gradient descent methods, which have trouble finding the *best* direction to go in when the function is increasing in some directions and decreasing in others.
*   **Very steep or discontinuous** objective functions can produce insurmountable barriers for gradient descent. Stochastic methods, like stochastic gradient descent, can "blur out" these boundaries and still make progress.

Resources

*   Khan academy: Multivariable calculus, particularly "Thinking about multivariable functions", "Derivatives of multivariable functions" and "Applications of multivariable derivatives"

Beyond this course

*   **When least is best: How Mathematicians Discovered Many Clever Ways to Make Things as Small (or as Large) as Possible** by Paul J. Nahin An interesting and mathematically thorough description of the history of optimisation from a mathematical standpoint.
