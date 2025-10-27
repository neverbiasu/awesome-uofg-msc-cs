# Enriched Content: MLAIDSS2425_Model_Solutions.pdf

This document is a complete and detailed AI-friendly version of the exam paper `MLAIDSS2425_Model_Solutions.pdf`. All questions, solutions, text, graphs, and formulas have been meticulously transcribed and described.

---

## Page 1: Title Page

- **Institution**: University of Glasgow
- **Degrees**: MSc, MSci, MEng, BEng, BSc, MA and MA (Social Sciences)
- **Course**: Machine Learning & Artificial Intelligence for Data Scientists
- **Duration**: 90 minutes
- **Instructions**: Answer all of the 3 questions. This examination paper is worth a total of 60 marks.
- **Instructions to Invigilators**: Please collect all exam question papers and exam answer scripts and retain for school to collect. Candidates must not remove exam question papers.

---

## Page 2: Question 1: Regression (Total marks: 20)

Consider using regression to predict the birth rate in the US using the data shown in the following figure:

> **Image Content Analysis (Figure 1.1):**
> - **Overall Description**: A scatter plot showing the US birth rate per 1000 people from 1909 to 2008.
> - **Graph Analysis**:
>   - **Title**: Figure 1.1 Birth rate (per 1000) from 1909 to 2008
>   - **Y-axis**: Birth per 1000, ticks from 14 to 30.
>   - **X-axis**: Year, ticks from 1920 to 2000.
>   - **Data Trend**: The plot shows a general decline, with a significant spike (the "baby boom") between roughly 1945 and 1965, followed by a sharp drop and then a slower decline.

**(a) Consider fitting the data with a polynomial regression of order 10. Identify the numerical issue with model fitting and propose a solution with sufficient details. [4 marks]**

- **SOLUTION**: The value of the year could cause numerical issues when raised to order 10 [1], the numerical issue is matrix inversion in the least square solution being unstable when year^10 is too large [1]. 2 marks for a reasonable rescaling method as a solution, including whitening, min-max, or take the logarithm.

**(b) Consider fitting the data with a polynomial regression of order 2, identify the two regions of most likely poorly fitted data points and explain why. [6 marks]**

- **SOLUTION**: 2 marks for identifying the correct poorly fitted data points, several options: (x=1945-1960, y~=24), (x~=1938-1940, y~=17), Data points with x range from 1975 to 1980. 4 marks for reasoning: A polynomial regression model with an order of 2 is a quadratic (or convex) curve [1]. The global minima of the curve would be in years after 2008 [1]. The left tail end would be following the downward trend from 1909 to 1920 [1]. The curve would cut through the drop from 1920-1940 and the upward trend after the 1940s [1].

**(c) Consider fitting the data in Figure 1.1 with a linear regression model with the sigmoid basis function:**

---

## Page 3: Question 1 (Continued)

- **Sigmoid Basis Function**: `h_{n,k} = sigmoid((x_n - μ_k)² / s)` , n=1,...,N; k=1,...,K.

**Explain the choice of hyperparameter μ_k (mu_k) and s that could lead to the following fitted model. [4 marks]**

> **Image Content Analysis (Figure 1.2):**
> - **Description**: The same birth rate data with a complex, overfitting model fitted using sigmoid basis functions.
> - **Observation**: The fitted line wiggles significantly to pass through or near many of the individual data points, indicating a very flexible model that has likely overfit the data.

- **SOLUTION**: Mu_k can be set as x_n [1], and s is set to relatively small in relation to x_n, for example, 1 [1]. Setting the centre parameter to be x_n gives the model maximum flexibility to fit every data point [1]. Setting s to be small allows sharp turns between data points to be fitted [1].

**(d) We used two fitting strategies, namely ridge regression and lasso, and obtained the following fitting models in Figure 1.3 A and B. Identify which fitting strategy is used in each figure and explain why... [6 marks]**

> **Image Content Analysis (Figure 1.3 A & B):**
> - **Figure 1.3 A**: Shows a model fit that is piecewise constant, with flat regions. Several sections of the curve are perfectly horizontal.
> - **Figure 1.3 B**: Shows a model fit that is a smooth, but heavily dampened curve, poorly following the overall trend.

- **SOLUTION**: Figure 1.3 A is fitted with Lasso [1]. Reasoning: The fitted model has three flat regions. This happens when basis functions covering these regions have zero coefficients [1]. The fitted model also suggests that the hyperparameter controlling the strength of l1 regularization is set to be too strong [1, identifying l1 regularization is needed].

---

## Page 4: Question 1 (Continued)

- **SOLUTION (cont.)**: Figure 1.3B is fitted with ridge regression [1]. Reasoning: The fitted model is poorly following the trend. This happens when all basis functions have very small coefficients [1]. The fitted model suggests that the hyperparameter controlling the strength of l2 regularization is set to be too strong [1, identifying l2 regularization is needed].

---

## Page 5: Question 2: Classification (Total marks: 20)

**(a) Assume the following training data... (Figure 1). The target variables for the points in the red and blue are +1 and -1...**

> **Image Content Analysis (Figure 2):**
> - **Description**: A 2D plot with four data points for a classification task.
> - **Data**: 
>   - **Class +1 (Red Circles)**: at (2, 0), (0, -2), (-2, 0).
>   - **Class -1 (Blue Cross)**: at (0, 2).

**(i) Design a k-NN classifier with k=1... [4 marks]**

- **SOLUTION**: C_1 = -1, C_2 = 1, C_3 = 1, C_4=unknown

**(ii) What would be the class variable C4, if we had used k=3? [2 marks]**

- **SOLUTION**: C_4=1

**(iii) Write down the equations that specify the decision boundary... [4 marks]**

- **SOLUTION**: `X1-X2 = 0` in `X1 > 0.0` and `X2 > 0.0`. `X1+X2=0` in `X1 > 0.0` and `X2 < 0.0`.

**(b) In the same data set... we apply a linear SVM model...**

**(i) Which data points are the support vectors? Write down the equation for y(X1, X2)... [6 marks]**

- **SOLUTION**:

---

## Page 6: Question 2 (Continued)

- **SOLUTION to b(i) (cont.)**:
  - (2,0), (0,2), and (-2,0)
  - `y(X1,X2) = -2X2 + 1`

**(ii) Specify the Lagrange multipliers α1, α2, α3, α4 for each of the data points... [4 marks]**

- **SOLUTION**: α₁ = .5, α₂ = 1, α₃ = 0.5, α₄ = 0

---

## Page 7: Question 3: Unsupervised learning (Total marks 20)

**Consider using the K-means algorithm to perform clustering on the following scenario...**

> **Image Content Analysis (Figure 3.1 A & B):**
> - **Figure 3.1 A (Original Data)**: Shows data points forming two concentric, crescent-shaped rings (a "two moons" dataset).
> - **Figure 3.1 B (Expected Clusters)**: Shows the desired clustering, with the outer ring as "Cluster A" and the inner ring as "Cluster B".

**(a) Outline what would happen if we directly apply K-means... [3 marks]**

- **SOLUTION**: K-means assumes spherical clusters and measures distance to centroids. It would fail, likely splitting the data into arbitrary vertical or horizontal segments rather than identifying the two rings.

**(b) An alternative approach is to use Kernel K-means... [2 marks]**

- **SOLUTION**: Yes, Kernel K-means could help. By using a kernel function (like a Radial Basis Function), it can transform the data into a higher-dimensional space where the clusters become linearly separable.

---

## Page 8: Question 3 (Continued)

**(c) An alternative approach is to use mixture models... [3 marks]**

- **SOLUTION**: GMMs assume data is generated from a mixture of Gaussians. This is not ideal for ring-shaped data. The model might place the means of the Gaussians in between the circles, leading to incorrect clustering.

**(d) The plot in Figure 3.2 shows some 2D data. PCA is applied... Explain how the first principal component would look... [2 marks]**

> **Image Content Analysis (Figure 3.2 & Solution):**
> - **Figure 3.2**: Shows two distinct, spherical clusters of data, separated along a diagonal axis.
> - **Solution Figure**: Shows the same data with the first principal component drawn as a red line passing through the direction of highest variance, which is the axis connecting the two cluster centers.

- **SOLUTION TEXT**: The first principal component will be across the direction of the highest variance (1 mark). In this case, we can note that there is a large variation in the axis that connect the two clusters (1 mark).

**(e) Similar to the previous question, explain what the second principal component would look like... [2marks]**

---

## Page 9: Question 3 (Continued)

- **SOLUTION to (e)**: PCA decompose the data into orthogonal components (1 mark). Therefore, the second principal component will be orthogonal to the first: (1 mark)

**(f) Describe the four-step process you should use to determine the number of clusters in Kernel K-Means... [4 marks]**

- **SOLUTION**:
  1. **Split the Data**: Divide the data into (k) folds.
  2. **Kernel Computation**: Compute the kernel matrix for the entire dataset.
  3. **Cross-Validation Loop**: For each fold, train Kernel K-means on (k-1) folds and validate on the remaining fold.
  4. **Evaluate Performance**: Use a performance metric (e.g., silhouette score) to evaluate the clustering quality and average the results.

**(g) Describe two approaches you could take to managing the curse of dimensionality... [4 marks]**

- **SOLUTION**: Feature selection can help overcome the problem of the curse of dimensionality. (2 marks). We can use a feature selection method that picks the most relevant features (1 mark), or we can use a dimensionality reduction technique like PCA that creates new features (1 mark).
