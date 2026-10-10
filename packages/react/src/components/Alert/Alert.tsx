"use client";

import * as React from "react";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import type {
  AlertProps,
  AlertIconProps,
  AlertTitleProps,
  AlertDescriptionProps,
  AlertBodyProps,
  AlertActionProps,
  AlertCloseButtonProps,
  AlertContextValue,
  AlertStatus,
} from "./Alert.types";

const AlertContext = React.createContext<AlertContextValue | null>(null);

export function useAlertContext(): AlertContextValue {
  const context = React.useContext(AlertContext);
  if (!context) {
    throw new Error(
      "Alert compound subcomponents must be rendered within an <Alert> or <Alert.Root>",
    );
  }
  return context;
}

/**
 * Default status icons for built-in feedback indications.
 */
const InfoIcon = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  function InfoIcon(props, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    );
  },
);

const SuccessIcon = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  function SuccessIcon(props, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  },
);

const WarningIcon = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  function WarningIcon(props, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  },
);

const DangerIcon = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  function DangerIcon(props, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  },
);

function getStatusIcon(
  status: AlertStatus,
): React.ForwardRefExoticComponent<
  React.SVGAttributes<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
> {
  switch (status) {
    case "success":
      return SuccessIcon;
    case "warning":
      return WarningIcon;
    case "danger":
      return DangerIcon;
    case "neutral":
    case "info":
    default:
      return InfoIcon;
  }
}

/**
 * Alert.Root (or <Alert>) provides in-flow contextual feedback with accessible live-region semantics.
 */
export const AlertRoot = React.forwardRef<HTMLDivElement, AlertProps>(
  function AlertRoot(
    {
      children,
      status = "info",
      variant = "subtle",
      isClosable = false,
      onClose,
      asChild = false,
      role: roleProp,
      "aria-live": ariaLiveProp,
      className,
      ...restProps
    },
    ref,
  ) {
    const [isClosed, setIsClosed] = React.useState(false);

    const handleClose = React.useCallback(() => {
      if (isClosed) return;
      setIsClosed(true);
      onClose?.();
    }, [isClosed, onClose]);

    const contextValue = React.useMemo<AlertContextValue>(
      () => ({
        status,
        variant,
        onClose,
        handleClose,
        isClosed,
      }),
      [status, variant, onClose, handleClose, isClosed],
    );

    const hasExplicitClose = React.useMemo(() => {
      let found = false;
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          if (
            child.type === AlertCloseButton ||
            (child.type as { displayName?: string })?.displayName ===
              "Alert.CloseButton"
          ) {
            found = true;
          }
        }
      });
      return found;
    }, [children]);

    if (isClosed) {
      return null;
    }

    const defaultRole = status === "danger" ? "alert" : "status";
    const defaultAriaLive = status === "danger" ? "assertive" : "polite";
    const resolvedRole = roleProp ?? defaultRole;
    const resolvedAriaLive = ariaLiveProp ?? defaultAriaLive;

    const alertClasses = classNames(
      "cl-alert",
      `cl-alert--${status}`,
      `cl-alert--${variant}`,
      isClosable && "cl-alert--closable",
      className,
    );

    if (asChild) {
      return (
        <AlertContext.Provider value={contextValue}>
          <Slot
            ref={ref}
            role={resolvedRole}
            aria-live={resolvedAriaLive}
            className={alertClasses}
            {...restProps}
          >
            {children}
          </Slot>
        </AlertContext.Provider>
      );
    }

    return (
      <AlertContext.Provider value={contextValue}>
        <div
          ref={ref}
          role={resolvedRole}
          aria-live={resolvedAriaLive}
          className={alertClasses}
          {...restProps}
        >
          {children}
          {isClosable && !hasExplicitClose && <AlertCloseButton />}
        </div>
      </AlertContext.Provider>
    );
  },
);

AlertRoot.displayName = "Alert.Root";

/**
 * Alert.Icon renders an accessible status indicator SVG or custom icon override.
 */
export const AlertIcon = React.forwardRef<SVGSVGElement, AlertIconProps>(
  function AlertIcon({ icon, children, className, ...restProps }, ref) {
    const { status } = useAlertContext();

    if (icon) {
      if (React.isValidElement(icon)) {
        return React.cloneElement(icon as React.ReactElement<Record<string, unknown>>, {
          ...restProps,
          ...(icon.props as Record<string, unknown>),
          ref,
          "aria-hidden": "true",
          className: classNames(
            "cl-alert__icon",
            className,
            (icon.props as { className?: string })?.className,
          ),
        });
      }
      return (
        <span className={classNames("cl-alert__icon", className)} aria-hidden="true">
          {icon}
        </span>
      );
    }

    if (children) {
      if (React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
          ...restProps,
          ...(children.props as Record<string, unknown>),
          ref,
          "aria-hidden": "true",
          className: classNames(
            "cl-alert__icon",
            className,
            (children.props as { className?: string })?.className,
          ),
        });
      }
      return (
        <span className={classNames("cl-alert__icon", className)} aria-hidden="true">
          {children}
        </span>
      );
    }

    const IconComponent = getStatusIcon(status);
    return (
      <IconComponent
        ref={ref}
        className={classNames("cl-alert__icon", className)}
        {...restProps}
      />
    );
  },
);

AlertIcon.displayName = "Alert.Icon";

/**
 * Alert.Body wraps the title and description in a flex column layout.
 */
export const AlertBody = React.forwardRef<HTMLDivElement, AlertBodyProps>(
  function AlertBody({ children, className, ...restProps }, ref) {
    return (
      <div
        ref={ref}
        className={classNames("cl-alert__body", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

AlertBody.displayName = "Alert.Body";

/**
 * Alert.Title renders the prominent heading for the alert notice.
 */
export const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  function AlertTitle({ children, className, ...restProps }, ref) {
    return (
      <h5
        ref={ref}
        className={classNames("cl-alert__title", className)}
        {...restProps}
      >
        {children}
      </h5>
    );
  },
);

AlertTitle.displayName = "Alert.Title";

/**
 * Alert.Description renders the accompanying body text for the alert notice.
 */
export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(function AlertDescription({ children, className, ...restProps }, ref) {
  return (
    <p
      ref={ref}
      className={classNames("cl-alert__description", className)}
      {...restProps}
    >
      {children}
    </p>
  );
});

AlertDescription.displayName = "Alert.Description";

/**
 * Alert.Action contains contextual action buttons (e.g. Retry, Learn More).
 */
export const AlertAction = React.forwardRef<HTMLDivElement, AlertActionProps>(
  function AlertAction({ children, className, ...restProps }, ref) {
    return (
      <div
        ref={ref}
        className={classNames("cl-alert__action", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

AlertAction.displayName = "Alert.Action";

/**
 * Alert.CloseButton renders an accessible dismiss button for the alert.
 */
export const AlertCloseButton = React.forwardRef<
  HTMLButtonElement,
  AlertCloseButtonProps
>(function AlertCloseButton(
  {
    onClick,
    className,
    "aria-label": ariaLabel = "Close alert",
    children,
    disabled,
    ...restProps
  },
  ref,
) {
  const { handleClose, isClosed } = useAlertContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      handleClose();
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      disabled={disabled || isClosed}
      onClick={handleClick}
      className={classNames("cl-alert__close", className)}
      {...restProps}
    >
      {children ?? (
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
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
      )}
    </button>
  );
});

AlertCloseButton.displayName = "Alert.CloseButton";

/**
 * Alert compound component aggregation.
 */
export const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Icon: AlertIcon,
  Body: AlertBody,
  Title: AlertTitle,
  Description: AlertDescription,
  Action: AlertAction,
  CloseButton: AlertCloseButton,
});
