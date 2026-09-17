import { useContext } from "react";
import { ThemeContext } from "./ChellaProvider";
import type { ThemeContextValue } from "./ThemeProvider.types";

/**
 * Hook to access and control the current Chella UI theme mode.
 *
 * @example
 * ```tsx
 * const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ChellaProvider />");
  }
  return context;
}
