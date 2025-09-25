# OOP_in_Python

Object-Oriented Programming (OOP) in Python

Object-Oriented Programming(OOP)
OOP is a programming paradigm that allows us to  structure programs in a way that 
properties (or attributes)
 and 
behaviours
 of real things are combined into separated objects. In other words, real objects are modelled as program objects.
OOP follows a 
procedural
 approach: it provides a set of steps in the form of functions and blocks of code that are executed sequentially to complete the task.
Example: An object can represent a person with a name, age, address, height, etc. the behaviours of that person could be walking, talking and running.

Python Classes and objects (Instances)
A 
class
 is a program template (or blueprint) that allows us to create objects. 
The keyword 
class
 is used to create a class. 
For example we could create a Employees() class that will indicate that the name and other details that are required.
A class does not tell us what the name or other details are. It is an abstract concept. A class helps organise information. We can think of a class as an empty form.
An 
instance
 is a copy of a class with actual values, it is an object that belong to a particular class . Many copies can be created. But we need the class (form) to know what information is required. Creating an object of a class is called 
instantiation
.

Instance Attribute & Class Attribute
Class create objects. All objects contains characteristics called 
attributes
 (properties).
The 
init
 () 
method initialises (creates) the attributes of an object by giving it a default value (state). 
The 
init
 () method should have at least one argument and a 
self
 variable. The self variable refers to the object itself (
e.g
 Employees)
Constructor
 is a method that is called by default whenever you create an object from a class.
Instance attributes are specific to each object.
Class attributes are the same for 
ALL
 instances.
Although each employee has a unique name and age, each employee will be active (currently employed)

Class Employee

Instance Methods
Instance methods
, 
defined inside the class, are used to get content of the instance and perform operations with the attribute of our objects.

Python Object Inheritance
Inheritance
 is when one class accepts the attributes and methods of another class. It helps prevent code duplication.
Child class
: newly created class.
Parent class
: a class from which a child class derives.
Child class 
overrides
 or 
extends
 functionalities: It will take (inherit) all the attributes and behaviour of a parent class and can define further behaviours.
To determine if the instance is an instance of a specific parent class, use 
isinstance
()

