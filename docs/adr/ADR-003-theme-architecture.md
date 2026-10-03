# ADR-003: Theme Architecture & Runtime Switching Engine

**Status:** Accepted  
**Date:** 2026-10-03  
**Deciders:** Principal Architect, Design Systems Lead, Frontend Core Team  

---

## 1. Context and Problem Statement

Theme switching (light mode, dark mode, custom brand themes) in many React libraries triggers complete virtual DOM re-render cascades because theme tokens are passed through React Context to every styled component. This causes dropped frames during theme switching in complex enterprise UIs.

Furthermore, client-side theme initialization frequently causes a Flash of Unstyled Content (FOUC) or hydration mismatches when server-rendered HTML does not match client `localStorage` theme state.

---

## 2. Decision

1. **DOM-Level Token Swapping:**
   - Themes map to CSS custom property dictionaries.
   - Theme switching applies a `data-theme="light|dark|<custom>"` attribute to the root DOM element (`<html>` or container).
   - Switching themes takes $O(1)$ time—the browser instantly recalculates styles natively without triggering React component re-renders.
2. **Synchronous Zero-FOUC SSR Script (`<ThemeScript />`):**
   - Provide an inline script component intended for `<head>` injection.
   - Executes synchronously before DOM paint to read persisted preferences from `localStorage` or `prefers-color-scheme` and sets the `data-theme` attribute immediately.
3. **Ergonomic React Theme Context:**
   - `<ThemeProvider>` and `useTheme` provide reactive state (`theme`, `setTheme`, `resolvedTheme`) for UI controls without wrapping DOM nodes in unnecessary wrapper `div`s.
4. **Programmatic Theme Generation (`createTheme`):**
   - Utility allowing consumers to generate valid custom theme CSS variables with automatic contrast verification.

---

## 3. Consequences

### Positive
- **Instantaneous Theme Switching:** Zero virtual DOM re-renders during light/dark transitions.
- **Zero FOUC:** Perfect SSR hydration without white-flash in dark mode.
- **Nested Theming:** Supports localized theme containers (e.g. `<div data-theme="dark">` inside a light-themed page).

### Negative
- **Context Separation:** Components cannot read raw theme token values as JavaScript objects during render; tokens exist in the CSS layer. (Design tokens are exposed via typed constants where programmatic access is needed).

---

## 4. Alternatives Considered

1. **React Context Virtual DOM Injection:** Rejected due to massive re-render waterfalls across large component trees.
2. **CSS Class Toggling (`.dark` / `.light`):** Rejected in favor of `data-theme` attribute for cleaner CSS attribute selectors and multi-brand extensibility.
