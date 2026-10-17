import * as React from "react";
import type { SxProps } from "../../system/types";

export type PaperVariant = "elevation" | "outlined";

export interface PaperOwnerState {
  elevation?: number | undefined;
  variant?: PaperVariant | undefined;
  square?: boolean | undefined;
}

export interface PaperProps
  extends React.HTMLAttributes<HTMLElement>,
    PaperOwnerState {
  /**
   * If true, delegate rendering to immediate child element using Slot
   */
  asChild?: boolean | undefined;
  /**
   * The underlying HTML element or component
   */
  component?: React.ElementType | undefined;
  /**
   * The underlying HTML element or component
   */
  as?: React.ElementType | undefined;
  /**
   * The system-aware sx prop
   */
  sx?: SxProps;
  children?: React.ReactNode;
}
