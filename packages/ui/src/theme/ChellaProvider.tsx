import React, { createContext, useEffect, useState, useMemo, useCallback } from "react";
import { injectStyle } from "../styles/registry";
import { tokensCssText } from "../tokens/tokens.style";
import type { ChellaProviderProps, Theme, ResolvedTheme, ThemeContextValue } from "./ThemeProvider.types";

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }
  return window.matchMedia(COLOR_SCHEME_QUERY).matches ? "dark" : "light";
}

export const ChellaProvider: React.FC<ChellaProviderProps> = ({
  defaultTheme = "system",
  enableSystem = true,
  themeStorageKey = "chella-theme",
  attribute = "data-theme",
  target,
  children,
}) => {
  if (typeof window !== "undefined") {
    injectStyle("ch-theme-tokens", tokensCssText);
  }
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return defaultTheme;
    }
    try {
      const stored = localStorage.getItem(themeStorageKey);
      if (stored === "light" || stored === "dark" || stored === "system") {
        return stored;
      }
    } catch {
      // Ignore localStorage read errors (e.g. security sandbox)
    }
    return defaultTheme;
  });

  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  // Synchronize system preference changes
  useEffect(() => {
    if (typeof window === "undefined" || !enableSystem || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    setSystemTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [enableSystem]);

  const resolvedTheme: ResolvedTheme = useMemo(() => {
    if (theme === "system") {
      return systemTheme;
    }
    return theme;
  }, [theme, systemTheme]);

  // Apply data-theme attribute to target DOM node
  useEffect(() => {
    if (typeof window === "undefined") return;

    const rootElement = target ?? document.documentElement;
    if (rootElement) {
      rootElement.setAttribute(attribute, resolvedTheme);
    }
  }, [attribute, resolvedTheme, target]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(themeStorageKey, newTheme);
      } catch {
        // Ignore localStorage write errors
      }
    },
    [themeStorageKey]
  );

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
