import * as React from "react";

export type DropdownMenuSide = "top" | "bottom" | "left" | "right";
export type DropdownMenuAlign = "start" | "center" | "end";

export interface DropdownMenuRootProps {
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

export interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: React.ReactNode;
}

export interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  side?: DropdownMenuSide;
  align?: DropdownMenuAlign;
  sideOffset?: number;
  alignOffset?: number;
  collisionPadding?: number;
  asChild?: boolean;
  children?: React.ReactNode;
}

export interface DropdownMenuItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  inset?: boolean;
  onSelect?: () => void;
  closeOnSelect?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
}

export interface DropdownMenuCheckboxItemProps
  extends Omit<DropdownMenuItemProps, "onSelect"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export interface DropdownMenuRadioGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

export interface DropdownMenuRadioItemProps
  extends DropdownMenuItemProps {
  value: string;
}

export interface DropdownMenuSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DropdownMenuLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}
