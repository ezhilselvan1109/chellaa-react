# Chellaa React — Engineering Standards

## Document 03: CSS Architecture & Styling Standards

**Document Status:** Ready to Freeze  
**Phase:** 2 — Engineering Standards  
**Target Package:** `@chellaa/react`  
**Styling Paradigm:** Scoped Static CSS + Semantic CSS Custom Properties

---

## 1. Executive Summary & Purpose

Chellaa React enforces a **Zero-Runtime JavaScript Styling Architecture**. Component styles are written as modular, scoped static CSS files governed by semantic CSS custom properties and isolated inside a modern CSS `@layer cl-components`.

This document codifies the naming conventions, selector specificity constraints, token mapping disciplines, focus ring standards, motion accessibility rules, prohibitions (including the strict ban on Tailwind dependencies), and the ongoing CSS delivery benchmarking framework mandated by **ADR-007**.

---

## 2. Naming Conventions & Namespace Standards

All CSS classes in Chellaa React strictly utilize the namespaced prefix **`.cl-`** and adhere to a predictable BEM-inspired naming convention.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CSS Selector Conventions                        │
├───────────────────┬──────────────────────────┬─────────────────────────┤
│ Pattern           │ Syntax                   │ Example                 │
├───────────────────┼──────────────────────────┼─────────────────────────┤
│ Component Root    │ .cl-<component>          │ .cl-button, .cl-dialog  │
├───────────────────┼──────────────────────────┼─────────────────────────┤
│ Sub-element/Part  │ .cl-<comp>__<element>    │ .cl-dialog__backdrop    │
├───────────────────┼──────────────────────────┼─────────────────────────┤
│ Visual Variant    │ .cl-<comp>--<variant>    │ .cl-button--solid       │
├───────────────────┼──────────────────────────┼─────────────────────────┤
│ Size Modifier     │ .cl-<comp>--<size>       │ .cl-button--sm, --lg    │
├───────────────────┼──────────────────────────┼─────────────────────────┤
│ State Modifier    │ .is-<state>              │ .is-loading, .is-active │
├───────────────────┼──────────────────────────┼─────────────────────────┤
│ ARIA/Data State   │ [data-state='<value>']   │ [data-state='open']     │
└───────────────────┴──────────────────────────┴─────────────────────────┘
```

### 2.1 File Organization & Collocation

- Component-specific styles are collocated directly inside the component folder:
  `src/components/Button/Button.styles.css`
- Global design token definitions and theme layers live in:
  - `src/styles/tokens.css` (Primitive token scales)
  - `src/styles/theme.css` (Semantic token assignments for Light/Dark)
  - `src/styles/reset.css` (Box-sizing and font baseline resets)

---

## 3. Design Token Disciplines: The `--cl-*` System

### 3.1 Design System Values vs. Intrinsic CSS Mechanism Values

To balance design consistency with browser reality, Chellaa React strictly distinguishes between **reusable design-system decisions** and **intrinsic CSS mechanism values**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Tokenized vs. Intrinsic Value Policy                 │
├─────────────────────┬───────────────────┬──────────────────────────────┤
│ Value Category      │ Token Requirement │ Scope & Permitted Examples   │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Design-System       │ MUST use --cl-*   │ Spacing, typography scales,  │
│ Decisions           │ CSS custom props  │ colors, radii, shadows, card │
│                     │                   │ dimensions, surface tints.   │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Intrinsic CSS       │ Raw values        │ 1px / 2px borders & outlines,│
│ Mechanism Values    │ permitted locally │ 0.01ms motion suppression,   │
│                     │                   │ 0/transparent resets, CSS    │
│                     │                   │ transforms (translate3d).    │
└─────────────────────┴───────────────────┴──────────────────────────────┘
```

#### Prohibited Raw Values

Raw values are **prohibited** when they represent reusable design-system decisions:

- Spacing (`padding: 16px;` -> must use `var(--cl-space-4)`)
- Colors (`color: #4f46e5;` -> must use `var(--cl-color-pri-base)`)
- Typography (`font-size: 14px;` -> must use `var(--cl-font-size-sm)`)
- Radii (`border-radius: 6px;` -> must use `var(--cl-rad-md)`)
- Elevation (`box-shadow: 0 4px 6px ...;` -> must use `var(--cl-shadow-md)`)

#### Permitted Intrinsic Mechanism Values

Intrinsic CSS mechanism values are **permitted** when required for:

- Accessibility outlines: `outline: 2px solid var(--cl-color-pri-base); outline-offset: 2px;`
- Hairline borders: `border: 1px solid var(--cl-color-border-sub);`
- Animation & reduced-motion resets: `transition-duration: 0.01ms;`
- Reset clears: `margin: 0;`, `border: 0;`, `background: transparent;`
- Transform positioning: `transform: translate3d(0, 0, 0);`

Such intrinsic values must remain local and should not become reusable design tokens unless the design system intentionally elevates them as a global token scale.

### 3.1 Standard Token Prefixes

- Colors: `--cl-color-<semantic-intent>-<state>`
- Typography: `--cl-font-sans`, `--cl-font-size-<scale>`, `--cl-line-height-<scale>`
- Spacing: `--cl-space-<step>` (e.g., `--cl-space-1` = 4px, `--cl-space-4` = 16px)
- Radii: `--cl-rad-<step>` (e.g., `--cl-rad-sm`, `--cl-rad-md`, `--cl-rad-lg`)
- Shadows: `--cl-shadow-<scale>` (e.g., `--cl-shadow-sm`, `--cl-shadow-md`)
- Z-Index: `--cl-z-<layer>` (e.g., `--cl-z-modal`, `--cl-z-toast`)
- Motion: `--cl-duration-<speed>`, `--cl-ease-<curve>`

---

## 4. Specificity Control & The `@layer` Mandate

To permanently eliminate CSS specificity wars and prevent consumer application overrides from breaking:

### 4.1 CSS Layer Isolation

All Chellaa React component styles must be authored within the `@layer cl-components` declaration:

```css
@layer cl-components {
  .cl-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--cl-font-sans);
    /* ... */
  }

  .cl-button--solid.cl-button--primary {
    background-color: var(--cl-color-pri-base);
    color: var(--cl-color-pri-fg);
  }
}
```

#### Why `@layer` is Mandated:

According to the CSS Cascading and Inheritance Level 5 specification, styles declared in an explicit `@layer` have lower cascade priority than unlayered styles. As a result, any custom CSS authored by consumer applications (e.g., `.my-custom-button { background: red; }`) **automatically overrides Chellaa React styles without requiring `!important`**.

### 4.2 Specificity Ceiling

- **Rule:** Selector depth must not exceed 2 classes (`.cl-button--solid.cl-button--primary`).
- Never write deeply nested descendent selectors (e.g., `.cl-card > div > ul > li > .cl-button`).
- Never target bare HTML tag names globally (`button`, `input`, `div`).

---

## 5. Focus Visibility, Motion & State Styling

### 5.1 Focus Visibility Standard

- Chellaa React components must render a high-contrast focus ring exclusively on keyboard focus via `:focus-visible`.
- **Prohibition:** `outline: none` is **strictly prohibited** unless accompanied by a visible focus ring replacement.
- Standard focus ring rule:
  ```css
  .cl-button:focus-visible {
    outline: 2px solid var(--cl-color-pri-base);
    outline-offset: 2px;
  }
  ```

### 5.2 Motion & Narrowly Scoped `!important` Accessibility Exception

All transitions and animations must use standard motion tokens and strictly respect `@media (prefers-reduced-motion: reduce)`.

#### The `!important` Rule & Narrow Exception

- `!important` is **strictly prohibited by default** across all component styling.
- A narrowly scoped exception is **permitted exclusively** when required for accessibility safety under `prefers-reduced-motion: reduce` to ensure non-essential animations cannot override user motion sensitivity preferences.

The accessibility exception must:

1. Remain strictly inside the component/style layer within a reduced-motion media query.
2. Be directly related to the accessibility safety requirement.
3. Include a clear code comment explaining why it is required.
4. Never be used for normal specificity management or to compensate for poor selector architecture.

```css
.cl-dialog__backdrop {
  transition: opacity var(--cl-duration-normal) var(--cl-ease-default);
}

@media (prefers-reduced-motion: reduce) {
  .cl-dialog__backdrop,
  .cl-button,
  .cl-input {
    /* Accessibility requirement: override all animated transitions for motion sensitivity */
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 5.3 Disabled State Rules

When a component is disabled (`:disabled` or `[aria-disabled='true']` or `.is-disabled`):

- Cursor must be `cursor: not-allowed;`
- Pointer events on pseudo-elements must be disabled.
- Opacity should be set using `--cl-opacity-disabled: 0.6;`
- Interactive hover effects must be silenced (`:hover:not(:disabled)`).

---

## 6. Prohibited Practices

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CSS Prohibitions Matrix                         │
├───────────────────────────────────┬────────────────────────────────────┤
│ Prohibited Item                   │ Technical Reason                   │
├───────────────────────────────────┼────────────────────────────────────┤
│ ❌ Tailwind CSS                   │ Violates zero-dependency and       │
│                                   │ zero-config styling requirements;  │
│                                   │ causes class collision bugs.       │
├───────────────────────────────────┼────────────────────────────────────┤
│ ❌ !important in components       │ Breaks consumer customization and  │
│                                   │ token cascading.                   │
├───────────────────────────────────┼────────────────────────────────────┤
│ ❌ Hardcoded Hex / RGB / Px       │ Breaks dark mode, custom themes,   │
│                                   │ and accessibility zoom scales.     │
├───────────────────────────────────┼────────────────────────────────────┤
│ ❌ Global element selectors       │ Pollutes consumer DOM styles.      │
├───────────────────────────────────┼────────────────────────────────────┤
│ ❌ Runtime CSS-in-JS (Emotion)    │ Breaks React 18/19 RSC, adds CPU   │
│                                   │ runtime overhead, causes FOUC.     │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 7. Automatic CSS Delivery & Benchmarking Framework (ADR-007)

### 7.1 Public Contract (Finalized)

Per **ADR-007**, consumers **never** manually import `@chellaa/react/styles.css`. Importing a component delivers its styles automatically:

```tsx
import { Button } from "@chellaa/react"; // Automatically styled!
```

### 7.2 Internal Delivery Mechanism (Open Benchmark Decision)

While the public contract is finalized, the internal delivery mechanism is **NOT finalized** until empirical benchmark evidence is established across target consumer environments.

#### Leading Candidate

- **Component-Level Static Side-Effect Imports:**
  - Component ESM files include relative static CSS imports (`import './Button.css'`).
  - Package manifest declares `"sideEffects": ["*.css", "**/*.css"]`.
  - **Explicit Prohibition:** `"sideEffects": false` is strictly prohibited. CSS imports are runtime-relevant side effects. Marking the package side-effect-free causes consumer bundlers to tree-shake required CSS, resulting in unstyled components.

#### Rejected Directions (Do Not Reintroduce)

1. **Client Runtime DOM Style Injection:** Incompatible with React Server Components, causes streaming SSR FOUC, inflates JS bundle, violates strict CSPs.
2. **Mandatory Bundler Plugins:** Violates the zero-configuration consumer standard.

### 7.3 Benchmark Matrix & Evaluation Criteria

Before finalizing the internal delivery configuration in Phase 3, the architecture must pass this comprehensive benchmark matrix:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CSS Delivery Validation Matrix                                  │
├───────────────────┬────────────────────┬───────────────────────────────────────────────┤
│ Target Platform   │ Environment        │ Required Acceptance Criteria                  │
├───────────────────┼────────────────────┼───────────────────────────────────────────────┤
│ 1. Next.js App    │ RSC + Client Comp  │ • Automatic CSS delivery works without error. │
│    Router         │ (React 18 & 19)    │ • Zero hydration mismatch warnings.           │
│                   │                    │ • No unexpected client boundary propagation.  │
│                   │                    │ • Clean production CSS chunk emission.        │
├───────────────────┼────────────────────┼───────────────────────────────────────────────┤
│ 2. Vite React SPA │ ESM (Dev & Prod)   │ • Instant Hot Module Replacement (HMR).       │
│                   │ (React 18 & 19)    │ • Deduplicated shared tokens in single bundle.│
│                   │                    │ • Zero manual configuration required.         │
├───────────────────┼────────────────────┼───────────────────────────────────────────────┤
│ 3. Remix SSR      │ Streaming SSR      │ • CSS links stream correctly without layout   │
│                   │                    │   shifts or FOUC flashes.                     │
├───────────────────┼────────────────────┼───────────────────────────────────────────────┤
│ 4. Vitest ESM     │ ESM Test Runner    │ • Seamless component test execution with DOM  │
│                   │                    │   style mocks.                                │
├───────────────────┼────────────────────┼───────────────────────────────────────────────┤
│ 5. Jest / Node    │ CommonJS (CJS)     │ • Node.js runtime executes without crashing   │
│                   │ Server Tests       │   on 'Unexpected token .' raw CSS imports.    │
└───────────────────┴────────────────────┴───────────────────────────────────────────────┘
```

#### Evaluation Metrics:

- Automatic CSS delivery reliability
- SSR and RSC compatibility
- CSS cascade ordering under `@layer cl-components`
- Token and stylesheet deduplication across components
- Granular tree-shaking efficacy
- Development and production build behavior

---

## 8. Summary: What Developers Must Do vs. Never Do

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CSS Rule Summary                              │
├───────────────────────────────────┬────────────────────────────────────┤
│ MUST DO                           │ NEVER DO                           │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Namespace all classes with .cl- │ • Never use Tailwind CSS.          │
│ • Wrap all CSS in @layer          │ • Never use !important for normal  │
│   cl-components.                  │   specificity management.          │
│ • Use --cl-* for design tokens    │ • Never hardcode reusable design-  │
│   (spacing, colors, typography).  │   system values.                   │
│ • Allow intrinsic CSS values for  │ • Never use "sideEffects": false.  │
│   mechanics (1px outline, 0.01ms).│ • Never exceed 2-class selector    │
│ • Use !important ONLY for the     │   depth.                           │
│   reduced-motion a11y exception.  │ • Never style bare HTML tags.      │
│ • Keep selectors under depth <= 2.│ • Never assume consumer imports    │
│ • Rely on automated CSS delivery. │   a global stylesheet.             │
└───────────────────────────────────┴────────────────────────────────────┘
```
