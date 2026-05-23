# Lecture_6_-_Visualisation_and_Interpretability_of_DNNs

<!-- Page 1 -->

Visualisation and Interpretation of Deep Neural Networks Ali Gooya


<!-- Page 2 -->

Four different approaches • Visualising weights/activations • Perturbation - Based Methods (Occlusion, LIME - style ideas) • Propagation/Gradient - Based Attribution (LRP, IG, GB) • Class Activation Mapping (CAM / Grad - CAM)


<!-- Page 3 -->

• We will primarily use ConvNets as an example, but most techniques are applicable to all types of deep networks (LeNet/ AlexNet – like CNNs) LeNet (left) and AlexNet (right) block diagram


<!-- Page 4 -->

Understanding a network by looking at its parameters • The simplest approach for convnets consists of looking at the filters as images. • While it is reasonable in the first layer, since the filters are consistent with the image input, it is far less so in subsequent layers.


<!-- Page 5 -->

Looking at parameters • Starts to get difficult due to the number of convolutional filters in the second layer and it is less obvious what they represent.


<!-- Page 6 -->

Visualizing first layer of AlexNet kernels/filters


<!-- Page 7 -->

Looking at activations • An alternative approach is to look at the activations themselves. • The convolutional layers maintain the 2D structure of the signal, so the activations can be visualized as images, where the local coding at any location of an activation map is associated with the original content at that same location. • Given the large number of channels, we have to pick a few at random.


<!-- Page 8 -->

LeNet with MNIST First layer convolutions seem to be picking up different types of edges (red = active, blue = not active) Pooling makes the image go smaller as it goes through network. Later activations are difficult to interpret but ‘hotspots’ can be seen which are used in the fully connected layer.


<!-- Page 9 -->

Layers as embeddings • In the classification, the network can be seen as a series of mappings aiming at disentangling classes to make them more easily separable for the final decision. • In this perspective, it makes sense to look at how the samples are distributed spatially after each layer.


<!-- Page 10 -->

How do I view such high - dimensional data? • The main issue to do so is the dimensionality of the signal. If we look at the total number of dimensions in each layer: • A MNIST sample in a LeNet goes from 784 to up to 18k dimensions, • An ImageNet sample in Resnet152 goes from 150k to up to 800k dimensions. • This require a means to project a very high - dimensional point cloud into a 2D or 3D representation that humans can use. • There are many methods that aim to reflect in a low - dimension space the structure of data points in high dimension. E.g. • t - SNE developed by van der Maaten and Hinton (2008). • UMAP by McInnes, Healy, Melville (2018) https://arxiv.org/abs/1802.03426


<!-- Page 11 -->

Applying t - SNE to “ swiss roll” dataset The “ swissroll ” dataset is used to test dimensionality reduction techniques. The data sits on a ‘2D manifold’ within a 3D space. The job of the dimensionality reduction is represent the data on a 2D surface while maintaining the distance relationship between points.


<!-- Page 12 -->

Applying t - SNE to LeNet input Putting a sample of different MNIST digit classes through LeNet network reveals how populations of data are transformed by the network. This is the input 784 dimensional input data with different colours representing different digits. Generally you can see similar digits are quite close together according to t - SNE.


<!-- Page 13 -->

t - SNE applied to Layer 1 of LeNet Layer 1 doesn’t look like it is helping separate them . . .


<!-- Page 14 -->

t - SNE applied to Layer 4 of LeNet But by layer 4 the network seems to have done a good job at separating the classes (but a few are still confused) . . .


<!-- Page 15 -->

t - SNE applied to Layer 7 of LeNet By layer 7, the classes are well separated (possibly the remaining confused ones are either very difficult or falsely labelled) . . .


<!-- Page 16 -->

CIFAR10 dataset with 66 - layer ResNet A much harder dataset and a more complicated network.


<!-- Page 17 -->




<!-- Page 18 -->




<!-- Page 19 -->




<!-- Page 20 -->




<!-- Page 21 -->




<!-- Page 22 -->




<!-- Page 23 -->




<!-- Page 24 -->




<!-- Page 25 -->

Perturbation - Based Methods (Occlusion, LIME ideas) • Core idea: Measure prediction changes when parts of the input are modified or removed.


<!-- Page 26 -->

Visualising responses to a specific image We can get a simple estimate of the importance of a part of the input image by computing the difference between: 1. the value of the maximally responding output unit on the image, 2. the value of the same unit with that part occluded. This is computationally intensive since it requires as many forward passes as there are locations of the occlusion mask, ideally the number of pixels.


<!-- Page 27 -->




<!-- Page 28 -->




<!-- Page 29 -->

Locally Interpretable Model - Agnostic Explanation (LIME) - Ribeiro et al. 2016 • To answer “ Why should I trust you? ” Because I can locally approximate my behaviour with a simple, interpretable model. • Core idea: Explain a simple linear model 𝑔 in the locality of the data point 𝑥 , rather than the whole non - linear black box 𝑓 .


<!-- Page 30 -->

How the LIME works


<!-- Page 31 -->

Layer - Wise Relevance Propagation (LRP) • Core idea: decomposing the final output score and redistributing it back through the layers until it reaches the input pixels. • Conservation principle: the total "relevance" (importance) received by a neuron must be equal to the total relevance it redistributes to the layer below it.


<!-- Page 32 -->

How the Redistribution Works • In practice, the basic formula is unstable (division by zero in the denominator). • Hence, several ‘rules’ can be implemented:


<!-- Page 33 -->

LRP Example: VGG16 pretrained on ImageNet • Using ‘LRP’ method in Captum.ai • Changing the propagation rules for the various layers. model = models.vgg 16 (pretrained= True ) model. eval () output = model(input) … Predicted: house_finch ( 0.4629172086715698 ) ? layers = list ( model._modules [ "features" ]) + list ( model._modules [ "classifier" ]) num_layers = len (layers) for idx_layer in range ( 1 , num_layers ): if idx_layer <= 16 : setattr (layers[ idx_layer ], "rule" , GammaRule ()) elif 17 <= idx_layer <= 30 : setattr (layers[ idx_layer ], "rule" , Alpha 1 _Beta 0 _Rule()) elif idx_layer >= 31 : setattr (layers[ idx_layer ], "rule" , EpsilonRule ()) lrp = LRP(model) attributions_lrp = lrp.attribute (input, target= pred_label_idx ) attributions_lrp


<!-- Page 34 -->

Saliency and Gradient - Based Attribution • Core idea: Use gradients of the output w.r.t. the input to see what most influences the prediction. • What is saliency? • Given a model 𝑓 𝑥 ; 𝑤 : 𝑅 𝑛 → 𝑅 , which parts of input 𝑥 most influence 𝑓 𝑥 ? ( 𝑤 represent the network weights). • Saliency map = importance score per input dimension • Local explanation (specific to one input) • Formally:


<!-- Page 35 -->

Vanila Gradient Saliency • Compute gradient of output w.r.t. input • Magnitude = sensitivity • Easy to compute (single backprop pass) • Pros • Fast • Architecture - agnostic • Cons • Noisy • Sensitive ≠ important • Gradient saturation problem


<!-- Page 36 -->

Saliency Example: Resnet18 pretrained on ImageNet • Using ‘Saliency’ method in Captum.ai • Looking at positive saliencies model = models.resnet 18 (pretrained= True ) model = model. eval () … output = model(input) output = F.softmax (output, dim= 1 ) … Predicted: house_finch ( 0.5922417044639587 ) ? … from captum.attr import Saliency saliency = Saliency(model) attributions_saliency = saliency.attribute (input, target= pred_label_idx ) …


<!-- Page 37 -->

SmoothGrad : Removing noise by adding noise ( Smilkov et al. 2017) • Idea: Average gradients over noisy inputs • Why it helps • Reduces visual noise • Improves stability


<!-- Page 38 -->

SmoothGrad Example • Using ‘ NoiseTunnel ’ method in Captum.ai • Produces sharper saliency maps noise_tunnel = NoiseTunnel (saliency) attributions_nt = noise_tunnel.attribute (input, nt_samples = 50 , nt_type = ' smoothgrad_sq ' , target= pred_label_idx )


<!-- Page 39 -->

Sensitivity ≠ Importance • Consider a simple sigmoid model: • What is the sensitivity of the model at ? • Attribution is a more rigorous way of assigning "credit" or "blame" to input features. If a model outputs a probability of 0.9 for "Dog," attribution methods try to decompose that 0.9 and distribute it among the input features. • The Goal:


<!-- Page 40 -->

Axiomatic Attribution for Deep Networks ( I ntegrated G radients, Sundararajan et al. 2017 ) • IG fixes saturation problem by averaging gradient as the input scales from a baseline (all - black image) to the actual input. • The attribution for a pixel is the difference from the baseline multiplied by the average sensitivity along the path.


<!-- Page 41 -->

Axiomatic Attribution for Deep Networks ( I ntegrated G radients, Sundararajan et al. 2017) • IG satisfies two critical "Axioms": • Completeness: It accounts for the entire "score. ” • Implementation Invariance: If two networks are mathematically equivalent (even if they are built differently), IG will give them the same attributions.


<!-- Page 42 -->

Integrated Gradient Example • Using IG method in Captum.ai • Produces a more complete attribution map integrated_gradients = IntegratedGradients (model) attributions_ig = integrated_gradients.attribute (input, target= pred_label_idx , n_steps = 20 ) noise_tunnel = NoiseTunnel ( integrated_gradients ) attributions_nt_it = noise_tunnel.attribute (input, nt_samples = 10 , nt_type = ' smoothgrad_sq ' , target= pred_label_idx )


<!-- Page 43 -->

Other Forms of B - P’ing Gradients: deconvnet and Guided Backpropagation • Cleaner activation maps differ in how ReLU layers are treated when BP: Deconvolution Networks, Zeiler et al. 2011 (‘ deconvnet ’) Striving for Simplicity: The All Convolutional Net, Springenberg et al. 2014 (guided backpropagation) Figure from: https:// medium.com /@ mohamedchetoui /grad - cam - gradient - weighted - class - activation - mapping - ffd72742243a


<!-- Page 44 -->




<!-- Page 45 -->




<!-- Page 46 -->




<!-- Page 47 -->

Optimising the input image • A strategy to get an intuition of the information encoded in the weights of a convnet consists of optimising from scratch a sample to maximize the activation f of a chosen unit, or the sum over an activation map.


<!-- Page 48 -->

Images that maximally optimize particular outputs This optimization tends to generate unrealistic images with high frequencies that activate units a lot. These images for instance maximize “bathtub” and “lipstick” for instance!


<!-- Page 49 -->




<!-- Page 50 -->




<!-- Page 51 -->

Essentially h( x ) penalizes unrealistic images – often by integrating edge amplitudes since most realistic images are not full of edges.


<!-- Page 52 -->




<!-- Page 53 -->




<!-- Page 54 -->




<!-- Page 55 -->




<!-- Page 56 -->




<!-- Page 57 -->




<!-- Page 58 -->




<!-- Page 59 -->

Learning Deep Features for Discriminative Localization (Zhou et al. 2015) • Core idea: Identify spatial regions (Class Activation Map - CAM) in final feature maps that contribute most to a class prediction. Global Average Pooling (GAP) Class Activation Map at location ( x,y )


<!-- Page 60 -->

Limitation of CAMs • Many of discriminative CNNs end with full connected final layers • In order to use CAMs, we have to replace these with Global Average Pooling layers. • This mandates retraining the network, which is not possible. • Grad - CAM is a variant that addresses this limitation. Figure from: https:// medium.com /@ mohamedchetoui /grad - cam - gradient - weighted - class - activation - mapping - ffd72742243a


<!-- Page 61 -->

Grad - CAM: Visual Explanations from Deep Networks via Gradient - based Localization, (Selvaraju et al. 2015) • Core idea: Use gradient of the class prediction w.r.t. feature maps to derive the weights of each feature channel.


<!-- Page 62 -->

Grad - CAM: Visual Explanations from Deep Networks via Gradient - based Localization, (Selvaraju et al. 2015)


<!-- Page 63 -->

Our Example • Implemented in Captum • Grad - Cam maps are smoother • Guided Grad - Cam focused on edges, more localised layer_gc = LayerGradCam (model, model.layer 4 ) attr = layer_gc.attribute (input, 12 )) Last layer Index of the predicted class Grad - Cam Guided Grad - Cam


<!-- Page 64 -->

Detecting Bias using Grad - CAM