"use client";

import * as React from "react";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import { useButtonGroupContext } from "../ButtonGroup/ButtonGroupContext";
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

/**
 * Chellaa React Button component.
 *
 * Fundamental action primitive supporting 5 variants, 5 sizes, 7 color schemes,
 * loading states, icons, keyboard interaction, and polymorphic slot delegation via `asChild`.
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
        <Slot
          ref={forwardedRef as React.Ref<HTMLElement>}
          className={buttonClassName}
          aria-disabled={isEffectivelyDisabled ? true : undefined}
          aria-busy={isLoading ? true : undefined}
          onClick={
            handleClick as unknown as React.MouseEventHandler<HTMLElement>
          }
          onKeyDown={
            handleKeyDown as unknown as React.KeyboardEventHandler<HTMLElement>
          }
          {...restProps}
        >
          {children}
        </Slot>
      );
    }

    // Center loading state: keep button dimensions identical by visually hiding label
    const isCenterLoading = isLoading && loadingPosition === "center";

    return (
      <button
        ref={forwardedRef}
        type={type}
        disabled={isEffectivelyDisabled ? true : undefined}
        aria-disabled={isEffectivelyDisabled ? true : undefined}
        aria-busy={isLoading ? true : undefined}
        className={buttonClassName}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...restProps}
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
      </button>
    );
  },
);

Button.displayName = "Button";
