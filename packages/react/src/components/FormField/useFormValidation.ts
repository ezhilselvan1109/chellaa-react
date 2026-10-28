"use client";

import * as React from "react";
import type {
  FieldValidationError,
  FieldValidator,
  UseFormValidationOptions,
  UseFormValidationReturn,
} from "./FormValidation.types";

/**
 * Hook providing framework-agnostic form state management, validation lifecycle,
 * async race-condition safety, and accessible error/focus integration.
 */
export function useFormValidation<TValues extends Record<string, unknown>>(
  options: UseFormValidationOptions<TValues>
): UseFormValidationReturn<TValues> {
  const {
    initialValues,
    validators = {} as Partial<{ [P in keyof TValues]: FieldValidator<TValues[P]> }>,
    validateOn = "blur",
    onSubmit,
    focusFirstInvalid = true,
  } = options;

  const [values, setValues] = React.useState<TValues>(initialValues);
  const [errors, setErrors] = React.useState<Partial<Record<keyof TValues, string>>>({});
  const [touched, setTouchedState] = React.useState<Partial<Record<keyof TValues, boolean>>>({});
  const [dirty, setDirtyState] = React.useState<Partial<Record<keyof TValues, boolean>>>({});
  const [isValidating, setIsValidating] = React.useState<Partial<Record<keyof TValues, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  // Per-field request ID sequence to prevent stale async validations from overwriting newer state
  const validationRequestIdRef = React.useRef<Record<string, number>>({});
  const valuesRef = React.useRef<TValues>(values);
  valuesRef.current = values;

  const validatorsRef = React.useRef<Partial<{ [P in keyof TValues]: FieldValidator<TValues[P]> }>>(validators);
  validatorsRef.current = validators;

  const validateFieldInternal = React.useCallback(
    async <K extends keyof TValues>(field: K, val: TValues[K]): Promise<boolean> => {
      const validator = validatorsRef.current?.[field];
      if (!validator) {
        setErrors((prev) => {
          if (!prev[field]) return prev;
          const next = { ...prev };
          delete next[field];
          return next;
        });
        return true;
      }

      const fieldKey = String(field);
      const requestId = (validationRequestIdRef.current[fieldKey] || 0) + 1;
      validationRequestIdRef.current[fieldKey] = requestId;

      try {
        const resultOrPromise = validator(val);

        if (resultOrPromise instanceof Promise) {
          setIsValidating((prev) => ({ ...prev, [field]: true }));
          const result = await resultOrPromise;

          // Discard stale async promise result
          if (validationRequestIdRef.current[fieldKey] !== requestId) {
            return false;
          }

          setIsValidating((prev) => ({ ...prev, [field]: false }));

          if (!result.valid) {
            setErrors((prev) => ({ ...prev, [field]: result.error.message }));
            return false;
          } else {
            setErrors((prev) => {
              if (!prev[field]) return prev;
              const next = { ...prev };
              delete next[field];
              return next;
            });
            return true;
          }
        } else {
          // Synchronous validator
          if (!resultOrPromise.valid) {
            setErrors((prev) => ({ ...prev, [field]: resultOrPromise.error.message }));
            return false;
          } else {
            setErrors((prev) => {
              if (!prev[field]) return prev;
              const next = { ...prev };
              delete next[field];
              return next;
            });
            return true;
          }
        }
      } catch (err) {
        if (validationRequestIdRef.current[fieldKey] === requestId) {
          setIsValidating((prev) => ({ ...prev, [field]: false }));
          const message = err instanceof Error ? err.message : "Validation failed";
          setErrors((prev) => ({ ...prev, [field]: message }));
        }
        return false;
      }
    },
    []
  );

  const setValue = React.useCallback(
    async <K extends keyof TValues>(field: K, value: TValues[K]) => {
      setValues((prev) => {
        const next = { ...prev, [field]: value };
        return next;
      });

      setDirtyState((prev) => ({
        ...prev,
        [field]: value !== initialValues[field],
      }));

      if (validateOn === "change") {
        await validateFieldInternal(field, value);
      }
    },
    [initialValues, validateOn, validateFieldInternal]
  );

  const setTouched = React.useCallback(
    <K extends keyof TValues>(field: K, isFieldTouched: boolean = true) => {
      setTouchedState((prev) => ({ ...prev, [field]: isFieldTouched }));
    },
    []
  );

  const setError = React.useCallback(
    <K extends keyof TValues>(field: K, error?: string | FieldValidationError) => {
      if (!error) {
        setErrors((prev) => {
          if (!prev[field]) return prev;
          const next = { ...prev };
          delete next[field];
          return next;
        });
      } else {
        const message = typeof error === "string" ? error : error.message;
        setErrors((prev) => ({ ...prev, [field]: message }));
      }
    },
    []
  );

  const clearError = React.useCallback(<K extends keyof TValues>(field: K) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const validateField = React.useCallback(
    async <K extends keyof TValues>(field: K): Promise<boolean> => {
      return validateFieldInternal(field, valuesRef.current[field]);
    },
    [validateFieldInternal]
  );

  const validateAll = React.useCallback(async (): Promise<boolean> => {
    const fieldKeys = Object.keys(validatorsRef.current) as Array<keyof TValues>;
    const results = await Promise.all(
      fieldKeys.map((key) => validateFieldInternal(key, valuesRef.current[key]))
    );
    return results.every(Boolean);
  }, [validateFieldInternal]);

  const handleSubmit = React.useCallback(
    async (e?: React.FormEvent) => {
      if (e && typeof e.preventDefault === "function") {
        e.preventDefault();
      }

      // Mark all fields with validators as touched on submit
      const allTouched: Partial<Record<keyof TValues, boolean>> = {};
      (Object.keys(validatorsRef.current) as Array<keyof TValues>).forEach((key) => {
        allTouched[key] = true;
      });
      setTouchedState((prev) => ({ ...prev, ...allTouched }));

      const isValidForm = await validateAll();

      if (!isValidForm) {
        if (focusFirstInvalid && typeof document !== "undefined") {
          // Find first field that has an error in state or DOM
          setTimeout(() => {
            const firstErrorField = (Object.keys(validatorsRef.current) as Array<keyof TValues>).find(
              (key) => {
                const el =
                  document.querySelector<HTMLElement>(`[name="${String(key)}"]`) ??
                  document.getElementById(String(key));
                return el && (el.getAttribute("aria-invalid") === "true" || el.classList.contains("cl-input--error"));
              }
            );

            if (firstErrorField) {
              const el =
                document.querySelector<HTMLElement>(`[name="${String(firstErrorField)}"]`) ??
                document.getElementById(String(firstErrorField));
              el?.focus();
            }
          }, 0);
        }
        return;
      }

      if (onSubmit) {
        setIsSubmitting(true);
        try {
          await onSubmit(valuesRef.current);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [validateAll, focusFirstInvalid, onSubmit]
  );

  const reset = React.useCallback(
    (nextValues?: Partial<TValues>) => {
      setValues({ ...initialValues, ...nextValues });
      setErrors({});
      setTouchedState({});
      setDirtyState({});
      setIsValidating({});
      setIsSubmitting(false);
      validationRequestIdRef.current = {};
    },
    [initialValues]
  );

  const isValid = React.useMemo(() => Object.keys(errors).length === 0, [errors]);

  const getFieldProps = React.useCallback(
    <K extends keyof TValues>(field: K): { name: string; isInvalid: boolean; errorMessage?: string } => {
      const fieldKey = String(field);
      const isFieldInvalid = Boolean(errors[field]);
      const errMsg = errors[field];

      return {
        name: fieldKey,
        isInvalid: isFieldInvalid,
        ...(errMsg ? { errorMessage: errMsg } : {}),
      };
    },
    [errors]
  );

  const getInputProps = React.useCallback(
    <K extends keyof TValues>(field: K) => {
      const fieldKey = String(field);

      return {
        name: fieldKey,
        value: values[field],
        onChange: (
          e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
            | TValues[K]
        ) => {
          let nextVal: TValues[K];
          if (e && typeof e === "object" && "target" in e) {
            const target = e.target as HTMLInputElement;
            if (target.type === "checkbox") {
              nextVal = target.checked as unknown as TValues[K];
            } else {
              nextVal = target.value as unknown as TValues[K];
            }
          } else {
            nextVal = e;
          }
          void setValue(field, nextVal);
        },
        onBlur: () => {
          setTouched(field, true);
          if (validateOn === "blur") {
            void validateFieldInternal(field, valuesRef.current[field]);
          }
        },
      };
    },
    [values, setValue, setTouched, validateOn, validateFieldInternal]
  );

  return {
    values,
    errors,
    touched,
    dirty,
    isValidating,
    isSubmitting,
    isValid,
    setValue,
    setTouched,
    setError,
    clearError,
    validateField,
    validateAll,
    handleSubmit,
    reset,
    getFieldProps,
    getInputProps,
  };
}
