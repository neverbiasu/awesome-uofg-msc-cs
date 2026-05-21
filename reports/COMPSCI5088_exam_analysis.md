# COMPSCI5088 Big Data: Systems, Programming, and Management 历年卷分析报告

## 1. 考点分布与频率分析 (2021-2024)

基于对 2021, 2023, 2024 三年试卷的分析，核心考点分布如下：

| 模块 | 核心考点 | 出现频率 | 常见题型 |
| :--- | :--- | :--- | :--- |
| **大数据基础** | Big Data Dimensions (5Vs), Distributed vs Mainframe, Ethical/Legal | 高 | 场景判断, 优缺点对比, 论述题 |
| **HDFS** | NameNode Architecture, Checkpointing, Replication Factor, HDFS vs NFS | 高 | 原理分析, 参数调优影响, 方案对比 |
| **MapReduce** | Map/Reduce Lifecycle, Custom Writable/InputFormat, Overhead (I/O) | 高 | 算法设计, 性能瓶颈分析 |
| **Spark** | RDD Transformers/Actions, Memory Management, Iterative Workloads, Accumulators | 极高 | DAG图分析, 算子选择, 性能对比 |
| **HBase** | LSM Trees (MemStore/HFile), Read Path, Low-latency Random Read | 中 | 原理机制说明, 存储结构分析 |
| **Cassandra** | Consistent/Order-preserving Hashing, Quorum (R+W>N), Linearizability | 极高 | 协议改进, 一致性模型分析, 散列机制 |
| **集群与管理** | YARN (Resource Management, Containers), Kubernetes, Streaming vs Batch | 中 | 概念对比, 架构演进分析 |

---

## 2. 核心题型做题 SOP

### SOP A：大数据场景判断题 (如：这是否是大数据问题？为什么？)
1.  **Step 1: 定位 5Vs。** 扫描材料中的关键词：
    *   **Volume:** 数据量 (TB, PB, 卫星图像大小)。
    *   **Velocity:** 产生速度 (每秒发送, 实时流)。
    *   **Variety:** 数据类型 (文本, 视频, 音频, 传感器数据)。
    *   **Veracity:** 数据质量 (传感器误差, 视频丢失)。
    *   **Value:** 业务价值。
2.  **Step 2: 给出结论。** 明确回答 "Yes" 或 "No"。
3.  **Step 3: 结合场景解释。** 每个维度至少给出一个具体例子（如 "The camera streams 2MB/min, resulting in large volume over time"）。

### SOP B：系统方案对比题 (如：Spark vs Hadoop, HDFS vs NFS)
1.  **Step 1: 确定比较维度。** 通常从：Latency (延迟), Throughput (吞吐量), Scalability (扩展性), Fault Tolerance (容错性) 四个角度切入。
2.  **Step 2: 阐述 A 的特点。** (如 Spark: In-memory, DAG, lazy evaluation)。
3.  **Step 3: 阐述 B 的局限。** (如 Hadoop: Disk I/O bound, serialization overhead)。
4.  **Step 4: 总结适用场景。** (如 Iterative ML tasks -> Spark; Batch archiving -> Hadoop)。

### SOP C：MapReduce/Spark 程序设计题
1.  **Step 1: 划分阶段。** 
    *   MapReduce: Input -> Map -> (Shuffle/Sort) -> Reduce -> Output。
    *   Spark: Transformation 1 -> Transformation 2 -> ... -> Action。
2.  **Step 2: 定义 Key-Value 对。** 明确每一阶段的输入 Key/Value 和输出 Key/Value 是什么。
3.  **Step 3: 选择算子。** 
    *   Spark 常用: `map`, `filter`, `reduceByKey` (优于 `groupByKey`), `join`, `collect`。
4.  **Step 4: 说明理由。** 为什么这个算子适合这个业务逻辑 (如 `reduceByKey` 可以在 Map 端先做 combine，减少网络传输)。

### SOP D：NoSQL 一致性与分布式原理题 (Cassandra/HBase)
1.  **Step 1: 画出流程/结构。** (如 HBase 的写入流程：WAL -> MemStore -> Flush to HFile)。
2.  **Step 2: 应用公式 (若适用)。** 对于 Cassandra 一致性，检查 $R + W > N$。
3.  **Step 3: 识别异常路径。** (如 Linearizability 失败场景，分析读写重叠时的时序)。
4.  **Step 4: 提出改进策略。** (如 增加写前确认, 调整 Consistency Level)。

---

## 3. 典型陷阱与注意事项
*   **HDFS Checkpoint:** 记住 Checkpoint 不存 block 物理位置，位置是在启动时由 DataNode 向 NameNode 汇报生成的。
*   **Spark Accumulators:** 只能在 Action 中安全更新，在 Transformation 中由于算子的 Lazy Evaluation 和重试机制可能导致多次更新。
*   **HBase vs MapReduce:** 考察 LSM Tree 和 Mapper Output 的相似性 (都是先在内存排序，然后溢出到磁盘)。
*   **YARN Containers:** 注意它和 Docker/K8s 容器的区别 (YARN Container 主要是资源配额的逻辑抽象，而非完全的隔离环境)。
