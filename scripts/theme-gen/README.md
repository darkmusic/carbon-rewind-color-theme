# Theme generation

TypeScript tooling for generating VS Code theme JSON from palette definitions.

## Layout

- `themes/_scaffold/` — base theme structure (UI keys + token scopes)
- `themes/_palettes/` — per-theme color role maps
- `scripts/theme-gen/` — generator, validator, helpers

## Workflow

```bash
# After editing scaffolds or palettes:
npm run theme:all          # typecheck + generate + validate

# Bootstrap baseline + working palettes from scaffolds (overwrites both):
npm run theme:extract-palette

# Apply planned nudges to working palettes (baseline stays unchanged):
npm run theme:patch-palettes

# Regenerate new-theme palette files from maya baseline:
npm run theme:create-variants

# Generate a single theme:
npm run theme:generate -- ember
```

Baseline palettes live in `themes/_palettes/_baseline/` and are the immutable reference for color replacement. Working palettes in `themes/_palettes/` are the desired output colors.

## Adding a new theme

1. Add palette overrides in `create-variants.ts` (or hand-author `themes/_palettes/{id}.json` using maya role keys).
2. Register the theme in `package.json` → `contributes.themes`.
3. Run `npm run theme:all`.
4. Capture a screenshot per `scripts/screenshots/CAPTURE.md`.

Palette roles use keys like `c_e6b450` mapping to 6-digit hex bases. Alpha suffixes in scaffolds (`#e6b45033`) are preserved automatically during replacement.
