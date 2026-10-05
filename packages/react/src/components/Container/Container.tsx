import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import type { BreakpointKey } from "../../theme/types";
import { breakpointKeys } from "../../theme/breakpoints";
import { Slot } from "../../primitives/Slot";

export interface ContainerOwnerState {
  maxWidth?: BreakpointKey | false | undefined;
  fixed?: boolean | undefined;
  disableGutters?: boolean | undefined;
}

export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement>,
    ContainerOwnerState {
  /**
   * If true, delegate rendering to immediate child element using Slot
   */
  asChild?: boolean;
  /**
   * The underlying HTML element or component
   */
  component?: React.ElementType;
  /**
   * The underlying HTML element or component
   */
  as?: React.ElementType;
  /**
   * The system-aware sx prop
   */
  sx?: SxProps;
  children?: React.ReactNode;
}

const StyledContainerRoot = styled("div", {
  name: "ChellaaContainer",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "maxWidth" &&
    prop !== "fixed" &&
    prop !== "disableGutters" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: ContainerOwnerState }>(({ theme, ownerState }) => {
  const styles: Record<string, any> = {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    boxSizing: "border-box",
    display: "block",
  };

  // 1. Gutters (fluid horizontal padding)
  if (!ownerState.disableGutters) {
    styles.paddingLeft = theme.spacing(2);
    styles.paddingRight = theme.spacing(2);

    const smMedia = theme.breakpoints.up("sm");
    styles[smMedia] = {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    };
  }

  // 2. MaxWidth / Fixed breakpoint step scaling
  const { maxWidth = "lg", fixed = false } = ownerState;

  if (maxWidth !== false) {
    if (fixed) {
      for (const bp of breakpointKeys) {
        const bpVal = theme.breakpoints.values[bp];
        if (bpVal !== 0) {
          const media = theme.breakpoints.up(bp);
          styles[media] = {
            ...(styles[media] || {}),
            maxWidth: `${bpVal}px`,
          };
        }
        if (bp === maxWidth) break;
      }
    } else {
      const bpKey = maxWidth as BreakpointKey;
      const bpVal = theme.breakpoints.values[bpKey];
      if (bpVal !== undefined && bpVal !== 0) {
        styles.maxWidth = `${bpVal}px`;
      }
    }
  }

  return styles;
});

/**
 * Centered responsive max-width container with fluid gutters.
 *
 * @example
 * <Container maxWidth="md">
 *   <Typography variant="h1">Header</Typography>
 * </Container>
 */
export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  function Container(props, ref) {
    const {
      asChild = false,
      component,
      as,
      maxWidth = "lg",
      fixed = false,
      disableGutters = false,
      ...rest
    } = props;

    const ownerState: ContainerOwnerState = {
      maxWidth,
      fixed,
      disableGutters,
    };

    const targetTag = component || as;

    if (asChild) {
      return (
        <StyledContainerRoot
          as={Slot}
          ref={ref as any}
          ownerState={ownerState}
          {...rest}
        />
      );
    }

    if (targetTag) {
      return (
        <StyledContainerRoot
          as={targetTag}
          ref={ref as any}
          ownerState={ownerState}
          {...rest}
        />
      );
    }

    return (
      <StyledContainerRoot
        ref={ref as any}
        ownerState={ownerState}
        {...rest}
      />
    );
  }
);

Container.displayName = "Container";
