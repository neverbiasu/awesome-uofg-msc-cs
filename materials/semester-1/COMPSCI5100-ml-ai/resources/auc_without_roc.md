# Enriched Content: auc_without_roc.pdf

This document is a complete transcription of the presentation `auc_without_roc.pdf`, which explains how to calculate AUC without plotting an ROC curve.

---

## Page 1: Title Slide

- **Title**: Calculate AUC without ROC
- **Author**: Ke Yuan

---

## Page 2: Definition

- Calculate AUC directly from tested instances without drawing an ROC curve.

- **Definition**:
  - AUC is the probability that a randomly selected positive example will have a higher probability than a randomly selected negative one.

---

## Page 3: Formula

- **N_p**: number of positive instances
- **N_n**: number of negative instances
- **y₁, ..., y_Np**: score for the positive instances
- **x₁, ..., x_Nn**: score for the negative instances

**AUC Formula:**

`AUC = (1 / (N_p * N_n)) * Σ_{i=1 to N_p} Σ_{j=1 to N_n} δ(y_i > x_j)`

Where `δ(y_i > x_j)` is an indicator function that is 1 if the score of the positive instance `y_i` is greater than the score of the negative instance `x_j`, and 0 otherwise.

---

## Page 4: Example

### Classifier 1

| Instance | Score | True Class |
| :--- | :--- | :--- |
| 1 | 1.0 | + |
| 2 | 0.7 | + |
| 3 | 0.6 | + |
| 4 | 0.5 | - |
| 5 | 0.4 | - |
| 6 | 0.0 | - |

- **Positive Scores**: {1.0, 0.7, 0.6}
- **Negative Scores**: {0.5, 0.4, 0.0}
- **Calculation**: For each positive score, count how many negative scores it is greater than.
  - 1.0 is greater than 3 negative scores.
  - 0.7 is greater than 3 negative scores.
  - 0.6 is greater than 3 negative scores.
- **AUC Calculation**: `AUC = (1 / (3 * 3)) * (3 + 3 + 3) = 9 / 9 = 1.0`

### Classifier 2

| Instance | Score | True Class |
| :--- | :--- | :--- |
| 1 | 1.0 | + |
| 2 | 0.9 | + |
| 3 | 0.6 | - |
| 4 | 0.5 | + |
| 5 | 0.2 | - |
| 6 | 0.0 | - |

- **Positive Scores**: {1.0, 0.9, 0.5}
- **Negative Scores**: {0.6, 0.2, 0.0}
- **Calculation**:
  - 1.0 is greater than 3 negative scores.
  - 0.9 is greater than 3 negative scores.
  - 0.5 is greater than 2 negative scores (0.2, 0.0).
- **AUC Calculation**: `AUC = (1 / (3 * 3)) * (3 + 3 + 2) = 8 / 9`
