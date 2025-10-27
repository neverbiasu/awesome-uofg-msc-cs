# Enriched Content: Regression_Part3.pdf

This document is a complete and detailed AI-friendly version of the presentation `Regression_Part3.pdf`. All visual content including text, graphs, diagrams, and formulas has been meticulously transcribed and described.

---

## Page 1: Title Slide

- **Title**: Machine Learning & Artificial Intelligence for Data Scientists: Regression (Part 3)
- **Author**: Ali Gooya
- **Contact**: ali.gooya@glasgow.ac.uk
- **Affiliation**: School of Computing Science

---

## Page 2: Recap

- **Linear models**: `y = w_0 + w_1*x`
- We can **fit** them to data.
- We can **predict** new values.
- We can assess how **good** the model is.
- We can have **more than one** input dimension (feature).

---

## Page 3: Is a line the best we can do?

> **Image Content Analysis:**
> - **Overall Description**: A scatter plot of data points that clearly follow a non-linear, curved pattern.
> - **Structural Analysis**: The blue data points form a distinct curve, resembling a parabola. A straight red line is fitted to the data, but it is a poor fit, passing above some parts of the curve and below others.
> - **Interpretation**: This image demonstrates that a simple linear model is not sufficient for capturing non-linear relationships in data.

---

## Page 4: Polynomial regression

- We can add **polynomial** terms to our model:
  - `y = w_0 + w_1*x + w_2*x² + ... + w_M*x^M`
- This is still a **linear model**. The equation is a linear function of the parameters **w**.
- The features are `1, x, x², ..., x^M`.

> **Image Content Analysis:**
> - **Overall Description**: The same curved data set, but now with a much better-fitting polynomial curve (a quadratic or higher order) plotted in red. This curve closely follows the path of the data points.

---

## Page 5: Overfitting

> **Image Content Analysis:**
> - **Overall Description**: The same data set, now with a high-order polynomial curve that perfectly passes through every single data point.
> - **Structural Analysis**: The red line is highly complex and wiggly. While it has zero error on the training data points it passes through, it oscillates wildly between them.
> - **Interpretation**: This is a classic illustration of **overfitting**. The model has learned the training data and its noise perfectly, but it is unlikely to generalize well to new, unseen data points because it has captured the noise, not the underlying trend.

---

## Page 6: Bias-Variance Tradeoff

> **Image Content Analysis:**
> - **Overall Description**: A 2x2 grid using a target analogy to explain the concepts of bias and variance.
> - **Top-Left (Low Bias, Low Variance)**: Labeled "ideal". Multiple shots are clustered tightly at the bullseye (center). This represents a model that is both accurate and consistent.
> - **Top-Right (Low Bias, High Variance)**: Shots are scattered widely but are centered around the bullseye. This represents a model that is accurate on average but has inconsistent predictions.
> - **Bottom-Left (High Bias, Low Variance)**: Shots are clustered tightly together but are far from the bullseye. This represents a model that is consistent but systematically inaccurate.
> - **Bottom-Right (High Bias, High Variance)**: Shots are scattered widely and are far from the center. This represents the worst-case scenario: a model that is both inaccurate and inconsistent.

---

## Page 7: Bias-Variance Tradeoff (Definitions)

- **Bias**: The difference between the average prediction of our model and the correct value which we are trying to predict. High-bias models are over-simplified and lead to underfitting.
- **Variance**: The variability of model prediction for a given data point. High-variance models are overly complex and pay too much attention to training data, leading to overfitting.

---

## Page 8: Bias-Variance Tradeoff (in context)

- **Simple models** (like linear regression) have high bias and low variance.
- **Complex models** (like high-order polynomials) have low bias and high variance.
- The best model has a **trade-off** between bias and variance.

---

## Page 9: The Trade-off Illustrated

> **Image Content Analysis:**
> - **Overall Description**: A graph illustrating the bias-variance trade-off as model complexity increases.
> - **Graph Analysis**:
>   - **X-axis**: Model Complexity (from simple to complex).
>   - **Y-axis**: Error.
>   - **Bias Curve (Red)**: Starts high for simple models and decreases as complexity increases.
>   - **Variance Curve (Green)**: Starts low for simple models and increases as complexity increases.
>   - **Total Error Curve (Blue)**: This is the sum of bias-squared and variance. It is U-shaped. It starts high (due to high bias), reaches a minimum at an optimal level of complexity, and then rises again (due to high variance).
>   - **Interpretation**: The goal is to find the "sweet spot" of model complexity that minimizes the total error, balancing the trade-off between underfitting (high bias) and overfitting (high variance).

---

## Page 10: Training vs Test Error

> **Image Content Analysis:**
> - **Overall Description**: A graph showing how training error and test error change with model complexity.
> - **Graph Analysis**:
>   - **X-axis**: Model Complexity.
>   - **Y-axis**: Error.
>   - **Training Error (Blue)**: Consistently decreases as model complexity increases. A very complex model can achieve near-zero error on the training data.
>   - **Test Error (Red)**: Is U-shaped. It decreases initially as the model captures the underlying trend, but then starts to increase as the model begins to overfit the training data and loses its ability to generalize to new, unseen test data.
>   - **Interpretation**: The gap between the training and test error is a clear indicator of overfitting.

---

## Page 11: Regularization

- A way of controlling the model complexity.
- We can change our loss function to penalise large parameter values.
- **New Loss Function**: `L(w) = RSS + λ * P(w)`
  - `RSS`: The original Residual Sum of Squares.
  - `λ`: A parameter that controls the strength of the penalty.
  - `P(w)`: The penalty term, which is a function of the model weights `w`.

---

## Page 12: L2 Regularization (Ridge Regression)

- The penalty is the sum of the squared weights.
- **Penalty Term**: `P(w) = Σ_{j=1 to M} w_j² = ||w||₂²` (L2 norm squared)
- **Loss Function**: `L(w) = Σ_{i=1 to N} (t_i - wᵀx_i)² + λ * ||w||₂²`
- This encourages the weights to be small, preventing them from becoming too large and causing overfitting.

---

## Page 13: Ridge Regression Illustrated

> **Image Content Analysis:**
> - **Overall Description**: A diagram illustrating how Ridge Regression works.
> - **Components**:
>   - **Blue Ellipses**: These are the contour lines of the Residual Sum of Squares (RSS). The center, labeled `w_OLS`, is the point of minimum RSS (the Ordinary Least Squares solution).
>   - **Red Circle**: This represents the L2 penalty term `||w||₂² ≤ t`. It is a circle centered at the origin, and the solution must lie within this circle.
>   - **`w_ridge`**: The solution for Ridge Regression is the point where the RSS contour ellipse first touches the circular penalty region. This point is a compromise between minimizing the RSS and keeping the weights small.

---

## Page 14: L1 Regularization (Lasso Regression)

- The penalty is the sum of the absolute values of the weights.
- **Penalty Term**: `P(w) = Σ_{j=1 to M} |w_j| = ||w||₁` (L1 norm)
- **Loss Function**: `L(w) = Σ_{i=1 to N} (t_i - wᵀx_i)² + λ * ||w||₁`
- A key property of Lasso is that it can force some of the weights `w_j` to be exactly zero.

---

## Page 15: Why does L1 lead to sparsity?

- Because of the shape of the L1 penalty region.

---

## Page 16: Lasso Regression Illustrated

> **Image Content Analysis:**
> - **Overall Description**: A diagram illustrating how Lasso Regression works.
> - **Components**:
>   - **Blue Ellipses**: The same RSS contour lines as before.
>   - **Red Diamond**: This represents the L1 penalty term `||w||₁ ≤ t`. It is a diamond shape centered at the origin.
>   - **`w_lasso`**: The solution for Lasso Regression is the point where the RSS contour ellipse first touches the diamond-shaped penalty region. Because the diamond has sharp corners (vertices) along the axes, the solution is very likely to occur at one of these corners.
> - **Interpretation**: When the solution `w_lasso` is at a corner, one of the weight components is exactly zero (e.g., `w₁=0`). This is why Lasso performs feature selection by creating sparse models.

---

## Page 17-19: Contour Plots of Ridge and Lasso

> **Image Content Analysis:**
> - **Overall Description**: A series of contour plots comparing the penalty regions for Ridge and Lasso regression.
> - **Page 17 (Ridge)**: Shows the circular L2 penalty region.
> - **Page 18 (Lasso)**: Shows the diamond-shaped L1 penalty region.
> - **Page 19 (Combined)**: Shows the RSS error contours overlaid on both the Ridge and Lasso penalty regions, visually demonstrating why the Lasso solution is more likely to be sparse (hit a corner) than the Ridge solution.

---

## Page 20: Summary

- **Overfitting**: Occurs when a model is too complex and fits the training data noise.
- **Bias-Variance Tradeoff**: A fundamental concept where we balance model simplicity (bias) and flexibility (variance) to find an optimal model.
- **Regularization**: A technique to control model complexity by adding a penalty term to the loss function.
  - **L2 (Ridge)**: Penalizes large weights, leading to smaller, more stable coefficients.
  - **L1 (Lasso)**: Can shrink some coefficients to exactly zero, effectively performing feature selection.

---

## Page 21: Thank You

- A final thank you slide with a picture of the University of Glasgow.
