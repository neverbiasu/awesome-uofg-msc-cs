# Enriched Content: 2022_Case_Study_3.ipynb

This document is a complete and detailed AI-friendly version of the Jupyter Notebook `2022_Case_Study_3.ipynb`. All markdown cells, code cells, and plot outputs have been meticulously transcribed and described.

---

### Case Study 3

#### Predicting Central Neuropathic Pain (CNP) in people with Spinal Cord Injury (SCI) from Electroencephalogram (EEG) data.

- CNP is pain in response to non-painful stimuli, episodic (electric shock), “pins and needles”, numbness
- There is currently no treatment, only prevention
- Preventative medications have strong side-effects
- Predicting whether a patient is likely to develop pain is useful for selective treatment

#### Task
Your task is to devise a feature engineering strategy which, in combination with a classifier of your choice, optimizes prediction accuracy.

#### Data
The data is preprocessed brain EEG data from SCI patients recorded while resting with eyes closed (EC) and eyes opened (EO).
- 48 electrodes recording electrical activity of the brain at 250 Hz
- 2 classes: subject will / will not develop neuropathic pain within 6 months
- 18 subjects: 10 developed pain and 8 didn’t develop pain
- the data has already undergone some preprocessing
  - Signal denoising and normalization
  - Temporal segmentation
  - Frequency band power estimation
  - Normalization with respect to total band power
  - Features include normalized alpha, beta, theta band power while eyes closed, eyes opened, and taking the ratio of eo/ec.
- the data is provided in a single table ('data.csv') consisting of
  - 180 rows (18 subjects x 10 repetitions), each containing
  - 432 columns (9 features x 48 electrodes)
  - rows are in subject major order, i.e. rows 0-9 are all samples from subject 0, rows 10-19 all samples from subject 1, etc.
  - columns are in feature_type major order, i.e. columns 0-47 are alpha band power, eyes closed, electrodes 0-48
  - feature identifiers for all columns are stored in 'feature_names.csv'
  - 'labels.csv' defines the corresponding class (0 or 1) to each row in data.csv

#### Objective Measure
Leave one subject out cross-validation accuracy, sensitivity and specificity.

#### Report
Report on your feature engineering pipeline, the classifier used to evaluate performance, and the performance as mean and standard deviation of accuracy, sensitivity and specificity across folds. Give evidence for why your strategy is better than others.

#### Requirements

- compare at least 2 feature selection methods (groups of 5-6: at least 4)
  - filtering methods (at least one scoring function)
  - wrapper methods (at least one, e.g., forward feature selection or backward feature elimination)
  - embedding methods (at least one, e.g., L1 regularisation)
- combine each method with at least 2 classifiers
  (justify your choice of classifiers in the report)
  - SVM
  - KNN
  - ...
- perform Leave-one-group-out cross-validation, where all 10 samples from each subject are in one group (18 groups in total)
- use cross-validation to optimise hyper-parameter values
- as a baseline for comparison, evaluate each of your classifiers trained on the full set of features (trained without feature selection)

---

### Code Block 1: Imports

```python
import csv
import numpy as np

from matplotlib import pyplot as plt
```

---

### Code Block 2: Load Data

```python
# load data
# rows in X are subject major order, i.e. rows 0-9 are all samples from subject 0, rows 10-19 all samples from subject 1, etc.
# columns in X are in feature_type major order, i.e. columns 0-47 are alpha band power, eyes closed, electrodes 0-48
# feature identifiers for all columns in X are stored in feature_names.csv
X = np.loadtxt('data.csv', delimiter=',') 
y = np.loadtxt('labels.csv', delimiter=',')
with open('feature_names.csv') as f:
    csvreader = csv.reader(f, delimiter=',')
    feature_names = [row for row in csvreader][0]
```

---

### Code Block 3: Data Visualization

```python
# plotting data in 2D with axes sampled 
# a) at random 
# b) from same electrode
# c) from same feature type
num_features = 9
num_electrodes = 48

# a) indices drawn at random
i0, i1 = np.random.randint(0, X.shape[1], size=2)

fig, axes = plt.subplots(1, 3, figsize=(24, 6))
colors = ['blue', 'red']

# select features i0, i1 and separate by class
X00, X01 = X[y==0][:,i0], X[y==1][:,i0]
X10, X11 = X[y==0][:,i1], X[y==1][:,i1]

# plot cumulative distribution of feature i0 separate for each class
axes[0].hist(X00, bins=20, label='y=0, '+ feature_names[i0], density=True, alpha=0.5)
axes[0].hist(X01, bins=20, label='y=1, '+ feature_names[i0], density=True, alpha=0.5)
axes[0].hist(X10, bins=20, label='y=0, '+ feature_names[i1], density=True, alpha=0.5)
axes[0].hist(X11, bins=20, label='y=1, '+ feature_names[i1], density=True, alpha=0.5)
axes[0].set_title('histograms')
axes[0].legend()

axes[1].plot(np.sort(X00), np.linspace(0,1,X00.shape[0]), label='y=0, '+ feature_names[i0], alpha=0.5)
axes[1].plot(np.sort(X01), np.linspace(0,1,X01.shape[0]), label='y=1, '+ feature_names[i0], alpha=0.5)
axes[1].plot(np.sort(X10), np.linspace(0,1,X10.shape[0]), label='y=0, '+ feature_names[i1], alpha=0.5)
axes[1].plot(np.sort(X11), np.linspace(0,1,X11.shape[0]), label='y=1, '+ feature_names[i1], alpha=0.5)
axes[1].set_title('empirical cumulative distribution functions')
axes[1].legend()

axes[2].scatter(X00, X10, label='y=0')
axes[2].scatter(X01, X11, label='y=1')
axes[2].set_xlabel(feature_names[i0])
axes[2].set_ylabel(feature_names[i1])
axes[2].set_title('scatter plot')
axes[2].legend()
```

> **Plot Output Analysis:**
> - **Overall Description**: This code generates a figure with three subplots to visualize the data and assess feature separability.
> - **Plot 1 (Left - Histograms)**: Displays overlapping histograms for two randomly selected features, separated by class. This helps visualize the distribution of each feature for each class.
> - **Plot 2 (Center - ECDFs)**: Displays the Empirical Cumulative Distribution Functions for the same two features. The separation between the curves for class 0 and class 1 indicates how well a feature can distinguish between the classes.
> - **Plot 3 (Right - Scatter Plot)**: Shows a 2D scatter plot of the two selected features against each other, with points colored by their class label. This helps visualize if the two features together can separate the classes in 2D space.
