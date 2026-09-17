import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChellaProvider } from "./ChellaProvider";
import { useTheme } from "./useTheme";

function TestConsumer() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <span data-testid="resolved-theme">{resolvedTheme}</span>
      <button type="button" onClick={() => setTheme("dark")}>
        Set Dark
      </button>
      <button type="button" onClick={() => setTheme("light")}>
        Set Light
      </button>
      <button type="button" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
}

describe("ChellaProvider & useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("applies defaultTheme attribute to documentElement", () => {
    render(
      <ChellaProvider defaultTheme="light">
        <TestConsumer />
      </ChellaProvider>
    );

    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("light");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("updates data-theme attribute and localStorage when theme changes", async () => {
    const user = userEvent.setup();

    render(
      <ChellaProvider defaultTheme="light">
        <TestConsumer />
      </ChellaProvider>
    );

    const darkBtn = screen.getByRole("button", { name: "Set Dark" });
    await user.click(darkBtn);

    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("dark");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem("chella-theme")).toBe("dark");
  });

  it("supports toggleTheme", async () => {
    const user = userEvent.setup();

    render(
      <ChellaProvider defaultTheme="light">
        <TestConsumer />
      </ChellaProvider>
    );

    const toggleBtn = screen.getByRole("button", { name: "Toggle" });
    await user.click(toggleBtn);

    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("dark");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");

    await user.click(toggleBtn);
    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("light");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("throws descriptive error when useTheme is used outside ChellaProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      "useTheme must be used within a <ChellaProvider />"
    );
    spy.mockRestore();
  });
});
