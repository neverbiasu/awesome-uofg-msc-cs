# 4_Eval

COMPSCI 5100  ML & AI for Data Science  Dr. Tanaya Guha  www.tanayag.com  Dr. Tanaya Guha  University   of   Glasgow
Dr. T Guha University of Glasgow  Classi fi cation: Part III
Dr. T Guha University of Glasgow  •   Evaluation strategy  •   How to split data for training and testing  •   Evaluation metrics  •   How to measure performance accurately  •   Benchmarking  •   Compare results against other ‘known’ results  Performance evaluation
Dr. T Guha University of Glasgow  •   Cross validation  Evaluation strategy   image from: pub.towardsai.net
Dr. T Guha University of Glasgow  Evaluation strategy  image from:   medium.com  •   Leave one subject out  •   Particularly useful for  classi fi cation tasks  involving human-  centric data
Dr. T Guha University of Glasgow  •   Cross validation  Evaluation strategy   image from: pub.towardsai.net
Dr. T Guha University of Glasgow  Evaluation strategy  •   Random train:test splits  •   Particularly useful for very large datasets  •   CV may be di ffi cult  •   Randomly choose 70-80% data for  training and rest for testing
Dr. T Guha University of Glasgow  •   Performance   metrics   are important to  •   Compare performances of multiple classi fi ers  •   Compare performance of the same classi fi er under  di ff erent conditions  •   Tune hyperparameters  •   No metric is perfect; each gives you some insights  •   Practical tip:   Use multiple evaluation metrics  Performance metrics
Dr. T Guha University of Glasgow  •   Accuracy =  •   Often expressed in %  •   Simple, intuitive, widely used  Number   of   correctly   classi fi ed   samples  Total   number   of   test   samples  Accuracy  Weighted accuracy   (WA):  Accuracies computed per class,  averaged across all classes  [Content from Dr. Ke Yuan’s slide]
Dr. T Guha University of Glasgow  Confusion matrix  True  Positives  (TP)  False  Positives  (FP)  False  Negatives  (FN)  True  Negatives  (TN)  1   0  1  0  True  Predicted  [Content from Dr. Ke Yuan’s slide]
Dr. T Guha University of Glasgow  Precision  True  Positives  (TP)  False  Positives  (FP)  False  Negatives  (FN)  True  Negatives  (TN)  1   0  1  0  True  Predicted  •   Among all people classi fi ed  as ‘diseased’, how many are  actually diseased  •   Perfect precision = no FP  •   Higher the better  Precision   =   TP  TP+FP  Example:  1: Diseased   0: Healthy
Dr. T Guha University of Glasgow  •   Among all diseased people,  how many are correctly  identi fi ed  •   Sensitivity = recall  •   Perfect recall = no FN  •   Higher the better  Sensitivity   S e   =   TP  TP+FN  Recall or Sensitivity  True  Positives  (TP)  False  Positives  (FP)  False  Negatives  (FN)  True  Negatives  (TN)  1   0  1  0  True  Predicted  Example:  1: Diseased   0: Healthy
Dr. T Guha University of Glasgow  •   Among all healthy people,  how many are classi fi ed as  healthy.  •   Higher the better  Speci fi city   S p   =   TN  TN+FP  Speci fi city  True  Positives  (TP)  False  Positives  (FP)  False  Negatives  (FN)  True  Negatives  (TN)  1   0  1  0  True  Predicted  Example:  1: Diseased   0: Healthy
Dr. T Guha University of Glasgow  Optimizing sensitivity and speci fi city  [Slide courtesy: Dr. Ke Yuan]
Dr. T Guha University of Glasgow  ROC  [Slide courtesy: Dr. Ke Yuan]
Dr. T Guha University of Glasgow  ROC, AUC  [Image from Wikipedia]  S e  1   −   S p  1   −   S p  S e   AUC
Dr. T Guha University of Glasgow  [Slide courtesy: Dr. Ke Yuan]  Try it on a breast cancer dataset  Plot ROC of a Logistic Regression model
Dr. T Guha University of Glasgow  •   Metric combining Precision and Recall  •   F1 =  •   Bounded between 0 to 1  •   Higher the better  2  Precision − 1   +   Recall − 1   =   2 T P  2 T P   +   F P   +   F N  F1
