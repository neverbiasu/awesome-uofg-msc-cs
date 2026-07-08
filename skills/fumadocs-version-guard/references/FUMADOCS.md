# Fumadocs Reference

Read this file first when touching Fumadocs loaders or graph logic.

## Source of truth
- `src/lib/source.ts` is the adapter layer for Fumadocs page data.
- `src/lib/build-graph.ts` currently has private-field risk that should be treated carefully.
- `src/lib/i18n.ts` defines the active language set.

## Constraints
- Prefer public loader results over private fields such as `_file`.
- Keep upgrades isolated behind one adapter instead of spreading private access.
- If a fallback depends on external docs or MCP, it must have a local-file fallback.

## Do
- Read only the narrow source file relevant to the change.
- Scan for private-field usage only in the touched slice.
- Validate the adapter before widening the change.
