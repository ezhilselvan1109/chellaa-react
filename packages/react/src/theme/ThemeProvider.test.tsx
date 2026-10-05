import * as React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "./useTheme";
import { createTheme } from "./createTheme";

function TestConsumer() {
  const { theme, resolvedTheme, setTheme, activeTheme, colorMode } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <span data-testid="color-mode">{colorMode}</span>
      <span data-testid="primary-main">{activeTheme.palette.primary.main}</span>
      <span data-testid="spacing-1">{activeTheme.spacing(1)}</span>
      <span data-testid="shadow-1">{activeTheme.shadows[1]}</span>
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

  it("provides default theme and updates document attribute and Emotion theme", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="light">
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme").textContent).toBe("light");
    expect(screen.getByTestId("resolved").textContent).toBe("light");
    expect(screen.getByTestId("color-mode").textContent).toBe("light");
    expect(screen.getByTestId("primary-main").textContent).toBe("#6366f1");
    expect(screen.getByTestId("spacing-1").textContent).toBe("8px");
    expect(screen.getByTestId("shadow-1").textContent).toContain("rgba(0,0,0,0.2)");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    await user.click(screen.getByRole("button", { name: "Set Dark" }));

    expect(screen.getByTestId("theme").textContent).toBe("dark");
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
    expect(screen.getByTestId("color-mode").textContent).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("chellaa-theme")).toBe("dark");
  });

  it("gracefully falls back to defaultTheme when used outside of ThemeProvider", () => {
    function FallbackConsumer() {
      const { theme, activeTheme } = useTheme();
      return (
        <div>
          <span data-testid="fallback-theme">{theme}</span>
          <span data-testid="fallback-primary">{activeTheme.palette.primary.main}</span>
        </div>
      );
    }

    render(<FallbackConsumer />);
    expect(screen.getByTestId("fallback-theme").textContent).toBe("light");
    expect(screen.getByTestId("fallback-primary").textContent).toBe("#6366f1");
  });

  it("supports custom theme options with custom palette and shape", () => {
    const customTheme = createTheme({
      palette: {
        primary: {
          main: "#10b981",
        },
      },
      shape: {
        borderRadius: 12,
      },
    });

    function CustomThemeConsumer() {
      const { activeTheme } = useTheme();
      return (
        <div>
          <span data-testid="custom-primary">{activeTheme.palette.primary.main}</span>
          <span data-testid="custom-radius">{activeTheme.shape.borderRadius}</span>
        </div>
      );
    }

    render(
      <ThemeProvider theme={customTheme}>
        <CustomThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId("custom-primary").textContent).toBe("#10b981");
    expect(screen.getByTestId("custom-radius").textContent).toBe("12");
  });

  it("supports nested ThemeProvider with scoped container attributes", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <div data-testid="outer">
          <TestConsumer />
          <ThemeProvider defaultTheme="dark">
            <div data-testid="inner">
              <TestConsumer />
            </div>
          </ThemeProvider>
        </div>
      </ThemeProvider>
    );

    const spans = screen.getAllByTestId("resolved");
    expect(spans[0].textContent).toBe("light");
    expect(spans[1].textContent).toBe("dark");
  });
});
