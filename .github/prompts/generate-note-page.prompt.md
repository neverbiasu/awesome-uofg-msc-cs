---
description: Generate a detailed note page for a single course topic based on course materials
mode: agent
tools: ['createFile', 'editFiles', 'readFile', 'codebase', 'fetch']
---

# Generate Single Course Note Page

Generate a comprehensive, structured note page for a specific course topic (e.g., Python Functions, Decision Making, Git & GitHub) based on course materials.

## Task Overview

Create a detailed note page that:
- Explains concepts progressively from motivation to implementation
- Provides concrete code examples with explanations
- Highlights best practices and common pitfalls
- Maintains consistency with the note template structure
- Derives all content strictly from course materials (.md files)

## Input Variables

You will need the following information:
- Course code: `${input:courseCode:COMPSCI4084}`
- Semester: `${input:semester:semester-1}`
- Week number: `${input:weekNumber:1}`
- Topic slug: `${input:topicSlug:python-basics}`
- Topic title: `${input:topicTitle:Python 基础}`
- Material files: `${input:materialFiles:path/to/lecture.md,path/to/exercises.md}`

## Required Structure

The generated note page MUST follow this structure from the note template:

### 1. Frontmatter
```yaml
---
title: "[Topic Title]"
description: "[One-line summary listing 3-5 key subtopics]"
---
```

### 2. Content Sections (in order)

#### 概要 (Overview)
- **目标**：What this note aims to teach and where it applies
- **范围**：Scope boundaries - what's covered and what's not

Example:
```markdown
## 概要
- 目标：掌握函数定义、参数传递与返回值，提升代码复用性。
- 范围：覆盖函数定义、参数类型、作用域与副作用；不涉及装饰器与闭包高级话题。
```

#### 学习目标 (Learning Objectives)
- 3-5 numbered objectives
- Use action verbs: "掌握...", "理解...", "能够...", "熟练..."
- Specific and measurable

Example:
```markdown
## 学习目标
1. 掌握函数定义语法与参数传递（位置/关键字/默认参数）。
2. 理解函数作用域（local/global）与变量生命周期。
3. 能够识别并避免副作用函数的常见陷阱。
```

#### 关键知识点 (Key Knowledge Points)
Each subtopic MUST follow this structure:

```markdown
### N. [Subtopic Title]
- **动机**：Why this concept exists / problem it solves / typical scenarios
- **核心概念**：Definitions, key points, syntax patterns
- **使用场景/模式**：When and how to use / usage patterns / boundaries
- **示例**：
\`\`\`python
# Example name
# 说明：Brief explanation of intent and edge cases
[concrete runnable code]
\`\`\`
- **注意事项/最佳实践**：Common pitfalls / best practices / conventions / performance / security
- **权衡与替代**（可选）：Trade-offs / alternatives / when to choose what
- **小结**：One-sentence recap and actionable advice

---
```

**Critical Guidelines for Subtopics**:
- Start numbering from 1 (not 0, unless explicitly showing prerequisite concepts)
- Each subtopic should be self-contained yet flow logically to the next
- Code examples MUST be concrete and runnable (not pseudocode)
- Use inline code formatting for keywords: \`if\`, \`def\`, \`None\`
- Separate subtopics with `---` horizontal rule

#### 最佳实践 (Best Practices)
- 3-6 high-level practical guidelines
- Use bullet points
- Focus on actionable advice

Example:
```markdown
## 最佳实践
- 函数名使用小写加下划线；避免单字母除非在数学上下文（如 `f(x)`）。
- 默认参数避免使用可变对象（list/dict），改用 `None` 占位。
- 函数应保持单一职责；超过 20 行考虑拆分。
```

#### 更新记录 (Update History)
```markdown
---
## 更新记录
- YYYY-MM-DD：创建初版。
- YYYY-MM-DD：[具体更新内容]
```

## Content Guidelines

### DO:
- ✅ **MD-only provenance**: Base ALL content strictly on `.md` files from `materials/` directory
- ✅ **Progressive structure**: Build from motivation → concept → example → practice
- ✅ **Concrete examples**: Provide runnable code snippets with inline comments
- ✅ **Chinese-first**: Use Chinese for explanations, English for technical terms in backticks
- ✅ **Visual separation**: Use `---` to separate major subtopics clearly
- ✅ **Inline formatting**: Use backticks for code keywords, file names, and technical terms
- ✅ **Actionable best practices**: Focus on what to do/avoid, not just theory

### DON'T:
- ❌ Add concepts not present in source materials
- ❌ Use pseudocode or incomplete examples
- ❌ Include "参考材料" section (references belong in index.mdx only)
- ❌ Overuse emojis (minimal 颜文字 acceptable: ＾◡＾)
- ❌ Create overly abstract examples without concrete values
- ❌ Mix multiple unrelated concepts in one subtopic
- ❌ Skip the "小结" for each subtopic (it's required)

## Example Structure Walkthrough

### Good Subtopic Example:
```markdown
### 2. 函数参数类型
- **动机**：Python 支持多种参数传递方式以适应不同调用场景；理解差异可提升 API 灵活性。
- **核心概念**：
  - 位置参数：按顺序传递，必填
  - 关键字参数：按名称传递，可选
  - 默认参数：提供默认值，可覆盖
  - 可变参数：`*args`（元组）与 `**kwargs`（字典）
- **使用场景/模式**：
  - 必填核心参数用位置参数
  - 可选配置用关键字+默认参数
  - 不确定参数数量时用 `*args`/`**kwargs`
- **示例**：
\`\`\`python
def greet(name, greeting="Hello", *, loud=False):
    """
    说明：name 为必填位置参数；greeting 有默认值；
          loud 为仅限关键字参数（* 后声明）
    """
    msg = f"{greeting}, {name}!"
    return msg.upper() if loud else msg

print(greet("Alice"))                    # Hello, Alice!
print(greet("Bob", "Hi"))                # Hi, Bob!
print(greet("Eve", loud=True))           # HELLO, EVE!
# greet("Tom", True)  # 错误！loud 只能用关键字传递
\`\`\`
- **注意事项/最佳实践**：
  - 避免默认参数使用可变对象（list/dict），改用 `None` 并在函数体初始化
  - 仅限关键字参数（`*` 后）提升 API 可读性，防止位置混淆
- **权衡与替代**：
  - 位置参数简洁但顺序依赖；关键字参数显式但冗长
  - 过多参数考虑用配置对象/dataclass
- **小结**：选择参数类型应平衡简洁性与可读性；核心参数用位置，可选配置用关键字+默认值。

---
```

## Reference Files

### 1. Note Template
[Note Template](../../docs/templates/note-template.mdx)

Standard template structure - use this as the skeleton.

### 2. Week 1 Examples
[Week 1 Notes Folder](../../notes/semester-1/COMPSCI4084/week1/)

Real implementations to reference for:
- Subtopic structure patterns (python-basics.mdx, decision-making.mdx)
- Example formatting (git-and-github.mdx, conda.mdx)
- Best practices sections (oop-in-python.mdx)

### 3. Course Materials
Always read the corresponding `.md` files in:
```
materials/semester-[X]/[COURSE-DIRECTORY]/lectures/*.md
materials/semester-[X]/[COURSE-DIRECTORY]/resources/*.md
```

## Workflow

### Step 1: Read Source Materials
1. Identify the material files for the topic (from week index.mdx or materials index)
2. Read ALL relevant `.md` files completely
3. Extract key concepts, examples, and structure

### Step 2: Plan Structure
1. List 3-7 major subtopics based on material content
2. Order subtopics logically (prerequisites first, advanced concepts last)
3. Identify 1-2 concrete examples per subtopic

### Step 3: Write Content
For each subtopic:
1. **动机**: Extract from material introduction/context
2. **核心概念**: Summarize definitions and key points
3. **使用场景**: Identify from material examples/applications
4. **示例**: Adapt or create based on material examples (must be concrete and runnable)
5. **注意事项**: Extract warnings, best practices from materials
6. **权衡**: Identify trade-offs mentioned in materials (if any)
7. **小结**: Synthesize one actionable sentence

### Step 4: Add Best Practices
- Extract high-level guidelines from all subtopics
- Focus on "what to do" and "what to avoid"
- Keep to 3-6 points

### Step 5: Validation
Before completing, verify:
- [ ] All content traced to source `.md` files (no fabrication)
- [ ] All code examples are concrete and runnable
- [ ] Each subtopic has all required sections (动机 → 小结)
- [ ] Frontmatter is valid YAML
- [ ] No "参考材料" section included
- [ ] MDX-safe formatting (backtick inline operators like `<`, `<=`)
- [ ] Horizontal rules (`---`) separate major subtopics

## Output

Generate the complete note page and save it to:
```
notes/semester-${semester}/${courseCode}/week${weekNumber}/${topicSlug}.mdx
```

## Common Pitfalls to Avoid

1. **Incomplete subtopics**: Every subtopic MUST have all sections from 动机 to 小结
2. **Abstract examples**: Examples must be concrete, runnable code with specific values
3. **Missing context**: Each code example needs inline comments explaining intent
4. **Flat structure**: Use numbered subtopics (### N. Title) not flat bullet lists
5. **Reference leakage**: Never include "参考材料" section in note pages
6. **Content drift**: All content must trace back to source materials
7. **MDX hazards**: Always backtick inline comparison operators

## Tips for Quality

- **Consistency**: Match the style and depth of existing Week 1 notes
- **Clarity**: Assume reader is learning the concept for the first time
- **Practicality**: Every concept should connect to "when/why would I use this"
- **Examples**: Prefer complete, self-contained examples over fragments
- **Flow**: Each subtopic should build on previous ones logically
