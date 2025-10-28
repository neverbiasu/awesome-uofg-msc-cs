---
description: Generate a structured unit index.mdx file for topic-based course notes
mode: agent
tools: ['createFile', 'editFiles', 'readFile', 'codebase', 'fetch']
---

# Generate Unit Index Page

Generate a comprehensive `index.mdx` overview page for a specific unit (topic-based module) of course content.

## Task Overview

Create a structured unit index page that:
- Summarizes the unit's learning themes and session arrangements
- Lists learning objectives and key knowledge points
- Provides practical checklists and assessment reminders
- Links to all child note pages for the unit
- References only Markdown (.md) versions of course materials

**Before starting, you MUST:**
1. Read the course materials index (`materials/semester-[X]/[COURSE-DIRECTORY]/index.md`) to understand:
   - The correct unit structure and material groupings
   - Available materials for the target unit
   - Assessment schedule and requirements
2. Use the unit index template (`docs/templates/unit-index-template.mdx`) as the structural skeleton
3. Reference existing unit index implementations for patterns

## Input Variables

You will need the following information:
- Course code: `${input:courseCode:COMPSCI5100}`
- Semester: `${input:semester:semester-1}`
- Unit number: `${input:unitNumber:1}`
- Unit title: `${input:unitTitle:Regression}`
- Unit themes: `${input:themes:Linear Regression, Regularization, Feature Selection}`

## Required Structure

The generated `index.mdx` must follow this exact structure:

### 1. Frontmatter
```yaml
---
title: "Unit [X]: [Title]"
description: "Unit [X] 精简学习笔记（[theme1], [theme2], [theme3]）"
---
```

### 2. Content Sections (in order)

#### 概要 (Overview)
- 2-3 sentences describing the unit's scope and teaching format (e.g., Lecture + Lab)
- Core themes summary
- Note: Topic-based units do not follow weekly schedule, so adapt the description accordingly

#### 学习安排 (Session Schedule)
Table format (adapt from the materials index structure):
```markdown
| 类型 | 标题 | 说明 |
|---|---|---|
| Lecture | [Topic] | [Description] |
| Lab | [Topic] | [Description] |
```

#### 学习目标 (Learning Objectives)
- 3-5 numbered objectives
- Use action verbs: "能…" (can...), "掌握…" (master...), "理解…" (understand...)
- Focus on outcomes specific to the unit's topic

#### 关键知识点 (Key Knowledge Points)
- Grouped by theme (e.g., "基础概念", "算法与方法", "实践与应用")
- 2-4 bullet points per group
- Focus on core concepts, algorithms, and techniques
- Use markdown bold for theme headers: `- **主题名称**：`

Example:
```markdown
## 关键知识点
- **基础概念**：
  - 线性回归的数学原理与矩阵表示
  - 最小二乘法（OLS）与成本函数
- **算法与方法**：
  - 梯度下降算法与参数优化
  - 正则化方法（L1/L2）与过拟合防止
```

#### 实践清单（自检）(Practice Checklist)
- 4-6 checkbox items
- Concrete, actionable tasks
- Cover both hands-on practice and concept verification
- Adapt examples to the unit's specific content

Example:
```markdown
- [ ] 实现简单线性回归模型（numpy 与 scikit-learn）
- [ ] 比较 OLS 与梯度下降的收敛性能
- [ ] 使用 cross-validation 选择最佳正则化参数
```

#### 评估提醒 (Assessment Reminders)
- List relevant assessments for the unit
- Include format (Exam/Coursework) and weight (percentage)
- Note submission deadlines if applicable

#### 内容索引（Unit [X] 子页）(Content Index)
Table linking to child pages:
```markdown
| 模块 | 页面 |
|---|---|
| [Module Name] | [Link to /${lang}/notes/semester-${semester}/${courseCode}/unit${unitNumber}/${topicSlug}] |
```

#### 材料索引 (Materials Index)
- Add this warning block first:
```markdown
> 注意：下列链接仅指向仓库内已存在的 Markdown（.md）版本，作为笔记内容的唯一溯源。
```

- **Critical**: Material groupings MUST match the course materials index structure exactly
  - Check `materials/semester-[X]/[COURSE-DIRECTORY]/index.md` for the correct section names and unit organization
  - For topic-based courses: organize by unit/topic headings as shown in materials index
  
- Group materials by unit topic exactly as shown in course materials index
- Each link should:
  - Reference relative path to `.md` files in `materials/` directory
  - Include descriptive text indicating file type (slides, exercises, case studies, etc.)
  - Use format: `[Title (type, MD)](relative-path.md)`

Example:
```markdown
### Unit 2: Classification
- [Classification slides (lecture, MD)](../../materials/semester-1/COMPSCI5100-ml-ai/resources/Classification_question_2024_-SOLUTIONS.md)
- [Classification exercises (exercises, MD)](../../materials/semester-1/COMPSCI5100-ml-ai/resources/classification-practical.md)

### Case Studies
- [Model Interpretability (case study, MD)](../../materials/semester-1/COMPSCI5100-ml-ai/resources/Case_Study1_MLAIDS.pptx.md)
```

## Content Guidelines

### DO:
- ✅ Base all content strictly on `.md` files in `materials/semester-[X]/[course-directory]/`
- ✅ Use tables for structured information
- ✅ Use checkbox lists for actionable items
- ✅ Keep language concise and professional
- ✅ Ensure all relative paths are correct from the index location
- ✅ Adapt all section descriptions to reflect unit/topic-based organization (not weekly)

### DON'T:
- ❌ Link to PDF/PPT files in materials index
- ❌ Add tools or concepts not present in source materials
- ❌ Use excessive emojis (minimal颜文字 acceptable)
- ❌ Include abstract or vague checklist items
- ❌ Reference materials that don't exist as .md files
- ❌ Do not automatically or arbitrarily add redundant suffixes or long descriptions to child page filenames; child page filenames should be concise and clear, e.g., `regression.mdx`
- ❌ Do not assume weekly schedule structure; adapt descriptions for unit/topic-based organization

## File Paths Reference

**Notes location pattern (unit-based):**
```
notes/semester-[X]/[COURSE-CODE]/unit[X]/index.mdx
```

**Materials location pattern:**
```
materials/semester-[X]/[COURSE-DIRECTORY]/
├── lectures/*.md
└── resources/*.md
```

**Relative path from unit index to materials (4 levels up):**
```markdown
../../../../materials/semester-[X]/[COURSE-DIRECTORY]/[type]/[file].md
```

## Reference Files

### 1. Unit Index Template
[Unit Index Template](../../docs/templates/unit-index-template.mdx)

Standard template structure - use this as the skeleton for all unit-based index pages.

### 2. Course Materials Index
[Course Materials Index](../../materials/semester-1/COMPSCI5100-ml-ai/index.md)

Source of truth for:
- Unit structure and topic organization
- Material file names and groupings
- Assessment schedule and weights
- Course-specific context

**Critical**: Always cross-reference the materials index to ensure:
- Correct material grouping under each unit
- Accurate file names and paths
- Proper unit/topic naming
- Assessment timing and format

### 3. Example Implementation (Weekly)
[Week 1 Index Example](../../notes/semester-1/COMPSCI4084/week1/index.mdx)

Reference for implementation patterns (adapt for unit/topic structure):
- How to structure "关键知识点" by theme groupings
- "实践清单" with concrete checkbox tasks
- Material index organization with MD-only links
- Proper relative path construction

## Validation Steps

Before completing, verify:
1. **Material Index Cross-check**: 
   - Compare your material groupings against `materials/semester-[X]/[COURSE-DIRECTORY]/index.md`
   - Ensure section headers match exactly as shown in materials index
   - Verify all listed materials exist as `.md` files in the materials directory
2. **Structure Compliance**:
   - All sections follow the template order from `docs/templates/unit-index-template.mdx`
   - Adapted for unit/topic structure (not weekly)
   - Tables are properly formatted
   - Frontmatter is valid YAML
3. **Link Validation**:
   - All Markdown links use relative paths and point to existing files
   - All material references are `.md` files only (no PDF/PPT)
   - Child page links point to actual `.mdx` files in the unit directory
4. **Content Fidelity**:
   - No content is added that doesn't exist in source materials
   - "关键知识点" are grouped by themes with bold headers
   - "实践清单" contains concrete, actionable tasks
   - Descriptions reflect unit/topic-based organization
5. **Assessment Info**:
   - If assessment is mentioned, verify timing and weight from course materials index

## Output

Generate the complete `index.mdx` file and save it to:
```
notes/semester-${semester}/${courseCode}/unit${unitNumber}/index.mdx
```
