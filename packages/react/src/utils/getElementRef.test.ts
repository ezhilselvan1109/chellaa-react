import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { getElementRef } from "./getElementRef";

describe("getElementRef Utility (W2-F12)", () => {
  it("extracts object ref in React 18 element", () => {
    const ref = React.createRef<HTMLButtonElement>();
    const element = React.createElement("button", { ref });
    const extracted = getElementRef(element);
    expect(extracted).toBe(ref);
  });

  it("extracts callback ref in React 18 element", () => {
    const callbackRef = vi.fn();
    const element = React.createElement("button", { ref: callbackRef });
    const extracted = getElementRef(element);
    expect(extracted).toBe(callbackRef);
  });

  it("returns undefined when element has no ref", () => {
    const element = React.createElement("button", { id: "test" });
    const extracted = getElementRef(element);
    expect(extracted).toBeUndefined();
  });

  it("returns undefined for non-elements", () => {
    expect(getElementRef(null as unknown as React.ReactElement)).toBeUndefined();
    expect(getElementRef(undefined as unknown as React.ReactElement)).toBeUndefined();
  });

  it("handles React 19 props.ref cleanly without invoking warning getters", () => {
    const mockRef = React.createRef<HTMLDivElement>();
    // Simulate React 19 element structure where ref is in props
    const element = {
      type: "div",
      props: {
        id: "r19",
        ref: mockRef,
      },
      key: null,
      $$typeof: Symbol.for("react.element"),
    } as unknown as React.ReactElement;

    // Simulate React 19 warning getter on element.ref
    let getterCalled = false;
    const warningGetter = Object.assign(
      function isReactWarning() {
        getterCalled = true;
        return mockRef;
      },
      { isReactWarning: true }
    );

    Object.defineProperty(element, "ref", {
      get: warningGetter,
      configurable: true,
    });

    const extracted = getElementRef(element);
    expect(extracted).toBe(mockRef);
    // The warning getter on element.ref MUST NOT be called!
    expect(getterCalled).toBe(false);
  });
});
