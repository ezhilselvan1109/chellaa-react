# Chellaa React — Engineering Standards

## Document 07: Code Quality, Linting & Maintainability Standards

**Document Status:** Ready to Freeze  
**Phase:** 2 — Engineering Standards  
**Target Package:** `@chellaa/react`  
**Tooling Baseline:** ESLint, Prettier, Stylelint, TypeScript Strict

---

## 1. Executive Summary & Purpose

A component library cannot endure if its codebase is a patchwork of idiosyncratic styles, premature abstractions, and brittle hacks. Code in Chellaa React must be written for the engineer who maintains it two years from now.

This document establishes the official code quality standards: ESLint configurations, Prettier rules, import ordering, naming taxonomy, error handling conventions, the Rule of Three for abstractions, and automated CI quality gates.

---

## 2. Tooling Configuration & Zero-Warning Policy

### 2.1 The Zero-Warning Mandate

In Chellaa React CI pipelines, warnings are treated as fatal errors:
`pnpm lint --max-warnings 0`
No code may be merged to `main` with active lint warnings or TypeScript compiler notices.

### 2.2 ESLint Core Ruleset

The monorepo uses ESLint Flat Config (`eslint.config.js`) extending:

- `@typescript-eslint/recommended-type-checked`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-jsx-a11y`
- `eslint-config-prettier`

Critical rules enforced as `error`:

- `@typescript-eslint/no-explicit-any: "error"`
- `@typescript-eslint/no-floating-promises: "error"`
- `react-hooks/rules-of-hooks: "error"`
- `react-hooks/exhaustive-deps: "error"`
- `jsx-a11y/alt-text: "error"`
- `jsx-a11y/aria-props: "error"`
- `jsx-a11y/role-has-required-aria-props: "error"`

### 2.3 Prettier Formatting Baseline

Code formatting is strictly handled by Prettier. Developers never debate whitespace in code reviews.

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

---

## 3. Naming Conventions Taxonomy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Universal Naming Taxonomy                       │
├─────────────────────┬───────────────┬──────────────────────────────────┤
│ Identifier Type     │ Casing        │ Canonical Example                │
├─────────────────────┼───────────────┼──────────────────────────────────┤
│ React Components    │ PascalCase    │ Button, DialogBackdrop           │
├─────────────────────┼───────────────┼──────────────────────────────────┤
│ Interfaces / Types  │ PascalCase    │ ButtonProps, ThemeMode           │
├─────────────────────┼───────────────┼──────────────────────────────────┤
│ Custom Hooks        │ camelCase     │ useControllableState, useTheme   │
├─────────────────────┼───────────────┼──────────────────────────────────┤
│ Functions & Methods │ camelCase     │ composeEventHandlers, mergeRefs  │
├─────────────────────┼───────────────┼──────────────────────────────────┤
│ Global Constants    │ UPPER_SNAKE   │ BUTTON_SIZES, DEFAULT_THEME      │
├─────────────────────┼───────────────┼──────────────────────────────────┤
│ Boolean Flags       │ is/has prefix │ isDisabled, isLoading, hasPopup  │
├─────────────────────┼───────────────┼──────────────────────────────────┤
│ CSS Classes         │ kebab-case    │ .cl-button, .cl-dialog__backdrop │
├─────────────────────┼───────────────┼──────────────────────────────────┤
│ CSS Custom Props    │ kebab-case    │ --cl-color-primary-base          │
└─────────────────────┴───────────────┴──────────────────────────────────┘
```

---

## 4. Import Ordering Standard

To maintain clean Git diffs and eliminate circular dependencies, import statements must strictly follow a 5-tier ordered grouping:

```typescript
// Tier 1: Node.js standard built-ins (prefixed with node:)
import * as path from "node:path";

// Tier 2: External third-party libraries (React first)
import * as React from "react";
import { useCallback, useId } from "react";

// Tier 3: Internal monorepo workspace packages
import { createTheme } from "@chellaa/react";

// Tier 4: Sibling & parent internal relative modules
import { useControllableState } from "../../hooks/useControllableState";
import type { ButtonProps, ButtonVariant } from "./Button.types";

// Tier 5: Scoped component CSS styles (always last)
import "./Button.styles.css";
```

Enforced automatically via `eslint-plugin-import` order rules.

---

## 5. Commenting & TSDoc Standards

### 5.1 TSDoc on Public APIs (Mandatory)

TSDoc is **mandatory for all public API symbols**. This ensures rich IDE intellisense, autocomplete documentation, and automated API reference generation.

**Mandatory Public TSDoc Scope:**

- Exported React components and compound sub-components
- Exported component props interfaces and property fields
- Exported custom hooks and their return objects
- Exported theme APIs and design token utilities
- Exported public types and enum-like unions

````typescript
/**
 * Interactive button component supporting multiple visual variants,
 * accessible loading states, and polymorphic slot composition (`asChild`).
 *
 * @param props - Configuration props including visual variant, size, and loading state.
 * @param ref - Forwarded DOM ref to the underlying HTMLButtonElement.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={() => console.log('Clicked')}>
 *   Save Changes
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(...);
````

### 5.2 Internal Implementation Symbols Policy

Internal implementation helpers, unexported utilities, and local variables **do not require TSDoc boilerplate**.

Do NOT write meaningless boilerplate comments such as:

```typescript
// ❌ PROHIBITED BOILERPLATE:
/** Button component */
export function Button() {}

/** Returns true */
function isTrue() {
  return true;
}
```

Internal comments are expected only when explaining non-obvious algorithms, edge-case browser workarounds, or accessibility mechanics.

### 5.3 Inline Code Comments Policy

- **Never state the obvious:**
  ```typescript
  // ❌ BAD:
  // increment count by 1
  count += 1;
  ```
- **Document "Why", not "What":** Inline comments are reserved strictly for explaining non-obvious algorithmic decisions, W3C APG specifications, or browser quirk workarounds:
  ```typescript
  // ✅ GOOD:
  // Safari on iOS does not register button clicks if user touches within 4px of edge;
  // expand hit-slop target via pseudo-element.
  ```

---

## 6. Error Handling & Invariant Assertions

### 6.1 Descriptive Error Messages

Chellaa React error messages must always be prefixed with `[Chellaa]` and guide the developer toward the immediate fix:

```typescript
export function invariant(
  condition: boolean,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(`[Chellaa]: ${message}`);
  }
}

// Usage in compound component:
invariant(
  context !== null,
  "<Dialog.Content> must be rendered within a <Dialog> root component.",
);
```

---

## 7. Abstraction Disciplines & The "Rule of Three"

### 7.1 Prohibition of Premature Abstraction

Engineers often introduce complex abstraction layers to avoid repeating 3 lines of code. In Chellaa React, **premature abstraction is strictly prohibited**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Abstraction Guardrails                          │
├───────────────────────────────────┬────────────────────────────────────┤
│ Guideline                         │ Engineering Enforcement            │
├───────────────────────────────────┼────────────────────────────────────┤
│ The Rule of Three                 │ Do NOT create a shared utility or  │
│                                   │ hook until identical logic is used │
│                                   │ in 3 distinct components.          │
├───────────────────────────────────┼────────────────────────────────────┤
│ Duplication vs. Wrong Abstraction │ Duplication is far cheaper than    │
│                                   │ the wrong abstraction.             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Flat & Explicit                   │ Prefer explicit, readable code over│
│                                   │ clever, unreadable 1-liners.       │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 8. Cyclomatic Complexity & File Size Limits

- **Function Complexity Ceiling:** No function or hook may exceed a cyclomatic complexity of **10** (enforced by ESLint `complexity: ["error", 10]`).
- **File Length Limit:** Component implementation files should remain under **300 lines**. If a component exceeds 300 lines, extract internal sub-components or utility hooks into separate collocated files.

---

## 9. CI Quality Gates Sequence

Before any branch can be merged to `main`, the CI pipeline executes the non-negotiable **Five Gates of Quality**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                     Five Gates of Quality Sequence                     │
├────────────────────────────────────────────────────────────────────────┤
│ Gate 1: Typecheck       pnpm typecheck (Zero TS errors across repo)    │
│        ↓                                                               │
│ Gate 2: Code Lint       pnpm lint --max-warnings 0 (ESLint + Stylelint)│
│        ↓                                                               │
│ Gate 3: Formatting      pnpm format:check (Prettier validation)        │
│        ↓                                                               │
│ Gate 4: Test Suite      pnpm test (Vitest unit, a11y, & keyboard tests)│
│        ↓                                                               │
│ Gate 5: Production Build pnpm build (tsup compilation & attw check)    │
└────────────────────────────────────────────────────────────────────────┘
```
