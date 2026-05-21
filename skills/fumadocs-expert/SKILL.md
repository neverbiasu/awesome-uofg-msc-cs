name: fumadocs-expert
description: Specialized skill for managing Fumadocs-based documentation projects. Includes deep knowledge of UI components, page layouts, MDX features, and CLI tools. It leverages Context7 MCP for real-time documentation retrieval to ensure alignment with the latest versions.
metadata:
  author: faych-chen
  version: "1.2.0"
  mcp-resources: ["https://www.fumadocs.dev/docs/ui/layouts/page", "https://www.fumadocs.dev/docs/mdx", "https://www.fumadocs.dev/docs/cli"]
  mcp-server: "upstash/context7"
allowed-tools: "run_shell_command write_file replace read_file grep_search glob"
---

# Fumadocs Expert Instructions

This skill provides the technical foundation for content creation and site management within the Fumadocs ecosystem, enhanced by the Context7 MCP service.

## Core Technical Context

### 1. Real-time Documentation (Context7 MCP)
To ensure accuracy with the latest Fumadocs version, use the **Context7 MCP** server:
- **Resolve ID**: Use `resolve-library-id(name="fumadocs")` to get the correct library ID.
- **Fetch Docs**: Use `get-library-docs(libraryId="/fuma-nama/fumadocs", query="<topic>")` to retrieve specific UI component schemas or layout properties.
- **CLI Alternative**: Run `npx ctx7 docs fumadocs <query>` to pull context directly into the workspace.

### 2. UI Components & Usage
Refer to `references/ui-components.md` for full parameter lists.
...
- **Cards**: Use `<Cards>` as a grid container for `<Card title="..." href="..." />`.
- **Callouts**: Use `<Callout type="info|warn|error" title="...">...</Callout>`.
- **Steps**: Wrap numbered sections in `<Steps>`.
- **Accordions**: Use for collapsible content like detailed derivations or secondary info.

### 2. Layout & Metadata
- **Frontmatter**: Every MDX must have `title` and `description`.
- **Layout Configuration**: Use `DocsPage` structure. Set `full={true}` for wide terminal or specialized views.
- **Last Modified**: Rely on Fumadocs built-in git-based timestamps. Do not add "Last Updated" manually.

### 3. MDX Mastery
- **Math**: 
    - Inline: `$x^2$` or `$$x^2$$` (Verify project config, prefer `$$...$$` as per user preference).
    - Block: ` ```math \n ... \n ``` `.
- **Code Blocks**: Always use language tags. Ensure semicolons for JS/TS.

### 4. CLI Operations
- **Install Components**: `npx @fumadocs/cli add <component>`.
- **Directory Mapping**: Use `npx @fumadocs/cli tree <dir>` to generate `<Files>` components.

## Operational Standards
- **Bilingual Mirroring**: Every technical change must be applied to both `/en/` and `/zh/` branches.
- **Structural Integrity**: Ensure no broken links using the `/${lang}/notes/...` pattern.
- **Expert Review**: Use `note-reviewer` to audit output against these standards.
