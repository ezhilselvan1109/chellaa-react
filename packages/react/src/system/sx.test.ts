import { describe, it, expect } from "vitest";
import { parseSx } from "./sx";
import { defaultTheme } from "../theme/createTheme";

describe("parseSx Engine", () => {
  it("resolves spacing shortcuts with 8px grid", () => {
    const parsed = parseSx(defaultTheme, {
      m: 2,
      mt: 1,
      mb: 3,
      p: 4,
      px: 2,
      py: 1,
      gap: 1.5,
    });

    expect(parsed).toEqual({
      margin: "16px",
      marginTop: "8px",
      marginBottom: "24px",
      padding: "32px",
      paddingInline: "16px",
      paddingBlock: "8px",
      gap: "12px",
    });
  });

  it("resolves raw string spacing and auto margins", () => {
    const parsed = parseSx(defaultTheme, {
      m: "auto",
      p: "10px 20px",
    });

    expect(parsed).toEqual({
      margin: "auto",
      padding: "10px 20px",
    });
  });

  it("resolves theme palette paths for colors and bgcolor", () => {
    const parsed = parseSx(defaultTheme, {
      color: "primary.main",
      bgcolor: "background.paper",
      borderColor: "divider",
    });

    expect(parsed).toEqual({
      color: defaultTheme.palette.primary.main,
      backgroundColor: defaultTheme.palette.background.paper,
      borderColor: defaultTheme.palette.divider,
    });
  });

  it("preserves non-theme hex and named colors", () => {
    const parsed = parseSx(defaultTheme, {
      color: "#ff0000",
      backgroundColor: "transparent",
    });

    expect(parsed).toEqual({
      color: "#ff0000",
      backgroundColor: "transparent",
    });
  });

  it("resolves elevation levels to 24-level shadows", () => {
    const parsedElevation = parseSx(defaultTheme, {
      elevation: 4,
    });
    expect(parsedElevation).toEqual({
      boxShadow: defaultTheme.shadows[4],
    });

    const parsedBoxShadow = parseSx(defaultTheme, {
      boxShadow: 8,
    });
    expect(parsedBoxShadow).toEqual({
      boxShadow: defaultTheme.shadows[8],
    });
  });

  it("resolves zIndex token names from theme", () => {
    const parsed = parseSx(defaultTheme, {
      zIndex: "modal",
    });

    expect(parsed).toEqual({
      zIndex: defaultTheme.zIndex.modal,
    });
  });

  it("resolves responsive array syntax [xs, sm, md]", () => {
    const parsed = parseSx(defaultTheme, {
      p: [1, 2, 4],
    });

    const smMedia = defaultTheme.breakpoints.up("sm");
    const mdMedia = defaultTheme.breakpoints.up("md");

    expect(parsed.padding).toBe("8px");
    expect(parsed[smMedia]).toEqual({ padding: "16px" });
    expect(parsed[mdMedia]).toEqual({ padding: "32px" });
  });

  it("resolves responsive object syntax { xs, md }", () => {
    const parsed = parseSx(defaultTheme, {
      width: { xs: "100%", md: "50%" },
    });

    const mdMedia = defaultTheme.breakpoints.up("md");

    expect(parsed.width).toBe("100%");
    expect(parsed[mdMedia]).toEqual({ width: "50%" });
  });

  it("handles pseudo-classes and nested selectors", () => {
    const parsed = parseSx(defaultTheme, {
      color: "text.primary",
      "&:hover": {
        color: "primary.main",
        bgcolor: "action.hover",
      },
      "&.active": {
        fontWeight: "bold",
      },
    });

    expect(parsed.color).toBe(defaultTheme.palette.text.primary);
    expect(parsed["&:hover"]).toEqual({
      color: defaultTheme.palette.primary.main,
      backgroundColor: defaultTheme.palette.action.hover,
    });
    expect(parsed["&.active"]).toEqual({
      fontWeight: "bold",
    });
  });

  it("handles theme callback function in sx", () => {
    const parsed = parseSx(defaultTheme, (theme) => ({
      color: theme.palette.secondary.main,
      padding: theme.spacing(3),
    }));

    expect(parsed).toEqual({
      color: defaultTheme.palette.secondary.main,
      padding: "24px",
    });
  });

  it("handles array of sx objects with condition falsy filters", () => {
    const isSelected = false;
    const isHovered = true;

    const parsed = parseSx(defaultTheme, [
      { m: 1 },
      isSelected && { color: "primary.main" },
      isHovered && { bgcolor: "primary.light" },
      (theme) => ({ borderRadius: 2 }),
    ]);

    expect(parsed).toEqual({
      margin: "8px",
      backgroundColor: defaultTheme.palette.primary.light,
      borderRadius: "8px",
    });
  });
});
