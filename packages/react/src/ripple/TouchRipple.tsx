import * as React from "react";
import { keyframes } from "@emotion/react";
import { styled } from "../system/styled";

const enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;

const exitKeyframe = keyframes`
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
  }
`;

const pulsateKeyframe = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.92);
  }
  100% {
    transform: scale(1);
  }
`;

export interface RippleItem {
  key: number;
  rippleX: number;
  rippleY: number;
  rippleSize: number;
  pulsating?: boolean;
  leaving?: boolean;
}

export interface TouchRippleRef {
  start: (
    event?: React.SyntheticEvent,
    options?: { pulsate?: boolean; center?: boolean }
  ) => void;
  stop: (event?: React.SyntheticEvent) => void;
  pulsate: () => void;
}

export interface TouchRippleProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * If true, the ripple will center on the element rather than pointer coordinates
   */
  center?: boolean;
  className?: string;
}

const TouchRippleRoot = styled("span", {
  name: "ChellaaTouchRipple",
  slot: "Root",
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit",
});

const StyledRippleSpan = styled("span", {
  shouldForwardProp: (prop) =>
    prop !== "pulsating" && prop !== "leaving",
})<{ pulsating?: boolean; leaving?: boolean }>(({ pulsating, leaving }) => ({
  position: "absolute",
  borderRadius: "50%",
  backgroundColor: "currentColor",
  opacity: 0.3,
  animation: `${enterKeyframe} 550ms cubic-bezier(0.4, 0, 0.2, 1)`,
  ...(pulsating && {
    animation: `${pulsateKeyframe} 2500ms ease-in-out infinite 200ms`,
  }),
  ...(leaving && {
    opacity: 0,
    animation: `${exitKeyframe} 550ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
  }),
}));

/**
 * TouchRipple component delivers tactile Material Design touch/click ripple animations.
 */
export const TouchRipple = React.forwardRef<TouchRippleRef, TouchRippleProps>(
  function TouchRipple(props, ref) {
    const { center: centerProp = false, className, ...rest } = props;
    const [ripples, setRipples] = React.useState<RippleItem[]>([]);
    const nextKey = React.useRef(0);
    const containerRef = React.useRef<HTMLSpanElement | null>(null);

    const start = React.useCallback(
      (
        event?: React.SyntheticEvent,
        options: { pulsate?: boolean; center?: boolean } = {}
      ) => {
        const { pulsate = false, center = centerProp || pulsate } = options;

        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();

        let rippleX: number;
        let rippleY: number;
        let rippleSize: number;

        if (
          center ||
          !event ||
          (event.nativeEvent as any).clientX === undefined
        ) {
          rippleX = Math.round(rect.width / 2);
          rippleY = Math.round(rect.height / 2);
          rippleSize = Math.max(rect.width, rect.height);
        } else {
          const clientX =
            (event.nativeEvent as any).clientX ??
            (event.nativeEvent as any).touches?.[0]?.clientX;
          const clientY =
            (event.nativeEvent as any).clientY ??
            (event.nativeEvent as any).touches?.[0]?.clientY;

          rippleX = Math.round(clientX - rect.left);
          rippleY = Math.round(clientY - rect.top);

          const sizeX =
            Math.max(Math.abs(container.clientWidth - rippleX), rippleX) * 2 + 2;
          const sizeY =
            Math.max(Math.abs(container.clientHeight - rippleY), rippleY) * 2 + 2;
          rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
        }

        const currentKey = nextKey.current;
        nextKey.current += 1;

        setRipples((prev) => [
          ...prev,
          {
            key: currentKey,
            rippleX,
            rippleY,
            rippleSize,
            pulsating: pulsate,
            leaving: false,
          },
        ]);
      },
      [centerProp]
    );

    const stop = React.useCallback(() => {
      setRipples((prev) => {
        if (prev.length === 0) return prev;
        return prev.map((ripple) => ({ ...ripple, leaving: true }));
      });

      // Cleanup finished ripples after transition animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => !r.leaving));
      }, 550);
    }, []);

    const pulsate = React.useCallback(() => {
      start(undefined, { pulsate: true });
    }, [start]);

    React.useImperativeHandle(
      ref,
      () => ({
        start,
        stop,
        pulsate,
      }),
      [start, stop, pulsate]
    );

    return (
      <TouchRippleRoot
        ref={containerRef}
        className={className}
        aria-hidden="true"
        {...rest}
      >
        {ripples.map((item) => {
          const style: React.CSSProperties = {
            width: `${item.rippleSize}px`,
            height: `${item.rippleSize}px`,
            top: `${-(item.rippleSize / 2) + item.rippleY}px`,
            left: `${-(item.rippleSize / 2) + item.rippleX}px`,
          };

          return (
            <StyledRippleSpan
              key={item.key}
              pulsating={item.pulsating}
              leaving={item.leaving}
              style={style}
            />
          );
        })}
      </TouchRippleRoot>
    );
  }
);

TouchRipple.displayName = "TouchRipple";
