# TUTORIAL-SparkSQL

Tutorial: Spark SQL
COMPSCI4064 (H) and COMPSCI5088 (M)
Dr.
 Richard McCreadie

Impacts
Spark SQL had a significant impact on the wider Spark ecosystem
It overtime became the ‘default’ way to write Spark programs, and is what 
PySpark
 uses
The Catalyst Optimiser became a core part of Spark 2.0, as the updated Dataset API also started using it
Dataset is now a (more efficient) semi-typed alternative to the raw RDD API
DataFrame
 is simply a Dataset<Row>
Quite a lot of the online resources you will find just assume you are using 
DataFrames
 rather than RDDs

RDD vs. 
DataFrame
 vs. 
DataSet
The current state of Spark is there are three API options for programming in Spark, each with their own advantages and disadvantages
RDD
: Lowest level API, is the fastest for the tasks it is suitable for, very strongly typed and has the best error checking
Dataset
: Like RDD but has a broader set of functions, uses the Catalyst Optimiser, is typed but lacks the same checking guarantees as an RDD
DataFrame
: Untyped, uses the Catalyst Optimiser, most convenient to code in, but only provides syntactic checks
SQL
DataFrame
Dataset
RDD
Syntactic
Code Checks
Data Type
Code Checks
Runtime
Runtime
Runtime
Compile 
Time
Compile 
Time
Compile 
Time
Compile 
Time
Compile 
Time
(Limited)

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

Why Spark SQL?
There are many different add-on libraries that have been implemented into the Spark ecosystem, similar to how Hadoop built an ecosystem over time
Spark SQL is a bit special however, because 
it is a dependency for many other libraries in the ecosystem (including 
PySpark
)
Source: 
Building Data Streaming Applications with Apache Kafka 
(Book)

What is Spark SQL?
Fundamentally, Spark SQL was designed to provide a means for database programmers who were familiar with SQL (Structured Query Language) to use that knowledge to write Spark programs
# Create temporary table
spark.read.option
(
"
header"
,
True
) \
          .csv(
“myStudents.csv"
) \
          .
createOrReplaceTempView
(
“
StudentTable
"
)
# SQL Select query
spark.sql
(
"SELECT degree, course, 
guid
, year FROM 
StudentTable
"
) \
     .show(5)
Load a table from file into memory, and name it 
StudentTable
Run an SQL query
But that is not all it added…
(This is 
PySpark
 Code)

Spark SQL Architecture
To make the above code example work, Spark SQL had to add to components to Spark
DataFrame
 API
: An implementation of the underlying data operations needed to execute SQL Statements along with a common data representation (the Row class)
Catalyst Optimiser
: Converts an SQL statement to a sequence of 
DataFrame
 operations

Object Typing
The underlying representation of data in Spark is the RDD (Resilient Distributed Dataset), however an 
RDD is very strongly typed
Every RDD element has a defined (Java or Scala) class
This is good because you get maximal code validation (meaning if you pass the compile check, your Spark Job is very likely to complete successfully)
This is one of the reasons the tutorial teaches working with RDDs
However, as you have/will discover, its also somewhat inconvenient, as you need to manually define custom classes to represent your data and handle serialisation-related issues (more on this in a later presentation 
The cost of having better code validation is coding takes longer

SQL and Primitives
One of the key aspects of SQL databases is that they are primarily designed to work only with a set of primitive data types
String, Integer, Long, etc
This means that Spark SQL does not need or want custom classes
Hence it created the 
DataFrame
 API
, which is a pseudo-untyped version of RDD

Row and Transformations
The foundation of the 
DataFrame
 API is the Row class
The core difference here is that the 
DataFrame
 API defines transformations on the Row type
, i.e. those transformations are agnostic (i.e. they don’t care) what the data types stored within any Row object are (until execution time)
Even though the objects stored in a Row have types (we are still in Java/Scala land here), there is no checking of those types at compile-time
This means that 
DataFrame
-based programs are more likely to fail during run-time 
as a transformation discovers that a row it has been given contains data that it does not know how to process
Row
 
myrow
 = 
new
 
Row
(1, 
true
, 
"a string"
, null);
A row can take any number of Java/Scala objects, it acts like a variable length Tuple

The Convenience Though…
The primary advantage of the 
DataFrame
 API is convenience
# Read CSV file into table
df
 = 
spark.read.option
(
"
header"
,True
) \
          .csv(
“myStudents.csv"
)
# 
DataFrame
 API where()
df.select
(
“degree"
,
“course"
,
“
guid
"
,
“year"
) \
  .where(“year == ‘26'") \
  
.
orderBy
(“guid") \
  .show(5)
Load file as 
DataFrame
Filter data
Sort data

Lambda Expressions and Spark Functions
Remember that I said that the 
DataFrame
 API had to implement a range of transformations that take Row objects as input?
This means that (nearly) all the normal Spark transformations have a Row-equivalent
With the introduction of Lambda expressions in JVM-based languages, it became possible to use 
DataFrames
 to define Spark programmes with custom functions
Beware doing too much of this – your code quickly becomes unreadable
DataFrame
 
dfMarkAvg
 = 
      
dfStudentData.filter
(d -> {
d.year
 == 25})
                                .map(d -> (
d.mark
, 
d.cohort
))
                                .
groupBy
(col(2))
                                .
avg
()
Calculates the average mark per 2025 student cohort

