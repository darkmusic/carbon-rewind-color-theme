import fs from "node:fs";
import path from "node:path";
import type { PaletteDefinition } from "./types/palette.js";
import { palettesDir } from "./lib/paths.js";

function loadPalette(id: string): PaletteDefinition {
  return JSON.parse(
    fs.readFileSync(path.join(palettesDir, `${id}.json`), "utf8"),
  ) as PaletteDefinition;
}

function patchPalette(id: string, overrides: Record<string, string>): void {
  const palette = loadPalette(id);
  palette.roles = { ...palette.roles, ...overrides };
  fs.writeFileSync(
    path.join(palettesDir, `${id}.json`),
    `${JSON.stringify(palette, null, 2)}\n`,
    "utf8",
  );
  console.log(`Patched ${id}`);
}

patchPalette("maya", {
  c_131721: "#111620",
  c_acb6bf: "#9aa3ac",
});

patchPalette("maya-black", {
  c_0b0e14: "#010308",
  c_131721: "#111620",
  c_acb6bf: "#9aa3ac",
});

patchPalette("color", {
  c_219fd5: "#1eb8c8",
  c_10161c: "#0e1419",
  c_528bff: "#1eb8c8",
});

patchPalette("pure", {
  c_d39e17: "#e0a820",
  c_9aa1ac: "#a3aebb",
  c_1b1d22: "#1a1e24",
});

patchPalette("winter", {
  c_219fd5: "#2aabdc",
  c_6dbdfa: "#2aabdc",
  c_03648a: "#1a8ab8",
});
