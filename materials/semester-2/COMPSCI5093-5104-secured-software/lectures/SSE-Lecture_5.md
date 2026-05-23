# SSE-Lecture_5

<!-- Page 1 -->

Lecture 5: Vulnerability Mapping Dr. Yutian Tang Yutian.Tang@glasgow.ac.uk


<!-- Page 2 -->

:Padlet for Questions Please post any questions you have during the lecture on this Padlet. I will address them at the end. • https://padlet.com/yutiantang/sse - lecture - 5 - question - wall - m3tk07zg66v2xjar


<!-- Page 3 -->

Threats in Software Engineering • Definition of Threats • Any circumstance or event with the potential to adversely impact organizational operations (including mission, functions, image, or reputation), organizational assets, or individuals through an information system via unauthorized access, destruction, disclosure, modification of information, and/or denial of service . • Definition of Software Vulnerability • A security flaw, glitch, or weakness found in software code that could be exploited by an attacker. Lecture 2


<!-- Page 4 -->

Threats and Vulnerabilities • A vulnerability is a property of a system or its environment which , in conjunction with a threat , can lead to a security failure , which is a breach of the system’s security policy. • Vulnerability: internal • Threat: external Threats Software System Vulnerabilities (Threats Modeling) (Vulnerability Mapping)


<!-- Page 5 -->

Which statement best describes the difference between a vulnerability and a threat ? • A. A vulnerability is an attacker, while a threat is a system weakness. • B. A vulnerability is a weakness in a system, while a threat is an action that can exploit it. • C. Vulnerabilities and threats are the same thing. • D. A threat can only exist if a vulnerability already exists.


<!-- Page 6 -->




<!-- Page 7 -->

Vulnerability Mapping • Def : Vulnerability mapping (i.e. Vulnerability identification) is to understand the general nature of the vulnerabilities (including scope, number, and type) relevant to the assessment and performing a cataloging of specific vulnerabilities as necessary to do so. • This process is about: • Understanding the system; • Understanding the nature of the vulnerabilities; • Performing a cataloging ; for guiding the development process.


<!-- Page 8 -->

Software System Modeling


<!-- Page 9 -->

What is Modeling? • Software/system modeling is the process of developing abstract models of a system, with each model presenting a different view or perspective of that system • Abstractions are simplifications because: • They ignore irrelevant details and • They only represent the relevant details. * What is relevant or irrelevant depends on the purpose of the model. • Model or models?


<!-- Page 10 -->

Example


<!-- Page 11 -->

Unified Modeling Language (UML) UML (Unified Modeling Language) • A standard for modeling object - oriented software. • Resulted from the convergence of notations from three leading object - oriented methods: • OMT (James Rumbaugh) • OOSE (Ivar Jacobson) • Booch (Grady Booch)


<!-- Page 12 -->

UML: First Pass • Use case Diagrams • Describe the interactions between a system and its environment ( the functional behavior of the system as seen by the user) • Class diagrams • Describe the object classes in the system and the associations between these classes. • Sequence diagrams • Describe interactions between actors and the system and between system components . … (more)


<!-- Page 13 -->

UML first pass: Use Case Diagrams • from user’s point of view WatchUser WatchRepairPerson ReadTime SetTime ChangeBattery Actor Use case Package Watch


<!-- Page 14 -->

UML first pass: Class Diagrams • Class diagrams represent the structure of the system 1 2 push() release() 1 1 blinkIdx blinkSeconds() blinkMinutes() blinkHours() stopBlinking() referesh() LCDDisplay Battery load 1 2 1 Time now 1 Watch Class Association Multiplicity Attribute Operations state PushButton


<!-- Page 15 -->

UML first pass: Sequence Diagram Sequence diagrams represent the behavior as interactions :LCDDisplay blinkHours() blinkMinutes() refresh() commitNewTime() :Time incrementMinutes() stopBlinking() :Watch pressButton1() pressButton2() pressButtons1And2() pressButton1() :WatchUser Object Message Activation Actor Lifeline


<!-- Page 16 -->

UML Core Conventions • Rectangles are classes or instances • Ovals are functions or use cases • Instances are denoted with an underlined names • myWatch:SimpleWatch • Joe:Firefighter • Types are denoted with non underlined names • SimpleWatch • Firefighter • Diagrams are graphs • Nodes are entities • Arcs are relationships between entities


<!-- Page 17 -->




<!-- Page 18 -->

Use Case Diagram


<!-- Page 19 -->

UML first pass: Use Case Diagrams • from user’s point of view WatchUser WatchRepairPerson ReadTime SetTime ChangeBattery Actor Use case Package Watch


<!-- Page 20 -->

Use Case Diagram • Used during requirements elicitation to represent external behavior • Actors represent roles , that is, a type of user of the system • Use cases identify the individual interactions between the system and its users or other systems. • The use case model is the set of all use cases . Passenger PurchaseTicket (Actor) (Use Case)


<!-- Page 21 -->

Use Case Diagrams • Use cases are written in natural language. • This enables developers to use them for communicating with the client and the users, who generally do not have an extensive knowledge of software engineering notations. • Use case diagrams can include four types of relationships • Association • <<extend>> • <<include>> and • Generalization .


<!-- Page 22 -->

Association • Association • Association relationships are depicted by a solid line between an actor and a use case. WatchUser WatchRepairPerson ReadTime SetTime ChangeBattery Actor Use case Package Watch Association


<!-- Page 23 -->

Association • Association : Specifies a semantic relationship that can occur between instances. • These lines signify that an actor is • involved in or • communicates with the system through that particular use case. WatchUser SetTime Association


<!-- Page 24 -->

<<extends>> • In a use case diagram, the <<extends>> relationship represents an optional functionality that extends the behavior of a use case . • This relationship is used to model a scenario in which an additional set of actions is performed under certain conditions, enhancing the base functionality of the primary use case. Passenger PurchaseTicket TimeOut <<extends>> NoChange <<extends>> OutOfOrder <<extends>> Cancel <<extends>>


<!-- Page 25 -->

<<extends>> • <<extends>> relationships are often used to represent scenarios that are exceptional or less common, but not exclusively so. • Use cases representing exceptional flows can extend more than one use case . • The direction of a <<extends>> relationship is to the extended use case Passenger PurchaseTicket TimeOut <<extends>> NoChange <<extends>> OutOfOrder <<extends>> Cancel <<extends>>


<!-- Page 26 -->

<<includes>> • <<includes>> relationship indicates a use case contains the behaviour defined in another use case. • << includes>> relationship is used to promote reusability . • The direction of a <<includes>> relationship is to the using use case (unlike <<extends>> relationships). Passenger PurchaseSingleTicket PurchaseMultiCard NoChange <<extends>> Cancel <<extends>> <<includes>> CollectMoney <<includes>>


<!-- Page 27 -->

<<includes>> • <<includes>> relationship: The included use case must be executed whenever the base use case is invoked . Passenger PurchaseSingleTicket PurchaseMultiCard NoChange <<extends>> Cancel <<extends>> <<includes>> CollectMoney <<includes>>


<!-- Page 28 -->

Generalization • One use case can specialize another more general one by adding more details Img : https:// www.modernanalyst.com /Careers/ InterviewQuestions /tabid/128/ID/365/What - is - use - case - generalization.aspx General More Specific


<!-- Page 29 -->

Misuse Case • Def .: M isuse case : A sequence of actions, including variants, that a system or other entity can perform, interacting with misusers of the entity and causing harm to some stakeholder if the sequence is allowed to complete. • An attempt to elicit security requirements by considering what a malicious actor could do within the context of the system • It helps in identifying security measures to increase system quality. • A misuse case is always associated with a misactor (misuser) , who initiates misuse cases to damage the system.


<!-- Page 30 -->

Use Case vs. Misuse Case • Use Cases specify required behavior of software and other products under development. • They are essentially structured stories or scenarios detailing the normal behavior and usage of the software • A Misuse Case on the other hand highlights something that should not happen ( i.e. a Negative Scenario). • It helps in defining new requirements . (mitigation strategies)


<!-- Page 31 -->

Which statement best describes a misuse case? • A. A functional requirement that the system must implement • B. A test case derived from system requirements • C. A description of how a malicious actor could harm or misuse the system • D. A diagram used to model database entities


<!-- Page 32 -->




<!-- Page 33 -->

Use Case vs. Misuse Case Use Cases Misuse Cases Goal: to represent what the system should do Goal: to represent a function that the system should not allow Scenario: a " positive " scenario is a sequence of actions leading to a goal desired by a person or organization Scenario: a " negative " one is a scenario whose goal is desired not to occur by the organization in question or desired by a hostile agent (not necessarily human). Use case as a completed sequence of actions which gives increased value to the user. Misuse case as a completed sequence of actions which results in loss for the organization or some specific stakeholder. Area of use: any business domain application M isuse case are most commonly used in the field of security.


<!-- Page 34 -->

Diagram Basic Concepts • The model introduces 2 new important entities (in addition to those from the traditional use case model, use case and actor: • Misuse case : A sequence of actions that can be performed by any person or entity in order to harm the system . • Misuser (Mis - actor) : The actor that initiates the misuse case . This can either be done intentionally or inadvertently .


<!-- Page 35 -->

Diagram Basic Concepts • In addition, it introduces two new relations to be used in the diagram: • <<Mitigates>> : Use case mitigate misuse case; • The use case is a countermeasure against a misuse case.


<!-- Page 36 -->

Diagram Basic Concepts • <<Threatens>> : A misuse case can threaten a use case, e.g. by exploiting it or hinder it from achieving its goals.


<!-- Page 37 -->

Diagram Basic Concepts


<!-- Page 38 -->

Lecture 5: Vulnerability Mapping Dr. Yutian Tang Yutian.Tang@glasgow.ac.uk We are resuming at XX:XX


<!-- Page 39 -->

Build a Misuse Case Diagram’5


<!-- Page 40 -->

Build a Misuse Case Diagram ( Overview) • 1. First identify actors (representing user classes) and build a comprehensive set of use cases as usual. • 2. For each use case, brainstorm and identify how 'negative' agents would attempt to defeat its purpose or thwart some of the steps in the use case description; this leads to the major misuse cases. • During the brainstorm sessions the focus should be to identify as many ways an attacker could cause harm in the service provided by the use case in focus • D etails of such attacks may be determined later.


<!-- Page 41 -->

Build a Misuse Case Diagram’2 ( Overview) • 3. Show the relationships between each use case and the corresponding misuse cases in a diagram. Use of words such as “threatens” would be found useful to show these relationships. • 4. After the misuse cases have been constructed, identify security use cases to countermeasure the intended purpose of each misuse case.


<!-- Page 42 -->

Build a Misuse Case Diagram ( Details) • Keep all the actors in the use case to the left of the procedures • Keep the procedures in the middle of the diagram • Left side will retain use case properties and information • Right side will contain an analysis of security needs and the procedural extensions necessary to round out the functionality in the use case to manage attacks ( misuse cases )


<!-- Page 43 -->

Case Study Scenario • Use Case: Submit Loan Application Misuse Case: SQL Injection Use Case: Input Validation Which modelling statement is semantically correct in a misuse case diagram? • A. Submit Loan Application threatens SQL Injection • B. SQL Injection mitigates Submit Loan Application • C. SQL Injection threatens Submit Loan Application • D. Input Validation threatens SQL Injection


<!-- Page 44 -->

Build a Misuse Case Diagram’5


<!-- Page 45 -->

Build a Misuse Case Diagram’5 1. Developer can distribute media player (use case) 2. Attack can replace distributed application with Trojan version (misuse case) <<threaten>> 1 2 3 3. <<mitigate>> Provide checksum of the original application * A checksum is a small - sized datum derived from a block of digital data for the purpose of detecting errors that may have been introduced during its transmission or storage.


<!-- Page 46 -->

Build a Misuse Case Diagram’5 1. The system allows user to play multimedia stream from the Internet (use case) 1 2 3 4 2. Attackers can launch malicious code through video file (misuse case) 3. <<mitigate>> Validate type of incoming data elements. 4. <<mitigate>> Validate length of incoming data elements


<!-- Page 47 -->

UML first pass: Sequence Diagram Sequence diagrams represent the behavior as interactions :LCDDisplay blinkHours() blinkMinutes() refresh() commitNewTime() :Time incrementMinutes() stopBlinking() :Watch pressButton1() pressButton2() pressButtons1And2() pressButton1() :WatchUser Object Message Activation Actor Lifeline


<!-- Page 48 -->

Sequence Diagrams • Sequence diagrams in the UML are primarily used to model the interactions between the actors and the objects in a system and the interactions between the objects themselves . • Show the order of the interaction visually by using the vertical axis of the diagram to represent time what messages are sent and when • Show elements as they interact over time, showing interactions or interaction instances • Do not show the structural relationships between objects


<!-- Page 49 -->

Representing Objects /Entities • Squares with object: type , optionally preceded by "name :" • write object's name if it clarifies the diagram • object's "lifeline" represented by dashed vertical line


<!-- Page 50 -->

Messages between Objects • Message (method call) indicated by horizontal arrow to other objects • write message name and arguments above arrow This diagram is indicating that a message named "Admit" with arguments " patientID " and " roomType " is being sent to an instance of a Hospital object to perform an operation related to admitting a patient with a specific ID into a specified type of room. Message is a communication in which a sender makes a request for either an Operation call or Signal reception by a receiver.


<!-- Page 51 -->

Lifelines • Sequence diagrams are organised according to time • Each participant has a corresponding lifeline • Each vertical dotted line is a lifeline, representing the time that an object exists • Lifeline describes the time - line for a process, where time increases down the page.


<!-- Page 52 -->

Messages and Focus of Control LifeLine 1{ main(){ value = t.process (); print (value) } } LifeLine 2{ process(){ …. return 10; } }


<!-- Page 53 -->

Translate a Misuse Case Diagram to a Sequence Diagram


<!-- Page 54 -->

Preparing for Translation • Thorough understanding of the misuse case, including malicious objectives and impact, is crucial. • Selection of misuse cases for translation is based on relevance and severity of impact. • Key system components and interactions identified for translation to sequence diagram elements.


<!-- Page 55 -->

Mapping Misuse Cases to Sequence Diagram Elements • Objects in sequence diagrams represent actors and system components from misuse cases. • Malicious actions in misuse cases become messages in sequence diagrams, outlining interaction sequences. • Initiation and completion of malicious activities are depicted, including alternative paths .


<!-- Page 56 -->

Mapping Misuse Cases to Sequence Diagram Elements • Initiation and completion of malicious activities are depicted, including alternative paths ? • Alternative Paths: • Alternative approaches an attacker may use to achieve his goal. • Each alternative path would have its own sequence of messages in the diagram, showing the steps the attacker could take.


<!-- Page 57 -->

Alternative approaches


<!-- Page 58 -->

Case Study Scenario • Misuse Case: Unauthorized Login Attempt • Misactor : Attacker • System Component: Authentication System When translating this misuse case into a sequence diagram, which elements should become objects (lifelines)? • A. Only the Authentication System • B. Only the Attacker • C. The Attacker and the Authentication System • D. The misuse case itself


<!-- Page 59 -->

Solution Scenario • Misuse Case: Unauthorized Login Attempt • Misactor : Attacker • System Component: Authentication System When translating this misuse case into a sequence diagram, which elements should become objects (lifelines)? • C. The Attacker and the Authentication System :Attacker :Authentication System submitCredentials () errormsg ()


<!-- Page 60 -->




<!-- Page 61 -->

Vulnerability Mapping In Practice 1. Identify Critical Assets • Essential components or data of the system that need proetection 2. Develop Misuse Cases • H ow these assets could be compromised or attacked. 3. Identify and Analyze Threats • Identify and understand the potential threats and how they can exploit vulnerabilities.


<!-- Page 62 -->

Case Study During threat modelling using STRIDE, you identify a Spoofing threat in the login system. How should this threat be represented in a misuse case diagram? • A. As a new use case called “User Authentication” • B. As a misuse case initiated by a misactor • C. As a system component • D. As a mitigation relation


<!-- Page 63 -->

Vulnerability Mapping In Practice 4. Map to System : • Align the misuse cases with the system's architecture to identify where vulnerabilities may exist. 5. Prioritize Risks : • Assess the likelihood and impact of each threat to prioritize the vulnerabilities. 6. Define Security Requirement • Develop strategies (security requirement) to mitigate or eliminate identified vulnerabilities.


<!-- Page 64 -->

Acknowledgement & Reference • Bruegge , B., & Dutoit , A. H. (2009). Object – oriented Software Engineering using UML, Patterns, and Java. Learning, 5(6), 7. • https://www.inf.ed.ac.uk/teaching/courses/seoc/2009_2010/notes/08_notes.pdf • SSE Handouts 2025 • Slides by Professor Stephanie Ludi RIT SE Department Winter Quarter 2006 • Templates for Misuse Case Descriptions by Gottorm Sindre and Andreas L. Opdahl available at www.ifi.uib.no /conf/refsq2001/papers/p25.pdf • Capturing security requirements through Misuse Cases by Gottorm Sindre and Andreas L. Opdahl available at www.nik.no /2001/21 - sindre.pdf • Initial Industrial Experience of Misuse Cases in Trade - Off Analysis by Ian Alexander, available at http://easyweb.easynet.co.uk/~iany/consultancy/misuse_cases/misuse_cases_in_t radeoffs.htm


<!-- Page 65 -->

Thank you! Any Questions?