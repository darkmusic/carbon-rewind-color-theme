// Carbon Rewind theme screenshot sample
// Open this file when capturing theme previews (see scripts/screenshots/CAPTURE.md)

/** Greets a user by name. */
export function greet(name: string): string {
  // Inline comment for muted tone check
  const message = `Hello, ${name}!`;
  return message;
}

export class ThemePreview {
  readonly id: number;
  private enabled = true;

  constructor(id: number) {
    this.id = id;
  }

  /** Toggle preview state. */
  toggle(): boolean {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

const keywords = ["dark", "carbon", "rewind"] as const;
const total = keywords.length + 42;
const ratio = total / 100;

interface PaletteRole {
  accent: string;
  bgPrimary: string;
}

export const palette: PaletteRole = {
  accent: "#e6b450",
  bgPrimary: "#0b0e14",
};

export type ThemeId = (typeof keywords)[number];

// Regex and escape characters: \d+, \n, \t
const pattern = /^[a-z]+$/i;
const escaped = "path\\to\\theme";

/* Block comment: strings, numbers, and operators below */
const sum = 1 + 2 * 3;
const ok = sum > 0 && pattern.test("Ember");

if (!ok) {
  throw new Error("Preview failed");
}

export default greet;
