# Lecture_06_-_probability_part_1

Introduction to Data Science and Systems
Probabilities I – Introduction to probabilities
Dr
 
Nicolas Pugeault

Part 2. Philosophy of probability
There are two schools of thought regarding probability and its uses. We will be (largely) following the 
Bayesian interpretation
, but its worth understanding what that entails. 
- 
Bayesian/Laplacian view
- Frequentist view

Bayesian/Laplacian view on probability
Bayesians
 treat probability as a 
calculus of belief
; 
probabilities are measures of 
degrees of belief
. 
P(A)=0
 means a belief that event 
A
 cannot be true and 
P(A)=1
 is a belief that event 
A
 is absolutely certain. 
In the Bayesian perspective, it makes sense to say "the probability it is raining outside is 0.3" (the probability quantifies our belief about the weather given the information we have). 
Note that is not a statement that we believe that the weather is 0.3 rainy (whatever that means)

Bayesian/Laplacian view on probability (cont’d)
Bayesians
 allow for belief in states to be combined and manipulated via the rules of probability. The key process in Bayesian logic is 
updating of beliefs
. 
Given some:
prior
 belief (it's Glasgow, it's not likely to be sunny) and some
new 
evidence
 (there seems to be a bright reflection inside) we can
update our belief to calculate the 
posterior
 -- our new probability that it is sunny outside.
Bayesian inference requires that we accept priors over events, i.e. that we must explicitly quantify our assumptions with probability distributions. It is an extension of logic to uncertain information.

Bayesian/Laplacian view on probability (example)
For example, in the 
submarine search
: 
the 
prior
 might be that the submarine is probably in the south Atlantic (given the last radio broadcast received).
Evidence
 might be the result of sonar surveys from search ships. 
After each survey, the 
posterior
 probability of the submarine being in the survey area could be updated. 
This represents our belief about where the vessel might be.

Frequentist view of probability
There is an alternative school of thought that considers probabilities to 
only
 be the 
long-term 
behaviour
 of repeated events.
A 
frequentist
 does not accept phrases like "
what is the probability it is sunny just now?
" as there is no long-term 
behaviour
 involved (it is only "now" once). It does not make sense in this world view to talk about the probability of events that can only happen once. 
It 
does
 make sense in a frequentist view to ask things like "
what is the probability it will be sunny on any given day?
" since we can measure this event (sunny or not) for many different days. 
For example, frequentists would not assign a probability to the USS Scorpion being in a specific grid square; this is not an experiment that can be repeated.

Objectivity and subjectivity
Frequentist versus Bayesian debates quickly enter philosophical territory. The diversity of viewpoints and depth of arguments cannot be done justice here.
Very briefly, Bayesian probability theory is sometimes said to be 
subjective
 because it requires the specification of prior belief, whereas frequentist models of probability do not admit the concept of priors and thus is 
objective
.
An alternative view is that the Bayesian model explicitly encodes uncertain knowledge and states universal formal rules for manipulating that knowledge, as formal logic does for definite knowledge. Frequentist methods are objective in the sense that they make statements about universal truths (e.g. asymptotic 
behaviour
), but they do not form a calculus of belief, and thus can't answer many questions of importance directly.

Frequentist vs Bayesian (summary)
Bayesian
Includes 
priors
Probability is a 
degree of belief
(Parameters of population considered to be random variables, data to be known)
Frequentist
No 
priors
Probability is the 
long-term frequency of events
(Parameters of population assumed to be fixed, data to be random)

Superiority of probabilistic models
Regardless of the philosophical model you subscribe to, there is one thing you can be sure of: 
probability is the best
.
There are other models of uncertainty than probability theory that are sometimes used. However, all other representations of uncertainty are 
strictly inferior
 to probabilistic methods 
in the sense that
 a person, agent, computer placing "bets" on future events using probabilistic models has the best possible return out of all decision systems when there is uncertainty.
Any theory with as good a gambling outcome as would be achieved using probability theory is equivalent to probability theory.

Generative models
Consider an urn, into which a number of balls have been poured (by some mysterious entity, say). Each ball can be either black or white.
You pull out four random balls from the urn and observe their 
colour
. You get four white balls.

There are lots of questions you can ask now:
What is the probability that the next ball that is drawn will be white?
This is a 
forward probability
 question. It asks questions related to the distribution of the observations.
What is the distribution of white and black balls in the urn?
This is an 
inverse probability
 question. It asks questions related to unobserved variables that govern the process that generated the observations.
Who is the mysterious entity?
This is an unknowable question. The observations we make cannot resolve this question.
Generative models

Today’s learning outcomes
what probability is, and different philosophical interpretations of it
what inverse and forward probability are
what a random variable, distribution, probability mass/density function are
what the empirical distribution is and how it is computed from data
what expectation/expected value is
the axioms of probability theory

Part 4. A formal basis for probability theory
Sidney Harris (1977), 
The New Yorker

Axioms of probability

Random variables and distributions
A 
random variable
 is a variable that can take on different values, but we do not know what value it has; i.e. one that is "unassigned". 
However, we have 
some knowledge 
which captures the possible states the variable could take on, and their corresponding probabilities. 
Probability theory allows us to manipulate random variables without having to assign them a specific value.

Random variables and distributions
A random variable is written with a capital letter, like 
X
.
A random variable might represent:
the outcome of dice throw (discrete);
whether or not it is raining outside (discrete: binary);
the latitude of the USS Scorpion (continuous);
the height of person we haven't met yet (continuous).

Distributions
A 
probability distribution
 defines how likely different states of a random variable are.
We can see 
X
 as the 
experiment
 and 
x
 as the 
outcome
, with a function mapping every possible outcome to a probability. 
We write 
P(X=x)
 (note the case!), and use the shorthand notations:
P(X=x)
 
the probability of random variable 
X
 taking on value 
x
P(X)
 shorthand for probability of 
X=x
P(x)
 shorthand for probability of specific value 
X=x

Random variables can be continuous (e.g. the height of a person) or discrete (the value showing on the face of a dice).
Discrete variables:
 The distribution of a discrete random variable is described with a 
probability mass function
 
(PMF) which gives each outcome a specific value; imagine a Python dictionary mapping outcomes to probabilities. The PMF is usually written 
f
X
(x)
, 
where 
P(X=x)=
f
X
(x).
Continuous variables:
 A continuous variable has a 
probability density function
 
(PDF) which specifies the spread of the probability over outcomes as a 
continuous function
 
f
X
(x)
. 
It is 
not
 the case that 
P(X=x) = 
f
X
(x) 
for PDFs.
Discrete and continuous

Integration to unity
A probability mass function or probability density function 
must
 sum/integrate to exactly 1, as the random variable under consideration must take on 
some
 value; this is a consequence of unitarity. 
Every repetition of an experiment has exactly one outcome.

A very simple discrete PMF is the expected value of the sum of two six-faced dice. 
P(X=x)=
f
X
(x)
 
takes on values for each possible outcome x 
 {2,3,4,5,6,7,8,9,10,11,12}
 
PMF example: Sum of dice rolls

5. Expectation
The expectation is the "average" of a random variable. it represents what we'd "expect to happen"; the most likely overall "score". 
It can be thought of as a 
weighted sum
 of all the possible outcomes of an experiment, where each outcome is weighted by the probability of that outcome occurring.
For example, in the "pair of dice" scenario, we can compute the expected value of the number of "dots" showing in total after a roll. We compute the probability of each number of dots showing and multiply by that number of dots, and summing the result. This is the expected number of dots showing, on average, or the expectation.

Expectation – definition

Example: the lost submarine
The 
USS Scorpion
 was a nuclear armed submarine that disappeared on 30th June 1968 somewhere in the Atlantic. [This was a year in which 
four
 submarines were inexplicably lost at sea -- 
the 1968 submarine mystery
.]
The search for the submarine was one of the first times 
probabilistic methods
 were used for searching. The US Navy needed to find the submarine and recover it as fast as possible. Probabilistic methods allow us to reason 
precisely
 about things we are uncertain about -- like where the submarine is. Probability gives a concrete, computable representations for an uncertain world.

Expectation: Dice example

Expectation
This is an intuitive property.
Imagine you meet a street hustler, who asks you to play the two dice game. 
He offers you a chance to buy in for £8; you win as many pounds as the show on the top faces of the dice after throwing them. 
Is this a fair game?
No. The expected return is only £7, and you have to put in £8 to play, so the expected result is a £1 loss (sometimes stated as "negative expected value" or -
ve
 EV). If it was £7 to buy in, the game would be fair, in the sense that you and the hustler would not transfer money on average.

Expectation and mean
Expectation corresponds to the idea of a 
mean
 or 
average
 result. 
The expected value of a random variable is the 
true average
 of the value of all outcomes that would be observed if we ran the experiment an infinite number of times. This is the 
population mean
 -- the mean of the whole, possibly infinite, population of a random variable.
Many important properties of random variables can be defined in terms of expectation.
The mean of a random variable X is just E[X]. It is a measure of 
central tendency
.
The variance of a random variable X is var(X)=E[(X−E[X])2]. It is a measure of 
spread
.

Expectation of functions of X
We can apply functions to random variables, for example, the square of a random variable.

Expectation of functions of X
For example, we can compute simple expectations like these:

Expected values and decisions
Expected values are essential in making 
rational decisions
, the central problem of 
decision theory
. They combine scores (or 
utility
) with uncertainty (
probability
).
The expected value gives us a way of deciding, for example, how much it would be worth paying to play a dice game. 
If the units were pounds, we'd break even if we paid £2.33 to play the game and make a profit (on average) if we paid £2.00 to play the game. 
The 
expected average profit
 is just the stake we pay to play each game minus the expected value of one round of the game: 

6. Samples and sampling
Samples
 are observed outcomes of an experiment; we will use the term 
observations
 synonymously, though samples usually refer to simulations and observations to concrete real data.
We can 
sample
 from a distribution; this means simulating outcomes according to the probability distribution of those variables. 
We can also 
observe
 data which comes from an external source that we might believe is generated by some probability distribution. 
For example, we can sample from the sum of dice PMF by rolling two dice and summing the result. This is a 
sample
 or a 
draw
 from this distribution. For discrete random variables, this is easy: we simply produce samples by drawing each outcome according to its probability. 

For discrete data, we can estimate the PMF that might be generating 
observations
 by counting each outcome seen divided by the total number of trials. This is called the 
empirical distribution
.
This can be thought of as the 
normalized histogram
 of counts of occurrences of outcomes.
The empirical distribution

Computing the empirical distribution
For 
discrete random variables
, we can always compute the empirical distribution from a series of observations. 
For example, from the counts of a specific word in a 
corpus
 of text (e.g. in every newspaper article printed in 1994). We just count the number of times each word is seen and divide by the total number of words.
Note that the empirical distribution is a distribution which 
approximates
 an unknown true distribution.
 When N is large it approximates the true PMF assuming the samples are drawn in an 
umbiased
 way. 
However, this approach does not work usefully for 
continuous random variables
, since we will only ever see each observed value once (think about why!).

There are algorithms which can generate 
continuous random numbers which are uniformly distributed in an interval
, such as from 0.0 to 1.0. 
These are actually 
pseudo-random
 numbers in practice (computers are deterministic!) but approximate the statistical properties of true random sequences. 
We must be careful: computers generate 
pseudo-random floating-point numbers
; and not true random real numbers. While this makes little difference much of the time, they are quite different things.
Random numbers
https://realpython.com/numpy-random-number-generator/

Example: the lost submarine
Imagine dividing the possible search areas into grid squares: 
what is the probability that the submarine lies within a specific square?
A map like this might be produced, where squares are colored according to their probability:

Uniform sampling
A 
uniformly distributed
 number has equal probability of taking on any value in its interval and zero probability everywhere else. 
Although this is sampling from a continuous PDF, it is the key building block in sampling from arbitrary PMFs. 
A uniform distribution is notated 
X∼U(
a,b
)
, meaning 
X
 is random variable which may take on values between 
a
 and 
b
, with equal possibility of any number in that interval. 
The symbol 
∼
 is read "
distributed as
", i.e. "
X is distributed as a uniform distribution in the interval [
a,b
]
".
Note that in practice these are not uniform across the reals in a given interval if we are using floating point, because we can only ever sample valid floating point values.
 

Discrete sampling
For a 
discrete
 probability mass function, we can sample outcomes according to 
any arbitrary PMF
 
by partitioning the unit interval.
Algorithm:
choose any arbitrary ordering for the outcomes x
1
,x
2
,…
assign each outcome a "bin" which is a portion of the interval [0,1] equal to its probability, so that the interval is divided into consecutive non-overlapping regions [P(x
1
)→P(x
1
)+P(x
2
) , P(x
1
)+P(x
2
)→P(x
1
)+P(x
2
)+P(x
3
) , …]
draw a uniform sample in the range [0,1]
whichever "outcome bin" it lands in is the sample to draw
By the definition of a PMF, the sum of all the probabilities will be 1.0, so it will fill the interval [0,1] perfectly with no gaps.

Discrete sampling example
sheep
cat
dog
0
1
0.28
0.28+0.5
0.28+0.5+0.2
= 1-0.02

The code in the lecture notes loads a text file (in this case, Romeo and Juliet), and converts into a vector of numerical codes. It keeps only letters and spaces and converts everything to lowercase.
Rom. Give me a torch. I am not for this ambling. 
Being but heavy, I will bear the light.
Mer. Nay, gentle Romeo, we must have you dance.
Rom. Not I, believe me. You have dancing shoes
With nimble soles; I have a soul of lead
So stakes me to the ground I cannot move.
Example: Romeo & Juliet

Letters PMF in Romeo & Juliet

Letters PMF in Metamorphosis

Judging a book (without its cover!) 
The results are similar (both are English texts), but there are some subtle differences; there slightly more 
q
 characters in Kafka compared to Shakespeare; the frequencies of 
h
 and 
i
 are reversed.
As always, given a PMF, we can draw samples from it with our standard procedure, though the results aren't very exciting:

Raw probabilities (e.g. P(X=x)=0.9999) are not always intuitive.
The graph below shows the probability that a sample of people imagined, given specific verbal cues. 
What about 1 in a million events? What about the probability of the sun rising tomorrow?
Even if people had responded accurately, the linear 
visualisation
 from 0% to 100% makes it very hard to see extreme values.
7. Perceptions of probabilities

Odds & log odds
The 
odds
 of an event with probability 
p
 is defined by:
The odds are a more useful unit for discussing unlikely scenarios (odds of 1:999, or 
999:1 against
, is easier to understand than 
p=0.001
).

Odds: example

This section of the course is concerned with 
stochastic elements
; the role of uncertainty, randomness and statistics in computation. 
The fundamental mathematical principles are drawn from 
probability theory
, which gives us simple and powerful ways of manipulating uncertain values and let us do useful operations like inferring the most likely hypotheses given some observations. 
Probability theory is a simple, consistent, and effective way to manipulate uncertainty.
Part 1. Probability 

Log odds
Log-odds
 or 
logit
 are particularly useful for very unlikely scenarios:
The logit scales proportionally to the number of zeros in the numerator of the odds.

Log odds example
Both of these are typically used to 
display
 results, rather than to do computations. But 
log-probabilities
 are widely used for computation as well as display. They help solve 
numerical problems
 in probability calculations.

Log-probabilities
The probability of multiple 
independent
 random variables taking on a set of values can be computed from the product: 
P(X,Y,Z)=P(X)P(Y)P(Z)
 
and in general:
Underflow:
 multiplying values 
<1
 leads to numerical issues: we will get floating point underflow. Instead, it is numerically more reliable to manipulate 
log probabilities
, which can be summed instead of multiplied:
The 
log-likelihood
 is just
 
log⁡ P(B|A)
, which is often more convenient than the raw likelihood.

Likelihood function
When talking about 
likelihood
, we often write 
L(x
i
)
 to mean the likelihood of xi. The likelihood is not a probability. It is a function of data, and 
L(x
i
)=
f
X
(x
i
)
For example, consider the empirical PMF of Romeo and Juliet. This gives the probability of seeing any given character. The likelihood of seeing all of the characters, given our per-character probability model, is:

Example: Romeo & Juliet

Example: Romeo & Juliet

Comparing Log-Likelihoods

Thank
 
you
Contact:
 
Nicolas.Pugeault@Glasgow.ac.uk

What is probability? 
Experiment
 (or 
trial
): An occurrence with an uncertain outcome.
For example, losing a submarine -- the location of the submarine is now unknown.
Outcome:
 The result of an experiment; one particular state of the world.
For example: the submarine is in ocean grid square [2,3].
Sample Space:
 The set of 
all possible
 outcomes for an experiment.
For example, ocean grid squares {[0,0], [0,1], [0,2], [0,3], ..., [8,7], [8,8], [8,9], [9,9]}.
Event:
 A 
subset
 of possible outcomes with some common property.
For example, the grid squares which are south of the Equator.
Probability:
 The probability of an event 
with respect to a sample space
 is the number of outcomes from the sample space that are in the event, divided by the total number of outcomes in the sample space. Since it is a ratio, probability will always be a real number between 0 (representing an impossible event) and 1 (representing a certain event).
For example, the probability of the submarine being below the equator, or the probability of the submarine being in grid square [0,0] (in this case the event is just a single outcome).

Some definitions (cont’d)
Probability distribution:
 A mapping of outcomes to probabilities that sum to 1. This is because an outcome must happen from a trial (with probability 1) so the sum of all possible outcomes together will be 1. A random variable has a probability distribution which maps each outcome to a probability.
For example P(X=x), the probability that the submarine is in a specific grid square x
.
Random variable:
 A variable representing an unknown value, whose probability distribution we 
do
 know. The variable is associated outcomes of a trial
For example, X is a random variable representing the location of the submarine.
Probability density/mass function:
 A function that 
defines
 a probability distribution by mapping each outcome to a probability 
fX
(x),
x→R
. This could be a continuous function over x (density) or discrete function over x (mass).
For example 
fX
(x) would be a probability mass function for the submarine, which maps each grid square to real number representing its probability.

Some definitions (cont’d)
Observation
 An outcome that we have directly observed; i.e. data.
For example, a submarine was found in grid square [0,5]
Sample
 An outcome that we have simulated according to a probability distribution. We say we have 
drawn
 a sample from a distribution.
For example, if we believe that the submarine was distributed according to some pattern, generate possible concrete grid positions that follow this pattern.
Expectation/expected value
 The "average" value of a random variable.
The submarine was on average in grid square [3.46, 2.19]

In prose: 
A random variable 
X
 
has
 a probability distribution 
P(X)
 
which 
assigns
 probabilities 
0 ≤ P(X=x) ≤ 1
 to 
outcomes
 
x
 which 
belong
 to a sample space 
𝕩
.
That probability distribution is 
defined
 by a probability density/mass function 
fX
(x)
 
which assigns probabilities to outcomes such that the sum of probabilities over all outcomes is 1,  
We can 
observe
 specific outcomes      drawn from a distribution as a result of 
trials
. 
We can 
sample
 (simulate) new outcomes 
xj
′
 given a distribution P(X). 
Assuming outcomes have values we can 
evaluate
 the average expected value  
E[X]
 across infinitely many trials.

