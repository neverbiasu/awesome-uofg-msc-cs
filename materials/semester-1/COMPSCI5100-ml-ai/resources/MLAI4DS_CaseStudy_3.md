# MLAI4DS_CaseStudy_3

Case Study 3 Feature Engineering  ML & AI for Data Scientists (2022)  Sebastian Stein  drsstein.github.io @ssteinuk  1  Scan to access these slides on Google Drive or go to https://tinyurl.com/sp7ky24w
Overview  1.   Case Study 3 2.   What is Feature Engineering? 3.   Feature Selection  3.1.   Filtering Methods 3.2.   Wrapper Methods 3.3.   Embedding Methods  4.   Feature Extraction  2
Overview  1.   Case Study 3: Predicting Central Neuropathic Pain 2.   What is Feature Engineering? 3.   Feature Selection  3.1.   Filtering Methods 3.2.   Wrapper Methods 3.3.   Embedding Methods  4.   Feature Extraction  3
Approximately 50% of people with Spinal Cord Injury (SCI) have Central Neuropathic Pain (CNP). ●   Pain in response to non-painful stimuli, episodic (electric shock), “pins and needles”, numbness ●   There is currently no treatment, only prevention ●   Preventative medications have strong side-effects  4  Predicting Central Neuropathic Pain
Approximately 50% of people with Spinal Cord Injury (SCI) have Central Neuropathic Pain (CNP). ●   Pain in response to non-painful stimuli, episodic (electric shock), “pins and needles”, numbness ●   There is currently no treatment, only prevention ●   Preventative medications have strong side-effects Predicting whether a patient is likely to develop pain is useful for selective treatment ●   Manual assessment is time-consuming, error-prone and somewhat subjective ●   There is some evidence that brain Electroencephalogram (EEG) data has characteristic markers ●   We have a (small) dataset with EEG from SCI patients, of which some later developed CNP ●   The data is extremely high-dimensional, so it is very hard for a classifier to tell them apart  5  Predicting Central Neuropathic Pain
Approximately 50% of people with Spinal Cord Injury (SCI) have Central Neuropathic Pain (CNP). ●   Pain in response to non-painful stimuli, episodic (electric shock), “pins and needles”, numbness ●   There is currently no treatment, only prevention ●   Preventative medications have strong side-effects Predicting whether a patient is likely to develop pain is useful for selective treatment ●   Manual assessment is time-consuming, error-prone and somewhat subjective ●   There is some evidence that brain Electroencephalogram (EEG) data has characteristic markers ●   We have a (small) dataset with EEG from SCI patients, of which some later developed CNP ●   The data is extremely high-dimensional, so it is very hard for a classifier to tell them apart.  Can feature engineering help to predict - better than random guessing - who later develops CNP?  6  Predicting Central Neuropathic Pain
7  What is Electroencephalogram (EEG)
Participants: N=18 participants with SCI ●   8 participants did not develop CNP within 6 months after data collection (PNP or ‘negative’) ●   10 participants developed CNP within 6 months after data collection (PDP or ‘positive’) Data Collection ●   48 electrode EEG, recording electrical activity of the brain at 250 Hz ●   participants were asked to relax with eyes closed (EC) and eyes opened (EO) ●   Segments of data with 5 second length were recorded with 10 "repetitions” per participant ●   180 labeled data points (18 participants with 10 repetitions each) are available in total  8  Case Study 3: Dataset
Raw Data - Single Electrode  9
10  Raw Data - Single Electrode (2)
Frequency Spectrum  11
Frequency Spectrum (2)  12
Frequency Band Power  13  𝜃   𝛼   𝛽 -band
Case Study 3: Bandpower by Electrode Position  14  Theta   Alpha   Beta  PNP  PDP
Case Study 3: Task  15  Your task is to devise a feature engineering strategy.  Data  ●   preprocessing already applied ○   signal denoising and normalization ○   temporal segmentation ○   frequency band power estimation  ●   180 rows (18 subjects x 10 repetitions) x 432 columns (9 features x 48 electrodes)  Objective Measure  Leave one subject out cross-validation accuracy, sensitivity and specificity  Report  Describe your feature engineering strategy and give evidence for why your strategy is better than others.
Case Study 3: Requirements  16  Compare at least 2 feature selection methods (groups of 5-6: at least 4) -   filtering methods (at least one scoring function) -   wrapper methods (at least one, e.g., forward feature selection or backward feature elimination) -   embedding methods (at least one, e.g., L1 regularisation) Combine each method with at least 2 classifiers (justify your choice of classifiers in the report) -   SVM -   KNN -   ... Perform Leave-one-group-out cross-validation, where all 10 samples from each subject are in one group Use cross-validation to optimise hyper-parameter values As a baseline for comparison, evaluate each of your classifiers trained on the full set of features (trained without feature selection)
Overview  1.   Case Study 3 2.   What is Feature Engineering? 3.   Feature Selection  3.1.   Filtering Methods 3.2.   Wrapper Methods 3.3.   Embedding Methods  4.   Feature Extraction  17
What is Feature Engineering?  Source: Garrett Grolemund and Hadley Wickham,   R for Data Science,   https://r4ds.had.co.nz/ [1] https://vita.had.co.nz/papers/tidy-data.html  18  [1]
What is Feature Engineering?  Feature engineering is the process of transforming raw data into something that better represents the learning problem to the predictive model, resulting in improved generalization to unseen data. “... some machine learning projects succeed and some fail. What makes the difference? Easily the most important factor is the features used.” [Pedro Domingos]  19
What do we mean by features?  A feature is an individual measurable property or characteristic of a phenomenon being observed. Training data   {(x   i   , y   i   )}   N Features   Φ(x   i   ) Model   f( Φ(x   i   ), θ) Learning problem   argmin   θ   L( y   i   , f( Φ(x   i   ), θ) )  20
What is Feature Engineering?  ●   Encoding prior knowledge we have about the data domain and the problem ●   Guiding questions  ○   Which information can be ignored? ○   Which information should be retained? ○   How should retained information be represented?  ●   Answers to these questions depend on  ○   Data domain ○   Problem to be solved ○   Predictive model  ●   Some feature engineering methods are specific to the data and problem domains.  But there are common techniques!  21
Why don’t we just keep everything?  High-dimensional spaces are challenging to work with.  Curse of Dimensionality: strange things happen in very high-dimensional spaces  ●   A fixed number of datapoints occupy a fraction of the space that decreases exponentially with the number of dimensions. ●   The portion of a volume near the surface increases in the number of dimensions. ●   Distances between points become increasingly indistinguishable  22
23  distance  density
24  distance  density
25  distance  density
26  distance  density
27  distance  density
28  distance  density
29  distance  density
30  distance  density
31  distance  density
32  distance  density
33  Distractors
34  Distractors  distance
35  Distractors
36  distance  density
37  distance  density
38  distance  density
39  distance  density
40  distance  density
41  distance  density
42  distance  density
43  distance  density
Which features are useful?  what time is it?  44
Which features are useful?  What time is it? -   Hour hand is sufficient to tell time  45
Which features are useful?  What time is it? -   Hour hand is sufficient to tell time -   Assume we had an hour hand detector What qualities does a good representation have? -   Geometry of the problem -   Translation invariance -   Scale invariance -   Orientation invariance  x 0  x 1   x start  x end  46
Which features are useful?  What time is it? -   Hour hand is sufficient to tell time -   Assume we had an hour hand detector Polar coordinate representation Scale invariance Orientation Invariance, assuming some reference angle x 0  x 1   x start  x end  47
Are the same features useful for different tasks?  Is this a clock or pressure gauge?  48
Which features are useful?  What year was the clock built?  49
Which features are useful?  How will this image look 5 minutes later?  50
Which features are useful?  How does the surrounding context look?  51
Overview  1.   Case Study 3 2.   What is Feature Engineering? 3.   Feature Selection: Finding Relevant Subsets of Features  3.1.   Filtering Methods 3.2.   Wrapper Methods 3.3.   Embedding Methods  4.   Feature Extraction  52
Feature Selection  Context  Dataset with D features per datapoint.  Goal  Find the subspace of M << D features with minimal error on hold-out set. -   Brute-force subset evaluation is exponential in the number of features (NP-hard problem) -   Heuristics  -   Filtering: use surrogate measure and test individual features’ relevance -   Wrappers: greedily build feature set and evaluate using predictive model -   Embedding: predictive model selects features during learning process (e.g., LASSO)  53
Filtering Methods  Idea: 1.   Measure   relevance   of individual feature for dependent variable. 2.   Rank features by relevance 3.   Keep top K relevant features; k could be chosen via cross-validation Statistical tests used as relevance scores: ●   Pearson Correlation ●   Chi-Square ●   Mutual Information ●   t-test / ANOVA  54
Filtering: Case Study 3  55
Filtering: Case Study 3  56
Filtering: Case Study 3  57
Wrapper Methods  Backward feature elimination  1.   Initialize the feature set F to include all features F   0 : {f   0 , f   1 , …, , f   M-1 } and evaluate performance 2.   Evaluate performance with feature sets F\f   i   , removing a single feature f   i   from F. 3.   Update F to exclude f   i   for the one feature that maximally maintained or increased performance. 4.   Repeat steps 2 and 3 until a.   Performance degrades b.   Target number of features is reached  58
Backward Electrode Elimination: Case Study 3  59  Iteration 1  baseline performance
60  Iteration 1  baseline performance  Removing any of these electrodes improves performance
61  Iteration 1  baseline performance  Removing electrode 4
62  Iteration 2  new baseline performance
63  Iteration 2  new baseline performance  Removing any of these electrodes improves performance
64  Iteration 2  new baseline performance  Removing electrode 5
65  Iteration 3  new baseline performance
66  new baseline performance  Removing any of these electrodes does not degrade performance.  Iteration 3
67  new baseline performance  Removing electrode 13 Iteration 3
68  unchanged baseline performance  Iteration 4   Removing any of these electrodes does not degrade performance.
69  unchanged baseline performance  Iteration 4   Removing electrode 14
70  unchanged baseline performance  Iteration 5   Removing electrode 22
71  unchanged baseline performance  Iteration 6   Removing electrode 23
72  unchanged baseline performance  Iteration 7   Removing electrode 31
73  unchanged baseline performance  Iteration 8   Removing electrode 32
74  unchanged baseline performance  Iteration 9   Removing electrode 34
75  unchanged baseline performance  Iteration 10   Removing electrode 40
76  unchanged baseline performance  Iteration 11   Removing electrode 41
77  unchanged baseline performance  Iteration 12   Removing electrode 43
78  unchanged baseline performance  Iteration 13   STOPPING HERE removing any additional electrode would degrade performance.
Wrapper Methods - Variants  Backward feature elimination  1.   Initialize the feature set F to include all features F   0 : {f   0 , f   1 , …, , f   M-1 } and evaluate performance 2.   Evaluate performance with feature sets F\f   i   , removing a single feature f   i   from F. 3.   Update F to exclude f   i   for the one feature that maximally maintained or increased performance. 4.   Repeat steps 2 and 3 until a.   Performance degrades b.   Target number of features is reached  Forward feature selection  Same in reverse: evaluate classifier with each feature individually, add feature and repeat.  Prioritized selection/ elimination  Add/ remove features in order determined by some feature scoring method.  79
Filtering vs. Wrapper  The main differences between the filter and wrapper methods for feature selection are:  ●   Filter methods are much faster compared to wrapper methods as they do not involve training the models. ●   Filter methods measure the relevance of features by their correlation/ mutual information with dependent variable. ●   Wrapper methods measure the usefulness of a subset of features by actually training a model on it. ●   Filter methods use statistical methods for evaluation of features ●   Wrapper methods use cross validation. ●   Feature selection using wrapper methods risk making the model more prone to overfitting.  80
Embedding  Objectives with weight regularization favour solutions with specific weight characteristics. ●   L   1   regularization induces sparsity ●   L   2   regularization keeps weights near zero Absolute value of the weights indicates classifier sensitivity to feature values.  81
Embedding using L   1 : Case Study 3  82
Overview  1.   Case Study 1 2.   What is Feature Engineering? 3.   Feature Selection  3.1.   Filtering Methods 3.2.   Wrapper Methods 3.3.   Embedding Methods  4.   Feature Extraction: Constructing Features Manually  83
Tabular Data: Categorical Data  Categorical data cannot be interpreted by numerical models directly ●   Mapping onto numerical ‘index’ variables is problematic  ○   Numbers are arbitrary, predictive function almost always non-linear in the mapping ○   Distance-based methods assume triangle inequality is valid  ●   Transform categorical data into one-hot encoding  84  is_car  is_book  is_cat
Tabular Data: Timestamps  ●   Timestamps represented as seconds since 01.01.1970 UTC (UNIX Epoch) ●   Predictive functions are usually non-linear in raw timestamps (e.g., bicycle rental demand). ●   Transforming the data into something more useful is trivial ●   Only retain time information that’s pertinent to your modelling problem.  ○   Time of day (routines), day of week (restaurants), month (seasonal adjustment) ○   Rush hour yes/ no (traffic) ○   Time since last event (customer retention) ○   Time as an aggregator (spend per month; customer value)  85
Aggregation: Bag of Words  86
Aggregation: Bag of Visual Words  87  Dictionary of K “visual words” often learned using K-means clustering
Cropping: Sliding Window  88  Running/ Walking/ Cycling?
Aggregation  89
Aggregation: Empirical Cumulative Density Function  90
Aggregation: Empirical Cumulative Density Function  91
Aggregation: Empirical Cumulative Density Function  92
Aggregation: Empirical Cumulative Density Function  93
Aggregation: Empirical Cumulative Density Function  94
Aggregation: Empirical Cumulative Density Function  95
Aggregation: Empirical Cumulative Density Function  96
Aggregation: Empirical Cumulative Density Function  97
Normalization  ●   Raw data value ranges can vary wildly. ●   Distances and objectives become governed by features with large values Standardisation  Min-Max normalization  Scaling to unit length  98
Projection  How much of the input space does the data occupy? ●   Set of face images among all possible images of 100 x 100 pixels. ●   Set of English language utterances among all possible 16kHz audio. ●   Set of human hand gestures among all possible 2 second accelerometer data. Projection Methods ●   PCA ●   SVD ●   Randomized variants ●   See also non-linear projection methods (e.g., autoencoders)  99
Projection: Principal Component Analysis (PCA)  https://stats.stackexchange.com/questions/2691/making-sense-of-principal-c omponent-analysis-eigenvectors-eigenvalues   100
Eigenfaces  Top Eigenvectors (Eigenfaces) Mean Face  101
Eigenfaces  Encoding =   + 0.8   + -0.2   + … ●   Faceness of an image (reconstruction error) ●   Recognition (nearest neighbour) ●   Classification (via attribute labels)  102
PCA: Case Study  103
PCA: Case Study  104
Summary  1.   Case Study 3: Prediction Central Neuropathic Pain 2.   What is Feature Engineering?  Transforming data to facilitate downstream machine learning tasks  3.   Feature Selection: Finding Relevant Subsets of Features  3.1.   Filtering Methods (rank features, keep top k) 3.2.   Wrapper Methods (greedy forward/ backward selection) 3.3.   Embedding Methods (LASSO)  4.   Feature Extraction  4.1.   Tabular Data Transformations (binarization, one-hot encoding) 4.2.   Cropping (temporal sliding windows) 4.3.   Aggregation (Empirical Cumulative Density, Bag-of-Words) 4.4.   Normalization (e.g., standardisation, scaling) 4.5.   Projection (PCA)  105
