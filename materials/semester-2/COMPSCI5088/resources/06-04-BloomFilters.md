# 06-04-BloomFilters

<!-- Page 1 -->

W6 - 04: Bloom Filters COMPSCI4064 (H) and COMPSCI5088 (M) Dr. Richard McCreadie


<!-- Page 2 -->

Where are we? Types of Big Data Hardware Primer Service Needs Horizontal vs. Vertical Scaling Parallel Compute Distributed Storage MapReduce HDFS Cluster Topologies Work Distribution Challenges Hadoop YARN Spark Hadoop Execution DAGs Transformations and Actions LSM Bloom Filter BigTable / Hbase ZooKeeper Chubby Cassandra Flink Containers Ethics Laws Extra Concepts Hadoop Issues Spark Architecture Pros and Cons Streaming Persistent Storage Primer NFS HDFS Reads and Writes HDFS Extras CAP and BASE


<!-- Page 3 -->

Bloom Filters • If you read technical documentation for many Big Data storage systems, you will come across Bloom Filters being used… so its worth knowing what they are • Bloom Filters were proposed by Burton Howard Bloom in 1970 and are a space - efficient way to probabilistically determine whether an item belongs in a set • They are often use to determine whether a key associated to a storage record (item) is held in a file (a set of items) • Given a file (a set of items), the bloom filter will tell you either: 1. The item is possibly in set 2. The item is not in the se t


<!-- Page 4 -->

Hashing • The core of Bloom Filters is Hashing : • The process of transforming any given key or a string of characters into another (usually shorter) value . • A Hash function takes as input a key/string and outputs a number or bit array representing that key/string • A hashing function will have a hash space, which defines the max - min values that can be output or the size of the bit array respectively • Given a input A the hash function will always give out value B • Multiple different inputs can result in the same output “Big Data Course” Hash Function 36 Hash Space: 0 - 99


<!-- Page 5 -->

So how does a Bloom Filter work? • In a log index context, Bloom Filters allow us to look up whether a file contains a record based on its key, lets consider writing records first: 1. Define a Hash Space for our spill file F 1 1. A binary array comprised of m bits SSTables Hash Space (m=12) F 1


<!-- Page 6 -->

So how does a Bloom Filter work? • In a log index context, Bloom Filters allow us to look up whether a file contains a record based on its key, lets consider writing records first: 1. Define a Hash Space for our spill file F 1 1. A binary array comprised of m bits 2. Define k hash functions bounded by m SSTables Hash 1 Hash 2 Hash Functions (k=2) F 1


<!-- Page 7 -->

So how does a Bloom Filter work? • In a log index context, Bloom Filters allow us to look up whether a file contains a record based on its key, lets consider writing records first: 1. Define a Hash Space for our spill file F 1 1. A binary array comprised of m bits 2. Define k hash functions bounded by m 3. Set all values to 0 SSTables 0 0 0 0 0 0 0 0 0 0 0 0 Hash 1 Hash 2 F 1


<!-- Page 8 -->

So how does a Bloom Filter work? • In a log index context, Bloom Filters allow us to look up whether a file contains a record based on its key, lets consider writing records first: 1. Define a Hash Space for our spill file F 1 1. A binary array comprised of m bits 2. Define k hash functions bounded by m 3. Set all values to 0 4. When we write a record with key to K 1 spill file F 1 • Hash K 1 using the functions • Set the output values to 1 in the hash space SSTables 0 0 1 0 1 0 0 0 0 0 0 0 Hash 1 Hash 2 K 1 3 5 F 1


<!-- Page 9 -->

So how does a Bloom Filter work? • In a log index context, Bloom Filters allow us to look up whether a file contains a record based on its key, lets consider writing records first: 1. Define a Hash Space for our spill file F 1 1. A binary array comprised of m bits 2. Define k hash functions bounded by m 3. Set all values to 0 4. When we write a record with key to K 1 spill file F 1 • Hash K 1 using the functions • Set the output values to 1 in the hash space SSTables 0 0 1 0 1 0 0 0 0 0 0 0 Hash 1 Hash 2 K 1 3 5 F 1


<!-- Page 10 -->

So how does a Bloom Filter work? • In a log index context, Bloom Filters allow us to look up whether a file contains a record based on its key, lets consider writing records first: 5. Now we write a second record with key to K 2 spill file F 1 • Hash K 2 using the functions • Set the output values to 1 in the hash space 6. … and so o n • Note that both K 1 and K 2 mapped to position 5 • This is a hash collision – where two items receive the same hash value • Probability of this occurring decreases as m increase s SSTables 0 0 1 0 1 0 0 0 1 0 0 0 Hash 1 Hash 2 K 2 5 9 F 1


<!-- Page 11 -->

So how does a Bloom Filter work? • So how do we check whether one of these keys exist in F 1 (read) • We simply re - hash our key and check all positions • If all position are 1 then the key is possibly in set • If any positions are 0 then the key is not in the set 0 0 1 0 1 0 0 0 1 0 0 0 Hash 1 Hash 2 K 1 3 5 Possibly in set


<!-- Page 12 -->

So how does a Bloom Filter work? • So how do we check whether one of these keys exist in F 1 (read) • We simply re - hash our key and check all positions • If all position are 1 then the key is possibly in set • If any positions are 0 then the key is not in the set 0 0 1 0 1 0 0 0 1 0 0 0 Hash 1 Hash 2 K 3 3 10 Not in set


<!-- Page 13 -->

So how does a Bloom Filter work? • So how do we check whether one of these keys exist in F 1 (read) • We simply re - hash our key and check all positions • If all position are 1 then the key is possibly in set • If any positions are 0 then the key is not in the set • This works because our has functions guarantee to give the same value for a key 0 0 1 0 1 0 0 0 1 0 0 0 Hash 1 Hash 2 K 3 3 10 Not in set


<!-- Page 14 -->

So how does a Bloom Filter work? • So how do we check whether one of these keys exist in F 1 (read) • We simply re - hash our key and check all positions • If all position are 1 then the key is possibly in set • If any positions are 0 then the key is not in the set • This works because our has functions guarantee to give the same value for a key • However, because of hash collisions , just because all positions are set to 1 we cannot be sure that the this is a true hit • We can make this less likely by increasing m and/or k 0 0 1 0 1 0 0 0 1 0 0 0 Hash 1 Hash 2 K 4 3 9 Possibly in set


<!-- Page 15 -->

Some Math… • Probability of false positives: • What is the probability that a bit is 0 after adding one element and using just one hash function? • What if we use multiple k hash functions? • What is the probability that a bit is zero, after we added n elements using k hash functions? • The probability of a bit being 1 after adding n elements with k hash functions is: [assume all bits have same prob of being hit] =


<!-- Page 16 -->

Some Math… • What is the probability of a false positive pfp after we added n elements? • Optimal k , given m and n : • Optimal m , given n , target pfp : • Optimal k is then • Example Usage: n=1000, target pfp =5% (0.05) [not strictly correct, but is a good approximation]


<!-- Page 17 -->

# UofGWorldChangers @ UofGlasgow Course Coordinator Dr. Richard McCreadie Email: richard.mccreadie@glasgow.ac.uk Room: SAWB 304