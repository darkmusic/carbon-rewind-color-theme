export type TokenColorSettings = {
  foreground?: string;
  background?: string;
  fontStyle?: string;
};

export type TokenColorRule = {
  name?: string;
  scope?: string | string[];
  settings: TokenColorSettings;
};

export type ThemeJson = {
  name: string;
  type: "dark" | "light";
  colors: Record<string, string>;
  tokenColors: TokenColorRule[];
  semanticHighlighting?: boolean;
  semanticTokenColors?: Record<string, string>;
};
