import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardBody,
  CardFooter,
  CardActions,
} from "./index";
import { ThemeProvider } from "../../theme/ThemeProvider";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Card> = {
  title: "Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Material Design 3-aligned surface container with compound sub-components. " +
          "Supports elevated (with M3 dark-mode tinting), outlined, and filled variants, " +
          "numeric elevation, a hoverable lift mode, and media/header/body/footer/actions slots.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "outlined", "filled"],
      description: "Visual surface treatment",
    },
    elevation: {
      control: { type: "range", min: 0, max: 24, step: 1 },
      description: "M3 elevation level (0-24). Only for elevated variant.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Spatial padding scale",
    },
    hoverable: {
      control: "boolean",
      description: "Raise elevation + lift on hover",
    },
    square: {
      control: "boolean",
      description: "Remove border-radius",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ─── Shared content helper ────────────────────────────────────────────────────

function SampleCard(props: React.ComponentProps<typeof Card>) {
  return (
    <ThemeProvider>
      <Card style={{ width: 320 }} {...props}>
        <CardHeader
          avatar={
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              A
            </div>
          }
          title="Chellaa UI Component"
          subheader="October 6, 2026"
          action={
            <button
              type="button"
              aria-label="More options"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 20,
                color: "inherit",
                padding: "4px 8px",
                borderRadius: 4,
              }}
            >
              ⋮
            </button>
          }
        />
        <CardBody>
          <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>
            A well-structured card component with M3 elevation, compound sub-zones,
            and accessibility-first design. Perfect for dashboards, galleries, and
            data displays.
          </p>
        </CardBody>
        <CardActions>
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              color: "#6366f1",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 600,
              padding: "6px 12px",
              borderRadius: 4,
            }}
          >
            Share
          </button>
          <button
            type="button"
            style={{
              background: "#6366f1",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 600,
              padding: "6px 12px",
              borderRadius: 4,
            }}
          >
            Learn More
          </button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => <SampleCard />,
  parameters: {
    docs: {
      description: { story: "Default elevated card with header, body, and actions." },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {(["elevated", "outlined", "filled"] as const).map((variant) => (
          <div key={variant}>
            <p style={{ marginBottom: 8, fontWeight: 600, textTransform: "capitalize" }}>
              {variant}
            </p>
            <Card variant={variant} style={{ width: 280 }}>
              <CardHeader title="Card Title" subheader="Subheader text" />
              <CardBody>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>
                  Card body content for the {variant} variant.
                </p>
              </CardBody>
              <CardActions>
                <button type="button" style={{ cursor: "pointer" }}>Action</button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of all three visual variants.",
      },
    },
  },
};

export const WithMedia: Story = {
  render: () => (
    <ThemeProvider>
      <Card style={{ width: 320 }}>
        <CardMedia
          image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&q=80"
          alt="Mountain landscape"
          aspectRatio="16/9"
        />
        <CardHeader title="Mountain Escape" subheader="Adventure · 4 min read" />
        <CardBody>
          <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>
            Discover breathtaking mountain vistas and serene alpine meadows in this
            curated travel guide.
          </p>
        </CardBody>
        <CardActions>
          <button type="button" style={{ cursor: "pointer", marginRight: "auto" }}>
            ♡ Save
          </button>
          <button type="button" style={{ cursor: "pointer" }}>Read More →</button>
        </CardActions>
      </Card>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card with a 16/9 aspect-ratio media zone at the top.",
      },
    },
  },
};

export const Hoverable: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: "flex", gap: 24 }}>
        <div>
          <p style={{ marginBottom: 8, fontWeight: 600 }}>Static (default)</p>
          <Card style={{ width: 260 }}>
            <CardHeader title="Static Card" subheader="No hover effect" />
            <CardBody>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>
                This card has no hover animation.
              </p>
            </CardBody>
          </Card>
        </div>
        <div>
          <p style={{ marginBottom: 8, fontWeight: 600 }}>Hoverable</p>
          <Card hoverable style={{ width: 260 }}>
            <CardHeader title="Hoverable Card" subheader="Hover to lift" />
            <CardBody>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>
                Hover over this card to see the elevation lift animation.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of static vs hoverable cards. `hoverable=true` raises the elevation " +
          "by 2 stops and lifts 2px with a smooth 200ms transition.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size}>
            <p style={{ marginBottom: 8, fontWeight: 600, textTransform: "uppercase", fontSize: "0.75rem" }}>
              Size: {size}
            </p>
            <Card size={size} style={{ width: 240 }}>
              <CardHeader title="Card Title" subheader="Subtitle" />
              <CardBody>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>Body content.</p>
              </CardBody>
              <CardActions>
                <button type="button" style={{ cursor: "pointer" }}>OK</button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Padding scale comparison across sm (12px), md (16px), and lg (24px) sizes.",
      },
    },
  },
};

export const WithFooterDivider: Story = {
  render: () => (
    <ThemeProvider>
      <Card style={{ width: 320 }}>
        <CardHeader title="Article Title" subheader="Author · 5 min read" />
        <CardBody>
          <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>
            Article body content with a footer divider separating metadata.
          </p>
        </CardBody>
        <CardFooter divider>
          <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>
            🏷 Design · Component Systems
          </span>
          <span style={{ marginLeft: "auto", fontSize: "0.8rem", color: "#6b7280" }}>
            Oct 6, 2026
          </span>
        </CardFooter>
      </Card>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card with a CardFooter using `divider=true` for a 1px separator.",
      },
    },
  },
};

export const ElevationScale: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start", padding: 24, background: "#f8fafc" }}>
        {[0, 1, 2, 4, 8, 16, 24].map((elev) => (
          <Card
            key={elev}
            elevation={elev}
            style={{ width: 140, textAlign: "center" }}
          >
            <CardBody>
              <p style={{ margin: 0, fontWeight: 700 }}>elevation={elev}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates the 24-level M3 elevation shadow scale on card surfaces.",
      },
    },
  },
};

export const DarkTheme: Story = {
  render: () => (
    <ThemeProvider defaultMode="dark">
      <div
        style={{
          background: "#121212",
          padding: 32,
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          borderRadius: 8,
        }}
      >
        {[1, 4, 8].map((elev) => (
          <Card key={elev} elevation={elev} style={{ width: 220 }}>
            <CardHeader
              title={`Elevation ${elev}`}
              subheader="Dark M3 tinting"
            />
            <CardBody>
              <p style={{ margin: 0, fontSize: "0.85rem" }}>
                Surface brightens with elevation via M3 white overlay tinting.
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </ThemeProvider>
  ),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "Dark mode M3 elevation tinting: higher elevation = brighter surface " +
          "via a white overlay at increasing alpha. Matches the Paper component's algorithm.",
      },
    },
  },
};

export const AsArticle: Story = {
  render: () => (
    <ThemeProvider>
      <Card asChild variant="outlined" style={{ width: 320 }}>
        <article>
          <CardHeader
            title="Semantic Article Card"
            subheader="asChild delegates to <article>"
          />
          <CardBody>
            <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>
              This card renders as a native{" "}
              <code>{"<article>"}</code> element via the{" "}
              <code>asChild</code> prop, enabling proper HTML5 semantics
              for standalone content units.
            </p>
          </CardBody>
          <CardActions>
            <a
              href="#"
              style={{
                color: "#6366f1",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Read full article →
            </a>
          </CardActions>
        </article>
      </Card>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates `asChild` delegation to `<article>`. The card's surface styles " +
          "are forwarded to the child element, giving semantic HTML without extra DOM nodes.",
      },
    },
  },
};
