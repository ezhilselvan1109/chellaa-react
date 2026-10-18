# Alert Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications (Tier 5 / Phase 4 Feedback & Interactive Overlays)  
**Specification ID:** SPEC-024  
**Target Package:** `@chellaa/react`  
**Revision:** 1.0.0  
**Priority:** P1 High  
**Governing Standard:** [00-component-specification-standard.md](./00-component-specification-standard.md), [01-api-conventions.md](./01-api-conventions.md), [ADR-007-css-delivery.md](../adr/ADR-007-css-delivery.md), [ADR-011-hybrid-styling-architecture-and-engine-boundary.md](../adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md)  
**Dependencies:** Chellaa Design Tokens (`--cl-*`), React 18/19  

---

## 1. Identity

```text
Component Name:     Alert (Compound Architecture: Alert.Root, Alert.Icon, Alert.Title, Alert.Description, Alert.CloseButton, Alert.Action)
Specification ID:   SPEC-024
Package Export:     import { Alert, type AlertProps, type AlertStatus, type AlertVariant } from "@chellaa/react";
Category:           Feedback
Status:             Approved & Implementation Ready
Phase:              Phase 4 — Feedback & Interactive Overlays
Priority:           P1 High
Version:            1.0.0
Related Components: Snackbar, FormField, Button, Typography
Governing ADRs:     ADR-007 (Zero-Config Styling), ADR-011 (Hybrid Styling Architecture)
```

---

## 2. Purpose & Problem Statement

### 2.1 Problem Statement
In enterprise web applications, systems must frequently communicate urgent statuses, warnings, validation failures, and confirmation messages directly within the flow of a page or form.

Existing components cannot adequately satisfy this:
1. [`FormField`](./17-form-field.md) provides micro-level validation text bound to a single input field, but cannot convey macro-level form failures (e.g. "Payment Gateway Unreachable").
2. [`Dialog`](./04-modal.md) blocks user interaction entirely with a modal backdrop, causing severe disruption for non-critical alerts.
3. [`Snackbar`](./25-snackbar.md) (Toast) is transient and floats over the viewport, meaning users may miss crucial feedback if it automatically dismisses before they read it.

The `Alert` component solves this by providing a persistent, prominent, in-page notice designed to capture user attention without obstructing their workflow, with built-in accessibility roles, semantic icon slots, and optional dismissal capabilities.

### 2.2 Why It Belongs in Chellaa React
As an enterprise UI system, Chellaa React requires an authoritative feedback primitive that aligns strictly with our 7 semantic color schemes (`info`, `success`, `warning`, `danger`, `neutral`), enforces WCAG 2.2 contrast ratios, and announces updates to screen readers via appropriate live regions.

### 2.3 When to Use
- Displaying critical page-level or section-level announcements (e.g. "Scheduled maintenance in 10 minutes").
- Communicating high-level form submission errors ("3 errors found in your application").
- Confirming significant completed actions inline ("Order #1024 successfully processed").
- Displaying persistent account warnings ("Your trial expires in 2 days").

### 2.4 When NOT to Use
- **Do NOT use Alert for transient asynchronous toasts.** Use [`Snackbar`](./25-snackbar.md) for transient auto-dismissing notifications.
- **Do NOT use Alert for single-field input validation.** Use [`FormField`](./17-form-field.md) (`FormErrorMessage`) directly underneath the relevant input.
- **Do NOT use Alert for blocking confirmations requiring immediate user choice.** Use [`Dialog`](./04-modal.md).

---

## 3. Scope & Requirements

### 3.1 Functional Requirements (In Scope)
- **FR-01 (Compound Structure):** Composable compound architecture: `Alert.Root`, `Alert.Icon`, `Alert.Title`, `Alert.Description`, `Alert.CloseButton`, `Alert.Action`.
- **FR-02 (Semantic Statuses):** Supports 4 core status types: `info`, `success`, `warning`, `danger`, plus `neutral`.
- **FR-03 (Visual Variants):** 4 visual treatments:
  - `subtle`: Soft tinted background, colored border, high-contrast dark text (default).
  - `solid`: Full saturated background color with white/contrast text.
  - `outline`: Pure transparent background with 1px semantic colored border.
  - `left-accent`: Subtle background with prominent 4px left-border accent bar.
- **FR-04 (Dismissibility):** Optional close button (`isClosable?: boolean` or `<Alert.CloseButton />`) firing `onClose?: () => void`.
- **FR-05 (Automatic Accessible Roles):** Automatically sets `role="alert"` (`aria-live="assertive"`) for `danger`/`error` statuses, and `role="status"` (`aria-live="polite"`) for `info`, `success`, `warning`.
- **FR-06 (Default Semantic Icons):** Built-in accessible SVG status icons mapped to each status, with support for custom icon overrides.
- **FR-07 (Slot Composition):** Supports `asChild?: boolean` on `Alert.Root` for polymorphic DOM rendering.

### 3.2 Non-Functional Requirements
- **NFR-01 (Zero-Runtime Styling):** Authored in static scoped CSS within `@layer cl-components` using `--cl-*` variables.
- **NFR-02 (WCAG 2.2 AA Contrast):** All color combinations guaranteed >= 4.5:1 text contrast ratio in both light and dark themes.

### 3.3 Out of Scope
- Global floating notification queues (handled by `Snackbar` / Toast manager).
- Timed auto-dismissal timers (Alert is persistent by design).

---

## 4. Non-Goals
- Animating collapsible accordion panels inside the alert.
- Hosting full complex multi-step data entry forms.

---

## 5. Feature Summary

| Capability | Description | Architectural Detail |
| :--- | :--- | :--- |
| **Compound Sub-zones** | Flexible header, title, body, action slots | Root, Icon, Title, Description, Action, CloseButton |
| **4 Visual Treatments** | `subtle`, `solid`, `outline`, `left-accent` | CSS classes `.cl-alert--{variant}` |
| **4 Semantic Statuses** | `info`, `success`, `warning`, `danger` | CSS classes `.cl-alert--{status}` |
| **Live Region Semantics**| Intelligent `role="alert"` vs `role="status"` | Dynamic ARIA mapping based on status |
| **Dark Theme Fidelity** | Harmonized contrast without glowing halos | Native CSS custom property substitution |

---

## 6. Anatomy

```text
<Alert.Root status="danger" variant="subtle">
  ├── <Alert.Icon />                      (.cl-alert__icon) [Semantic SVG icon]
  ├── <Alert.Body>                        (.cl-alert__body)
  │     ├── <Alert.Title>Update Failed</Alert.Title>          (.cl-alert__title)
  │     └── <Alert.Description>Check connection</Alert.Description> (.cl-alert__description)
  │   </Alert.Body>
  ├── [Optional] <Alert.Action>          (.cl-alert__action) [<Button size="sm">Retry</Button>]
  └── [Optional] <Alert.CloseButton />   (.cl-alert__close)  [Accessible dismiss button]
</Alert.Root>
```

---

## 7. Public API Specification

### 7.1 Props Interface
```typescript
export type AlertStatus = "info" | "success" | "warning" | "danger" | "neutral";
export type AlertVariant = "subtle" | "solid" | "outline" | "left-accent";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic status determining colors, icons, and ARIA roles. Defaults to "info" */
  status?: AlertStatus;
  /** Visual treatment of the alert surface. Defaults to "subtle" */
  variant?: AlertVariant;
  /** Whether the alert can be dismissed with a close button */
  isClosable?: boolean;
  /** Callback fired when the close button is clicked */
  onClose?: () => void;
  /** Polymorphic slot delegation */
  asChild?: boolean;
  children?: React.ReactNode;
}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}
```

### 7.2 Tabular Props Dictionary

| Prop | Type | Default | Description | A11y Impact |
| :--- | :--- | :--- | :--- | :--- |
| `status` | `AlertStatus` | `"info"` | Semantic status intent | Determines `role="alert"` vs `"status"` |
| `variant` | `AlertVariant` | `"subtle"` | Visual styling treatment | Governs border and background tokens |
| `isClosable` | `boolean` | `false` | Renders dismiss button | Renders accessible close button |
| `onClose` | `() => void` | `undefined` | Callback fired on dismiss | None |
| `asChild` | `boolean` | `false` | Delegates rendering via `Slot` | Preserves underlying semantics |

---

## 8. TypeScript Types

```typescript
// packages/react/src/components/Alert/Alert.types.ts

import * as React from "react";

export type AlertStatus = "info" | "success" | "warning" | "danger" | "neutral";
export type AlertVariant = "subtle" | "solid" | "outline" | "left-accent";

export interface AlertContextValue {
  status: AlertStatus;
  variant: AlertVariant;
  onClose?: () => void;
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: AlertStatus;
  variant?: AlertVariant;
  isClosable?: boolean;
  onClose?: () => void;
  asChild?: boolean;
}

export interface AlertIconProps extends React.SVGAttributes<SVGSVGElement> {
  icon?: React.ReactNode;
}

export interface AlertCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
```

---

## 9. Variants & Visual States

1. **`subtle` (Default):**
   - Background: `var(--cl-color-{status}-subtle)`
   - Border: `1px solid var(--cl-color-{status}-border)`
   - Text: `var(--cl-color-{status}-text)`
2. **`solid`:**
   - Background: `var(--cl-color-{status}-solid)`
   - Border: `none`
   - Text: `#ffffff`
3. **`outline`:**
   - Background: `transparent`
   - Border: `1px solid var(--cl-color-{status}-border)`
   - Text: `var(--cl-color-{status}-text)`
4. **`left-accent`:**
   - Background: `var(--cl-color-{status}-subtle)`
   - Border-left: `4px solid var(--cl-color-{status}-solid)`
   - Text: `var(--cl-color-{status}-text)`

---

## 10. Sizes & Metrics

- **Border Radius:** `6px` (`var(--cl-radius-md)`).
- **Padding:** `12px 16px` (`var(--cl-space-3) var(--cl-space-4)`).
- **Icon Dimension:** `20px × 20px` (`var(--cl-size-icon-md)`).
- **Title Font Weight:** `600` (`var(--cl-font-weight-semibold)`).
- **Description Font Size:** `14px` (`var(--cl-font-size-sm)`).

---

## 11. States & Pseudo-Classes

- Focus-visible ring on Close Button: `outline: 2px solid var(--cl-ring-color); outline-offset: 2px`.
- Hover on Close Button: Subtle background tint (`rgba(0,0,0,0.06)` light / `rgba(255,255,255,0.1)` dark).

---

## 12. Behavioral Specification

- Presentational by default.
- If dismissed via Close Button, triggers `onClose()`. If uncontrolled, unmounts self via internal state.

---

## 13. Controlled / Uncontrolled State Behavior

- Stateless by default. If `onClose` is provided, caller can control rendering conditionally (`{isAlertOpen && <Alert ... />}`).

---

## 14. Events Contract

- `onClose()`: Dispatched upon clicking the close button or pressing Enter/Space while close button is focused.

---

## 15. Composition & Slot Delegation

- Supports `asChild?: boolean` on `Alert.Root`.
- Composable sub-elements (`Alert.Icon`, `Alert.Title`, `Alert.Description`, `Alert.Action`, `Alert.CloseButton`) can be ordered arbitrarily.

---

## 16. Ref Contract

- Forwarded ref on `Alert.Root` targets `HTMLDivElement`.

---

## 17. Accessibility Specification (WCAG 2.2 AA & APG)

1. **Role Mapping:**
   - `status="danger"`: Sets `role="alert"` (`aria-live="assertive"`).
   - `status="info" | "success" | "warning"`: Sets `role="status"` (`aria-live="polite"`).
2. **Close Button Accessible Name:** Close button must have `aria-label="Close alert"`.
3. **Decorative Icons:** Built-in status icons must include `aria-hidden="true"`.
4. **Color Contrast:** WCAG 2.2 Level AA compliance guaranteed across all 4 variants and 4 statuses.

---

## 18. Keyboard Interaction Keymap

| Key | Context | Action |
| :--- | :--- | :--- |
| `Tab` | Moving through page | Moves focus to Alert Close Button or Action buttons |
| `Enter` / `Space` | Focus on Close Button | Dismisses the alert |

---

## 19. Styling Contract (Scoped Static CSS & `--cl-*` Tokens)

```css
@layer cl-components {
  .cl-alert {
    display: flex;
    align-items: flex-start;
    gap: var(--cl-space-3, 12px);
    width: 100%;
    padding: var(--cl-space-3, 12px) var(--cl-space-4, 16px);
    border-radius: var(--cl-radius-md, 6px);
    font-family: var(--cl-font-family-sans);
    font-size: var(--cl-font-size-sm, 14px);
    line-height: var(--cl-line-height-normal, 1.5);
    box-sizing: border-box;
  }

  /* Subtle Variant */
  .cl-alert--subtle.cl-alert--info {
    background-color: var(--cl-color-info-subtle);
    border: 1px solid var(--cl-color-info-border);
    color: var(--cl-color-info-text);
  }
  .cl-alert--subtle.cl-alert--success {
    background-color: var(--cl-color-success-subtle);
    border: 1px solid var(--cl-color-success-border);
    color: var(--cl-color-success-text);
  }
  .cl-alert--subtle.cl-alert--warning {
    background-color: var(--cl-color-warning-subtle);
    border: 1px solid var(--cl-color-warning-border);
    color: var(--cl-color-warning-text);
  }
  .cl-alert--subtle.cl-alert--danger {
    background-color: var(--cl-color-danger-subtle);
    border: 1px solid var(--cl-color-danger-border);
    color: var(--cl-color-danger-text);
  }

  /* Solid Variant */
  .cl-alert--solid.cl-alert--info { background-color: var(--cl-color-info-solid); color: #fff; }
  .cl-alert--solid.cl-alert--success { background-color: var(--cl-color-success-solid); color: #fff; }
  .cl-alert--solid.cl-alert--warning { background-color: var(--cl-color-warning-solid); color: #fff; }
  .cl-alert--solid.cl-alert--danger { background-color: var(--cl-color-danger-solid); color: #fff; }

  /* Left Accent Variant */
  .cl-alert--left-accent {
    border-left-width: 4px;
    border-left-style: solid;
  }
  .cl-alert--left-accent.cl-alert--danger { border-left-color: var(--cl-color-danger-solid); }

  .cl-alert__icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 2px;
  }

  .cl-alert__body {
    flex: 1;
    min-width: 0;
  }

  .cl-alert__title {
    margin: 0 0 var(--cl-space-1, 4px) 0;
    font-weight: var(--cl-font-weight-semibold, 600);
  }

  .cl-alert__description {
    margin: 0;
    opacity: 0.9;
  }

  .cl-alert__close {
    flex-shrink: 0;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--cl-space-1, 4px);
    border-radius: var(--cl-radius-sm, 4px);
    color: inherit;
    opacity: 0.7;
    transition: opacity 150ms ease;
  }
  .cl-alert__close:hover { opacity: 1; }
}
```

---

## 20. Theme Contract

Automatic token adaptation between light and dark themes using `--cl-color-{status}-subtle`, `--cl-color-{status}-border`, and `--cl-color-{status}-text`.

---

## 21. Responsive Behavior

- Stretches 100% of parent container width.
- Flex layout wraps gracefully on mobile widths (< 360px).

---

## 22. Motion & Animations

- Exit fade-out on dismissal: 150ms. Resets to 0.01ms under `prefers-reduced-motion: reduce`.

---

## 23. Testing Specification

| Test Category | Scenario | Expected Outcome |
| :--- | :--- | :--- |
| **1. Rendering** | Render Alert with title & description | Elements appear with correct class and role |
| **2. Role Mapping** | Render with `status="danger"` | Has `role="alert"` |
| **3. Role Mapping** | Render with `status="info"` | Has `role="status"` |
| **4. Dismissal** | Click close button | `onClose` callback called |
| **5. Variants** | Render all 4 variants | Respective CSS modifier classes attached |
| **6. Accessibility** | Run `axe(container)` across all statuses | 0 accessibility violations |

---

## 24. Storybook Contract

Stories in `packages/react/src/components/Alert/Alert.stories.tsx`:
1. `AllStatuses`: `info`, `success`, `warning`, `danger` in a stack.
2. `AllVariants`: `subtle`, `solid`, `outline`, `left-accent`.
3. `WithCloseButton`: Dismissible alert.
4. `WithAction`: Alert containing action button.

---

## 25. Documentation Reqs

API props table, live status playground, and accessibility notes on `role="alert"` screen reader impact.

---

## 26. Edge Cases & Hazards

1. **Rapid Dismiss Multi-Click:** Callback fired once; button disabled upon dismiss.
2. **Excessive Text Length:** Title and description wrap cleanly without breaking icon layout.

---

## 27. Reference Comparison

| Feature | Chellaa React | MUI Alert | Ant Design Alert | Chakra Alert |
| :--- | :--- | :--- | :--- | :--- |
| **Variants** | `subtle`, `solid`, `outline`, `left-accent` | `standard`, `filled`, `outlined` | Standard | `subtle`, `solid`, `left-accent` |
| **Architecture**| Compound subcomponents | Monolithic with slots | Monolithic | Compound |
| **Styling** | Zero-runtime static CSS | Emotion | Less | Emotion |

---

## 28. Deferred Features

- Accordion-expandable multi-line stack trace alerts.

---

## 29. Acceptance Criteria

- [ ] Compound structure implemented (`Alert.Root`, `Alert.Icon`, `Alert.Title`, `Alert.Description`, etc.).
- [ ] 4 statuses and 4 variants styled in `@layer cl-components`.
- [ ] Automatic `role="alert"` vs `role="status"` mapping.
- [ ] Close button with `aria-label="Close alert"`.
- [ ] Zero axe accessibility violations.
- [ ] 100% test pass rate in Vitest.

---

## 30. Implementation Plan, Governance & Traceability

### 30.1 Target Files
```text
packages/react/src/components/Alert/
├── Alert.tsx
├── Alert.types.ts
├── Alert.styles.css
├── Alert.test.tsx
├── Alert.stories.tsx
└── index.ts
```

### 30.2 Roles & Reviewers
- **React Component Engineer:** Implement compound structure.
- **Quality Engineer:** Validate a11y roles and unit tests.
- **Independent Reviewer:** Verify acceptance criteria.

### 30.3 Traceability Matrix

| Requirement | Source Rule / ADR | Workflow Stage | Acceptance Criterion |
| :--- | :--- | :--- | :--- |
| Zero-Config CSS | ADR-007, ADR-011 | Workflow F | Scoped CSS in `@layer cl-components` |
| Live Region Roles | Document 04 (A11y) | Workflow G | Role="alert" for danger, "status" for others |
| Compound Architecture | Document 01 (API Conventions) | Workflow F | Subcomponents compose cleanly |
