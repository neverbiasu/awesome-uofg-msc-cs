# 04-01-SparkArchitectuire

<!-- Page 1 -->

W3 - 06: Spark Architecture COMPSCI4064 (H) and COMPSCI5088 (M) Dr. Richard McCreadie


<!-- Page 2 -->

Where are we? Types of Big Data Hardware Primer Service Needs Horizontal vs. Vertical Scaling Parallel Data Parallel Compute Network File Systems MapReduce HDFS Cluster Topologies Work Distribution Challenges Hadoop YARN Spark Hadoop Execution DAGs Transformations and Actions LSM Bloom Filter BigTable / Hbase ZooKeeper Chubby Cassandra Flink Containers Ethics Laws Extra Concepts Hadoop Issues Spark Architecture


<!-- Page 3 -->

• Hadoop Compute • Client : Software that the user uses to submit work to the Hadoop cluster, communicates with the Job Tracker • Job Tracker : Receives work from the client, uses the Name Node to identify where data is located, assigns work to task trackers • Task Tracker : Executes Map and Reduce tasks • Hadoop HDFS • Name Node : Tracks the location of all data held on the HDFS, handles replication • Data Node : Handles storage and access of the local files on the machine Recall the Hadoop Architecture… Machine 1 Job Tracker Assigns Tasks to.. Persistent Storage (HDFS) Task Tracker Slot 1 Slot 2 Machine 2 Machine 3 Task Tracker Slot 1 Slot 2 Task Tracker Slot 1 Compute Name Node Data Node Data Node Data Node Assigns Data to.. Client


<!-- Page 4 -->

• Spark Compute • Client : Software that the user uses to submit work to the Spark cluster, communicates with the Spark Master • Driver : The program that executes the Spark Job, may run on the Client or on a node in the cluster • Spark Master : Receives work from the client, analyses the DAG assigns work to task trackers, communicates with the Driver • Spark Worker : Manages the local execution of Transformations and Actions • Executor : A JVM that executes tasks using a ThreadPool • Responsible for executing application code for a specific task/stage, caching datasets/results Spark Architecture Machine 1 Assigns Tasks to.. Spark Worker Executor Machine 2 Machine 3 Spark Worker Executor Compute Driver Client Executor Executor Spark Master Cluster Manager DAG Scheduler Task Scheduler


<!-- Page 5 -->

Important Differences • No defined persistent storage layer • Spark may use temporary storage if RAM is exhausted • Application code defines how data is loaded • The Driver program must remain alive until the Spark Job finishes (since it will be the subject of the final Action) • The Driver does not need to be run on the Client • Each Job gets its own Executer on the Workers (to avoid Jobs sharing memory), an Executer can run multiple tasks in parallel • Much faster to get a job going than in Hadoop


<!-- Page 6 -->

1. Client instantiates a SparkContext object (SC) • Responsible for I/O with the user, cluster manager service, and executors • Initialises the Driver , which registers the application with the Cluster Manager and gets a list of Executors • The Driver then is responsible for the Spark job 2. Client uses SC to create input RDDs • Partitioned/parallelised across cluster nodes 3. Client uses Transformations on the input/intermediate RDDs • Sequence of transformations creates a DAG of ops • Lazy evaluation ➔ No computation takes place so far on the cluster 4. Client uses an Action to print/store results 5. Action triggers submission of ops DAG to the DAGScheduler within the Driver 6. The DAGScheduler builds stages of tasks • Defines what will be executed where • Implemented as an event queue • Groups together tasks based on their dependencies • Submits the execution plan to the TaskScheduler within the Driver • Resubmits failed stages, if their output was lost 7. The TaskScheduler : • Ships tasks to Executors (serialised RDD lineage + transformations) • Monitors the execution/progress of their computation • Launches tasks on Executors, according to resource and locality constraints • Decides where to run each task • Deals with stragglers (speculative execution) • Returns the result to the DAGScheduler (as a series of events) Spark Execution Phases


<!-- Page 7 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 1 Run Spark Program Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM


<!-- Page 8 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 2 Create Spark Context Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM


<!-- Page 9 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 3 Init Spark Driver Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM


<!-- Page 10 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 4 Request Resources Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM


<!-- Page 11 -->

Job execution anatomy Machine 1 Spark Worker Machine 2 Machine 3 Spark Worker Client Machine 5 Setup Executers Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM JVM JVM Memory Memory Memory NFS Mount Spark Context Spark Driver JVM Spark Master Cluster Manager


<!-- Page 12 -->

Job execution anatomy Machine 1 Spark Worker Machine 2 Machine 3 Spark Worker Client Machine 6 Launch Executers Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM JVM JVM Memory Memory Memory NFS Mount Spark Context Spark Driver JVM Spark Master Cluster Manager Executor JVM Executor JVM


<!-- Page 13 -->

Job execution anatomy Machine 1 Spark Worker Machine 2 Machine 3 Spark Worker Client Machine 7 Executers Report Ready Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM JVM JVM Memory Memory Memory NFS Mount Spark Context Spark Driver JVM Spark Master Cluster Manager Executor JVM Executor JVM


<!-- Page 14 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 8 Create Input RDDs (objects with partitions created via a data scan) Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver RDD Partition 1 Partition 2 JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Executor JVM Executor JVM


<!-- Page 15 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 9 Execute Transformations in lazy mode, Incrementally building the DAG Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver RDD Partition 1 Partition 2 DAG JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Executor JVM Executor JVM


<!-- Page 16 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 10 When an action is reached, Send the DAG to the DAGScheduler Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver RDD Partition 1 Partition 2 DAG DAG Scheduler JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Executor JVM Executor JVM


<!-- Page 17 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 11 DAGScheduler creates the Execution plan (Tasks and Stages) Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver RDD Partition 1 Partition 2 DAG DAG Scheduler JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Executor JVM Executor JVM


<!-- Page 18 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 12 Submit the first Stage to the Task Scheduler Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver RDD Partition 1 Partition 2 DAG DAG Scheduler JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Executor JVM Executor JVM Task Scheduler Stage 1


<!-- Page 19 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 13 Launch Stage 1 Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver RDD Partition 1 Partition 2 DAG DAG Scheduler JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Executor JVM Executor JVM Task Scheduler Stage 1 Read flatMap Read flatMap


<!-- Page 20 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 14 Execute Tasks Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver RDD 1 Partition 1 Partition 2 DAG DAG Scheduler JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Executor JVM Executor JVM Task Scheduler Stage 1 Read flatMap Read flatMap RDD 1 Partition 1 RDD 1 Partition 2


<!-- Page 21 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 15 Execute Tasks Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver RDD 1 Partition 1 Partition 2 DAG DAG Scheduler JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Executor JVM Executor JVM Task Scheduler Stage 1 Read flatMap Read flatMap RDD 1 Partition 1 RDD 1 Partition 2 RDD 2 Partition 1 RDD 2 Partition 2


<!-- Page 22 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 1 6 Report Tasks Complete (heartbeats) Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver RDD 1 Partition 1 Partition 2 DAG DAG Scheduler JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Executor JVM Executor JVM Task Scheduler Stage 1 RDD 1 Partition 1 RDD 1 Partition 2 RDD 2 Partition 1 RDD 2 Partition 2


<!-- Page 23 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 17 Launch Stage 2 Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver RDD Partition 1 Partition 2 DAG DAG Scheduler JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Executor JVM Executor JVM Task Scheduler Stage 2 RDD 1 Partition 1 RDD 1 Partition 2 RDD 2 Partition 1 RDD 2 Partition 2 Collect Collect


<!-- Page 24 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 18 Copy output to Driver (network) Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver DAG DAG Scheduler JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Executor JVM Executor JVM Task Scheduler Stage 2 RDD 1 Partition 1 RDD 1 Partition 2 RDD 2 Partition 1 RDD 2 Partition 2 RDD 2 Partition 1 Partition 2 Collect Collect


<!-- Page 25 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 1 9 Report Tasks Complete (heartbeats) Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver DAG Scheduler JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Executor JVM Executor JVM Task Scheduler Stage 2 RDD 1 Partition 1 RDD 1 Partition 2 RDD 2 Partition 1 RDD 2 Partition 2 DAG RDD 2 Partition 1 Partition 2


<!-- Page 26 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 20 DAGScheduler Marks Job Complete Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver DAG Scheduler JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Executor JVM Executor JVM Task Scheduler RDD 1 Partition 1 RDD 1 Partition 2 RDD 2 Partition 1 RDD 2 Partition 2 DAG RDD 2 Partition 1 Partition 2


<!-- Page 27 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 21 Kill messages get sent to the Executors Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver DAG Scheduler JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Executor JVM Executor JVM Task Scheduler RDD 1 Partition 1 RDD 1 Partition 2 RDD 2 Partition 1 RDD 2 Partition 2 DAG RDD 2 Partition 1 Partition 2


<!-- Page 28 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 22 Executors Shut Down (memory of those executors is also released) Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount Spark Context Spark Driver DAG Scheduler JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM Task Scheduler DAG RDD 2 Partition 1 Partition 2


<!-- Page 29 -->

Job execution anatomy Machine 1 Machine 2 Machine 3 Client Machine 23 Job completes (execute method returns in the main program) Compute Memory S torage File Server Compute S torage NFS Server Input Files Spark Program JVM Memory Memory Memory NFS Mount JVM Spark Master Cluster Manager Spark Worker Spark Worker JVM JVM RDD 2 Partition 1 Partition 2


<!-- Page 30 -->

# UofGWorldChangers @ UofGlasgow Course Coordinator Dr. Richard McCreadie Email: richard.mccreadie@glasgow.ac.uk Room: SAWB 304