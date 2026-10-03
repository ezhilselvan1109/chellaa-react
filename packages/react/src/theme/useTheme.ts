"use client";

import * as React from "react";
import { ThemeContext, type ThemeContextValue } from "./ThemeProvider";

/**
 * Accesses the active theme context, allowing components to read and update
 * the current theme mode (`light`, `dark`, `system`), resolved theme, and system preference.
 */
export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used within a <ThemeProvider>. Wrap your application root in <ThemeProvider>.",
    );
  }

  return context;
}
