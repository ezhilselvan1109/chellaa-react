---
name: component-authoring
description: Standard operating procedure for authoring, styling, testing, and exporting production-grade React components in @chellaa/react.
---

# Component Authoring Skill

When creating or refactoring a component in `@chellaa/react`:

1. **Verify Specifications First:**
   Always reference the approved 30-section specification in `docs/specifications/` and the Universal API Conventions in `docs/specifications/01-api-conventions.md`.

2. **Follow Collocated 6-File Structure:**
   ```text
   packages/react/src/components/<ComponentName>/
   ├── <ComponentName>.tsx
   ├── <ComponentName>.types.ts
   ├── <ComponentName>.styles.css
   ├── <ComponentName>.test.tsx
   ├── <ComponentName>.stories.tsx
   └── index.ts
   ```

3. **Adhere to Styling Rules:**
   - Enclose all CSS in `@layer cl-components { ... }`.
   - Use `.cl-<component>[__<element>][--<modifier>]`.
   - Never use hardcoded colors; use `--cl-*` variables.
   - Never use Tailwind CSS or CSS-in-JS.

4. **Adhere to TypeScript & React Rules:**
   - No `any`.
   - Forward refs with `React.forwardRef`.
   - Use `asChild` for polymorphism via `Slot`. Prohibit `asChild` on void elements (`<input>`) and table tags.
   - Interactive components start with `"use client";`. Pure presentational components omit `"use client"` for RSC compatibility.

5. **Ensure 100% Test Coverage:**
   - Unit tests covering props, variants, controlled/uncontrolled state.
   - Accessibility tests using `vitest-axe` with zero violations.
   - Keyboard interaction tests using `userEvent`.
