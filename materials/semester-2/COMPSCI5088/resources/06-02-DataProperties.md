# 06-02-DataProperties

<!-- Page 1 -->

W6 - 02: CAP and BAS E COMPSCI4064 (H) and COMPSCI5088 (M) Dr. Richard McCreadie


<!-- Page 2 -->

Where are we? Types of Big Data Hardware Primer Service Needs Horizontal vs. Vertical Scaling Parallel Compute Distributed Storage MapReduce HDFS Cluster Topologies Work Distribution Challenges Hadoop YARN Spark Hadoop Execution DAGs Transformations and Actions LSM Bloom Filter BigTable / Hbase ZooKeeper Chubby Cassandra Flink Containers Ethics Laws Extra Concepts Hadoop Issues Spark Architecture Pros and Cons Streaming Persistent Storage Primer NFS HDFS Reads and Writes HDFS Extras CAP and BASE


<!-- Page 3 -->

CAP Theorem • CAP Theorem was developed by Eric Brewer in the beginning of the 2000’s, and describes three desirable properties of a data storage system: • Consistency : Every node has the same knowledge of data at any instant of time • Availability : A guarantee that every request receives a response which may be processed or failed • Partition Tolerance : The system continues to operate even if a message is lost or part of the system fails • I n the majority of instances , a distributed system can only guarantee two of the features , not all three


<!-- Page 4 -->

CAP Examples Consistency Availability Partition Tolerance Traditional Databases (Oracle, MySQL) BASE Systems (Cassandra, CouchDB) Distributed Storage (MongoDB, HBase) Will tend to fail once some portion of its data nodes becomes unavailable Clients may get inconsistent data Data may become unavailable


<!-- Page 5 -->

NFS • Consistency : Yes – there is only one copy of the data, so it is consistent • Availability : Decent – it will always return data assuming the server is alive. • Partition Tolerance : No – there is only one copy of the data, so a failure will bring the platform down HDFS • Consistency: Mediocre – the HDFS will make a best effort attempt to assure consistency of replicas, but this takes time • Availability : Decent ? – the HDFS will always return data so long as there is at least one available replica. What if the Name Node goes down though ? • Partition Tolerance : Decent – the HDFS is resilient to some degree of failures depending on replication factor NFS and HDFS under CAP


<!-- Page 6 -->

Big Data Systems and Consistency • What you will find is that the more we push towards Big Data, the easier availability and fault tolerance becomes , but consistency becomes more difficult • This is because the more replicas of data or services we can support the more resilient we become • On the other hand, the more costly and difficult it becomes to ensure that all replicas are up - to - date and the more edge - cases you need to account for in the design (think HDFS recovery)


<!-- Page 7 -->

BASE • Many modern Big Data Storage systems are what we would refer to as BASE systems: • B asically A vailable : The system guarantee's that the it will be available and will provide a response, but the response may be old data, or simply a notification that the desired data is unavailable • S oft state : The system’s internal storage state will be constantly changing, even potentially when there is no new input • E ventual consistency : The system will eventually become consistent if new input is stopped being provided, but consistency is not guaranteed per transaction. • They usually focus on high Availability and Partition Tolerance, at the expense of Consistency


<!-- Page 8 -->

# UofGWorldChangers @ UofGlasgow Course Coordinator Dr. Richard McCreadie Email: richard.mccreadie@glasgow.ac.uk Room: SAWB 304