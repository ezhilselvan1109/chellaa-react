import * as React from "react";

export interface FieldValidationError {
  message: string;
  code?: string;
}

export type FieldValidationResult =
  | { valid: true }
  | { valid: false; error: FieldValidationError };

export type FieldValidator<TValue = unknown> = (
  value: TValue
) => FieldValidationResult | Promise<FieldValidationResult>;

export interface UseFormValidationOptions<TValues extends Record<string, unknown>> {
  /**
   * Initial values of the form fields.
   */
  initialValues: TValues;

  /**
   * Field validators dictionary.
   */
  validators?: Partial<{
    [K in keyof TValues]: FieldValidator<TValues[K]>;
  }>;

  /**
   * When to trigger validation.
   * @default "blur"
   */
  validateOn?: "change" | "blur" | "submit";

  /**
   * Callback invoked when form passes validation and is submitted.
   */
  onSubmit?: (values: TValues) => void | Promise<void>;

  /**
   * Automatically focus the first invalid field upon failed submission.
   * @default true
   */
  focusFirstInvalid?: boolean;
}

export interface UseFormValidationReturn<TValues extends Record<string, unknown>> {
  /**
   * Current field values.
   */
  values: TValues;

  /**
   * Current error messages by field key.
   */
  errors: Partial<Record<keyof TValues, string>>;

  /**
   * Whether field has been blurred/touched.
   */
  touched: Partial<Record<keyof TValues, boolean>>;

  /**
   * Whether field value has changed from its initial value.
   */
  dirty: Partial<Record<keyof TValues, boolean>>;

  /**
   * Whether asynchronous validation is currently pending for a field.
   */
  isValidating: Partial<Record<keyof TValues, boolean>>;

  /**
   * Whether the form submission callback is currently running.
   */
  isSubmitting: boolean;

  /**
   * True if there are no errors across all fields.
   */
  isValid: boolean;

  /**
   * Sets a single field value and triggers validation according to `validateOn`.
   */
  setValue: <K extends keyof TValues>(field: K, value: TValues[K]) => Promise<void>;

  /**
   * Sets the touched state for a field.
   */
  setTouched: <K extends keyof TValues>(field: K, isTouched?: boolean) => void;

  /**
   * Manually sets an error message on a field.
   */
  setError: <K extends keyof TValues>(field: K, error?: string | FieldValidationError) => void;

  /**
   * Clears the error on a field.
   */
  clearError: <K extends keyof TValues>(field: K) => void;

  /**
   * Validates a single field immediately, returning true if valid.
   */
  validateField: <K extends keyof TValues>(field: K) => Promise<boolean>;

  /**
   * Validates all fields immediately, returning true if all are valid.
   */
  validateAll: () => Promise<boolean>;

  /**
   * Form submit handler.
   */
  handleSubmit: (e?: React.FormEvent) => Promise<void>;

  /**
   * Resets form values and clears errors, touched, and dirty state.
   */
  reset: (nextValues?: Partial<TValues>) => void;

  /**
   * Convenience prop getter for FormField container integration.
   */
  getFieldProps: <K extends keyof TValues>(field: K) => {
    name: string;
    isInvalid: boolean;
    errorMessage?: string;
  };

  /**
   * Convenience prop getter for child input elements (Input, Textarea, etc.).
   */
  getInputProps: <K extends keyof TValues>(field: K) => {
    name: string;
    value: TValues[K];
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | TValues[K]) => void;
    onBlur: () => void;
  };
}
