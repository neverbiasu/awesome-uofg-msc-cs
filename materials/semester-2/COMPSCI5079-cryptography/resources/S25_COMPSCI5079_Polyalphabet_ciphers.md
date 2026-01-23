# S25_COMPSCI5079_Polyalphabet_ciphers

<!-- Page 1 -->

COMPSCI5079(M) Cryptography & Secure Development Dr. Nguyen Truong Lecturer (Assistant Professor), SoCS , University of Glasgow Email: Nguyen.Truong@Glasgow.ac.uk Office: SAWB 221C, Sir Alwyn Williams Building, 18 Lilybank Gardens


<!-- Page 2 -->

Lecture 2: Traditional Encryption and Decryption schemes


<!-- Page 3 -->

Lecture Outline 1. Types of Attack – Threats that need to be protected against. 2. Transposition and Substitution ciphers. 3. Homophonic Ciphers – Plaintext letters can have several ciphertext letters. 4. Polyalphabet Ciphers and Rotor Machines. – Mechanical encryption devices. 5. Running key Ciphers – The key is the same length as the plaintext


<!-- Page 4 -->

Polyalphabet Ciphers


<!-- Page 5 -->

Ø Polyalphabet substitutions destroy single - letter frequencies by using several different substitutions one after the other. Ø The actual substitution used for each letter is different and depends on the position of the letter in the plaintext as well as its value . Ø The Vigenère cipher is probably the best - known example of a polyalphabetic cipher, though it is a simplified special case. Ø The Enigma machine is more complex but is still fundamentally a polyalphabetic substitution cipher. Polyalphabetic Substitutions


<!-- Page 6 -->

Vigenere /Beaufort Cipher Ø This is a form of shift substitution , where the amount of shift depends on the position of the plaintext letter c i . c i = (p i + k i ) % n Ø The series of keys k 0 , k 1 , k 2 … repeat with a period d .


<!-- Page 7 -->

Ø A simple example has a period of 3 ( d=3 ). • The first letter is shifted 3 ( k 0 =3 ). • The second letter is shifted 7 ( k 1 =7 ). • The third letter is shifted 5 ( k 2 =5 ). Ø The next block of 3 is treated similarly. sec uri tya ndc ryp tog rap hy becomes ( s+3 ® v, e + 7 ® l, c+5 ® h ) vlh xyn wff okh ufu wvl uhu kf . Vigenere /Beaufort Cipher: Example


<!-- Page 8 -->

Kasiski's Method of Attacking Periodic Ciphers Ø The Beaufort cipher will repeat with a period d that is not too long. Ø Look for identical plaintext phrases (typically tri - grams) that are an exact multiple of the period apart. Ø Each phrase will be encoded to form the same cipher text. Ø The message in the example: ( security.and.cryptography ) is not long enough to illustrate this. – Short messages were relatively secure. – However, even in this short message, y is in second position 3 times and always becomes f .


<!-- Page 9 -->

Ø A rotor machine uses different substitutions , each one implemented as a rotor . – It is a mechanical encryption device. Ø Each rotor has a circle of metal contacts on the outside of both left and right faces, one contact for each letter in the alphabet. Ø Each contact on the left face is connected to one on the right face by internal wiring. Ø Several rotors are combined so that each contact on the left face of one rotor presses against a contact on the right face of the next rotor. Ø The input keyboard connects to the corresponding position on the right face of the first rotor. Ø The left face of the last rotor connects to the output device , typically a printer. Ø Depressing a key completes the circuit, printing the cipher character. Rotor Machines: Description


<!-- Page 10 -->

Rotor Diagrams Ø One Enigma rotor Ø Substitutions after left rotor rotates


<!-- Page 11 -->

Ø The rotor positions are changed after each key is input . – In some machines, all the rotors change positions each time . – In other cases, only one rotor moves each time, with the others moving occasionally, similar to the way a car’s mileage is recorded . Ø The key is the starting position of each rotor. Ø T h es e m ac h in e s on l y r e p ea t a f t e r a v e ry lon g p e r io d a nd a re n ot vulnerable to Kisiski’s attack. Ø They have good confusion and diffusion. Rotor Machines


<!-- Page 12 -->

The Enigma Machine Ø This was a three or four - rotor machine (there were several variants). Ø There was also a reflector at one end, a fixed rotor with only one face, with letters connected in pairs. – The current went into the reflector at one letter, – And out at another letter, reflecting back through the other rotors. Ø A plugboard connected several pairs of letters with a wire. It was a simple permutation. Ø When a key was pressed, an electrical circuit was created, connecting the key, a plug board circuit, each rotor, the reflector, each rotor again, and then the printer. Ø The reflector meant that the same setup could be used for encryption and decryption without making any changes.


<!-- Page 13 -->

Ø The key was the choice of rotors and the order in which they were inserted in the machine, together with the plugboard settings . Ø There were a small number of networks (army, navy, air force etc ), and each network used the same key for all traffic for one day . – The key changed daily at midnight . Ø It was highly likely that a large number of documents with the same starting letters would be encrypted with the same key, leading to the same starting cipher text . – Many complete messages would just say “ Nothing to report ” in German, which would lead to identical cipher text . Ø This was prevented by the use of an “ indicator key ” The Enigma Machine: The Keys


<!-- Page 14 -->

Ø The indicator key was another set of three or four letters chosen at random by the operator and different for each message. Ø The operator first encrypted the indicator key using the standard daily settings. Ø He then changed the rotor settings to the indicator key. Ø Then he typed the rest of the message. Ø Thus, two identical plaintext messages were unlikely to result in identical ciphertext messages. The Enigma Machine: Indicator Keys


<!-- Page 15 -->

Ø The Enigma was broken with a brute force attack using a set of mechanical devices called Bombes . Ø It was mainly a known plaintext attack, testing a number of standard phrases, called cribs . – Ma ny m essa g e s s t a r t e d w i t h AN X . “An ” i s G e r m a n f o r To , a n d X wa s used for spaces. • “To General Hoth . . .” – “Ein” , German for 1, appeared in 90% of messages. Ø Many messages contained the German for “Nothing to report”. Breaking The Enigma A wartime picture of a Bletchley Park Bombe


<!-- Page 16 -->

Ø The reflector was a big weakness because it meant that each ciphertext letter was different from the plain text. Ø For instance, – If the cipher text started with ‘A’ , then the plaintext could not be “ANX”. – One code breaker noticed that a ciphertext message did not contain the letter L and correctly deduced that the plain text was LLLLLL ... – This greatly restricted the number of keys that had to be tested. – The bombes would stop if they found a key that produced the crib. – This was usually a false stop because several possible keys could produce the crib (see unicity distance ). – They were checked by hand. Breaking The Enigma


<!-- Page 17 -->

1. Describe how a rotor machine could be used to encrypt a text document, explaining the advantages of using it. 2. Describe the Enigma machine variant of the rotor algorithm, pointing out the weakness incorporated by Enigma. What factors led to the breaking of the Enigma code? 3. It is proposed that a modern mechanical rotor machine would make a useful encryption machine since it does not rely on computer technology, which can be compromised. How many rotors would be needed for secure encryption? Justify your answer. Quizzes