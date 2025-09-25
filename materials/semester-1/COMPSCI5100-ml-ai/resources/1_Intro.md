# 1_Intro

COMPSCI 5100  ML & AI for Data Science  Ali Gooya  ali.gooya@glasgow.ac.uk  Dr. Tanaya Guha  University   of   Glasgow
Dr. T Guha University of Glasgow  Unit 2: Classi fi cation
University of Glasgow  Classi fi cation = Automatically label data  Sentiment analysis Face recognition  Automatic speech recognition (ASR)  hello welcome   not   speech
University of Glasgow  Learning Objectives  •   To be able to formulate a problem to a  classi fi cation task  •   To understand the components of a classi fi er  •   To be able to evaluate a classi fi er’s performance
University of Glasgow  Classi fi cation: Part I
University of Glasgow  ML paradigms  [AI   ML, but in today’s world ML and AI are often synonymous]  Machine Learning paradigms  •   Supervised  •   need labelled training data  •   Semi-supervised  •   some labelled training data  •   Unsupervised /   Self-supervised  •   no labelled training data is needed  ≠
University of Glasgow  Supervised learning paradigm  •   Observe   a set of examples:  •   Training data   (measurements of any kind)=  •   Lables  •   Model   the relationship between data and labels  •   Predict   the label for new data ( test data )  x  =   y  ML System  y   =   F ( x   |   θ )  Data  Labels  θ   y t e s t   =   F ( x t e s t   |   θ )
University of Glasgow  Classi fi cation vs. Regression  Classi fi cation  •   Lables   =   y   is   discrete  •   For example,   y   identi fi es an image as:   dog, cat, mouse   (class)  •   As the number of classes increase, di ffi culty of a classi fi cation  task increases  Regression  •   Lables   =   y   is   continuous  •   For example,   y   predicts the price of houses in Glasgow  Can we transform a regression task to a classi fi cation task?
University of Glasgow  Components of a classi fi cation system  1.   Labeled data for training  2.   Features   (hand crafted for traditional ML, learned in DL)  3.   Model  4.   Evaluation metrics
Dog  classi fi cation  feature design  x  D ( x )  x 0   F ( x 0 | ✓ )  y  Traditional machine learning  Dog  feature learning & classi fi cation  M ( x | ✓ )  x   y  Deep learning  Components of a classi fi cation system
University of Glasgow  Example  Task:   Build a classi fi cation system to identify   oranges   and   lemons  (not necessarily using images)
University of Glasgow  Example  Step 1:   Decide which attributes can you measure  •   weight  •   shape  •   colour (images)  Task:   Build a classi fi cation system to identify   oranges   and   lemons
University of Glasgow  Example  Step 2:   Collect data to create training set  Task:   Build a classi fi cation system to identify   oranges   and   lemons
University of Glasgow  (Ideal) Training data  •   ML models can not recognise data they do not see  •   Need a (large) set of training data  •   Balanced samples across classes  •   Not noisy (accurate measurement)  •   Varied examples for each class
University of Glasgow  Example  Step 3:   Extract features  Task:   Build a classi fi cation system to identify   oranges   and   lemons
University of Glasgow  Features  Feature 1  Feature 2
University of Glasgow  Example  Step 4:   Build ML Model (classi fi er)  Task:   Build a classi fi cation system to identify   oranges   and   lemons
University of Glasgow  Features  Features = Representation of Data  •   Features have high impact on model performance  •   For classi fi cation, features should be   discriminative  •   Depends on data type (modality): image, text …  •   Need s   domain knowledge  •   Depends on application  •   Usually di ffi cult to identify the ‘right’ set of features  •   Rely on prior work, Trial and error  •   Systematic ‘selection’ of features
University of Glasgow  Features example: Bag of Words (BoW)  Features depend on data type
University of Glasgow  Summary: Part I  •   Learning paradigms  •   supervised, unsupervised, semi-supervised  •   Components of a Classi fi cation System  •   Data, features, model, evaluation metrics  •   Model and Evaluation metrics coming up
