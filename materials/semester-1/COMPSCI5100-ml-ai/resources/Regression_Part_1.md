# Enriched Content: Regression (Part 1) - v2

This document is a complete and detailed AI-friendly version of the 28-page course material `Regression_Part_1.pdf`. All visual content such as images, graphs, code, and formulas has been fully transcribed and described.

---

## Page 1: Title Slide

- **Title**: Machine Learning & Artificial Intelligence for Data Scientists: Regression (Part 1)
- **Author**: Ali Gooya
- **Contact**: ali.gooya@glasgow.ac.uk
- **Affiliation**: School of Computing Science

---

## Page 2: Some data and a problem

> **Image Content Analysis:**
> - **Description**: A scatter plot showing the winning times for the men's Olympic 100m sprint for various years.
> - **Transcribed Text**:
>   - **Y-axis**: Time (seconds)
>   - **X-axis**: Year
>   - **Data Points**: The plot shows a clear downward trend, indicating that the winning times have been decreasing over the years, from around 12 seconds in the early 1900s to below 10 seconds in the 2000s.
>   - **Bullet Point 1**: Winning times for the men's Olympic 100m sprint, 1896-2008.
>   - **Bullet Point 2**: In this lecture, we will use this data to predict the winning time in London 2012.

---

## Page 3: Let's look at the data

> **Image Content Analysis:**
> - **Description**: A screenshot of a Jupyter Notebook cell showing Python code to load the Olympic data from a text file and the resulting NumPy array output.
> - **Transcribed Code (Input Cell `In [13]`):**
>   ```python
>   import numpy as np
>   %matplotlib inline
>   import pylab as plt
>   
>   data = np.loadtxt('olympic100m.txt', delimiter=',') # load olympic data
>   data
>   ```
> - **Transcribed Output (Output Cell `Out[13]`):**
>   ```
>   array([[1896.,   12.  ],
>          [1900.,   11.  ],
>          [1904.,   11.  ],
>          [1906.,   11.2 ],
>          [1908.,   10.8 ],
>          [1912.,   10.8 ],
>          [1920.,   10.8 ],
>          [1924.,   10.6 ],
>          [1928.,   10.8 ],
>          [1932.,   10.3 ],
>          [1936.,   10.3 ],
>          [1948.,   10.3 ],
>          [1952.,   10.4 ],
>          [1956.,   10.5 ],
>          [1960.,   10.2 ],
>          [1964.,   10.  ],
>          [1968.,    9.95],
>          [1972.,   10.14],
>          [1976.,   10.06],
>          [1980.,   10.25],
>          [1984.,    9.99],
>          [1988.,    9.92],
>          [1992.,    9.96],
>          [1996.,    9.84],
>          [2000.,    9.87],
>          [2004.,    9.85],
>          [2008.,    9.69]])
>   ```

---

## Page 4: Our first scatter plot

> **Image Content Analysis:**
> - **Description**: A Jupyter Notebook cell showing Python code using Matplotlib to create a scatter plot of the Olympic data, and the resulting plot image.
> - **Transcribed Code (Input Cell `In [15]`):**
>   ```python
>   x = data[:,0] # name years as x
>   t = data[:,1] # name time as t
>   
>   plt.scatter(x,t) # draw a scatter plot
>   plt.xlabel('Years') # always label x&y-axis
>   plt.ylabel('Time (seconds)') # always label x&y-axis
>   ```
> - **Plot Description**: The output is a scatter plot identical to the one on Page 2, with "Years" on the x-axis and "Time (seconds)" on the y-axis, showing the downward trend of winning times.

---

## Page 5: Draw a line through it!

> **Image Content Analysis:**
> - **Description**: The scatter plot of Olympic 100m winning times, now with a straight, downward-sloping line fitted through the data points. This line represents a simple linear model attempting to capture the trend. A red circle is drawn on the line at the year 2012, indicating the model's prediction.

---

## Page 6: Overview: Simple Linear Regression

- Introduce the idea of building models.
- Talk about assumptions.
- Use a linear model.
- What constitutes a good model?
- Find the best linear model.
- Use it to predict the winning time in 2012.

---

## Page 7: Assumptions

1. That there exists a relationship between Olympic year and winning time.
2. That this relationship is linear (i.e. a straight line).
3. That this relationship will continue into the future.

---

## Page 8: Draw a line through it!

> **Image Content Analysis:**
> - **Description**: A Jupyter Notebook cell showing Python code that defines a linear model and plots it over the data.
> - **Transcribed Code (Input Cell `In [24]`):**
>   ```python
>   # fit a straight line
>   w_0 = 36.4164559025
>   w_1 = -0.013330885711
>   
>   x_test = np.linspace(1880, 2020, 100) # generate new x to plot the fitted line. Note better not to use the original x !
>   f_test = w_0 + w_1 * x_test
>   plt.plot(x_test, f_test, 'b-', linewidth=2) # plot the fitted data
>   plt.plot(2012, w_0 + w_1 * 2012, 'ro') # Prediction for 2012
>   
>   plt.scatter(x,t) # draw a scatter plot
>   plt.xlabel('Years') # always label x&y-axis
>   plt.ylabel('Time (seconds)') # always label x&y-axis
>   ```
> - **Plot Description**: The output shows the scatter plot of the data with a blue regression line fitted through it. A single red dot ('ro') is plotted on the line at the year 2012, representing the model's prediction.

---

## Page 9: Let's reflect on the task

**Attributes and targets**

Typically in Supervised Machine Learning, we have a set of attributes and corresponding targets:
- **Attributes**: Olympic year.
- **Targets**: Winning time.

---

## Page 10: Key definitions - Variables

Mathematically, each is described by a variable:
- Olympic year: `x`
- Winning time: `t`

---

## Page 11: Key definitions - Model

Our goal is to create a model.
- This is a function that can relate `x` to `t`.
- `t = f(x)`
- Hence, we can work out `t` when `x = 2012`.

---

## Page 12: Key definitions - Data

We're going to create the model from data:
- `N` attribute-response pairs, `(x_n, t_n)`
- e.g., (1896, 12s), (1900, 11s), ..., (2008, 9.69s)
- `x_1 = 1896`, `t_1 = 12`, etc

Often called **training data**

---

## Page 13: What is a model?

- **Equation**: `t = f(x) = w_0 + w_1*x = f(x; w_0, w_1)`
- `w_0` and `w_1` are **parameters** of the model.
- They determine the properties of the line.

> **Image Content Analysis:**
> - **Description**: Two graphs illustrating the effect of the parameters `w_0` and `w_1`.
> - **Left Graph**: Titled "Increasing w_0". It shows a series of parallel lines. As `w_0` (the y-intercept) increases, the line shifts upwards.
> - **Right Graph**: Titled "Increasing w_1". It shows a series of lines that pivot around a single point on the y-axis. As `w_1` (the slope) increases, the line becomes steeper.

---

## Page 14: What is Learning?

> **Image Content Analysis:**
> - **Description**: A composite image posing the question of "learning". On the left is the scatter plot of the Olympic data. On the right is the "family of models" (the two graphs from the previous slide showing how lines change with `w_0` and `w_1`). A large question mark connects the data to the models, visually asking: "Which of these infinite possible lines is the best one for our data?"
> - **Transcribed Text**: `t = w_0 + w_1*x`

---

## Page 15: How good is a particular w_0, w_1?

- How good is a particular line `(w_0, w_1)`?
- We need to be able to provide a numerical value of goodness for any `w_0, w_1`.
  - How good is `w_0 = 5, w_1 = 0.1`?
  - Is `w_0 = 5, w_1 = -0.1` better or worse?
- Once we can answer these questions, we can search for the best `w_0, w_1` pair.

---

## Page 16-20: The Concept of Loss (Illustrated)

This series of slides visually builds the concept of loss.

- **Page 16**: Shows a scatter plot of some new data points.
- **Page 17**: A straight line (our model) is drawn through the data points.
- **Page 18**: For two data points (at x=1 and x=5), the slide shows the model's prediction `f(x; w_0, w_1)` as the point on the red line directly above the `x` value.
- **Page 19**: Vertical green lines are drawn connecting the true data points to the model's prediction on the red line. These lines represent the error or residual, labeled `t_n - f(x_n; w_0, w_1)`.
- **Page 20**: The slide introduces **Squared Loss**. The text explains that this error, `(t_n - f(x_n; w_0, w_1))^2`, tells us how badly we model each data point.

---

## Page 21: Squared Loss (Formula)

- The **Squared loss** of training point `n` is defined as:
  `L_n = (t_n - f(x_n; w_0, w_1))^2`
- It is the squared difference between the true response (winning time), `t_n`, when the input is `x_n` and the response predicted by the model, `f(x_n; w_0, w_1) = w_0 + w_1*x_n`.
- The lower `L_n`, the closer the line at `x_n` passes to `t_n`.

---

## Page 22: Averaged Squared Loss

- **Concept**: Average the loss at each training point to give a single figure for all data.
- **Formula**:
  `L = (1/N) * Σ_{n=1 to N} (t_n - f(x_n; w_0, w_1))^2`

> **Image Content Analysis:**
> - **Description**: A scatter plot with a regression line. Vertical green lines show the residual (error) for each data point. The formula for the averaged squared loss (Mean Squared Error) is displayed below the plot.

---

## Page 23: Compare two different models (Model 1)

> **Image Content Analysis:**
> - **Description**: A Jupyter Notebook output showing the first model.
> - **Transcribed Code and Values**:
>   - **Model 1 Parameters**:
>     - `w_0 = 36.4164559025`
>     - `w_1 = -0.013330885711`
>   - **Loss Calculation Code**:
>     `sum((t-36.4164559025 - (-0.013330885711)*x)**2)/t.shape[0]`
>   - **Resulting Loss (Out[5])**: `0.05030711047565771`
> - **Plot**: Shows the scatter data with the blue regression line for Model 1 fitted through it.

---

## Page 24: Compare two different models (Model 2)

> **Image Content Analysis:**
> - **Description**: A Jupyter Notebook output showing a second, worse model for comparison.
> - **Transcribed Code and Values**:
>   - **Model 2 Parameters**:
>     - `w_0 = 41.5`
>     - `w_1 = -0.0163`
>   - **Loss Calculation Code**:
>     `sum((t-41.5- (-0.013330885711)*x)**2)/t.shape[0]`
>   - **Resulting Loss (Out[7])**: `25.892727700891623`
> - **Plot**: Shows the scatter data with a new, poorly fitting blue regression line for Model 2.

---

## Page 25: Model fitting

> **Image Content Analysis:**
> - **Description**: A Jupyter Notebook cell demonstrating how to use the `scikit-learn` library to fit a linear regression model automatically.
> - **Transcribed Code (Input Cell `In [52]`):**
>   ```python
>   from sklearn.linear_model import LinearRegression # import
>   
>   x = x[:,None] # 27 x 1 array
>   t = t[:,None] # 27 x 1 array
>   
>   reg = LinearRegression().fit(x, t)
>   ```
> - **Transcribed Code (Input Cell `In [53]`):**
>   `[reg.intercept_, reg.coef_]`
> - **Output (Out[53])**: `[array([36.4164559]), array([[-0.01333089]])]`
> - **Transcribed Code (Input Cell `In [54]`):**
>   `reg.predict(np.array([[2012]]))`
> - **Output (Out[54])**: `array([[9.59471385]])`

---

## Page 26: Summary

- Introduced some ideas about modelling.
- Found some data.
- Derived a way of saying how good a model is.
- Found an expression for the best model.
- Used this to fit a model to the Olympic data.
- Made a prediction for the winning time in 2012.

---

## Page 27: Assumptions again

1. That there exists a relationship between Olympic year and winning time.
2. That this relationship is linear (i.e. a straight line).
3. That this relationship will continue into the future.

---

## Page 28: Assumptions are wrong

- Relationship is clearly not perfectly linear.
- Winning time cannot decrease forever - it must be positive.
- It can't increase forever into the past.

- **Conclusion**: The model is ‘wrong’ but it might still be useful. How useful depends on the questions we wish to answer.
