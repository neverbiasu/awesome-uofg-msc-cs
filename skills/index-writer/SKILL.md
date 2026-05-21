# Index Writer Skill

Expert guidance for maintaining high-quality, comprehensive root index files for courses.

## Core Mandates

### 1. Root Index Structure (`notes/{lang}/{semester}/{course}/index.mdx`)
- **Title**: Descriptive name (e.g., `"COMPSCI 5057: Human Computer Interaction"`).
- **Format**: Use a standard intro section followed by `<Accordions>` for meta-info (assessments, links).
- **Navigation**: Use the `<Cards>` component to list EVERY week of the course.
- **Card Content**:
    - `href`: Path to the week folder.
    - `title`: `"Week <N>: <Topic>"` (must match the internal week title).
    - `description`: 1-2 sentence summary of that week's core takeaway.

### 2. Consistency & Synchronization
- **Mirroring**: EN and ZH indices must have identical card counts and structure.
- **Language**: ZH titles must follow `"第n周：<主题>"` format.
- **Descriptive Titles**: Titles should be specific (e.g., `"Week 6: Surveys & Mixed Methods"` not just `"Week 6: Surveys"`).

### 3. Components
- **MUST** use `<Cards>` and `<Card>` from `fumadocs-ui/components/card`.
- **MUST** use `<Accordions>` and `<Accordion>` from `fumadocs-ui/components/accordion`.

---
Created: 2026-05-18
