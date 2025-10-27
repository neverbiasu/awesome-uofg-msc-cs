# Enriched Content: MLAIDS_23_24_with_sol.pdf

This document is a complete and detailed AI-friendly version of the exam paper `MLAIDS_23_24_with_sol.pdf`. All questions, solutions, text, graphs, and formulas have been meticulously transcribed and described.

---

## Page 1: Title Page

- **Institution**: University of Glasgow
- **Course**: Machine Learning & Artificial Intelligence for Data Scientists
- **Duration**: 90 minutes
- **Value**: 60 marks

---

## Page 2: Question 1: Regression (Total marks: 20)

**Consider using regression to predict the world population growth rate using the data shown in the following figure:**

> **Image Content Analysis (Figure 1.1):**
> - **Description**: A scatter plot of training data size for ML models over time.
> - **Title**: Size of training data used in machine learning models from 1950-2023.
> - **Y-axis**: Training dataset size, Log10 scale (ticks from 5 to 25).
> - **X-axis**: Year (ticks from 1950 to 2020).
> - **Data Trend**: Shows a significant increase in the size of training datasets over time, especially in recent years.

**(a) A rescaling method was used to rescale the years to values displayed in Figure 1.2. Describe which rescaling method was used... and why... [4 marks]**

> **Image Content Analysis (Figure 1.2):**
> - **Description**: The same data as Figure 1.1, but with the x-axis (Year) rescaled.
> - **Y-axis**: Same as above.
> - **X-axis**: Year (rescaled), with ticks from -2.5 to 1.0.
> - **Observation**: The data is now centered around 0 on the x-axis.

- **SOLUTION**: Whitening (or equivalent answer) was applied [1]. 1 mark for the correct procedure, `year - mean(year) / std(year)`. 2 marks for reasoning, the mean of rescaled years in Figure 2 is around 0, indicated by a roughly equal number of data points around 0 [1]. The rescaled years range from around -2.5 to around 1.5, mimicking the unit variance (equals to 1) expected with standard normal distribution [1].

**(b) Consider fitting the data with a polynomial regression of order 2, identify the two most likely poorly fitted data points... and explain why. [6 marks]**

---

## Page 3: Question 1 (Continued)

- **SOLUTION to (b)**: 2 marks for identifying the correct poorly fitted data points, several options: (x =1980, y ~=1), (x ~= 2005, y ~=6), 3 points with x range from 1990 to 1995. 4 marks for reasoning: polynomial regression model with an order of 2 is a quadratic (or convex) curve [1]. The global minima of the curve would be in years before 1970 [1]... The curve would closely follow a relatively high-density data region in the middle 1980 to 2020, where points line up almost like a straight line, leaving clear outliers [1].

**(c) Consider fitting the data in Figure 1.1 with a regression with the radial basis function: `h_{n,k} = exp(-(x_n - μ_k)² / 2s²)`... Outline one advantage and disadvantage... [4 marks]**

- **SOLUTION**: 
  - **Advantage**: the data is not equally distributed across x values, there is a clear gap (1960-1980) [1]. Using location-specific basis functions such as the radial basis functions can model this localized effect by placing basis functions around regions where we have strong data support [1].
  - **Disadvantage**: need to choose hyperparameter mu_k and s [1]. A bad choice of mu_k could lead to very bad prediction in the gap (1960-1980) [1].

**(d) Suppose we use the radial basis function in (c)... We used two fitting strategies, namely ridge regression and lasso, and obtained the following fitting models in Figure 1.3 A and B. Identify which fitting strategy is used... [6 marks]**

> **Image Content Analysis (Figure 1.3 A & B):**
> - **Figure 1.3 A**: Shows the data points with a fitted model that is a smooth, almost flat horizontal line, indicating strong regularization.
> - **Figure 1.3 B**: Shows the data points with a fitted model that is a perfectly straight, non-horizontal line.

- **SOLUTION**: Figure 1.3 A is fitted with ridge regression [1]. Reasoning: The fitted model is a curve that is close to a flat straight line. This happens when most of the basis functions have close to zero coefficients [1]. This also suggests that the hyperparameter controlling the strength of l2 regularization is set to be too strong [1].

---

## Page 4: Question 1 (Continued)

- **SOLUTION to (d) (cont.)**: Figure 1.3B is fitted with Lasso [1]. Reasoning: The fitted model is a straight line. This happens when only one basis function has a non-zero coefficient [1]. This also suggests that the hyperparameter controlling the strength of l1 regularization is set to be too strong [1].

---

## Page 5: Question 2: Classification (Total marks: 20)

**(a) Assume the following training data... (Figure 2.1)...**

> **Image Content Analysis (Figure 2.1):**
> - **Description**: A 2D plot with five data points for a classification task.
> - **Data**: 
>   - **Class +1 (Red Circles)**: at (2, 0) and (3, 0).
>   - **Class -1 (Blue Crosses)**: at (0, 2), (0, -2), and (-1, 0).

**(i) Design a k-NN classifier with k=1 and write down the equations that specify the decision boundary... [6 marks]**

- **SOLUTION**: `X_1 - X_2 = 0` in `X_1 > 0.5` and `X_2 > 0.5`; `X_1 + X_2 = 0` in `X_1 > 0.5` and `X_2 < -0.5`; `X_1 - 0.5 = 0` in `-0.5 < X_2 < 0.5`.

**(ii) Using the classifier above, determine the class variables C1, C2, and C3 for the following test data points... [3 marks]**

- **SOLUTION**: C_1 = -1, C_2 = 1, C_3 = -1

**(b) In the same data set... we apply a linear SVM model...**

**(i) Which data points are the support vectors? Write down the equation for y(X1, X2)...**

---

## Page 6: Question 2 (Continued)

- **SOLUTION to b(i)**: [4 marks]
  - **Support Vectors**: (2,0), (0,2), and (0,-2) [1 mark]
  - **Equation**: `y(X1,X2) = X1 - 1` [3 marks]

**(ii) Specify the Lagrange multipliers α₁...α₅ for each of the data points... [5 marks]**

- **SOLUTION**: `α₁ = .5`, `α₂ = α₃ = 0.25`, `α₄ = α₅ = 0` [5 marks]

**(iii) Which k-NN or SVM classifiers (designed above) will be more accurate? ... [2 marks]**

- **SOLUTION**: KNN will work better as a nonlinear classifier. [2 marks]

---

## Page 7: Question 3: Unsupervised learning (Total marks 20)

**Consider using the K-means algorithm... Figure 3.1 A... We expect to form three clusters as shown in Figure 3.1 B.**

> **Image Content Analysis (Figure 3.1 A & B):**
> - **Figure 3.1 A (Original Data)**: Shows a scatter plot of data points that form three distinct, somewhat elliptical or non-spherical groups.
> - **Figure 3.1 B (Expected Clusters)**: Shows the same data with three red ellipses drawn around the three groups, indicating the desired clustering.

**(a) Outline what would happen if we directly apply K-means... [3 marks]**

- **SOLUTION**: The clusters seem to follow gaussian distributions and some of them are anisotropic (1mark). K-means are not able to encode anisotropy. Therefore, k-means would be partially effective (1 mark). They will center the three clusters well but they won't be able to capture well the more distance points. (1mark).

**(b) An alternative approach is to use Kernel K-means... [2 marks]**

- **SOLUTION**: A kernel would help in this case. A gaussian kernel would be able to encode the anisotropy in the data (1mark). In this case, the recovered clusters would have a very close fit with the actual ground truth (1 marks).

**(c) An alternative approach is to use mixture models... [3 marks]**

- **SOLUTION**: Mixture models is the ideal method to detect clusters generated via a gaussian model (1 mark). Mixture models assume a gaussian distribution... and they capture different variations... (1 mark). In this case, the cluster obtained will be a close fit... (1 mark).

---

## Page 8: Question 3 (Continued)

**(d) The plot in Figure 3.2 shows some 2D data. PCA is applied... Explain how the first principal component would look... [2 marks]**

> **Image Content Analysis (Figure 3.2 & Solution):**
> - **Figure 3.2**: Shows a scatter plot of 2D data points forming a single, diagonally-oriented cloud.
> - **Solution Figure**: Shows the same plot with a red line drawn through the data, representing the first principal component along the axis of greatest variance.

- **SOLUTION TEXT**: The first principal component will be across the direction of the highest variance (1 mark). In this case, we can note that there is a large variation in the y-axis and much smaller than in the x-axis (1 mark).

**(e) ...explain what the second principal component would look like... [2 marks]**

- **SOLUTION**: PCA decompose the data into orthogonal components (1 mark). Therefore, the second principal component will be orthogonal to the first: (1 mark).

**(f) Explain how you would choose the number of clusters in an application of mixture models. [3 marks]**

- **SOLUTION**: Use of k-fold cross-validation. [1 mark]. Estimate the log-likelihood across an increasing number of clusters, K. [1 mark].

---

## Page 9: Question 3 (Continued)

- **SOLUTION to (f) (cont.)**: Decide the number of clusters based on the extreme/maximum point of the curve. [1 mark]

**(g) Explain how you could detect an outlier point with mixture models... [5 marks]**

- **SOLUTION (Pseudo-code)**:
  - Use gaussian mixture models for clustering:
    - Decide on the number of clusters K.
    - Use expectation maximization algorithm
      - `theta={pi,mi,sigma}`. These are the parameters...
      - Initialise parameters, ie. use k-mean to get an approximate answer.
      - Expectation step (estimate the probability to assign data to each component qnk)
      - Maximisation step (Update mi_k, sigma_k and pi_k)
      - Repeat until convergence has been reached [2 marks]
  - The probability assigned to each data point reflects its distance from the cluster distribution. [1 mark]
  - Use a threshold to highlight points that are unlikely to belong to the specific distribution. (pval= thres)
  - Outliers O=points with qnk<thres [2 mark]
