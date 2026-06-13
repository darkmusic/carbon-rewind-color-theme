import type { ThemeJson, TokenColorRule } from "../types/theme.js";

const KEY_RENAMES: Record<string, string> = {
  "editorIndentGuide.activeBackground": "editorIndentGuide.activeBackground1",
  "editorIndentGuide.background": "editorIndentGuide.background1",
  "quickInput.list.focusBackground": "quickInputList.focusBackground",
};

const DEPRECATED_KEYS = new Set([
  "notification.background",
  "welcomePage.buttonHoverBackground",
  "welcomePage.buttonBackground",
]);

function normalizeTokenRule(rule: TokenColorRule): TokenColorRule {
  const settings = { ...rule.settings };

  if (settings.fontStyle === "none") {
    settings.fontStyle = "";
  }

  if (rule.scope === "invalid" || rule.scope === "invalid.deprecated") {
    delete settings.background;
  }

  return { ...rule, settings };
}

export function normalizeTheme(theme: ThemeJson): ThemeJson {
  const colors: Record<string, string> = {};

  for (const [key, value] of Object.entries(theme.colors)) {
    if (DEPRECATED_KEYS.has(key)) {
      continue;
    }
    const renamed = KEY_RENAMES[key] ?? key;
    colors[renamed] = value;
  }

  const tokenColors = theme.tokenColors.map((rule, index) => {
    const normalized = normalizeTokenRule(rule);
    if (index === 0 && normalized.settings.background) {
      const { background: _background, ...rest } = normalized.settings;
      return { ...normalized, settings: rest };
    }
    return normalized;
  });

  return {
    ...theme,
    colors,
    tokenColors,
  };
}
