"use client";

import * as React from "react";
import { Portal } from "../../primitives/Portal";
import { classNames } from "../../utils/classNames";
import { ToastItem } from "./ToastProvider";
import type {
  SnackbarProps,
  ToastRecord,
  ToastPosition,
  ToastStatus,
} from "./Snackbar.types";

/**
 * Snackbar provides a declarative component API for viewport-anchored transient notifications.
 */
export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  function Snackbar(
    {
      isOpen = false,
      message,
      description,
      status = "info",
      duration = 5000,
      position = "bottom-right",
      action,
      isClosable = true,
      onClose,
      children,
      className,
      ...restProps
    },
    ref,
  ) {
    const handleClose = React.useCallback(() => {
      onClose?.();
    }, [onClose]);

    if (!isOpen) {
      return null;
    }

    const toastRecord: ToastRecord = {
      id: "declarative-snackbar",
      title: message ?? children,
      description,
      status: status as ToastStatus,
      duration: duration ?? null,
      position: position as ToastPosition,
      isClosable: Boolean(isClosable),
      action,
      createdAt: Date.now(),
      onClose: handleClose,
    };

    return (
      <Portal>
        <div
          className={classNames(
            "cl-toast-container",
            `cl-toast-container--${position}`,
            className,
          )}
          role="region"
          aria-label={`Notifications ${position}`}
          {...restProps}
        >
          <ToastItem ref={ref} toast={toastRecord} onClose={handleClose} />
        </div>
      </Portal>
    );
  },
);

Snackbar.displayName = "Snackbar";

/**
 * Toast is the approved alias for Snackbar.
 */
export const Toast = Snackbar;
