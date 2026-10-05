import type { BreakpointKey, ChellaaTheme } from "../theme/types";
import { breakpointKeys } from "../theme/breakpoints";
import { defaultTheme } from "../theme/createTheme";
import type { SxProps, SxObject } from "./types";

const spacingProperties: Record<string, string[]> = {
  m: ["margin"],
  margin: ["margin"],
  mt: ["marginTop"],
  marginTop: ["marginTop"],
  mr: ["marginRight"],
  marginRight: ["marginRight"],
  mb: ["marginBottom"],
  marginBottom: ["marginBottom"],
  ml: ["marginLeft"],
  marginLeft: ["marginLeft"],
  mx: ["marginInline"],
  marginInline: ["marginInline"],
  my: ["marginBlock"],
  marginBlock: ["marginBlock"],

  p: ["padding"],
  padding: ["padding"],
  pt: ["paddingTop"],
  paddingTop: ["paddingTop"],
  pr: ["paddingRight"],
  paddingRight: ["paddingRight"],
  pb: ["paddingBottom"],
  paddingBottom: ["paddingBottom"],
  pl: ["paddingLeft"],
  paddingLeft: ["paddingLeft"],
  px: ["paddingInline"],
  paddingInline: ["paddingInline"],
  py: ["paddingBlock"],
  paddingBlock: ["paddingBlock"],

  gap: ["gap"],
  rowGap: ["rowGap"],
  columnGap: ["columnGap"],
};

/**
 * Resolves nested property path in theme palette (e.g. 'primary.main', 'text.secondary')
 */
function resolvePalettePath(palette: ChellaaTheme["palette"], path: string): string | undefined {
  if (!path || typeof path !== "string") return undefined;
  const parts = path.split(".");
  let current: any = palette;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}

/**
 * Resolves color values against theme palette
 */
function resolveColor(theme: ChellaaTheme, value: any): any {
  if (typeof value !== "string") return value;
  const resolved = resolvePalettePath(theme.palette, value);
  return resolved ?? value;
}

/**
 * Resolves z-index token names against theme.zIndex
 */
function resolveZIndex(theme: ChellaaTheme, value: any): any {
  if (typeof value === "string" && value in theme.zIndex) {
    return theme.zIndex[value as keyof typeof theme.zIndex];
  }
  return value;
}

/**
 * Resolves a single CSS property name and value into one or more CSS declarations
 */
function resolveSingleProperty(
  theme: ChellaaTheme,
  prop: string,
  value: any
): Record<string, any> {
  if (value === undefined || value === null) return {};

  // 1. Spacing properties
  if (prop in spacingProperties) {
    const cssProps = spacingProperties[prop]!;
    const formatted = typeof value === "number" ? theme.spacing(value) : value;
    const result: Record<string, any> = {};
    for (const cssProp of cssProps) {
      result[cssProp] = formatted;
    }
    return result;
  }

  // 2. Background color shorthand
  if (prop === "bgcolor") {
    return { backgroundColor: resolveColor(theme, value) };
  }

  // 3. Color properties
  if (
    prop === "color" ||
    prop === "backgroundColor" ||
    prop === "borderColor" ||
    prop === "outlineColor"
  ) {
    return { [prop]: resolveColor(theme, value) };
  }

  // 4. Elevation / BoxShadow
  if (prop === "elevation") {
    if (typeof value === "number" && theme.shadows[value]) {
      return { boxShadow: theme.shadows[value] };
    }
    return {};
  }
  if (prop === "boxShadow") {
    if (typeof value === "number" && theme.shadows[value]) {
      return { boxShadow: theme.shadows[value] };
    }
    return { boxShadow: value };
  }

  // 5. Border radius
  if (prop === "borderRadius") {
    if (typeof value === "number") {
      const radius = theme.shape?.borderRadius ?? 4;
      return { borderRadius: `${value * radius}px` };
    }
    return { borderRadius: value };
  }

  // 6. Z-Index
  if (prop === "zIndex") {
    return { zIndex: resolveZIndex(theme, value) };
  }

  // 7. Standard CSS Property pass-through
  return { [prop]: value };
}

function isObject(val: any): val is Record<string, any> {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

/**
 * Checks if a value is responsive (either an array or breakpoint keyed object)
 */
function isResponsiveValue(val: any): boolean {
  if (Array.isArray(val)) return true;
  if (isObject(val)) {
    return Object.keys(val).some((k) => breakpointKeys.includes(k as BreakpointKey));
  }
  return false;
}

/**
 * Parses an individual SxObject with the current theme
 */
function parseSxObject(
  theme: ChellaaTheme,
  sxObject: SxObject
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(sxObject)) {
    if (value === undefined || value === null) continue;

    // Handle nested selectors / media queries (&:hover, @media, etc.)
    if (key.startsWith("&") || key.startsWith("@") || key.startsWith(".")) {
      if (typeof value === "function") {
        result[key] = parseSxObject(theme, value(theme));
      } else if (isObject(value)) {
        result[key] = parseSxObject(theme, value as SxObject);
      }
      continue;
    }

    // Handle responsive values: array syntax [val1, val2, val3]
    if (Array.isArray(value)) {
      value.forEach((bpVal, index) => {
        if (bpVal === undefined || bpVal === null) return;
        const bpKey = breakpointKeys[index];
        if (!bpKey) return;

        const resolved = resolveSingleProperty(theme, key, bpVal);
        if (bpKey === "xs") {
          Object.assign(result, resolved);
        } else {
          const media = theme.breakpoints.up(bpKey);
          result[media] = {
            ...(result[media] || {}),
            ...resolved,
          };
        }
      });
      continue;
    }

    // Handle responsive values: object syntax { xs: val1, md: val2 }
    if (isResponsiveValue(value)) {
      const respObj = value as Partial<Record<BreakpointKey, any>>;
      for (const [bpKey, bpVal] of Object.entries(respObj)) {
        if (bpVal === undefined || bpVal === null) continue;

        const resolved = resolveSingleProperty(theme, key, bpVal);
        if (bpKey === "xs") {
          Object.assign(result, resolved);
        } else if (breakpointKeys.includes(bpKey as BreakpointKey)) {
          const media = theme.breakpoints.up(bpKey as BreakpointKey);
          result[media] = {
            ...(result[media] || {}),
            ...resolved,
          };
        }
      }
      continue;
    }

    // Handle nested sub-object that is not a selector or responsive breakpoint
    if (isObject(value)) {
      result[key] = parseSxObject(theme, value as SxObject);
      continue;
    }

    // Standard single property resolution
    const resolved = resolveSingleProperty(theme, key, value);
    Object.assign(result, resolved);
  }

  return result;
}

/**
 * Core responsive `sx` parser function.
 * Evaluates `sx` prop against current theme, expanding:
 * - Theme spacing shortcuts (m, p, mx, my, px, py, etc.)
 * - Theme palette tokens (color, bgcolor: 'primary.main', 'text.secondary')
 * - Elevation shadows (elevation: 0..24, boxShadow: 0..24)
 * - Breakpoint responsive arrays ([1, 2, 4]) and objects ({ xs: 1, md: 4 })
 * - Pseudo-classes (&:hover, &:focus) and nested selectors
 * - Theme function callbacks: `(theme) => ({ ... })`
 * - Array of sx items: `[sx1, condition && sx2, (theme) => sx3]`
 */
export function parseSx(
  themeInput?: ChellaaTheme,
  sx?: SxProps
): Record<string, any> {
  if (!sx) return {};
  const theme =
    themeInput && typeof themeInput.spacing === "function"
      ? themeInput
      : defaultTheme;

  // If sx is a function, execute with theme
  if (typeof sx === "function") {
    return parseSxObject(theme, sx(theme));
  }

  // If sx is an array, merge in sequence
  if (Array.isArray(sx)) {
    return sx.reduce<Record<string, any>>((acc, item) => {
      if (!item) return acc;
      const parsed = parseSx(theme, item);
      return deepMergeStyles(acc, parsed);
    }, {});
  }

  // Object sx
  if (isObject(sx)) {
    return parseSxObject(theme, sx);
  }

  return {};
}

/**
 * Deep merge utility for style objects to safely merge nested media queries and selectors
 */
function deepMergeStyles(
  target: Record<string, any>,
  source: Record<string, any>
): Record<string, any> {
  const result: Record<string, any> = { ...target };

  for (const [key, value] of Object.entries(source)) {
    if (
      isObject(value) &&
      isObject(result[key]) &&
      !Array.isArray(value) &&
      !Array.isArray(result[key])
    ) {
      result[key] = deepMergeStyles(result[key], value);
    } else {
      result[key] = value;
    }
  }

  return result;
}
