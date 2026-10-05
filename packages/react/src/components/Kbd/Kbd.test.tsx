import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Kbd, MODIFIER_SYMBOLS } from "./Kbd";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Kbd Component", () => {
  // ---------------------------------------------------------------------------
  // 1. Rendering & DOM Hygiene
  // ---------------------------------------------------------------------------
  describe("Rendering", () => {
    it("renders as native <kbd> by default with children", () => {
      render(<Kbd data-testid="kbd-root">Ctrl</Kbd>);
      const elem = screen.getByTestId("kbd-root");
      expect(elem).toBeInTheDocument();
      expect(elem.tagName).toBe("KBD");
      expect(elem).toHaveTextContent("Ctrl");
      expect(elem).not.toHaveAttribute("size");
      expect(elem).not.toHaveAttribute("variant");
      expect(elem).not.toHaveAttribute("modifier");
    });

    it("renders modifier symbol when modifier prop is specified", () => {
      render(<Kbd modifier="command" data-testid="kbd-cmd" />);
      const elem = screen.getByTestId("kbd-cmd");
      expect(elem).toHaveTextContent("⌘");
      expect(elem).not.toHaveAttribute("modifier");
    });

    it("prefers children over modifier if both are supplied", () => {
      render(
        <Kbd modifier="command" data-testid="kbd-override">
          Custom Key
        </Kbd>
      );
      const elem = screen.getByTestId("kbd-override");
      expect(elem).toHaveTextContent("Custom Key");
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Sizes & Variants
  // ---------------------------------------------------------------------------
  describe("Sizes & Variants", () => {
    it("supports size='sm', 'md', 'lg' without leaking to DOM", () => {
      const { rerender } = render(
        <Kbd size="sm" data-testid="kbd-size">
          K
        </Kbd>
      );
      expect(screen.getByTestId("kbd-size")).toBeInTheDocument();
      expect(screen.getByTestId("kbd-size")).not.toHaveAttribute("size");

      rerender(
        <Kbd size="lg" data-testid="kbd-size">
          K
        </Kbd>
      );
      expect(screen.getByTestId("kbd-size")).not.toHaveAttribute("size");
    });

    it("supports variant='outline', 'subtle', 'solid' without leaking to DOM", () => {
      const { rerender } = render(
        <Kbd variant="outline" data-testid="kbd-variant">
          Esc
        </Kbd>
      );
      expect(screen.getByTestId("kbd-variant")).toBeInTheDocument();
      expect(screen.getByTestId("kbd-variant")).not.toHaveAttribute("variant");

      rerender(
        <Kbd variant="subtle" data-testid="kbd-variant">
          Esc
        </Kbd>
      );
      expect(screen.getByTestId("kbd-variant")).not.toHaveAttribute("variant");

      rerender(
        <Kbd variant="solid" data-testid="kbd-variant">
          Esc
        </Kbd>
      );
      expect(screen.getByTestId("kbd-variant")).not.toHaveAttribute("variant");
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Modifier Symbols Dictionary
  // ---------------------------------------------------------------------------
  describe("Modifier Glyphs", () => {
    it("resolves all standard modifier glyphs correctly", () => {
      expect(MODIFIER_SYMBOLS.command).toBe("⌘");
      expect(MODIFIER_SYMBOLS.shift).toBe("⇧");
      expect(MODIFIER_SYMBOLS.option).toBe("⌥");
      expect(MODIFIER_SYMBOLS.control).toBe("⌃");
      expect(MODIFIER_SYMBOLS.enter).toBe("↵");
      expect(MODIFIER_SYMBOLS.escape).toBe("Esc");
      expect(MODIFIER_SYMBOLS.tab).toBe("⇥");
      expect(MODIFIER_SYMBOLS.backspace).toBe("⌫");
      expect(MODIFIER_SYMBOLS.delete).toBe("⌦");
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Polymorphism & SX
  // ---------------------------------------------------------------------------
  describe("Polymorphism", () => {
    it("supports component prop (e.g. 'span')", () => {
      render(
        <Kbd component="span" data-testid="kbd-span">
          Tab
        </Kbd>
      );
      const elem = screen.getByTestId("kbd-span");
      expect(elem.tagName).toBe("SPAN");
    });

    it("supports asChild composition onto custom element", () => {
      render(
        <Kbd asChild data-testid="kbd-aschild">
          <span aria-label="Control key">Ctrl</span>
        </Kbd>
      );
      const elem = screen.getByTestId("kbd-aschild");
      expect(elem.tagName).toBe("SPAN");
      expect(elem).toHaveAttribute("aria-label", "Control key");
    });

    it("applies sx prop with theme styling", () => {
      render(
        <ThemeProvider>
          <Kbd sx={{ mx: 1, color: "primary.main" }} data-testid="kbd-sx">
            Shift
          </Kbd>
        </ThemeProvider>
      );
      const elem = screen.getByTestId("kbd-sx");
      expect(elem).toBeInTheDocument();
      expect(elem).not.toHaveAttribute("sx");
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Accessibility (vitest-axe)
  // ---------------------------------------------------------------------------
  describe("Accessibility", () => {
    it("has zero axe violations for shortcut sequence", async () => {
      const { container } = render(
        <div>
          <span>Press </span>
          <Kbd modifier="command" />
          <span> + </span>
          <Kbd>K</Kbd>
          <span> to open command palette.</span>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
