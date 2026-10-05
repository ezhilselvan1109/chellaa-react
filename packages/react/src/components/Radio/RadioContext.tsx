import * as React from "react";
import type { RadioContextValue } from "./Radio.types";

export const RadioContext = React.createContext<
  RadioContextValue | undefined
>(undefined);

/**
 * Hook to consume parent RadioGroup context.
 * Returns undefined if the radio is rendered standalone.
 */
export function useRadioGroup(): RadioContextValue | undefined {
  return React.useContext(RadioContext);
}
