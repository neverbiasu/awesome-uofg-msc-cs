# Enriched Content: MLAI4DS__Projection_FD.pdf

This document is a complete and detailed AI-friendly version of the presentation `MLAI4DS__Projection_FD.pdf` on Feature Selection and Projection. All visual content including text, graphs, diagrams, and formulas has been meticulously transcribed and described.

---

## Page 1: Title Slide

- **Title**: Machine Learning & Artificial Intelligence for Data Scientists: Feature selection and projection
- **Author**: Fani Deligianni
- **Profile**: https://www.gla.ac.uk/schools/computing/staff/fanideligianni/
- **Affiliation**: School of Computing Science

---

## Page 2: A problem - too many features

- **Aim**: To build a classifier that can diagnose leukaemia using Gene expression data.
- **Data**: 27 healthy samples, 11 leukaemia samples (N = 38). Each sample is the expression (activity) level for 3751 genes. (Also have an independent test set)

> **Image Content Analysis:**
> - **Overall Description**: A heatmap representing the gene expression data.
> - **Structural Analysis**: The image is a matrix where each row could represent a sample and each column a gene. The colors (ranging from blue to yellow) represent the expression level. A black rectangle highlights a single column, representing a single feature (gene) across all samples.

- In general, the number of parameters will increase with the number of features – D = 3751.
- e.g. Logistic regression – **w** would have length 3751!
- Fitting lots of parameters is hard - imagine Metropolis-Hastings in 3751 dimensions rather than 2!

---

## Page 3: Features

- For visualisation, most examples we've seen have had only 2 features **x** = [x₁, x₂]ᵀ.
- We sometimes **created** more: **x** = [1, x₁, x₁x₂, x₁², x₁³, ...]ᵀ.
- Now, we've been given lots (3751) to start with.
- We need to reduce this number.
- **2 general schemes:**
  - Use a **subset** of the originals.
  - Make new ones by **combining** the originals.

---

## Page 4: Finding a subset – example

- Take one feature – N values.

> **Image Content Analysis:**
> - **Description**: The same heatmap as page 2, with a single column (feature) highlighted.

- Some values from objects in class 1, some from class 0.
- Split them based on class and compute μ and σ² for each class.
- Compute `s` for each feature:
  - **Formula**: `s = |μ₁ - μ₀| / (σ₀² + σ₁²)`
- Keep features with high `s`.

---

## Page 5: Examples

> **Image Content Analysis:**
> - **Overall Description**: Three plots showing the distributions of a feature for two classes (class 0 and class 1). The separability of the classes increases from left to right.
> - **Transcribed Text**: "Features get better (higher s) from left to right..."
> - **Left Plot**: Two Gaussian-like distributions are shown, heavily overlapping. The data points for each class below the curves are intermingled. This represents a poor feature with a low `s` score.
> - **Middle Plot**: The two distributions are more separated, with less overlap. The data points show better grouping. This is a better feature.
> - **Right Plot**: The two distributions are almost completely separate. The data points for each class are clearly distinct. This represents an excellent feature with a high `s` score.

- Each feature has an s-score. The higher the better.
- Use the S features with the highest scores.
- How to choose S?

---

## Page 6: A feature selection scheme (CV)

- For each candidate S value:
  - Split the data into C folds (just as in CV)
  - For each fold...
    1. Find the feature scores on the **training** data.
    2. Train the classifier (whichever we choose).
    3. Record the performance.
- **Important**: Must only compute scores on training data. Otherwise we are implicitly using the test labels for training – biased.

---

## Page 7: Example

> **Image Content Analysis:**
> - **Overall Description**: A scatter plot showing the best two features selected from the leukaemia dataset.
> - **Transcribed Text**:
>   - Y-axis Label: "Second best feature"
>   - X-axis Label: "Best feature"
>   - Caption: "Best two features in our leukaemia data (points labeled by class)."
> - **Structural Analysis**:
>   - **Type**: 2D Scatter Plot.
>   - **Data Points**: Two classes are plotted. Gray filled circles are clustered in the bottom-left. Empty squares are clustered in the top-right. The classes are well-separated by these two features.

---

## Page 8: Example

> **Image Content Analysis:**
> - **Overall Description**: A line plot showing the test error as the number of selected features (S) increases.
> - **Transcribed Text**:
>   - Y-axis Label: "Test error"
>   - X-axis Label: "S"
>   - Annotation: An arrow points to a local minimum on the curve, labeled "S = 9".
>   - Caption: "Performance as S increases."
> - **Structural Analysis**:
>   - **Type**: 2D Line Plot.
>   - **Y-axis Ticks**: 0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12.
>   - **X-axis**: Logarithmic scale with ticks at 10⁰, 10¹, 10², 10³, 10⁴.
>   - **Data Plot**: The line shows the test error fluctuating. It drops to a minimum around S=9 and then generally rises, indicating that adding more, less-informative features degrades performance (overfitting).

---

## Page 9: Making new features

- An alternative to choosing features is making new ones.
- **Cluster:**
  - Cluster the features (turn our clustering problem around)
  - If we use say K-means, our new features will be the K mean vectors.
- **Projection/combination**
  - Reduce the number of features by projecting into a lower dimensional space.
  - Do this by making new features that are combinations (linear) of the old ones.

---

## Page 10: Projection

> **Image Content Analysis:**
> - **Description**: An image of a human hand and its shadow on a surface.
> - **Annotations**: An arrow points to the hand, labeled "A 3-dimensional object". Another arrow points to the shadow, labeled "A 2-dimensional projection".
> - **Interpretation**: This is a visual analogy for dimensionality reduction, where a 3D object is projected into a 2D representation.

---

## Page 11: Projection (Formulas)

- We can project data (D dimensions) into a lower number of dimensions (M).
- **Formula**: `Z = XW`
  - **X** is N × D
  - **W** is D × M
- **Z** is N × M – an M-dimensional representation of our N objects.
- **W** defines the projection
  - Changing **W** is like changing where the light is coming from for the shadow (or rotating the hand).
  - (**X** is the hand, **Z** is the shadow)
- Once we've chosen **W** we can project test data into this new space too: `Z_new = X_new * W`

---

## Page 12: Choosing W

- Different **W** will give us different projections (imagine moving the light).
- Which should we use?
- Not all will represent our data well...

> **Image Content Analysis:**
> - **Description**: An image showing a distorted, elongated shadow of a hand.
> - **Annotation**: An arrow points to the shadow, with a box saying "This doesn't look like a hand!".
> - **Interpretation**: This illustrates that a poor choice of projection matrix **W** can lead to a new representation that loses key information from the original data.

---

## Page 13: Principal Components Analysis

- Principal Components Analysis (PCA) is a method for choosing **W**.
- It finds the columns of **W** one at a time (define the m-th column as **w**_m).
  - Each D × 1 column defines one new dimension.
- Consider one of the new dimensions (columns of **Z**): `z_m = X * w_m`
- PCA chooses **w**_m to maximise the variance of **z**_m.
  - **Variance Formula**: `(1/N) * Σ(z_mn - μ_m)²` where `μ_m = (1/N) * Σ(z_mn)`
- Once the first one has been found, the **w**₂ is found that maximises the variance and is **orthogonal** to the first one etc etc.

---

## Page 14-17: PCA – a visualisation

> **Image Content Analysis (Series of 4 slides):**
> - **Overall Description**: A series of plots visualizing how PCA finds the best projection.
> - **Page 14**: Shows the original 2D data, a cloud of points with a positive correlation.
> - **Page 15**: A random projection line (an arbitrary **w**) is chosen. The data points are projected onto this line. The variance of the projected points is calculated (`σ² = 0.39`).
> - **Page 16**: Another arbitrary projection line is chosen (this one is vertical). The variance of the data projected onto this line is higher (`σ² = 1.2`).
> - **Page 17**: A third projection line is shown, this one aligned with the main axis of the data cloud. The variance along this line is the highest (`σ² = 1.9`). This line represents the first principal component (PC1).

---

## Page 18: PCA – analytic solution

- Could search for **w**₁, ..., **w**_M
- But, analytic solution is available.
- **w** are the **eignvectors** of the covariance matrix of **X**.
  - You don't need to know this!
- **Python**: `sklearn.decomposition.PCA`, **R**: `prcomp`

---

## Page 19: PCA – analytic solution (SVD)

> **Image Content Analysis:**
> - **Left Image**: A diagram illustrating the Singular Value Decomposition (SVD) of a matrix: `M = UΣV*`. This is the mathematical foundation behind PCA.
> - **Right Image**: A screenshot of a tweet from WIRED about Stitch Fix using eigenvector decomposition to understand clients' style.

---

## Page 20: PCA – analytic solution (Math)

- **Covariance Matrix**: `C = (XᵀX) / (n-1)`
- **SVD of Data**: `X = UΣVᵀ`
- **Relationship**: The page shows the derivation of how the covariance matrix `C` relates to the components of the SVD, resulting in `C = V * (Σ² / (n-1)) * Vᵀ`.

---

## Page 21: PCA – leukaemia data

> **Image Content Analysis:**
> - **Overall Description**: A scatter plot of the leukaemia data after being projected onto its first two principal components.
> - **Transcribed Text**:
>   - Y-axis Label: z₂
>   - X-axis Label: z₁
>   - Caption: "First two principal components in our leukaemia data (points labeled by class)."
> - **Structural Analysis**: The two classes (gray circles and empty squares) are plotted. They show some separation along the first principal component (the x-axis), but there is still significant overlap.

---

## Page 22: PCA – leukaemia data (Test Error)

> **Image Content Analysis:**
> - **Overall Description**: A line plot showing the test error as more principal components are used in the model.
> - **Transcribed Text**:
>   - Y-axis Label: "Test error"
>   - X-axis Label: "M" (Number of components)
>   - Caption: "Test error as more and more components are used."
> - **Structural Analysis**: The plot shows that the test error is lowest when using a small number of components (around M=5-10) and then increases as more components are added, suggesting that later components are capturing noise rather than signal.

---

## Page 23: Summary

- Sometimes we have too much data (too many dimensions).
- Need to select features.
- Features can be dimensions that already exist.
- Or we can make new ones.
- We've seen one example of each.
