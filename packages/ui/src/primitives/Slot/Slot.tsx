import React from "react";
import { composeRefs } from "./composeRefs";
import type { SlotProps } from "./Slot.types";

export const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (React.isValidElement(children)) {
    return React.cloneElement<any>(children, {
      ...mergeProps(slotProps, children.props as any),
      ref: forwardedRef
        ? composeRefs(forwardedRef, (children as any).ref)
        : (children as any).ref,
    });
  }

  if (React.Children.count(children) > 1) {
    React.Children.only(null);
  }

  return null;
});

Slot.displayName = "ChellaSlot";

/**
 * Merges slot props and child props with precedence given to child props where appropriate.
 */
function mergeProps(slotProps: Record<string, any>, childProps: Record<string, any>) {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }

  return { ...slotProps, ...overrideProps };
}
