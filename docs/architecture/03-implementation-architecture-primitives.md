# Chellaa React — Implementation Architecture

## Document 03: Internal Shared Primitives & Foundation Utilities

**Document Status:** 🟢 COMPLETE & SPECIFIED  
**Phase:** 14 & 15 — Implementation Architecture & Foundation Utilities  
**Date:** 2026-10-03  
**Target Package:** `@chellaa/react`

---

## 1. Executive Summary

To maintain clean separation of concerns, eliminate code duplication, and guarantee zero-runtime bloat, Chellaa React defines a minimal, vetted set of internal foundation primitives.

Rather than adopting heavy monolithic headless libraries, Chellaa React either implements micro-utilities natively or encapsulates minimal, focused utilities.

This document audits the required primitives for the 7 foundation components (`Button`, `Input`, `Select`, `Dialog`, `Card`, `Badge`, `Table`).

---

## 2. Shared Primitives Audit Matrix

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                 Internal Primitives Audit Matrix                                                 │
├──────────────────────────┬──────────────┬──────────────────┬─────────────────┬─────────────────┬─────────────────────────────────┤
│ Primitive / Utility      │ Required For │ Ownership        │ Dependency      │ SSR Safe?       │ Test Requirements               │
├──────────────────────────┼──────────────┼──────────────────┼─────────────────┼─────────────────┼─────────────────────────────────┤
│ Slot                     │ Button, Card,│ Internal Native  │ None (Internal) │ Yes             │ Props merging, ref forwarding,  │
│ (asChild composition)    │ Badge, Dialog│                  │                 │                 │ event handler chaining          │
├──────────────────────────┼──────────────┼──────────────────┼─────────────────┼─────────────────┼─────────────────────────────────┤
│ Portal                   │ Dialog,      │ Internal Native  │ None (DOM API)  │ Yes (Hydration- │ Renders in document.body only   │
│                          │ Select       │                  │                 │ safe mount)     │ after client mount              │
├──────────────────────────┼──────────────┼──────────────────┼─────────────────┼─────────────────┼─────────────────────────────────┤
│ useControllableState     │ Select,      │ Internal Native  │ None (React)    │ Yes             │ Uncontrolled default, controlled│
│                          │ Dialog, Input│                  │                 │                 │ override, onChange firing       │
├──────────────────────────┼──────────────┼──────────────────┼─────────────────┼─────────────────┼─────────────────────────────────┤
│ useMergeRefs             │ Button, Input│ Internal Native  │ None (React)    │ Yes             │ Callback refs, object refs,     │
│                          │ Select,Dialog│                  │                 │                 │ cleanup handling                │
├──────────────────────────┼──────────────┼──────────────────┼─────────────────┼─────────────────┼─────────────────────────────────┤
│ composeEventHandlers     │ All Comp.    │ Internal Native  │ None            │ Yes             │ defaultPrevented check, chained │
│                          │              │                  │                 │                 │ handler execution order         │
├──────────────────────────┼──────────────┼──────────────────┼─────────────────┼─────────────────┼─────────────────────────────────┤
│ useId                    │ Input, Dialog│ React Core       │ React 18+ useId │ Yes (Native)    │ Stable hydration ID match       │
│                          │ Select       │ Wrapper          │                 │                 │                                 │
├──────────────────────────┼──────────────┼──────────────────┼─────────────────┼─────────────────┼─────────────────────────────────┤
│ classNames               │ All Comp.    │ Internal Native  │ None (replaces  │ Yes             │ Conditional strings, falsy,     │
│ (clsx alternative)       │              │                  │ clsx)           │                 │ space trimming                  │
├──────────────────────────┼──────────────┼──────────────────┼─────────────────┼─────────────────┼─────────────────────────────────┤
│ FocusScope (Trap)        │ Dialog, Modal│ Internal Native  │ None            │ Yes (Client-    │ Tab wrap-around, initial focus, │
│                          │              │                  │                 │ only hook)      │ focus restoration on exit       │
├──────────────────────────┼──────────────┼──────────────────┼─────────────────┼─────────────────┼─────────────────────────────────┤
│ DismissableLayer         │ Dialog,      │ Internal Native  │ None            │ Yes (Client-    │ Escape key dismissal, pointer-  │
│                          │ Select       │                  │                 │ only hook)      │ down-outside dismissal          │
└──────────────────────────┴──────────────┴──────────────────┴─────────────────┴─────────────────┴─────────────────────────────────┘
```

---

## 3. Detailed Specification of Foundation Primitives

### 3.1 `Slot` (The `asChild` Primitive)

- **Purpose:** Enables polymorphism without dynamic `as` props by merging props, event handlers, and refs onto its immediate child element.
- **API:**
  ```tsx
  export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
  }
  export const Slot = React.forwardRef<HTMLElement, SlotProps>(...);
  ```
- **Ownership:** Native Chellaa React utility (`src/primitives/Slot.tsx`).
- **SSR Behavior:** Fully isomorphic. Renders identically on server and client.
- **Test Requirements:**
  - Forward ref to child.
  - Merge classNames (e.g. `cl-button` + child class).
  - Chain `onClick` without overwriting child handler.
  - Respect `event.defaultPrevented`.

### 3.2 `Portal`

- **Purpose:** Renders overlay children into a designated DOM container (default: `document.body`) outside the parent DOM hierarchy to bypass `overflow: hidden` and z-index stacking context restrictions.
- **API:**
  ```tsx
  export interface PortalProps {
    children: React.ReactNode;
    container?: HTMLElement | null;
  }
  export function Portal({
    children,
    container,
  }: PortalProps): React.ReactPortal | null;
  ```
- **SSR Behavior:** Returns `null` on the server and during initial hydration pass; mounts into DOM container in `useEffect` to prevent hydration mismatches.
- **Test Requirements:**
  - Returns `null` before mount.
  - Renders child into `document.body` after mount.
  - Removes node on unmount.

### 3.3 `useControllableState`

- **Purpose:** Synchronizes state between controlled mode (`value` + `onChange`) and uncontrolled mode (`defaultValue`), providing a unified state getter and setter.
- **API:**
  ```tsx
  export function useControllableState<T>({
    value,
    defaultValue,
    onChange,
  }: {
    value?: T;
    defaultValue?: T;
    onChange?: (value: T) => void;
  }): [T, (nextValue: T | ((prev: T) => T)) => void];
  ```
- **SSR Behavior:** Pure React state hook; isomorphic and safe for SSR.
- **Test Requirements:**
  - Operates as uncontrolled when `value` is `undefined`.
  - Operates as controlled when `value` is defined, updating only when `value` prop changes.
  - Calls `onChange` on state updates with previous value parity.

### 3.4 `useMergeRefs`

- **Purpose:** Combines multiple React refs (callback refs and `RefObject`s) into a single ref callback.
- **API:**
  ```tsx
  export function useMergeRefs<T>(
    ...refs: (React.Ref<T> | undefined)[]
  ): React.RefCallback<T>;
  ```
- **SSR Behavior:** Pure hook; safe for SSR.
- **Test Requirements:**
  - Correctly assigns DOM node to both object ref and callback ref.
  - Handles nullification on unmount.

### 3.5 `composeEventHandlers`

- **Purpose:** Chains consumer event handlers with internal component event handlers while respecting `event.preventDefault()`.
- **API:**
  ```tsx
  export function composeEventHandlers<E extends React.SyntheticEvent>(
    originalHandler?: (event: E) => void,
    ourHandler?: (event: E) => void,
    { checkForDefaultPrevented = true } = {},
  ): (event: E) => void;
  ```
- **SSR Behavior:** Pure function; zero SSR footprint.
- **Test Requirements:**
  - Invokes `originalHandler` first.
  - Bypasses `ourHandler` if `originalHandler` called `event.preventDefault()`.

### 3.6 `classNames` (Zero-Dependency Class Composer)

- **Purpose:** Composes conditional CSS classes into a sanitized string with 0 runtime dependencies (eliminates `clsx`).
- **API:**
  ```tsx
  export function classNames(
    ...inputs: (string | boolean | null | undefined)[]
  ): string;
  ```
- **SSR Behavior:** Pure string formatting function.
- **Test Requirements:**
  - Drops false, null, undefined.
  - Combines multiple string classes with single whitespace separation.

---

## 4. Primitives Implementation Directory Topology

Within `packages/react/src/`:

```text
src/
├── primitives/
│   ├── Slot.tsx
│   ├── Portal.tsx
│   └── index.ts
├── hooks/
│   ├── useControllableState.ts
│   ├── useMergeRefs.ts
│   ├── useFocusTrap.ts
│   ├── useDismissable.ts
│   └── index.ts
└── utils/
    ├── composeEventHandlers.ts
    ├── classNames.ts
    └── index.ts
```

This structure is verified as minimal, completely free of runtime dependencies, and tailored specifically to the requirements of the 7 foundation components.
