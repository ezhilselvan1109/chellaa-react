import * as React from "react";

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * Assigns a value to a React ref (either RefCallback or MutableRefObject).
 */
export function setRef<T>(ref: PossibleRef<T>, value: T | null): void {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

/**
 * Combines multiple React refs into a single RefCallback.
 * Handles both object refs and callback refs, with proper unmount cleanup.
 */
export function useMergeRefs<T>(
  ...refs: PossibleRef<T>[]
): React.RefCallback<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback((current: T | null) => {
    for (const ref of refs) {
      setRef(ref, current);
    }
  }, refs);
}
