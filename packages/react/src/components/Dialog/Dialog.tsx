"use client";

import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { Portal } from "../../primitives/Portal";
import { Slot } from "../../primitives/Slot";
import type {
  DialogBodyProps,
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootProps,
  DialogSize,
  DialogTitleProps,
  DialogTriggerProps,
} from "./Dialog.types";

interface DialogContextValue {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  closeOnEsc: boolean;
  closeOnOverlayClick: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null> | undefined;
  finalFocusRef?: React.RefObject<HTMLElement | null> | undefined;
  size: DialogSize;
  isCentered: boolean;
  titleId: string;
  setTitleId: (id: string) => void;
  descriptionId: string;
  setDescriptionId: (id: string) => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext(componentName: string): DialogContextValue {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error(
      `<Dialog.${componentName}> must be used within a <Dialog.Root> or <Dialog> component.`
    );
  }
  return context;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * DialogRoot component - manages controlled/uncontrolled visibility and dialog context.
 */
export const DialogRoot: React.FC<DialogRootProps> = ({
  isOpen: isOpenProp,
  defaultOpen = false,
  onClose: onCloseProp,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  initialFocusRef,
  finalFocusRef,
  size = "md",
  isCentered = true,
  children,
}) => {
  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: isOpenProp,
    defaultValue: defaultOpen,
  });

  const [titleId, setTitleId] = React.useState<string>("");
  const [descriptionId, setDescriptionId] = React.useState<string>("");
  const triggerRef = React.useRef<HTMLElement | null>(null);

  const handleOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    onCloseProp?.();
  }, [setIsOpen, onCloseProp]);

  const contextValue = React.useMemo<DialogContextValue>(
    () => ({
      isOpen: !!isOpen,
      onOpen: handleOpen,
      onClose: handleClose,
      closeOnEsc,
      closeOnOverlayClick,
      initialFocusRef,
      finalFocusRef,
      size,
      isCentered,
      titleId,
      setTitleId,
      descriptionId,
      setDescriptionId,
      triggerRef,
    }),
    [
      isOpen,
      handleOpen,
      handleClose,
      closeOnEsc,
      closeOnOverlayClick,
      initialFocusRef,
      finalFocusRef,
      size,
      isCentered,
      titleId,
      descriptionId,
    ]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
};
DialogRoot.displayName = "Dialog.Root";

/**
 * DialogTrigger component - wraps or renders a button that opens the dialog.
 */
export const DialogTrigger = React.forwardRef<
  HTMLElement,
  DialogTriggerProps
>(({ asChild = false, onClick, children, ...props }, forwardedRef) => {
  const { onOpen, triggerRef } = useDialogContext("Trigger");
  const mergedRef = useMergeRefs(triggerRef, forwardedRef);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      onOpen();
    }
  };

  if (asChild) {
    return (
      <Slot
        ref={mergedRef}
        aria-haspopup="dialog"
        onClick={handleClick}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={mergedRef as React.Ref<HTMLButtonElement>}
      type="button"
      aria-haspopup="dialog"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
});
DialogTrigger.displayName = "Dialog.Trigger";

/**
 * DialogPortal component - mounts dialog children into document.body or container.
 */
export const DialogPortal: React.FC<DialogPortalProps> = ({
  container,
  children,
}) => {
  const { isOpen } = useDialogContext("Portal");

  if (!isOpen) {
    return null;
  }

  return (
    <Portal {...(container !== undefined ? { container } : {})}>
      {children}
    </Portal>
  );
};
DialogPortal.displayName = "Dialog.Portal";

/**
 * DialogOverlay component - background backdrop with static CSS centering.
 */
export const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  DialogOverlayProps
>(({ asChild = false, className, onClick, children, ...props }, forwardedRef) => {
  const { onClose, closeOnOverlayClick, isCentered } =
    useDialogContext("Overlay");

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented && closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const classNames = [
    "cl-dialog__overlay",
    !isCentered && "cl-dialog__overlay--top",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (asChild) {
    return (
      <Slot
        ref={forwardedRef}
        className={classNames}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <div
      ref={forwardedRef}
      className={classNames}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
});
DialogOverlay.displayName = "Dialog.Overlay";

/**
 * DialogContent component - main dialog window with focus trap and scroll locking.
 */
export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(({ asChild = false, className, children, onKeyDown, ...props }, forwardedRef) => {
  const {
    isOpen,
    onClose,
    closeOnEsc,
    size,
    isCentered,
    titleId,
    descriptionId,
    initialFocusRef,
    finalFocusRef,
    triggerRef,
  } = useDialogContext("Content");

  const internalRef = React.useRef<HTMLDivElement | null>(null);
  const mergedRef = useMergeRefs(internalRef, forwardedRef);
  const prevFocusedRef = React.useRef<HTMLElement | null>(null);

  // Focus management and body scroll locking
  React.useEffect(() => {
    if (!isOpen) return;

    // Store previous focused element before opening
    if (typeof document !== "undefined") {
      prevFocusedRef.current = document.activeElement as HTMLElement | null;
    }

    // Scroll lock on body
    const originalOverflow =
      typeof document !== "undefined" ? document.body.style.overflow : "";
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    // Initial focus
    const frameId = requestAnimationFrame(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (internalRef.current) {
        const focusables = internalRef.current.querySelectorAll<HTMLElement>(
          FOCUSABLE_SELECTOR
        );
        if (focusables.length > 0) {
          focusables[0]?.focus();
        } else {
          internalRef.current.focus();
        }
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
      // Restore scroll lock
      if (typeof document !== "undefined") {
        document.body.style.overflow = originalOverflow;
      }
      // Restore focus to trigger or finalFocusRef
      const elementToFocus =
        finalFocusRef?.current ?? triggerRef.current ?? prevFocusedRef.current;
      if (elementToFocus && typeof elementToFocus.focus === "function") {
        elementToFocus.focus();
      }
    };
  }, [isOpen, initialFocusRef, finalFocusRef, triggerRef]);

  // Keyboard trap and Escape listener
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;

    if (e.key === "Escape" && closeOnEsc) {
      e.stopPropagation();
      onClose();
      return;
    }

    if (e.key === "Tab" && internalRef.current) {
      const focusables = Array.from(
        internalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");

      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (
          document.activeElement === firstFocusable ||
          document.activeElement === internalRef.current
        ) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    }
  };

  const classNames = [
    "cl-dialog__content",
    `cl-dialog__content--${size}`,
    !isCentered && "cl-dialog__content--top",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const ariaAttributes = {
    role: "dialog",
    "aria-modal": true,
    ...(titleId ? { "aria-labelledby": titleId } : {}),
    ...(descriptionId ? { "aria-describedby": descriptionId } : {}),
    tabIndex: -1,
  };

  if (asChild) {
    return (
      <Slot
        ref={mergedRef}
        className={classNames}
        onKeyDown={handleKeyDown}
        {...ariaAttributes}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <div
      ref={mergedRef}
      className={classNames}
      onKeyDown={handleKeyDown}
      {...ariaAttributes}
      {...props}
    >
      {children}
    </div>
  );
});
DialogContent.displayName = "Dialog.Content";

/**
 * DialogHeader component - header slot containing title, description, or close button.
 */
export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["cl-dialog__header", className].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DialogHeader.displayName = "Dialog.Header";

/**
 * DialogTitle component - accessible title that binds aria-labelledby.
 */
export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  DialogTitleProps
>(({ asChild = false, id: idProp, className, children, ...props }, ref) => {
  const { setTitleId } = useDialogContext("Title");
  const autoId = React.useId();
  const id = idProp ?? autoId;

  React.useEffect(() => {
    setTitleId(id);
    return () => setTitleId("");
  }, [id, setTitleId]);

  const classNames = ["cl-dialog__title", className].filter(Boolean).join(" ");

  if (asChild) {
    return (
      <Slot ref={ref} id={id} className={classNames} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <h2 ref={ref} id={id} className={classNames} {...props}>
      {children}
    </h2>
  );
});
DialogTitle.displayName = "Dialog.Title";

/**
 * DialogDescription component - accessible description that binds aria-describedby.
 */
export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ asChild = false, id: idProp, className, children, ...props }, ref) => {
  const { setDescriptionId } = useDialogContext("Description");
  const autoId = React.useId();
  const id = idProp ?? autoId;

  React.useEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId("");
  }, [id, setDescriptionId]);

  const classNames = ["cl-dialog__desc", className].filter(Boolean).join(" ");

  if (asChild) {
    return (
      <Slot ref={ref} id={id} className={classNames} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <p ref={ref} id={id} className={classNames} {...props}>
      {children}
    </p>
  );
});
DialogDescription.displayName = "Dialog.Description";

/**
 * DialogBody component - scrollable content body.
 */
export const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["cl-dialog__body", className].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DialogBody.displayName = "Dialog.Body";

/**
 * DialogFooter component - footer slot containing actions.
 */
export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["cl-dialog__footer", className].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DialogFooter.displayName = "Dialog.Footer";

/**
 * DialogClose component - button that dismisses the dialog when clicked.
 */
export const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ asChild = false, className, onClick, children, ...props }, ref) => {
    const { onClose } = useDialogContext("Close");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        onClose();
      }
    };

    const classNames = ["cl-dialog__close-button", className]
      .filter(Boolean)
      .join(" ");

    if (asChild) {
      return (
        <Slot ref={ref} className={classNames} onClick={handleClick} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={classNames}
        onClick={handleClick}
        aria-label={props["aria-label"] ?? "Close dialog"}
        {...props}
      >
        {children ?? "×"}
      </button>
    );
  }
);
DialogClose.displayName = "Dialog.Close";

/**
 * Compound Dialog export
 */
export const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
});

/**
 * Exact compatibility alias for Modal
 */
export const Modal = Dialog;
