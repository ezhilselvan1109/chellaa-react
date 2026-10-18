# Snackbar & Toast Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications (Tier 5 / Phase 4 Feedback & Interactive Overlays)  
**Specification ID:** SPEC-025  
**Target Package:** `@chellaa/react`  
**Revision:** 1.0.0  
**Priority:** P1 High  
**Governing Standard:** [00-component-specification-standard.md](./00-component-specification-standard.md), [01-api-conventions.md](./01-api-conventions.md), [ADR-007-css-delivery.md](../adr/ADR-007-css-delivery.md), [ADR-011-hybrid-styling-architecture-and-engine-boundary.md](../adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md)  
**Dependencies:** Chellaa `Portal` primitive, Chellaa Design Tokens (`--cl-*`)  

---

## 1. Identity

```text
Component Name:     Snackbar (Canonical) / Toast (Alias), ToastProvider, useToast
Specification ID:   SPEC-025
Package Export:     import { Snackbar, Toast, ToastProvider, useToast, type SnackbarProps, type ToastOptions } from "@chellaa/react";
Category:           Feedback / Overlays
Status:             Approved & Implementation Ready
Phase:              Phase 4 — Feedback & Interactive Overlays
Priority:           P1 High
Version:            1.0.0
Related Components: Alert, Button, Portal
Governing ADRs:     ADR-007 (Zero-Config Styling), ADR-011 (Hybrid Styling Architecture)
```

---

## 2. Purpose & Problem Statement

### 2.1 Problem Statement
When background asynchronous tasks finish (e.g. "Draft Saved", "Network Reconnected", "File Upload Complete"), users require confirmation without having their active workflow interrupted.

Existing feedback patterns fail this use case:
1. [`Dialog`](./04-modal.md) disrupts typing and modal-blocks the screen.
2. [`Alert`](./24-alert.md) requires dedicated physical page layout space, causing visual layout shifts when dynamically inserted or removed.
3. Native browser alerts (`window.alert`) block thread execution and look dated.

The `Snackbar` (Toast) system provides a transient, viewport-anchored notification container that appears in a designated viewport corner, queues multiple messages gracefully, auto-dismisses after a configurable timeout, and allows quick undo/retry actions.

### 2.2 Why It Belongs in Chellaa React
Enterprise web applications require an imperative, reliable notification channel accessible from React hooks (`useToast()`) or stateful triggers without manually managing global portal stacks.

### 2.3 When to Use
- Confirming non-critical asynchronous actions ("Changes published successfully").
- Providing undo actions for destructive commands ("Message moved to trash [Undo]").
- Transient network or background system health updates.

### 2.4 When NOT to Use
- **Do NOT use for critical errors requiring immediate corrective action.** Use [`Dialog`](./04-modal.md) or in-page [`Alert`](./24-alert.md).
- **Do NOT display lengthy text or complex multi-input forms inside a Snackbar.**

---

## 3. Scope & Requirements

### 3.1 Functional Requirements (In Scope)
- **FR-01 (Dual API Models):** Supports both **Imperative Hook API** (`const toast = useToast(); toast({ title, status })`) and **Declarative Component API** (`<Snackbar isOpen={...} message="..." />`).
- **FR-02 (Viewport Positions):** Anchors to 6 standard viewport positions: `top`, `top-left`, `top-right`, `bottom`, `bottom-left`, `bottom-right`.
- **FR-03 (Auto-Dismissal & Timer Pause):** Auto-dismisses after configurable duration (`duration?: number`, default: 5000ms). Hovering or focusing the toast automatically pauses the timer (WCAG 2.2 SC 2.2.1 Timing Adjustable).
- **FR-04 (Stacking & Queuing):** Manages a queue of active toasts per position, smoothly animating additions and exits with layout transitions.
- **FR-05 (Action Slot):** Supports an inline action button (`action?: React.ReactNode`, e.g. `<Button size="xs" variant="ghost">Undo</Button>`).
- **FR-06 (Semantic Statuses):** Supports `info`, `success`, `warning`, `danger`, and `neutral`.
- **FR-07 (Portal Integration):** Renders all toasts inside a single viewport-anchored `<ToastProvider>` rendered via `Portal`.

### 3.2 Non-Functional Requirements
- **NFR-01 (Memory Hygiene):** Clear interval/timeout timers upon component unmount to prevent memory leaks.
- **NFR-02 (Bundle Performance):** Zero heavy external animation dependencies; pure CSS hardware-accelerated transitions.

### 3.3 Out of Scope
- Persistent inbox-style notification centers with read/unread histories.

---

## 4. Non-Goals
- Hosting interactive multi-field forms.
- Full-screen push notifications.

---

## 5. Feature Summary

| Capability | Description | Architectural Detail |
| :--- | :--- | :--- |
| **Imperative + Declarative** | `useToast()` hook and `<Snackbar />` | Shared singleton state or context |
| **6 Viewport Anchors** | `top-right`, `bottom-right`, etc. | Grid / Flex overlay containers |
| **Timer Pause on Hover** | Complies with WCAG SC 2.2.1 | Pointerenter pauses timer; pointerleave resumes |
| **Action & Undo** | Direct action slot | Custom Button action triggers |
| **Live Region APG** | Screen reader polite/assertive announce | `role="status"` / `role="alert"` |

---

## 6. Anatomy

```text
ToastProvider (Portal to document.body)
└── Toast Container (.cl-toast-container--{position})
      └── Toast Item (.cl-toast .cl-toast--{status})
            role="status" | "alert"
            aria-live="polite" | "assertive"
            ├── [Optional Icon] (.cl-toast__icon)
            ├── Toast Content (.cl-toast__content)
            │     ├── Toast Title (.cl-toast__title)
            │     └── Toast Description (.cl-toast__description)
            ├── [Optional Action] (.cl-toast__action) [<Button size="xs">Undo</Button>]
            └── [Optional Close] (.cl-toast__close)  [<button aria-label="Dismiss">×</button>]
```

---

## 7. Public API Specification

### 7.1 Hook & Options Interface
```typescript
export type ToastPosition = "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right";
export type ToastStatus = "info" | "success" | "warning" | "danger" | "neutral";

export interface ToastOptions {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  status?: ToastStatus;
  duration?: number | null; // null disables auto-dismiss
  isClosable?: boolean;
  position?: ToastPosition;
  action?: React.ReactNode;
  onClose?: () => void;
}

export interface UseToastReturn {
  (options: ToastOptions): string;
  close: (id: string) => void;
  closeAll: () => void;
  update: (id: string, options: Partial<ToastOptions>) => void;
}

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  message?: React.ReactNode;
  description?: React.ReactNode;
  status?: ToastStatus;
  duration?: number;
  position?: ToastPosition;
  action?: React.ReactNode;
  onClose?: () => void;
}
```

### 7.2 Tabular Props Dictionary

| Prop | Type | Default | Description | A11y Impact |
| :--- | :--- | :--- | :--- | :--- |
| `title` / `message` | `React.ReactNode` | — | Primary headline text | Announced by screen reader |
| `description` | `React.ReactNode` | `undefined` | Secondary descriptive copy | Announced by screen reader |
| `status` | `ToastStatus` | `"info"` | Semantic color & icon intent | Sets `role="status"` / `"alert"` |
| `duration` | `number \| null` | `5000` | Lifetime in ms before dismiss | Must be pausable on hover |
| `position` | `ToastPosition` | `"bottom-right"` | Viewport anchor corner | None |
| `isClosable` | `boolean` | `true` | Renders manual dismiss button | Provides accessible close button |
| `action` | `React.ReactNode` | `undefined` | Custom action button (Undo) | Must be keyboard accessible |

---

## 8. TypeScript Types

```typescript
// packages/react/src/components/Snackbar/Snackbar.types.ts

import * as React from "react";

export type ToastPosition = "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right";
export type ToastStatus = "info" | "success" | "warning" | "danger" | "neutral";

export interface ToastRecord extends ToastOptions {
  id: string;
  createdAt: number;
}
```

---

## 9. Variants & Visual States

- **Surface Treatment:** Elevated card with `--cl-shadow-lg`, dark slate surface in light mode, high contrast border (`1px solid var(--cl-color-border-subtle)`).
- **Status Indicator:** Left border or leading icon tinted with semantic status color (`info`, `success`, `warning`, `danger`).

---

## 10. Sizes & Metrics

- **Max Width:** `420px` (`max-width: var(--cl-size-toast-max, 420px)`).
- **Padding:** `12px 16px` (`var(--cl-space-3) var(--cl-space-4)`).
- **Gap between stacked toasts:** `8px` (`var(--cl-space-2)`).
- **Viewport Margin:** `16px` from screen edge.

---

## 11. States & Pseudo-Classes

- Entering: `opacity: 0; transform: translateY(16px)` -> `opacity: 1; transform: translateY(0)`.
- Hovered: Timer pauses.
- Exiting: `opacity: 0; transform: scale(0.95)`.

---

## 12. Behavioral Specification

- On invocation, toast pushes to queue for the target `position`.
- When duration timer fires, item transitions to exiting state and is removed from state.
- Hovering pauses timer; leaving resumes remaining duration.

---

## 13. Controlled / Uncontrolled State Behavior

- Managed automatically via `ToastProvider` or standalone controlled via `<Snackbar isOpen={...} />`.

---

## 14. Events Contract

- `onClose()`: Dispatched upon dismiss.

---

## 15. Composition & Slot Delegation

- Action slot accepts any React element (standard `<Button size="xs">`).

---

## 16. Ref Contract

- Individual toast ref targets `HTMLDivElement`.

---

## 17. Accessibility Specification (WCAG 2.2 AA & APG)

1. **Live Regions:**
   - `status="danger"`: `role="alert"`, `aria-live="assertive"`.
   - Other statuses: `role="status"`, `aria-live="polite"`.
2. **WCAG 2.2 SC 2.2.1 (Timing Adjustable):** Hovering pointer over toast pauses auto-dismiss countdown.
3. **Keyboard Dismiss:** Manual close button receives focus in standard tab order if focus moves to toast container.

---

## 18. Keyboard Interaction Keymap

| Key | Context | Action |
| :--- | :--- | :--- |
| `Tab` | Moving focus | Can focus on toast action button and close button |
| `Enter` / `Space` | Focus on close button | Dismisses toast |

---

## 19. Styling Contract (Scoped Static CSS & `--cl-*` Tokens)

```css
@layer cl-components {
  .cl-toast-container {
    position: fixed;
    z-index: var(--cl-z-toast, 1500);
    display: flex;
    flex-direction: column;
    gap: var(--cl-space-2, 8px);
    pointer-events: none;
    padding: var(--cl-space-4, 16px);
  }

  .cl-toast-container--bottom-right { bottom: 0; right: 0; }
  .cl-toast-container--top-right { top: 0; right: 0; }
  .cl-toast-container--bottom-left { bottom: 0; left: 0; }
  .cl-toast-container--top-left { top: 0; left: 0; }
  .cl-toast-container--top { top: 0; left: 50%; transform: translateX(-50%); }
  .cl-toast-container--bottom { bottom: 0; left: 50%; transform: translateX(-50%); }

  .cl-toast {
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: var(--cl-space-3, 12px);
    min-width: 280px;
    max-width: var(--cl-size-toast-max, 420px);
    padding: var(--cl-space-3, 12px) var(--cl-space-4, 16px);
    background-color: var(--cl-color-bg-surface);
    color: var(--cl-color-text-primary);
    border: 1px solid var(--cl-color-border-subtle);
    border-radius: var(--cl-radius-md, 6px);
    box-shadow: var(--cl-shadow-lg);
    box-sizing: border-box;
    transition: all var(--cl-duration-normal, 200ms) var(--cl-easing-standard);
  }

  .cl-toast--success { border-left: 4px solid var(--cl-color-success-solid); }
  .cl-toast--danger { border-left: 4px solid var(--cl-color-danger-solid); }
  .cl-toast--warning { border-left: 4px solid var(--cl-color-warning-solid); }
  .cl-toast--info { border-left: 4px solid var(--cl-color-info-solid); }

  .cl-toast__content { flex: 1; min-width: 0; }
  .cl-toast__title { font-weight: 600; font-size: 14px; margin: 0; }
  .cl-toast__description { font-size: 13px; margin: 2px 0 0 0; opacity: 0.85; }

  .cl-toast__close {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    opacity: 0.6;
    padding: 2px;
  }
  .cl-toast__close:hover { opacity: 1; }
}
```

---

## 20. Theme Contract

Adapts automatically using `--cl-color-bg-surface`, `--cl-color-text-primary`, and `--cl-shadow-lg`.

---

## 21. Responsive Behavior

On screens < 480px, toast containers span 100% viewport width with 8px margins.

---

## 22. Motion & Animations

Slide and fade transition: 200ms (`--cl-duration-normal`). Zero scaling under `prefers-reduced-motion`.

---

## 23. Testing Specification

| Test Category | Scenario | Expected Outcome |
| :--- | :--- | :--- |
| **1. Hook Invocation** | Call `toast({ title: "Saved" })` | Toast renders in DOM container |
| **2. Auto Dismiss** | Advance fake timers by 5000ms | Toast unmounts cleanly |
| **3. Pause on Hover** | Hover pointer over toast | Timer pauses; does not dismiss |
| **4. Action Click** | Click Undo action button | Custom action handler fires |
| **5. Live Region** | Inspect container ARIA attributes | `role="status"` and `aria-live="polite"` present |
| **6. Accessibility** | Run `axe(container)` | 0 accessibility violations |

---

## 24. Storybook Contract

Stories in `packages/react/src/components/Snackbar/Snackbar.stories.tsx`:
1. `ImperativePlayground`: Button triggers `useToast()`.
2. `AllPositions`: Grid demonstrating all 6 positions.
3. `WithAction`: Toast with Undo button.
4. `PersistentToast`: Duration null (must be manually closed).

---

## 25. Documentation Reqs

Setup guide for `<ToastProvider>`, hook examples, and accessibility guidelines.

---

## 26. Edge Cases & Hazards

1. **Overflow Stacking:** Max visible toasts (default 5); older toasts dismiss cleanly.
2. **Timer Leaks:** All timers cleared if component unmounts mid-countdown.

---

## 27. Reference Comparison

| Feature | Chellaa React | MUI Snackbar | Ant Design Message | Sonner |
| :--- | :--- | :--- | :--- | :--- |
| **Delivery** | Hook + Component | Component + Hook | Static method | Imperative |
| **Styling** | Scoped static CSS | Emotion | Less | CSS |

---

## 28. Deferred Features

- Swipe-to-dismiss gesture physics on touch devices (Phase 6).

---

## 29. Acceptance Criteria

- [ ] `ToastProvider`, `useToast`, and `<Snackbar>` implemented.
- [ ] 6 viewport positions supported.
- [ ] Auto-dismiss timer pauses on hover.
- [ ] Live regions configured correctly for screen readers.
- [ ] Zero axe accessibility violations.
- [ ] 100% test pass rate in Vitest.

---

## 30. Implementation Plan, Governance & Traceability

### 30.1 Target Files
```text
packages/react/src/components/Snackbar/
├── Snackbar.tsx
├── Snackbar.types.ts
├── Snackbar.styles.css
├── Snackbar.test.tsx
├── Snackbar.stories.tsx
├── ToastProvider.tsx
├── useToast.ts
└── index.ts
```

### 30.2 Traceability Matrix

| Requirement | Source Rule / ADR | Workflow Stage | Acceptance Criterion |
| :--- | :--- | :--- | :--- |
| Portal Rendering | ADR-001 | Workflow F | Mounted to document.body |
| Scoped Styling | ADR-007, ADR-011 | Workflow F | Authored in `@layer cl-components` |
| Timing Adjustable | WCAG SC 2.2.1 | Workflow G | Hover pauses countdown timer |
