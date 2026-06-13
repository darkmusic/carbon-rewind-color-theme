import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

export const repoRoot = path.resolve(scriptDir, "../../..");

export const themesDir = path.join(repoRoot, "themes");
export const scaffoldsDir = path.join(themesDir, "_scaffold");
export const palettesDir = path.join(themesDir, "_palettes");
export const baselineDir = path.join(palettesDir, "_baseline");

export function scaffoldPath(scaffold: string): string {
  return path.join(scaffoldsDir, `${scaffold}.json`);
}

export function palettePath(id: string): string {
  return path.join(palettesDir, `${id}.json`);
}

export function themeOutputPath(id: string): string {
  const slug = id === "color" ? "color" : id;
  return path.join(themesDir, `CarbonRewind-${slug}-theme.json`);
}
