# Chellaa React — Hybrid Design Token, Styling Engine & Theme System Specification

**Document Version:** 1.0.0  
**Status:** Approved Architectural Specification (Workflow B)  
**Target Package:** `@chellaa/react`  
**Governing ADRs:** ADR-001, ADR-002, ADR-003, ADR-007, ADR-011  

---

## 1. Goals, Non-Goals & Core Philosophy

### 1.1 Architectural Goals
1. **Material UI-Inspired Ergonomics & Flexibility**: Provide an intuitive `styled()` component factory and responsive `sx` prop engine for rapid, type-safe custom UI composition.
2. **Ant Design-Style Design Token Rigor**: Establish a mathematically consistent, 3-tier token hierarchy (`--cl-*`) ensuring cohesive color contrast, spatial scales, typographic ramps, and elevation lighting.
3. **Static Core Component Performance**: Core components must render using precompiled native CSS wrapped in `@layer cl-components`, guaranteeing 0 KB runtime CSS calculation during standard rendering.
4. **Zero-Configuration Consumer Delivery**: Provide out-of-the-box styling delivery where importing `{ Button } from "@chellaa/react"` works automatically in modern bundlers without requiring manual CSS imports or external Tailwind configurations.
5. **Seamless Light / Dark Mode & Custom Brand Theming**: Instant theme switching powered by native CSS custom properties and `[data-theme]` attribute swapping, with complete FOUC prevention via `ThemeScript`.
6. **Robust Multi-Environment Compatibility**: Full support for React 18 & 19, Next.js App Router (RSC & SSR), Vite, Remix, Node.js ESM, and CommonJS consumers.

### 1.2 Explicit Non-Goals
1. **No Tailwind CSS Dependency**: Chellaa React will never require Tailwind CSS, PostCSS plugins, or Tailwind configuration files in consumer applications.
2. **No Arbitrary Runtime CSS-in-JS for Core Components**: Core components will not compute base styles dynamically on every render when native CSS custom properties can achieve the same result.
3. **No 100% MUI Internal Duplication**: We will not duplicate MUI's legacy JSS or complex internal private engines; we implement a clean, lightweight architecture tailored for Chellaa React.
4. **No Breaking Public API Changes**: Existing component props (`variant`, `size`, `colorScheme`, `isDisabled`, `isLoading`, `asChild`) and exported symbols remain strictly backwards-compatible.

---

## 2. Three-Tier Design Token Architecture

All visual styling decisions in Chellaa React flow through a three-tier token hierarchy defined entirely in CSS Custom Properties (`--cl-*`).

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ Tier 1: Primitive Tokens (Global, Raw Mathematical & Palette Values)    │
│ Example: --cl-palette-indigo-600: #4f46e5;  --cl-space-4: 1rem (16px);   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Tier 2: Semantic Tokens (Design Intent & Context-Aware Theme Values)     │
│ Example: --cl-color-primary-base: var(--cl-palette-indigo-600);          │
│          --cl-color-bg-canvas:    var(--cl-palette-white);              │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Tier 3: Component Tokens (Component-Specific Customization Mappings)    │
│ Example: --cl-button-primary-bg: var(--cl-color-primary-base);           │
│          --cl-input-border:      var(--cl-color-border-default);         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Tier 1: Primitive Tokens (`tokens.css`)

Primitive tokens represent static, context-free raw values organized into `@layer cl-tokens`:

| Category | Token Prefix | Scale / Description | Example Value |
| :--- | :--- | :--- | :--- |
| **Color Palettes** | `--cl-palette-<color>-<step>` | 10-step harmonic ramps: `slate`, `indigo`, `violet`, `emerald`, `amber`, `rose`, `sky` (steps 50–950), plus `white` and `black`. | `--cl-palette-indigo-500: #6366f1;` |
| **Spacing Scale** | `--cl-space-<step>` | 4px/8px baseline grid: 0 (0px), 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px). | `--cl-space-4: 1rem;` |
| **Typography Scale** | `--cl-font-<size>`, `--cl-line-height-<size>`, `--cl-letter-spacing-<size>` | Typographic scale from `xs` (12px) to `5xl` (48px) with optical tracking. | `--cl-font-base: 1rem;` |
| **Font Weights** | `--cl-font-weight-<weight>` | `regular` (400), `medium` (500), `semibold` (600), `bold` (700). | `--cl-font-weight-semibold: 600;` |
| **Border Radii** | `--cl-rad-<size>` | `none` (0px), `xs` (2px), `sm` (4px), `md` (6px), `lg` (8px), `xl` (12px), `2xl` (16px), `full` (9999px). | `--cl-rad-md: 6px;` |
| **Elevation Shadows**| `--cl-shadow-<elevation>` | 24-level optical depth scale based on composite Umbra, Penumbra, and Ambient light sources. | `--cl-shadow-md: 0 4px 6px -1px rgba(0,0,0,0.07)...` |
| **Z-Index Scale** | `--cl-z-<layer>` | `deep` (-1), `base` (0), `raised` (10), `dropdown` (1000), `sticky` (1100), `backdrop` (1200), `modal` (1300), `popover` (1400), `toast` (1500), `tooltip` (1600). | `--cl-z-modal: 1300;` |
| **Motion & Easing** | `--cl-duration-<speed>`, `--cl-ease-<curve>` | Durations: `fast` (150ms), `normal` (250ms), `slow` (350ms). Easings: `default`, `in`, `out`, `spring`. Automatically drops to 0ms when `prefers-reduced-motion: reduce`. | `--cl-duration-fast: 150ms;` |

### 2.2 Tier 2: Semantic Tokens (`theme.css`)

Semantic tokens assign intent to primitive tokens and swap automatically based on `[data-theme="light"]` vs `[data-theme="dark"]` in `@layer cl-theme`:

```css
@layer cl-theme {
  :root, [data-theme="light"] {
    --cl-color-bg-canvas: var(--cl-palette-white);
    --cl-color-bg-surface: var(--cl-palette-slate-50);
    --cl-color-bg-elev: var(--cl-palette-white);
    --cl-color-fg-primary: var(--cl-palette-slate-900);
    --cl-color-fg-muted: var(--cl-palette-slate-500);
    --cl-color-border-default: var(--cl-palette-slate-300);
    --cl-color-primary-base: var(--cl-palette-indigo-600);
    --cl-color-primary-hover: var(--cl-palette-indigo-700);
    --cl-color-focus-ring: rgba(99, 102, 241, 0.45);
  }

  [data-theme="dark"] {
    --cl-color-bg-canvas: var(--cl-palette-slate-950);
    --cl-color-bg-surface: #131b2e;
    --cl-color-bg-elev: var(--cl-palette-slate-800);
    --cl-color-fg-primary: var(--cl-palette-slate-50);
    --cl-color-fg-muted: var(--cl-palette-slate-400);
    --cl-color-border-default: var(--cl-palette-slate-700);
    --cl-color-primary-base: var(--cl-palette-indigo-500);
    --cl-color-primary-hover: var(--cl-palette-indigo-400);
    --cl-color-focus-ring: rgba(129, 140, 248, 0.55);
  }
}
```

### 2.3 Tier 3: Component Tokens (`theme.css`)

Component tokens define component-specific design decisions and reference semantic tokens:
- **Button**: `--cl-button-primary-bg`, `--cl-button-primary-fg`, `--cl-button-primary-hover-bg`, `--cl-button-danger-bg`, etc.
- **Input / Textarea**: `--cl-input-bg`, `--cl-input-fg`, `--cl-input-border`, `--cl-input-focus-border`, `--cl-input-invalid-border`, `--cl-input-placeholder`.
- **Card / Paper**: `--cl-card-bg`, `--cl-card-border`, `--cl-card-elevated-bg`, `--cl-paper-bg`.
- **Checkbox / Radio / Switch**: `--cl-checkbox-bg`, `--cl-checkbox-border`, `--cl-checkbox-checked-bg`, `--cl-switch-track-bg`, `--cl-switch-thumb-bg`.
- **Modal / Dialog**: `--cl-dialog-bg`, `--cl-dialog-border`, `--cl-dialog-backdrop`.

---

## 3. Static CSS Architecture & Standards

### 3.1 CSS Cascade Layers & Scoping Policy
To ensure deterministic specificity and effortless consumer overrides without `!important`:
1. **Layer Hierarchy**:
   ```css
   @layer cl-reset, cl-tokens, cl-theme, cl-components, cl-utilities;
   ```
2. **Component Isolation**: Every component stylesheet (`<Component>.styles.css`) is wrapped inside `@layer cl-components`.
3. **Class Namespacing**: All CSS class names follow the strict `.cl-<component>[__<element>][--<modifier>]` namespace (e.g. `.cl-button`, `.cl-button--solid`, `.cl-button--md`, `.cl-button--loading`).
4. **Zero Inline Hardcoding**: Component stylesheets must never use hard-coded hex codes, pixel spacings, or ad-hoc box-shadows. Every value must reference `--cl-*`.

### 3.2 Component-by-Component Styling Classification Matrix

| # | Component | Current Implementation | Target Styling Approach | Migration Priority | Validation Requirement |
| :- | :--- | :--- | :--- | :-: | :--- |
| 1 | **Button** | Collocated `.styles.css` + CSS variables + Emotion touch ripple bridge | Static native CSS (`Button.styles.css`) + Ripple | 🟢 Done | 50 Vitest unit/a11y tests passing |
| 2 | **ButtonGroup**| Collocated `.styles.css` + CSS variables + Context | Static native CSS (`ButtonGroup.styles.css`) | 🟢 Done | Storybook + visual check passing |
| 3 | **Input** | Emotion `styled` | Static native CSS (`Input.styles.css`) in `@layer cl-components` | 🔴 **Batch 1 (P0)** | Representative migration + Vitest |
| 4 | **Textarea** | Emotion `styled` | Static native CSS (`Textarea.styles.css`) in `@layer cl-components` | 🟡 **Batch 2 (P1)** | Vitest autoResize & counter tests |
| 5 | **FormField** | Emotion `styled` | Static native CSS (`FormField.styles.css`) in `@layer cl-components` | 🟡 **Batch 2 (P1)** | Vitest a11y context tests |
| 6 | **Checkbox** | Emotion `styled` | Static native CSS (`Checkbox.styles.css`) in `@layer cl-components` | 🟡 **Batch 2 (P1)** | Vitest group & indeterminate tests |
| 7 | **Radio** | Emotion `styled` | Static native CSS (`Radio.styles.css`) in `@layer cl-components` | 🟡 **Batch 2 (P1)** | Vitest group keyboard navigation |
| 8 | **Switch** | Emotion `styled` | Static native CSS (`Switch.styles.css`) in `@layer cl-components` | 🟡 **Batch 2 (P1)** | Vitest a11y role="switch" tests |
| 9 | **Paper** | Emotion `styled` (M3 Dark Overlay) | Static native CSS (`Paper.styles.css`) + M3 elevation tint | 🔵 **Batch 3 (P2)** | 7 Vitest elevation tests |
| 10| **Card** | Emotion `styled` + CardContext | Static native CSS (`Card.styles.css`) + size context | 🔵 **Batch 3 (P2)** | Compound sub-zone layout tests |
| 11| **Box** | Emotion `styled` (Universal sx primitive) | Hybrid: Lightweight `sx` engine backed by CSS variables | 🔵 **Batch 4 (P2)** | sx parsing & polymorphism tests |
| 12| **Stack** | Emotion `styled` (1D Layout primitive) | Hybrid: CSS flexbox classes + dynamic gap fallback | 🔵 **Batch 4 (P2)** | 6 Vitest spacing & divider tests |
| 13| **Flex** | Emotion `styled` | Static native CSS classes (`Flex.styles.css`) | 🔵 **Batch 4 (P2)** | 7 Vitest center/inline tests |
| 14| **Grid** | Emotion `styled` (12-col grid) | Static native CSS grid (`Grid.styles.css`) | 🔵 **Batch 4 (P2)** | 6 Vitest responsive span tests |
| 15| **Container**| Emotion `styled` | Static native CSS (`Container.styles.css`) | 🔵 **Batch 4 (P2)** | 8 Vitest maxWidth & a11y tests |
| 16| **Divider** | Emotion `styled` | Static native CSS (`Divider.styles.css`) | 🔵 **Batch 5 (P3)** | Orientation & label tests |
| 17| **Typography**| Emotion `styled` | Static native CSS (`Typography.styles.css`) | 🔵 **Batch 5 (P3)** | Semantic heading & clamp tests |
| 18| **Kbd** | Emotion `styled` | Static native CSS (`Kbd.styles.css`) | 🔵 **Batch 5 (P3)** | 10 Vitest shortcut tests |

---

## 4. Dynamic Styling Engine Contract (`styled()` & `sx`)

### 4.1 `styled(Component, options)` Factory
The `styled()` factory wraps components with Emotion's underlying creator while guaranteeing:
1. **Automatic `sx` parsing**: Evaluates responsive arrays/objects and theme shortcuts.
2. **Theme Overrides Resolution**: Automatically applies `theme.components[name].styleOverrides[slot]`.
3. **Strict DOM Prop Filtering**: `rootShouldForwardProp` filters `sx`, `theme`, `ownerState`, and transient props (`$*`) from leaking to the DOM.
4. **First-Class Polymorphism**: Fully supports the `as` prop for element switching with preserved type inference.

### 4.2 The Responsive `sx` Prop Engine
The `sx` prop engine translates shorthand system props to CSS declarations:
- **Spacing multipliers**: `p: 2` $\rightarrow$ `padding: 16px;` (or `var(--cl-space-2)`).
- **Theme Palette resolution**: `bgcolor: "primary.main"` $\rightarrow$ `background-color: var(--cl-color-primary-base);`.
- **Responsive Arrays & Objects**:
  ```tsx
  <Box sx={{ width: ["100%", "50%", "33.3%"], p: { xs: 2, md: 4 } }} />
  ```
  Resolves to CSS media queries: `@media (min-width: 0px)`, `@media (min-width: 600px)`, `@media (min-width: 900px)`.

---

## 5. Theme System Specification

### 5.1 Public Theme APIs

```tsx
import {
  ThemeProvider,
  useTheme,
  createTheme,
  ThemeScript
} from "@chellaa/react";
```

1. **`createTheme(options?: ThemeOptions): ChellaaTheme`**:
   Deeply merges user customizations into the standard theme object (`palette`, `typography`, `spacing`, `shadows`, `breakpoints`, `zIndex`, `transitions`, `components.styleOverrides`).

2. **`<ThemeProvider>` Component**:
   - Manages active theme preference (`"light" | "dark" | "system"`).
   - Resolves system preference via `window.matchMedia('(prefers-color-scheme: dark)')`.
   - Automatically synchronizes `data-theme="light|dark"` attribute on `document.documentElement` (or scoped container).
   - Provides `ThemeContext` and `EmotionThemeProvider` context simultaneously.

3. **`useTheme(): ExtendedThemeContextValue`**:
   Exposes `{ theme, setTheme, resolvedTheme, activeTheme, colorMode, setColorMode, themeObject }`.

4. **`<ThemeScript>` Component**:
   Zero-dependency inline script for application `<head>` that reads `localStorage` / system theme and applies `data-theme` prior to initial paint, preventing any theme flicker (FOUC).

---

## 6. Public Consumer Experience & Zero-Config Delivery

### 6.1 Ideal Consumer Consumption
```tsx
import * as React from "react";
import { Button, Input, ThemeProvider } from "@chellaa/react";

export function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Input placeholder="Enter email..." />
      <Button variant="solid" colorScheme="primary">
        Submit
      </Button>
    </ThemeProvider>
  );
}
```

### 6.2 Packaging & Export Map Specification
```json
{
  "exports": {
    ".": {
      "types": {
        "import": "./dist/index.d.ts",
        "require": "./dist/index.d.cts"
      },
      "browser": {
        "import": "./dist/index.mjs",
        "require": "./dist/index.cjs"
      },
      "node": {
        "import": "./dist/index.node.mjs",
        "require": "./dist/index.cjs"
      },
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "default": "./dist/index.mjs"
    },
    "./styles.css": {
      "import": {
        "types": "./dist/styles.css.d.ts",
        "default": "./dist/styles.css"
      },
      "require": {
        "types": "./dist/styles.css.d.cts",
        "default": "./dist/styles.css"
      }
    }
  }
}
```

---

## 7. Dependency & Performance Policy

1. **Emotion Dependency Classification**:
   - `@emotion/react` and `@emotion/styled` are packaged as **direct runtime dependencies** of `@chellaa/react` to guarantee seamless execution of `styled()`, `sx`, and polymorphic primitives out of the box without requiring manual consumer peer-dependency installations.
2. **Performance Budget**:
   - **Compiled Master CSS (`dist/styles.css`)**: Maximum **35 KB** minified.
   - **ESM Bundle Size (`dist/index.mjs`)**: Maximum **160 KB** minified.
   - **Runtime Core Component Styling**: 0 ms JavaScript execution for static class rendering.

---

## 8. Incremental Component Migration Strategy

### 8.1 Phased Migration Batches
- **Batch 1 (Representative Integration - Workflow E)**:
  - `Button` (Validate existing static CSS + Ripple)
  - `Input` (Migrate from Emotion to `Input.styles.css` with `@layer cl-components`)
- **Batch 2 (Form Controls - Workflow F1)**:
  - `Textarea`, `FormField`, `Checkbox`, `Radio`, `Switch`
- **Batch 3 (Surfaces & Visual Display - Workflow F2)**:
  - `Paper`, `Card`, `Typography`, `Kbd`
- **Batch 4 (Layout & Spacing Primitives - Workflow F3)**:
  - `Box`, `Stack`, `Flex`, `Grid`, `Container`, `Divider`

### 8.2 Migration Safety & Rollback Criteria
1. **Visual Parity**: Every migrated component must maintain pixel-perfect visual equivalence in Storybook across all variants, sizes, and light/dark modes.
2. **Zero Prop Breakage**: All existing props, event handlers, and ref forwarding mechanisms must remain 100% backward compatible.
3. **Automated Test Gate**: Vitest test suite and axe-core accessibility checks must pass with 0 failures before any batch is marked complete.
4. **Rollback Trigger**: If a migrated component breaks consumer SSR or causes style regression in `test-consumer`, changes are immediately reverted via Git branch checkpointing.

---

## 9. Requirements, Acceptance Criteria & Traceability Matrix

| Requirement ID | Requirement Description | Implementation Target | Validation Method |
| :--- | :--- | :--- | :--- |
| **REQ-TOK-01** | 3-Tier Design Token Hierarchy (`--cl-*`) | `tokens.css`, `theme.css` | LightningCSS compilation + Storybook Token inspector |
| **REQ-CSS-01** | Component CSS Scoped to `@layer cl-components` | Collocated `.styles.css` | CSS build bundle check (`dist/styles.css`) |
| **REQ-THM-01** | Light/Dark/System Theme Switching | `ThemeProvider.tsx`, `useTheme.ts` | Vitest ThemeProvider tests + Storybook theme switcher |
| **REQ-THM-02** | FOUC-Prevention Script | `ThemeScript.tsx` | SSR hydration benchmark in `test-consumer` |
| **REQ-SYS-01** | Type-Safe `styled()` & `sx` System | `styled.ts`, `sx.ts` | `sx.test.ts`, `styled.test.tsx` Vitest suite |
| **REQ-PKG-01** | Zero-Config Browser / Clean Node SSR Entry Points | `build-css.mjs`, `tsup.config.ts` | `benchmark-node-esm.mjs`, `benchmark-ssr.mjs` |
| **REQ-A11Y-01**| WCAG 2.1 AA & Keyboard Focus Rings | All component styles | `vitest-axe` automated accessibility checks (0 violations) |

---

## 10. Risk & Unresolved Decision Register

| Risk ID | Description | Severity | Mitigation Strategy |
| :--- | :--- | :---: | :--- |
| **RSK-01** | CSS Specificity conflict between static CSS and `sx` overrides | Low | `styled.ts` appends `parseSx` styles as the final Emotion class name, guaranteeing `sx` wins over base classes. |
| **RSK-02** | `apps/docs` TypeScript build failure due to missing Vite client types | Medium | Fix `apps/docs/tsconfig.json` during Workflow C/D prep. |
| **RSK-03** | Turbo `pnpm run lint` missing script execution | Low | Configure ESLint/Biome in root and package configs during Workflow C. |

---

## 11. Prerequisites & Inputs for Workflow C (Preparation Phase)

Upon approval of this specification, **Workflow C** will:
1. Audit and formalize the 8-stage engineering workflows in `workflows/`.
2. Define the **10 modular skill definitions** in `skills/` (Purpose, Procedures, Validation, Inputs/Outputs).
3. Assign explicit **Role Responsibilities & Review Gates** (Architecture Owner, Design System Engineer, React Component Engineer, Build Engineer, Quality Engineer, Documentation Engineer, Independent Reviewer).
