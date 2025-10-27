# Enriched Content: Regression_Part_2.pdf

This document is a complete and detailed AI-friendly version of the presentation `Regression_Part_2.pdf`. All visual content including text, graphs, diagrams, and formulas has been meticulously transcribed and described.

---

## Page 1: Title Slide

- **Title**: Machine Learning & Artificial Intelligence for Data Scientists: Regression (Part 2)
- **Author**: Ali Gooya
- **Contact**: ali.gooya@glasgow.ac.uk
- **Affiliation**: School of Computing Science

---

## Page 2: Recap

- Introduced some ideas about modelling.
- Found some data.
- Derived a way of saying how good a model is.
- Found an expression for the best model.
- Used this to fit a model to the Olympic data.
- Made a prediction for the winning time in 2012.

---

## Page 3: Let's add some outliers

> **Image Content Analysis:**
> - **Overall Description**: A Jupyter Notebook cell that artificially introduces an outlier into the Olympic 100m dataset and then plots the result.
> - **Transcribed Code `In [69]`**:
>   ```python
>   outlier_idx = np.array([0])
>   t_outlier = t*1
>   t_outlier[outlier_idx] = 20
>   
>   plt.scatter(x,t_outlier) # draw a scatter plot
>   plt.xlabel('Years') # always label x&y-axis
>   plt.ylabel('Time (seconds)') # always label x&y-axis
>   ```
> - **Graph Analysis**:
>   - **Type**: 2D Scatter Plot.
>   - **Y-axis**: Time (seconds), ticks from 10 to 20.
>   - **X-axis**: Years, ticks from 1900 to 2000.
>   - **Data**: The plot shows the original Olympic data points, but the first data point (year 1896) has been moved from 12 seconds up to 20 seconds, creating a clear outlier.

---

## Page 4: Outliers hurt simple linear regression badly

> **Image Content Analysis:**
> - **Overall Description**: A Jupyter Notebook output demonstrating the negative effect of an outlier on a linear regression model.
> - **Transcribed Code and Output**:
>   - **Code `In [81]`**: Fits a `LinearRegression` model to the data with the outlier.
>   - **Code `In [16]`**: `[reg.intercept_, reg.coef_]`
>   - **Output `Out[16]`**: `[array([63.32175978]), array([[-0.02695996]])]` (These are the new, skewed model parameters).
> - **Graph Analysis**:
>   - **Content**: The scatter plot shows the data with the outlier at (1896, 20). A blue regression line is fitted to this data.
>   - **Observation**: The single outlier has dramatically pulled the regression line upwards, causing it to be a very poor fit for the vast majority of the other data points. The line no longer represents the true underlying trend.

---

## Page 5: Going beyond straight line: Polynomial Regression

- **Model Equation**: `t = w_0 + w_1*x + w_2*x² + w_3*x³ + ... + w_K*x^K = Σ_{k=0 to K} w_k*x^k`
- **To find** `w̃_0, ..., w̃_K`:
  - Define loss `L = (1/N) * Σ_{n=1 to N} (t_n - Σ_{k=0 to K} w_k*x_n^k)²`
  - Differentiate loss with respect to every parameter
  - Set to zero and solve (K simultaneous equations)
- **Conclusion**: Very tedious! Use vector/matrix notation instead.

---

## Page 6: Vector/Matrix form: This is still Linear Regression!

- **Concept**: Even polynomial regression is considered a linear model because the equation is linear with respect to the weights `w`.
- **Vector/Matrix Definitions**:
  - `w`: A column vector of weights `[w_0, w_1, ..., w_K]ᵀ`.
  - `x_n`: A column vector of features for a single data point `[1, x_n, x_n², ..., x_n^K]ᵀ`.
  - `X`: The design matrix, where each row corresponds to a data point `x_n`.
- **Equations**:
  - `t = wᵀx`
  - `L = (1/N) * (t - Xw)ᵀ(t - Xw)`

---

## Page 7: Least Square Solution

- **Vector/Matrix Definitions for Simple Linear Regression**:
  - `w = [w_0, w_1]ᵀ`
  - `X` is a matrix where the first column is all ones and the second column is the year (1896, 1900, ...).
  - `t` is the column vector of winning times (12.00, 11.00, ...).
- **Analytical Solution**:
  - `ŵ = (XᵀX)⁻¹Xᵀt`
  - The result of this calculation is shown to be `[36.416, -0.0133]ᵀ`.

---

## Page 8: Construct polynomial matrix

> **Image Content Analysis:**
> - **Overall Description**: Shows the general form of the polynomial design matrix `X` and a Python function to create it.
> - **Matrix Form**: The matrix `X` has `N` rows (for `N` data points) and `K+1` columns. The first column is all ones, the second is `x`, the third is `x²`, and so on, up to `x^K`.
> - **Transcribed Code `In [7]`**:
>   ```python
>   def make_polynomial(x, maxorder): # The np.hstack function can be very helpful
>       X = np.ones_like(x)
>       for i in range(1,maxorder+1):
>           X = np.hstack((X,x**i))
>       return(X)
>   ```

---

## Page 9-11: Jupyter Notebook Examples of Polynomial Regression

- **Page 9**: Shows the output of creating a polynomial matrix of order 3.
- **Page 10**: Fits a 3rd-order polynomial model. 
  - **Code**: Shows fitting `LinearRegression` to `X_train` created by `make_polynomial`.
  - **Output**: `loss at order 3: 0.02961132122019676`
  - **Plot**: Shows the resulting 3rd-order polynomial curve fitting the data points much more closely than a straight line.
- **Page 11**: Fits an 8th-order polynomial model.
  - **Output**: `loss at order 8: 0.016981387841969484`
  - **Plot**: Shows a more complex curve. While it fits the training data well, it starts to show signs of overfitting, with the ends of the curve swinging wildly upwards.

---

## Page 12: Loss always decreases as the model is made more complex

> **Image Content Analysis:**
> - **Overall Description**: A Jupyter Notebook output plotting the training loss against the polynomial order.
> - **Graph Analysis**:
>   - **Title**: Loss always decreases as the model is made more complex
>   - **Y-axis**: Loss
>   - **X-axis**: Polynomial Order (from 0 to 8)
>   - **Data**: The plot shows that the loss on the training data consistently decreases as the polynomial order (model complexity) increases.

---

## Page 13-16: Overfitting Visualized

> **Image Content Analysis (Series of 4 slides):**
> - **Overall Description**: A series of plots showing models of increasing complexity being fit to a small set of 6 noisy data points.
> - **Page 13 (Linear)**: A straight line provides a poor fit.
> - **Page 14 (Quadratic)**: A quadratic curve fits the data better.
> - **Page 15 (Fourth order)**: A 4th-order polynomial wiggles to get closer to the points.
> - **Page 16 (Fifth order)**: A 5th-order polynomial passes perfectly through all 6 data points, resulting in zero training error but creating a highly oscillatory and non-generalizable model.

---

## Page 17: Generalisation and over-fitting

- There is a trade-off between generalisation (predictive ability) and over-fitting (decreasing the loss).
- Fitting a model perfectly to the training data is likely to lead to poor predictions because there will almost always be **noise** present.
- **Noise**: Not necessarily ‘noise’, just things we can’t, or don’t need to model.

---

## Page 18: How do we choose the right model complexity? Where can we get more data?

- We have N input-response pairs for training: `(x₁, t₁), (x₂, t₂), ..., (x_N, t_N)`.
- We could use `N-C` pairs to find `ŵ` for several models.
- Choose the model that makes best predictions on remaining `C` pairs.
  - The `N-C` pairs constitute **training data**.
  - The `C` pairs are known as **validation data**.
- **Example**: use Olympics pre-1980 to train and post-1980 to validate.

---

## Page 19: Validation example

> **Image Content Analysis:**
> - **Overall Description**: A plot showing the validation loss for different polynomial orders.
> - **Graph Analysis**:
>   - **Y-axis**: Log Validation Loss
>   - **X-axis**: Polynomial Order (1 to 8)
>   - **Data**: The plot shows the validation loss is lowest for order 1 (a linear model) and increases for higher, more complex orders.
> - **Conclusion**: "Best model? Results suggest that a first order (linear) model (t = w₀ + w₁x) is best."

---

## Page 20: Validation example (Visualized)

> **Image Content Analysis:**
> - **Overall Description**: A plot showing the Olympic data split into training and validation sets, with different models overlaid.
> - **Graph Analysis**:
>   - **Training data** (blue dots) is pre-1980.
>   - **Validation data** (black squares) is post-1980.
>   - **Models**: A 1st order (linear), 4th order, and 8th order polynomial are fitted to the training data. The 1st order model generalizes best to the validation data, while the higher-order models overfit the training data and perform poorly on the validation set.

---

## Page 21: Cross-validation (CV)

- Cross-validation can be repeated to make results more accurate.
- e.g. Doing **5-fold CV** 10 times gives us 50 performance values to average over.
- Extreme example is when C = N so each fold includes one input-response pair: **Leave-one-out (LOO) CV**.

> **Image Content Analysis:**
> - **Description**: A diagram illustrating 5-fold cross-validation. The training data is split into 5 folds. In each of 5 "splits", one fold is used for testing (validation) and the other four are used for training.

---

## Page 22-24: Cross-validation Examples

- **Page 22**: Shows a Jupyter cell calculating the 5-fold CV loss for a 3rd-order polynomial. The mean loss is `0.052`.
- **Page 23**: Shows a Jupyter cell calculating the 5-fold CV loss for an 8th-order polynomial. The mean loss is much higher at `379.58` due to overfitting in some folds.
- **Page 24**: Shows a plot of the log loss vs. polynomial order (0 to 8) using 10-fold CV. The plot clearly shows that the loss is minimized at a polynomial order of 1, confirming that the linear model is the best choice.

---

## Page 25: What if you don't like polynomial?

- **Alternative Model**: `t = w_0 + w_1*x + w_2*sin((x-a)/b)`
- This is another example of a basis function.

> **Image Content Analysis:**
> - **Description**: The Olympic data is plotted with a sinusoidal model fitted to it, showing an alternative to polynomial regression.

---

## Page 26-27: General Linear Regression

- **General Form**: The design matrix `X` can be constructed from any set of basis functions `h_k(x)`.
- **Matrix `X`**: `X = [h_0(x_i), h_1(x_i), ..., h_K(x_i)]` for `i=1 to N`.
- **General Solution**: The same least squares formula applies: `ŵ = (XᵀX)⁻¹Xᵀt`.
- **Prediction**: `t_new = ŵᵀ * x_new`

---

## Page 28: Common basis functions

> **Image Content Analysis:**
> - **Overall Description**: Three plots showing examples of different families of basis functions.
> - **Left Plot**: "Polynomial" basis functions (`1, x, x², x³...`).
> - **Middle Plot**: "Sigmoid" basis functions, which are S-shaped curves.
> - **Right Plot**: "Radial basis function (RBF)" functions, which are bell-shaped curves.

---

## Page 29: Summary

- Showed how we can make predictions with our ‘linear’ model.
- Saw how choice of model has big influence in quality of predictions.
- Saw how the loss on the training data, L, cannot be used to choose models.
  - Making model more complex always decreases the loss.
- Introduced the idea of using some data for validation.
- Introduced cross validation and leave-one-out cross validation.
