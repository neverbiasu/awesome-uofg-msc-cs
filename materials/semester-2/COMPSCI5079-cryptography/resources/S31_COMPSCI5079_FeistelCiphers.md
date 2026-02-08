# S31_COMPSCI5079_FeistelCiphers

<!-- Page 1 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 2 -->

Lecture 3: Symmetric - key Cryptography Block Ciphers


<!-- Page 3 -->

Lecture 2: Review


<!-- Page 4 -->

1. Types of attack : – Ciphertext only – Known (part of) plaintext and ciphertext, find the key – Chosen plaintext 2. Attack Methods: – Brute Force – Letter Frequency • Diagram and Trigram Main Points to take home


<!-- Page 5 -->

3. Transposition ciphers: – Split characters into blocks of fixed length d . – Rearrange the characters inside a block according to a key - dependent permutation. – Decryption uses the inverse permutation to recover the plaintext. 4. Substitution ciphers: – Provide a matching between letters in the plaintext alphabet to other letters in the same or a different alphabet for the ciphertext. – Shift Substitution – Multiplicative Substitution Main Points to take home


<!-- Page 6 -->

5. Homophonic ciphers: – A homophonic cipher has more letters in the ciphertext alphabet than in the plaintext alphabet. • Each plaintext letter can be replaced by a choice of several ciphertext letters (chosen at random). • This reduces the effect of statistics. – A second - order homophonic encrypts two different messages, each with their own key, into one piece of cipher text. • An innocent message is protected by a distress key. Main Points to take home


<!-- Page 7 -->

5. Polyalphabet ciphers: – A polyalphabet cipher uses a different substitution for each letter in the plain text. • Repeating eventually. • A mechanical encryption device can implement this easily with rotors ( Rotor Machine ). 6. Running Key ciphers: – A running key cipher takes this to the extreme with a key just as long as the plain text. – A short key generator is often used such as a pseudo - random number generator. Main Points to take home


<!-- Page 8 -->

Lecture 3: Overview


<!-- Page 9 -->

1. Feistel ciphers – A family of single - key, block substitution ciphers 2. Data Encryption Standard (DES) – 64 - bit Block cipher, 56 - bit key length – Insecure for modern applications – Still widely used 3. Advanced Encryption Standard (AES) – 128 - bit Block cipher, different key lengths (128, 192, 256) – Replacement for DES Outline


<!-- Page 10 -->

https://cybermeteoroid.com/stream - cipher - and - block - cipher - a - complete - overview/ Block Ciphers


<!-- Page 11 -->

Ø This is a family of single - key, block substitution ciphers. Ø Feistel was in charge of the IBM Lucifer project (1973) and provided the theoretical underpinning for many of the first block ciphers. – His work was based on Shannon (1945) Ø He proposed 64 - bit or 128 - bit block sizes. Feistel Ciphers


<!-- Page 12 -->

Ø The key is the mapping between input and output blocks. Ø If all possible mappings are possible then the keys would be 10 89 bits long for a block size of 64. – Stirling’s approximation of 64! . – There are thus a lot of possible keys. Ø The actual size of the key space was reduced, with a key length of 128 bits. – Still 2 128 or approximately 10 38 different keys. Feistel Ciphers: the Keys


<!-- Page 13 -->

Ø Feistel used a product cipher . – Several small transformations are applied one after the other. Ø He alternated substitutions and transpositions. Ø The resulting large transformation is likely to be much harder to break than each of the individual transformations. Ø Each substitution uses a sub - key, which is generated from the master key. Feistel Ciphers: Product Ciphers


<!-- Page 14 -->

Ø The initial data block is split into two halves, the left ( L0 ) and right ( R0 ) halves. – Actual operations involve just one - half of each data block and so fewer bits. Ø Computer word size at the time was 32 bits. – Each half block was 32 bits and so fitted in one computer word. – This sped up data processing. Ø There are a number of rounds n , each making a substitution followed by swapping the two halves (the transposition). Feistel Ciphers: the Structure


<!-- Page 15 -->

Encrypt plaintext (L 0, R 0 ): Ø For each round i = 0,1,2, …, n: • Input: L i , R i , and K i (round key) • Output: L i and R i • A substitution is performed on the left half L i • A permutation is performed by swapping the two halves. Ø Then the ciphertext is ( R n+ 1 , L n+ 1 ) v F is any function, there are several different Feistel algorithms, each with a different function F . v K i is a round key (i.e., sub - key), ⊕ is E xclusive OR. 𝑳 𝒊 " 𝟏 = 𝑹 𝒊 𝑹 𝒊 " 𝟏 = 𝑳 𝒊 ⊕ 𝑭 ( 𝑹 𝒊 , 𝑲 𝒊 ) https://en.wikipedia.org/wiki/Feistel_cipher 𝑳 𝒊 ⊕ 𝑭 ( 𝑹 𝒊 , 𝑲 𝒊 ) Feistel Ciphers: Encryption Algorithm


<!-- Page 16 -->

Ø Block size: The larger it is, the more secure the cipher is but the slower the cipher is. – 64 or 128 - bit Ø Key size: The larger it is, the more secure the cipher is but the slower the cipher is. – 64 or 128 bits Ø Number of rounds n: The larger it is, the secure the cipher is but the slower the cipher is. – 16 rounds is typical. Ø Sub - key Generation K i: – The more complex it is, the more secure the cipher is but the slower the cipher is. Ø Function F : – The more complex it is, the more secure the cipher is but the slower the cipher is. Feistel Ciphers: Design Features


<!-- Page 17 -->

https://en.wikipedia.org/wiki/Feistel_cipher Decrypt ciphertext (R n+1, L n+1 ): Ø For each round i = n, n - 1, …, 0: Then the plaintext is ( L 0 , R 0 ) again Ø The diagram illustrates both Encryption and Encryption processes Ø Note the reversal of the subkey order for decryption: this is the only difference between encryption and decryption. 𝑹 𝒊 = 𝑳 𝒊 " 𝟏 𝑳 𝒊 = 𝑹 𝒊 " 𝟏 ⊕ 𝑭 ( 𝑳 𝒊 " 𝟏 , 𝑲 𝒊 ) Feistel Ciphers: Decryption Algorithm


<!-- Page 18 -->

Ø Decryption follows the same steps but with the sub - keys used in the reverse order . Ø The same algorithm F and keys are used for encryption and decryption Ø To prove this works, all we need to do is show that two applications of each substitution step, with the same key, cancel each other. Ø From the formula: Swapping left and right halves will cancel each other out. – Swap two items and then swap them again. They are back in the same place. https://en.wikipedia.org/wiki/Feistel_ciphe r Feistel Ciphers: Decryption Algorithm


<!-- Page 19 -->

We’re going to prove that Two substitutions cancelled Consider any round i : Ø Let B i = (L i , R i ) be a block, split into left and right halves. B i = (L i , R i ) is the initial plain t ext block. B encrypt = ( L encrypt , R encrypt ) is ciphertext after encryption. B decrypt = ( L decrypt , R decrypt ) is plaintext after decryption. Ø All we need do is show that L decrypt = L i and R decrypt = R i Feistel Ciphers: Proof


<!-- Page 20 -->

We’re going to prove that two substitutions cancelled Ø Applying the Feistel function , we have : – For Encryption: L encrypt = R i R encrypt = L i ⊕ F(R i , K i ); The ciphertext to be decrypted is ( L encrypt, R encrypt ) – For Decryption R decrypt = L encrypt = R i L decrypt = R encrypt ⊕ F(L encrypt , K i ) = L i ⊕ F(R i , K i ) ⊕ F(L encrypt , K i ) = L i ⊕ F(R i , K i ) ⊕ F(R i , K i ) = L i ⊕ 0 = L i Feistel Ciphers: Proof


<!-- Page 21 -->

Ø No output bit is close to a linear function of a subset of the input bits. Ø If they were it would be vulnerable to a chosen plaintext attack (linear cryptanalysis). – Choose several plaintext messages whose bits form a linear combination – Solve the linear equations. Ø There is no bias towards some bit positions. Ø If two different inputs (key or data) differ by 1 bit, the output must differ by at least two bits. – Confusion and diffusion. Feistel Ciphers: Function F Design Criteria


<!-- Page 22 -->

Ø The Feistel family of algorithms were designed to be fast. – The block size was two computer words. Al l the calculations were done in a single computer word of 32 bits (half of the block). – There were several rounds with sub - keys generated from the master key. – In each round: • A substitution is performed on the left half L i • A permutation is performed by swapping the two halves. – Decryption used the same algorithm but with the subkeys in the reverse order. Summary