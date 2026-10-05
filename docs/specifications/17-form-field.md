# FormField Component Specification (Form Control Context & Accessible Form Primitives)

**Document Status:** Approved & Baseline  
**Phase:** Phase 2 — Core Form Controls  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-specification-standard.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-specification-standard.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     FormField, FormLabel, FormHelperText, FormErrorMessage, useFormField
Package Export:     import { FormField, FormLabel, FormHelperText, FormErrorMessage, useFormField, type FormFieldProps, type FormLabelProps, type FormHelperTextProps, type FormErrorMessageProps, type FormFieldContextValue } from "@chellaa/react";
Category:           Forms & Inputs
Status:             Approved & Implementation Baseline
Phase:              Phase 2 — Core Form Controls
Related Components: Input, TextField, Textarea, Checkbox, Radio, Switch, Select
```

---

## 2. Purpose

The `FormField` suite provides the **foundational context provider, automated WAI-ARIA wiring, and structural composition primitives** for all form controls in `@chellaa/react`. Modeled after enterprise design systems (e.g. Radix Form, Chakra FormControl, MUI FormControl), `FormField` eliminates manual boilerplate by automatically generating IDs, managing validation states (`error`, `disabled`, `required`, `readOnly`), and cascading accessibility attributes down to nested inputs, labels, helper texts, and error messages.

By decoupling the form layout from the input implementation, `FormField` allows developers to assemble rich, accessible form rows containing any input control—such as `<Input>`, `<Textarea>`, `<Select>`, `<Checkbox>`, or `<Switch>`—while ensuring 100% compliance with screen reader landmark and association standards.

### When to Use

- **Structured Form Rows**: Composing standard form fields consisting of a label, an input control, explanatory helper text, and validation error messages.
- **Custom Input Composition**: Wrapping non-standard or compound controls (e.g. phone number with country dropdown, custom sliders, color pickers) with standardized form semantics.
- **Dynamic Error Cascades**: Binding form state libraries (React Hook Form, Formik, Zod) to automatically toggle labels and error messages without manual prop drilling.

### When NOT to Use

- **Do NOT use `FormField` for simple pre-packaged inputs.** For standard text inputs with standard labels, use `<TextField>` (Spec 15) which wraps `FormField` internally.
- **Do NOT use `FormField` as a general layout divider.** Use `Stack` or `Box` when spacing non-form layout elements.

---

## 3. Scope

### In Scope

1. **Context Provider Architecture (`FormFieldContext` & `useFormField`)**:
   - Centralized state management for `id`, `name`, `error`, `disabled`, `readOnly`, `required`.
   - Automatic unique ID generation via `useId()`.
   - Automated registration of helper text and error message IDs for `aria-describedby` construction.
2. **Accessible Form Primitives**:
   - `<FormField>`: Outer structural container hosting the context provider.
   - `<FormLabel>`: Accessible `<label>` primitive automatically bound via `htmlFor`. Features an optional required asterisk (`*`) and error color tint.
   - `<FormHelperText>`: Explanatory text block automatically linked via `aria-describedby`.
   - `<FormErrorMessage>`: Accessible error alert (`role="alert"`) shown conditionally when `error={true}`.
3. **Control Interoperability**:
   - Downward cascade of `disabled`, `readOnly`, `required`, and `error` states to child controls (`Input`, `Textarea`, `Checkbox`, `Radio`, `Switch`).
4. **Polymorphic Zero-DOM Composition**:
   - `asChild` composition via `Slot`, `component`, and `as`.
5. **Emotion Theme Overrides**:
   - Styled via Emotion `styled()`, hookable at `theme.components.ChellaaFormField.styleOverrides.root`.

### Out of Scope

- Client-side validation schema execution (delegated to user's schema library like Zod, Yup, or Valibot).
- Multi-step wizard navigation (delegated to `Stepper` organism).

---

## 4. Non-Goals

- `FormField` does **NOT** hijack form submission (`onSubmit`).
- `FormField` does **NOT** enforce a single vertical layout; horizontal inline form layouts are supported via `orientation="horizontal"` or standard flex composition.

---

## 5. Feature Summary

| Feature | Description | Implementation Detail |
| :--- | :--- | :--- |
| **Context Cascade** | Automated prop propagation to child controls | `FormFieldContext.Provider` delivering states |
| **Auto ID Generation** | Zero-configuration label & description linking | Uses `React.useId()` if explicit `id` is omitted |
| **Required Indicator** | Visual and semantic required markers | Appends `*` in `palette.error.main` and sets `aria-required="true"` |
| **Error Handling** | Live validation messaging | `<FormErrorMessage role="alert">` with `palette.error.main` |
| **Helper Text** | Contextual help linked to input | Auto-generates `${id}-helper` and adds to `aria-describedby` |
| **Full Width** | Container stretching | `fullWidth={true}` stretches root container to 100% width |

---

## 6. Anatomy

### FormField Anatomy & Context Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│ <FormField id="user-email" required error={hasError}>                  │
│                                                                        │
│  <FormLabel> (htmlFor="user-email")                                    │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Email Address *                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  <Input> (id="user-email", aria-describedby="user-email-helper")      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ alex@company.com                                                 │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  <FormHelperText> (id="user-email-helper")                             │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ We will only use this email for account security.                │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  <FormErrorMessage> (id="user-email-error", role="alert")             │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Please enter a valid corporate email address.                    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Mathematics & Proportions

### 7.1. Spacing & Typography Scale

- **Root Gap**: Vertical layout spacing between children: `theme.spacing(0.75)` (6px).
- **Label Typography**: Font size `0.875rem` (14px), font weight `500`, line height `1.4`.
- **Helper & Error Typography**: Font size `0.75rem` (12px), line height `1.4`.
- **Required Asterisk**: Margin-left `4px`, color `theme.palette.error.main`.

---

## 8. Component States & Behavior

### 8.1. Automatic ID & ARIA Description Construction

1. The root `<FormField>` generates a base `id` (e.g. `:r1:`).
2. `<FormLabel>` inherits `id` and binds its native `htmlFor={id}`.
3. `<FormHelperText>` registers `${id}-helper` with the context.
4. `<FormErrorMessage>` registers `${id}-error` with the context.
5. Nested inputs consume `useFormField()` and construct their composite `aria-describedby`:
   ```ts
   const ariaDescribedBy = [
     error ? `${id}-error` : null,
     hasHelperText ? `${id}-helper` : null,
     customDescribedBy,
   ].filter(Boolean).join(" ") || undefined;
   ```

### 8.2. Error State Visibility

- When `error={false}`: `<FormErrorMessage>` is hidden from the DOM (or unmounted), preventing screen readers from announcing stale error messages.
- When `error={true}`: `<FormErrorMessage>` mounts with `role="alert"` (or `aria-live="polite"`), immediately notifying screen reader users of the invalid condition.

---

## 9. Accessibility & WAI-ARIA Standards

- **Strict Label Association**: Ensures every form control has a programmatic label either via native `htmlFor` or `aria-labelledby`.
- **Accessible Description**: All helper texts and error alerts are linked via `aria-describedby`.
- **Alert Semantics**: Error messages render with `role="alert"` to ensure immediate screen reader interruption when validation fails.
- **Required Indicator**: The visual asterisk (`*`) is accompanied by native `required` and `aria-required="true"` on the input element.
- **Zero Violations**: 100% compliance with `vitest-axe` accessibility rules.

---

## 10. API Specification & TypeScript Contracts

```ts
import type { ElementType, HTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";
import type { SxProps } from "../../system/types";

export interface FormFieldContextValue {
  id: string;
  name?: string | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  error?: boolean | undefined;
  helperTextId: string;
  errorMessageId: string;
  hasHelperText: boolean;
  hasErrorMessage: boolean;
  setHasHelperText: (has: boolean) => void;
  setHasErrorMessage: (has: boolean) => void;
}

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  id?: string | undefined;
  name?: string | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  error?: boolean | undefined;
  fullWidth?: boolean | undefined;
  asChild?: boolean | undefined;
  component?: ElementType | undefined;
  as?: ElementType | undefined;
  sx?: SxProps;
  children?: ReactNode | undefined;
}

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean | undefined;
  asChild?: boolean | undefined;
  component?: ElementType | undefined;
  as?: ElementType | undefined;
  sx?: SxProps;
  children?: ReactNode | undefined;
}

export interface FormHelperTextProps extends HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean | undefined;
  component?: ElementType | undefined;
  as?: ElementType | undefined;
  sx?: SxProps;
  children?: ReactNode | undefined;
}

export interface FormErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean | undefined;
  component?: ElementType | undefined;
  as?: ElementType | undefined;
  sx?: SxProps;
  children?: ReactNode | undefined;
}
```

---

## 11. Design System Tokens & Emotion Styling Architecture

`FormField` primitives are styled via Emotion `styled()`:

```ts
const StyledFormFieldRoot = styled("div", {
  name: "ChellaaFormField",
  slot: "Root",
  shouldForwardProp: (prop) => prop !== "fullWidth",
})<{ fullWidth?: boolean }>(({ fullWidth }) => ({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  width: fullWidth ? "100%" : "auto",
  verticalAlign: "top",
}));

const StyledFormLabel = styled("label")<{ required?: boolean; error?: boolean }>(
  ({ theme, error }) => ({
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.4,
    marginBottom: theme.spacing(0.75),
    color: error ? theme.palette.error.main : theme.palette.text.primary,
    userSelect: "none",
    "& .ChellaaFormLabel-requiredAsterisk": {
      color: theme.palette.error.main,
      marginLeft: 4,
    },
  })
);

const StyledFormHelperText = styled("p")(({ theme }) => ({
  fontSize: "0.75rem",
  lineHeight: 1.4,
  margin: 0,
  marginTop: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

const StyledFormErrorMessage = styled("p")(({ theme }) => ({
  fontSize: "0.75rem",
  lineHeight: 1.4,
  margin: 0,
  marginTop: theme.spacing(0.5),
  color: theme.palette.error.main,
  fontWeight: 500,
}));
```

---

## 12. Composition & Polymorphism Patterns

### 12.1. Complete Accessible Form Row

```tsx
<FormField required error={Boolean(errors.email)} fullWidth>
  <FormLabel>Corporate Email</FormLabel>
  <Input
    type="email"
    placeholder="user@enterprise.com"
    {...register("email")}
  />
  <FormHelperText>We will send your verification code here.</FormHelperText>
  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
</FormField>
```

### 12.2. Multiline Textarea Composition

```tsx
<FormField required error={isBioTooLong} fullWidth>
  <FormLabel>Biography</FormLabel>
  <Textarea
    placeholder="Tell us about your background..."
    autoResize
    minRows={4}
    showCount
    maxLength={300}
  />
  <FormErrorMessage>Biography exceeds the 300 character limit.</FormErrorMessage>
</FormField>
```

---

## 13. Edge Cases & Resilience

| Edge Case | Expected System Behavior | Architectural Defense |
| :--- | :--- | :--- |
| **Control Used Outside FormField** | Control functions normally with local props. | Safe context fallback returning empty/undefined defaults. |
| **Explicit `id` Provided on FormField** | Subcomponents adopt user-provided ID. | Preference order: `idProp ?? generatedId`. |
| **Multiple FormFields on Single Page** | No ID collisions across elements. | Distinct `useId()` instances per FormField. |
| **Isolated Unit Testing** | Tested without `<ThemeProvider>`. | `styled` factory automatically provides `defaultTheme`. |

---

## 14. Testing Verification Matrix

Every implementation of `FormField` must satisfy this 100% test contract:

1. **Context Propagation**:
   - Cascades `id`, `required`, `disabled`, `readOnly`, `error` down to child input controls.
2. **Label Association**:
   - `<FormLabel>` renders `htmlFor` matching input `id`.
   - Displays `*` required asterisk when `required={true}`.
3. **Helper & Error ID Registration**:
   - Input's `aria-describedby` accurately references helper and error message IDs.
4. **Conditional Error Rendering**:
   - `<FormErrorMessage>` renders only when `error={true}` and features `role="alert"`.
5. **Accessibility (`vitest-axe`)**:
   - Zero automated accessibility violations for complete valid and invalid form field compositions.

---

## 15. Implementation File Blueprint

```text
packages/react/src/components/FormField/
├── FormFieldContext.tsx      # React context provider and useFormField hook
├── FormField.tsx             # Root container hosting the context provider
├── FormLabel.tsx             # Accessible label primitive with required asterisk
├── FormHelperText.tsx        # Muted helper text primitive
├── FormErrorMessage.tsx      # Accessible error alert primitive
├── FormField.test.tsx        # Vitest unit test suite (100% pass + vitest-axe)
├── FormField.stories.tsx     # Storybook stories (complete forms, error states, textareas)
└── index.ts                  # Public exports
```
