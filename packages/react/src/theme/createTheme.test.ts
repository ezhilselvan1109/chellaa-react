import { describe, it, expect } from "vitest";
import { createTheme, defaultTheme, defaultDarkTheme } from "./createTheme";

describe("createTheme", () => {
  it("creates a complete default light theme", () => {
    const theme = createTheme();

    expect(theme.palette.mode).toBe("light");
    expect(theme.palette.primary.main).toBe("#6366f1");
    expect(theme.palette.background.default).toBe("#f8fafc");
    expect(theme.shape.borderRadius).toBe(4);
    expect(theme.shadows).toHaveLength(25);
    expect(theme.shadows[0]).toBe("none");
    expect(theme.shadows[1]).toContain("rgba(0,0,0,0.2)");
    expect(theme.spacing(1)).toBe("8px");
    expect(theme.spacing(2)).toBe("16px");
    expect(theme.breakpoints.values.md).toBe(900);
  });

  it("creates a complete default dark theme", () => {
    const theme = createTheme({ palette: { mode: "dark" } });

    expect(theme.palette.mode).toBe("dark");
    expect(theme.palette.background.default).toBe("#09090b");
    expect(theme.palette.background.paper).toBe("#18181b");
    expect(theme.palette.text.primary).toContain("rgba(255, 255, 255");
  });

  it("deeply merges custom palette overrides", () => {
    const theme = createTheme({
      palette: {
        primary: {
          main: "#10b981",
        },
      },
      shape: {
        borderRadius: 8,
      },
    });

    expect(theme.palette.primary.main).toBe("#10b981");
    // Preserves default light / dark
    expect(theme.palette.primary.dark).toBe("#4f46e5");
    expect(theme.shape.borderRadius).toBe(8);
  });

  it("exports defaultTheme and defaultDarkTheme singletons", () => {
    expect(defaultTheme.palette.mode).toBe("light");
    expect(defaultDarkTheme.palette.mode).toBe("dark");
  });
});
