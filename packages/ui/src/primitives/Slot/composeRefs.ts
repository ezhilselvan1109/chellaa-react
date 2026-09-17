import React from "react";

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * Set a given ref to a given value.
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

/**
 * Combines multiple refs into a single callback ref.
 */
export function composeRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => setRef(ref, node));
  };
}

/**
 * Custom hook that composes multiple refs.
 */
export function useComposedRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs);
}
