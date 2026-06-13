import fs from "node:fs";
import path from "node:path";
import type { PaletteDefinition } from "./types/palette.js";
import { baselineDir, palettesDir, scaffoldsDir } from "./lib/paths.js";

const HEX_PATTERN = /#([0-9a-fA-F]{3,8})\b/g;

function toRoleKey(hex: string): string {
  const base = hex.replace(/^#/, "").slice(0, 6).toLowerCase();
  return `c_${base}`;
}

function collectHexBases(content: string): Set<string> {
  const bases = new Set<string>();

  for (const match of content.matchAll(HEX_PATTERN)) {
    const raw = match[1];
    let base = raw;
    if (raw.length === 3) {
      base = `${raw[0]}${raw[0]}${raw[1]}${raw[1]}${raw[2]}${raw[2]}`;
    } else {
      base = raw.slice(0, 6);
    }
    bases.add(`#${base.toLowerCase()}`);
  }

  return bases;
}

function extractPalette(
  id: string,
  label: string,
  scaffold: PaletteDefinition["scaffold"],
  scaffoldFile: string,
): PaletteDefinition {
  const content = fs.readFileSync(path.join(scaffoldsDir, scaffoldFile), "utf8");
  const roles: Record<string, string> = {};

  for (const hex of [...collectHexBases(content)].sort()) {
    roles[toRoleKey(hex)] = hex;
  }

  return { id, label, scaffold, roles };
}

function main(): void {
  const specs: Array<[string, string, PaletteDefinition["scaffold"], string]> = [
    ["maya", "Carbon Rewind Color Theme - Maya", "maya", "maya.json"],
    [
      "maya-black",
      "Carbon Rewind Color Theme - Maya Black",
      "maya",
      "maya-black.json",
    ],
    ["color", "Carbon Rewind Color Theme", "base", "base.json"],
    ["pure", "Carbon Rewind Color Theme - Pure", "pure", "pure.json"],
    ["winter", "Carbon Rewind Color Theme - Winter", "winter", "winter.json"],
  ];

  fs.mkdirSync(baselineDir, { recursive: true });
  fs.mkdirSync(palettesDir, { recursive: true });

  for (const [id, label, scaffold, file] of specs) {
    const palette = extractPalette(id, label, scaffold, file);
    const baselinePath = path.join(baselineDir, `${id}.json`);
    const palettePath = path.join(palettesDir, `${id}.json`);
    const serialized = `${JSON.stringify(palette, null, 2)}\n`;
    fs.writeFileSync(baselinePath, serialized, "utf8");
    fs.writeFileSync(palettePath, serialized, "utf8");
    console.log(`Wrote ${baselinePath} (${Object.keys(palette.roles).length} roles)`);
  }
}

main();
