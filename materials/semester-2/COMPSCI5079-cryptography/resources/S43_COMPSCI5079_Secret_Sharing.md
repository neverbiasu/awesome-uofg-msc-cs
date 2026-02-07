# S43_COMPSCI5079_Secret_Sharing

<!-- Page 1 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 2 -->

Lecture 4: Message Digests, Random Numbers and Secret Sharing


<!-- Page 3 -->

Outline 1. Message Digest – Message Digest Concept – Design a Hash Function 2. Random Numbers – Real Random numbers – Pseudo - random numbers – Cryptographically Secure Pseudo - random numbers 3. Secret Sharing ( Multiple - key cryptography) – Secret Splitting – Secret Sharing


<!-- Page 4 -->

Secret Sharing (Multiple - key Cryptography)


<!-- Page 5 -->

Secret Splitting Ø Let us imagine that we have a secret that we cannot entrust to just one person , but want to split between two people. Ø Both people are needed to reconstruct the message. Ø We cannot just give half the bits to each person. – It would make it easier for one person to make a Brute - force attack to recover the other person’s half.


<!-- Page 6 -->

Ø The following protocol lets the boss Sam split the secret between two underlings Alice and Bob. – Let M be the secret message. – Sam obtains a truly random bit string R , the same length as M, from a trusted third - party Trent. – Sam calculates P = M Å R , gives P to Alice and R to Bob. – The message can be reconstructed as P Å R = M . Ø This technique cannot be broken by cryptographic techniques, since R is a one - time pad . Secret Splitting


<!-- Page 7 -->

Splitting between more than two people Ø This technique is easily generalised to more than two people. – Let us split the secret between Alice, Bob, Carol and Dave. – Sam provides three random bit strings, R, S and T. – The fourth string P = M Å R Å S Å T. – The four strings are distributed to the four underlings. – The original message is recovered by P Å R Å S Å T = M . Ø Limitations of this protocol – The boss has absolute power and can hand out rubbish if he wants. – All pieces of the encrypted message are necessary. – If Alice falls under a bus, then the secret is lost.


<!-- Page 8 -->

Secret Sharing Ø It is possible to split a secret up into n pieces so that it can be recovered with only m of the pieces. This is called a threshold scheme ( m,n ) . Ø With a (3,4) threshold scheme, the secret can be divided into 4 pieces and given to Alice, Bob, Carol and Dave. – Only three of them (any three) are needed to recover the secret. – If Alice falls under a bus, then the secret is recoverable, – but if Bob is away at the time, then Carol and Dave cannot recover the secret by themselves. Ø The individual pieces are called shadows .


<!-- Page 9 -->

Lagrange Interpolation Scheme(Shamir) Ø This scheme is based on the numerical solution of linear equations. Ø Integers are used to avoid the problem of rounding errors that arise when using real numbers. Ø Naturally, the integers are calculated modulo p , so that division produces an integer answer. Ø The shadows are calculated using a polynomial of the appropriate degree. – This is not polynomial arithmetic, as discussed in 1 st lecture . We are interested in solving the equation and finding x . Ø If 2 shadows are needed to construct the key, then the appropriate polynomial is a line which has two unknown coefficients a and b : y(x) = a * x + b (mod p)


<!-- Page 10 -->

Lagrange Interpolation Scheme(Shamir) The algorithm when 2 shadows are needed : Ø Choose a prime number p w hich is larger than the number of shadows ( n ) and the largest secret . – Prime p must be handed out along with the shadows and made public. Ø Choose a random number < p f or the coefficient a . – It is only used to generate the shadows and is discarded after the shadows are calculated. – It must be kept secret. Ø The coefficient b i s the secret message M . Ø This produces the polynomial: y (x) = a x + b (mod p)


<!-- Page 11 -->

Ø The shadows are calculated by evaluating the polynomial at n different random values of x . I will use x = 1 , 2, 3, 4 for simplicity. Ø Each shadow (or key) is a triple (x, y, p). – shadow(1) = y(1) – shadow(2) = y(2) – shadow(3) = y(3) – shadow(4) = y(4) Ø Since the straight line has two unknown coefficients a a nd b , any two shadows can be used to find them. Ø The shadows generate two linear equations which can be solved for the t wo u n kn o w ns a an d b . Ø We want b , which is the secret M . Lagrange Interpolation Scheme(Shamir)


<!-- Page 12 -->

Shamir Secret Sharing : Example Ø Let the secret M be 11. Ø Chose p = 13, a = 7. Ø In practice, larger numbers will be used! Ø Generate 4 keys from y(x) = 7 x + 11 (mod 13) k 1 = y(1) mod 13 = 5 (key = 1, 5, 13) k 2 = y(2) mod 13 = 12 (key = 2, 12 , 13) k 3 = y(3) mod 13 = 6 (key = 3, 6, 13) k 4 = y(4) mod 13 = 0 (key = 4, 0, 13)


<!-- Page 13 -->

Ø Now let us recover the secret from two keys, say k 2 , k 3 . • 2a + M = 12 (mod 13) --- (EQ_1 ) • 3a + M = 6 (mod 13) --- (EQ_2 ) Ø These equations must be solved. Ø We can eliminate a by using 3* (EQ_1 ) – 2* (EQ_2 ) • 3 * EQ_1 is 6a + 3M = 10 (mod 13) • 2 * EQ_2 is 6a + 2M = 12 (mod 13) Ø Subtracting M = - 2 = 11 (mod 13) , the secret. Shamir Secret Sharing : Example


<!-- Page 14 -->

Cheating with Secret Sharing Ø Alice, Bob and Carol are sitting in a bunker when the message "Launch those missiles" comes from the president. Carol is a pacifist and so enters a random number rather than her shadow. – The missiles stay in their silos, and no one can find out why. Ø Alice, Bob and Eve (disguised as Carol) are sitting in the bunker and the same thing happens. Eve secretly notes down the shadows entered by Alice and Bob. – The missiles stay in their silos but now Eve knows all three of the shadows . She can then retarget the missile and launch it herself.


<!-- Page 15 -->

Cheating Prevention Ø The Lagrangian protocol/Shamir Secret Sharing can be modified to make it easier to detect cheaters, with an increase in the complexity of the way the algorithm is applied . Ø The basic approach is to have a series of secrets, each linked to the previous , with only the last being useful. Ø The cheater is then revealed early on.


<!-- Page 16 -->

Summary Ø Secret Sharing / Multiple - key cryptography. – Secret splitting using XOR . All parties needed to reconstruct the key . – Secret sharing based on linear equations. Only some of the parties are needed .


<!-- Page 17 -->

Quizzes 4. An organisation has decided that its secrets are too valuable to entrust to just one person and has decided that three people will be needed to access the secret information. Devise a scheme that will allow the head of the organisation to issue passwords to three people in such a way that all three passwords are needed simultaneously. Give a numerical example of the operation of your scheme when the secret is the number 42. You may assume that each secret is a 6 - bit number. 5. One drawback of the previous scheme is that all three persons are needed to operate it. All secrets would be lost if one person were to have an accident. Devise an alternative scheme where three people are still needed to access the information, but five people have parts of the key. Any three people will be sufficient. A numerical example is not needed!