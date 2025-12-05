# Practice_Exam_Task3

# Practice Task 3 \(replacing pytorch\): Working with CSV Files and Visualising Data in Python

This practice exercise helps you prepare for the final exam’s Python Task 3\. You will practise reading, writing, summarising, and visualising simple data using __pandas__, __Numpy__, and __matplotlib__\.

## Practice Task: Student Height Logger 

You will create a Python script that logs students’ names and heights, saves them to a CSV file, and visualises the results\.

### Task 1 – CSV File Setup 

Create a new CSV file named __heights\.csv__ with the columns: Name, Height

1. If the file already exists, your script should __not overwrite__ it; instead, it should append new data to the end of the file\. 

Print a message confirming whether the \.csv file was created \(this is when the file is created for the first time, or if you already deleted the \.csv file and rerun the code to create it again\)\. 

Print a message confirming the \.csv is open for appending \(if you rerun the code after creating the file, it will not create a new \.csv file\)__\. __

## Task 2 – Data Entry

1. Prompt the user to enter one or more records of name and height in centimetres \(integer\)\. 
2. The user can stop entering data by typing ‘q’ as the name\. 
3. Each valid record should be appended as a new row in the CSV file\. 

Here are the output and interaction for this task when the code is run\. When testing your code, ensure you enter the same records \(Name and Height\) as shown below\. They are necessary for the remaining tasks\.

=== Task 2: Data Entry ===

Enter name \(or 'q' to quit\): Amy

Enter height \(cm\): 165

Enter name \(or 'q' to quit\): Ben

Enter height \(cm\): 172

Enter name \(or 'q' to quit\): Ali

Enter height \(cm\): 166

Enter name \(or 'q' to quit\): Yin

Enter height \(cm\): 180

Enter name \(or 'q' to quit\): Mohammed

Enter height \(cm\): 170

Enter name \(or 'q' to quit\): Gus

Enter height \(cm\): 182

Enter name \(or 'q' to quit\): q

Data saved to heights\.csv

## Task 3 – Summary Statistics 

After saving the data, use pandas and Numpy to:

- Read the CSV file into a DataFrame
- Print the total number of records
- Print the average, minimum, and maximum heights
- Save summary results to a text file called __height\_summary\.txt__\.

## Task 4 – Visualisation

Using matplotlib, create a simple histogram showing the distribution of heights\.

- Title: *“Height Distribution”*
- X\-axis label: *Height \(cm\)*
- Y\-axis label: *Frequency*

If you re\-run the program and quit immediately by typing 'q' without adding any new records, the same output should appear each time, confirming that the script produces consistent results when no new data is added\.

