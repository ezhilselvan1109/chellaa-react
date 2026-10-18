import * as React from "react";

export type AlertStatus = "info" | "success" | "warning" | "danger" | "neutral";
export type AlertVariant = "subtle" | "solid" | "outline" | "left-accent";

export interface AlertContextValue {
  status: AlertStatus;
  variant: AlertVariant;
  onClose?: (() => void) | undefined;
  handleClose: () => void;
  isClosed: boolean;
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic status determining colors, icons, and ARIA roles. Defaults to "info" */
  status?: AlertStatus | undefined;
  /** Visual treatment of the alert surface. Defaults to "subtle" */
  variant?: AlertVariant | undefined;
  /** Whether the alert can be dismissed with a close button */
  isClosable?: boolean | undefined;
  /** Callback fired when the close button is clicked */
  onClose?: (() => void) | undefined;
  /** Polymorphic slot delegation */
  asChild?: boolean | undefined;
  children?: React.ReactNode | undefined;
}

export type AlertRootProps = AlertProps;

export interface AlertIconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Custom icon override */
  icon?: React.ReactNode | undefined;
}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode | undefined;
}

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode | undefined;
}

export interface AlertBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode | undefined;
}

export interface AlertActionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode | undefined;
}

export interface AlertCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
