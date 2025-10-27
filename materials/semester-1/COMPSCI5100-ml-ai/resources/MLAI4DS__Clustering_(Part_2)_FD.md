# Enriched Content: MLAI4DS__Clustering_(Part_2)_FD.pdf

This document is a complete and detailed AI-friendly version of the presentation `MLAI4DS__Clustering_(Part_2)_FD.pdf`. All visual content including text, graphs, diagrams, and formulas has been meticulously transcribed and described.

---

## Page 1: Title Slide

- **Title**: Machine Learning & Artificial Intelligence for Data Scientists: Clustering (Part 2)
- **Author**: Fani Deligianni
- **Profile**: https://www.gla.ac.uk/schools/computing/staff/fanideligianni/
- **Affiliation**: School of Computing Science

---

## Page 2: Mixture models – thinking generatively

> **Image Content Analysis:**
> - **Description**: A scatter plot of 2D data that appears to be composed of three distinct groups or clusters.
> - **Axes**: x1 and x2.
> - **Interpretation**: This slide poses the question of whether we can hypothesize a generative model that could have created this data, suggesting that the points look like they come from three different distributions.

---

## Page 3: Mixture models – Gaussian Distribution

> **Image Content Analysis:**
> - **Description**: A plot showing four different 1D Gaussian (Normal) distributions on the same axes.
> - **Formulae**:
>   - `f(X) = (1 / (σ * sqrt(2π))) * e^(-(1/2) * ((X - μ)/σ)²)`
>   - `p(X|μ, σ) ~ N(μ, σ)`
> - **Plotted Curves**:
>   - **Blue**: `μ=0, σ²=0.2` (A tall, narrow bell curve centered at 0).
>   - **Red**: `μ=0, σ²=1.0` (A standard normal distribution curve, wider than the blue one).
>   - **Green**: `μ=-2, σ²=0.5` (A bell curve centered at -2).
>   - **Orange**: `μ=0, σ²=5.0` (A very wide and flat bell curve centered at 0).

---

## Page 4: Mixture models – Gaussian Distribution in 2D

- **Formula**: `p(X|μ, Σ) = (1 / ((2π)^(n/2) * |Σ|^(1/2))) * e^(-(1/2) * (X - μ)ᵀΣ⁻¹(X - μ))`

> **Image Content Analysis:**
> - **Description**: Two 3D surface plots of 2D Gaussian distributions.
> - **Interpretation**: These plots visualize the probability density function of a 2D Gaussian as a 3D "hill". The peak of the hill is at the mean, and the shape of the hill is determined by the covariance matrix.

---

## Page 5: Mixture models – Gaussian Distribution in 2D (Covariance)

> **Image Content Analysis:**
> - **Description**: Three contour plots of 2D Gaussians, illustrating the effect of different covariance matrices (Σ).
> - **Left Plot**: A full covariance matrix `[[Σ₁,₁, Σ₁,₂], [Σ₂,₁, Σ₂,₂]]` results in elliptical contours with an arbitrary orientation.
> - **Middle Plot**: A diagonal covariance matrix `[[Σ₁,₁, 0], [0, Σ₂,₂]]` results in elliptical contours that are aligned with the x and y axes.
> - **Right Plot**: An isotropic covariance matrix `σ²I` (where `I` is the identity matrix) results in circular contours.

---

## Page 6-7: Mixture models – thinking generatively

- Could we hypothesis a model that could have created this data?
- Each `x_n` seems to have come from one of three distributions.

> **Image Content Analysis (Page 7):**
> - **Description**: The scatter plot from page 2 is shown again, but now with three ellipses overlaid, corresponding to the three visible clusters of data. This visually represents the idea of modeling the data as a mixture of three Gaussian distributions.

---

## Page 8: A generative model

- **Assumption**: Each `x_n` comes from one of different K distributions.
- **To generate X**:
  - For each `n`:
    1. Pick one of the K components.
    2. Sample `x_n` from this distribution.
- We already have **X**.
- Define parameters of all these distributions as **Δ**.
- We'd like to reverse-engineer this process learn **Δ** which we can then use to find which component each point came from.
- **Goal**: Maximise the likelihood!

---

## Page 9: Gaussian mixture model (Formulas)

- Assume component distributions are Gaussians with diagonal covariance: `p(x_n | z_nk = 1, μ_k, σ_k²) = N(μ_k, σ_k²I)`
- We need to be able to estimate the prior of assignment. Let `π_k = p(z_nk = 1 | Δ)`
- We also want to estimate the probability to assign data to each component (the responsibility `q_nk`):
  - `q_nk = (π_k * p(x_n | z_nk=1, ...)) / (Σ_{j=1 to K} π_j * p(x_n | z_nj=1, ...))`

---

## Page 10-11: Mixture model optimisation – the Expectation-Maximization (EM) algorithm

- **Following optimisation algorithm**:
  1. **Guess** `μ_k, σ_k², π_k`
  2. **(E)xpectation-step**: Compute `q_nk`
  3. **(M)aximization-step**: Update `μ_k, σ_k², π_k`
  4. Return to 2 unless parameters are unchanged.
- Guaranteed to converge to a local maximum of the lower bound.
- Note the similarity with kmeans.
- **Update Formulas (Page 11)**:
  - `N_k = Σ_i q_ik`
  - `μ̂_k = (1/N_k) * Σ_i q_ik * x_i`
  - `Σ̂_k = (1/N_k) * Σ_i q_ik * (x_i - μ̂_k)(x_i - μ̂_k)ᵀ`

---

## Page 12-27: Algorithm in operation (Animation)

> **Image Content Analysis:**
> - **Overall Description**: A series of 16 slides animating the convergence of the EM algorithm for a GMM on the 3-cluster dataset.
> - **Page 12 (Initial guess)**: Three Gaussian components (elliptical contours) are initialized, poorly fitting the data.
> - **Pages 13-26 (Update steps)**: With each iteration, the text "Update q_nk and then other parameters" is shown. The ellipses (representing the means and covariances of the Gaussians) gradually move, resize, and rotate to better fit the three clusters of data points.
> - **Page 27 (Convergence)**: The final slide shows the three ellipses perfectly enclosing the three data clusters, with the text "Solution at convergence".

---

## Page 28-29: Mixture model clustering

- So, we've got the parameters, but what about the assignments?
- Which points came from which distributions?
- `q_nk` is the probability that `x_n` came from distribution `k`.
- We can stick with probabilities or assign each `x_n` to its most likely component.

> **Image Content Analysis (Page 29):**
> - **Description**: The 3-cluster data is shown again, but now the points are colored (black circles, gray squares, white diamonds) based on their final assignment to the most likely cluster.

---

## Page 30-32: Mixture model – issues

- How do we choose K?
- What happens when we increase it?

> **Image Content Analysis:**
> - **Page 30 (K=10)**: Shows the result of fitting a GMM with K=10 to the 3-cluster data. The model has placed 10 small ellipses all over the data, overfitting it.
> - **Page 31 (Likelihood increase)**: A plot of "Log likelihood" vs. "K" (number of clusters). It shows that the log likelihood on the training data always increases as K increases.
> - **Page 32 (Cross-validation)**: A plot of "Held out Log likelihood" vs. "K". This cross-validation plot shows the likelihood on unseen data. The curve peaks at K=3 and then decreases, correctly identifying the true number of clusters.

---

## Page 33-35: Mixture models – other distributions

- We've seen Gaussian distributions.
- Can actually use anything.... As long as we can define `p(x_n | z_nk = 1, Δ_k)`
- **e.g. Binary data:**

> **Image Content Analysis:**
> - **Page 33**: A heatmap of binary data (black and white pixels) is shown.
> - **Page 34**: Formulas for a mixture model with Bernoulli distributions for binary data are presented.
> - **Page 35**: Shows the result of clustering the binary data with K=5. The rows of the heatmap have been reordered to show 5 distinct, clearly structured blocks, revealing the hidden clusters.

---

## Page 36: Summary

- **Introduced two clustering methods.**
- **K-means**: Very simple, Iterative scheme, Can be kernelised, Need to choose K.
- **Mixture models**: Create a model of each class, Iterative scheme (EM), Can use any distribution, Can set K by cross-validation, State-of-the-art methods don't need to set K.
