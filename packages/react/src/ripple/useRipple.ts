import * as React from "react";
import type { TouchRippleRef, TouchRippleProps } from "./TouchRipple";
import { composeEventHandlers } from "../utils/composeEventHandlers";

export interface UseRippleOptions {
  disabled?: boolean;
  disableRipple?: boolean;
  center?: boolean;
}

export interface UseRippleReturn {
  rippleRef: React.RefObject<TouchRippleRef>;
  rippleProps: TouchRippleProps & { ref: React.RefObject<TouchRippleRef> };
  getRippleHandlers: <T extends Record<string, any>>(props?: T) => T;
}

/**
 * Hook connecting user interactions (pointer/touch/keyboard) to TouchRipple.
 */
export function useRipple(options: UseRippleOptions = {}): UseRippleReturn {
  const { disabled = false, disableRipple = false, center = false } = options;
  const rippleRef = React.useRef<TouchRippleRef>(null);

  const onMouseDown = React.useCallback(
    (event: React.MouseEvent) => {
      if (disabled || disableRipple) return;
      rippleRef.current?.start(event);
    },
    [disabled, disableRipple]
  );

  const onMouseUp = React.useCallback(
    (event: React.MouseEvent) => {
      if (disabled || disableRipple) return;
      rippleRef.current?.stop(event);
    },
    [disabled, disableRipple]
  );

  const onMouseLeave = React.useCallback(
    (event: React.MouseEvent) => {
      if (disabled || disableRipple) return;
      rippleRef.current?.stop(event);
    },
    [disabled, disableRipple]
  );

  const onTouchStart = React.useCallback(
    (event: React.TouchEvent) => {
      if (disabled || disableRipple) return;
      rippleRef.current?.start(event);
    },
    [disabled, disableRipple]
  );

  const onTouchEnd = React.useCallback(
    (event: React.TouchEvent) => {
      if (disabled || disableRipple) return;
      rippleRef.current?.stop(event);
    },
    [disabled, disableRipple]
  );

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (disabled || disableRipple) return;
      if (event.key === " " || event.key === "Enter") {
        rippleRef.current?.start(undefined, { pulsate: true });
      }
    },
    [disabled, disableRipple]
  );

  const onKeyUp = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (disabled || disableRipple) return;
      if (event.key === " " || event.key === "Enter") {
        rippleRef.current?.stop();
      }
    },
    [disabled, disableRipple]
  );

  const onBlur = React.useCallback(() => {
    rippleRef.current?.stop();
  }, []);

  const getRippleHandlers = React.useCallback(
    <T extends Record<string, any>>(props: T = {} as T): T => {
      return {
        ...props,
        onMouseDown: composeEventHandlers(props.onMouseDown, onMouseDown),
        onMouseUp: composeEventHandlers(props.onMouseUp, onMouseUp),
        onMouseLeave: composeEventHandlers(props.onMouseLeave, onMouseLeave),
        onTouchStart: composeEventHandlers(props.onTouchStart, onTouchStart),
        onTouchEnd: composeEventHandlers(props.onTouchEnd, onTouchEnd),
        onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
        onKeyUp: composeEventHandlers(props.onKeyUp, onKeyUp),
        onBlur: composeEventHandlers(props.onBlur, onBlur),
      };
    },
    [
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onKeyDown,
      onKeyUp,
      onBlur,
    ]
  );

  return {
    rippleRef,
    rippleProps: {
      ref: rippleRef,
      center,
    },
    getRippleHandlers,
  };
}
