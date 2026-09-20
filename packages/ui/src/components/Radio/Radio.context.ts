import { createContext, useContext } from "react";
import type {
  RadioChangeEvent,
  RadioSize,
  RadioButtonStyle,
  RadioOptionTypeMode,
} from "./Radio.types";

export interface RadioGroupContextType {
  value?: any;
  disabled?: boolean;
  name?: string;
  size?: RadioSize;
  buttonStyle?: RadioButtonStyle;
  optionType?: RadioOptionTypeMode;
  onRadioChange?: (e: RadioChangeEvent) => void;
}

export const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export const useRadioGroup = () => useContext(RadioGroupContext);
