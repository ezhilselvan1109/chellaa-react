import React from "react";
import type { OptGroupProps } from "./Select.types";

export interface OptGroupFC extends React.FC<OptGroupProps> {
  isSelectOptGroup?: boolean;
}

export const OptGroup: OptGroupFC = ({ children }) => {
  return <>{children}</>;
};

OptGroup.isSelectOptGroup = true;
OptGroup.displayName = "OptGroup";
