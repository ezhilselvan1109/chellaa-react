import * as React from "react";
import type {
  ButtonColorScheme,
  ButtonSize,
  ButtonVariant,
} from "../Button/Button.types";

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Sizing scale passed down to grouped buttons.
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Visual aesthetic treatment passed down to grouped buttons.
   * @default "solid"
   */
  variant?: ButtonVariant;

  /**
   * Semantic color intent passed down to grouped buttons.
   * @default "primary"
   */
  colorScheme?: ButtonColorScheme;

  /**
   * If true, all buttons in the group are disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * If true, adjacent buttons snap together with collapsed borders and inner border-radii.
   * @default false
   */
  isAttached?: boolean;

  /**
   * Layout orientation of the button group.
   * @default "horizontal"
   */
  orientation?: ButtonGroupOrientation;

  /**
   * Custom spacing between buttons when not attached.
   */
  spacing?: string | number;

  /**
   * If true, delegates rendering to the immediate child element using Slot.
   * @default false
   */
  asChild?: boolean;

  /**
   * Buttons to be grouped.
   */
  children?: React.ReactNode;
}

export interface ButtonGroupContextValue {
  size?: ButtonSize | undefined;
  variant?: ButtonVariant | undefined;
  colorScheme?: ButtonColorScheme | undefined;
  isDisabled?: boolean | undefined;
}
