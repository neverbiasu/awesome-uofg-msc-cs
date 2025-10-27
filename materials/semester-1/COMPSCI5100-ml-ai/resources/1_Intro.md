# Enriched Content: 1_Intro.pdf

This document is a complete and detailed AI-friendly version of the presentation `1_Intro.pdf` on the introduction to classification. All visual content including text, graphs, and diagrams has been meticulously transcribed and described.

---

## Page 1: Title Slide

- **Course**: COMPSCI 5100 - ML & AI for Data Science
- **Author**: Ali Gooya
- **Contact**: ali.gooya@glasgow.ac.uk
- **Affiliation**: University of Glasgow

---

## Page 2: Unit 2: Classification

- **Unit**: 2: Classification
- **Author**: Dr. T Guha
- **Affiliation**: University of Glasgow

---

## Page 3: Classification = Automatically label data

> **Image Content Analysis:**
> - **Overall Description**: Three examples of classification tasks.
> - **Example 1: Automatic speech recognition (ASR)**
>   - **Image**: Three audio waveforms are shown.
>   - **Labels**: The first waveform is labeled "welcome" (green). The second is labeled "hello" (green). The third, which is flatter, is labeled "not speech" (red).
> - **Example 2: Face recognition**
>   - **Image**: A photo of two individuals. Green boxes are drawn around their faces.
>   - **Labels**: The face on the left is labeled "Mike". The face on the right is labeled "Michael".
> - **Example 3: Sentiment analysis**
>   - **Image**: Three reviews, each with a corresponding emoji and label.
>   - **Review 1**: "My experience so far has been fantastic!" -> Happy Emoji -> POSITIVE label.
>   - **Review 2**: "The product is ok I guess" -> Neutral Emoji -> NEUTRAL label.
>   - **Review 3**: "Your support team is useless" -> Angry Emoji -> NEGATIVE label.

---

## Page 4: Learning Objectives

- To be able to formulate a problem to a classification task
- To understand the components of a classifier
- To be able to evaluate a classifier's performance

---

## Page 5: Classification: Part I

- Title slide for the first part of the classification lecture.

---

## Page 6: ML paradigms

- [AI ≠ ML, but in today's world ML and AI are often synonymous]
- **Machine Learning paradigms**
  - **Supervised**
    - need labelled training data
  - **Semi-supervised**
    - some labelled training data
  - **Unsupervised/ Self-supervised**
    - no labelled training data is needed

---

## Page 7: Supervised learning paradigm

- **Observe** a set of examples:
  - Training data (measurements of any kind) = x
  - Labels = y
- **Model** the relationship between data and labels
- **Predict** the label for new data (test data)

> **Image Content Analysis:**
> - **Overall Description**: A flowchart of the supervised learning process.
> - **Structural Analysis**:
>   - **Inputs**: "Data" (x) and "Labels" (y) are fed into a box labeled "ML System" which contains the function `y = F(x|θ)`.
>   - **Training**: An arrow labeled `θ` (theta, representing the learned parameters) comes out of the ML System box.
>   - **Inference**: The learned parameters `θ` are used in a new function `y_test = F(x_test|θ)` to predict the label for new, unseen test data.

---

## Page 8: Classification vs. Regression

- **Classification**
  - Lables = y is **discrete**
  - For example, y identifies an image as: *dog, cat, mouse* (class)
  - As the number of classes increase, difficulty of a classification task increases
- **Regression**
  - Lables = y is **continuous**
  - For example, y predicts the price of houses in Glasgow
- **Question**: Can we transform a regression task to a classification task?

---

## Page 9: Components of a classification system

1. Labeled data for training
2. Features (hand crafted for traditional ML, learned in DL)
3. Model
4. Evaluation metrics

---

## Page 10: Components of a classification system (Diagram)

> **Image Content Analysis:**
> - **Overall Description**: A diagram comparing the workflows of "Traditional machine learning" and "Deep learning".
> - **Top Workflow (Traditional)**:
>   1. An image of a dog is the input `x`.
>   2. An arrow points to a "feature design" block, labeled `D(x)`, represented by an icon of a person with tools, signifying a manual process.
>   3. The output is engineered features `x'`.
>   4. `x'` is fed into a simple neural network model labeled `F(x'|θ)` for "classification".
>   5. The final output is `y`, the label "Dog".
> - **Bottom Workflow (Deep Learning)**:
>   1. An image of a dog is the input `x`.
>   2. An arrow points directly to a large, complex deep neural network, labeled `M(x|θ)`. This single block is titled "feature learning & classification".
>   3. The final output is `y`, the label "Dog".
> - **Interpretation**: The diagram highlights that traditional ML requires a separate, manual feature engineering step, while deep learning models perform feature learning automatically as part of an end-to-end process.

---

## Page 11-13: Example - Oranges and Lemons

- **Task**: Build a classification system to identify **oranges** and **lemons** (not necessarily using images).
- **Step 1**: Decide which attributes can you measure
  - weight
  - shape
  - colour (images)
- **Step 2**: Collect data to create training set

---

## Page 14: (Ideal) Training data

- ML models can not recognise data they do not see
- Need a (large) set of training data
- Balanced samples across classes
- Not noisy (accurate measurement)
- Varied examples for each class

> **Image Content Analysis:**
> - **Description**: A photo showing three lemons of varying shapes and sizes, illustrating the concept of "varied examples".

---

## Page 15: Example - Step 3

- **Task**: Build a classification system to identify oranges and lemons
- **Step 3**: Extract features

---

## Page 16: Features

> **Image Content Analysis:**
> - **Overall Description**: A 2D scatter plot of features for classifying oranges and lemons.
> - **Graph Analysis**:
>   - **Type**: 2D Scatter Plot.
>   - **Y-axis Label**: height / cm (Feature 1)
>   - **X-axis Label**: width / cm (Feature 2)
>   - **Legend**: Red circles represent Oranges, Blue diamonds represent Lemons.
>   - **Data Points**: The plot shows that oranges (red circles) tend to be clustered with similar height and width, while lemons (blue diamonds) are generally taller than they are wide. The two classes are mostly separable in this feature space.
> - **Side Image**: A picture of a lemon with its height and width dimensions explicitly marked.

---

## Page 17: Example - Step 4

- **Task**: Build a classification system to identify oranges and lemons
- **Step 4**: Build ML Model (classifier)

---

## Page 18: Features

- **Features = Representation of Data**
- Features have high impact on model performance
- For classification, features should be **discriminative**
- Depends on data type (modality): image, text ...
  - Needs **domain knowledge**
- Depends on application
- Usually difficult to identify the ‘right’ set of features
  - Rely on prior work, Trial and error
  - Systematic ‘selection’ of features

---

## Page 19: Features example: Bag of Words (BoW)

- **Features depend on data type**

> **Image Content Analysis:**
> - **Overall Description**: A diagram illustrating the Bag of Words (BoW) model for text feature extraction.
> - **Workflow**:
>   1. **Input Text**: A paragraph of text is shown on the left.
>   2. **Tokenization**: An arrow points to a literal "bag" containing all the words from the text, jumbled together.
>   3. **Frequency Count**: An arrow points from the bag to a two-column table on the right, which lists each unique word and its frequency (count) in the text. For example, "it" appears 6 times, "I" appears 5 times, "the" appears 4 times, etc.
> - **Interpretation**: This shows how a piece of text is converted into a numerical feature vector based on word counts, disregarding grammar and word order.

---

## Page 20: Summary: Part I

- **Learning paradigms**
  - supervised, unsupervised, semi-supervised
- **Components of a Classification System**
  - Data, features, model, evaluation metrics
- **Model and Evaluation metrics** coming up
