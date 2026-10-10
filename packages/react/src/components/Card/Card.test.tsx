import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { ThemeProvider } from "../../theme/ThemeProvider";
import {
  Card,
  CardHeader,
  CardMedia,
  CardBody,
  CardFooter,
  CardActions,
} from "./index";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

function renderWithTheme(ui: React.ReactElement) {
  return render(ui, { wrapper: Wrapper });
}

// ─── Card Root ────────────────────────────────────────────────────────────────

describe("Card", () => {
  it("renders with default props and static CSS classes", () => {
    const { container } = renderWithTheme(
      <Card data-testid="card">Content</Card>
    );
    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
    expect(card.tagName).toBe("DIV");
    expect(card).toHaveClass("cl-card");
    expect(card).toHaveClass("cl-card--md");
    expect(card).toHaveClass("cl-card--elevated");
  });

  it("applies dynamic sx styling with precedence", () => {
    renderWithTheme(
      <Card sx={{ padding: "30px", border: "2px solid red" }} data-testid="card-sx">
        Sx Content
      </Card>
    );
    const card = screen.getByTestId("card-sx");
    expect(card).toHaveClass("cl-card");
    expect(card).not.toHaveAttribute("sx");
  });

  it("renders children", () => {
    renderWithTheme(<Card>Hello Card</Card>);
    expect(screen.getByText("Hello Card")).toBeInTheDocument();
  });

  it("forwards ref to root DOM element", () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies className prop", () => {
    const { container } = renderWithTheme(
      <Card className="custom-card">Content</Card>
    );
    expect(container.firstChild).toHaveClass("custom-card");
  });

  it("renders as article via asChild", () => {
    renderWithTheme(
      <Card asChild>
        <article data-testid="article-card">Content</article>
      </Card>
    );
    const article = screen.getByTestId("article-card");
    expect(article.tagName).toBe("ARTICLE");
  });

  it("renders as section via component prop", () => {
    const { container } = renderWithTheme(
      <Card component="section" data-testid="section-card">
        Content
      </Card>
    );
    const el = screen.getByTestId("section-card");
    expect(el.tagName).toBe("SECTION");
  });

  it("spreads additional props to root element", () => {
    renderWithTheme(
      <Card data-testid="card" aria-label="Test card">
        Content
      </Card>
    );
    const card = screen.getByTestId("card");
    expect(card).toHaveAttribute("aria-label", "Test card");
  });

  describe("variants", () => {
    it.each(["elevated", "outlined", "filled"] as const)(
      'renders %s variant without error',
      (variant) => {
        const { container } = renderWithTheme(
          <Card variant={variant}>Content</Card>
        );
        expect(container.firstChild).toBeInTheDocument();
      }
    );
  });

  describe("elevation", () => {
    it("accepts elevation 0-24", () => {
      const { container } = renderWithTheme(
        <Card elevation={4}>Content</Card>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("hoverable", () => {
    it("renders with hoverable=true without error", () => {
      const { container } = renderWithTheme(
        <Card hoverable>Content</Card>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("square", () => {
    it("renders with square=true without error", () => {
      const { container } = renderWithTheme(
        <Card square>Content</Card>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("sizes", () => {
    it.each(["sm", "md", "lg"] as const)(
      'renders size %s without error',
      (size) => {
        const { container } = renderWithTheme(
          <Card size={size}>Content</Card>
        );
        expect(container.firstChild).toBeInTheDocument();
      }
    );
  });

  describe("accessibility (axe)", () => {
    it.each(["elevated", "outlined", "filled"] as const)(
      'has no axe violations for %s variant',
      async (variant) => {
        const { container } = renderWithTheme(
          <Card variant={variant}>
            <CardHeader title="Card Title" subheader="Subtitle" />
            <CardBody>Card body content</CardBody>
            <CardActions>
              <button type="button">Action</button>
            </CardActions>
          </Card>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    );
  });
});

// ─── CardHeader ───────────────────────────────────────────────────────────────

describe("CardHeader", () => {
  it("renders with title and subheader", () => {
    renderWithTheme(
      <ThemeProvider>
        <CardHeader title="My Title" subheader="My Subheader" />
      </ThemeProvider>
    );
    expect(screen.getByText("My Title")).toBeInTheDocument();
    expect(screen.getByText("My Subheader")).toBeInTheDocument();
  });

  it("renders avatar slot", () => {
    renderWithTheme(
      <CardHeader
        avatar={<span data-testid="avatar">AV</span>}
        title="Title"
      />
    );
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
  });

  it("renders action slot", () => {
    renderWithTheme(
      <CardHeader
        action={<button type="button" data-testid="action-btn">⋮</button>}
        title="Title"
      />
    );
    expect(screen.getByTestId("action-btn")).toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(<CardHeader ref={ref} title="Title" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("renders children alongside title", () => {
    renderWithTheme(
      <CardHeader title="Title">
        <span data-testid="custom-child">Custom</span>
      </CardHeader>
    );
    expect(screen.getByTestId("custom-child")).toBeInTheDocument();
  });

  it("passes titleTypographyProps to title span", () => {
    renderWithTheme(
      <CardHeader
        title="Title"
        titleTypographyProps={{ className: "title-class" }}
      />
    );
    const titleEl = screen.getByText("Title");
    expect(titleEl).toHaveClass("title-class");
  });

  it("has no axe violations", async () => {
    const { container } = renderWithTheme(
      <CardHeader
        avatar={<span>AV</span>}
        title="Title"
        subheader="Subtitle"
        action={<button type="button" aria-label="Options">⋮</button>}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

// ─── CardMedia ────────────────────────────────────────────────────────────────

describe("CardMedia", () => {
  it("renders without crashing", () => {
    const { container } = renderWithTheme(
      <CardMedia data-testid="media" image="/test.jpg" alt="Test image" />
    );
    expect(screen.getByTestId("media")).toBeInTheDocument();
  });

  it("applies role=img and aria-label when image prop used", () => {
    renderWithTheme(
      <CardMedia
        data-testid="media"
        image="/test.jpg"
        alt="Product photo"
      />
    );
    const el = screen.getByTestId("media");
    expect(el).toHaveAttribute("role", "img");
    expect(el).toHaveAttribute("aria-label", "Product photo");
  });

  it("does NOT apply role=img when children present", () => {
    renderWithTheme(
      <CardMedia data-testid="media" image="/test.jpg">
        <img src="/test.jpg" alt="Explicit img" />
      </CardMedia>
    );
    const el = screen.getByTestId("media");
    expect(el).not.toHaveAttribute("role", "img");
  });

  it("accepts custom aspectRatio", () => {
    const { container } = renderWithTheme(
      <CardMedia image="/test.jpg" aspectRatio="4/3" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(<CardMedia ref={ref} image="/test.jpg" alt="img" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations with image prop", async () => {
    const { container } = renderWithTheme(
      <CardMedia image="/test.jpg" alt="Descriptive alt text" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

// ─── CardBody ────────────────────────────────────────────────────────────────

describe("CardBody", () => {
  it("renders children", () => {
    renderWithTheme(<CardBody>Body content</CardBody>);
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(<CardBody ref={ref}>Content</CardBody>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations", async () => {
    const { container } = renderWithTheme(
      <CardBody>Accessible body text</CardBody>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

// ─── CardFooter ───────────────────────────────────────────────────────────────

describe("CardFooter", () => {
  it("renders children", () => {
    renderWithTheme(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("renders with divider=true without error", () => {
    const { container } = renderWithTheme(
      <CardFooter divider>Footer</CardFooter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(<CardFooter ref={ref}>Footer</CardFooter>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations", async () => {
    const { container } = renderWithTheme(
      <CardFooter>
        <time dateTime="2026-10-06">October 6, 2026</time>
      </CardFooter>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

// ─── CardActions ─────────────────────────────────────────────────────────────

describe("CardActions", () => {
  it("renders children", () => {
    renderWithTheme(
      <CardActions>
        <button type="button">Learn More</button>
      </CardActions>
    );
    expect(screen.getByRole("button", { name: "Learn More" })).toBeInTheDocument();
  });

  it("renders with disableSpacing=true without error", () => {
    const { container } = renderWithTheme(
      <CardActions disableSpacing>
        <button type="button">Action</button>
      </CardActions>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(
      <CardActions ref={ref}>
        <button type="button">Action</button>
      </CardActions>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations", async () => {
    const { container } = renderWithTheme(
      <CardActions>
        <button type="button">Share</button>
        <button type="button">Buy Now</button>
      </CardActions>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

// ─── Full Compound Composition ────────────────────────────────────────────────

describe("Card compound composition", () => {
  it("renders a full card without errors", () => {
    renderWithTheme(
      <Card data-testid="full-card" hoverable>
        <CardMedia image="/test.jpg" alt="Test" />
        <CardHeader
          avatar={<span>👤</span>}
          title="Card Title"
          subheader="Card Subheader"
          action={<button type="button" aria-label="Options">⋮</button>}
        />
        <CardBody>
          <p>Main body content of the card.</p>
        </CardBody>
        <CardFooter divider>
          <time dateTime="2026-10-06">October 6, 2026</time>
        </CardFooter>
        <CardActions>
          <button type="button">Share</button>
          <button type="button">Learn More</button>
        </CardActions>
      </Card>
    );

    expect(screen.getByTestId("full-card")).toBeInTheDocument();
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Subheader")).toBeInTheDocument();
    expect(screen.getByText("Main body content of the card.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Learn More" })).toBeInTheDocument();
  });

  it("has no axe violations in full composition", async () => {
    const { container } = renderWithTheme(
      <Card hoverable>
        <CardMedia image="/test.jpg" alt="Descriptive image alt" />
        <CardHeader
          title="Article Title"
          subheader="Author · October 2026"
          action={<button type="button" aria-label="More options">⋮</button>}
        />
        <CardBody>
          <p>Article body text with sufficient content.</p>
        </CardBody>
        <CardActions>
          <button type="button">Read More</button>
        </CardActions>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders as article via asChild with semantic structure", () => {
    renderWithTheme(
      <Card asChild variant="outlined">
        <article data-testid="article">
          <CardHeader title="Article" />
          <CardBody>Content</CardBody>
        </article>
      </Card>
    );
    const article = screen.getByTestId("article");
    expect(article.tagName).toBe("ARTICLE");
  });
});
