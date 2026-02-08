# S32_COMPSCI5079_DataEncryptionStandard_DES

<!-- Page 1 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 2 -->

Lecture 3: Symmetric - key Cryptography Block Ciphers


<!-- Page 3 -->

Lecture 3: Overview


<!-- Page 4 -->

1. Feistel ciphers – A family of single - key, block substitution ciphers 2. Data Encryption Standard (DES) – 64 - bit Block cipher, 56 - bit key length – Insecure for modern applications – Still widely used 3. Advanced Encryption Standard (AES) – 128 - bit Block cipher, different key lengths (128, 192, 256) – Replacement for DES Outline


<!-- Page 5 -->

Ø The Feistel family of algorithms were designed to be fast. – The block size was two computer words. Al l the calculations were done in a single computer word of 32 bits (half of the block). – There were several rounds with sub - keys generated from the master key. – In each round: • A substitution is performed on the left half L i • A permutation is performed by swapping the two halves. – Decryption used the same algorithm but with the subkeys in the reverse order. Feistel Ciphers: Summary


<!-- Page 6 -->

Ø DES stands for Data Encryption Standard. Ø It is now an older algorithm but still widely used . – There is a lot of legacy hardware and software. Ø It is a Feistel block cipher , working with 64 - bit data blocks and 56 - bit keys. Data Encryption Standar d


<!-- Page 7 -->

Ø The NSA (US National Security Agency) modified the Lucifer cipher slightly and it was adopted in 1977. – They reduced the key length to 56 bits. – It uses elementary operations so that it is fast and easy to implement in silicon. Ø The NSA did not publish an analysis of its security, encouraging some to think they had inserted a backdoor. – No back door has been found but NSA later said that they had changed the algorithm to protect against differential cryptography. – Rival algorithms, such as IDEAL (also a Feistel algorithm) in Europe, were found to be vulnerable to differential cryptography. DES Origins


<!-- Page 8 -->

Ø DES is based on the Feistel cipher Ø 16 rounds as in Feistel structure Ø Two additional rounds at the beginning Initial Permutation ( IP ) and at the end Final Permutation ( FP ) Ø We will go into detail about IP, FP, F function, and sub - keys generation from a master key https://en.wikipedia.org/wiki/Data_Encryption_Standard 𝑳 𝒊 " 𝟏 = 𝑹 𝒊 𝑹 𝒊 " 𝟏 = 𝑳 𝒊 ⊕ 𝑭 ( 𝑹 𝒊 , 𝑲 𝒊 ) DES Overview


<!-- Page 9 -->

Ø To understand how DES works, we study a toy system Simplified - DES (S - DES) developed by Edward Schaefer of the University of Santa Clara. Ø S - DES encrypts 8 - bit blocks of data using a 10 - bit key. Ø There are two substitution rounds, each with its own sub - key. Ø Left and right halves are swapped between them. Ø Let us generate a sample data block and sample key to work through the S - DES algorithm . • Data = 00111110 • Key = 1011000110 Simplified DES


<!-- Page 10 -->

Ø The initial permutation (IP) operates on the 8 - bit data blocks . Ø If the data bits are numbered 0... 7 then the Initial Permutation is 15203746 . Ø Permuted data is : 00111110 à 01101011 Ø The inverse permutation (Final Permutation) applied at the end of the process is 30246175 . IP8 1 5 2 0 3 7 4 6 FP8 3 0 2 4 6 1 7 5 The Initial Permutation


<!-- Page 11 -->

Sub - key Generation


<!-- Page 12 -->

Sub - keys Generation Two 8 - bit sub - keys are generated from the 10 - bit master key. Step 1 : The bits of the original key are permuted based on P10 permutation table: Key = 1011000110 à 1000101110 Step 2: The left 5 bits and the right 5 bits are both rotated left 1 bit. 10001 0 1110 à 00011 11100 Step3: The first 8 - bit sub key is formed from the following matching 8 - bit table : We then have: K 1 = 10111100 P10 2 4 1 6 3 9 0 8 7 5 P8 5 2 6 3 7 4 9 8


<!-- Page 13 -->

Sub - keys Generation Step 4: The left and right 5 bits from step 2 are both rotated left 2 bits 00011 11100 à 01100 10011 Step 5: The second 8 - bit sub key is formed from the same bits as step 3 (using P8 permutation table again ) K 2 = ??? P8 5 2 6 3 7 4 9 8


<!-- Page 14 -->

F function in details Ø The most complex component in S - DES is the function F Ø Defined by steps as shown in the diagram : Step 1: Expansion of 4 data bits (right half of block) to 8 bits following the E/P table 30121230 Permuted data : 0110 1011 à 11010111 Step 2: These 8 bits are XOR’ed with the 8 bits of the first key K 1 . 11010111 10111100 (Key ) Output: 01101011 Simplified DES - Function F(R,SK)


<!-- Page 15 -->

F function in details Step 3: The resulting 8 bits (numbered 0 1 2.. 7 ) are split again into 4 separate 2 - bit numbers called ( row 1 , col 1 ), ( row 2 , col 2 ) as following rule : row 1 = bits: 0,3 ; col 1 = bits: 1,2 row 2 = bits: 4,7 ; col 2 = bits: 5,6 01101011 è (00, 11 ) , (11, 01 ). In decimal, row 1 = 0 , col 1 = 3 , row 2 = 3, col 2 = 1 . Step 4: ( row 1 ,col 1 ) and (row 2 ,col 2 ) form the row and column indices of two 4x4 tables called Substitution - boxes (S - boxes ) • An S - box is a matrix, indexed by the row and column . • Each S - box produces 2 bits of output. S1( 0, 3 ) = 10 , S2(3 , 1 ) = 01 So , output = 1001 Substitution Boxes (S - Boxes) lookup table in decimal S1 S2 1 0 3 2 0 1 2 3 3 2 1 0 2 0 1 3 0 2 1 3 3 0 1 2 3 1 0 2 2 1 0 3


<!-- Page 16 -->

F function in details Step 5: The resulting 4 - bit number, the output from the two S - boxes undergoes another permutation with P4 table 1320 which is the output of the function F The algorithm continues: Step 6: The Switch function (SW) interchanges the left and right 4 bits so that the second instance of f K operates on a different 4 bits. Step 7: In this second instance, the E/P, S0, S1, and P4 functions are the same. The key input is K2 . Step 8: Finally apply inverse permutation (i.e., Final Permutation) to get the ciphertext . P4 1 3 2 0


<!-- Page 17 -->

Relationship with the Real DES Ø DES has the same structure as S - DES, but with more steps . Ø There are 16 F K steps, each with a 48 - bit sub - key generated from the 56 - bit actual key . Ø The function F operates on 32 - bit halves of the data. – The data is expanded to 48 bits and XOR’ed with the sub - key. – These 48 bits are split into 8 chunks, each 6 bits long. – Each 6 - bit chunk is treated as row (2 bits) and column (4 bits) – They each index an S - box. Ø Internally it has 8 S - Boxes, each 4 x 16. – Each S - Box produces a 4 - bit number. – The 8 S - Boxes produce a 32 - bit value.


<!-- Page 18 -->

Results from more steps in DES Ø The following table lists the number of bits that have changed after each round of DES with – two very similar plaintext blocks (diffusion). – two very similar keys (confusion). Ø Clearly, diffusion and confusion are quite effective. Ø Permutations on their own do not affect confusion or diffusion. – 1 - bit change in the origin only changes one bit in the destination.


<!-- Page 19 -->

16 steps: Number of Different Bits in DES Round Confusion Diffusion 1 6 2 2 21 14 3 35 28 4 39 32 … … … 10 44 38 11 32 31 12 30 33 13 30 28 14 29 34 15 29 34 16 34 35


<!-- Page 20 -->

Design of the S - Boxes Ø The design principles were published in 1992, answering questions that NSA had introduced a trap door. – There was no trap door. Ø The design made DES resistant to differential cryptanalysis, which NSA had known about but kept secret. Ø Other Feistel ciphers were vulnerable to differential analysis. Ø Differential Cryptanalysis uses two very similar chosen plaintext messages to uncover details of the encryption algorithm. Ø Linear cryptanalysis is a similar attack that relies on two similar known plaintext messages. – DES is also resistant to it.


<!-- Page 21 -->

Breaking DES Ø The short key length of 56 bits makes DES vulnerable to a brute force attack , where all keys are tried. Ø On 29 th Jan 1997, the RSA organisation offered a prize of $10,000 to the first person to find the key to some cipher text when they were given 3 blocks of plain text (a known plaintext attack ). – Rocke Versur claimed the prize on 25 th May 1997 . Ø In 1976 Hellman and Diffie estimated that it would cost $ 20M to build a special - purpose machine to crack DES in 1 day. Ø In 1998 The Electric Frontier Foundation built a DES cracker for $250,000. It could search all possible keys in 9 days . Ø DES lasted 20 years before it became easy to crack.


<!-- Page 22 -->

Double DES Ø Double DES uses two different keys to encrypt twice . – C = E K2 (E K1 (P )) Ø It is vulnerable to a known plaintext (assume P and C are known ): meet in the middle attack . Ø Construct a lookup table of all intermediate results: X = E K1 (P) for all possible keys K 1 . Ø Decrypt C for all possible keys K 2 : Y = D K2 (C). Ø The key we want is when X = Y. Ø Look up each value of Y in the table of X’s. Ø This takes about twice the effort needed to break the standard single - key DES. Ø It is NOT equivalent to using a 56x2 = 112 - bit key.


<!-- Page 23 -->

Triple DES Ø Three Key Triple DES – C = E K3 ( D K2 (E K1 (P))) – No known weaknesses. – Decryption with the second key is used so that if the same key is used three times then this is equivalent to single DES. – There are many legacy documents encrypted with original DES. Ø There are 3 options: – K 1 , K 2 , K 3 are all different: 168 - bit key – K 1 = K 3 , K 2 different: 112 - bit key avoiding meet in the middle. – K 1 = K 2 = K 3 : 56 - bit key, equivalent to single DES.


<!-- Page 24 -->

Summary Ø DES was an implementation of the Feistel scheme • The chosen key length of 56 bits was too short • It used fairly random lookup tables in each round. • All the operations were fast and required a small amount of computation. • The short key length led to it being broken about 20 years after adoption. • The triple - DES version is secure and still in use in major applications


<!-- Page 25 -->

Quizzes 1. How are encryption and decryption performed with a Feistel cipher? Prove that decryption undoes encryption. 2. Describe briefly how the DES algorithm implements the Feistel scheme, mentioning , in particular, the role of the key length and also the so - called S - Boxes. You do not need to provide details of the actual S - Boxes, rather describe in general terms their role in the algorithm. 3. Imagine you have the task of designing a hardware encryption device based on DES chips. Your company anticipates that a well - funded organisation will make a serious attempt to break the data encrypted by your device. How would you choose to employ the DES chips?