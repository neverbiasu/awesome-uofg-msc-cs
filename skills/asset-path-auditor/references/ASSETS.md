# Asset Path Reference

Read this file first when MDX content mentions images.

## Source of truth
- `public/images/` is the only valid storage root for note images.
- MDX references must use `/images/...` paths.

## Constraints
- Keep images week-scoped when the note lives under `week<N>/`.
- Do not use relative paths like `./img/foo.png` in notes.
- Do not leave placeholder or reused images that do not match the week content.

## Do
- Check only the image paths introduced or changed in the current edit.
- Confirm each referenced file exists before finishing.
- Prefer a narrow path check over a full repo scan.
