"use client";

import * as React from "react";
import { Portal } from "../../primitives/Portal";
import { classNames } from "../../utils/classNames";
import type {
  ToastOptions,
  ToastRecord,
  ToastPosition,
  ToastStatus,
  ToastProviderProps,
  UseToastReturn,
} from "./Snackbar.types";

export const ToastContext = React.createContext<UseToastReturn | null>(null);

const POSITIONS: ToastPosition[] = [
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right",
];

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function DangerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function renderStatusIcon(status: ToastStatus) {
  switch (status) {
    case "success":
      return <SuccessIcon />;
    case "warning":
      return <WarningIcon />;
    case "danger":
      return <DangerIcon />;
    case "neutral":
    case "info":
    default:
      return <InfoIcon />;
  }
}

/**
 * Individual Toast Item with pauseable timer and accessible live-region semantics.
 */
export const ToastItem = React.forwardRef<
  HTMLDivElement,
  {
    toast: ToastRecord;
    onClose: () => void;
  }
>(function ToastItem({ toast, onClose }, ref) {
  const {
    title,
    description,
    status,
    duration,
    isClosable,
    action,
  } = toast;

  const remainingRef = React.useRef<number>(
    typeof duration === "number" ? duration : 0,
  );
  const startTimeRef = React.useRef<number>(Date.now());
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPausedRef = React.useRef<boolean>(false);

  const startTimer = React.useCallback(() => {
    if (duration === null || duration === undefined) return;
    if (remainingRef.current <= 0) {
      onClose();
      return;
    }
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      onClose();
    }, remainingRef.current);
  }, [duration, onClose]);

  const pauseTimer = React.useCallback(() => {
    if (duration === null || duration === undefined) return;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const elapsed = Date.now() - startTimeRef.current;
    remainingRef.current = Math.max(0, remainingRef.current - elapsed);
    isPausedRef.current = true;
  }, [duration]);

  const resumeTimer = React.useCallback(() => {
    if (duration === null || duration === undefined) return;
    if (isPausedRef.current) {
      isPausedRef.current = false;
      startTimer();
    }
  }, [duration, startTimer]);

  React.useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [startTimer]);

  const role = status === "danger" ? "alert" : "status";
  const ariaLive = status === "danger" ? "assertive" : "polite";

  return (
    <div
      ref={ref}
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
      tabIndex={0}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      onPointerEnter={pauseTimer}
      onPointerLeave={resumeTimer}
      onFocus={pauseTimer}
      onBlur={resumeTimer}
      className={classNames(
        "cl-toast",
        `cl-toast--${status}`,
      )}
    >
      <span className="cl-toast__icon" aria-hidden="true">
        {renderStatusIcon(status)}
      </span>

      <div className="cl-toast__content">
        {title && <h6 className="cl-toast__title">{title}</h6>}
        {description && <p className="cl-toast__description">{description}</p>}
      </div>

      {action && <div className="cl-toast__action">{action}</div>}

      {isClosable && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="cl-toast__close"
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
});

ToastItem.displayName = "ToastItem";

let toastCounter = 0;

/**
 * ToastProvider manages notification queue, automatic dismissals, and portal layout.
 */
export function ToastProvider({
  children,
  defaultDuration = 5000,
  defaultPosition = "bottom-right",
  maxVisibleToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([]);

  const close = React.useCallback((id: string) => {
    setToasts((prev) => {
      const match = prev.find((t) => t.id === id);
      if (match?.onClose) {
        match.onClose();
      }
      return prev.filter((t) => t.id !== id);
    });
  }, []);

  const closeAll = React.useCallback(() => {
    setToasts((prev) => {
      prev.forEach((t) => t.onClose?.());
      return [];
    });
  }, []);

  const update = React.useCallback(
    (id: string, options: Partial<ToastOptions>) => {
      setToasts((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t;
          return {
            ...t,
            ...options,
            id: t.id,
            duration: options.duration !== undefined ? options.duration : t.duration,
            position: options.position !== undefined ? options.position : t.position,
            status: options.status !== undefined ? options.status : t.status,
            isClosable:
              options.isClosable !== undefined ? options.isClosable : t.isClosable,
          };
        }),
      );
    },
    [],
  );

  const isActive = React.useCallback(
    (id: string) => toasts.some((t) => t.id === id),
    [toasts],
  );

  const toast = React.useCallback(
    (options: ToastOptions): string => {
      const id = options.id ?? `cl-toast-${++toastCounter}`;
      const position = options.position ?? defaultPosition;
      const duration =
        options.duration !== undefined ? options.duration : defaultDuration;
      const status = options.status ?? "info";
      const isClosable =
        options.isClosable !== undefined ? options.isClosable : true;

      const newRecord: ToastRecord = {
        ...options,
        id,
        position,
        duration,
        status,
        isClosable,
        createdAt: Date.now(),
      };

      setToasts((prev) => {
        // Enforce maxVisibleToasts limit per position by removing the oldest
        const inSamePosition = prev.filter((t) => t.position === position);
        let updated = prev.filter((t) => t.id !== id);

        if (inSamePosition.length >= maxVisibleToasts) {
          const oldest = inSamePosition[0];
          if (oldest) {
            oldest.onClose?.();
            updated = updated.filter((t) => t.id !== oldest.id);
          }
        }

        return [...updated, newRecord];
      });

      return id;
    },
    [defaultDuration, defaultPosition, maxVisibleToasts],
  );

  const contextValue = React.useMemo<UseToastReturn>(() => {
    const fn = (options: ToastOptions) => toast(options);
    fn.close = close;
    fn.closeAll = closeAll;
    fn.update = update;
    fn.isActive = isActive;
    return fn as UseToastReturn;
  }, [toast, close, closeAll, update, isActive]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Portal>
        {POSITIONS.map((pos) => {
          const inPos = toasts.filter((t) => t.position === pos);
          if (inPos.length === 0) return null;

          return (
            <div
              key={pos}
              className={classNames(
                "cl-toast-container",
                `cl-toast-container--${pos}`,
              )}
              role="region"
              aria-label={`Notifications ${pos}`}
            >
              {inPos.map((t) => (
                <ToastItem key={t.id} toast={t} onClose={() => close(t.id)} />
              ))}
            </div>
          );
        })}
      </Portal>
    </ToastContext.Provider>
  );
}
