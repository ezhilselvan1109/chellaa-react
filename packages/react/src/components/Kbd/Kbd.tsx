import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";

export type KbdSize = "sm" | "md" | "lg";
export type KbdVariant = "outline" | "subtle" | "solid";

export type KbdModifier =
  | "command"
  | "cmd"
  | "shift"
  | "option"
  | "alt"
  | "control"
  | "ctrl"
  | "enter"
  | "escape"
  | "esc"
  | "tab"
  | "backspace"
  | "delete"
  | "del"
  | "up"
  | "down"
  | "left"
  | "right";

export const MODIFIER_SYMBOLS: Record<KbdModifier, string> = {
  command: "⌘",
  cmd: "⌘",
  shift: "⇧",
  option: "⌥",
  alt: "⌥",
  control: "⌃",
  ctrl: "⌃",
  enter: "↵",
  escape: "Esc",
  esc: "Esc",
  tab: "⇥",
  backspace: "⌫",
  delete: "⌦",
  del: "⌦",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
};

export interface KbdOwnerState {
  size?: KbdSize | undefined;
  variant?: KbdVariant | undefined;
  modifier?: KbdModifier | undefined;
}

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    KbdOwnerState {
  /**
   * If true, delegate rendering to immediate child element using Slot
   */
  asChild?: boolean;
  /**
   * The underlying HTML element or component
   */
  component?: React.ElementType;
  /**
   * Alias for component
   */
  as?: React.ElementType;
  /**
   * The system-aware sx prop
   */
  sx?: SxProps;
  children?: React.ReactNode;
}

const StyledKbdRoot = styled("kbd", {
  name: "ChellaaKbd",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "size" &&
    prop !== "variant" &&
    prop !== "modifier" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: KbdOwnerState }>(({ theme, ownerState }) => {
  const size = ownerState.size ?? "md";
  const variant = ownerState.variant ?? "outline";

  // Size specifications
  const sizeMap: Record<KbdSize, any> = {
    sm: {
      minHeight: 18,
      minWidth: 18,
      fontSize: "0.6875rem",
      padding: "0 4px",
      borderRadius: Math.max((theme.shape?.borderRadius ?? 4) - 1, 2),
    },
    md: {
      minHeight: 22,
      minWidth: 22,
      fontSize: "0.75rem",
      padding: "0 6px",
      borderRadius: theme.shape?.borderRadius ?? 4,
    },
    lg: {
      minHeight: 28,
      minWidth: 28,
      fontSize: "0.875rem",
      padding: "0 8px",
      borderRadius: (theme.shape?.borderRadius ?? 4) + 1,
    },
  };

  const baseStyles: Record<string, any> = {
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontWeight: 600,
    lineHeight: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "baseline",
    whiteSpace: "nowrap",
    userSelect: "none",
    boxSizing: "border-box",
    ...sizeMap[size],
  };

  if (variant === "outline") {
    return {
      ...baseStyles,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.divider}`,
      borderBottom: `2px solid ${theme.palette.divider}`,
      boxShadow: "0 1px 1px rgba(0, 0, 0, 0.08)",
    };
  }

  if (variant === "subtle") {
    return {
      ...baseStyles,
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.text.secondary,
      border: "1px solid transparent",
    };
  }

  if (variant === "solid") {
    return {
      ...baseStyles,
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.background.paper,
      border: "none",
    };
  }

  return baseStyles;
});

/**
 * Tactile keyboard shortcut keycap primitive representing user input keystrokes.
 *
 * @example
 * <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
 * <Kbd modifier="command" />
 * <Kbd size="sm" variant="subtle">Esc</Kbd>
 */
export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  function Kbd(props, ref) {
    const {
      asChild = false,
      component = "kbd",
      as,
      size = "md",
      variant = "outline",
      modifier,
      children,
      ...rest
    } = props;

    const ownerState: KbdOwnerState = {
      size,
      variant,
      modifier,
    };

    const targetTag = component || as || "kbd";

    // Resolve content: children takes precedence, then modifier symbol
    const content = children ?? (modifier ? MODIFIER_SYMBOLS[modifier] ?? modifier : null);

    if (asChild) {
      return (
        <StyledKbdRoot
          as={Slot}
          ref={ref as any}
          ownerState={ownerState}
          {...rest}
        >
          {content}
        </StyledKbdRoot>
      );
    }

    return (
      <StyledKbdRoot
        as={targetTag}
        ref={ref as any}
        ownerState={ownerState}
        {...rest}
      >
        {content}
      </StyledKbdRoot>
    );
  }
);

Kbd.displayName = "Kbd";
