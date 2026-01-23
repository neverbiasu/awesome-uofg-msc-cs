# S23_COMPSCI5079_Substitution_Algorithms

<!-- Page 1 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 2 -->

Lecture 2: Traditional Encryption and Decryption schemes


<!-- Page 3 -->

Lecture Outline 1. Types of Attack – Threats that need to be protected against. 2. Transposition and Substitution ciphers. 3. Homophonic Ciphers – Plaintext letters can have several ciphertext letters. 4. Polyalphabet Ciphers and Rotor Machines. – Mechanical encryption devices. 5. Running key Ciphers – The key is the same length as the plaintext


<!-- Page 4 -->

Substitution Ciphers


<!-- Page 5 -->

Ø Substitution ciphers provide matching between letters in the plaintext alphabet to other letters in the same or a different alphabet for the cipher text. – Two types: Shift Substitution and Multiplicative Substitution Ø In the simple case, each English letter is replaced by another English letter. Ø In more complex cases, English letters can be replaced by letters in another alphabet. Ø There can even be more letters in the cipher text alphabet than there are in the plaintext alphabet. – Some letters in the plaintext can be replaced by a choice of different letters in the ciphertext. Substitution Ciphers


<!-- Page 6 -->

Ø This example assumes the letters are replaced by numbers: a=0,b=1,c=2,d=3,e=4,f=5,g=6,h=7,i=8,j=9, k=10,l=11,m=12,n=13,o=14,p=15,q=16,r=17,s=18, t=19,u=20,v=21,w=22,x=23,y=24,z=25 . Ø A shift substitution shifts each letter of the alphabet along by a fixed amount, with a wrap - around at the end. The formula is: • c = (p + k) % n where c is the cipher letter, p is the plain text, n is the size of the alphabet and k (i.e., the secret key) is the number of characters to shift. Ø Decryption uses the inverse transformation • p = (c - k) % n Shift Substitution


<!-- Page 7 -->

Ø An early example of a shift substitution is the Caesar cipher with k = 3 Ø This confused the Gauls during Caesar's wars. – As reported by Caesar in his own book! Ø The Caesar cipher relied on a secret algorithm, which is usually a bad idea. – But it worked for Caesar. Ø Diffusion is again poor. Why? – Changing one letter in the plaintext only changes one letter in the ciphertext. Example: Caesar Cipher


<!-- Page 8 -->

securityandcryptography becomes vhfxulwbdogfubswrjudskb Ø The letter frequencies have been shifted. Ø We can use the most frequent letters in the ciphertext to guess the shift. – For instance: if the most common letter in the cipher text is h , we guess that it corresponds to a common letter such as e , with a shift of 3 . – This attack works better for longer messages. Example: Caesar Cipher


<!-- Page 9 -->

Ø A multiplicative substitution is slightly more sophisticated, and uses the formula: c = (p ´ k) % n Ø Decryption uses k' , the inverse of k p = (c ´ k') % n, where kk' = 1 (mod n). Ø A more complex version would combine shift and multiplication. c = (p ´ k1 + k2) % n Ø In this case, n should be a prime number , to make sure that all values of k can be used (they must have inverses). Multiplicative Substitution


<!-- Page 10 -->

Ø The Unicity Distance is quite small since there are not many possible keys. – There are 25 keys, assuming shifting with 0 or multiplying with 1 are not used. H(K) = log 2 (25) and so N u = log 2 (25)/3.2 = 1.5 Ø Single - letter frequencies can be used to break these codes quite easily. Ø An exhaustive search (Brute Force) is also possible. – Shift and multiply have 25 2 = 625 possible keys. Breaking the Cipher


<!-- Page 11 -->

General English to English Substitutions Ø The key is a substitution between letters of the alphabet. – There are a large number of different possible substitutions and so keys. Ø The unicity distance calculation is similar to a transposition cipher, and N u = 27 Ø A “ ciphertext - only attack” will then use single - letter frequencies to break the cipher.


<!-- Page 12 -->

Lecture Summary


<!-- Page 13 -->

Transposition and Substitution Ciphers Ø Transposition: – Split characters into blocks of fixed length d . – Rearrange the characters inside a block according to a key - dependent permutation. – Decryption uses the inverse permutation to recover the plaintext. Ø Substitution – Provide a matching between letters in the plaintext alphabet to other letters in the same or a different alphabet for the ciphertext. – Shift Substitution – Multiplicative Substitution