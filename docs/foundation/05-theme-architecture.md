# Chellaa React — Foundation Architecture

## Document 05: Theme Architecture & Runtime Engine

**Document Status:** Approved & Baseline  
**Phase:** 1 — Foundation  
**Version:** 1.0.0  
**Target Package:** `@chellaa/react`

---

## 1. Introduction

The Chellaa React Theme Architecture provides a zero-runtime-cost, token-driven theming engine. It unifies light, dark, system-preference, and custom multi-brand themes under a deterministic, high-performance CSS Custom Property architecture.

This document details the theme data model, token compilation pipeline, `ThemeProvider` lifecycle, DOM synchronization strategy, FOUC (Flash of Unstyled Content) prevention, and sub-tree nested theming mechanics.

---

## 2. Theme Data Model

A theme in Chellaa React represents the complete visual specification of an application. It is defined as a strongly typed TypeScript contract:

```typescript
// Core conceptual theme structure
export type ThemeMode = "light" | "dark" | "system";
export type ResolvedThemeMode = "light" | "dark";

export interface ColorTokens {
  canvas: string;
  surface: string;
  surfaceElevated: string;
  surfaceMuted: string;
  foregroundPrimary: string;
  foregroundSecondary: string;
  foregroundMuted: string;
  foregroundInverse: string;
  borderSubtle: string;
  borderDefault: string;
  borderStrong: string;
  primaryBase: string;
  primaryHover: string;
  primaryActive: string;
  primaryForeground: string;
  successBase: string;
  warningBase: string;
  dangerBase: string;
  infoBase: string;
  focusRing: string;
}

export interface TypographyTokens {
  fontSans: string;
  fontMono: string;
  fontSizes: Record<
    "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl",
    string
  >;
  fontWeights: Record<"regular" | "medium" | "semibold" | "bold", number>;
  lineHeights: Record<"tight" | "snug" | "normal" | "relaxed", string | number>;
}

export interface SpatialTokens {
  spacing: Record<
    "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16",
    string
  >;
  radii: Record<
    "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full",
    string
  >;
  shadows: Record<"sm" | "md" | "lg" | "xl", string>;
  zIndex: Record<
    | "deep"
    | "base"
    | "raised"
    | "dropdown"
    | "sticky"
    | "backdrop"
    | "modal"
    | "popover"
    | "toast"
    | "tooltip",
    number
  >;
}

export interface ThemeConfig {
  name: string;
  colors: {
    light: ColorTokens;
    dark: ColorTokens;
  };
  typography: TypographyTokens;
  spatial: SpatialTokens;
  componentTokens?: Record<string, Record<string, string>>;
}
```

---

## 3. Token-to-CSS Mapping Pipeline

Chellaa React translates TypeScript theme definitions into native CSS custom properties at build and runtime:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      Token-to-CSS Transformation                       │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Theme Configuration Object (TypeScript / JSON)                      │
│    colors.light.primaryBase: "#4f46e5"                                 │
│    colors.dark.primaryBase: "#6366f1"                                  │
├───────────────────────────────────┬────────────────────────────────────┤
│                                   ▼                                    │
│ 2. Token Compiler / Variable Generator                                 │
│    Translates object paths into namespaced CSS custom properties       │
├───────────────────────────────────┬────────────────────────────────────┤
│                                   ▼                                    │
│ 3. Generated CSS Variable Layer                                        │
│    [data-theme='light'] { --cl-color-pri-base: #4f46e5; }              │
│    [data-theme='dark']  { --cl-color-pri-base: #6366f1; }              │
│    :root                { --cl-font-sans: system-ui, ...; }            │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.1 CSS Variable Naming Convention

All variables follow a strict, collision-proof hierarchy:
`--cl-<category>-<semantic-identifier>-<state>`

- Colors: `--cl-color-bg-canvas`, `--cl-color-fg-primary`, `--cl-color-pri-base`, `--cl-color-pri-hover`
- Typography: `--cl-font-sans`, `--cl-font-size-base`, `--cl-line-height-normal`
- Spacing: `--cl-space-4`, `--cl-space-8`
- Radii: `--cl-rad-md`, `--cl-rad-lg`
- Shadows: `--cl-shadow-md`, `--cl-shadow-lg`
- Z-Index: `--cl-z-modal`, `--cl-z-tooltip`

---

## 4. ThemeProvider & Runtime Switching

### 4.1 Responsibilities of ThemeProvider

The `ThemeProvider` serves as the centralized orchestrator for theme state management.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ThemeProvider Scope                             │
├────────────────────────────────────┬───────────────────────────────────┤
│ Responsibilities (IN SCOPE)        │ Anti-Patterns (OUT OF SCOPE)      │
├────────────────────────────────────┼───────────────────────────────────┤
│ • Maintain active ThemeMode        │ ✗ Re-render child components when │
│   (light, dark, system).           │   colors change.                  │
│ • Detect system preference via     │ ✗ Inject inline CSS styles onto   │
│   matchMedia('(prefers-color-..'). │   every child DOM node.           │
│ • Mutate data-theme attribute on   │ ✗ Wrap individual components in   │
│   DOM root or target container.    │   their own theme consumers.      │
│ • Synchronize mode with            │ ✗ Block SSR streaming while       │
│   localStorage persistence.        │   loading stored theme.           │
│ • Expose useTheme() context.       │                                   │
└────────────────────────────────────┴───────────────────────────────────┘
```

### 4.2 Zero Re-Render Runtime Theme Switching

In traditional React libraries, toggling dark mode triggers a full virtual DOM reconciliation and re-render of every component that consumes the theme.

Chellaa React eliminates this performance penalty entirely:

1. When `setMode("dark")` is called, the `ThemeProvider` mutates the DOM attribute on the document root:
   ```javascript
   document.documentElement.setAttribute("data-theme", "dark");
   ```
2. The browser's native C++ styling engine immediately recalculates all CSS variables across the page in **sub-millisecond O(1) time**.
3. React components that render static markup are **never re-rendered** by React. Only components that explicitly consume `useTheme()` to display a toggle icon (e.g., Sun vs. Moon) update their local state.

---

## 5. Theme Hook API: `useTheme`

The `useTheme` hook provides an intuitive, type-safe interface for application code:

```typescript
export interface UseThemeReturn {
  /** The explicitly selected mode: "light" | "dark" | "system" */
  mode: ThemeMode;
  /** The actively rendered computed mode: "light" | "dark" */
  resolvedMode: ResolvedThemeMode;
  /** Update the theme mode */
  setMode: (mode: ThemeMode) => void;
  /** Convenience toggle: alternates between light and dark */
  toggleMode: () => void;
  /** Active theme token configuration object */
  theme: ThemeConfig;
}
```

### 5.1 Usage Example

```tsx
import { useTheme } from "@chellaa/react";

export function ThemeToggle() {
  const { mode, resolvedMode, toggleMode } = useTheme();

  return (
    <button
      onClick={toggleMode}
      aria-label={`Switch to ${resolvedMode === "light" ? "dark" : "light"} mode`}
    >
      Current: {mode} (Active: {resolvedMode})
    </button>
  );
}
```

---

## 6. System Preference & Media Query Synchronization

When `mode === "system"`, Chellaa React delegates theme determination to the operating system:

1. **Detection:** Evaluates `window.matchMedia('(prefers-color-scheme: dark)')`.
2. **Dynamic Listening:** Registers an event listener on the media query list:
   ```typescript
   const mql = window.matchMedia("(prefers-color-scheme: dark)");
   const handler = (e: MediaQueryListEvent) => {
     if (mode === "system") {
       const resolved = e.matches ? "dark" : "light";
       document.documentElement.setAttribute("data-theme", resolved);
       setResolvedMode(resolved);
     }
   };
   mql.addEventListener("change", handler);
   ```
3. **Clean Teardown:** Automatically unregisters the listener when the component unmounts or when the mode changes away from `"system"`.

---

## 7. Persistence Strategy & Storage

- **Storage Target:** By default, user theme preference is stored in `localStorage` under the key `"cl-theme-mode"`.
- **Configurability:** Consumers can customize or disable persistence via props:
  ```tsx
  <ThemeProvider storageKey="my-company-theme" enablePersistence={true}>
  ```
- **SSR Fallback:** If `localStorage` is unavailable (e.g., during server rendering or when disabled by browser security policies), the provider gracefully degrades to system preference or the specified `defaultMode` without throwing exceptions.

---

## 8. SSR & FOUC Prevention Architecture

A critical flaw in client-side theme providers is the **Flash of Unstyled Content (FOUC)** or **Flash of Incorrect Theme (FOIT)**, where a dark-mode user sees a blinding white screen before client JavaScript hydrates.

Chellaa React solves this with a two-part SSR-safe architecture:

```
┌────────────────────────────────────────────────────────────────────────┐
│                       FOUC Elimination Pipeline                        │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Server HTML Render (Next.js / Remix / SSR)                          │
│    Renders <ThemeScript storageKey="cl-theme-mode" /> in <head>        │
├───────────────────────────────────┬────────────────────────────────────┤
│                                   ▼                                    │
│ 2. Inline Blocking Execution (Before Browser First Paint)              │
│    Synchronous inline script reads localStorage / matchMedia           │
│    Immediately executes: document.documentElement.dataset.theme = mode │
├───────────────────────────────────┬────────────────────────────────────┤
│                                   ▼                                    │
│ 3. Initial Browser Paint                                               │
│    Page paints instantly in correct theme. Zero visual flash.          │
├───────────────────────────────────┬────────────────────────────────────┤
│                                   ▼                                    │
│ 4. Client React Hydration                                              │
│    ThemeProvider initializes with matching resolvedMode.               │
│    Zero hydration mismatch errors.                                     │
└────────────────────────────────────────────────────────────────────────┘
```

### 8.1 The `ThemeScript` Component

Chellaa React exports a lightweight, minified `<ThemeScript />` component designed to be inserted in the application's root document (e.g., `app/layout.tsx` in Next.js):

```tsx
// Next.js App Router Root Layout example:
import { ThemeScript } from "@chellaa/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

The injected inline script executes in < 1ms:

```javascript
(function () {
  try {
    var key = "cl-theme-mode";
    var stored = localStorage.getItem(key);
    var mode = stored || "system";
    var resolved = mode;
    if (mode === "system") {
      resolved = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.setAttribute("data-theme", resolved);
  } catch (e) {}
})();
```

Because `suppressHydrationWarning` is applied to `<html>`, React ignores the client-synchronized `data-theme` attribute during hydration, preventing unnecessary console warnings.

---

## 9. Custom Theme Definition: `createTheme`

Consumers can extend or completely redefine tokens using the `createTheme` utility:

```typescript
import { createTheme } from "@chellaa/react";

export const brandTheme = createTheme({
  name: "acme-corp",
  colors: {
    light: {
      primaryBase: "#0284c7", // Acme Sky Blue
      primaryHover: "#0369a1",
      primaryForeground: "#ffffff",
    },
    dark: {
      primaryBase: "#38bdf8",
      primaryHover: "#7dd3fc",
      primaryForeground: "#0c4a6e",
    },
  },
  spatial: {
    radii: {
      md: "12px", // More rounded brand identity
    },
  },
});
```

### 9.1 Theme Merging Logic

- `createTheme()` accepts a partial theme configuration.
- It performs a deep recursive merge against Chellaa React's default baseline tokens.
- It compiles the custom tokens into a static CSS variable string or runtime `<style>` injection when applied to the root `<ThemeProvider theme={brandTheme}>`.

---

## 10. Nested Themes & Sub-tree Scoping

Chellaa React supports arbitrary theme nesting without architectural friction:

```tsx
<ThemeProvider mode="light">
  {/* Standard Light App Shell */}
  <Header />
  <MainContent />

  {/* Inverted Dark Surface Subtree */}
  <div data-theme="dark" className="cl-surface-dark-scope">
    <Sidebar>
      {/* All Chellaa components inside this container resolve to dark tokens! */}
      <Button variant="solid" colorScheme="primary">
        Dark Action
      </Button>
    </Sidebar>
  </div>
</ThemeProvider>
```

### 10.1 Why Subtree Theming Works Flawlessly

Because Chellaa React relies on standard CSS variable cascading, placing `data-theme="dark"` on any DOM element re-scopes all descendant `--cl-*` variables locally. No additional React context or state wrapping is necessary.
