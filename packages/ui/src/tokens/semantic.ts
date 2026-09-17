/**
 * Chella UI - Tier 2: Semantic Design Tokens
 * Role-based and mode-aware tokens mapped to Tier 1 Primitives.
 */

import { primitives } from "./primitives";

export const lightSemanticTokens = {
  colors: {
    // Backgrounds
    bgCanvas: primitives.colors.slate[50],
    bgSurface: primitives.colors.white,
    bgSubtle: primitives.colors.slate[100],
    bgMuted: primitives.colors.slate[200],
    bgOverlay: "rgba(15, 23, 42, 0.5)",

    // Foregrounds (Text & Icons)
    fgDefault: primitives.colors.slate[900],
    fgMuted: primitives.colors.slate[600],
    fgSubtle: primitives.colors.slate[400],
    fgOnPrimary: primitives.colors.white,
    fgOnDanger: primitives.colors.white,

    // Borders
    borderDefault: primitives.colors.slate[200],
    borderSubtle: primitives.colors.slate[100],
    borderStrong: primitives.colors.slate[300],

    // Primary Brand
    primary: primitives.colors.blue[600],
    primaryHover: primitives.colors.blue[700],
    primaryActive: primitives.colors.blue[800],
    primarySubtle: primitives.colors.blue[50],
    primaryFg: primitives.colors.blue[700],

    // Success Intent
    success: primitives.colors.emerald[600],
    successHover: primitives.colors.emerald[700],
    successSubtle: primitives.colors.emerald[50],
    successFg: primitives.colors.emerald[700],

    // Warning Intent
    warning: primitives.colors.amber[500],
    warningHover: primitives.colors.amber[600],
    warningSubtle: primitives.colors.amber[50],
    warningFg: primitives.colors.amber[800],

    // Danger Intent
    danger: primitives.colors.rose[600],
    dangerHover: primitives.colors.rose[700],
    dangerActive: primitives.colors.rose[800],
    dangerSubtle: primitives.colors.rose[50],
    dangerFg: primitives.colors.rose[700],

    // Focus Rings
    ringColor: primitives.colors.blue[500],
    ringOffset: primitives.colors.white,
  },
} as const;

export const darkSemanticTokens = {
  colors: {
    // Backgrounds
    bgCanvas: primitives.colors.slate[950],
    bgSurface: primitives.colors.slate[900],
    bgSubtle: primitives.colors.slate[800],
    bgMuted: primitives.colors.slate[700],
    bgOverlay: "rgba(0, 0, 0, 0.75)",

    // Foregrounds (Text & Icons)
    fgDefault: primitives.colors.slate[50],
    fgMuted: primitives.colors.slate[400],
    fgSubtle: primitives.colors.slate[500],
    fgOnPrimary: primitives.colors.white,
    fgOnDanger: primitives.colors.white,

    // Borders
    borderDefault: primitives.colors.slate[800],
    borderSubtle: primitives.colors.slate[800],
    borderStrong: primitives.colors.slate[700],

    // Primary Brand
    primary: primitives.colors.blue[500],
    primaryHover: primitives.colors.blue[400],
    primaryActive: primitives.colors.blue[600],
    primarySubtle: primitives.colors.blue[950],
    primaryFg: primitives.colors.blue[300],

    // Success Intent
    success: primitives.colors.emerald[500],
    successHover: primitives.colors.emerald[400],
    successSubtle: primitives.colors.emerald[950],
    successFg: primitives.colors.emerald[300],

    // Warning Intent
    warning: primitives.colors.amber[400],
    warningHover: primitives.colors.amber[300],
    warningSubtle: primitives.colors.amber[950],
    warningFg: primitives.colors.amber[300],

    // Danger Intent
    danger: primitives.colors.rose[500],
    dangerHover: primitives.colors.rose[400],
    dangerActive: primitives.colors.rose[600],
    dangerSubtle: primitives.colors.rose[950],
    dangerFg: primitives.colors.rose[300],

    // Focus Rings
    ringColor: primitives.colors.blue[400],
    ringOffset: primitives.colors.slate[900],
  },
} as const;
