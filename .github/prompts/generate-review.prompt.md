---
description: Generate a structured weekly review.mdx checklist for course notes
mode: agent
tools: ['createFile', 'editFiles', 'readFile', 'codebase', 'fetch']
---

# Generate Weekly Review Checklist

生成一份用于复习的 `review.mdx` 文档，覆盖指定课程某一周的全部模块复盘检查表。

## 工作目标
- 依据周次 `index.mdx` 中的模块顺序，生成中文复习检查表。
- 每个模块包含至少 3 条表格条目，提供知识点、要点摘要、重要程度，并按序号区分。
- 顶部仅保留概要与目录；其余内容按模块输出表格，无额外说明或追踪章节。
- 所有链接仅引用仓库中现有的 `.mdx`（笔记）或 `.md`（materials）文件，避免外部链接；每个模块只需在标题引用中给出统一参考链接。

## 开始前必须完成
1. 读取 `notes/semester-${input:semester}/${input:courseCode}/week${input:weekNumber}/index.mdx`，确认模块名称与对应子页路径。
2. 读取 `materials/semester-${input:semester}/${input:courseDirectory}/index.md`，核对相关讲义/练习的 `.md` 文件名称与相对路径。
3. 使用 `docs/templates/review-template.mdx` 作为结构骨架，确保章节顺序与格式一致。

## 输入变量
- 课程代码：`${input:courseCode:COMPSCI4084}`
- 课程目录名：`${input:courseDirectory:COMPSCI4084-programming-systems}`
- 学期：`${input:semester:semester-1}`
- 周次：`${input:weekNumber:3}`
- 本周主题：`${input:themes:NumPy, Pandas, 数据可视化}`

## 必须遵循的结构
### Frontmatter
```yaml
---
title: "Week ${input:weekNumber} 复习检查表"
description: "Week ${input:weekNumber} 重点复盘与自查清单"
course: "${input:courseCode}"
week: "${input:weekNumber}"
---
```

### 内容章节（按顺序）
1. `## 概要`
   - 3 条条目：复习目标、重点主题、推荐节奏。
2. `## 目录`
   - 使用无序列表列出概要与全部模块的锚点，可在条目中同时给出模块名称与对应锚点说明。
3. 依次生成 `## 模块：<模块名称>` 小节（不再设置额外的聚合标题）。
   - 模块顺序必须与 `index.mdx` 的 “内容索引” 一致。
   - 小节开头添加引用行（示例格式：`> 模块参考：<笔记链接>（可补充一个材料链接）`）。
   - 紧随其后插入 4 列列表格：`序号 | 知识点 | 掌握要点 | 重要程度`。
   - `知识点` 列写明本模块需要掌握的核心概念或技能点，保持条目原子化，每条仅涵盖一个独立主题。
   - `掌握要点` 用 1 句话概述理解或操作要领，可提及易错点或记忆提示。
   - 表格中每条条目使用数字序号（1、2、3…），不再使用复选框。
   - `重要程度` 仅使用 `⭐☆☆`、`⭐⭐☆`、`⭐⭐⭐`。
    - 在表格后添加 `**补充思考：**` 段落，列出 2 条要点，强调易错点或与评估的联系。
4. 模块之间使用 `---` 分隔（尾部模块与下一章节之间保留 `---`）。
5. `---` 水平分隔线。
6. `更新记录`
```markdown
更新记录
- YYYY-MM-DD：创建初版。
```

## 内容规范
- 语言统一使用简体中文。
- 每个模块至少 3 个知识点条目；若源材料较多应覆盖主要考点，可增加条目。
- 知识点条目需保持原子化且描述具体概念或技能，避免一个条目涵盖多个独立主题。
- `重要程度` 仅使用 `⭐☆☆`、`⭐⭐☆`、`⭐⭐⭐`。
- 模块引用中的链接需使用相对路径，从 `review.mdx` 所在目录出发（例如 `./numpy.mdx#广播机制`）；如需补充材料链接，仅保留一个并放在括号内。
- 若 `index.mdx` 中无对应材料，可省略 `参考资料` 提示中的材料部分，但保留笔记链接。
- 避免添加未在材料或笔记中出现的主题。
- 使用 `---` 分隔符保持文档层次清晰。
- 生成文件路径：`notes/semester-${input:semester}/${input:courseCode}/week${input:weekNumber}/review.mdx`。

## 校验清单
在提交前确认：
1. 模块顺序与 `index.mdx` 一致。
2. 表格中无空白单元格；若某列无内容，说明原因或提供最接近的引用。
3. 所有链接均指向仓库内存在的 `.mdx` 或 `.md` 文件。
4. `重要程度` 评级使用规范格式。
5. 文档顶部目录与实际标题匹配。

## 输出
- 生成完整的 `review.mdx` 文件，符合模板结构与内容规范。
