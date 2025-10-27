# Enriched Content: Evaluation.pdf

This document is a complete and detailed AI-friendly version of the presentation `Evaluation.pdf` on model evaluation strategies and metrics. All visual content including text, graphs, and diagrams has been meticulously transcribed and described.

---

## Page 1-2: Title Slides

- **Course**: COMPSCI 5100 - ML & AI for Data Science
- **Topic**: Classification: Part III (Detour...)
- **Author**: Ali Gooya

---

## Page 3: Performance evaluation

- **Evaluation strategy**: How to split data for training and testing.
- **Evaluation metrics**: How to measure performance accurately.
- **Benchmarking**: Compare results against other ‘known’ results.

---

## Page 4: Evaluation strategy - Cross validation

> **Image Content Analysis:**
> - **Description**: A diagram illustrating 5-fold cross-validation.
> - **Process**: The data is split into 5 folds. The process iterates 5 times. In each iteration (1st, 2nd, ... 5th), a different fold is used as the Validation Fold (purple) while the remaining four are used as the Training Fold (teal). The performance is calculated for each of the 5 runs, and the final result is the Average Performance of all the folds.

---

## Page 5: Evaluation strategy - Leave one subject out

- Particularly useful for classification tasks involving human-centric data.

> **Image Content Analysis:**
> - **Description**: A diagram illustrating Leave-One-Subject-Out cross-validation with 3 subjects (represented by different colored stick figures).
> - **Process**:
>   - **Fold 1**: Train on subjects 1 (green) and 2 (gray), test on subject 3 (blue).
>   - **Fold 2**: Train on subjects 1 (green) and 3 (blue), test on subject 2 (gray).
>   - **Fold 3**: Train on subjects 2 (gray) and 3 (blue), test on subject 1 (green).

---

## Page 6: Evaluation strategy - Random train:test splits

- Particularly useful for very large datasets where CV may be difficult.
- Randomly choose 70-80% data for training and rest for testing.

> **Image Content Analysis:**
> - **Description**: A pie chart visually representing an 80/20 train/test split.

---

## Page 7: Performance metrics

- Performance metrics are important to:
  - Compare performances of multiple classifiers.
  - Compare performance of the same classifier under different conditions.
  - Tune hyperparameters.
- No metric is perfect; each gives you some insights.
- **Practical tip: Use multiple evaluation metrics.**

---

## Page 8: Accuracy

- **Formula**: `Accuracy = Number of correctly classified samples / Total number of test samples`
- Often expressed in %.
- Simple, intuitive, widely used.
- **Disadvantage**: Doesn't take into account class imbalance.
  - Example: A classifier for a rare disease (1% of population) that always predicts "healthy" will have 99% accuracy but is a useless classifier.
- **Weighted accuracy (WA)**: Accuracies computed per class, averaged across all classes.

---

## Page 9: Confusion matrix

> **Image Content Analysis:**
> - **Left Diagram**: The standard 2x2 confusion matrix showing TP (True Positives), FP (False Positives), FN (False Negatives), and TN (True Negatives).
> - **Right Diagram**: A real-world, large-scale confusion matrix for a multi-class problem (20 classes). It shows that the algorithm is getting 'confused' between certain classes (e.g., classes 16, 17, 19, 20), indicated by high values off the main diagonal. This helps direct efforts to improve the classifier.

---

## Page 10-12: Precision, Recall, and Specificity

- **Precision (Page 10)**
  - **Formula**: `Precision = TP / (TP + FP)`
  - **Question**: Among all people classified as 'diseased', how many are actually diseased?
- **Recall or Sensitivity (Page 11)**
  - **Formula**: `Sensitivity (S_e) = TP / (TP + FN)`
  - **Question**: Among all diseased people, how many are correctly identified?
- **Specificity (Page 12)**
  - **Formula**: `Specificity (S_p) = TN / (TN + FP)`
  - **Question**: Among all healthy people, how many are classified as healthy?

---

## Page 13: Optimizing sensitivity and specificity

- We would like both to be as high as possible.
- Often increasing one will decrease the other.
- Balance will depend on application:
  - e.g. diagnosis: We can probably tolerate a decrease in specificity (healthy people diagnosed as diseased) ...if it gives us an increase in sensitivity (getting diseased people right).

---

## Page 14-15: ROC, AUC

- **ROC**: Many classification algorithms involve setting a threshold. The **Receiver Operating Characteristic (ROC) curve** shows how Sensitivity (`S_e`) and 1 - Specificity (`1 - S_p`) vary as the threshold changes.

> **Image Content Analysis (Page 15):**
> - **Left Plot**: Shows that the Area Under the Curve (**AUC**) is the gray shaded area under the ROC curve.
> - **Right Plot**: A classic ROC curve plot.
>   - **Axes**: Y-axis is `S_e` (TPR), X-axis is `1 - S_p` (FPR).
>   - **Random classifier**: A dashed diagonal line from (0,0) to (1,1), with an AUC of 0.5.
>   - **Good classifier**: A curve that bows towards the top-left corner (AUC > 0.5). The "Better" the classifier, the closer it gets to the "Perfect classifier" point at (0, 1) (AUC = 1).

---

## Page 16: Example: Breast Cancer Dataset

- **Title**: Try it on a breast cancer dataset - Plot ROC of a Logistic Regression model

> **Image Content Analysis:**
> - **Description**: A Jupyter Notebook cell and its output, demonstrating ROC/AUC calculation.
> - **Transcribed Code**:
>   ```python
>   from sklearn.model_selection import train_test_split
>   from sklearn import metrics
>   from sklearn.datasets import load_breast_cancer
>   
>   # Load data
>   breast_cancer = load_breast_cancer()
>   X = breast_cancer.data
>   t = breast_cancer.target
>   
>   # Split data
>   X_train, X_test, y_train, y_test = train_test_split(X,t,test_size=0.30, random_state=123)
>   
>   # Train model and get predictions
>   clf1 = LogisticRegression().fit(X_train, y_train)
>   y_pred_proba1 = clf1.predict_proba(X_test)[:,1]
>   
>   # Calculate ROC/AUC
>   fpr1, tpr1, _ = metrics.roc_curve(y_test, y_pred_proba1)
>   auc1 = metrics.roc_auc_score(y_test, y_pred_proba1)
>   
>   # Plot
>   plt.plot(fpr1,tpr1,'ro-',label="breast cancer data, auc="+str(auc1))
>   plt.legend(loc=4)
>   plt.show()
>   ```
> - **Graph Analysis**: The output is an ROC curve plot. The red line shows the performance of the logistic regression model, and the legend displays the calculated AUC: `auc=0.9947...`.

---

## Page 17: F1 Score

- **Definition**: A metric combining Precision and Recall.
- **Formula**: `F1 = 2 / (Precision⁻¹ + Recall⁻¹) = 2TP / (2TP + FP + FN)`
- Bounded between 0 to 1.
- Higher the better.

---

## Page 18: Summary

- Evaluation protocol and metrics are equally important.
- Should be chosen based on data and application.
