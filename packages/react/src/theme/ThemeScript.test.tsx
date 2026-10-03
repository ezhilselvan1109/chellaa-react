import * as React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ThemeScript } from "./ThemeScript";

describe("ThemeScript", () => {
  it("renders a script tag containing client-side theme initialization code", () => {
    const { container } = render(
      <ThemeScript
        storageKey="test-key"
        defaultTheme="dark"
        attribute="data-theme"
      />,
    );

    const script = container.querySelector("script");
    expect(script).not.toBeNull();
    expect(script?.textContent).toContain("test-key");
    expect(script?.textContent).toContain("dark");
    expect(script?.textContent).toContain("data-theme");
    expect(script?.textContent).toContain(
      "document.documentElement.setAttribute",
    );
  });
});
