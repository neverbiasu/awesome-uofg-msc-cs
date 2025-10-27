# Enriched Content: MLAIDS_21_22_with_sol.pdf

This document is a complete and detailed AI-friendly version of the exam paper `MLAIDS_21_22_with_sol.pdf`. All questions, solutions, text, graphs, and formulas have been meticulously transcribed and described.

---

## Page 1: Title Page

- **Institution**: University of Glasgow
- **Degree**: DEGREES OF MSc
- **Course**: Machine Learning & Artificial Intelligence for Data Scientists
- **Duration**: 90 minutes
- **Value**: 60 marks

---

## Page 2: Question 1: Regression

**1. Consider using regression to predict global temperature anomaly from cumulative CO2 emissions data showing in the following figure:**

> **Image Content Analysis (Figure 1):**
> - **Description**: A scatter plot of Global Temperature Anomaly vs Cumulative CO2 emissions.
> - **Y-axis**: Median Temperature Anomaly, ticks from -0.6 to 0.8.
> - **X-axis**: Cumulative CO2 emissions, ticks from 0.00 to 1.50e12.
> - **Data Trend**: Shows a clear positive correlation; as cumulative CO2 emissions increase, the temperature anomaly also increases.

**(a) Propose a rescaling strategy... for the cumulative CO2 emissions when using high order polynomial regression. Explain why... [4 marks]**

- **SOLUTION**: 2 marks for a reasonable strategy, including whitening, min-max, or take logarithm. 2 marks for the reasoning, the key is to reduce the absolute value of CO2 emissions, such that high order polynomial will still produce well behaved values (small) [1] and the matrix inversion in least square solution is still stable [1].

**(b) Suppose a polynomial regression model with order of 1 is fitted to the data... Identify a subset of data... which will most likely be poorly fitted and explain why. [6 marks]**

- **SOLUTION**: 1 mark for identifying the correct poorly fitted data, which are the densely populated data points in the very left-hand side of the figure x valued in the range (0, 0.25e12). 5 marks for reasoning: polynomial regression model with order of 1 is a straight line [1], the data in figure could be fitted with two straight lines [1]...

**(c) Consider fitting the data in figure 1 with a regression with the radial basis function (RBF): `h_{n,k} = exp(-(x_n - μ_k)² / 2s²)`... Outline one advantage and one disadvantage... [4 marks]**

---

## Page 3: Question 1 (Continued)

- **SOLUTION to (c)**:
  - **Advantage**: the data is not equally distributed across x values, denser in small values and relatively sparser in large x values [1]. Using location specific basis functions RBF can model this localized effect better... [1].
  - **Disadvantage**: RBF has more hyper-parameters [1], poorly chosen hyper-parameters could lead to overfitting [1].

**(d) Suppose we use the RBF in (c)... We used three fitting strategies, namely linear regression, ridge regression and lasso, and obtained the following fitting model in Figure 2 A, B and C. Identify which fitting strategy is used in each figure and explain why... [6 marks]**

> **Image Content Analysis (Figures 2A, 2B, 2C):**
> - **Figure 2A**: Shows a model (black line) that ignores many of the data points, suggesting strong regularization. This is identified as Ridge regression.
> - **Figure 2B**: Shows a model that fits the data points very well, especially on the right, suggesting many active basis functions. This is identified as standard Linear regression.
> - **Figure 2C**: Shows a model fit that is a flat, horizontal line, suggesting almost all weights have been pushed to zero. This is identified as Lasso.

- **SOLUTION**:
  - **Figure 2A: Ridge regression** [1]: the model ignores many densely populated data points on the left...
  - **Figure 2B: Linear regression** [1]: the model fits the densely populated data points on the left and the rest of the data very well...
  - **Figure 2C: Lasso** [1], the fitted line is straight line parallel to the x-axis, suggesting all weights of the basis functions are zero...

---

## Page 3-4: Question 2: Classification

**(a) The likelihood of logistic regression is the following: `p(t_n|w,x_n) = g(wᵀx_n)ᵗⁿ * (1 - g(wᵀx_n))¹⁻ᵗⁿ`... Consider the fitting this model to a dataset with 2 classes, 2 binary features and 2 examples per class... Use the likelihood function to demonstrate which of the following two parameters hypotheses: [0.6, 0.1] and [0.6, 0.8] fits this dataset better. [6 marks]**

> **Table Analysis (Page 4):**
> - **Description**: A detailed table showing the calculation of log-likelihood and likelihood for each data point under the two candidate parameter sets.
> - **Conclusion**: The table shows the joint log-likelihood for candidate 1 is 3.188 and for candidate 2 is 3.249. Therefore, "Parameter candidate [0.6, 0.1] fits the data better." *(Note: There seems to be a typo in the PDF, as candidate 2 has the higher log-likelihood, but the text concludes candidate 1 is better. The transcription is faithful to the document.)*

**(b) Consider a support vector machine (SVM) is trained on a dataset where two data points are mislabeled... The classifier outputs in the table below:**

| | | | | | | |
| :--- | :- | :- | :- | :- | :- | :- |
| **Correct label** | 0 | 0 | 0 | 1 | 1 | 1 |
| **Noisy label during training** | 0 | 1 | 0 | 1 | 0 | 1 |
| **Score of SVM** | -9.6 | 8.8 | 0.7 | ? | 2.2 | 0.3 |

---

## Page 5: Question 2 (Continued)

**(i) What would be the AUC (computed with the correct labels) if the missing value is 0.6? ... [2 marks]**

- **SOLUTION**: 4/9 [1] (1+2+1)/(3*3) [1]

**(ii) What would be the maximum achievable AUC (computed with the corrupted labels)... [2 marks]**

- **SOLUTION**: AUC 7/9, > 2.2. These numbers ensure that positive data (based on corrupted labels) have high score than any negative data (based on corrupted labels label).

**(iii) If you could correct one of the two corrupted labels to get better AUC... Which will you correct? ... [2 marks]**

- **SOLUTION**: The one with score of 2.2. The other corrupted label with score of 8.8 with result in much lower AUC.

**(c) Noisy labels may produce outliers in the training set. How will you configure the SVM in terms of margin and kernel to deal with outliers? ... [4 marks]**

- **SOLUTION**: Soft margin, to allow outliers to go across the decision boundary [2]. Kernel, choose a less powerful kernel to avoid overfitting [2].

**(d) Calculating AUC requires a classifier to give a score for each data point. A K-nearest neighbor classifier does not normally provide a score... Outline two approaches to produce scores... [4 marks]**

- **SOLUTION**: 2 marks each, for example, converting vote counts to vote proportions and using majority margin.

---

## Page 6-7: Question 3: Unsupervised learning

**Consider using the K-means algorithm to perform clustering on the following scenario...**

> **Image Content Analysis (Figures 3A, 3B, 4A, 4B):**
> - **Figure 3**: Shows a "two moons" dataset. A1 is the original data, A2 shows the expected correct clustering into two crescent shapes.
> - **Figure 4**: Shows three distinct spherical clusters. A is the original data, B shows the expected clustering.

**(a) Outline what would happen if we directly apply K-means... to this data [Figure 3A]... [2 marks]**

- **SOLUTION**: K-means cannot split the data into two clusters correctly. Due to the euclidean distance points that are close together... will be clustered together.

**(b) An alternative approach is to use Kernel K-means... [3 marks]**

- **SOLUTION**: A kernel would help in this case. A kernel would project the data onto a different space where data can be easily separated...

**(c) An alternative approach is to use mixture models... [3 marks]**

- **SOLUTION**: Mixture models should be able to better classify the data [in Figure 4A] than k-means, since there are able to model clusters as a mixture of gaussian distributions with anisotropic gaussian distribution...

**(d) Outline what would happen if we directly apply K-means... to this data [Figure 4A]... [2 marks]**

- **SOLUTION**: K-means cannot split the data well into three clusters because the variance in the middle cluster is considerably different than the variance in the other clusters...

**(e) An alternative approach is to use Kernel K-means... [3 marks]**

- **SOLUTION**: Kernel K-mean does not explicitly model variance and since it is based on distance it won’t be robust in classifying data with anisotropic variance.

**(f) An alternative approach is to use mixture models... [3 marks]**

- **SOLUTION**: Mixture models with anisotropic variance would work well to model these data since variance in the data is a parameter for each cluster.

**(g) Explain why there is a need for feature selection and list two methods... [4 marks]**

- **SOLUTION**: Due to the curse of dimensionality... it is desirable to reduce dimensionality... One strategy is to use a subset of the originals... Another strategy is to combine the original and find new dimensions (ie. dimensions that maximise the variance -- PCA)
