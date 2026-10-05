"use client";

import * as React from "react";
import { useTheme as useEmotionTheme } from "@emotion/react";
import { ThemeContext, type ThemeContextValue } from "./ThemeProvider";
import { ChellaaTheme } from "./types";
import { defaultTheme } from "./createTheme";

export interface ExtendedThemeContextValue extends ThemeContextValue {
  /** The active ChellaaTheme object (colors, typography, spacing, shadows) */
  themeObject: ChellaaTheme;
}

/**
 * Accesses the active theme context, allowing components to read and update
 * the current theme mode (`light`, `dark`, `system`), resolved theme, and active ChellaaTheme.
 */
export function useTheme(): ExtendedThemeContextValue {
  const context = React.useContext(ThemeContext);
  const emotionTheme = useEmotionTheme() as ChellaaTheme | undefined;

  if (context) {
    return {
      ...context,
      themeObject: context.activeTheme,
    };
  }

  if (emotionTheme && emotionTheme.palette) {
    return {
      theme: emotionTheme.palette.mode,
      setTheme: () => {},
      resolvedTheme: emotionTheme.palette.mode,
      systemTheme: undefined,
      activeTheme: emotionTheme,
      colorMode: emotionTheme.palette.mode,
      setColorMode: () => {},
      themeObject: emotionTheme,
    };
  }

  // Graceful fallback to defaultTheme if used outside ThemeProvider
  return {
    theme: "light",
    setTheme: () => {},
    resolvedTheme: "light",
    systemTheme: undefined,
    activeTheme: defaultTheme,
    colorMode: "light",
    setColorMode: () => {},
    themeObject: defaultTheme,
  };
}
