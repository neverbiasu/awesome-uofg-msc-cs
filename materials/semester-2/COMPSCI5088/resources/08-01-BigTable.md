# 08-01-BigTable

<!-- Page 1 -->

W8 - 01 : BigTable COMPSCI4064 (H) and COMPSCI5088 (M) Dr. Richard McCreadie


<!-- Page 2 -->

Where are we? Types of Big Data Hardware Primer Service Needs Horizontal vs. Vertical Scaling Parallel Compute Distributed Storage MapReduce HDFS Cluster Topologies Work Distribution Challenges Hadoop YARN Spark Hadoop Execution DAGs Transformations and Actions LSM Bloom Filters BigTable / Hbase Chubby and ZooKeeper Cassandra Flink Containers Ethics Laws Extra Concepts Hadoop Issues Spark Architecture Pros and Cons Streaming Persistent Storage Primer NFS HDFS Reads and Writes HDFS Extras CAP and BASE


<!-- Page 3 -->

Technology Timeline Google Incorporated 1998 Google MapReduce enters production 2002 Google reveals MapReduce 2004 Yahoo releases Hadoop 2006 Apache Spark Released 2014 2012 Spark starts development 1984 NFS developed Lots of SQL Database Development


<!-- Page 4 -->

Technology Timeline Google Incorporated 1998 2000 Google GFS enters production Google MapReduce enters production 2002 2003 Google Reveals GFS Google reveals MapReduce 2004 2005 Google develops BigTable Yahoo releases Hadoop 2006 2008 Powerset releases HBase Apache Spark Released 2014 2012 Spark starts development 1984 NFS developed Lots of SQL Database Development


<!-- Page 5 -->

• Between 2000 and 2004, the Google Index grew over 20x • In 2004 Google submitted a patent for a new invention and also published an associated research paper: Google… Innovating Behind the Scenes Again What did Google work on next?


<!-- Page 6 -->

Google… Innovating Behind the Scenes Again • After inventing MapReduce, their solution to horizontal scaling of compute, their engineers started work on a better solution for managing distributed data • At this time Google already has an HDFS equivalent (well before HDFS was invented), referred to as the Google File System (GFS) • Like the HDFS, GFS is fast for large block reads , but slow for file writes and append operations • They wanted a faster solution for writing data • Solution: BigTable


<!-- Page 7 -->

Google BigTable • As its name suggests BigTable is a Table storage solution • Rather than a file storage solution like NFS, GFS or HDFS • This shift from thinking about data storage in terms of files to thinking in terms of Tables is important, and is still with us today – think Spark RDDs or Python DataFrames • Four core high - level ideas here: • Most big data processes want to read in and later write out a contiguous set of records , similar to rows in a table • Records are usually structured into standard fields , which could be columns in a database table (although not all records will have all fields) • Unlike SQL databases, we normally don’t have explicit relationships between fields - no need for a draconian relational database management system (RDMS) • We may want to store multiple versions of a record representing it at different points in time.


<!-- Page 8 -->

Simona 000008 000004 John MSci MSc DS Google BigTable • S parse : Records (rows) can be incomplete (only contain a subset of the fields) • D istributed : Sets of records are stored as blocks and distributed amongst multiple machines • Persistent : Records are always stored to persistent storage • Multidimensional : Data is indexed through a combination of the row key, column name, and timestamp • S orted : Records are ordered lexicographically by the RowKey • Map : It’s a map between RowKeys and Records Name Degree 000001 000002 000003 000004 000005 000006 000007 000008 David Jing Xi John Ellen Yang Misbah Simona MSc CS MSc CS MSc DS MSc DS MSci Joint MSci Timestamp 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 26/11/2022… 29/11/2022… RowKey


<!-- Page 9 -->

• Google, as usual did not release an open - source version of BigTable , so it was up to someone else to produce an alternative, this time it was a company called PowerSet • They released HBase in 2008 • Its basically BigTable running on top the HDFS for underlying file storage HBase


<!-- Page 10 -->

# UofGWorldChangers @ UofGlasgow Course Coordinator Dr. Richard McCreadie Email: richard.mccreadie@glasgow.ac.uk Room: SAWB 304