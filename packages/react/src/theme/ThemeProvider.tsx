"use client";

import * as React from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ChellaaTheme, ThemeOptions, ColorMode } from "./types";
import { createTheme, defaultTheme, defaultDarkTheme } from "./createTheme";

// Ambient type augmentation for @emotion/react
declare module "@emotion/react" {
  export interface Theme extends ChellaaTheme {}
}

export type ThemeMode = "light" | "dark" | "system" | string;

export interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: "light" | "dark";
  systemTheme: "light" | "dark" | undefined;
  activeTheme: ChellaaTheme;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
}

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

export interface ThemeProviderProps {
  children?: React.ReactNode;
  theme?: ChellaaTheme | ThemeOptions;
  defaultTheme?: ThemeMode;
  storageKey?: string;
  enableSystem?: boolean;
  tokens?: Record<string, string>;
  attribute?: string;
}

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

export function ThemeProvider({
  children,
  theme: customThemeProp,
  defaultTheme: defaultThemeMode = "system",
  storageKey = "chellaa-theme",
  enableSystem = true,
  tokens,
  attribute = "data-theme",
}: ThemeProviderProps) {
  const parentContext = React.useContext(ThemeContext);

  const [themeMode, setThemeModeState] = React.useState<ThemeMode>(() => {
    if (typeof window === "undefined") return defaultThemeMode;
    try {
      return (localStorage.getItem(storageKey) as ThemeMode) || defaultThemeMode;
    } catch {
      return defaultThemeMode;
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

  // Calculate resolved theme (light or dark)
  const resolvedTheme: "light" | "dark" = React.useMemo(() => {
    if (themeMode === "system") {
      return systemTheme ?? "light";
    }
    return themeMode === "dark" ? "dark" : "light";
  }, [themeMode, systemTheme]);

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

  // Compute active Emotion ChellaaTheme
  const activeTheme = React.useMemo<ChellaaTheme>(() => {
    if (customThemeProp) {
      // If full ChellaaTheme passed, respect its palette mode or override with resolvedTheme
      return createTheme({
        ...(customThemeProp as any),
        palette: {
          mode: resolvedTheme,
          ...((customThemeProp as any).palette || {}),
        },
      });
    }
    return resolvedTheme === "dark" ? defaultDarkTheme : defaultTheme;
  }, [customThemeProp, resolvedTheme]);

  // Apply data-theme attribute and CSS tokens to DOM
  React.useEffect(() => {
    if (typeof document === "undefined") return;

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
      setThemeModeState(newTheme);
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // Ignore localStorage errors (e.g. private browsing mode)
      }
    },
    [storageKey]
  );

  const setColorMode = React.useCallback(
    (mode: ColorMode) => {
      setTheme(mode);
    },
    [setTheme]
  );

  const contextValue = React.useMemo<ThemeContextValue>(
    () => ({
      theme: themeMode,
      setTheme,
      resolvedTheme,
      systemTheme,
      activeTheme,
      colorMode: resolvedTheme,
      setColorMode,
    }),
    [themeMode, setTheme, resolvedTheme, systemTheme, activeTheme, setColorMode]
  );

  if (parentContext) {
    const styleObj = tokens
      ? (tokens as unknown as React.CSSProperties)
      : undefined;

    return (
      <ThemeContext.Provider value={contextValue}>
        <EmotionThemeProvider theme={activeTheme}>
          <div
            {...{ [attribute]: resolvedTheme }}
            style={styleObj}
            className="cl-theme-scope"
          >
            {children}
          </div>
        </EmotionThemeProvider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <EmotionThemeProvider theme={activeTheme}>{children}</EmotionThemeProvider>
    </ThemeContext.Provider>
  );
}
