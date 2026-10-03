import * as React from "react";

export interface UseControllableStateParams<T> {
  value?: T | undefined;
  defaultValue?: T | (() => T) | undefined;
  onChange?: ((value: T) => void) | undefined;
}

/**
 * Manages state that can be either controlled (via `value`) or uncontrolled (via `defaultValue`).
 * When controlled, updates trigger `onChange` without mutating internal state directly.
 * When uncontrolled, internal state updates and `onChange` is notified.
 */
export function useControllableState<T>({
  value: valueProp,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>): [
  T,
  (nextValue: T | ((prev: T) => T)) => void,
] {
  const isControlled = valueProp !== undefined;

  const [uncontrolledValue, setUncontrolledValue] = React.useState<T>(() => {
    if (defaultValue !== undefined) {
      return typeof defaultValue === "function"
        ? (defaultValue as () => T)()
        : defaultValue;
    }
    return undefined as unknown as T;
  });

  const value = isControlled ? (valueProp as T) : uncontrolledValue;

  const onChangeRef = React.useRef(onChange);
  React.useEffect(() => {
    onChangeRef.current = onChange;
  });

  const setValue = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolvedNext =
        typeof next === "function" ? (next as (prev: T) => T)(value) : next;

      if (!Object.is(value, resolvedNext)) {
        if (!isControlled) {
          setUncontrolledValue(resolvedNext);
        }
        onChangeRef.current?.(resolvedNext);
      }
    },
    [isControlled, value],
  );

  return [value, setValue];
}
