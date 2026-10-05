import { Palette, ColorMode } from "./types";

export const lightPalette: Palette = {
  mode: "light",
  primary: {
    light: "#818cf8", // indigo-400
    main: "#6366f1",  // indigo-500
    dark: "#4f46e5",  // indigo-600
    contrastText: "#ffffff",
  },
  secondary: {
    light: "#a78bfa", // violet-400
    main: "#8b5cf6",  // violet-500
    dark: "#7c3aed",  // violet-600
    contrastText: "#ffffff",
  },
  error: {
    light: "#f87171", // red-400
    main: "#ef4444",  // red-500
    dark: "#dc2626",  // red-600
    contrastText: "#ffffff",
  },
  warning: {
    light: "#fbbf24", // amber-400
    main: "#f59e0b",  // amber-500
    dark: "#d97706",  // amber-600
    contrastText: "#18181b",
  },
  info: {
    light: "#38bdf8", // sky-400
    main: "#0ea5e9",  // sky-500
    dark: "#0284c7",  // sky-600
    contrastText: "#ffffff",
  },
  success: {
    light: "#34d399", // emerald-400
    main: "#10b981",  // emerald-500
    dark: "#059669",  // emerald-600
    contrastText: "#ffffff",
  },
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)",
  },
  background: {
    default: "#f8fafc",
    paper: "#ffffff",
    surface: "#ffffff",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
  },
};

export const darkPalette: Palette = {
  mode: "dark",
  primary: {
    light: "#a5b4fc", // indigo-300
    main: "#818cf8",  // indigo-400
    dark: "#6366f1",  // indigo-500
    contrastText: "#09090b",
  },
  secondary: {
    light: "#c4b5fd", // violet-300
    main: "#a78bfa",  // violet-400
    dark: "#8b5cf6",  // violet-500
    contrastText: "#09090b",
  },
  error: {
    light: "#fca5a5", // red-300
    main: "#f87171",  // red-400
    dark: "#ef4444",  // red-500
    contrastText: "#09090b",
  },
  warning: {
    light: "#fde68a", // amber-200
    main: "#fbbf24",  // amber-400
    dark: "#f59e0b",  // amber-500
    contrastText: "#09090b",
  },
  info: {
    light: "#7dd3fc", // sky-300
    main: "#38bdf8",  // sky-400
    dark: "#0ea5e9",  // sky-500
    contrastText: "#09090b",
  },
  success: {
    light: "#6ee7b7", // emerald-300
    main: "#34d399",  // emerald-400
    dark: "#10b981",  // emerald-500
    contrastText: "#09090b",
  },
  text: {
    primary: "rgba(255, 255, 255, 0.95)",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.38)",
  },
  background: {
    default: "#09090b",
    paper: "#18181b",
    surface: "#18181b",
  },
  divider: "rgba(255, 255, 255, 0.12)",
  action: {
    active: "rgba(255, 255, 255, 0.7)",
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
  },
};

export function createPalette(mode: ColorMode = "light"): Palette {
  return mode === "dark" ? darkPalette : lightPalette;
}
