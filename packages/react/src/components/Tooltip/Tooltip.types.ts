import * as React from "react";

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export interface TooltipProps {
  /** The text content or descriptive React element to display inside the tooltip */
  content: React.ReactNode;
  /** The interactive trigger element that activates the tooltip */
  children: React.ReactElement;
  /** Preferred placement relative to the trigger. Defaults to "top" */
  placement?: TooltipPlacement;
  /** Delay in milliseconds before opening after pointer enters trigger. Defaults to 200 */
  openDelay?: number;
  /** Delay in milliseconds before closing after pointer leaves. Defaults to 150 */
  closeDelay?: number;
  /** Controlled open state */
  isOpen?: boolean;
  /** Initial open state when uncontrolled. Defaults to false */
  defaultOpen?: boolean;
  /** Callback fired when the open state changes */
  onOpenChange?: (isOpen: boolean) => void;
  /** Whether to render a decorative pointer arrow. Defaults to true */
  hasArrow?: boolean;
  /** Whether the tooltip is completely disabled and prevented from opening. Defaults to false */
  isDisabled?: boolean;
  /** Offset distance in pixels between the trigger and tooltip. Defaults to 8 */
  offset?: number;
  /** Optional keyboard shortcut string to render inside tooltip (e.g. "Ctrl+S") */
  shortcut?: string;
  /** Additional custom CSS class name applied to the tooltip container */
  className?: string;
  /** Additional inline CSS properties applied to the tooltip container */
  style?: React.CSSProperties;
}

export interface TooltipOwnerState {
  placement: TooltipPlacement;
  isOpen: boolean;
  hasArrow: boolean;
}
