# Enriched Content: 5_SVM.pdf

This document is a complete and detailed AI-friendly version of the presentation `5_SVM.pdf` on Support Vector Machines. All visual content including text, graphs, diagrams, and formulas has been meticulously transcribed and described.

---

## Page 1-2: Title Slides

- **Course**: COMPSCI 5100 - ML & AI for Data Science
- **Topic**: Classification: Part II
- **Author**: Dr. Tanaya Guha (www.tanayag.com)
- **Attribution**: Some slides are adapted from those of Dr. Ke Yuan (Glasgow) and Dr. V. Sancez (Warwick).

---

## Page 3: Support Vector Machine (SVM)

- Classifiers are learned by minimizing a loss or maximising likelihood.
- SVM is no different:
  - Finds a **hyperplane** (decision boundary) in an n-dimensional space separating data points to classes.
  - The hyperplane should **maximise the distance** from data points of either classes.
- SVM is a non-probabilistic (binary) classifier.

---

## Page 4-5: SVM Linear Boundary

- **Setup**:
  - N data points, each with feature vector: `x = [x₁, x₂]ᵀ`
  - Labels: `y ∈ {1, -1}`
- A linear decision boundary can be represented as a straight line: `wᵀx + b = 0`
- Given training data, our task is to find **w** and **b**.

> **Image Content Analysis (Page 4 & 5):**
> - **Description**: A 2D scatter plot showing two classes of data (black filled circles and white empty circles) that are linearly separable. A solid black line (`wᵀx + b = 0`) is drawn between them, representing the decision boundary.

- **Classification Rule (Page 5)**:
  - `wᵀx_new + b > 0`  => `y_new = 1`
  - `wᵀx_new + b < 0`  => `y_new = -1`
  - This can be written concisely as: `y_new = sign(wᵀx_new + b)`

---

## Page 6-8: Separating classes & Maximizing the Margin

- **Concept**: For a linearly separable dataset, there might be more than one possible separating hyperplane. The best one is the one that is not too close to any data point, leading to better generalization.
- **Goal**: Find the hyperplane that **maximizes the margin**.

> **Image Content Analysis:**
> - **Page 6**: Shows two classes of data (red dots, green stars) with three different possible separating lines drawn, illustrating the ambiguity.
> - **Page 7**: Shows the same data, but with only the single, optimal hyperplane that is furthest from the closest points of both classes.
> - **Page 8**: Shows the optimal hyperplane with the **margin** explicitly drawn as a shaded yellow band between two dotted lines. The dotted lines pass through the closest points of each class.

---

## Page 9-12: SVM Optimization

- **Geometric Interpretation (Page 9)**:
  - **w** is a vector orthogonal (perpendicular) to the decision hyperplane.
  - The distance `d` between the margin boundaries `wᵀx + b = 1` and `wᵀx + b = -1` is derived.

- **Optimization Goal (Page 10)**:
  - To maximize the margin `d`, we need to maximize `1 / ||w||`.
  - This is the same as minimizing `||w||`.
  - This is the same as minimizing `(1/2) * ||w||²` with respect to some constraints.

- **Constraints (Page 11)**:
  - For `x_i` with `y_i = 1`: we want `wᵀx_i + b ≥ 1`
  - For `x_i` with `y_i = -1`: we want `wᵀx_i + b ≤ -1`
  - These can be combined into a single constraint: `y_i(wᵀx_i + b) ≥ 1`

- **Final Optimization Problem (Hard Margin SVM)**:
  - `min (1/2) * ||w||²` subject to `y_i(wᵀx_i + b) ≥ 1` for all `i`.

- **SVM Loss (Page 12)**:
  - The constrained optimization problem can be rewritten in an unconstrained form using Lagrange multipliers or, more commonly, as the **L2-regularized Hinge Loss**:
  - `min_w Σ_i max{0, 1 - y_i(wᵀx_i)} + (λ/2) * ||w||²`

---

## Page 13: Support vectors

- Prediction of hyperplane only depends on a small number of data points.
- These are called **support vectors**.
- The constraints we used requires all training samples to be correctly classified - this creates a **hard margin**.

> **Image Content Analysis:**
> - **Description**: The plot of the two separable classes with the decision boundary. The data points that lie on the margin boundaries are highlighted with black squares. These are the support vectors.

---

## Page 14-15: Kernel trick

- **Problem**: What if the data is not linearly separable?
- **Solution**: Introduce non-linearity.
  - Transform data/features to another, higher-dimensional space through a non-linear **kernel**.
  - **Hope**: data is linearly separable in the new feature space.
  - **Example**: `k(x) = x₁² + ... + x_d²`

> **Image Content Analysis (Page 15):**
> - **Description**: A visual example of the kernel trick.
> - **Left Plot**: Shows data in the original 2D space (`x₁`, `x₂`). The data consists of two classes (black dots and white circles) arranged in concentric circles, which is not linearly separable.
> - **Right Plot**: Shows the data after being transformed by the function `φ(x_n) = x_n1² + x_n2²`. In this new 1D feature space, the two classes are now perfectly linearly separable by a simple threshold.

---

## Page 16-17: Multiclass SVM

- **One-vs-all**: Train one binary classifier for each class, considering the samples of that class as ‘positive’ and all others as ‘negative’.
- Let's consider C classes.
  - For each class `c`, we compute `w_cᵀx_i`
  - For a datapoint belonging to class 1, we have predictions: `z_i = {1, -1, ..., -1}`
  - `z_i = Wx_i`, where `W` has `w₁`, ..., `w_C` as rows.
- **Multiclass SVM Loss (Page 17)**:
  - `min_W Σ_i max_{c≠y_i} {max{0, 1 - w_{y_i}ᵀx_i + w_cᵀx_i}} + (λ/2) * ||W||_F²`

---

## Page 18: Summary

- SVM is a **maximum-margin classifier** for 2 classes: choose the farthest hyperplane from both classes.
  - Parameter `λ` controls trade-off between having a large margin and classifying examples correctly.
- Powerful classifier, can model complex data.
- **Kernel trick** is very useful.
- Can be extended to **multi class**.
- Was **state-of-the-art** before deep neural networks.
