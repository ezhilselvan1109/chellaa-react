import * as React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "./useTheme";

function TestConsumer() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("light")}>Set Light</button>
    </div>
  );
}

describe("ThemeProvider & useTheme", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    localStorage.clear();
  });

  it("provides default theme and updates document attribute", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="light">
        <TestConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme").textContent).toBe("light");
    expect(screen.getByTestId("resolved").textContent).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    await user.click(screen.getByRole("button", { name: "Set Dark" }));

    expect(screen.getByTestId("theme").textContent).toBe("dark");
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("chellaa-theme")).toBe("dark");
  });

  it("throws clear error when useTheme is used outside of ThemeProvider", () => {
    function InvalidConsumer() {
      useTheme();
      return null;
    }

    expect(() => render(<InvalidConsumer />)).toThrow(
      "useTheme must be used within a <ThemeProvider>",
    );
  });

  it("supports nested ThemeProvider with scoped container attributes", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <div data-testid="parent-content">Parent Content</div>
        <ThemeProvider defaultTheme="dark">
          <div data-testid="nested-content">Nested Content</div>
        </ThemeProvider>
      </ThemeProvider>,
    );

    // Root documentElement has light theme
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    // Nested scope has dark theme on container
    const nestedContainer = screen.getByTestId("nested-content").parentElement;
    expect(nestedContainer?.getAttribute("data-theme")).toBe("dark");
    expect(nestedContainer?.classList.contains("cl-theme-scope")).toBe(true);
  });

  it("applies custom token overrides to document root", () => {
    render(
      <ThemeProvider
        defaultTheme="light"
        tokens={{ "--cl-color-primary-base": "#123456" }}
      >
        <div>Content</div>
      </ThemeProvider>,
    );

    expect(
      document.documentElement.style.getPropertyValue(
        "--cl-color-primary-base",
      ),
    ).toBe("#123456");
  });
});
