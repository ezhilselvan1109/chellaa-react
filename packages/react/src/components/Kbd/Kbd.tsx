"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";

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
})({});

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
      className,
      style,
      sx,
      children,
      ...rest
    } = props;

    const kbdClassName = classNames(
      "cl-kbd",
      `cl-kbd--${size}`,
      `cl-kbd--${variant}`,
      className
    );

    const targetTag = component || as || "kbd";

    // Resolve content: children takes precedence, then modifier symbol
    const content = children ?? (modifier ? MODIFIER_SYMBOLS[modifier] ?? modifier : null);

    if (asChild) {
      return (
        <StyledKbdRoot
          as={Slot}
          ref={ref as any}
          className={kbdClassName}
          style={style}
          sx={sx}
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
        className={kbdClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        {content}
      </StyledKbdRoot>
    );
  }
);

Kbd.displayName = "Kbd";
