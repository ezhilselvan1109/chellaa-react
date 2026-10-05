import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";

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
})<{ ownerState: CodeOwnerState }>(({ theme, ownerState }) => {
  const isPrimary = ownerState.colorScheme === "primary";
  const isSecondary = ownerState.colorScheme === "secondary";

  let bg = theme.palette.action.hover;
  let text = theme.palette.text.primary;
  let border = theme.palette.divider;

  if (isPrimary) {
    bg = theme.palette.primary.light ? `${theme.palette.primary.main}15` : theme.palette.action.hover;
    text = theme.palette.primary.main;
    border = `${theme.palette.primary.main}40`;
  } else if (isSecondary) {
    bg = theme.palette.secondary.light ? `${theme.palette.secondary.main}15` : theme.palette.action.hover;
    text = theme.palette.secondary.main;
    border = `${theme.palette.secondary.main}40`;
  }

  return {
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: "0.875em",
    padding: "0.15em 0.4em",
    margin: "0 0.15em",
    borderRadius: (theme.shape?.borderRadius ?? 4) / 2,
    backgroundColor: bg,
    color: text,
    border: `1px solid ${border}`,
    display: "inline-block",
    lineHeight: 1.25,
    verticalAlign: "baseline",
    boxSizing: "border-box",
  };
});

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
      ...rest
    } = props;

    const ownerState: CodeOwnerState = { colorScheme };
    const targetTag = component || as || "code";

    if (asChild) {
      return (
        <StyledCodeRoot
          as={Slot}
          ref={ref as any}
          ownerState={ownerState}
          {...rest}
        />
      );
    }

    return (
      <StyledCodeRoot
        as={targetTag}
        ref={ref as any}
        ownerState={ownerState}
        {...rest}
      />
    );
  }
);

Code.displayName = "Code";
