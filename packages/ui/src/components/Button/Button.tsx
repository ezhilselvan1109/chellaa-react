import React from "react";
import { Slot } from "../../primitives/Slot";
import { Spinner } from "../Spinner";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { buttonCssText } from "./Button.style";
import type { ButtonProps, ButtonSize } from "./Button.types";

const spinnerSizeMap: Record<ButtonSize, "xs" | "sm" | "md"> = {
  sm: "xs",
  md: "sm",
  lg: "md",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      type = "button",
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Automatically ensure design tokens and button styles are injected into document.head
    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-button", buttonCssText);
    }

    const Component = asChild ? Slot : "button";

    const classNames = [
      "ch-btn",
      `ch-btn--${variant}`,
      `ch-btn--${size}`,
      fullWidth && "ch-btn--full-width",
      isLoading && "ch-btn--loading",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const isDisabled = disabled || isLoading;

    const content = (
      <>
        {isLoading && (
          <Spinner
            size={spinnerSizeMap[size]}
            label={loadingText ? "" : "Loading..."}
          />
        )}
        {!isLoading && leftIcon}
        {isLoading && loadingText ? loadingText : children}
        {!isLoading && rightIcon}
      </>
    );

    if (asChild) {
      return (
        <Component
          ref={ref}
          className={classNames}
          data-variant={variant}
          data-size={size}
          data-disabled={isDisabled ? "true" : undefined}
          data-loading={isLoading ? "true" : undefined}
          aria-busy={isLoading}
          aria-disabled={isDisabled}
          {...props}
        >
          {children}
        </Component>
      );
    }

    return (
      <Component
        ref={ref}
        type={type}
        className={classNames}
        disabled={isDisabled}
        data-variant={variant}
        data-size={size}
        data-disabled={isDisabled ? "true" : undefined}
        data-loading={isLoading ? "true" : undefined}
        aria-busy={isLoading}
        {...props}
      >
        {content}
      </Component>
    );
  }
);

Button.displayName = "ChellaButton";
