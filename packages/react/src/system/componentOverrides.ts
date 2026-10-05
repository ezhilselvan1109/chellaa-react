import type { ChellaaTheme } from "../theme/types";

export interface ComponentOverrideOptions {
  name?: string;
  slot?: string;
  overridesResolver?: (
    props: any,
    styles: Record<string, any>
  ) => Record<string, any> | undefined;
}

/**
 * Resolves component-level style overrides defined in theme.components[name].styleOverrides
 * Supports both static style objects and dynamic functions: `({ theme, ownerState }) => ({ ... })`
 */
export function resolveComponentOverrides(
  theme: ChellaaTheme,
  options: ComponentOverrideOptions,
  props: Record<string, any>
): Record<string, any> | undefined {
  const { name, slot = "root", overridesResolver } = options;
  if (!name || !theme.components?.[name]) {
    return undefined;
  }

  const componentConfig = theme.components[name];
  const styleOverrides = componentConfig.styleOverrides;
  if (!styleOverrides) {
    return undefined;
  }

  // If custom overrides resolver is supplied, execute it
  if (overridesResolver) {
    const resolved = overridesResolver(props, styleOverrides);
    if (resolved) return resolved;
  }

  // Fallback to slot-based lookup
  const slotLower = slot.toLowerCase();
  const matchedKey = Object.keys(styleOverrides).find(
    (k) => k.toLowerCase() === slotLower
  );

  if (matchedKey) {
    const override = styleOverrides[matchedKey];
    if (typeof override === "function") {
      return override({ theme, ownerState: props.ownerState ?? props });
    }
    return override;
  }

  return undefined;
}
