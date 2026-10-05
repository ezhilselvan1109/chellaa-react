import { describe, it, expect } from "vitest";
import { createSpacing, defaultSpacing } from "./spacing";

describe("spacing", () => {
  it("multiplies single numeric factors by 8px grid", () => {
    expect(defaultSpacing(0)).toBe("0px");
    expect(defaultSpacing(1)).toBe("8px");
    expect(defaultSpacing(2)).toBe("16px");
    expect(defaultSpacing(3)).toBe("24px");
    expect(defaultSpacing(4)).toBe("32px");
    expect(defaultSpacing(0.5)).toBe("4px");
  });

  it("handles multi-argument spacing invocations", () => {
    expect(defaultSpacing(1, 2)).toBe("8px 16px");
    expect(defaultSpacing(1, 2, 3)).toBe("8px 16px 24px");
    expect(defaultSpacing(1, 2, 3, 4)).toBe("8px 16px 24px 32px");
  });

  it("passes raw string values through without alteration", () => {
    expect(defaultSpacing("auto")).toBe("auto");
    expect(defaultSpacing(1, "auto")).toBe("8px auto");
    expect(defaultSpacing("100%")).toBe("100%");
  });

  it("supports custom base spacing unit", () => {
    const customSpacing = createSpacing(4);
    expect(customSpacing(1)).toBe("4px");
    expect(customSpacing(2)).toBe("8px");
  });
});
