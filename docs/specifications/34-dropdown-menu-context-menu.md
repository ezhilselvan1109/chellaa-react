# DropdownMenu & ContextMenu Component Specification

**Document Status:** Approved & Baseline  
**Phase:** Wave 3 — Menu & Drawer Overlays  
**Specification ID:** SPEC-034  
**Target Package:** `@chellaa/react`  
**Revision:** 1.0.0  
**Priority:** P1 High  
**Governing Standards:** [00-component-specification-standard.md](./00-component-specification-standard.md), [01-api-conventions.md](./01-api-conventions.md), [ADR-010-overlay-positioning.md](../adr/ADR-010-overlay-positioning.md), [ADR-011-hybrid-styling-architecture-and-engine-boundary.md](../adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md)  
**Dependencies:** `@floating-ui/react` (positioning & virtual reference), `Portal`, `Slot`, `useControllableState`, `useMergeRefs`  

---

## 1. Identity

```text
Component Names:   DropdownMenu, ContextMenu
Specification ID:  SPEC-034
Package Exports:   import {
                     DropdownMenu,
                     DropdownMenuTrigger,
                     DropdownMenuContent,
                     DropdownMenuItem,
                     DropdownMenuCheckboxItem,
                     DropdownMenuRadioGroup,
                     DropdownMenuRadioItem,
                     DropdownMenuSeparator,
                     DropdownMenuLabel,
                     ContextMenu,
                     ContextMenuTrigger,
                     ContextMenuContent,
                     ContextMenuItem,
                     ContextMenuCheckboxItem,
                     ContextMenuRadioGroup,
                     ContextMenuRadioItem,
                     ContextMenuSeparator,
                     ContextMenuLabel,
                     type DropdownMenuRootProps,
                     type DropdownMenuTriggerProps,
                     type DropdownMenuContentProps,
                     type DropdownMenuItemProps,
                     type DropdownMenuCheckboxItemProps,
                     type DropdownMenuRadioGroupProps,
                     type DropdownMenuRadioItemProps,
                     type DropdownMenuSeparatorProps,
                     type DropdownMenuLabelProps,
                     type ContextMenuRootProps,
                     type ContextMenuTriggerProps,
                     type ContextMenuContentProps,
                     type ContextMenuItemProps,
                     type ContextMenuCheckboxItemProps,
                     type ContextMenuRadioGroupProps,
                     type ContextMenuRadioItemProps,
                     type ContextMenuSeparatorProps,
                     type ContextMenuLabelProps
                   } from "@chellaa/react";
Category:          Overlays / Menus & Navigation
Status:            Approved & Implementation Ready
Phase:             Wave 3 — Menu & Drawer Overlays
Priority:          P1 High
Version:           1.0.0
Related:           Popover, Dialog, Button, Select
Governing ADRs:    ADR-007 (Zero-Config Styling), ADR-010 (Overlay Positioning), ADR-011 (Hybrid Styling)
```

---

## 2. Purpose & Problem Statement

### 2.1 Problem Statement
Modern enterprise web applications require accessible, high-performance contextual action menus:
1. **Action Menus vs. Form Selection:** Application developers frequently confuse action menus with form inputs (`Select`, `Combobox`). While `Select` represents a form field with a single/multiple selectable value mapped to a `listbox` role, a `DropdownMenu` is an action and command hub mapped to the WAI-ARIA `menu` role, where items trigger commands, open dialogs, or toggle settings.
2. **Context Menus:** Secondary actions in tables, file trees, canvas editors, and cards require right-click context menus. Native context menus cannot be styled, lack keyboard accessibility across screen readers, and do not integrate with design system tokens.
3. **Collision & Viewport Clamping:** Context menus triggered near screen borders (especially the bottom and right edges) often clip or create artificial scrollbars if not clamped and flipped by a collision-aware positioning engine.
4. **Keyboard Accessibility Gaps:** Standard menu implementations routinely fail WAI-ARIA keyboard navigation standards (Arrow keys, Home, End, typeahead character search, Escape dismissal, and focus restoration to the originating trigger).

### 2.2 Why It Belongs in Chellaa React
As an enterprise UI system, Chellaa React requires production-grade action menus and context menus that adhere to WAI-ARIA APG Menu standards, leverage `@floating-ui/react` collision handling, and use scoped `--cl-*` tokens authored in `@layer cl-components`.

### 2.3 When to Use
- **DropdownMenu:** Header action buttons, "More Options" (`...`) action triggers on cards or table rows, user account dropdowns, workspace switchers.
- **ContextMenu:** Right-click context menus on data table rows, file explorer lists, canvas cards, and interactive visual nodes.

### 2.4 When NOT to Use
- Do NOT use DropdownMenu as a form input to collect data. Use `Select` (SPEC-003) or `Combobox` (SPEC-030).
- Do NOT use DropdownMenu for arbitrary non-menu content (rich forms, date pickers, search dialogs). Use `Popover` (SPEC-023) or `Dialog` (SPEC-004).
- Nested submenus are explicitly out of scope for Wave 3 and must not be simulated with broken heuristics.

---

## 3. Scope & Requirements

### 3.1 Functional Requirements (In Scope)
- **FR-01 (Compound Architecture):** Ergonomic compound API for both `DropdownMenu` and `ContextMenu`:
  - `DropdownMenu`: `Root` (or `DropdownMenu`), `Trigger`, `Content`, `Item`, `CheckboxItem`, `RadioGroup`, `RadioItem`, `Separator`, `Label`.
  - `ContextMenu`: `Root` (or `ContextMenu`), `Trigger`, `Content`, `Item`, `CheckboxItem`, `RadioGroup`, `RadioItem`, `Separator`, `Label`.
- **FR-02 (WAI-ARIA Menu Semantics):**
  - Container element uses `role="menu"`, `aria-orientation="vertical"`.
  - Items use `role="menuitem"`.
  - Checkbox items use `role="menuitemcheckbox"` with `aria-checked="true" | "false"`.
  - Radio items use `role="menuitemradio"` with `aria-checked="true" | "false"` nested in a `role="group"` with accessible label.
  - Separators use `role="separator"`.
  - Labels use `role="presentation"` or `role="none"` as structural section headers.
- **FR-03 (Keyboard Navigation):**
  - `ArrowDown`: Moves focus to the next enabled item (circular wrap).
  - `ArrowUp`: Moves focus to the previous enabled item (circular wrap).
  - `Home`: Moves focus to the first enabled item.
  - `End`: Moves focus to the last enabled item.
  - Character Typeahead: Typing printable characters buffers keystrokes and moves focus to the next matching item. Buffer resets after 500ms of inactivity.
  - `Enter` / `Space`: Activates the focused item. For regular items, triggers `onSelect()` and closes menu. For checkbox/radio items, toggles selection.
  - `Escape`: Closes menu immediately and restores focus to the trigger element.
  - Disabled items (`disabled: true` or `aria-disabled="true"`) are skipped during keyboard navigation and cannot be activated.
- **FR-04 (ContextMenu Activation):**
  - Pointer: Right-click (`contextmenu` event) on `ContextMenuTrigger` prevents native browser context menu and positions menu at pointer coordinates `(clientX, clientY)`.
  - Outside Trigger: Native browser context menu remains untouched outside the trigger region.
  - Keyboard: `ContextMenu` key or `Shift+F10` on the focused `ContextMenuTrigger` activates the menu, positioning it relative to the trigger element's bounding rect.
- **FR-05 (Collision & Viewport Clamping):**
  - Powered by `@floating-ui/react` (`autoUpdate`, `flip`, `shift({ padding: collisionPadding })`, `offset`).
  - ContextMenu uses a virtual reference element `{ getBoundingClientRect() { ... } }` based on client coordinates.
  - Menus never overflow viewport boundaries or generate unwanted page scrollbars.
- **FR-06 (Controlled & Uncontrolled Open State):**
  - Both menus support `open`, `defaultOpen`, and `onOpenChange?: (open: boolean) => void` via `useControllableState`.
- **FR-07 (Portal Rendering & Focus Management):**
  - Content renders into `Portal` (`document.body`).
  - Active item tracking via roving tabindex (`tabIndex={0}` on active item, `-1` on others) or `aria-activedescendant`.
  - When opened via keyboard (Enter/Space/DownArrow), focus automatically lands on the first enabled item.
  - When dismissed via Escape, selection, or outside click, focus restores to the originating trigger element.
- **FR-08 (Zero New Runtime Dependencies):** Reuses existing `@floating-ui/react`, `Portal`, and `Slot` primitives.

### 3.2 Non-Goals
- Nested submenus (Submenu / Menubar): Explicitly deferred to Wave 4+. No nonfunctional placeholder APIs are exported.

---

## 4. Component Anatomy & DOM Structure

### 4.1 DropdownMenu
```text
┌────────────────────────────────────────────────────────┐
│ DropdownMenu.Trigger [ Actions ▾ ] (aria-haspopup="menu")│
└────────────────────────────────────────────────────────┘
                          │ (click / Enter / DownArrow)
                          ▼
┌────────────────────────────────────────────────────────┐
│ DropdownMenu.Content (.cl-dropdown-menu__content, role="menu")
│  ┌──────────────────────────────────────────────────┐  │
│  │ Label: "Account Settings" (role="presentation")  │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ Item: "Profile" (role="menuitem", tabIndex=0)    │  │
│  │ Item: "Billing" (role="menuitem", tabIndex=-1)   │  │
│  │ Separator (role="separator")                     │  │
│  │ CheckboxItem: "Dark Mode" (role="menuitemcheckbox")│ │
│  │ Separator (role="separator")                     │  │
│  │ Item: "Log Out" (role="menuitem", tabIndex=-1)   │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### 4.2 ContextMenu
```text
┌────────────────────────────────────────────────────────┐
│ ContextMenu.Trigger [ Right Click / Shift+F10 Area ]    │
└────────────────────────────────────────────────────────┘
                          │ (contextmenu / Shift+F10)
                          ▼
┌────────────────────────────────────────────────────────┐
│ ContextMenu.Content (.cl-context-menu__content, role="menu")
│ Anchored to virtual pointer position (clientX, clientY)
│ Clamped within viewport bounds via shift() + flip()    │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Item: "Cut" (role="menuitem")                    │  │
│  │ Item: "Copy" (role="menuitem")                   │  │
│  │ Item: "Paste" (role="menuitem", disabled)        │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 5. TypeScript Public API & Definitions

```typescript
export interface DropdownMenuRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  collisionPadding?: number;
  asChild?: boolean;
  children: React.ReactNode;
}

export interface DropdownMenuItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  inset?: boolean;
  onSelect?: () => void;
  closeOnSelect?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

export interface DropdownMenuCheckboxItemProps
  extends Omit<DropdownMenuItemProps, "onSelect"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export interface DropdownMenuRadioGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export interface DropdownMenuRadioItemProps
  extends DropdownMenuItemProps {
  value: string;
}

export interface DropdownMenuSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DropdownMenuLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}
```

(The `ContextMenu*` interfaces share an identical structural signature, with `ContextMenuTriggerProps` extending `React.HTMLAttributes<HTMLDivElement>` and supporting `disabled?: boolean`).

---

## 6. Styling, Design Tokens & Motion

### 6.1 Scoped Classes
- `.cl-dropdown-menu__content`, `.cl-context-menu__content`
- `.cl-dropdown-menu__item`, `.cl-context-menu__item`
- `.cl-dropdown-menu__item[data-highlighted="true"]`
- `.cl-dropdown-menu__item--disabled`
- `.cl-dropdown-menu__separator`, `.cl-context-menu__separator`
- `.cl-dropdown-menu__label`, `.cl-context-menu__label`
- `.cl-dropdown-menu__item-indicator`

### 6.2 Semantic Tokens
- Background: `var(--cl-color-bg-surface)`
- Border: `var(--cl-color-border)`
- Text: `var(--cl-color-text-primary)`
- Text Muted: `var(--cl-color-text-secondary)`
- Highlight Background: `var(--cl-color-primary-subtle)` / `var(--cl-color-bg-muted)`
- Highlight Text: `var(--cl-color-primary-base)` / `var(--cl-color-text-primary)`
- Shadow: `var(--cl-shadow-lg)`
- Radius: `var(--cl-radius-md)`
- Z-Index: `var(--cl-z-index-dropdown, 1000)`

### 6.3 Motion & Transitions
- Keyframe animation: `cl-dropdown-menu-enter` (scale from 0.95 to 1, opacity from 0 to 1 over 150ms `cubic-bezier(0.16, 1, 0.3, 1)`).
- Gate: `opacity: 0` before `[data-positioned="true"]` resolves to prevent visual teleportation.
- Respects `@media (prefers-reduced-motion: reduce)`: duration set to 0.01ms.

---

## 7. Testing & Quality Acceptance Gates

1. **Unit & Interaction Tests (Vitest + RTL + user-event):**
   - Click trigger opens/closes menu.
   - Enter/Space opens menu on trigger.
   - Arrow navigation (Down, Up, Home, End) traverses items and wraps correctly.
   - Disabled items are skipped during navigation.
   - Character typeahead jumps to matching item.
   - Item selection invokes `onSelect` and dismisses menu.
   - Focus returns to trigger upon Escape or selection.
   - Checkbox items toggle `aria-checked`.
   - Radio items update group value and `aria-checked`.
   - ContextMenu activates on right-click at pointer coordinates.
   - ContextMenu activates on `Shift+F10` and `ContextMenu` key.
   - Native context menu preserved outside trigger region.
   - Controlled `open` state functions correctly.
2. **Accessibility Audit:**
   - 0 violations with `axe-core` in open and closed states.
3. **Storybook Stories:**
   - Default, Item Variants, Checkbox Items, Radio Groups, Disabled Items, Controlled, Viewport Collision.
