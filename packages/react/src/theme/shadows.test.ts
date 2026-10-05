import { describe, it, expect } from "vitest";
import { createShadows, defaultShadows } from "./shadows";

describe("shadows", () => {
  it("contains exactly 25 elevation levels (0 to 24)", () => {
    expect(defaultShadows).toHaveLength(25);
  });

  it("sets elevation 0 to none", () => {
    expect(defaultShadows[0]).toBe("none");
  });

  it("calculates composite umbra, penumbra, and ambient shadows for elevations 1 through 24", () => {
    for (let i = 1; i <= 24; i++) {
      const shadow = defaultShadows[i];
      expect(shadow).toContain("rgba(0,0,0,0.2)");
      expect(shadow).toContain("rgba(0,0,0,0.14)");
      expect(shadow).toContain("rgba(0,0,0,0.12)");
    }
  });

  it("createShadows produces identical shadow array", () => {
    const shadows = createShadows();
    expect(shadows).toEqual(defaultShadows);
  });
});
