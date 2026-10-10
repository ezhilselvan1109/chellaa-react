"use client";

import * as React from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  safePolygon,
} from "@floating-ui/react";
import { Portal } from "../../primitives/Portal";
import { Kbd } from "../Kbd";
import { useControllableState } from "../../hooks/useControllableState";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { classNames } from "../../utils/classNames";
import type { TooltipProps } from "./Tooltip.types";

/**
 * Tooltip provides a lightweight, accessible floating text popup anchored to a target
 * trigger element, triggered via pointer hover or keyboard focus.
 *
 * Conforms to WCAG 2.2 AA (SC 1.4.13 Content on Hover or Focus) and WAI-ARIA APG Tooltip Pattern.
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(
    {
      content,
      children,
      placement = "top",
      openDelay = 200,
      closeDelay = 150,
      isOpen: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      hasArrow = true,
      isDisabled = false,
      offset: offsetProp = 8,
      shortcut,
      className,
      style,
    },
    forwardedRef,
  ) {
    const [isOpen, setIsOpen] = useControllableState<boolean>({
      value: controlledOpen,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const isEffectivelyOpen = Boolean(isOpen && !isDisabled && content);
    const arrowRef = React.useRef<HTMLDivElement>(null);

    const {
      refs,
      floatingStyles,
      placement: actualPlacement,
      middlewareData,
      context,
    } = useFloating({
      placement,
      open: isEffectivelyOpen,
      onOpenChange: (nextOpen) => {
        if (!isDisabled && content) {
          setIsOpen(nextOpen);
        } else if (!nextOpen) {
          setIsOpen(false);
        }
      },
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(offsetProp),
        flip({ fallbackAxisSideDirection: "start" }),
        shift({ padding: 8 }),
        hasArrow ? arrow({ element: arrowRef }) : undefined,
      ].filter(Boolean),
    });

    const hover = useHover(context, {
      delay: {
        open: openDelay,
        close: closeDelay,
      },
      handleClose: safePolygon(),
      enabled: !isDisabled && Boolean(content),
    });

    const focus = useFocus(context, {
      visibleOnly: false,
      enabled: !isDisabled && Boolean(content),
    });

    const dismiss = useDismiss(context, {
      escapeKey: true,
      enabled: !isDisabled && Boolean(content),
    });

    const role = useRole(context, {
      role: "tooltip",
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      hover,
      focus,
      dismiss,
      role,
    ]);

    const generatedId = React.useId();
    const tooltipId = `cl-tooltip-${(context.floatingId || generatedId).replace(/:/g, "")}`;
    const childRef = React.isValidElement(children)
      ? (children as { ref?: React.Ref<unknown> }).ref
      : undefined;
    const mergedReferenceRef = useMergeRefs(refs.setReference, childRef);
    const mergedFloatingRef = useMergeRefs(refs.setFloating, forwardedRef);

    if (!React.isValidElement(children)) {
      return null;
    }

    const childProps = children.props as Record<string, unknown>;
    const childAriaDescribedBy = childProps["aria-describedby"] as string | undefined;
    const mergedAriaDescribedBy = isEffectivelyOpen
      ? [childAriaDescribedBy, tooltipId].filter(Boolean).join(" ")
      : childAriaDescribedBy;

    const referenceProps = getReferenceProps({
      ...childProps,
      ref: mergedReferenceRef,
      "aria-describedby": mergedAriaDescribedBy,
    });

    const clonedTrigger = React.cloneElement(children, referenceProps);

    return (
      <>
        {clonedTrigger}
        {isEffectivelyOpen && (
          <Portal>
            <div
              {...getFloatingProps({
                id: tooltipId,
                ref: mergedFloatingRef,
                role: "tooltip",
                className: classNames("cl-tooltip", className),
                style: {
                  ...floatingStyles,
                  ...style,
                },
              })}
              data-state="open"
              data-placement={actualPlacement}
            >
              <span className="cl-tooltip__label">{content}</span>
              {shortcut && (
                <span className="cl-tooltip__shortcut">
                  <Kbd size="sm">{shortcut}</Kbd>
                </span>
              )}
              {hasArrow && (
                <div
                  ref={arrowRef}
                  className="cl-tooltip__arrow"
                  aria-hidden="true"
                  style={{
                    left:
                      middlewareData.arrow?.x != null
                        ? `${middlewareData.arrow.x}px`
                        : undefined,
                    top:
                      middlewareData.arrow?.y != null
                        ? `${middlewareData.arrow.y}px`
                        : undefined,
                  }}
                />
              )}
            </div>
          </Portal>
        )}
      </>
    );
  },
);

Tooltip.displayName = "Tooltip";
