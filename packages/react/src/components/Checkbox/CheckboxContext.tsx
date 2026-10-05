import * as React from "react";
import type { CheckboxContextValue } from "./Checkbox.types";

export const CheckboxContext = React.createContext<
  CheckboxContextValue | undefined
>(undefined);

/**
 * Hook to consume parent CheckboxGroup context.
 * Returns undefined if the checkbox is rendered standalone.
 */
export function useCheckboxGroup(): CheckboxContextValue | undefined {
  return React.useContext(CheckboxContext);
}
