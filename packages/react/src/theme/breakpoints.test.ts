import { describe, it, expect } from "vitest";
import { createBreakpoints, defaultBreakpoints } from "./breakpoints";

describe("breakpoints", () => {
  it("contains standard Material breakpoint values", () => {
    expect(defaultBreakpoints.values).toEqual({
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    });
  });

  it("generates correct up() media queries", () => {
    expect(defaultBreakpoints.up("sm")).toBe("@media (min-width:600px)");
    expect(defaultBreakpoints.up("md")).toBe("@media (min-width:900px)");
    expect(defaultBreakpoints.up(800)).toBe("@media (min-width:800px)");
  });

  it("generates correct down() media queries with 0.05px step", () => {
    expect(defaultBreakpoints.down("sm")).toBe("@media (max-width:599.95px)");
    expect(defaultBreakpoints.down("md")).toBe("@media (max-width:899.95px)");
  });

  it("generates correct between() media queries", () => {
    expect(defaultBreakpoints.between("sm", "md")).toBe(
      "@media (min-width:600px) and (max-width:899.95px)"
    );
  });

  it("generates correct only() media queries", () => {
    expect(defaultBreakpoints.only("sm")).toBe(
      "@media (min-width:600px) and (max-width:899.95px)"
    );
    expect(defaultBreakpoints.only("xl")).toBe("@media (min-width:1536px)");
  });

  it("allows custom breakpoint values", () => {
    const custom = createBreakpoints({ sm: 480, md: 768 });
    expect(custom.values.sm).toBe(480);
    expect(custom.up("sm")).toBe("@media (min-width:480px)");
  });
});
