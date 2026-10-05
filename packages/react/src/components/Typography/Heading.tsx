import * as React from "react";
import { Typography, type TypographyProps } from "./Typography";
import type { TypographyVariant } from "../../theme/types";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends Omit<TypographyProps, "variant"> {
  /**
   * Semantic heading level (1 to 6).
   * Determines both default HTML tag (h1..h6) and typography scale variant unless overridden.
   * @default 2
   */
  level?: HeadingLevel | undefined;
  /**
   * Optional visual scale variant to decouple styling from heading level.
   */
  variant?: TypographyVariant | undefined;
}

/**
 * Ergonomic semantic heading primitive.
 *
 * @example
 * <Heading level={1}>Page Title</Heading>
 * <Heading level={2} variant="h4">Visually smaller Section Title</Heading>
 */
export const Heading = React.forwardRef<HTMLElement, HeadingProps>(
  function Heading(props, ref) {
    const { level = 2, variant, component, ...rest } = props;

    const levelTag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    const resolvedVariant = variant || levelTag;
    const resolvedComponent = component || levelTag;

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

Heading.displayName = "Heading";
