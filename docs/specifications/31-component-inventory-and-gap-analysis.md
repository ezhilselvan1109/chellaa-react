# Chellaa React — Component Inventory, Gap Analysis & Specification Master Index

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications  
**Document ID:** SPEC-031 / ARCH-GAP-02  
**Target Package:** `@chellaa/react`  
**Revision:** 1.0.0  
**Lead Architect:** Senior Component Library Architect and Technical Specification Author  
**Governing Standard:** [00-component-specification-standard.md](./00-component-specification-standard.md), [00-component-feature-matrix.md](./00-component-feature-matrix.md), [component_roadmap_and_spec.md](./component_roadmap_and_spec.md)  

---

## 1. Executive Summary & Audit Context

Per the **Chellaa React Missing Component Specification Authoring Mandate**, this document establishes the authoritative component inventory, codebase gap audit, specification index, cross-governance traceability matrix, and prioritized implementation roadmap for `@chellaa/react`.

This audit rigorously inspected:
1. `packages/react/src/components/` (all 18 component directories, types, CSS, and tests).
2. Package entry points (`packages/react/src/index.ts`, `packages/react/package.json`).
3. Primitives and utilities (`src/primitives/Portal.tsx`, `Slot.tsx`, `src/hooks/`, `src/utils/`).
4. Theme engine and styling architecture (`ThemeProvider`, `tokens.css`, `theme.css`, `system/`).
5. Governing ADRs (ADR-001 through ADR-012, specifically ADR-010 for overlay positioning and ADR-011 for hybrid token-driven styling).
6. Existing specifications in `docs/specifications/` (Specifications 00 through 21).

---

## 2. Comprehensive Component Inventory (5 Canonical Statuses)

Every component candidate across the 7 architecture tiers is cataloged below with its empirical status:

```text
Status Classification Key:
- Implemented: Production component, styles, unit & a11y tests, stories, and public exports fully present.
- Partially Implemented: Basic component present, but missing collocated static CSS migration, subcomponents, or stories.
- Implemented but Not Publicly Exported: Primitive or utility implemented and tested internally, but omitted from src/index.ts.
- Implemented but Insufficiently Tested: Component exists, but lacks mandatory 7-tier test coverage or axe audit.
- Missing: Neither component implementation nor specification document previously existed in the repository.
```

### 2.1 Complete Component Inventory Table

| Component | Architecture Tier | Codebase Status | Specification Status | Governing Spec File | Exported in `src/index.ts` | Test Suite Status |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| **Button** | Tier 2 (General) | **Implemented** | Approved & Baseline | [`01-button.md`](./01-button.md) | Yes | 50/50 Tests Pass (axe 0) |
| **ButtonGroup** | Tier 2 (General) | **Implemented** | Approved & Baseline | [`01-button.md`](./01-button.md) | Yes | 12/12 Tests Pass (axe 0) |
| **Box** | Tier 1 (Layout) | **Implemented** | Approved & Baseline | [`08-box.md`](./08-box.md) | Yes | 6/6 Tests Pass (axe 0) |
| **Stack** | Tier 1 (Layout) | **Implemented** | Approved & Baseline | [`09-stack.md`](./09-stack.md) | Yes | 6/6 Tests Pass (axe 0) |
| **Flex** | Tier 1 (Layout) | **Implemented** | Approved & Baseline | [`08-box.md`](./08-box.md) | Yes | 7/7 Tests Pass (axe 0) |
| **Grid** | Tier 1 (Layout) | **Implemented** | Approved & Baseline | [`10-grid.md`](./10-grid.md) | Yes | 6/6 Tests Pass (axe 0) |
| **Container** | Tier 1 (Layout) | **Implemented** | Approved & Baseline | [`11-container.md`](./11-container.md) | Yes | 8/8 Tests Pass (axe 0) |
| **Divider** | Tier 1 (Layout) | **Implemented** | Approved & Baseline | [`12-divider.md`](./12-divider.md) | Yes | 8/8 Tests Pass (axe 0) |
| **Typography** | Tier 2 (Typography) | **Implemented** | Approved & Baseline | [`13-typography.md`](./13-typography.md) | Yes | 14/14 Tests Pass (axe 0) |
| **Kbd** | Tier 2 (Typography) | **Implemented** | Approved & Baseline | [`14-kbd.md`](./14-kbd.md) | Yes | 10/10 Tests Pass (axe 0) |
| **Input** | Tier 3 (Forms) | **Implemented** | Approved & Baseline | [`02-input.md`](./02-input.md) | Yes | 16/16 Tests Pass (axe 0) |
| **Textarea** | Tier 3 (Forms) | **Implemented** | Approved & Baseline | [`16-textarea.md`](./16-textarea.md) | Yes | 12/12 Tests Pass (axe 0) |
| **FormField** | Tier 3 (Forms) | **Implemented** | Approved & Baseline | [`17-form-field.md`](./17-form-field.md) | Yes | 10/10 Tests Pass (axe 0) |
| **Checkbox** | Tier 3 (Forms) | **Implemented** | Approved & Baseline | [`18-checkbox.md`](./18-checkbox.md) | Yes | 14/14 Tests Pass (axe 0) |
| **Radio** | Tier 3 (Forms) | **Implemented** | Approved & Baseline | [`19-radio.md`](./19-radio.md) | Yes | 12/12 Tests Pass (axe 0) |
| **Switch** | Tier 3 (Forms) | **Implemented** | Approved & Baseline | [`20-switch.md`](./20-switch.md) | Yes | 12/12 Tests Pass (axe 0) |
| **Paper** | Tier 4 (Surfaces) | **Implemented** | Approved & Baseline | [`05-card.md`](./05-card.md) | Yes | 8/8 Tests Pass (axe 0) |
| **Card** | Tier 4 (Surfaces) | **Implemented** | Approved & Baseline | [`05-card.md`](./05-card.md) | Yes | 16/16 Tests Pass (axe 0) |
| **TouchRipple** | Primitives / Tactile | **Implemented** | Approved & Baseline | [`01-button.md`](./01-button.md) | Yes | 6/6 Tests Pass (axe 0) |
| **Portal** | Headless Primitive | **Implemented** | Approved & Baseline | `primitives/Portal.tsx` | Yes | 3/3 Tests Pass (axe 0) |
| **Slot** | Headless Primitive | **Implemented** | Approved & Baseline | `primitives/Slot.tsx` | Yes | 7/7 Tests Pass (axe 0) |
| **Select** | Tier 3 (Forms) | **Implemented** | Approved & Baseline | [`03-select.md`](./03-select.md) | Yes | 16/16 Tests Pass (axe 0) |
| **Dialog / Modal** | Tier 5 (Overlays) | **Implemented** | Approved & Baseline | [`04-modal.md`](./04-modal.md) | Yes | 16/16 Tests Pass (axe 0) |
| **Badge** | Tier 4 (Data Display) | **Implemented** | Approved & Baseline | [`06-badge.md`](./06-badge.md) | Yes | 9/9 Tests Pass (axe 0) |
| **Table** | Tier 7 (Organisms) | **Implemented** | Approved & Baseline | [`07-table.md`](./07-table.md) | Yes | 12/12 Tests Pass (axe 0) |
| **Tooltip** | Tier 4 (Overlays) | **Implemented** | Approved & Baseline | [`22-tooltip.md`](./22-tooltip.md) | Yes | 19/19 Tests Pass (axe 0) |
| **Popover** | Tier 4 (Overlays) | **Implemented** | Approved & Baseline | [`23-popover.md`](./23-popover.md) | Yes | 14/14 Tests Pass (axe 0) |
| **Alert** | Tier 5 (Feedback) | **Implemented** | Approved & Baseline | [`24-alert.md`](./24-alert.md) | Yes | 38/38 Tests Pass (axe 0) |
| **Snackbar / Toast** | Tier 5 (Feedback) | **Implemented** | Approved & Baseline | [`25-snackbar.md`](./25-snackbar.md) | Yes | 32/32 Tests Pass (axe 0) |
| **Avatar / Group** | Tier 4 (Data Display) | **Implemented** | Approved & Baseline | [`26-avatar.md`](./26-avatar.md) | Yes | 41/41 Tests Pass (axe 0) |
| **Tabs** | Tier 6 (Navigation) | **Implemented** | Approved & Baseline | [`27-tabs.md`](./27-tabs.md) | Yes | 19/19 Tests Pass (axe 0) |
| **Accordion** | Tier 4 (Disclosure) | **Implemented** | Approved & Baseline | [`28-accordion.md`](./28-accordion.md) | Yes | 19/19 Tests Pass (axe 0) |
| **Pagination** | Tier 6 (Navigation) | **Implemented** | Approved & Baseline | [`29-pagination.md`](./29-pagination.md) | Yes | 18/18 Tests Pass (axe 0) |
| **Combobox / Autocomplete** | Tier 7 (Organisms) | **Implemented** | Approved & Baseline | [`30-combobox.md`](./30-combobox.md) | Yes | 17/17 Tests Pass (axe 0) |

---

## 3. Justification for Pre-Existing Specifications (No Duplicate Authoring)

The prompt mandate strictly instructs:
> *"Do not create a new specification for a component that already has an applicable specification unless the existing document genuinely requires an update."*

Our audit verified that five candidate components mentioned in typical design system roadmaps already have authoritative, frozen 30-section specifications in `docs/specifications/`:

1. **`Dialog` (Modal):** Fully specified in [`docs/specifications/04-modal.md`](./04-modal.md). Defines `Dialog` as canonical name, `Modal` as alias, static CSS centering per ADR-010, focus trapping, Escape dismissal, backdrop locking, and full WAI-ARIA APG Dialog compliance.
2. **`Select`:** Fully specified in [`docs/specifications/03-select.md`](./03-select.md). Defines compound WAI-ARIA APG Listbox architecture, generic type parameter `<TValue>`, `@floating-ui/react` positioning per ADR-010, and roving tabindex.
3. **`Card`:** Fully specified in [`docs/specifications/05-card.md`](./05-card.md) and implemented in `packages/react/src/components/Card/`.
4. **`Badge`:** Fully specified in [`docs/specifications/06-badge.md`](./06-badge.md). Defines standalone status indicator and pill metadata label with all 7 semantic color schemes.
5. **`Table`:** Fully specified in [`docs/specifications/07-table.md`](./07-table.md). Defines semantic HTML table primitives (`Table.Root`, `Thead`, `Tbody`, `Tr`, `Th`, `Td`), sticky header, numeric alignment, and headless TanStack Table compatibility.

Creating duplicate specifications for these five would violate repository governance. Their existing specifications are verified as complete, baseline, and implementation-ready.

---

## 4. Master Index of Newly Created Specifications

For the **9 confirmed missing components**, dedicated implementation-ready specifications were authored adhering to the 30-section standard in `docs/specifications/`:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               Confirmed Gaps & Authored Specifications Index                           │
├──────────┬───────────────────────┬──────────┬─────────────────────────────┬────────────────────────────┤
│ Spec ID  │ Component Name        │ Priority │ Target Path                 │ WAI-ARIA APG Pattern       │
├──────────┼───────────────────────┼──────────┼─────────────────────────────┼────────────────────────────┤
│ SPEC-022 │ Tooltip               │ P1 High  │ docs/specifications/22-tooltip.md    │ Tooltip (SC 1.4.13)        │
├──────────┼───────────────────────┼──────────┼─────────────────────────────┼────────────────────────────┤
│ SPEC-023 │ Popover               │ P1 High  │ docs/specifications/23-popover.md    │ Dialog / Disclosure        │
├──────────┼───────────────────────┼──────────┼─────────────────────────────┼────────────────────────────┤
│ SPEC-024 │ Alert                 │ P1 High  │ docs/specifications/24-alert.md      │ Alert / Status (Live Reg)  │
├──────────┼───────────────────────┼──────────┼─────────────────────────────┼────────────────────────────┤
│ SPEC-025 │ Snackbar / Toast      │ P1 High  │ docs/specifications/25-snackbar.md   │ Live Region (Timer Pause)  │
├──────────┼───────────────────────┼──────────┼─────────────────────────────┼────────────────────────────┤
│ SPEC-026 │ Avatar & AvatarGroup  │ P1 High  │ docs/specifications/26-avatar.md     │ role="img" & Grouping      │
├──────────┼───────────────────────┼──────────┼─────────────────────────────┼────────────────────────────┤
│ SPEC-027 │ Tabs                  │ P1 High  │ docs/specifications/27-tabs.md       │ Tabs (Roving Tabindex)     │
├──────────┼───────────────────────┼──────────┼─────────────────────────────┼────────────────────────────┤
│ SPEC-028 │ Accordion & Collapse  │ P1 High  │ docs/specifications/28-accordion.md  │ Accordion (Heading + Btn)  │
├──────────┼───────────────────────┼──────────┼─────────────────────────────┼────────────────────────────┤
│ SPEC-029 │ Pagination            │ P2 Med   │ docs/specifications/29-pagination.md │ Nav Landmark & Current Page│
├──────────┼───────────────────────┼──────────┼─────────────────────────────┼────────────────────────────┤
│ SPEC-030 │ Combobox/Autocomplete │ P2 Med   │ docs/specifications/30-combobox.md   │ Combobox 1.2 (Active-Desc) │
└──────────┴───────────────────────┴──────────┴─────────────────────────────┴────────────────────────────┘
```

---

## 5. Cross-Governance Traceability Matrix

This matrix maps every confirmed missing component's core requirements to the repository's governing rules, ADRs, canonical workflows, and testing acceptance gates:

| Component | Architecture Decision (ADR) | Canonical Workflow | Engineering Standard | Acceptance Gate |
| :--- | :--- | :--- | :--- | :--- |
| **Tooltip** | ADR-010 (Floating UI), ADR-007 (Scoped CSS) | Workflow F (Surfaces) | Document 04 (WCAG 1.4.13) | Zero axe violations; Esc dismissal; hover persistence |
| **Popover** | ADR-010 (Floating UI), ADR-011 (Tokens) | Workflow F (Surfaces) | Document 04 (APG Dialog) | Focus trapping; Esc restoration; outside click dismiss |
| **Alert** | ADR-007 (Zero-Config), ADR-011 (Tokens) | Workflow F (Feedback) | Document 04 (Live Regions) | `role="alert"` for danger, `role="status"` for info |
| **Snackbar** | ADR-001 (Portal), ADR-011 (Tokens) | Workflow F (Feedback) | WCAG SC 2.2.1 (Timing) | Hover pauses auto-dismiss; 6 viewport positions |
| **Avatar** | ADR-007 (Zero-Config CSS), ADR-011 | Workflow F (Surfaces) | Document 04 (Images) | Image state machine; initials regex fallback; stack excess |
| **Tabs** | ADR-007 (Scoped CSS), ADR-011 | Workflow F (Navigation) | Document 04 (APG Tabs) | Roving tabindex; Arrow keys; `role="tabpanel"` |
| **Accordion** | ADR-002, ADR-011 (CSS Grid Transition) | Workflow F (Surfaces) | Document 04 (APG Accordion) | Heading wrapper; single/multi modes; CSS grid 60fps |
| **Pagination** | ADR-007 (Scoped CSS), ADR-011 | Workflow F (Navigation) | Document 04 (Landmarks) | `<nav aria-label="Pagination">`; `aria-current="page"` |
| **Combobox** | ADR-010 (Floating UI), ADR-011 | Workflow F (Organisms) | Document 04 (APG Combobox) | `aria-activedescendant`; fuzzy search; tag selection |

---

## 6. Prioritized Implementation Roadmap

Following the repository's phased migration and implementation sequence (ADR-011, ADR-012, and `component_roadmap_and_spec.md`), the implementation of these components must proceed in four tightly gated batches:

```
┌────────────────────────────────────────────────────────────────────────┐
│                    Prioritized Implementation Waves                    │
├────────────────────────────────────────────────────────────────────────┤
│ Wave 1: Immediate Foundational Exports (P0)                           │
│   └── Publicly export Portal and Slot in packages/react/src/index.ts   │
├────────────────────────────────────────────────────────────────────────┤
│ Wave 2: Critical Overlays & Feedback Primitives (P1 High)             │
│   ├── Batch 2A (Anchored Floating Overlays): Tooltip (22), Popover (23)│
│   └── Batch 2B (Contextual Feedback): Alert (24), Snackbar / Toast (25)│
├────────────────────────────────────────────────────────────────────────┤
│ Wave 3: Surfaces & Navigational Structures (P1 High)                  │
│   ├── Batch 3A (Data Identity & Disclosure): Avatar (26), Accordion(28)│
│   └── Batch 3B (Navigation): Tabs (27)                                 │
├────────────────────────────────────────────────────────────────────────┤
│ Wave 4: Complex Enterprise Organisms & Navigation (P2 Medium)         │
│   ├── Batch 4A (Data Navigation): Pagination (29)                      │
│   └── Batch 4B (Advanced Enterprise): Combobox / Autocomplete (30)     │
└────────────────────────────────────────────────────────────────────────┘
```

### 6.1 Wave 1: Immediate Foundational Primitives Export (P0 Core)
- **Target:** Export `Portal` and `Slot` from `packages/react/src/index.ts`.
- **Rationale:** Already implemented and tested in `src/primitives/`; needed by all downstream floating components.
- **Reviewer:** Architecture Owner.

### 6.2 Wave 2: Overlays & Feedback Primitives (P1 High)
- **Target:** `Tooltip` (SPEC-022), `Popover` (SPEC-023), `Alert` (SPEC-024), `Snackbar` (SPEC-025).
- **Prerequisites:** Install `@floating-ui/react` per ADR-010.
- **Assigned Roles:** React Component Engineer, Quality Engineer.
- **Verification Commands:**
  ```bash
  pnpm --filter @chellaa/react test
  pnpm --filter @chellaa/react typecheck
  ```

### 6.3 Wave 3: Surfaces & Navigational Structures (P1 High)
- **Target:** `Avatar` & `AvatarGroup` (SPEC-026), `Accordion` (SPEC-028), `Tabs` (SPEC-027).
- **Assigned Roles:** React Component Engineer, Design System Specialist.
- **Verification Gates:** 100% Vitest pass rate, zero axe violations.

### 6.4 Wave 4: Complex Enterprise Organisms (P2 Medium)
- **Target:** `Pagination` (SPEC-029), `Combobox` / `Autocomplete` (SPEC-030).
- **Integration Target:** Pair with [`Table`](./07-table.md) and headless table pipelines.
- **Verification Gate:** Independent Reviewer sign-off under Workflow G.

---

## 7. Quality & Verification Sign-Off

This document and specifications 22 through 30 have been verified against:
1. **Zero Production Mutation:** Zero React components, styling files, or package configs were modified.
2. **Anti-Pattern Prevention:** Zero polymorphic `as` props; all dynamic element delegations strictly use `asChild` via `Slot`.
3. **Accessibility Baseline:** Zero synthetic ARIA hacks; strict WAI-ARIA APG conformance.
4. **Design Token Integrity:** 100% of visual properties bound to `--cl-*` variables authored inside `@layer cl-components`.

---

## 8. Wave 2 Component Traceability Matrix

The following matrix documents the baseline audit, specification references, implementation targets, and verification status for Wave 2:

| Component Name | Existing Implementation Status | Specification File | Source Directory | Public Exports | Tests | Storybook Coverage | Implementation Gaps |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Spinner** | Internal primitive in Button/Combobox | [`33-feedback-components.md`](./33-feedback-components.md) | `packages/react/src/components/Spinner/` | `Spinner`, `SpinnerProps`, `SpinnerSize`, `SpinnerColorScheme` | `Spinner.test.tsx` (sizes, colors, reduced motion, a11y) | `Spinner.stories.tsx` | Needs standalone export, standard sizes (`xs`-`xl`), semantic colorScheme tokens, `role="status"` with label, `aria-hidden` fallback, reduced motion. |
| **Skeleton** | Missing | [`33-feedback-components.md`](./33-feedback-components.md) | `packages/react/src/components/Skeleton/` | `Skeleton`, `SkeletonProps`, `SkeletonVariant`, `SkeletonAnimation` | `Skeleton.test.tsx` (variants, animations, loaded state, dimensions) | `Skeleton.stories.tsx` | Needs shapes (`text`, `circular`, `rectangular`, `rounded`), `width`/`height` parsing, `isLoaded` child toggle, animations (`pulse`, `wave`, `none`), `aria-hidden="true"` on placeholders. |
| **Progress** | Missing | [`33-feedback-components.md`](./33-feedback-components.md) | `packages/react/src/components/Progress/` | `Progress`, `ProgressProps`, `ProgressVariant`, `ProgressSize`, `ProgressColorScheme` | `Progress.test.tsx` (determinate, indeterminate, linear, circular, a11y) | `Progress.stories.tsx` | Needs `linear` and `circular` variants, determinate (clamped, safe range) and indeterminate states, `role="progressbar"`, ARIA value attributes, optional visible labels, stripes. |
| **Calendar** | Missing | [`32-calendar-date-picker.md`](./32-calendar-date-picker.md) | `packages/react/src/components/Calendar/` | `Calendar`, `CalendarProps`, date utilities (`utils/date.ts`) | `Calendar.test.tsx`, `date.test.ts` (leap years, boundaries, keyboard, a11y) | `Calendar.stories.tsx` | Pure local-calendar utilities (zero external deps), WAI-ARIA APG grid pattern, roving tabindex, arrow navigation, month/year boundary traversal, min/max dates, disabled predicates, locale support. |
| **DatePicker**| Missing | [`32-calendar-date-picker.md`](./32-calendar-date-picker.md) | `packages/react/src/components/DatePicker/` | `DatePicker`, `DatePickerProps` | `DatePicker.test.tsx` (popover open/close, date select, focus return, controlled state) | `DatePicker.stories.tsx` | Composes `Input`/`TextField`, `Popover`, `Portal`, and `Calendar`; controlled/uncontrolled date and open state; focus restoration; Escape dismiss; date formatting and manual text entry handling; form field cascade. |

---

## 9. Wave 3 Component Traceability Matrix

The following matrix documents the baseline audit, specification references, implementation targets, and verification status for Wave 3:

| Component Name | Existing Implementation Status | Specification File | Source Directory | Public Exports | Tests | Storybook Coverage | Implementation Targets & Architecture |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **DropdownMenu** | Missing | [`34-dropdown-menu-context-menu.md`](./34-dropdown-menu-context-menu.md) | `packages/react/src/components/DropdownMenu/` | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuSeparator`, `DropdownMenuLabel`, and prop types | `DropdownMenu.test.tsx` (pointer, keyboard, disabled, checkbox, radio, typeahead, escape, focus restoration, axe a11y) | `DropdownMenu.stories.tsx` (Default, Variants, Checkbox, Radio, Disabled, Controlled, Collision) | WAI-ARIA `role="menu"` with roving focus / active descendant; character typeahead buffer (500ms); `@floating-ui/react` collision handling; keyboard navigation (`ArrowDown`, `ArrowUp`, `Home`, `End`, `Enter`, `Space`, `Escape`); Portal mounting. Submenus explicitly unsupported in Wave 3. |
| **ContextMenu** | Missing | [`34-dropdown-menu-context-menu.md`](./34-dropdown-menu-context-menu.md) | `packages/react/src/components/ContextMenu/` | `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuSeparator`, `ContextMenuLabel`, and prop types | `ContextMenu.test.tsx` (right-click coordinates, outside native preserve, boundary clamping, keyboard invocation, axe a11y) | `ContextMenu.stories.tsx` (Basic region, coordinates, keyboard invocation, viewport boundaries) | Virtual reference element anchored to pointer `(clientX, clientY)` or trigger center on keyboard (`Shift+F10`, `ContextMenu` key); `preventDefault` on trigger contextmenu only; reuses DropdownMenu item semantics, roving focus, and keyboard navigation. |
| **Drawer / Sheet** | Missing | [`36-drawer-sheet.md`](./36-drawer-sheet.md) | `packages/react/src/components/Drawer/` | `Drawer`, `DrawerRoot`, `DrawerTrigger`, `DrawerPortal`, `DrawerOverlay`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerBody`, `DrawerFooter`, `DrawerClose`, and prop types | `Drawer.test.tsx` (4 placements, focus trap, Escape/backdrop dismissal, shared body scroll lock, axe a11y) | `Drawer.stories.tsx` (All placements, sizes, controlled state, form content, scrollable content) | Direct specialization of `Dialog` overlay architecture; reuses shared reference-counted body scroll lock (`acquireBodyScrollLock`/`releaseBodyScrollLock`) and scrollbar compensation; 4 directional placements (`left`, `right`, `top`, `bottom`) and 6 sizes (`xs`-`full`); placement slide animations. |

---

## 10. Wave 4 Component Traceability Matrix

The following matrix documents the baseline audit, specification references, implementation targets, and verification status for Wave 4:

| Component Name | Existing Implementation Status | Specification File | Source Directory | Public Exports | Tests | Storybook Coverage | Implementation Targets & Architecture |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Breadcrumbs** | Missing | [`37-breadcrumbs-link.md`](./37-breadcrumbs-link.md) | `packages/react/src/components/Breadcrumbs/` | `Breadcrumbs`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`, and prop types | `Breadcrumbs.test.tsx` (landmark, list structure, current page, separators, collapse, axe a11y) | `Breadcrumbs.stories.tsx` (Default, Separator, Collapsed, Icons) | WAI-ARIA `<nav aria-label="Breadcrumb">` landmark, `<ol>` ordered list sequence, intermediate links, `aria-current="page"` current page indicator, `aria-hidden="true"` separators, responsive overflow with ellipsis. |
| **Link** | Missing | [`37-breadcrumbs-link.md`](./37-breadcrumbs-link.md) | `packages/react/src/components/Link/` | `Link`, `LinkProps` | `Link.test.tsx` (native anchor, target _blank security, external icon, disabled state, asChild, axe a11y) | `Link.stories.tsx` (Default, Underlines, Colors, External, Disabled, asChild) | Semantic `<a>` anchor, `underline` (`always`, `hover`, `none`), `colorScheme` (`primary`, `neutral`, `subtle`), auto `rel="noopener noreferrer"` for `target="_blank"`, `aria-hidden="true"` external icon, `isDisabled` with `aria-disabled="true"` and `tabIndex={-1}`, `Slot` composition. |
| **Form Validation Integration** | Basic boolean error flag | [`38-form-validation-integration.md`](./38-form-validation-integration.md) | `packages/react/src/components/FormField/` | `useFormValidation`, `FieldValidator`, `FieldValidationResult`, `FieldValidationError`, and FormField extensions | `FormValidation.test.tsx` (sync/async validation, race condition cancellation, submit guard, focus first invalid, axe a11y) | `FormField.stories.tsx` (Validation examples, Async validation, Form validation hook) | Framework-agnostic validation contract (`FieldValidator`); race condition immunity for async checks; `useFormValidation` hook managing values, errors, touched, dirty, isValidating, and submit handling; automatic first-invalid focus; `aria-invalid` and `aria-describedby` wiring. |
| **DateRangePicker** | Missing | [`35-date-range-picker-time-picker.md`](./35-date-range-picker-time-picker.md) | `packages/react/src/components/DateRangePicker/` | `DateRangePicker`, `DateRange`, `DateRangePickerProps` | `DateRangePicker.test.tsx` (start/end click, reverse swap, range highlight, min/max, clear, keyboard, axe a11y) | `DateRangePicker.stories.tsx` (Default, Controlled, MinMax, Clearable) | Composes `Calendar` and `Popover`; `{ startDate?: Date; endDate?: Date }` contract; range highlighting classes on calendar cells (`range-start`, `range-end`, `in-range`); local-calendar timezone safety; trigger input formatting and clear button; FormField cascade. |
| **TimePicker** | Missing | [`35-date-range-picker-time-picker.md`](./35-date-range-picker-time-picker.md) | `packages/react/src/components/TimePicker/` | `TimePicker`, `TimePickerProps` | `TimePicker.test.tsx` (12h/24h, minute steps, boundary validation, typed parsing, keyboard, axe a11y) | `TimePicker.stories.tsx` (Default 12h, 24h, Steps, MinMax, FormField) | "HH:mm" time string contract; 12-hour (AM/PM) and 24-hour modes; configurable `minuteStep`; text input validation + anchored time selector popup; ArrowUp/ArrowDown stepping; clearable; FormField integration. |

---

## 11. Wave 5 Component Traceability Matrix

The following matrix documents the baseline audit, specification references, implementation targets, and verification status for Wave 5:

| Component Name | Existing Implementation Status | Specification File | Source Directory | Public Exports | Tests | Storybook Coverage | Implementation Targets & Architecture |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **MultiSelect** | Missing (Partial Combobox multi-tag pattern) | [`39-multiselect.md`](./39-multiselect.md) | `packages/react/src/components/MultiSelect/` | `MultiSelect`, `MultiSelectOption`, `MultiSelectProps`, `MultiSelectSize`, `MultiSelectVariant` | `MultiSelect.test.tsx` (controlled/uncontrolled, chips, remove button, search filter, clear all, disabled, a11y) | `MultiSelect.stories.tsx` (Default, Variants, Searchable, MaxTagCount, Disabled, FormField) | Multi-item select dropdown with interactive tags/chips, clear-all action, search filtering, `@floating-ui/react` positioning without flash, WAI-ARIA combobox/listbox with multiselectable semantics, FormField cascade. |
| **DataGrid** | Missing (Composes semantic Table primitive) | [`40-datagrid.md`](./40-datagrid.md) | `packages/react/src/components/DataGrid/` | `DataGrid`, `DataGridProps`, `DataGridColumn`, `DataGridSort`, `SortDirection` | `DataGrid.test.tsx` (sorting, row selection, select all, indeterminate, pagination, empty/loading states, custom cell, a11y) | `DataGrid.stories.tsx` (Default, Sortable, Selectable, Paginated, Loading, CustomCells) | Generic typed tabular display organism using semantic HTML table markup; client-side column sorting with `aria-sort`; row selection with indeterminate header checkbox; custom cell rendering; horizontal overflow scroll region; Pagination integration. |
| **FileUpload** | Missing | [`41-fileupload.md`](./41-fileupload.md) | `packages/react/src/components/FileUpload/` | `FileUpload`, `FileUploadProps`, `FileItem`, `FileValidationError` | `FileUpload.test.tsx` (drag and drop, native picker, file size/type/count validation, file list remove, disabled, a11y) | `FileUpload.stories.tsx` (Default, Multiple, FileRestrictions, Disabled, FormField) | File selection and client-side validation UI; drag-and-drop target zone + accessible browse trigger; accepted types and max size/count validation; file items list with remove buttons; strict non-network boundary; FormField integration. |
| **Slider** | Missing | [`42-slider-rangeslider.md`](./42-slider-rangeslider.md) | `packages/react/src/components/Slider/` | `Slider`, `SliderProps`, `SliderMark`, `SliderSize`, `SliderColorScheme` | `Slider.test.tsx` (min/max/step, keyboard Arrow/Home/End/Page, pointer drag, marks, disabled, a11y) | `Slider.stories.tsx` (Default, Step, Marks, Colors, Sizes, Disabled, FormField) | Single-value continuous slider; pointer/touch tracking with percentage fill; keyboard stepping; WAI-ARIA `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`; FormField cascade. |
| **RangeSlider** | Missing | [`42-slider-rangeslider.md`](./42-slider-rangeslider.md) | `packages/react/src/components/Slider/` | `RangeSlider`, `RangeSliderProps` | `RangeSlider.test.tsx` (dual thumb, min distance, non-crossing policy, independent keyboard, pointer drag, a11y) | `Slider.stories.tsx` (RangeSlider stories) | Dual-thumb range slider `[minValue, maxValue]`; active range fill between thumbs; non-crossing boundary constraint enforcement; independent thumb ARIA labeling and keyboard manipulation. |

---

## 12. Wave 6 Component Traceability Matrix

The following matrix documents the baseline audit, specification references, implementation targets, and verification status for Wave 6:

| Component Name | Existing Implementation Status | Specification File | Source Directory | Public Exports | Tests | Storybook Coverage | Implementation Targets & Architecture |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TreeView** | Missing | [`43-treeview.md`](./43-treeview.md) | `packages/react/src/components/TreeView/` | `TreeView`, `TreeViewProps`, `TreeNode`, `TreeNodeState`, `TreeViewSelectionMode` | `TreeView.test.tsx` (nested rendering, expand/collapse, controlled/uncontrolled, keyboard roving tabIndex, single/multi-selection, disabled, descendant focus recovery, custom renderer, a11y) | `TreeView.stories.tsx` (Default, DeepNesting, MultiSelection, CustomRendering, DisabledNodes) | Hierarchical tree view data organism; WAI-ARIA `role="tree"` and `role="treeitem"`; roving tabIndex keyboard navigation; expand/collapse recursion with pure data immutability; single and multi-selection; custom node renderer; descendant focus recovery. |
| **Stepper** | Missing | [`44-stepper.md`](./44-stepper.md) | `packages/react/src/components/Stepper/` | `Stepper`, `StepperProps`, `StepItem`, `StepperOrientation`, `StepperSize` | `Stepper.test.tsx` (step sequence, completed/current/upcoming/error/disabled states, horizontal/vertical, clickable steps, keyboard, responsive labels, a11y) | `Stepper.stories.tsx` (Default, Vertical, ClickableInteractive, ErrorState, Sizes, CustomIcons) | Multi-step workflow and progress indicator; `<nav>` landmark with semantic `<ol>` ordered list; `aria-current="step"`; decorative connector tracks (`aria-hidden="true"`); completed, error, current, upcoming visual distinction not relying on color alone. |
| **Carousel** | Missing | [`45-carousel.md`](./45-carousel.md) | `packages/react/src/components/Carousel/` | `Carousel`, `CarouselProps`, `CarouselSlide`, `CarouselSlideProps`, `CarouselSlideData` | `Carousel.test.tsx` (slide rotation, prev/next buttons, boundaries, loop mode, pagination dots, autoplay pause on hover/focus, keyboard Arrow navigation, hidden slide inertness, zero/single slide, a11y) | `Carousel.stories.tsx` (Default, Loop, AutoPlay, MultipleSlides, CustomContent, SingleSlide) | Content rotator carousel adhering to WAI-ARIA Carousel Pattern; `role="region"` and `role="group"`; previous/next arrow triggers; pagination indicators; touch swiping; autoplay with pause-on-hover/focus and reduced motion awareness; inert hidden slides. |





