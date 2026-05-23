# 2025_26_DL_Lecture5B_Optimization,_Generalization,_Regularization

<!-- Page 1 -->

LECTURE 5B – OPTIMIZATION, GENERALIZATION, REGULARIZATION Kevin Bryson Ack nowledg ement s: E lement s of St at is t ic al Learning Theory by H as t ie, Tibs h iran i , Friedm an . Deep Learning William of Ockham


<!-- Page 2 -->

How many boxes are there? (Mackay 2003)


<!-- Page 3 -->

How many boxes are there? (Mackay 2003)


<!-- Page 4 -->

Ockham’s razor "Entities are not to be multiplied without necessity" ( Non sunt multiplicanda entia sine necessitate ) Essentially states that simplest model that fits the data is more likely to be correct than complex ones.


<!-- Page 5 -->

Bias, Variance and Model Complexity Elements of Statistical Learning Theory, Section 7.2 Curves in Red = d ifferent test sets Curves in Blue = d ifferent training sets Overfitting Underfitting 1. Accuracy is a random variable depending on test & training sets (and many other things). 2. Good training set performance does not guarantee test set performance ! (Generalization …)


<!-- Page 6 -->

Regression example


<!-- Page 7 -->

Toy neural network model It has K hidden units. First layer fixed so “joints” divide interval evenly (this is what ReLUs do). The second layer is trained to produce different piecewise linear functions. But this model is then linear in h so convex loss function so can find best solutions in closed form (which means we can analyze it effectively).


<!-- Page 8 -->

Noise , bias, and variance • Noise in measurements • Some variables not observed • Data mislabeled This is Bayes Error limits and cannot be avoided.


<!-- Page 9 -->

Noise, bias , and variance • Bias is caused by the limitations of how well the model fits ( i.e. the functions it can represent: 3 - piece linear functions in this case).


<!-- Page 10 -->

Noise, bias , and variance • Variance is how much the model varies according to training sets


<!-- Page 11 -->

Noise, bias, and variance ❑ Variance is the uncertainty in fitted model due to choice of training set ❑ Bias is systematic deviation from the mean of the function we are modeling due to limitations in our model ❑ Noise is inherent uncertainty in the true mapping from input to output


<!-- Page 12 -->

Least squares regression only We can show that: Expectation over noise in training data Expectation over noise in test data Best possible model if we had infinite data Actual model True function


<!-- Page 13 -->

Reducing Variance: More training data


<!-- Page 14 -->

Reducing Variance: More training data


<!-- Page 15 -->

Reducing Variance: More training data


<!-- Page 16 -->

Reducing bias and bias - variance tradeoff


<!-- Page 17 -->

Reducing bias and bias - variance tradeoff


<!-- Page 18 -->

Why does variance increase? Overfitting Describes the training data better, but not the true underlying function (black curve)


<!-- Page 19 -->

Bias and variance trade - off Number of datapoints


<!-- Page 20 -->

Regularization • Why is there a generalization gap between training and test data? • Overfitting (model describes statistical peculiarities) • Model unconstrained in areas where there are no training examples • Regularization = methods to reduce the generalization gap • Technically means adding terms to loss function • But colloquially means any method (hack) to reduce gap


<!-- Page 21 -->

Explicit regularization • Standard loss function: • Regularization adds an extra term • Favors some parameters, disfavors others. • 𝜆 >0 controls the strength


<!-- Page 22 -->

Explicit regularization – Gabor Example


<!-- Page 23 -->

Explicit regularization


<!-- Page 24 -->

Explicit regularization


<!-- Page 25 -->

L2 Regularization • Can only use very general terms • Most common is L2 regularization • Favors smaller parameters • Also called Tikhonov regularization, ridge regression • In neural networks, usually just for weights and called weight decay


<!-- Page 26 -->

Why does L2 regularization help? • Discourages slavish adherence to the data (overfitting) • Encourages smoothness between datapoints


<!-- Page 27 -->

L2 regularization


<!-- Page 28 -->

L1 Regularization • Sometimes we want sparse models where most weight parameters should have an optimal value of zero • L2 does not force parameters to be zero • L1 regularization uses the sum of absolute values rather than the sum of squares. • This will encourage parameters to become zero, if 𝜆 is large enough, producing weights that are sparse (lots of zeros). • This has been used as a feature selection mechanism (e.g. LASSO for linear models).


<!-- Page 29 -->

Early stopping as regularisation If we stop training early, weights don’t have time to overfit to noise. Weights start small, don’t have time to get large. Reduces effective model complexity.


<!-- Page 30 -->

Stop at 10,000 iterations before it starts to overfit. ( i.e. start modelling the noise in the data)


<!-- Page 31 -->

Easy with appropriate image transformations - although we have to be careful (not to turn a “b” into a “d” if we are training on letters) Using more training data improves generalization Gathering more training data will improve the accuracy on unseen test data and so is a regularization approach. More training data can be generated through data augmentation.


<!-- Page 32 -->

Adversarial training Adversarial examples that “fool networks” can be generated by adding in just the right type of noise. Training on these adversarial examples (to predict the correct label) can make networks more robust and generalizable.


<!-- Page 33 -->

Another approach to regularization: Ensembles Methods Bagging (short for bootstrap aggregating) is a technique for reducing generalization error by combining several models ( Breiman , 1994). The idea is to train several different models separately, then have all the models vote on the output for test examples. An example of a general strategy in machine learning called model averaging . ◦ Techniques using this strategy are known as ensemble methods . Why does this work? ◦ Different models will usually not make all the same errors on the test set.


<!-- Page 34 -->

Ensemble Methods


<!-- Page 35 -->

Bagging (aka ‘ B ootstrap agg regati ng ’) Bagging uses the same model, training algorithm and objective function to be reused multiple times. It constructs k different training sets by sampling from replacement from the original dataset. (missing some, with duplicates of others). A similar approach where multiple neural networks are trained and they vote on the output is a very effective way of improving generalization. (Although computationally expensive.)


<!-- Page 36 -->

Dropout At every step every neuron can have a probability p of being temporarily ‘dropped out’ for that training step (i.e. the output of these neurons is multiplied by zero). p is the dropout rate. After training there is no dropout but weights are scaled (say to 50%) so that neurons “on average” get the same input signals (or during training they are scaled up to give the same effect).


<!-- Page 37 -->

Dropout Why does such a brutal technique work? ◦ Can be seen as an ensemble approach were one network (with shared weights) is being trained like lots of networks. ◦ Neurons cannot be overly dependent on each other, or on a small subset of inputs, so they become more independent and still work in different environments (like genes which get shuffled during reproduction but can still work). ◦ Forces redundancy (which can be wasteful, but can help make things more robust)


<!-- Page 38 -->

• Transfer learning • Multi - task learning • Self - supervised learning M odel - level approaches for improving generalization


<!-- Page 39 -->

S ummary ❑ Regularization is any technique that helps minimize model overfitting to improve its generalization (i.e. improve its score on the validation or test set). ❑ Often you get better results by creating a high capacity deep neural network and regularize appropriately using: ❑ Parameter Weight Norm Penalties like L1 and L2. ❑ Early Stopping as a regularization method ❑ Data Augmentation and adding noise to inputs to make the network more robust. ❑ Ensemble methods (using multiple trained networks) and Dropout Regularization. ❑ Transfer learning and multi - task learning. Background Reading Understanding Deep Learning (Simon Prince) Chapter 8 and 9. Chapter 7 of Goodfellow et al 2018