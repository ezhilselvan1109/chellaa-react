"use client";

import * as React from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  type FloatingContext,
  type ExtendedRefs,
  type MiddlewareData,
} from "@floating-ui/react";
import { Portal } from "../../primitives/Portal";
import { Slot } from "../../primitives/Slot";
import { useControllableState } from "../../hooks/useControllableState";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { composeEventHandlers } from "../../utils/composeEventHandlers";
import { classNames } from "../../utils/classNames";
import type {
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverPortalProps,
  PopoverContentProps,
  PopoverCloseProps,
  PopoverArrowProps,
  PopoverHeaderProps,
  PopoverTitleProps,
  PopoverBodyProps,
  PopoverFooterProps,
  PopoverContextValue,
} from "./Popover.types";

interface PopoverInternalContextValue extends PopoverContextValue {
  floatingContext: FloatingContext;
  getReferenceProps: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  refs: ExtendedRefs<Element>;
  floatingStyles: React.CSSProperties;
  middlewareData: MiddlewareData;
  arrowRef: React.RefObject<HTMLDivElement | null>;
}

const PopoverContext = React.createContext<PopoverInternalContextValue | null>(null);

export function usePopoverContext(): PopoverInternalContextValue {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error(
      "Popover compound subcomponents must be rendered within a <Popover.Root> or <Popover>",
    );
  }
  return context;
}

/**
 * Popover.Root (or <Popover>) manages the open state and floating positioning context
 * for anchored rich interactive popup overlays.
 */
export function PopoverRoot({
  children,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom",
  offset: offsetProp = 8,
  trapFocus = true,
  closeOnEsc = true,
  initialFocusRef,
  returnFocusRef,
}: PopoverRootProps) {
  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const arrowRef = React.useRef<HTMLDivElement | null>(null);
  const [hasTitle, setHasTitle] = React.useState(false);
  const [hasPortalParent, setHasPortalParent] = React.useState(false);

  const {
    refs,
    floatingStyles,
    placement: actualPlacement,
    middlewareData,
    context: floatingContext,
  } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetProp),
      flip({ fallbackAxisSideDirection: "start" }),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
  });

  const click = useClick(floatingContext);
  const dismiss = useDismiss(floatingContext, {
    escapeKey: closeOnEsc,
    outsidePress: true,
    bubbles: false,
  });
  const role = useRole(floatingContext, {
    role: "dialog",
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const generatedId = React.useId();
  const id = `cl-popover-${(floatingContext.floatingId || generatedId).replace(/:/g, "")}`;
  const titleId = `cl-popover-title-${(floatingContext.floatingId || generatedId).replace(/:/g, "")}`;

  const open = React.useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = React.useCallback(() => setIsOpen(false), [setIsOpen]);
  const toggle = React.useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);

  const contextValue: PopoverInternalContextValue = {
    isOpen,
    open,
    close,
    toggle,
    placement,
    actualPlacement,
    trapFocus,
    id,
    titleId,
    hasTitle,
    setHasTitle,
    hasPortalParent,
    setHasPortalParent,
    initialFocusRef,
    returnFocusRef,
    floatingContext,
    getReferenceProps,
    getFloatingProps,
    refs,
    floatingStyles,
    middlewareData,
    arrowRef,
  };

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
}

PopoverRoot.displayName = "Popover.Root";

/**
 * Popover.Trigger wraps the anchor element, binding click and aria attributes.
 */
export const PopoverTrigger = React.forwardRef<HTMLElement, PopoverTriggerProps>(
  function PopoverTrigger({ children, asChild = false }, ref) {
    const { refs, getReferenceProps, isOpen, id } = usePopoverContext();

    const childRef = React.isValidElement(children)
      ? (children as { ref?: React.Ref<unknown> }).ref
      : undefined;
    const mergedRef = useMergeRefs(refs.setReference, childRef, ref);

    if (!React.isValidElement(children)) {
      return null;
    }

    const childProps = children.props as Record<string, unknown>;

    const referenceProps = getReferenceProps({
      ...childProps,
      ref: mergedRef,
      "aria-haspopup": "dialog",
      "aria-expanded": isOpen,
      "aria-controls": isOpen ? id : undefined,
    });

    if (asChild) {
      return <Slot {...referenceProps}>{children}</Slot>;
    }

    return React.cloneElement(children, referenceProps);
  },
);

PopoverTrigger.displayName = "Popover.Trigger";

/**
 * Popover.Portal mounts popover content into document.body or a custom container.
 */
export function PopoverPortal({ children, container }: PopoverPortalProps) {
  const { isOpen, setHasPortalParent } = usePopoverContext();

  React.useEffect(() => {
    setHasPortalParent(true);
    return () => setHasPortalParent(false);
  }, [setHasPortalParent]);

  if (!isOpen) {
    return null;
  }

  return <Portal container={container ?? null}>{children}</Portal>;
}

PopoverPortal.displayName = "Popover.Portal";

/**
 * Popover.Content renders the floating dialog container with focus trapping and styling.
 */
export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    {
      children,
      hasArrow = true,
      className,
      style,
      ...restProps
    },
    ref,
  ) {
    const {
      isOpen,
      id,
      titleId,
      hasTitle,
      trapFocus,
      initialFocusRef,
      returnFocusRef,
      floatingContext,
      getFloatingProps,
      refs,
      floatingStyles,
      actualPlacement,
      hasPortalParent,
    } = usePopoverContext();

    const mergedRef = useMergeRefs(refs.setFloating, ref);

    if (!isOpen) {
      return null;
    }

    const contentNode = (
      <FloatingFocusManager
        context={floatingContext}
        modal={trapFocus}
        disabled={!trapFocus}
        initialFocus={initialFocusRef || undefined}
        returnFocus={returnFocusRef || true}
      >
        <div
          {...getFloatingProps({
            id,
            ref: mergedRef,
            role: "dialog",
            "aria-modal": trapFocus ? "true" : undefined,
            "aria-labelledby": hasTitle ? titleId : undefined,
            className: classNames("cl-popover", className),
            style: {
              ...floatingStyles,
              ...style,
            },
            tabIndex: -1,
            ...restProps,
          })}
          data-state={isOpen ? "open" : "closed"}
          data-placement={actualPlacement}
        >
          {hasArrow && <PopoverArrow />}
          {children}
        </div>
      </FloatingFocusManager>
    );

    if (hasPortalParent) {
      return contentNode;
    }

    return <Portal>{contentNode}</Portal>;
  },
);

PopoverContent.displayName = "Popover.Content";

/**
 * Popover.Arrow renders the directional pointer diamond.
 */
export const PopoverArrow = React.forwardRef<HTMLDivElement, PopoverArrowProps>(
  function PopoverArrow({ className, style, ...restProps }, ref) {
    const { arrowRef, middlewareData } = usePopoverContext();
    const mergedRef = useMergeRefs(arrowRef, ref);

    return (
      <div
        ref={mergedRef}
        aria-hidden="true"
        className={classNames("cl-popover__arrow", className)}
        style={{
          left:
            middlewareData.arrow?.x != null
              ? `${middlewareData.arrow.x}px`
              : undefined,
          top:
            middlewareData.arrow?.y != null
              ? `${middlewareData.arrow.y}px`
              : undefined,
          ...style,
        }}
        {...restProps}
      />
    );
  },
);

PopoverArrow.displayName = "Popover.Arrow";

/**
 * Popover.Close renders a dismiss button or decorates a child button via asChild.
 */
export const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  function PopoverClose(
    { children, asChild = false, onClick, className, ...restProps },
    ref,
  ) {
    const { close } = usePopoverContext();
    const handleClick = composeEventHandlers(onClick, () => close());

    if (asChild && React.isValidElement(children)) {
      return (
        <Slot ref={ref} onClick={handleClick} {...restProps}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        type="button"
        ref={ref}
        onClick={handleClick}
        aria-label="Close popover"
        className={classNames("cl-popover__close", className)}
        {...restProps}
      >
        {children || "✕"}
      </button>
    );
  },
);

PopoverClose.displayName = "Popover.Close";

/**
 * Popover.Header provides the top bar of the popover.
 */
export const PopoverHeader = React.forwardRef<HTMLDivElement, PopoverHeaderProps>(
  function PopoverHeader({ children, className, ...restProps }, ref) {
    return (
      <div
        ref={ref}
        className={classNames("cl-popover__header", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

PopoverHeader.displayName = "Popover.Header";

/**
 * Popover.Title provides the dialog title and links via aria-labelledby.
 */
export const PopoverTitle = React.forwardRef<HTMLHeadingElement, PopoverTitleProps>(
  function PopoverTitle({ children, className, ...restProps }, ref) {
    const { titleId, setHasTitle } = usePopoverContext();

    React.useEffect(() => {
      setHasTitle(true);
      return () => setHasTitle(false);
    }, [setHasTitle]);

    return (
      <h3
        ref={ref}
        id={titleId}
        className={classNames("cl-popover__title", className)}
        {...restProps}
      >
        {children}
      </h3>
    );
  },
);

PopoverTitle.displayName = "Popover.Title";

/**
 * Popover.Body provides the main interactive container inside the popover.
 */
export const PopoverBody = React.forwardRef<HTMLDivElement, PopoverBodyProps>(
  function PopoverBody({ children, className, ...restProps }, ref) {
    return (
      <div
        ref={ref}
        className={classNames("cl-popover__body", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

PopoverBody.displayName = "Popover.Body";

/**
 * Popover.Footer provides the action footer of the popover.
 */
export const PopoverFooter = React.forwardRef<HTMLDivElement, PopoverFooterProps>(
  function PopoverFooter({ children, className, ...restProps }, ref) {
    return (
      <div
        ref={ref}
        className={classNames("cl-popover__footer", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

PopoverFooter.displayName = "Popover.Footer";

/**
 * Popover compound component aggregation.
 */
export const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  Content: PopoverContent,
  Close: PopoverClose,
  Arrow: PopoverArrow,
  Header: PopoverHeader,
  Title: PopoverTitle,
  Body: PopoverBody,
  Footer: PopoverFooter,
});
