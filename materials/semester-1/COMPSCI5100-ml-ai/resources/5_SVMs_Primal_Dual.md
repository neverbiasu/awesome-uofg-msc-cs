# Enriched Content: 5_SVMs_Primal_Dual.pdf

This document is a complete and detailed AI-friendly version of the presentation `5_SVMs_Primal_Dual.pdf` on the primal and dual formulations of SVMs. All visual content including text, graphs, diagrams, and formulas has been meticulously transcribed and described.

---

## Page 1-2: Title Slides

- **Course**: COMPSCI 5100 - ML & AI for Data Science
- **Topic**: SVMs: Primal and Dual
- **Author**: Dr. Tanaya Guha

---

## Page 3: Recap: SVM Primal Problem

- The goal of a hard-margin SVM is to solve the following constrained optimization problem:
- **Minimize**: `(1/2) * ||w||²`
- **Subject to**: `y_i(wᵀx_i + b) ≥ 1` for all `i=1, ..., N`.
- This is known as the **Primal** formulation.

---

## Page 4-7: Lagrange Multipliers

- A method for solving constrained optimization problems.
- **Goal**: Optimize a function `f(x)` subject to a constraint `g(x) = 0`.

> **Image Content Analysis (Page 5):**
> - **Description**: A diagram showing the geometric intuition behind Lagrange multipliers.
> - **Components**:
>   - The red curve represents the constraint surface `g(x) = 0`.
>   - At the optimal point `x*` on the constraint surface, the gradient of the function `∇f(x*)` must be parallel to the gradient of the constraint `∇g(x*)`.
>   - This means `∇f(x*) = -λ * ∇g(x*)` for some scalar `λ`.

- **The Lagrangian (Page 6)**: We introduce a Lagrange multiplier `λ` and define the Lagrangian function:
  - `L(x, λ) = f(x) - λg(x)`
- To find the optimal point, we find the stationary point of the Lagrangian by setting its partial derivatives to zero:
  - `∂L/∂x = 0`
  - `∂L/∂λ = 0` (which recovers the original constraint `g(x)=0`).

---

## Page 8-10: Primal and Dual problems

- The original problem is called the **Primal problem**.
- By using the Lagrangian, we can formulate a **Dual problem**.
- Often, the dual problem is easier to solve than the primal problem.
- For SVMs, the dual problem allows us to use the **kernel trick**.

---

## Page 11-15: SVM: The Dual Formulation

- **Step 1: Define the Lagrangian** for the SVM primal problem. We introduce non-negative Lagrange multipliers `α_i ≥ 0` for each constraint.
  - `L(w, b, α) = (1/2)wᵀw - Σ α_i [y_i(wᵀx_i + b) - 1]`

- **Step 2: Find the stationary points** by taking derivatives with respect to `w` and `b` and setting them to zero.
  - `∂L/∂w = 0`  =>  `w = Σ α_i * y_i * x_i`
  - `∂L/∂b = 0`  =>  `Σ α_i * y_i = 0`

- **Step 3: Substitute back into the Lagrangian**. After substituting the expressions for `w` and the condition on `α`, we get the **Dual Objective Function**, `L_D`:
  - `L_D(α) = Σ α_i - (1/2) * Σ_i Σ_j α_i * α_j * y_i * y_j * (x_iᵀx_j)`

- **The SVM Dual Problem (Page 15)**:
  - **Maximize**: `L_D(α)`
  - **Subject to**:
    - `α_i ≥ 0`
    - `Σ α_i * y_i = 0`

---

## Page 16-18: Karush-Kuhn-Tucker (KKT) Conditions

- For the solution of the dual problem to be valid, the KKT conditions must hold.
- For the SVM problem, these conditions are:
  1. `α_i ≥ 0` (The Lagrange multipliers are non-negative).
  2. `y_i(wᵀx_i + b) - 1 ≥ 0` (The primal constraints are satisfied).
  3. `α_i * [y_i(wᵀx_i + b) - 1] = 0` (The "complementary slackness" condition).

---

## Page 19: Support Vectors

- The KKT complementary slackness condition `α_i * [y_i(wᵀx_i + b) - 1] = 0` is key.
- It implies that:
  - If a data point `x_i` is **not** on the margin boundary (i.e., `y_i(wᵀx_i + b) - 1 > 0`), then its corresponding `α_i` must be **zero**.
  - If `α_i > 0`, then the data point `x_i` must lie **on** the margin boundary (i.e., `y_i(wᵀx_i + b) - 1 = 0`).
- These points for which `α_i > 0` are the **Support Vectors**.

---

## Page 20: Prediction using the Dual

- The weight vector is a linear combination of only the support vectors: `w = Σ_{i ∈ SV} α_i * y_i * x_i`.
- The decision function for a new point `x_new` is:
  - `y(x_new) = wᵀx_new + b = (Σ_{i ∈ SV} α_i * y_i * x_i)ᵀ * x_new + b`
  - `y(x_new) = Σ_{i ∈ SV} α_i * y_i * (x_iᵀx_new) + b`
- **Crucially**, the prediction only depends on the dot product between the new point and the support vectors.

---

## Page 21-22: Summary

- **Primal Problem**: Minimize `||w||²` in `d` dimensions. The number of parameters depends on the number of features.
- **Dual Problem**: Maximize `L(α)` in `N` dimensions. The number of parameters (`α_i`) depends on the number of training samples.
- The dual formulation allows us to use the **kernel trick** by replacing the dot product `x_iᵀx_j` with a kernel function `k(x_i, x_j)`.
