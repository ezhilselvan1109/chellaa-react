import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";

export type PaperVariant = "elevation" | "outlined";

export interface PaperOwnerState {
  elevation?: number | undefined;
  variant?: PaperVariant | undefined;
  square?: boolean | undefined;
}

export interface PaperProps
  extends React.HTMLAttributes<HTMLElement>,
    PaperOwnerState {
  /**
   * If true, delegate rendering to immediate child element using Slot
   */
  asChild?: boolean | undefined;
  /**
   * The underlying HTML element or component
   */
  component?: React.ElementType | undefined;
  /**
   * The underlying HTML element or component
   */
  as?: React.ElementType | undefined;
  /**
   * The system-aware sx prop
   */
  sx?: SxProps;
  children?: React.ReactNode;
}

function getOverlayAlpha(elevation: number): number {
  if (elevation <= 0) return 0;
  let alphaValue: number;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return Math.min(Math.round(alphaValue * 10) / 1000, 0.16);
}

const StyledPaperRoot = styled("div", {
  name: "ChellaaPaper",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "elevation" &&
    prop !== "variant" &&
    prop !== "square" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: PaperOwnerState }>(({ theme, ownerState }) => {
  const {
    elevation = 1,
    variant = "elevation",
    square = false,
  } = ownerState;

  const styles: Record<string, any> = {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    transition: theme.transitions.create(["box-shadow", "background-color", "border-color"]),
    boxSizing: "border-box",
  };

  // Border radius
  styles.borderRadius = square ? 0 : `${theme.shape.borderRadius}px`;

  // Outlined vs Elevation
  if (variant === "outlined") {
    styles.border = `1px solid ${theme.palette.divider}`;
    styles.boxShadow = "none";
  } else {
    const clampedElevation = Math.max(0, Math.min(24, elevation));
    styles.boxShadow = theme.shadows[clampedElevation] ?? "none";

    // Material Design Dark Mode Surface Elevation Tinting
    if (theme.palette.mode === "dark" && clampedElevation > 0) {
      const overlayAlpha = getOverlayAlpha(clampedElevation);
      styles.backgroundImage = `linear-gradient(rgba(255, 255, 255, ${overlayAlpha}), rgba(255, 255, 255, ${overlayAlpha}))`;
    }
  }

  return styles;
});

/**
 * Material Paper elevation surface container with 24-level elevation shadows,
 * dark-mode surface elevation overlays, and outlined variants.
 *
 * @example
 * <Paper elevation={3} sx={{ p: 2 }}>
 *   Elevated Content
 * </Paper>
 */
export const Paper = React.forwardRef<HTMLElement, PaperProps>(
  function Paper(props, ref) {
    const {
      asChild = false,
      component,
      as,
      elevation = 1,
      variant = "elevation",
      square = false,
      ...rest
    } = props;

    const ownerState: PaperOwnerState = {
      elevation,
      variant,
      square,
    };

    const targetTag = component || as;

    if (asChild) {
      return (
        <StyledPaperRoot
          as={Slot}
          ref={ref as any}
          ownerState={ownerState}
          {...rest}
        />
      );
    }

    if (targetTag) {
      return (
        <StyledPaperRoot
          as={targetTag}
          ref={ref as any}
          ownerState={ownerState}
          {...rest}
        />
      );
    }

    return (
      <StyledPaperRoot
        ref={ref as any}
        ownerState={ownerState}
        {...rest}
      />
    );
  }
);

Paper.displayName = "Paper";
