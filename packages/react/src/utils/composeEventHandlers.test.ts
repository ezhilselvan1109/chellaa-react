import { describe, it, expect, vi } from "vitest";
import { composeEventHandlers } from "./composeEventHandlers";

describe("composeEventHandlers", () => {
  it("executes both original and internal handlers in sequence", () => {
    const callOrder: string[] = [];
    const originalHandler = vi.fn(() => callOrder.push("original"));
    const ourHandler = vi.fn(() => callOrder.push("internal"));

    const composed = composeEventHandlers(originalHandler, ourHandler);
    const mockEvent = { defaultPrevented: false };

    composed(mockEvent);

    expect(originalHandler).toHaveBeenCalledWith(mockEvent);
    expect(ourHandler).toHaveBeenCalledWith(mockEvent);
    expect(callOrder).toEqual(["original", "internal"]);
  });

  it("prevents internal handler from executing if original calls preventDefault()", () => {
    const originalHandler = vi.fn((event: { defaultPrevented: boolean }) => {
      event.defaultPrevented = true;
    });
    const ourHandler = vi.fn();

    const composed = composeEventHandlers(originalHandler, ourHandler);
    const mockEvent = { defaultPrevented: false };

    composed(mockEvent);

    expect(originalHandler).toHaveBeenCalled();
    expect(ourHandler).not.toHaveBeenCalled();
  });

  it("executes internal handler if checkForDefaultPrevented is false", () => {
    const originalHandler = vi.fn((event: { defaultPrevented: boolean }) => {
      event.defaultPrevented = true;
    });
    const ourHandler = vi.fn();

    const composed = composeEventHandlers(originalHandler, ourHandler, {
      checkForDefaultPrevented: false,
    });
    const mockEvent = { defaultPrevented: false };

    composed(mockEvent);

    expect(originalHandler).toHaveBeenCalled();
    expect(ourHandler).toHaveBeenCalled();
  });

  it("handles undefined original handler safely", () => {
    const ourHandler = vi.fn();
    const composed = composeEventHandlers(undefined, ourHandler);
    const mockEvent = { defaultPrevented: false };

    expect(() => composed(mockEvent)).not.toThrow();
    expect(ourHandler).toHaveBeenCalledWith(mockEvent);
  });

  it("handles undefined internal handler safely", () => {
    const originalHandler = vi.fn();
    const composed = composeEventHandlers(originalHandler, undefined);
    const mockEvent = { defaultPrevented: false };

    expect(() => composed(mockEvent)).not.toThrow();
    expect(originalHandler).toHaveBeenCalledWith(mockEvent);
  });
});
