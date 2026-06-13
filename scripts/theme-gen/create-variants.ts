import fs from "node:fs";
import path from "node:path";
import type { PaletteDefinition } from "./types/palette.js";
import { baselineDir, palettesDir } from "./lib/paths.js";

function loadBaselineMaya(): PaletteDefinition {
  return JSON.parse(
    fs.readFileSync(path.join(baselineDir, "maya.json"), "utf8"),
  ) as PaletteDefinition;
}

function writePalette(palette: PaletteDefinition): void {
  fs.writeFileSync(
    path.join(palettesDir, `${palette.id}.json`),
    `${JSON.stringify(palette, null, 2)}\n`,
    "utf8",
  );
}

function cloneRoles(source: PaletteDefinition): Record<string, string> {
  return { ...source.roles };
}

type VariantSpec = {
  id: string;
  label: string;
  scaffold?: PaletteDefinition["scaffold"];
  overrides: Record<string, string>;
};

const variants: VariantSpec[] = [
  {
    id: "ember",
    label: "Carbon Rewind Color Theme - Ember",
    overrides: {
      c_0b0e14: "#110c0a",
      c_0d1017: "#1a1210",
      c_0f131a: "#160f0d",
      c_11151c: "#241815",
      c_131721: "#1a1210",
      c_e6b450: "#e8654a",
      c_e1af4b: "#d85a3f",
      c_ff8f40: "#ff7e6b",
      c_f29668: "#e07a55",
      c_ffb454: "#f0a878",
      c_aad94c: "#f0a878",
      c_f07178: "#ff8a7a",
      c_f26d78: "#e85545",
      c_d95757: "#e85545",
      c_ea6c73: "#e85545",
      c_39bae6: "#f2b8c6",
      c_59c2ff: "#ffb4a0",
      c_73b8ff: "#ff9a80",
      c_409fff: "#e8654a",
      c_7fd962: "#c9e894",
      c_95e6cb: "#f0c8a8",
      c_d2a6ff: "#f2b8c6",
      c_acb6bf: "#8a6a60",
      c_565b66: "#7a6058",
      c_6c7380: "#8a7068",
      c_e06c75: "#ff7e6b",
      c_a28bc0: "#d4a090",
      c_c594c5: "#c98878",
      c_f7ecb5: "#f0d0b0",
      c_e6b673: "#e0a878",
      c_f9af4f: "#f0a878",
      c_53bdfa: "#ff9a80",
      c_cda1fa: "#f2b8c6",
      c_90e1c6: "#f0c8a8",
    },
  },
  {
    id: "moss",
    label: "Carbon Rewind Color Theme - Moss",
    overrides: {
      c_0b0e14: "#0a0f0c",
      c_0d1017: "#0e1511",
      c_0f131a: "#0c1210",
      c_11151c: "#152018",
      c_131721: "#101812",
      c_e6b450: "#5dbd73",
      c_e1af4b: "#52b068",
      c_ff8f40: "#6ec985",
      c_f29668: "#7ec699",
      c_ffb454: "#a8e6a1",
      c_aad94c: "#a8e6a1",
      c_f07178: "#8fd4a0",
      c_f26d78: "#e07070",
      c_d95757: "#d95757",
      c_39bae6: "#7ec699",
      c_59c2ff: "#6dbf8a",
      c_73b8ff: "#5dbd73",
      c_409fff: "#5dbd734d",
      c_7fd962: "#7fd962",
      c_95e6cb: "#9ad4a8",
      c_d2a6ff: "#c9e894",
      c_acb6bf: "#6b8f71",
      c_565b66: "#5a7560",
      c_6c7380: "#6b8f71",
      c_e06c75: "#6ec985",
      c_a28bc0: "#8ec9a0",
      c_c594c5: "#7ec699",
      c_f7ecb5: "#c9e894",
      c_e6b673: "#a8e6a1",
      c_f9af4f: "#c9e894",
      c_53bdfa: "#5dbd73",
      c_cda1fa: "#a8e6a1",
      c_90e1c6: "#9ad4a8",
      c_475266: "#3a5540",
      c_5f4c72: "#3a5540",
      c_6c5980: "#4a6850",
    },
  },
  {
    id: "dusk",
    label: "Carbon Rewind Color Theme - Dusk",
    overrides: {
      c_0b0e14: "#0e0a14",
      c_0d1017: "#120d18",
      c_0f131a: "#110c17",
      c_11151c: "#1a1424",
      c_131721: "#15101e",
      c_e6b450: "#9d7cff",
      c_e1af4b: "#8f6ef0",
      c_ff8f40: "#b794f6",
      c_f29668: "#c4a8ff",
      c_ffb454: "#e2b0ff",
      c_aad94c: "#c4a8ff",
      c_f07178: "#ffb4e6",
      c_f26d78: "#f26d78",
      c_d95757: "#d95757",
      c_39bae6: "#c4a8ff",
      c_59c2ff: "#a78bfa",
      c_73b8ff: "#9d7cff",
      c_409fff: "#9d7cff4d",
      c_7fd962: "#b794f6",
      c_95e6cb: "#d8b4fe",
      c_d2a6ff: "#ffb4e6",
      c_acb6bf: "#7a7090",
      c_565b66: "#6a6080",
      c_6c7380: "#7a7090",
      c_e06c75: "#e2b0ff",
      c_a28bc0: "#d8b4fe",
      c_c594c5: "#c4a8ff",
      c_f7ecb5: "#e9d5ff",
      c_e6b673: "#d8b4fe",
      c_f9af4f: "#e2b0ff",
      c_53bdfa: "#9d7cff",
      c_cda1fa: "#d8b4fe",
      c_90e1c6: "#d8b4fe",
      c_475266: "#4a3a60",
      c_5f4c72: "#5a4080",
      c_6c5980: "#6b5090",
    },
  },
  {
    id: "obsidian",
    label: "Carbon Rewind Color Theme - Obsidian",
    overrides: {
      c_0b0e14: "#101418",
      c_0d1017: "#141920",
      c_0f131a: "#12161c",
      c_11151c: "#1a2028",
      c_131721: "#161b22",
      c_e6b450: "#56c2c2",
      c_e1af4b: "#4db8b8",
      c_ff8f40: "#6ec9c9",
      c_f29668: "#8fd4c8",
      c_ffb454: "#d4a843",
      c_aad94c: "#8fd4c8",
      c_f07178: "#a0c8c0",
      c_f26d78: "#e07070",
      c_d95757: "#d95757",
      c_39bae6: "#8fd4c8",
      c_59c2ff: "#56c2c2",
      c_73b8ff: "#56c2c2",
      c_409fff: "#56c2c24d",
      c_7fd962: "#7fd962",
      c_95e6cb: "#8fd4c8",
      c_d2a6ff: "#d4a843",
      c_acb6bf: "#708090",
      c_565b66: "#8899aa",
      c_6c7380: "#708090",
      c_bfbdb6: "#b0bec5",
      c_e06c75: "#8fd4c8",
      c_a28bc0: "#a0b8c0",
      c_c594c5: "#8fd4c8",
      c_f7ecb5: "#d4a843",
      c_e6b673: "#d4a843",
      c_f9af4f: "#d4a843",
      c_53bdfa: "#56c2c2",
      c_cda1fa: "#a0c8c0",
      c_90e1c6: "#8fd4c8",
      c_475266: "#3a4550",
      c_5f4c72: "#3a5050",
      c_6c5980: "#4a6060",
    },
  },
  {
    id: "aurora",
    label: "Carbon Rewind Color Theme - Aurora",
    overrides: {
      c_0b0e14: "#050810",
      c_0d1017: "#0a1018",
      c_0f131a: "#080c14",
      c_11151c: "#101828",
      c_131721: "#0c1018",
      c_e6b450: "#6ee7b7",
      c_e1af4b: "#5fd9a8",
      c_ff8f40: "#c084fc",
      c_f29668: "#d8a4ff",
      c_ffb454: "#7dd3fc",
      c_aad94c: "#9af0c3",
      c_f07178: "#d8a4ff",
      c_f26d78: "#f26d78",
      c_d95757: "#d95757",
      c_39bae6: "#7dd3fc",
      c_59c2ff: "#6ee7b7",
      c_73b8ff: "#7dd3fc",
      c_409fff: "#6ee7b74d",
      c_7fd962: "#6ee7b7",
      c_95e6cb: "#9af0c3",
      c_d2a6ff: "#d8a4ff",
      c_acb6bf: "#6080a0",
      c_565b66: "#506878",
      c_6c7380: "#6080a0",
      c_e06c75: "#d8a4ff",
      c_a28bc0: "#c084fc",
      c_c594c5: "#9af0c3",
      c_f7ecb5: "#7dd3fc",
      c_e6b673: "#c084fc",
      c_f9af4f: "#7dd3fc",
      c_53bdfa: "#6ee7b7",
      c_cda1fa: "#d8a4ff",
      c_90e1c6: "#9af0c3",
      c_475266: "#203040",
      c_5f4c72: "#304060",
      c_6c5980: "#405080",
    },
  },
];

function main(): void {
  const maya = loadBaselineMaya();

  for (const variant of variants) {
    const roles = cloneRoles(maya);
    for (const [key, value] of Object.entries(variant.overrides)) {
      roles[key] = value;
    }

    const palette: PaletteDefinition = {
      id: variant.id,
      label: variant.label,
      scaffold: variant.scaffold ?? "maya",
      roles,
    };

    writePalette(palette);
    console.log(`Wrote variant palette ${variant.id}`);
  }
}

main();
