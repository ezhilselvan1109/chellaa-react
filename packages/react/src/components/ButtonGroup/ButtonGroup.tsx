"use client";

import * as React from "react";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import type {
  ButtonGroupContextValue,
  ButtonGroupProps,
} from "./ButtonGroup.types";
import { ButtonGroupContext } from "./ButtonGroupContext";

/**
 * Chellaa React ButtonGroup component.
 *
 * Container primitive for grouping related buttons with unified sizing,
 * visual variants, color schemes, disabled states, and attached border management.
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(props, forwardedRef) {
    const {
      asChild = false,
      size,
      variant,
      colorScheme,
      isDisabled,
      isAttached = false,
      orientation = "horizontal",
      spacing,
      className,
      style,
      children,
      role: roleProp,
      ...restProps
    } = props;

    const role =
      roleProp !== undefined ? roleProp : asChild ? undefined : "group";

    const contextValue = React.useMemo<ButtonGroupContextValue>(
      () => ({
        size,
        variant,
        colorScheme,
        isDisabled,
      }),
      [size, variant, colorScheme, isDisabled],
    );

    const groupClassName = classNames(
      "cl-button-group",
      `cl-button-group--${orientation}`,
      isAttached && "cl-button-group--attached",
      className,
    );

    const groupStyle: React.CSSProperties = {
      ...style,
      ...(spacing !== undefined && !isAttached
        ? { gap: typeof spacing === "number" ? `${spacing}px` : spacing }
        : {}),
    };

    if (asChild) {
      return (
        <ButtonGroupContext.Provider value={contextValue}>
          <Slot
            ref={forwardedRef as React.Ref<HTMLElement>}
            role={role}
            className={groupClassName}
            style={groupStyle}
            {...restProps}
          >
            {children}
          </Slot>
        </ButtonGroupContext.Provider>
      );
    }

    return (
      <ButtonGroupContext.Provider value={contextValue}>
        <div
          ref={forwardedRef}
          role={role}
          className={groupClassName}
          style={groupStyle}
          {...restProps}
        >
          {children}
        </div>
      </ButtonGroupContext.Provider>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";
