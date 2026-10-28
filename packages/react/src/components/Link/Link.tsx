"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import type { LinkProps, LinkUnderline, LinkColorScheme } from "./Link.types";

export type { LinkProps, LinkUnderline, LinkColorScheme };

const StyledLinkRoot = styled("a", {
  name: "ChellaaLink",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "underline" &&
    prop !== "colorScheme" &&
    prop !== "isExternal" &&
    prop !== "showExternalIcon" &&
    prop !== "isDisabled" &&
    prop !== "asChild" &&
    prop !== "component",
})({});

/**
 * Accessible external link icon (rendered with aria-hidden="true").
 */
function ExternalLinkIcon() {
  return (
    <svg
      className="cl-link__external-icon"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/**
 * Link component styling native anchor elements with design system tokens,
 * underline variants, security guards for external destinations, and Slot composition.
 *
 * @example
 * ```tsx
 * <Link href="/docs">Documentation</Link>
 * <Link href="https://github.com" isExternal>GitHub</Link>
 * ```
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, forwardedRef) {
    const {
      underline = "hover",
      colorScheme = "primary",
      isExternal = false,
      showExternalIcon = true,
      isDisabled = false,
      asChild = false,
      component = "a",
      as,
      href,
      target: targetProp,
      rel: relProp,
      onClick,
      className,
      children,
      style,
      sx,
      ...rest
    } = props;

    // Secure rel calculation
    const isBlank = targetProp === "_blank" || isExternal;
    const target = targetProp ?? (isExternal ? "_blank" : undefined);

    let rel = relProp;
    if (isBlank) {
      const parts = new Set((relProp ?? "").split(" ").filter(Boolean));
      parts.add("noopener");
      parts.add("noreferrer");
      rel = Array.from(parts).join(" ");
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isDisabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      onClick?.(e);
    };

    const linkClasses = classNames(
      "cl-link",
      `cl-link--underline-${underline}`,
      `cl-link--color-${colorScheme}`,
      isDisabled && "cl-link--disabled",
      className,
    );

    const targetTag = component || as;

    if (asChild) {
      return (
        <StyledLinkRoot
          as={Slot}
          ref={forwardedRef}
          href={isDisabled ? undefined : href}
          target={target}
          rel={rel}
          onClick={handleClick}
          aria-disabled={isDisabled ? "true" : undefined}
          tabIndex={isDisabled ? -1 : props.tabIndex}
          className={linkClasses}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledLinkRoot>
      );
    }

    return (
      <StyledLinkRoot
        as={targetTag}
        ref={forwardedRef}
        href={isDisabled ? undefined : href}
        target={target}
        rel={rel}
        onClick={handleClick}
        aria-disabled={isDisabled ? "true" : undefined}
        tabIndex={isDisabled ? -1 : props.tabIndex}
        className={linkClasses}
        style={style}
        sx={sx}
        {...rest}
      >
        {children}
        {isExternal && showExternalIcon && <ExternalLinkIcon />}
      </StyledLinkRoot>
    );
  },
);

Link.displayName = "Link";
