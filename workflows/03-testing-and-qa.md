# Chellaa React — Engineering Workflows
## Workflow 03: Testing, Accessibility & QA Standards

**Document Status:** 🟢 COMPLETE & ENFORCED  
**Target Package:** `@chellaa/react`  

---

## 1. Testing Philosophy

Testing in Chellaa React is not an afterthought; it is an automated quality gate. Components must pass strict behavioral, accessibility, and bundle benchmarks before any code is merged into `main`.

---

## 2. Test Execution Commands

```bash
# Run all unit and accessibility tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run axe-core accessibility suite specifically
pnpm test -- --grep "accessibility"
```

---

## 3. Mandatory Test Coverage Checklist

Every component must satisfy:
1. **DOM Structure:** Component renders proper HTML elements with expected semantic roles.
2. **Keyboard Operability:** Every interactive element can be focused and activated via Tab, Enter, Space, and Arrow keys.
3. **Screen Reader Attributes:** States reflect via ARIA attributes (`aria-expanded`, `aria-busy`, `aria-invalid`, `aria-disabled`).
4. **axe-core Zero-Violation Rule:**
   ```typescript
   import { axe } from "vitest-axe";
   const { container } = render(<Component />);
   expect(await axe(container)).toHaveNoViolations();
   ```
5. **No Direct DOM Manipulation:** Tests must use `user-event` to simulate real user gestures rather than low-level `fireEvent`.
