# Drawer & Sheet Component Specification

**Document Status:** Approved & Baseline  
**Phase:** Wave 3 — Menu & Drawer Overlays  
**Specification ID:** SPEC-036  
**Target Package:** `@chellaa/react`  
**Revision:** 1.0.0  
**Priority:** P1 High  
**Governing Standards:** [00-component-specification-standard.md](./00-component-specification-standard.md), [01-api-conventions.md](./01-api-conventions.md), [04-modal.md](./04-modal.md), [ADR-010-overlay-positioning.md](../adr/ADR-010-overlay-positioning.md), [ADR-011-hybrid-styling-architecture-and-engine-boundary.md](../adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md)  
**Dependencies:** Specialization of `Dialog` overlay architecture, `Portal`, `Slot`, `useControllableState`, `useMergeRefs`  

---

## 1. Identity

```text
Component Names:   Drawer, Sheet (Alias)
Specification ID:  SPEC-036
Package Exports:   import {
                     Drawer,
                     DrawerRoot,
                     DrawerTrigger,
                     DrawerPortal,
                     DrawerOverlay,
                     DrawerContent,
                     DrawerHeader,
                     DrawerTitle,
                     DrawerDescription,
                     DrawerBody,
                     DrawerFooter,
                     DrawerClose,
                     type DrawerPlacement,
                     type DrawerSize,
                     type DrawerRootProps,
                     type DrawerTriggerProps,
                     type DrawerPortalProps,
                     type DrawerOverlayProps,
                     type DrawerContentProps,
                     type DrawerHeaderProps,
                     type DrawerTitleProps,
                     type DrawerDescriptionProps,
                     type DrawerBodyProps,
                     type DrawerFooterProps,
                     type DrawerCloseProps
                   } from "@chellaa/react";
Category:          Overlays / Modal Surfaces
Status:            Approved & Implementation Ready
Phase:             Wave 3 — Menu & Drawer Overlays
Priority:          P1 High
Version:           1.0.0
Related:           Dialog, Popover, Portal, Slot
Governing ADRs:    ADR-007 (Zero-Config Styling), ADR-010 (Overlay Architecture), ADR-011 (Hybrid Styling)
```

---

## 2. Purpose & Problem Statement

### 2.1 Problem Statement
Enterprise applications routinely require side panels and edge-anchored modal surfaces:
1. **Context-Preserving Tasks:** Workflows like editing side properties, inspection panels, filter drawers, cart checkouts, and mobile navigation sheets require viewing the primary page in background context while interacting with edge-anchored drawers.
2. **Competing Overlay Systems:** A common anti-pattern in component libraries is creating separate, competing focus-trap, backdrop, and body-scroll-lock implementations for modals vs drawers. This causes scroll-lock race conditions, double scrollbar flickers, and focus-leaks when multiple overlays stack.
3. **Responsive Directional Ergonomics:** Left drawers are preferred for navigation, right drawers for editing and inspection, and bottom drawers for mobile action sheets. The component must support 4 directional placements seamlessly with responsive size scales.

### 2.2 Why It Belongs in Chellaa React
`Drawer` specializes the existing, battle-tested `Dialog` architecture. It shares the exact same reference-counted body scroll lock, focus trap, and ARIA relationships, ensuring zero code bloat and zero race conditions.

### 2.3 When to Use
- **Right Drawer:** Entity edit forms, audit logs, detail view panels, cart sidebars.
- **Left Drawer:** Collapsible navigation trees, workspace directories, mobile menus.
- **Bottom Drawer / Sheet:** Mobile action sheets, bulk selection action bars, cookie consent drawers.
- **Top Drawer:** Notification center drop-downs, global search palettes.

### 2.4 When NOT to Use
- Do NOT use Drawer for simple action menus. Use `DropdownMenu` (SPEC-034).
- Do NOT use Drawer for centered critical alert confirmations. Use `Dialog` (SPEC-004).

---

## 3. Scope & Requirements

### 3.1 Functional Requirements (In Scope)
- **FR-01 (Compound Architecture):** Composable compound subcomponents matching `Dialog` conventions: `Drawer` (or `DrawerRoot`), `DrawerTrigger`, `DrawerPortal`, `DrawerOverlay`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerBody`, `DrawerFooter`, `DrawerClose`.
- **FR-02 (Shared Dialog Infrastructure):** Direct specialization of `Dialog`:
  - Shares the reference-counted body scroll lock with scrollbar width compensation (`activeScrollLockCount`).
  - Shares the focus trap loop (`Tab` / `Shift+Tab`) with initial and final focus restoration.
  - Shares `Escape` key dismissal (`closeOnEsc !== false`).
  - Shares backdrop overlay dismissal (`closeOnOverlayClick !== false`).
  - Zero duplicate overlay manager.
- **FR-03 (4 Directional Placements):**
  - `placement?: "left" | "right" | "top" | "bottom"`. Default: `"right"`.
- **FR-04 (6 Sizing Options):**
  - `size?: "xs" | "sm" | "md" | "lg" | "xl" | "full"`. Default: `"md"`.
  - Side drawers (`left`, `right`): Height is 100vh; width conforms to size scale (e.g., xs: 280px, sm: 360px, md: 440px, lg: 560px, xl: 720px, full: 100vw).
  - Vertical drawers (`top`, `bottom`): Width is 100vw; height conforms to size scale (e.g., xs: 200px, sm: 280px, md: 360px, lg: 480px, xl: 600px, full: 100vh).
- **FR-05 (Controlled & Uncontrolled Visibility):**
  - Supports `open?: boolean`, `isOpen?: boolean` (ergonomic alias), `defaultOpen?: boolean`, `onOpenChange?: (open: boolean) => void`, `onClose?: () => void`.
- **FR-06 (Scrollable Content):**
  - Long content inside `DrawerBody` / `DrawerContent` scrolls smoothly (`overflow-y: auto`) without overflowing horizontally or shifting layout.
- **FR-07 (Accessibility):**
  - Renders with `role="dialog"`, `aria-modal="true"`.
  - Automatically associates `aria-labelledby` with `DrawerTitle` ID and `aria-describedby` with `DrawerDescription` ID.

### 3.2 Non-Goals
- Native touch drag-to-dismiss gesture physics (deferred to future gesture library evaluation).

---

## 4. Component Anatomy & DOM Structure

```text
┌────────────────────────────────────────────────────────┐
│ Drawer.Portal (Mounted in document.body)               │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Drawer.Overlay (.cl-drawer__overlay)             │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Drawer.Content (.cl-drawer__content,             │  │
│  │                 data-placement="right",          │  │
│  │                 data-size="md", role="dialog")   │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │ Drawer.Header (.cl-drawer__header)         │  │  │
│  │  │  <Drawer.Title />                          │  │  │
│  │  │  <Drawer.Close />                          │  │  │
│  │  ├────────────────────────────────────────────┤  │  │
│  │  │ Drawer.Body (.cl-drawer__body, scrollable) │  │  │
│  │  │  ... User Content ...                      │  │  │
│  │  ├────────────────────────────────────────────┤  │  │
│  │  │ Drawer.Footer (.cl-drawer__footer)         │  │  │
│  │  │  [Cancel] [Save Changes]                   │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 5. TypeScript Public API & Definitions

```typescript
export type DrawerPlacement = "left" | "right" | "top" | "bottom";
export type DrawerSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

export interface DrawerRootProps {
  open?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  finalFocusRef?: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

export interface DrawerTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export interface DrawerPortalProps {
  container?: HTMLElement | null;
  children: React.ReactNode;
}

export interface DrawerOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export interface DrawerContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  placement?: DrawerPlacement;
  size?: DrawerSize;
  asChild?: boolean;
  children: React.ReactNode;
}

export interface DrawerHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DrawerTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

export interface DrawerDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean;
}

export interface DrawerBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DrawerFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DrawerCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
```

---

## 6. Styling, Design Tokens & Motion

### 6.1 Scoped Classes
- `.cl-drawer`
- `.cl-drawer__overlay`
- `.cl-drawer__content`
- `.cl-drawer__content[data-placement="left"]`
- `.cl-drawer__content[data-placement="right"]`
- `.cl-drawer__content[data-placement="top"]`
- `.cl-drawer__content[data-placement="bottom"]`
- `.cl-drawer__header`, `.cl-drawer__title`, `.cl-drawer__description`
- `.cl-drawer__body`, `.cl-drawer__footer`, `.cl-drawer__close`

### 6.2 Semantic Tokens
- Surface Background: `var(--cl-color-bg-surface)`
- Overlay Backdrop: `var(--cl-backdrop-bg, rgba(0, 0, 0, 0.48))`
- Border: `var(--cl-color-border)`
- Shadow: `var(--cl-shadow-xl)`
- Z-Index: `var(--cl-z-index-modal, 1200)`

### 6.3 Motion & Transitions
- Keyframe animations with directional slide transforms:
  - `right`: `translateX(100%)` -> `translateX(0)`
  - `left`: `translateX(-100%)` -> `translateX(0)`
  - `top`: `translateY(-100%)` -> `translateY(0)`
  - `bottom`: `translateY(100%)` -> `translateY(0)`
- Duration: 240ms `cubic-bezier(0.16, 1, 0.3, 1)`.
- Respects `@media (prefers-reduced-motion: reduce)`: duration set to 0.01ms.

---

## 7. Testing & Quality Acceptance Gates

1. **Unit & Interaction Tests (Vitest + RTL + user-event):**
   - 4 directional placements (`left`, `right`, `top`, `bottom`) apply correct layout classes/attributes.
   - Controlled and uncontrolled open state handling.
   - Focus trap cycles properly with `Tab` / `Shift+Tab`.
   - `initialFocusRef` receives focus upon open.
   - `finalFocusRef` or originating trigger receives focus upon close.
   - `Escape` dismisses drawer when `closeOnEsc !== false`.
   - Overlay click dismisses drawer when `closeOnOverlayClick !== false`.
   - Shared body scroll lock acquires and releases without premature unlock.
   - DrawerClose button dismisses drawer.
2. **Accessibility Audit:**
   - 0 violations with `axe-core` in open and closed states.
3. **Storybook Stories:**
   - All Placements, All Sizes, Controlled State, Form / Content Example, Long Scrollable Content.
