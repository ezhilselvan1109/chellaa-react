import React from "react";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface AsChildProp {
  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior.
   * @default false
   */
  asChild?: boolean;
}
