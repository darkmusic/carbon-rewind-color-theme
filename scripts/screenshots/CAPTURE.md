# Theme Screenshot Capture Guide

Use this guide to capture consistent preview images for the README and marketplace.

## Prerequisites

1. Build and install the extension locally:
   ```bash
   npm run theme:all
   npm run vsix
   code --install-extension carbon-rewind-theme-*.vsix
   ```
   Or press **F5** in VS Code/Cursor to launch an Extension Development Host.

2. Open the sample file: [`sample.ts`](sample.ts)

## Window setup

- Resize the editor window to **1280×800** (or keep the same size for every capture).
- Minimap is disabled by extension defaults.
- Use a single editor group (no split panes).
- Hide the terminal and panel for editor-only shots (matches existing README style).

## Capture steps

For each theme below:

1. Open **Command Palette** → **Preferences: Color Theme**
2. Select the theme label
3. Ensure `scripts/screenshots/sample.ts` is the active editor tab
4. Take a screenshot of the editor area
5. Save as the filename listed below into `images/screenshots/`

| Theme label | Output filename |
|-------------|-----------------|
| Carbon Rewind Color Theme | `carbon-color-theme.png` |
| Carbon Rewind Color Theme - Pure | `carbon-color-theme-pure.png` |
| Carbon Rewind Color Theme - Winter | `carbon-color-theme-winter.png` |
| Carbon Rewind Color Theme - Maya | `carbon-color-theme-maya.png` |
| Carbon Rewind Color Theme - Maya Black | `carbon-color-theme-maya-black.png` |
| Carbon Rewind Color Theme - Ember | `carbon-color-theme-ember.png` |
| Carbon Rewind Color Theme - Moss | `carbon-color-theme-moss.png` |
| Carbon Rewind Color Theme - Dusk | `carbon-color-theme-dusk.png` |
| Carbon Rewind Color Theme - Obsidian | `carbon-color-theme-obsidian.png` |
| Carbon Rewind Color Theme - Aurora | `carbon-color-theme-aurora.png` |

## After capturing

Commit the PNG files under `images/screenshots/`. The README already references these paths.

## Optional: terminal panel shot

For a second pass, open the integrated terminal with:

```bash
echo -e "\033[31mred\033[32mgreen\033[33myellow\033[34mblue\033[35mmagenta\033[36mcyan\033[0m"
```

Capture with the terminal visible to verify ANSI colors per theme.
