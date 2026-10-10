# Accordion & Collapse Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications (Tier 4 / Phase 3 Surfaces & Visual Data Display)  
**Specification ID:** SPEC-028  
**Target Package:** `@chellaa/react`  
**Revision:** 1.0.0  
**Priority:** P1 High  
**Governing Standard:** [00-component-specification-standard.md](./00-component-specification-standard.md), [01-api-conventions.md](./01-api-conventions.md), [ADR-007-css-delivery.md](../adr/ADR-007-css-delivery.md), [ADR-011-hybrid-styling-architecture-and-engine-boundary.md](../adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md)  
**Dependencies:** Chellaa Design Tokens (`--cl-*`), `useControllableState` hook, React 18/19  

---

## 1. Identity

```text
Component Name:     Accordion (Compound Architecture: Accordion.Root, Accordion.Item, Accordion.Header, Accordion.Trigger, Accordion.Content, Accordion.Icon)
Specification ID:   SPEC-028
Package Export:     import { Accordion, type AccordionProps, type AccordionItemProps, type AccordionType } from "@chellaa/react";
Category:           Data Display / Disclosure
Status:             Approved & Implementation Ready
Phase:              Phase 3 — Surfaces & Visual Data Display
Priority:           P1 High
Version:            1.0.0
Related Components: Card, Button, Typography
Governing ADRs:     ADR-007 (Zero-Config Styling), ADR-011 (Hybrid Styling Architecture)
```

---

## 2. Purpose & Problem Statement

### 2.1 Problem Statement
Enterprise applications contain extensive FAQ directories, nested filter sidebars, billing history breakdowns, and multi-section property inspectors. Rendering all sections simultaneously forces excessive page scrolling and fragments user focus.

Naive disclosure implementations introduce severe accessibility and styling flaws:
1. Using generic `<div>` tags with click handlers fails WAI-ARIA APG Accordion requirements, omitting native button semantics and keyboard focusability.
2. Missing heading wrappers (e.g. `<h3>` with nested `<button>`) breaks screen reader heading navigation (`H` key).
3. JavaScript-based height calculations trigger layout thrashing and stutter during animation.
4. Rigid monolithic abstractions prevent custom placement of icons, badges, or action buttons inside headers.

The `Accordion` component solves this by providing an accessible, composable disclosure primitive with hardware-accelerated CSS grid height animations, full WAI-ARIA APG keyboard navigation, single and multi-expansion modes, and seamless token integration.

### 2.2 Why It Belongs in Chellaa React
`Accordion` is a foundational enterprise surface primitive needed across dashboards, documentation hubs, and complex sidebars to manage vertical density with tactile elegance.

### 2.3 When to Use
- Displaying Frequently Asked Questions (FAQ) sections.
- Managing collapsible sections in complex settings or form panels.
- Condensing multi-category sidebar filters.

### 2.4 When NOT to Use
- **Do NOT use Accordion if users need to compare all sections simultaneously.**
- **Do NOT use Accordion for simple single-panel disclosures.** Use a lightweight `<details>` or standalone `<Collapse>`.
- **Do NOT use Accordion for primary horizontal navigation.** Use [`Tabs`](./27-tabs.md).

---

## 3. Scope & Requirements

### 3.1 Functional Requirements (In Scope)
- **FR-01 (Compound Structure):** `Accordion.Root`, `Accordion.Item`, `Accordion.Header`, `Accordion.Trigger`, `Accordion.Content`, `Accordion.Icon`.
- **FR-02 (Expansion Modes):**
  - `type="single"`: Only one item can be expanded at a time (`value?: string`). Optional `collapsible?: boolean` allows collapsing the active item.
  - `type="multiple"`: Any number of items can be expanded simultaneously (`value?: string[]`).
- **FR-03 (WAI-ARIA APG Conformance):**
  - Triggers rendered as native `<button>` wrapped in semantic `<h{N}>` heading elements.
  - `aria-expanded={isOpen}`, `aria-controls="cl-accordion-panel-{id}"`.
  - Content has `role="region"` and `aria-labelledby="cl-accordion-trigger-{id}"`.
- **FR-04 (Keyboard Navigation):** Arrow key navigation between triggers (`ArrowDown`/`ArrowUp`), `Home` (first trigger), `End` (last trigger).
- **FR-05 (Fluid CSS Grid Animation):** Uses pure modern CSS `grid-template-rows: 0fr -> 1fr` for 60fps height transitions without JavaScript DOM measurement.
- **FR-06 (Visual Variants):**
  - `outline`: Bordered continuous container with divider lines (default).
  - `separated`: Individual card-like items with vertical gaps.
  - `flush`: Borderless flush container for seamless sidebar embedding.
- **FR-07 (Controlled & Uncontrolled):** Controlled via `value` + `onValueChange`; uncontrolled via `defaultValue`.
- **FR-08 (Chevron Icon Slot):** `<Accordion.Icon />` with automatic 180° rotation on expansion.

### 3.2 Non-Functional Requirements
- **NFR-01 (Zero Layout Thrashing):** Zero runtime `offsetHeight` / `getBoundingClientRect()` polling.
- **NFR-02 (RSC Compatibility):** Supports React Server Components when unexpanded panels are statically rendered.

---

## 4. Non-Goals
- Horizontal sliding accordions (vertical disclosure exclusively).

---

## 5. Feature Summary

| Capability | Description | Architectural Detail |
| :--- | :--- | :--- |
| **Single & Multi-Expand** | Exclusive or independent items | `type="single" \| "multiple"` |
| **APG Heading Semantics** | Native button in semantic heading | `<h3 className="cl-accordion__header"><button ...>` |
| **Zero-JS Animation** | 60fps CSS grid row transition | `grid-template-rows: 0fr -> 1fr` |
| **Keyboard APG Roving** | Arrow keys navigate headers | APG Accordion keymap |
| **3 Visual Styles** | `outline`, `separated`, `flush` | Tokenized border and background styles |

---

## 6. Anatomy

```text
<Accordion.Root type="single" collapsible>
  <Accordion.Item value="item-1" className="cl-accordion__item">
    <Accordion.Header className="cl-accordion__header">
      <Accordion.Trigger className="cl-accordion__trigger">
        <span>Section Title</span>
        <Accordion.Icon className="cl-accordion__icon" />
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="cl-accordion__content">
      <div className="cl-accordion__inner">
        Panel body content goes here...
      </div>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

---

## 7. Public API Specification

### 7.1 Props Interface
```typescript
export type AccordionType = "single" | "multiple";
export type AccordionVariant = "outline" | "separated" | "flush";

export interface AccordionSingleProps {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
}

export interface AccordionMultipleProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type AccordionRootProps = (AccordionSingleProps | AccordionMultipleProps) & {
  variant?: AccordionVariant;
  isDisabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  isDisabled?: boolean;
  children: React.ReactNode;
}

export interface AccordionHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
```

### 7.2 Tabular Props Dictionary

| Component | Prop | Type | Default | Description | A11y Impact |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Accordion.Root` | `type` | `"single" \| "multiple"` | `"single"` | Expansion behavior mode | None |
| `Accordion.Root` | `collapsible` | `boolean` | `false` | Allows closing active item in single mode | None |
| `Accordion.Root` | `variant` | `AccordionVariant` | `"outline"` | Visual styling treatment | None |
| `Accordion.Item` | `value` | `string` | — | Unique key for the item | Associated with panel |
| `Accordion.Item` | `isDisabled` | `boolean` | `false` | Suppresses interaction | Disables native button |
| `Accordion.Header`| `level` | `2 \| 3 \| 4 \| 5 \| 6` | `3` | Semantic HTML heading tag (`<h2>`-`<h6>`)| Screen reader heading nav |

---

## 8. TypeScript Types

```typescript
// packages/react/src/components/Accordion/Accordion.types.ts

import * as React from "react";

export type AccordionType = "single" | "multiple";
export type AccordionVariant = "outline" | "separated" | "flush";

export interface AccordionContextValue {
  type: AccordionType;
  variant: AccordionVariant;
  collapsible?: boolean;
  expandedValues: string[];
  toggleItem: (value: string) => void;
}

export interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  isDisabled: boolean;
  triggerId: string;
  panelId: string;
}
```

---

## 9. Variants & Visual States

- **`outline` (Default):** Unified rounded container (`var(--cl-radius-lg)`), 1px border, items separated by divider borders.
- **`separated`:** Items rendered as independent cards with `var(--cl-space-2)` vertical gap.
- **`flush`:** Zero outer border; only inner dividing lines.

---

## 10. Sizes & Metrics

- Header Padding: `16px 20px` (`var(--cl-space-4) var(--cl-space-5)`).
- Content Inner Padding: `0 20px 16px 20px`.
- Chevron Icon: `16px × 16px`, smooth 180° rotation on open.

---

## 11. States & Pseudo-Classes

- Focus-Visible on Trigger: `outline: 2px solid var(--cl-ring-color); outline-offset: -2px`.
- Disabled: `opacity: 0.5; cursor: not-allowed`.
- Open: `data-state="open"` on Item, Trigger, and Content.

---

## 12. Behavioral Specification

- Clicking an item's trigger checks current mode:
  - In `single`: if already open and `collapsible=true`, closes it; otherwise opens it and closes any other open item.
  - In `multiple`: toggles item in/out of the array.

---

## 13. Controlled / Uncontrolled State Behavior

Managed via [`useControllableState`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/hooks/useControllableState.ts). In `single` mode, state is `string`; in `multiple` mode, state is `string[]`.

---

## 14. Events Contract

- `onValueChange`: Dispatched with updated value or string array.

---

## 15. Composition & Slot Delegation

- Supports `asChild?: boolean` on `Accordion.Trigger`.

---

## 16. Ref Contract

- Forwarded refs bind to underlying DOM elements (`HTMLButtonElement` on Trigger; `HTMLDivElement` on Item and Content).

---

## 17. Accessibility Specification (WCAG 2.2 AA & APG)

1. **Heading Tag Wrap:** Trigger must be nested inside `<h2|h3|h4|h5|h6>` element.
2. **Button Semantics:** Trigger is native HTML `<button type="button">`.
3. **ARIA States:** `aria-expanded={isOpen}`, `aria-controls="cl-accordion-panel-{id}"`.
4. **Region Role:** Content panel has `role="region"` and `aria-labelledby="cl-accordion-trigger-{id}"`.

---

## 18. Keyboard Interaction Keymap

| Key | Context | Action |
| :--- | :--- | :--- |
| `Enter` / `Space` | Focus on Trigger | Toggles expansion of the accordion item |
| `ArrowDown` | Focus on Trigger | Moves focus to next enabled accordion trigger |
| `ArrowUp` | Focus on Trigger | Moves focus to previous enabled accordion trigger |
| `Home` | Focus on Trigger | Moves focus to first enabled trigger |
| `End` | Focus on Trigger | Moves focus to last enabled trigger |

---

## 19. Styling Contract (Scoped Static CSS & Modern Grid Animation)

```css
@layer cl-components {
  .cl-accordion {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .cl-accordion--outline {
    border: 1px solid var(--cl-color-border-subtle);
    border-radius: var(--cl-radius-lg, 8px);
    overflow: hidden;
  }

  .cl-accordion__item {
    border-bottom: 1px solid var(--cl-color-border-subtle);
  }
  .cl-accordion--outline .cl-accordion__item:last-child {
    border-bottom: none;
  }

  .cl-accordion__header {
    margin: 0;
    display: flex;
  }

  .cl-accordion__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--cl-space-4, 16px) var(--cl-space-5, 20px);
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: var(--cl-font-family-sans);
    font-size: var(--cl-font-size-base, 16px);
    font-weight: var(--cl-font-weight-medium, 500);
    color: var(--cl-color-text-primary);
    text-align: left;
    outline: none;
    transition: background-color var(--cl-duration-fast, 150ms) ease;
  }

  .cl-accordion__trigger:hover:not([disabled]) {
    background-color: var(--cl-color-bg-subtle, rgba(0, 0, 0, 0.02));
  }

  .cl-accordion__trigger:focus-visible {
    outline: 2px solid var(--cl-ring-color);
    outline-offset: -2px;
  }

  .cl-accordion__icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    transition: transform var(--cl-duration-normal, 200ms) var(--cl-easing-standard);
  }

  .cl-accordion__trigger[aria-expanded="true"] .cl-accordion__icon {
    transform: rotate(180deg);
  }

  /* Zero-JS Modern CSS Grid Animation */
  .cl-accordion__content {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--cl-duration-normal, 200ms) var(--cl-easing-standard);
  }

  .cl-accordion__content[data-state="open"] {
    grid-template-rows: 1fr;
  }

  .cl-accordion__inner {
    overflow: hidden;
    padding: 0 var(--cl-space-5, 20px) var(--cl-space-4, 16px) var(--cl-space-5, 20px);
    color: var(--cl-color-text-secondary);
    font-size: var(--cl-font-size-sm, 14px);
    line-height: var(--cl-line-height-normal, 1.5);
  }
}
```

---

## 20. Theme Contract

Adapts automatically using `--cl-color-border-subtle`, `--cl-color-text-primary`, `--cl-color-text-secondary`, and `--cl-color-bg-subtle`.

---

## 21. Responsive Behavior

Full width stretch; padding scales down to 12px on small mobile screens.

---

## 22. Motion & Animations

Expansion grid transition: 200ms. Transition resets to 0.01ms under `prefers-reduced-motion: reduce`.

---

## 23. Testing Specification

| Test Category | Scenario | Expected Outcome |
| :--- | :--- | :--- |
| **1. Click Expansion** | Click Trigger 1 | Panel 1 expands (`data-state="open"`, `aria-expanded="true"`) |
| **2. Single Mode Closing** | Click Trigger 2 in single mode | Panel 2 opens, Panel 1 closes |
| **3. Collapsible Mode** | Click open Trigger 1 with `collapsible=true` | Panel 1 closes |
| **4. Multi-Mode Expansion**| Click Trigger 1 then Trigger 2 in multi mode | Both panels remain open |
| **5. Keyboard Navigation** | Focus Trigger 1, press `ArrowDown` | Focus moves to Trigger 2 |
| **6. Accessibility** | Run `axe(container)` | Zero accessibility violations |

---

## 24. Storybook Contract

Stories in `packages/react/src/components/Accordion/Accordion.stories.tsx`:
1. `Default`: Single expansion FAQ layout.
2. `Multiple`: Multi-expansion filter accordion.
3. `Variants`: `outline`, `separated`, `flush`.
4. `DisabledItem`: Accordion with disabled item.

---

## 25. Documentation Reqs

API props table, WAI-ARIA APG heading structure explanation, and code examples.

---

## 26. Edge Cases & Hazards

1. **Dynamic Item Mounts:** Keyboard roving loop dynamically interrogates mounted items without hardcoded index caching.

---

## 27. Reference Comparison

| Feature | Chellaa React | MUI Accordion | Ant Design Collapse | Radix Accordion |
| :--- | :--- | :--- | :--- | :--- |
| **Animation Engine** | CSS Grid (`grid-template-rows`) | JS height transition | JS height | CSS custom property |
| **Semantics** | Semantic Heading + Button | AccordionSummary button | Monolithic | Compound |
| **Styling** | Scoped static CSS | Emotion | Less | Headless |

---

## 28. Deferred Features

- Horizontal accordion expansion (Phase 6).

---

## 29. Acceptance Criteria

- [ ] Compound structure implemented (`Accordion.Root`, `Accordion.Item`, etc.).
- [ ] Single and multiple expansion modes supported.
- [ ] Conforms to WAI-ARIA APG Accordion pattern with heading wrappers.
- [ ] Hardware-accelerated CSS grid row transition.
- [ ] Zero axe accessibility violations.
- [ ] 100% test pass rate in Vitest.

---

## 30. Implementation Plan, Governance & Traceability

### 30.1 Target Files
```text
packages/react/src/components/Accordion/
├── Accordion.tsx
├── Accordion.types.ts
├── Accordion.styles.css
├── Accordion.test.tsx
├── Accordion.stories.tsx
└── index.ts
```

### 30.2 Traceability Matrix

| Requirement | Source Rule / ADR | Workflow Stage | Acceptance Criterion |
| :--- | :--- | :--- | :--- |
| APG Accordion Semantics | Document 04 (A11y) | Workflow F | Heading wrap, aria-expanded, Arrow navigation |
| Dual State Management | Document 02 (React Standards)| Workflow F | useControllableState single/multiple |
| Zero-JS CSS Animation | ADR-002, ADR-011 | Workflow F | Modern CSS grid-template-rows transition |
