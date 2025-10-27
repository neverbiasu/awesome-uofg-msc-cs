# Enriched Content: Case_Study1_MLAIDS.pptx.pdf

This document is a complete and detailed AI-friendly version of the presentation `Case_Study1_MLAIDS.pptx.pdf` on model selection for clustering. All visual content including text, graphs, diagrams, and formulas has been meticulously transcribed and described.

---

## Page 1: Title Slide

- **Title**: Case study 1: Model selection for clustering
- **Author**: Ke Yuan (Ke.Yuan@glasgow.ac.uk)
- **Attribution**: (Slides from Lucas.Farndale@glasgow.ac.uk)
- **Affiliation**: University of Glasgow

---

## Page 2: Overview

- What is Model selection?
- Challenges in model selection for clustering
- Clustering algorithms
- Colorectal Tissue Biopsy and Clustering
- Your task and dataset details
- Expected results
- Summary

---

## Page 3: Model selection

- **Choosing the best model candidate**
  - family of algorithms (e.g. Logistic regression, KNN)
  - different hyperparameters (e.g. regularisation strength, number of neighbours)
- **What is 'the best model'?**
  - Define objective (e.g. accuracy, minimise false positives, etc)
  - Complexity
  - Computability
  - Ease of Implementation

---

## Page 4: Why do we need model selection for clustering?

> **Image Content Analysis:**
> - **Overall Description**: A diagram showing three distinct clusters of data points.
> - **Structural Analysis**: 
>   - Three groups of colored squares are shown: yellow (top-left), blue (top-right), and red (bottom-center).
>   - Each group is enclosed by a large, corresponding colored circle (an orange circle for yellow squares, a blue circle for blue squares, a red circle for red squares).
>   - The circles for the red and blue clusters, and the red and yellow clusters, overlap slightly.
>   - **Interpretation**: This visually represents a well-separated dataset where the ideal number of clusters (K=3) is obvious.

---

## Page 5-10: Why do we need model selection for clustering? (Ambiguous Examples)

> **Image Content Analysis (Series of 6 slides):**
> - **Overall Description**: This series of slides uses the same set of 8 animal images (ostrich, robin, flamingo, parrot, naked mole rat, fox, border collie, zebrafish, and two other fish) to demonstrate that there is no single "correct" way to cluster data. The clustering depends on the chosen features.
> - **Slide 5**: Shows one possible clustering. A red circle groups the birds (ostrich, robin, flamingo, parrot). A green circle groups the mammals (dog, fox, naked mole rat). A blue circle groups the fish.
> - **Slide 6**: Shows a different clustering. The red circle now contains the dog and the ostrich. The green circle contains the fox and the parrot. The blue circle still contains fish, but also the robin.
> - **Slide 7**: Another clustering. The red circle contains most animals. The green circle contains the robin, flamingo, and a green fish.
> - **Slides 8-10**: Show further variations of ambiguous or non-obvious groupings.
> - **Interpretation**: These slides illustrate that without a clear objective or feature definition, clustering is subjective. Is the clustering based on color, habitat, ability to fly, or phylogeny? Model selection helps us formalize this choice.

---

## Page 11: Why do we need model selection for clustering?

- Group similar objects together
- Constraints on clusters
- Understand the structure of a dataset
- **The best clustering model will best describe the structure of the data.**

> **Image Content Analysis:**
> - **Overall Description**: Two plots showing the same data points clustered in two different ways.
> - **Left Plot**: The data points are grouped into three distinct, color-coded clusters (blue, red, yellow) that follow the natural shape of the data (three crescent-like shapes).
> - **Right Plot**: The same data points are clustered incorrectly by a model that seems to assume spherical clusters. The red cluster cuts across two of the natural crescents, and the yellow and blue clusters are not well-defined.
> - **Interpretation**: This demonstrates that a good clustering model should match the inherent structure of the data.

---

## Page 12: Examples of clustering algorithms

- **Cluster numbers can be explicitly specified:**
  1. K-means
  2. Gaussian Mixture Model (GMM)
- **Or inferred:**
  1. Hierarchical clustering
  2. Louvain Clustering

---

## Page 13: K-means

> **Image Content Analysis:**
> - **Overall Description**: A 2x2 grid of plots visually demonstrating the iterative steps of the K-means algorithm.
> - **Transcribed Text (Algorithm Steps)**:
>   1. Choose k random points
>   2. Partition objects into k subset
>   3. Compute the new centroids (mean points) of the clusters
>   4. Repeat steps 2+3 until convergence
> - **Structural Analysis of Plots**:
>   - **Plot 1**: Shows initial state with scattered gray data points and two randomly placed centroids (red diamond, blue circle).
>   - **Plot 2**: Data points are colored red or light blue based on their proximity to the initial centroids (Assignment step).
>   - **Plot 3**: The centroids move to the mean position of their assigned data points (Update step).
>   - **Plot 4**: Data points are re-assigned to the new, updated centroids, resulting in a more refined clustering. This completes one full iteration.

---

## Page 14: K-means (Limitations)

> **Image Content Analysis:**
> - **Overall Description**: Three plots showing datasets where K-means performs poorly because its assumptions are violated.
> - **Left Plot (Unequal Variance)**: K-means incorrectly partitions three spherical clusters of different sizes and densities.
> - **Middle Plot (Anisotropically Distributed Blobs)**: K-means fails to correctly identify three elongated, non-spherical clusters.
> - **Right Plot (Irregular Shaped Data)**: K-means fails to separate two crescent-shaped ("two moons") clusters.

---

## Page 15: Gaussian Mixture Model (GMM)

- k-means only considers mean points
- GMM considers mean and (co-)variance
- Fit M Gaussian components by maximising log-likelihood
- **Log-Likelihood Formula**: `l(θ|x) = Σ_{i=1 to N} log( Σ_{m=1 to M} α_m * φ(x_i | μ_m, Σ_m) )`
  - `x` - datapoint
  - `θ` - gaussian parameters `{(μ_m, Σ_m): 0≤m≤M}`
  - `α` - mixing coefficient
  - `Φ` – probability density function

> **Image Content Analysis:**
> - **Overall Description**: A contour plot showing the negative log-likelihood predicted by a GMM for a set of data points.
> - **Graph Analysis**: The data points form two elongated clusters. The GMM correctly models these with elliptical contours, indicating it can handle non-spherical cluster shapes. The color bar indicates the likelihood, with the centers of the ellipses being the most likely regions.

---

## Page 16-23: GMM Iterations (Animation)

> **Image Content Analysis:**
> - **Overall Description**: A series of 8 slides showing the Expectation-Maximization (EM) algorithm for a GMM converging on a dataset of 3 clusters.
> - **Initial Guess (Page 16)**: Three ellipses (representing the Gaussian components) are placed randomly on the data points.
> - **Iterations 1-20 (Pages 17-23)**: With each iteration, the ellipses shift and resize to better fit the three distinct groups of data points. The data points themselves are colored based on their probability of belonging to each cluster (red, green, or blue). By the 20th iteration, the three ellipses perfectly enclose the three clusters.

---

## Page 24-26: GMM on Bio Assay Data

> **Image Content Analysis:**
> - **Overall Description**: A series of 3 slides showing a GMM being applied to a complex "Bio Assay Data" scatter plot.
> - **Page 24**: Shows the raw scatter plot data, which has a complex, non-linear structure.
> - **Page 25**: Shows the result of fitting a GMM, with red ellipses identifying several distinct clusters within the data.
> - **Page 26**: Shows the resulting probability density function as a grayscale contour map, highlighting the high-density regions where the clusters were found.

---

## Page 27: Hierarchical Clustering (HC)

- Consider each data point as separate cluster.
- Consecutively merge clusters until all clusters are connected or specified number of clusters are obtained.
- **Dendrograms** illustrate distance between clusters.
- No assumption on number of clusters.

> **Image Content Analysis:**
> - **Overall Description**: A diagram illustrating the process of agglomerative hierarchical clustering.
> - **Top Row**: Shows 4 stages. (a) Starts with 6 individual data points (A-F). (b) D and E merge. (c) A and B merge. (d) The process continues until all points are in one large cluster.
> - **Bottom Row**: Shows the corresponding dendrogram being built at each stage. The height of the vertical lines in the dendrogram represents the distance at which clusters are merged.

---

## Page 28: Hierarchical Clustering (HC) Example

> **Image Content Analysis:**
> - **Overall Description**: A real-world example of a dendrogram used to show the evolutionary relationship (phylogenetic tree) of COVID-19 samples from different locations.
> - **Interpretation**: The tree structure groups genetically similar virus samples together. A legend on the left indicates the country of origin for each sample. A bar chart inset shows the proportion of samples from different regions.

---

## Page 29-32: Graph-based clustering

- **Graph Theory (Page 29)**: Illustrates basic graph concepts with a diagram showing nodes (circles) and edges (lines connecting them).
- **Making Sense of Arbitrary Shapes (Page 30)**: Shows two London Underground maps, illustrating how a complex system can be represented as a graph (stations as nodes, lines as edges) to reveal its underlying structure.
- **Graph-based clustering (Page 31)**: Shows graphs with different levels of modularity. A high modularity score (M≈1) indicates a network with dense connections within communities but sparse connections between them, which is ideal for clustering.
- **Louvain Clustering (Page 32)**: A diagram illustrating the Louvain method, a popular algorithm for community detection in graphs. It involves iteratively optimizing modularity by moving nodes between communities and then aggregating communities into single nodes for the next pass.

---

## Page 33-35: Evaluating Clustering

- **Challenges**: No labels, outcomes are subjective, hard to define performance, sensitive to algorithms and feature spaces.
- **V-measure (Page 34)**: Used when ground truth labels are available. It's the harmonic mean of:
  - **Homogeneity**: Each cluster contains only members of a single class.
  - **Completeness**: All members of a given class are assigned to the same cluster.
- **Silhouette Score (Page 35)**: Used when ground truth is not known. It measures how similar an object is to its own cluster compared to other clusters. A higher score means clusters are dense and well-separated. The formula `s = (b - a) / max(a, b)` is shown.

---

## Page 36-44: Case Study: Colorectal Tissue Patch Clustering

- **Introduction (Page 36)**: Digital pathology images are very large (20Gb on average) and are analyzed by breaking them into smaller patches.
- **Image Processing (Page 37)**: A diagram shows the workflow: a Whole Slide Image (WSI) is split into patches, which are then clustered to get a statistical summary of visual features.
- **The Task (Page 38)**: Given 5,000 tissue patches from 9 tissue types (Adipose, Debris, Mucus, etc.), select appropriate clustering algorithms (Kmeans, GMM, etc.) and assess their performance.
- **Feature Extraction (Page 39)**: A flowchart shows that the image patches have already been processed by deep learning models (PathologyGAN, ResNet50, InceptionV3, VGG16) and reduced to 100-dimensional vectors for the student to use.
- **Example Report (Page 40)**: Shows a table to be filled in with performance scores (Measure A) for each representation/algorithm pair, and a stacked bar chart showing the tissue type composition of each found cluster.
- **Report Summary (Page 41-44)**: Outlines the expected structure of the final report: Introduction, Methodology, Experimental framework, Results, and Conclusion.

---

## Page 42-43: Summary

- **Summary of Methods**: A table comparing the pros and cons of K-means, Gaussian Mixture Model, Hierarchical Clustering, and Louvain Community Detection.
- **Overall Summary**: Model selection for clustering is challenging because outcomes can be subjective. It's important to use prior knowledge and evaluate clusters based on structure or ground truth labels if available.

---

## Page 45: Thank You

- A final slide with a picture of the University of Glasgow skyline at sunset.