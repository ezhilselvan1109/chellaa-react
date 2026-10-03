import * as React from "react";
import type { ButtonGroupContextValue } from "./ButtonGroup.types";

export const ButtonGroupContext = React.createContext<
  ButtonGroupContextValue | undefined
>(undefined);

/**
 * Hook to access parent ButtonGroup context if present.
 */
export function useButtonGroupContext(): ButtonGroupContextValue | undefined {
  return React.useContext(ButtonGroupContext);
}
