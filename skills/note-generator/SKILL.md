# Note Generation Expert Skill

Professional guidance for generating high-quality, bilingual (EN/ZH) academic notes for the UofG MSc CS project.

## Core Mandates

### 1. File Structure & Naming
- **Path**: `notes/{lang}/{semester}/{course}/week<N>/`
- **Filenames**: Always use English, topic-based names (e.g., `spark-architecture.mdx`).
- **Consolidation**: Each week MUST have **exactly ONE** main topic-based note file. Related topics (e.g., RNNs and Transformers) must be merged into a single comprehensive note to avoid fragmentation.
- **Index**: Every week must have an `index.mdx` following the `week-index-template.mdx`.

### 2. Title & Header Standards
- **Weekly Note Title**: Every main note file MUST have a frontmatter title in the format: `"Week <N>: <Descriptive Title>"` (e.g., `"Week 6: Surveys & Mixed Methods"`).
- **Index Title**: Same format for `index.mdx`.
- **Headings**: Do NOT use numbered headings. Use plain descriptive headings.

### 3. Visual & Component Standards (Fumadocs)
- **Image Relevance**: Images MUST strictly correspond to the text. Use images from the correct week's directory: `/images/{course}/week<N>/`.
- **Component Mapping**:
    - **Warnings/Key Notes**: MUST use `<Callout type="warn">` or `<Callout type="info">`.
    - **Step-by-step Procedures**: MUST use `<Steps>`.
    - **Lists of Definitions/FAQ**: MUST use `<Accordions>`.
    - **Comparisons**: MUST use **Tables**.
- **LaTeX**: Use `$$...$$` for inline and ` ```math ... ``` ` for blocks.

### 4. Review Mechanism
- **Weekly Review**: Every `index.mdx` should include a "Review & Self-Check" section or a link to a dedicated review page.
- **Checkpoint Weeks**: Weeks with no new lectures (e.g., Week 7) must be converted into **Review Weeks**, synthesizing previous content into exam-oriented summaries.

### 5. Content Optimization Workflow
1. **Extraction**: Use `convert-pdf-to-images.mjs` to get visual assets.
2. **Drafting**: Generate the EN version first using the `note-template.mdx`.
3. **Synchronization**: Mirror the structure exactly in the ZH version (`.zh.mdx` is deprecated, use the `/zh/` directory instead).
4. **Final Polish**: Verify LaTeX rendering and ensure all image paths are correct.

### 6. 深度分析：出卷人视角 (Examiner's Perspective)
- **Hard Red Lines (官方判分红线)**：在整理法律或伦理笔记时，必须提取具体的 GDPR 原则（如 Purpose Limitation, Storage Limitation），并映射到物理存储逻辑，严禁使用通用伦理白话。
- **Technical Nuances (技术权衡)**：在整理系统笔记时，必须提取具体的参数影响（如 Replication Factor 对吞吐量 vs 延迟的对立影响）和底层机制（如 Checkpoint 为何不存 block 位置）。
- **Failure Analysis (故障分析)**：显式记录系统在特定故障（如 NameNode 宕机, Quorum 失败）下的行为和恢复流程。

---
Created: 2026-05-17
