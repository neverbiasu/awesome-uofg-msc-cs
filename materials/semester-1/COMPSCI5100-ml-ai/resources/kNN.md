# Enriched Content: kNN.pdf

This document is a complete and detailed AI-friendly version of the presentation `kNN.pdf` on the k-Nearest Neighbour algorithm. All visual content including text, graphs, diagrams, and formulas has been meticulously transcribed and described.

---

## Page 1-3: Introduction & Notations

- **Course**: COMPSCI 5100 - ML & AI for Data Science
- **Topic**: Classification: Part II
- **Author**: Ali Gooya (adapted from Dr. Ke Yuan)
- **Notations**:
  - `N` training samples: `x₁, x₂, ..., x_N`
  - Each sample has a label: `y₁, y₂, ..., y_N`
  - **Binary classification**: `y_n ∈ {0, 1}`
  - **Multiclass classification**: `y_n ∈ {1, 2, ..., C}`
  - **Task**: Assign a label `y_new` to a new test sample `x_new`.

---

## Page 4: Nearest Neighbour

- **Simplest of all classifiers**: 1-Nearest Neighbour
- **Simple idea**: Label a new sample the same as its closest data point.

> **Image Content Analysis:**
> - **Description**: A diagram showing a new, unlabeled point (with a question mark) surrounded by red and blue data points. An arrow points from the nearest neighbor (a red circle) to the new point with the text "Label it red".

---

## Page 5-6: 1-Nearest Neighbour Example

> **Image Content Analysis:**
> - **Description**: The oranges vs. lemons scatter plot is used to illustrate 1-NN.
> - **Page 5**: A new "Test data" point (a gray pentagon) is shown. Its nearest neighbor is an orange. The classification rule is shown: `y_new ← y_i*` where `i* = argmin_i dist(x_i, x_new)`.
> - **Page 6**: Another test point is shown, and its nearest neighbor is a lemon, so it would be classified as a lemon.

---

## Page 7-10: K-Nearest Neighbour

- **Concept**: Instead of just one neighbor, we look at the `K` nearest neighbors and take a majority vote.

> **Image Content Analysis (Step-by-step illustration):**
> - **Page 7**: Shows the initial training data from 3 classes (brown, blue, pink circles).
> - **Page 8**: A new, unlabeled "Test point" (a black square) is introduced.
> - **Page 9**: A dashed circle is drawn around the test point to identify its `K=6` nearest neighbors.
> - **Page 10**: The 6 neighbors are shown to consist of: 3 from class 1 (brown), 1 from class 2 (blue), and 2 from class 3 (pink). Since class 1 has the most votes (3), the test point is classified as belonging to class 1.

---

## Page 11-13: k-NN Decision Boundary

> **Image Content Analysis:**
> - **Description**: A series of plots showing how the decision boundary of k-NN changes with the value of `k`.
> - **Page 11 (Data)**: Shows the raw scatter plot of two classes (red circles and blue diamonds).
> - **Page 12 (K=1)**: The decision boundary is very complex and jagged, creating small islands and fitting closely to the training data. This indicates high variance and overfitting.
> - **Page 13 (K=50)**: The decision boundary is much smoother and more general, providing a better separation between the bulk of the two classes.

---

## Page 14: Choosing K and Class Imbalance

- **Class imbalance**: As `K` increases, small classes will disappear! If you have 5 samples of class 1 and 100 of class 2, for any `K ≥ 11`, the majority vote will always be class 2.
- **How do we choose K?**
  - The right value of `K` will depend on the data.
  - **Cross-validation!**

---

## Page 15: k-NN Training and Distance

- **What is the training process?**
  - 'Training' in K-NN = 'Memorizing' the training data. There is no explicit model fitting.
- **How do we compute the distance between samples?**
  - Any distance metric should work. Squared L2 norm is common for real-valued features.
  - **L2 Norm Formula**: `||x₁ - x_new||₂² = Σ_i (x₁(i) - x_new(i))²`
  - Choice of distance metric may change results (but not much).

---

## Page 16-18: K-NN (orange & lemon example)

- **Page 16 (Data Plot)**: Shows Python code to load the `orange_lemon.txt` data and create a scatter plot of Height vs. Width, colored by class.

- **Page 17 (Choosing K with Cross-Validation)**:

> **Image Content Analysis:**
> - **Description**: A Jupyter Notebook cell and its output, showing how to find the optimal `k`.
> - **Transcribed Code `In [17]`**:
>   ```python
>   cv_scores = []
>   for i in range(1,30,1):
>       knn_cv = KNeighborsClassifier(n_neighbors=i)
>       cv_scores.append(1-np.mean(cross_val_score(knn_cv, X, t, cv=5)))
>   plt.plot(np.arange(1,30,1),cv_scores)
>   # ... labeling ...
>   print(np.min(cv_scores))
>   ```
> - **Output**: `0.022222222222222143`
> - **Graph Analysis**: The plot shows the "Average CV error" on the y-axis vs. the "Number of neighbors" (`k`) on the x-axis. The error is lowest around k=11, indicating this is the best choice for `k`.

- **Page 18 (Decision Boundaries)**:

> **Image Content Analysis:**
> - **Description**: Two plots showing the final decision boundaries on the orange/lemon data.
> - **Left Plot (k=11)**: Shows a reasonably smooth and effective decision boundary learned with the optimal `k`.
> - **Right Plot (k=40)**: Shows an overly smooth, less accurate decision boundary, demonstrating the effect of choosing a `k` that is too large.

---

## Page 19: K-NN summary

- **Simple**
  - Only 1 parameter to tune (`k`).
  - simple to implement.
  - Fast training (rather no training).
- **...but inefficient**
  - Inference time may be large if N is large - **Not ideal**.
  - Large memory requirement.
