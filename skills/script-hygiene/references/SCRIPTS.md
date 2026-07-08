# Script Hygiene Reference

Read this file first when changing files under `scripts/`.

## Source of truth
- `package.json` defines the runtime baseline.
- `scripts/translate-notes.js` is the canonical example of fail-fast translation behavior.
- `scripts/convert-pptx-to-pdf.mjs` is the preferred ESM direction.
- `scraped_cache.json` is a generated artifact and must stay ignored.

## Constraints
- New scripts should prefer ESM and predictable CLI flags.
- Generated cache files must be ignored immediately.
- Missing config must fail loudly instead of fabricating success.

## Do
- Touch only the script(s) involved in the current task.
- Validate with the smallest script-specific check that catches the behavior.
- Remove redundant script copies once the migration is safe.
