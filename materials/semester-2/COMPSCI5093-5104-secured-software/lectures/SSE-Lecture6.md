# SSE-Lecture6

<!-- Page 1 -->

Lecture 6: Security Patterns Dr. Yutian Tang Yutian.Tang@glasgow.ac.uk


<!-- Page 2 -->

:Padlet for Questions • https://padlet.com/yutiantang/lecture - 6 - q - a - hnby9ggp3khp9ubt Please post any questions you have during the lecture on this Padlet. I will address them at the end.


<!-- Page 3 -->

Course Timetable Unit 1 Course Logistics & Introduction to Secured Software Engineering Unit 2 Secured SDLC & Secured Requirement Planning Unit 3 Access Control: Authentication & Authorization Unit 4 Threat Modelling Unit 5 Vulnerability Mapping Unit 6 Security Patterns Unit 7 Static Analysis & Refactoring Unit 8 Confidentiality Properties & Privacy in Software Unit 9 Secure Coding, Security Testing Unit 10 SSE Applications and Regulatory Requirements ILO 1 ILO 1,6 ILO 2,3,5 ILO 3,4,6 ILO 3,5 ILO 3,6 ILO 4 ILO 2,4 ILO 3,6 ILO 3,6


<!-- Page 4 -->

Patterns • A pattern is a tested solution to a commonly recurring problem in a specific context. • A security pattern solves a security problem, usually how to control a threat. • Patterns can also be used to evaluate existing systems by examining them if they contain the required patterns.


<!-- Page 5 -->

Security Patterns • Def.: A Security pattern describes a solution to the problem of controlling (stopping or mitigating) a set of specific threats through some security mechanism, defined in a given context. • Example: • Authentication Pattern • Authorization Pattern. • Secure Communication


<!-- Page 6 -->

Common Security Patterns • Authentication & Authorization (Covered in Lecture 3) • Data Access Object (DAO) • Input Validation • Output Encoding/Escaping • Secure Error Handling Patterns • Secure Logger • Secure Communication • Secure - by - Default • Least Privilege (Covered in Lecture 1)


<!-- Page 7 -->

Case Study


<!-- Page 8 -->

Case Study • O1: Integrate the DB operations into the business logic • Increased Attack Surface : Combining business logic with database code can create more opportunities for security vulnerabilities, such as SQL injection attacks • Harder to Test : Testing business logic can become more complex and time - consuming because it's dependent on the database's state. • Potential for Insecure Defaults : Developers may try to use less secure but more convenient methods of database access. Prone to injection attacks.


<!-- Page 9 -->

Common Security Patterns • Authentication & Authorization (Covered in Lecture 3) • Data Access Object (DAO) • Input Validation • Output Encoding/Escaping • Secure Error Handling Patterns • Secure Logger • Secure Communication • Secure - by - Default • Least Privilege (Covered in Lecture 1)


<!-- Page 10 -->

Data Access Object (DAO) Pattern


<!-- Page 11 -->

Data Access Object (DAO) Pattern • Def: The DAO pattern separates a data resource's client interface from its data access mechanisms. Business Layer DAO Database This makes it difficult to replace or modify an application's data resources. security measures around data access


<!-- Page 12 -->

Implementation: DAO Interface • Defines a contract for what operations can be performed on the data • e.g., CRUD (Create, Read, Update, Delete) operations. Business Layer DAO Database CRUD (Create, Retrieve, Update, Delete) public interface UserDao { void addUser (User user); User getUserById ( int id); List<User> getAllUsers (); void updateUser (User user); void deleteUser ( int id); }


<!-- Page 13 -->

DAO Implementation (2) Interface Implementation Implements the DAO interface • public class UserDaoImpl implements UserDao { private DataSource dataSource ; public UserDaoImpl ( DataSource dataSource ) { this.dataSource = dataSource ; } @Override public void addUser (User user) { // Implementation code using JDBC } @Override public User getUserById (int id) { // Implementation code using JDBC } // Implement other methods }


<!-- Page 14 -->

DAO Implementation (3): Data Object • Represents the data structure for the data. • This is the object that the DAO will manage. public class User { private int id ; private String name ; private String email ; // Constructor, Getters, and Setters } DAO Implementation Data Object (Data Structure)


<!-- Page 15 -->

DAO Implementation (4): Database Connection • Manages the connection to the database. DAO Implementation Data Object (Data Structure) DAO Database (DB Connection, Operations)


<!-- Page 16 -->

Several Strategies of Implementing DAO • Implement the interface directly as a class ; (simplest, but least flexible) • Improve flexibility by making DAOs “ pluggable ”; Accesses a data source only in terms of an abstract DAO interface . Each DAO interface has one or more concrete classes that implement that interface for a particular type of data source.


<!-- Page 17 -->

Several Strategies of Implementing DAO (2) • Data Caching • implementing caching at the DAO layer to improve performance. • Exception Handling • Logging • Resource and Transaction Management • ensures resources are created, used, and cleaned up properly.


<!-- Page 18 -->

What can go wrong here? • Data Caching • Cache frequently accessed data


<!-- Page 19 -->




<!-- Page 20 -->




<!-- Page 21 -->

Common Security Patterns • Authentication & Authorization (Covered in Lecture 3) • Data Access Object (DAO) • Input Validation • Output Encoding/Escaping • Secure Error Handling Patterns • Secure Logger • Secure Communication • Secure - by - Default • Least Privilege (Covered in Lecture 1)


<!-- Page 22 -->

Input Validation Pattern


<!-- Page 23 -->

Input Validation Pattern • Def .: The primary goal of the Input Validation Pattern is to ensure that only properly formed data is entering the workflow in an information system. • This pattern is about rejecting, sanitizing, or safely handling any input that does not meet the predefined criteria.


<!-- Page 24 -->

Input Validation Pattern • By rigorously checking inputs, this pattern helps prevent various attacks such as SQL injection, cross - site scripting (XSS), buffer overflows, and other forms of injection attacks. • Scope : Applies to data from all potentially untrusted sources (e.g., user input, Internet) . SELECT * FROM users WHERE username = '' OR '1'='1' -- ' AND password = 'whatever'; Example: Lecture 2 SELECT * FROM users WHERE username = '' OR '1'='1' ‘ -- ‘starts a comment, which means that the rest of the line will be ignored by the SQL server SELECT * FROM users always True


<!-- Page 25 -->

Input Validation Pattern: Implementation Techniques Syntactic : Enforce correct syntax of structured fields (e.g., SSN, date, currency symbol) User Inputs Syntactic Validation Semantic Validation Application (Input Validation)


<!-- Page 26 -->

Input Validation Pattern: Implementation Techniques Syntactic : Enforce correct syntax of structured fields (e.g., SSN, date, currency symbol) User Inputs Syntactic Validation Semantic Validation Application (Input Validation) Semantic : Enforce correctness of their values in the specific business context (e.g. start date is before end date, price is within expected range).


<!-- Page 27 -->

Implementing Input Validation Common methods of implementing input validation include: • Allow list : Allowlist validation is appropriate for all input fields provided by the user. • Regular expression (e.g., Email, Zip code) • Specify character sets, such as UTF - 8, for all input sources • Validate all data from untrusted sources (databases, file streams, etc) • Validate data l ength (e.g., phone number) • Validate data from redirects • Validate for expected data types (e.g., file (a pdf/image/spreadsheet/exe/iso/…) • Validate data range. (e.g., ages, year) • Check data consistency: (e.g., Zip code → real world place) • …


<!-- Page 28 -->

Whitelisting vs. Blacklisting • Why should we use white listing (i.e., allow listing) instead of black listing (i.e. deny listing)?


<!-- Page 29 -->




<!-- Page 30 -->

Common Security Patterns • Authentication & Authorization (Covered in Lecture 3) • Data Access Object (DAO) • Input Validation • Output Encoding/Escaping • Secure Error Handling Patterns • Secure Logger • Secure Communication • Secure - by - Default • Least Privilege (Covered in Lecture 1)


<!-- Page 31 -->

Output Encoding/Escaping


<!-- Page 32 -->

Output Encoding/Escaping • It is a security practice in software engineering that is used to prevent injection attacks . • Encoding : translating special characters into some different but equivalent form that is no longer dangerous in the target interpreter. • For example, translating the < character into the & lt ; string when writing to an HTML page • Escaping : adding a special before the character/string to avoid it being misinterpreted • For example, a \ character before a " (double quote) character so that it is interpreted as text and not as closing a string.


<!-- Page 33 -->

Output Encoding/Escaping (2) <h1>Welcome, & lt;script&gt;alert ('XSS')& lt ;/ script&gt ;</ h1> <h1>Welcome, <script>alert('XSS')</script></h1> res.send (`<h1>Welcome, ${ user_input }</h1>`); Server - side Browser receives const escape = require('escape - html'); res.send (`<h1>Welcome, ${escape( user_input )}</h1>`);


<!-- Page 34 -->

Output Encoding/Escaping (3) • What is the primary purpose of output encoding in the context of web security? • A. To encrypt sensitive data • B. To compress HTML files • C. To convert untrusted data into a safe form • D. To validate the format of the user input


<!-- Page 35 -->




<!-- Page 36 -->




<!-- Page 37 -->

Common Security Patterns • Authentication & Authorization (Covered in Lecture 3) • Data Access Object (DAO) • Input Validation • Output Encoding/Escaping • Secure Error Handling Patterns • Secure Logger • Secure Communication • Secure - by - Default • Least Privilege (Covered in Lecture 1)


<!-- Page 38 -->

Secure Error Handling Patterns


<!-- Page 39 -->

Secure Error Handling Patterns • Purpose : Generate error messages that provide information necessary for corrective actions without revealing information that could be exploited. • Reveal error messages only to [Organization - defined personnel or roles]


<!-- Page 40 -->

Secure Error Handling Patterns: Common Mistakes • Exposing Sensitive Information in Error Messages • Inconsistent Error Handling • Overly Generic Error Message; ( useless )


<!-- Page 41 -->

Secure Error Handling Patterns : Example • Security Control Exceptions • Ensure exceptions in security methods (like isAuthorized (), isAuthenticated () ) don't enable unauthorized operations . • These should return false in case of exceptions. public class Security { public boolean isAuthorized (int userId , String action) { try { // Logic to check authorization return checkUserAuthorization ( userId , action); } catch (Exception e) { // Log exception details (omitted for brevity) return false; // Default to false on exception } } private boolean checkUserAuthorization (int userId , String action) { // Placeholder for actual authorization logic // Throws an exception if something goes wrong throw new RuntimeException ("Failed to check authorization."); }


<!-- Page 42 -->

Lecture 6b: Security Patterns Dr. Yutian Tang Yutian.Tang@glasgow.ac.uk We are resuming at XX:XX


<!-- Page 43 -->

Common Security Patterns • Authentication & Authorization (Covered in Lecture 3) • Data Access Object (DAO) • Input Validation • Output Encoding/Escaping • Secure Error Handling Patterns • Secure Logger • Secure Communication • Secure - by - Default • Least Privilege (Covered in Lecture 1)


<!-- Page 44 -->

Secure Logger


<!-- Page 45 -->

Designing Effective Logging Mechanisms • Optimal Structured Log Format • Standard and Structured Log Levels • Consistent Structure Across Logs • Enrich Logs • Avoid Sensitive Data in Logs


<!-- Page 46 -->

Designing Effective Logging Mechanisms • Identify the types of events that the system is capable of logging in support of the audit function; • Coordinate the event logging function with other organizational entities requiring audit - related information to guide and inform the selection criteria for events to be logged; • Specify the event logging types for logging within the system • Provide a rational for why the event types selected for logging are deemed to be adequate to support after - the - fact investigations of incidents; and • Review and update the event types selected for logging


<!-- Page 47 -->

Protecting Sensitive Information in Logs • Identifying Sensitive Data : Sensitive data that need protection, like personal information, financial, healthcare data, … • Best Practices for Data Protection : • Isolate Sensitive Data • Tokenization • Encryption • Avoid Sensitive Data in URLs • Functionality for Secure Audit • Code Reviews • Automated Alerts


<!-- Page 48 -->

Common Security Patterns • Authentication & Authorization (Covered in Lecture 3) • Data Access Object (DAO) • Input Validation • Output Encoding/Escaping • Secure Error Handling Patterns • Secure Logger • Secure Communication • Secure - by - Default • Least Privilege (Covered in Lecture 1)


<!-- Page 49 -->

Secure Communication


<!-- Page 50 -->

Secure Communication • User communications must be encrypted in transit and storage • Sensitive data: • Passwords • Credit card numbers • Health record • Personal information • Business secrets • Data falls under privacy laws (GDPR, PCI Data Security Standard) • …


<!-- Page 51 -->

Secure Communication Principles 1. Protect data in transit • Is data protected against eavesdropping and tampering? • Can participants confirm who they are communicating with? 2. Protect network nodes with access to sensitive data • Are network nodes with access to un - encrypted data protected appropriately? • Are network nodes that manage cryptographic key protected appropriately? 3. Protect against unauthorized user access to the service Lecture 4 Trusted boundaries Lecture 3 Access Control (data flow)


<!-- Page 52 -->

Secure Communication Principles (2) 4. Provision for secure audit of the service • Does the service log security events? • Where audit is required, the communications service should provide appropriate audit functionality. 5. Allow administrators to securely manage users and systems 6. Use metadata only for its necessary purpose • Is the use of metadata well - understood and used only when necessary? 7. Access supply chain for trust and resilience • Do you trust all components of the service? Lecture 6 Logging Lecture 2 • Software and Data Integrity Failures • Outdated Component Lecture 3 Access Control


<!-- Page 53 -->

Case Study • A development team is tasked with enhancing the security of their cloud storage service. • They are considering 2 approaches for managing encryption keys for user data: • A) letting users manage their own encryption keys • B) having the service manage the keys on behalf of the users. • Which approach is more likely to enhance the security and privacy of user data, while also considering user convenience?


<!-- Page 54 -->




<!-- Page 55 -->

Common Security Patterns • Authentication & Authorization (Covered in Lecture 3) • Data Access Object (DAO) • Input Validation • Output Encoding/Escaping • Secure Error Handling Patterns • Secure Logger • Secure Communication • Secure - by - Default • Least Privilege (Covered in Lecture 1)


<!-- Page 56 -->

Secure Default


<!-- Page 57 -->

Secure - by - Default • Def : P roducts are resilient against prevalent exploitation techniques out of the box without additional charge. • These products protect against the most prevalent threats and vulnerabilities without end - users having to take additional steps to secure them. • It applies to the initial configuration of a system that follow a " deny unless explicitly authorized " strategy.


<!-- Page 58 -->

Key Principles of Secure - by - Default • Principle 1 ( Secure Settings): Default configurations should be secure, with strong security settings enabled by default . • Principle 2 (Eliminate default password) : Products should not come with default passwords that are universally shared. • Principle 3 (Single sign - on (SSO)) : IT applications should implement single sign on technology via modern open standards. • *Single sign - on: An authentication process by which one account and its authenticators are used to access multiple applications in a seamless manner, Lecture 3 Lecture 3


<!-- Page 59 -->

Key Principles of Secure - by - Default (2) • Principle 4 (Secure Logging) : Provide high - quality audit logs to customers at no extra charge. • Crucial for detecting and escalating potential security incidents. • Principle 5 (Software Authorization Profile) • Software suppliers should provide recommendations on authorized profile roles and their designated use case. • Manufacturers should include a visible warning that notifies customers of an increased risk if they deviate from the recommended profile authorization. • Principle 6 (Consider the user experience consequences of security settings) • Ideally, a setting should not exist; instead, the most secure setting should be integrated into the product by default. Lecture 6 Lecture 3


<!-- Page 60 -->

:Padlet for Q&A • https://padlet.com/yutiantang/lecture - 6 - q - a - hnby9ggp3khp9ubt Please post any questions you have during the lecture on this Padlet. I will address them at the end.


<!-- Page 61 -->

References • https:// www.oracle.com /java/technologies/data - access - object.html • https:// cheatsheetseries.owasp.org / cheatsheets / Input_Validation_Cheat_Sheet.ht ml • https:// owasp.org /www - community/ Fail_securely • https:// www.ncsc.gov.uk /information/secure - default • Handouts’25 • https:// www.ncsc.gov.uk /guidance/secure - communication - principles


<!-- Page 62 -->

Thank you! Any Questions?