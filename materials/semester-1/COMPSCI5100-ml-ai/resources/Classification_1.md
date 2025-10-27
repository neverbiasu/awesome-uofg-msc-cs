# Enriched Content: Classification_1.pdf

This document is a complete and detailed AI-friendly version of the presentation `Classification_1.pdf`. All visual content including text, graphs, diagrams, and formulas has been meticulously transcribed and described.

---

## Page 1-5: Introduction to Classification

- **Course**: COMPSCI 5100 - ML & AI for Data Science
- **Author**: Dr. Tanaya Guha
- **Topic**: Unit 2: Classification, Part I
- **Learning Objectives**:
  - To be able to formulate a problem to a classification task
  - To understand the components of a classifier
  - To be able to evaluate a classifier's performance
- **Examples of Classification (Page 3)**: Automatic speech recognition (ASR), Face recognition, and Sentiment analysis.

---

## Page 6: ML paradigms

- [AI ≠ ML, but in today's world ML and AI are often synonymous]
- **Machine Learning paradigms**
  - **Supervised**: need labelled training data
  - **Semi-supervised**: some labeled training data
  - **Unsupervised/ Self-supervised**: no labelled training data is needed

---

## Page 7: Supervised learning paradigm

- **Observe** a set of examples: Training data `x` and Labels `y`.
- **Model** the relationship between data and labels.
- **Predict** the label for new data (test data).

> **Image Content Analysis:**
> - **Description**: A flowchart of the supervised learning process where Data (x) and Labels (y) are fed into an "ML System" `y = F(x|θ)` to learn parameters `θ`, which are then used to make predictions `y_test = F(x_test|θ)`.

---

## Page 8: Classification vs. Regression

- **Classification**: Labels `y` are discrete (e.g., dog, cat, mouse).
- **Regression**: Labels `y` are continuous (e.g., price of houses).

---

## Page 9: Success stories

- **Topic**: ImageNet challenge (>1000 classes)

> **Image Content Analysis:**
> - **Top Image**: A collage of many diverse images from the ImageNet dataset.
> - **Bottom Graph**: A plot of Top-1 Accuracy vs. Year for the ImageNet challenge.
>   - **Y-axis**: TOP-1 ACCURACY (50 to 100).
>   - **X-axis**: Year (2013 to 2022).
>   - **Trend**: The plot shows a dramatic increase in accuracy over the years, starting from AlexNet (2013) below 70% to models like ViT-G/14 and CoCa (2022) achieving over 90% accuracy.
>   - **Models Labeled**: AlexNet, VGG-19, Inception V3, ResNeXt, PNASNet-5, NoisyStudent, ViT-G/14, CoCa.

---

## Page 10-11: Components of a classification system

1. Labeled data for training
2. Features (hand crafted for traditional ML, learned in DL)
3. Model
4. Evaluation metrics

> **Image Content Analysis (Page 11):**
> - **Description**: A diagram comparing "Traditional machine learning" and "Deep learning".
> - **Traditional ML**: Shows a distinct, manual "feature design" step `D(x)` before the "classification" model `F(x'|θ)`.
> - **Deep Learning**: Shows a single, end-to-end model `M(x|θ)` that performs "feature learning & classification" simultaneously.

---

## Page 12-18: Features

- **Example Task**: Build a classification system to identify oranges and lemons.
- **Steps**: 1. Decide attributes (weight, shape, colour). 2. Collect training data. 3. Extract features.
- **Ideal Training Data (Page 15)**: Should be large, balanced, not noisy, and contain varied examples.
- **Features = Representation of Data**

> **Image Content Analysis (Page 17):**
> - **Description**: A 2D scatter plot of "height/cm" vs. "width/cm" for oranges (red circles) and lemons (blue diamonds). It shows that the two classes are mostly separable using these two features.

---

## Page 19-22: Features examples

- **Features depend on data type**
- **Bag of Words (BoW) (Page 19)**: A diagram showing text being converted into a vector of word frequency counts.
- **Bag of 'words' for Images (Page 20)**: A diagram illustrating the Bag of Visual Words concept, where an image is broken down into a histogram of visual features (patches).
- **Tabular Features (Pages 21-22)**: A table showing various animals and their attributes (Egg-laying, Scales, Poisonous, etc.). Each row (animal) can be represented as a binary **Feature Vector**, e.g., Cobra -> `[11110]`.

---

## Page 23-26: Feature selection

- **Problem**: More features -> high dimensional features -> curse of dimensionality.
- **Goal**: Reduce feature space by throwing out unimportant features. Find a 'parsimonious' model.
- **Occam's razor**: simplest explanation that accounts for the data is the best.

> **Image Content Analysis (Page 25):**
> - **Description**: A diagram showing a large feature set `X` being reduced to a smaller `Reduced X` by selecting only the most relevant features (Family history, Smoker) for the task of predicting lung cancer risk.

- **Dimensionality reduction**: Principal Component Analysis (PCA) tells us which features account for the highest **variance** in data.

---

## Page 27-32: PCA (Principal Component Analysis)

- **Definition**: Consider a Feature matrix `X ∈ Rⁿˣᵖ` where `n` is the number of training samples, `p` is the dimension of features.

> **Image Content Analysis (Page 28):**
> - **Description**: A scatter plot of 2D data with the 1st and 2nd Principal Components drawn as orthogonal arrows. The 1st PC is aligned with the direction of maximum variance of the data.

- **First PC w**: Find projection of **X** on **w** such that it maximizes the Rayleigh Quotient: `argmax (wᵀXᵀXw) / (wᵀw)`.
- **Solution**: The max value is given by the largest eigenvalue of the **Covariance matrix** `C = XᵀX`. Therefore `w*` is the corresponding eigenvector.
- **Process**: We diagonalize the covariance matrix `C`. The columns of the resulting eigenvector matrix `V` are the PCs. In practice, we standardize **X** first.
- **Dimensionality reduction via PCA**: Keep only the largest `d` eigenvalues and their corresponding eigenvectors `V_d`. Project the data: `X_d = XV_d`.

---

## Page 33-35: Refresher and Summary

- **Page 33**: Provides recommended links for a Linear Algebra refresher.
- **Page 34**: Repeats the "Step 4: Build ML Model" slide.
- **Page 35**: Summary of Part I, recapping learning paradigms, components of a classification system, and noting that Model and Evaluation metrics are coming up.
