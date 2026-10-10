"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";

export type CodeColorScheme = "default" | "primary" | "secondary";

export interface CodeOwnerState {
  colorScheme?: CodeColorScheme | undefined;
}

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    CodeOwnerState {
  asChild?: boolean | undefined;
  component?: React.ElementType | undefined;
  as?: React.ElementType | undefined;
  sx?: SxProps;
  children?: React.ReactNode;
}

const StyledCodeRoot = styled("code", {
  name: "ChellaaCode",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "colorScheme" &&
    prop !== "asChild" &&
    prop !== "component",
})({});

/**
 * Inline monospace code chip primitive for identifiers, filenames, and CLI snippets.
 *
 * @example
 * <Text>Run <Code>npm install</Code> to install dependencies.</Text>
 * <Code colorScheme="primary">package.json</Code>
 */
export const Code = React.forwardRef<HTMLElement, CodeProps>(
  function Code(props, ref) {
    const {
      asChild = false,
      component = "code",
      as,
      colorScheme = "default",
      className,
      style,
      sx,
      children,
      ...rest
    } = props;

    const codeClassName = classNames(
      "cl-code",
      colorScheme !== "default" && `cl-code--${colorScheme}`,
      className
    );

    const targetTag = component || as || "code";

    if (asChild) {
      return (
        <StyledCodeRoot
          as={Slot}
          ref={ref as any}
          className={codeClassName}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledCodeRoot>
      );
    }

    return (
      <StyledCodeRoot
        as={targetTag}
        ref={ref as any}
        className={codeClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        {children}
      </StyledCodeRoot>
    );
  }
);

Code.displayName = "Code";
