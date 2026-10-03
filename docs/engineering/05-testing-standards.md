# Chellaa React — Engineering Standards
## Document 05: Testing Architecture & Quality Assurance Standards

**Document Status:** Ready to Freeze  
**Phase:** 2 — Engineering Standards  
**Target Package:** `@chellaa/react`  
**Test Stack:** Vitest, React Testing Library, `@testing-library/user-event`, `vitest-axe`  

---

## 1. Executive Summary & Purpose

The testing philosophy of Chellaa React is anchored to a foundational premise: **Test behavior, not implementation details.**

Consumers do not care about internal variable names or intermediate state hooks; they care that clicking a button triggers a handler, opening a dialog traps focus, and screen readers announce options accurately.

This document establishes the official standards for unit tests, interaction tests, accessibility audits, keyboard navigation suites, controlled/uncontrolled state tests, coverage budgets, and CI gates.

---

## 2. Test Stack & Infrastructure Baseline

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Chellaa React Test Stack                        │
├────────────────────┬────────────────────┬──────────────────────────────┤
│ Tool               │ Package            │ Role                         │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ Test Runner        │ vitest             │ Fast, ESM-native runner with │
│                    │                    │ multi-threaded worker pools. │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ DOM Environment    │ jsdom              │ W3C DOM and HTML simulation. │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ Component Testing  │ @testing-library/  │ User-centric React component │
│                    │ react              │ mounting and assertions.     │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ User Interactions  │ @testing-library/  │ Realistic browser event      │
│                    │ user-event         │ simulation (clicks, typing). │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ Accessibility (A11y│ vitest-axe         │ Automated WCAG 2.2 / axe-core│
│ Audit)             │                    │ rule verification.           │
└────────────────────┴────────────────────┴──────────────────────────────┘
```

---

## 3. Query Priority Standard

Tests must query the DOM in the exact same manner as a user or assistive technology interacts with it.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Testing Query Priority                          │
├────────────────────┬──────────────────────┬────────────────────────────┤
│ Priority           │ Query Method         │ Target Rationale           │
├────────────────────┼──────────────────────┼────────────────────────────┤
│ 1 (Highest)        │ getByRole(...)       │ Queries accessible roles   │
│                    │                      │ and names (button, dialog).│
├────────────────────┼──────────────────────┼────────────────────────────┤
│ 2                  │ getByLabelText(...)  │ Queries inputs via label.  │
├────────────────────┼──────────────────────┼────────────────────────────┤
│ 3                  │ getByText(...)       │ Non-interactive text copy. │
├────────────────────┼──────────────────────┼────────────────────────────┤
│ 4                  │ getByDisplayValue(..)│ Current form input values. │
├────────────────────┼──────────────────────┼────────────────────────────┤
│ 5 (Escape Hatch)   │ getByTestId(...)     │ Strictly for non-semantic  │
│                    │                      │ dynamic containers only.   │
└────────────────────┴──────────────────────┴────────────────────────────┘
```

- **Strict Prohibition:** Never query elements using CSS class selectors (`container.querySelector('.cl-button')`). Class names are styling hooks, not behavioral contracts.

---

## 4. Mandatory Test Categories per Component

Every component pull request must satisfy all **applicable** test categories.

Do not write meaningless boilerplate tests for categories that are genuinely not applicable to a given component. If a category is not applicable, the test file's top-level docblock or test suite description must explicitly mark the category as `N/A` and provide the technical rationale.

```text
Example Applicability Rationale (Component: Badge):
- Rendering & Prop Pass-through: Applicable
- User Interaction: N/A — Badge is a static presentational component.
- Accessibility / axe: Applicable
- Keyboard Navigation Physics: N/A — Badge is non-interactive and does not receive focus.
- Controlled vs. Uncontrolled: N/A — Badge has no internal state.
- Disabled / Loading States: N/A — Badge has no disabled or loading modes.
- SSR Compatibility: Applicable
```

```
┌────────────────────────────────────────────────────────────────────────┐
│                      Mandatory Test Matrix Checklist                   │
├───────────────────────────────────┬────────────────────────────────────┤
│ 1. Rendering & DOM Pass-through   │ Attributes, className, style, ref. │
├───────────────────────────────────┼────────────────────────────────────┤
│ 2. User Interaction Suite         │ Clicks, keyboard activation (if    │
│                                   │ interactive).                      │
├───────────────────────────────────┼────────────────────────────────────┤
│ 3. Automated Accessibility Audit  │ Zero axe-core violations.          │
├───────────────────────────────────┼────────────────────────────────────┤
│ 4. Keyboard Navigation Physics    │ Tab, Escape, Arrows, Enter, Space  │
│                                   │ (if interactive).                  │
├───────────────────────────────────┼────────────────────────────────────┤
│ 5. Controlled vs. Uncontrolled    │ Value sync and onValueChange (if   │
│                                   │ stateful).                         │
├───────────────────────────────────┼────────────────────────────────────┤
│ 6. Disabled / Loading Guard Tests │ Interactions suppressed cleanly (if│
│                                   │ supported).                        │
├───────────────────────────────────┼────────────────────────────────────┤
│ 7. SSR Server Rendering Smoke     │ ReactDOMServer.renderToString().   │
└───────────────────────────────────┴────────────────────────────────────┘
```

### 4.1 Category 1: Rendering & Pass-through Tests
Verifies that the component forwards standard HTML attributes, custom `className`, inline `style`, and the React `ref`:

```tsx
it("forwards className and style props to the root DOM node", () => {
  render(<Button className="custom-class" style={{ zIndex: 10 }}>Click</Button>);
  const button = screen.getByRole("button", { name: "Click" });
  
  expect(button.classList.contains("custom-class")).toBe(true);
  expect(button.classList.contains("cl-button")).toBe(true);
  expect(button.style.zIndex).toBe("10");
});

it("correctly attaches the forwarded ref to the HTMLButtonElement", () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(<Button ref={ref}>Ref Target</Button>);
  expect(ref.current).toBeInstanceOf(HTMLButtonElement);
});
```

### 4.2 Category 2: User Interaction Tests
All interactions must use `userEvent.setup()` rather than `fireEvent`:

```tsx
it("fires onClick handler when clicked by user", async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Submit</Button>);

  await user.click(screen.getByRole("button", { name: "Submit" }));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 4.3 Category 3: Automated Accessibility (A11y) Tests
```tsx
it("has zero accessibility violations according to axe-core", async () => {
  const { container } = render(
    <Button variant="solid" colorScheme="primary">
      Accessible Action
    </Button>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 4.4 Category 4: Keyboard Navigation Physics
Verifies APG compliance:

```tsx
it("activates on Space and Enter key presses", async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Press Me</Button>);

  const button = screen.getByRole("button", { name: "Press Me" });
  button.focus();
  expect(button).toHaveFocus();

  await user.keyboard("{Enter}");
  expect(handleClick).toHaveBeenCalledTimes(1);

  await user.keyboard(" ");
  expect(handleClick).toHaveBeenCalledTimes(2);
});
```

### 4.5 Category 5: Controlled vs. Uncontrolled State Tests
For components with internal state (`useControllableState`):

```tsx
it("functions correctly in uncontrolled mode with defaultValue", async () => {
  const user = userEvent.setup();
  const handleChange = vi.fn();
  render(<Checkbox defaultValue={false} onValueChange={handleChange}>Accept</Checkbox>);

  const checkbox = screen.getByRole("checkbox", { name: "Accept" });
  expect(checkbox).not.toBeChecked();

  await user.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(handleChange).toHaveBeenCalledWith(true);
});

it("functions correctly in controlled mode when value prop is passed", async () => {
  const user = userEvent.setup();
  const handleChange = vi.fn();
  const { rerender } = render(
    <Checkbox value={true} onValueChange={handleChange}>Accept</Checkbox>
  );

  const checkbox = screen.getByRole("checkbox", { name: "Accept" });
  expect(checkbox).toBeChecked();

  await user.click(checkbox);
  // In controlled mode without state update in parent, checkbox remains checked:
  expect(checkbox).toBeChecked();
  expect(handleChange).toHaveBeenCalledWith(false);

  // Parent updates state:
  rerender(<Checkbox value={false} onValueChange={handleChange}>Accept</Checkbox>);
  expect(checkbox).not.toBeChecked();
});
```

### 4.6 Category 6: Disabled & Loading Guard Tests
Verifies that disabled components do not execute click events, form submissions, or focus rings:

```tsx
it("does not fire onClick when isDisabled is true", async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  render(<Button isDisabled onClick={handleClick}>Disabled</Button>);

  const button = screen.getByRole("button", { name: "Disabled" });
  expect(button).toBeDisabled();

  await user.click(button);
  expect(handleClick).not.toHaveBeenCalled();
});

it("renders loading spinner and sets aria-busy when isLoading is true", () => {
  render(<Button isLoading loadingText="Saving...">Save</Button>);
  const button = screen.getByRole("button");

  expect(button).toHaveAttribute("aria-busy", "true");
  expect(button).toBeDisabled();
  expect(screen.getByText("Saving...")).toBeInTheDocument();
});
```

### 4.7 Category 7: SSR Server Rendering Smoke Test
Ensures zero crashes in Node.js server environments:

```tsx
import { renderToString } from "react-dom/server";

it("renders to static HTML on the server without throwing exceptions", () => {
  expect(() => {
    const html = renderToString(<Button variant="primary">SSR Button</Button>);
    expect(html).toContain("cl-button");
    expect(html).toContain("SSR Button");
  }).not.toThrow();
});
```

### 4.8 React Server Components (RSC) & Real Consumer Integration Validation
Unit tests passing in jsdom do **not** prove React Server Component (RSC) compatibility. Chellaa React requires an integration validation gate in `apps/test-consumer` testing against a real Next.js App Router production build:

```text
Next.js App Router
        ↓
Server Component (app/page.tsx)
        ↓
Chellaa React Component
        ↓
Production Build (`next build`)
```

**Mandatory Validation Checklist:**
1. **Zero Server/Client Boundary Errors:** Server components rendering Chellaa React components must compile and render without runtime errors or missing directive warnings.
2. **Zero Hydration Mismatches:** Static markup generated on the server must cleanly match the client hydrated DOM without warnings or layout flashes.
3. **Zero Browser-Global Access:** Components must not read `window`, `document`, or `localStorage` during initial server evaluation.
4. **Zero CSS Delivery Failures:** Rendered components must produce their expected CSS styling without requiring consumer-side manual CSS imports.
5. **Zero Client Boundary Leaks:** Static components must not force client boundary propagation. Interactive components requiring React hooks or event listeners must be safely marked with `"use client"` at their specific component boundary.
6. **Production Build Success:** `pnpm --filter @chellaa/test-consumer build` must succeed in CI.

---

## 5. Test Isolation & Environment Mocks

### 5.1 Clean Test Isolation
- All tests must run in complete isolation.
- Vitest resets DOM state between tests automatically via RTL's `cleanup()`.
- Global mocks must be cleared in `afterEach`:
  ```typescript
  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });
  ```

### 5.2 Environment Setup Mocks (`setupTests.ts`)
Standard browser APIs missing in jsdom must be mocked globally in `packages/react/src/test/setupTests.ts`:
- **`window.matchMedia`:** Provides mock implementation for OS theme detection tests.
- **`ResizeObserver`:** Mocked for component measurement tests.
- **`IntersectionObserver`:** Mocked for viewport triggers.

---

## 6. Code Coverage Expectations & Quality Gates

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Code Coverage Thresholds                        │
├────────────────────┬────────────────────┬──────────────────────────────┤
│ Metric             │ Minimum Threshold  │ Enforcement Scope            │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ Statements         │ >= 90%             │ All packages/react files     │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ Branches           │ >= 85%             │ All packages/react files     │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ Functions          │ >= 90%             │ All packages/react files     │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ Critical Hooks     │ 100%               │ useControllableState,        │
│                    │                    │ useMergeRefs, useId          │
└────────────────────┴────────────────────┴──────────────────────────────┘
```

CI will fail any pull request that reduces coverage below these thresholds.
