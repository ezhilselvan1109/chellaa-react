import React from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeContextValue {
  /** Current configured theme mode */
  theme: Theme;
  /** Actual applied theme mode after evaluating system preference */
  resolvedTheme: ResolvedTheme;
  /** Set theme mode */
  setTheme: (theme: Theme) => void;
  /** Toggle between light and dark */
  toggleTheme: () => void;
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
  /** Child nodes */
  children: React.ReactNode;
}
