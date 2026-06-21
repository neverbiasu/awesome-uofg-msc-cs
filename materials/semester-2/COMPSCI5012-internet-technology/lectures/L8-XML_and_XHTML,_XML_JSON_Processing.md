# L8-XML_and_XHTML,_XML_JSON_Processing

XML 
and 
XHTML
Internet Technology
ITECH
1

So what is XML, anyway?
We had a preview last week
XML stands for “
eXtensible
 Markup Language
”
XML is developed by the W3C; 1.0 in 1998
  W3C is a consortium with hundreds of members including the major vendors and users of the web 
 AT&T, BBC, Citibank, Microsoft, Oracle Xerox... 
 and quite a few Universities
 founded and led by Sir Tim Berners-Lee
http://www.w3.org/Consortium/Activities
XML is designed to 
transport
 and 
store
 data
XML represents a fundamental change to the Web
2

Mark up Languages
3

XML Design Goals
Why did the W3C design XML?
Mark-up for the web was not being supported properly
Standard Generalized Mark-up Language (SGML) was too complex
While, HTML was too limited and mixed format with structure
XML aimed to:
Provide a 
simpler markup language 
(easier than SGML)
Separate format from structure 
(Separate Concerns)
Be 
extensible
 and provide support for a host of applications
Transport and store data
4

The Role of XML
To describe the structure of 
semi-structured documents
To provide the principal mechanism for 
sharing, transporting and storing annotated data
To be a general purpose language for 
data description 
and 
interchange
.
i.e. forms the basis of other languages
XML has:
Emerged as the dominant standard 
Developed a number of 
vocabularies
 for specific disciplines
Additional tools for addition layers of processing, such as:
the separate(!) ability to add 
formatting
 to XML documents
Querying XML documents, transforming XML documents, etc.
5

Extensions of XML
XML can be extended to describe the data within specific domains, for example:
XHTML – 
web pages
Wireless Markup Language
 (WML) a 
specialisation
 of XML for Wireless Application Protocol – for mobile 
dat
a
MathML
 – 
The Language of Mathematics
Chemical Markup Language
 – “XML with Molecules”
 
SOAP
 - for describing distributed method parameters
lots of other things can be built on top of XML 
6

How does it look like?
7

Sample XML file
<?xml version="1.0" encoding="UTF-8"?>
<
breakfast_menu
>
<food>
    <name>Belgian Waffles</name>
    <price>$5.95</price>
    <description>
   Two of our famous Belgian Waffles with plenty of real maple syrup
   </description>
    <calories>650</calories>
</food>
<food>
    <name>Strawberry Belgian Waffles</name>
    <price>$7.95</price>
    <description>
    Light Belgian waffles covered with strawberries and whipped cream
    </description>
    <calories>900</calories>
</food>
<food>
    <name>Berry-Berry Belgian Waffles</name>
…
</food>
</
breakfast_menu
>
https://www.w3schools.com/xml/
8

More specifically,…
HTML was designed to display data!
HTML elements mix format and structure with content and presentation 
While in XML, tags define structure
 
and 
formatting is handled separately
The 
structure of XML is tightly controlled
:
Tags are 
case sensitive 
and variables values must be 
quoted
There must be
 
start 
and
 end tags
 
A 
hierarchical
 structure of elements is enforced
These are not strictly enforced in HTML
XML provides flexibility
New tags
 (and variables) can be created i.e. user-defined.
9

XML Document Structure
An XML document consists of three parts
:
an optional 
prolog
 – 
XML declaration
:  
	<?xml version="1.0” encoding=“UTF-8”?>
version – must be 1.0 or 1.1
encoding – how characters are encoded in the file
standalone – “yes” if this document is entirely self-contained, 
“no” if it has an external DTD or Schema
  (“No” is default)
the 
body
 – containing the document elements and data 
an optional 
epilog
 – containing 
comments
 and 
processing instructions
	<! This XML document is over 
- - >
 
10

<?xml version="1.0" encoding="UTF-8"?>
<
breakfast_menu
>
<food>
    <name>Belgian Waffles</name>
    <price>$5.95</price>
    <description>
   Two of our famous Belgian Waffles with plenty of real maple syrup
   </description>
    <calories>650</calories>
</food>
<food>
    <name>Strawberry Belgian Waffles</name>
    <price>$7.95</price>
    <description>
    Light Belgian waffles covered with strawberries and whipped cream
    </description>
    <calories>900</calories>
</food>
<food>
    <name>Berry-Berry Belgian Waffles</name>
…
</food>
</
breakfast_menu
>
XML Body
Root Element
Attributes
Closing Tag
Opening Tag
Child Elements
Text content
11

XML Elements
Elements are the basic building blocks of 
XML
As in HTML, an element is 
everything from (including) the start tag to (including) the end tag
An element may contain: 
Text
Attr
ibutes
Other elements
A mix of the 
above
 
Element names are 
case-sensitive
Closed elements consist of 
both opening and closing tags
<
Url
> 
www.gla.ac.uk
 </
Url
>
Elements can be nested
All elements must be nested inside a root element
Nested elements are child elements
Empty elements are denoted as 
<
Url
> </
Url
>
 or just
 <
Url
 
/
>
12

XML Attributes and Values
Attributes are characteristics of elements
Attributes are case sensitive
Attributes have values – they must be in quotes!
All values are text strings
Values can contain most characters and whitespace
Take care when using special characters esp. <,>,”, etc.
<
ResultSet
 
type
="web" 
totalResultsAvailable
="211000000" 
totalResultsReturned
="10" 
firstResultPosition
="1” > … </
ResultSet
>
13

Well Formed XML
An XML document is well-formed if:
XML Tags are Case Sensitive
Corresponding Tags 
for every start tag there is an end tag
Hierarchically structured: 
An XML parser will be able to process it and make use of the tree structure
Ex
. <a><
b
>some text</a></
b
> 
is not
 well-formed
i.e. Properly nested
XML Attributes values must be quoted
XML Documents have to have a root element
14

XML Tree Structure
<?xml version="1.0" encoding="UTF-8
"
?>
<bookstore>
  <book category="cooking">
    <title 
lang
="
en
">Everyday Italian</title>
    <author>Giada De 
Laurentiis
</author>
    <year>2005</year>
    <price>30.00</price>
  </book>
  <book category="children">
    <title 
lang
="
en
">Harry Potter</title>
    <author>J K. Rowling</author>
    <year>2005</year>
    <price>29.99</price>
  </book>
  <book category="web">
    <title 
lang
="
en
">Learning XML</title>
    <author>Erik T. Ray</author>
    <year>2003</year>
    <price>39.95</price>
  </book>
</bookstore>
15

Predefined and Valid XML
To share an XML, 
a pre-defined structure can be used:
These describe the tags which can appear, this can be done using:
Document Type Definitions
 (DTD), or 
XML Schemas and XML Namespaces
The XML can be checked according to the definitions and validated.
These structures are references either at the top of the file or provided separately.
If an XML  document is 
Well-Formed 
and also conforms to the rules in the DTD or Schema it is also said to be 
Valid
.
Many XML validators available
e.g., 
https://www.xmlvalidation.com/
16

Example DTD
<?xml version="1.0"?>
<!DOCTYPE note [
<!ELEMENT note (to, from, heading, body)>
<!ELEMENT to (#PCDATA)>
<!ELEMENT from (#PCDATA)>
<!ELEMENT heading (#PCDATA)>
<!ELEMENT body (#PCDATA)>
]>
<note>
<to>Bob</to>
<from>Alice</from>
<heading>Reminder</heading>
<body>Don't forget to cook dinner</body>
</note>
The root of the document is the element “note”
The note element must contain the elements “to,” “from”, “heading”, “body”
#PCDATA means “parse-able text data”
17

Referencing an external DTD
<!ELEMENT note (to, from, heading, body)>
<!ELEMENT to (#PCDATA)>
<!ELEMENT from (#PCDATA)>
<!ELEMENT heading (#PCDATA)>
<!ELEMENT body (#PCDATA)>
Note.dtd:
Note.xml:
<?xml version="1.0"?>
<!DOCTYPE note SYSTEM
"https://www.w3schools.com/xml/note.dtd">
<note>
   <to>Bob</to>
   <from>Alice</from>
   <heading>Reminder</heading>
   <body>Don't forget to cook dinner</body>
</note>
18

Example Schema
<
xs:element
 name="note">
<
xs:complexType
>
  <
xs:sequence
>
    <
xs:element
 name="to" type="
xs:string
"/>
    <
xs:element
 name="from" type="
xs:string
"/>
    <
xs:element
 name="heading" type="
xs:string
"/>
    <
xs:element
 name="body" type="
xs:string
"/>
  </
xs:sequence
>
</
xs:complexType
>
</
xs:element
>
Defines the element called “note”
the "note" element is of complex type
the complex type is a sequence of elements
The element “body” is of type string
19

Referencing an external schema
Here is note.xml:
<?xml version="1.0" encoding="UTF-8"?>
<note
xmlns
="https://www.w3schools.com"
xmlns:xsi
="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation
=“
https://www.w3schools.com/xml/note.xsd">
   <to>Bob</to>
   <from>Alice</from>
   <heading>Reminder</heading>
   <body>Don't forget to cook dinner</body>
</note>
20

DTDs vs Schemas
XML schemas are more powerful than DTDs:
XML schemas are written in XML
XML schemas are extensible to additions
XML schemas support data types
XML schemas support namespaces
Why use an XML schema?
With XML schema, your XML files can carry a description of its own format
With XML schema, independent groups of people can agree on a standard for interchanging data
With XML schema, you can verify data
21

XHTML
22

Flavors of XHTML
XHTML 1.0 Frameset
XHTML 1.0 Transitional
XHTML 1.0 Strict
(Recommended)
Only structural markup associated with Layout
Cascading Style Sheets used to render the content
Includes support for older, visual elements, that are now deprecated
Includes support for frames, sub-areas on a single site, with parallel display of pages
23

Strictly Speaking…
XHTML 1.0 Strict
Separates visual rendering 
from the 
layout
A XHTML Strict Document will work in many different environments:
visual browsers, hand-
helds
, braille readers, text based browsers, print
It is highly configurable by the user
And highly maintainable by the developer
24

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 	
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	<html 
xmlns
="http://www.w3.org/1999/xhtml" 
lang
="en">
		<head>
			<title>
A Title for the Browser to refer to
</title>
			<style type="text/
css
">see-style-sheet-lecture.css</style>
		</head>
		<body>
			<p>
The displayable text
</p>
		</body>
	</html>
XHTML Structure
Uses strict XHTML
MAIN XHTML TAGS
<html>
<head>
<title>
<style>
<body>
XHTML can be validated at: 
http://validator.w3.org
 - the 
xhtml
 will be checked against the specified 
xhtml
 flavour 
XML 
Prolog
25

Main XHTML Elements
Structure and Header Elements
<html> – root element of the document
<head> – holds additional document information
<title> – the document title
<style> – the reference to the style sheet
<body>  - holds content of the document
<script> - to reference client-side scripts like 
Javascript
<meta> - to provide additional information about the document
26

Main XHTML Elements
Block Elements
<h1>…<h6> – Different levels of headings
<div> - Generic way to group areas of content
<span> - Generic way of adding structure
Use <div> and <span> with style sheets to define page layouts – best practice approach that conforms to XHTML Strict
<
p
> paragraph
<
ol
> and <
ul
> Ordered and unordered lists
Inline Elements
<a 
href
=“
http://
www.worldofwarcraft.com
/”
>
<
img
  
src
=“
orge.jpg
” alt=“
orge
”>
27

HTML 
vs
 XHTML (1)
HTML	XHTML
Starts <html>	Starts with an XML prologue then <html>
Tags are 
case insensitive
	All tags are 
lower case
<EM> = <
Em
> = <
em
>		only <
em
> allowed
Some tags (e.g. <
p
>) need not	All tags must be 
closed 
– i.e. must have an
	be closed		end tag
Empty elements
 not closed <hr>	Empty tags must be closed  <hr/>
28

HTML 
vs
 XHTML (2)
HTML	XHTML
Hierarchy
 not enforced	Hierarchy enforced strictly
Attributes
 ok without quotes	
Attributes must be in quotes
size=20		size="20"
Attributes
 can be minimised	No attribute minimisation
<table border>		<table border="true">
Minimal restrictions on placement	
Restricted placement 
of elements
			e.g. no <
p
> inside <h1>
Style tags (e.g. <font>) ok	Style tags deprecated
29

Why use XHTML?
XHTML was developed to make HTML more extensible and increase interoperability with other data formats. There are two main reasons behind the creation of XHTML:
It creates a stricter standard for making web pages, reducing incompatibilities between browsers. So it is compatible for all major browsers.
It creates a standard that can be used on a variety of different devices without changes.
30
<html>
  
<head>
  
  
<title>
This is an example of bad HTML
</title>
  
<body>
  
  
<h1>
Bad HTML  
  
<p>
This is a paragraph  
</body>
  

How XML Differs from HTML
XML was designed to 
transport
 and 
store
 data.
HTML was designed to 
display
 data.
HTML is about 
displaying
 information, 
While XML is about 
carrying
 information.
31

Processing XML and JSON
Internet Technology
ITECH
32

Processing XML
DOM Parsing 
SAX Parsing
SAX vs. DOM
33

XML Structure
XML has a tightly controlled structure; 
Case sensitive <
start_end
>tags</
start_end
>
Obeys a 
hierarchical structure
All documents have a 
root
 element 
Might also be DTD/Schema rules to validate against
<?
xml
 version="1.0" 
encoding
="UTF-8"?>
<
breakfast_menu
>
<
food
>
    <
name
>Belgian Waffles</
name
>
    <
price
>$5.95</
price
>
    <
description
>
   Two of our famous Belgian Waffles with plenty of real maple syrup
   </
description
>
    <
calories
>650</
calories
>
</
food
>
…
<
/
breakfast_menu
>
34

Displaying XML
Valid XML can be displayed in a browser:
Valid XML
<?xml
 version
=
"1.0"
 encoding
=
"UTF-8"
?>
<note>
   
<to>
Bob
</to>
   
<from>
Alice
</from>
  
<heading>
Reminder
</heading>
  
<body>
Don't forget to cook dinner
</body>
</note>
35

Will this one properly display?
<?xml
 version
=
"1.0"
 encoding
=
"UTF-8"
?>
<note>
   
<to>
Bob
</to>
   
<from>
Alice
</
Ffrom
>
  
<heading>
Reminder
<\heading>
  
<body>
Don't forget to cook dinner
</body>
</note>
36

Programming and XML
There are two main ways of using XML in a program:
DOM (The Document Object Model)
 
builds 
an 
in-memory hierarchical model 
of the XML elements
appropriate if you need the 
whole document 
or need to 
move about it freely
SAX (The Simple API for XML
)
provides an 
event driven parser 
for XML
appropriate for using 
parts of the data
 
in the order they appear in the file, or if there are memory constraints
37

DOM Parsing
38

Definition: Document Object Model
DOM is a W3C standard for accessing documents
	"The W3C 
Document Object Model 
is a 
platform
 and 
language-neutral interface 
that allows programs and scripts to 
dynamically access
 and 
update 
the 
content
, 
structure
, and 
style 
of a 
document
.”
DOM is separated in three main parts
Core DOM: standard model for any structured doc
HTML DOM: standard model for HTML docs
XML  DOM: standard model for XML docs
39

XML DOM
It is a standard object model and programming interface for XML
It defines 
objects 
and 
properties
 of all XML elements along with the 
methods 
to access them
It is the standard for getting, changing, adding, and deleting XML elements
DOM defines everything in an XML Document as a node. 
40

XML DOM Nodes
The XML document is a document node (root node)
Every XML element within the document is an element node
Even the text of XML elements is a node
<
ysearchresponse
 
xmlns
=“https://
www.google.com
/” >
…
           <
resultset_web
 
count=“10” start=“1” 
….
>
        <
result
>
             <
title
>University of Glasgow</
title
>
             <
abstract
> The University of Glasgow, Scotland, UK. Scottish    
              University 
of the Year 2022. The 
University of Glasgow
 is a major research-led   
               university operating in an ...
           
           </
abstract
>
           <
url
> https://
www.gla.ac.uk
/ </
url
>
       </
result
>
….
Root Node
Element Node
Text Node
41

XML DOM Node Tree
	The XML Document is viewed as Node Tree
Root element:
<
ysearchresponse
>
Element:
<
resultset_web
>
Element:
<result>
Element:
<title>
Element:
<abstract>
Element:
<
url
>
Text:
University of Glasgow
Text:
The University of Glasgow, Scotland, UK…
Text: 
https://
www.gla.ac.uk
/ 
Attribute:
“count”
Attribute:
“start”
42

Parents, Children, Siblings
Element:
<
resultset_web
>
Element:
<result>
Element:
<result>
Element:
<result>
Element:
<result>
firstChild
previousSibling
nextSibling
lastChild
parentNode
<result> nodes are 
childNodes
 of <
resultset_web
> 
 And siblings to each other
An advantage of a tree structure is that it can be traversed without knowing the exact structure and without knowing the type of data it houses.
43

Working with DOM
In whichever language or environment you are working, the technique is basically the same:
load the xml document object
locate the document element or some other element that is of interest
Either transverse the tree
Or search for the desired element 
for the given element
Extract the attributes and their values
Extract the element data
And/Or add/modify/remove elements or attributes
goto
 step 2 and repeat until all processing is done
44

Example of DOM parsing
<html>
<body>
<p
 
id
=
"demo"
></p>
<script>
var
 
text
, 
parser
, 
xmlDoc
;
text
 = 
"<bookstore><book>"
 +
"<title>Everyday Italian</title>"
 +
"<author>Giada De 
Laurentiis
</author>"
 +
"<year>2005</year>"
 +
"<price>30.00</price>"
+
"</book></bookstore>"
;
parser
 = 
new
 
DOMParser
();
xmlDoc
 = 
parser
.
parseFromString
(
text
, 
"text/xml"
);
document
.
getElementById
(
"demo"
).
innerHTML
=
xmlDoc
.
getElementsByTagName
(
"title"
)[
0
].
childNodes
[
0
].
nodeValue
;
</script>
</body>
</html>
45
DOM XML

DOM Parsing using AJAX
XML example: 
https://www.w3schools.com/js/cd_catalog.xml
<script>
function 
loadDoc
() {
       const 
xhttp
 = new 
XMLHttpRequest
();
       
xhttp.onload
 = function() {
           
myFunction
(this);
  }
        
xhttp.open
("GET", "
cd_catalog.xml
");
        
xhttp.send
();
}
function 
myFunction
(xml) {
        const 
xmlDoc
 = 
xml.responseXML
;
        const x = 
xmlDoc.getElementsByTagName
("CD");
        let table="<tr><
th
>Artist</
th
><
th
>Title</
th
></tr>";
  for (let 
i
 = 0; 
i
 <
x.length
; 
i
++) { 
         table += "<tr><td>" +
        x[
i
].
getElementsByTagName
("ARTIST")[0].
childNodes
[0].
nodeValue
 +
       "</td><td>" +
       x[
i
].
getElementsByTagName
("TITLE")[0].
childNodes
[0].
nodeValue
 +
        "</td></tr>";
  }
      
document.getElementById
("demo").
innerHTML
 = table;
}
</script>
https://www.w3schools.com/js/tryit.asp?filename=tryjs_ajax_xml2
46

SAX Parsing
47

Simple API for XML 
SAX is a sequential access parser API for XML
It is not an alternative to DOM
There is no default object model
but another mechanism for reading XML
It is oriented towards 
state independent processing
It is a 
stream parser 
which is 
event-driven
Parsing is unidirectional i.e. there is no going back
i.e. search function in Windows Notepad
Callback methods 
are
 triggered 
by
 events 
when parsing. 
48

Events Handling in SAX
Events are available for the following XML features:
XML Text nodes
XML Element nodes
XML Comments
Events are triggered when:
Open or close element tags are encountered
Data sections are encountered
Processing instructions, comments, etc. are encountered
49

Working with SAX
The three steps to using SAX in your programs are:
Creating a custom object model 
like 
resultset
 and result
Creating a SAX parser
Creating a 
DocumentHandler
 
to turn the XML document into instances of your custom object model
ContentHandler
: implements the main SAX interface for handling document events
DTDHandler
: for handling DTD events
EntityResolver
: for resolving external entities
ErrorHandler
: for reporting errors and warning  
DefaultHandler
: for everything else
50

DOM versus SAX
Uses more memory 

Tends to be slower 

Can handle parsing which require access to the entire document 

 
(if it fits in memory)
Easier to program 

Can process files larger than main memory through disk caching 

But this is even slower!
Uses less memory 

Tends to be faster 

Can 
process files that are larger than main memory 

Requires
 more programmer effort 

Ca
n
 not handle all parsing tasks directly i.e. if all XML is required for validation 

Would need multiple parses
51

Java Script Object Notation
JSON
52

JSON
Lightweight data interchange format
“Easy” for humans to read and write
Easy for machines to parse and generate
Less guff, so more information per byte
JSON is built on two universal data structures (i.e., objects and arrays)
A collection of name/value pairs
Often as an object, record, struct, dictionary, hash..
An ordered list of values
Often an array, vector, list..
JSON is language independent
53

Comparison of XML and JSON
{
"employees"
:[
    {
"
firstName
"
:
"John"
, 
"
lastName
"
:
"Doe"
},
    {
"
firstName
"
:
"Anna"
, 
"
lastName
"
:
"Smith"
},
    {
"
firstName
"
:
"Peter"
, 
"
lastName
"
:
"Jones"
}
]}
<
employees
>
    
<
employee
>
        
<
firstName
>
John
<
/
firstName
>
 
<
lastName
>
Doe
<
/
lastName
>
    
<
/employee
>
    
<
employee
>
        
<
firstName
>
Anna
<
/
firstName
>
 
<
lastName
>
Smith
<
/
lastName
>
    
<
/employee
>
    
<
employee
>
        
<
firstName
>
Peter
<
/
firstName
>
 
<
lastName
>
Jones
<
/
lastName
>
    
<
/employee
>
<
/employees
>
XML:
JSON:
54

JSON and JavaScript
JSON uses JavaScript syntax, but the JSON format is text only, just like XML
Text can be read and used as a data format by any programming language
JSON evaluates to JavaScript Objects
The JSON format is syntactically identical to the code for creating JavaScript objects.
Instead of using a parser (like XML does), a JavaScript program can 
use standard functions to convert JSON data into native objects
55

JSON Syntax
JSON syntax is derived from JavaScript object notation syntax:
Data is in name/value pairs
Data is separated by commas
Curly braces hold objects
Square brackets hold arrays
Example JSON object:
{"
firstName
":"John", "
lastName
":"Doe"}
Example JSON array:
"employees":[
    {"
firstName
":"John", "
lastName
":"Doe"}, 
    {"
firstName
":"Anna", "
lastName
":"Smith"}, 
    {"
firstName
":"Peter","
lastName
":"Jones"}]
56

Display JSON
<!DOCTYPE
 
html
>
<html>
<body>
<h2>
JSON Object Creation in JavaScript
</h2>
<p
 
id
=
"demo"
></p>
<script>
var
 
text
 = 
'{"
name":"John
 
Johnson","street":"Oslo
 West 16","phone":"555 1234567"}'
;
var
 
obj
 = 
JSON
.
parse
(
text
);
document
.
getElementById
(
"demo"
).
innerHTML
 =
obj
.
name
 + 
"<
br
>"
 +
obj
.
street
 + 
"<
br
>"
 +
obj
.
phone
;
</script>
</body>
</html>
Display JSON
57

JSON versus XML
JSON and XML are similar because:
both JSON and XML are "self describing" (human readable)
both JSON and XML are hierarchical (values within values)
both JSON and XML can be parsed and used by lots of programming languages
both JSON and XML can be fetched with an 
XMLHttpRequest
JSON and XML are different because:
JSON doesn't use end tag
JSON is shorter
JSON is quicker to read and write
JSON can use arrays
58

