# Step-by-step_proactical_exercises_-_Google_Colab

# Practical exercises \- Google Colab

\(if not possible in the lab, try them on your own device\.

## Exercise 1: Getting Started with Google Colab

1. __Task:__ Open Google Colab by visiting colab\.research\.google\.com\.
2. __Task:__ Create a new notebook titled "Introduction to Google Colab\."
3. __Task:__ Write a Python script in a code cell that prints "Hello, Colab\!" and run the cell
4. __Task:__ Add a markdown cell that explains what the notebook is about\.

## __Exercise 2: Utilising Google Colab’s Features__

1. __Task:__ Enable GPU support for your notebook\.
	- __Instructions:__ Go to "Runtime" > "Change runtime type" > Select "GPU" under "Hardware accelerator" > Save\.
2. __Task:__ Write a Python script that generates a random array using NumPy and multiplies it by 10\.
3. __Task:__ Install the matplotlib library and create a simple plot\.

## Exercise 3: Collaborating on Google Colab

1. __Task:__ Share your notebook with a classmate or colleague via Google Drive\.
	- __Instructions:__ Click "Share" in the top\-right corner of the notebook and enter their email address\.
2. __Task:__ Collaborate on the same notebook by having both of you edit different cells simultaneously\.
3. __Task:__ Use the "Revision History" feature to view and revert changes\.

## Exercise 4: Advanced Google Colab Usage

1. __Task:__ Connect your Google Drive to the notebook and list all files in a specific folder\.
2. __Task:__ Create a new file in your Google Drive from Colab and write some text to it\.

## How to use R with Google Colab

Google Colab primarily supports Python, but it can also be configured to run R\. The following tasks will guide you through setting up and using R in Colab, performing basic operations, and leveraging R's powerful data analysis capabilities\.

__Practical Task 1: Setting Up R in Google Colab__

__Task 1\.1: Create a New Colab Notebook__

- __Instructions:__
	- Open Google Colab\.
	- Sign in with your Google account\.
	- Create a new notebook by clicking on "New Notebook\."

__Task 1\.2: Set Up R Kernel in Google Colab__

- __Instructions:__
	- Google Colab uses the IPython kernel by default\. To run R code, you'll need to install the R kernel using the following commands\.
	- Create a new code cell and run the following code to install R and essential R packages:

python

Copy code

\# Install R and necessary packages

\!apt\-get install \-y r\-base

\!R \-e "install\.packages\('IRkernel'\); IRkernel::installspec\(user = FALSE\)"

- __Explanation:__ This installs the base R language and the IRkernel, which allows you to run R code in Colab\.

__Task 1\.3: Switch to R Kernel__

- __Instructions:__
	- After installing the R kernel, switch to it by selecting "Runtime" > "Change runtime type\."
	- Under "Runtime type," select "R" from the "Runtime" dropdown menu and click "Save\."

__Practical Task 2: Writing and Running R Code in Google Colab__

__Task 2\.1: Write and Execute Simple R Code__

- __Instructions:__
	- In your notebook, write a simple R script that prints "Hello, R in Colab\!"\.
	- Create a new code cell and enter the following R code:

r

Copy code

print\("Hello, R in Colab\!"\)

- __Task:__ Run the cell by clicking the "Run" button or pressing Shift \+ Enter\.

__Task 2\.2: Perform Basic Mathematical Operations in R__

- __Instructions:__
	- Create a new code cell and write R code to perform basic arithmetic operations\.
	- Use the following R code:

r

Copy code

a <\- 5

b <\- 3

\# Addition

addition <\- a \+ b

print\(paste\("Addition: ", addition\)\)

\# Subtraction

subtraction <\- a \- b

print\(paste\("Subtraction: ", subtraction\)\)

\# Multiplication

multiplication <\- a \* b

print\(paste\("Multiplication: ", multiplication\)\)

\# Division

division <\- a / b

print\(paste\("Division: ", division\)\)

- __Task:__ Run the cell and observe the output\.

__Practical Task 3: Working with Data in R__

__Task 3\.1: Load and Inspect a Dataset in R__

- __Instructions:__
	- Use R's built\-in mtcars dataset for analysis\.
	- Create a new code cell and write the following R code to load and inspect the dataset:

r

Copy code

\# Load the mtcars dataset

data\("mtcars"\)

\# Display the first few rows of the dataset

head\(mtcars\)

- __Task:__ Run the cell and inspect the output\.

__Task 3\.2: Perform Basic Data Manipulation__

- __Instructions:__
	- Create a new code cell to perform data manipulation on the mtcars dataset\.
	- Use the following R code to calculate the mean miles per gallon \(mpg\) for cars with more than 6 cylinders:

r

Copy code

\# Filter the dataset for cars with more than 6 cylinders

cars\_over\_6\_cyl <\- subset\(mtcars, cyl > 6\)

\# Calculate the mean mpg for these cars

mean\_mpg <\- mean\(cars\_over\_6\_cyl$mpg\)

print\(paste\("Mean MPG for cars with more than 6 cylinders: ", mean\_mpg\)\)

- __Task:__ Run the cell and observe the output\.

__Practical Task 4: Visualizing Data in R__

__Task 4\.1: Create a Basic Plot__

- __Instructions:__
	- Create a new code cell to generate a basic scatter plot using the plot\(\) function in R\.
	- Use the following R code:

r

Copy code

\# Scatter plot of horsepower \(hp\) vs\. miles per gallon \(mpg\)

plot\(mtcars$hp, mtcars$mpg,

     main = "Scatter plot of HP vs MPG",

     xlab = "Horsepower",

     ylab = "Miles Per Gallon",

     pch = 19, col = "blue"\)

- __Task:__ Run the cell to generate the plot\.

__Task 4\.2: Create a More Advanced Plot Using ggplot2__

- __Instructions:__
	- Install the ggplot2 package and create a more advanced plot\.
	- Create a new code cell and run the following R code:

r

Copy code

\# Install ggplot2 package

install\.packages\("ggplot2"\)

library\(ggplot2\)

\# Create a ggplot

ggplot\(mtcars, aes\(x = hp, y = mpg\)\) \+

  geom\_point\(color = "blue", size = 3\) \+

  geom\_smooth\(method = "lm", col = "red"\) \+

  labs\(title = "HP vs MPG with Linear Regression Line",

       x = "Horsepower",

       y = "Miles Per Gallon"\)

- __Task:__ Run the cell to generate the advanced plot\.

__Practical Task 5: Saving and Sharing Your R Work__

__Task 5\.1: Save Your Notebook to Google Drive__

- __Instructions:__
	- Ensure your notebook is saved in Google Drive by clicking "File" > "Save" or "Save a copy in Drive\."
	- Verify that the notebook is accessible from your Google Drive\.

__Task 5\.2: Export Your Notebook as a PDF__

- __Instructions:__
	- To share your notebook with others, export it as a PDF by clicking "File" > "Print" and selecting "Save as PDF\."

