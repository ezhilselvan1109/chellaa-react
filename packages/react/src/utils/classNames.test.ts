import { describe, it, expect } from "vitest";
import { classNames } from "./classNames";

describe("classNames", () => {
  it("joins multiple string arguments with spaces", () => {
    expect(classNames("cl-button", "cl-button--primary")).toBe(
      "cl-button cl-button--primary",
    );
  });

  it("filters out falsy values (null, undefined, false, empty strings)", () => {
    expect(classNames("cl-button", null, undefined, false, "")).toBe(
      "cl-button",
    );
  });

  it("handles conditional boolean expressions", () => {
    const isPrimary = true;
    const isLarge = false;
    expect(
      classNames(
        "cl-button",
        isPrimary && "cl-button--primary",
        isLarge && "cl-button--lg",
      ),
    ).toBe("cl-button cl-button--primary");
  });

  it("handles object notation with boolean flags", () => {
    expect(
      classNames("cl-button", {
        "cl-button--active": true,
        "cl-button--disabled": false,
      }),
    ).toBe("cl-button cl-button--active");
  });

  it("handles nested arrays", () => {
    expect(classNames(["cl-card", ["cl-card--elevated", null]])).toBe(
      "cl-card cl-card--elevated",
    );
  });

  it("returns an empty string when all arguments are falsy", () => {
    expect(classNames(null, undefined, false)).toBe("");
  });
});
