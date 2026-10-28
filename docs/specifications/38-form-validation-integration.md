# SPEC-038: Form Validation Integration Specification

## 1. Overview & Scope
This specification defines the form validation integration architecture for Chellaa React.
Rather than introducing a heavy, competing state-management framework (such as bundling full Formik or React Hook Form into the core library), this design enhances the existing `FormField` primitive with:
1. A lightweight, strictly-typed validation contract (`FieldValidator`, `FieldValidationResult`, `FieldValidationError`).
2. Reactive field-level validation with asynchronous debouncing, cancellation, and race-condition immunity.
3. Form-level orchestration via `useFormValidation` hook supporting submission validation, dirty/touched flags, and automatic focus-transfer to the first invalid field.
4. Seamless accessibility bridging: automatically cascades `aria-invalid="true"` and wires `aria-describedby` with `FormErrorMessage` and `FormHelperText`.
5. Zero mandatory external runtime dependencies, with clear, documented adapter patterns for Zod, React Hook Form, and Formik.

---

## 2. Validation Contract

```tsx
export interface FieldValidationError {
  message: string;
  code?: string;
}

export type FieldValidationResult =
  | { valid: true; error?: undefined }
  | { valid: false; error: FieldValidationError | string };

export type FieldValidator<TValue = unknown> = (
  value: TValue,
) => FieldValidationResult | Promise<FieldValidationResult>;
```

### 2.1 FormField Extension
`FormField` accepts an enhanced `error` prop:
- `error?: boolean | string | FieldValidationError`
- When a string or `FieldValidationError` is provided, `FormField` automatically marks the field as invalid and exposes the error message to `FormErrorMessage`.

`FormFieldContextValue` is extended with:
```tsx
export interface FormFieldContextValue {
  id: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  isValidating?: boolean;
  isTouched?: boolean;
  isDirty?: boolean;
  labelId: string;
  helperTextId: string;
  errorMessageId: string;
  hasHelperText: boolean;
  hasErrorMessage: boolean;
  setHasHelperText: (has: boolean) => void;
  setHasErrorMessage: (has: boolean) => void;
}
```

---

## 3. Form Validation Hook (`useFormValidation`)

```tsx
export interface UseFormValidationOptions<TValues extends Record<string, unknown>> {
  initialValues: TValues;
  validators?: {
    [K in keyof TValues]?: FieldValidator<TValues[K]>;
  };
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  focusFirstInvalid?: boolean;
  onSubmit?: (values: TValues) => void | Promise<void>;
}

export interface UseFormValidationReturn<TValues extends Record<string, unknown>> {
  values: TValues;
  errors: Partial<Record<keyof TValues, string>>;
  touched: Partial<Record<keyof TValues, boolean>>;
  dirty: Partial<Record<keyof TValues, boolean>>;
  isValidating: Partial<Record<keyof TValues, boolean>>;
  isSubmitting: boolean;
  setValue: <K extends keyof TValues>(name: K, value: TValues[K]) => void;
  setTouched: <K extends keyof TValues>(name: K, touched?: boolean) => void;
  validateField: <K extends keyof TValues>(name: K) => Promise<FieldValidationResult>;
  validateForm: () => Promise<boolean>;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
  getFieldProps: (name: keyof TValues) => {
    name: string;
    id: string;
    value: any;
    error: boolean;
    errorMessage?: string;
    isValidating?: boolean;
    onChange: (e: any) => void;
    onBlur: () => void;
  };
}
```

### 3.1 Race Condition & Cancellation Guard
Asynchronous validators maintain an internal per-field transaction counter (`validationRequestIdRef`). When an async validation promise resolves:
- If `requestId !== currentRequestId[field]`, the response is recognized as stale and silently discarded.
- Prevents slower network responses from overwriting newer local typing results.

### 3.2 First Invalid Field Focus
On submit, if validation fails and `focusFirstInvalid` is enabled (default `true`), the hook finds the first invalid field key in DOM order and transfers focus to `document.getElementById(fieldId)`.

---

## 4. Accessibility & ARIA Contract
- Invalid fields receive `aria-invalid="true"`.
- Valid fields receive `aria-invalid="false"` or omission.
- `aria-describedby` contains both `[fieldId]-error` and `[fieldId]-helper` when both exist, ensuring screen reader users hear both help instructions and error reasons.
- `FormErrorMessage` retains `role="alert"` and `aria-live="polite"` for immediate screen reader announcement.

---

## 5. Testing & Acceptance Criteria
1. Synchronous validators immediately update field error state.
2. Asynchronous validators set `isValidating: true` during flight and clear upon resolution.
3. Rapid typing does not allow stale async responses to overwrite newer values.
4. `handleSubmit` prevents form submission when fields are invalid.
5. First invalid field receives focus on failed submission.
6. `FormErrorMessage` displays string error message automatically.
7. Existing forms with simple boolean `error` prop continue to function without regression.
8. Zero `axe-core` accessibility violations.
