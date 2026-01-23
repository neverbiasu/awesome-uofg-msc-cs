# S21_COMPSCI5079_Traditional_Encryptions

<!-- Page 1 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 2 -->

Lecture 2: Traditional Encryption and Decryption schemes


<!-- Page 3 -->

Lecture Outline 1. Types of Attack – Threats that need to be protected against. 2. Transposition and substitution ciphers. 3. Homophonic Ciphers – Plaintext letters can have several ciphertext letters. 4. Polyalphabet Ciphers and Rotor Machines. – Mechanical encryption devices. 5. Running Key Ciphers – The key is the same length as the plaintext


<!-- Page 4 -->

Types of Attack


<!-- Page 5 -->

► Covers the time period up to the invention of the electronic computer. ► All traditional encryption schemes are single - key systems , with two main variations. Ø Transposition ciphers , where the characters are rearranged. Ø Substitution ciphers , where the characters are substituted. ► Transposition and substitution can be combined. Traditional Encryptions


<!-- Page 6 -->

► Attempts to break the code normally depend on the information available. 1. Ciphertext Only 2. Known plaintext – Know part of the message (i.e., plaintext) as well as the cipher text and use this information to find the key. 3. Chosen plaintext – Plant some plaintext and examine the cipher text to find the key. Types of Attack


<!-- Page 7 -->

► Brute force (exhaustive search) o Try all possible keys. ► Letter frequency. o Use the letter frequencies in the cipher text. ► Di - gram and tri - gram frequencies o Frequencies of pairs and triples of characters in the cipher text. ► The following slide shows the letter frequencies: totals and occurrences per 1000 letters from the file dracula.txt . ► Some letters are much more frequent than others. Types of Attack: Methods


<!-- Page 8 -->

a --- 52337 82 n --- 43597 68 b --- 8987 14 o --- 50331 79 c --- 13516 21 p --- 9158 14 d --- 28539 45 q --- 625 1 e --- 79302 124 r --- 34951 55 f --- 13991 22 s --- 39484 62 g --- 12670 20 t --- 58123 91 h --- 43201 68 u --- 17923 28 i --- 42602 67 v --- 5871 9 j --- 813 1 w --- 18057 28 k --- 6201 10 x --- 781 1 l --- 26115 41 y --- 12671 20 m --- 17758 28 z --- 351 1 Letters Statistic in dracular.txt


<!-- Page 9 -->

► A good encryption system will try to make sure that there is little relationship between plaintext letters, the key, and ciphertext letters. ► In particular, small changes to the plaintext or the key should produce large changes to the ciphertext . ► An encryption system has good confusion if changing one bit in the key changes roughly half the bits of the ciphertext. ► An encryption system has good diffusion if changing one bit in the plaintext changes roughly half the bits of the ciphertext. Confusion and Diffusion