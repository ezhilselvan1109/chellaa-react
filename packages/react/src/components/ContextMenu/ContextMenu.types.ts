import * as React from "react";
import type {
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuLabelProps,
} from "../DropdownMenu/DropdownMenu.types";

export interface ContextMenuRootProps {
  /** Controlled open state */
  open?: boolean;
  /** Uncontrolled initial open state */
  defaultOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether the menu is modal (blocks outside pointer interaction) */
  modal?: boolean;
  children?: React.ReactNode;
}

export interface ContextMenuTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Disables opening the context menu */
  disabled?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
}

export interface ContextMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number;
  alignOffset?: number;
  collisionPadding?: number;
  asChild?: boolean;
  children?: React.ReactNode;
}

export type ContextMenuItemProps = DropdownMenuItemProps;
export type ContextMenuCheckboxItemProps = DropdownMenuCheckboxItemProps;
export type ContextMenuRadioGroupProps = DropdownMenuRadioGroupProps;
export type ContextMenuRadioItemProps = DropdownMenuRadioItemProps;
export type ContextMenuSeparatorProps = DropdownMenuSeparatorProps;
export type ContextMenuLabelProps = DropdownMenuLabelProps;
