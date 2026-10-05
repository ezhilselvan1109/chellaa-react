import * as React from "react";
import { TouchRipple, type TouchRippleRef } from "./TouchRipple";
import { useRipple } from "./useRipple";
import { Paper } from "../components/Paper";
import { ThemeProvider } from "../theme/ThemeProvider";

export default {
  title: "Feedback/TouchRipple",
  component: TouchRipple,
  tags: ["autodocs"],
};

function RippleInteractiveSurface() {
  const { rippleProps, getRippleHandlers } = useRipple();

  return (
    <Paper
      elevation={2}
      {...getRippleHandlers({
        style: {
          width: 320,
          height: 180,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          userSelect: "none",
        },
      })}
    >
      Click or tap anywhere on this surface
      <TouchRipple {...rippleProps} />
    </Paper>
  );
}

export const InteractiveSurface = {
  render: () => (
    <ThemeProvider>
      <RippleInteractiveSurface />
    </ThemeProvider>
  ),
};

export const ProgrammaticPulsate = {
  render: () => {
    const rippleRef = React.useRef<TouchRippleRef>(null);

    return (
      <ThemeProvider>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <button
            onClick={() => rippleRef.current?.pulsate()}
            style={{ padding: "8px 16px", cursor: "pointer", width: 180 }}
          >
            Trigger Pulsate
          </button>
          <div
            style={{
              width: 200,
              height: 100,
              position: "relative",
              border: "1px solid #ccc",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <TouchRipple ref={rippleRef} center />
          </div>
        </div>
      </ThemeProvider>
    );
  },
};
