# 08-02-HBaseStructure

<!-- Page 1 -->

W8 - 02 : HBase COMPSCI4064 (H) and COMPSCI5088 (M) Dr. Richard McCreadie


<!-- Page 2 -->

Where are we? Types of Big Data Hardware Primer Service Needs Horizontal vs. Vertical Scaling Parallel Compute Distributed Storage MapReduce HDFS Cluster Topologies Work Distribution Challenges Hadoop YARN Spark Hadoop Execution DAGs Transformations and Actions LSM Bloom Filters BigTable / Hbase Chubby and ZooKeeper Cassandra Flink Containers Ethics Laws Extra Concepts Hadoop Issues Spark Architecture Pros and Cons Streaming Persistent Storage Primer NFS HDFS Reads and Writes HDFS Extras CAP and BASE


<!-- Page 3 -->

HBase • HBase is an open - source non - relational distributed database • Explicitly modeled after Google's BigTable , written in Java • Focuses on Consistency and Availability • Provides a table - like abstraction but it is not a RDBMS • No transactions • No normalization • No relational API • No proper schema • Aims to maintain the fast read speeds of the HDFS , while providing better write and append throughput for records


<!-- Page 4 -->

• HBase • HMaster : Assigns regions to Region Server. Creates/deletes tables. Routes data requests to region servers. Handle failures. • Region Server : Handles data requests from the user. • Zookeeper : Acts as a communication bridge. Tracks state of HMaster and Region Servers. Triggers recovery. HBase Architecture Machine 1 HDFS Machine 2 Machine 3 HBase HMaster Region Server Region Server Region Server Z ookeeper Z ookeeper Name Node Data Node Data Node Data Node Assigns Data to.. VS Assigns Data to.. HMaster (inactive) Routes Requests to..


<!-- Page 5 -->

HDFS Name Node Data Node Data Node Data Node HBase uses the HDFS? • When HBase finally needs to write a file to disk it write to the HDFS • … i.e. the region server acts as a client communicating to the Name Node • … and then writes its data to the listed Data Nodes Machine 1 Machine 2 Machine 3 HBase HMaster Region Server Region Server Region Server Z ookeeper Z ookeeper HMaster (inactive)


<!-- Page 6 -->

Simona 000008 000004 John MSci MSc DS HBase Data Model (its like BigTable ) Name Degree 000001 000002 000003 000004 000005 000006 000007 000008 David Jing Xi John Ellen Yang Misbah Simona MSc CS MSc CS MSc DS MSc DS MSci Joint MSci Timestamp 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 26/11/2022… 29/11/2022… RowKey A row is a grouping of cells that share a RowKey


<!-- Page 7 -->

Simona 000008 000004 John MSci MSc DS HBase Data Model (its like BigTable ) Name Degree 000001 000002 000003 000004 000005 000006 000007 000008 David Jing Xi John Ellen Yang Misbah Simona MSc CS MSc CS MSc DS MSc DS MSci Joint MSci Timestamp 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 26/11/2022… 29/11/2022… RowKey A row is a grouping of cells that share a RowKey Columns store the data for each RowKey . One RowKey can have unlimited columns


<!-- Page 8 -->

Simona 000008 000004 John MSci MSc DS HBase Data Model (its like BigTable ) Name Degree 000001 000002 000003 000004 000005 000006 000007 000008 David Jing Xi John Ellen Yang Misbah Simona MSc CS MSc CS MSc DS MSc DS MSci Joint MSci Timestamp 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 26/11/2022… 29/11/2022… RowKey Columns can be grouped into column families that can be read together (used for storage optimization) Column Family


<!-- Page 9 -->

Simona 000008 000004 John MSci MSc DS HBase Data Model (its like BigTable ) Name Degree 000001 000002 000003 000004 000005 000006 000007 000008 David Jing Xi John Ellen Yang Misbah Simona MSc CS MSc CS MSc DS MSc DS MSci Joint MSci Timestamp 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 26/11/2022… 29/11/2022… RowKey Columns can be referenced by index or by a column qualifier , which are column titles Column Qualifiers


<!-- Page 10 -->

Simona 000008 000004 John MSci MSc DS HBase Data Model (its like BigTable ) Name Degree 000001 000002 000003 000004 000005 000006 000007 000008 David Jing Xi John Ellen Yang Misbah Simona MSc CS MSc CS MSc DS MSc DS MSci Joint MSci Timestamp 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 26/11/2022… 29/11/2022… RowKey A cell in the table is a combination of the RowKey , Column Qualifier


<!-- Page 11 -->

Simona 000008 000004 John MSci MSc DS HBase Data Model (its like BigTable ) Name Degree 000001 000002 000003 000004 000005 000006 000007 000008 David Jing Xi John Ellen Yang Misbah Simona MSc CS MSc CS MSc DS MSc DS MSci Joint MSci Timestamp 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 26/11/2022… 29/11/2022… RowKey When data is stored a timestamp is also recorded When data is updated the new data is written with a new timestamp Multiple versions of a row might exist with different timestamps


<!-- Page 12 -->

Simona 000008 000004 John MSci MSc DS HBase Data Model (its like BigTable ) Name Degree 000001 000002 000003 000004 000005 000006 000007 000008 David Jing Xi John Ellen Yang Misbah Simona MSc CS MSc CS MSc DS MSc DS MSci Joint MSci Timestamp 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 21/11/2022… 26/11/2022… 29/11/2022… RowKey Regions are contiguous sets of rows that are stored together


<!-- Page 13 -->

Data Addressing • While it is conceptually useful to think about HBase as a table storage mechanism, internally data is referenced as a multi - dimensional map Map 000001 000004 Name Degree Name Degree 21/11/2022… 21/11/2022… David MSc CS 21/11/2022… 29/11/2022… 21/11/2022… 29/11/2022… John John MSc CS MSc DS RowKey Column Qualifier Timestamp


<!-- Page 14 -->

Data Addressing • While it is conceptually useful to think about HBase as a table storage mechanism, internally data is referenced as a multi - dimensional map • In practice, its better to think of it as a key - value store: • Key : < RowKey , Column Qualifier , Timestamp > • Value : <value> • So… there is n o such thing as a “row” in the traditional sense • A row is simply the set of all cells of a given table sharing the same rowkey


<!-- Page 15 -->

Ordering and Grouping • Rows are split into contiguous groups called regions • Regions are assigned by the HMaster , and managed by a Region Server • Held in memory within the Region Server until written to disk as an ‘ HFile ’ • Ordering: • Rows within a region are ordered lexographically when written to disk • Sort happens just before write • Within each row , cells sorted lexicographically on column qualifiers • Within each set of cells with the same column qualifier, cells sorted numerically by timestamp • Columns can be grouped into column families • When written, each Column Family has its own directory on the HDFS (.../table/ CFx /...) • Allows for grouping of columns frequently accessed together • Improved performance when accessing data • Within a Column Family, all data for a row stored together on disk


<!-- Page 16 -->

Versions and Time • Each table cell may have multiple versions • Hence the need for a timestamp • A timestamp can be actual time or some user - defined quantity ( e.g. a version number) • Latest version of each cell returned by default • Versions of a table cell may be spread out amongst regions • Users can also specify • Explicit number of max versions for the system to keep • Explicit max age ( e.g. one week) • Allows for a sort of “garbage collection”


<!-- Page 17 -->

Data Distribution • Tables are divided into regions, regions are distributed amongst region servers A B C D E F G A B C D E F G Region Server A B ? ? ? ? ? ? Region Server ? ? ? Region Server C D E F G ? ? ? ? Client Reads/Writes Data


<!-- Page 18 -->

Region Servers • Responsible for the actual storage of regions (parts of a table) • One region server holds multiple regions • A region server uses 4 storage structures • Write - Ahead Log (WAL) : Persistently stores write records between spill file writes • MemStore : Stores the most recent batch of write records in memory. Records are keyed to the files they are about. Read requests check this first. • BlockCache : Stores a copy of recently read data to improve access time for repeat reads • HFile : A compressed representation of a set of write records. The MemStore is converted to an HFile when full This seems familiar…


<!-- Page 19 -->

Log - Structured - Merge (LSM) Tree Components • Write Ahead Log (WAL) : Persistently stores write records between spill file writes • MemTable : Stores the most recent batch of write records in memory. Records are keyed to the files they are about. Read requests check this first. • SSTable : Comprised of a series of spill files. Once the MemTable becomes full, it gets sorted, converted to a spill file and added to the SSTable . • Index : Contains a mapping between file keys and what (persisted) SSTables contain information about that key • Compactor : Merges SSTables to reduce fragmentation of information about a key Write Ahead Log (WAL) SSTables Index (Memory) MemTable (Memory) Index ( Persistant )


<!-- Page 20 -->

Log - Structured - Merge (LSM) Tree Components • Write Ahead Log (WAL) : Persistently stores write records between spill file writes • MemTable : Stores the most recent batch of write records in memory. Records are keyed to the files they are about. Read requests check this first. • SSTable : Comprised of a series of spill files. Once the MemTable becomes full, it gets sorted, converted to a spill file and added to the SSTable . • Index : Contains a mapping between file keys and what (persisted) SSTables contain information about that key • Compactor : Merges SSTables to reduce fragmentation of information about a key HFile HMaster does this Performed on the Region Servers MemStore


<!-- Page 21 -->

Region Servers and Column Families • Each Region is split into Column Families • A Column Family for a region is the unit of storage within a Region Server • Stored in MemStore • Persisted to disk as HFiles Region Server A B C D E x x X x x F G H I x x X x 1 2 Region 1 Column Family 1 Column Family 2 HDFS A A B / hbase /table/ region - 1 - 5/colfam1 / hbase /table/ region - 1 - 5/colfam2 D D F G H I


<!-- Page 22 -->

Data API • Put ( rowkey , column_key , timestamp, value) • Get ( rowkey ) • Returns all cells of row • Get ( rowkey , column_key , timestamp) • Returns a specific cell • Get (List<Get> gets) • Returns a list of results, one per Get operation in the input list • A.k.a. a multi - get • Scan ( start_rowkey , end_rowkey ) • Returns all rows with keys in [ start_key , end_key ) • Delete ( rowkey ) • Delete ( rowkey , timestamp) • Delete ( rowkey , column_family [,timestamp]) • Delete ( rowkey , column_key [,timestamp])


<!-- Page 23 -->

HBase vs HDF S • HBase is a column - orientated data store , while HDFS is a file store • HBase provides support for random writes , which HDFS does not • HBase performs incremental writes as needed, rather than performing immediate writes • HBase reads smaller blocks of data (regions) than HDFS blocks • HBase operations are typically lower latency (faster) than the HDFS equivalents


<!-- Page 24 -->

# UofGWorldChangers @ UofGlasgow Course Coordinator Dr. Richard McCreadie Email: richard.mccreadie@glasgow.ac.uk Room: SAWB 304