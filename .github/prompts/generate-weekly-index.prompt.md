---
description: Generate a structured weekly index.mdx file for course notes
mode: agent
tools: ['createFile', 'editFiles', 'readFile', 'codebase', 'fetch']
---

# Generate Weekly Index Page

Generate a comprehensive `index.mdx` overview page for a specific week of course content.

## Task Overview

Create a structured weekly index page that:
- Summarizes the week's learning themes and session arrangements
- Lists learning objectives and key knowledge points
- Provides practical checklists and assessment reminders
- Links to all child note pages for the week
- References only Markdown (.md) versions of course materials

**Before starting, you MUST:**
1. Read the course materials index (`materials/semester-[X]/[COURSE-DIRECTORY]/index.md`) to understand:
   - The correct week structure and material groupings
   - Available materials for the target week
   - Assessment schedule and requirements
2. Use the week index template (`docs/templates/week-index-template.mdx`) as the structural skeleton
3. Reference the Week 1 example for implementation patterns

## Input Variables

You will need the following information:
- Course code: `${input:courseCode:COMPSCI4084}`
- Semester: `${input:semester:semester-1}`
- Week number: `${input:weekNumber:1}`
- Week themes: `${input:themes:Python Basics, Git, Conda}`

## Required Structure

The generated `index.mdx` must follow this exact structure:

### 1. Frontmatter
```yaml
---
title: "Week [X] 总览"
description: "Week [X] 精简学习笔记（[theme1], [theme2], [theme3]）"
---
```

### 2. Content Sections (in order)

#### 概要 (Overview)
- 2-3 sentences describing the week's teaching format (e.g., tAPP + Lab)
- Core themes summary

#### 本周安排 (Weekly Schedule)
Table format:
```markdown
| Session | 主题 | 说明 |
|---|---|---|
| Class X | [Topic] | [Description] |
```

#### 学习目标 (Learning Objectives)
- 3-5 numbered objectives
- Use action verbs: "能…" (can...), "掌握…" (master...), "理解…" (understand...)

#### 关键知识点 (Key Knowledge Points)
- Grouped by theme (e.g., "环境与工具", "Python 基础", "OOP 入门")
- 2-4 bullet points per group
- Focus on core concepts and techniques
- Use markdown bold for theme headers: `- **主题名称**：`

Example:
```markdown
## 关键知识点
- **环境与工具**：
  - Conda 环境创建/激活/依赖导出
  - Git 基本工作流与提交信息规范
- **Python 基础**：
  - 数据类型, 运算符, 字符串处理
  - 条件判断与逻辑运算
```

#### 实践清单（自检）(Practice Checklist)
- 4-6 checkbox items
- Concrete, actionable tasks
- Cover both hands-on practice and concept verification

Example:
```markdown
- [ ] 创建并激活课程专用 Conda 环境
- [ ] 初始化 Git 仓库并完成首次 commit
```

#### 评估提醒 (Assessment Reminders)
- List relevant assessments for the week
- Include format (tAPP/Lab Assessment) and weight (percentage)

#### 内容索引（Week [X] 子页）(Content Index)
Table linking to child pages:
```markdown
| 模块 | 页面 |
|---|---|
| [Module Name] | [Link to ./page.mdx] |
```

#### 材料索引 (Materials Index)
- Add this warning block first:
```markdown
> 注意：下列链接仅指向仓库内已存在的 Markdown（.md）版本，作为笔记内容的唯一溯源。
```

- **Critical**: Material groupings MUST match the course materials index structure exactly
  - Check `materials/semester-[X]/[COURSE-DIRECTORY]/index.md` for the correct section names
  - Common groupings: "Class X - [Topic]", "Lab Material - Class X", "Pre-reading Material for tAPP and Lab X"
  
- Group by material type exactly as shown in course materials index
- Each link should:
  - Reference relative path to `.md` files in `materials/` directory
  - Include descriptive text indicating file type (slides, exercises, etc.)
  - Use format: `[Title (type, MD)](relative-path.md)`

Example:
```markdown
### Class 0 - Introduction to ProgSD and Key Packages
- [Introduction to ProgSD (slides, MD)](../../materials/semester-1/COMPSCI4084-programming-systems/lectures/ProgSD_Introduction_2025-2026.md)

### Lab Material - Class 0 - Intro to packages
- [Git and GitHub - Practical Exercises (MD)](../../materials/semester-1/COMPSCI4084-programming-systems/resources/Git_and_GitHub_-_Practical_Exercises.md)
```

## Content Guidelines

### DO:
- ✅ Base all content strictly on `.md` files in `materials/semester-[X]/[course-directory]/`
- ✅ Use tables for structured information
- ✅ Use checkbox lists for actionable items
- ✅ Keep language concise and professional
- ✅ Ensure all relative paths are correct from the index location

### DON'T:
- ❌ Link to PDF/PPT files in materials index
- ❌ Add tools or concepts not present in source materials
- ❌ Use excessive emojis (minimal颜文字 acceptable)
- ❌ Include abstract or vague checklist items
- ❌ Reference materials that don't exist as .md files
 - ❌ Do not automatically or arbitrarily add redundant suffixes or long descriptions to child page filenames (for example, do not rename `numpy` to `numpy-library.mdx`); child page filenames should be concise and clear, e.g., `numpy.mdx`.

## File Paths Reference

**Notes location pattern:**
```
notes/semester-[X]/[COURSE-CODE]/week[X]/index.mdx
```

**Materials location pattern:**
```
materials/semester-[X]/[COURSE-DIRECTORY]/
├── lectures/*.md
└── resources/*.md
```

**Relative path from index to materials (4 levels up):**
```markdown
../../../../materials/semester-[X]/[COURSE-DIRECTORY]/[type]/[file].md
```

## Reference Files

### 1. Week Index Template
[Week Index Template](../../docs/templates/week-index-template.mdx)

Standard template structure - use this as the skeleton for all weekly index pages.

### 2. Course Materials Index
[Course Materials Index](../../materials/semester-1/COMPSCI4084-programming-systems/index.md)

Source of truth for:
- Week structure and session organization
- Material file names and groupings (Class 0, Lab Material, Pre-reading Material, etc.)
- Assessment schedule and weights
- Course-specific context

**Critical**: Always cross-reference the materials index to ensure:
- Correct material grouping under each week
- Accurate file names and paths
- Proper session naming (Class 0, Class 1, etc.)
- Assessment timing and format

### 3. Example Implementation
[Week 1 Index Example](../../notes/semester-1/COMPSCI4084/week1/index.mdx)

Real-world implementation showing:
- How to structure "关键知识点" by theme groupings
- "实践清单" with concrete checkbox tasks
- Material index organization with MD-only links
- Proper relative path construction

## Validation Steps

Before completing, verify:
1. **Material Index Cross-check**: 
   - Compare your material groupings against `materials/semester-[X]/[COURSE-DIRECTORY]/index.md`
   - Ensure section headers match exactly (e.g., "Lab Material - Class 0" not "Lab 0 Material")
   - Verify all listed materials exist as `.md` files in the materials directory
2. **Structure Compliance**:
   - All sections follow the template order from `docs/templates/week-index-template.mdx`
   - Tables are properly formatted
   - Frontmatter is valid YAML
3. **Link Validation**:
   - All Markdown links use relative paths and point to existing files
   - All material references are `.md` files only (no PDF/PPT)
   - Child page links point to actual `.mdx` files in the week directory
4. **Content Fidelity**:
   - No content is added that doesn't exist in source materials
   - "关键知识点" are grouped by themes with bold headers
   - "实践清单" contains concrete, actionable tasks
5. **Assessment Info**:
   - If assessment is mentioned, verify timing and weight from course materials index

## Output

Generate the complete `index.mdx` file and save it to:
```
notes/semester-${semester}/${courseCode}/week${weekNumber}/index.mdx
```
