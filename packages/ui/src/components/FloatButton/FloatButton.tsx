import React, { useState, useRef, useEffect, forwardRef } from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { floatButtonCssText } from "./FloatButton.style";
import { useFloatButtonGroupContext } from "./FloatButtonContext";
import { FloatButtonGroup } from "./FloatButtonGroup";
import { FloatButtonBackTop } from "./FloatButtonBackTop";
import type { FloatButtonProps } from "./FloatButton.types";

interface CompoundedFloatButton
  extends React.ForwardRefExoticComponent<
    FloatButtonProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>
  > {
  Group: typeof FloatButtonGroup;
  BackTop: typeof FloatButtonBackTop;
}

export const FloatButtonInternal = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  FloatButtonProps
>(
  (
    {
      icon,
      description,
      content: propContent,
      tooltip,
      type = "default",
      shape: propShape,
      badge,
      disabled = false,
      href,
      target,
      htmlType = "button",
      classNames,
      styles,
      onClick,
      inGroup: propInGroup,
      children,
      className,
      style,
      title,
      ...restProps
    },
    ref
  ) => {
    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-float-button", floatButtonCssText);
    }

    const groupContext = useFloatButtonGroupContext();
    const resolvedShape = propShape ?? groupContext.shape ?? "circle";
    const isInGroup = propInGroup ?? groupContext.inGroup ?? false;

    const [waveKey, setWaveKey] = useState(0);
    const [isWaving, setIsWaving] = useState(false);
    const waveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      return () => {
        if (waveTimerRef.current) clearTimeout(waveTimerRef.current);
      };
    }, []);

    const activeContent = description ?? propContent;
    const hasContent = Boolean(activeContent);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      setWaveKey((k) => k + 1);
      setIsWaving(true);
      if (waveTimerRef.current) clearTimeout(waveTimerRef.current);
      waveTimerRef.current = setTimeout(() => {
        setIsWaving(false);
      }, 450);

      onClick?.(e);
    };

    const rootClasses = [
      "ch-float-btn",
      `ch-float-btn--${type}`,
      `ch-float-btn--${resolvedShape}`,
      hasContent && "ch-float-btn--has-content",
      isInGroup && "ch-float-btn--in-group",
      isWaving && "ch-float-btn--waving",
      classNames?.root,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const rootStyle: React.CSSProperties = {
      ...styles?.root,
      ...style,
    };

    // Native title fallback for tooltip
    const computedTitle =
      typeof tooltip === "string" ? tooltip : title;

    // Badge Node
    let badgeNode: React.ReactNode = null;
    if (badge) {
      if (badge.dot) {
        badgeNode = (
          <span
            className="ch-float-btn-badge-dot"
            style={badge.color ? { backgroundColor: badge.color } : undefined}
          />
        );
      } else if (badge.count !== undefined && badge.count > 0) {
        const overflow = badge.overflowCount ?? 99;
        const displayCount =
          badge.count > overflow ? `${overflow}+` : badge.count;
        badgeNode = (
          <span
            className="ch-float-btn-badge-count"
            style={badge.color ? { backgroundColor: badge.color } : undefined}
          >
            {displayCount}
          </span>
        );
      }
    }

    const waveNode = isWaving && (
      <span
        key={waveKey}
        className="ch-float-btn-wave"
        aria-hidden="true"
        onAnimationEnd={() => setIsWaving(false)}
      />
    );

    const innerContent = (
      <>
        {badgeNode && (
          <span className="ch-float-btn-badge-wrapper" aria-hidden="true">
            {badgeNode}
          </span>
        )}

        {icon && (
          <span
            className={["ch-float-btn-icon", classNames?.icon].filter(Boolean).join(" ")}
            style={styles?.icon}
          >
            {icon}
          </span>
        )}

        {hasContent && (
          <span
            className={["ch-float-btn-content", classNames?.content].filter(Boolean).join(" ")}
            style={styles?.content}
          >
            {activeContent}
          </span>
        )}

        {children}
        {waveNode}
      </>
    );

    // Render as <a> tag when href is provided
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={disabled ? undefined : href}
          target={target}
          rel={target === "_blank" ? "noreferrer noopener" : undefined}
          className={rootClasses}
          style={rootStyle}
          data-type={type}
          data-shape={resolvedShape}
          data-disabled={disabled ? "true" : undefined}
          aria-disabled={disabled}
          title={computedTitle}
          onClick={handleClick}
          {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {innerContent}
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
        disabled={disabled}
        data-type={type}
        data-shape={resolvedShape}
        data-disabled={disabled ? "true" : undefined}
        title={computedTitle}
        onClick={handleClick}
        {...restProps}
      >
        {innerContent}
      </button>
    );
  }
);

export const FloatButton = FloatButtonInternal as CompoundedFloatButton;
FloatButton.displayName = "FloatButton";
FloatButton.Group = FloatButtonGroup;
FloatButton.BackTop = FloatButtonBackTop;
