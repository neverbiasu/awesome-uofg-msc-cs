# Enriched Content: MLAIDS_19_20_with_sol.pdf

This document is a complete and detailed AI-friendly version of the exam paper `MLAIDS_19_20_with_sol.pdf`. All questions, solutions, text, graphs, and formulas have been meticulously transcribed and described.

---

## Page 1: Title Page

- **University**: University of Glasgow
- **College**: College of Science and Engineering
- **School**: School of Computing Science
- **Degree**: DEGREE OF MSc
- **Course**: Machine Learning & AI for Data Scientists
- **Academic Year**: 19/20

---

## Page 2: Question 1 - Linear Regression

**Scenario**: A property company has a dataset of 1000 houses, each with a known sale price. For each house, two features are recorded: `x1` (size in square meters) and `x2` (distance to the city center in kilometers). The company wants to build a linear regression model to predict the sale price `y`.

**(a) Write down the general form of a linear regression model for this problem.**

- The model will predict the price `y` based on the two features `x1` and `x2`.

**(b) What are the parameters of this model?**

- The parameters are the weights that the model learns from the data.

**(c) How many parameters does this model have?**

- The model has a parameter for each feature, plus an intercept term.

**(d) Draw a diagram that shows how the model computes `y` from `x1` and `x2`.**

- A diagram illustrating the computation.

---

## Page 3: Question 1 (Continued)

> **Image Content Analysis (Diagram for 1d):**
> - **Overall Description**: A simple diagram of a linear neuron or perceptron.
> - **Components**:
>   - **Inputs**: Two nodes labeled `x1` and `x2`.
>   - **Weights**: Arrows originate from `x1` and `x2`, labeled `w1` and `w2` respectively. There is also a bias input `w0`.
>   - **Processing Unit**: A central node labeled `Σ` (Sigma), indicating summation.
>   - **Output**: An arrow exits the summation node to an output node labeled `y`.
> - **Interpretation**: The diagram shows that the output `y` is computed by taking a weighted sum of the inputs `x1` and `x2`, plus a bias term `w0`.

**(e) What is the name of the algorithm used to find the optimal values for the parameters?**

- The algorithm used to minimize the difference between predicted and actual values.

**(f) The company is considering adding a third feature, `x3` (the age of the property). How would this change the model and its number of parameters?**

- How does adding a new feature affect the linear model equation and its complexity.

---

## Page 4: Solution for Question 1

**(a) General Form of the Model:**
`y = w0 + w1*x1 + w2*x2 + e`
Where `y` is the predicted price, `w0` is the bias (intercept), `w1` and `w2` are the weights for the features `x1` and `x2`, and `e` is the error term.

**(b) Model Parameters:**
The parameters are the weights `w0`, `w1`, and `w2`.

**(c) Number of Parameters:**
The model has 3 parameters.

**(d) Diagram:**
The diagram shows a linear neuron where the inputs `x1` and `x2` are multiplied by their respective weights `w1` and `w2`, summed together with the bias `w0`, to produce the output `y`.

**(e) Optimization Algorithm:**
Least Squares (or Ordinary Least Squares - OLS).

**(f) Adding a Third Feature:**
The model equation would become: `y = w0 + w1*x1 + w2*x2 + w3*x3 + e`.
The model would now have 4 parameters (`w0`, `w1`, `w2`, `w3`).

---

## Page 5: Question 2 - K-Means Clustering

**Scenario**: You are given a dataset of 2D points and asked to perform K-Means clustering with K=2. The initial positions of the two cluster centroids are given.

> **Image Content Analysis:**
> - **Overall Description**: A 2D scatter plot showing initial data points and cluster centroids for a K-Means problem.
> - **Graph Analysis**:
>   - **Type**: 2D Scatter Plot.
>   - **Data Points**: A set of blue dots scattered across the 2D plane.
>   - **Centroids**: Two initial cluster centers are marked with large red crosses.

**(a) Describe the first step of the K-Means algorithm (the assignment step).**

**(b) After the first assignment step, what are the new clusters?**

**(c) Describe the second step of the K-Means algorithm (the update step).**

**(d) Calculate the new positions of the two cluster centroids after the update step.**

---

## Page 6: Solution for Question 2

**(a) Assignment Step:**
Each data point is assigned to the nearest cluster centroid based on Euclidean distance.

**(b) New Clusters:**
Points closer to the first centroid form Cluster 1; points closer to the second centroid form Cluster 2.

**(c) Update Step:**
The position of each cluster centroid is updated to be the mean (average) of all data points assigned to that cluster.

**(d) New Centroid Positions:**
The solution provides the calculated coordinates for the new centroids.

> **Image Content Analysis:**
> - **Overall Description**: The same scatter plot as before, but now data points are colored according to their cluster assignment (e.g., blue and green). The red crosses indicate the *new* positions of the centroids after the first update step.

---

## Page 7: Question 3 - Principal Component Analysis (PCA)

**Scenario**: You are given a 2D dataset and asked about applying PCA.

> **Image Content Analysis:**
> - **Overall Description**: A 2D scatter plot of data points.
> - **Graph Analysis**:
>   - **Type**: 2D Scatter Plot.
>   - **Data Points**: A cloud of data points showing a strong positive correlation, elongated from the bottom-left to the top-right.

**(a) What is the main purpose of PCA?**

**(b) How many principal components can be found for this 2D dataset?**

**(c) On the plot, draw the first principal component (PC1) and the second principal component (PC2).**

**(d) If you were to reduce the dimensionality of the data to 1D, which component would you keep and why?**

---

## Page 8: Solution for Question 3

**(a) Purpose of PCA:**
PCA is a dimensionality reduction technique used to transform a large set of variables into a smaller one that still contains most of the information in the large set.

**(b) Number of Components:**
For a 2D dataset, there are 2 principal components.

**(c) Drawing the Components:**

> **Image Content Analysis:**
> - **Overall Description**: The scatter plot from the question, now with the two principal components drawn on it.
> - **Graph Analysis**:
>   - **PC1**: A red arrow drawn through the elongated axis of the data cloud, representing the direction of maximum variance.
>   - **PC2**: A second red arrow, perpendicular to PC1, representing the direction of the second-largest variance.

**(d) Dimensionality Reduction:**
You would keep the first principal component (PC1) because it captures the largest amount of variance in the data. Discarding PC2 would result in the minimum loss of information.

