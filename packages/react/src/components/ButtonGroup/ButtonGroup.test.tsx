import * as React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button } from "../Button/Button";
import { ButtonGroup } from "./ButtonGroup";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("ButtonGroup Component", () => {
  // ---------------------------------------------------------------------------
  // 1. Rendering & DOM Structure
  // ---------------------------------------------------------------------------
  describe("Rendering", () => {
    it("renders with role='group' and default classes", () => {
      render(
        <ButtonGroup>
          <Button>One</Button>
          <Button>Two</Button>
        </ButtonGroup>,
      );
      const group = screen.getByRole("group");
      expect(group).toBeInTheDocument();
      expect(group).toHaveClass(
        "cl-button-group",
        "cl-button-group--horizontal",
      );
      expect(screen.getAllByRole("button")).toHaveLength(2);
    });

    it("supports vertical orientation", () => {
      render(
        <ButtonGroup orientation="vertical">
          <Button>One</Button>
          <Button>Two</Button>
        </ButtonGroup>,
      );
      const group = screen.getByRole("group");
      expect(group).toHaveClass("cl-button-group--vertical");
    });

    it("applies cl-button-group--attached class when isAttached is true", () => {
      render(
        <ButtonGroup isAttached>
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </ButtonGroup>,
      );
      const group = screen.getByRole("group");
      expect(group).toHaveClass("cl-button-group--attached");
    });

    it("forwards ref to the container HTMLDivElement", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ButtonGroup ref={ref}>
          <Button>Action</Button>
        </ButtonGroup>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("applies custom spacing style when not attached", () => {
      render(
        <ButtonGroup spacing={16}>
          <Button>A</Button>
          <Button>B</Button>
        </ButtonGroup>,
      );
      const group = screen.getByRole("group");
      expect(group).toHaveStyle({ gap: "16px" });
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Context Propagation
  // ---------------------------------------------------------------------------
  describe("Context Propagation to Child Buttons", () => {
    it("propagates size, variant, and colorScheme to child buttons", () => {
      render(
        <ButtonGroup size="lg" variant="outline" colorScheme="danger">
          <Button>Child 1</Button>
          <Button>Child 2</Button>
        </ButtonGroup>,
      );

      const buttons = screen.getAllByRole("button");
      buttons.forEach((btn) => {
        expect(btn).toHaveClass(
          "cl-button--lg",
          "cl-button--outline",
          "cl-button--danger",
        );
      });
    });

    it("propagates isDisabled to all child buttons", () => {
      render(
        <ButtonGroup isDisabled>
          <Button>Disabled 1</Button>
          <Button>Disabled 2</Button>
        </ButtonGroup>,
      );

      const buttons = screen.getAllByRole("button");
      buttons.forEach((btn) => {
        expect(btn).toBeDisabled();
        expect(btn).toHaveAttribute("aria-disabled", "true");
        expect(btn).toHaveClass("cl-button--disabled");
      });
    });

    it("allows child buttons to override group props", () => {
      render(
        <ButtonGroup size="sm" variant="ghost" colorScheme="neutral">
          <Button>Inherited</Button>
          <Button size="xl" variant="solid" colorScheme="success">
            Overridden
          </Button>
        </ButtonGroup>,
      );

      const inherited = screen.getByRole("button", { name: "Inherited" });
      const overridden = screen.getByRole("button", { name: "Overridden" });

      expect(inherited).toHaveClass(
        "cl-button--sm",
        "cl-button--ghost",
        "cl-button--neutral",
      );
      expect(overridden).toHaveClass(
        "cl-button--xl",
        "cl-button--solid",
        "cl-button--success",
      );
    });
  });

  // ---------------------------------------------------------------------------
  // 3. asChild Composition
  // ---------------------------------------------------------------------------
  describe("asChild Composition", () => {
    it("delegates root container to child element via Slot", () => {
      render(
        <ButtonGroup asChild>
          <nav aria-label="Pagination">
            <Button>Prev</Button>
            <Button>Next</Button>
          </nav>
        </ButtonGroup>,
      );

      const nav = screen.getByRole("navigation", { name: "Pagination" });
      expect(nav).toBeInTheDocument();
      expect(nav.tagName.toLowerCase()).toBe("nav");
      expect(nav).toHaveClass("cl-button-group");
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Accessibility (axe-core)
  // ---------------------------------------------------------------------------
  describe("Accessibility", () => {
    it("has zero axe violations for default ButtonGroup", async () => {
      const { container } = render(
        <ButtonGroup aria-label="Editor actions">
          <Button>Bold</Button>
          <Button>Italic</Button>
          <Button>Underline</Button>
        </ButtonGroup>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has zero axe violations for attached vertical ButtonGroup", async () => {
      const { container } = render(
        <ButtonGroup
          orientation="vertical"
          isAttached
          aria-label="Vertical options"
        >
          <Button>Top</Button>
          <Button>Middle</Button>
          <Button>Bottom</Button>
        </ButtonGroup>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Theme Permutations
  // ---------------------------------------------------------------------------
  describe("Theme Permutations", () => {
    it("renders cleanly inside Light and Dark ThemeProvider", () => {
      const { rerender } = render(
        <ThemeProvider defaultTheme="light">
          <ButtonGroup>
            <Button>Light 1</Button>
            <Button>Light 2</Button>
          </ButtonGroup>
        </ThemeProvider>,
      );
      expect(screen.getByRole("group")).toBeInTheDocument();

      rerender(
        <ThemeProvider defaultTheme="dark">
          <ButtonGroup>
            <Button>Dark 1</Button>
            <Button>Dark 2</Button>
          </ButtonGroup>
        </ThemeProvider>,
      );
      expect(screen.getByRole("group")).toBeInTheDocument();
    });
  });
});
