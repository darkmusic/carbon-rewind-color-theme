import fs from "node:fs";
import path from "node:path";
import type { ColorRoles } from "./types/palette.js";
import {
  listPaletteIds,
  referencePaletteId,
  resolvePalette,
} from "./lib/load-palette.js";
import { normalizeTheme } from "./lib/normalize-keys.js";
import { baselineDir, scaffoldPath, themeOutputPath } from "./lib/paths.js";
import {
  buildReplacementMap,
  replaceColorsDeep,
} from "./lib/replace-colors.js";
import { writeTheme } from "./lib/write-theme.js";
import type { ThemeJson } from "./types/theme.js";

function loadScaffold(scaffold: string): ThemeJson {
  const filePath = scaffoldPath(scaffold);
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as ThemeJson;
}

function loadBaselineRoles(referenceId: string): ColorRoles {
  const filePath = path.join(baselineDir, `${referenceId}.json`);
  const palette = JSON.parse(fs.readFileSync(filePath, "utf8")) as {
    roles: ColorRoles;
  };
  return palette.roles;
}

function generateTheme(paletteId: string): void {
  const palette = resolvePalette(paletteId);

  if (palette.publish === false) {
    console.log(`Skipping ${paletteId} (publish: false)`);
    return;
  }

  const referenceId = referencePaletteId(palette.scaffold);
  const referenceRoles = loadBaselineRoles(referenceId);
  const scaffold = loadScaffold(palette.scaffold);

  const replacementMap = buildReplacementMap(referenceRoles, palette.roles);
  const directReplacements = palette.replacements ?? {};

  const generated = replaceColorsDeep(
    structuredClone(scaffold),
    replacementMap,
    directReplacements,
  );

  generated.name = palette.label;

  const normalized = normalizeTheme(generated);
  const outputPath = themeOutputPath(palette.id);

  writeTheme(outputPath, normalized);
  console.log(`Generated ${outputPath}`);
}

function main(): void {
  const filter = process.argv[2];
  const paletteIds = listPaletteIds().filter((id) => !filter || id === filter);

  if (filter && paletteIds.length === 0) {
    console.error(`Palette not found: ${filter}`);
    process.exit(1);
  }

  for (const id of paletteIds) {
    generateTheme(id);
  }
}

main();
