"use client";

import * as React from "react";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import { useButtonGroupContext } from "../ButtonGroup/ButtonGroupContext";
import { styled } from "../../system/styled";
import { TouchRipple } from "../../ripple/TouchRipple";
import { useRipple } from "../../ripple/useRipple";
import type { ButtonProps } from "./Button.types";

/**
 * Animated SVG spinner for loading states.
 */
function ButtonSpinner() {
  return (
    <svg
      className="cl-button__spinner"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeOpacity="0.25"
      />
      <path
        d="M12 3a9 9 0 0 1 9 9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const StyledButtonRoot = styled("button", {
  name: "ChellaaButton",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "variant" &&
    prop !== "colorScheme" &&
    prop !== "isFullWidth" &&
    prop !== "isLoading" &&
    prop !== "isDisabled" &&
    prop !== "loadingText" &&
    prop !== "loadingPosition" &&
    prop !== "startIcon" &&
    prop !== "endIcon" &&
    prop !== "disableRipple" &&
    prop !== "asChild",
})({});

/**
 * Chellaa React Button component.
 *
 * Fundamental action primitive supporting 5 variants, 5 sizes, 7 color schemes,
 * tactile touch ripple feedback, loading states, icons, keyboard interaction,
 * theme overrides, and polymorphic slot delegation via `asChild`.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, forwardedRef) {
    const {
      asChild = false,
      variant: variantProp,
      size: sizeProp,
      colorScheme: colorSchemeProp,
      isLoading = false,
      loadingText,
      loadingPosition = "start",
      isDisabled: isDisabledProp,
      isFullWidth = false,
      startIcon,
      endIcon,
      className,
      children,
      disabled: disabledProp,
      type = "button",
      onClick,
      onKeyDown,
      disableRipple = false,
      sx,
      ...restProps
    } = props;

    const buttonGroup = useButtonGroupContext();

    const variant = variantProp ?? buttonGroup?.variant ?? "solid";
    const size = sizeProp ?? buttonGroup?.size ?? "md";
    const colorScheme =
      colorSchemeProp ?? buttonGroup?.colorScheme ?? "primary";
    const isDisabled =
      isDisabledProp ?? disabledProp ?? buttonGroup?.isDisabled ?? false;
    const isEffectivelyDisabled = isDisabled || isLoading;

    const { rippleProps, getRippleHandlers } = useRipple({
      disabled: isEffectivelyDisabled,
      disableRipple,
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isEffectivelyDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (isEffectivelyDisabled) {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
      }
      onKeyDown?.(event);
    };

    const buttonClassName = classNames(
      "cl-button",
      `cl-button--${variant}`,
      `cl-button--${size}`,
      `cl-button--${colorScheme}`,
      isLoading && "cl-button--loading",
      isDisabled && "cl-button--disabled",
      isFullWidth && "cl-button--full-width",
      className,
    );

    const spinner = <ButtonSpinner />;

    // When asChild is enabled, delegate root rendering to child via Slot
    if (asChild) {
      return (
        <StyledButtonRoot
          as={Slot}
          ref={forwardedRef as React.Ref<HTMLElement>}
          className={buttonClassName}
          aria-disabled={isEffectivelyDisabled ? true : undefined}
          aria-busy={isLoading ? true : undefined}
          sx={sx}
          onClick={
            handleClick as unknown as React.MouseEventHandler<HTMLElement>
          }
          onKeyDown={
            handleKeyDown as unknown as React.KeyboardEventHandler<HTMLElement>
          }
          {...restProps}
        >
          {children}
        </StyledButtonRoot>
      );
    }

    // Center loading state: keep button dimensions identical by visually hiding label
    const isCenterLoading = isLoading && loadingPosition === "center";

    const buttonHandlers = getRippleHandlers({
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      ...restProps,
    });

    return (
      <StyledButtonRoot
        ref={forwardedRef}
        type={type}
        disabled={isEffectivelyDisabled ? true : undefined}
        aria-disabled={isEffectivelyDisabled ? true : undefined}
        aria-busy={isLoading ? true : undefined}
        className={buttonClassName}
        sx={sx}
        {...buttonHandlers}
      >
        {isCenterLoading ? (
          <>
            <span className="cl-button__spinner-wrapper--center">
              {spinner}
            </span>
            <span className="cl-button__content--hidden">
              {startIcon && (
                <span
                  className="cl-button__icon cl-button__icon--start"
                  aria-hidden="true"
                >
                  {startIcon}
                </span>
              )}
              {children !== undefined && (
                <span className="cl-button__label">{children}</span>
              )}
              {endIcon && (
                <span
                  className="cl-button__icon cl-button__icon--end"
                  aria-hidden="true"
                >
                  {endIcon}
                </span>
              )}
            </span>
          </>
        ) : (
          <>
            {isLoading && loadingPosition === "start" && spinner}
            {!isLoading && startIcon && (
              <span
                className="cl-button__icon cl-button__icon--start"
                aria-hidden="true"
              >
                {startIcon}
              </span>
            )}
            {isLoading && loadingText ? (
              <span className="cl-button__label">{loadingText}</span>
            ) : children !== undefined ? (
              <span className="cl-button__label">{children}</span>
            ) : null}
            {isLoading && loadingPosition === "end" && spinner}
            {!isLoading && endIcon && (
              <span
                className="cl-button__icon cl-button__icon--end"
                aria-hidden="true"
              >
                {endIcon}
              </span>
            )}
          </>
        )}
        {!disableRipple && !isEffectivelyDisabled && (
          <TouchRipple {...rippleProps} />
        )}
      </StyledButtonRoot>
    );
  },
);

Button.displayName = "Button";
