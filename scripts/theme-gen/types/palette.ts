export type ScaffoldId = "maya" | "base" | "pure" | "winter";

export type ColorRoles = Record<string, string>;

export type PaletteDefinition = {
  id: string;
  label: string;
  scaffold: ScaffoldId;
  extends?: string;
  publish?: boolean;
  roles: ColorRoles;
  replacements?: Record<string, string>;
};

export type PaletteFile = PaletteDefinition;
