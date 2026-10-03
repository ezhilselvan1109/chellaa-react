# Chellaa React — Engineering Standards
## Document 02: React Architecture & Component Standards

**Document Status:** Ready to Freeze  
**Phase:** 2 — Engineering Standards  
**Target Package:** `@chellaa/react`  
**React Versions:** 18.2.0+ & React 19.x  

---

## 1. Executive Summary & Purpose

Chellaa React is built to harness the best of modern React: Concurrent Mode, React Server Components (RSC), deterministic Server-Side Rendering (SSR), and forward compatibility with React 19.

This document establishes the authoritative standard for component authoring, hook usage, ref forwarding, state modeling, controlled/uncontrolled patterns, SSR hydration safety, and intentional RSC client boundaries.

---

## 2. Functional Component Baseline

### 2.1 Class Components Prohibited
- All components in Chellaa React are **strictly functional components**.
- Class components are **prohibited**.

### 2.2 Component Declaration & DisplayName
Every component must define a clear, non-minified `displayName` for React DevTools and error stack traces:

```tsx
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    // Implementation
  }
);

Button.displayName = "Button";
```

---

## 3. React 18 and React 19 Forward Compatibility

A key requirement in Chellaa React is seamless operation across **both React 18.2+ and React 19**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                      React 18 vs 19 Bridge Strategy                    │
├─────────────────────┬────────────────────┬─────────────────────────────┤
│ Feature             │ React 18           │ React 19                    │
├─────────────────────┼────────────────────┼─────────────────────────────┤
│ Ref Handling        │ React.forwardRef   │ ref passed as standard prop │
│ Hook Cleanup        │ Synchronous void   │ Ref cleanup functions       │
│ Server Components   │ Client boundaries  │ Full RSC Actions & Directives│
│ Unique IDs          │ React.useId()      │ React.useId()               │
└─────────────────────┴────────────────────┴─────────────────────────────┘
```

### 3.1 Dual-Compatible Ref Pattern
In React 18, passing `ref` requires `React.forwardRef`. In React 19, `forwardRef` is deprecated and will eventually be phased out in favor of `ref` as a direct prop.
- **Chellaa React Rule:** Components use a unified `forwardRef` wrapper that accepts `ref` as a prop in React 19 while maintaining `React.forwardRef` signature for React 18.
- Components must cleanly attach the forwarded ref to the primary interactive root DOM element.

### 3.2 Ref Merging (`useMergeRefs`)
When a component requires its own internal DOM ref (for measurements, focus management, or keyboard tracking) while simultaneously receiving an external consumer `ref`, developers **must** use `useMergeRefs`:

```tsx
import { useMergeRefs } from "../hooks/useMergeRefs";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, externalRef) => {
  const internalRef = React.useRef<HTMLButtonElement>(null);
  const mergedRef = useMergeRefs(internalRef, externalRef);

  return <button ref={mergedRef} {...props} />;
});
```

---

## 4. Controlled vs. Uncontrolled Component Standard

Every interactive component that maintains state (`Input`, `Checkbox`, `RadioGroup`, `Select`, `Dialog`, `Tabs`, `Accordion`) must support **both** controlled and uncontrolled modes using a standardized API convention.

```
┌────────────────────────────────────────────────────────────────────────┐
│                     Controlled vs. Uncontrolled API                    │
├───────────────────┬────────────────────────────────────────────────────┤
│ Mode              │ Prop Contract                                      │
├───────────────────┼────────────────────────────────────────────────────┤
│ Uncontrolled      │ defaultValue?: T                                   │
│                   │ onValueChange?: (value: T) => void                 │
├───────────────────┼────────────────────────────────────────────────────┤
│ Controlled        │ value: T                                           │
│                   │ onValueChange: (value: T) => void                  │
└───────────────────┴────────────────────────────────────────────────────┘
```

### 4.1 The `useControllableState` Hook (Mandated)
Developers must never author manual `if (props.value !== undefined)` conditionals in component render bodies. Instead, they must use the battle-tested `useControllableState` hook:

```tsx
const [value, setValue] = useControllableState({
  value: props.value,
  defaultValue: props.defaultValue ?? fallbackDefault,
  onChange: props.onValueChange,
});
```

- If `props.value` is defined, the component is controlled.
- If `props.value` is `undefined`, the component manages its own internal state using `defaultValue`.
- Calling `setValue(next)` automatically updates internal state (when uncontrolled) and safely invokes `onValueChange` without duplicate re-renders.

---

## 5. Event Handling & Composition Standard

### 5.1 Event Handler Chaining (`composeEventHandlers`)
When a component has an internal event handler (e.g., closing a dropdown on Escape) and the consumer also provides an `onKeyDown` prop, the component must compose them safely.
- **Rule:** If the consumer calls `event.preventDefault()`, the library's internal handler must **not** execute!

```typescript
export function composeEventHandlers<E extends React.SyntheticEvent | Event>(
  originalHandler?: (event: E) => void,
  ourHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: E) {
    originalHandler?.(event);

    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      ourHandler?.(event);
    }
  };
}
```

---

## 6. Composition & The `asChild` Architecture

### 6.1 Avoiding Monolithic Prop Bloat
Chellaa React strongly prefers **Compound Components** over monolithic components with 40 props:

```tsx
// ❌ MONOLITHIC ANTI-PATTERN:
<Dialog 
  title="Edit Profile"
  description="Make changes below"
  confirmText="Save"
  cancelText="Cancel"
  isOpen={isOpen}
  onConfirm={handleSave}
/>

// ✅ COMPOUND COMPOSABLE STANDARD:
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger asChild>
    <Button>Edit Profile</Button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Content>
      <Dialog.Title>Edit Profile</Dialog.Title>
      <Dialog.Description>Make changes below</Dialog.Description>
      <Dialog.Close asChild>
        <Button variant="outline">Cancel</Button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog>
```

### 6.2 The `asChild` Slot Implementation
When `asChild={true}` is passed, the component does not render its default DOM node. Instead, it clones its direct child using the internal `Slot` primitive, merging:
1. `className` (concatenating the library's `.cl-*` classes with the child's classes).
2. `style` (merging inline CSS properties).
3. Event handlers (composing via `composeEventHandlers`).
4. Refs (merging via `useMergeRefs`).

---

## 7. Strict Hook Disciplines: When NOT to Use Hooks

Premature and unnecessary hook usage is the #1 cause of React performance regressions and spaghetti code. Chellaa React strictly enforces the following prohibitions:

### 7.1 When NOT to use `useEffect`
- **Prohibited for Derived State:** Never calculate a value in `useEffect` and write it to state. Compute it synchronously during render:
  ```tsx
  // ❌ PROHIBITED:
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  // ✅ PREFERRED:
  const fullName = `${firstName} ${lastName}`;
  ```
- **Prohibited for User Actions:** If an action occurs in response to a button click, execute it in `onClick`, not in a `useEffect` watching a boolean flag.
- **Allowed `useEffect` usages:** Subscribing to external DOM events (`window.addEventListener`), synchronizing with browser APIs (`matchMedia`, `ResizeObserver`), or executing layout animations.

### 7.2 When NOT to use `useMemo` & `useCallback`
- Do not wrap primitive values, simple string concatenations, or small array transforms in `useMemo`. The memory overhead of closures and dependency array comparisons exceeds the computation cost.
- **When `useMemo` is required:**
  1. Passing an object or function down through React Context to prevent unnecessary consumer re-renders.
  2. Expensive algorithms (e.g., filtering a 5,000-item table).
- **When `useCallback` is required:** Passing callbacks to memoized (`React.memo`) child components.

### 7.3 When NOT to use Context
- Never use React Context for transient, high-frequency state updates (e.g., mouse coordinates, scroll positions, keystroke inputs).
- Use Context strictly for shared widget hierarchy state (e.g., `DialogContext`, `RadioGroupContext`, `ThemeContext`).

---

## 8. Server-Side Rendering (SSR) & Hydration Safety

### 8.1 No Browser APIs in Render
- Components must **never** reference `window`, `document`, `navigator`, or `localStorage` during initial render passes.
- Direct DOM access must be placed inside `useEffect` or an SSR-safe `useIsomorphicLayoutEffect`.

### 8.2 Safe Layout Effects (`useIsomorphicLayoutEffect`)
Using `useLayoutEffect` directly causes a noisy React console warning during SSR. Chellaa React components must always import `useIsomorphicLayoutEffect`:

```typescript
// packages/react/src/hooks/useIsomorphicLayoutEffect.ts
import { useEffect, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect = 
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
```

### 8.3 Stable IDs with `useId`
- All DOM associations (`id`, `aria-labelledby`, `aria-describedby`, `htmlFor`) must utilize React's native `useId()` hook.
- Never generate IDs via `Math.random()` or module-level incrementing counters.

### 8.4 React Server Components (RSC) & Intentional Client Boundaries
- **RSC-Compatible by Default:** Chellaa React components must remain compatible with React Server Components by default.
- **Prohibition of Global Client Banners:** A library-wide, global `"use client"` banner applied across the entire package build is **strictly prohibited**. A blunt global banner forces all components to become client components, degrading consumer RSC performance and violating Next.js App Router architectural boundaries.
- **Intentional Boundary Definition:**
  - Pure layout, presentation, and typography components (e.g., `Box`, `Stack`, `Grid`, `Container`, `Heading`) should remain Server Components where possible.
  - Interactive components that utilize hooks (`useState`, `useEffect`, `useId`), attach DOM event listeners (`onClick`, `onKeyDown`), or access browser APIs must explicitly declare the `"use client";` directive at their individual module boundary.

### 8.5 Real RSC & SSR Validation Requirements
Passing unit tests in a jsdom environment does **not** prove RSC compatibility. Every component must be validated in a real Next.js App Router environment inside `apps/test-consumer`:
1. **Server Component Consumption:** Pure layout components must render inside an RSC page without triggering `"use client"` requirement errors.
2. **Client Component Boundary Safety:** Interactive components rendered inside a client boundary must not leak client requirements into ancestor Server Components.
3. **Zero Hydration Mismatches:** Rendered server HTML must match client hydrated DOM character-for-character.
4. **CSS Delivery Integrity:** Automatic styling must load correctly whether the component is rendered as an RSC or within a Client Component.

---

## 9. Portals & Overlay Stacking Standard

### 9.1 The `Portal` Primitive
Floating surfaces (`Dialog`, `Popover`, `Tooltip`, `Menu`) must render into a React Portal attached to `document.body` (or a consumer-specified container node via `container` prop).

### 9.2 Theme Context Preservation in Portals
Because portals move DOM nodes outside of their normal DOM parent tree:
- The `Portal` component must ensure that active CSS variables and theme attributes (`data-theme`) cascade properly into the portaled container.
- If a subtree has an active `data-theme="dark"`, the portal must replicate that attribute on its container or render within the themed sub-root.

---

## 10. Summary Matrix: What Developers Must Do vs. Never Do

```
┌────────────────────────────────────────────────────────────────────────┐
│                          React Rule Summary                            │
├───────────────────────────────────┬────────────────────────────────────┤
│ MUST DO                           │ NEVER DO                           │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Use functional components only. │ • Never use class components.      │
│ • Assign explicit displayName.    │ • Never access window/document in  │
│ • Use useControllableState for    │   render passes.                   │
│   stateful components.            │ • Never apply a global "use client"│
│ • Merge refs via useMergeRefs.    │   banner to the entire build.      │
│ • Define "use client" boundaries  │ • Never use useEffect for derived  │
│   intentionally per component.    │   state calculations.              │
│ • Validate RSC in real App Router.│ • Never hardcode random DOM IDs.   │
│ • Use composeEventHandlers for    │ • Never use useLayoutEffect        │
│   internal/external handlers.     │   directly (use isomorphic hook).  │
│ • Support asChild for composition.│ • Never clobber consumer className │
│ • Forward all HTML attributes.    │   or style props.                  │
└───────────────────────────────────┴────────────────────────────────────┘
```
