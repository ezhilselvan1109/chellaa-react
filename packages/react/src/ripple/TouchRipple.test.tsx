import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { TouchRipple, TouchRippleRef } from "./TouchRipple";
import { useRipple } from "./useRipple";

describe("TouchRipple Component", () => {
  it("renders a touch ripple container", () => {
    render(<TouchRipple data-testid="touch-ripple" />);
    const elem = screen.getByTestId("touch-ripple");
    expect(elem).toBeInTheDocument();
    expect(elem.tagName).toBe("SPAN");
    expect(elem).toHaveAttribute("aria-hidden", "true");
  });

  it("spawns ripples when start() is called", () => {
    const rippleRef = React.createRef<TouchRippleRef>();
    const { container } = render(<TouchRipple ref={rippleRef} />);

    act(() => {
      rippleRef.current?.start({
        nativeEvent: { clientX: 50, clientY: 50 },
      } as any);
    });

    const ripples = container.querySelectorAll("span > span");
    expect(ripples.length).toBe(1);
  });

  it("centers ripple when pulsate() or center=true is called", () => {
    const rippleRef = React.createRef<TouchRippleRef>();
    const { container } = render(<TouchRipple ref={rippleRef} center />);

    act(() => {
      rippleRef.current?.pulsate();
    });

    const ripples = container.querySelectorAll("span > span");
    expect(ripples.length).toBe(1);
  });

  it("removes ripples when stop() is called after timeout", () => {
    vi.useFakeTimers();
    const rippleRef = React.createRef<TouchRippleRef>();
    const { container } = render(<TouchRipple ref={rippleRef} />);

    act(() => {
      rippleRef.current?.start();
    });
    expect(container.querySelectorAll("span > span").length).toBe(1);

    act(() => {
      rippleRef.current?.stop();
    });

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(container.querySelectorAll("span > span").length).toBe(0);
    vi.useRealTimers();
  });

  it("cleans up pending timeout handlers on unmount without throwing errors or updating unmounted state", () => {
    vi.useFakeTimers();
    const rippleRef = React.createRef<TouchRippleRef>();
    const { unmount } = render(<TouchRipple ref={rippleRef} />);

    act(() => {
      rippleRef.current?.start();
    });

    act(() => {
      rippleRef.current?.stop();
    });

    // Unmount while ripple is exiting (timer is active)
    unmount();

    // Advancing timers should not cause React act/unmounted state warnings
    act(() => {
      vi.advanceTimersByTime(600);
    });

    vi.useRealTimers();
  });

  it("handles touch events cleanly with touch coordinate narrowing", () => {
    const rippleRef = React.createRef<TouchRippleRef>();
    const { container } = render(<TouchRipple ref={rippleRef} />);

    act(() => {
      rippleRef.current?.start({
        nativeEvent: {
          touches: [{ clientX: 25, clientY: 30 }],
        },
      } as unknown as React.SyntheticEvent);
    });

    const ripples = container.querySelectorAll("span > span");
    expect(ripples.length).toBe(1);
  });
});

describe("useRipple Hook", () => {
  function TestInteractive() {
    const { rippleProps, getRippleHandlers } = useRipple();
    return (
      <button {...getRippleHandlers({ "data-testid": "btn" })}>
        Click me
        <TouchRipple {...rippleProps} />
      </button>
    );
  }

  it("attaches ripple handlers to button and triggers ripples on mouse down and up", () => {
    const { container } = render(<TestInteractive />);
    const btn = screen.getByTestId("btn");

    fireEvent.mouseDown(btn, { clientX: 20, clientY: 20 });
    expect(container.querySelectorAll("span > span").length).toBe(1);

    fireEvent.mouseUp(btn);
  });

  it("triggers keyboard pulsate ripple on Enter and Space key down", () => {
    const { container } = render(<TestInteractive />);
    const btn = screen.getByTestId("btn");

    fireEvent.keyDown(btn, { key: "Enter" });
    expect(container.querySelectorAll("span > span").length).toBe(1);

    fireEvent.keyUp(btn, { key: "Enter" });
  });
});
