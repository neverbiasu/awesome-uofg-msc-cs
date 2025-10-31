# Regression_Part3

Machine Learning & Artificial  Intelligence for Data  Scientists: Regression (Part 3)  Ali Gooya  ali.gooya@glasgow.ac.uk  School of Computing Science
Polynomial Curve Fitting
Sum - of - Squares Error Function
0 th   Order Polynomial
1 st   Order Polynomial
3 rd   Order Polynomial
9 th   Order Polynomial
Over - fitting  Root - Mean - Square (RMS) Error:
Polynomial Coefficients
Data Set Size:  9 th   Order Polynomial
Data Set Size:  9 th   Order Polynomial
Regularized Least Squares (1)  •   Consider the error function:  •   With the sum - of - squares error function and quadratic  regularizer, we get  •   which is minimized by  Data term + Regularization term  𝜆   is called the  regularization  coefficient.
Let’s look at the loss  function in 1D
Regularized Least Squares (2)  With a   more   general   regularizer,   we   have  Lasso   Quadratic/Ridge
Regularized Least Squares (3)  Lasso   tends   to   generate   sparser   solutions   than a  quadratic   regularizer .
Regularization:
Regularization:
Regularization:   vs.
Polynomial Coefficients
Fit a polynomial  regression model  of order 10
Fit a ridge regression  model with   \ alpha  determined by 5 - fold CV
Compare parameters between linear and ridge  regression
Fit a Lasso model with  \ alpha determined by 5 -  fold CV
Compare parameters between linear regression,  ridge regression, Lasso
What about a different loss?
