import { createContext, useContext } from "react";
import type { CheckboxChangeEvent } from "./Checkbox.types";

export interface CheckboxGroupContextType {
  value?: (string | number | boolean)[];
  disabled?: boolean;
  name?: string;
  toggleOption?: (option: { value: string | number | boolean; e: CheckboxChangeEvent }) => void;
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(null);

export const useCheckboxGroup = () => useContext(CheckboxGroupContext);
