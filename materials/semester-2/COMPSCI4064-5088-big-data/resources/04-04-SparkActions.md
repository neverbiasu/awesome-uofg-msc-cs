# 04-04-SparkActions

<!-- Page 1 -->

W4 - 03: Spark Actions COMPSCI4064 (H) and COMPSCI5088 (M) Dr. Richard McCreadie


<!-- Page 2 -->

Where Are We? Types of Big Data Hardware Primer Service Needs Horizontal vs. Vertical Scaling Parallel Compute Distributed Storage MapReduce HDFS Resource Management Work Distribution Challenges Hadoop Cluster Management Platforms Spark Hadoop Execution DAGs Transformations and Actions LSM Bloom Filters BigTable / Hbase Chubby and ZooKeeper Cassandra Ethics Laws Extra Concepts Hadoop Issues Spark Architecture Pros and Cons Streaming Persistent Storage Primer NFS HDFS Reads and Writes HDFS Extras CAP and BASE DHT Overlay Networks Software Sandboxes


<!-- Page 3 -->

Common Actions The ones you will use ~90% of the time


<!-- Page 4 -->

collect() • Description : Returns all the elements of the dataset as an array at the driver program. This is usually useful after a filter or other operation that returns a sufficiently small subset of the data. • Function : None • Application : Returning data back to your machine so you can visualise or save it. Involves copying the whole RDD and sending it over the network RDD1 Partition 1 Partition 2 [ [


<!-- Page 5 -->

count() • Description : Return the number of elements in the dataset. • Function : None • Application : I usually use this when I want to trigger computation via an action, but don’t want to copy all the data in the RDD to my machine. RDD1 Partition 1 Partition 2 5


<!-- Page 6 -->

reduce() • Description : Aggregate the elements of the dataset using a function func (which takes two arguments and returns one). The function should be commutative and associative so that it can be computed correctly in parallel. • Function : record1,record1 record1 • Application : Typically used to count or aggregate information from an RDD into a single data structure, e.g. a list, map/dictionary or tree RDD1 Partition 1 Partition 2 func func RDD2 func RDD3 func


<!-- Page 7 -->

Sampling Actions When you just want a little of the data


<!-- Page 8 -->

first() • Description : Return the first element of the dataset (similar to take(1)). • Function : None RDD1 Partition 1 Partition 2


<!-- Page 9 -->

take( n ) • Description : Return an array with the first n elements of the dataset. • Function : None RDD1 Partition 1 Partition 2 Take(2) [ [


<!-- Page 10 -->

takeSample ( withReplacement , num , [ seed ]) • Description : Return an array with a random sample of num elements of the dataset, with or without replacement, optionally pre - specifying a random number generator seed. • Function : None • Application : This is like take(n), but is random rather than returning the first, also if you allow withReplacement you might get the same item multiple times RDD1 Partition 1 Partition 2 takeSample (3) [ [


<!-- Page 11 -->

takeOrdered ( n , [ordering] ) • Description : Return the first n elements of the RDD using either their natural order or a custom comparator. • Function : Sort • Application : Again, this is like take(n), but sorts the data based on their natural ordering or using a function you define, rather than returning the data in RDD order RDD1 Partition 1 Partition 2 takeOrdered (2) [ [ sort RDD2


<!-- Page 12 -->

Save Actions When you want to keep an RDD, but its too big for your laptop memory


<!-- Page 13 -->

saveAsTextFile ( path ) • Description : Write the elements of the dataset as a text file (or set of text files) in a given directory in the local filesystem, HDFS or any other Hadoop - supported file system. Spark will call toString on each element to convert it to a line of text in the file. • Function : None RDD1 Partition 1 Partition 2


<!-- Page 14 -->

saveAsSequenceFile ( path ) • Description : Write the elements of the dataset as a Hadoop SequenceFile in a given path in the local filesystem, HDFS or any other Hadoop - supported file system. This is available on RDDs of key - value pairs that implement Hadoop's Writable interface. In Scala, it is also available on types that are implicitly convertible to Writable (Spark includes conversions for basic types like Int, Double, String, etc). • Function : None RDD1 Partition 1 Partition 2


<!-- Page 15 -->

saveAsObjectFile ( path ) • Description : Write the elements of the dataset in a simple format using Java serialization, which can then be loaded using SparkContext.objectFile (). • Function : None RDD1 Partition 1 Partition 2


<!-- Page 16 -->

# UofGWorldChangers @ UofGlasgow Course Coordinator Dr. Richard McCreadie Email: richard.mccreadie@glasgow.ac.uk Room: SAWB 304