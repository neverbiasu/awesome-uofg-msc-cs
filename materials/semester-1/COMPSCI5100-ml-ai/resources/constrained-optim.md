# Enriched Content: constrained-optim.pdf

This document is a complete and detailed AI-friendly version of the presentation `constrained-optim.pdf` on constrained optimization. All visual content including text, graphs, diagrams, and formulas has been meticulously transcribed and described.

---

## Page 1: Title Slide

- **Title**: Constrained optimization
- **Author**: Ali Gooya
- **Reference**: Christopher Bishop, PRML 2006, Appendix D

---

## Page 2: Equality constraints

- Consider a D dimensional variable `x = (x₁, x₂, ..., x_D)ᵀ`, we want to maximize `f(x)` with a constraint that `g(x) = 0`.
- We want to show that we need to maximize the **Lagrangian** given by: `L(x, λ) = f(x) + λg(x)` with `λ ≠ 0`.
- Note that `∇g(x)` is normal (perpendicular) to the constraint surface given by `g(x) = 0`.
- To see this consider `x_A` and `x_A + ε` both placed on the constraint surface.
- For very small `ε`, we can write: `g(x_A + ε) ≈ g(x_A) + εᵀ∇g(x_A)`. But since `g(x_A + ε) = g(x_A) = 0`, then `εᵀ∇g(x_A) = 0`, which means `∇g(x)` is normal to the constraint surface.

---

## Page 3: Equality constraints (Continued)

- Next, we seek a point `x*` on the constraint surface such that `f(x*)` is maximized.
- Such a point must have the property that the vector `∇f(x)` is also orthogonal to the constraint surface, as illustrated below. Otherwise, we could increase the value of `f(x)` by moving a short distance along the constraint surface.
- Thus: `∇f(x*) + λ∇g(x*) = 0`.
- This suggests that we need to consider the gradient of the Lagrangian: `L(λ) = f(x) + λg(x)` with `λ ≠ 0`.

> **Image Content Analysis:**
> - **Description**: A diagram illustrating the condition for a constrained maximum.
> - **Components**:
>   - A red closed curve represents the constraint surface `g(x) = 0`.
>   - At a point `x_A` on the surface, the vector `∇g(x)` is shown pointing outwards, normal to the surface.
>   - For `x_A` to be a maximum, the gradient of the function, `∇f(x)`, must also be normal to the surface. It is shown as a vector pointing in the opposite direction to `∇g(x)`.
> - **Interpretation**: At a constrained maximum, the gradients of the function and the constraint must be parallel.

---

## Page 4: Example

- A simple example of the use of Lagrange multipliers in which the aim is to maximize `f(x₁, x₂) = 1 - x₁² - x₂²` subject to the constraint `g(x₁, x₂) = x₁ + x₂ - 1 = 0`.

> **Image Content Analysis:**
> - **Description**: A plot showing the solution to the example problem.
> - **Components**:
>   - **Function Contours**: Blue concentric circles represent the contour lines of the function `f(x₁, x₂)`. The function's unconstrained maximum is at the center (0,0).
>   - **Constraint Line**: A red diagonal line represents the constraint `g(x₁, x₂) = 0`.
>   - **Solution**: The solution `(x₁*, x₂*)` is the point where the constraint line is tangent to one of the function's contour circles. This is the point on the line that has the highest function value.

- **Lagrangian**: `L(x, λ) = 1 - x₁² - x₂² + λ(x₁ + x₂ - 1)`
- **Derivatives**:
  - `-2x₁ + λ = 0`
  - `-2x₂ + λ = 0`
  - `x₁ + x₂ - 1 = 0`

---

## Page 5: Inequality constraints

- Now consider maximising `f(x)` under the constraint `g(x) ≥ 0`.
- If a stationary point `x_B` lies in the region where `g(x_B) > 0`, the constraint is **inactive**.
- If it lies on the boundary `g(x) = 0`, the constraint is said to be **active**.

> **Image Content Analysis:**
> - **Description**: A diagram showing the regions for active and inactive inequality constraints.
> - **Components**: The area inside the red curve is the region `g(x) > 0`. The curve itself is `g(x) = 0`. A point `x_B` inside the region has an inactive constraint. A point `x_A` on the boundary has an active constraint.

- **Inactive constraint**: `g(x)` plays no role, `∇f = 0`. This corresponds to a stationary point of `L(x, λ) = f(x) + λg(x)` with `λ = 0`.
- **Active constraint**: `g(x) = 0`, similar to an equality constraint. `L(x, λ) = f(x) + λg(x)` with `λ ≠ 0`. But the sign of `λ` is important and we should have `λ > 0`. Otherwise we could increase `f` by moving inside the region, which is contradictory.

---

## Page 6: Karush-Kuhn-Tucker (KKT) conditions (I)

- Thus, in either case, the solution to the problem of maximizing `f(x)` subject to `g(x) ≥ 0` is obtained by optimizing the Lagrange function `L(x, λ) = f(x) + λg(x)` with respect to `x` and `λ` subject to the conditions:
  - `g(x) ≥ 0`
  - `λ ≥ 0`
  - `λg(x) = 0` (This is the slackness condition)

- If we **minimize** the function `f(x)` subject to `g(x) ≤ 0` then:
  - `L(x, λ) = f(x) + λg(x)`
  - **KKT conditions**:
    - `g(x) ≤ 0`
    - `λ ≥ 0`
    - `λg(x) = 0`

---

## Page 7: Primal and dual problems

- So to maximize `f(x)`, we look for stationary points (`x*` and `λ*`) of the Lagrangian `L(x, λ) = f(x) + λg(x)`.
- Maximization of the Lagrangian w.r.t. `x` is the **primal** problem, whereas the minimization of the reduced Lagrangian, `d(λ)`, is the **dual** (always convex) problem.
  - `x* = argmax_x L(x, λ)`
  - `d(λ) = L(x*, λ)`
  - `λ* = argmin_λ d(λ)`

---

## Page 8: Karush-Kuhn-Tucker (KKT) conditions (II)

- This extends the technique to multiple equality and inequality constraints.
- Suppose we wish to maximize `f(x)` subject to `g_j(x) = 0` for `j=1,...,J` and `h_k(x) ≥ 0` for `k=1,...,K`.
- We introduce Lagrange multipliers `{λ_j}` and `{μ_k}` and optimize the Lagrangian function:
  - `L(x, {λ_j}, {μ_k}) = f(x) + Σ_j λ_j*g_j(x) + Σ_k μ_k*h_k(x)`
- Subject to:
  - `μ_k ≥ 0`
  - `μ_k*h_k(x) = 0` for `k=1,...,K`.
