import { describe, it, expect } from "vitest";
import { createTheme } from "./createTheme";

describe("createTheme", () => {
  it("generates structured theme object and cssText", () => {
    const theme = createTheme({
      name: "emerald",
      tokens: {
        "--cl-color-primary-base": "#059669",
        "--cl-color-primary-hover": "#047857",
      },
    });

    expect(theme.name).toBe("emerald");
    expect(theme.tokens["--cl-color-primary-base"]).toBe("#059669");
    expect(theme.cssText).toContain('[data-theme="emerald"]');
    expect(theme.cssText).toContain("--cl-color-primary-base: #059669;");
    expect(theme.cssText).toContain("--cl-color-primary-hover: #047857;");
  });
});
