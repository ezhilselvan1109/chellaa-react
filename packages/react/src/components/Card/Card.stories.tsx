import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardMedia,
  CardBody,
  CardFooter,
  CardActions,
} from "./index";
import { Button } from "../Button";
import { Badge } from "../Badge";
import { Avatar } from "../Avatar";
import { ThemeProvider } from "../../theme/ThemeProvider";

// ─── SVG Icon Primitives (Zero Emojis per Design System Standards) ─────────────

const MoreVerticalIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const BookmarkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ─── Storybook Meta ───────────────────────────────────────────────────────────

const meta: Meta<typeof Card> = {
  title: "Components/Data Display/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Material Design 3-aligned surface container with compound subcomponents (`Card.Header`, `Card.Title`, `Card.Description`, `Card.Media`, `Card.Body`, `Card.Footer`, `Card.Actions`). " +
          "Supports 3 visual variants (`elevated`, `outlined`, `filled`), numeric M3 elevation stops, dark mode surface elevation tinting, and an interactive hoverable lift mode.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "outlined", "filled", "outline"],
      description: "Visual surface style treatment.",
    },
    elevation: {
      control: { type: "range", min: 0, max: 24, step: 1 },
      description: "M3 elevation level (0–24). Applicable to elevated variant.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Spatial padding scale propagated to all child sections.",
    },
    hoverable: {
      control: "boolean",
      description: "Enables interactive lift and elevated shadow bloom on hover.",
    },
    isClickable: {
      control: "boolean",
      description: "Sets cursor to pointer and activates interactive hover state.",
    },
    square: {
      control: "boolean",
      description: "Removes border-radius for edge-to-edge container alignment.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    variant: "elevated",
    size: "md",
    hoverable: false,
    square: false,
  },
  render: (args) => (
    <Card style={{ maxWidth: 360 }} {...args}>
      <CardHeader
        avatar={<Avatar name="Chellaa Team" size="md" />}
        title="Design System Release"
        subheader="Published October 2026"
        action={
          <Button variant="ghost" size="sm" aria-label="More options">
            <MoreVerticalIcon />
          </Button>
        }
      />
      <CardBody>
        <p style={{ margin: 0, color: "var(--cl-color-fg-secondary)" }}>
          Chellaa React delivers zero-runtime CSS styling, strict WCAG 2.2 AA accessibility,
          and robust compound component composition for enterprise applications.
        </p>
      </CardBody>
      <CardFooter divider>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "12px", color: "var(--cl-color-fg-muted)" }}>
          <CalendarIcon />
          <span>v2.1.0 Stable</span>
        </div>
        <CardActions disableSpacing>
          <Button variant="solid" colorScheme="primary" size="sm">
            Explore Docs
          </Button>
        </CardActions>
      </CardFooter>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 960 }}>
      {(["elevated", "outlined", "filled"] as const).map((v) => (
        <Card key={v} variant={v}>
          <CardHeader
            title={`${v.toUpperCase()} Variant`}
            subheader="Surface style demonstration"
          />
          <CardBody>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--cl-color-fg-secondary)", lineHeight: 1.6 }}>
              {v === "elevated" && "Ambient multi-layer drop shadow with Material Design 3 elevation semantics."}
              {v === "outlined" && "1px hairline border on a crisp canvas surface with zero ambient shadow."}
              {v === "filled" && "Subtle tinted surface background for low-contrast section groupings."}
            </p>
          </CardBody>
          <CardFooter divider>
            <Badge colorScheme={v === "elevated" ? "primary" : v === "outlined" ? "info" : "neutral"} size="sm">
              {v}
            </Badge>
            <CardActions disableSpacing>
              <Button variant="ghost" size="sm">
                Action
              </Button>
            </CardActions>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 640 }}>
      {(["sm", "md", "lg"] as const).map((sz) => (
        <Card key={sz} size={sz} variant="outlined">
          <CardHeader
            avatar={<Avatar name={`Size ${sz.toUpperCase()}`} size={sz} />}
            title={`Size: ${sz.toUpperCase()}`}
            subheader={`${sz === "sm" ? "12px" : sz === "md" ? "16px" : "24px"} spatial padding scale`}
          />
          <CardBody>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--cl-color-fg-secondary)" }}>
              Inner subcomponents automatically inherit the spatial scale from parent CardContext.
            </p>
          </CardBody>
          <CardFooter divider>
            <span style={{ fontSize: "12px", color: "var(--cl-color-fg-muted)" }}>Spatial token</span>
            <CardActions disableSpacing>
              <Button variant="outline" size={sz}>
                Confirm
              </Button>
            </CardActions>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
};

export const MediaCard: Story = {
  render: () => (
    <Card variant="elevated" hoverable style={{ maxWidth: 360 }}>
      <div style={{ position: "relative" }}>
        <CardMedia
          image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=640&q=80"
          alt="Breathtaking alpine peak landscape"
          aspectRatio="16/9"
        />
        <div style={{ position: "absolute", top: 12, right: 12 }}>
          <Badge colorScheme="primary" variant="solid" size="sm">
            Featured Route
          </Badge>
        </div>
      </div>
      <CardHeader
        title="Alpine Vista Trail"
        subheader="High Alps · 14.2 km loop"
        action={
          <Button variant="ghost" size="sm" aria-label="Bookmark route">
            <BookmarkIcon />
          </Button>
        }
      />
      <CardBody>
        <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "var(--cl-color-fg-secondary)" }}>
          Experience panoramic glacial peaks, wildflower valleys, and serene alpine streams
          on this world-renowned high-altitude trail.
        </p>
      </CardBody>
      <CardFooter divider>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "13px", fontWeight: 500, color: "var(--cl-color-fg-primary)" }}>
          <span>$85 / permit</span>
        </div>
        <CardActions disableSpacing>
          <Button variant="solid" colorScheme="primary" size="sm">
            Book Permit
          </Button>
        </CardActions>
      </CardFooter>
    </Card>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 640 }}>
      <Card variant="elevated">
        <CardHeader title="Static Surface" subheader="hoverable=false" />
        <CardBody>
          <p style={{ margin: 0, fontSize: "14px", color: "var(--cl-color-fg-secondary)" }}>
            Standard stationary surface with baseline drop shadow and fixed elevation.
          </p>
        </CardBody>
        <CardFooter divider>
          <Badge colorScheme="neutral">Static</Badge>
        </CardFooter>
      </Card>

      <Card variant="elevated" hoverable>
        <CardHeader title="Hoverable Surface" subheader="hoverable=true" />
        <CardBody>
          <p style={{ margin: 0, fontSize: "14px", color: "var(--cl-color-fg-secondary)" }}>
            Hover to experience smooth 4px upward lift, expanded ambient bloom, and responsive micro-animation.
          </p>
        </CardBody>
        <CardFooter divider>
          <Badge colorScheme="success">Interactive Lift</Badge>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const MetricsCard: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, maxWidth: 840 }}>
      <Card variant="elevated" hoverable>
        <CardHeader
          title="Monthly Recurring Revenue"
          subheader="Real-time billing analytics"
          action={
            <Badge colorScheme="success" variant="subtle" size="sm">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <TrendingUpIcon />
                <span>+18.4%</span>
              </span>
            </Badge>
          }
        />
        <CardBody>
          <div style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--cl-color-fg-primary)", marginBottom: 4 }}>
            $142,850
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--cl-color-fg-muted)" }}>
            Compared to $120,600 last month
          </p>
        </CardBody>
        <CardFooter divider>
          <span style={{ fontSize: "12px", color: "var(--cl-color-fg-muted)" }}>Updated 3 mins ago</span>
          <Button variant="ghost" size="sm">
            View Report
          </Button>
        </CardFooter>
      </Card>

      <Card variant="elevated" hoverable>
        <CardHeader
          title="Active Subscribers"
          subheader="Total enterprise accounts"
          action={
            <Badge colorScheme="primary" variant="subtle" size="sm">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <TrendingUpIcon />
                <span>+9.2%</span>
              </span>
            </Badge>
          }
        />
        <CardBody>
          <div style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--cl-color-fg-primary)", marginBottom: 4 }}>
            24,190
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--cl-color-fg-muted)" }}>
            98.7% 30-day retention rate
          </p>
        </CardBody>
        <CardFooter divider>
          <span style={{ fontSize: "12px", color: "var(--cl-color-fg-muted)" }}>Updated 5 mins ago</span>
          <Button variant="ghost" size="sm">
            Analytics
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const CompoundComposition: Story = {
  render: () => (
    <Card variant="elevated" hoverable style={{ maxWidth: 380 }}>
      <CardMedia
        image="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=640&q=80"
        alt="Contemporary modern art installation"
        aspectRatio="16/9"
      />
      <CardHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <Badge colorScheme="secondary" size="sm">
              Exhibition
            </Badge>
            <span style={{ fontSize: "12px", color: "var(--cl-color-fg-muted)" }}>
              Oct 12 - Nov 30
            </span>
          </div>
          <CardTitle>Masterpiece Gallery</CardTitle>
          <CardDescription>Curated showcase by Contemporary Arts Council</CardDescription>
        </div>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "var(--cl-color-fg-secondary)" }}>
          Experience avant-garde sculptures, expressive modern canvases, and immersive sensory
          environments created by international modern artists.
        </p>
      </CardBody>
      <CardFooter divider>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Avatar name="Art Curator" size="sm" />
          <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--cl-color-fg-primary)" }}>
            Dr. Evelyn Vance
          </span>
        </div>
        <CardActions align="end" disableSpacing>
          <Button variant="ghost" size="sm" aria-label="Share exhibition">
            <ShareIcon />
          </Button>
          <Button variant="solid" colorScheme="primary" size="sm">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span>Reserve</span>
              <ArrowRightIcon />
            </span>
          </Button>
        </CardActions>
      </CardFooter>
    </Card>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <ThemeProvider defaultTheme="dark" enableSystem={false}>
      <div
        data-theme="dark"
        style={{
          background: "var(--cl-color-bg-canvas, #090d16)",
          padding: 32,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          borderRadius: 12,
        }}
      >
        <Card variant="elevated" hoverable>
          <CardHeader
            avatar={<Avatar name="Dark Surface" size="md" />}
            title="Elevated Dark Surface"
            subheader="M3 White overlay tint"
          />
          <CardBody>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--cl-color-fg-secondary)", lineHeight: 1.6 }}>
              Elevated surfaces in dark mode automatically receive subtle overlay tinting to convey physical height.
            </p>
          </CardBody>
          <CardFooter divider>
            <Badge colorScheme="primary">Elevated</Badge>
            <CardActions disableSpacing>
              <Button variant="solid" colorScheme="primary" size="sm">
                Action
              </Button>
            </CardActions>
          </CardFooter>
        </Card>

        <Card variant="outlined" hoverable>
          <CardHeader
            avatar={<Avatar name="Outlined Dark" size="md" />}
            title="Outlined Dark Surface"
            subheader="Hairline border"
          />
          <CardBody>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--cl-color-fg-secondary)", lineHeight: 1.6 }}>
              Outlined dark surfaces feature crisp boundary borders with high contrast against the dark canvas.
            </p>
          </CardBody>
          <CardFooter divider>
            <Badge colorScheme="info">Outlined</Badge>
            <CardActions disableSpacing>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </CardActions>
          </CardFooter>
        </Card>
      </div>
    </ThemeProvider>
  ),
};
