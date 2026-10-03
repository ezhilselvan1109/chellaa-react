"use client";

import * as React from "react";

export type ThemeMode = "light" | "dark" | "system" | string;

export interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: "light" | "dark";
  systemTheme: "light" | "dark" | undefined;
}

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

export interface ThemeProviderProps {
  children?: React.ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
  enableSystem?: boolean;
  tokens?: Record<string, string>;
  attribute?: string;
}

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "chellaa-theme",
  enableSystem = true,
  tokens,
  attribute = "data-theme",
}: ThemeProviderProps) {
  // Check if we are inside a parent ThemeProvider (nested scope)
  const parentContext = React.useContext(ThemeContext);

  const [theme, setThemeState] = React.useState<ThemeMode>(() => {
    if (typeof window === "undefined") return defaultTheme;
    try {
      return (localStorage.getItem(storageKey) as ThemeMode) || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const [systemTheme, setSystemTheme] = React.useState<
    "light" | "dark" | undefined
  >(() => {
    if (
      typeof window === "undefined" ||
      !enableSystem ||
      typeof window.matchMedia !== "function"
    ) {
      return undefined;
    }
    return window.matchMedia(COLOR_SCHEME_QUERY).matches ? "dark" : "light";
  });

  // Calculate resolved theme
  const resolvedTheme: "light" | "dark" = React.useMemo(() => {
    if (theme === "system") {
      return systemTheme ?? "light";
    }
    return theme === "dark" ? "dark" : "light";
  }, [theme, systemTheme]);

  // Listen for OS system theme changes
  React.useEffect(() => {
    if (
      !enableSystem ||
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return;
    }

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else if (
      typeof (
        mediaQuery as {
          addListener?: (cb: (e: MediaQueryListEvent) => void) => void;
        }
      ).addListener === "function"
    ) {
      // Legacy Safari / older browser fallback
      (
        mediaQuery as {
          addListener: (cb: (e: MediaQueryListEvent) => void) => void;
        }
      ).addListener(handleChange);
      return () =>
        (
          mediaQuery as {
            removeListener: (cb: (e: MediaQueryListEvent) => void) => void;
          }
        ).removeListener(handleChange);
    }
  }, [enableSystem]);

  // Apply theme to DOM
  React.useEffect(() => {
    if (typeof document === "undefined") return;

    // If root ThemeProvider, apply to documentElement
    if (!parentContext) {
      const root = document.documentElement;
      root.setAttribute(attribute, resolvedTheme);

      if (tokens) {
        for (const [key, value] of Object.entries(tokens)) {
          root.style.setProperty(key, value);
        }
      }
    }
  }, [resolvedTheme, parentContext, attribute, tokens]);

  const setTheme = React.useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // Ignore localStorage errors (e.g. private browsing mode)
      }
    },
    [storageKey],
  );

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      systemTheme,
    }),
    [theme, setTheme, resolvedTheme, systemTheme],
  );

  // If this is a nested ThemeProvider, render a container element with the local theme attribute
  if (parentContext) {
    const styleObj = tokens
      ? (tokens as unknown as React.CSSProperties)
      : undefined;

    return (
      <ThemeContext.Provider value={value}>
        <div
          {...{ [attribute]: resolvedTheme }}
          style={styleObj}
          className="cl-theme-scope"
        >
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
