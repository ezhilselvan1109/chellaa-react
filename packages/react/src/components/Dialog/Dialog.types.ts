import * as React from "react";

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DialogRootProps {
  /**
   * Controlled open state of the dialog.
   */
  isOpen?: boolean | undefined;

  /**
   * Initial open state when uncontrolled.
   * @default false
   */
  defaultOpen?: boolean | undefined;

  /**
   * Callback fired when dismissal is requested (via Escape, overlay, or close button).
   */
  onClose?: (() => void) | undefined;

  /**
   * If true, pressing Escape dismisses the dialog.
   * @default true
   */
  closeOnEsc?: boolean | undefined;

  /**
   * If true, clicking the backdrop overlay dismisses the dialog.
   * @default true
   */
  closeOnOverlayClick?: boolean | undefined;

  /**
   * Explicit DOM element to focus when the dialog opens.
   */
  initialFocusRef?: React.RefObject<HTMLElement | null> | undefined;

  /**
   * Explicit DOM element to focus when the dialog closes.
   * Defaults to the triggering element.
   */
  finalFocusRef?: React.RefObject<HTMLElement | null> | undefined;

  /**
   * Dialog spatial max-width scale.
   * @default "md"
   */
  size?: DialogSize | undefined;

  /**
   * If true, vertically centers the dialog in the viewport.
   * @default true
   */
  isCentered?: boolean | undefined;

  children: React.ReactNode;
}

export interface DialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   * @default false
   */
  asChild?: boolean | undefined;
  children: React.ReactNode;
}

export interface DialogPortalProps {
  /**
   * Container element to mount the portal into. Defaults to document.body.
   */
  container?: HTMLElement | null | undefined;
  children: React.ReactNode;
}

export interface DialogOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean | undefined;
}

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean | undefined;
}

export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean | undefined;
}

export interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean | undefined;
}

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DialogFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean | undefined;
  children?: React.ReactNode;
}

// Modal Compatibility Aliases
export type ModalSize = DialogSize;
export type ModalRootProps = DialogRootProps;
export type ModalTriggerProps = DialogTriggerProps;
export type ModalPortalProps = DialogPortalProps;
export type ModalOverlayProps = DialogOverlayProps;
export type ModalContentProps = DialogContentProps;
export type ModalHeaderProps = DialogHeaderProps;
export type ModalTitleProps = DialogTitleProps;
export type ModalDescriptionProps = DialogDescriptionProps;
export type ModalBodyProps = DialogBodyProps;
export type ModalFooterProps = DialogFooterProps;
export type ModalCloseProps = DialogCloseProps;
