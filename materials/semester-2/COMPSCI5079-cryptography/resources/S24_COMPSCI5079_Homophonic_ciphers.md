# S24_COMPSCI5079_Homophonic_ciphers

<!-- Page 1 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 2 -->

Lecture 2: Traditional Encryption and Decryption schemes


<!-- Page 3 -->

Lecture Outline 1. Types of Attack – Threats that need to be protected against. 2. Transposition and Substitution ciphers. 3. Homophonic Ciphers – Plaintext letters can have several ciphertext letters. 4. Polyalphabet Ciphers and Rotor Machines. – Mechanical encryption devices. 5. Running key Ciphers – The key is the same length as the plaintext


<!-- Page 4 -->

Homophonic Ciphers


<!-- Page 5 -->

Ø A homophonic cipher matches each letter in the plaintext alphabet to possibly more than one letter in another alphabet used for the ciphertext. Ø For example, English letters in the plaintext to numbers between 0 a nd 127 i n t he c ip h e r t e x t . – The ciphertext alphabet is numbers between 0 and 127. Ø Each English letter in the plaintext can correspond to several numbers in the cipher t ext. – The key is this match between letters and numbers. – The key can be quite large. Homophonic Cipher


<!-- Page 6 -->

Ø More frequently used letters have more matching characters in the other alphabet. – This severely weakens attacks based on single - letter frequencies Ø It can still be attacked by “ digram frequencies”. Ø The following slide shows how many numbers between 0 and 127 should be allocated to each of the letters in the alphabet, based on the ea r li e r drac u la.txt f r e q u e n c i e s . Ø It also shows the relative frequency of plaintext letters to ciphertext codes. – 1.00 m eans no statistical information can be obtained. Ø Note that just the rare letters contain statistical information, and they are rare, which does not help much. Homophonic Cipher


<!-- Page 7 -->

a --- 10 1.05 n --- 8 1.09 b --- 2 0.90 o --- 10 1.01 c --- 3 0.90 p --- 2 0.92 d --- 6 0.95 q --- 1 0.13 e --- 16 0.99 r --- 7 1.00 f --- 3 0.94 s --- 8 0.99 g --- 2 1.27 t --- 11 1.06 h --- 8 1.08 u --- 4 0.90 i --- 8 1.07 v --- 1 1.18 j --- 1 0.16 w --- 4 0.91 k --- 1 1.24 x --- 1 0.16 l --- 5 1.05 y --- 2 1.27 m --- 3 1.19 z --- 1 0.07 Codes per Letter


<!-- Page 8 -->

Ø The larger the ciphertext alphabet, the more secure the code. Ø In the limit where every plaintext letter is encrypted to a different ciphertext letter, the code cannot be broken – However, the key size is at least as large as the length of the plaintext. Ø The ciphertext alphabet requires more bits to encode each letter. – 26 letters require 5 bits per letter – Numbers between 0 a nd 127 require 7 bits per number. Homophonic Cipher


<!-- Page 9 -->

Letter Homophones (Codes) A 17 19 34 4 56 60 67 83 I 08 22 53 65 88 90 L 03 44 76 N 02 09 15 27 32 40 59 0 01 11 23 28 42 54 70 80 P 33 91 T 05 10 20 29 45 58 64 78 99 Example : English letters are enciphered as integers (0 - 99), a group of integers are assigned to a letter proportional to the relative frequency of the letter, as in the table: M = PLAIN PIL0T (plaintext) C = 91 44 56 65 59 33 08 76 28 78 (ciphertext) Homophonic Cipher: Example


<!-- Page 10 -->

Ø It is possible to encrypt two different plaintext messages of the same length with two different keys to produce a composite ciphertext. Ø Each key will decrypt the ciphertext to produce a different message. – The first key produces the real message. Ø The other message can be innocuous, and the second key is a distress key , to be revealed under duress. – Often called the ‘rubber hose’ decryption technique. Second - Order Homophonic


<!-- Page 11 -->

Ø The plaintext alphabet forms the rows and columns of an n x n matrix. – n is t he n u m b e r o f l e t t e r s i n t he p l a i n t e xt a l ph a b e t . Ø The ciphertext alphabet consists of integers between 0 and n 2 - 1 inclusive – T h e re a re n 2 o f t h e m . Ø The key is the order in which the cipher text letters appear in the matrix. Ø Encryption uses letters from the first message to locate the row (Row F1) and the second message for the column (Column F2). – Thus, each ciphertext character is the number appearing in the appropriate element in the matrix. Second - Order Homophonic: Example


<!-- Page 12 -->

For the Decryption: Ø Decrypting the first message decodes all the numbers in a given row to the same letter Ø Decrypting the second message uses the numbers in a given column to produce the same letter. Second - Order Homophonic


<!-- Page 13 -->

Alphabet of 5 letters EILMS Ø Encryption Matrix: Ø The numbers in the matrix are randomly selected. Ø If the real message is SMILE and the decoy (dummy) message LIMES , then the ciphertext will be: 21, 16, 05, 19, 11 E I L M S E 10 22 18 02 11 I 12 01 00 05 20 L 19 06 23 13 07 M 03 16 08 24 15 S 17 09 21 14 04 Second - Order Homophonic: Example


<!-- Page 14 -->

Ø The real decryption key will be: E(10,22,18,02,11) I(12,01,00,05,20) L(19,06,23,13,07) M(03,16,08,24,15) S(17,09,21,14,04) Ø while the decoy key will be: E(10,12,19,03,17) I(22,01,06,16,09) L(18,00,23,08,21) M(02,05,13,24,14) S (11,20,07,15,04) Ø Note that letter frequencies are not destroyed. Second - Order Homophonic: Example


<!-- Page 15 -->

Ø An isolated civilisation has developed a written language based on an alphabet with just 4 letters: α , β , γ and δ . Their written documents are very long. § The letters do not occur with equal frequency: α occurs 3/8 of the time ; β and γ 1/4 of the time each and δ 1/8 of the time. § The probability of any two - letter combination occurring is, however, just the product of the probability of each letter occurring independently and there are no special digrams or trigrams. Quiz: Calculate the redundancy of this language. You do not need to calculate an exact number but can leave terms like log 2 (3) in your answer. Quizzes


<!-- Page 16 -->

Ø This civilisation is aware of the English language and has decided to encrypt its secret documents by using some English language letters for the ciphertext. Quiz: Show how they can hide the redundancy in their language by using the alphabet {A, B, C, D, E, F, G, H} as the ciphertext alphabet. Ø This civilisation is also investigating the possibility of hiding two different messages in the cipher text, each with its own key. Quiz: How m a ny l e t t e rs fr om t he E n gli s h l a n gu a g e w o u l d be needed? G i ve an example of such an encoding. Explain why this code would be easier to break than the previous one. Quizzes


<!-- Page 17 -->

Lecture Summary


<!-- Page 18 -->

Ø A homophonic cipher has more letters in the ciphertext alphabet than in the plaintext alphabet. – Each plaintext letter can be replaced by a choice of several ciphertext letters (chosen at random). – This reduces the effect of statistics. Ø A second - order homophonic encrypts two different messages, each with its own key, into one piece of cipher text. – An innocent message is protected by a distress key. Homophonic Cipher