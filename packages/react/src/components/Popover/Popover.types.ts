import * as React from "react";
import type { TooltipPlacement } from "../Tooltip/Tooltip.types";

export type PopoverPlacement = TooltipPlacement;

export interface PopoverRootProps {
  children: React.ReactNode;
  /** Controlled open state of the popover */
  isOpen?: boolean;
  /** Uncontrolled default open state of the popover */
  defaultOpen?: boolean;
  /** Callback fired when the open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Preferred placement relative to the trigger. Defaults to "bottom" */
  placement?: PopoverPlacement;
  /** Offset distance in pixels from the trigger. Defaults to 8 */
  offset?: number;
  /** Whether to trap focus inside the popover content. Defaults to true */
  trapFocus?: boolean;
  /** Whether to close the popover on blur. Defaults to true */
  closeOnBlur?: boolean;
  /** Whether to close the popover when the Escape key is pressed. Defaults to true */
  closeOnEsc?: boolean;
  /** Ref to the element that should receive focus when opened */
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  /** Ref to the element that should receive focus when closed */
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

export interface PopoverProps extends PopoverRootProps {}

export interface PopoverTriggerProps {
  children: React.ReactElement;
  /** Whether to delegate props to the child element via Slot primitive */
  asChild?: boolean;
}

export interface PopoverPortalProps {
  children: React.ReactNode;
  /** Custom container element to portal into. Defaults to document.body */
  container?: HTMLElement | null;
}

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Whether to render a decorative pointer arrow. Defaults to true */
  hasArrow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface PopoverCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  /** Whether to delegate props to the child element via Slot primitive */
  asChild?: boolean;
  className?: string;
}

export interface PopoverArrowProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
}

export interface PopoverHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface PopoverTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export interface PopoverBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface PopoverFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface PopoverContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  placement: PopoverPlacement;
  actualPlacement: PopoverPlacement;
  trapFocus: boolean;
  id: string;
  titleId: string;
  hasTitle: boolean;
  setHasTitle: (hasTitle: boolean) => void;
  hasPortalParent: boolean;
  setHasPortalParent: (hasPortal: boolean) => void;
  initialFocusRef?: React.RefObject<HTMLElement | null> | undefined;
  returnFocusRef?: React.RefObject<HTMLElement | null> | undefined;
}
