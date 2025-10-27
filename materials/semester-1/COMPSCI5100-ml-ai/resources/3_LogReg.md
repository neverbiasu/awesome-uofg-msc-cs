# Enriched Content: 3_LogReg.pdf

This document is a complete and detailed AI-friendly version of the presentation `3_LogReg.pdf` on Logistic Regression. All visual content including text, graphs, diagrams, and formulas has been meticulously transcribed and described.

---

## Page 1: Title Slide

- **Course**: COMPSCI 5100 - ML & AI for Data Science
- **Author**: Ali Gooya
- **Contact**: Ali.gooya@glasgow.ac.uk
- **Affiliation**: University of Glasgow

---

## Page 2: Logistic regression

- A popular statistical model used for **binary** classification.
- Can be derived from **Linear Regression**.

> **Image Content Analysis:**
> - **Description**: A 2D scatter plot of features for classifying oranges and lemons.
> - **Graph Analysis**:
>   - **Features**: Feature 1 (height/cm) vs. Feature 2 (width/cm).
>   - **Legend**: Red circles are Oranges, Blue diamonds are Lemons.
>   - **Classes**: The target variable `y` belongs to the set {0, 1}.
>   - **Data**: The plot shows that the two classes are mostly separable in this feature space.

---

## Page 3: Least squares for classification

- **Training data**: `(x₁, t₁), (x₂, t₂), ..., (x_N, t_N)`, where `x_i = [x_i1, x_i2]ᵀ`
- `t_i` = target label of the i-th sample, `t_i ∈ {-1, 1}`
- Classification is done by specifying the plane separating two classes (decision boundary).
- The decision boundary is then given by `y(x) = cte (0)`.
- `y(x)` denotes the model's prediction (discriminant function).
- For example, let's use a linear regression model: `y_i = w₀ + w₁x_i1 + w₂x_i2 = w₀ + wᵀx_i`
- In this case, `y(x) = 0` is a line in the plane of `x_i1, x_i2`.
- The parameters can be obtained by minimising the cost function `J(w)`:
  - `J(w) = min_w Σ_{i=1 to N} (y_i - t_i)²`

---

## Page 4: Geometry of the linear regression

- Distance of **x** from decision boundary `y=0` is proportional to `y(x)`.
- **w** is normal to the decision boundary.
- Hence, the cost function penalises the distance of points from the decision plane.

> **Image Content Analysis (Figure 4.1):**
> - **Description**: A diagram illustrating the geometry of a linear discriminant function in 2D.
> - **Components**:
>   - The red line is the decision surface `y(x)=0`.
>   - The vector **w** is shown to be perpendicular (normal) to this surface.
>   - For a data point **x**, its signed orthogonal distance to the surface is `y(x) / ||w||`.
>   - The regions `y>0` (R₁) and `y<0` (R₂) are shown on either side of the boundary.

---

## Page 5: Why bother with logistic regression?

- Classification based on least-squares is prone to outliers.
- See (C. Bishop's PRML Book, Ch. 4)

> **Image Content Analysis (Figure 4.4):**
> - **Description**: Two plots comparing the decision boundaries of least-squares regression and logistic regression, with and without outliers.
> - **Left Plot**: Shows two well-separated classes (red crosses, blue circles). Both the least-squares boundary (magenta line) and the logistic regression boundary (green line) separate the data well.
> - **Right Plot**: The same data, but with a few outlier points added to the blue class in the bottom-left. The least-squares boundary (magenta) is heavily skewed by these outliers and no longer separates the data correctly. The logistic regression boundary (green) is much more robust and barely changes, still providing a good separation.

---

## Page 6: Logistic regression (Sigmoid Function)

- Without loss of generality, assume that `t ∈ {0, 1}`.
- We use an activation function to make the classifier more robust to the outliers: `y(x) = σ(w₀ + wᵀx)`.
- **Sigmoid Function**: `σ(z) = 1 / (1 + e⁻ᶻ)` is called the **logistic** function.
- For simplicity: `w ← [w₀, w]ᵀ`, `x ← [1, x]ᵀ`
- `y(x) = σ(wᵀx) = 1 / (1 + e⁻ʷᵀˣ)`

> **Image Content Analysis:**
> - **Description**: A plot of the standard sigmoid (logistic) function.
> - **Graph Analysis**: It shows the characteristic 'S'-shaped curve, which maps any real-valued input `z` to an output between 0 and 1.

---

## Page 7: Logistic regression (Probabilistic Interpretation)

- Logistic regression outputs can be interpreted as posterior class probabilities:
  - `y(x) = σ(wᵀx) = P(t=1 | x, w)`
  - `P(t=0 | x, w) = 1 - P(t=1 | x, w)`
- **How do we learn the parameters w?**
  - We need a cost function `J(w)` over which we can optimise.

---

## Page 8: Cost function (Likelihood)

- **Likelihood for individual label**:
  - `p(t_i=1 | x_i, w) = σ(wᵀx_i)`
  - `p(t_i=0 | x_i, w) = 1 - σ(wᵀx_i)`
- **Combining**: `p(t_i | x_i, w) = [σ(wᵀx_i)]ᵗⁱ * [1 - σ(wᵀx_i)]¹⁻ᵗⁱ = y_iᵗⁱ * (1 - y_i)¹⁻ᵗⁱ`
- **Log-likelihood**:
  - `log p(t_i | x, w) = t_i * log[σ(wᵀx_i)] + (1 - t_i) * log[1 - σ(wᵀx_i)]`

---

## Page 9: Cost function (Final Form)

- **Goal**: Minimise the negative of log-likelihood (or maximise log-likelihood).
- `w* = argmin_w J(w)`
- **Cost Function**: `J(w) = - Σ_i log p(t_i | x_i, w)`
- **L2 Regularized Cost Function**: `J(w) = - Σ_i log p(t_i | x_i, w) + λ|w|²`

---

## Page 10: Example: orange and lemon data

> **Image Content Analysis:**
> - **Overall Description**: A Jupyter Notebook cell showing the application of `sklearn.linear_model.LogisticRegression` and the resulting plot.
> - **Transcribed Code `In [59]`**:
>   ```python
>   from sklearn.linear_model import LogisticRegression
>   clf = LogisticRegression().fit(X, t)
>   # ... code to create meshgrid and plot ...
>   plt.pcolormesh(xx, yy, Z, cmap=cmap_light)
>   plt.scatter(X[:, 0], X[:, 1], c=t, cmap=cmap_bold, edgecolor='k', s=100)
>   # ... code to set limits and title ...
>   mean_cv_score = np.mean( cross_val_score(clf, X, t, cv=5) )
>   print("5-fold averae CV error:", 1-mean_cv_score)
>   ```
> - **Output**: `5-fold averae CV error: 0.025000000000000022`
> - **Graph Analysis**: The plot shows the orange and lemon data points. A decision boundary is learned, separating the feature space into a red region (predicted orange) and a blue region (predicted lemon).

---

## Page 11: Logistic regression (Prediction)

- **To convert prob scores to discrete labels**:
  - Label = whichever class probability is higher
  - Label decided based on a threshold: `y_new = 1 if P(y_new=1 | x_new, θ) ≥ 0.6`
- May also ‘reject’ data when the difference between the two classes is small.
- Threshold may be computed using CV, but highly data-dependent.

---

## Page 12: Logistic regression summary

- **Simple**
  - Linear model passed through a non-linear function
  - Smooth cost function
  - Learnable params = feature weights
- **...but**
  - Assumes linearity between dependent and independent variables.
  - If the number of samples < feature dimension, we can have overfitting.
  - Too simple for complex data.
