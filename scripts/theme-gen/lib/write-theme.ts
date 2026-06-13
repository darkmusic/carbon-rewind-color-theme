import fs from "node:fs";
import type { ThemeJson } from "../types/theme.js";

export function sortColors(colors: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(colors).sort(([a], [b]) => a.localeCompare(b)),
  );
}

export function serializeTheme(theme: ThemeJson): string {
  const sorted: ThemeJson = {
    ...theme,
    colors: sortColors(theme.colors),
  };
  return `${JSON.stringify(sorted, null, 2)}\n`;
}

export function writeTheme(filePath: string, theme: ThemeJson): void {
  fs.writeFileSync(filePath, serializeTheme(theme), "utf8");
}
