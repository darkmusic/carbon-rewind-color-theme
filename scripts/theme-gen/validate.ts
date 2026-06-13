import fs from "node:fs";
import path from "node:path";
import { listPaletteIds, resolvePalette } from "./lib/load-palette.js";
import { repoRoot, themeOutputPath, themesDir } from "./lib/paths.js";
import type { ThemeJson } from "./types/theme.js";

const DEPRECATED_COLOR_KEYS = [
  "editorIndentGuide.activeBackground",
  "quickInput.list.focusBackground",
  "notification.background",
];

const REQUIRED_THEME_KEYS = ["name", "type", "colors", "tokenColors"] as const;

function readPackageThemes(): Array<{ label: string; path: string }> {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"),
  ) as {
    contributes?: { themes?: Array<{ label: string; path: string }> };
  };

  return pkg.contributes?.themes ?? [];
}

function validateThemeFile(filePath: string, errors: string[]): void {
  let theme: ThemeJson;

  try {
    theme = JSON.parse(fs.readFileSync(filePath, "utf8")) as ThemeJson;
  } catch (error) {
    errors.push(`${filePath}: invalid JSON (${String(error)})`);
    return;
  }

  for (const key of REQUIRED_THEME_KEYS) {
    if (!(key in theme)) {
      errors.push(`${filePath}: missing required key "${key}"`);
    }
  }

  for (const deprecatedKey of DEPRECATED_COLOR_KEYS) {
    if (deprecatedKey in theme.colors) {
      errors.push(`${filePath}: deprecated color key "${deprecatedKey}"`);
    }
  }

  const rootToken = theme.tokenColors[0];
  if (rootToken?.settings.background) {
    errors.push(`${filePath}: root token rule must not set background`);
  }

  for (const rule of theme.tokenColors) {
    if (rule.settings.fontStyle === "none") {
      errors.push(`${filePath}: token rule uses deprecated fontStyle "none"`);
    }

    const scope = rule.scope;
    const isInvalidScope =
      scope === "invalid" ||
      scope === "invalid.deprecated" ||
      (Array.isArray(scope) &&
        scope.some((item) => item === "invalid" || item === "invalid.deprecated"));

    if (isInvalidScope && rule.settings.background) {
      errors.push(`${filePath}: invalid scope must not set background`);
    }
  }
}

function main(): void {
  const errors: string[] = [];

  const themeFiles = fs
    .readdirSync(themesDir)
    .filter(
      (name) =>
        name.startsWith("CarbonRewind-") &&
        name.endsWith("-theme.json") &&
        !name.includes("_"),
    )
    .map((name) => path.join(themesDir, name));

  for (const filePath of themeFiles) {
    validateThemeFile(filePath, errors);
  }

  const packageThemes = readPackageThemes();
  const packagePaths = new Set(
    packageThemes.map((entry) => path.resolve(repoRoot, entry.path)),
  );

  for (const filePath of themeFiles) {
    if (!packagePaths.has(path.resolve(filePath))) {
      errors.push(`${filePath}: not registered in package.json contributes.themes`);
    }
  }

  for (const entry of packageThemes) {
    const absolute = path.resolve(repoRoot, entry.path);
    if (!fs.existsSync(absolute)) {
      errors.push(`package.json theme missing file: ${entry.path}`);
    }
  }

  for (const paletteId of listPaletteIds()) {
    const palette = resolvePalette(paletteId);
    if (palette.publish === false) {
      continue;
    }

    const expected = themeOutputPath(palette.id);
    if (!fs.existsSync(expected)) {
      errors.push(`Palette "${paletteId}" expects generated file ${expected}`);
    }
  }

  if (errors.length > 0) {
    console.error("Theme validation failed:\n");
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }

  console.log(`Validated ${themeFiles.length} theme files and ${listPaletteIds().length} palettes.`);
}

main();
