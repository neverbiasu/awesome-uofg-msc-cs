# Enriched Content: MLAI4DS_CaseStudy_3.pdf

This document is a complete and detailed AI-friendly version of the presentation `MLAI4DS_CaseStudy_3.pdf` on Feature Engineering. All visual content including text, graphs, diagrams, and formulas has been meticulously transcribed and described.

---

## Page 1: Title Slide

- **Title**: Case Study 3: Feature Engineering
- **Course**: ML & AI for Data Scientists (2022)
- **Author**: Sebastian Stein
- **Website**: drsstein.github.io
- **Twitter**: @ssteinuk
- **Note**: A QR code is present with a link to the slides: https://tinyurl.com/sp7ky24w

---

## Page 2-3: Overview

1.  **Case Study 3: Predicting Central Neuropathic Pain**
2.  **What is Feature Engineering?**
3.  **Feature Selection**
    3.1. Filtering Methods
    3.2. Wrapper Methods
    3.3. Embedding Methods
4.  **Feature Extraction**

---

## Page 4-6: Predicting Central Neuropathic Pain

**Problem Context**
- Approximately 50% of people with Spinal Cord Injury (SCI) have Central Neuropathic Pain (CNP).
- Symptoms include: Pain in response to non-painful stimuli, episodic (electric shock), "pins and needles", numbness.
- There is currently no treatment, only prevention.
- Preventative medications have strong side-effects.

**Motivation**
- Predicting whether a patient is likely to develop pain is useful for selective treatment.
- Manual assessment is time-consuming, error-prone, and somewhat subjective.
- There is some evidence that brain Electroencephalogram (EEG) data has characteristic markers.
- We have a (small) dataset with EEG from SCI patients, of which some later developed CNP.
- The data is extremely high-dimensional, so it is very hard for a classifier to tell them apart.

**Core Question**
- Can feature engineering help to predict - better than random guessing - who later develops CNP?

---

## Page 7: What is Electroencephalogram (EEG)

> **Image Content Analysis:**
> - **Overall Description**: Two images illustrating EEG data collection and the resulting signals.
> - **Left Image**: A photograph of a person wearing an EEG cap with multiple electrodes attached to their scalp.
> - **Right Image**: A plot showing multiple time-series signals, representing the electrical activity recorded from different EEG electrodes over time.

---

## Page 8: Case Study 3: Dataset

- **Participants**: N=18 participants with SCI.
  - 8 participants did not develop CNP within 6 months (PNP or 'negative').
  - 10 participants developed CNP within 6 months (PDP or 'positive').
- **Data Collection**:
  - 48 electrode EEG, recording electrical activity of the brain at 250 Hz.
  - Participants were asked to relax with eyes closed (EC) and eyes opened (EO).
  - Segments of data with 5 second length were recorded with 10 "repetitions" per participant.
  - 180 labeled data points (18 participants with 10 repetitions each) are available in total.

---

## Page 9: Raw Data - Single Electrode (Patient with Pain)

> **Image Content Analysis:**
> - **Overall Description**: A plot showing a raw EEG signal from a single electrode for a patient who will later develop pain.
> - **Graph Analysis**:
>   - **Title**: Patient who will develop pain
>   - **Y-axis Label**: voltage
>   - **Y-axis Ticks**: -20, -15, -10, -5, 0, 5, 10, 15, 20.
>   - **X-axis Label**: timestamp t (at 250Hz)
>   - **X-axis Ticks**: 0, 200, 400, ..., 2000.
>   - **Data**: A noisy, fluctuating time-series signal is shown.

---

## Page 10: Raw Data - Single Electrode (Patient without Pain)

> **Image Content Analysis:**
> - **Overall Description**: A plot showing a raw EEG signal from a single electrode for a patient who will *not* develop pain.
> - **Graph Analysis**:
>   - **Title**: Patient who will not develop pain
>   - **Y-axis Label**: voltage
>   - **Y-axis Ticks**: -30, -20, -10, 0, 10, 20, 30.
>   - **X-axis Label**: timestamp t (at 250Hz)
>   - **X-axis Ticks**: 0, 200, 400, ..., 2000.
>   - **Data**: A similar noisy, fluctuating time-series signal is shown. Visually, it is difficult to distinguish from the signal on the previous page.

---

## Page 11: Frequency Spectrum

> **Image Content Analysis:**
> - **Overall Description**: Two plots comparing the EEG frequency spectrum for PNP (no pain) and PDP (pain) groups with their eyes closed.
> - **Left Plot Analysis**:
>   - **Title**: PNP Eyes Closed
>   - **Y-axis**: Power(uV²/Hz), ticks from 0 to 18.
>   - **X-axis**: Frequency (Hz), ticks from 0 to 30.
>   - **Content**: A power spectrum plot with a very strong, sharp peak centered at approximately 10 Hz (the Alpha band).
> - **Right Plot Analysis**:
>   - **Title**: PDP Eyes Closed
>   - **Y-axis**: Power(uV²/Hz), ticks from 0 to 18.
>   - **X-axis**: Frequency (Hz), ticks from 0 to 30.
>   - **Content**: A power spectrum plot that also shows a peak around 10 Hz, but it is visibly lower and broader compared to the PNP group.

---

## Page 12: Frequency Spectrum (2)

> **Image Content Analysis:**
> - **Overall Description**: Two plots comparing the EEG frequency spectrum for PNP and PDP groups with their eyes open.
> - **Left Plot Analysis (PNP Eyes Opened)**: The plot shows a much-reduced power peak in the 10 Hz alpha band compared to the eyes-closed condition.
> - **Right Plot Analysis (PDP Eyes Opened)**: This plot also shows a reduced alpha band peak, similar to the PNP eyes-opened condition.

---

## Page 13: Frequency Band Power

> **Image Content Analysis:**
> - **Overall Description**: Two plots showing the PNP frequency spectrum, with key frequency bands (Theta, Alpha, Beta) marked.
> - **Graph Analysis**: Vertical lines are drawn on the frequency spectrum plots to delineate different bands:
>   - **θ (Theta) band**: Roughly 4-8 Hz.
>   - **α (Alpha) band**: Roughly 8-13 Hz, where the main peak is located.
>   - **β-band (Beta)**: Roughly 13-30 Hz.

---

## Page 14: Case Study 3: Bandpower by Electrode Position

> **Image Content Analysis:**
> - **Overall Description**: Six topographical maps of the scalp, showing the distribution of power in different frequency bands (Theta, Alpha, Beta) for the two patient groups (PNP and PDP).
> - **Structure**: A 2x3 grid of images.
>   - **Rows**: Top row is PNP, bottom row is PDP.
>   - **Columns**: Left column is Theta band, middle is Alpha band, right is Beta band.
> - **Observation**: The colors represent power intensity (e.g., blue is low, red/yellow is high). A clear difference is visible in the Alpha band, where the PNP group shows much higher power (more blue) across the scalp compared to the PDP group.

---

## Page 15-16: Case Study 3: Task & Requirements

- **Task**: Devise a feature engineering strategy.
- **Data**: 
  - Preprocessing already applied (denoising, segmentation, band power estimation).
  - 180 rows (18 subjects x 10 reps) x 432 columns (9 features x 48 electrodes).
- **Objective Measure**: Leave-one-subject-out cross-validation accuracy, sensitivity, and specificity.
- **Report**: Describe the strategy and provide evidence for why it is better than others.
- **Requirements**:
  - Compare at least 2 feature selection methods.
  - Combine each with at least 2 classifiers (e.g., SVM, KNN).
  - Use Leave-one-group-out cross-validation.
  - Use cross-validation to optimize hyper-parameters.
  - Evaluate against a baseline (no feature selection).

---

## Page 17-22: What is Feature Engineering?

- **Definition**: The process of transforming raw data into something that better represents the learning problem to the predictive model, resulting in improved generalization to unseen data.
- **Quote**: "...the most important factor is the features used." [Pedro Domingos]
- **Diagram (Page 18)**: A cyclical diagram showing the process: Import -> Tidy -> [Transform -> Visualise -> Model] -> Communicate. This cycle is labeled "Understand".
- **Features**: An individual measurable property or characteristic.
- **Learning Problem**: `argmin_θ L( y_i, f( Φ(x_i), θ) )` where `Φ(x_i)` represents the feature transformation.
- **Guiding Questions**: What information to ignore, retain, and how to represent it.
- **Curse of Dimensionality**: Explains why keeping all features is challenging. In high-dimensional spaces, data becomes sparse and distances become indistinguishable.

---

## Page 23-32: Curse of Dimensionality Illustrated

> **Image Content Analysis:**
> - **Overall Description**: A series of 10 histograms showing the distribution of distances between random points in a D-dimensional unit cube, for D = 1, 2, 4, 16, 64, 256, 1024, 4096, 16384, and 65536.
> - **Observation**: As the dimension `D` increases, the distribution of distances becomes narrower and shifts to the right. In very high dimensions, all points are far away from each other, and their distances are very similar, making distance-based methods like KNN less effective.

---

## Page 33-43: Distractors & Class Separability

> **Image Content Analysis:**
> - **Overall Description**: A series of plots illustrating how adding non-informative "distractor" dimensions makes it harder to separate two classes of data.
> - **Page 34**: Shows two distinct classes in 2D space. A histogram on the right shows that the "within-class distances" and "between-class distances" are well-separated.
> - **Pages 36-43**: A series of histograms for D=4, 16, 64, 256, etc. As the number of dimensions `D` increases, the distributions of within-class and between-class distances start to overlap significantly, making the classes much harder to distinguish based on distance.

---

## Page 44-51: Which features are useful?

- **Concept**: A series of images using a clock face to illustrate that the usefulness of features depends on the task.
  - **Task: What time is it?** -> Feature: The position of the hour and minute hands. (`[x_start, y_start, x_end, y_end]`)
  - **Task: Is this a clock?** -> Features might be the circular shape, the numbers, etc.
  - **Task: What year was it built?** -> Features might be the style, material, etc.
- **Invariance**: Good features often have desired qualities like translation, scale, and orientation invariance.
- **Polar Coordinates**: An example of transforming Cartesian coordinates `(x, y)` into polar coordinates `(r, φ)` to achieve certain invariances.

---

## Page 52-82: Feature Selection & Extraction Methods

This section provides a detailed, multi-page overview of different methods.

- **Feature Selection**: Finding relevant subsets of features.
  - **Filtering Methods**: Rank features by a relevance score (e.g., Pearson Correlation, Chi-Square). Pages 55-57 show graphs of p-values and feature relevance for the case study.
  - **Wrapper Methods**: Greedily build and evaluate feature sets using a predictive model. Pages 58-78 show a detailed, iteration-by-iteration example of "Backward Electrode Elimination" using bar charts to display cross-validation accuracy as each electrode is removed.
  - **Embedding Methods**: The model selects features during learning (e.g., L1 regularization). Page 82 shows a graph of feature importance from an L1 model.

- **Feature Extraction**: Constructing features manually.
  - **Categorical Data**: One-hot encoding.
  - **Timestamps**: Extracting day of week, rush hour, etc.
  - **Aggregation**: Bag of Words (Page 86), Bag of Visual Words (Page 87).
  - **Cropping**: Sliding Window over time-series data (Page 88).
  - **Aggregation**: Empirical Cumulative Density Function (ECDF) (Pages 90-97).
  - **Normalization**: Standardisation, Min-Max, Scaling to unit length (Page 98).
  - **Projection**: PCA, SVD (Pages 99-104).

---

## Page 105: Summary

- **Case Study 3**: Prediction Central Neuropathic Pain
- **What is Feature Engineering?**: Transforming data.
- **Feature Selection**: Filtering, Wrapper, Embedding methods.
- **Feature Extraction**: Tabular, Cropping, Aggregation, Normalization, Projection.
