import React from "react";
import type { OptionProps } from "./Select.types";

export interface OptionFC extends React.FC<OptionProps> {
  isSelectOption?: boolean;
}

export const Option: OptionFC = ({ children }) => {
  return <>{children}</>;
};

Option.isSelectOption = true;
Option.displayName = "Option";
