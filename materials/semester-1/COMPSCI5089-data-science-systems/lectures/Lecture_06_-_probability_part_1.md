# Probabilities I – Introduction to Probabilities

## Today's learning outcomes

*   what probability is, and different philosophical interpretations of it
*   what inverse and forward probability are
*   what a random variable, distribution, probability mass/density function are
*   what the empirical distribution is and how it is computed from data
*   what expectation/expected value is
*   the axioms of probability theory

---

## Part 1. Probability

This section of the course is concerned with **stochastic elements**; the role of uncertainty, randomness and statistics in computation.

The fundamental mathematical principles are drawn from **probability theory**, which gives us simple and powerful ways of manipulating uncertain values and let us do useful operations like inferring the most likely hypotheses given some observations.

Probability theory is a simple, consistent, and effective way to manipulate uncertainty.

### What is probability?

*   **Experiment (or trial)**: An occurrence with an uncertain outcome.
    *   For example, losing a submarine -- the location of the submarine is now unknown.
*   **Outcome**: The result of an experiment; one particular state of the world.
    *   For example: the submarine is in ocean grid square [2,3].
*   **Sample Space**: The set of all possible outcomes for an experiment.
    *   For example, ocean grid squares {[0,0], [0,1], [0,2], [0,3], ..., [8,7], [8,8], [8,9], [9,9]}.
*   **Event**: A subset of possible outcomes with some common property.
    *   For example, the grid squares which are south of the Equator.
*   **Probability**: The probability of an event with respect to a sample space is the number of outcomes from the sample space that are in the event, divided by the total number of outcomes in the sample space. Since it is a ratio, probability will always be a real number between 0 (representing an impossible event) and 1 (representing a certain event).
    *   For example, the probability of the submarine being below the equator, or the probability of the submarine being in grid square [0,0] (in this case the event is just a single outcome).

### Some definitions (cont'd)

*   **Probability distribution**: A mapping of outcomes to probabilities that sum to 1. This is because an outcome must happen from a trial (with probability 1) so the sum of all possible outcomes together will be 1. A random variable has a probability distribution which maps each outcome to a probability.
    *   For example $$P(X=x)$$, the probability that the submarine is in a specific grid square x.
*   **Random variable**: A variable representing an unknown value, whose probability distribution we do know. The variable is associated outcomes of a trial
    *   For example, X is a random variable representing the location of the submarine.
*   **Probability density/mass function**: A function that defines a probability distribution by mapping each outcome to a probability $$fX(x)$$, $$x \to R$$. This could be a continuous function over x (density) or discrete function over x (mass).
    *   For example $$fX(x)$$ would be a probability mass function for the submarine, which maps each grid square to real number representing its probability.
*   **Observation**: An outcome that we have directly observed; i.e. data.
    *   For example, a submarine was found in grid square [0,5]
*   **Sample**: An outcome that we have simulated according to a probability distribution. We say we have drawn a sample from a distribution.
    *   For example, if we believe that the submarine was distributed according to some pattern, generate possible concrete grid positions that follow this pattern.
*   **Expectation/expected value**: The "average" value of a random variable.
    *   The submarine was on average in grid square [3.46, 2.19]

### In prose:

*   A random variable X has a probability distribution $$P(X)$$ which assigns probabilities $$0 \le P(X = x) \le 1$$ to outcomes x which belong to a sample space X.
*   That probability distribution is defined by a probability density/mass function $$fX(x)$$ which assigns probabilities to outcomes such that the sum of probabilities over all outcomes is 1, $$\sum_{x \in X} f_X(x) = 1$$.
*   We can observe specific outcomes $$x_i$$ drawn from a distribution as a result of trials.
*   We can sample (simulate) new outcomes $$x_j$$ given a distribution $$P(X)$$.
*   Assuming outcomes have values we can evaluate the average expected value $$E[X]$$ across infinitely many trials.

---

## Part 2. Philosophy of probability

There are two schools of thought regarding probability and its uses. We will be (largely) following the Bayesian interpretation, but its worth understanding what that entails.

*   Bayesian/Laplacian view
*   Frequentist view

### Bayesian/Laplacian view on probability

Bayesians treat probability as a calculus of belief; probabilities are measures of degrees of belief. $$P(A)=0$$ means a belief that event A cannot be true and $$P(A)=1$$ is a belief that event A is absolutely certain.

In the Bayesian perspective, it makes sense to say "the probability it is raining outside is 0.3" (the probability quantifies our belief about the weather given the information we have). Note that is not a statement that we believe that the weather is 0.3 rainy (whatever that means)

Bayesians allow for belief in states to be combined and manipulated via the rules of probability. The key process in Bayesian logic is updating of beliefs.

Given some:
*   **prior** belief (it's Glasgow, it's not likely to be sunny) and some
*   **new evidence** (there seems to be a bright reflection inside) we can
*   update our belief to calculate the **posterior** -- our new probability that it is sunny outside.

Bayesian inference requires that we accept priors over events, i.e. that we must explicitly quantify our assumptions with probability distributions. It is an extension of logic to uncertain information.

### Frequentist view of probability

There is an alternative school of thought that considers probabilities to only be the long-term behaviour of repeated events.

*   A frequentist does not accept phrases like "what is the probability it is sunny just now?" as there is no long-term behaviour involved (it is only "now" once). It does not make sense in this world view to talk about the probability of events that can only happen once.
*   It does make sense in a frequentist view to ask things like "what is the probability it will be sunny on any given day?" since we can measure this event (sunny or not) for many different days.
*   For example, frequentists would not assign a probability to the USS Scorpion being in a specific grid square; this is not an experiment that can be repeated.

---

## Part 4. A formal basis for probability theory

### Axioms of probability

*   **Boundedness**: $$0 \le P(A) \le 1$$ for all possible events A.
*   **Unitarity**: For the complete set of possible outcomes x in a sample space $$\sigma$$, $$\sum_{x \in \sigma} P(x) = 1$$.
*   **Sum rule**: $$P(A \lor B) = P(A) + P(B) - P(A \land B)$$
*   **Conditional probability**: The conditional probability $$P(A|B)$$ is defined to be the probability that event A will happen given that we already know B to have happened.
    ```math
    P(A|B) = \frac{P(A \land B)}{P(B)}
    ```

---

## Random variables and distributions

A random variable is a variable that can take on different values, but we do not know what value it has; i.e. one that is "unassigned". However, we have some knowledge which captures the possible states the variable could take on, and their corresponding probabilities.

A random variable is written with a capital letter, like X. A random variable might represent:
*   the outcome of dice throw (discrete);
*   whether or not it is raining outside (discrete: binary);
*   the latitude of the USS Scorpion (continuous);
*   the height of person we haven't met yet (continuous).

### Distributions

A probability distribution defines how likely different states of a random variable are. We can see X as the experiment and x as the outcome, with a function mapping every possible outcome to a probability.

We write $$P(X=x)$$ (note the case!), and use the shorthand notations:
*   $$P(X=x)$$ the probability of random variable X taking on value x
*   $$P(X)$$ shorthand for probability of $$X=x$$
*   $$P(x)$$ shorthand for probability of specific value $$X=x$$

### Discrete and continuous

*   **Discrete variables**: The distribution of a discrete random variable is described with a probability mass function (PMF) which gives each outcome a specific value. The PMF is usually written $$f_X(x)$$, where $$P(X=x)=f_X(x)$$.
*   **Continuous variables**: A continuous variable has a probability density function (PDF) which specifies the spread of the probability over outcomes as a continuous function $$f_X(x)$$. It is not the case that $$P(X=x) = f_X(x)$$ for PDFs.

### Integration to unity

A probability mass function or probability density function must sum/integrate to exactly 1. This is a consequence of unitarity.

```math
\sum_i f_X(x_i) = 1 \quad \text{for PMFs of discrete RVs}
```
```math
\int f_X(x) dx = 1 \quad \text{for PDFs of continuous RVs}
```

---

## 5. Expectation

The expectation is the "average" of a random variable. it represents what we'd "expect to happen"; the most likely overall "score". It can be thought of as a weighted sum of all the possible outcomes of an experiment, where each outcome is weighted by the probability of that outcome occurring.

### Expectation – definition

If a random variable takes on numerical values, then we can define the expectation or expected value of a random variable $$E[X]$$ as:

For a continuous random variable:
```math
E[X] = \int x f_X(x) dx
```

For a discrete random variable:
```math
E[X] = \sum_x x f_X(x)
```

### Expectation and mean

Expectation corresponds to the idea of a mean or average result. The expected value of a random variable is the true average of the value of all outcomes that would be observed if we ran the experiment an infinite number of times. This is the population mean.

*   The mean of a random variable X is just $$E[X]$$. It is a measure of central tendency.
*   The variance of a random variable X is $$var(X) = E[(X-E[X])^2]$$. It is a measure of spread.

### Expectation of functions of X

We can apply functions to random variables, for example, the square of a random variable.

The expectation of any function $$g(X)$$ of a continuous random variable X is defined as:
```math
E[g(X)] = \int f_X(x)g(x)dx
```
For a discrete random variable:
```math
E[g(X)] = \sum_x f_X(x)g(x)
```
Be very careful: $$E[g(X)] \neq g(E[X)]$$

---

## 6. Samples and sampling

Samples are observed outcomes of an experiment; we will use the term observations synonymously, though samples usually refer to simulations and observations to concrete real data.

### The empirical distribution

For discrete data, we can estimate the PMF that might be generating observations by counting each outcome seen divided by the total number of trials. This is called the empirical distribution. This can be thought of as the normalized histogram of counts of occurrences of outcomes.

```math
P(X = x) = \frac{n_x}{N}
```
where $$n_x$$ is the number of time outcome x was observed, and N is the total number of trials.

### Uniform sampling

A uniformly distributed number has equal probability of taking on any value in its interval and zero probability everywhere else. A uniform distribution is notated $$X \sim U(a,b)$$.

### Discrete sampling

For a discrete probability mass function, we can sample outcomes according to any arbitrary PMF by partitioning the unit interval.

**Algorithm**:
1.  choose any arbitrary ordering for the outcomes $$x_1, x_2, ...$$
2.  assign each outcome a "bin" which is a portion of the interval [0,1] equal to its probability.
3.  draw a uniform sample in the range [0,1]
4.  whichever "outcome bin" it lands in is the sample to draw

---

## 7. Log-probabilities

The probability of multiple independent random variables taking on a set of values can be computed from the product: $$P(X,Y,Z)=P(X)P(Y)P(Z)$$ and in general:
```math
P(X_1 = x_1, ..., X_n = x_n) = \prod_{i=1}^{n} P(X_i = x_i)
```
**Underflow**: multiplying values <1 leads to numerical issues. Instead, it is numerically more reliable to manipulate log probabilities, which can be summed instead of multiplied:
```math
\log P(x_1, ..., x_n) = \sum_{i=1}^{n} \log P(x_i)
```
The **log-likelihood** is just $$\log P(B|A)$$, which is often more convenient than the raw likelihood.

### Likelihood function

When talking about likelihood, we often write $$L(x_i)$$ to mean the likelihood of xi. The likelihood is not a probability. It is a function of data, and $$L(x_i)=f_X(x_i)$$.

The likelihood of seeing all of the characters, given our per-character probability model, is:
```math
L(c_1, c_2, ... c_n) = \prod_i P(c_i)
```
The log-likelihood does not have this problem with underflow:
```math
\log L(c_1, c_2, ... c_n) = \sum_i \log P(c_i)
```
```
}