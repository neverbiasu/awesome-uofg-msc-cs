# 2025_26_DL_Lecture5A_Optimization,_Generalization,_Regularization

<!-- Page 1 -->

LECTURE 5B – OPTIMIZATION, GENERALIZATION, REGULARIZATION Kevin Bryson Deep Learning https://alykhantejani.github.io/a - brief - introduction - to - gradient - descent/


<!-- Page 2 -->

Example: 1D Linear regression training


<!-- Page 3 -->

Example: 1D Linear regression training


<!-- Page 4 -->

Example: 1D Linear regression training


<!-- Page 5 -->

Example: 1D Linear regression training


<!-- Page 6 -->

This technique is known as gradient descent Example: 1D Linear regression training


<!-- Page 7 -->

Gradient descent Step 1: Compute derivatives (slopes of function) with Respect to the parameters


<!-- Page 8 -->

Step 1: Compute derivatives (slopes of function) with Respect to the parameters Gradient descent


<!-- Page 9 -->

Step 1: Compute derivatives (slopes of function) with Respect to the parameters Gradient descent


<!-- Page 10 -->

Step 1: Compute derivatives (slopes of function) with Respect to the parameters Gradient descent


<!-- Page 11 -->

Step 1: Compute derivatives (slopes of function) with Respect to the parameters Step 2: Update parameters according to rule 𝛼 = step size or learning rate if fixed Gradient descent


<!-- Page 12 -->

Step 1: Compute derivatives (slopes of function) with Respect to the parameters Step 2: Update parameters according to rule 𝛼 = step size Gradient descent


<!-- Page 13 -->

Gradient descent


<!-- Page 14 -->

Step 1: Compute derivatives (slopes of function) with Respect to the parameters Step 2: Update parameters according to rule 𝛼 = step size Gradient descent


<!-- Page 15 -->

Step 1: Compute derivatives (slopes of function) with Respect to the parameters Step 2: Update parameters according to rule 𝛼 = step size Gradient descent


<!-- Page 16 -->

Gradient descent


<!-- Page 17 -->

Deep Learning does not usually have a convex loss function … Non convex Non - Convex Convex


<!-- Page 18 -->

Optimization Challenges – Local Minima ▪ We can have many local minima (and often do) – many of which may be shallow local minima. ▪ Can we get past these to find a lower loss? ▪ Although, for larger models this does not seem to be a major problem ▪ Check by plotting the norm of the gradient over time – if it doesn’t decrease to insignificant size, the problem isn’t a local minimum. 18


<!-- Page 19 -->

Saddle Points … ▪ These are local minima in some directions, and local maxima in others. ▪ They are very common in high dimensional spaces where the “Hessian matrix” has a mix of positive and negative eigenvalues in n - dimensional space since it is exponentially unlikely that they are all positive (giving a minima). ▪ Can cause issues since magnitude of gradient is very different in different directions (which is a common theme that causes optimization issues). 19


<!-- Page 20 -->

Cliffs … 20 Cliffs and exploding gradients ◦ Some deep networks have very steep regions in the objective function, often from multiplication of large weights together (e.g. in recurrent networks), which leads to high derivatives, so a gradient descent update can catapult parameters far from optimality. ◦ Clipping gradients are options to fix this. Inexact noisy gradients and bumpy loss functions ◦ While algorithms assume a perfect gradient, we usually have a numerical approximation based on sampling - based estimates which can cause issues in some cases. ◦ Essentially bumps need to be smoothed out !


<!-- Page 21 -->

Plateaus and Flat Regions ◦ Some areas of the loss surface may be very flat compared to other areas. ◦ These can cause similar issues to vanishing gradients – that Stochastic Gradient Descent becomes ineffective with a fixed learning rate as only very small changes are made to parameter values. ◦ This causes the algorithm to spend a long time trying to get across flat areas of the loss surface. ◦ Again, we have the theme of very large gradients (cliffs) mixed with very small gradients causing issues for a fixed learning rate. 21


<!-- Page 22 -->

Steep Valleys … We will introduce two key innovations that can potentially help with these issues – 1. Momentum 2. Adaptive Learning Rate Methods (ADAM) 22 ◦ Steep valleys have large gradients in one direction with small gradients in another. ◦ These can cause issues with a fixed step size since the algorithm can spend all its time going from one side of the valley to another and not making progress down the shallow gradient to the minimum.


<!-- Page 23 -->

Motivating Example: Gabor Function


<!-- Page 24 -->

Gabor model


<!-- Page 25 -->

Loss Surface We want to optimize a Gabor Model to fit a given dataset (orange points). This shows the loss surface for various choices of parameters. You can see that dark areas represent valleys with low loss and well - fitting data and light areas are mountains with higher loss values.


<!-- Page 26 -->

Gradient descent gets to the global minimum if we start in the right “valley” Otherwise, descent to a local minimum Or get stuck near a saddle point.


<!-- Page 27 -->

Stochastic gradient descent Before (full batch descent) After (SGD) Fixed learning rate α


<!-- Page 28 -->




<!-- Page 29 -->

Properties of SGD Can escape from local minima Adds noise, but still sensible updates as based on part of data Uses all data equally Less computationally expensive Seems to find better solutions Doesn’t converge in traditional sense Learning rate schedule helps convergence – decrease learning rate over time


<!-- Page 30 -->

Standard SGD Algorithm 30


<!-- Page 31 -->

What size batch to use? Larger batches give more accurate gradients, but with less than linear returns GPU - like multicore architectures typically underutilised by small batches, so below some minimum size there is no computational saving of cutting batch size Memory scales with the batch size, so for larger networks, this is often the limiting factor. Depending on hardware, GPUs often run better on power - of - 2 batch sizes. Typical uses will be minibatch sizes from 32 to 256 Small batches can have a regularising effect because of the noise they add to the learning process. ◦ (might need small learning rate,and will have long learning time computationally). 31


<!-- Page 32 -->

Improving SGD: Momentum Designed to accelerate learning, especially with small consistent gradients or noisy gradients Accumulates exponentially decaying moving average of past gradients (as a velocity). Inspired from physical interpretation of the optimization process: Imagine you have a small ball rolling on a surface defined by the loss function. 32 Hyperparameters


<!-- Page 33 -->

Momentum Red line shows movement with momentum whereas black arrows show gradient. Momentum helps: ❑ To follow this valley down even though it has problematic steep sides (it is ill - conditioned). ❑ Smoothing out the direction of the stochastic gradients. ❑ Get past shallow local minimum and flat areas.


<!-- Page 34 -->

SGD Algorithm with momentum 34


<!-- Page 35 -->




<!-- Page 36 -->

Adaptive Learning Rates The learning rate turns out to be one of the most Important hyper - parameters for fast and successful optimization of a deep neural network. A key issue is when one parameter has a steep loss gradient and another a shallow loss gradient (like this example). You want to take big learning rate steps when the gradient is shallow but much smaller steps when the gradient is step ! There are many adaptive learning rate algorithms but we will look at a couple of popular ones called RMSprop and ADAM.


<!-- Page 37 -->

Steep valley issues with gradient descent: learning rate is either too small or too big


<!-- Page 38 -->

Adaptive Learning Rate: RMSprop 38 The step size for individual parameters is divided by the accumulated squared gradient for that parameter. Parameters with consistently large gradients take small steps and those with consistently small gradients take larger steps.


<!-- Page 39 -->

ADAM ( ADAptive Moments) Variant of RMSProp + momentum with a few important distinctions 1. Momentum is incorporated directly via an estimate of the first order moment of the gradient (essentially summing the gradients with exponential decay weighting like the velocity before). 2. Adaptive weighting is incorporated via an estimate of the second order moment of the gradient (essentially summing the gradient squares for individual parameters similar to RMSprop). To date, ADAM has largely become one of the most popular optimization algorithm for training deep learning systems, partly because it is quite robust to a wide range of hyperparameter values. 39


<!-- Page 40 -->

ADAM 40 Incorporates momentum via the accumulated first moment (gradient terms). Does adaptive weighting of parameters via the accumulated second moment (gradient squared terms).


<!-- Page 41 -->

Adaptive moment estimation (Adam)


<!-- Page 42 -->

Parameter initialisation ❑ Good initialization of parameters can strongly affect performance (speed of learning and final generalisation error), and whether the network converges at all. ❑ An initialisation strategy tries to achieve some ‘nice’ property to start with, but do these get maintained during learning? ❑ Most basic is ‘symmetry breaking’. What would happen if all weights were initialised identically? Hence random initialization is important. ❑ Also making weights too large can lead to saturation of neurons or explosion of forward values or gradients. ❑ Typically use small random weights from Gaussian or uniform distributions. 42


<!-- Page 43 -->

43 Example initialisation heuristics Xavier (or Glorot ) Uniform Initialization for sigmoid / tanh For this layer: m = 3 inputs n = 4 output torch.nn.Linear Layer API


<!-- Page 44 -->

Exploding gradients Vanishing gradients One of the key properties is to obtain stable gradients He or Kaiming Initialization (for ReLUs ) See: torch.nn.init


<!-- Page 45 -->

45 S ummary Parameter optimization is an important topic for deep learning – all these techniques help to speed up or make optimization more robust by handling difficult aspects of the loss surface: 1. SGD minibatch size 2. Momentum 3. Adaptive Learning Rate Methods (RMSprop and ADAM) 4. Parameter initialization Background Reading Understanding Deep Learning (Simon Prince) Chapter 6 (Fitting Models) and the last part of Chapter 7 provide more detail about this material. Relevant sections of Chapter 4 and Chapter 8 of Goodfellow et al 2018 ◦ https://www.deeplearningbook.org/contents/optimization.html