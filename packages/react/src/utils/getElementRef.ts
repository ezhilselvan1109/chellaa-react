import * as React from "react";

/**
 * Safely extracts a ref from a React element across React 18 and React 19
 * without triggering deprecation warnings in either version.
 *
 * In React 18:
 * - `element.props.ref` logs a warning in DEV mode if accessed directly.
 * - The ref lives on `element.ref` (defaults to `null` if unspecified).
 *
 * In React 19:
 * - `element.ref` logs a warning in DEV mode because ref is now a standard prop.
 * - The ref lives on `element.props.ref` (defaults to `undefined` if unspecified).
 *
 * We inspect property descriptor getters to detect React's DEV warnings before
 * accessing the respective property, ensuring warning-free behavior across all versions.
 */
export function getElementRef<T = HTMLElement>(
  element: React.ReactElement,
): React.Ref<T> | undefined {
  if (!element || !React.isValidElement(element)) {
    return undefined;
  }

  // React <= 18 in DEV: accessing element.props.ref triggers a warning
  const propsGetter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  const isPropsWarning = Boolean(propsGetter && "isReactWarning" in propsGetter);
  if (isPropsWarning) {
    const r = (element as unknown as { ref?: React.Ref<T> }).ref;
    return r ?? undefined;
  }

  // React 19 in DEV: accessing element.ref triggers a warning
  const elementGetter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  const isElementWarning = Boolean(elementGetter && "isReactWarning" in elementGetter);
  if (isElementWarning) {
    const r = (element.props as { ref?: React.Ref<T> }).ref;
    return r ?? undefined;
  }

  // Production or un-proxied environment
  const ref =
    (element.props as { ref?: React.Ref<T> }).ref ??
    (element as unknown as { ref?: React.Ref<T> }).ref;
  return ref ?? undefined;
}
