# Fumadocs UI Reference

## Components Summary

### Cards
- **Container**: `<Cards>`
- **Item**: `<Card>`
- **Props**:
  - `title`: string
  - `description`: string
  - `href`: string
  - `icon`: ReactNode
  - `external`: boolean

### Callouts
- **Component**: `<Callout>`
- **Props**:
  - `type`: `info` (default) | `warn` | `error`
  - `title`: string (optional)
  - `icon`: ReactNode

### Steps
- **Component**: `<Steps>`
- **Usage**: Automatically identifies `h3` headers as step titles.

### Accordions
- **Container**: `<Accordions>`
- **Item**: `<Accordion>`
- **Props**:
  - `title`: string
  - `id`: string (optional)
  - `defaultOpen`: boolean

### Tabs
- **Container**: `<Tabs>`
- **Item**: `<Tab>`
- **Props**:
  - `items`: string[] (for container)
  - `value`: string (for item)

## Page Layout (DocsPage)
- **Properties**:
  - `tableOfContent`: config for TOC
  - `full`: boolean (removes max-width constraints)
  - `breadcrumb`: breadcrumb config
  - `footer`: footer config
