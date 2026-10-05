export {
  ThemeProvider,
  type ThemeProviderProps,
  type ThemeMode,
  type ThemeContextValue,
} from "./ThemeProvider";

export { useTheme, type ExtendedThemeContextValue } from "./useTheme";

export {
  createTheme,
  defaultTheme,
  defaultDarkTheme,
} from "./createTheme";

export { createShadows, defaultShadows } from "./shadows";
export { createSpacing, defaultSpacing } from "./spacing";
export {
  createBreakpoints,
  defaultBreakpoints,
  breakpointKeys,
} from "./breakpoints";
export {
  createPalette,
  lightPalette,
  darkPalette,
} from "./palette";
export { defaultTypography } from "./typography";
export { defaultTransitions } from "./transitions";
export { defaultZIndex } from "./zIndex";

export { ThemeScript, type ThemeScriptProps } from "./ThemeScript";

export type {
  ChellaaTheme,
  ThemeOptions,
  ColorMode,
  Palette,
  PaletteColor,
  TypeText,
  TypeBackground,
  TypeAction,
  Breakpoints,
  BreakpointKey,
  TypographyTheme,
  TypographyVariant,
  TypographyStyle,
  Transitions,
  ZIndex,
  ComponentOverride,
  DeepPartial,
} from "./types";
