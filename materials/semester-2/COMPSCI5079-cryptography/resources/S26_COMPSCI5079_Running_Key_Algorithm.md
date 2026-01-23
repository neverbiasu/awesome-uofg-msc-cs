# S26_COMPSCI5079_Running_Key_Algorithm

<!-- Page 1 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 2 -->

Lecture 2: Traditional Encryption and Decryption schemes


<!-- Page 3 -->

Lecture Outline 1. Types of Attack – Threats that need to be protected against. 2. Transposition and Substitution Ciphers. 3. Homophonic Ciphers – Plaintext letters can have several ciphertext letters. 4. Polyalphabet Ciphers and Rotor Machines. – Mechanical encryption devices. 5. Running Key Ciphers – The key is the same length as the plaintext


<!-- Page 4 -->

Running Key Ciphers


<!-- Page 5 -->

Ø The key is English text, the same length as the plaintext. Ø The encryption and decryption is then very simple. c i = (p i + k i ) mod n p i = (c i - k i ) mod n Ø This seems to destroy letter frequency analysis and is not periodic, but it can be broken if the key is not chosen well. Running Key Encryption


<!-- Page 6 -->

Ø The key might be based on a book that is available to both the coder and decoder. – Macbeth, Act 2 Scene 3, line 4, says. – That is the starting point for the letters. – This solves the key distribution problem. – The ‘ spy ’ does not need to carry the key with him. The key is very long. Ø This is vulnerable to Friedman's attack because both the key and plain text are English and have redundancy. Literature - based Keys


<!-- Page 7 -->

Friedman's Attack Ø Friedman's approach assumes initially that all ciphertext characters are caused by high - frequency letters in both the plaintext and the key text. – This means that there will only be a few possibilities for each plaintext and key text letter. They must both add up to produce the given ciphertext letter. Ø Digram and trigram frequencies are then used to guess the actual letters used. Ø A significant proportion of the plaintext and ciphertext can be guessed by this approach. Ø The rest can be filled in using natural language redundancy.


<!-- Page 8 -->

Ø Plaintext: – thetreasureisburied . . . Ø Key: – thesecondcipheris . . . Ø Ciphertext: – moilvgofxtmzflz . . . Ø Wh e re t he l e t t e rs a re r e p l a c e d by n u m b e r s , a d d e d m o d u l o 2 6 a n d converted back to letters. a=0,b=1,c=2,d=3,e=4,f=5,g=6,h=7,i=8,j=9, k=10,l=11,m=12,n=13,o=14,p=15,q=16,r=17,s=18, t=19,u=20,v=21,w=22,x=23,y=24,z=25 . Friedman's Attack: Example


<!-- Page 9 -->

Ø Assume that there are only high - frequency letters ( aehinorst ) in the key and plaintext. Ø Then looking at the first 3 letters in the cipher text (trigram) – Le tt e r m c a n o nl y be c a u s e d by : e i , i e , t t . – Le tt e r o c a n o nl y be c a u s e d by : a o , o a , h h – Le tt e r i c a n o nl y be c a u s e d by : a i , i a , e e , r r Ø There are 36 possible combination (rather than 17,576 for all letters), with plaintext and key combinations: – ( eaa,ioi ); ( eai,ioa ); … ( the,the ) … ( thr,thr ) Ø Most are impossible in English, limiting the choices. Friedman's Attack: Example


<!-- Page 10 -->

Vernam Cipher Ø A variant of the running key cipher converts the characters of the key and plaintext to binary form first before combining them. Ø This was first used with the 5 - bit Baudot telegraph code, but will also work with modern ASCII.


<!-- Page 11 -->

Ø The bits are combined using the Exclusive - OR (XOR) c i = p i Å k i p i = c i Å k i Ø Remember the p roperties of XOR operator • 2 bits the same → 0; different → 1; • a Å a = 0; a Å 0 = a • p’= c Å k = p Å k Å k = p Å 0 = p Ø XOR with the same key twice cancels out ( a Å a = 0 ) . – This makes XOR good for cryptography. Vernam Cipher


<!-- Page 12 -->

Ø If the key is a random series of letters, then this encryption algorithm cannot be broken à it is called One Time Pad. Ø The key, however, is very long and cannot be used more than once . Ø It would be convenient to be able to generate the long key from a shorter starting point. One Time Pad


<!-- Page 13 -->

Pseudo - Random Number: Running Key Cipher Ø One apparent way of generating a large number of key values from a small actual key is to use a pseudo - random number generator . – See later for more details on random number generators. – Just provide the initial value for the generator, the actual key: • It is called the Seeds Ø Then use pseudo - random numbers, which appear to be random, in the running key algorithm.


<!-- Page 14 -->

► This does not work in general, and there are standard techniques for breaking such ciphers Ø Which are surprisingly common among amateur cryptographers. ► The apparently random values do in fact have a structure which can be exploited. ► This technique will, however, work if a cryptographically secure pseudo - random number generator is used (see later). ► A secure type of pseudo random number generator Pseudo - Random Number: Running Key Cipher


<!-- Page 15 -->

Lorenz Cipher Ø This was a Vernam cipher with a running key provided by a pseudo - random number generator. – Used by the Germans in WWII – The pseudo - random number was a mechanical device (12 gear wheels) that produced a series of 5 - bit values. – It was used to encrypt quite long documents. Ø The weakness in the random number generator was exploited by differential cryptanalysis. – Two cipher text letters are combined using XOR. Ø It was broken by Colossus, the first large - scale electronic computer , which became operational in December 1943.


<!-- Page 16 -->

Polygram Substitution: Block Ciphers Ø Frequency attacks are weakened by encrypting blocks of characters at a time rather than single letters . Ø There is a smaller chance that the two blocks will be the same. Ø This is too complicated to do with a mechanical device, but electronic computers make it possible. Ø This brings us to the block ciphers of the modern era.


<!-- Page 17 -->

Quizzes 10. Define the basic structure shared by all running key encryption algorithms. 11. Agent Alice has to communicate with various operatives around the world, sending them long text messages. She decides to communicate with them using a literature - based version of the running key algorithm, where the reference document is the Unix man page for the sh command, available to all of her operatives. How does this algorithm function and what is the key? 12. This algorithm is not secure. Briefly describe how it can be attacked.


<!-- Page 18 -->

Lecture Summary


<!-- Page 19 -->

Polyalphabet and Running Key Ø A polyalphabet cipher uses a different substitution for each letter in the plain text. – Repeating eventually. – A mechanical encryption device can implement this easily with rotors ( Rotor Machine ). Ø A running key cipher takes this to the extreme with a key just as long as the plain text. – A short key generator is often used. – Starting position in a book. – Starting position for a pseudo - random number generator.