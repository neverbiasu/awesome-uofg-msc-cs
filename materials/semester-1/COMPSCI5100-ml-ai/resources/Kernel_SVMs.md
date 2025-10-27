# Enriched Content: Kernel_SVMs.pdf

This document is a complete and detailed AI-friendly version of the presentation `Kernel_SVMs.pdf`. All visual content including text, graphs, diagrams, and formulas has been meticulously transcribed and described.

---

## Page 1: Title Slide

- **Course**: COMPSCI 5100 - ML & AI for Data Science
- **Topic**: Kernel SVMs
- **Author**: Dr. Tanaya Guha

---

## Page 2: Recap: Linear SVMs

- Find a hyperplane `wᵀx + b = 0` that separates two classes.
- This hyperplane should maximize the margin.
- This leads to the optimization problem: `min (1/2)||w||²` subject to `y_i(wᵀx_i + b) ≥ 1`.

---

## Page 3-4: Limitation of a linear classifier

- What if the data is not linearly separable?

> **Image Content Analysis:**
> - **Description**: Two plots showing classic examples of non-linearly separable data.
> - **Page 3 (Two Moons)**: Shows two intertwined, crescent-shaped clusters of data points. No single straight line can separate them.
> - **Page 4 (Concentric Circles)**: Shows one class of data points forming a circle around another class of data points. Again, no linear separator exists.

---

## Page 5-6: Dealing with non-linear decision boundary

- **Main Idea**: Map the data from the original input space to a new, higher-dimensional feature space where the data becomes linearly separable.
- We use a non-linear mapping function `φ(x)` to transform the data.

> **Image Content Analysis (Page 6):**
> - **Description**: A diagram illustrating the mapping concept.
> - **Left Plot (Input Space)**: Shows 1D data points from two classes (red and blue) that are not linearly separable in 1D (blue points are in the middle, red points are on the sides).
> - **Transformation**: A function `φ(x) = [x, x²]` maps the 1D data into a 2D feature space.
> - **Right Plot (Feature Space)**: In the new 2D space, the data points form a parabola. The blue points are at the bottom of the parabola and the red points are at the top, making them now linearly separable by a straight line.

---

## Page 7-9: The Kernel Trick

- The SVM formulation only depends on dot products of the data points, `x_iᵀx_j`.
- If we map the data using `φ(x)`, the algorithm would only depend on the dot products in the new feature space: `φ(x_i)ᵀφ(x_j)`.
- **The Kernel Trick**: We can define a **kernel function** `k(x_i, x_j) = φ(x_i)ᵀφ(x_j)` that computes the dot product in the feature space *without* ever having to explicitly compute the mapping `φ(x)` or go into the high-dimensional space.
- This makes it computationally feasible to work with very high or even infinite-dimensional feature spaces.
- The decision function becomes: `y(x) = Σ α_i * y_i * k(x_i, x) + b`

---

## Page 10-11: What are kernels?

- A kernel is a function that takes two points `x` and `x'` as input and returns their similarity.
- For a function to be a valid kernel, the corresponding Kernel Matrix (or Gram matrix), where `K_ij = k(x_i, x_j)`, must be symmetric and positive semi-definite (Mercer's condition).

---

## Page 12-15: Examples of Kernels

- **Linear Kernel**: `k(x, x') = xᵀx'`. This is the standard linear SVM.
- **Polynomial Kernel**: `k(x, x') = (xᵀx' + c)ᵈ`.
  - This computes dot products in a feature space of polynomial expansions of the original features.
  - The plot on page 13 shows how a polynomial kernel can create a curved, non-linear decision boundary.
- **Gaussian (RBF) Kernel**: `k(x, x') = exp(-||x - x'||² / 2σ²) = exp(-γ * ||x - x'||²)`
  - This is a very popular and powerful kernel.
  - The feature space is infinite-dimensional.
  - The parameter `γ` (gamma) controls the flexibility of the decision boundary. A small `γ` gives a smoother, more linear boundary, while a large `γ` creates a more complex boundary that can lead to overfitting. The plots on page 15 illustrate this effect.

---

## Page 16-18: SVM with Kernels (Examples)

> **Image Content Analysis:**
> - **Description**: A series of plots showing how Kernel SVMs successfully classify the non-linearly separable datasets from the beginning of the presentation.
> - **Page 16 (Two Moons)**: An SVM with an RBF kernel correctly finds a non-linear boundary that separates the two crescent-shaped clusters.
> - **Page 17 (Concentric Circles)**: An SVM with an RBF kernel finds a circular boundary that separates the inner and outer rings of data.
> - **Page 18**: Another example showing a complex boundary learned by an RBF kernel SVM.

---

## Page 19: How to choose a kernel?

- The choice of kernel and its parameters (like `d` for polynomial, `γ` for RBF) is crucial and data-dependent.
- This is a model selection problem, typically solved using cross-validation.
- A common approach is to try the simple linear kernel first. If performance is poor, then try a more complex kernel like RBF.

---

## Page 20: SVMs: Pros and Cons

- **Pros**:
  - Effective in high-dimensional spaces.
  - Still effective when number of dimensions > number of samples.
  - Memory efficient as it only uses a subset of training points (the support vectors).
  - Versatile due to different Kernel functions.
- **Cons**:
  - Prone to overfitting if hyperparameters are not tuned correctly.
  - Does not directly provide probability estimates.
  - Can be slow on very large datasets.

---

## Page 21: Summary

- SVMs are powerful classifiers.
- They find a maximum margin hyperplane to separate classes.
- The **kernel trick** allows SVMs to learn complex, non-linear decision boundaries efficiently.
- The choice of kernel and hyperparameters is important.
