# Enriched Content: SVM_Example.pdf

This document is a complete transcription of the handwritten example in `SVM_Example.pdf`, which details the calculation of a linear SVM decision boundary.

---

## SVM Worked Example

### 1. Problem Setup

> **Diagram Analysis:**
> - **Description**: A 2D plot showing three training data points and a proposed linear separator.
> - **Axes**: `p1` (horizontal) and `p2` (vertical).
> - **Data Points**:
>   - `a₁`: coordinate `<(0,2)>`, class label `1`
>   - `a₂`: coordinate `<(2,0)>`, class label `-1`
>   - `a₃`: coordinate `<(4,0)>`, class label `-1`
> - **Support Vectors**: The points `a₁` and `a₂` are circled, indicating they are the support vectors that define the margin.
> - **Decision Boundary**: A line `y=0` is shown separating the points.

- **Model**: `y(p₁, p₂) = w₁p₁ + w₂p₂ + w₀ = wᵀp + w₀`
- **Feature Vectors**: `x_n = [p₁, p₂]ᵀ`
- **Weight Vector**: `w = [w₁, w₂]ᵀ`

---

## 2. Derivations

### Using Margin Constraints

For the support vectors, the margin constraints must be met exactly:
- For `a₁` (`y=1`): `wᵀx₁ + w₀ = 1` => `w₁*0 + w₂*2 + w₀ = 1` => `2w₂ + w₀ = 1`
- For `a₂` (`y=-1`): `wᵀx₂ + w₀ = -1` => `w₁*2 + w₂*0 + w₀ = -1` => `2w₁ + w₀ = -1`

*(Note: The handwritten solution has a sign error in the second equation, it should be `2w₁ + w₀ = -1`)*

### Using Dual Formulation

The weight vector `w` can be expressed in terms of the Lagrange multipliers `α` and the support vectors:

`w = Σ_{n=1 to 3} α_n * t_n * x_n`

Since `a₃` is not a support vector, its `α₃` is 0. So the sum is over `n=1, 2`.

`[w₁, w₂]ᵀ = α₁*t₁*x₁ + α₂*t₂*x₂`

`[w₁, w₂]ᵀ = α₁*(1)*[0, 2]ᵀ + α₂*(-1)*[2, 0]ᵀ`

`[w₁, w₂]ᵀ = [0, 2α₁]ᵀ - [2α₂, 0]ᵀ = [-2α₂, 2α₁]ᵀ`

This gives us:
- `w₁ = -2α₂`
- `w₂ = 2α₁`

An additional constraint from the KKT conditions is `Σ α_n * t_n = 0`, which means `α₁*t₁ + α₂*t₂ = 0` => `α₁*(1) + α₂*(-1) = 0` => `α₁ = α₂`.

### Solving for Parameters

Substitute `w₁` and `w₂` back into the margin constraint equations:

1. `2(2α₁) + w₀ = 1` => `4α₁ + w₀ = 1`
2. `2(-2α₂) + w₀ = -1` => `-4α₂ + w₀ = -1`

Since `α₁ = α₂`, we can solve this system:
- `4α₁ + w₀ = 1`
- `-4α₁ + w₀ = -1`

Adding the two equations gives `2w₀ = 0` => `w₀ = 0`.
Substituting `w₀=0` back gives `4α₁ = 1` => `α₁ = 1/4`.

Therefore:
- `α₁ = 1/4`
- `α₂ = 1/4`
- `w₀ = 0`
- `w₁ = -2α₂ = -2(1/4) = -1/2`
- `w₂ = 2α₁ = 2(1/4) = 1/2`

---

## 3. Final Solution

- **Decision Boundary**: `y(p₁, p₂) = -½ * p₁ + ½ * p₂`
- **Margin**: `Margin = 1 / ||w|| = 1 / sqrt((-½)² + (½)²) = 1 / sqrt(1/4 + 1/4) = 1 / sqrt(1/2) = sqrt(2)`
