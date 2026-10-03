import * as React from "react";
import { classNames } from "../utils/classNames";
import { composeEventHandlers } from "../utils/composeEventHandlers";
import { setRef } from "../hooks/useMergeRefs";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Merges Slot props onto its immediate child element.
 * Preserves child identity, merges classNames, styles, ref forwarding, and event handlers.
 */
export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  function Slot(props, forwardedRef) {
    const { children, ...slotProps } = props;

    if (React.isValidElement(children)) {
      return React.cloneElement(
        children,
        mergeProps(
          slotProps,
          children.props as Record<string, unknown>,
          forwardedRef,
          getElementRef(children),
        ),
      );
    }

    if (React.Children.count(children) > 1) {
      React.Children.only(null); // Will throw informative React.Children.only error
    }

    return null;
  },
);

Slot.displayName = "Slot";

/**
 * Extracts a ref from a React element across React 18 and React 19.
 */
function getElementRef(
  element: React.ReactElement,
): React.Ref<HTMLElement> | undefined {
  // In React 18 and earlier, ref is a property on the element instance.
  // In React 19, ref is passed as a standard prop.
  // Checking element.ref first avoids the React 18 special-props warning.
  const elementRef = (element as unknown as { ref?: React.Ref<HTMLElement> })
    ?.ref;
  if (elementRef !== undefined) {
    return elementRef;
  }
  return (element.props as { ref?: React.Ref<HTMLElement> })?.ref;
}

/**
 * Merges slot parent props with child props.
 */
function mergeProps(
  slotProps: Record<string, unknown>,
  childProps: Record<string, unknown>,
  slotRef: React.Ref<HTMLElement>,
  childRef?: React.Ref<HTMLElement>,
): Record<string, unknown> {
  const overrideProps: Record<string, unknown> = { ...childProps };

  for (const propName in slotProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isEventHandler = /^on[A-Z]/.test(propName);

    if (isEventHandler) {
      if (
        typeof slotPropValue === "function" &&
        typeof childPropValue === "function"
      ) {
        overrideProps[propName] = composeEventHandlers(
          childPropValue as (event: { defaultPrevented: boolean }) => void,
          slotPropValue as (event: { defaultPrevented: boolean }) => void,
        );
      } else if (typeof slotPropValue === "function") {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "className") {
      overrideProps[propName] = classNames(
        slotPropValue as string | undefined,
        childPropValue as string | undefined,
      );
    } else if (propName === "style") {
      overrideProps[propName] = {
        ...(slotPropValue as React.CSSProperties | undefined),
        ...(childPropValue as React.CSSProperties | undefined),
      };
    } else {
      overrideProps[propName] =
        slotPropValue !== undefined ? slotPropValue : childPropValue;
    }
  }

  // Ref merging
  overrideProps.ref = (node: HTMLElement | null) => {
    setRef(childRef, node);
    setRef(slotRef, node);
  };

  return overrideProps;
}
