# SSE-Lecture4

<!-- Page 1 -->

Lecture 4: Threat Modelling Dr. Yutian Tang Yutian.Tang@glasgow.ac.uk


<!-- Page 2 -->

• Scan the QR code to take your attendance • This QR code is only valid today ( 3:00 PM to 6:00 PM)


<!-- Page 3 -->

:Padlet for Questions • https://padlet.com/yutiantang/sse - lecture - 4 - question - wall - j78p9thtstrqgu8e Please post any questions you have during the lecture on this Padlet. I will address them at the end.


<!-- Page 4 -->

SSE Feedback Form


<!-- Page 5 -->

Outline • Understand the basis of threat modelling. • Describe the four - step framework to threat modelling. • Apply STRIDE to software design. • Apply Attack Tree to software design • Threat Libraries (CAPEC and CWE)


<!-- Page 6 -->

Recommended Text


<!-- Page 7 -->

Threats and Vulnerabilities • Nature : Vulnerabilities are inherent flaws or weaknesses; • Threats are potential or actual actions that can exploit the vulnerabilities. • Dependency : A threat does not need a vulnerability to exist (e.g., natural disasters); however, most softw are/cyber threats exploit existing vulnerabilities. Lecture 2 Unit 4 Threat Modelling 6/2/2026 Unit 5 Vulnerability Mapping 13/2/2026


<!-- Page 8 -->

Threats in Software Engineering • Definition of Threats • Any circumstance or event with the potential to adversely impact organizational operations (including mission, functions, image, or reputation), organizational assets, or individuals through an information system via unauthorized access, destruction, disclosure, modification of information, and/or denial of service. • Threat Actor : A threat actor, also known as a cyber threat actor or malicious actor, is an individual or group that deliberately causes damage to digital devices or systems. Lecture 2


<!-- Page 9 -->

What is Threat Modeling • Def . : Threat modeling is a process by which potential threats, such as structural vulnerabilities or the absence of appropriate safeguards, can be identified, enumerated, and prioritized – all from a hypothetical attacker’s point of view. Threat Modelling: Designing for Security


<!-- Page 10 -->

What is Threat Modeling • What is the primary goal of threat modelling? • A. To document all software features B. To estimate the cost of development C. To identify, quantify, and address potential security threats D. To define the user interface design Threat Modelling: Designing for Security


<!-- Page 11 -->




<!-- Page 12 -->




<!-- Page 13 -->

Four - step Framework 1. Model the system you’re building, deploying or changing. Model Syst em Find Threats A d d r e s s Threats V ali d a t e 2. Find threats using the model. 3. Address the threats. 4. Validate the result for completeness and effectiveness.


<!-- Page 14 -->

How to Model Threats? In short, you need to answer and address the following questions: 1. What are you building? 2. What can go wrong? 3. What should you do about those? 4. Did you do a good job of analysis? Model Syst em Find Threats A d d r e s s Threats V ali d a t e


<!-- Page 15 -->

(1) What are You Building? • Diagrams are a good way to communicate what you are building. • There are lots of ways to diagram software and you can start with a whiteboard diagram of how data flows through the system. • Example of a simple web app with a web browser, web server, some business logic and a database. Web browser Web Server Business Logic Database Model Syst em


<!-- Page 16 -->

Trust Boundaries • Adding boundaries to show who controls what is a simple way to improve the diagram. • You can easily see that the threats that cross those boundaries are likely important ones, and may be a good place to start identifying threats. • These boundaries are called trust boundaries . This boundary defines which parts are trusted and which are considered untrustworthy. Web browser Web Server Business Logic Database trusted trusted untrusted


<!-- Page 17 -->

Draw Trust Boundaries 1. Identify Components and Assets: First, identify all critical components and assets in the system, such as servers, databases, network devices, etc. 2. Divide Areas: Based on the security level and trustworthiness of these components and assets, divide them into different areas. For example, an internal network might be considered a trusted area, while the Internet can be considered as untrusted . 3. Draw Boundaries: Use lines or colors to represent the boundaries between these areas in the diagram. Trust boundaries are often marked with dashed lines or distinct colors to clearly differentiate between areas of different security levels.


<!-- Page 18 -->

Draw Trust Boundaries’2 4. Mark Security Controls: Indicate the security controls implemented at the trust boundaries, such as firewalls, authentication systems, etc. 5. Indicate Data Flows: You can draw the direction of data flow in the diagram to show how data moves between different trust areas. 6. Annotations and Explanations: Add explanations for each component, area, and control measure in the diagram to better understand the role of each part and the significance of the trust boundaries.


<!-- Page 19 -->

Trust Boundaries’2 • The trusted components are circled with dashed lines. • In a diagram, these trust boundaries can be represented by dashed lines or distinct colors, with arrows indicating the direction of data flow. Web browser Web Server Business Logic Database Corporate Data Center Web Storage (offsite) trusted trusted untrusted


<!-- Page 20 -->

Trust Boundaries’3 Web browser Web Server Business Logic Database Corporate Data Center Web Storage (offsite) • It can be very helpful to number each process, data flow and data store in the diagram. 1 2 3 5 7 6 4 trusted trusted untrusted


<!-- Page 21 -->

• You’re securing an online banking app. At which stage of the threat modelling process would you diagram how users log in and transfer money? A. Validate B. Find Threats C. Model the System D. Address Threats


<!-- Page 22 -->




<!-- Page 23 -->

(2) What Can Go Wrong? • Given a simple diagram, we can start thinking about what can go wrong. • Example • How do you know that the web browser is being used by the person you expect? • What happens if someone modifies data in the database? • Is it okay for information to move from one box to the next without encryption? • You can identify threats like these using the STRIDE approach. Find Threats


<!-- Page 24 -->

(2) What Can Go Wrong? Use STRIDE framework to walk through each part of the diagram: • S poofing; • T ampering; • R epudiation • I nformation Disclosure • D enial of Service; • E levation of Privilege Web browser Web Server Business Logic Database trusted trusted untrusted


<!-- Page 25 -->

Question: What does “each part of the diagram” refer to? • A. Each box only. • B. Each trust boundary only. • C, All security elements including components and data flows (i.e., 1 - 7 in the diagram). • D. Only the untrusted part. Web browser Web Server Business Logic Database 1 2 3 5 7 6 4 trusted trusted untrusted


<!-- Page 26 -->




<!-- Page 27 -->

(2) What Can Go Wrong? • STRIDE is a model of threats developed by Microsoft. • It’s a helpful tool for thinking about different potential attacks or vulnerabilities. • If you’re finding it hard coming up with potential attacks, you can use STRIDE to help stimulate ideas. • The important thing is to come up with threats and write them down, not to ensure they are “correctly” categorized.


<!-- Page 28 -->

(2) What Can Go Wrong? Use STRIDE framework to walk through each part of the diagram The basic method of using the STRIDE framework involves analyzing a system to identify where it may be susceptible to the 6 types of threats listed above . Then, corresponding security measures are taken to mitigate the risks based on the identified threat types


<!-- Page 29 -->

(2) What Can Go Wrong? 1. Spoofing: Involves illegally accessing and then using another user's authentication information, such as username and password. For example, • An attacker obtains a leaked list of usernames and passwords from a previous data breach and uses those credentials to log in to a web application as legitimate users.


<!-- Page 30 -->

(2) What Can Go Wrong? 2. Tampering: This refers to the malicious modification of data . Tampering is any activity that causes illegal alterations or data exploitation, whether in transit or at rest. For example, • An adversary tampers with network packets, and changes commands after the user has logged in. • An adversary tampers with a registry key, making us run any program they choose.


<!-- Page 31 -->

(2) What Can Go Wrong? 3. Repudiation: Associated with users who deny performing an action without other parties having any way to prove otherwise . For example, • E - commerce Transactions : A customer might make an online purchase and then deny the transaction, claiming their credit card was used without consent. • Email Communications : An employee sends a sensitive email and later denies sending it, potentially causing legal issues or internal disputes. • Document Signing : A signatory claims they did not sign a document, potentially voiding a contract. • … Non - repudiation measures, like logs and digital signatures, are used to combat this threat.


<!-- Page 32 -->

(2) What Can Go Wrong? 4. Information Disclosure: Exposing information to someone not authorized to see it. It can happen through various means, such as hacking, accidental leaks, or improper system configuration. Examples: • P asswords for known or unknown users, copies of emails, and names and social security numbers in a database …


<!-- Page 33 -->

(2) What Can Go Wrong? 5. Denial of Service (DoS): This threat aims to make a resource (such as a network, application, or service) unavailable to its intended users . Example: Application - Level Attacks : These target specific applications with a large number of requests that require intensive processing and database interaction, thus overwhelming the application.


<!-- Page 34 -->

(2) What Can Go Wrong? 6. Elevation of Privilege: Elevation of privilege threat refers to an attacker obtaining access privileges higher than their legitimate rights by exploiting vulnerabilities or errors. Example: • An adversary who starts as an anonymous internet user can send commands to an application that execute as the web server. • An adversary with a web server can make code run as the local user. • An adversary who has the ability to log onto the machine as a standard user can become an administrator.


<!-- Page 35 -->

STRIDE framework https:// gds - way.digital.cabinet - office.gov.uk /standards/ threat - modelling.html#stride Threat Security Control Spoofing Authenticity Tampering Integrity Repudiation Non - repudiability Information Disclosure Confidentiality Denial of Service Availability Elevation of Privilege Authorisation


<!-- Page 36 -->

Tips for Identifying Threats • Start with external entities: If you’re not sure whether to start, start with the external entities or events which drive activity. • Never ignore a threat because it’s not what you’re looking for right now. You might come up with some threats while looking at other categories. Write them down and come back to them. • Focus on feasible threats


<!-- Page 37 -->




<!-- Page 38 -->

(3) What should you do about those? There are 4 types of actions you can take against a threat: 1. Mitigate it 2. Eliminate it 3. Transfer it 4. Accept it


<!-- Page 39 -->

Mitigating Threats • Doing things to make it harder to take advantage of a threat . • Requiring passwords to control who can log in mitigates the threat of spoofing. • Adding password controls that enforce complexity or expiration makes it less likely that a password will be guessed or usable if stolen. • Doing things to make it harder to take advantage of a threat.


<!-- Page 40 -->

Eliminating Threats • Eliminating threats is almost always achieved by eliminating features . • If you have a threat that someone will access the admin function of a website by visiting the /admin/<URL> • This threat can only be eliminated by removing the interface . For instance, by moving away from HTTP and handling administration through the command line etc.


<!-- Page 41 -->

Transferring Threats • Transferring threats is about letting someone or something else handle the risk . • Example: • Pass authentication threats to operating systems. • Transfer risk to customers. For example, by asking them to click through lots of hard - to - understand dialogs before they can do the work they need to do. • There is an inherit risk that you are trusting that other entities to adequately handle the threat . Not a good practice!


<!-- Page 42 -->

Threat Acceptance • This is the final approach to addressing threats. • For most organizations, searching everyone who enters the building is too much of a hassle to ensure security. • The cost of preventing someone from inserting a backdoor in hardware is expensive. • Here, you may want to accept the risk, because it is easier. ( but this is subject to adequate risk assessment )


<!-- Page 43 -->

(4) Did you do a good job of analysis? • Checking the threat model. • Is this complete? • Is it accurate? • Does it cover all the security decisions we made? • Can we move forward to refining our security without altering the model? • All yes: • the diagram is sufficiently up to date for the next phase of our security planning.


<!-- Page 44 -->

Lecture 4: Threat Modelling Dr. Yutian Tang Yutian.Tang@glasgow.ac.uk We are resuming at XX:XX


<!-- Page 45 -->

Attack Tree


<!-- Page 46 -->

Attack Tree • Original researched by • National Security Agency • Amoroso at Bell Labs • Both worked independently. • Heavily promoted by Bruce Schneier . • Currently widely used in defence , intelligence, healthcare aerospace etc.


<!-- Page 47 -->

Attack Trees • Def. : A representation of attacks against a system in a tree structure , with the goal as the root node and different ways of achieving that goal as leaf nodes. • Structure of Attack Trees: 1. Root Node: The root node represents the primary goal of an attacker , such as unauthorized access or service disruption. 2. Branches: Branches depict different strategies or methods an attacker might use to achieve the root goal. 3. Leaves: Leaf nodes detail the specific, actionable steps or techniques that an attacker can execute.


<!-- Page 48 -->

Attack Trees • Top level node (or root) represents the ultimate goal of an attacker . • The nodes (or leaves) represent sub - goals that need to be achieved (together or independently) to arrive at the top - level goal


<!-- Page 49 -->

Attack Trees • Example • Root (Compromise Server) (Goal) • Objective is unauthorized access to server resources. • Two primary attack strategies (sub - goals) • Exploit Vulnerability • Social Engineering


<!-- Page 50 -->

Fundamental Concepts of Attack Trees • Dynamic and Evolving: • Attack trees are not static; they evolve as new threats emerge and existing threats change, necessitating regular updates and revisions.


<!-- Page 51 -->

Using Attack Trees to Find Threats • If you have an attack tree that is relevant to the system you’re building, you can use it to find threats. • Represent the system in a diagram. • Use an attack tree to analyse the model: • The attack elicitation task is to iterate over each node in the tree and consider if that issue (or a variant of the issue) impacts your system.


<!-- Page 52 -->

Constructing an Attack Tree


<!-- Page 53 -->

Constructing an Attack Tree The basic steps to create an attack tree are as follows: 1. Decide on a representation 2. Create a root node. 3. Create sub - nodes 4. Consider completeness 5. Prune the tree 6. Check the presentation.


<!-- Page 54 -->

(1) Decide on a Representation • Attack trees can be categories into different types based on how the nodes are connected and the logic they follow • Two primary types: AND trees and OR trees. • AND trees: • A node depends on all of the nodes below it being true . • OR trees: • A node is true if any of its sub - nodes are true .


<!-- Page 55 -->

(1) Decide on a Representation’2 • Hybrid trees : • Definition : Hybrid trees combine AND and OR logics in a single tree. • These trees can have branches where some nodes are connected with AND logic and others with OR logic.


<!-- Page 56 -->

(2) Create a root node. • To create an attack tree, start with a root node . • The root node can be the component that prompts the analysis, or an adversary’s goal . • If the root node is a component , the subnodes should be labeled with what can go wrong for the node. • If the root node is an attacker's goal , consider ways to achieve that goal.


<!-- Page 57 -->

(3) Create sub - nodes • Create subnodes by brainstorming, or look for a structured way to find more nodes. • The relation between nodes can be AND or OR, and you’ll have to make a choice and communicate it to those who are using the tree. • Some possible structures for first - level subnodes include: Attacking a system: • Physical access. • Subvert software. • Subvert a person. Attacking a system via: • People. • Process. • Technology. Attacking a product during: Design. Production. D i s tri bu ti on. Usage.


<!-- Page 58 -->

(4) Consider Completeness • For this step, you want to determine whether your set of attack tree is complete enough. • An attack tree can be checked for quality by iterating over the node, looking for additional ways to reach the goal. • It may be helpful to use STRIDE to help you check the quality


<!-- Page 59 -->

(5) Prune the Tree • As our attack tree takes shape, it's essential to streamline it by pruning. This involves a critical review of each node within the tree to ensure relevance and avoid redundancy. • Identify duplicative nodes . These are nodes that may represent the same attack vector or end goal, perhaps described differently or occurring in multiple branches.


<!-- Page 60 -->

(6) Check the Presentation • Common Pitfalls to Avoid: • Overcomplication, which can obscure key information. • Oversimplification, which may overlook critical details of attack vectors. • Outdated information, which can lead to ineffective threat modelling.


<!-- Page 61 -->

Conclusion • Attack trees are useful as a visualiser for stakeholders and as a data structure for computational analysis. • Can be combined with STRIDE to enrich STRIDE or vice versa. • Both approaches require an understanding of the domain to be effective. • Used often in red team and blue team attack/defence scenarios. • Used by security consultants • They sell you pre - prepared attack trees that are then customised to your specific usage context.


<!-- Page 62 -->

• What is the purpose of an attack tree? • A. To build encryption algorithms B. To outline security policies C. To visually model how an attacker might achieve a specific goal D. To track bug reports


<!-- Page 63 -->




<!-- Page 64 -->

Threat Libraries


<!-- Page 65 -->

Threat Libraries • Examples • CAPEC (Common Attack Pattern Enumeration and Classification): Provides a comprehensive dictionary of known patterns of attack employed by adversaries to exploit known weaknesses in cyber - enabled capabilities. • CWE (Common Weakness Enumeration): A community - developed list of common software and hardware weakness types that have security ramifications.


<!-- Page 66 -->

Common Attack Pattern Enumeration and Classification (CAPEC) • CAPEC is a comprehensive dictionary that catalogs common patterns of attack that adversaries use to exploit known weaknesses in cyber - enabled capabilities. • It provides standardized attack pattern information to the cybersecurity community, facilitating a common understanding of common threats and methods of exploitation • https://capec.mitre.org/ • https:// capec.mitre.org /about/ new_to_capec.html


<!-- Page 67 -->

Common Attack Pattern Enumeration and Classification (CAPEC) • How it aids in Threat Modeling ? • CAPEC aids in threat modeling by offering a well - defined structure that helps in identifying potential attack vectors . • It enables security professionals to anticipate and design against common attack tactics, techniques, and procedures (TTPs) , enhancing the security posture of systems and applications.


<!-- Page 68 -->

Download CAPEC Dataset • https://capec.mitre.org/data/downloads.ht ml • The Mechanisms of Attack representation organizes attack patterns hierarchically based on mechanisms that are frequently employed when exploiting a vulnerability. • The Domains of Attack representation organizes items by the target domains for each attack pattern.


<!-- Page 69 -->

Download CAPEC Dataset • https://capec.mitre.org/data/downloads.ht ml • The Mechanisms of Attack representation organizes attack patterns hierarchically based on mechanisms that are frequently employed when exploiting a vulnerability. • The Domains of Attack representation organizes items by the target domains for each attack pattern. Attacking Techniques Attacking Targets/Platforms/Service


<!-- Page 70 -->

Download CAPEC Dataset • https://capec.mitre.org/data/downloads.html • The Mechanisms of Attack • Download the CSV file (You can also find it on Moodle page) • Key fields: • Name (attack patterns) • Description • Typical Severity • Related Attack Patterns • Prerequisites: (prerequisites for launching this attack) • Resources Required • Execution Flow • Consequences


<!-- Page 71 -->

Overview of Common Weakness Enumeration (CWE) • Common Weakness Enumeration (CWE ) • CWE is a community - developed list of common software and hardware weakness types with security implications. • It includes conditions in software, firmware, hardware, or services that could lead to vulnerabilities. • The CWE list and its classification taxonomy offer a standardized language for identifying and describing these weaknesses • https://cwe.mitre.org/ • https://cwe.mitre.org/about/new_to_cwe.html


<!-- Page 72 -->

Common Weakness Enumeration (CWE) • CWE’s role in identifying common software weaknesses • The main goal of the CWE initiative is to stop vulnerabilities at the source by educating software and hardware acquirers, architects, designers, and programmers on how to eliminate the most common mistakes before a product is delivered.


<!-- Page 73 -->

Search the CWE Web Site • https://cwe.mitre.org/find/index.html


<!-- Page 74 -->

Mapping Threats to CVE • CWE provides a common language for describing software and hardware weaknesses in a standardized manner. • Mapping threats to CWE entries enables better communication and understanding of vulnerabilities. • Example: An XML External Entity (XXE) attack vulnerability can be mapped to CWE - 611, which specifically covers this type of threat


<!-- Page 75 -->

Step - by - Step Mapping Example • Start with the threat description , such as "Improper Access Control". • Perform a search in the CWE database to find matching entries. https:// cwe.mitre.org /documents/ cwe_usage / mapping_examp les.html


<!-- Page 76 -->

Step - by - Step Mapping Example • Use additional information and references to narrow down to specific CWE entries, like mapping the general "Improper Access Control" to a more specific "Missing Authorization" (CWE - 862) or "Authorization Bypass Through User - Controlled Key" (CWE - 639) • Using this mapping to guide the mitigation and remediation strategies. • (learn from others)


<!-- Page 77 -->

References • Threat Modeling: https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.h tml • Swiderski, F., & Snyder, W. (2004). Threat modeling. Microsoft Press. • Scandariato , R., Wuyts , K., & Joosen , W. (2015). A descriptive study of Microsoft’s threat modeling technique. Requirements Engineering , 20 , 163 - 180.


<!-- Page 78 -->

Thank you! Any Questions?