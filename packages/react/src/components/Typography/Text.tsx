import * as React from "react";
import { Typography, type TypographyProps } from "./Typography";
import type { TypographyVariant } from "../../theme/types";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface TextProps extends TypographyProps {
  /**
   * Shorthand text size mapping to theme typographic scale:
   * - "xs": caption (12px)
   * - "sm": body2 (14px)
   * - "md": body1 (16px)
   * - "lg": subtitle1 (16px/medium)
   * - "xl": h6 (20px)
   */
  size?: TextSize | undefined;
  /**
   * If true, renders as block element ('div' or 'p'). Otherwise renders as inline 'span'.
   * @default false
   */
  block?: boolean | undefined;
}

const sizeToVariant: Record<TextSize, TypographyVariant> = {
  xs: "caption",
  sm: "body2",
  md: "body1",
  lg: "subtitle1",
  xl: "h6",
};

/**
 * Ergonomic inline or block textual primitive.
 *
 * @example
 * <Text size="sm" color="text.secondary">Secondary caption</Text>
 * <Text block noWrap>Single line block item</Text>
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  function Text(props, ref) {
    const { size, variant, block = false, component, ...rest } = props;

    const resolvedVariant = variant || (size ? sizeToVariant[size] : "body1");
    const defaultTag = block ? "p" : "span";
    const resolvedComponent = component || defaultTag;

    return (
      <Typography
        ref={ref}
        component={resolvedComponent}
        variant={resolvedVariant}
        {...rest}
      />
    );
  }
);

Text.displayName = "Text";
