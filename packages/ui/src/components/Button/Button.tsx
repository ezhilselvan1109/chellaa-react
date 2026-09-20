import React, { useState, forwardRef, useRef } from "react";
import { Slot } from "../../primitives/Slot";
import { Spinner } from "../Spinner";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { buttonCssText } from "./Button.style";
import type {
  ButtonProps,
  ButtonType,
  ButtonVariant,
  ButtonColor,
  ButtonSize,
} from "./Button.types";

const isTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;

function insertSpace(children: React.ReactNode, autoInsertSpace = true): React.ReactNode {
  if (!autoInsertSpace) return children;
  if (typeof children === "string" && isTwoCNChar.test(children.trim())) {
    return children.trim().split("").join(" ");
  }
  return children;
}

function normalizeSize(size: ButtonSize = "medium"): "sm" | "md" | "lg" {
  if (size === "small" || size === "sm") return "sm";
  if (size === "large" || size === "lg") return "lg";
  return "md";
}

function resolveColorAndVariant(
  type?: ButtonType,
  variantProp?: string,
  colorProp?: ButtonColor,
  danger = false
): { color: ButtonColor; variant: ButtonVariant } {
  // If variant is explicitly one of Ant Design 6 variants, use it
  let resolvedVariant: ButtonVariant = "outlined";
  let resolvedColor: ButtonColor = colorProp ?? (danger ? "danger" : "default");

  if (
    variantProp === "solid" ||
    variantProp === "outlined" ||
    variantProp === "dashed" ||
    variantProp === "filled" ||
    variantProp === "text" ||
    variantProp === "link"
  ) {
    resolvedVariant = variantProp;
    if (!colorProp) {
      resolvedColor = danger ? "danger" : variantProp === "solid" ? "primary" : "default";
    }
  } else if (variantProp === "primary") {
    resolvedVariant = "solid";
    if (!colorProp) resolvedColor = danger ? "danger" : "primary";
  } else if (variantProp === "secondary" || variantProp === "outline") {
    resolvedVariant = "outlined";
  } else if (variantProp === "ghost") {
    resolvedVariant = "text";
  } else if (variantProp === "danger") {
    resolvedVariant = "solid";
    if (!colorProp) resolvedColor = "danger";
  } else if (type) {
    // Syntactic sugar mapping
    switch (type) {
      case "primary":
        resolvedVariant = "solid";
        resolvedColor = colorProp ?? (danger ? "danger" : "primary");
        break;
      case "dashed":
        resolvedVariant = "dashed";
        resolvedColor = colorProp ?? (danger ? "danger" : "default");
        break;
      case "text":
        resolvedVariant = "text";
        resolvedColor = colorProp ?? (danger ? "danger" : "default");
        break;
      case "link":
        resolvedVariant = "link";
        resolvedColor = colorProp ?? (danger ? "danger" : "primary");
        break;
      case "default":
      default:
        resolvedVariant = "outlined";
        resolvedColor = colorProp ?? (danger ? "danger" : "default");
        break;
    }
  } else if (colorProp === "primary") {
    resolvedVariant = "solid";
  }

  return { color: resolvedColor, variant: resolvedVariant };
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      asChild = false,
      type,
      variant: propVariant,
      color: propColor,
      danger = false,
      ghost = false,
      shape = "default",
      size = "medium",
      loading = false,
      isLoading: propIsLoading,
      loadingIcon,
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
      autoInsertSpace = true,
      wave = true,
      classNames,
      styles,
      disabled = false,
      className = "",
      style,
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

    const [waveKey, setWaveKey] = useState(0);
    const [isWaving, setIsWaving] = useState(false);
    const waveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(() => {
      return () => {
        if (waveTimerRef.current) {
          clearTimeout(waveTimerRef.current);
          waveTimerRef.current = null;
        }
      };
    }, []);

    const { color, variant } = resolveColorAndVariant(type, propVariant, propColor, danger);
    const normalizedSize = normalizeSize(size);

    // Resolve loading state
    const isComponentLoading =
      typeof loading === "boolean"
        ? loading || !!propIsLoading
        : !!loading;
    const customLoadingIcon =
      loadingIcon ??
      (typeof loading === "object" && loading !== null ? loading.icon : undefined);

    const isBlock = block || fullWidth;
    const isDisabled = disabled || isComponentLoading;

    const isWaveDisabled =
      wave === false ||
      (typeof wave === "object" && wave?.disabled === true) ||
      variant === "link" ||
      variant === "text" ||
      ghost;

    // Handle Ant Design click wave effect
    const handleClick = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }

      if (!isWaveDisabled) {
        setWaveKey((k) => k + 1);
        setIsWaving(true);
        if (waveTimerRef.current) clearTimeout(waveTimerRef.current);
        waveTimerRef.current = setTimeout(() => {
          if (typeof window !== "undefined") {
            setIsWaving(false);
          }
        }, 450);
      }

      onClick?.(e);
    };

    // Icons & Children
    const startIcon = icon && iconPlacement === "start" ? icon : leftIcon;
    const endIcon = icon && iconPlacement === "end" ? icon : rightIcon;
    const contentChildren = insertSpace(children, autoInsertSpace);
    const hasText =
      contentChildren !== undefined &&
      contentChildren !== null &&
      contentChildren !== false &&
      contentChildren !== "";
    const isIconOnly =
      shape === "circle" ||
      (!hasText && (!!startIcon || !!endIcon || (isComponentLoading && !loadingText)));

    const rootClasses = [
      "ch-btn",
      `ch-btn--variant-${variant}`,
      `ch-btn--color-${color}`,
      // Backwards-compatible classnames
      `ch-btn--${type ?? (variant === "solid" ? "primary" : "default")}`,
      `ch-btn--size-${normalizedSize}`,
      shape !== "default" && `ch-btn--shape-${shape}`,
      isIconOnly && "ch-btn--icon-only",
      ghost && "ch-btn--ghost",
      isBlock && "ch-btn--block",
      isComponentLoading && "ch-btn--loading",
      isWaving && "ch-btn--waving",
      classNames?.root,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const rootStyle: React.CSSProperties = {
      ...styles?.root,
      ...style,
    };

    const spinnerNode = customLoadingIcon ? (
      <span className={["ch-btn-icon", classNames?.icon].filter(Boolean).join(" ")} style={styles?.icon}>
        {customLoadingIcon}
      </span>
    ) : (
      <Spinner
        size={normalizedSize === "lg" ? "md" : normalizedSize === "sm" ? "xs" : "sm"}
        label={loadingText ? "" : "Loading..."}
      />
    );

    const waveNode = !isWaveDisabled && isWaving && (
      <span
        key={waveKey}
        className="ch-btn-wave"
        aria-hidden="true"
        onAnimationEnd={() => setIsWaving(false)}
      />
    );

    const content = (
      <>
        {isComponentLoading && spinnerNode}
        {!isComponentLoading && startIcon && (
          <span className={["ch-btn-icon", classNames?.icon].filter(Boolean).join(" ")} style={styles?.icon}>
            {startIcon}
          </span>
        )}
        {isComponentLoading && loadingText ? (
          <span className={["ch-btn-content", classNames?.content].filter(Boolean).join(" ")} style={styles?.content}>
            {loadingText}
          </span>
        ) : (
          hasText && (
            <span className={["ch-btn-content", classNames?.content].filter(Boolean).join(" ")} style={styles?.content}>
              {contentChildren}
            </span>
          )
        )}
        {!isComponentLoading && endIcon && (
          <span className={["ch-btn-icon", classNames?.icon].filter(Boolean).join(" ")} style={styles?.icon}>
            {endIcon}
          </span>
        )}
      </>
    );

    // Slot Polymorphism
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={rootClasses}
          style={rootStyle}
          data-type={type ?? (variant === "solid" ? "primary" : "default")}
          data-variant={variant}
          data-color={color}
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

    // Render as <a> tag when href is provided
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={isDisabled ? undefined : href}
          target={target}
          rel={target === "_blank" ? "noreferrer noopener" : undefined}
          className={rootClasses}
          style={rootStyle}
          data-type={type ?? (variant === "solid" ? "primary" : "default")}
          data-variant={variant}
          data-color={color}
          data-size={normalizedSize}
          data-disabled={isDisabled ? "true" : undefined}
          aria-disabled={isDisabled}
          onClick={handleClick}
          {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
          {waveNode}
        </a>
      );
    }

    // Render as <button>
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={htmlType}
        className={rootClasses}
        style={rootStyle}
        disabled={isDisabled}
        data-type={type ?? (variant === "solid" ? "primary" : "default")}
        data-variant={variant}
        data-color={color}
        data-size={normalizedSize}
        data-disabled={isDisabled ? "true" : undefined}
        data-loading={isComponentLoading ? "true" : undefined}
        aria-busy={isComponentLoading}
        onClick={handleClick}
        {...restProps}
      >
        {content}
        {waveNode}
      </button>
    );
  }
);

Button.displayName = "Button";
