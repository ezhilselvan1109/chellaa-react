import React, { createContext, useEffect, useState, useMemo, useCallback } from "react";
import { injectStyle } from "../styles/registry";
import { tokensCssText } from "../tokens/tokens.style";
import type {
  ChellaProviderProps,
  Theme,
  ResolvedTheme,
  ThemeContextValue,
  ChellaThemeConfig,
} from "./ThemeProvider.types";

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }
  return window.matchMedia(COLOR_SCHEME_QUERY).matches ? "dark" : "light";
}

function generateThemeCss(config?: ChellaThemeConfig): string {
  if (!config) return "";
  const rules: string[] = [];
  if (config.colors) {
    if (config.colors.primary) rules.push(`--ch-color-primary: ${config.colors.primary};`);
    if (config.colors.primaryHover) rules.push(`--ch-color-primary-hover: ${config.colors.primaryHover};`);
    if (config.colors.primaryActive) rules.push(`--ch-color-primary-active: ${config.colors.primaryActive};`);
    if (config.colors.primarySubtle) rules.push(`--ch-color-primary-subtle: ${config.colors.primarySubtle};`);
    if (config.colors.primaryFg) rules.push(`--ch-color-primary-fg: ${config.colors.primaryFg};`);
    if (config.colors.success) rules.push(`--ch-color-success: ${config.colors.success};`);
    if (config.colors.warning) rules.push(`--ch-color-warning: ${config.colors.warning};`);
    if (config.colors.danger) rules.push(`--ch-color-danger: ${config.colors.danger};`);
    if (config.colors.bgCanvas) rules.push(`--ch-color-bg-canvas: ${config.colors.bgCanvas};`);
    if (config.colors.bgSurface) rules.push(`--ch-color-bg-surface: ${config.colors.bgSurface};`);
    if (config.colors.bgSubtle) rules.push(`--ch-color-bg-subtle: ${config.colors.bgSubtle};`);
    if (config.colors.bgMuted) rules.push(`--ch-color-bg-muted: ${config.colors.bgMuted};`);
    if (config.colors.fgDefault) rules.push(`--ch-color-fg-default: ${config.colors.fgDefault};`);
    if (config.colors.fgMuted) rules.push(`--ch-color-fg-muted: ${config.colors.fgMuted};`);
    if (config.colors.fgSubtle) rules.push(`--ch-color-fg-subtle: ${config.colors.fgSubtle};`);
    if (config.colors.borderDefault) rules.push(`--ch-color-border-default: ${config.colors.borderDefault};`);
    if (config.colors.borderSubtle) rules.push(`--ch-color-border-subtle: ${config.colors.borderSubtle};`);
    if (config.colors.ringColor) rules.push(`--ch-ring-color: ${config.colors.ringColor};`);
  }
  if (config.radii) {
    if (config.radii.none) rules.push(`--ch-radius-none: ${config.radii.none};`);
    if (config.radii.sm) rules.push(`--ch-radius-sm: ${config.radii.sm};`);
    if (config.radii.md) rules.push(`--ch-radius-md: ${config.radii.md};`);
    if (config.radii.lg) rules.push(`--ch-radius-lg: ${config.radii.lg};`);
    if (config.radii.xl) rules.push(`--ch-radius-xl: ${config.radii.xl};`);
    if (config.radii.full) rules.push(`--ch-radius-full: ${config.radii.full};`);
  }
  if (config.fonts) {
    if (config.fonts.sans) rules.push(`--ch-font-sans: ${config.fonts.sans};`);
    if (config.fonts.mono) rules.push(`--ch-font-mono: ${config.fonts.mono};`);
  }
  if (rules.length === 0) return "";
  return `:root, [data-theme] { ${rules.join(" ")} }`;
}

export const ChellaProvider: React.FC<ChellaProviderProps> = ({
  defaultTheme = "system",
  enableSystem = true,
  themeStorageKey = "chella-theme",
  attribute = "data-theme",
  target,
  theme: initialThemeConfig,
  children,
}) => {
  if (typeof window !== "undefined") {
    injectStyle("ch-theme-tokens", tokensCssText);
  }

  const [customTheme, setCustomThemeState] = useState<ChellaThemeConfig | undefined>(
    initialThemeConfig
  );

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

  // Inject dynamic custom theme CSS overrides
  useEffect(() => {
    if (typeof window === "undefined") return;
    const css = generateThemeCss(customTheme);
    if (css) {
      injectStyle("ch-custom-theme-overrides", css);
    }
  }, [customTheme]);

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

  const setCustomTheme = useCallback(
    (
      config: ChellaThemeConfig | ((prev: ChellaThemeConfig | undefined) => ChellaThemeConfig)
    ) => {
      setCustomThemeState((prev) =>
        typeof config === "function" ? config(prev) : config
      );
    },
    []
  );

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      customTheme,
      setCustomTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme, customTheme, setCustomTheme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

