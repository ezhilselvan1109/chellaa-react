import React, { forwardRef } from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { flexCssText } from "./Flex.style";
import type { FlexProps, FlexGap } from "./Flex.types";

const isPresetGap = (gap: unknown): gap is FlexGap => {
  return gap === "small" || gap === "medium" || gap === "large";
};

export const Flex = forwardRef<HTMLElement, FlexProps>(
  (
    {
      children,
      vertical,
      orientation = "horizontal",
      wrap = "nowrap",
      justify,
      align,
      flex,
      gap,
      component: Component = "div",
      className,
      style,
      ...restProps
    },
    ref
  ) => {
    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-flex", flexCssText);
    }

    // Determine vertical direction: vertical prop takes priority over orientation
    const isVertical = vertical !== undefined ? vertical : orientation === "vertical";
    const directionClass = isVertical ? "ch-flex--vertical" : "ch-flex--horizontal";

    // Normalize wrap property: support boolean and CSS string
    let resolvedWrap: React.CSSProperties["flexWrap"] | undefined;
    if (typeof wrap === "boolean") {
      resolvedWrap = wrap ? "wrap" : "nowrap";
    } else if (wrap) {
      resolvedWrap = wrap;
    }

    // Normalize gap property: support preset classes and custom inline style
    const isPreset = isPresetGap(gap);
    const gapClass = isPreset ? `ch-flex--gap-${gap}` : undefined;

    let customGap: string | undefined;
    if (gap !== undefined && !isPreset) {
      customGap = typeof gap === "number" ? `${gap}px` : String(gap);
    }

    const flexStyle: React.CSSProperties = {
      ...(resolvedWrap ? { flexWrap: resolvedWrap } : {}),
      ...(justify ? { justifyContent: justify } : {}),
      ...(align ? { alignItems: align } : {}),
      ...(flex ? { flex } : {}),
      ...(customGap ? { gap: customGap } : {}),
      ...style,
    };

    const flexClasses = [
      "ch-flex",
      directionClass,
      gapClass,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component
        ref={ref as any}
        className={flexClasses}
        style={flexStyle}
        {...restProps}
      >
        {children}
      </Component>
    );
  }
);

Flex.displayName = "Flex";
