---
name: note-reviewer
description: Expert-level audit skill for validating note accuracy and Fumadocs compliance. Integrated with Context7 MCP for the latest technical standards.
metadata:
  author: faych-chen
  version: "1.2.0"
  dependencies: ["skills/fumadocs-expert"]
  mcp-server: "upstash/context7"
allowed-tools: "run_shell_command read_file grep_search glob web_fetch"
---

# Note Reviewer Instructions (v1.2.0)

This skill acts as a high-fidelity quality gate, ensuring all notes are technically flawless and aligned with original curriculum materials.

## Audit Checkpoints

### 1. Curriculum Alignment
- **Consistency**: Verify that all formulas, theorems, and definitions match the original PDF/PPTX source.
- **Completeness**: Ensure all key learning objectives defined in the weekly index are covered in the sub-pages.

### 2. Technical & Structural Standards
- **Title Format**: MUST follow `"Week <N>: title"`. Reject generic or inconsistent titles.
- **Image Integrity**: 
    - Verify that every image path includes the correct week sub-folder (e.g., `/images/.../week6/`).
    - Verify that the image content matches the descriptive text (no "placeholder" or generic revisit slides).
- **Component Audit**: 
    - Reject notes using plain text for warnings or instructions that should be in `<Callout>` or `<Steps>`.
    - Ensure `<Callout>` has a `type` (info, warn, error).
- **Syntax Integrity**: 
    - Check for unclosed MDX tags.
    - Validate CSS comment syntax (`/* ... */`).

### 3. Linguistic & Structural Mirroring
- **Bilingual Symmetry**: Check that `/en/` and `/zh/` directories have the exact same file names and internal structures.
- **Header Purity**: Ensure no English words exist in Chinese headers (e.g., `### 核心概念` instead of `### Core Concepts`).
- **Links**: Validate that relative links start with `/${lang}/notes/` and resolve correctly.

## Review Workflow
1. **Fetch Latest Specs**: Call Context7 to confirm the latest component interfaces.
2. **Scan Source**: Read the original material MD to identify missing data points.
3. **Audit MDX**: Perform a surgical read of the generated files.
### 4. Mandatory Asset Verification (The "Build" Check)
- **Static Asset Check**: After generating any note, you **MUST** run a shell command to verify every image path exists in the `public/` directory.
- **Command**: `grep -rh "/images/" notes/ | grep ".png" | awk -F'(' '{print $2}' | awk -F')' '{print $1}' | while read img; do ls "public$img" || exit 1; done`
- **Correction**: If a file is missing, find it in the `materials` extraction logs and copy it to the correct `week<N>` folder before declaring "Done".
- **Pathing**: Ensure all images start with `/images/` (absolute from public root).

