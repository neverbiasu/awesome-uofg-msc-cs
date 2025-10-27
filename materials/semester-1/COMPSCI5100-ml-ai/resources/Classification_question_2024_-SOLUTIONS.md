# Enriched Content: Classification_question_2024_-SOLUTIONS.pdf

This document is a complete and detailed AI-friendly version of the exam question `Classification_question_2024_-SOLUTIONS.pdf`. All questions, solutions, text, graphs, and formulas have been meticulously transcribed and described.

---

## Page 1: Classification Question (k-NN)

**a) Assume the following training data in the two-dimensional plane of X₁ and X₂ is available (Figure 1). The target variables for the points in the red and blue are +1 and -1. We summarise the data as the following tuples: <(2,0), 1>, <(0,2),-1>, <(0,-2),1>, and <(-2,0),1>, respectively.**

> **Image Content Analysis (Figure 1):**
> - **Overall Description**: A 2D scatter plot showing the training data for the classification problem.
> - **Structural Analysis**:
>   - **Type**: 2D Scatter Plot.
>   - **Axes**: X1 (horizontal) and X2 (vertical), with ticks from -3 to 3.
>   - **Data Points**: There are four data points plotted:
>     - **Class +1 (Red Circles)**: at coordinates (2, 0), (0, -2), and (-2, 0).
>     - **Class -1 (Blue Star)**: at coordinate (0, 2).

**i. Design a k-NN classifier with k=1 and use it to determine the class variables C₁ through C₄ for the following test data points: <(0,1), C₁>, <(1.5,1), C₂>, <(-0.5,1), C₃>, and <(0,0), C₄>:** [4 marks]

- **SOLUTION**: C_1 = -1, C_2 = 1, C_3 = -1, C_4=unknown

**ii. What would be the class variable C₄ above if we had used k=3?** [2 marks]

- **SOLUTION**: C_4 = 1

**iii. Write down the equations that specify the decision boundary between the two classes.** [4 marks]

- **SOLUTION**:
  - `X_1 - X_2 = 0` in `X_1 > 0.0` and `X_2 > 0.0` (2 marks)
  - `X_1 + X_2 = 0` in `X_2 > 0.0` and `X_1 < 0.0` (2 marks)

**b) In the same data set in Figure 1, we apply a linear SVM model with the predictor y(X₁,X₂) for classification.**

---

## Page 2: Classification Question (SVM)

**I. Which data points are the support vectors? Write down the equation for y(X₁,X₂).** (Hint: First visually assess the data to determine the decision boundary and the support vectors. Observe the constraints for the margin and SVM classifier.) [6 marks]

- **SOLUTION**:
  - **Support Vectors**: (2,0), (0,2), and (-2,0) (3 marks)
  - **Equation**: `y(X₁,X₂) = -X₂ + 1` (3 marks)

**II. Specify the Lagrange multipliers α₁, α₂, α₃, α₄ for each of the data points in the training data (2,0), (0,2), (-2,0), and (0,-2), respectively.** [4 marks]

- **SOLUTION**:
  - `α₁ = .25`, `α₂ = .5`, `α₃ = 0.25`, `α₄ = 0`
