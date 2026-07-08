# Bilingual Mirror Reference

Read this file first when editing notes in `notes/en/` or `notes/zh/`.

## Source of truth
- `notes/en/` is the structure template.
- `notes/zh/` must mirror the English tree exactly.

## Constraints
- Keep filenames identical across languages.
- Keep folder depth and file counts identical.
- Chinese headings should not contain untranslated English words unless they are proper nouns or code identifiers.
- Cross-page links should use the language-aware `/notes/...` route pattern.

## Do
- Compare only the specific week or course subtree you touched.
- Validate structure with a directory diff.
- Spot-check titles after the structural check passes.
