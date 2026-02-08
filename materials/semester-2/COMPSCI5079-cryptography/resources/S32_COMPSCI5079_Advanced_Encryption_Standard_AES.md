# S32_COMPSCI5079_Advanced_Encryption_Standard_AES

<!-- Page 1 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 2 -->

Lecture 3: Symmetric - key Cryptography Block Ciphers


<!-- Page 3 -->

Lecture 3: Overview


<!-- Page 4 -->

1. Feistel ciphers – A family of single - key, block substitution ciphers 2. Data Encryption Standard (DES) – 64 - bit Block cipher, 56 - bit key length – Insecure for modern applications – Still widely used 3. Advanced Encryption Standard (AES) – 128 - bit Block cipher, different key lengths (128, 192, 256) – Replacement for DES Outline


<!-- Page 5 -->

Why is AES necessary?


<!-- Page 6 -->

Advanced Encryption Standard (AES) Ø The NIST (US National Institute for Standards and Technology) started a search for a replacement for DES once its deficiencies became apparent. Ø The design of AES was performed in public, unlike DES. • Entries were invited from around the world. • The algorithms and analysis were made public. • Comments were invited from any organisation .


<!-- Page 7 -->

The Competition Ø MARS from IBM Ø RC6 from RSA Security Ø Twofish from Counterpane (Bruce Schneier ) Ø Serpens from Ross Anderson, Eli Bihan , Lars Knudsen (Cambridge University Academic lead team) Ø Rjindael from Joan Daemen and Vincent Rjimen (Belgian academics) Ø The winner, announced in 2000, was Rjindael .


<!-- Page 8 -->

The Rjindael Algorithm Ø AES is based on a design principle known as a Substitution - Permutation network (SP network). AES does not use Feistel ciphers Ø Rijndael is an iterated block cipher, meaning that it encrypts and decrypts a block of data by the iteration or round of a specific transformation. Ø Similar to DES but used calculations involving polynomials rather than table lookups in S - Boxes . Ø Most arithmetic is performed with 8 - bit values and uses polynomials mod the irreducible polynomial x 8 + x 4 + x 3 + x + 1. Ø The multiplication lookup table can be implemented in hardware.


<!-- Page 9 -->

Rjindael Blocks and States Ø The algorithm can be used with data lengths of 128, 192 or 256 bits, and also key lengths of 128, 192 or 256 bits. Ø We will just consider the ( 128, 128) versions. Ø Other versions are similar but have more rounds. Ø In what follows – The key K is 128 bits long. – Each block S is 128 bits long, i.e. 16 bytes called s i . Ø The algorithms for encryption and decryption are related but different. Ø The (128, 128) version of the algorithm has 10 rounds, each with its own 128 - bit sub - key K[ i ] .


<!-- Page 10 -->

AES Applications


<!-- Page 11 -->

AES Encryption Algorithm Ø AES operates on a 128 - bit plain text block as a single 4X4 matrix which would have a total size of 16 bytes. Every 4 bytes would represent a word . Ø The 128 - bit key is expanded to form an array containing four 32 - bit words. At each round, four distinct words (e.g., W0, W1, W2, W3) are served to the round key process from the expanded key . Ø A round has four functions among which one is of permutation and three are of substitution: – Substitute Byte, Mix Column and Add Round Key functions are substitution functions – Shift Rows is a permutation function . Ø Only the Add Round key function makes use of the key.


<!-- Page 12 -->

AES Encryption Algorithm AddRoundKey (S, K[0 ]); for (int round = 1; round <= 10; round ++){ SubBytes (S ); ShiftRows (S ); if (round != 10) //Not final round MixColumns (S ); AddRoundKey (S,K[round ]); }


<!-- Page 13 -->

Function: AddRoundKey (S,K) Ø This is very simple. Ø S and K are XOR’ ed bit - by - bit , and the result is left in S.


<!-- Page 14 -->

Function: AddRoundKey (S,K)


<!-- Page 15 -->

Function: SubBytes (S) SubBytes function is a simple transform which converts 8 - bit data to other 8 - bit data: Ø 8 - bit polynomial arithmetic is used. Ø s, x, y a re a l l 8 - b i t v a l u e s . Ø x = s - 1 w h e r e t he in v e r s e o f 0 i s 0. Ø y = Mx , where the matrix M h as single - bit entries : Ø Bitwise arithmetic is used: + / - / XOR . Ø y now r e p l ace s t he o l d v a l ue of s . 1 0 0 0 1 1 1 1 1 1 0 0 0 1 1 1 1 1 1 0 0 0 1 1 1 1 1 1 0 0 0 1 1 1 1 1 1 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1


<!-- Page 16 -->

Function: SubBytes (S)


<!-- Page 17 -->

The Matrix M Ø This simple structure of the matrix M allows a formal proof that the algorithm is resilient to attacks by differential and linear cryptanalysis . Ø This contrasts with the choice of S - boxes in the DES algorithm, which looks like they were chosen randomly.


<!-- Page 18 -->

Function:ShiftRows (S) Ø The S hiftRows and MixColumns subroutines ensure that all bytes interact with each other in the algorithm . Ø They both treat the 16 bytes of the state S as a 4x4 matrix . Ø ShiftRows is just a simple shift of the 4 bytes in each row . Ø The amount of shift increases with each row. s 0 s 1 s 2 s 3 ® s 0 s 1 s 2 s 3 s 4 s 5 s 6 s 7 ® s 5 s 6 s 7 s 4 s 8 s 9 s 1 0 s 11 ® s 10 s 11 s 8 s 9 s 12 s 1 3 s 1 4 s 12 ® s 15 s 12 s 13 s 14


<!-- Page 19 -->

Function:ShiftRows (S)


<!-- Page 20 -->

Function: MixColumns (S) Ø The 16 bytes can be represented as a 4x4 matrix. Ø Each column of 4 bytes is treated as a cubic polynomial in X, with 8 - bit coefficients, the polynomial for the 0 th column is: s 0 + s 4 X + s 8 X 2 + 12 X 3 Ø Each column polynomial is multiplied by a fixed polynomial with 8 - bit coefficients which are: – Where coefficients are 8 - bit polynomials P 1 = 1, P 2 = x, P 3 = x + 1. – Naturally, each 8 - bit coefficient also uses polynomial arithmetic ! Ø These polynomials are reduced mod another polynomial X 4 + 1 – This is not irreducible, and so care has to be taken to choose numbers that have inverses. col 0) P 2 + P 3 X + P 1 X 2 + P 1 X 3 col 1) P 1 + P 2 X + P 3 X 2 + P 1 X 3 col 2) P 1 + P 1 X + P 2 X 2 + P 3 X 3 col 3) P 3 + P 1 X + P 1 X 2 + P 2 X 3


<!-- Page 21 -->

Function: MixColumns (S)


<!-- Page 22 -->

AES Decryption Ø Inverse operations are performed in the reverse order . Ø MixColumns , ShiftRows and SubBytes e ach have a simple inverse operation that can undo its effects . Ø AddRoundKey is i t s o w n i n v e r se . Ø InverseSubBytes mu ltiplies by the reverse 8 - bit matrix, and then calculates the polynomial inverse . Ø InverseShiftRows s hift s l e f t r a t h e r t h a n r i g h t . Ø InverseMixColumns inv e r t s t he c o l u m n m a t r i x a nd p e r f o r m s t he same calculations.


<!-- Page 23 -->

Sub - key Generation Ø We need to produce 10+1 round keys, each of 128 bits, from the initial 128 - bit key . Ø Similar operations are used to generate the sub - keys. – Shifts – 8 - bit polynomial arithmetic. – Exclusive OR.


<!-- Page 24 -->

DES and AES in Comparison DES Algorithm AES Algorithm Key Length - 56 bits Key Length - 128, 192, 256 bits Block Size - 64 bits Block size - 128 bits Fixed no. of rounds No. of rounds dependent on key length ( 10, 12, and 14 ) Slower and less secure Faster and more secure


<!-- Page 25 -->

Summary Ø AES was adopted after an open competition . Ø It uses many rounds, each with its own sub - key. Ø All the operations are fast and don’t require much silicon . Ø The basic transformations use mathematics so it can be proved to be secure from all known attacks . Ø Both the key and block size can be 128, 192 or 256 bits long.


<!-- Page 26 -->

Quizzes 4. Describe how the process of choosing the AES algorithm was different from the one that led to DES. Was the new process better or worse ? In what ways is AES better than DES? 5. Describe how the Rjindael AES encryption algorithm uses polynomial arithmetic. What is the advantage of using this arithmetic over the use of S - boxes in DES?