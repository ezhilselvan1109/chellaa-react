# Tooltip Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications (Tier 4 / Phase 3 Surfaces & Visual Data Display)  
**Specification ID:** SPEC-022  
**Target Package:** `@chellaa/react`  
**Revision:** 1.0.0  
**Priority:** P1 High  
**Governing Standard:** [00-component-specification-standard.md](./00-component-specification-standard.md), [01-api-conventions.md](./01-api-conventions.md), [ADR-010-overlay-positioning.md](../adr/ADR-010-overlay-positioning.md), [ADR-011-hybrid-styling-architecture-and-engine-boundary.md](../adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md)  
**Dependencies:** `@floating-ui/react` (runtime positioning per ADR-010), `Portal` primitive  

---

## 1. Identity

```text
Component Name:     Tooltip
Specification ID:   SPEC-022
Package Export:     import { Tooltip, type TooltipProps, type TooltipPlacement } from "@chellaa/react";
Category:           Data Display / Overlays
Status:             Approved & Implementation Ready
Phase:              Phase 3 — Surfaces & Visual Data Display
Priority:           P1 High
Version:            1.0.0
Related Components: Popover, Button, IconButton, Kbd
Governing ADRs:     ADR-007 (Zero-Config Styling), ADR-010 (Overlay Positioning), ADR-011 (Hybrid Styling)
```

---

## 2. Purpose & Problem Statement

### 2.1 Problem Statement
In dense graphical interfaces, icon-only buttons, truncated text labels, and compact indicators lack sufficient textual context for novice users. The native browser `title` attribute is severely deficient:
1. It is inaccessible on touch/mobile devices.
2. It exhibits an unconfigurable, laggy OS-dependent display delay (typically 1–2 seconds).
3. It cannot be styled to adhere to design tokens, dark themes, or typographic scales.
4. It is often ignored or inconsistently announced by screen readers.
5. It fails WCAG 2.2 Success Criterion 1.4.13 (Content on Hover or Focus) because it cannot be dismissed without moving the pointer, and its content is not hoverable.

The `Tooltip` component solves this by providing a lightweight, floating text popup anchored to a target trigger element, triggered via pointer hover or keyboard focus, with deterministic delay management, auto-flipping collision physics, and strict WCAG 2.2 AA compliance.

### 2.2 Why It Belongs in Chellaa React
As an enterprise design system, Chellaa React heavily employs compact action bars, data tables with truncated cells, and icon buttons. Without an accessible, token-governed `Tooltip`, applications must either compromise data density or risk severe usability and accessibility defects.

### 2.3 When to Use
- Providing an accessible textual description for icon-only action triggers (`<IconButton aria-label="Archive" />`).
- Clarifying non-obvious interface elements or status badges.
- Revealing keyboard shortcut hints alongside element labels (composing with `<Kbd>`).
- Revealing truncated text in compact table cells or navigation sidebars.

### 2.4 When NOT to Use
- **Do NOT use Tooltip for interactive content.** Tooltips must never contain links, buttons, form inputs, or copyable text. If the floating overlay requires user interaction, use [`Popover`](./23-popover.md) or [`Dialog`](./04-modal.md).
- **Do NOT use Tooltip as the sole medium for critical instructions.** Users must not be forced to hover over an element to discover how to complete a core task.
- **Do NOT place Tooltips on disabled elements without an accessible wrapper.** Disabled buttons do not fire pointer or focus events in many browsers; an un-disabled wrapper element must receive focus/hover.

---

## 3. Scope & Requirements

### 3.1 Functional Requirements (In Scope)
- **FR-01 (Trigger Anchor):** Wraps an interactive child element via slot composition (`asChild` pattern) or direct child delegation, binding hover and focus listeners.
- **FR-02 (Floating Overlay):** Renders floating tooltip content into `document.body` via the Chellaa `Portal` primitive to escape parent `overflow: hidden` and stacking contexts.
- **FR-03 (Collision Positioning):** Calculates anchored coordinates via `@floating-ui/react` supporting 12 standard placements: `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end`.
- **FR-04 (Auto-Flip & Shift):** Automatically flips to opposite placement when boundary space is insufficient, shifting along viewport edges to maintain full visibility.
- **FR-05 (Configurable Delays):** Configurable `openDelay` (default: 200ms) to prevent visual noise during rapid pointer motion, and `closeDelay` (default: 150ms).
- **FR-06 (Hover & Focus Synchronization):** Opens on pointer enter and keyboard focus; closes on pointer leave, blur, or `Escape` key press.
- **FR-07 (Interactive Hoverable Content):** Satisfies WCAG 1.4.13 by allowing the pointer to move over the tooltip content without it disappearing.
- **FR-08 (Arrow Indicator):** Optional decorative arrow rendered via SVG or CSS diamond (`hasArrow?: boolean`, default: `true`).
- **FR-09 (Shortcut Integration):** Built-in `shortcut?: string` or slot for keyboard shortcut indicator.

### 3.2 Non-Functional Requirements
- **NFR-01 (Bundle Ceiling):** Tooltip core logic adds < 2.5 KB min+gzip (excluding `@floating-ui/react` shared runtime).
- **NFR-02 (Zero Layout Shift):** Absolute positioning with GPU transforms (`translate3d`) prevents reflow of document layout.
- **NFR-03 (Theme Responsiveness):** Automatic token adaptation across light and dark modes with high-contrast borders.

### 3.3 Out of Scope
- Interactive elements inside the tooltip (strictly governed by `Popover`).
- Multi-step guided tour popups (governed by `Tour` / `Walkthrough`).
- Custom canvas-rendered tooltip charts.

---

## 4. Non-Goals
- Replacing modal dialogs or inline form validation messages (`FormField` owns inline errors).
- Supporting touch-screen long-press simulation on mobile (tooltips on touch devices are suboptimal; mobile tap interactions should open bottom sheets or popovers).

---

## 5. Feature Summary

| Capability | Description | Architectural Detail |
| :--- | :--- | :--- |
| **WAI-ARIA APG Pattern** | Full tooltip design pattern conformance | `role="tooltip"`, `id`, `aria-describedby` linkage |
| **Positioning Engine** | Viewport-aware collision & auto-flip | `@floating-ui/react` (`flip()`, `shift()`, `offset(8)`) |
| **DOM Escape** | Rendered at document root | Chellaa `Portal` primitive |
| **Dismissibility** | Instant dismiss without moving focus | `Escape` key closes tooltip immediately |
| **Hover Persistence** | Pointer can move into tooltip | Safe hover boundary bridge |
| **Delay Warmup** | Instant open when moving between tooltips | Shared warmup timer context |

---

## 6. Anatomy

```text
Tooltip Root (Logical Wrapper / Context)
├── Trigger Slot [asChild | Child Element] (HTML <button> / <a> / <div tabIndex={0}>)
│     aria-describedby="cl-tooltip-{id}"
└── Portal (Rendered into document.body)
      └── Tooltip Content (.cl-tooltip)
            role="tooltip"
            id="cl-tooltip-{id}"
            data-placement="{placement}"
            data-state="open" | "closed"
            ├── Tooltip Text (.cl-tooltip__label)
            ├── [Optional Shortcut] (.cl-tooltip__shortcut -> <Kbd>)
            └── [Optional Arrow] (.cl-tooltip__arrow)
```

---

## 7. Public API Specification

### 7.1 Props Interface
```typescript
export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export interface TooltipProps {
  /** The text content or descriptive React element to display inside the tooltip */
  content: React.ReactNode;
  /** The interactive trigger element that activates the tooltip */
  children: React.ReactElement;
  /** Preferred placement relative to the trigger. Defaults to "top" */
  placement?: TooltipPlacement;
  /** Delay in milliseconds before opening after pointer enters trigger. Defaults to 200 */
  openDelay?: number;
  /** Delay in milliseconds before closing after pointer leaves. Defaults to 150 */
  closeDelay?: number;
  /** Controlled open state */
  isOpen?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  /** Callback fired when the open state changes */
  onOpenChange?: (isOpen: boolean) => void;
  /** Whether to render a decorative pointer arrow. Defaults to true */
  hasArrow?: boolean;
  /** Whether the tooltip is completely disabled and prevented from opening. Defaults to false */
  isDisabled?: boolean;
  /** Offset distance in pixels between the trigger and tooltip. Defaults to 8 */
  offset?: number;
  /** Optional keyboard shortcut string to render inside tooltip (e.g. "Ctrl+S") */
  shortcut?: string;
  /** Additional custom CSS class name applied to the tooltip container */
  className?: string;
  /** Additional inline CSS properties applied to the tooltip container */
  style?: React.CSSProperties;
}
```

### 7.2 Tabular Props Dictionary

| Prop | Type | Required | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `content` | `React.ReactNode` | Yes | — | Content rendered inside the tooltip | Accessible description string |
| `children` | `React.ReactElement` | Yes | — | Single trigger child element | Receives `aria-describedby` |
| `placement` | `TooltipPlacement` | No | `"top"` | Floating position relative to trigger | None |
| `openDelay` | `number` | No | `200` | Milliseconds before tooltip appears | Improves cognitive clarity |
| `closeDelay`| `number` | No | `150` | Milliseconds before tooltip vanishes | Prevents premature dismissal |
| `isOpen` | `boolean` | No | `undefined` | Controlled visibility state | Synchronizes ARIA attributes |
| `defaultOpen` | `boolean` | No | `false` | Uncontrolled default visibility | None |
| `onOpenChange`| `(open: boolean) => void` | No | `undefined` | Event handler on state transition | None |
| `hasArrow` | `boolean` | No | `true` | Renders directional pointer arrow | `aria-hidden="true"` |
| `isDisabled`| `boolean` | No | `false` | Suppresses tooltip display completely | Suppresses `aria-describedby` |
| `offset` | `number` | No | `8` | Distance from trigger in px | None |
| `shortcut` | `string` | No | `undefined` | Shortcut label rendered with `<Kbd>` | Announced to screen readers |

---

## 8. TypeScript Types

```typescript
// packages/react/src/components/Tooltip/Tooltip.types.ts

import * as React from "react";

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: TooltipPlacement;
  openDelay?: number;
  closeDelay?: number;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hasArrow?: boolean;
  isDisabled?: boolean;
  offset?: number;
  shortcut?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface TooltipOwnerState {
  placement: TooltipPlacement;
  isOpen: boolean;
  hasArrow: boolean;
}
```

---

## 9. Variants & Visual States

Unlike heavy components, `Tooltip` maintains a single, ultra-crisp visual variant adhering to the **Tactile Clarity** design principle:
- **Default (Dark Contrast):** Dark charcoal slate surface (`--cl-color-bg-inverse`, `--cl-color-text-inverse`) in light mode; crisp elevated surface in dark mode.
- **Border:** Subtle translucent border (`1px solid var(--cl-color-border-subtle)`) to guarantee contrast against complex backgrounds.
- **Elevation:** High-frequency shadow (`box-shadow: var(--cl-shadow-md)`).

---

## 10. Sizes & Metrics

| Dimension | Token / Metric Value | Rationale |
| :--- | :--- | :--- |
| **Max Width** | `320px` (`max-width: var(--cl-size-tooltip-max, 320px)`) | Prevents unreadable single-line sprawls |
| **Padding** | `4px 8px` (`var(--cl-space-1) var(--cl-space-2)`) | Compact spatial density |
| **Border Radius** | `4px` (`var(--cl-radius-sm)`) | Matches Button and Input radii |
| **Typography** | Font Size: `12px` (`var(--cl-font-size-xs)`), Line Height: `1.4` | High legibility at small scale |
| **Arrow Size** | `6px × 6px` diamond | Subtle directional pointer |

---

## 11. States & Pseudo-Classes

- **Closed (`data-state="closed"`):** `opacity: 0`, `pointer-events: none`, unmounted or hidden from accessibility tree.
- **Open (`data-state="open"`):** `opacity: 1`, `pointer-events: auto` (allowing hover over content), rendered in portal.
- **Disabled (`isDisabled={true}`):** Tooltip never opens; no event handlers attached; trigger has no `aria-describedby`.

---

## 12. Behavioral State Machine

```
┌──────────────┐   Pointer Enter / Focus   ┌──────────────┐   Delay Elapsed   ┌──────────────┐
│    CLOSED    │ ────────────────────────> │   PENDING    │ ────────────────> │     OPEN     │
└──────────────┘                           └──────────────┘                   └──────────────┘
       ▲                                          │                                  │
       │           Pointer Leave / Blur           │         Pointer Leave / Blur     │
       └──────────────────────────────────────────┴──────────────────────────────────┘
                                                          or Escape Key Pressed
```

---

## 13. Controlled / Uncontrolled State Behavior

`Tooltip` supports dual state operation via [`useControllableState`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/hooks/useControllableState.ts):
- **Uncontrolled:** Managed internally using `defaultOpen` (default: `false`), `openDelay`, and `closeDelay`.
- **Controlled:** Driven by `isOpen` and `onOpenChange`. Allows parent components (e.g. interactive onboarding flows) to orchestrate tooltip display imperatively.

---

## 14. Event Contract

- **`onPointerEnter` on Trigger:** Initiates `openDelay` timer.
- **`onPointerLeave` on Trigger:** Cancels open timer; if open, initiates `closeDelay` timer.
- **`onFocus` on Trigger:** Immediately displays tooltip (zero delay for keyboard users).
- **`onBlur` on Trigger:** Immediately hides tooltip.
- **`onKeyDown` (Global when open):** When `event.key === "Escape"`, stops propagation, closes tooltip immediately, and retains trigger focus.

---

## 15. Composition & Slot Delegation

`Tooltip` acts as a decorator for its child trigger:
- Uses `React.cloneElement` or `Slot` primitive to inject `ref`, `onPointerEnter`, `onPointerLeave`, `onFocus`, `onBlur`, and `aria-describedby`.
- Preserves consumer event handlers attached to the child (using [`composeEventHandlers`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/utils/composeEventHandlers.ts)).
- Merges forwarded refs using [`useMergeRefs`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/hooks/useMergeRefs.ts).

---

## 16. Ref Contract

- **Trigger Ref:** Merged with child's forwarded ref to provide anchor coordinates to Floating UI.
- **Content Ref:** Assigned to floating DOM container for dimension measurement and collision detection.

---

## 17. Accessibility Specification (WCAG 2.2 AA & APG)

1. **Role:** `role="tooltip"`.
2. **Accessible Name & Association:** Trigger child element receives `aria-describedby="cl-tooltip-{generated-id}"`. The tooltip content DOM element receives `id="cl-tooltip-{generated-id}"`.
3. **Esc Key Dismissal (WCAG 2.2 SC 1.4.13):** Pressing `Escape` closes the open tooltip without moving focus away from the trigger element.
4. **Hoverable Content (WCAG 2.2 SC 1.4.13):** If the tooltip is triggered by hover, moving the pointer from trigger to the tooltip content preserves the open state until the pointer leaves both.
5. **Screen Reader Announcement:** Assistive technologies announce the tooltip content upon focusing the trigger via `aria-describedby`.
6. **No Pointer Obstruction:** Floating positioning and auto-flip ensure tooltips do not occlude vital surrounding content.

---

## 18. Keyboard Interaction Keymap

| Key | Context | Action |
| :--- | :--- | :--- |
| `Tab` | Trigger receives focus | Opens tooltip immediately without delay |
| `Shift + Tab` | Focus moves away from trigger | Closes tooltip immediately |
| `Escape` | Tooltip is open | Closes tooltip immediately; focus remains on trigger |

---

## 19. Styling Contract (Scoped Static CSS & `--cl-*` Tokens)

Authored inside `@layer cl-components`:

```css
@layer cl-components {
  .cl-tooltip {
    position: absolute;
    top: 0;
    left: 0;
    z-index: var(--cl-z-tooltip, 1400);
    max-width: var(--cl-size-tooltip-max, 320px);
    padding: var(--cl-space-1, 4px) var(--cl-space-2, 8px);
    font-family: var(--cl-font-family-sans);
    font-size: var(--cl-font-size-xs, 12px);
    line-height: var(--cl-line-height-tight, 1.4);
    font-weight: var(--cl-font-weight-medium, 500);
    color: var(--cl-color-text-inverse, #ffffff);
    background-color: var(--cl-color-bg-inverse, #0f172a);
    border: 1px solid var(--cl-color-border-subtle, rgba(255, 255, 255, 0.1));
    border-radius: var(--cl-radius-sm, 4px);
    box-shadow: var(--cl-shadow-md);
    pointer-events: auto;
    user-select: none;
    transition: opacity var(--cl-duration-fast, 150ms) var(--cl-easing-standard),
                transform var(--cl-duration-fast, 150ms) var(--cl-easing-standard);
  }

  .cl-tooltip[data-state="closed"] {
    opacity: 0;
    transform: scale(0.96);
    pointer-events: none;
  }

  .cl-tooltip[data-state="open"] {
    opacity: 1;
    transform: scale(1);
  }

  .cl-tooltip__arrow {
    position: absolute;
    width: 6px;
    height: 6px;
    background: inherit;
    border: inherit;
    transform: rotate(45deg);
  }

  .cl-tooltip__shortcut {
    margin-left: var(--cl-space-2, 8px);
    opacity: 0.8;
  }
}
```

---

## 20. Theme Contract

- **Light Mode (`[data-theme="light"]`):** Deep charcoal surface (`#0f172a`), crisp white text (`#ffffff`), subtle dark shadow.
- **Dark Mode (`[data-theme="dark"]`):** Rich elevated dark surface (`#1e293b`), crisp light text (`#f8fafc`), high-contrast luminous border (`rgba(255,255,255,0.15)`).

---

## 21. Responsive Behavior

- On mobile touch viewports, hover states do not naturally trigger.
- Triggering via tap is supported when `isOpen` is controlled, but native desktop tooltips gracefully degrade to non-blocking hints.
- Overflow collisions dynamically shift tooltip coordinates to prevent clipping on 320px mobile screens.

---

## 22. Motion & Animations

- Fade-in and micro-scale (`scale(0.96) -> scale(1)`) duration: 150ms (`--cl-duration-fast`).
- **Vestibular Safety:** Under `@media (prefers-reduced-motion: reduce)`, transition durations are reset to `0.01ms !important` with zero transform scaling.

---

## 23. Testing Specification

### 23.1 Test Scenarios & Outcomes

| Test Category | Scenario | Expected Outcome |
| :--- | :--- | :--- |
| **1. Rendering** | Render Tooltip with text content and child button | Button renders in DOM; tooltip initially not visible |
| **2. Hover Interaction** | Fire `pointerEnter` on trigger | Tooltip becomes visible after `openDelay` (200ms) |
| **3. Focus Interaction** | Focus trigger using keyboard | Tooltip opens immediately with 0 delay; `aria-describedby` linked |
| **4. Dismissal** | Press `Escape` while tooltip open | Tooltip immediately unmounts/hides; focus stays on trigger |
| **5. Hover Continuity** | Move pointer from trigger onto tooltip content | Tooltip stays open (WCAG 1.4.13 hoverable) |
| **6. Controlled State** | Pass `isOpen={true}` prop | Tooltip renders open regardless of mouse events |
| **7. Disabled Prop** | Pass `isDisabled={true}` and hover trigger | Tooltip remains closed; no `aria-describedby` added |
| **8. Accessibility Audit** | Run `axe(container)` with tooltip open | 0 accessibility violations |

---

## 24. Storybook Contract

Stories implemented in `packages/react/src/components/Tooltip/Tooltip.stories.tsx`:
1. `Default`: Basic hover tooltip on Button.
2. `Placements`: 12-grid layout demonstrating all 12 floating placements.
3. `WithShortcut`: Tooltip containing keyboard shortcut hint (`shortcut="Ctrl+K"`).
4. `InteractiveHover`: Demonstrates pointer moving from trigger onto tooltip body.
5. `WithIconButton`: Tooltip labeling icon-only button (verifying accessible naming).
6. `DarkTheme`: Visual permutation under light and dark themes.

---

## 25. Documentation Requirements

- **Overview:** Interactive sandbox with placement switcher.
- **Props Table:** Tabular API dictionary with defaults.
- **Accessibility Callout:** Explaining WCAG 2.2 1.4.13 requirements and why tooltips must not contain buttons.

---

## 26. Edge Cases & Hazards

1. **Trigger Inside Nested Scrolling Container:** Floating UI `autoUpdate` dynamically recalculates coordinates on parent scroll.
2. **Rapid Pointer Flurry:** If pointer crosses trigger in < 200ms, timer cancels with zero DOM mounting or memory leak.
3. **Trigger Unmounts While Open:** Cleanup effect clears active timers and unmounts portal cleanly.

---

## 27. Reference Comparison

| Feature | Chellaa React | MUI Tooltip | Ant Design Tooltip | Radix Tooltip |
| :--- | :--- | :--- | :--- | :--- |
| **Positioning Engine** | `@floating-ui/react` | Popper.js | `@rc-component/trigger` | `@floating-ui/react` |
| **Styling Architecture** | Scoped static CSS in `@layer` | Emotion runtime | Less / CSS-in-JS | Unstyled |
| **Zero-Config Import** | Yes (`@chellaa/react`) | Requires ThemeProvider | Requires config | Headless |
| **WCAG 1.4.13 Compliant**| Yes (Hoverable content) | Partial | Partial | Full |

---

## 28. Deferred Features

- Interactive rich preview cards (delegated to [`Popover`](./23-popover.md)).
- Canvas-based custom arrow shape styling.

---

## 29. Acceptance Criteria

- [ ] `Tooltip` component implemented following collocated 6-file architecture.
- [ ] Rendered into `document.body` via Chellaa `Portal`.
- [ ] Viewport collision, auto-flipping, and 12 placements powered by `@floating-ui/react` per ADR-010.
- [ ] Controlled (`isOpen`, `onOpenChange`) and uncontrolled modes fully functional.
- [ ] `Escape` key dismisses tooltip immediately without losing trigger focus.
- [ ] Pointer can hover over tooltip body without dismissal (WCAG 1.4.13).
- [ ] Zero axe violations across all states.
- [ ] 100% test pass rate in Vitest.

---

## 30. Implementation Plan, Governance & Traceability

### 30.1 Target Files to Create
```text
packages/react/src/components/Tooltip/
├── Tooltip.tsx
├── Tooltip.types.ts
├── Tooltip.styles.css
├── Tooltip.test.tsx
├── Tooltip.stories.tsx
└── index.ts
```

### 30.2 Applicable Roles & Reviewers
- **React Component Engineer:** Author component logic and ref forwarding.
- **Build & Distribution Engineer:** Ensure `@floating-ui/react` dependency is configured in `package.json` per ADR-010.
- **Quality Engineer:** Validate Vitest unit tests and axe accessibility.
- **Independent Reviewer:** Execute verification gates and sign off.

### 30.3 Requirements Traceability Matrix

| Requirement | Source Rule / ADR | Workflow Stage | Acceptance Criterion |
| :--- | :--- | :--- | :--- |
| Anchored Positioning | ADR-010 (Floating UI) | Workflow F | Viewport auto-flip in all 12 placements |
| Zero-Config Styling | ADR-007, ADR-011 | Workflow F | Scoped CSS in `@layer cl-components` |
| WCAG 1.4.13 Compliance | Document 04 (A11y Standards) | Workflow G | Hoverable content + Esc dismissal |
| 7-Tier Test Suite | Document 05 (Testing Standards) | Workflow G | 100% passing Vitest test suite |
