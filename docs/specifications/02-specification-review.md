# Chellaa React — Component Specifications

## Document 02: Specification Contradiction Review & Resolution Matrix

**Document Status:** Approved & Resolved  
**Phase:** 3 — Component Specifications  
**Target Package:** `@chellaa/react`  
**Governing Standard:** Phase 1 Foundation & Phase 2 Engineering Standards

---

## 1. Executive Summary

This document captures the architectural review, contradiction audit, and resolution decisions applied across the Phase 3 component specifications. Every discrepancy identified between the draft specifications, Phase 1 Foundation documents, and Phase 2 Engineering Standards has been resolved.

---

## 2. Contradiction Detection & Resolution Matrix

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                         Contradiction Audit & Resolution Table                                         │
├─────┬──────────────────────┬───────────┬──────────────────────┬──────────────────────┬──────────────────────┬──────────┤
│ ID  │ Issue                │ Component │ Source Rule          │ Draft Specification  │ Resolution           │ Status   │
├─────┼──────────────────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────┤
│ C01 │ Polymorphic `as`     │ Card      │ Phase 2 strictly     │ CardTitleProps had   │ Removed `as` prop;   │ RESOLVED │
│     │ prop violation       │           │ prohibits dynamic `as│ `as?: "h1"|"h2"|...` │ use `asChild` for    │          │
│     │                      │           │ (use `asChild`).     │                      │ heading tags.        │          │
├─────┼──────────────────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────┤
│ C02 │ Unsafe `any` type in │ Modal /   │ Phase 2 TypeScript   │ `initialFocusRef?:   │ Replaced with exact  │ RESOLVED │
│     │ ref props            │ Dialog    │ standard bans `any`  │  React.RefObject<any>`│ `React.RefObject<    │          │
│     │                      │           │ across all APIs.     │                      │  HTMLElement|null>`. │          │
├─────┼──────────────────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────┤
│ C03 │ Ambiguous interactive│ Card      │ Accessible DOM must  │ Card supported       │ Removed `isInteractive`│ RESOLVED │
│     │ container semantics  │           │ avoid clickable      │ `isInteractive=true` │ from Card. Compose   │          │
│     │                      │           │ multi-control divs.  │ on generic div.      │ links via `asChild`. │          │
├─────┼──────────────────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────┤
│ C04 │ Unsafe `asChild` on  │ Input     │ Void input elements  │ Draft allowed        │ Removed `asChild`    │ RESOLVED │
│     │ void input element   │           │ cannot delegate      │ `asChild` on native  │ from Input to protect│          │
│     │                      │           │ child elements.      │ `<input>`.           │ HTML validity.       │          │
├─────┼──────────────────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────┤
│ C05 │ Unsafe `asChild` on  │ Table     │ Browser table parser │ Draft allowed        │ Removed `asChild`    │ RESOLVED │
│     │ HTML table tags      │           │ rejects arbitrary    │ `asChild` on Table,  │ from all Table tags; │          │
│     │                      │           │ non-table markup.    │ Tr, Th, Td.          │ protects semantics.  │          │
├─────┼──────────────────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────┤
│ C06 │ Icon prop naming     │ Button    │ Logical direction    │ Draft used `leftIcon`│ Standardized on      │ RESOLVED │
│     │ inconsistency        │           │ (bidi/RTL) standards │ and `rightIcon`.     │ `startIcon` and      │          │
│     │                      │           │ in modern libraries. │                      │ `endIcon`.           │          │
├─────┼──────────────────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────┤
│ C07 │ Arbitrary style props│ Input     │ Design tokens govern │ Draft included       │ Removed style props; │ RESOLVED │
│     │ on component API     │           │ themes; no ad-hoc    │ `errorBorderColor` & │ use `--cl-color-*`   │          │
│     │                      │           │ style overrides.     │ `focusBorderColor`.  │ semantic tokens.     │          │
├─────┼──────────────────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────┤
│ C08 │ Generic typing claim │ Select    │ If generic claimed,  │ Type was hardcoded to│ Implemented true     │ RESOLVED │
│     │ mismatch             │           │ public API must      │ `string` only.       │ generic `Select<     │          │
│     │                      │           │ accept type parameter│                      │  TValue = string>`.  │          │
├─────┼──────────────────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────┤
│ C09 │ Canonical name       │ Modal vs. │ Unified vocabulary;  │ Ambiguous export:    │ Defined `Dialog` as  │ RESOLVED │
│     │ ambiguity            │ Dialog    │ WAI-ARIA APG Dialog  │ "Modal is also       │ canonical name;      │          │
│     │                      │           │ pattern compliance.  │ exported as Dialog". │ `Modal` is an alias. │
├─────┼──────────────────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────┤
│ C10 │ Unscoped CSS classes │ All       │ Scoped static CSS    │ Classes like         │ Renamed to scoped:   │ RESOLVED │
│     │ (.is-*)              │           │ mandates `.cl-*`     │ `.is-invalid` and    │ `.cl-input--invalid`,│          │
│     │                      │           │ namespace strictly.  │ `.is-disabled`.      │ `.cl-button--loading`│          │
├─────┼──────────────────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────┤
│ C11 │ Raw color values in  │ Badge     │ Semantic design      │ CSS had hardcoded    │ Replaced with token: │ RESOLVED │
│     │ CSS specifications   │           │ tokens must be used  │ `color: #ffffff`.    │ `var(--cl-color-pri- │          │
│     │                      │           │ across all themes.   │                      │  fg)`.               │          │
├─────┼──────────────────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────┤
│ C12 │ Non-existent row click│ Table    │ HTML attributes do   │ Spec referenced      │ Replaced with native │ RESOLVED │
│     │ event interface      │           │ not provide custom   │ `onRowClick` on      │ `onClick` on         │          │
│     │                      │           │ `onRowClick`.        │ HTMLTableRowElement. │ `Table.Tr`.          │          │
└─────┴──────────────────────┴───────────┴──────────────────────┴──────────────────────┴──────────────────────┴──────────┘
```

---

## 3. Detailed Audit Rationale

### C01 & C03: Eliminating Polymorphic `as` and Inaccessible Interactive Cards

- **Problem:** Dynamic polymorphic `as` breaks TypeScript type checking and autocomplete in consumer code. Furthermore, adding `isInteractive` to a generic `Card` `<div>` produces an inaccessible container that lacks keyboard focusability, an accessible name, and semantic roles.
- **Resolution:** Stripped `as` completely. Removed `isInteractive` from `Card`. If a card is an anchor link, consumers use `<Card asChild><a href="...">...</a></Card>`, cleanly delegating to semantic HTML.

### C02: Eliminating `any` from Public Ref Types

- **Problem:** `initialFocusRef?: React.RefObject<any>` directly violated Phase 2 Rule 10 (Strict TypeScript, zero `any`).
- **Resolution:** Replaced with `React.RefObject<HTMLElement | null>`, providing type safety without leaking untyped handles.

### C04 & C05: Restricting `asChild` to Semantically Safe Boundaries

- **Problem:** Blindly applying `asChild` to `<input>` or `<table>` tags allows consumers to pass children into void input elements or swap table elements for invalid div soup, violating HTML specifications and breaking assistive technology parsers.
- **Resolution:** Removed `asChild` from `Input`, `Table.Root`, `Table.Tr`, `Table.Th`, and `Table.Td`. `asChild` is reserved for components where child delegation is semantically safe (`Button`, `Card.Root`, `Dialog.Trigger`, `Select.Trigger`).

### C06: Standardizing Icon Props on `startIcon` / `endIcon`

- **Problem:** Using `leftIcon` / `rightIcon` does not respect bidirectional (RTL) reading contexts and contradicts the modern standard popularized by mature design systems.
- **Resolution:** Standardized on `startIcon` and `endIcon` across all action and input components.

### C07: Rejecting Ad-hoc Style Override Props

- **Problem:** Exposing `errorBorderColor` and `focusBorderColor` creates component-level CSS injection vectors, contradicting Phase 1 zero-runtime CSS and token-driven theming.
- **Resolution:** Removed ad-hoc color override props. Color changes are handled globally or via scoped CSS variable overrides (`--cl-color-border-def`).

### C08: Strict Generic Typing for Select

- **Problem:** The specification previously claimed `Select<TValue>` was generic, but only accepted string values.
- **Resolution:** Updated the public interface to truly accept `TValue extends string = string`.

### C09: Formalizing `Dialog` as Canonical Name

- **Problem:** Leaving `Modal` and `Dialog` as vague dual exports created confusion about which component was canonical.
- **Resolution:** Codified that **`Dialog` is the canonical component name** (matching W3C WAI-ARIA APG and `<dialog>`), with `Modal` exported as an exact compatibility alias.

### C10: Purging Unscoped `.is-*` CSS Classes

- **Problem:** Classes like `.is-invalid` or `.is-disabled` leak into global CSS namespaces and collide with consumer utility libraries.
- **Resolution:** Enforced the `.cl-*` namespace across all state classes (`.cl-input--invalid`, `.cl-button--loading`, `.cl-badge--pill`).

---

## 4. Final Review Status

All 12 critical contradictions have been audited and resolved. All component specifications are now aligned with the Phase 1 Foundation, ADR-007, Phase 2 Engineering Standards, and Document 01 Universal API Conventions.
