import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { useMergeRefs } from "./useMergeRefs";

describe("useMergeRefs", () => {
  it("assigns DOM node to both object ref and callback ref", () => {
    const objectRef = React.createRef<HTMLDivElement>();
    const callbackRef = vi.fn();

    function TestComponent() {
      const mergedRef = useMergeRefs(objectRef, callbackRef);
      return (
        <div ref={mergedRef} data-testid="test-node">
          Content
        </div>
      );
    }

    const { getByTestId } = render(<TestComponent />);
    const node = getByTestId("test-node");

    expect(objectRef.current).toBe(node);
    expect(callbackRef).toHaveBeenCalledWith(node);
  });

  it("handles null and undefined refs without crashing", () => {
    const validRef = React.createRef<HTMLDivElement>();

    function TestComponent() {
      const mergedRef = useMergeRefs(validRef, null, undefined);
      return (
        <div ref={mergedRef} data-testid="test-node">
          Content
        </div>
      );
    }

    const { getByTestId } = render(<TestComponent />);
    expect(validRef.current).toBe(getByTestId("test-node"));
  });

  it("cleans up refs with null upon unmount", () => {
    const objectRef = React.createRef<HTMLDivElement>();
    const callbackRef = vi.fn();

    function TestComponent() {
      const mergedRef = useMergeRefs(objectRef, callbackRef);
      return <div ref={mergedRef}>Content</div>;
    }

    const { unmount } = render(<TestComponent />);
    expect(objectRef.current).not.toBeNull();

    unmount();
    expect(objectRef.current).toBeNull();
    expect(callbackRef).toHaveBeenLastCalledWith(null);
  });
});
