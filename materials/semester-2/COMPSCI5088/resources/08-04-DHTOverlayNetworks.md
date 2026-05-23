# 08-04-DHTOverlayNetworks

<!-- Page 1 -->

W8 - 04: DHT Overlay Networks COMPSCI4064 (H) and COMPSCI5088 (M) Dr. Richard McCreadie


<!-- Page 2 -->

Where are we? Types of Big Data Hardware Primer Service Needs Horizontal vs. Vertical Scaling Parallel Compute Distributed Storage MapReduce HDFS Cluster Topologies Work Distribution Challenges Hadoop YARN Spark Hadoop Execution DAGs Transformations and Actions LSM Bloom Filters BigTable / Hbase Chubby and ZooKeeper Cassandra Flink Containers Ethics Laws Extra Concepts Hadoop Issues Spark Architecture Pros and Cons Streaming Persistent Storage Primer NFS HDFS Reads and Writes HDFS Extras CAP and BASE DHT Overlay Networks


<!-- Page 3 -->

The Problem with Masters • Multiple times in these lectures I have pointed out where we have ‘master’ services and how these can be a single point of failure • Hadoop Job Tracker, Spark Master, NFS Server, HDFS Name Node, HBase HMaster • As it turns out, if we are clever, we can build systems that don’t rely on a master service, there are just some additional costs involved • These are known as Peer - to - Peer services


<!-- Page 4 -->

Some Context with BitTorrent • Probably the peer - to - peer data storage system you are most familiar with is BitTorrent • Allows users to share files across a network • Developed in 2001 by Bram Cohen from the University at Buffalo • Core ideas • Break a large file into smaller pieces in a consistent way • When a peer wants a file, download many pieces simultaneously from other peers that currently hold the file • Coordinate who has what file via tracker servers • A downloader requests a list of available peers with pieces of a file in the form of a torrent file • The downloader reports their download state to tracker servers periodically • The original version of BitTorrent still has a point of failure, which is the tracker servers


<!-- Page 5 -->

Reminder: What is an Index • In a data storage system an index is simply a mapping between a filename (or other storage structure identifier like an HBase Region ID) and where the actual data for that object is stored (usually multiple locations for redundancy). • Example: In the HDFS, a <File P ath,blockID > pair is mapped to one or more data nodes that holds that block • Example: In BitTorrent, a tracker file maps a hash for a piece of a file to one or more IP addresses of machines that (at some point) stored that file piece • (an index may contain more than this, but this is the minimum we need to know) Key Value /my/file/photo.png 21.241.21.11, 73.123.21.34 /my/file/readme.md 21.241.21.11, 73.123.21.34 /conf/setup.txt 9.4.52.123 /videos/movie.mp4 100.231.45.128, 198.186.34.1


<!-- Page 6 -->

Hash - Based Peer Assignment • Centralized tracker servers turned out to be an issue, but we need a way to find out who has what files • Let's distribute the file index amongst the peers as well! • We want the information about a single file to be stored on a few (but not all) peers for redundancy • Core Idea: Don’t store the file metadata ( e.g. its name) directly, instead use a hash


<!-- Page 7 -->

Hashing (You have seen this before) • The process of transforming any given key or a string of characters into another (usually shorter) value . • A Hash function takes as input a key/string and outputs a number or bit array representing that key/string • A hashing function will have a hash space, which defines the max - min values that can be output or the size of the bit array respectively • Given a input A the hash function will always give out value B • Multiple different inputs can result in the same output “Big Data Course” Hash Function 36 Hash Space: 0 - 99


<!-- Page 8 -->

Hash - Based Peer Assignment • Centralized tracker servers turned out to be an issue, but we need a way to find out who has what files • So lets distribute the file index amongst the peers as well… • We want the information about a single file to be stored on a few (but not all) peers for redundancy • Core Idea: Don’t store the file metadata ( e.g. its name) directly, instead use a hash • We can use the hash value to decide what peers will store the data about the file “ MyFile ” Hash Function 36 Hash Space: 0 - 99 Peer(s) 36 will hold the locations of ‘ MyFile ’ If there is no Peer 36, use the Peer with the next highest ID, e.g. 38


<!-- Page 9 -->

Hash - Based Peer Assignment • Centralized tracker servers turned out to be an issue, but we need a way to find out who has what files • So lets distribute the file index amongst the peers as well… • We want the information about a single file to be stored on a few (but not all) peers for redundancy • Core Idea: Don’t store the file metadata ( e.g. its name) directly, instead use a hash • We can use the hash value to decide what peers will store the data about the file • Use multiple Hash Functions to select multiple peers to hold the file metadata (enabling redundancy)


<!-- Page 10 -->

Peer ID Assignment • When a peer joins the network, we assign it a peerID • This ID must exist in the same hash space as our file keys • N o point having a peer with ID=100 if our files can only be allocated in a range 0 - 99. • Usually, the same hash function is used for both keys and peer identifiers • When a peer joins it requests all the index data associated to its peerID • When a node leaves it passes all its index data to the peer with the next highest ID • This strategy of file assignment to peers based on a hashing function is known as Consistent Hashing • Given the file’s key and the hash function we can always resolve the peer ID that was selected to hold the data about that file P1 P12 P18 P25 P40


<!-- Page 11 -->

Distributed Hash Table • What I have just described also creates what is known as a Distributed Hash Table (DHT) • Different rows in this table are distributed amongst the peer s • Note that we usually don’t hash the file name, but rather a more unique representation of the file ( e.g. an MD5 hash of the contents) peerID (Hash) Key Value 36 /my/file/photo.png 21.241.21.11, 73.123.21.34 36 /my/file/readme.md 21.241.21.11, 73.123.21.34 12 /conf/setup.txt 9.4.52.123 40 /videos/movie.mp4 100.231.45.128, 198.186.34.1 Key /my/file/photo.png /my/file/readme.md /conf/setup.txt /videos/movie.mp4 Hash Function Distributed Hash Table


<!-- Page 12 -->

Overlay Network • Ok, so this hash table provides a mapping between a file and a peer’s ID • But how does a node get from a peer’s ID and its IP address? • To solve this, we introduce the idea of an overlay network • This is simply the idea of having an additional protocol (set of rules) that allows us to find peers in the network • What is the minimum information that a peer would need to know to translate from a peer’s ID and its IP address?


<!-- Page 13 -->

Simple Distributed Hash Table • In the simplest overlay design, each peer would only need to know the peerID and IP address of the node with the next highest ID (its successor ) • We can pass a request around the network until we find the target peer • For instance, if peer 1 wanted to get information from peer 25 it would • Ask peer 12 P1 P12 P18 P25 P40 peerID IP Address 12 63.213.87.12 peerID IP Address 18 54.200.100.32 peerID IP Address 25 12.34.102.104 peerID IP Address 40 87.40.218.36 peerID IP Address 1 59.133.90.78 peerID Key Value 25 /my/file/p hoto.png 21.241.21.11, 73.123.21.34 25 /my/file/r eadme.md 21.241.21.11, 73.123.21.34


<!-- Page 14 -->

Simple Distributed Hash Table • In the simplest overlay design, each peer would only need to know the peerID and IP address of the node with the next highest ID (its successor ) • We can pass a request around the network until we find the target peer • For instance, if peer 1 wanted to get information from peer 25 it would • Ask peer 12 • Which would ask Peer 18 P1 P12 P18 P25 P40 peerID IP Address 12 63.213.87.12 peerID IP Address 18 54.200.100.32 peerID IP Address 25 12.34.102.104 peerID IP Address 40 87.40.218.36 peerID IP Address 1 59.133.90.78 peerID Key Value 25 /my/file/p hoto.png 21.241.21.11, 73.123.21.34 25 /my/file/r eadme.md 21.241.21.11, 73.123.21.34


<!-- Page 15 -->

Simple Distributed Hash Table • In the simplest overlay design, each peer would only need to know the peerID and IP address of the node with the next highest ID (its successor ) • We can pass a request around the network until we find the target peer • For instance, if peer 1 wanted to get information from peer 25 it would • Ask peer 12 • Which would ask Peer 18 • Which would ask Peer 2 5 P1 P12 P18 P25 P40 peerID IP Address 12 63.213.87.12 peerID IP Address 18 54.200.100.32 peerID IP Address 25 12.34.102.104 peerID IP Address 40 87.40.218.36 peerID IP Address 1 59.133.90.78 peerID Key Value 25 /my/file/p hoto.png 21.241.21.11, 73.123.21.34 25 /my/file/r eadme.md 21.241.21.11, 73.123.21.34


<!-- Page 16 -->

Simple Distributed Hash Table • In the simplest overlay design, each peer would only need to know the peerID and IP address of the node with the next highest ID (its successor ) • We can pass a request around the network until we find the target peer • For instance, if peer 1 wanted to get information from peer 25 it would • Ask peer 12 • Which would ask Peer 18 • Which would ask Peer 25 • Which would return the data to Peer 1 P1 P12 P18 P25 P40 peerID IP Address 12 63.213.87.12 peerID IP Address 18 54.200.100.32 peerID IP Address 25 12.34.102.104 peerID IP Address 40 87.40.218.36 peerID IP Address 1 59.133.90.78 peerID Key Value 25 /my/file/p hoto.png 21.241.21.11, 73.123.21.34 25 /my/file/r eadme.md 21.241.21.11, 73.123.21.34


<!-- Page 17 -->

Finger Tables • This is obviously very slow (O(n) hops)… how can we make this faster ? • Instead of only storing information about the successor, instead store information about m (= logN ) other peers • The i th row of the finger table of peer n points to the node responsible for ID • The first row points to the successor of n • Finger entries can point forwards and/or backwards (predecessors)


<!-- Page 18 -->

Finger Tables • In an N - peer network, w ith high probability, the number of hops taken (nodes visited) during lookup() is: • Intuition: • With m - bit IDs, the maximum distance that will be travelled is 2 𝑚 • At each step the search distance is halved • This is achieved without global knowledge, i.e. each node only has 𝑙𝑜𝑔 2 N entries in its finger table


<!-- Page 19 -->

DHT Overlay Networks • Allows us to build an index without a master and have no global knowledge on: • Which nodes are in the cluster • Which data items are stored in the cluster • What is the load of each node • Which are failed or non - responsive nodes • The rows of the index are distributed amongst the peers in the network • Peers in the network are assigned identifiers via a hash function ( e.g. taking their IP address and port number as input) • Assignment of index rows to peers is done via Consistent Hashing • Hash the key for each index entry to pick a peer to store the row • Multiple hash functions can be used to select multiple peer s


<!-- Page 20 -->

# UofGWorldChangers @ UofGlasgow Course Coordinator Dr. Richard McCreadie Email: richard.mccreadie@glasgow.ac.uk Room: SAWB 304