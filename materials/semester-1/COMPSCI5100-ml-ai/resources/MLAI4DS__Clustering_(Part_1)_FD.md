# Enriched Content: MLAI4DS__Clustering_(Part_1)_FD.pdf

This document is a complete and detailed AI-friendly version of the presentation `MLAI4DS__Clustering_(Part_1)_FD.pdf`. All visual content including text, graphs, diagrams, and formulas has been meticulously transcribed and described.

---

## Page 1: Title Slide

- **Title**: Machine Learning & Artificial Intelligence for Data Scientists: Clustering (Part 1)
- **Author**: Fani Deligianni
- **Profile**: https://www.gla.ac.uk/schools/computing/staff/fanideligianni/
- **Affiliation**: School of Computing Science

---

## Page 2: Supervised vs Unsupervised Learning

> **Image Content Analysis:**
> - **Overall Description**: Two diagrams contrasting supervised and unsupervised learning.
> - **Left Diagram (Supervised Learning)**:
>   - **Title**: Supervised learning (classification)
>   - **Content**: Shows data points of two classes (blue circles, orange crosses) that are already labeled. The goal is to find a boundary (a line) that separates them.
> - **Right Diagram (Unsupervised Learning)**:
>   - **Title**: Unsupervised learning (clustering)
>   - **Content**: Shows a collection of unlabeled data points (gray circles). The goal is to discover the underlying groups or clusters within the data without any predefined labels.

---

## Page 3: What is clustering?

- Grouping a set of objects in such a way that objects in the same group (called a **cluster**) are more similar (in some sense) to each other than to those in other groups (clusters).
- It is a main task of exploratory data mining, and a common technique for statistical data analysis, used in many fields, including machine learning, pattern recognition, image analysis, information retrieval, bioinformatics, data compression, and computer graphics.

---

## Page 4: Why clustering?

- **Summarising data**: Instead of looking at thousands of data-points, we can look at a few clusters’ centroids.
- **Find groupings in data**.
- **Can be a downstream application, e.g. for outlier detection.**

---

## Page 5: Applications of clustering

- **Marketing**: discovering distinct groups of customers (customer segmentation).
- **Biology**: clustering of genes with similar expression patterns.
- **City planning**: Grouping houses according to their house type, value, and geographical location.
- **Image segmentation**
- **Social network analysis**

---

## Page 6: Clustering Algorithms

- **Connectivity-based clustering (hierarchical clustering)**: Based on the core idea of objects being more related to nearby objects than to objects farther away.
- **Centroid-based clustering (k-means)**: Represents each cluster by a single mean vector.
- **Distribution-based clustering (Gaussian Mixture Models)**: Assumes data is composed of distributions, such as Gaussian distributions.
- **Density-based clustering (DBSCAN, OPTICS)**: Connects areas of high density into clusters.

---

## Page 7: K-means clustering

- An algorithm to cluster n objects based on attributes into k partitions, where k < n.
- It is similar to the expectation-maximization algorithm for mixtures of Gaussians.

---

## Page 8: K-means Algorithm

1.  **Specify** the number of clusters K.
2.  **Initialise** K cluster centers (centroids) randomly.
3.  **Assignment step**: Assign each data point to the cluster with the nearest centroid.
4.  **Update step**: Update the cluster centroids by computing the mean of all data points assigned to that cluster.
5.  **Repeat** steps 3 and 4 until the assignments no longer change or a maximum number of iterations is reached.

---

## Page 9: K-means – Initialisation

> **Image Content Analysis:**
> - **Overall Description**: A scatter plot showing data points and two randomly initialized cluster centroids.
> - **Structural Analysis**:
>   - **Data**: A cloud of gray, unlabeled data points.
>   - **Centroids**: Two centroids are shown as a large red cross and a large blue cross, placed randomly among the data points.
>   - **Interpretation**: This represents the first step of K-means, where initial centroids are chosen before any assignment has been made.

---

## Page 10: K-means – Assignment Step

> **Image Content Analysis:**
> - **Overall Description**: The same scatter plot, now showing the result of the first assignment step.
> - **Structural Analysis**:
>   - **Data**: The data points are now colored either red or blue.
>   - **Coloring Logic**: Each point is colored according to the closest initial centroid. Points closer to the red cross are now red; points closer to the blue cross are now blue.
>   - **Centroids**: The red and blue crosses remain in their initial random positions.

---

## Page 11: K-means – Update Step

> **Image Content Analysis:**
> - **Overall Description**: The plot now shows the centroids moving to the center of their newly assigned clusters.
> - **Structural Analysis**:
>   - **Data**: The data points remain colored red and blue as in the previous step.
>   - **Centroid Movement**: Arrows indicate that the red and blue centroids are moving from their old random positions to the mean (center of mass) of their respective red and blue data point clusters.

---

## Page 12: K-means – Iteration 2 (Assignment)

> **Image Content Analysis:**
> - **Overall Description**: The plot shows the second assignment step.
> - **Structural Analysis**: With the centroids now in their new, updated positions, the data points are re-assigned. Some points that were previously blue are now closer to the new red centroid and have been re-colored red, and vice-versa. This shows the clusters becoming more refined.

---

## Page 13: K-means – Final Clusters

> **Image Content Analysis:**
> - **Overall Description**: The plot shows the final, converged state of the K-means algorithm.
> - **Structural Analysis**: The data is now partitioned into two stable, well-defined red and blue clusters. The centroids are at the center of their respective clusters, and no data points will change their assignment in the next iteration.

---

## Page 14: K-means Limitations

> **Image Content Analysis:**
> - **Overall Description**: Three plots demonstrating common failure modes of the K-means algorithm.
> - **Left Plot (Unequal Variance)**: K-means incorrectly partitions three spherical clusters of different sizes because it implicitly assumes clusters have similar variance.
> - **Middle Plot (Anisotropically Distributed Blobs)**: K-means fails to correctly identify three elongated, diagonal clusters because it prefers spherical cluster shapes.
> - **Right Plot (Irregular Shaped Data)**: K-means fails to separate two crescent-shaped ("two moons") clusters, as it can only create linear decision boundaries.

---

## Page 15: Gaussian Mixture Models (GMM)

- **Limitation of K-means**: It performs a hard assignment of each point to a single cluster.
- **GMM Approach**: It is a probabilistic model that assumes all the data points are generated from a mixture of a finite number of Gaussian distributions with unknown parameters.
- It performs a **soft assignment**, calculating the probability that a point belongs to each cluster.

---

## Page 16: Gaussian Distribution

> **Image Content Analysis:**
> - **Overall Description**: Two plots illustrating a 1D and a 2D Gaussian distribution.
> - **Left Plot (1D)**: The classic bell curve of a 1D Gaussian, defined by its mean (μ) and variance (σ²).
> - **Right Plot (2D)**: A 2D Gaussian shown as a contour plot. The contours are elliptical, centered at the mean (μ). The shape and orientation of the ellipses are determined by the covariance matrix (Σ).

---

## Page 17: Gaussian Mixture Model (GMM)

- A GMM is a weighted sum of M component Gaussian densities.
- **Formula**: `p(x) = Σ_{k=1 to K} π_k * N(x | μ_k, Σ_k)`
  - `π_k`: Mixing coefficients, where `Σ π_k = 1`.
  - `N(x | μ_k, Σ_k)`: The k-th Gaussian density component.

---

## Page 18: GMM - Expectation-Maximization (EM)

- The EM algorithm is used to find the maximum likelihood parameters of a GMM.
- **E-step (Expectation)**: Evaluate the responsibilities, which are the probabilities that each data point belongs to each cluster, given the current parameters.
- **M-step (Maximization)**: Re-estimate the parameters (means, covariances, and mixing coefficients) using the current responsibilities.
- The algorithm iterates between these two steps until convergence.

---

## Page 19-22: GMM Animation

> **Image Content Analysis (Series of 4 slides):**
> - **Overall Description**: A series of plots animating the convergence of the EM algorithm for a GMM on a 2D dataset with two elongated clusters.
> - **Page 19 (Initialisation)**: Two Gaussian components (shown as red and blue elliptical contours) are initialized randomly and do not fit the data well.
> - **Page 20 (After some iterations)**: The ellipses have started to move and rotate to align with the two data clusters.
> - **Page 21 (After more iterations)**: The ellipses are now closely aligned with the shape and orientation of the two clusters.
> - **Page 22 (Final)**: The algorithm has converged. The two elliptical contours perfectly capture the two elongated clusters in the data, demonstrating GMM's ability to handle non-spherical shapes.

---

## Page 23: Summary

- **Clustering**: An unsupervised learning problem.
- **K-means**: Simple, but has limitations (hard assignments, assumes spherical clusters).
- **GMM**: More flexible (soft assignments, models non-spherical clusters) but more complex.
- **EM Algorithm**: Used to train GMMs.
