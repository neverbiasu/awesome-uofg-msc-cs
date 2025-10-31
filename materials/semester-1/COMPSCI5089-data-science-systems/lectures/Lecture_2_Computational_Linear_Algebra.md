# Lecture 2: Computational Linear Algebra

## Recap of the last lecture

**Vectors**
- **scalar multiplication** so that `ax` is defined for any scalar `a`. For real vectors, `ax = [ax₁, ax₂, ..., axn]`, elementwise scaling.
- **vector addition** so that `x + y` vectors `x, y` of equal dimension. For real vectors, `x + y = [x₁ + y₁, x₂ + y₂, ... xd + yd]` the elementwise sum
- A **norm** `||x||` which allows the **length** of vectors to be measured.
- An **inner product** `<x | y>`, `(x,y)` or `x·y` which allows the **angles** of two vectors to be compared. The inner product of two orthogonal vectors is 0. For real vectors `x·y = x₁y₁ + x₂y₂ + x₃y₃ ... xdyd`

**Operations with matrices**
- They can be **added** and **subtracted** `C = A + B`
- They can be **scaled** with a scalar `C = sA`
- They can be **transposed** `B = Aᵀ`; this exchanges rows and columns
- They can be **applied** to vectors `y = Ax`; this applies a matrix to a vector. (linear maps)
- They can be **multiplied** together `C = AB`; this composes the effect of two matrices (composed maps)

**Matrices and linear operators**
- Matrices are 2D arrays of reals that define **linear maps**;
- Vectors represent “points in space"
- Matrices represent *operations* that do things to those points in space.
- The *operations* represented by matrices are a particular class of **functions** on **vectors**

## Intended Learning Outcomes

- How discrete problems can be modelled using continuous mathematics, i.e. Using matrices
  - How graphs can be represented as matrices
  - How flows on graphs can be represented as matrix operations
- What eigenvectors and eigenvalues are
  - How the power iteration method can compute them
  - How they can be used to decompose matrices
- What the trace and determinant are, and the geometric intuition underlying them
- What positive (semi-)definiteness means and why it is important
- What the singular value decomposition (SVD) is and how it can be used to compute functions of matrices
- What a linear system of equations is and how it can be represented by a matrix
  - What matrix inversion is and how it relates to solving linear systems of equations
  - The numerical problems with direct inversion
  - What the pseudo-inverse is, how it is derived from the SVD, and how it can be used
- How to normalise data by using matrix operations to "whiten" it

## Graphs as matrices

- **Example**: distributing packages
- **Task**: the packages and the connectivity between distributions centres
- **Target**: to predict which warehouses are going to receive lots of packages

How can this problem be modelled?

- **Linear assumption**: the flow from site to site is linear -- that is the packages arriving at one site is a weighted sum of the packages currently at each of the other sites
- We might model the connectivity of distribution centres as a **graph**. A **directed graph** connects **vertices** by **edges**. The definition of a graph is G=(V,E), where V is a set of vertices and E is a set of edges connecting pairs of vertices.
- We can write this as an **adjacency matrix**. We label each vertex 0,1,2,3,...
- We then create a square matrix A whose elements are all zero, except where there is an edge from Vi to Vj, in which case we set Aij=1.

### Computing graph properties

- The **out-degree** of each vertex (number of edges leaving a vertex) is the sum of each row.
- The **in-degree** of each vertex (number of edges entering a vertex) is the sum of each column.
- If the matrix is **symmetric**, it represents an undirected graph; this is the case if it is equal to its transpose.
- A directed graph can be converted to an undirected graph by computing A’=A+Aᵀ. This is equivalent to making all the arrows bi-directional.
- If there are non-zero elements on the diagonal, that means there are edges connecting vertices to themselves (self-transitions).

### Edge-weighted graphs

- If the some of the connections between distribution centres are stronger than others, e.g. if they are connected by bigger roads, we can model this using edge weights. Now the entry at Aij represents the weight of the connection from vertex Vi to Vj.

### Graphs as representing flows of "mass" through a network of vertices.

- If the total flow out of a vertex is >1, i.e. its row sums to >1, then it is a **source** of mass; for example it is *manufacturing* things.
- If the total flow out of a vertex is <1, i.e. its row sums to <1, then it is a **sink**; for example it is *consuming* things.
- If the total flow out of the vertex is 1 exactly, i.e. its row sums to 1 exactly, then it conserves mass; it only ever *re-routes* things.

## Flow analysis: using matrices to model discrete problems

- **Adjacency matrix A** with edges being the weights of the connection between sites
- **Linear assumption**: the packages arriving at one site is a weighted sum of the packages currently at each of the other sites
- At any point in time, we can write down the proportion of packages at each depot as a vector xt ∈ R^V, where V is the number of vertices in the graph (number of depots), e.g.
  `xt = [0.05 0.15 0.30 0.20 0.03 0.12 0.08 0.07]`
- **Vectors, Matrices and linear maps**
- The flow of packages (per day) between depots is a linear map R^V → R^V. This is represented by the adjacency matrix A ∈ R^(V×V) (a square matrix).
- This allows us to analyse an apparently *discrete* problem (connectivity of graphs) with tools from *continuous* mathematics (vectors and matrices).
  - e.g. from today to tomorrow
- The advantage of vectorised operations is that they can be accelerated using hardware such as a GPU
- Suppose we start with an *initial distribution* of packages: a vector `xt=0`.
  - `xt=1 = xt=0 A = Aᵀxt=0ᵀ`

### Other Important questions

There are some harder questions we can ask:
- What about in a week's time? What will xt=7 be?
- What about in *one hour*’s time (i.e. a 24th of a day)? What will be xt=1/24be?
- What about at time infinity xt=∞? What is the long term behaviour? Will the system reach a steady state (an *equilibrium*)? Or will it oscillate forever?
- What about if we wanted to go backwards in time? If we know xt=0, can we predict yesterday xt=-1?

We will solve these problems today, using some new operations that we can do with *certain kinds* of matrices:

## New matrix operations

- Matrices can be **exponentiated**: C=Aⁿ; this "repeats" the effect of matrix (e.g. C=AAAA)
- Matrices can be **inverted**: C=A⁻¹; this undoes the effect of a matrix
- We can find **eigenvalues**: Ax=λx; this identifies specific vectors x that are only scaled by a factor λ (not rotated) when transformed by matrix A.
- Matrices can be **factorised**: A=UΣVᵀ; any matrix can expressed as the product of three other matrices with special forms.
- We can measure some properties of A numerically, including the **determinant**, **trace** and **condition number**.

## Matrix powers (exponentiation)

- We can now define A² = AA, A³ = AAA, A⁴ = AAAA, etc
- These are the **powers** of a matrix, and are only defined for square matrices
  - Otherwise, we’d change the dimensions after the first step and be unable to reapply the same matrix
- **Package distribution**: What about in a week’s time? What will xt=7 be?
  - We can simply apply the matrix seven times; raising it to the power of 7.

## Eigenvalues and eigenvectors

- A matrix represents a special kind of function: a **linear transform**; an operation that performs **rotation** and **scaling** on vectors.
- However, there are certain vectors which don’t get rotated when multiplied by the matrix.
  - They only get scaled (stretched or compressed).
  - These vectors are called **eigenvectors**, and they can be thought of as the “fundamental” or “characteristic” vectors of the matrix.
  - The scaling factors that the matrix applies to its eigenvectors are called **eigenvalues**.
- We can visualise the effect of a matrix transformation by imagining a parallelepiped (whose edges are vectors) being rotated, stretched and compressed.
- If the edges of the parallelelpiped are the **eigenvectors** of the matrix, the parallelepiped will **only** be stretched or compressed, **not** rotated.
- If the eigenvalue is greater than 1, the eigenvector is **stretched**. If it’s between 0 and 1, it’s **shrunk**.
- If the edges of this parallelepiped have **unit length**, then after the transformation their **lengths** will be equal to the **eigenvalues**.

### How to find the leading eigenvector: the power iteration method

- "All roads lead to Rome", illustrates how to find one of the eigenvectors of a matrix.
- We simply apply the matrix repeatedly to a random initial vector and wait until the result converges to a steady state.
  - xn = AAAA . . . AAx₀ = Aⁿx₀
- this will generally either **explode** in value or **collapse to zero**. However, we can fix the problem by **normalising** the resulting vector after each application of the matrix:
  - xn = Axn-1 / ||Axn-1||∞
- This process is called **power iteration**.
- Regardless of which vector x₀ we start with (the vector above is chosen randomly), the power iteration method always approaches a fixed vector (though possibly with sign flips).
  - This is true for almost every square matrix.
  - The vector that results from power iteration is known as the **leading eigenvector**.
- It satisfies the definition of an eigenvector because the matrix A performs only scaling on this vector (no rotation).
  - The scaling effect is eliminated by the normalisation step in the power iteration, but any other effects pass through
  - We can write the scaling effect of the A on an eigenvector x as follows: Ax=λx where λ is the eigenvalue.

### Computing eigenvectors and eigenvalues with Numpy

- The power iteration method enables us to calculate the leading eigenvector and eigenvalue, but if we want to know **all** the (linearlly independent) eigenvectors and eigenvalues of a matrix, we can use `np.linalg.eig`:
- For very large matrices, if you just want to compute the leading eigenvector, power iteration is much faster than using `np.linalg.eig`.

### Eigenvectors and eigenvalues

- Consider a vector function **f(x)**. There may exist vectors such that **f(x)=λx**. The function maps these vectors to scaled versions of themselves. No rotation or skewing is applied, just pure scaling.
- Any square matrix **A** represents a function **f(x)** and may have vectors like this, such that A**x**ᵢ=λᵢ**x**ᵢ
- Each vector **x**ᵢ satisfying this equation is known as an **eigenvector** and each corresponding factor λᵢ is known as an **eigenvalue**.
  - For any matrix, the **eigenvalues** are uniquely determined, but the eigenvectors are not.
  - The eigenvectors are **orthogonal**, i.e. the dot product of any pair of eigenvectors is zero.
  - They define a new **coordinate system** (or basis) in which the transformation A becomes diagonal — meaning it **only stretches or compresses** along those axes.

### Compute Eigenvectors and Eigenvalues Analytically

1. Start with the definition: **Av = λv**
2. Rearrange it: **Av – λv = 0 → Av – λIv = 0 → (A – λI)v = 0**
   - Since **v** must be non-zero, it follows that **A – λI** must be *singular*
   - Therefore that det(A – λI) = 0
   - The roots of this equation will give us the eigenvalues λ₁, λ₂, ...
   - Substitute each calculated eigenvalue back into the system and solve by row reduction (or otherwise): **(A – λᵢI)vᵢ = 0**
     - This system will have infinitely many solutions – it’s singular after all
3. The solution will form an eigenplane (or eigenline) any non-zero vector on this is an eigenvector.
   - For simplicity, we often normalise the eigenvectors (→ unit length)

## Eigenproblems

- **Eigenproblems** are problems that can be tackled using eigenvalues and eigenvectors.
- E.g. Revisiting the package distribution problem
  - What about at time infinity xt=∞? What is the long term behaviour? Will the system reach a steady state (an **equilibrium**)? Or will it oscillate forever?

## Principal Component Analysis (PCA) - analysing data with linear matrices

- **Mean vector**: The mean vector is the **geometric centroid** of a set of vectors and can be thought of as capturing "centre of mass" of those vectors.
- **Covariance matrix**: measures the spread of a dataset.

### Process:
1. Standardise the data (mean = 0, standard deviation = 1). (Optional, but recommended)
2. Compute the covariance matrix.
3. Perform eigendecomposition on the covariance matrix.
4. Sort eigenvalues in descending order and choose the **top k** eigenvectors, where k is the number of dimensions you want to keep.
5. Transform the original data using these k eigenvectors to get the principal components.

- The eigenvectors of the covariance matrix are called the **principal components**
  - They tell us the directions in which the data varies most
- This is an **incredibly useful** thing to be able to do, particularly with high-dimensional data sets where the variables may be correlated in complicated ways.

### Eigendecomposition of the covariance matrix into its eigenvectors and eigenvalues

- We are now interested in reconstruct the covariance matrix using its eigenvectors and eigenvalues.
  - Σ = QΛQᵀ
- where Q is a matrix of unit eigenvectors xᵢ (same as the output np.linalg.eig) and Λ is a diagonal matrix of eigenvalues (λᵢ on the diagonal, zero elsewhere).

### Eigendecomposition vs PCA

- **Eigendecomposition** is the factorisation of a matrix into its eigenvalues and eigenvectors. Specifically, for a square matrix.
  - decompose a matrix into its constituent eigenvalues and eigenvectors.
  - a *general matrix decomposition method*
- **PCA** is a statistical procedure that uses eigendecomposition (or singular value decomposition) to convert correlated features (**covariance matrix**) into a set of linearly uncorrelated features called principal components.
  - a *data analysis technique*
  - dimensionality reduction
  - noise reduction and data visualisation.
  - discover which dimensions (features) capture the most variance in the data.

### Uses of eigendecomposition

- **Matrix decomposition** (e.g. PCA) is an **essential** tool in data analysis.
  - Recommenders, image compression, visualisation etc.
- **Spectral Clustering**: Used for graph-based clustering.
  - The graph Laplacian matrix's eigenvectors are used to cluster data points
- **PageRank Algorithm**: Used by Google's search engine to rank web pages.
  - Relies on finding the eigenvector corresponding to the largest eigenvalue of the modified adjacency matrix of the web graph.
- **Latent Semantic Analysis (LSA)**: A text mining technique for topic modeling and dimensionality reduction.
  - Uses singular value decomposition (a generalization of eigendecomposition) of the term-document matrix to capture latent topics.

### Matrix Properties related to Eigendecomposition

- **Trace**: The trace of a square matrix can be computed from the sum of its diagonal values:
  - Tr(A) = a₁,₁ + a₂,₂ + . . . + an,n
  - The sum of the variances (for a covariance matrix) in the original basis → *total variance*
  - It is also equal to the sum of the eigenvalues of **A**
- **Determinant**: is equal to the product of the eigenvalues of the matrix.
  - det(A) = Π λᵢ
  - It measures how much the space expands or contracts after the linear transform. (the **volume** of the parallelepiped formed by the transformed basis vectors)
  - If any eigenvalue is 0, det(A)=0.
    - the transformation is **non-invertible / singular**
    - Dimension has collapsed → information has been lost.

### Definite and semi-definite matrices

A matrix is called
- **positive definite** if all of its eigenvalues are greater than zero: λᵢ>0.
- **positive semi-definite** if all of its eigenvalues are greater than or equal to zero: λᵢ≥0.
- **negative definite** if all of the eigenvalues are less than zero: λᵢ <0,
- **negative semi-definite** if all the eigenvalues are less than or equal to zero: λᵢ≤0.

- A covariance matrix is **symmetric**, and its entries are based on the variances and covariances of the variables in a dataset.
  - By its definition, the covariance matrix is **positive semi-definite**.

## Summary of Eigenproblems

- Eigenvalues and eigenvectors are generally defined for square matrices **A**.
- A matrix **A** transforms a general vector by rotating and scaling it. However, the eigenvectors of **A** are special because they lie on a line that can only be scaled, not rotated by the transform.
- The eigenvalues of **A** are the **scaling factors** λᵢ that correspond to each eigenvector **x**ᵢ.
- Eigenvectors and eigenvalues **can be computed algorithmically** (e.g., by the power iteration algorithm for finding the leading eigenvector).
- **Eigendecomposition** is the factorisation of a square matrix A into three component matrices: A = VDV⁻¹ - it reveals the intrinsic structure and scaling of the matrix.
- The **eigenspectrum** is the set of all eigenvalues of the matrix. In PCA, we sort the absolute eigenvalues in descending order to determine component importance.
- If we have a **complete set of eigenvectors and eigenvalues, we can reconstruct the matrix**.
- We can **approximate a large matrix A with a few leading eigenvectors**; this is a simplified or truncated approximation to the original matrix.
- If we repeatedly apply a matrix A to an arbitrary vector x, the resulting vector will **eventually align with the direction of the principal (largest) eigenvector**.

## Matrix Inversion

Four basic algebraic operations on matrices:
- scalar multiplication cA;
- matrix addition A+B;
- matrix multiplication BA
- matrix transposition Aᵀ

A further important operation: **inversion** A⁻¹, defined such that A⁻¹A=I:
- A⁻¹(Ax)=x,
- (A⁻¹)⁻¹=A
- (AB)⁻¹=B⁻¹A⁻¹

Inversion is only defined for certain kinds of matrices: **Square Matrices, Non-singular Matrices**

### Computing the inverse of a matrix

- **Gauss-Jordan elimination method** – row reduction – a standard algorithm
  - not computationally efficient for large matrices.
- Instead, we often use the workhorse of matrix decompositions: the **singular value decomposition**, which we will discuss later.
- In the meantime, we can use the NumPy method `np.linalg.inv`, as shown below:

### Inversion as "undo"

- Inversion of a matrix creates a new linear operator which reverses the original operation.

### BUT only square matrices can be inverted !

- Inversion is only defined for square matrices, representing a linear transform Rⁿ→Rⁿ.
- For the inverse to exist, the determinant of the matrix must be non-zero:
  - det(A)≠0.
- Why?
  - Every output vector must come from one, and only one, input vector (a one-to-one mapping).
  - If det(A)=0 (a singular matrix), the transformation has collapsed at least one dimension.
  - This means that different input vectors map to the same output vector.
  - You can’t reverse the process because you don’t know which input vector to return to!

### Singular and non-singular matrices

- A matrix with det(A)=0 is called **singular** and has no inverse.
- A matrix which is invertible is called **non-singular**.

**Geometric intuition**
- One of the dimensions of the parallelepiped has been squashed to nothing at all.
- It is impossible to reverse the transformation, because information was lost in the forward transform.

## Revisiting the package distribution problems

**Problem: “predicting" the past with inversion**
- We can use **inversion** to solve the problem of predicting the distribution at xt=-1 given xt=0.
  - xt=-1 = A⁻¹xt=0
- We can compute any negative power of the matrix to "undo" any number of steps:
  - A⁻ᵏ = A⁻¹A⁻¹A⁻¹ . . . A⁻¹ (k repetitions)

## Linear systems

- Imagine a system where there is an input, **x**, and an output, **y**.
  - f(x) = Ax = y
- This is a **linear system** or **linear system of equations**
- Task: Given **y**, “predicting” the past **x**

### Solving linear systems

- The solution of linear systems is apparently simple for cases where **A** is **square**.
- If **Ax=y**, then left-multiplying both sides by **A⁻¹** we get
  - A⁻¹Ax = A⁻¹y
  - Ix = A⁻¹y
  - x = A⁻¹y
- This only works for square matrices, as A⁻¹ is not defined for non-square matrices. This means that **x** and **y** must have the same number of dimensions.

### Solving Linear Systems (Row-Reduction)

- Reduce the *augmented matrix* into *reduced row-echelon form* (RREF)
- We accomplish this by elementary row operations:
  - Swap two rows
  - Multiply a row by a non-zero scalar
  - Add/subtract a multiple of one row to another row
- **Steps**:
  - Use row operations to create leading 1s – pivots
  - Initially create zeros below them, moving downwards
  - Create zeros above them, moving upwards

### How to Find the Rank of a Matrix

- Rank is effectively the number of pivots (leading 1s) in the REF of a matrix; equivalently, **the number of non-zero rows** in the REF.
  - (No need to reach a RREF.)
- We don’t need to use the augmented matrix here – equivalent to centering the lines (or planes)
- A square matrix A ∈ R^(n×n) is **non-singular** (invertible) if rank(A) = n
- If A is singular (non-invertible), i.e. if rank(A) < n, it follows that det(A) = 0

## Approximate solutions for linear systems

- In practice, linear systems are almost never solved with a direct inversion.
  - Inversion is O(N³)
  - *Nonsquare* in nature
- Instead, linear systems are typically solved iteratively, either using specialised algorithms based on knowledge of the structure of the system, or using **optimisation**, which will be the topic of the next Unit (lecture 4).
  - E.g., to find solutions that minimise ||Ax-y||₂ by adjusting the value of x repeatedly.

## Singular Value Decomposition (SVD)

- Eigendecompositions only apply to **diagonalisable** matrices; which are a subset of **square matrices**.
- There are many problems which have **non-square** matrices which we would like to be able to decompose.
- The **singular value decomposition (SVD)** is a general approach to decomposing **ANY** matrix *A*. It is the powerhouse of computational linear algebra.
- The SVD produces a decomposition which splits **ANY** matrix up into three matrices:
  - A=UΣVᵀ

- where
  - **A** is any m×n matrix,
  - **U** is a square **unitary** m×m matrix, whose columns contain the **left singular vectors**,
  - **V** is an square **unitary** n×n matrix, whose columns contain the **right singular vectors**,
  - **Σ** is a diagonal m×n matrix, whose diagonal contains the **singular values**.
- If **A** is real, then **U** and **V** will be **orthogonal** matrices (Uᵀ=U⁻¹), whose rows all have unit norm and whose columns also all have unit norm.

### Eigendecomposition vs SVD

- **Eigendecomposition**: Can only be applied to square matrices.
- **SVD**: Can be applied to **ANY** matrix (square or rectangular).
- If **A** is a symmetric positive semi-definite matrix (**like a covariance matrix**), then the eigendecomposition and SVD give related results.

**The SVD is the same as:**
- taking the eigenvectors of AᵀA to get **U**
  - NB: AᵀA is a symmetric matrix
- taking the square root of the *absolute* value of the eigenvalues λᵢ of AᵀA to get Σᵢ = √|λᵢ|
- taking the eigenvectors of AAᵀ to get **V**ᵀ

### SVD decomposes any matrix into three matrices with special forms

- The SVD produces a decomposition which splits **ANY** matrix up into three matrices:
  - A=UΣVᵀ
- Special forms of matrices, like orthogonal matrices and diagonal matrices, are much easier to work with than general matrices. This is the power of the SVD.
  - **U** is orthogonal, so is a pure rotation matrix,
  - **Σ** is diagonal, so is a pure scaling matrix,
  - **V** is orthogonal, so is a pure rotation matrix.

### Using the SVD

- **Fractional powers**: We can use the SVD to compute interesting matrix functions like the square root of a matrix A¹/².
- **Invert a matrix**: A⁻¹, which will "undo" the operation.
- The rule is simple: to do any of these operations, ignore U and V (which are just rotations), and apply the function to the singular values elementwise:
  - Aⁿ = VΣⁿUᵀ

### Inversion - relation to SVD

- Invert a matrix: A⁻¹, which will "undo" the operation.
  - A⁻¹ = VΣ⁻¹Uᵀ
- This can be computed in O(n) time because Σ⁻¹ can be computed simply by taking the reciprocal of each of the diagonal elements of Σ.
- N.B. *No free lunch!* As a consequence, we now know that computing the SVD must take O(n³) time for square matrices, since inversion cannot be achieved faster than O(n³).

### Pseudo-inverse (non-symmetric)

- We can also pseudo-invert a matrix: A⁺, which will approximately "undo" the operation, even when A isn't square.
- The pseudo-inverse of A is just
  - A⁺ = VΣ⁻¹Uᵀ
- which is the same as the standard inverse computed via SVD, but taking care that Σ is the right shape - appropriate zero padding is required!
  - Fortunately, this is taken care of by the Numpy method `np.linalg.pinv`.

## A few more matrix properties

### Rank of a matrix
- The **rank** of a matrix is equal to the number of non-zero singular values.
- If the number of non-zero singular values is equal to the size of the matrix, then the matrix is **full rank**.
- A full rank matrix has a non-zero determinant and will be invertible.
- The rank tells us how many dimensions the parallelotope that the transform represents will have.
- If a matrix does not have full rank, it is **singular** (non-invertible) and has **deficient rank**.
- If the number of non-zero singular values is much less than the size of the matrix, the matrix is **low rank**.

### Condition number of a matrix
- The **condition number** number of a matrix is the ratio of the largest singular value to the smallest.
- This is only defined for full rank matrices.
- The condition number measures how sensitive inversion of the matrix is to small changes.
- A matrix with a small condition number is called **well-conditioned** and is unlikely to cause numerical issues.
- A matrix with a large condition number is **ill-conditioned**, and numerical issues are likely to be significant.
- An ill-conditioned matrix is almost singular, so inverting it will lead to invalid results due to floating point roundoff errors.

## Relation to singularity

- A **singular** matrix A is un-invertible and has det(A)=0. Singularity is a binary property and is either true or false.
- We can think of **rank** as measuring "how singular" the matrix is, i.e. how many dimensions are lost in the transform.
- We can think of the **condition number** as measuring how close a non-singular matrix is to being singular. A matrix which is nearly singular may become effectively singular due to floating point roundoff errors.

## Applying decompositions

- **Whitening** a data set (self-study in the lab)
  - **Whitening** removes all linear correlations within a dataset.
  - It is a normalisation step used to standardise data before analysis.
- Whitening does the following:
  - centers the data around its mean, so it has **zero mean**.
  - "squashes" the data so that its distribution is **spherical** and has **unit covariance**.
    - 'spherical' means that it is roughly spread out evenly in all directions in the space it's plotted in.
    - 'unit covariance' means the diagonal elements are all 1s. This means each feature (or dimension) has a variance of 1.
    - We can normalise to 1 by: 1.0 / np.sqrt(sigma)

### Whitening a data set

1. **Center the Data**: Before applying SVD, you should first center the data by subtracting the mean of each feature.
   - X_centered = X - mean(X)
2. **Apply SVD**: For the centered data X_centered, perform SVD:
   - X_centered = UΣVᵀ
3. **Whitening Transform**: The whitening transform can be computed using U and Σ. Specifically, the whitened data X_whitened is given by:
   - X_whitened = UΣ⁻¹/²UᵀX_centered

Here, Σ⁻¹/² is a diagonal matrix where each element is the inverse square root of the corresponding singular value in Σ.
This makes all variances = 1

### PCA vs Whitening a data set

- Whitening can be seen as an extension of the PCA process.
  - Both SVD (more numerically stable) and eigendecomposition can be used in both the tasks
  - But their objectives are different
- **Objectives**
  - **PCA**: Reduce the dimensionality of data while retaining as much variance as possible.
    - Only keep *k* most significant components.
    - Speed up your unsupervised feature learning algorithm
  - **Whitening**: Transform the data such that it has an identity covariance matrix.
    - No need to find *k* most significant components.
    - An important pre-processing step for many algorithms
