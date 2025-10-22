---
description: Generate a bilingual (English and Chinese) pair of note pages for a single course topic.
mode: agent
tools: ['createFile', 'editFiles', 'readFile', 'codebase', 'fetch']
---

# Generate Bilingual Course Note Pages

This workflow generates a pair of comprehensive, structured note pages (English and Chinese) for a single course topic. It ensures consistency between language versions and streamlines content creation.

## Task Overview

Create a pair of detailed note pages that:
- Are based strictly on the English source materials in the `materials/` directory.
- Follow the detailed structure defined in `generate-note-page.prompt.md`.
- Are generated in a single, atomic operation to ensure synchronization.

## Input Variables

- Course code: `${input:courseCode:COMPSCI4084}`
- Semester: `${input:semester:semester-1}`
- Week number: `${input:weekNumber:4}`
- Topic slug: `${input:topicSlug:concurrency}`
- Topic title (English): `${input:topicTitleEn:Concurrency}`
- Topic title (Chinese): `${input:topicTitleZh:并发}`
- Material files: `${input:materialFiles:path/to/lecture.md}`

## Core Workflow

### Step 1: Generate English Content

- **Action**: Read the specified English source files from the `materials/` directory.
- **Process**: Following the detailed structure and guidelines in `generate-note-page.prompt.md`, generate the full content for the **English** version of the note page.
- **Output**: In-memory Markdown content for the English note.

### Step 2: Translate to Chinese Content

- **Action**: Take the complete English Markdown content generated in Step 1.
- **Process**: Perform a full translation of the content into **Chinese**. Keep all Markdown formatting, code blocks, and frontmatter keys intact. Only translate the descriptive text (titles, descriptions, explanations, etc.).
- **Output**: In-memory Markdown content for the Chinese note.

### Step 3: Write Both Files Simultaneously

- **Action**: Use the `write_file` tool twice to save both versions.
- **Process**:
  - Write the English content to `notes/en/semester-${semester}/${courseCode}/week${weekNumber}/${topicSlug}.mdx`.
  - Write the Chinese content to `notes/zh/semester-${semester}/${courseCode}/week${weekNumber}/${topicSlug}.mdx`.
- **Goal**: This should be performed as a single, final action to ensure that either both files are created or neither is. This prevents partial states.

## Validation

Before completing, ensure:
- [ ] Both English and Chinese files have been created in their respective `en` and `zh` directories.
- [ ] The content of both files is structurally identical (same headings, code blocks, etc.).
- [ ] The text content has been correctly translated.

## Reference Files

- **Note Structure Guide**: [generate-note-page.prompt.md](./generate-note-page.prompt.md)
- **Source Materials Location**: `materials/`
