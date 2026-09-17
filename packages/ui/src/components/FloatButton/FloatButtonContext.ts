import { createContext, useContext } from "react";
import type { FloatButtonShape } from "./FloatButton.types";

export interface FloatButtonGroupContextValue {
  shape?: FloatButtonShape;
  inGroup?: boolean;
}

export const FloatButtonGroupContext = createContext<FloatButtonGroupContextValue>({
  inGroup: false,
});

export const useFloatButtonGroupContext = () => useContext(FloatButtonGroupContext);
