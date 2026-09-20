import React from "react";
import type { StepProps } from "./Steps.types";

export interface StepFC extends React.FC<StepProps> {
  isStepsStep?: boolean;
}

export const Step: StepFC = ({ children }) => {
  return <>{children}</>;
};

Step.isStepsStep = true;
Step.displayName = "Step";
