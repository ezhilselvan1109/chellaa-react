"use client";

import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { Portal } from "../../primitives/Portal";
import { Slot } from "../../primitives/Slot";
import {
  acquireBodyScrollLock,
  releaseBodyScrollLock,
} from "../Dialog/Dialog";
import type {
  DrawerRootProps,
  DrawerTriggerProps,
  DrawerPortalProps,
  DrawerOverlayProps,
  DrawerContentProps,
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerCloseProps,
  DrawerPlacement,
  DrawerSize,
} from "./Drawer.types";

interface DrawerContextValue {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  closeOnEsc: boolean;
  closeOnOverlayClick: boolean;
  placement: DrawerPlacement;
  size: DrawerSize;
  titleId: string;
  setTitleId: (id: string) => void;
  descriptionId: string;
  setDescriptionId: (id: string) => void;
  initialFocusRef?: React.RefObject<HTMLElement | null> | undefined;
  finalFocusRef?: React.RefObject<HTMLElement | null> | undefined;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

const DrawerContext = React.createContext<DrawerContextValue | null>(null);

export function useDrawerContext(componentName: string): DrawerContextValue {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error(
      `<Drawer.${componentName}> must be used within a <Drawer> or <DrawerRoot> component.`,
    );
  }
  return context;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * DrawerRoot component - manages controlled/uncontrolled visibility, placement, and focus refs.
 */
export const DrawerRoot: React.FC<DrawerRootProps> = ({
  open: controlledOpen,
  isOpen: legacyOpen,
  defaultOpen = false,
  onOpenChange,
  onClose: onCloseProp,
  placement = "right",
  size = "md",
  closeOnEsc = true,
  closeOnOverlayClick = true,
  initialFocusRef,
  finalFocusRef,
  children,
}) => {
  const effectiveOpen = controlledOpen !== undefined ? controlledOpen : legacyOpen;

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: effectiveOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
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

  const contextValue = React.useMemo<DrawerContextValue>(
    () => ({
      isOpen: !!isOpen,
      onOpen: handleOpen,
      onClose: handleClose,
      closeOnEsc,
      closeOnOverlayClick,
      placement,
      size,
      titleId,
      setTitleId,
      descriptionId,
      setDescriptionId,
      initialFocusRef,
      finalFocusRef,
      triggerRef,
    }),
    [
      isOpen,
      handleOpen,
      handleClose,
      closeOnEsc,
      closeOnOverlayClick,
      placement,
      size,
      titleId,
      descriptionId,
      initialFocusRef,
      finalFocusRef,
    ],
  );

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
};
DrawerRoot.displayName = "Drawer.Root";

/**
 * DrawerTrigger - button or custom element that opens the drawer.
 */
export const DrawerTrigger = React.forwardRef<HTMLElement, DrawerTriggerProps>(
  ({ asChild = false, onClick, children, className, ...props }, forwardedRef) => {
    const { onOpen, triggerRef } = useDrawerContext("Trigger");
    const mergedRef = useMergeRefs(triggerRef, forwardedRef);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        onOpen();
      }
    };

    const triggerClasses = [
      "cl-drawer__trigger",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (asChild) {
      return (
        <Slot
          ref={mergedRef}
          aria-haspopup="dialog"
          onClick={handleClick}
          className={triggerClasses}
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
        className={triggerClasses}
        {...props}
      >
        {children}
      </button>
    );
  },
);
DrawerTrigger.displayName = "Drawer.Trigger";

/**
 * DrawerPortal - mounts drawer children into document.body or container.
 */
export const DrawerPortal: React.FC<DrawerPortalProps> = ({
  container,
  children,
}) => {
  const { isOpen } = useDrawerContext("Portal");

  if (!isOpen) {
    return null;
  }

  return (
    <Portal {...(container !== undefined ? { container } : {})}>
      {children}
    </Portal>
  );
};
DrawerPortal.displayName = "Drawer.Portal";

/**
 * DrawerOverlay - background backdrop with dismissal click handling.
 */
export const DrawerOverlay = React.forwardRef<
  HTMLDivElement,
  DrawerOverlayProps
>(
  (
    { asChild = false, className, onClick, children, ...props },
    forwardedRef,
  ) => {
    const { onClose, closeOnOverlayClick } = useDrawerContext("Overlay");

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      if (
        !e.defaultPrevented &&
        closeOnOverlayClick &&
        e.target === e.currentTarget
      ) {
        onClose();
      }
    };

    const classNames = [
      "cl-drawer__overlay",
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
  },
);
DrawerOverlay.displayName = "Drawer.Overlay";

/**
 * DrawerContent - edge-anchored sliding modal panel with focus trapping and body scroll locking.
 */
export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(
  (
    {
      placement: propPlacement,
      size: propSize,
      asChild = false,
      className,
      children,
      onKeyDown,
      ...props
    },
    forwardedRef,
  ) => {
    const {
      isOpen,
      onClose,
      closeOnEsc,
      placement: contextPlacement,
      size: contextSize,
      titleId,
      descriptionId,
      initialFocusRef,
      finalFocusRef,
      triggerRef,
    } = useDrawerContext("Content");

    const placement = propPlacement ?? contextPlacement;
    const size = propSize ?? contextSize;

    const internalRef = React.useRef<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs(internalRef, forwardedRef);
    const prevFocusedRef = React.useRef<HTMLElement | null>(null);

    // Reuse Dialog's shared reference-counted body scroll lock
    React.useEffect(() => {
      if (!isOpen) return;

      acquireBodyScrollLock();

      return () => {
        releaseBodyScrollLock();
      };
    }, [isOpen]);

    // Focus management lifecycle
    React.useEffect(() => {
      if (!isOpen) return;

      if (typeof document !== "undefined") {
        prevFocusedRef.current = document.activeElement as HTMLElement | null;
      }

      const frameId = requestAnimationFrame(() => {
        if (initialFocusRef?.current) {
          initialFocusRef.current.focus();
        } else if (internalRef.current) {
          const focusables =
            internalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
          if (focusables.length > 0) {
            focusables[0]?.focus();
          } else {
            internalRef.current.focus();
          }
        }
      });

      return () => {
        cancelAnimationFrame(frameId);
        const elementToFocus =
          finalFocusRef?.current ??
          triggerRef.current ??
          prevFocusedRef.current;
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
          internalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        ).filter(
          (el) =>
            !el.hasAttribute("disabled") &&
            el.getAttribute("aria-hidden") !== "true",
        );

        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    const contentClasses = [
      "cl-drawer__content",
      `cl-drawer__content--${placement}`,
      `cl-drawer__content--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={mergedRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        data-placement={placement}
        data-size={size}
        {...(titleId ? { "aria-labelledby": titleId } : {})}
        {...(descriptionId ? { "aria-describedby": descriptionId } : {})}
        className={contentClasses}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  },
);
DrawerContent.displayName = "Drawer.Content";

/**
 * DrawerHeader - header section containing title and optional close button.
 */
export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, children, ...props }, forwardedRef) => {
    const classNames = [
      "cl-drawer__header",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={forwardedRef} className={classNames} {...props}>
        {children}
      </div>
    );
  },
);
DrawerHeader.displayName = "Drawer.Header";

let titleIdCounter = 0;

/**
 * DrawerTitle - accessible dialog heading.
 */
export const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  DrawerTitleProps
>(({ asChild = false, id: propId, className, children, ...props }, forwardedRef) => {
  const { setTitleId } = useDrawerContext("Title");
  const autoIdRef = React.useRef<string>("");

  if (!autoIdRef.current) {
    autoIdRef.current = propId || `cl-drawer-title-${++titleIdCounter}`;
  }

  const titleId = propId || autoIdRef.current;

  React.useEffect(() => {
    setTitleId(titleId);
    return () => {
      setTitleId("");
    };
  }, [titleId, setTitleId]);

  const classNames = [
    "cl-drawer__title",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (asChild) {
    return (
      <Slot ref={forwardedRef} id={titleId} className={classNames} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <h2 ref={forwardedRef} id={titleId} className={classNames} {...props}>
      {children}
    </h2>
  );
});
DrawerTitle.displayName = "Drawer.Title";

let descriptionIdCounter = 0;

/**
 * DrawerDescription - accessible dialog description paragraph.
 */
export const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(({ asChild = false, id: propId, className, children, ...props }, forwardedRef) => {
  const { setDescriptionId } = useDrawerContext("Description");
  const autoIdRef = React.useRef<string>("");

  if (!autoIdRef.current) {
    autoIdRef.current = propId || `cl-drawer-desc-${++descriptionIdCounter}`;
  }

  const descId = propId || autoIdRef.current;

  React.useEffect(() => {
    setDescriptionId(descId);
    return () => {
      setDescriptionId("");
    };
  }, [descId, setDescriptionId]);

  const classNames = [
    "cl-drawer__description",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (asChild) {
    return (
      <Slot ref={forwardedRef} id={descId} className={classNames} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <p ref={forwardedRef} id={descId} className={classNames} {...props}>
      {children}
    </p>
  );
});
DrawerDescription.displayName = "Drawer.Description";

/**
 * DrawerBody - scrollable main content area.
 */
export const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, children, ...props }, forwardedRef) => {
    const classNames = [
      "cl-drawer__body",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={forwardedRef} className={classNames} {...props}>
        {children}
      </div>
    );
  },
);
DrawerBody.displayName = "Drawer.Body";

/**
 * DrawerFooter - bottom action buttons container.
 */
export const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, children, ...props }, forwardedRef) => {
    const classNames = [
      "cl-drawer__footer",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={forwardedRef} className={classNames} {...props}>
        {children}
      </div>
    );
  },
);
DrawerFooter.displayName = "Drawer.Footer";

/**
 * DrawerClose - button that triggers drawer dismissal.
 */
export const DrawerClose = React.forwardRef<
  HTMLButtonElement,
  DrawerCloseProps
>(({ asChild = false, onClick, children, className, ...props }, forwardedRef) => {
  const { onClose } = useDrawerContext("Close");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      onClose();
    }
  };

  const classNames = [
    "cl-drawer__close",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (asChild) {
    return (
      <Slot
        ref={forwardedRef}
        type="button"
        aria-label="Close drawer"
        onClick={handleClick}
        className={classNames}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={forwardedRef}
      type="button"
      aria-label="Close drawer"
      onClick={handleClick}
      className={classNames}
      {...props}
    >
      {children || "✕"}
    </button>
  );
});
DrawerClose.displayName = "Drawer.Close";

/**
 * Drawer Compound Component
 */
export const Drawer = Object.assign(DrawerRoot, {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Portal: DrawerPortal,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Close: DrawerClose,
});

/**
 * Sheet alias
 */
export const Sheet = Drawer;
export const SheetRoot = DrawerRoot;
export const SheetTrigger = DrawerTrigger;
export const SheetPortal = DrawerPortal;
export const SheetOverlay = DrawerOverlay;
export const SheetContent = DrawerContent;
export const SheetHeader = DrawerHeader;
export const SheetTitle = DrawerTitle;
export const SheetDescription = DrawerDescription;
export const SheetBody = DrawerBody;
export const SheetFooter = DrawerFooter;
export const SheetClose = DrawerClose;
