---
name: typescript-api-design
description: Guidelines and patterns for strict TypeScript prop typing, generic polymorphism, discriminated unions, and declaration generation.
---

# TypeScript API Design Skill

## 1. Purpose
Defines type-safety conventions, prop interface naming, generic polymorphism, and declaration file emission standards for `@chellaa/react`.

## 2. Type System Rules
1. **Interface Naming**:
   - `<ComponentName>Props` (e.g., `ButtonProps`, `InputProps`).
   - Prop union types: `<ComponentName>Variant`, `<ComponentName>Size`, `<ComponentName>ColorScheme`.
2. **Standard Prop Extensions**:
   - Extend `React.HTMLAttributes<HTMLElement>` or specific native element props (e.g. `React.ButtonHTMLAttributes<HTMLButtonElement>`).
3. **No `any` Policy**:
   - Never use `any` in public exports. Use `unknown`, generics, or strict union types.
4. **Polymorphic Types**:
   - For polymorphic components, support `as?: React.ElementType` or `asChild?: boolean` with correct generic ref resolution.

## 3. Validation Commands
- `pnpm --filter @chellaa/react typecheck`
- `pnpm --filter @chellaa/react build` (verifies DTS emission)
