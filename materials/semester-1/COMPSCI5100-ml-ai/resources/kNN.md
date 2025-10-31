# kNN

COMPSCI 5100  ML & AI for Data Science  Ali Gooya  Dr. Tanaya Guha  University   of   Glasgow
University of Glasgow  Classi fi cation: Part II  Some slides are adapted from those of Dr. Ke Yuan
University of Glasgow  Notations  •   training samples (raw data or features):  •   Each sample associated with a label:  •   Binary classi fi cation:   where  •   Multiclass classi fi cation:  •   Test sample:  •   Task: Assign a label   to   where  (multi-class) or   (if binary)  N   x 1 ,   x 2 ,   ⋯ x N  y 1 ,   y 2 ,   ⋯ y N  y n   ∈   { 0,1 }   n   =   1,   2 ⋯ N  y n   ∈   { 1,2, ⋯ C }  x n e w  y n e w   x n e w  y n e w   ∈   { 1,2... C }   y n   ∈   { 0,1 }
University of Glasgow  Nearest Neighbour  •   Simplest of all classi fi ers:   1-Nearest Neighbour  •   Simple idea:   Label a new sample the same as its closest data  point
University of Glasgow  1-Nearest Neighbour  Test data:  Orange  i *   =   argmin  i  d i s t ( x i ,   x n e w )  y n e w   ←   y i *
University of Glasgow  1-Nearest Neighbour  Test data:  ?
University of Glasgow  K-Nearest Neighbour
University of Glasgow  K-Nearest Neighbour
University of Glasgow  K-Nearest Neighbour
Dr. T Guha University of Glasgow  K-Nearest Neighbour
Dr. T Guha University of Glasgow  K-Nearest Neighbour
Dr. T Guha University of Glasgow  K-Nearest Neighbour
University of Glasgow  K-Nearest Neighbour
University of Glasgow  K-Nearest Neighbour
University of Glasgow  •   What is the training process?   Are we learning any  parameters?  •   ‘Training’ in K-NN = ‘Memorizing’ training data  •   How do we compute the distance between samples?  •   Any distance metric should work. Squared   L2   norm  is common for real-valued features.  •  •   Choice of distance metric may change results (but  not much).  ∥ x 1   −   x n e w ∥ 2  2   =   ∑  i  ( x 1 ( i )   −   x n e w ( i ) ) 2  K-Nearest Neighbour
Dr. T Guha University of Glasgow  K-NN (orange & lemon example)
University of Glasgow  K-NN (orange & lemon example)  5 fold cross validation  to choose K  Accuracy   =   correct   class fi ciation  total   test   sampels  Error   = 1 - accuracy
University of Glasgow  K-NN (orange & lemon example)
University of Glasgow  K-NN summary  Simple  •   Only 1 parameter to tune  •   simple to implement  •   Fast training (rather no training)  …but   ine ffi cient  •   Inference time may be large if   is large -   Not ideal  •   Large memory requirement  N
