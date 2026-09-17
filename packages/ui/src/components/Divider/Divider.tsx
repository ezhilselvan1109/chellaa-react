import React, { forwardRef } from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { dividerCssText } from "./Divider.style";
import type { DividerProps, DividerOrientation, DividerVariant, DividerTitlePlacement } from "./Divider.types";

function normalizePlacement(placement?: DividerTitlePlacement): "start" | "center" | "end" {
  if (placement === "left") return "start";
  if (placement === "right") return "end";
  return placement ?? "center";
}

function normalizeMargin(margin?: number | string): string | undefined {
  if (margin === undefined || margin === null) return undefined;
  if (typeof margin === "number") {
    // If between 0 and 1, treat as percentage
    if (margin > 0 && margin < 1) {
      return `${margin * 100}%`;
    }
    return `${margin}px`;
  }
  return margin;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>((props, ref) => {
  const {
    children,
    orientation: propOrientation,
    vertical = false,
    variant: propVariant,
    dashed = false,
    plain = false,
    size,
    titlePlacement: propTitlePlacement,
    orientationMargin,
    classNames,
    styles,
    className,
    style,
    ...restProps
  } = props;

  if (typeof window !== "undefined") {
    injectStyle("ch-theme-tokens", tokensCssText);
    injectStyle("ch-divider", dividerCssText);
  }

  const orientation: DividerOrientation =
    propOrientation ?? (vertical ? "vertical" : "horizontal");
  const variant: DividerVariant =
    propVariant ?? (dashed ? "dashed" : "solid");
  const hasChildren = orientation === "horizontal" && Boolean(children);

  // If orientationMargin is provided but titlePlacement is not, Ant Design defaults to "start"
  const placement = propTitlePlacement
    ? normalizePlacement(propTitlePlacement)
    : (orientationMargin !== undefined ? "start" : "center");

  // Resolve object or functional classNames & styles (Ant Design 6.0 specification)
  const resolvedClassNames =
    typeof classNames === "function" ? classNames({ props }) : (classNames || {});
  const resolvedStyles =
    typeof styles === "function" ? styles({ props }) : (styles || {});

  const rootClasses = [
    "ch-divider",
    `ch-divider--${orientation}`,
    `ch-divider--${variant}`,
    hasChildren && "ch-divider--with-text",
    hasChildren && `ch-divider--title-${placement}`,
    plain && "ch-divider--plain",
    size && `ch-divider--size-${size}`,
    resolvedClassNames.root,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const rootStyle: React.CSSProperties = {
    ...resolvedStyles.root,
    ...style,
  };

  // Vertical Divider
  if (orientation === "vertical") {
    return (
      <div
        ref={ref}
        className={rootClasses}
        style={rootStyle}
        role="separator"
        aria-orientation="vertical"
        {...restProps}
      />
    );
  }

  // Horizontal Divider without inner title text
  if (!hasChildren) {
    return (
      <div
        ref={ref}
        className={rootClasses}
        style={rootStyle}
        role="separator"
        {...restProps}
      />
    );
  }

  // Horizontal Divider with inner title text
  const customMargin = normalizeMargin(orientationMargin);
  const startRailStyle: React.CSSProperties = {
    ...resolvedStyles.rail,
    ...(customMargin !== undefined && placement === "start"
      ? { width: customMargin, flex: "none" }
      : {}),
  };

  const endRailStyle: React.CSSProperties = {
    ...resolvedStyles.rail,
    ...(customMargin !== undefined && placement === "end"
      ? { width: customMargin, flex: "none" }
      : {}),
  };

  return (
    <div
      ref={ref}
      className={rootClasses}
      style={rootStyle}
      role="separator"
      {...restProps}
    >
      <span
        className={["ch-divider-rail", "ch-divider-rail--start", resolvedClassNames.rail]
          .filter(Boolean)
          .join(" ")}
        style={startRailStyle}
        aria-hidden="true"
      />

      <span
        className={["ch-divider-content", resolvedClassNames.content]
          .filter(Boolean)
          .join(" ")}
        style={resolvedStyles.content}
      >
        {children}
      </span>

      <span
        className={["ch-divider-rail", "ch-divider-rail--end", resolvedClassNames.rail]
          .filter(Boolean)
          .join(" ")}
        style={endRailStyle}
        aria-hidden="true"
      />
    </div>
  );
});

Divider.displayName = "Divider";
