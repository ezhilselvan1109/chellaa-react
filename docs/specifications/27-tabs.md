# Tabs Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications (Tier 6 / Phase 5 Navigation & Rich Controls)  
**Specification ID:** SPEC-027  
**Target Package:** `@chellaa/react`  
**Revision:** 1.0.0  
**Priority:** P1 High  
**Governing Standard:** [00-component-specification-standard.md](./00-component-specification-standard.md), [01-api-conventions.md](./01-api-conventions.md), [ADR-007-css-delivery.md](../adr/ADR-007-css-delivery.md), [ADR-011-hybrid-styling-architecture-and-engine-boundary.md](../adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md)  
**Dependencies:** Chellaa Design Tokens (`--cl-*`), `useControllableState` hook, React 18/19  

---

## 1. Identity

```text
Component Name:     Tabs (Compound Architecture: Tabs.Root, Tabs.List, Tabs.Trigger, Tabs.Content, Tabs.Indicator)
Specification ID:   SPEC-027
Package Export:     import { Tabs, type TabsProps, type TabsTriggerProps, type TabsContentProps, type TabsVariant, type TabsOrientation } from "@chellaa/react";
Category:           Navigation
Status:             Approved & Implementation Ready
Phase:              Phase 5 — Navigation & Rich Controls
Priority:           P1 High
Version:            1.0.0
Related Components: Segmented, ButtonGroup, Card
Governing ADRs:     ADR-007 (Zero-Config Styling), ADR-011 (Hybrid Styling Architecture)
```

---

## 2. Purpose & Problem Statement

### 2.1 Problem Statement
Enterprise applications contain multi-faceted data sets (e.g. Account Settings containing Profile, Security, Billing, and Notifications). Rendering all sections simultaneously overburdens the viewport and overwhelms cognitive focus.

Ad-hoc tab implementations introduce severe accessibility and engineering defects:
1. Using generic `<div>` elements with click handlers fails WAI-ARIA APG Tabs requirements (`role="tablist"`, `role="tab"`, `role="tabpanel"`).
2. Missing roving tabindex forces keyboard users to Tab through every tab trigger sequentially rather than using Arrow keys.
3. Lack of proper ARIA associations (`aria-controls`, `aria-labelledby`, `aria-selected`) leaves screen reader users disoriented.
4. Rigid monolithic abstractions prevent custom placement of the tab list relative to headers, toolbars, or card borders.

The `Tabs` component solves this by providing a compound, token-governed tabbed interface with complete WAI-ARIA APG keyboard physics, horizontal and vertical orientations, fluid animated indicator tracking, and seamless controlled/uncontrolled state synchronization.

### 2.2 Why It Belongs in Chellaa React
As an enterprise design system, Chellaa React requires an accessible, high-performance tabbed navigation primitive that works across cards, dialogs, full page views, and sidebars while maintaining zero-runtime styling overhead.

### 2.3 When to Use
- Partitioning dense content into related, mutually exclusive views within the same context.
- Switching between sub-views in dashboards or settings pages.
- Navigating code snippets in documentation portals (e.g. `npm` vs `pnpm` vs `yarn`).

### 2.4 When NOT to Use
- **Do NOT use Tabs for sequential step-by-step forms.** Use `Stepper` / `Steps`.
- **Do NOT use Tabs for major page-level routing with URL changes without sync.** If each tab is a separate route, integrate `Tabs.Trigger asChild` with router links.
- **Do NOT use Tabs if users need to compare content side-by-side.**

---

## 3. Scope & Requirements

### 3.1 Functional Requirements (In Scope)
- **FR-01 (Compound Architecture):** Composable compound API: `Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`, `Tabs.Indicator`.
- **FR-02 (WAI-ARIA APG Compliance):** Full conformance with the WAI-ARIA APG Tabs pattern:
  - `Tabs.List` has `role="tablist"` and `aria-orientation`.
  - `Tabs.Trigger` has `role="tab"`, `aria-selected`, `aria-controls`, and roving `tabIndex` (0 on active tab, -1 on inactive tabs).
  - `Tabs.Content` has `role="tabpanel"`, `aria-labelledby`, and `tabIndex={0}`.
- **FR-03 (Keyboard Navigation):** Arrow key navigation (`ArrowLeft`/`ArrowRight` in horizontal mode; `ArrowUp`/`ArrowDown` in vertical mode), `Home` (first tab), and `End` (last tab).
- **FR-04 (Activation Modes):** Supports `activationMode?: "automatic" | "manual"` (automatic activates on arrow focus; manual requires `Enter` or `Space`).
- **FR-05 (Dual Orientations):** `orientation?: "horizontal" | "vertical"`.
- **FR-06 (Visual Variants):**
  - `line`: Bottom active indicator line (default).
  - `enclosed`: Bordered card folder tabs.
  - `pill`: Segmented background pill.
  - `unstyled`: Pure headless tabs for bespoke layouts.
- **FR-07 (Sizes):** `sm`, `md`, `lg`.
- **FR-08 (Controlled & Uncontrolled):** Controlled via `value` + `onValueChange`; uncontrolled via `defaultValue`.
- **FR-09 (Slot Composition):** Supports `asChild?: boolean` on `Tabs.Trigger` to compose with Next.js/Router `<Link>`.

### 3.2 Non-Functional Requirements
- **NFR-01 (Performance):** Zero re-renders of inactive tab panels; optional lazy-loading support (`isLazy?: boolean`).
- **NFR-02 (CSS Scoping):** Authored in static CSS within `@layer cl-components`.

---

## 4. Non-Goals
- Multi-tier nested cascading sub-tabs within the same tab bar.

---

## 5. Feature Summary

| Capability | Description | Architectural Detail |
| :--- | :--- | :--- |
| **WAI-ARIA APG Tabs** | Strict accessible tab semantics | `role="tablist"`, `role="tab"`, `role="tabpanel"` |
| **Roving Tabindex** | Arrow keys navigate between tabs | Tabindex 0 on active tab, -1 on others |
| **Active Indicator** | Smooth CSS active track | CSS transition or `<Tabs.Indicator />` |
| **Horizontal / Vertical**| Supports 2 spatial directions | `orientation="horizontal" \| "vertical"` |
| **Lazy Panel Rendering**| Unmounts hidden tab panels | `isLazy?: boolean` option |

---

## 6. Anatomy

```text
<Tabs.Root value="account" onValueChange={...}>
  <Tabs.List className="cl-tabs__list" aria-orientation="horizontal">
    <Tabs.Trigger value="account" className="cl-tabs__trigger">Account</Tabs.Trigger>
    <Tabs.Trigger value="security" className="cl-tabs__trigger">Security</Tabs.Trigger>
    <Tabs.Trigger value="billing" className="cl-tabs__trigger" isDisabled>Billing</Tabs.Trigger>
    <Tabs.Indicator className="cl-tabs__indicator" />
  </Tabs.List>
  <Tabs.Content value="account" className="cl-tabs__content">Account Settings Form</Tabs.Content>
  <Tabs.Content value="security" className="cl-tabs__content">Password & 2FA Form</Tabs.Content>
  <Tabs.Content value="billing" className="cl-tabs__content">Invoices & Cards</Tabs.Content>
</Tabs.Root>
```

---

## 7. Public API Specification

### 7.1 Props Interface
```typescript
export type TabsOrientation = "horizontal" | "vertical";
export type TabsVariant = "line" | "enclosed" | "pill" | "unstyled";
export type TabsSize = "sm" | "md" | "lg";
export type TabsActivationMode = "automatic" | "manual";

export interface TabsRootProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
  variant?: TabsVariant;
  size?: TabsSize;
  activationMode?: TabsActivationMode;
  isLazy?: boolean;
  children: React.ReactNode;
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  "aria-label"?: string;
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  isDisabled?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}
```

### 7.2 Tabular Props Dictionary

| Component | Prop | Type | Default | Description | A11y Impact |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Tabs.Root` | `value` | `string` | `undefined` | Controlled active tab value | Sets `aria-selected` |
| `Tabs.Root` | `defaultValue` | `string` | `undefined` | Uncontrolled initial tab value | None |
| `Tabs.Root` | `onValueChange`| `(val: string) => void` | `undefined` | Callback fired on tab change | None |
| `Tabs.Root` | `orientation` | `TabsOrientation`| `"horizontal"` | Layout direction | Determines Arrow keys |
| `Tabs.Root` | `variant` | `TabsVariant` | `"line"` | Visual tab styling | None |
| `Tabs.Root` | `size` | `TabsSize` | `"md"` | Sizing scale (`sm`, `md`, `lg`)| None |
| `Tabs.Trigger`| `value` | `string` | — | Unique identifier for the tab | Links to `Tabs.Content` |
| `Tabs.Trigger`| `isDisabled` | `boolean` | `false` | Disables tab selection | Skips in arrow sequence |
| `Tabs.Content`| `value` | `string` | — | Matching tab identifier | Sets `role="tabpanel"` |

---

## 8. TypeScript Types

```typescript
// packages/react/src/components/Tabs/Tabs.types.ts

import * as React from "react";

export type TabsOrientation = "horizontal" | "vertical";
export type TabsVariant = "line" | "enclosed" | "pill" | "unstyled";
export type TabsSize = "sm" | "md" | "lg";
export type TabsActivationMode = "automatic" | "manual";

export interface TabsContextValue {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  orientation: TabsOrientation;
  variant: TabsVariant;
  size: TabsSize;
  activationMode: TabsActivationMode;
  isLazy: boolean;
  baseId: string;
}

export interface TabsProps extends TabsRootProps {}
```

---

## 9. Variants & Visual States

- **`line` (Default):** Bottom border track with primary colored active indicator line (`--cl-color-primary-solid`).
- **`enclosed`:** Inactive tabs have subtle background; active tab has surface background with top/side borders.
- **`pill`:** Pill-shaped background container; active tab has highlighted pill background (`--cl-color-primary-subtle` or solid).
- **`unstyled`:** Zero default CSS properties; completely custom styling.

---

## 10. Sizes & Metrics

| Size | Trigger Height | Font Size | Padding |
| :--- | :--- | :--- | :--- |
| `sm` | 32px | 13px | `4px 12px` |
| `md` | 40px | 14px | `8px 16px` |
| `lg` | 48px | 16px | `10px 20px` |

---

## 11. States & Pseudo-Classes

- Active Tab (`data-state="active"`): `aria-selected="true"`, font-weight 600, active indicator visible.
- Focus-Visible: High-contrast focus ring (`outline: 2px solid var(--cl-ring-color)`).
- Disabled: `opacity: 0.5`, `cursor: not-allowed`, skipped during arrow navigation.

---

## 12. Behavioral State Machine

- Arrows move focus through enabled triggers.
- In `automatic` mode, moving focus updates active tab immediately.
- In `manual` mode, moving focus keeps active tab until `Enter` or `Space` is pressed.

---

## 13. Controlled / Uncontrolled State Behavior

Managed via [`useControllableState`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/hooks/useControllableState.ts). If `value` is omitted, defaults to `defaultValue` or the first child trigger's `value`.

---

## 14. Events Contract

- `onValueChange(value: string)`: Fired whenever the active tab changes.

---

## 15. Composition & Slot Delegation

- `Tabs.Trigger` supports `asChild?: boolean` for routing integration (`<Tabs.Trigger asChild value="/home"><Link to="/home">Home</Link></Tabs.Trigger>`).

---

## 16. Ref Contract

- Forwarded refs bind to underlying DOM elements (`HTMLDivElement` on Root/List/Content; `HTMLButtonElement` on Trigger).

---

## 17. Accessibility Specification (WCAG 2.2 AA & APG)

1. **APG Tabs Roles:**
   - List: `role="tablist"`
   - Trigger: `role="tab"`
   - Content: `role="tabpanel"`
2. **Deterministic ID Association:**
   - `Tabs.Trigger` has `id="cl-tab-{baseId}-{value}"` and `aria-controls="cl-tabpanel-{baseId}-{value}"`.
   - `Tabs.Content` has `id="cl-tabpanel-{baseId}-{value}"` and `aria-labelledby="cl-tab-{baseId}-{value}"`.
3. **Keyboard Focusable Panel:** `Tabs.Content` includes `tabIndex={0}` to allow keyboard users to tab directly into the active panel.

---

## 18. Keyboard Interaction Keymap

| Key | Context | Action |
| :--- | :--- | :--- |
| `ArrowRight` / `ArrowDown` | Focus on Tab Trigger | Moves focus to next enabled tab (loops to first) |
| `ArrowLeft` / `ArrowUp` | Focus on Tab Trigger | Moves focus to previous enabled tab (loops to last)|
| `Home` | Focus on Tab Trigger | Moves focus to first enabled tab |
| `End` | Focus on Tab Trigger | Moves focus to last enabled tab |
| `Space` / `Enter` | Focus on Tab Trigger | Activates the tab in `manual` mode |
| `Tab` | Focus on Tab Trigger | Moves focus directly into the active `Tab.Content` panel |

---

## 19. Styling Contract (Scoped Static CSS & `--cl-*` Tokens)

```css
@layer cl-components {
  .cl-tabs {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .cl-tabs--vertical {
    flex-direction: row;
  }

  .cl-tabs__list {
    display: flex;
    position: relative;
    border-bottom: 1px solid var(--cl-color-border-subtle);
    gap: var(--cl-space-2, 8px);
  }

  .cl-tabs--vertical .cl-tabs__list {
    flex-direction: column;
    border-bottom: none;
    border-right: 1px solid var(--cl-color-border-subtle);
  }

  .cl-tabs__trigger {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: var(--cl-font-family-sans);
    font-size: var(--cl-font-size-sm, 14px);
    font-weight: var(--cl-font-weight-medium, 500);
    color: var(--cl-color-text-secondary);
    padding: var(--cl-space-2, 8px) var(--cl-space-4, 16px);
    outline: none;
    transition: color var(--cl-duration-fast, 150ms) ease;
  }

  .cl-tabs__trigger:hover:not([disabled]) {
    color: var(--cl-color-text-primary);
  }

  .cl-tabs__trigger[data-state="active"] {
    color: var(--cl-color-primary-solid);
    font-weight: var(--cl-font-weight-semibold, 600);
  }

  .cl-tabs__trigger:focus-visible {
    outline: 2px solid var(--cl-ring-color);
    outline-offset: -2px;
  }

  /* Line Variant Indicator */
  .cl-tabs--line .cl-tabs__trigger[data-state="active"]::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--cl-color-primary-solid);
  }

  .cl-tabs__content {
    padding: var(--cl-space-4, 16px) 0;
    outline: none;
  }

  .cl-tabs__content:focus-visible {
    outline: 2px solid var(--cl-ring-color);
    outline-offset: 2px;
  }

  .cl-tabs__content[data-state="inactive"] {
    display: none;
  }
}
```

---

## 20. Theme Contract

Adapts automatically between light and dark modes using `--cl-color-primary-solid`, `--cl-color-text-primary`, `--cl-color-text-secondary`, and `--cl-color-border-subtle`.

---

## 21. Responsive Behavior

- Tab list allows touch horizontal scrolling (`overflow-x: auto; scrollbar-width: none;`).

---

## 22. Motion & Animations

Indicator transition: 200ms (`--cl-duration-normal`). Zero duration under `prefers-reduced-motion`.

---

## 23. Testing Specification

| Test Category | Scenario | Expected Outcome |
| :--- | :--- | :--- |
| **1. Initial Rendering** | Render 3 tabs; first active | Panel 1 is visible; panels 2 and 3 hidden |
| **2. Click Tab** | Click Tab 2 | Tab 2 becomes active; Panel 2 displays; `onValueChange` fires |
| **3. Keyboard Navigation** | Focus Tab 1, press `ArrowRight` | Focus moves to Tab 2; in automatic mode activates Tab 2 |
| **4. Disabled Tab Skip** | Press `ArrowRight` towards disabled Tab 2 | Focus skips directly to Tab 3 |
| **5. Home / End** | Press `End` on Tab 1 | Focus moves to last enabled tab |
| **6. Accessibility** | Run `axe(container)` | Zero accessibility violations |

---

## 24. Storybook Contract

Stories in `packages/react/src/components/Tabs/Tabs.stories.tsx`:
1. `Default`: Basic 3-tab layout.
2. `AllVariants`: `line`, `enclosed`, `pill`.
3. `Vertical`: Vertical sidebar tabs.
4. `ManualActivation`: Tabs requiring `Enter` to switch.
5. `WithDisabledTab`: Tab bar with disabled item.

---

## 25. Documentation Reqs

API dictionary, WAI-ARIA APG keyboard guide, and Next.js / React Router link integration examples.

---

## 26. Edge Cases & Hazards

1. **Dynamic Tab Removal:** If active tab is removed from array, active state gracefully falls back to adjacent tab.
2. **Zero Enabled Tabs:** Handles gracefully without crashing keyboard listener.

---

## 27. Reference Comparison

| Feature | Chellaa React | MUI Tabs | Ant Design Tabs | Radix Tabs |
| :--- | :--- | :--- | :--- | :--- |
| **Architecture** | Compound components | Monolithic wrapper | Wrapped component | Compound |
| **Keyboard Physics** | WAI-ARIA APG (Automatic & Manual) | Built-in | Basic | Full APG |
| **Styling Engine** | Scoped static CSS | Emotion | Less | Headless |

---

## 28. Deferred Features

- Editable tabs with "+" add button and "x" close buttons (Phase 6).

---

## 29. Acceptance Criteria

- [ ] Compound structure implemented (`Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`).
- [ ] Conforms to WAI-ARIA APG Tabs pattern with roving tabindex.
- [ ] Full keyboard navigation (`ArrowLeft`/`ArrowRight`, `Home`, `End`).
- [ ] Controlled and uncontrolled state support via `useControllableState`.
- [ ] Zero axe accessibility violations.
- [ ] 100% test pass rate in Vitest.

---

## 30. Implementation Plan, Governance & Traceability

### 30.1 Target Files
```text
packages/react/src/components/Tabs/
├── Tabs.tsx
├── Tabs.types.ts
├── Tabs.styles.css
├── Tabs.test.tsx
├── Tabs.stories.tsx
└── index.ts
```

### 30.2 Traceability Matrix

| Requirement | Source Rule / ADR | Workflow Stage | Acceptance Criterion |
| :--- | :--- | :--- | :--- |
| WAI-ARIA APG Tabs | Document 04 (A11y) | Workflow F | Roving tabindex & Arrow navigation |
| State Management | Document 02 (React Standards)| Workflow F | useControllableState dual mode |
| Scoped CSS | ADR-007, ADR-011 | Workflow F | Authored in `@layer cl-components` |
