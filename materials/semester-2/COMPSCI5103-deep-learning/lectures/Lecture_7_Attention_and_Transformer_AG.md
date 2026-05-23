# Lecture_7_Attention_and_Transformer_AG

<!-- Page 1 -->

Attention and Transformers Ali Gooya


<!-- Page 2 -->

Learning outcomes By the end of this lecture, you will: • Identify the limitations of RNNs as serial seq - to - seq converters • Formulate the attention mechanism • Differentiate the various components of the Transformer Networks


<!-- Page 3 -->

Improvement with transformer architecture


<!-- Page 4 -->

• RNNs ‘shoe horn’ the whole sequence history in a context/state variable. • Sequential computations makes parallelization impossible. • Vanishing gradients with increasing sequence length. • No explicit modeling for long and short term dependencies. Why yet another DL model for sequences?


<!-- Page 5 -->

• ‘ Attention ’ models explicit short - long range dependencies. • The state variables from all input words are used by the decoder. • Attention is computed as the similarity scores between state variables of encoder and decoder.


<!-- Page 6 -->




<!-- Page 7 -->

• Attention weights obtained • Question: Have we fully rectified the limitations of RNN? • Not yet! translation is still sequential (slow training). • This is solved by the Transformer Network (Vaswani et al, 2017).


<!-- Page 8 -->

Transformer Network ( Attention is All You Need, Vaswani et al, 2017) • Tokenises the words and uses their embeddings as input: Example Phrase: "Tokenization is helpful." A GPT tokenizer might see it like this: • Token • ization • (space)is • (space)help • ful • . Input sentences - > [34521, 674, 318, 1245, 402] • Why do we do this? Efficiency: It recognizes "Token" and " ization " separately. If it later sees "Modernization," it already knows what " ization " means. Vocabulary Size: It allows the model to understand millions of word combinations using a vocabulary of only 100,000 tokens .


<!-- Page 9 -->

Transformer Network ( Attention is All You Need, Vaswani et al, 2017) • Positional encodings establish the order of the tokens • Uses a stack to transform the embeddings of tokens • MHA units enable cross - talk between embeddings to identify the appropriate context • Add & Norm normalises and adds them as residuals • FF layer refines the embeddings privately • The decoder is the base for chat Generative Pre - Tranined (GPT) like models ( gpt ).


<!-- Page 10 -->

• Attention: dot product of embeddings of queries (rows of 𝑄 ) and keys (rows of 𝐾 ) , normalised by dimension 𝑑 and softmaxed . • Transformation of embeddings: • Can be computed in parallel (like CNN) via multi - head layers • Self - attention : 𝑄 = 𝐾 • Decoder - encoder attention: 𝑄 from Decoder, 𝐾 from encoder Attention in Transformer Attention Values


<!-- Page 11 -->

Self - attention • Self attention is computed from Queries , keys and values. • They are abstractions , calculated from the word embedding. • The matrices WQ, WK, WV are the weights trained during learning.


<!-- Page 12 -->

Self attention • Query: Holds a representation for the current word • Keys: Hold representation of all words in the sentence • Their product form a score that indicate how the key word is related to the query. • This means we create a new embedding blending words in the sentence that are related to the word.


<!-- Page 13 -->

Multi - head attention • Instead of learning a single set of matrices, the transformer encoder learns multiple in parallel. • The output of all heads is then concatenated and combined using a mixing matrix.


<!-- Page 14 -->




<!-- Page 15 -->

Example of Self - Attention


<!-- Page 16 -->

• Unmasked MHA recap: MHA mathematical recap


<!-- Page 17 -->

• Masked MHA allows causal training – each token is blind to the next tokens • In autoregressive training: • So token 𝑡 must not attend to future tokens 𝑡 + 1 , … , 𝑛 . Masked MHA


<!-- Page 18 -->

Transformer network Feed Forward NN Self - Attention ENCODER Feed Forward NN Dec - Enc Attention DECODER Self - Attention


<!-- Page 19 -->

Conclusions: • Attention captures long - short range of dependencies precisely. • Transformer networks use parallelization and self - attention to address the limitations of the RNNs. • Two types for attention: • Self - attention – used to transform word embeddings • Decoder - encoder attention – used to establish cross - modality correspondences.