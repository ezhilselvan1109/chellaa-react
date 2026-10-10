"use client";

import * as React from "react";
import { ToastContext } from "./ToastProvider";
import type { UseToastReturn } from "./Snackbar.types";

/**
 * Hook to imperatively trigger, update, or dismiss toast notifications.
 */
export function useToast(): UseToastReturn {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return context;
}
