# 08-03-Zookeeper

<!-- Page 1 -->

W8 - 03: ZooKeeper (and Chubby) COMPSCI4064 (H) and COMPSCI5088 (M) Dr. Richard McCreadie


<!-- Page 2 -->

Where are we? Types of Big Data Hardware Primer Service Needs Horizontal vs. Vertical Scaling Parallel Compute Distributed Storage MapReduce HDFS Cluster Topologies Work Distribution Challenges Hadoop YARN Spark Hadoop Execution DAGs Transformations and Actions LSM Bloom Filters BigTable / Hbase Chubby and ZooKeeper Cassandra Flink Containers Ethics Laws Extra Concepts Hadoop Issues Spark Architecture Pros and Cons Streaming Persistent Storage Primer NFS HDFS Reads and Writes HDFS Extras CAP and BASE


<!-- Page 3 -->

• HBase • HMaster : A ssigns regions to Region Server. Creates/deletes tables. Routes data requests to region servers. Handle failures. • Region Server : Handles data requests from the user. • Zookeeper : Acts as a communication bridge. Tracks state of HMaster and Region Servers. Triggers recovery. HBase Architecture Machine 1 HDFS Machine 2 Machine 3 HBase HMaster Region Server Region Server Region Server Z ookeepe r Z ookeepe r Name Node Data Node Data Node Data Node Assigns Data to.. VS Assigns Data to.. HMaster (inactive) Routes Requests to..


<!-- Page 4 -->

• ZooKeeper is a distributed key - value data store that provides the option for applications to be notified if a value for a key changes • Designed to be lightweight and highly reliable • ZooKeeper is everywhere • Its not just an HBase service, also used by Spark, Flink • Used to power other things, e.g. Reddit, Twitter, Facebook/Meta, eBay… • Based of the design of Chubby (another Google service)


<!-- Page 5 -->

s tate=alive Ip=… Regions=[…] ZooKeeper Data Mode l • ZooKeeper is a key - value data store , like a Map or Dictionary • Fundamentally simple • However, keys are structured into a hierarchal namespace • Each node in the hierarchy is known as a ZNode • ZNodes hold a value which can be read or written to • Who can read/write is defined by an Access Control List (ACL) / / hbase / hbase /node1 / hbase /node2 masterIP =… replicas=3 s tate=alive Ip=… Regions=[…]


<!-- Page 6 -->

Follower Leader Reliability through Replication • ZooKeeper is comprised of multiple (usually at least 5) servers • One server is tagged as the Leader , with another the Follower (the next in line of the Leader fails to respond) • The Leader synchronizes its state with the other servers • A distributed application runs a ZooKeeper Client within each of its services • Allows that application t o connect to the leader to read and write data • Also regularly reports the application service’s state to ZooKeeper ZK - Server ZK - Server ZK - Server ZK - Server Synchronizes state… Client Client Client


<!-- Page 7 -->

Why is ZooKeeper so Common? • It is a solution to a common issue with distributed applications: • How do I track the state of the various replicas of those components? • Applications that use ZooKeeper follow the school of thought that an application should not be responsible for tracking its own state, but should use an independent service for this • This avoids issues with ‘master’ services failing, bringing down the whole system • All application components report their state to ZooKeeper • Management services within the application can ask ZooKeeper to notify them when data written by those components changes


<!-- Page 8 -->

Examples of using ZooKeeper • File Locking : Hold the ‘Lock’ message for a file while it is being written • Store Global Configuration : Store configuration variables or schemas of tables • Store File Access Controls : For a file list hold the access permissions • Hold Bootstrap Configuration : Store key start - up data, like where master services are located • Get the List of Service Replicas : Have each service write down information about itself HBase uses ZooKeeper for all of these!


<!-- Page 9 -->

# UofGWorldChangers @ UofGlasgow Course Coordinator Dr. Richard McCreadie Email: richard.mccreadie@glasgow.ac.uk Room: SAWB 304