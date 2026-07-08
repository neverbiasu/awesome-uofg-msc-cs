# Course Config Reference

Read this file first when syncing course config.

## Source of truth
- `scripts/complete-scraper.js` -> `COURSES` is the canonical course map.
- `materials/semester-1/` contains the physical directories that must match `COURSES[*].localPath`.
- `copilot-instructions.md` documents the derived directory names and must stay aligned.

## Known gotcha
- `COMPSCI5092` uses `research-professional-skills` as the real directory name. Do not recreate the old `COMPSCI5092-research-professional-skills` alias.

## Do
- Compare only the affected course entry and its matching folder.
- Update the three sources in one change.
- Re-run the sync check after every rename or move.
