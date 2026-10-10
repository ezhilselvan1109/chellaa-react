---
name: react-component-styling
description: Standards for component file collocation, prop variant mapping, ref forwarding, asChild slot delegation, and className composition.
---

# React Component Styling & Authoring Skill

## 1. Purpose
Governs the strict **6-File Collocated Component Architecture** and component authoring lifecycle in `@chellaa/react`.

## 2. Standard 6-File Collocation Structure
Every component must reside in its own folder:
```text
packages/react/src/components/<ComponentName>/
├── <ComponentName>.tsx          # Implementation & forwardRef / asChild slotting
├── <ComponentName>.types.ts     # TypeScript interfaces and prop definitions
├── <ComponentName>.styles.css   # Scoped CSS in @layer cl-components
├── <ComponentName>.test.tsx     # Vitest & axe-core accessibility tests
├── <ComponentName>.stories.tsx  # Storybook component stories
└── index.ts                     # Component barrel exports
```

## 3. Implementation Rules
1. **Ref Forwarding**: All components must forward clean refs using `React.forwardRef<HTMLElement, ComponentProps>`.
2. **Polymorphic Slot Delegation (`asChild`)**: Support `asChild?: boolean` using `Slot` primitive so consumers can render alternate semantic elements (e.g. `<Button asChild><a href="/home">Home</a></Button>`).
3. **Class Merging**: Merge `.cl-*` classes with consumer `className` using `clsx` or `classNames` utility.
4. **Clean DOM Forwarding**: Never pass private props (`ownerState`, `sx`, `is*` custom flags) down to native DOM elements.

## 4. Validation Commands
- `pnpm --filter @chellaa/react test -- src/components/<ComponentName>/<ComponentName>.test.tsx`
- `pnpm --filter @chellaa/react build`
