import React, { createRef } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VisuallyHidden } from "./VisuallyHidden";

describe("VisuallyHidden Primitive", () => {
  it("renders accessible content for screen readers", () => {
    render(<VisuallyHidden>Screen reader content</VisuallyHidden>);

    const element = screen.getByText("Screen reader content");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("SPAN");
    expect(element).toHaveStyle({
      position: "absolute",
      overflow: "hidden",
      width: "1px",
      height: "1px",
    });
  });

  it("forwards ref to the underlying span element", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<VisuallyHidden ref={ref}>Hidden text</VisuallyHidden>);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
