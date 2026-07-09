# GitHub Copilot Instructions for UofG MSc CS Project

## 项目结构要求

### Materials 目录组织原则
1. 按学期分组：`semester-1/`, `semester-2/`
2. 课程命名：`COMPSCI[代码]-[简化名称]/`
3. 子目录结构：`lectures/`, `resources/`, `datasets/` (如需要)
4. **不包含** `assignments/` 和 `notes/` 目录
5. **每个目录必须包含 `index.md` 索引文件**

### 当前课程列表

| 学期 | 课程代码 | 课程名称 | 目录名称 |
|------|----------|----------|----------|
| 第一学期 | COMPSCI4084 | Programming and Systems Development | `COMPSCI4084-programming-systems/` |
| 第一学期 | COMPSCI5089 | Introduction to Data Science and Systems | `COMPSCI5089-data-science-systems/` |
| 第一学期 | COMPSCI5100 | Machine Learning & Artificial Intelligence for Data Scientists | `COMPSCI5100-ml-ai/` |
| 第一学期 | COMPSCI5092 | Research Professional Skills | `COMPSCI5092-research-professional-skills/` |
| 根目录 | - | MSc (IT+) & MSc (CS+) Handbook | `handbook/` |

### Index.md 文件要求

每个目录的 `index.md` 必须包含以下结构：

1. **概要** - 目录用途说明
2. **目录结构** - 子目录和文件列表
3. **相关链接** - 网页资源和 Moodle 链接
4. **更新记录** - 最后更新时间

### 文件类型处理规则

| 文件类型 | 存放位置 | 备注 |
|----------|----------|------|
| PPT/PPTX | 对应课程目录 | 教学课件 |
| PDF | 对应课程目录 | 文档资料 |
| Word/DOCX | 对应课程目录 | 文档资料 |
| 网页链接 | `index.md` 相关链接部分 | 在线资源 |
| 数据集 | `datasets/` 目录 | 课程数据 |

### 自动化脚本功能

1. `complete-scraper.js` 功能：
   - Moodle 课程材料自动下载
   - 支持交互式登录和课程选择
   - 自动分类材料到相应目录（lectures/resources/datasets）
   - 支持多课程批量下载

2. `extract-materials.js` 功能：
   - 文档内容提取为 Markdown 格式
   - 支持 PDF, Word, PowerPoint 文档处理
   - 批量处理 materials 目录下的文档
   - 自动生成可搜索的文本内容

3. 脚本使用方式：
   - `npm run scrape:moodle` - 运行 Moodle 爬虫
   - `npm run extract:materials` - 提取文档内容
   - 支持环境变量配置登录信息

**注意**: `complete-scraper.js` 中 COMPSCI5092 的路径配置为 `COMPSCI5092-research-professional-skills`, 与磁盘上的实际目录一致, 是最权威的来源。任何课程目录改名都需同步更新 `complete-scraper.js` 的 `COURSES` 与本文档的「当前课程列表」。

### 文档内容 (content/) 要求

1. 双语支持结构：
   - `en/` 英文目录
   - `zh/` 中文目录
   
2. 内容组织：
   - 与 `materials/` 结构对应
   - 用于总结, 指南和可搜索的文档
   
3. 文档类型：
   - 课程总结
   - 学习指南
   - 参考资料

### 代码项目 (code/) 要求

1. 目录组织：
   - 按学期和课程代码组织
   - 包含编程作业和项目代码
   
2. 文档要求：
   - 每个项目包含 `README.md`
   - 包含运行说明和依赖项
   
3. 代码规范：
   - 遵循课程要求的编程规范
   - 适当的注释和文档

## AI 助手行为准则

1. **结构遵循原则**
   - 创建目录时严格遵循上述结构
   - 自动生成 `index.md` 文件模板
   
2. **操作确认机制**
   - 询问确认后再进行大规模文件操作
   - 优先使用脚本而非手动操作
   
3. **文档同步要求**
   - 保持中英文文档同步更新
   - 维护版本一致性
   
4. **内容生成规范**
   - 减少或避免使用 emoji
   - 可适当使用颜文字表达 (＾◡＾)
   - 优先使用有序列表组织信息
   - 复杂信息使用表格展示
   - 保持文档简洁专业
