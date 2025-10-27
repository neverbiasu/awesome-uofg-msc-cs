# Enriched Content: MLAIDS_20_21_with_sol.pdf

This document is a complete and detailed AI-friendly version of the exam paper `MLAIDS_20_21_with_sol.pdf`. All questions, solutions, text, graphs, and formulas have been meticulously transcribed and described.

---

## Page 1: Title Page

- **Institution**: University of Glasgow
- **Degree**: DEGREES OF MSc
- **Course**: Machine Learning & Artificial Intelligence for Data Scientists
- **Duration**: 90 minutes
- **Value**: 60 marks

---

## Page 2: Question 1: Linear Regression

**1. Considering linear regression on the Olympic data in figure 1.**

> **Image Content Analysis (Figure 1):**
> - **Description**: A scatter plot of the Olympic 100m winning times.
> - **Y-axis**: Time (seconds), from 9.5 to 12.
> - **X-axis**: Year, from 1880 to 2020.
> - **Data Trend**: Shows a clear downward trend over time.

**(a) We want to predict Olympic years from 100m winning times. What should be the target value and attribute? When solving this regression task with a polynomial regression model, how would you rescale the attributes? Why? [6 marks]**

- **SOLUTION**: Target: years [1], attribute: winning times [1]. A reasonable solution with sufficient details. E.g. whiting (x-mean(x))/std(x) [2]. A reasonable explanation of what the solution can do. E.g. Whiting makes sure the attribute is in [2].

**(b) Based on what you have learned... predict which year may produce winning time 9s and 13s, explain why. [4 marks]**

- **SOLUTION**: Answer should include reasonable estimation of years that may produce winning time 9s and 12s [2], using arguments from existing data and model, could be polynomial or RBF [2]. For example, polynomial order of 3 might be a good fit to the data, the model is likely to predict 9s after 2040, 13s could be before 1860.

**(c) The radial basis function (RBF)... Outline the strength and risk of this setup for μd,k, and how would you mitigate the risk. [5 marks]**

- **SOLUTION**: Strength: flexibility [1]. Risk: numerical stability and overfitting [2]. Use less centers or add small value to the diagonal of X^TX, using regularization [2].

**(d) In addition to the polynomial function and RBF... let's consider the following linear regression model:**

---

## Page 3: Question 1 & 2

- **Model from (d)**: `t_n = Σ A_j * cos(j*x_n + θ_j)`

**What is the basis function of choice here? How would you deal with the unknow parameters A_j and θ_j? ... [5 marks]**

- **SOLUTION**: Solution 1[3 marks in total]: Basis function: for cos(jxn + θj)[1], A_j is the regression parameter, cross validation for \theta [2]. Solution 2 [full mark]: Two basis functions as a result of applying the provided identity cos(jxn) and sin(jxn). \theta_j becomes part of the linear regression parameter, the same as A_j.

---

**2. Classification question**

**(a) The likelihood of logistic regression... Use an example of a few data points to explain how the likelihood function tells how well the parameter w fits the data. [4 marks]**

- **SOLUTION**: The example needs to have more than one pair of t_n and x_n [1], demonstrating how to construct joint data likelihood [1]. It should also include a parameter estimate representing a good fit and a parameter estimate representing a bad fit [2].

**(b) The following matrix contains estimated parameters values from three types of logistic regression models... Give your best estimate of what each model is and explain why. [6 marks]**

> **Matrix Data Analysis:**
> - **Description**: A table showing parameter values for three different models.
> - **Model 1**: Contains several parameters that are exactly zero. This is characteristic of L1 (Lasso) regularization.
> - **Model 2**: Contains some very large parameter values.
> - **Model 3**: Parameters are much smaller in absolute value compared to Model 1.

- **SOLUTION**: Model 2 [2]: logistic polynomial regression. Some parameter values are very big in absolute value. Model 3 [2]: L2-regularised logistic regression. Compare to model 1, most parameters are much smaller in absolute value. Model 1 [2]: L1-regularised logistic regression. Some parameters are exactly zeros.

---

## Page 4: Question 2 (Continued)

**(c) Compare the effect on prediction of the three logistic models in (b). [4 marks]**

- **SOLUTION**: With the same x_n [1], L1- and L2-regularised logistic regression are likely to produce lower probability of being the positive class [2], they have better generality with unseen data [1].

**(d) Let's consider a binary classifier trained on a falsely labeled dataset... The classifier outputs in the table below:**

| | | | | | | |
| :--- | :- | :- | :- | :- | :- | :- |
| **Correct label** | 0 | 0 | 0 | 1 | 1 | 1 |
| **False label during training** | 1 | 1 | 1 | 0 | 0 | 0 |
| **Probability of being positive** | 0.9 | 0.8 | 0.7 | ? | 0.2 | 0.1 |

**(i) What would be the AUC (computed with the correct labels) when the classifier is perfectly trained on the false data? And why? [2 marks]**

- **SOLUTION**: 0, Perfect AUC on false label is 1. Correct label is 1-1. Or arguing using the definition of AUC: the probability of a positive example having classification score higher than a negative one.

**(ii) Provide the range of possible values for the missing output (labeled ‘?’)... [2 marks]**

- **SOLUTION**: [0, 0.7), all number ensures that all positive data (based on false label) have high score than any negative data (based on false label).

**(iii) What would be the AUC (computed with the correct labels) of a random classifier trained on the falsely labeled data? Why? [2 marks]**

- **SOLUTION**: 0.5, random classifier will have 0.5 AUC on false label, 1-0.5 is still 0.5.

---

## Page 5-6: Question 3 (Clustering)

**(a) Describe clustering results of K-means and Gaussian Mixture in figure 2...**

> **Image Content Analysis (Figure 2):**
> - **Description**: Two plots showing the clustering of two concentric rings of data.
> - **Plot (A) K-means**: Shows K-means incorrectly splitting the two rings, creating two vertical, pie-slice-like clusters.
> - **Plot (B) Gaussian Mixture Model**: Shows GMM also failing, placing two circular components between the rings.

- **SOLUTION**:
  - **Kmeans**: two cluster centers are located somewhere between the two rings... Difficult to do model selection for the same reason (Many splits are equally well) [1].
  - **GMM**: the means are also located somewhere between the two rings... Similar to Kmeans, there are many equally good solutions for GMM...

**(b) Suppose we want to avoid any data point from the inner ring being assigned to the same cluster with any point data point from the outer ring. Outline two approaches... [4 marks]**

- **SOLUTION**: Project the data onto to a different space [1] where data points in the inner ring are well separated from the data points in the outer ring [1]. Restrict variance of each component to be small [1] and use more clusters [1].

**(c) Describe clustering results of K-means and Gaussian Mixture in figure 3...**

> **Image Content Analysis (Figure 3):**
> - **Description**: Two plots showing clustering results for three anisotropic (elongated) clusters.
> - **Plot (A) K-means**: Shows K-means, which prefers spherical clusters, incorrectly grouping the data.
> - **Plot (B) Gaussian Mixture Model**: Shows GMM correctly identifying the three elongated clusters.

- **SOLUTION (Page 6)**:
  - **Kmeans**: three cluster centers are vertically distributed [1]...
  - **GMM**: three highly Gaussian-like distributed data. Different means but similar covariance matrices and mixing weights [1]. In this case, the optimal solution is quite clear...

**(d) Suppose Figure 3 (B) represents the results we want. Outline one approach to achieve this goal with K-means... [4 marks]**

- **SOLUTION**: Kernel k-means [2]. Details on how to kernelize K-means: using the kernel trick on the distance [1] and only update the assignments [1].
