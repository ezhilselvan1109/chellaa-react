import * as React from "react";

export type DrawerPlacement = "left" | "right" | "top" | "bottom";
export type DrawerSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

export interface DrawerRootProps {
  /** Controlled open state */
  open?: boolean;
  /** Ergonomic alias for open */
  isOpen?: boolean;
  /** Uncontrolled initial open state */
  defaultOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Callback fired when drawer closes */
  onClose?: () => void;
  /** Direction from which the drawer slides in */
  placement?: DrawerPlacement;
  /** Sizing scale */
  size?: DrawerSize;
  /** If true, pressing Escape dismisses the drawer */
  closeOnEsc?: boolean;
  /** If true, clicking the backdrop overlay dismisses the drawer */
  closeOnOverlayClick?: boolean;
  /** Explicit element to focus when opened */
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  /** Explicit element to focus when closed */
  finalFocusRef?: React.RefObject<HTMLElement | null>;
  children?: React.ReactNode;
}

export interface DrawerTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: React.ReactNode;
}

export interface DrawerPortalProps {
  container?: HTMLElement | null;
  children?: React.ReactNode;
}

export interface DrawerOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export interface DrawerContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  placement?: DrawerPlacement;
  size?: DrawerSize;
  asChild?: boolean;
  children?: React.ReactNode;
}

export interface DrawerHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DrawerTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

export interface DrawerDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean;
}

export interface DrawerBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DrawerFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DrawerCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

// Sheet Type Aliases
export type SheetPlacement = DrawerPlacement;
export type SheetSize = DrawerSize;
export type SheetRootProps = DrawerRootProps;
export type SheetTriggerProps = DrawerTriggerProps;
export type SheetPortalProps = DrawerPortalProps;
export type SheetOverlayProps = DrawerOverlayProps;
export type SheetContentProps = DrawerContentProps;
export type SheetHeaderProps = DrawerHeaderProps;
export type SheetTitleProps = DrawerTitleProps;
export type SheetDescriptionProps = DrawerDescriptionProps;
export type SheetBodyProps = DrawerBodyProps;
export type SheetFooterProps = DrawerFooterProps;
export type SheetCloseProps = DrawerCloseProps;
