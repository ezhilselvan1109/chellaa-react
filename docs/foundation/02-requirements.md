# Chellaa React — Foundation Architecture
## Document 02: Functional and Technical Requirements

**Document Status:** Approved & Baseline  
**Phase:** 1 — Foundation  
**Version:** 1.0.0  
**Target Package:** `@chellaa/react`  

---

## 1. Introduction

This document establishes the comprehensive functional and non-functional engineering requirements for **Chellaa React**. Every architecture decision, component specification, and testing suite in subsequent phases must satisfy the requirements codified herein.

---

## 2. React Ecosystem Requirements

### 2.1 Supported React Versions
Chellaa React officially supports:
- **React 18.2.0+**
- **React 19.x**

```
┌────────────────────────────────────────────────────────────────────────┐
│                      React Compatibility Matrix                        │
├─────────────────────┬───────────────┬──────────────────────────────────┤
│ React Version       │ Status        │ Technical Rationale              │
├─────────────────────┼───────────────┼──────────────────────────────────┤
│ React < 18.2.0      │ Unsupported   │ Lacks stable useId, concurrent   │
│                     │               │ rendering, and hydration hooks.  │
├─────────────────────┼───────────────┼──────────────────────────────────┤
│ React 18.2.0 - 18.3 │ Fully         │ Standard enterprise baseline;    │
│                     │ Supported     │ native support for useId, SSR    │
│                     │               │ streaming, and transitions.      │
├─────────────────────┼───────────────┼──────────────────────────────────┤
│ React 19.x          │ Fully         │ Next-generation React baseline;  │
│                     │ Supported     │ ref as a prop, Actions, asset    │
│                     │               │ loading, React Compiler compat.  │
└─────────────────────┴───────────────┴──────────────────────────────────┘
```

#### Rationale for React Baseline
1. **`useId` Hook Requirement:** Accessible components requiring unique DOM IDs for ARIA associations (e.g., `aria-labelledby`, `aria-describedby`) cannot rely on client-side counters or `Math.random()`, which cause catastrophic SSR hydration mismatch errors. React 18's native `useId` provides deterministic cross-boundary hydration IDs.
2. **Concurrent Features:** Chellaa React must not block React's concurrent scheduler. Offloading styling recalculations to the browser CSS engine (via CSS custom properties) ensures transitions (`useTransition`) and deferred values (`useDeferredValue`) remain responsive.
3. **React 19 Ref Transition Strategy:** In React 19, `forwardRef` is deprecated in favor of passing `ref` as a standard prop. Chellaa React must implement a forward-compatible ref forwarding wrapper or pattern that seamlessly accepts `ref` across both React 18 (via `React.forwardRef`) and React 19 without issuing console deprecation warnings.
4. **React Server Components (RSC) Boundaries:** Interactive components using state, effects, or DOM event listeners must be annotated with the `"use client"` directive at the module boundary. Static layout components (e.g., `Container`, `Grid`, `Box`) should remain RSC-compatible server components where possible.

### 2.2 Component API Conventions
- **Composition over Inheritance:** Components must utilize compound component architectures and the `asChild` composition pattern.
- **Polymorphism via `asChild`:** Avoid dynamic polymorphic `as` props (e.g., `<Button as={Link} />`). Dynamic `as` props create severe TypeScript performance degradation, fragile generic type parameter explosions, and prop-clobbering runtime bugs. Instead, Chellaa React mandates the `asChild` slot delegation pattern:

```tsx
// Clean, type-safe delegation to Next.js or React Router Link:
<Button asChild variant="primary">
  <Link href="/dashboard">Dashboard</Link>
</Button>
```

- **Prop Naming Standardization:**
  - Visual Variant: `variant="solid" | "outline" | "ghost" | "subtle" | "link"`
  - Sizing: `size="xs" | "sm" | "md" | "lg" | "xl"`
  - Semantic Intent: `colorScheme="primary" | "secondary" | "success" | "warning" | "danger" | "info"`
  - State Booleans: Prefixed with `is` or `has` (`isDisabled`, `isLoading`, `isInvalid`, `isReadOnly`, `isRequired`).
  - Event Handlers: Standard React event naming (`onClick`, `onKeyDown`, `onChange`, `onValueChange`).

---

## 3. TypeScript Architecture Requirements

Chellaa React is a TypeScript-native library. TypeScript is not an afterthought; it is an authoritative contract.

```
┌────────────────────────────────────────────────────────────────────────┐
│                     TypeScript Configuration Policy                    │
├────────────────────────────────┬───────────────────────────────────────┤
│ Option                         │ Enforcement Level                     │
├────────────────────────────────┼───────────────────────────────────────┤
│ strict                         │ true (Strict type checking)           │
│ noImplicitAny                  │ true (Zero untyped parameters)        │
│ strictNullChecks               │ true (Null/undefined handling)        │
│ strictFunctionTypes            │ true (Sound function parameter types) │
│ exactOptionalPropertyTypes     │ true (No undefined vs missing ambiguity)│
│ noUncheckedIndexedAccess       │ true (Safer array and record access)  │
│ isolatedDeclarations           │ true (Guarantees fast type emission)  │
└────────────────────────────────┴───────────────────────────────────────┘
```

### 3.1 Public Type Definitions
1. Every component must export its primary prop interface:
   - `ButtonProps` from `@chellaa/react`
   - `InputProps` from `@chellaa/react`
   - `SelectProps<T>` from `@chellaa/react`
2. All theme configuration interfaces (`ThemeConfig`, `ColorTokens`, `TypographyTokens`) must be exported and extendable via TypeScript declaration merging.
3. Zero internal implementation types (e.g., intermediate bundler types, internal utility types) should leak into root barrel exports.

### 3.2 Generics and Type Inference
- Complex data-driven components (e.g., `Select<T>`, `Combobox<T>`, `Table<TData>`) must accept generic types, providing type safety for option objects, item selections, and cell values.
- Discriminated unions must be used for mutually exclusive states:

```tsx
// State typing contract example:
type ButtonContentProps =
  | { isLoading: true; loadingText?: string; children?: React.ReactNode }
  | { isLoading?: false; loadingText?: never; children: React.ReactNode };
```

### 3.3 Declaration File Generation
- Types must be emitted alongside code during build: `.d.ts` and `.d.ts.map` files must be distributed in the npm package.
- Type declarations must be verified using `attw` (`@arethetypeswrong/cli`) to guarantee flawless resolution across ESM and CommonJS consumer projects.

---

## 4. Browser & Platform Compatibility Requirements

### 4.1 Target Browsers
Chellaa React targets modern evergreen browsers, matching the official browserslist baseline:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Target Browser Matrix                           │
├─────────────────────────┬──────────────────────┬───────────────────────┤
│ Browser                 │ Minimum Version      │ Market Coverage       │
├─────────────────────────┼──────────────────────┼───────────────────────┤
│ Google Chrome           │ Last 2 major versions│ Evergreen             │
│ Microsoft Edge          │ Last 2 major versions│ Evergreen             │
│ Mozilla Firefox         │ Last 2 major versions│ Evergreen             │
│ Apple Safari            │ 15.4+ (Desktop & iOS)│ Full CSS Color-4 &    │
│                         │                      │ Dialog / Focus-visible│
└─────────────────────────┴──────────────────────┴───────────────────────┘
```

### 4.2 Baseline CSS Feature Set
The styling architecture relies strictly on standardized, universally supported CSS capabilities:
- **CSS Custom Properties (Variables):** Level 1 support (100% evergreen support).
- **CSS `:focus-visible` pseudo-class:** Native keyboard focus detection.
- **CSS Flexbox & Modern Grid:** Standard subgrid/grid layouts.
- **CSS Color Module Level 4 / Hex Alpha:** Modern alpha-channel blending.
- **CSS `@media (prefers-reduced-motion)`:** Native motion sensitivity hook.
- **CSS `@media (prefers-color-scheme)`:** Native OS theme hook.

### 4.3 Polyfill Policy
- Chellaa React **ships zero polyfills** in its distribution bundle to preserve minimal bundle size.
- If a consumer application must support legacy browsers, the consumer application is responsible for providing necessary polyfills (e.g., `ResizeObserver`, `IntersectionObserver`).

---

## 5. Accessibility (A11y) Requirements

Accessibility is a non-negotiable core requirement. Every interactive element must satisfy **WCAG 2.2 Level AA** criteria and conform strictly to the **W3C WAI-ARIA Authoring Practices Guide (APG)**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                      Accessibility Mandate Matrix                      │
├────────────────────────┬───────────────────────────────────────────────┤
│ Requirement Area       │ Verification Standard                         │
├────────────────────────┼───────────────────────────────────────────────┤
│ Keyboard Interaction   │ Full operation without mouse (W3C APG specs)  │
├────────────────────────┼───────────────────────────────────────────────┤
│ Focus Management       │ Trapping in modals, return-on-close, roving   │
│                        │ tabindex in lists/menus.                      │
├────────────────────────┼───────────────────────────────────────────────┤
│ Accessible Names       │ 100% of interactive nodes have valid name via │
│                        │ text, aria-label, or aria-labelledby.        │
├────────────────────────┼───────────────────────────────────────────────┤
│ Screen Readers         │ Verified on NVDA, VoiceOver (macOS/iOS), JAWS │
├────────────────────────┼───────────────────────────────────────────────┤
│ Contrast Ratios        │ Text: ≥ 4.5:1 (Normal), ≥ 3:1 (Large/Bold)   │
│                        │ UI Controls & Borders: ≥ 3:1 against bg      │
├────────────────────────┼───────────────────────────────────────────────┤
│ Focus Ring Visibility  │ High-contrast offset outline on focus-visible;│
│                        │ NEVER outline: none without visible replacement│
├────────────────────────┼───────────────────────────────────────────────┤
│ Motion Preference      │ Automatic animation suppression under         │
│                        │ prefers-reduced-motion: reduce                │
└────────────────────────┴───────────────────────────────────────────────┘
```

### 5.1 Keyboard Navigation Standards
- **Tab & Shift+Tab:** Move sequentially through reachable interactive elements.
- **Enter & Space:** Activate buttons, toggle checkboxes, open dropdowns.
- **Arrow Keys (Up/Down/Left/Right):** Navigate inside composite widgets (Menu, RadioGroup, Tabs, Select) using the **Roving Tabindex** or **Active Descendant** pattern.
- **Escape:** Dismiss active overlays (Dialog, Popover, Menu, Tooltip) and immediately restore focus to the triggering element.
- **Home & End:** Jump to first/last item in lists, menus, and tabs.

### 5.2 Focus Trapping and Restoration
- **Dialogs & Modals:** Focus must be trapped inside the modal container when open. Background elements must be marked with `aria-hidden="true"` or HTML `inert`. When the modal closes, focus must be returned to the triggering element.
- **Initial Focus:** Modals and Popovers must focus the first interactive child, or an explicitly designated element via an `initialFocusRef` prop.

### 5.3 Form Accessibility
- Every input component (`Input`, `Select`, `Textarea`, `Checkbox`, `Radio`) must integrate with `FormField` / `FormControl` wrappers.
- Dynamic error messages must be linked to inputs using `aria-describedby` and flagged with `aria-invalid="true"`.
- Required fields must specify `aria-required="true"`.
- Labels must be programmatically associated with inputs via `htmlFor` and matching `id`.

### 5.4 Screen Reader Compatibility
- Use semantic HTML elements first (`<button>`, `<input>`, `<nav>`, `<main>`, `<dialog>`).
- Supplement with ARIA attributes only where semantic HTML is insufficient (`aria-expanded`, `aria-haspopup`, `aria-controls`, `aria-checked`, `aria-selected`).
- Announcements for asynchronous updates (toasts, alerts) must utilize `aria-live="polite"` or `aria-live="assertive"`.

### 5.5 Focus Rings & Reduced Motion
- **Focus Rings:** All interactive controls must render a clearly discernible focus ring via `:focus-visible`. A 2px solid primary ring with a 2px offset (transparent gap) ensures visibility against any surface background.
- **Reduced Motion:** If `prefers-reduced-motion: reduce` is detected, all transitions and animations must collapse to `0ms` duration or instantaneous opacity fades.

---

## 6. Performance & Bundle Size Requirements

Chellaa React must deliver instantaneous rendering and lean bundle footprints.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Bundle Budget Guidelines                        │
├─────────────────────────────┬─────────────────┬────────────────────────┤
│ Component Class             │ Max Min+Gzip    │ Example                │
├─────────────────────────────┼─────────────────┼────────────────────────┤
│ Core Primitives             │ ≤ 2.5 KB        │ Button, Badge, Text    │
│ Form Controls               │ ≤ 4.0 KB        │ Input, Checkbox, Radio │
│ Layout Primitives           │ ≤ 2.0 KB        │ Box, Stack, Flex, Grid │
│ Complex Overlays            │ ≤ 7.5 KB        │ Dialog, Popover, Menu  │
│ Entire Library (Unshaken)   │ ≤ 45.0 KB       │ Full bundle            │
└─────────────────────────────┴─────────────────┴────────────────────────┘
```

### 6.1 Runtime Overhead Elimination
- **Zero Runtime Style Invalidation:** No CSS parsing, hash generation, or dynamic `<style>` injection during JavaScript render passes.
- **CSS Variable Rendering:** Dynamic theming, colors, and spatial adjustments are resolved natively by the browser CSS engine via custom properties.
- **Zero Re-Render Theme Toggling:** Toggling between light and dark modes must execute in **O(1)** time by modifying a DOM attribute (`data-theme`), requiring **zero component re-renders** in React.

### 6.2 Tree Shaking & Module Architecture
- The package must be marked with `"sideEffects": ["*.css", "**/*.css"]`.
- JavaScript modules must be pure. Importing `{ Button }` from `@chellaa/react` must bundle **only** the Button code and its direct dependencies. The bundler must completely eliminate unreferenced components (e.g., Modal, DatePicker, Table).
- Component-level tree-shaking must be verified using automated bundle-analyzer tests in CI.

---

## 7. Server-Side Rendering (SSR) & RSC Requirements

### 7.1 Hydration Safety & Determinism
- **No Direct Browser API Access during Render:** Components must never access `window`, `document`, `navigator`, or `localStorage` during initial render. All browser API interactions must be deferred to `useEffect` / `useLayoutEffect` (or an SSR-safe `useIsomorphicLayoutEffect`).
- **Zero Hydration Mismatch:** Generated HTML on the server must match client-rendered HTML character-for-character. Deterministic IDs from React 18's `useId()` must be used for all DOM associations.

### 7.2 Zero-Flash Theme Initialization (FOUC Prevention)
- Theme initialization must support an inline script snippet (`ThemeScript`) rendered in the `<head>` of the consumer's HTML document (e.g., in Next.js `layout.tsx` or Remix `root.tsx`).
- This script reads the user's stored theme preference from `localStorage` or evaluates `window.matchMedia('(prefers-color-scheme: dark)')` and sets the `data-theme` attribute on the root `<html>` element *before* the browser paints the first pixel. This eliminates the Flash of Unstyled Content (FOUC).

---

## 8. Customization & Extensibility Requirements

Consumers must be able to customize the design system at every layer without modifying the library source or using brittle CSS hacks:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Customization Hierarchy                         │
├───────────────────────┬────────────────────────────────────────────────┤
│ Layer                 │ Customization Mechanism                        │
├───────────────────────┼────────────────────────────────────────────────┤
│ 1. Global Tokens      │ Override CSS variables at :root or theme level │
├───────────────────────┼────────────────────────────────────────────────┤
│ 2. Scoped Sub-tree    │ Override CSS variables on a parent container   │
├───────────────────────┼────────────────────────────────────────────────┤
│ 3. Class Name Hooks   │ Target predictable scoped classes (.cl-button) │
├───────────────────────┼────────────────────────────────────────────────┤
│ 4. Inline Overrides   │ Direct style={{ ... }} prop pass-through       │
├───────────────────────┼────────────────────────────────────────────────┤
│ 5. Slot Composition   │ asChild composition with custom React elements │
└───────────────────────┴────────────────────────────────────────────────┘
```

1. **Global Design Tokens:** Consumers can customize colors, fonts, spacing, and border radii by defining CSS variable overrides in their global stylesheet or via `<ThemeProvider theme={customTheme}>`.
2. **Sub-tree Theme Scoping:** Consumers can nest `<ThemeProvider theme={brandTheme}>` or add `data-theme="dark"` to any container to re-theme a localized section (e.g., a dark sidebar in a light app).
3. **Class Name Escape Hatches:** Every component renders a standardized, predictable BEM-style CSS class (e.g., `cl-button`, `cl-button--solid`, `cl-button--md`) alongside any consumer-provided `className`.
4. **Style Pass-Through:** Every component forwards `className` and `style` props directly to the underlying DOM node.

---

## 9. Theme Architecture Requirements

The theme system must provide:
- **Light Mode:** Default high-contrast, accessible light palette.
- **Dark Mode:** Carefully balanced, low-glare dark palette with true surface elevation.
- **System Preference:** Automatic synchronization with OS `prefers-color-scheme` settings.
- **Custom Brand Themes:** Ability to define custom color schemes, typography, and corner radiuses.
- **Theme Persistence:** Optional persistence of user choice in `localStorage`.
- **Runtime Theme Switcher Hook:** A React hook `useTheme()` providing:
  - `mode`: Current selected mode (`"light" | "dark" | "system"`).
  - `resolvedMode`: Active computed mode (`"light" | "dark"`).
  - `setMode`: Function to update theme mode.
  - `toggleMode`: Function to toggle between light and dark modes.

---

## 10. Package Distribution & Tooling Requirements

### 10.1 NPM Package Structure
- Primary package: `@chellaa/react`.
- Published artifacts must include:
  - `dist/index.mjs` (ES Module bundle for modern bundlers).
  - `dist/index.cjs` (CommonJS bundle for legacy Node.js/Jest environments).
  - `dist/index.d.ts` (TypeScript type declarations).
  - `dist/styles.css` (Pre-compiled, minified core stylesheet).
- Package `package.json` must feature modern conditional exports:

```json
{
  "name": "@chellaa/react",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./styles.css": "./dist/styles.css"
  }
}
```

### 10.2 Peer Dependencies
- Peer dependencies must be strictly constrained:
  - `react: ">=18.2.0"`
  - `react-dom: ">=18.2.0"`
- Chellaa React must not force bulky runtime dependencies (such as Emotion, styled-components, lodash, or Moment.js) into consumer `node_modules`.

---

## 11. Consumer Experience (CX) Standard

The overarching acceptance test for Chellaa React is the **Zero-Config Consumer Standard**:

```bash
# 1. Single install command
npm install @chellaa/react
```

```tsx
// 2. Global CSS import once in root layout:
import "@chellaa/react/styles.css";

// 3. Immediate, frictionless consumption anywhere in the app:
import { Button, Card, ThemeProvider } from "@chellaa/react";

export default function Page() {
  return (
    <ThemeProvider>
      <Card variant="elevated">
        <Button variant="primary">Hello Chellaa</Button>
      </Card>
    </ThemeProvider>
  );
}
```

No Babel plugins, no Webpack loaders, no PostCSS custom plugins, and no tailwind config gymnastics required. It works out-of-the-box in Next.js (App & Pages), Vite, Remix, Astro, and CRA.
