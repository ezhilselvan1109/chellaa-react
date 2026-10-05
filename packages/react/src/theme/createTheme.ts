import { ChellaaTheme, ThemeOptions, ColorMode } from "./types";
import { createPalette } from "./palette";
import { defaultTypography } from "./typography";
import { defaultSpacing } from "./spacing";
import { defaultBreakpoints, createBreakpoints } from "./breakpoints";
import { defaultShadows } from "./shadows";
import { defaultTransitions } from "./transitions";
import { defaultZIndex } from "./zIndex";

/**
 * Deep merge utility for theme options
 */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === "object" && !Array.isArray(item);
}

function deepMerge(target: any, source: any): any {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

/**
 * Creates a Chellaa Material Theme with 24-level elevation shadows,
 * 8px spacing, and complete Google Material 3 design tokens.
 *
 * @example
 * const theme = createTheme({
 *   palette: {
 *     mode: 'dark',
 *     primary: { main: '#6366f1' }
 *   },
 *   shape: { borderRadius: 8 }
 * });
 */
export function createTheme(options: ThemeOptions = {}): ChellaaTheme {
  const mode: ColorMode = options.palette?.mode ?? "light";
  const basePalette = createPalette(mode);

  const mergedPalette = options.palette
    ? deepMerge(basePalette, options.palette)
    : basePalette;

  const mergedTypography = options.typography
    ? deepMerge(defaultTypography, options.typography)
    : defaultTypography;

  const mergedBreakpoints = options.breakpoints?.values
    ? createBreakpoints(options.breakpoints.values as any)
    : defaultBreakpoints;

  const spacing =
    typeof options.spacing === "function"
      ? (options.spacing as any)
      : defaultSpacing;

  const shape = {
    borderRadius: options.shape?.borderRadius ?? 4,
  };

  const shadows = (options.shadows as string[]) ?? defaultShadows;
  const transitions = options.transitions
    ? deepMerge(defaultTransitions, options.transitions)
    : defaultTransitions;
  const zIndex = options.zIndex
    ? deepMerge(defaultZIndex, options.zIndex)
    : defaultZIndex;

  return {
    palette: mergedPalette,
    typography: mergedTypography,
    spacing,
    shape,
    breakpoints: mergedBreakpoints,
    shadows,
    transitions,
    zIndex,
    components: (options.components as any) ?? {},
  };
}

export const defaultTheme = createTheme({ palette: { mode: "light" } });
export const defaultDarkTheme = createTheme({ palette: { mode: "dark" } });
