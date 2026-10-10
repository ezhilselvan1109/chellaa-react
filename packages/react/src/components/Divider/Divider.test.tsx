import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Divider } from "./Divider";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Divider Component", () => {
  // ---------------------------------------------------------------------------
  // 1. Rendering & DOM Attributes
  // ---------------------------------------------------------------------------
  describe("Rendering", () => {
    it("renders as native <hr> by default for horizontal plain divider", () => {
      render(<Divider data-testid="divider-root" />);
      const elem = screen.getByTestId("divider-root");
      expect(elem).toBeInTheDocument();
      expect(elem.tagName).toBe("HR");
      expect(elem).toHaveClass("cl-divider", "cl-divider--horizontal");
      expect(elem).not.toHaveAttribute("orientation");
      expect(elem).not.toHaveAttribute("variant");
    });

    it("renders as <div> with separator role when orientation='vertical'", () => {
      render(
        <Divider
          orientation="vertical"
          data-testid="divider-vertical"
        />
      );
      const elem = screen.getByTestId("divider-vertical");
      expect(elem).toBeInTheDocument();
      expect(elem.tagName).toBe("DIV");
      expect(elem).toHaveClass("cl-divider", "cl-divider--vertical");
      expect(elem).toHaveAttribute("role", "separator");
      expect(elem).toHaveAttribute("aria-orientation", "vertical");
      expect(elem).not.toHaveAttribute("orientation");
    });

    it("renders child label inside wrapper and defaults to div", () => {
      render(<Divider data-testid="divider-label">OR</Divider>);
      const elem = screen.getByTestId("divider-label");
      expect(elem.tagName).toBe("DIV");
      expect(elem).toHaveClass("cl-divider", "cl-divider--with-children", "cl-divider--align-center");
      expect(elem).toHaveTextContent("OR");
      const wrapper = elem.querySelector(".cl-divider__wrapper");
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveTextContent("OR");
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Variants & Inset Properties
  // ---------------------------------------------------------------------------
  describe("Variants & Insets", () => {
    it("supports variant='inset' without leaking to DOM", () => {
      render(<Divider variant="inset" data-testid="divider-inset" />);
      const elem = screen.getByTestId("divider-inset");
      expect(elem).toBeInTheDocument();
      expect(elem).toHaveClass("cl-divider", "cl-divider--inset");
      expect(elem).not.toHaveAttribute("variant");
    });

    it("supports variant='middle' without leaking to DOM", () => {
      render(<Divider variant="middle" data-testid="divider-middle" />);
      const elem = screen.getByTestId("divider-middle");
      expect(elem).toBeInTheDocument();
      expect(elem).toHaveClass("cl-divider", "cl-divider--middle");
      expect(elem).not.toHaveAttribute("variant");
    });

    it("supports flexItem prop without leaking to DOM", () => {
      render(
        <Divider
          orientation="vertical"
          flexItem
          data-testid="divider-flexitem"
        />
      );
      const elem = screen.getByTestId("divider-flexitem");
      expect(elem).toBeInTheDocument();
      expect(elem).toHaveClass("cl-divider", "cl-divider--flex-item");
      expect(elem).not.toHaveAttribute("flexItem");
    });

    it("supports lineStyle prop ('dashed', 'dotted') without leaking to DOM", () => {
      render(
        <Divider
          lineStyle="dashed"
          data-testid="divider-dashed"
        />
      );
      const elem = screen.getByTestId("divider-dashed");
      expect(elem).toBeInTheDocument();
      expect(elem).toHaveClass("cl-divider", "cl-divider--dashed");
      expect(elem).not.toHaveAttribute("lineStyle");
    });

    it("supports textAlign prop ('left', 'right') with children", () => {
      render(
        <Divider textAlign="left" data-testid="divider-text-left">
          Left Label
        </Divider>
      );
      const elem = screen.getByTestId("divider-text-left");
      expect(elem).toBeInTheDocument();
      expect(elem).toHaveClass("cl-divider", "cl-divider--align-left");
      expect(elem).not.toHaveAttribute("textAlign");
      expect(elem).toHaveTextContent("Left Label");
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Polymorphism & Composition
  // ---------------------------------------------------------------------------
  describe("Polymorphism", () => {
    it("supports component prop (e.g. 'li')", () => {
      render(
        <ul>
          <Divider component="li" data-testid="divider-li" />
        </ul>
      );
      const elem = screen.getByTestId("divider-li");
      expect(elem.tagName).toBe("LI");
    });

    it("supports asChild composition onto custom element", () => {
      render(
        <Divider asChild data-testid="divider-aschild">
          <span role="separator">Custom Separator</span>
        </Divider>
      );
      const elem = screen.getByTestId("divider-aschild");
      expect(elem.tagName).toBe("SPAN");
      expect(elem).toHaveTextContent("Custom Separator");
    });

    it("applies sx prop with theme styling", () => {
      render(
        <ThemeProvider>
          <Divider
            sx={{ my: 2, borderColor: "primary.main" }}
            data-testid="divider-sx"
          />
        </ThemeProvider>
      );
      const elem = screen.getByTestId("divider-sx");
      expect(elem).toBeInTheDocument();
      expect(elem).not.toHaveAttribute("sx");
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Accessibility (vitest-axe)
  // ---------------------------------------------------------------------------
  describe("Accessibility", () => {
    it("has zero axe violations for default horizontal divider", async () => {
      const { container } = render(
        <div>
          <p>Above paragraph</p>
          <Divider />
          <p>Below paragraph</p>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for vertical divider", async () => {
      const { container } = render(
        <div style={{ display: "flex" }}>
          <span>Left item</span>
          <Divider orientation="vertical" flexItem />
          <span>Right item</span>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for divider with children", async () => {
      const { container } = render(
        <div>
          <button type="button">Button 1</button>
          <Divider>OR</Divider>
          <button type="button">Button 2</button>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
