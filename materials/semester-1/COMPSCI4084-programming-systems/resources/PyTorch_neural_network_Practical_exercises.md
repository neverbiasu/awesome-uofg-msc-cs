# PyTorch_neural_network_Practical_exercises

# More practical tasks for Neural Network

__torch\.manual\_seed\(1337\)__ sets the random seed for PyTorch’s random number generator\. That means it ensures that every time you run your script, the random values generated \(for example, in torch\.randn\(\.\.\.\)\) are the same each time\.

## Loss functions

Combination

Typical Use Case

Type of Problem

MSELoss \+ Adam

Regression or continuous\-value prediction

Regression

BCELoss \+ optim\.SGD

Binary classification \(0/1 outcomes\)

Classification

### torch\.nn\.MSELoss\(\) \- Mean Squared Error Loss

This loss function measures the average squared difference between predictions and true values\. You can use it if your model predicts continuous numerical values \(e\.g\., temperature, price, risk score\)\.

You can think of it as “How far are my predictions from the true numbers on average?”

### torch\.nn\.BCELoss\(\) – Binary Cross\-Entropy Loss

This loss function measures the difference between predicted probabilities and binary labels \(0 or 1\)\. It is used when your model predicts the probability of a class \(for example, “1 = attack” or “0 = safe”\)\.

Think of it as “How close are my predicted probabilities to the true labels?”

## The Optimisers

### torch\.optim\.Adam 

Adam stands for Adaptive Moment Estimation\. This modern optimiser automatically adjusts the learning rate for each parameter based on gradient history\.

### torch\.optim\.SGD

SGD stands for Stochastic Gradient Descent\. It is the most basic and traditional optimiser\. It updates weights in the direction that reduces loss, scaled by a fixed learning rate\.

__Aspect__

__MSELoss__

__BCELoss__

__Adam__

__SGD__

__Use Case__

Regression \(predict numbers\)

Binary classification \(0/1\)

General optimiser \(adaptive\)

Basic optimiser \(manual learning rate\)

__Output expected__

Real value \(no Sigmoid\)

Probability \(0–1\)

—

—

__Speed__

—

—

Faster convergence

Slower \(but simple\)

__Tuning__

—

—

Needs fewer hyperparameter tweaks

Needs learning rate tuning

__Common combo__

MSELoss \+ Adam

BCELoss \+ SGD \(or Adam\)

—

—

# Practical Task 1: PyTorch Regression \(MSELoss \+ Adam\)

In this practical exercise, you will build and train a simple regression model using PyTorch\. You will learn how to define a neural network, generate synthetic data, use MSELoss, and train the model using the Adam optimizer\. 

## Learning Objectives

By the end of this exercise, you will be able to:

Define a custom PyTorch neural network class using torch\.nn\.Module\.

Generate synthetic training data for a regression task\.

Configure and train a model using MSELoss and the Adam optimizer\.

Track and interpret training loss across epochs\.

## Instructions

### Step 1: Data Generation

Import torch\.  
Generate feature data X with 120 samples and 8 features:  
   X = torch\.randn\(120, 8\)

Create a learnable target using the formula:  
   y = X @ w \+ b \+ noise, where w \(8×1\) and b are constants, and noise ~ N\(0, 0\.5\)\.  
Print X\.shape and y\.shape to confirm dimensions\.

### Step 2: Model Definition

Define a neural network class called RevenueNet that extends torch\.nn\.Module\.  
Include three layers:  
   \- Input: 8 neurons  
   \- Hidden: 16 → 8 neurons \(ReLU activation\)  
   \- Output: 1 neuron \(no activation\)  
Print the model architecture after initialization\.

### Step 3: Model Setup

Instantiate your RevenueNet model\.  
Use torch\.nn\.MSELoss\(\) as your loss function\.

Use the Adam optimizer with a learning rate of 0\.010\.

### Step 4: Training Loop

Train the model for 30 epochs\.  
For each epoch:  
   Compute predictions with model\(X\)\.  
   Calculate loss using the MSELoss criterion\.  
   Zero the gradients, perform backpropagation, and update model weights\.

  
Print loss after each epoch in the format:  
   Epoch 01 | Loss: 0\.123456

### Step 5: Loss Visualisation

Use matplotlib to plot the recorded training loss across epochs\. Label axes and provide a title\. Display the chart with plt\.show\(\)\.

### Step 6: Extension Activity \(Optional\)

Modify the task to deepen your understanding:  
• Change the number of epochs or learning rate and observe the effect on loss\.  
• Add another hidden layer and compare training performance\.  
• Increase the noise term to see how it affects learning stability\.

## Reflection Questions

Answer these questions after completing the exercise:

1. What does a decreasing MSE loss tell you about your model’s learning process?
2. What happens if you increase the learning rate to 0\.1? Why?
3. How does adding more noise to your target \(y\) affect training performance?
4. Why is MSELoss appropriate for regression problems instead of BCELoss?
5. In what real\-world cybersecurity scenario might regression modelling be used?

# Practical Task 2: PyTorch Classification \(BCELoss \+ SGD\)

In this practical exercise, you will build and train a small binary classification model using PyTorch\. You will learn how to define a neural network, generate synthetic binary labels \(a learnable target\), use BCELoss for classification, and train the model with the SGD optimizer\. 

## Learning Objectives

By the end of this exercise, you will be able to:

Generate synthetic features and binary targets suitable for classification\.

Define a simple feedforward neural network with Sigmoid output\.

Configure BCELoss and train using optim\.SGD\.

Track and interpret training loss during optimization\.

## Instructions

### Step 1: Data Generation \(Learnable Binary Target\)

1.  Import torch\.
2. Generate input features X with 200 samples and 4 features:  
   X = torch\.randn\(200, 4\)
3. Create a learnable binary target using a noisy logistic model:  
   w = torch\.tensor\(\[\[0\.8\],\[0\.6\],\[0\.7\],\[0\.5\]\]\)  
   b = torch\.tensor\(\[\-1\.0\]\)  
   noise = 0\.3 \* torch\.randn\(200, 1\)  
   proba = torch\.sigmoid\(X @ w \+ b \+ noise\)  \# values in \(0, 1\)  
   y = \(proba > 0\.5\)\.float\(\)                 \# binary labels \(0/1\), shape \(200,1\)
4. Print the shapes of X and y to confirm dimensions\.

### Step 2: Model Definition \(RiskNN\)

1. Define a neural network class RiskNN that extends torch\.nn\.Module\.
2.  Architecture:  
   \- Input Layer: 4 neurons  
   \- Hidden Layer: 8 neurons with ReLU activation  
   \- Output Layer: 1 neuron with Sigmoid activation

  
3\. Implement forward\(self, x\) to return the network output\.

### Step 3: Model Setup \(BCELoss \+ SGD\)

1\. Instantiate the RiskNN model\.  
2\. Use torch\.nn\.BCELoss\(\) as the loss function\.  
3\. Use torch\.optim\.SGD as the optimizer with a learning rate of 0\.05\.  
4\. Print the model architecture to verify the layers\.

### Step 4: Training Loop

1\. Train the model for 15 epochs\.  
2\. For each epoch:  
   \- Compute predictions: preds = model\(X\)  
   \- Compute loss: loss = criterion\(preds, y\)  
   \- Zero gradients, backpropagate, and step the optimizer\.  
3\. Record and print the loss each epoch in the format:  
   Epoch 01: loss=0\.6931

### Step 5: Loss Visualisation

Use matplotlib to plot the recorded training loss across epochs\. Label axes and provide a title\. Display the chart with plt\.show\(\)\.

## Reflection Questions

Answer these questions after completing the exercise:

1\) Why is BCELoss appropriate for this task, and when would you prefer MSELoss instead?

2\) What happens to learning if you remove the Sigmoid from the output layer while still using BCELoss?

3\) How does increasing the learning rate for SGD \(e\.g\., to 0\.2\) affect convergence and stability?

4\) How does increasing the noise in label generation change the loss curve and final performance?

5\) If classes become imbalanced \(e\.g\., 90% of labels are 0\), what changes could you make to the loss or data generation to address this?

