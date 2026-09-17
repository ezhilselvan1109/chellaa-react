import React from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ChellaThemeColors {
  primary?: string;
  primaryHover?: string;
  primaryActive?: string;
  primarySubtle?: string;
  primaryFg?: string;
  success?: string;
  warning?: string;
  danger?: string;
  bgCanvas?: string;
  bgSurface?: string;
  bgSubtle?: string;
  bgMuted?: string;
  fgDefault?: string;
  fgMuted?: string;
  fgSubtle?: string;
  borderDefault?: string;
  borderSubtle?: string;
  ringColor?: string;
}

export interface ChellaThemeRadii {
  none?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  full?: string;
}

export interface ChellaThemeFonts {
  sans?: string;
  mono?: string;
}

export interface ChellaThemeConfig {
  colors?: ChellaThemeColors;
  radii?: ChellaThemeRadii;
  fonts?: ChellaThemeFonts;
}

export interface ThemeContextValue {
  /** Current configured theme mode */
  theme: Theme;
  /** Actual applied theme mode after evaluating system preference */
  resolvedTheme: ResolvedTheme;
  /** Set theme mode */
  setTheme: (theme: Theme) => void;
  /** Toggle between light and dark */
  toggleTheme: () => void;
  /** Active custom theme overrides */
  customTheme?: ChellaThemeConfig;
  /** Dynamically update custom theme token overrides */
  setCustomTheme: (
    config: ChellaThemeConfig | ((prev: ChellaThemeConfig | undefined) => ChellaThemeConfig)
  ) => void;
}

export interface ChellaProviderProps {
  /**
   * Default theme mode when no stored preference exists.
   * @default "system"
   */
  defaultTheme?: Theme;
  /**
   * Whether to automatically synchronize with the operating system preference when theme is "system".
   * @default true
   */
  enableSystem?: boolean;
  /**
   * LocalStorage key to persist theme choice.
   * @default "chella-theme"
   */
  themeStorageKey?: string;
  /**
   * HTML attribute to set on documentElement or container.
   * @default "data-theme"
   */
  attribute?: string;
  /**
   * Target element to apply theme attribute. If omitted, applies to document.documentElement.
   */
  target?: HTMLElement | null;
  /**
   * Custom theme overrides (colors, radii, fonts) applied automatically via CSS custom properties.
   */
  theme?: ChellaThemeConfig;
  /** Child nodes */
  children: React.ReactNode;
}

