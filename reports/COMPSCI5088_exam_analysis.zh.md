# COMPSCI5088 大数据：系统、编程与管理 (Big Data: Systems, Programming, and Management) 历年卷分析报告

## 1. 考点分布与频率分析 (2021-2024)

基于对 2021, 2023, 2024 三年试卷的分析，核心考点分布如下：

| 模块 | 核心考点 | 出现频率 | 常见题型 |
| :--- | :--- | :--- | :--- |
| **大数据基础** | 大数据维度 (5Vs), 分布式 vs 大型机, 法律与伦理 | 高 | 场景判断, 优缺点对比, 论述题 |
| **HDFS** | NameNode 架构, 检查点 (Checkpointing), 副本系数 (Replication), HDFS vs NFS | 高 | 原理分析, 参数调优影响, 方案对比 |
| **MapReduce** | Map/Reduce 生命周期, 自定义 Writable/InputFormat, 性能开销 (I/O) | 高 | 算法设计, 性能瓶颈分析 |
| **Spark** | RDD 转换 (Transformers)/行动 (Actions), 内存管理, 迭代工作负载, 累加器 (Accumulators) | 极高 | DAG 图分析, 算子选择, 性能对比 |
| **HBase** | LSM Trees (MemStore/HFile), 读取路径, 低延迟随机读 | 中 | 原理机制说明, 存储结构分析 |
| **Cassandra** | 一致性哈希/顺序保持哈希, 法定人数 (Quorum, R+W>N), 线性化 (Linearizability) | 极高 | 协议改进, 一致性模型分析, 散列机制 |
| **集群与管理** | YARN (资源管理, 容器), Kubernetes, 流处理 vs 批处理 | 中 | 概念对比, 架构演进分析 |

---

## 2. 核心题型做题 SOP (标准作业程序)

### SOP A：大数据场景判断题 (例如：这是否是大数据问题？为什么？)
1.  **第一步：定位 5Vs。** 扫描材料中的关键词：
    *   **Volume (体量):** 数据量 (TB, PB, 卫星图像大小)。
    *   **Velocity (速度):** 产生速度 (每秒发送, 实时流)。
    *   **Variety (多样性):** 数据类型 (文本, 视频, 音频, 传感器数据)。
    *   **Veracity (真实性):** 数据质量 (传感器误差, 视频丢失)。
    *   **Value (价值):** 业务价值。
2.  **第二步：给出结论。** 明确回答 "是" 或 "否"。
3.  **第三步：结合场景解释。** 每个维度至少给出一个具体例子（例如：“摄像头每分钟传输 2MB，随着时间推移会产生巨大的数据量”）。

### SOP B：系统方案对比题 (例如：Spark vs Hadoop, HDFS vs NFS)
1.  **第一步：确定比较维度。** 通常从：延迟 (Latency), 吞吐量 (Throughput), 可扩展性 (Scalability), 容错性 (Fault Tolerance) 四个角度切入。
2.  **第二步：阐述 A 的特点。** (例如 Spark：内存计算, DAG, 惰性求值)。
3.  **第三步：阐述 B 的局限。** (例如 Hadoop：受限于磁盘 I/O, 序列化开销大)。
4.  **第四步：总结适用场景。** (例如 迭代式机器学习任务 -> Spark；批处理归档 -> Hadoop)。

### SOP C：MapReduce/Spark 程序设计题
1.  **第一步：划分阶段。** 
    *   MapReduce: 输入 -> Map -> (Shuffle/Sort) -> Reduce -> 输出。
    *   Spark: 转换 1 -> 转换 2 -> ... -> 行动 (Action)。
2.  **第二步：定义键值对 (Key-Value Pairs)。** 明确每一阶段的输入 Key/Value 和输出 Key/Value 是什么。
3.  **第三步：选择算子。** 
    *   Spark 常用: `map`, `filter`, `reduceByKey` (优于 `groupByKey`), `join`, `collect`。
4.  **第四步：说明理由。** 为什么这个算子适合这个业务逻辑 (例如 `reduceByKey` 可以在 Map 端先做本地合并 combine，减少网络传输)。

### SOP D：NoSQL 一致性与分布式原理题 (Cassandra/HBase)
1.  **第一步：画出流程/结构。** (例如 HBase 的写入流程：WAL -> MemStore -> Flush 到 HFile)。
2.  **第二步：应用公式 (若适用)。** 对于 Cassandra 一致性，检查 $R + W > N$。
3.  **第三步：识别异常路径。** (例如 线性化失败场景，分析读写重叠时的时序问题)。
4.  **第四步：提出改进策略。** (例如 增加写前确认, 调整一致性级别 Consistency Level)。

---

## 4. 深度备考战术：该背什么？怎么写？

为了在考试中拿到高分，你需要将知识点转化为“模板化”的语言。以下是针对各个模块的深度拆解：

### 4.1 大数据基础：5Vs 论述
*   **必背知识点：** 
    *   Volume (数据总量), Velocity (流转速度), Variety (数据多样性), Veracity (质量/不确定性), Value (低密度价值)。
    *   **Mainframe vs. Distributed：** 单机存在性能上限 (Vertical scaling limit)、成本高昂且是单点故障 (SPOF)；分布式支持水平扩展 (Horizontal scaling)、使用廉价商业机器 (Commodity hardware) 且具有容错性。
*   **考试套路：**
    *   遇到“为什么这是大数据问题”：**必须引用题目中的数字**。
    *   *错误写法：* “它的数据量很大。”
    *   *满分写法：* “Volume: 每个图像 10MB，100 个卫星每秒发送一次，每天产生的数据量达到 XX TB，超出了传统单机处理能力。”

### 4.2 HDFS：底层原理与调优
*   **必背金句：**
    *   **Checkpoint 内存镜像：** NameNode 的 `fsimage` 存储文件元数据，但不存储 block 的物理位置。DataNode 启动时通过 **Block Report** 汇报位置。
    *   **副本系数 (Replication)：** 增加副本会**降低**写入吞吐量（需同步多个节点），但能**提高**读取性能（增加并行度）和可靠性。
*   **考试套路：**
    *   遇到“为什么要设计这种重建机制”：强调 **Decoupling (解耦)**。如果位置存入磁盘，当 DataNode 发生硬件变更时，磁盘上的信息会失效，导致 NameNode 需要频繁更新磁盘，产生巨大 I/O 开销。

### 4.3 MapReduce vs. Spark：架构对比
*   **必背对比点：**
    *   **MapReduce：** 强依赖磁盘 (Disk-bound)，每一步都要溢写磁盘，适合离线批处理。
    *   **Spark：** 内存计算 (In-memory)，DAG 调度，Lazy Evaluation (惰性求值)，支持缓存 (Caching/Persistence)，适合迭代计算和低延迟任务。
*   **考试套路：**
    *   遇到“Spark 为什么比 MR 快”：除了写“内存”，一定要写 **“减少了序列化 (Serialization) 和反序列化开销”** 以及 **“避免了频繁的中间磁盘 I/O”**。

### 4.4 Spark 编程：算子与任务划分
*   **必背知识点：**
    *   **Narrow Dependency (窄依赖)：** map, filter, union (不需要 Shuffle)。
    *   **Wide Dependency (宽依赖)：** groupByKey, reduceByKey, join (触发 Shuffle，划分 Stage 的依据)。
    *   **Accumulator (累加器)：** 只有在 Action 中是可靠的。在 Transformation 中，若 Task 失败重试，累加器可能会被重复计算。
*   **考试套路：**
    *   遇到“划分 Job”：找 **Action 算子**（如 `collect`, `saveAsTextFile`, `count`）。
    *   遇到“划分 Stage”：看有没有 **Shuffle 算子**。

### 4.5 NoSQL (HBase/Cassandra)：性能与一致性
*   **必背原理：**
    *   **LSM Tree (HBase)：** 将随机写变为顺序写。
    *   **Consistent Hashing (一致性哈希)：** 解决节点增删时的数据大规模迁移问题。
    *   **Order-Preserving Hashing：** 允许范围查询 (Range scan)，但容易导致数据倾斜 (Hotspots)。
    *   **Quorum 模型：** $R + W > N$ 保证强一致性（能读到最新写的值）。
*   **考试套路：**
    *   遇到“如何保证线性化 (Linearizability)”：如果 Quorum 失败（如题目中 Reader A 读到新值，Reader B 读到旧值），建议采用 **“写入前读取 (Read-before-write)”** 或 **“两阶段写入 (Two-phase write)”**，即先确认大多数副本都准备好了再提交。

### 4.6 法律与伦理 (Legal & Ethical) —— 官方满分踩点版
*   **必背关键词与法理逻辑：**
    1.  **Purpose Limitation (目的限制原则)**：数据最初是为了 A 目的（如物流报告）收集，用于 B 目的（如 AI 训练）属于目的变更，必须获得**明确的告知同意 (Explicit Informed Consent)**。
    2.  **Third-Party PII (第三方个人身份信息)**：针对视频/图像数据，记录仪会摄录公共空间中无关第三方的**面部 (Faces)** 和 **车牌 (License Plates)**。这些主体从未授权，构成严重隐私侵犯。
    3.  **Storage Limitation (存储期限限制)**：大数据系统不能无限期保留 PII。一旦原始目的达成，包含隐私的原始视频必须被**物理擦除 (Deleted)** 或 **匿名化 (Anonymized)**，不能为了训练模型而永久留存。

---

## 5. 考试时遇到哪类题怎么做？（速查表）

| 题型 | 第一反应 | 核心关键词 |
| :--- | :--- | :--- |
| **场景分析题** | 找数字、找维度 | 5Vs, Mainframe vs Distributed |
| **存储选择题** | 读写频率、延迟要求 | HDFS (吞吐) vs HBase (延迟) vs Cassandra (可用) |
| **性能优化题** | 找瓶颈 (I/O 或计算) | Shuffle, Data Locality, In-memory, Caching |
| **一致性纠错题** | 画时间轴、查 Quorum | $R+W>N$, Linearizability, Write-ahead Log |
| **法律伦理题** | **GDPR 三大原则** | **Purpose Limitation, Third-party PII, Storage Limitation** |
| **集群扩展题** | 弹性、调度 | YARN, Kubernetes, Resource Quota |

---

## 6. 潜在冷门考点（“突袭题”预防）

虽然近三年大题集中在 Spark 和 Cassandra，但以下知识点在课件中占有独立单元，且可能以小题或架构细节题形式出现：

### 6.1 Bloom Filters (布隆过滤器)
*   **知识点：** 一种空间效率极高的概率型数据结构，用于判断一个元素是否在一个集合中。
*   **核心特性：** 
    *   **可能存在假阳性 (False Positive)**：如果它说“在”，可能不在；如果它说“不在”，则一定不在。
    *   **应用场景：** HBase 在读取 HFile 前先查 Bloom Filter，以避免昂贵的磁盘随机读（如果元素肯定不在该文件中，就不用读了）。
*   **考试套路：** 问“如何减少 HBase 的随机读开销？”，除了缓存，一定要答 Bloom Filter。

### 6.2 Zookeeper
*   **知识点：** 分布式协调服务，用于选主 (Leader Election)、元数据存储和集群配置管理。
*   **角色：** 它是 HBase 的“心脏”，负责监控 Region Server 的存活状态。
*   **考试套路：** 考查分布式系统的“一致性协调”或“单点故障规避”时，Zookeeper 是标准答案组件。

### 6.3 DHT (分布式哈希表) 与 Overlay Networks
*   **知识点：** 节点之间通过逻辑上的环形或网格结构连接，不依赖中心节点。
*   **Cassandra 联系：** Cassandra 使用 DHT 思想实现去中心化，通过 Gossip 协议交换集群状态。
*   **考试套路：** 区分分布式 (Distributed) 和去中心化 (Decentralized) 时，DHT 是实现后者的核心技术。

### 6.4 广播变量 (Broadcast Variables)
*   **知识点：** 将一个只读变量缓存到每个节点，而不是随每个任务传输。
*   **应用场景：** 大表 join 小表（Map-side join）。将小表广播到所有节点，避免大规模 Shuffle。
*   **对比：** 
    *   **累加器**：从 Worker 向 Driver 传回汇总信息 (Write-only for workers)。
    *   **广播变量**：从 Driver 向 Worker 传下大型只读数据 (Read-only for workers)。

---

## 7. 总结：如何确保 100% 覆盖？

1.  **保底分 (80%)**：熟练背诵 **SOP A-D** 涉及的 5Vs, HDFS, MR, Spark, Cassandra, 一致性模型。
2.  **冲刺分 (20%)**：理解 **Bloom Filter, Zookeeper, DHT** 的工作原理及其在现有系统（HBase/Cassandra）中的具体应用。
3.  **实战技巧**：考卷中如果出现你没见过的系统名，**不要慌**。尝试将其归类为“类似 Spark 的内存系统”或“类似 Cassandra 的去中心化存储”，然后应用对应的 SOP 进行分析。
