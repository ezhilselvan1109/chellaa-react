import React from "react";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Size of the input field.
   * @default "md"
   */
  size?: InputSize;
  /**
   * Whether the input is in an invalid/error state.
   * @default false
   */
  invalid?: boolean;
}
