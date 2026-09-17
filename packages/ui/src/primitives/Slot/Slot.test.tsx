import React, { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Slot } from "./Slot";

describe("Slot Primitive", () => {
  it("renders the child element directly", () => {
    render(
      <Slot>
        <button type="button">Click me</button>
      </Slot>
    );

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
  });

  it("merges class names from slot and child", () => {
    render(
      <Slot className="slot-class">
        <button type="button" className="child-class">
          Click me
        </button>
      </Slot>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("slot-class");
    expect(button).toHaveClass("child-class");
  });

  it("merges inline styles", () => {
    render(
      <Slot style={{ color: "red", backgroundColor: "white" }}>
        <button type="button" style={{ backgroundColor: "blue", fontSize: "16px" }}>
          Click me
        </button>
      </Slot>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      color: "rgb(255, 0, 0)",
      backgroundColor: "rgb(0, 0, 255)",
      fontSize: "16px",
    });
  });

  it("chains event handlers so both slot and child callbacks execute", async () => {
    const user = userEvent.setup();
    const slotHandler = vi.fn();
    const childHandler = vi.fn();

    render(
      <Slot onClick={slotHandler}>
        <button type="button" onClick={childHandler}>
          Click me
        </button>
      </Slot>
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(childHandler).toHaveBeenCalledTimes(1);
    expect(slotHandler).toHaveBeenCalledTimes(1);
  });

  it("forwards ref to the child element", () => {
    const ref = createRef<HTMLButtonElement>();

    render(
      <Slot ref={ref}>
        <button type="button">Click me</button>
      </Slot>
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.textContent).toBe("Click me");
  });
});
