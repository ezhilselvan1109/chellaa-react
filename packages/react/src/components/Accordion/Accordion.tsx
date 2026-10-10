"use client";

import * as React from "react";
import { classNames } from "../../utils/classNames";
import { Slot } from "../../primitives/Slot";
import { useControllableState } from "../../hooks/useControllableState";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import type {
  AccordionRootProps,
  AccordionContextValue,
  AccordionItemProps,
  AccordionItemContextValue,
  AccordionHeaderProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionIconProps,
  AccordionVariant,
  AccordionType,
} from "./Accordion.types";

export const AccordionContext =
  React.createContext<AccordionContextValue | null>(null);

export const useAccordionContext = (): AccordionContextValue => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion compound components must be rendered within an Accordion.Root.",
    );
  }
  return context;
};

export const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

export const useAccordionItemContext = (): AccordionItemContextValue => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "Accordion.Header, Accordion.Trigger, and Accordion.Content must be rendered within an Accordion.Item.",
    );
  }
  return context;
};

/**
 * Accordion.Root provides expansion state management and keyboard navigation for accordion items.
 */
export const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionRootProps>(
  function AccordionRoot(props, ref) {
    const {
      type = "single",
      variant = "outline",
      isDisabled = false,
      className,
      children,
      value: _value,
      defaultValue: _defaultValue,
      onValueChange: _onValueChange,
      ...restProps
    } = props;

    const isMultiple = type === "multiple";
    const collapsible =
      !isMultiple && "collapsible" in props ? Boolean(props.collapsible) : false;

    const domProps = { ...restProps };
    delete (domProps as { collapsible?: unknown }).collapsible;

    // Multiple mode state
    const [multipleValues, setMultipleValues] = useControllableState<string[]>({
      value: isMultiple ? (props.value as string[] | undefined) : undefined,
      defaultValue: isMultiple
        ? (props.defaultValue as string[] | undefined) ?? []
        : [],
      onChange: isMultiple
        ? (props.onValueChange as ((val: string[]) => void) | undefined)
        : undefined,
    });

    const handleSingleChange = React.useCallback(
      (val: string | undefined) => {
        if (!isMultiple && "onValueChange" in props && typeof props.onValueChange === "function") {
          (props.onValueChange as (v: string) => void)(val ?? "");
        }
      },
      [isMultiple, props],
    );

    // Single mode state
    const [singleValue, setSingleValue] = useControllableState<
      string | undefined
    >({
      value: !isMultiple ? (props.value as string | undefined) : undefined,
      defaultValue: !isMultiple
        ? (props.defaultValue as string | undefined)
        : undefined,
      onChange: handleSingleChange,
    });

    const expandedValues = React.useMemo(() => {
      if (isMultiple) {
        return Array.isArray(multipleValues) ? multipleValues : [];
      }
      return singleValue ? [singleValue] : [];
    }, [isMultiple, multipleValues, singleValue]);

    const toggleItem = React.useCallback(
      (itemValue: string) => {
        if (isMultiple) {
          const current = Array.isArray(multipleValues) ? multipleValues : [];
          const next = current.includes(itemValue)
            ? current.filter((v) => v !== itemValue)
            : [...current, itemValue];
          setMultipleValues(next);
        } else {
          const isCurrentOpen = singleValue === itemValue;
          if (isCurrentOpen) {
            if (collapsible) {
              setSingleValue("");
            }
          } else {
            setSingleValue(itemValue);
          }
        }
      },
      [
        isMultiple,
        multipleValues,
        setMultipleValues,
        singleValue,
        setSingleValue,
        collapsible,
      ],
    );

    const internalRootRef = React.useRef<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs(ref, internalRootRef);

    const contextValue = React.useMemo<AccordionContextValue>(
      () => ({
        type: type as AccordionType,
        variant: variant as AccordionVariant,
        collapsible,
        isDisabled,
        expandedValues,
        toggleItem,
        rootRef: internalRootRef,
      }),
      [type, variant, collapsible, isDisabled, expandedValues, toggleItem],
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={mergedRef}
          className={classNames(
            "cl-accordion",
            `cl-accordion--${variant}`,
            className,
          )}
          {...domProps}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);

AccordionRoot.displayName = "Accordion";

/**
 * Accordion.Item encapsulates a single collapsible panel and header.
 */
export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem(
    { value, isDisabled: itemDisabledProp = false, className, children, ...restProps },
    ref,
  ) {
    const { expandedValues, isDisabled: globalDisabled } = useAccordionContext();
    const isOpen = expandedValues.includes(value);
    const isDisabled = Boolean(itemDisabledProp || globalDisabled);

    const generatedId = React.useId();
    const triggerId = `cl-accordion-trigger-${value}-${generatedId}`;
    const panelId = `cl-accordion-panel-${value}-${generatedId}`;

    const contextValue = React.useMemo<AccordionItemContextValue>(
      () => ({
        value,
        isOpen,
        isDisabled,
        triggerId,
        panelId,
      }),
      [value, isOpen, isDisabled, triggerId, panelId],
    );

    return (
      <AccordionItemContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={classNames("cl-accordion__item", className)}
          data-state={isOpen ? "open" : "closed"}
          data-disabled={isDisabled ? "" : undefined}
          {...restProps}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);

AccordionItem.displayName = "Accordion.Item";

/**
 * Accordion.Header renders a semantic heading wrapper (h2 - h6) around the trigger button.
 */
export const AccordionHeader = React.forwardRef<
  HTMLHeadingElement,
  AccordionHeaderProps
>(function AccordionHeader(
  { level = 3, className, children, ...restProps },
  ref,
) {
  const HeadingTag = `h${level}` as const;

  return (
    <HeadingTag
      ref={ref}
      className={classNames("cl-accordion__header", className)}
      {...restProps}
    >
      {children}
    </HeadingTag>
  );
});

AccordionHeader.displayName = "Accordion.Header";

/**
 * Accordion.Trigger renders the interactive button that toggles expansion.
 */
export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(function AccordionTrigger(
  { asChild = false, className, children, onClick, onKeyDown, ...restProps },
  ref,
) {
  const { toggleItem, rootRef } = useAccordionContext();
  const { value, isOpen, isDisabled, triggerId, panelId } =
    useAccordionItemContext();

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || isDisabled) return;
      toggleItem(value);
    },
    [onClick, isDisabled, toggleItem, value],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      const rootEl = rootRef.current;
      if (!rootEl) return;

      const triggers = Array.from(
        rootEl.querySelectorAll<HTMLButtonElement>(
          ".cl-accordion__trigger:not([disabled]):not([data-disabled])",
        ),
      );
      const currentIndex = triggers.indexOf(event.currentTarget);
      if (currentIndex === -1 || triggers.length === 0) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % triggers.length;
        triggers[nextIndex]?.focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        const prevIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        triggers[prevIndex]?.focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        triggers[0]?.focus();
      } else if (event.key === "End") {
        event.preventDefault();
        triggers[triggers.length - 1]?.focus();
      }
    },
    [onKeyDown, rootRef],
  );

  const triggerClasses = classNames("cl-accordion__trigger", className);

  if (asChild) {
    return (
      <Slot
        ref={ref as React.Ref<HTMLElement>}
        id={triggerId}
        role="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        data-state={isOpen ? "open" : "closed"}
        data-disabled={isDisabled ? "" : undefined}
        className={triggerClasses}
        onClick={handleClick as unknown as React.MouseEventHandler<HTMLElement>}
        onKeyDown={handleKeyDown as unknown as React.KeyboardEventHandler<HTMLElement>}
        {...(restProps as Record<string, unknown>)}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      id={triggerId}
      type="button"
      aria-expanded={isOpen}
      aria-controls={panelId}
      disabled={isDisabled}
      data-state={isOpen ? "open" : "closed"}
      data-disabled={isDisabled ? "" : undefined}
      className={triggerClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      {children}
    </button>
  );
});

AccordionTrigger.displayName = "Accordion.Trigger";

/**
 * Accordion.Content renders the collapsible body region with CSS grid height transition.
 */
export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(function AccordionContent({ className, children, ...restProps }, ref) {
  const { isOpen, isDisabled, triggerId, panelId } = useAccordionItemContext();

  return (
    <div
      ref={ref}
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      hidden={!isOpen}
      data-state={isOpen ? "open" : "closed"}
      data-disabled={isDisabled ? "" : undefined}
      className={classNames("cl-accordion__content", className)}
      {...restProps}
    >
      <div className="cl-accordion__inner">{children}</div>
    </div>
  );
});

AccordionContent.displayName = "Accordion.Content";

/**
 * Accordion.Icon renders a 16x16 chevron SVG icon that rotates 180° when expanded.
 */
export const AccordionIcon = React.forwardRef<
  SVGSVGElement,
  AccordionIconProps
>(function AccordionIcon({ className, ...restProps }, ref) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={classNames("cl-accordion__icon", className)}
      aria-hidden="true"
      focusable="false"
      {...restProps}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
});

AccordionIcon.displayName = "Accordion.Icon";

export interface AccordionComponent
  extends React.ForwardRefExoticComponent<
    AccordionRootProps & React.RefAttributes<HTMLDivElement>
  > {
  Root: typeof AccordionRoot;
  Item: typeof AccordionItem;
  Header: typeof AccordionHeader;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
  Icon: typeof AccordionIcon;
}

export const Accordion = AccordionRoot as AccordionComponent;
Accordion.Root = AccordionRoot;
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
Accordion.Icon = AccordionIcon;
