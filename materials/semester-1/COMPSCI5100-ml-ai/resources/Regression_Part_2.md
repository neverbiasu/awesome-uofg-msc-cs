# Regression_Part_2

Machine Learning & Artificial  Intelligence for Data  Scientists: Regression (Part 2)  Ali Gooya  ali.gooya@glasgow.ac.uk  School of Computing Science
1 - 2  Recap
Let’s add some outliers
Outliers hurt simple linear  regression badly
Going beyond straight line: Polynomial Regression
Vector/Matrix form:   This is still Linear Regression!
Least Square Solution
Construct polynomial matrix
Construct  polynomial matrix
Fit the model using the same  formula
What about higher order?
Loss   always   decreases   as  the model is made   more  complex





How do we choose the right model complexity?  Where can we get more data?
Validation example
Validation example
Cross - validation (CV)  ●   Cross - validation can   be  repeated   to make results  more accurate.  ●   e.g.   Doing 5 - fold CV   10  times gives us   50  performance values to  average over.  ●   Extreme example   is when C =  N so each   fold   includes one  input - response   pair:   Leave -  one - out   (LOO)   CV .
5 - fold CV loss at order  3
5 - fold CV loss at  order 8
10 fold CV at polynomial order  0 to 8
What if you  don’t like  polynomial?
General form
General Linear  Regression
Common basis functions  Polynomial   RBF  Sigmoid
Summary
