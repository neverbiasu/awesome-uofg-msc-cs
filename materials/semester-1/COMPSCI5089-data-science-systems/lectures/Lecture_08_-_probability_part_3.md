# Lecture_08_-_probability_part_3

<!-- Page 1 -->

Introduction to Data Science and Systems Probabilities III – Continuous Random Variables Dr Nicolas Pugeault


<!-- Page 2 -->

Today’s learning outcomes • the specific problems of continuous random variables as compared to discrete random variables • how to model simple data using normal distributions and the central limit theorem • what multivariate distributions are • what Monte Carlo approaches are, and how expectation can be approximated • what population, parameters, statistics and samples are • how estimators and maximum likelihood estimation work • MCMC approaches to sampling posteriors in Bayesian inference


<!-- Page 3 -->

Continuous random variables


<!-- Page 4 -->

Problems with continuous variables Continuous random variables are defined by a PDF (probability density function) , rather than a PMF (probability mass function). A PMF is essentially just a vector of values, but a PDF is a function mapping any interval in its domain to a probability . This brings a number of complexities: • The probability of any specific value is P(X=x)=0: zero for every possible x, yet any value in the support of the distribution function (everywhere the PDF is non - zero) is possible. • There is no direct way to sample from the PDF in the same way as we did for the PMF. But there are several tricks for sampling from continuous distributions. • We cannot estimate the true PDF from simple counts of observations like with the empirical distribution. • How do we do computations with continuous PDFs using Bayes' Rule? • Simple discrete distributions don't have a concept of dimension. But we can have continuous values in R, or in vector spaces R n


<!-- Page 5 -->

Probability distribution functions The PDF f X (x) of a random variable X maps a value x (which might be a real number, or a vector, or any other continuous value) to a single number, the density at the point. It is a function (assuming a distribution over real vectors) R n →R + , where R + is the positive real numbers, and While a PMF can have outcomes with a probability of at most 1, it is not the case that the maximum value of a PDF is f X (x) ≤ 1 - just that the integral of the PDF be 1.


<!-- Page 6 -->

The value of the PDF at any point is not a probability, because the probability of a continuous random variable taking on any specific number must be zero. Instead, we can say that the probability of a continuous random variable X lying in a range ( a,b ) is: Probability distribution functions


<!-- Page 7 -->

The support of a PDF is the domain it maps from where the density is non - zero. • Some PDFs have density over a fixed interval, and have zero density everywhere else ( eg , uniform distribution). This is called compact support . • Some PDFs have non - zero density over an infinite domain ( eg , normal distribution). This is infinite support . Support


<!-- Page 8 -->

The cumulative distribution function or CDF of a real - valued random variable is - the CDF always maps x to [0,1]. - For any given value F X (x) tells us how much probability mass there is that is less than or equal to x. - Given a CDF, we can now answer questions, like: what is the probability that random variable X takes on a value between 3.0 and 4.0? - This is a probability. Cumulative distribution function (CDF)


<!-- Page 9 -->

The most ubiquitous of all continuous PDFs is the normal or Gaussian distribution. It has a density given by the PDF: You do not need to remember this formula, but it is very useful to know that it is essentially just with some scaling factors to normalise it -- this is called the squared exponential function . Example: The Normal Distribution


<!-- Page 10 -->

We use a shorthand notation to refer to the distribution of continuous random variables, variable ∼ distribution (parameters), where ∼ is read as "distributed as". For a normal distribution this is: which is read as: "Random variable X is distributed as [N] ormal with mean μ and variance σ2 “ Note: There are various other symbols used for other continuous distributions, including Γ(α,β),β(α,β),t(ν),χ2(k),… , which we will not cover in this course. Example: The Normal Distribution (cont’d)


<!-- Page 11 -->

The normal distribution places the point of highest density to its center μ (the "mean"), with a spread defined by σ2 (the "variance"). This can be though of the location and scale of the density function. Most standard continuous random variable PDFs have a location (where density is concentrated) and scale (how spread out the density is). Location and scale


<!-- Page 12 -->

Normal modelling It seems that this might be a very limiting choice but there are two good reasons for this to work well as a model in many contexts: 1. Normal variables have very nice mathematical properties and are easy to work with analytically ( i.e. without relying on numerical computation). 2. The central limit theorem tells us that any sum of random variables (however they are distributed) will tend to a Levy stable distribution as the number of variables being summed increases. For most random variables encountered, this means the normal distribution (one specific Levy stable distribution).


<!-- Page 13 -->




<!-- Page 14 -->

If we form a sum of many random variables Y=X1+X2+X3+…, then for almost any PDF that each of X1,X2,… might have, the PDF of Y will be approximately normal, Y ∼ N(μ,σ2) . This means that any process that involves a mixture of many random components will tend to be Gaussian under a wide variety of conditions. Central limit theorem


<!-- Page 15 -->

If we form a sum of many random variables Y=X1+X2+X3+…, then for almost any PDF that each of X1,X2,… might have, the PDF of Y will be approximately normal, Y ∼ N(μ,σ2) . This means that any process that involves a mixture of many random components will tend to be Gaussian under a wide variety of conditions. Central limit theorem


<!-- Page 16 -->

If we form a sum of many random variables Y=X1+X2+X3+…, then for almost any PDF that each of X1,X2,… might have, the PDF of Y will be approximately normal, Y ∼ N(μ,σ2) . This means that any process that involves a mixture of many random components will tend to be Gaussian under a wide variety of conditions. Central limit theorem


<!-- Page 17 -->

If we form a sum of many random variables Y=X1+X2+X3+…, then for almost any PDF that each of X1,X2,… might have, the PDF of Y will be approximately normal, Y ∼ N(μ,σ2) . This means that any process that involves a mixture of many random components will tend to be Gaussian under a wide variety of conditions. Central limit theorem


<!-- Page 18 -->

If we form a sum of many random variables Y=X1+X2+X3+…, then for almost any PDF that each of X1,X2,… might have, the PDF of Y will be approximately normal, Y ∼ N(μ,σ2) . This means that any process that involves a mixture of many random components will tend to be Gaussian under a wide variety of conditions. Central limit theorem


<!-- Page 19 -->

If we form a sum of many random variables Y=X1+X2+X3+…, then for almost any PDF that each of X1,X2,… might have, the PDF of Y will be approximately normal, Y ∼ N(μ,σ2) . This means that any process that involves a mixture of many random components will tend to be Gaussian under a wide variety of conditions. Central limit theorem


<!-- Page 20 -->

If we form a sum of many random variables Y=X1+X2+X3+…, then for almost any PDF that each of X1,X2,… might have, the PDF of Y will be approximately normal, Y ∼ N(μ,σ2) . This means that any process that involves a mixture of many random components will tend to be Gaussian under a wide variety of conditions. Central limit theorem


<!-- Page 21 -->

Multivariate distributions over R n Continuous distributions generalise discrete variables to continuous spaces over R via probability density functions. Probability densities can be further generalised to vector spaces, particularly to R n , under the constraint This is the same as: Distributions with PDFs over vector spaces are called multivariate distributions . In many respects, they work the same as univariate continuous distributions. However, they typically require more parameters to specify their form, since they can vary over more dimensions.


<!-- Page 22 -->

The multivariate uniform distribution is particularly simple to understand. It assigns equal density f X (x i )= f X ( x j ) to some (axis - aligned) box in a vector space Rn, such that It is trivial to sample from; we just sample independently from a one - dimensional uniform distribution in the range [0,1] to get each element of our vector sample. This is a draw from a n - dimensional uniform distribution in the unit box. Multivariate Uniform


<!-- Page 23 -->

If we want to define a distribution over any box, we can simply transform the vectors with a matrix A and shift by adding an offset vector b Transformed uniform distribution


<!-- Page 24 -->

Normal distribution The normal distribution (above) is very widely used as the distribution of continuous random variables. It can be defined for a random variable of any dimension ; a multivariate normal in statistical terminology. We saw the idea of a mean vector μ and a covariance matrix Σ which captured the "shape" of a dataset in terms of an ellipse. These are in fact the parameterisation of the multivariate normal distribution.


<!-- Page 25 -->

Normal distribution • A multivariate normal is fully specified by a mean vector μ and the covariance matrix Σ. If you imagine the normal distribution to be a ball shaped mass in space, the mean translates the mass, and covariance applies a transformation matrix (scale, rotate and shear) to the ball. • Just like the uniform distribution, we can think of drawing samples from a "unit ball" with an independent normal distribution in each dimension. These samples are transformed linearly by the covariance matrix Σ and the mean vector μ, just like A and b above (though Σ is actually A−12 for technical reasons)


<!-- Page 26 -->

Normal distribution


<!-- Page 27 -->

Normal distribution


<!-- Page 28 -->

Joint and marginal PDFs We can look at the PDF of a multivariate normals for different covariances and mean vector ( centres and spreads).


<!-- Page 29 -->

Joint PDF We can now talk about the joint probability density function (density over all dimensions) and the marginal probability density function (density over some sub - selection of dimensions). For example, consider X ∼ N( μ,Σ ), X ∈ R 2 , a two dimensional ("bivariate") normal distribution. We can look at some examples of the PDF, showing: • Joint P(X) • Marginal P(X1) and P(X2) • Conditionals P(X1|X2) and


<!-- Page 30 -->

Marginal PDF


<!-- Page 31 -->

Conditional PDF


<!-- Page 32 -->

Monte Carlo How do we draw samples from a continuous distribution? How can we simulate the outcomes of a random variable X ? This is a vital tool in computational statistics. One of the reasons computers are useful for statistical analysis is that they can generate (pseudo) - random numbers very quickly.


<!-- Page 33 -->

Monte Carlo • During the Manhattan project that developed the atomic bomb during the Second World War, there were many difficult probabilistic equations to work out. • Although analytical techniques for solving certain kinds of problems existed, they were only effective some narrow types of problem and were tricky to apply to the problems that the Manhattan project had to solve.


<!-- Page 34 -->

Monte Carlo John von Neumann and Stanislaw Ulam developed the Monte Carlo method to approximate the answer to probabilistic problems, named after the casinos of Monte Carlo. This involved setting up a simulation with stochastic (random) components. By running the simulation many times with different random behaviour, the population of possible behaviours could be approximated.


<!-- Page 35 -->

Monte Carlo For example, computing the expectation of a function of a random variable can often be hard for continuous random variables. The integral for: may be intractable. However it is often very easy to compute g(x) for any possible x. If we can somehow sample from the distribution P(X=x), then we can approximate this very easily: where xi are random samples from P(X=x), defined by the PDF fX (x). This gets better as N gets larger.


<!-- Page 36 -->

For example, imagine trying to work out the expectation of dart throw. A dart board has sections giving different scores. We might model the position of the dart as a normal distribution over the dart space. This models the human variability in throwing. The expected score of a throw requires evaluating the integral of the normal PDF multiplied by the score at each point -- which isn't feasible to compute directly. Throwing darts


<!-- Page 37 -->

But we can sample from a multivariate normal distribution easily; we saw this in the last unit; just sample from d independent standard normals , and transform with a linear transform (matrix). So instead of trying to solve a very hard integral, we can simulate lots of dart throws, which follow the pattern of the normal distribution, and take the average score that they get. If we simulate a lot of darts, the average will be close to the true value of the integral. Throwing darts


<!-- Page 38 -->

For example, we might want to define a circular score region, which gives us 25 points if we land in it, 50 points if we lie in a smaller coencentric circle, and 0 otherwise; this is our function g(X) . We might model the throw of the dart with a multivariate normal. How do we compute the expected score E[g(X)] ? Bullseye example


<!-- Page 39 -->

Inference


<!-- Page 40 -->

• Inferential statistics is concerned with estimating the properties of an unobserved "global" population of values from a limited set of observed samples . • This assumes that there is some underlying distribution from which samples are being drawn. • This is a hidden process (the "mysterious entity"), which we only partially observe through the samples we see. Inference


<!-- Page 41 -->

Population is the unknown set of outcomes (which might be infinite) • Example the weight of all beetles • Parameter describes this whole population , e.g. the mean weight of all beetles Sample is some subset of the population that has been observed. • Example 20 beetles whose weight has been measured • Statistic is a function of the sample data, e.g. the arithmetic mean of those 20 samples The parameters of the population distribution govern the generation of the samples that are observed. The problem of statistics is how to infer p arameters given samples.


<!-- Page 42 -->

Our model of the world is that there is some unknown entity which generates data that we observe, according to some definite but unknown rules. These rules are codified by a distribution (a "type" of rule) and parameters (the specifics of rules applied). We assume the model has some randomness or stochastic elements, either because it truly does, or because this makes it simpler to represent the model.


<!-- Page 43 -->

Inference is the process of determining these rules ( i.e. the parameters) by looking at the aftermath of the actions of the mysterious entity. These are the samples or observations that we have. From these we can work out what must have been going on in the mysterious entities world. Or at least approximate it as well as we can. We usually assume that we know or have chosen a specific distribution which we expect to be governing the process, and focus on identifying the parameters involved.


<!-- Page 44 -->

We will see three different approaches to doing inference: • Direct estimation of parameters, where we define functions of observations that will estimate the values of parameters of distributions directly . • Maximum likelihood estimation of parameters, where we use optimisation to find parameter settings that make the the observations appear as likely as possible. • Bayesian, probabilistic approaches explicitly encode belief about the behaviour of the mysterious entity using probability distributions. In Bayesian models, we assume a distribution over the parameters themselves, and consider the parameters to be random variables .


<!-- Page 45 -->

An inference scenario: The app rating problem You've written an app, and it'll make you rich. If you can make a version that people really like, that is. So maybe you've released a few different beta version to try out some options. Each user has rated the app with 1 - 5 stars. You need to work out which version is better.


<!-- Page 46 -->

The problem is that you only have a sample of responses. Not every user rated the app, and actually you don't even care about the users who have already bought the app and rated it. You want to know how prospective customers will view it, and by definition you cannot have sampled from this population of users. An inference scenario: The app rating problem


<!-- Page 47 -->

An inference scenario: The app rating problem Imagine we are trying to infer the distribution of app scores assuming that they were generated by a normal distribution . That is, we imagine there is some function like this: This isn't a very good approximation to the real samples; for example, it can generate negative ratings, or ratings with fractional values. It also assumes that all of the ratings that we see are independent of each other ( independence assumption ) and that they are all drawn the same underlying distribution ( identical distribution assumption ). But it is simple to work with, and the problem we have to solve is: given a collection of return values from this function (samples), what values did mu and sigma have? This is a problem of inference


<!-- Page 48 -->

A. Direct estimates


<!-- Page 49 -->

Direct estimation One way of doing inference is to, if we assume a particular form of the distribution ( e.g. assume it is normal), use estimators of parameters (such as the mean and variance) of this population distribution. These estimators are computed via statistics which are summarising functions we can apply to data. These estimators need to specially derived for each specific kind of problem.


<!-- Page 50 -->

• For example, the arithmetic mean, and the standard deviation of a set of observed samples are statistics which are estimators of the parameters of μ and σ normal distribution. • If we have observations (believed to have been) drawn from a normal distribution, we can estimate the parameters μ and σ of that distribution just by computing the mean and standard deviation. Example: mean and variance


<!-- Page 51 -->

Mean The arithmetic mean is sum of sample values x 1 ,x 2 ,…, x n divided by the number of values: Standard estimators


<!-- Page 52 -->

Sample mean The population mean is μ=E[X] for a random variable X . It turns out the arithmetic mean of the observed samples or sample mean , which we write with a little hat μ^ is a good (footnote: good is what statisticians would call "unbiased") estimator of the true population mean μ . As the number of samples increases, our estimate μ^ of the population mean μ gets better and better . It’s important to separate the idea of • the population mean μ, which (usually!) exists but is not knowable directly. It is the expectation of the random variable E[X]. • the sample mean μ^ which is just the arithmetic average of samples we have seen The sample mean is a statistic (a function of observations) which is an estimator of the population mean (which could be a parameter of a distribution). Specific bounds can be put on this estimate; the standard error gives a measure of how close we expect that the arithmetic mean of samples is to the population mean, although the interpretation is not straightforward.


<!-- Page 53 -->

Sample mean example The mean measures the central tendency of a collection of values. The mean vector generalises this to higher dimensions.


<!-- Page 54 -->

Variance and standard deviation The sample variance is the squared difference of each value of a sequence from the mean of that sequence: It is an estimator of the population variance, E[(X−E[X]) 2 ] The sample standard deviation is just the square root of this value. The variance and the standard deviation measure the spread of a collection of values. The covariance matrix Σ generalises this idea to higher dimensions.


<!-- Page 55 -->

If we assume that our data is generated by a normal distribution, then the statistics mean μ^ and variance σ 2 ^ estimate the parameters μ,σ of that normal distribution, N( μ,σ ) . Even if the underlying process isn't exactly normal, it may well be close to being normal because of the Central Limit Theorem. And even if that doesn't apply, the mean and the variance are still useful descriptive statistics . Relation to normal distribution


<!-- Page 56 -->

What does it mean to estimate the parameters of a normal distribution that might be creating app ratings? We are fitting a distribution, governed by a PDF, to a set of observations. But estimating a PDF requires some structure, a space of functions with some parameterisation . We can visualise this: Fitting


<!-- Page 57 -->

We can draw samples from our fitted distribution, and compare them to our results. They won't be a very good representation, because the data we have is clearly not normal. But they show what our tame mysterious entity is producing, and let us assess our modelling assumptions -- that the app ratings were characterised by just a mean and standard deviation. Sampling from the model


<!-- Page 58 -->

B. Maximum Likelihood


<!-- Page 59 -->

Maximum likelihood estimation: estimation by optimisation • What if we don't have estimators, ready built to estimate the parameters that we want? How can we do inference? How can we fit distribution parameters to observations? • In many cases, we can compute the likelihood of an observation being generated by a specific underlying random distribution. This is the likelihood that we saw earlier. • For a PDF, the likelihood of a value x is just the value of the PDF at x: f X (x). • The likelihood is a function of the data, under the assumption of some particular parameters .


<!-- Page 60 -->

The likelihood of many independent observations is the product of the individual likelihoods, and the log - likelihood is the sum of the individual log - likelihoods. Imagine we have a distribution which we don't know any estimators for the parameters. How could we estimate what they might be, given some data? We could write all of our parameters as vector θ; for example a normal distribution would have θ=[ μ,σ ]. Maximum likelihood estimation: estimation by optimisation


<!-- Page 61 -->

Even though we don't have a fixed, closed form function to estimate the parameters, with a likelihood function we can apply optimisation to work out a parameter setting under which the data we actually observed was most likely. This corresponds to twiddling the knobs on our "mysterious entity" machine, until we find one that outputs the largest likelihood values when we feed in samples to it. • If the likelihood depends on some parameters of a distribution θ, then we write: Optimisation solves all problems!


<!-- Page 62 -->

Then, we could define an objective function ; to maximise the log - likelihood, or equivalently to minimise the negative log - likelihood. assuming our f X (x i ) can be written as f( x i ;θ ) to represent the PDF of f with some specific choice of parameters given by θ . Optimisation solves all problems!


<!-- Page 63 -->

Maximum Likelihood estimation This is very similar to the approximation objective function we saw before, ∥ f( x;θ )−y ∥ , but • we have y=0 , and • we only have a scalar output from f so the norm is unnecessary. We already know how to solve this kind of problem; just optimise ! This is called maximum likelihood estimation and is a general technique for determining parameters of a distribution which we don't know given some observations. It will find the best setting of parameters that would explain how the observations came to be.


<!-- Page 64 -->

Maximum Likelihood estimation • If we're lucky, this will be differentiable and we can use gradient descent (or stochastic gradient descent • note that the objective function is a sum of simple sub - objective functions). • If we're not, we can fall back on less efficient optimisers . We don't need special estimators in this case, as long as we can evaluate the PDF f( x;θ ) for any setting of parameters θ . This works for a much wider class of probability distributions .


<!-- Page 65 -->

Fitting a normal with MLE • We can for example look at the problem of estimating the mean and variance of a normal distribution from a set of (assumed to be independent) samples without using estimators; for example our app ratings. • To do this, we need to be able to compute the likelihood for any given sample, and take the product (or rather sum of log likelihoods) for all of those samples. • This gives us our objective function. If we flip the sign, so that we minimise the negative log - likelihood, we will then search for the parameter vector that makes the data most likely. • For a univariate normal distribution, the parameters are just μ and σ, so θ=[ μ,σ ]. • In this case, of course, we do have estimators; but the procedure works just as well when we only have a likelihood function.


<!-- Page 66 -->

code output Fitting a normal with MLE


<!-- Page 67 -->

Fitting a normal with MLE


<!-- Page 68 -->

A mixture model But what if our model was more complicated than just a normal distribution? We could imagine that we model in some other way, perhaps that might be able to capture the fact that app B seems to have two "humps" on either side. One very simple model is a mixture of Gaussians , where we just say that we expect the PDF of the distribution we are trying to fit is a weighted combination (convex sum) of N different normal distributions ("components") N i ( μ i ,σ i ) , each with its own μ i ,σ i , and with a weighting factor λ i that says how important this "component" is, where ∑ i λ i =1 . This lets us represent “ humpy” distributions.


<!-- Page 69 -->

A mixture model This model lets us imagine that ratings might belong to one "cluster" or another. placement and size of each cluster is given by the μ i and σ i for that component and λ i gives an idea of how likely data is to fall into that cluster. We can easily plot the PDF of this function; it's just: where is the standard normal PDF function


<!-- Page 70 -->

Mixture model: Two components


<!-- Page 71 -->

Mixture model: Three components


<!-- Page 72 -->

This is a much more plausible model of our app ratings, and might be a much better model. But how do we fit it? Even if we fix N in advance, we definitely don't have any direct estimators that can estimate the mean and standard deviation (and weighting) of a sum of normal PDFs. This simply isn't something we know how to do. But the (log) likelihood is trivial to write in code: • For each observation x, we just compute the sum of the weighted PDFs for each component, and the result is likelihood for that observation. • This is a function of the data L( θ|x ) , and our parameter vector is θ=[μ1,σ1,λ1,μ2,σ2,λ2,…] . Fitting mixtures


<!-- Page 73 -->

This means we can also fit it with maximum likelihood. We do not require an explicit estimator for the parameters; we can just optimise . In this case, we fix N to 2, and then find the parameters that best fit the data. This is a point in the vector space R 6 ; we need three parameters μ i ,σ i ,λ i for each component i . Fitting mixtures


<!-- Page 74 -->

C. Bayesian Inference


<!-- Page 75 -->

We talk about inferring a posterior distribution over the parameters, given some prior belief and some evidence . We assume that we have a likelihood function P( D|θ ), and a prior over parameters P(θ) and we can then use Bayes Rule in the form: which gives us a new distribution over θ given some observations. Bayesian Inference


<!-- Page 76 -->

Example Remember, we are assuming that app ratings are generated by this function: We want to infer a distribution over μ and σ ( NOT a distribution over the observations!). That is, we will treat the parameters themselves as random variables, with their own distributions, and use Bayesian reasoning ( i.e. applying Bayes Rule) to infer a posterior distribution over the parameters given some prior, and some evidence observed.


<!-- Page 77 -->

Example Parameters and samples • We have a collection of observations D=x1,x2,…, which represent actual app ratings. • We're not sure how much those ratings really tell us about the unseen population of potential users. • We represent the distribution parameters as θ=[ μ,σ ] , and can talk about P(θ) , a distribution over the parameter vectors. Priors • Assume we have some prior belief θ , P(θ) : for example this might be a very simple assumption that our prior is that μ and σ are uniformly distributed • μ ∼ U (1,5) • σ ∼ U (0,10) • This gives us a form for P(θ) .


<!-- Page 78 -->

Likelihood We need to be able to define a likelihood function . This is a function of data given some parameter setting, and in this case it is the same as the likelihood function used for MLE: the likelihood of one sample is just the normal PDF evaluated at that point, and the likelihood of all samples is the product of these likelihoods. Note carefully: in many cases we can only evaluate this likelihood function directly for a specific setting of θ ; but we have a distribution over θ to deal with when doing Bayesian inference.


<!-- Page 79 -->

Inference How can we compute the posterior distribution P( θ|D )? We won't discuss how to find this in closed form (as a function) but rather how to draw samples from this posterior, given a prior and a likelihood and some observations. There is a huge literature on how to solve this problem, which has a few nasty parts: • P( D|θ ) needs to be computed for a distribution over θ, not just some numbers. • which is likely intractable.


<!-- Page 80 -->

Making it tractable: two simplifications Samples will do • We often can't compute P( θ|D ) because we don't know how to do operations on products of functions. But it's often trivial for specific, concrete values of θ . • This leads us to the idea of drawing samples from the posterior distribution P( θ|D ) , instead of trying to compute the distribution exactly.


<!-- Page 81 -->

Making it tractable: two simplifications Samples will do • We often can't compute P( θ|D ) because we don't know how to do operations on products of functions. But it's often trivial for specific, concrete values of θ. • This leads us to the idea of drawing samples from the posterior distribution P( θ|D ), instead of trying to compute the distribution exactly. Relative probability only • We can make a simplifying assumption: we only care about the relative probability of different parameter settings with the data that we actually have , D. That is we have and ignore the fact that this is the posterior scaled by some unknown constant • This only makes sense because we are only considering one model with one set of data in this example.


<!-- Page 82 -->

Markov Chain Monte Carlo We can implement a procedure to sample from the (relative) posterior distribution via a very simple modification of the simulated annealing algorithm. This defines a random walk through the space of parameter settings, proposing small random tweaks to the parameter settings, and accepting "jumps" if they make the estimate more likely, or with a probability proportional to the change in P( D|θ )P(θ) if not. The advantage of this approach is that we can work with definite samples from θ and we don't have to do any tricky integrals. This approach is called Markov Chain Monte Carlo All we require is a way of evaluating P(θ) (prior) and P( D|θ ) (likelihood) for any specific θ .


<!-- Page 83 -->

MCMC in practice: sampling issues We will use Markov Chain Monte Carlo to solve the Bayesian inference problem. The great thing about MCMC approaches is that you can basically write down your model and then run inference directly. There is no need to derive complex approximations, or to restrict ourselves to limited models for which we can compute answers analytically. Essentially, no maths by hand; everything is done algorithmically. MCMC allows us to draw samples from any distribution P(X=x) that we can't sample from directly . In particular, we will be able to sample from the posterior distribution over parameters. The bad thing about MCMC approaches is that, even though it will do the "right thing" asymptotically , the choice of sampling strategy has a very large influence for the kind of sample runs that are practical to execute. Bayesian inference should depend only on the priors and the evidence observed; but MCMC approaches also depend on the sampling strategy used to approximate the posterior.


<!-- Page 84 -->

What distribution are we sampling from? In the case of Bayesian inference • P( θ|D ) is the posterior, the distribution over the parameters θ given the data (observations) D , using: • the likelihood P( D|θ ) , • prior P(θ) and • evidence P(D) . In other words, what is the distribution over the parameters given the observations and the prior? If we assume, as above, that we don't care about P(D) , because we are only comparing different possible values of θ then we can draw samples from a distribution proportional to P( D|θ )P(θ) .


<!-- Page 85 -->

Metropolis - Hastings Metropolis - Hastings (or just plain Metropolis) is a wonderfully elegant and relatively effective way of doing this MCMC algorithm, and is able to work in high - dimensional spaces ( i.e. when θ is complicated). • Metropolis sampling uses a simple auxiliary distribution called the proposal distribution Q( θ′|θ ) to help draw samples from an intractable posterior distribution P( θ|D ) . • This is analogous to what we called the neighbourhood function in the optimisation section. • Metropolis - Hastings uses this to wander around in the distribution space, accepting jumps to new positions using Q( θ′|θ ) to randomly sample the space of P( θ|D ) . This random walk (a Markov chain , because we make a random jump conditioned only on where we currently are) is a the "Markov Chain" bit of "Markov Chain Monte Carlo".


<!-- Page 86 -->

This is just like the simulated annealing algorithm, except now there is a function f X (θ) which makes some steps more likely than others instead of a likelihood function. We just take our current position θ , and propose a new position θ′ , that is a random sample drawn from Q( θ′|θ ) . Often this is something simple like a normal distribution with mean x and some preset σ : Metropolis - Hastings


<!-- Page 87 -->

• The history of accepted samples of an MCMC process is called the trace . • We can estimate model parameters by looking at the histogram of the trace , for example. • The trace is the sequence of samples [x(1),x(2),x(3),…x(n)] , (approximately) drawn from the posterior distribution P( θ|D ) via MCMC. Trace


<!-- Page 88 -->

Applying MCMC


<!-- Page 89 -->

What we have plotted is samples from the posterior distribution of the model parameters ; i.e. the values we expect the model parameters to take on given the data we observed and our prior. The predictive posterior is the distribution over observations we would expect to see; predictions of future samples. This means drawing samples from the model, while integrating over parameters from the posterior. We can do this with a two - step, nested process: • for n repetitions • draw samples from our posterior distribution over parameters to give us a concrete distribution • for m repetitions • draw samples from this concrete distribution Predictive posterior: sampling from the model


<!-- Page 90 -->

Thank you Contact: Nicolas.Pugeault@Glasgow.ac.uk