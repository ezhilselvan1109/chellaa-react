import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";

export interface InputAdornmentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Position of the adornment within the input track.
   */
  position: "start" | "end";
  /**
   * If true, prevents pointer events on the adornment (e.g. for purely decorative icons).
   * @default false
   */
  disablePointerEvents?: boolean | undefined;
  /**
   * The system-aware sx prop
   */
  sx?: SxProps;
  children?: React.ReactNode;
}

const StyledAdornmentRoot = styled("div", {
  name: "ChellaaInputAdornment",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "position" && prop !== "disablePointerEvents",
})<{ position: "start" | "end"; disablePointerEvents?: boolean }>(
  ({ theme, position, disablePointerEvents }) => ({
    display: "flex",
    height: "100%",
    maxHeight: "2em",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    color: theme.palette.text.secondary,
    marginLeft: position === "end" ? theme.spacing(1) : 0,
    marginRight: position === "start" ? theme.spacing(1) : 0,
    pointerEvents: disablePointerEvents ? "none" : "auto",
    userSelect: "none",
  })
);

export const InputAdornment = React.forwardRef<
  HTMLDivElement,
  InputAdornmentProps
>(function InputAdornment(props, ref) {
  const { position, disablePointerEvents = false, children, ...rest } = props;

  return (
    <StyledAdornmentRoot
      ref={ref}
      position={position}
      disablePointerEvents={disablePointerEvents}
      {...rest}
    >
      {children}
    </StyledAdornmentRoot>
  );
});

InputAdornment.displayName = "InputAdornment";
