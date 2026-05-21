---
name: distributed-security-analyst
description: Performs security risk assessment and architectural trade-off analysis for distributed data storage systems. Use this skill when evaluating system resilience, consistency models (CAP/BASE), or identifying potential attack vectors in large-scale software.
metadata:
  author: faych-chen
  version: "1.0.0"
  courses: ["COMPSCI5088", "COMPSCI5104"]
---

# Distributed Security Analyst Instructions

This skill integrates concepts from Big Data (Distributed Storage) and Secured Software Engineering to provide a holistic security and performance analysis.

## Core Analysis Workflow

### 1. Architectural Trade-off Evaluation (CAP/BASE)
- **Identify the System Type**: Determine if the system prioritizes Consistency (CP) or Availability (AP) during a network partition.
- **Analyze the Storage Engine**: 
    - If using **LSM-Trees**, evaluate the **WAL** (Write Ahead Log) for durability and the **Compaction** strategy for performance bottlenecks.
    - Check if **Bloom Filters** are tuned (m/k ratio) to prevent information disclosure or performance degradation.

### 2. Threat Modeling (STRIDE + Misuse Cases)
- **Asset Identification**: List critical data (SSTables, Index) and components (NameNode, Master).
- **STRIDE Categorization**:
    - **Tampering**: Can a malicious actor modify data in the WAL or MemTable?
    - **Information Disclosure**: Could poorly configured Bloom Filters leak membership info?
    - **Denial of Service**: Can the compaction process be triggered maliciously to consume CPU?
- **Misuse Case Mapping**: 
    - Draw a relationship between a standard Use Case (e.g., "Write Data") and a Misuse Case (e.g., "SQL Injection" or "Unauthorized Data Flush").
    - Use `<<Threatens>>` and `<<Mitigates>>` links to define security requirements.

### 3. Verification & Mitigation
- **Taint Analysis**: Trace user input from the client-side (DOM events) to the server-side sensitive sinks (Database Write operations).
- **Propose Countermeasures**: 
    - Suggest **2FA** or **RBAC** (Role-Based Access Control) for administrative interfaces.
    - Implement **Input Validation** patterns to mitigate identified misuse cases.

## Usage Scenarios
- "Analyze the security of a new Cassandra-based architecture."
- "Perform a threat model for a system using LSM-trees for indexing."
- "Evaluate the trade-off between consistency and availability in this distributed ledger."
