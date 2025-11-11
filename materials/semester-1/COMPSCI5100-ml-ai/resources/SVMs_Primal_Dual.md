# SVMs: Primal and Dual Formulation

This document outlines the primal and dual formulations of Support Vector Machines (SVMs).

## The Primal Problem

The objective of an SVM is to find the hyperplane that maximizes the margin between two classes. This can be formulated as a constrained optimization problem.

### Objective Function

We want to maximize the margin, which is $$2/||w||$$. This is equivalent to minimizing $$||w||^2 / 2$$.

So, the objective is:
```math
min_{w, b} \frac{1}{2} ||w||^2
```

### Constraints

For all data points $$(x_i, y_i)$$, they must be correctly classified and lie outside the margin. This gives us the constraint:

```math
y_i(w^T x_i + b) \ge 1, \quad \forall i=1, \dots, N
```

Where:
-   $$w$$ is the normal vector to the hyperplane.
-   $$b$$ is the bias term.
-   $$y_i$$ is the class label of data point $$x_i$$ ($$+1$$ or $$-1$$).

This is the **primal formulation** of the hard-margin SVM.

---

## The Dual Problem

To solve the primal problem, we can introduce Lagrange multipliers and formulate the dual problem. This is often easier to solve and reveals important properties of SVMs.

### Lagrangian Formulation

We introduce Lagrange multipliers $$α_i \ge 0$$ for each constraint. The Lagrangian function is:

```math
L(w, b, \alpha) = \frac{1}{2} ||w||^2 - \sum_{i=1}^{N} \alpha_i [y_i(w^T x_i + b) - 1]
```

To find the minimum, we take the partial derivatives of $$L$$ with respect to $$w$$ and $$b$$ and set them to zero.

#### Derivative with respect to w:
```math
\frac{\partial L}{\partial w} = w - \sum_{i=1}^{N} \alpha_i y_i x_i = 0 \implies w = \sum_{i=1}^{N} \alpha_i y_i x_i
```

#### Derivative with respect to b:
```math
\frac{\partial L}{\partial b} = - \sum_{i=1}^{N} \alpha_i y_i = 0 \implies \sum_{i=1}^{N} \alpha_i y_i = 0
```

### The Dual Objective Function

Substituting these back into the Lagrangian, we get the dual objective function, which we want to maximize with respect to $$α$$:

```math
max_{\alpha} \sum_{i=1}^{N} \alpha_i - \frac{1}{2} \sum_{i=1}^{N} \sum_{j=1}^{N} \alpha_i \alpha_j y_i y_j (x_i^T x_j)
```

### Dual Constraints

The constraints for the dual problem are:
1.  $$ \alpha_i \ge 0, \quad \forall i=1, \dots, N $$
2.  $$ \sum_{i=1}^{N} \alpha_i y_i = 0 $$

### Support Vectors

The solution to the dual problem gives us the values of $$α_i$$. The data points $$x_i$$ for which $$α_i > 0$$ are called **support vectors**. These are the points that lie on the margin and are critical for defining the hyperplane. The vector $$w$$ is a linear combination of only these support vectors.

---
*This content was extracted from `SVMs_Primal_Dual.pdf` and has been formatted for clarity.*
