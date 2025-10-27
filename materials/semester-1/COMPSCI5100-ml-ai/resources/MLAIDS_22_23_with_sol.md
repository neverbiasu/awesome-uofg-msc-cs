# Enriched Content: MLAIDS_22_23_with_sol.pdf

This document is a complete and detailed AI-friendly version of the exam paper `MLAIDS_22_23_with_sol.pdf`. All questions, solutions, text, graphs, and formulas have been meticulously transcribed and described.

---

## Page 1: Title Page

- **Institution**: University of Glasgow
- **Course**: Machine Learning & Artificial Intelligence for Data Scientists
- **Duration**: 90 minutes
- **Value**: 60 marks

---

## Page 2: Question 1: Regression (Total marks: 20)

**Consider using regression to predict the world population growth rate using the data shown in the following figure:**

> **Image Content Analysis (Figure 1):**
> - **Description**: A scatter plot of the world population growth rate from 1950 to 2021.
> - **Title**: Figure 1. World population growth rate from 1950 to 2021.
> - **Y-axis**: World Population Growth Rate (%), ticks from 0.8 to 2.2.
> - **X-axis**: Year, ticks from 1950 to 2020.
> - **Data Trend**: The plot shows the growth rate peaking around 1960-1970 and then steadily declining.

**(a) Propose a rescaling strategy... for the variable Year. Explain why... [4 marks]**

- **SOLUTION**: 2 marks for a reasonable strategy, including whitening, min-max, or take logarithm. 2 marks for the reasoning, the key is to reduce the absolute value of “year”, such that high order polynomial will still produce well-behaved values (small) [1] and the matrix inversion in the least square solution is still stable [1].

**(b) Consider fitting the data with a polynomial regression model with the order of 1, identify the two most likely poorly fitted data points and explain why. [6 marks]**

- **SOLUTION**: 2 marks for identifying the correct poorly fitted data points, three options: x= (1960, ~1963, and 2021). 4 marks for reasoning: polynomial regression model with an order of 1 is a straight line [1], and the data in the figure can be split into two regions... A straight line needs to average over both regions and is therefore likely to miss the dramatic drop and jump around 1960 [1].

**(c) Consider fitting the data in figure 1 with a regression with the sigmoid basis function:**

---

## Page 3: Question 1 (Continued)

- **Sigmoid Basis Function**: `h_{n,k} = sigmoid((x_n - μ_k)² / s)`

**Outline one advantage and disadvantage of using this sigmoid basis function over polynomials... [4 marks]**

- **SOLUTION**:
  - **Advantage**: The variance is not equally distributed across x values... Using location-specific basis functions sigmoid can model this localised effect better than polynomial functions... [1].
  - **Disadvantage**: need to choose hyperparameter mu_k [1] and s [1].

**(d) Suppose we use the sigmoid basis function... We used three fitting strategies, namely linear regression, ridge regression and lasso, and obtained the following fitting model in Figure 2 A, B and C. Identify which fitting strategy is used in each figure and explain why... [6 marks]**

> **Image Content Analysis (Figures 2A, 2B, 2C):**
> - **Figure 2A**: Shows a model fit that is piecewise constant with flat regions, characteristic of strong Lasso (L1) regularization.
> - **Figure 2B**: Shows a smooth but dampened curve that ignores some extreme points, characteristic of strong Ridge (L2) regularization.
> - **Figure 2C**: Shows a model that fits the data points very closely, suggesting standard linear regression with many active basis functions.

- **SOLUTION**:
  - **Figure 2A: Lasso** [1], the fitted line misses many data points between 1990-2010, suggesting some weights of basis functions using these centres are pushed to zero [1].
  - **Figure 2B: Ridge regression** [1]: the model ignores some extreme data points on the left [1], suggesting weights controlling the corresponding basis functions are very small [1].
  - **Figure 2C: Linear regression** [1]: the model fits most of the data points very well, especially fitting the data points between 1950 and 1970 perfectly [1].

---

## Page 4: Question 2: Classification (Total marks: 20)

**(a) You have been asked to design a classifier to automatically identify ‘hate speech’... You collected a training dataset which has 800 ‘regular’ tweets and 100 ‘hate’ tweets...**

**(i) Describe 2 features you might use for this task... [3 marks]**

- **SOLUTION**: Any reasonable feature is okay. For example, presence/absence of disrespectful words (binary feature), count of strongly negative words (real-valued scalar), word embeddings (real-valued vector).

**(ii) You learn a faulty classifier which always classifies a tweet as ‘regular’. What would be the weighted classification accuracy of this classifier? [2 marks]**

- **SOLUTION**: Regular class accuracy: 100%. Hate class accuracy: 0%. Weighted accuracy 50% (average across classes).

**(iii) Assume that we use Logistic Regression... w = [-1.8, 2.1 -0.3]ᵀ... For feature vector x = [1, 1]ᵀ, calculate the output of the logistic function... [4 marks]**

- **SOLUTION**: `z = w0 + w1x1+w2x2 = -1.8 + 2.1*1 - 0.3*1 = 0`. `sigmoid(z) = 0.5`.

**(iv) Logistic Regression assumes a linear relationship... Why is that considered a limitation of the model? [2 marks]**

- **SOLUTION**: This assumption lets LR learn only linear decision boundaries. Not suitable for data that requires a non-linear decision boundary...

**(v) Can we replace the sigmoid function in Logistic Regression by the function g(z) shown in Fig. 3? ... [2 marks]**

- **SOLUTION**: Yes, possible. (1 mark for saying yes). It resembles a sigmoid and shares some of the sigmoid's properties (bounded, monotonic)... Optimization may be a bit more difficult...

---

## Page 5: Question 2 (Continued)

> **Image Content Analysis:**
> - **Figure 3**: A plot of the proposed function `g(z)`. It is a piecewise linear function that approximates a sigmoid, going from 0 to 1.
> - **Figure 4**: A scatter plot of 8 training data points belonging to two classes (red circles and blue triangles).

**(b) Consider the 8 data points... used to train a linear SVM.**

**(i) Draw the decision boundary for linear hard margin SVM... [3 marks]**

> **Image Content Analysis (Solution Plot):**
> - **Description**: The solution shows the data points from Figure 4 with the SVM decision boundary.
> - **Content**: A solid black line is drawn as the decision boundary separating the two classes. Two dotted lines are drawn parallel to it, touching the nearest points of each class (the support vectors). The distance between these dotted lines is the margin `b`.

**(ii) Which ones are the support vectors? [2 marks]**

- **SOLUTION**: Support vectors: 2, 3, 4, 5, 8.

**(iii) What is the training error? [1 mark]**

- **SOLUTION**: Training error = 0.

---

## Page 6: Question 2 (Continued)

**(iv) Removal of which data point will change the decision boundary? [1 mark]**

- **SOLUTION**: Data point 4.

---

## Page 7: Question 3: Unsupervised learning (Total marks 20)

**Consider using the K-means algorithm to perform clustering on the following scenario...**

> **Image Content Analysis (Figures A1, A2):**
> - **Figure A1 (Original Data)**: Shows data points forming two intertwined, crescent-shaped clusters (a "two moons" dataset).
> - **Figure A2 (Expected Clusters)**: Shows the same data with the two crescent shapes correctly identified and circled, one in red and one in blue.

**(a) Outline what would happen if we directly apply K-means... [2 marks]**

- **SOLUTION**: K-means cannot split the data into two clusters (1 mark). Due to the euclidean distance points that are close together, although they belong to another manifold/cluster will be clustered together (1 mark).

**(b) An alternative approach is to use Kernel K-means... [3 marks]**

- **SOLUTION**: A kernel would help in this case (1 mark). A kernel would project the data onto a different space where data can be easily separated (1mark). A kernel also relaxes the dependency of k-means on Euclidean distance... (1 marks).

**(c) An alternative approach is to use mixture models... [3 marks]**

- **SOLUTION**: Mixture models might not be able to classify those data (1 mark). Mixture models assume a gaussian distribution... In this case, it is not possible to approximate the complex boundary shape with a gaussian... (1 mark).

---

## Page 8-9: Question 3 (Continued)

**(d) The plot in D1 shows some 2D data. PCA is applied... Sketch this plot, and indicate... the first principal component... [2 marks]**

> **Image Content Analysis (Figure D1 & Solution):**
> - **Figure D1**: Shows a scatter plot of 2D data points forming a single, diagonally-oriented elliptical cloud.
> - **Solution Figure**: Shows the same plot with a red line drawn through the data, representing the first principal component along the axis of greatest variance.

- **SOLUTION TEXT**: The first principal component will be across the direction of highest variance. (1 mark plot and 1 mark the explanation).

**(e) ...sketch what the second principal component would look like... [2 marks]**

- **SOLUTION**: PCA decompose the data into orthogonal components. Therefore, the second principal component will look: (1 mark: plot and 1 mark: explanation) *(implying it would be orthogonal to the first)*.

**(f) Explain why PCA is used... and how to decide for the optimum number of principal components. [2 marks]**

- **SOLUTION**: PCA can be used for dimensionality reduction, intuitive visualization... (1 marks). We can use cross-validation... and estimating the mean square error... as we include more components. (1 marks).

**(g) Explain the advantages and disadvantages of feature selection based on projection... [6 marks]**

- **SOLUTION**: Projection methods will map data into different dimensions... based on unsupervised learning... they don't require class labels (1 mark). They project all features... the new features are a combination of all the old ones (1 marks)... they model better the intrinsic properties of the datasets in lower dimensions. (2 marks)... The disadvantage is that the number of optimum components might be unstable and less meaningful (2 mark).
