# Feedback Components Specification: Spinner, Skeleton & Progress

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications (Wave 2 / Tier 5 Feedback Primitives)  
**Specification ID:** SPEC-033  
**Target Package:** `@chellaa/react`  
**Revision:** 1.0.0  
**Priority:** P1 High  
**Governing Standard:** [00-component-specification-standard.md](./00-component-specification-standard.md), [01-api-conventions.md](./01-api-conventions.md), [ADR-007-zero-configuration-styling-delivery.md](../adr/ADR-007-zero-configuration-styling-delivery.md), [ADR-011-hybrid-styling-architecture-and-engine-boundary.md](../adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md)  
**Dependencies:** None (Zero external runtime dependencies; purely CSS token-driven primitives)  

---

## 1. Identity

```text
Component Names:   Spinner, Skeleton, Progress
Specification ID:  SPEC-033
Package Exports:   import { Spinner, Skeleton, Progress, type SpinnerProps, type SkeletonProps, type ProgressProps } from "@chellaa/react";
Category:          Feedback / Loading & Status
Status:            Approved & Implementation Ready
Phase:             Wave 2 — Interactive Primitives & Feedback
Priority:          P1 High
Version:           1.0.0
Related:           Button, Combobox, Card, Alert, Dialog
Governing ADRs:    ADR-007 (Zero-Config Styling), ADR-011 (Hybrid Styling)
```

---

## 2. Purpose & Problem Statement

### 2.1 Problem Statement
1. **Ad-hoc Loading Spinners:** Currently, `Button`, `Combobox`, and `Switch` embed inconsistent inline SVGs and ad-hoc `@keyframes` spin definitions. Consumers cannot render a standalone loading indicator for cards, table views, or async widgets without writing custom CSS.
2. **Layout Thrashing Without Skeletons:** When asynchronous data is fetched, blank views snap abruptly into fully rendered DOM trees, causing Cumulative Layout Shift (CLS) penalties and jarring user experiences.
3. **Inaccessible Progress Indicators:** Homemade progress bars frequently omit proper ARIA semantics (`role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`), or fabricate static numbers during indeterminate operations, confusing screen readers.
4. **Motion Sickness:** Loading animations that ignore `prefers-reduced-motion` can trigger vestibular disorders.

### 2.2 Why They Belong in Chellaa React
As an enterprise UI system, Chellaa React requires unified, accessible, token-driven loading and progress indicators that respect user accessibility preferences, adapt to light/dark themes, and prevent layout shifts.

---

## 3. Scope & Requirements

### 3.1 Spinner
- **FR-SP-01 (Configurable Sizes):** Support `xs` (12px), `sm` (16px), `md` (24px), `lg` (32px), `xl` (48px).
- **FR-SP-02 (Semantic Color Schemes):** Support `primary`, `neutral`, `success`, `danger`, `warning` mapped to semantic design tokens.
- **FR-SP-03 (Accessibility):** When `label` is provided, render `role="status"` with an accessible visually-hidden or aria-label; when omitted, render `aria-hidden="true"` so decorative spinners do not announce redundantly.
- **FR-SP-04 (Motion & Reduced Motion):** Smooth 360-degree rotation animation. When `prefers-reduced-motion: reduce` is active, slow animation down or stop rotation without breaking layout.
- **FR-SP-05 (Shared Animation Keyframes):** Use unified `@keyframes cl-spin` without breaking existing `Button` or `Combobox` styling.

### 3.2 Skeleton
- **FR-SK-01 (Shapes & Variants):** Support `text` (for typography lines), `circular` (for avatars/icons), `rectangular` (for cards/images), and `rounded` (for buttons/chips).
- **FR-SK-02 (Dimensions):** Configurable `width` and `height` accepting valid CSS strings (e.g. `"100%"`, `"4rem"`) or numeric pixel values (e.g. `40` -> `"40px"`).
- **FR-SK-03 (Animation Modes):** Support `pulse` (gentle opacity fade), `wave` (shimmer gradient sweep), and `none` (static placeholder).
- **FR-SK-04 (Loaded State Handling):** Support `isLoaded?: boolean`. When `isLoaded` is `true`, render wrapped child components directly; when `false`, render the skeleton placeholder with dimensions.
- **FR-SK-05 (Accessibility):** Placeholder skeleton elements MUST have `aria-hidden="true"` to prevent screen readers from reading meaningless filler content.
- **FR-SK-06 (Reduced Motion):** Under `prefers-reduced-motion: reduce`, animations are disabled (`animation: none`), preserving static background.

### 3.3 Progress
- **FR-PR-01 (Visual Variants):** Support both `linear` (horizontal track) and `circular` (radial SVG track) representations.
- **FR-PR-02 (Determinate & Indeterminate Modes):**
  - Determinate: `value` is provided as a number. Value is clamped safely between `min` (default 0) and `max` (default 100).
  - Indeterminate: `value` is `undefined` or omitted. Renders animated looping indicator.
- **FR-PR-03 (Semantic Colors & Sizes):** Sizes `xs`, `sm`, `md`, `lg`. Color schemes `primary`, `success`, `warning`, `danger`.
- **FR-PR-04 (Stripes & Pulse Animation):** Support `hasStripe?: boolean` and `isAnimated?: boolean` for linear variant.
- **FR-PR-05 (Visible Value Labels):** Support `showValueLabel?: boolean` or custom label renderer.
- **FR-PR-06 (WAI-ARIA Progressbar):**
  - `role="progressbar"`.
  - When determinate: `aria-valuenow={clampedValue}`, `aria-valuemin={min}`, `aria-valuemax={max}`.
  - When indeterminate: omit `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
  - Accessible label via `aria-label` or `aria-labelledby`.
- **FR-PR-07 (Math Safety):** Guard against `NaN`, infinite ranges, or inverted `min > max` to prevent broken geometry.

---

## 4. Component Anatomy & DOM Model

### 4.1 Spinner
```html
<!-- Standalone Status Indicator -->
<svg class="cl-spinner cl-spinner--md cl-spinner--primary" role="status" aria-label="Loading..." viewBox="0 0 24 24">
  <circle class="cl-spinner__track" cx="12" cy="12" r="10" stroke-width="3" />
  <circle class="cl-spinner__head" cx="12" cy="12" r="10" stroke-width="3" />
</svg>
```

### 4.2 Skeleton
```html
<!-- Placeholder State (isLoaded=false) -->
<div class="cl-skeleton cl-skeleton--rectangular cl-skeleton--pulse" style="width: 200px; height: 120px;" aria-hidden="true"></div>

<!-- Loaded State (isLoaded=true) -->
<div class="card-content">Real content rendered</div>
```

### 4.3 Progress (Linear & Circular)
```html
<!-- Linear Determinate -->
<div class="cl-progress cl-progress--linear cl-progress--md cl-progress--primary" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
  <div class="cl-progress__track">
    <div class="cl-progress__bar" style="width: 65%;"></div>
  </div>
  <span class="cl-progress__label">65%</span>
</div>

<!-- Circular Determinate -->
<div class="cl-progress cl-progress--circular cl-progress--md cl-progress--primary" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
  <svg class="cl-progress__svg" viewBox="0 0 48 48">
    <circle class="cl-progress__circle-track" cx="24" cy="24" r="20" />
    <circle class="cl-progress__circle-head" cx="24" cy="24" r="20" stroke-dasharray="125.6" stroke-dashoffset="44" />
  </svg>
</div>
```

---

## 5. Public API & TypeScript Definitions

### 5.1 Spinner
```typescript
export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerColorScheme = "primary" | "neutral" | "success" | "danger" | "warning";

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  /** Size dimension of the spinner. Default: "md" */
  size?: SpinnerSize;
  /** Semantic color scheme. Default: "primary" */
  colorScheme?: SpinnerColorScheme;
  /** Accessible label announced to screen readers. If provided, sets role="status". Default: "Loading..." */
  label?: string;
  /** Stroke width in pixels. Default is scaled to size */
  thickness?: number;
}
```

### 5.2 Skeleton
```typescript
export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
export type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual shape of the skeleton placeholder. Default: "text" */
  variant?: SkeletonVariant;
  /** Width dimension (CSS string or number of pixels) */
  width?: string | number;
  /** Height dimension (CSS string or number of pixels) */
  height?: string | number;
  /** Whether data has loaded. When true, renders children instead of placeholder. Default: false */
  isLoaded?: boolean;
  /** Animation style. Default: "pulse" */
  animation?: SkeletonAnimation;
  /** Children rendered when isLoaded is true */
  children?: React.ReactNode;
}
```

### 5.3 Progress
```typescript
export type ProgressVariant = "linear" | "circular";
export type ProgressSize = "xs" | "sm" | "md" | "lg";
export type ProgressColorScheme = "primary" | "success" | "warning" | "danger";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress value. If omitted or undefined, component renders indeterminate. */
  value?: number;
  /** Minimum range value. Default: 0 */
  min?: number;
  /** Maximum range value. Default: 100 */
  max?: number;
  /** Size token. Default: "md" */
  size?: ProgressSize;
  /** Visual display variant. Default: "linear" */
  variant?: ProgressVariant;
  /** Semantic color scheme. Default: "primary" */
  colorScheme?: ProgressColorScheme;
  /** Whether linear bar displays diagonal stripes. Default: false */
  hasStripe?: boolean;
  /** Whether stripes are animated. Default: false */
  isAnimated?: boolean;
  /** Whether to display text percentage value. Default: false */
  showValueLabel?: boolean;
  /** Accessible name for assistive technologies */
  "aria-label"?: string;
  /** Accessible name referenced by element ID */
  "aria-labelledby"?: string;
}
```

---

## 6. Styling & Design Tokens Contract

All styles reside in `@layer cl-components` under `.cl-spinner`, `.cl-skeleton`, and `.cl-progress`:

### 6.1 Spinner Styles
- Sizes:
  - `xs`: 12px
  - `sm`: 16px
  - `md`: 24px
  - `lg`: 32px
  - `xl`: 48px
- Colors:
  - `primary`: `var(--cl-color-primary-base, #4f46e5)`
  - `neutral`: `var(--cl-color-text-secondary, #64748b)`
  - `success`: `var(--cl-color-success-base, #16a34a)`
  - `danger`: `var(--cl-color-danger-base, #dc2626)`
  - `warning`: `var(--cl-color-warning-base, #ca8a04)`
- Track: `var(--cl-color-border-default, #e2e8f0)` or `currentColor` with opacity `0.2`

### 6.2 Skeleton Styles
- Background: `var(--cl-color-surface-hover, #f1f5f9)` (in light theme) / `rgba(255, 255, 255, 0.08)` (in dark theme)
- Pulse animation: Opacity oscillating between 1.0 and 0.4 over 1.5s
- Wave animation: Shimmer gradient sliding across `background-position`
- Border radius:
  - `text`: `var(--cl-radius-xs, 4px)`
  - `circular`: `50%`
  - `rectangular`: `0`
  - `rounded`: `var(--cl-radius-md, 8px)`

### 6.3 Progress Styles
- Track background: `var(--cl-color-surface-hover, #e2e8f0)`
- Fill colors: semantic tokens for primary, success, warning, danger
- Linear heights: `xs` (4px), `sm` (8px), `md` (12px), `lg` (16px)
- Circular diameters: `xs` (24px), `sm` (36px), `md` (48px), `lg` (64px)

---

## 7. Reduced Motion & Accessibility

- When `prefers-reduced-motion: reduce` is detected:
  - Spinner rotation animation slows or pauses.
  - Skeleton pulse and wave animations are set to `animation: none;`.
  - Progress bar transitions and stripe animations are disabled.
- Screen Reader Contracts:
  - Spinner with `label` renders `role="status"` and accessible text.
  - Skeleton has `aria-hidden="true"` when unpopulated.
  - Progress renders `role="progressbar"`, with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` when determinate, and omits `aria-valuenow` when indeterminate.

---

## 8. Verification & Acceptance Criteria

1. **Spinner:** All sizes and color schemes render cleanly in light and dark modes. Accessible label announced once. Reduced motion respected.
2. **Skeleton:** All variants (text, circular, rectangular, rounded) and animations (pulse, wave, none) work. Switching `isLoaded` toggles between skeleton and children.
3. **Progress:** Minimum, maximum, clamp (out-of-range values don't break), and intermediate values work. Indeterminate state doesn't render `NaN`. Both linear and circular variants render valid SVG geometry.
4. **Axe Audits:** Zero violations across all states.
