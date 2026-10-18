# Combobox & Autocomplete Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications (Tier 7 / Phase 6 Complex Enterprise Organisms)  
**Specification ID:** SPEC-030  
**Target Package:** `@chellaa/react`  
**Revision:** 1.0.0  
**Priority:** P2 Medium  
**Governing Standard:** [00-component-specification-standard.md](./00-component-specification-standard.md), [01-api-conventions.md](./01-api-conventions.md), [ADR-010-overlay-positioning.md](../adr/ADR-010-overlay-positioning.md), [ADR-011-hybrid-styling-architecture-and-engine-boundary.md](../adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md)  
**Dependencies:** `@floating-ui/react` (runtime positioning per ADR-010), `Portal` primitive, `useControllableState` hook  

---

## 1. Identity

```text
Component Name:     Combobox (Canonical) / Autocomplete (Alias) (Compound Architecture: Combobox.Root, Combobox.Input, Combobox.Trigger, Combobox.Portal, Combobox.Content, Combobox.Item, Combobox.Group, Combobox.Empty)
Specification ID:   SPEC-030
Package Export:     import { Combobox, Autocomplete, type ComboboxProps, type ComboboxItemProps } from "@chellaa/react";
Category:           Forms / Data Entry
Status:             Approved & Implementation Ready
Phase:              Phase 6 — Complex Enterprise Organisms
Priority:           P2 Medium
Version:            1.0.0
Related Components: Select, Input, FormField, Badge
Governing ADRs:     ADR-007 (Zero-Config Styling), ADR-010 (Overlay Positioning), ADR-011 (Hybrid Styling)
```

---

## 2. Purpose & Problem Statement

### 2.1 Problem Statement
When options in a selection list exceed 15–20 items (e.g. countries, timezones, enterprise user directories, stock tickers), standard non-filterable `<select>` elements and [`Select`](./03-select.md) dropdowns become painfully slow to navigate.

Manual auto-complete implementations suffer from severe defects:
1. Omitting `aria-activedescendant` breaks screen reader navigation through list items while focus stays on the text input.
2. Inconsistent type-ahead or debounce logic causes race conditions during asynchronous search queries.
3. Lack of proper viewport boundary flipping leads to dropdowns being clipped off-screen.
4. Ad-hoc multi-select implementations fail to manage chip tags cleanly within the input container.

The `Combobox` (Autocomplete) component solves this by providing a compound, accessible combo box primitive pairing a native text input with a floating listbox overlay, supporting local/remote search filtering, keyboard active-descendant physics, single and multi-selection with tags, and `@floating-ui/react` positioning.

### 2.2 Why It Belongs in Chellaa React
As an enterprise UI system, Chellaa React requires an industrial-strength searchable selection control that handles large data sets, integrates seamlessly with `<FormField>`, and maintains 100% WAI-ARIA APG Combobox compliance.

### 2.3 When to Use
- Selecting from large or open-ended lists (> 20 options).
- Asynchronous remote search-as-you-type inputs (e.g. searching users by email).
- Free-solo inputs allowing custom text input alongside suggested options.
- Multi-tag selection (tagging records).

### 2.4 When NOT to Use
- **Do NOT use Combobox for small fixed lists (2–7 options).** Use `RadioGroup` or standard [`Select`](./03-select.md).
- **Do NOT use Combobox as a standard navigation search bar.** Use `<Input>` with search icon.

---

## 3. Scope & Requirements

### 3.1 Functional Requirements (In Scope)
- **FR-01 (Compound Structure):** `Combobox.Root`, `Combobox.Input`, `Combobox.Trigger`, `Combobox.Portal`, `Combobox.Content`, `Combobox.Item`, `Combobox.Group`, `Combobox.Empty`.
- **FR-02 (WAI-ARIA APG Combobox):** Full compliance with APG 1.2 Combobox:
  - Input has `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls`, and `aria-activedescendant`.
  - Popup has `role="listbox"`, items have `role="option"` and `aria-selected`.
- **FR-03 (Keyboard Active-Descendant):** Focus remains on the `<input>` element while `ArrowDown` and `ArrowUp` cycle the virtual active descendant. Pressing `Enter` commits the selection; `Escape` closes the listbox.
- **FR-04 (Anchored Positioning):** Positioned via `@floating-ui/react` with auto-flip and viewport collision prevention.
- **FR-05 (Single & Multi-Select):** Single item selection mode and multi-selection mode with dismissible chip tags.
- **FR-06 (Filtering Modes):** Local client-side fuzzy filtering and asynchronous remote search with loading indicator (`isLoading?: boolean`).
- **FR-07 (FormField Cascade):** Consumes `useFormField()` for automatic `id`, `name`, `disabled`, and `aria-invalid` propagation.

### 3.2 Non-Functional Requirements
- **NFR-01 (Zero Layout Thrashing):** Virtual keyboard support on mobile with dynamic viewport height management.

---

## 4. Non-Goals
- Full virtualized lists for 100,000+ records (delegated to headless virtualizer integration).

---

## 5. Feature Summary

| Capability | Description | Architectural Detail |
| :--- | :--- | :--- |
| **WAI-ARIA Combobox** | Active-descendant focus model | `role="combobox"` + `aria-activedescendant` |
| **Anchored Overlay** | Viewport-safe listbox popup | `@floating-ui/react` with `Portal` |
| **Local / Async Search** | Client filtering or debounced query | Built-in filter algorithm + `onSearchChange` |
| **Multi-Select Tags** | Select multiple items with chips | Integrated tag pills |
| **FormField Support** | Seamless form validation cascade | Connects with `FormField` |

---

## 6. Anatomy

```text
<Combobox.Root value={selected} onValueChange={setSelected}>
  <div className="cl-combobox__control">
    <Combobox.Input className="cl-combobox__input" placeholder="Search country..." />
    <Combobox.Trigger className="cl-combobox__trigger" />
  </div>
  <Combobox.Portal>
    <Combobox.Content className="cl-combobox__content">
      <Combobox.Empty className="cl-combobox__empty">No results found.</Combobox.Empty>
      <Combobox.Group>
        <Combobox.Item value="us">United States</Combobox.Item>
        <Combobox.Item value="ca">Canada</Combobox.Item>
        <Combobox.Item value="in">India</Combobox.Item>
      </Combobox.Group>
    </Combobox.Content>
  </Combobox.Portal>
</Combobox.Root>
```

---

## 7. Public API Specification

### 7.1 Props Interface
```typescript
export interface ComboboxProps<TValue = string> {
  value?: TValue;
  defaultValue?: TValue;
  onValueChange?: (value: TValue) => void;
  searchValue?: string;
  onSearchChange?: (search: string) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export interface ComboboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
}

export interface ComboboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  isDisabled?: boolean;
  children: React.ReactNode;
}
```

### 7.2 Tabular Props Dictionary

| Component | Prop | Type | Default | Description | A11y Impact |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Combobox.Root` | `value` | `TValue` | `undefined` | Controlled value | Sets `aria-selected` |
| `Combobox.Root` | `searchValue` | `string` | `undefined` | Controlled input search text | Filters options |
| `Combobox.Root` | `isLoading` | `boolean` | `false` | Asynchronous search in progress| Sets `aria-busy="true"` |
| `Combobox.Root` | `isMulti` | `boolean` | `false` | Allows multiple selections | Updates `aria-multiselectable` |
| `Combobox.Item` | `value` | `string` | — | Item value | `id` referenced in `activedescendant`|

---

## 8. TypeScript Types

```typescript
// packages/react/src/components/Combobox/Combobox.types.ts

import * as React from "react";

export interface ComboboxContextValue<TValue = any> {
  value: TValue;
  setValue: (value: TValue) => void;
  searchValue: string;
  setSearchValue: (query: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  listboxId: string;
}
```

---

## 9. Variants & Visual States

- Matches [`Input`](./02-input.md) variants: `outline` (default), `filled`, `flushed`.
- Active Descendant: High-contrast subtle primary background (`--cl-color-primary-subtle`).

---

## 10. Sizes & Metrics

Matches Input and Button heights: `sm` (32px), `md` (40px), `lg` (48px).

---

## 11. States & Pseudo-Classes

- Focus-visible ring on input control: `outline: 2px solid var(--cl-ring-color)`.
- Open: `data-state="open"` on content.

---

## 12. Behavioral Specification

- Typing in `<Combobox.Input>` automatically opens listbox and filters visible items.
- `ArrowDown` highlights first item without moving DOM focus away from input.
- `Enter` selects highlighted item, closes listbox, and updates input text.

---

## 13. Controlled / Uncontrolled State Behavior

Dual state management for `value` and `searchValue` via [`useControllableState`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/hooks/useControllableState.ts).

---

## 14. Events Contract

- `onValueChange`: Fired when an item is selected.
- `onSearchChange`: Fired on keystroke input.

---

## 15. Composition & Slot Delegation

- Supports `asChild?: boolean` on subcomponents.

---

## 16. Ref Contract

- Forwarded refs bind to DOM input (`HTMLInputElement`) and listbox content (`HTMLDivElement`).

---

## 17. Accessibility Specification (WCAG 2.2 AA & APG)

1. **APG Combobox 1.2:**
   - Input: `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded={isOpen}`, `aria-controls={listboxId}`, `aria-activedescendant={activeId}`.
   - Listbox: `role="listbox"`.
   - Option: `role="option"`, `aria-selected={isSelected}`.
2. **Keyboard Focus Integrity:** Focus remains pinned to the text input so virtual keyboard remains open on touch devices.

---

## 18. Keyboard Interaction Keymap

| Key | Context | Action |
| :--- | :--- | :--- |
| `ArrowDown` | Focus on Input | Opens listbox; moves active-descendant to next option |
| `ArrowUp` | Focus on Input | Moves active-descendant to previous option |
| `Enter` | Focus on Input | Selects currently highlighted active-descendant |
| `Escape` | Focus on Input | Closes listbox; clears active-descendant |
| `Tab` | Focus on Input | Closes listbox; moves focus to next page element |

---

## 19. Styling Contract (Scoped Static CSS & `--cl-*` Tokens)

```css
@layer cl-components {
  .cl-combobox {
    position: relative;
    width: 100%;
  }

  .cl-combobox__control {
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid var(--cl-color-border-subtle);
    border-radius: var(--cl-radius-md, 6px);
    background-color: var(--cl-color-bg-surface);
    padding: 0 var(--cl-space-3, 12px);
    box-sizing: border-box;
  }

  .cl-combobox__control:focus-within {
    border-color: var(--cl-color-primary-solid);
    box-shadow: 0 0 0 1px var(--cl-color-primary-solid);
  }

  .cl-combobox__input {
    flex: 1;
    border: none;
    background: transparent;
    padding: var(--cl-space-2, 8px) 0;
    font-size: var(--cl-font-size-sm, 14px);
    color: var(--cl-color-text-primary);
    outline: none;
  }

  .cl-combobox__content {
    position: absolute;
    z-index: var(--cl-z-dropdown, 1000);
    max-height: 280px;
    overflow-y: auto;
    background-color: var(--cl-color-bg-surface);
    border: 1px solid var(--cl-color-border-subtle);
    border-radius: var(--cl-radius-md, 6px);
    box-shadow: var(--cl-shadow-lg);
    padding: var(--cl-space-1, 4px);
    margin-top: 4px;
  }

  .cl-combobox__item {
    display: flex;
    align-items: center;
    padding: var(--cl-space-2, 8px) var(--cl-space-3, 12px);
    font-size: var(--cl-font-size-sm, 14px);
    border-radius: var(--cl-radius-sm, 4px);
    cursor: pointer;
    color: var(--cl-color-text-primary);
  }

  .cl-combobox__item[data-highlighted="true"] {
    background-color: var(--cl-color-primary-subtle);
    color: var(--cl-color-primary-text);
  }

  .cl-combobox__item[aria-selected="true"] {
    font-weight: 600;
  }
}
```

---

## 20. Theme Contract

Adapts automatically via `--cl-color-bg-surface`, `--cl-color-text-primary`, `--cl-color-primary-solid`, and `--cl-color-primary-subtle`.

---

## 21. Responsive Behavior

Full width responsiveness with mobile virtual keyboard compatibility.

---

## 22. Motion & Animations

Dropdown fade/scale: 150ms.

---

## 23. Testing Specification

| Test Category | Scenario | Expected Outcome |
| :--- | :--- | :--- |
| **1. Typing Filters** | Type "Uni" into input | Shows "United States", hides "Canada" |
| **2. Active Descendant**| Press `ArrowDown` | Sets `aria-activedescendant="item-us"` |
| **3. Selection Commit**| Press `Enter` on active item | Commits value; closes popup; updates input text |
| **4. Escape Close** | Press `Escape` while open | Closes popup; focus remains on input |
| **5. Accessibility** | Run `axe(container)` | Zero accessibility violations |

---

## 24. Storybook Contract

Stories in `packages/react/src/components/Combobox/Combobox.stories.tsx`:
1. `Default`: Country selector.
2. `AsyncSearch`: Debounced user search with loading spinner.
3. `MultiSelect`: Tag selection.
4. `WithFormField`: Inside `<FormField>` with validation.

---

## 25. Documentation Reqs

API dictionary, WAI-ARIA APG active-descendant explanation, and async search examples.

---

## 26. Edge Cases & Hazards

1. Fast typing while async request is pending -> race conditions guarded by request cancellation IDs.

---

## 27. Reference Comparison

| Feature | Chellaa React | MUI Autocomplete | Ant Design AutoComplete |
| :--- | :--- | :--- | :--- |
| **Semantics** | WAI-ARIA APG Combobox | APG Combobox | Custom input wrapper |
| **Architecture** | Compound components | Monolithic with slots | Monolithic |
| **Styling** | Scoped static CSS in `@layer` | Emotion | Less |

---

## 28. Deferred Features

- Windowed virtual list rendering for 10,000+ items (Phase 7).

---

## 29. Acceptance Criteria

- [ ] Compound structure implemented (`Combobox.Root`, `Combobox.Input`, etc.).
- [ ] Strict WAI-ARIA APG 1.2 Combobox with `aria-activedescendant`.
- [ ] `@floating-ui/react` anchored positioning per ADR-010.
- [ ] Local and async search filtering supported.
- [ ] Zero axe accessibility violations.
- [ ] 100% test pass rate in Vitest.

---

## 30. Implementation Plan, Governance & Traceability

### 30.1 Target Files
```text
packages/react/src/components/Combobox/
├── Combobox.tsx
├── Combobox.types.ts
├── Combobox.styles.css
├── Combobox.test.tsx
├── Combobox.stories.tsx
└── index.ts
```

### 30.2 Traceability Matrix

| Requirement | Source Rule / ADR | Workflow Stage | Acceptance Criterion |
| :--- | :--- | :--- | :--- |
| APG Combobox Active-Descendant | Document 04 (A11y) | Workflow F | aria-activedescendant & Arrow cycling |
| Anchored Positioning | ADR-010 | Workflow F | Floating UI auto-flip & shift |
| FormField Integration | Document 02 (Requirements) | Workflow F | useFormField context cascade |
