import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Slot } from "./Slot";

describe("Slot", () => {
  it("renders child element without adding wrapper DOM element", () => {
    render(
      <Slot data-testid="slotted">
        <a href="https://chellaa.dev">Link Text</a>
      </Slot>,
    );

    const link = screen.getByTestId("slotted");
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("https://chellaa.dev");
    expect(link.textContent).toBe("Link Text");
  });

  it("merges classNames between Slot and child element", () => {
    render(
      <Slot className="cl-button cl-button--primary">
        <button type="button" className="custom-user-class">
          Click
        </button>
      </Slot>,
    );

    const btn = screen.getByRole("button", { name: "Click" });
    expect(btn.className).toBe(
      "cl-button cl-button--primary custom-user-class",
    );
  });

  it("merges styles between Slot and child element", () => {
    render(
      <Slot style={{ color: "blue", margin: "10px" }}>
        <span data-testid="span-child" style={{ color: "red", padding: "5px" }}>
          Styled
        </span>
      </Slot>,
    );

    const span = screen.getByTestId("span-child");
    // Slot style should take priority where specified, or merge cleanly
    expect(span.style.padding).toBe("5px");
    expect(span.style.margin).toBe("10px");
  });

  it("composes event handlers and respects preventDefault()", async () => {
    const user = userEvent.setup();
    const slotClick = vi.fn();
    const childClick = vi.fn((e: React.MouseEvent) => {
      e.preventDefault();
    });

    render(
      <Slot onClick={slotClick}>
        <button type="button" onClick={childClick}>
          Trigger
        </button>
      </Slot>,
    );

    const btn = screen.getByRole("button", { name: "Trigger" });
    await user.click(btn);

    expect(childClick).toHaveBeenCalled();
    // Because child called preventDefault(), slotClick must NOT be called
    expect(slotClick).not.toHaveBeenCalled();
  });

  it("calls slot handler when child does not call preventDefault()", async () => {
    const user = userEvent.setup();
    const order: string[] = [];
    const slotClick = vi.fn(() => order.push("slot"));
    const childClick = vi.fn(() => order.push("child"));

    render(
      <Slot onClick={slotClick}>
        <button type="button" onClick={childClick}>
          Trigger
        </button>
      </Slot>,
    );

    await user.click(screen.getByRole("button", { name: "Trigger" }));

    expect(childClick).toHaveBeenCalled();
    expect(slotClick).toHaveBeenCalled();
    expect(order).toEqual(["child", "slot"]);
  });

  it("merges refs between Slot forwardedRef and child ref", () => {
    const slotRef = React.createRef<HTMLButtonElement>();
    const childRef = React.createRef<HTMLButtonElement>();

    render(
      <Slot ref={slotRef}>
        <button ref={childRef} type="button">
          Ref Test
        </button>
      </Slot>,
    );

    const btn = screen.getByRole("button", { name: "Ref Test" });
    expect(slotRef.current).toBe(btn);
    expect(childRef.current).toBe(btn);
  });

  it("preserves accessibility and data attributes", () => {
    render(
      <Slot
        aria-label="Accessible Label"
        aria-expanded={true}
        data-theme="dark"
      >
        <button type="button">A11y Test</button>
      </Slot>,
    );

    const btn = screen.getByRole("button", { name: "Accessible Label" });
    expect(btn.getAttribute("aria-expanded")).toBe("true");
    expect(btn.getAttribute("data-theme")).toBe("dark");
  });
});
