# 04-05-SparkAdvantagesAndDisadvantages

<!-- Page 1 -->

W4 - 05: Advantages and Disadvantages with Spark COMPSCI4064 (H) and COMPSCI5088 (M) Dr. Richard McCreadie


<!-- Page 2 -->

Where Are We? Types of Big Data Hardware Primer Service Needs Horizontal vs. Vertical Scaling Parallel Compute Distributed Storage MapReduce HDFS Resource Management Work Distribution Challenges Hadoop Cluster Management Platforms Spark Hadoop Execution DAGs Transformations and Actions LSM Bloom Filters BigTable / Hbase Chubby and ZooKeeper Cassandra Ethics Laws Extra Concepts Hadoop Issues Spark Architecture Pros and Cons Streaming Persistent Storage Primer NFS HDFS Reads and Writes HDFS Extras CAP and BASE DHT Overlay Networks Software Sandboxes


<!-- Page 3 -->

Spark Popularity • Since around 2014, Apache Spark exploded in popularity, and overtook Hadoop in 2017 • What has it solved, and what are the issues remaining?


<!-- Page 4 -->

Speed • We have covered this already, but Spark’s biggest call to fame is its speed in comparison to Hadoop. • Its often reported that Spark is upto 100x faster • Largely because all the computation is in - memory


<!-- Page 5 -->

Wider Use - case Coverage • As you have seen, Spark supports a much wider range of transformations than Hadoop, meaning that it can handle a larger number of use - cases • Most notably complex pipelines that require chaining many operations


<!-- Page 6 -->

Better Language and Integration Support • Hadoop is wholly Java based, with support added later for Python • Spark is written in Scala, with equivalent library support provided in Java • However, Spark has much better secondary language support, with plugins for Python and R, as well as native SQL query support • Spark also integrates into a wide range of data science and storage platforms


<!-- Page 7 -->

Spark as the Golden Bullet? • Apache Spark solves most of the issues that plagued Hadoop, while maintaining the simplicity of code development • It’s the best general big data framework • However, Spark is not always the correct answer, for some types of specialist applications there is a better solution • The big use - cases here are big data streaming and associated to that stateful processing • In these areas, while Spark provides some support (via spark streaming), its not as fast or efficient as a dedicated platform like Apache Flink


<!-- Page 8 -->

# UofGWorldChangers @ UofGlasgow Course Coordinator Dr. Richard McCreadie Email: richard.mccreadie@glasgow.ac.uk Room: SAWB 304