import React from "react";
import { Slot } from "../../primitives/Slot";
import { Spinner } from "../Spinner";
import type { ButtonProps, ButtonSize } from "./Button.types";
import styles from "./Button.module.css";

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
    const Component = asChild ? Slot : "button";

    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      isLoading && styles.loading,
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
            className={styles.spinner}
            label={loadingText ? "" : "Loading..."}
          />
        )}
        {!isLoading && leftIcon}
        {isLoading && loadingText ? loadingText : children}
        {!isLoading && rightIcon}
      </>
    );

    // When asChild is true, Slot clones the single child element
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
