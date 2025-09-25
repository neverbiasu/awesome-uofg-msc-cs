# Intro_PyTorch

Use 
PyTorch
 to build neural networks

Key Concepts in 
PyTorch
PyTorch
 is an open-source deep learning framework.
Allow flexible, dynamic computation graph, and ease of use.
PyTorch
 is widely used in both academia and industry for research and production.
Integration with Python: 
PyTorch
 operates more like a Python library than a framework.
Tensors: 
Multi-dimensional arrays that are the fundamental building blocks in 
PyTorch
.
Autograd
: 
Automatic differentiation system for computing gradients (t
hat powers neural network training)
.
NN Module: 
The core building block for creating neural networks.
Optimizers: 
Algorithms for adjusting the parameters of the network to minimize loss.

How to Install 
PyTorch
 in Anaconda with 
Conda
 or Pip
Open the Anaconda Prompt or Terminal.
Create a new 
conda
 environment for 
PyTorch
: 
conda
 create --name 
pytorch_env
3. Activate the new environment: 
conda
 activate 
pytorch_env
4. Install 
PyTorch
: 
conda
 install 
pytorch
 
torchvision
 
torchaudio
 -c 
pytorch
pip install torch 
torchvision
 
torchaudio
5. Open Python IDE to Verify the installation:
import torch 
print(
torch.__version
__)

 Example: 
Building a Simple Neural Network
Define a simple neural network with 
PyTorch's
 
nn.Module
.
Example: A fully connected network for a classification task.
e.g.:
self.fc1 = 
nn.Linear
(784, 128)  # 784 input features to 128 neurons

Linear
 is a module provided by 
PyTorch
 that applies a linear transformation to the incoming data.
Non-linear activation 
functions allow neural networks to capture complex patterns in data, which is essential for tasks like image recognition, natural language processing, and other AI applications.
Popular activation functions in 
PyTorch
Logistic
 (or 
sigmoid
) is a non-linear activation function. 
Useful for 
binary classification tasks
. It takes any input and maps it to a value between 0 and 1, making it useful for 
probability predictions
. 
Tanh
 is a non-linear activation function that 
outputs values between 
-1 
and 
1
, with a mean output of 
0
. 
Ensure that the output of a neural network layer remains centered around 0, making it useful for 
normalization
;
 
can be 
computationally expensive
 
ReLU
 (Rectified Linear Unit) 
is a non-linear activation function that outputs the input value if it is positive, or 0 if it is negative. computationally more efficient, 
well-suited for large-scale neural networks
.

Logistic
 (or 
sigmoid
) example
!pip install matplotlib 
on 
Jupyter
 Notebook will install it on Anaconda.
-10: 
This is the start value of the tensor. The first element in the tensor x will be -10.
10
: This is the end value of the tensor. The last element in the tensor x will be 10.
100
: This specifies the number of equally spaced values between -10 and 10. The tensor x will contain 100 elements.

Tanh
 Activation Function example

ReLU
 
Activation Function

Neural Network Training Process
Phase 1 - Define the loss function 
measures how well the neural network’s predictions match the actual target values. It quantifies the error in the predictions, which the training process aims to 
minimise
.
Common loss function: 
Cross-Entropy Loss 
used for classification tasks. 
Mean Squared Error (MSE
) used for regression tasks.
Phase 2 - Select an optimizer
. The optimizer updates the neural network's weights based on the gradients of the loss function with respect to the weights. The goal is to minimize the loss function by iteratively adjusting the weights.
Common 
optimizers
: 
Stochastic
 Gradient 
Descent
; Adam (Adaptive Moment Estimation)). 

Neural Network Training Process
Phase 3 - Implement
 
the training loop
: Core process where the neural network learns from data. It involves feeding input data through the network, calculating the loss, and adjusting the weights to minimize the loss. 
The steps are: 
forward pass
: Pass the input data through the network to obtain predictions.
 
outputs = model(inputs)
Compute loss
: Calculate the loss using the loss function. 
loss = criterion(outputs, targets)
backpropagation
: Compute the gradients of the loss with respect to the model's parameters. 
loss.backward
()
Update Weights
: Use the optimizer to update the weights based on the computed gradients. 
optimizer.step
()

Summary
Conda
Google 
Colab
PyTorch

