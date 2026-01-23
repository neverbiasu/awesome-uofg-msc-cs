# S22_COMPSCI5079_Transposition_Algorithms

<!-- Page 1 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 2 -->

Lecture 2: Traditional Encryption and Decryption schemes


<!-- Page 3 -->

Lecture Outline 1. Types of Attack – Threats that need to be protected against. 2. Transposition and Substitution ciphers. 3. Homophonic Ciphers – Plaintext letters can have several ciphertext letters. 4. Polyalphabet Ciphers and Rotor Machines. – Mechanical encryption devices. 5. Running K ey Ciphers – The key is the same length as the plaintext


<!-- Page 4 -->

Transposition Ciphers


<!-- Page 5 -->

Ø Split characters into blocks of fixed length d . Ø Rearrange the characters inside a block according to a key - dependent permutation . Ø Decryption uses the inverse permutation to recover the original text (i.e., plaintext). Ø We can define the permutation by a table, e.g. • 0 → 1, 1 → 3, 2 → 0, 3 → 2. Ø It is shorter to list the destination positions in order. • (1, 3, 0, 2) or 1302 Ø The inverse permutation is • (2, 0, 3, 1) or 2031 Transposition Ciphers


<!-- Page 6 -->

Ø Starting with the text • securityandcryptography Ø Arrange it in blocks of 4 characters • secu rity andc rypt ogra phy Ø Encrypting the text with the above permutation yields • csue tryi dacn prty roag yph . Ø Note that we have to do something with the short final block of only 3 letters. – We redefine the permutation for just 3 letters by making 3 in the ciphertext go to 2. – Encryption permutation = 120 , decryption = 201 . Transposition Ciphers: Example


<!-- Page 7 -->

Ø The first step in calculating the Unicity Distance is to examine the “ key - space ” in more detail. Ø Assume that all permutations are equally likely. – Thus, t here are d! possible permutations for an encryption with block length d : d! = d x (d - 1) x (d - 2) x … x 1 . d p o s i t io ns fo r 1 s t l e tt e r , (d - 1 ) fo r se c o nd a nd s o o n . Ø d ! i s v e ry l a r g e fo r m od e r a t e v a l u e s o f d . Unicity Distance


<!-- Page 8 -->

Ø The entropy of the key space is log 2 (d!). – Assume all permutations are equally likely. Ø We can estimate this using Stirling' approximation for the factorial function : log e (n!) » (n + 1/2) log e (n) - n Now: log 2 (x) = log 2 (e) ´ log e (x) = 1.4427 log e (x) Ø I f d = 2 5 t h e n H(K ) = 8 3.676 7 – There are a lot of possible keys. Ø Hence N u = 83.6767 / 3.2 = 26 – 3.2 is t he r e d u n d a n c y o f E n g li s h. Unicity Distance


<!-- Page 9 -->

Ø This transposition algorithm can result in good confusion. – It all depends on the way the notation for the key is related to the permutation. Ø Diffusion is poor because the plaintext bits are shuffled round in character - sized blocks. – Replacing the first s in the plaintext by a t does not change the ciphertext very much. Confusion and Diffusion


<!-- Page 10 -->

Ø Consider the “ Ciphertext only attack ”. • The only information we have is the ciphertext. Ø Observation: the letter frequencies in the ciphertext remain the same as those for the plain text. • This is a good indication that a transposition cipher is being used. Ø The order of the letters has been changed, and the original order can be recovered by the use of anagramming techniques . • This is greatly helped by the use of di - gram and tri - gram frequency tables , showing which letter pairs are common, and also which pairs never occur. Breaking the Cipher


<!-- Page 11 -->

Ø Start by guessing that the permutation length is 4, then look for clues in the blocks. csue tryi dacn prty roag yph Ø Notice that the third block contains the letters for a - n - d , a very common tri - gram . Ø If this block contained the word " and ", there would be only two possible permutations. – c is t he f i r s t l et t e r i n t he bl o c k " can d " ( 2 130 ) – c is t he l as t l e t t e r i n t he b l o c k " and c " ( 13 0 2) . Breaking Cipher: Example


<!-- Page 12 -->

Ø Making c the first letter in the block leads to usec yrit cand tryp aogr phy Ø It is quite hard to automatically detect that this is wrong. Ø Making c the last letter of the block leads to the correct plaintext. Ø This approach has reduced the number of possible keys that we need to consider. Breaking Cipher: Example


<!-- Page 13 -->

The plaintext and ciphertext both use an alphabet of 32 characters, the 26 letters of the alphabet and 6 punctuation characters. o Encryption consists of taking the characters in blocks of 5 and rearranging them to form the cipher text. o The rearrangement permutation is the key, and the inverse permutation is used to decrypt. 1. Why is this not a two - key system, since different permutations are used to encrypt and decrypt? 2. If a ciphertext - only attack were used to try and break the encryption, how many letters of ciphertext would be needed? 3. Suggest a mechanism for dealing with messages that are not an exact multiple of 5 letters long. Quizzes