export interface CustomThemeConfig {
  name: string;
  tokens: Record<string, string>;
}

export interface CustomThemeResult {
  name: string;
  tokens: Record<string, string>;
  cssText: string;
}

/**
 * Creates a structured custom theme definition and compiles it to valid CSS custom property text.
 *
 * @example
 * const emeraldTheme = createTheme({
 *   name: 'emerald',
 *   tokens: {
 *     '--cl-color-primary-base': '#059669',
 *     '--cl-color-primary-hover': '#047857',
 *   }
 * });
 */
export function createTheme(config: CustomThemeConfig): CustomThemeResult {
  const { name, tokens } = config;

  const declarations = Object.entries(tokens)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join("\n");

  const cssText = `[data-theme="${name}"] {\n${declarations}\n}`;

  return {
    name,
    tokens,
    cssText,
  };
}
