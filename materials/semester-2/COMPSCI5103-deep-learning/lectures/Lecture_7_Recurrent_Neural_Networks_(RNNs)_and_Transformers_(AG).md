# Lecture_7_Recurrent_Neural_Networks_(RNNs)_and_Transformers_(AG)

<!-- Page 1 -->

Deep Learning Lecture 7 Recurrent Neural Networks (RNNs) and Transformers SLIDES BY KE VIN BRYSON 1


<!-- Page 2 -->

Overview • We have seen fully connected feed - forward networks and these are useful for modelling certain systems but not for images. • We can model images better using CNNs with kernels that are applied over entire images to detect patterns within them. Essentially this is using weight sharing to detect common patterns. • Recurrent Neural Networks have a similar idea of weight sharing but they do it in a different manner to analyse sequences ...


<!-- Page 3 -->




<!-- Page 4 -->

System with inputs


<!-- Page 5 -->

Unrolling the network, with outputs The state at time t depends on the state at time t - 1 Loop unrolling: turns recurrent net into feed - forward net with shared weights


<!-- Page 6 -->

Animating the flow of an RNN https://blog.floydhub.com/a - beginners - guide - on - recurrent - neural - networks - with - pytorch


<!-- Page 7 -->

A typical RNN architecture


<!-- Page 8 -->

Forward propagation equations


<!-- Page 9 -->




<!-- Page 10 -->

Input/Output Sequence options


<!-- Page 11 -->

Encoder - Decoders for Machine translation


<!-- Page 12 -->

https://jalammar.github.io/visualizing - neural - machine - translation - mechanics - of - seq2seq - models - with - attention/


<!-- Page 13 -->

Unrolling the RNN over time


<!-- Page 14 -->

It’s the same unit repeated … thus exploding / vanishing gradient


<!-- Page 15 -->

Vanishing Gradient


<!-- Page 16 -->

RNNs can cope with recent correlations


<!-- Page 17 -->

But longer term ones are more difficult..


<!-- Page 18 -->

LSTM (Long Short Term Memory) GRU (Gated Recurrent Unit)


<!-- Page 19 -->

Gates can be used to preserve information


<!-- Page 20 -->

http://colah.github.io/posts/2015 - 08 - Understanding - LSTMs/ The repeating module in a standard RNN contains a single layer. The repeating module in an LSTM contains four interacting layers.


<!-- Page 21 -->

Cell state


<!-- Page 22 -->

Gates


<!-- Page 23 -->

Forget gate ...


<!-- Page 24 -->

Input gate ...


<!-- Page 25 -->

Updating of cell state


<!-- Page 26 -->

Output gate ...


<!-- Page 27 -->

Summary of LSTM details


<!-- Page 28 -->

Gated Recurrent Units (GRU)


<!-- Page 29 -->

Summary of GRU equations


<!-- Page 30 -->

Comparison


<!-- Page 31 -->

Summary • RNN are used for processing sequences which may vary in length: Sequence - > Sequence (simultaneous and encoding/decoding) Sequence - > Vector Vector - > Sequence • The recurrent unit is unwrapped as “time steps” progress • Since the same unit is repeated ... they are prone to vanishing and exploding gradients. • Gated cells such as LSTM and GRU can help preserve long - term information in RNNs and make them more useful.


<!-- Page 32 -->

Reading Karpathy’s simple blog intro to RNNs http://karpathy.github.io/2015/05/21/rnn - effectiveness/ Read http://www.deeplearningbook.org/contents/rnn.html ◦ Sections 10.1 - 10.2, 10.2.2, 10.2.4, 10.3 — 10.7, 10.10 - 10.11.1 are examinable http://colah.github.io/posts/2015 - 08 - Understanding - LSTMs/ On the difficulty of training Recurrent Neural Networks https://arxiv.org/pdf/1211.5063.pdf