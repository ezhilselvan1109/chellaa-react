# Popover Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications (Tier 4 / Phase 3 Surfaces & Visual Data Display)  
**Specification ID:** SPEC-023  
**Target Package:** `@chellaa/react`  
**Revision:** 1.0.0  
**Priority:** P1 High  
**Governing Standard:** [00-component-specification-standard.md](./00-component-specification-standard.md), [01-api-conventions.md](./01-api-conventions.md), [ADR-010-overlay-positioning.md](../adr/ADR-010-overlay-positioning.md), [ADR-011-hybrid-styling-architecture-and-engine-boundary.md](../adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md)  
**Dependencies:** `@floating-ui/react` (runtime positioning per ADR-010), `Portal` primitive  

---

## 1. Identity

```text
Component Name:     Popover (Compound Architecture: Popover.Root, Popover.Trigger, Popover.Content, Popover.Close, Popover.Arrow, Popover.Header, Popover.Title, Popover.Body, Popover.Footer)
Specification ID:   SPEC-023
Package Export:     import { Popover, type PopoverProps, type PopoverContentProps } from "@chellaa/react";
Category:           Data Display / Overlays
Status:             Approved & Implementation Ready
Phase:              Phase 3 — Surfaces & Visual Data Display
Priority:           P1 High
Version:            1.0.0
Related Components: Tooltip, Dialog, Menu, Button
Governing ADRs:     ADR-007 (Zero-Config Styling), ADR-010 (Overlay Positioning), ADR-011 (Hybrid Styling)
```

---

## 2. Purpose & Problem Statement

### 2.1 Problem Statement
Modern enterprise web applications frequently require rich contextual interactions anchored directly to a trigger element—such as column filtering menus, user profile mini-cards, date pickers, color selectors, and inline confirmation dialogues.

Existing overlay mechanisms cannot adequately solve this:
1. [`Tooltip`](./22-tooltip.md) is strictly non-interactive and hover-driven; embedding focusable form inputs or buttons inside a tooltip is a severe violation of WCAG 2.2 SC 1.4.13 and WAI-ARIA APG rules.
2. [`Dialog`](./04-modal.md) (Modal) covers the entire screen, interrupts user context, and centers itself in the viewport rather than pointing to the originating context.
3. Native HTML `<details>` and `<summary>` lack collision detection, viewport auto-flipping, focus trapping, and smooth exit animations.

The `Popover` component bridges this critical gap by providing an accessible, rich interactive overlay anchored to a target element, triggered via pointer click or keyboard activation, with robust focus management, backdrop dismissal, and viewport edge detection.

### 2.2 Why It Belongs in Chellaa React
`Popover` is the foundational primitive for complex composite controls (e.g., `Combobox`, `DatePicker`, `ColorPicker`, table column filters). Having a first-class compound `Popover` guarantees consistent keyboard ergonomics, styling tokens, and accessibility across all downstream controls.

### 2.3 When to Use
- Displaying interactive forms anchored to an action (e.g. quick edit inputs, search filters).
- Presenting rich contextual information that requires user action (e.g. mini user profile cards with follow/message buttons).
- Compact confirmation prompts (Ant Design style `Popconfirm`).
- Custom selection menus not covered by standard `Select`.

### 2.4 When NOT to Use
- **Do NOT use Popover for passive text hints.** Use [`Tooltip`](./22-tooltip.md) for passive, non-interactive hover labels.
- **Do NOT use Popover for major multi-step workflows or critical system-blocking alerts.** Use [`Dialog`](./04-modal.md).
- **Do NOT use Popover for standard navigational action lists.** Use `DropdownMenu` / `Menu`.

---

## 3. Scope & Requirements

### 3.1 Functional Requirements (In Scope)
- **FR-01 (Compound Architecture):** Implemented as a composable compound component: `Popover.Root`, `Popover.Trigger`, `Popover.Portal`, `Popover.Content`, `Popover.Arrow`, `Popover.Close`, `Popover.Header`, `Popover.Title`, `Popover.Body`, `Popover.Footer`.
- **FR-02 (Anchored Positioning):** Uses `@floating-ui/react` to calculate coordinates relative to the trigger across 12 placements (`top`, `bottom`, `left`, `right` with `start`/`end` alignments).
- **FR-03 (Auto-Flip & Collision Detection):** Automatically flips and shifts placement when intersecting viewport or container bounds.
- **FR-04 (Focus Trapping & Management):** Optional modal focus trapping (`trapFocus?: boolean`, default: `true` for modal popovers, `false` for non-modal). When opened, automatically moves focus to initial element or first focusable child; upon close, restores focus to the trigger.
- **FR-05 (Dismissal Ergonomics):** Closes when clicking outside the popover content (outside click listener) or pressing the `Escape` key.
- **FR-06 (Controlled & Uncontrolled):** Full support for `isOpen`, `defaultOpen`, and `onOpenChange`.
- **FR-07 (Portal Rendering):** Renders floating content in `document.body` via the Chellaa `Portal` primitive.
- **FR-08 (Arrow Anchor):** Optional directional pointer arrow (`hasArrow?: boolean`).

### 3.2 Non-Functional Requirements
- **NFR-01 (Strict Typing):** Complete TypeScript definitions with zero `any`.
- **NFR-02 (Zero Layout Shift):** Rendered out-of-flow without affecting page layout.
- **NFR-03 (Scoped Styling):** Authored in `@layer cl-components` using `--cl-*` variables.

### 3.3 Out of Scope
- Global multi-tier cascading flyout menus (delegated to `Menu`).
- Screen-centered modal backdrops (delegated to `Dialog`).

---

## 4. Non-Goals
- Supplanting standard navigation menus.
- Handling arbitrary drag-and-drop floating windows.

---

## 5. Feature Summary

| Capability | Description | Architectural Detail |
| :--- | :--- | :--- |
| **Compound API** | Granular slot composition | `Root`, `Trigger`, `Content`, `Close`, etc. |
| **WAI-ARIA Dialog** | APG Dialog/Disclosure semantics | `role="dialog"`, `aria-expanded`, `aria-controls` |
| **Focus Restoration** | Restores focus to trigger on close | Internal focus tracker |
| **Outside Click** | Click outside dismisses popover | Window pointerdown listener with boundary check |
| **Escape Key** | Closes immediately on Escape | Keydown listener with stopPropagation |

---

## 6. Anatomy

```text
<Popover.Root>
  ├── <Popover.Trigger asChild>
  │     <Button>Options</Button>
  │   </Popover.Trigger>
  └── <Popover.Portal>
        └── <Popover.Content className="cl-popover">
              ├── [Optional Arrow] (<Popover.Arrow className="cl-popover__arrow" />)
              ├── <Popover.Header className="cl-popover__header">
              │     <Popover.Title className="cl-popover__title">Quick Filter</Popover.Title>
              │     <Popover.Close className="cl-popover__close" />
              │   </Popover.Header>
              ├── <Popover.Body className="cl-popover__body">
              │     [Interactive form inputs, sliders, actions]
              │   </Popover.Body>
              └── <Popover.Footer className="cl-popover__footer">
                    <Button size="sm">Apply</Button>
                  </Popover.Footer>
            </Popover.Content>
      </Popover.Portal>
</Popover.Root>
```

---

## 7. Public API Specification

### 7.1 Compound Component Interfaces
```typescript
export interface PopoverRootProps {
  children: React.ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: TooltipPlacement;
  offset?: number;
  trapFocus?: boolean;
  closeOnBlur?: boolean;
  closeOnEsc?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

export interface PopoverTriggerProps {
  children: React.ReactElement;
  asChild?: boolean;
}

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hasArrow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```

### 7.2 Tabular Props Dictionary

| Component | Prop | Type | Default | Description | A11y Impact |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Popover.Root` | `isOpen` | `boolean` | `undefined` | Controlled open state | Updates `aria-expanded` |
| `Popover.Root` | `defaultOpen` | `boolean` | `false` | Uncontrolled initial state | None |
| `Popover.Root` | `onOpenChange`| `(open: boolean) => void` | `undefined` | Callback on state change | None |
| `Popover.Root` | `placement` | `TooltipPlacement` | `"bottom"` | Preferred anchor position | None |
| `Popover.Root` | `trapFocus` | `boolean` | `true` | Constrains Tab key inside content | Enforces WCAG 2.1.2 |
| `Popover.Root` | `closeOnEsc` | `boolean` | `true` | Dismisses on Escape | Enforces WCAG 2.2 |
| `Popover.Root` | `offset` | `number` | `8` | Distance from trigger in px | None |
| `Popover.Content`| `hasArrow` | `boolean` | `true` | Renders pointer arrow | `aria-hidden="true"` |

---

## 8. TypeScript Types

```typescript
// packages/react/src/components/Popover/Popover.types.ts

import * as React from "react";
import type { TooltipPlacement } from "../Tooltip/Tooltip.types";

export interface PopoverContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLElement | null>;
  placement: TooltipPlacement;
  arrowRef: React.RefObject<HTMLElement | null>;
  arrowStyles: React.CSSProperties;
  floatingStyles: React.CSSProperties;
  id: string;
}

export interface PopoverProps extends PopoverRootProps {}
```

---

## 9. Variants & Visual States

- **Elevation:** Surface elevated with `--cl-shadow-lg`, crisp borders (`1px solid var(--cl-color-border-subtle)`).
- **Background:** High-density surface background (`var(--cl-color-bg-surface)`).
- **Interactive State Transitions:** Smooth entrance transition (`opacity` 150ms, `transform` scale 0.98 -> 1).

---

## 10. Sizes & Metrics

- **Max Width:** `400px` default (`--cl-size-popover-max, 400px`).
- **Border Radius:** `8px` (`--cl-radius-lg`).
- **Inner Padding:** `12px 16px` (`var(--cl-space-3) var(--cl-space-4)`).

---

## 11. States & Pseudo-Classes

- `data-state="open"`: `opacity: 1`, `pointer-events: auto`.
- `data-state="closed"`: `opacity: 0`, `pointer-events: none`.

---

## 12. Behavioral State Machine

- **Trigger Click:** Toggles between `CLOSED` and `OPEN`.
- **Outside Click:** Transitions from `OPEN` to `CLOSED`.
- **Escape Key:** Transitions from `OPEN` to `CLOSED`, refocuses trigger.

---

## 13. Controlled / Uncontrolled State Behavior

Managed via [`useControllableState`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/hooks/useControllableState.ts). In uncontrolled mode, state is encapsulated in `PopoverContext`. In controlled mode, caller provides `isOpen` and `onOpenChange`.

---

## 14. Events Contract

- `onOpenChange(open: boolean)`: Dispatched when opened or closed.
- `onInteractOutside`: Optional callback before closing on outside click.

---

## 15. Composition & Slot Delegation

- Trigger accepts `asChild?: boolean`, delegating event handlers and `aria-expanded` directly to buttons or icons without extra wrapper elements.
- Uses `Slot` primitive from `src/primitives/Slot.tsx`.

---

## 16. Ref Contract

- Forwarded ref on `Popover.Content` binds to `HTMLDivElement`.
- Trigger ref binds to the anchor DOM node.

---

## 17. Accessibility Specification (WCAG 2.2 AA & APG)

1. **Role:** `role="dialog"` on `Popover.Content`.
2. **ARIA Links:** Trigger has `aria-haspopup="dialog"`, `aria-expanded={isOpen}`, and `aria-controls="cl-popover-{id}"`.
3. **Labelling:** If `<Popover.Title>` is present, `Popover.Content` receives `aria-labelledby="cl-popover-title-{id}"`.
4. **Focus Trap:** When `trapFocus` is enabled, keyboard `Tab` cycles exclusively through focusable elements within the popover.
5. **Focus Restoration:** Upon closing via Escape, Close button, or outside click, focus restores cleanly to the Trigger.

---

## 18. Keyboard Interaction Keymap

| Key | Context | Action |
| :--- | :--- | :--- |
| `Enter` / `Space` | Focus on Trigger | Toggles popover open/closed |
| `Tab` | Inside Popover | Moves to next focusable element (trapped inside) |
| `Shift + Tab` | Inside Popover | Moves to previous focusable element |
| `Escape` | Inside Popover | Closes popover; restores focus to trigger |

---

## 19. Styling Contract (Scoped Static CSS & `--cl-*` Tokens)

```css
@layer cl-components {
  .cl-popover {
    position: absolute;
    top: 0;
    left: 0;
    z-index: var(--cl-z-popover, 1200);
    max-width: var(--cl-size-popover-max, 400px);
    background-color: var(--cl-color-bg-surface);
    color: var(--cl-color-text-primary);
    border: 1px solid var(--cl-color-border-subtle);
    border-radius: var(--cl-radius-lg, 8px);
    box-shadow: var(--cl-shadow-lg);
    outline: none;
    transition: opacity var(--cl-duration-fast, 150ms) var(--cl-easing-standard),
                transform var(--cl-duration-fast, 150ms) var(--cl-easing-standard);
  }

  .cl-popover[data-state="closed"] {
    opacity: 0;
    transform: scale(0.98);
    pointer-events: none;
  }

  .cl-popover[data-state="open"] {
    opacity: 1;
    transform: scale(1);
  }

  .cl-popover__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--cl-space-3, 12px) var(--cl-space-4, 16px);
    border-bottom: 1px solid var(--cl-color-border-subtle);
  }

  .cl-popover__title {
    margin: 0;
    font-size: var(--cl-font-size-sm, 14px);
    font-weight: var(--cl-font-weight-semibold, 600);
  }

  .cl-popover__body {
    padding: var(--cl-space-4, 16px);
  }

  .cl-popover__footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--cl-space-2, 8px);
    padding: var(--cl-space-3, 12px) var(--cl-space-4, 16px);
    border-top: 1px solid var(--cl-color-border-subtle);
  }

  .cl-popover__arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    border: inherit;
    transform: rotate(45deg);
  }
}
```

---

## 20. Theme Contract

Adapts automatically between light and dark themes using `--cl-color-bg-surface`, `--cl-color-text-primary`, and `--cl-shadow-lg`.

---

## 21. Responsive Behavior

- On viewports < 480px, `Popover` max-width adjusts to `calc(100vw - 32px)`.
- If screen space is exhausted, Floating UI automatically flips orientation or shifts along the primary axis.

---

## 22. Motion & Animations

Fade and subtle scale (`scale(0.98) -> scale(1)`) duration: 150ms. Resets to `0.01ms !important` under `prefers-reduced-motion: reduce`.

---

## 23. Testing Specification

| Test Category | Scenario | Expected Outcome |
| :--- | :--- | :--- |
| **1. Trigger Click** | Click Trigger button | Popover opens, renders in portal |
| **2. Outside Click** | Click outside Popover content | Popover closes; `onOpenChange(false)` fires |
| **3. Escape Key** | Press `Escape` while focused inside | Popover closes; focus returns to Trigger |
| **4. Focus Trap** | Press `Tab` repeatedly inside popover | Focus loops within popover elements |
| **5. Controlled Mode**| Pass `isOpen={true}` prop | Renders open unconditionally |
| **6. Accessibility** | Run `axe(container)` when open | Zero axe violations |

---

## 24. Storybook Contract

Stories in `packages/react/src/components/Popover/Popover.stories.tsx`:
1. `Default`: Simple popover with header, body, close button.
2. `FormInPopover`: Quick inline edit form inside popover.
3. `Placements`: 12-placement collision demonstration.
4. `NonModal`: Interactive popover without focus trap.

---

## 25. Documentation Reqs

Comprehensive API table, accessibility guide, and comparison between Tooltip, Popover, and Dialog.

---

## 26. Edge Cases & Hazards

1. **Trigger Unmounting:** Active listeners and portals clean up instantly on trigger unmount.
2. **Nested Interactive Controls:** Focus trap must prevent focus from leaking into underlying page content.

---

## 27. Reference Comparison

| Feature | Chellaa React | MUI Popover | Ant Design Popover | Radix Popover |
| :--- | :--- | :--- | :--- | :--- |
| **Architecture** | Compound components | Monolithic wrapper | Wrapped component | Compound |
| **Positioning** | `@floating-ui/react` | Popper.js | `@rc-component/trigger` | `@floating-ui/react` |
| **Styling** | Scoped static CSS in `@layer` | Emotion | Less | Headless |

---

## 28. Deferred Features

- Nested sub-popover chaining (delegated to `Menu`).

---

## 29. Acceptance Criteria

- [ ] Compound components (`Popover.Root`, `Popover.Trigger`, `Popover.Content`, etc.) implemented.
- [ ] Rendered via `Portal` into `document.body`.
- [ ] Viewport collision & flipping handled by `@floating-ui/react` per ADR-010.
- [ ] `Escape` key closes popover and restores focus to trigger.
- [ ] Outside clicks dismiss popover cleanly.
- [ ] 0 axe accessibility violations.
- [ ] 100% test pass rate in Vitest.

---

## 30. Implementation Plan, Governance & Traceability

### 30.1 Target Files
```text
packages/react/src/components/Popover/
├── Popover.tsx
├── Popover.types.ts
├── Popover.styles.css
├── Popover.test.tsx
├── Popover.stories.tsx
└── index.ts
```

### 30.2 Reviewers & Roles
- **React Component Engineer:** Implement compound structure and context.
- **Quality Engineer:** Validate focus trapping and axe tests.
- **Independent Reviewer:** Verify acceptance gates.

### 30.3 Traceability Matrix

| Requirement | Source Rule / ADR | Workflow Stage | Acceptance Criterion |
| :--- | :--- | :--- | :--- |
| Floating Positioning | ADR-010 | Workflow F | Auto-flip & collision handling |
| Scoped CSS | ADR-007, ADR-011 | Workflow F | Authored in `@layer cl-components` |
| APG Dialog Semantics | Document 04 (A11y) | Workflow G | Role="dialog", focus trap & restoration |
