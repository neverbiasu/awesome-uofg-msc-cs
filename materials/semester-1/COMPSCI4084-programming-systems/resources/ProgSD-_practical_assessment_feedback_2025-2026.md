# ProgSD-_practical_assessment_feedback_2025-2026

__ProgSD Practical Assessment general feedback \(November 2025\)__

The practical assessment was open\-book\. We marked the code manually, giving partial credit for minor errors where the intention was clear\. Note that if we had used fully automatic marking, many students would have received a zero for failing to follow instructions\. 

Open\-Book Practical assessment issue: Some students seem to have relied heavily on online searches instead of using pre\-existing code from the practical labs or past papers\. Some students did not even attempt last year’s past papers; this would have given them at least some marks in any part\.

The Python Practical Assessment required solving three tasks in a single Python source file, covering Python basics, database management, and neural network implementation\. Unfortunately, many students submitted incomplete or partially functional solutions, or submitted no work at all\. __We marked very generously\. Note that we will be marking the Final Lab Exam more rigorously in December\.__

How did we mark?

- If the code produced outputs matching the provided screenshots and followed naming conventions \(e\.g\., the tables ' names, insert would not allow duplication\), full marks were awarded\.
- In cases with few errors, markers made corrections to check functionality and awarded partial credit\.
- For submissions with numerous errors, minimal marks were given for attempts\.

The average marks:

- Overall: 26\.7/40
- Task 1: 10\.2/13
- Task 2: 9\.2/15
- Task 3: 7\.2/12

__Key issues by Python Task__

While there were many issues, here are a few\.

__Task 1: Python Basics and Data Manipulation \[13 Marks\]__

Missing value handling: Many submissions did not appropriately handle missing values or apply suitable strategies for different column types \(despite the example provided on Moodle\)\.

Data conversion: Errors were frequently seen in converting dates correctly to a usable format, which affected subsequent tasks\.

Plots: Bar and line plots often lacked correct formatting or appropriate aggregation of data \(e\.g\., grouping by specific requirements\)\. 

__Task 2: Python Database Management \[15 marks\]__

Table creation: Some submissions did not explicitly define the table schema or included incorrect data types and constraints \(e\.g\., setting a primary key or not considering duplicate entries\)\.

Data insertion: Data was either not appropriately inserted, lacked dynamic handling of the cleaned DataFrame, or failed to prevent duplicates\.

Queries: Many query implementations were incomplete or failed due to schema inconsistencies or incorrect logic\. Many also failed to save to the corresponding \.csv files\.

__Task 3: Basic Neural Network Implementation \[12 marks\]__

Model architecture: Several submissions did not follow the specified model architecture, including incorrect input/output sizes, missing activation functions, or inappropriate use of deprecated methods like F\.sigmoid\.

Data generation: Synthetic data generation was often absent or incorrect, with mismatched dimensions between inputs and targets\.

Training and loss visualisation: While some submissions implemented training loops, issues with data loaders, loss calculations, or visualisation of training progress \(e\.g\., plotting loss over epochs\) were common, leading to no output or wrong output\.

