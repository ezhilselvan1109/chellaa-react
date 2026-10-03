# Chellaa React — Engineering Standards
## Document 01: TypeScript Standards

**Document Status:** Ready to Freeze  
**Phase:** 2 — Engineering Standards  
**Target Package:** `@chellaa/react`  
**TypeScript Version:** >= 5.0  

---

## 1. Executive Summary & Purpose

TypeScript is an authoritative architectural contract in Chellaa React. Every type definition published by `@chellaa/react` directly impacts application developers, enterprise IDE performance, build times, and compile-time safety.

This document codifies strict, non-negotiable TypeScript standards for all component implementations, hooks, utilities, and theme engines.

---

## 2. Compiler Configuration Baseline

All packages and applications in the repository inherit from a centralized base TypeScript configuration (`tsconfig.base.json`).

### 2.1 Compiler Options Matrix

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "allowUnreachableCode": false,
    "isolatedDeclarations": true,
    "declaration": true,
    "declarationMap": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### 2.2 Rationale for Critical Flags
- **`isolatedDeclarations: true`:** Enforces explicit type annotations on exported boundaries. Enables lightning-fast declaration emitting across monorepo builds and guarantees clean, readable `.d.ts` files for consumers.
- **`noUncheckedIndexedAccess: true`:** Treats dictionary and array index lookups as `T | undefined`, eliminating subtle runtime `Cannot read property of undefined` crashes.
- **`exactOptionalPropertyTypes: true`:** Distinguishes between a property being omitted versus explicitly passed as `undefined` (`{ prop?: string }` cannot be passed `{ prop: undefined }`).

---

## 3. Type Primitives & Strictness

### 3.1 Strict Prohibition of `any`
- The `any` type is **strictly prohibited** in any source code, test utility, or type declaration.
- The use of `any` triggers an immediate CI failure via ESLint rule `@typescript-eslint/no-explicit-any: error`.
- If a value has an unknown shape, developers **must** use `unknown` and narrow it via runtime type guards:

```typescript
// ❌ PROHIBITED:
function parseValue(value: any) {
  return value.toUpperCase();
}

// ✅ PREFERRED:
function parseValue(value: unknown): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  throw new TypeError(`Expected string, received ${typeof value}`);
}
```

### 3.2 Exhaustive Type Checking with `never`
Whenever handling discriminated unions, developers must implement exhaustive checking using `never`:

```typescript
type ButtonVariant = "solid" | "outline" | "ghost" | "subtle" | "link";

function getVariantClassName(variant: ButtonVariant): string {
  switch (variant) {
    case "solid":
      return "cl-button--solid";
    case "outline":
      return "cl-button--outline";
    case "ghost":
      return "cl-button--ghost";
    case "subtle":
      return "cl-button--subtle";
    case "link":
      return "cl-button--link";
    default: {
      // Compile-time check: if a new variant is added, this line errors!
      const _exhaustiveCheck: never = variant;
      return _exhaustiveCheck;
    }
  }
}
```

---

## 4. Interfaces vs. Type Aliases

Chellaa React enforces clear, deterministic rules on when to use `interface` versus `type`:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      Interface vs. Type Rulebook                       │
├────────────────────┬───────────┬───────────────────────────────────────┤
│ Structure Type     │ Keyword   │ Rationale                             │
├────────────────────┼───────────┼───────────────────────────────────────┤
│ Component Props    │ interface │ Supports declaration merging, clear   │
│                    │           │ extends hierarchies, better IDE docs. │
├────────────────────┼───────────┼───────────────────────────────────────┤
│ Theme Tokens       │ interface │ Allows consumer multi-brand merging.  │
├────────────────────┼───────────┼───────────────────────────────────────┤
│ Unions / Literals  │ type      │ Interfaces cannot model unions.       │
├────────────────────┼───────────┼───────────────────────────────────────┤
│ Intersections      │ type      │ Utility compositions.                 │
├────────────────────┼───────────┼───────────────────────────────────────┤
│ Tuples / Mappings  │ type      │ Array shapes, mapped types.           │
└────────────────────┴───────────┴───────────────────────────────────────┘
```

### 4.1 Component Props Rule
Component props must always be declared as an exported `interface` ending in `Props`:

```typescript
// ✅ PREFERRED:
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ComponentSize;
  colorScheme?: SemanticColorIntent;
  isLoading?: boolean;
  isDisabled?: boolean;
  asChild?: boolean;
}
```

---

## 5. Unions and Discriminated Unions

### 5.1 Enums are Strictly Prohibited
TypeScript `enum` constructs are **prohibited**. Enums generate bloated, non-standard runtime JavaScript objects and have known typing quirks.
- **Rule:** Use `const` object maps or string union types:

```typescript
// ❌ PROHIBITED:
export enum ButtonSize {
  Small = "sm",
  Medium = "md",
  Large = "lg",
}

// ✅ PREFERRED:
export const BUTTON_SIZES = ["sm", "md", "lg"] as const;
export type ButtonSize = (typeof BUTTON_SIZES)[number];
```

### 5.2 Discriminated Unions for Mutually Exclusive States
When a component cannot logically exist in two states simultaneously, enforce mutual exclusion via discriminated unions:

```typescript
// ✅ PREFERRED: Loading state contract
export type ButtonContentProps =
  | {
      isLoading: true;
      loadingText?: string;
      children?: React.ReactNode;
    }
  | {
      isLoading?: false;
      loadingText?: never;
      children: React.ReactNode;
    };
```

---

## 6. Generics & Type Inference

### 6.1 Generic Component Design
Complex data-driven components (`Select`, `Combobox`, `Table`, `Tabs`) must be generic to preserve consumer data types without unsafe type assertions.

#### Rules for Generics:
1. **Meaningful Parameter Names:** Use descriptive names (`TValue`, `TOption`, `TData`) rather than opaque single-letter identifiers (`T`, `K`, `U`).
2. **Sensible Defaults:** Always provide a standard fallback constraint:

```typescript
export interface SelectProps<TValue = string> {
  value?: TValue;
  defaultValue?: TValue;
  onValueChange?: (value: TValue) => void;
  options: ReadonlyArray<{ label: string; value: TValue }>;
}
```

3. **Type Inference First:** Design APIs such that the consumer rarely has to specify generic arguments manually:
   ```tsx
   // Consumer gets automatic type inference of value as number:
   <Select options={[{ label: "One", value: 1 }]} onValueChange={(val) => console.log(val.toFixed(2))} />
   ```

---

## 7. Component Props & Polymorphic Types

### 7.1 The `asChild` Pattern (Mandated)
Chellaa React **strictly prohibits** dynamic polymorphic `as` props (e.g., `<Button as="a" href="..." />` or `<Button as={NextLink} />`).

#### Why Dynamic `as` is Prohibited:
1. Causes catastrophic TypeScript compile lag and memory leaks due to recursive generic prop resolution.
2. Clutters IDE intellisense with thousands of irrelevant DOM attributes.
3. Leads to broken ref-forwarding and property clobbering at runtime.

#### The Mandated `asChild` Architecture:
Chellaa React components support composition via the `asChild` boolean prop, delegating rendering to the direct child element while merging props, event handlers, and refs:

```typescript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** If true, the button will delegate rendering to its immediate child element */
  asChild?: boolean;
}

// Consumer usage:
<Button asChild variant="primary">
  <a href="/login">Log In</a>
</Button>
```

---

## 8. Event Handlers and Ref Types

### 8.1 Event Handler Typing
- Event handler props must explicitly type the event parameter using React's synthetic event system:
  - Mouse: `React.MouseEvent<HTMLElement>`
  - Keyboard: `React.KeyboardEvent<HTMLElement>`
  - Form Change: `React.ChangeEvent<HTMLInputElement>`
  - Focus: `React.FocusEvent<HTMLElement>`
- Custom value change callbacks must pass clean values, not synthetic events:
  - `onValueChange?: (value: string) => void;`

### 8.2 Ref Typing
- Forward-compatible ref types must support both React 18 and React 19:
  ```typescript
  export type ComponentRef<T extends HTMLElement> = React.Ref<T>;
  ```

---

## 9. Type Assertions & Escape Hatches

### 9.1 Non-Null Assertion Operator (`!`)
- The non-null assertion operator `!` is **prohibited** in all production component code.
- If a value is guaranteed to exist at runtime (e.g. an element fetched via DOM query or context hook), use an explicit invariant assertion utility:

```typescript
// ❌ PROHIBITED:
const ctx = useContext(ThemeContext)!;

// ✅ PREFERRED:
const ctx = useThemeContext(); // Throws descriptive error if outside provider
```

### 9.2 The `as` Keyword
- `as` type casting should be avoided wherever possible.
- When transforming objects or parsing JSON, use type guards or Zod/schema validation instead of blunt `as T` casting.
- `as const` is explicitly permitted and encouraged for literal arrays and tuples.

---

## 10. Public vs. Internal Type Boundaries

Every component directory contains `Component.types.ts`.

```
Component/
├── Component.types.ts  # Types source of truth
└── index.ts            # Public export boundary
```

### 10.1 Public Exports Checklist
From `Component/index.ts` and root `packages/react/src/index.ts`:
- **Must Export:**
  - Component primary props interface: `export type { ButtonProps } from './Button.types';`
  - Component variant / option types: `export type { ButtonVariant, ButtonSize } from './Button.types';`
- **Must NOT Export:**
  - Internal helper types (`ButtonState`, `InternalButtonContext`)
  - Intermediate utility types (`Prettify`, `AnyRecord`)

### 10.2 TSDoc Scope & Documentation Standards

#### Mandatory Public API Scope
TSDoc is **mandatory for public API symbols**:
- Exported React components (`Button`, `Dialog`)
- Exported component props interfaces (`ButtonProps`)
- Exported custom hooks (`useTheme`, `useControllableState`)
- Exported utilities (`createTheme`, `composeEventHandlers`)
- Exported public types and unions (`ButtonVariant`, `ThemeConfig`)
- Exported theme APIs

#### Meaningful Documentation Mandate
Do **not** write meaningless boilerplate comments such as:
```typescript
// ❌ PROHIBITED: Meaningless boilerplate
/** Button component */
export function Button() {}
```

Prefer meaningful, actionable documentation describing:
- **Purpose and Behavior:** What the component or prop accomplishes.
- **Supported Values & Defaults:** Expected inputs and fallback states.
- **Accessibility Impact:** Roles, ARIA attributes, and keyboard behavior.
- **Controlled / Uncontrolled Semantics:** How value synchronization behaves.
- **Constraints:** Valid usage patterns and pairing requirements.

```typescript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style treatment of the button.
   * - `solid`: High-emphasis primary actions.
   * - `outline`: Medium-emphasis secondary actions with visible border.
   * - `ghost`: Low-emphasis actions that reveal surface on hover.
   * - `subtle`: Low-contrast tinted surface background.
   * - `link`: Renders as text with interactive link styling.
   * @default "solid"
   */
  variant?: ButtonVariant;

  /**
   * If true, disables user interaction, displays an accessible loading spinner,
   * and sets `aria-busy="true"`.
   * @default false
   */
  isLoading?: boolean;
}
```

#### Internal Implementation Scope
Internal implementation helpers and intermediate private functions do **not** require TSDoc unless their behavior is non-obvious or the comment explains an important architectural decision or browser workaround.

---

## 11. Declaration Generation & Package Verification

During package builds:
1. `isolatedDeclarations: true` enforces that every exported function and component has explicit return types and prop types.
2. `tsup` emits `.d.ts` and `.d.ts.map` files to `dist/`.
3. Every build in CI is audited with `@arethetypeswrong/cli` (`attw`):
   ```bash
   pnpm dlx @arethetypeswrong/cli --pack packages/react
   ```
   This guarantees that TypeScript types resolve flawlessly in both ESM (`moduleResolution: NodeNext / Bundler`) and legacy CJS consumer projects.

---

## 12. What Developers Must Do vs. Never Do

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TypeScript Rule Summary                         │
├───────────────────────────────────┬────────────────────────────────────┤
│ MUST DO                           │ NEVER DO                           │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Use strict interfaces for props │ • Never use 'any' under any        │
│ • Export all public prop types    │   circumstances.                   │
│ • Use discriminated unions for    │ • Never use TypeScript 'enum'.     │
│   mutually exclusive states.      │ • Never use polymorphic 'as' prop. │
│ • Document public APIs with       │ • Never use non-null assertion '!'.│
│   meaningful, rich TSDoc.         │ • Never require meaningless        │
│ • Use asChild for composition.    │   boilerplate comments on internals│
│ • Add explicit return types on    │ • Never leak internal intermediate │
│   all exported functions.         │   utility types into public API.   │
│ • Verify types via 'attw' in CI.  │ • Never create complex recursive   │
│                                   │   types exceeding 3 levels deep.   │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 13. Quality Gates & Definition of Done

A component contribution is rejected if:
1. `pnpm typecheck` emits a single error or warning.
2. Any `any` type is introduced.
3. Exported public component symbols lack explicit, meaningful TSDoc comments.
4. `attw` package verification produces unresolved module resolution warnings.

