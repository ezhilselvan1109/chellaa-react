import * as React from "react";

export type ToastPosition =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right";

export type ToastStatus = "info" | "success" | "warning" | "danger" | "neutral";

export interface ToastOptions {
  /** Optional unique identifier for toast */
  id?: string | undefined;
  /** Primary headline text */
  title?: React.ReactNode | undefined;
  /** Secondary descriptive copy */
  description?: React.ReactNode | undefined;
  /** Semantic color and icon intent */
  status?: ToastStatus | undefined;
  /** Lifetime in ms before auto-dismissal. Set null for persistent toast */
  duration?: number | null | undefined;
  /** Whether a manual close button is rendered */
  isClosable?: boolean | undefined;
  /** Viewport anchor corner */
  position?: ToastPosition | undefined;
  /** Custom action slot (e.g. Undo button) */
  action?: React.ReactNode | undefined;
  /** Callback fired when toast is dismissed */
  onClose?: (() => void) | undefined;
}

export interface ToastRecord extends ToastOptions {
  id: string;
  createdAt: number;
  duration: number | null;
  position: ToastPosition;
  isClosable: boolean;
  status: ToastStatus;
}

export interface UseToastReturn {
  (options: ToastOptions): string;
  close: (id: string) => void;
  closeAll: () => void;
  update: (id: string, options: Partial<ToastOptions>) => void;
  isActive: (id: string) => boolean;
}

export interface ToastProviderProps {
  children?: React.ReactNode | undefined;
  /** Default lifetime in ms before auto-dismissal. Defaults to 5000 */
  defaultDuration?: number | undefined;
  /** Default viewport position. Defaults to "bottom-right" */
  defaultPosition?: ToastPosition | undefined;
  /** Max visible toasts per position. Defaults to 5 */
  maxVisibleToasts?: number | undefined;
}

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled open state of the snackbar */
  isOpen?: boolean | undefined;
  /** Primary headline message */
  message?: React.ReactNode | undefined;
  /** Secondary descriptive copy */
  description?: React.ReactNode | undefined;
  /** Semantic color and icon intent */
  status?: ToastStatus | undefined;
  /** Lifetime in ms before auto-dismissal. Set null for persistent toast */
  duration?: number | null | undefined;
  /** Viewport anchor corner */
  position?: ToastPosition | undefined;
  /** Custom action slot (e.g. Undo button) */
  action?: React.ReactNode | undefined;
  /** Whether a manual close button is rendered */
  isClosable?: boolean | undefined;
  /** Callback fired when snackbar is dismissed */
  onClose?: (() => void) | undefined;
  children?: React.ReactNode | undefined;
}
