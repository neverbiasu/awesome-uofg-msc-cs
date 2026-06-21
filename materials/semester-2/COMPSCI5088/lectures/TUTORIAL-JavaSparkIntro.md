# TUTORIAL-JavaSparkIntro

Tutorial: Java Basics
COMPSCI4064 (H) and COMPSCI5088 (M)
Dr.
 Richard McCreadie

The JVM
Java is actually not a standard compiled language, this is because it adds an extra execution layer called the 
Java Virtual Machine (JVM)
This is a compromise to enable more code portability
Machine instructions would be particular to the target physical device
JVM byte code are compatible with a particular version of the JVM – meaning you can compile on one machine and then execute on another, so long as the version is the same
The JVM is in effect a translator of JVM byte-code to machine instructions for a particular CPU architecture
It also means anything that produces JVM byte code can be executed, leading to multiple JVM-compatible languages, like Scala
.java
My Code
Validity Checker
Compiler
.class
JVM Byte Code
JVM (Java Virtual Machine)
CPU Architecture

Python Libraries
Python is a normal interpreted language, but acts a bit weirdly in practice due to how many common libraries are designed
A lot of executed Python code… is not actually Python code
The python interpreter is actually 
very
 slow
So many commonly used libraries, such as pandas, 
pytorch
, 
tensorflow
 and spark are not fully written in python
They are written in a faster compiled language like C++ or Java
Then a python wrapper is added to allow for instructions to be translated from one to another 
PyTorch
PySpark

So… which is 
better
?
The correct answer here is it depends on what you are trying to do
Java will typically be faster and is more suited to building enterprise-level software (i.e. code that is expected to last)
Python is more convenient and is fast-enough for many tasks given the extensive library support
Apache Spark that the assessed exercise is based on is primarily written in Scala (a JVM language)
Native Spark programs can be written in Scala or Java
PySpark
 allows for Spark programs to be written in Python
Slightly reduced functionality and adds an additional translation step via py4j

py4j?
py4j is an 
interconnect layer 
that allows python code to 
dynamically access Java objects in a Java Virtual Machine
Methods are called as if the Java objects resided in the Python interpreter and Java collections can be accessed through standard Python collection methods.
If there is a JVM running, py4j allows your python program to talk to it and run code loaded into it
Python
Java

#
UofGWorldChangers
@
UofGlasgow
Course Coordinator
Dr.
 Richard McCreadie
Email: 
richard.mccreadie@glasgow.ac
.uk
Room:
 SAWB 304

Some Context
To do the hands-on component of the course, you will need to be able to build an application in Java, and so I thought it was worth introducing some 
core concepts 
here first…
What this presentation covers is the following
Compiled vs. Interpreted languages
Java vs Python

Compiled vs Interpreted Languages

Role
Machine languages
, that are interpreted directly in hardware 
Assembly languages
, that are thin wrappers over a corresponding machine language 
High-level languages
, that are anything machine-independent 
System languages
, that are designed for writing low-level tasks, like memory and process management 
Scripting languages
, that are generally extremely high-level and powerful 
Domain-specific languages
, that are used in highly special-purpose areas only 
Visual languages
, that are non-text based 
Operation
Compiled language
: The code you write is compiled (translated) into machine-language instructions as a whole before running
Interpreted language
: An interpreter executes the program directly, translating each statement into a sequence of one or more subroutines already compiled into machine code
What Defines a Programming Language?

Interpreted Languages
I imagine that most people taking this course are most familiar with Python programming, likely via a notebook-style interface
Python is a 
high-level 
interpreted language
 
It is designed to run on a wide range of hardware and does not compile code directly to machine code in one go. Instead it 
interprets one step (statement) at a time.
This gives great flexibility in terms of what Python can do, but it means that many checks that programs will behave sensibly cannot be done until code actually runs.
Statements you write are executed in order, from top-to-bottom
The Python interpreter only checks that a statement is valid when that statement is about to be executed
The second statement here is not valid
Program execution will halt immediately of an error is encountered

Interpreted Languages
I imagine that most people taking this course are most familiar with Python programming, likely via a notebook-style interface
Python is a 
high-level 
interpreted language
 
It is designed to run on a wide range of hardware and does not compile code directly to machine code in one go. Instead, it 
interprets one step (statement) at a time.
This gives great flexibility in terms of what Python can do, but it means that many checks that programs will behave sensibly cannot be done until code actually runs.
Interpreter
CPU Architecture
A code statement
Machine instructions

Compiled Languages
Java is a 
high-level 
compiled language
, and as such works a bit differently
 A compiled language considers the entire program as a single unit
It will attempt to validate the program before execution
Your code is translated (compiled) into a lower-level language that can be executed on a machine
.java
My Code
Validity Checker
Compiler
.c
Machine instructions
CPU Architecture

Why not always Interpret?
Given the simplicity of interpreters, you might be surprised to learn that 
most languages are compiled, not interpreted
… why?
The core answer is a mix of 
correctness
 and 
speed
By going through a compilation step, non-obvious errors can be identified before execution
Powerful optimizations to the code can be applied during the compile stage by analyzing what the program does
Compilers target the underlying hardware architecture, allowing for efficiency savings

Java vs. Python

