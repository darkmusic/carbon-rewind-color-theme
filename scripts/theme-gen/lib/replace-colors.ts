import type { ColorRoles } from "../types/palette.js";

const HEX_PATTERN = /#([0-9a-fA-F]{3,8})\b/g;

function normalizeHex(hex: string): string {
  const raw = hex.startsWith("#") ? hex.slice(1) : hex;
  if (raw.length === 3) {
    return `#${raw[0]}${raw[0]}${raw[1]}${raw[1]}${raw[2]}${raw[2]}`.toLowerCase();
  }
  return `#${raw.slice(0, 6).toLowerCase()}`;
}

function splitHex(hex: string): { base: string; alpha: string } {
  const raw = hex.startsWith("#") ? hex.slice(1) : hex;
  if (raw.length === 3) {
    const base = normalizeHex(hex);
    return { base, alpha: "" };
  }
  if (raw.length <= 6) {
    return { base: `#${raw.slice(0, 6).toLowerCase()}`, alpha: "" };
  }
  return {
    base: `#${raw.slice(0, 6).toLowerCase()}`,
    alpha: raw.slice(6).toLowerCase(),
  };
}

export function buildReplacementMap(
  referenceRoles: ColorRoles,
  targetRoles: ColorRoles,
): Map<string, string> {
  const map = new Map<string, string>();

  for (const [role, referenceHex] of Object.entries(referenceRoles)) {
    const targetHex = targetRoles[role];
    if (!targetHex) {
      continue;
    }
    const refBase = splitHex(referenceHex).base;
    const targetBase = splitHex(targetHex).base;
    if (refBase !== targetBase) {
      map.set(refBase, targetBase);
    }
  }

  return map;
}

export function replaceHexInString(
  value: string,
  replacementMap: Map<string, string>,
): string {
  return value.replace(HEX_PATTERN, (match) => {
    const { base, alpha } = splitHex(match);
    const replacement = replacementMap.get(base);
    if (!replacement) {
      return match;
    }
    return alpha ? `${replacement}${alpha}` : replacement;
  });
}

export function replaceColorsDeep<T>(
  value: T,
  replacementMap: Map<string, string>,
  directReplacements: Record<string, string>,
): T {
  if (typeof value === "string") {
    let result = replaceHexInString(value, replacementMap);
    for (const [from, to] of Object.entries(directReplacements)) {
      const fromBase = splitHex(from).base;
      const toBase = splitHex(to).base;
      if (result.toLowerCase() === from.toLowerCase()) {
        result = to;
      } else if (result.toLowerCase().startsWith(fromBase)) {
        const suffix = result.slice(fromBase.length);
        result = `${toBase}${suffix}`;
      }
    }
    return result as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) =>
      replaceColorsDeep(item, replacementMap, directReplacements),
    ) as T;
  }

  if (value !== null && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value)) {
      result[key] = replaceColorsDeep(nested, replacementMap, directReplacements);
    }
    return result as T;
  }

  return value;
}
