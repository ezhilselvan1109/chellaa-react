import * as React from "react";
import { Typography, type TypographyProps } from "./Typography";

export interface ParagraphProps extends TypographyProps {
  /**
   * Shorthand spacing multiplier for bottom margin (defaults to standard gutterBottom).
   */
  spacing?: number | string | undefined;
}

/**
 * Ergonomic paragraph block primitive with standard reading margins.
 *
 * @example
 * <Paragraph>
 *   This is standard paragraph text with built-in reading spacing.
 * </Paragraph>
 */
export const Paragraph = React.forwardRef<HTMLElement, ParagraphProps>(
  function Paragraph(props, ref) {
    const { component = "p", variant = "body1", gutterBottom = true, ...rest } = props;

    return (
      <Typography
        ref={ref}
        component={component}
        variant={variant}
        gutterBottom={gutterBottom}
        {...rest}
      />
    );
  }
);

Paragraph.displayName = "Paragraph";
