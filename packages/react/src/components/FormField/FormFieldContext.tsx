import * as React from "react";

export interface FormFieldContextValue {
  id: string;
  name?: string | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  error?: boolean | undefined;
  labelId: string;
  helperTextId: string;
  errorMessageId: string;
  hasHelperText: boolean;
  hasErrorMessage: boolean;
  setHasHelperText: (has: boolean) => void;
  setHasErrorMessage: (has: boolean) => void;
}

export const FormFieldContext = React.createContext<
  FormFieldContextValue | undefined
>(undefined);

/**
 * Hook to consume form field state, IDs, and validation flags.
 * Returns undefined if used outside a <FormField>.
 */
export function useFormField(): FormFieldContextValue | undefined {
  return React.useContext(FormFieldContext);
}
