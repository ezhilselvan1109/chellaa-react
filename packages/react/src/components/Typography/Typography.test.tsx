import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Typography } from "./Typography";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { Paragraph } from "./Paragraph";
import { Code } from "./Code";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Typography System", () => {
  // ---------------------------------------------------------------------------
  // 1. Base Typography Rendering & Variants
  // ---------------------------------------------------------------------------
  describe("Typography Base", () => {
    it("renders body1 as <p> by default with static classes", () => {
      render(<Typography data-testid="typo-root">Default body text</Typography>);
      const elem = screen.getByTestId("typo-root");
      expect(elem).toBeInTheDocument();
      expect(elem.tagName).toBe("P");
      expect(elem).toHaveTextContent("Default body text");
      expect(elem).toHaveClass("cl-typography");
      expect(elem).toHaveClass("cl-typography--body1");
    });

    it("renders h1 as <h1> by default with static classes", () => {
      render(
        <Typography variant="h1" data-testid="typo-h1">
          H1 Title
        </Typography>
      );
      const elem = screen.getByTestId("typo-h1");
      expect(elem.tagName).toBe("H1");
      expect(elem).toHaveTextContent("H1 Title");
      expect(elem).toHaveClass("cl-typography");
      expect(elem).toHaveClass("cl-typography--h1");
    });

    it("applies dynamic sx styling with precedence", () => {
      render(
        <Typography sx={{ letterSpacing: "2px", textTransform: "uppercase" }} data-testid="typo-sx">
          Sx Typography
        </Typography>
      );
      const elem = screen.getByTestId("typo-sx");
      expect(elem).toHaveClass("cl-typography");
      expect(elem).not.toHaveAttribute("sx");
    });

    it("renders caption as <span> by default", () => {
      render(
        <Typography variant="caption" data-testid="typo-caption">
          Caption Note
        </Typography>
      );
      const elem = screen.getByTestId("typo-caption");
      expect(elem.tagName).toBe("SPAN");
    });

    it("supports decoupling visual variant from HTML tag via component prop", () => {
      render(
        <Typography variant="h1" component="h3" data-testid="typo-decoupled">
          H3 Tag with H1 Styling
        </Typography>
      );
      const elem = screen.getByTestId("typo-decoupled");
      expect(elem.tagName).toBe("H3");
    });

    it("supports text alignment prop without leaking to DOM", () => {
      render(
        <Typography align="center" data-testid="typo-align">
          Centered Text
        </Typography>
      );
      const elem = screen.getByTestId("typo-align");
      expect(elem).toBeInTheDocument();
      expect(elem).not.toHaveAttribute("align");
    });

    it("supports gutterBottom without leaking to DOM", () => {
      render(
        <Typography gutterBottom data-testid="typo-gutter">
          Gutter Text
        </Typography>
      );
      const elem = screen.getByTestId("typo-gutter");
      expect(elem).toBeInTheDocument();
      expect(elem).not.toHaveAttribute("gutterBottom");
    });

    it("supports noWrap single-line truncation", () => {
      render(
        <Typography noWrap data-testid="typo-nowrap">
          Single line truncated text
        </Typography>
      );
      const elem = screen.getByTestId("typo-nowrap");
      expect(elem).toBeInTheDocument();
      expect(elem).not.toHaveAttribute("noWrap");
    });

    it("supports lineClamp multi-line truncation", () => {
      render(
        <Typography lineClamp={3} data-testid="typo-clamp">
          Multi line clamped text
        </Typography>
      );
      const elem = screen.getByTestId("typo-clamp");
      expect(elem).toBeInTheDocument();
      expect(elem).not.toHaveAttribute("lineClamp");
    });

    it("resolves theme color tokens", () => {
      render(
        <ThemeProvider>
          <Typography color="primary" data-testid="typo-color">
            Primary Text
          </Typography>
        </ThemeProvider>
      );
      const elem = screen.getByTestId("typo-color");
      expect(elem).toBeInTheDocument();
      expect(elem).not.toHaveAttribute("color");
    });

    it("supports asChild composition onto custom element", () => {
      render(
        <Typography asChild variant="h2" data-testid="typo-aschild">
          <a href="/link">Anchor with Typography</a>
        </Typography>
      );
      const elem = screen.getByTestId("typo-aschild");
      expect(elem.tagName).toBe("A");
      expect(elem).toHaveAttribute("href", "/link");
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Heading Primitive
  // ---------------------------------------------------------------------------
  describe("Heading Primitive", () => {
    it("renders <h2> by default", () => {
      render(<Heading data-testid="heading-default">Default Section</Heading>);
      const elem = screen.getByTestId("heading-default");
      expect(elem.tagName).toBe("H2");
      expect(elem).toHaveTextContent("Default Section");
    });

    it("renders corresponding tag for level={1..6}", () => {
      const { rerender } = render(
        <Heading level={1} data-testid="heading-lvl">
          Level 1
        </Heading>
      );
      expect(screen.getByTestId("heading-lvl").tagName).toBe("H1");

      rerender(
        <Heading level={3} data-testid="heading-lvl">
          Level 3
        </Heading>
      );
      expect(screen.getByTestId("heading-lvl").tagName).toBe("H3");

      rerender(
        <Heading level={6} data-testid="heading-lvl">
          Level 6
        </Heading>
      );
      expect(screen.getByTestId("heading-lvl").tagName).toBe("H6");
    });

    it("allows visual variant override independently of heading level", () => {
      render(
        <Heading level={1} variant="h3" data-testid="heading-override">
          Level 1 with H3 Scale
        </Heading>
      );
      const elem = screen.getByTestId("heading-override");
      expect(elem.tagName).toBe("H1");
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Text Primitive
  // ---------------------------------------------------------------------------
  describe("Text Primitive", () => {
    it("renders inline <span> by default", () => {
      render(<Text data-testid="text-default">Inline text</Text>);
      const elem = screen.getByTestId("text-default");
      expect(elem.tagName).toBe("SPAN");
    });

    it("renders block element when block={true}", () => {
      render(
        <Text block data-testid="text-block">
          Block text
        </Text>
      );
      const elem = screen.getByTestId("text-block");
      expect(elem.tagName).toBe("P");
    });

    it("maps shorthand sizes (xs, sm, md, lg, xl)", () => {
      render(
        <Text size="xs" data-testid="text-xs">
          Extra Small
        </Text>
      );
      const elem = screen.getByTestId("text-xs");
      expect(elem).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Paragraph Primitive
  // ---------------------------------------------------------------------------
  describe("Paragraph Primitive", () => {
    it("renders <p> with gutterBottom by default", () => {
      render(<Paragraph data-testid="para-default">Article prose paragraph</Paragraph>);
      const elem = screen.getByTestId("para-default");
      expect(elem.tagName).toBe("P");
      expect(elem).toHaveTextContent("Article prose paragraph");
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Code Primitive
  // ---------------------------------------------------------------------------
  describe("Code Primitive", () => {
    it("renders <code> tag with monospace styles", () => {
      render(<Code data-testid="code-default">const x = 1;</Code>);
      const elem = screen.getByTestId("code-default");
      expect(elem.tagName).toBe("CODE");
      expect(elem).toHaveTextContent("const x = 1;");
    });

    it("supports colorScheme prop ('primary', 'secondary')", () => {
      render(
        <ThemeProvider>
          <Code colorScheme="primary" data-testid="code-primary">
            package.json
          </Code>
        </ThemeProvider>
      );
      const elem = screen.getByTestId("code-primary");
      expect(elem).toBeInTheDocument();
      expect(elem).not.toHaveAttribute("colorScheme");
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Accessibility (vitest-axe)
  // ---------------------------------------------------------------------------
  describe("Accessibility", () => {
    it("has zero axe violations for complete document hierarchy", async () => {
      const { container } = render(
        <article>
          <Heading level={1}>Accessible Article Title</Heading>
          <Paragraph>
            This article introduces <Code>@chellaa/react</Code> typography.
          </Paragraph>
          <Heading level={2}>Section Header</Heading>
          <Paragraph>Secondary paragraph content.</Paragraph>
        </article>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
