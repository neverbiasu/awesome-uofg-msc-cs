# 05-01-PersistantStoragePrimer

<!-- Page 1 -->

W5 - 01: Persistent Storage Primer COMPSCI4064 (H) and COMPSCI5088 (M) Dr. Richard McCreadie


<!-- Page 2 -->

Where Are We? Types of Big Data Hardware Primer Service Needs Horizontal vs. Vertical Scaling Parallel Compute Distributed Storage MapReduce HDFS Resource Management Work Distribution Challenges Hadoop Cluster Management Platforms Spark Hadoop Execution DAGs Transformations and Actions LSM Bloom Filters BigTable / Hbase Chubby and ZooKeeper Cassandra Ethics Laws Extra Concepts Hadoop Issues Spark Architecture Pros and Cons Streaming Persistent Storage Primer NFS HDFS Reads and Writes HDFS Extras CAP and BASE DHT Overlay Networks Software Sandboxes


<!-- Page 3 -->

A Quick Aside on Motherboard Connections • Within a traditional computer, the various storage media are connected to the CPU via connections referred to as a ‘ bus ’ • The closer we get to the CPU the faster the connection will be • Main Memory and PCIe are the closest connections to the CPU • Ethernet (network), SATA and USB are more distant


<!-- Page 4 -->

Host Interfaces • The storage connection is known as the host interface • Wide range of interfaces available • Serial attached SCSI (SAS - 3, 12.0 Gbit/s ) – generally found on servers • Serial ATA and mSATA variant ( SATA 3.0 , 6.0 Gbit/s ) • PCI Express 3 ( PCIe 3.0 × 4, 31.5 Gbit/s ) • PCI Express 4 ( PCIe 4.0 × 4, 63 Gbit/s ) • Fibre Channel ( 128 Gbit/s ) – almost exclusively found on servers • USB ( 10 Gbit/s ) • Even if the underlying storage medium is faster, it can be bottlenecked by the host interface • This is why M.2 SSDs are usually connected to the PCI Express bus.


<!-- Page 5 -->

Hard Disk Drive • Idea: Store data on rigid platters coated with magnetic material • Rapidly rotate the platter to get to the right data (e.g. 7,200 RPM) • Lasts for ~4 - 6 years • Characteristics • Slow for Random Reads • Medium Speed for Block reads • Slow for Writes • Cheap • Uses a small amount of DRAM as a volatile cache, backed with a battery to reduce latency • Connects via SATA


<!-- Page 6 -->

Solid State Drives • Idea: Store data in semiconductor cells • Need to receive power periodically (once per 1 - 2 years) or experience data loss • Not a new idea, conceived in 1978 • Reached military use around 1995 • Wide spread consumer use in the 2010’s • Have much faster random read speeds than HDDs • Also uses a small amount of DRAM as a volatile cache, backed with a battery • Connects via SATA or PCIe


<!-- Page 7 -->

Hybrids • There are also some drives on the market that are a hybrid of both HDDs and SSDs • This is a cost - cutting measure, which is popular in some laptop lines • They have the advantages of SSD’s up - to a point • Write can be cached in the SSD part then spooled to the HDD later • Popular read data can be held on the SSD • Not generally good for intensive tasks like big data though


<!-- Page 8 -->

Redundant Array of Independent Disks (RAID) • Because individual HDD and SSDs are prone to failure, we often use a dedicated solution to group multiple co - located disks together called RAID • Makes multiple disks appear as one disk • Both hardware or software options • Hardware : On - chip RAID controllers • Software : ZFS, XFS or built - in RAID support at OS level


<!-- Page 9 -->

Striping, Mirroring and Parity • Data Striping is the technique of segmenting logically sequential data, such as a file, so that consecutive segments are stored on different physical storage devices. • This means that large reads can be spread over multiple drives • Disk Mirroring is the replication of logical disk volumes onto separate physical hard disks in real time to ensure continuous availability. • Parity data is used by RAID arrays to achieve redundancy. • If a drive in the array fails, remaining data on the other drives can be combined with the parity data (using the Boolean XOR function) to reconstruct the missing data.


<!-- Page 10 -->

RAID Levels • There are different variants of RAID, that make different trade - offs between reliability , availability , performance , and capacity • RAID 0 consists of striping, but no mirroring or parity. • RAID 1 consists of data mirroring, without parity or striping. • RAID 2 consists of bit - level striping with dedicated Hamming - code parity. • RAID 3 consists of byte - level striping with dedicated parity. • RAID 4 consists of block - level striping with dedicated parity. • RAID 5 consists of block - level striping with distributed parity. • RAID 6 consists of block - level striping with double distributed parity. • Most storage systems will use either RAID 5 or 6, such that one disk failure will not cause data loss


<!-- Page 11 -->

# UofGWorldChangers @ UofGlasgow Course Coordinator Dr. Richard McCreadie Email: richard.mccreadie@glasgow.ac.uk Room: SAWB 304