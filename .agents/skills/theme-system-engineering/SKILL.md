---
name: theme-system-engineering
description: Procedures for maintaining, extending, and testing the ThemeProvider, useTheme, createTheme, and ThemeScript subsystems.
---

# Theme System Engineering Skill

## 1. Purpose
Provides the authoritative procedures for creating and testing theme contexts, synchronizing `data-theme` HTML attributes, managing OS dark mode preferences, and preventing Flash of Unstyled Content (FOUC).

## 2. Core Theme Subsystems
1. **`ThemeProvider`** (`packages/react/src/theme/ThemeProvider.tsx`):
   - Accepts `defaultTheme?: "light" | "dark" | "system" | string`.
   - Propagates both `ThemeContext` and Emotion `EmotionThemeProvider`.
   - Listens to `(prefers-color-scheme: dark)` media query when `enableSystem={true}`.
   - Synchronizes `data-theme="light|dark"` on the root document element (or scoped container).
2. **`useTheme`** (`packages/react/src/theme/useTheme.ts`):
   - Exposes `{ theme, setTheme, resolvedTheme, activeTheme, colorMode, setColorMode, themeObject }`.
3. **`createTheme`** (`packages/react/src/theme/createTheme.ts`):
   - Merges custom theme overrides into `ChellaaTheme` schema with 24-level elevation shadows and 8px spacing.
4. **`ThemeScript`** (`packages/react/src/theme/ThemeScript.tsx`):
   - Inline non-blocking script injected into `<head>` to evaluate stored theme before initial DOM paint.

## 3. Step-by-Step Procedure for Theme Extensions
1. Update `types.ts` with any new theme schema properties.
2. Implement defaults in `defaultTheme.ts` / `createTheme.ts`.
3. Add unit tests in `ThemeProvider.test.tsx` verifying attribute injection and mode switching.
4. Verify SSR hydration stability in `apps/test-consumer/benchmark-ssr.mjs`.

## 4. Validation Commands
- `pnpm --filter @chellaa/react test -- -t ThemeProvider`
- `node apps/test-consumer/benchmark-ssr.mjs`
