# Enriched Content: MLAI4DS__Welcome_to_the_course.pdf

This document is a complete and detailed AI-friendly version of the presentation `MLAI4DS__Welcome_to_the_course.pdf`. All visual content including text, graphs, and diagrams has been meticulously transcribed and described.

---

## Page 1: Title Slide

- **Title**: Machine Learning & Artificial Intelligence for Data Scientists: Welcome to the course
- **Author**: Ali Gooya
- **Contact**: ali.gooya@glasgow.ac.uk
- **Affiliation**: School of Computing Science

---

## Page 2: Who are we?

> **Image Content Analysis:**
> - **Overall Description**: Introduces the two lecturers for the course with their photos and research areas.
> - **Left Side**:
>   - **Photo**: Dr. Fani Deligianni
>   - **Text**: Dr Fani Deligianni, Senior Lecturer, Machine Learning and Healthcare
> - **Right Side**:
>   - **Photo**: Dr. Ali Gooya
>   - **Text**: Dr Ali Gooya, Senior Lecturer, Machine Learning, Computer Vision and Medical Imaging

---

## Page 3: Why bother about machine learning?

- **Title**: Salary distribution trend for jobs in the UK citing Machine Learning.

> **Image Content Analysis:**
> - **Overall Description**: A line graph showing the salary trend for machine learning jobs in the UK from 2005 to 2025.
> - **Graph Analysis**:
>   - **Type**: Line graph with percentile bands.
>   - **Y-axis**: Salary in GBP, from £30,000 to £140,000.
>   - **X-axis**: Year, from 2005 to 2025.
>   - **Legend**:
>     - Orange Line: Median salary.
>     - Dark Blue Shaded Area: 25th to 75th Percentile Range.
>     - Light Blue Shaded Area: 10th to 90th Percentile Range.
>   - **Trend**: The graph shows a significant and steady upward trend in salaries for machine learning roles over the past two decades.
> - **Source**: https://www.itjobswatch.co.uk/

---

## Page 4: What is Machine Learning?

- **Definition**: Machine Learning (ML) is the field of study that gives computers the ability to learn without being explicitly programmed.

> **Image Content Analysis:**
> - **Description**: A photograph of Arthur Lee Samuel.
> - **Transcribed Text**: Arthur Lee Samuel was an American pioneer in the field of computer gaming and artificial intelligence. He popularized the term "machine learning" in 1959.

---

## Page 5: What is Machine Learning? (Data)

- Machine learning starts with **data**.
- **Data** is derived from **objects**:
  - Observations of people (preferences, health, etc)
  - Observations of the world (images, sounds, etc)

---

## Page 6: Examples of applied ML

> **Image Content Analysis:**
> - **Overall Description**: A collage of five images illustrating different applications of machine learning.
> - **Image 1 (Spam filtering)**: An icon showing an email filter separating spam from the inbox.
> - **Image 2 (Face detection)**: A photo where green boxes are drawn around faces to detect them.
> - **Image 3 (Pedestrian detection)**: A street photo where red boxes are drawn around people to detect them.
> - **Image 4 (Movie recommendation)**: A screenshot of a Netflix-like interface recommending movies.
> - **Image 5 (Voice recognition)**: A microphone icon with the text "Ok Google".

---

## Page 7: Types of Machine Learning

> **Image Content Analysis:**
> - **Overall Description**: A flowchart showing the three main types of machine learning.
> - **Flowchart Structure**:
>   - **Top Box**: "Types of Machine Learning"
>   - **Branches to**: 
>     1. **Supervised**: Task driven (classification, regression)
>     2. **Unsupervised**: Data driven (clustering)
>     3. **Reinforcement**: Goal driven: Algorithm learns to interact with environment

---

## Page 8: Supervised Learning: Regression

- Learning a continuous function from a set of examples.
- Example: Predicting stock prices (x might be time or some other variable of interest).

> **Image Content Analysis:**
> - **Overall Description**: A 2x2 grid of scatter plots, each labeled (mod1, mod2, mod3, mod4, mod5), showing different regression models (red lines) fitted to noisy data points (black dots).

---

## Page 9: What do we want to achieve?

- **Quote**: "All models are wrong, but some are useful.” - George E. P. Box
- **Text**: A paragraph explaining that models are approximations of the real world and their value lies in being "illuminating and useful," not in being a perfect representation of "truth".

---

## Page 10: Supervised Learning: Classification

- Learning a rule that can separate objects of different types from one another.
- Examples: Disease diagnosis, spam email detection.

> **Image Content Analysis:**
> - **Overall Description**: A plot illustrating a classification problem.
> - **Graph Analysis**: 
>   - **Data**: Two classes of data points are shown: red dots and blue dots.
>   - **Model**: A black line represents the decision boundary that separates the two classes. Colorful contour lines represent the decision surface or probabilities.

---

## Page 11-13: Machine Learning Process

- **Page 11**: A list of steps in the ML process: Data Collection, Feature Selection, Model choice, Training, Evaluation. A red box highlights "Model choice" and "Training" as the focus of the class.
- **Page 12**: Illustrates Data Collection and Feature Selection with the Iris dataset.
> **Image Content Analysis (Page 12):**
> - **Data Collection**: Shows images of three iris species: Versicolor, Setosa, Virginica.
> - **Feature Selection**: An image of an iris flower has its "petal" and "sepal" labeled. To the right, a scatter plot matrix shows relationships between the four features (Sepal Length/Width, Petal Length/Width) for the three species, demonstrating how features like Petal Length/Width can effectively separate the classes.
- **Page 13**: Illustrates Model Choice, Training, and Evaluation.
> **Image Content Analysis (Page 13):**
> - **Model choice**: Shows icons for three different model types: a neural network, a support vector machine (SVM), and a decision tree.
> - **Training**: An icon of a database ("Data") points to a box labeled "Tuned Parameters", representing the training process.
> - **Evaluation**: A confusion matrix is shown, comparing "Actual Class" to "Predicted Class" and showing the number of correct and incorrect predictions for each class.

---

## Page 14-18: Case Study: Breast Lesion Classification

- **Title**: Classification of breast lesions in ultrasonography using sparse logistic regression and morphology-based texture features, Medical Physics, 2019
- **Page 14**: Shows examples of ultrasound images of malignant (irregularly shaped) and benign (smooth, elliptical) tumours.
- **Page 15**: A flowchart showing the process of extracting texture-based features from the tumour boundary.
- **Page 16**: Shows how the texture from a malignant and a benign tumour are "unrolled" into a 1D texture strip.
- **Page 17**: Shows how contour-based features are extracted by plotting the distance `d` from the centroid to the boundary as a function of the angle `θ`.
- **Page 18**: A complete flowchart of the classification system, from input image to feature extraction (Morphological and Textural) and finally to a "Sparse LR Classifier" that distinguishes between Benign and Malignant.

---

## Page 19: Unsupervised Learning: Clustering

- Finding groups of similar data points.
- Example: clustering re-scaled Old Faithful dataset.

> **Image Content Analysis:**
> - **Left**: A photo of the Old Faithful geyser and a table of its Eruption Duration and Waiting Time.
> - **Right**: A 3x3 grid of plots showing the iterative process of a clustering algorithm (likely GMM or K-means) converging on two distinct clusters in the Old Faithful data.

---

## Page 20: Clustering (color quantisation)

> **Image Content Analysis:**
> - **Overall Description**: A series of images showing the effect of color quantization on two different pictures using clustering.
> - **Process**: The original image is on the right. Moving left, the number of colors is reduced to K=10, K=3, and K=2. This is achieved by clustering the colors in the original image and replacing each pixel's color with the centroid of its cluster.

---

## Page 21: Projection (Dimensionality Reduction)

- Reducing the number of variables – e.g. from 10 to 2.
- Visualising complex data.

> **Image Content Analysis:**
> - **Left**: A heatmap representing a 100x10 data matrix.
> - **Right**: A 2D scatter plot representing the same data after dimensionality reduction from 10 dimensions to 2.

---

## Page 22: Genes mirror geography within Europe

- **Paper**: Novembre et al. (2008) doi:10.1038/nature07331
- **Concept**: PCA was applied to genetic variation data in Europe. The resulting 2D plot of the first two principal components (PC1 and PC2) shows a remarkable resemblance to a geographic map of Europe, with individuals from the same country clustering together.

---

## Page 23-26: Course structure & Assessment

- **Topics covered**: Learning from data, Regression, Classification, Clustering, Projection, Training/validation/testing, Performance metrics, Common pitfalls, Presentation of results.
- **Structure**: 3 units of case studies taught by multiple staff.
- **Case study format**: A dataset and problem, an introduction to algorithms, a practical lab session, and a wrap-up session.
- **Assessment and feedback**:
  - Exam: 60%
  - Coursework: 40% (2 case studies)
  - Written feedback, GTA help in labs, and lecture discussions.

---

## Page 27: Don't panic! Have fun!

- A concluding slide with an encouraging message.
