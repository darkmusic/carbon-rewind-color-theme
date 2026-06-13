import fs from "node:fs";
import path from "node:path";
import type { PaletteDefinition, ScaffoldId } from "../types/palette.js";
import { palettesDir } from "./paths.js";

function isScaffoldId(value: string): value is ScaffoldId {
  return value === "maya" || value === "base" || value === "pure" || value === "winter";
}

export function loadPaletteFile(filePath: string): PaletteDefinition {
  const raw = JSON.parse(fs.readFileSync(filePath, "utf8")) as PaletteDefinition;

  if (!raw.id || !raw.label || !raw.scaffold || !raw.roles) {
    throw new Error(`Invalid palette file: ${filePath}`);
  }

  if (!isScaffoldId(raw.scaffold)) {
    throw new Error(`Unknown scaffold "${raw.scaffold}" in ${filePath}`);
  }

  return raw;
}

export function resolvePalette(id: string): PaletteDefinition {
  const filePath = path.join(palettesDir, `${id}.json`);
  const palette = loadPaletteFile(filePath);

  if (!palette.extends) {
    return palette;
  }

  const parent = resolvePalette(palette.extends);
  return {
    ...parent,
    ...palette,
    id: palette.id,
    label: palette.label,
    roles: { ...parent.roles, ...palette.roles },
    replacements: { ...parent.replacements, ...palette.replacements },
  };
}

export function listPaletteIds(): string[] {
  return fs
    .readdirSync(palettesDir)
    .filter(
      (name) =>
        name.endsWith(".json") &&
        !name.startsWith("_"),
    )
    .map((name) => name.replace(/\.json$/, ""))
    .sort();
}

export function referencePaletteId(scaffold: ScaffoldId): string {
  switch (scaffold) {
    case "maya":
      return "maya";
    case "base":
      return "color";
    case "pure":
      return "pure";
    case "winter":
      return "winter";
    default: {
      const _exhaustive: never = scaffold;
      return _exhaustive;
    }
  }
}
