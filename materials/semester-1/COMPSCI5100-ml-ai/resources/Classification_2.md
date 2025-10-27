# Enriched Content: Classification_2.pdf

This document is a complete and detailed AI-friendly version of the presentation `Classification_2.pdf`. All visual content including text, graphs, and diagrams has been meticulously transcribed and described.

---

## Page 1-2: Title Slides

- **Course**: COMPSCI 5100 - ML & AI for Data Science
- **Topic**: Classification: Part II
- **Author**: Dr. Tanaya Guha (www.tanayag.com)

---

## Page 3: Recap

- **Classification**: The task of automatically labeling data.
- **Components of a classifier**: Labeled training data, features, a model, and evaluation metrics.
- **Models covered so far**: Logistic Regression, SVM.

---

## Page 4: k-Nearest Neighbours (k-NN)

- A simple, non-parametric algorithm.
- **Idea**: A test sample is assigned the label of the majority of its `k` nearest neighbors in the training set.
- The distance metric is typically Euclidean distance.

---

## Page 5: k-NN Example

> **Image Content Analysis:**
> - **Description**: A diagram illustrating the k-NN classification process.
> - **Components**:
>   - **Data**: Two classes of data points exist: red circles and blue squares.
>   - **Test Point**: A new data point, the green star, needs to be classified.
>   - **k=3**: A small circle is drawn around the green star, enclosing its 3 nearest neighbors (2 red circles, 1 blue square). The majority class is red, so the star is classified as a red circle.
>   - **k=5**: A larger circle encloses the 5 nearest neighbors (3 blue squares, 2 red circles). The majority class is now blue, so the star is classified as a blue square.
> - **Interpretation**: This shows how the choice of `k` can change the classification outcome.

---

## Page 6: k-NN Decision Boundary

> **Image Content Analysis:**
> - **Description**: Two plots showing the decision boundary of a k-NN classifier on a dataset.
> - **Left Plot (k=1)**: The decision boundary is highly irregular and jagged, closely following the individual data points. This is a sign of high variance and potential overfitting.
> - **Right Plot (k=20)**: The decision boundary is much smoother and provides a more generalized separation between the classes.

---

## Page 7: k-NN Pros and Cons

- **Pros**:
  - Simple to implement and understand.
  - No training phase is needed.
  - Can learn complex decision boundaries.
- **Cons**:
  - Computationally expensive during testing (needs to compute distances to all training points).
  - Performance is highly dependent on the choice of `k`.
  - Sensitive to irrelevant features and the scale of the data (features should be normalized).

---

## Page 8-9: Decision Trees

- A non-parametric supervised learning method used for classification and regression.
- **Goal**: To create a model that predicts the value of a target variable by learning simple decision rules inferred from the data features.

> **Image Content Analysis (Page 8 & 9):**
> - **Page 8**: Shows a simple, intuitive decision tree for classifying fruits based on features like `color` and `diameter`.
> - **Page 9**: A diagram illustrates how a decision tree partitions the feature space. The root node considers all data. The first split divides the space into two regions. Subsequent splits further divide those regions, creating a hierarchical partitioning that corresponds to the branches of the tree.

---

## Page 10-12: Building Decision Trees

- **How to choose the best feature to split on?**
  - The goal is to select the feature that results in the most "pure" child nodes (i.e., nodes that contain mostly samples from a single class).
- **Entropy**: A measure of impurity or uncertainty in a set of samples.
  - **Formula**: `Entropy(S) = - Σ p_i * log₂(p_i)` where `p_i` is the proportion of samples belonging to class `i`.
- **Information Gain**: The reduction in entropy achieved by splitting the data on a particular feature.
  - **Formula**: `Gain(S, A) = Entropy(S) - Σ (|S_v| / |S|) * Entropy(S_v)`
- **Algorithm**: The ID3 algorithm builds the tree by choosing the feature with the highest Information Gain at each step.

---

## Page 13: Overfitting in Decision Trees

- If a tree is grown too deep, it can perfectly classify the training data but may fail to generalize to new data (overfitting).
- **How to avoid overfitting?**
  - **Pre-pruning**: Stop growing the tree early (e.g., by setting a maximum depth or a minimum number of samples per leaf).
  - **Post-pruning (or just Pruning)**: Grow a full tree first, then prune back branches that provide little explanatory power on a validation set.

---

## Page 14: Decision Trees Pros and Cons

- **Pros**:
  - Simple to understand and interpret. The tree structure is very intuitive.
  - Requires little data preparation (e.g., no need for feature scaling).
  - Can handle both numerical and categorical data.
- **Cons**:
  - Can be unstable: small variations in the data can result in a completely different tree.
  - Prone to overfitting if not pruned.
  - Can be biased if some classes dominate.

---

## Page 15: Ensemble Methods

- **Idea**: Combine multiple individual models (often called "weak learners") to produce one optimal predictive model.
- The goal is to create a more powerful and robust model that has better generalization performance.

---

## Page 16: Bagging (Bootstrap Aggregating)

> **Image Content Analysis:**
> - **Description**: A flowchart illustrating the Bagging algorithm.
> - **Process**:
>   1. Multiple bootstrap samples (random samples with replacement) are drawn from the original training set.
>   2. A separate model (e.g., a decision tree) is trained on each bootstrap sample.
>   3. The predictions from all models are aggregated (e.g., by voting for classification or averaging for regression) to produce the final prediction.

---

## Page 17: Random Forests

- An ensemble method based on Bagging.
- It uses a large number of Decision Trees as the base learners.
- **Key Difference from Bagging**: In addition to sampling data points, it also samples a random subset of **features** at each split in each tree.
- This added randomness helps to de-correlate the trees and makes the model more robust.

---

## Page 18: Boosting

> **Image Content Analysis:**
> - **Description**: A diagram showing the sequential nature of Boosting.
> - **Process**:
>   1. A first model is trained on the data.
>   2. The second model is trained to focus on the instances that the first model misclassified (these points are given higher weight).
>   3. A third model is trained to focus on the mistakes of the second model, and so on.
>   4. The final prediction is a weighted sum of the predictions from all the sequential models.

---

## Page 19: AdaBoost (Adaptive Boosting)

- One of the most popular boosting algorithms.
- It fits a sequence of weak learners on repeatedly modified versions of the data.
- The predictions from all of them are then combined through a weighted majority vote to produce the final prediction.

---

## Page 20: Summary

- **k-NN**: A simple, instance-based learning algorithm.
- **Decision Tree**: A model that uses a tree-like graph of decisions.
- **Ensemble Methods**: Combine multiple models to improve performance.
  - **Bagging**: Trains models on bootstrap samples in parallel.
  - **Random Forest**: An extension of Bagging with feature sampling.
  - **Boosting**: Trains models sequentially, focusing on errors.
