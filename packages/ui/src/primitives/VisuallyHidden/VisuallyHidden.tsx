import React from "react";

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const visuallyHiddenStyles: React.CSSProperties = {
  border: 0,
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
};

export const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ style, ...props }, ref) => {
    return <span ref={ref} style={{ ...visuallyHiddenStyles, ...style }} {...props} />;
  }
);

VisuallyHidden.displayName = "ChellaVisuallyHidden";
