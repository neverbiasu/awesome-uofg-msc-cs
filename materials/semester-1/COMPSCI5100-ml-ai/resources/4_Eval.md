# Enriched Content: 4_Eval.pdf

This document is a complete and detailed AI-friendly version of the presentation `4_Eval.pdf` on model evaluation. All visual content including text, graphs, tables, and formulas has been meticulously transcribed and described.

---

## Page 1: Title Slide

- **Title**: ML & AI for Data Science: Evaluation
- **Author**: Ali Gooya
- **Contact**: ali.gooya@glasgow.ac.uk
- **Affiliation**: School of Computing Science

---

## Page 2: Recap

- **Regression**: Predicting a continuous value.
- **Classification**: Assigning a class label.
- **Clustering**: Finding groups in unlabeled data.
- **Projection**: Reducing the number of dimensions.

---

## Page 3: Why performance evaluation?

- To be able to choose between different models (e.g., linear vs. polynomial regression).
- To be able to choose between different algorithms (e.g., K-means vs. GMM).
- To be able to choose between different hyper-parameters (e.g., K in K-means).

---

## Page 4: Performance evaluation of a classifier

- For a binary classification problem, a classifier can make two types of errors:
  1. It can classify a positive instance as negative.
  2. It can classify a negative instance as positive.
- A **confusion matrix** is a table that summarizes the performance of a classification algorithm.

---

## Page 5: Confusion Matrix

> **Image Content Analysis:**
> - **Overall Description**: A diagram of a 2x2 confusion matrix.
> - **Structure**:
>   - **Rows**: Represent the **Predicted** class (Positive, Negative).
>   - **Columns**: Represent the **Actual** class (Positive, Negative).
>   - **Cells**:
>     - **True Positive (TP)**: Top-left. Correctly predicted positive.
>     - **False Positive (FP)**: Top-right. Incorrectly predicted positive (Type I error).
>     - **False Negative (FN)**: Bottom-left. Incorrectly predicted negative (Type II error).
>     - **True Negative (TN)**: Bottom-right. Correctly predicted negative.

---

## Page 6: Accuracy

- **Definition**: The proportion of the total number of predictions that were correct.
- **Formula**: `Accuracy = (TP + TN) / (TP + TN + FP + FN)`
- **Limitation**: Not a good performance measure when the classes are imbalanced.

---

## Page 7: Precision (Positive Predictive Value)

- **Definition**: Of all the predictions that were positive, how many were actually correct?
- **Formula**: `Precision = TP / (TP + FP)`

---

## Page 8: Recall (Sensitivity or True Positive Rate)

- **Definition**: Of all the actual positive instances, how many did we correctly predict as positive?
- **Formula**: `Recall = TP / (TP + FN)`

---

## Page 9: Specificity (True Negative Rate)

- **Definition**: Of all the actual negative instances, how many did we correctly predict as negative?
- **Formula**: `Specificity = TN / (TN + FP)`

---

## Page 10: F1-Score

- **Definition**: The harmonic mean of Precision and Recall. It provides a single score that balances both concerns.
- **Formula**: `F1 = 2 * (Precision * Recall) / (Precision + Recall)`

---

## Page 11: The trade-off: Precision vs Recall

- There is often an inverse relationship between precision and recall.
- Improving precision typically reduces recall and vice versa.
- The trade-off depends on the problem:
  - In spam detection, high precision is important (you don't want to misclassify a legitimate email as spam).
  - In cancer detection, high recall is important (you don't want to miss a potential case, even if it means more false alarms).

---

## Page 12-15: Receiver Operating Characteristic (ROC) curve

- **Definition**: An ROC curve is a plot that illustrates the diagnostic ability of a binary classifier system as its discrimination threshold is varied.
- **Axes**:
  - **Y-axis**: True Positive Rate (Recall/Sensitivity)
  - **X-axis**: False Positive Rate (1 - Specificity)

> **Image Content Analysis (Page 13):**
> - **Description**: An example of an ROC curve.
> - **Components**:
>   - A dashed diagonal line from (0,0) to (1,1) represents a random classifier (AUC = 0.5).
>   - A blue curve that bows towards the top-left corner represents a good classifier. The further the curve is from the diagonal line, the better the model's performance.

- **Interpretation**: The ROC curve shows the trade-off between sensitivity and specificity for every possible threshold.

---

## Page 16-21: Area Under the Curve (AUC)

- **Definition**: AUC stands for "Area under the ROC Curve". It provides an aggregate measure of performance across all possible classification thresholds.
- **Interpretation**: AUC can be interpreted as the probability that a classifier will rank a randomly chosen positive instance higher than a randomly chosen negative one.
- **Values**:
  - `AUC = 1`: Perfect classifier.
  - `AUC = 0.5`: Random classifier.
  - `AUC < 0.5`: Worse than random.

> **Example Calculation (Pages 18-21):**
> - **Description**: A step-by-step example of calculating AUC directly from a list of classifier scores and true labels, without plotting the curve.
> - **Process**:
>   1. A table lists instances with their true class (P/N) and predicted probability score.
>   2. The method involves comparing the score of every positive instance with every negative instance.
>   3. A point is awarded if the positive instance has a higher score, and 0.5 points if the scores are equal.
>   4. The total score is divided by the total number of pairs (num_pos * num_neg) to get the final AUC.

---

## Page 22-25: Cross-validation

- **Problem**: Performance on the training set is not a good indicator of performance on unseen data.
- **Solution**: Split the data into a training set and a testing set.
- **Better Solution**: Cross-validation provides a more robust estimate of model performance.

> **Image Content Analysis (Page 23):**
> - **Description**: A diagram illustrating K-fold cross-validation (with K=5).
> - **Process**:
>   1. The original dataset is split into 5 equal-sized folds.
>   2. The process iterates 5 times (5 "splits").
>   3. In each split, a different fold is held out as the test set (blue), and the remaining 4 folds are used as the training set (green).
>   4. The performance metric is calculated for each split, and the average across all splits is taken as the final performance estimate.

---

## Page 26: Summary

- **Confusion Matrix**: TP, TN, FP, FN
- **Metrics**: Accuracy, Precision, Recall, F1-score
- **ROC curve**: TPR vs FPR
- **AUC**: Area Under the ROC curve
- **Cross-validation**: A method for more robust performance evaluation.
