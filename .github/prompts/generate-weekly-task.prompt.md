---
description: Generate Bilingual Weekly Task Files
mode: agent
tools: ['createFile', 'editFiles', 'readFile', 'codebase', 'fetch']
---

# Prompt: Generate Bilingual Weekly Task Files

## Objective
Generate a pair of bilingual (English and Chinese) weekly task files in MDX format based on the provided template and user inputs.

## User Inputs
- `weekNumber`: The specific week number (e.g., 7).
- `dateRange`: The date range for the week (e.g., "Nov 3 - Nov 9, 2025").
- `priorities`: A list of top priorities for the week.
- `courses`: An array of course objects, each containing:
  - `name`: The course name (e.g., "COMPSCI5100-ml-ai").
  - `focus`: The main focus for the week.
  - `officialDeadline`: Any official deadline.
  - `personalGoal`: A personal goal for the week.
  - `tasks`: A list of task objects, each with a `title` and `description`.

## Template (English)
```mdx
---
title: 'Week {{weekNumber}} Tasks ({{dateRange}})'
description: 'Study plan and tasks for Week {{weekNumber}}.'
---
import { Steps, Step } from 'fumadocs-ui/components/steps';

## This Week's Priorities
- {{priority1}}
- {{priority2}}

---

## Course-Specific Tasks

### {{courseName1}}
- **Focus**: {{focus1}}
- **Official Deadline**: {{officialDeadline1}}
- **Personal Goal**: {{personalGoal1}}
- **Tasks**:
  <Steps>
    <Step>
      #### {{task1_1_title}}
      {{task1_1_description}}
    </Step>
  </Steps>

### {{courseName2}}
- **Focus**: {{focus2}}
- **Official Deadline**: {{officialDeadline2}}
- **Personal Goal**: {{personalGoal2}}
- **Tasks**:
  <Steps>
    <Step>
      #### {{task2_1_title}}
      {{task2_1_description}}
    </Step>
  </Steps>
```

## Instructions
1.  You will receive the user inputs for a specific week.
2.  Generate two separate MDX files:
    - One for English, located at `notes/en/tasks/week<weekNumber>.mdx`.
    - One for Chinese, located at `notes/zh/tasks/week<weekNumber>.mdx`.
3.  Use the provided template to structure the content.
4.  Replace all placeholders `{{...}}` with the corresponding user input.
5.  For the Chinese version, translate the UI text and the user-provided content appropriately. Key translations include:
    - `title`: `第 X 周任务 (日期范围)`
    - `description`: `第 X 周的学习计划和任务。`
    - `This Week's Priorities`: `本周重点`
    - `Course-Specific Tasks`: `课程具体任务`
    - `Focus`: `重点`
    - `Official Deadline`: `官方截止日期`
    - `Personal Goal`: `个人目标`
    - `Tasks`: `任务`
6.  Ensure all MDX components like `<Steps>` and `<Step>` are correctly used.
7.  The final output should consist of two distinct code blocks, each clearly marked with its target file path.

## Example Output Format

`notes/en/tasks/week7.mdx`:
```mdx
---
title: 'Week 7 Tasks (Nov 3 - Nov 9, 2025)'
description: 'Study plan and tasks for Week 7.'
---
... (content) ...
```

`notes/zh/tasks/week7.mdx`:
```mdx
---
title: '第 7 周任务 (2025年11月3日 - 11月9日)'
description: '第 7 周的学习计划和任务。'
---
... (中文内容) ...
```
