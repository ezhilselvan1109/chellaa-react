import React, { useState, forwardRef, useRef } from "react";
import { Slot } from "../../primitives/Slot";
import { Spinner } from "../Spinner";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { buttonCssText } from "./Button.style";
import type { ButtonProps, ButtonType, ButtonSize } from "./Button.types";

function normalizeSize(size: ButtonSize = "medium"): "sm" | "md" | "lg" {
  if (size === "small" || size === "sm") return "sm";
  if (size === "large" || size === "lg") return "lg";
  return "md";
}

function resolveButtonType(
  type?: ButtonType,
  variant?: string
): ButtonType {
  if (type) return type;
  if (variant === "secondary" || variant === "outline") return "default";
  if (variant === "ghost") return "text";
  if (variant === "primary") return "primary";
  if (variant === "danger") return "primary";
  return "default";
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      asChild = false,
      type: propType,
      variant,
      danger = false,
      ghost = false,
      shape = "default",
      size = "medium",
      loading = false,
      isLoading: propIsLoading,
      loadingText,
      block = false,
      fullWidth = false,
      icon,
      iconPlacement = "start",
      leftIcon,
      rightIcon,
      href,
      target,
      htmlType = "button",
      disabled = false,
      className = "",
      onClick,
      children,
      ...restProps
    },
    ref
  ) => {
    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-button", buttonCssText);
    }

    const [isWaving, setIsWaving] = useState(false);
    const waveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const buttonType = resolveButtonType(propType, variant);
    const normalizedSize = normalizeSize(size);

    // Resolve loading state
    const isComponentLoading =
      typeof loading === "boolean"
        ? loading || !!propIsLoading
        : !!loading;
    const customLoadingIcon =
      typeof loading === "object" && loading !== null ? loading.icon : undefined;

    const isDanger = danger || variant === "danger";
    const isGhost = ghost || variant === "ghost";
    const isBlock = block || fullWidth;
    const isDisabled = disabled || isComponentLoading;

    // Handle Ant Design click wave effect
    const handleClick = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }

      if (buttonType !== "link" && !isGhost) {
        setIsWaving(true);
        if (waveTimerRef.current) clearTimeout(waveTimerRef.current);
        waveTimerRef.current = setTimeout(() => {
          setIsWaving(false);
        }, 400);
      }

      onClick?.(e);
    };

    const classNames = [
      "ch-btn",
      `ch-btn--${buttonType}`,
      `ch-btn--size-${normalizedSize}`,
      shape !== "default" && `ch-btn--shape-${shape}`,
      isDanger && "ch-btn--danger",
      isGhost && "ch-btn--ghost",
      isBlock && "ch-btn--block",
      isComponentLoading && "ch-btn--loading",
      isWaving && "ch-btn--waving",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Icon handling
    const startIcon = icon && iconPlacement === "start" ? icon : leftIcon;
    const endIcon = icon && iconPlacement === "end" ? icon : rightIcon;

    const spinnerNode = customLoadingIcon ? (
      <span className="ch-btn__icon">{customLoadingIcon}</span>
    ) : (
      <Spinner
        size={normalizedSize === "lg" ? "md" : normalizedSize === "sm" ? "xs" : "sm"}
        label={loadingText ? "" : "Loading..."}
      />
    );

    const content = (
      <>
        {isComponentLoading && spinnerNode}
        {!isComponentLoading && startIcon && (
          <span className="ch-btn__icon">{startIcon}</span>
        )}
        {isComponentLoading && loadingText ? (
          <span>{loadingText}</span>
        ) : (
          children !== undefined && <span>{children}</span>
        )}
        {!isComponentLoading && endIcon && (
          <span className="ch-btn__icon">{endIcon}</span>
        )}
      </>
    );

    // Slot polymorphism
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={classNames}
          data-type={buttonType}
          data-size={normalizedSize}
          data-disabled={isDisabled ? "true" : undefined}
          data-loading={isComponentLoading ? "true" : undefined}
          aria-busy={isComponentLoading}
          aria-disabled={isDisabled}
          onClick={handleClick}
          {...restProps}
        >
          {children}
        </Slot>
      );
    }

    // Render as <a> when href is specified
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={isDisabled ? undefined : href}
          target={target}
          rel={target === "_blank" ? "noreferrer noopener" : undefined}
          className={classNames}
          data-type={buttonType}
          data-size={normalizedSize}
          data-disabled={isDisabled ? "true" : undefined}
          aria-disabled={isDisabled}
          onClick={handleClick}
          {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    // Render as <button>
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={htmlType}
        className={classNames}
        disabled={isDisabled}
        data-type={buttonType}
        data-size={normalizedSize}
        data-disabled={isDisabled ? "true" : undefined}
        data-loading={isComponentLoading ? "true" : undefined}
        aria-busy={isComponentLoading}
        onClick={handleClick}
        {...restProps}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
