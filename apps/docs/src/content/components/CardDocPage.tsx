import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardMedia,
  CardBody,
  CardFooter,
  CardActions,
  Button,
  Text,
  Box,
} from "@chellaa/react";

export const cardToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "compound-components", title: "Compound Hierarchy" },
  { id: "clickable-card", title: "Clickable & Interactive Lift" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
  { id: "subcomponents-api", title: "Subcomponents API" },
];

const cardPropsData: PropRow[] = [
  {
    name: "variant",
    type: '"elevated" | "outlined" | "filled"',
    default: '"elevated"',
    description: "Visual container surface treatment and border styling.",
  },
  {
    name: "elevation",
    type: "number (0..24)",
    default: "1",
    description: "M3 elevation shadow depth level (applies to elevated variant).",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Spatial padding scale propagated to all nested compound sections.",
  },
  {
    name: "hoverable",
    type: "boolean",
    default: "false",
    description: "When true, lifts the card surface and blooms shadow elevation on hover.",
  },
  {
    name: "isClickable",
    type: "boolean",
    default: "false",
    description: "Makes the card interactive with pointer cursor, focus ring, and keyboard triggers.",
  },
  {
    name: "square",
    type: "boolean",
    default: "false",
    description: "Removes default card border-radius for flush edge alignment.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to immediate child element using the Slot primitive.",
  },
  {
    name: "component",
    type: "ElementType",
    default: '"div"',
    description: "Semantic HTML element to render (e.g. 'article', 'section', 'div').",
  },
  {
    name: "as",
    type: "ElementType",
    default: "undefined",
    description: "Alias for the component prop for polymorphic element selection.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop for custom theme overrides.",
  },
];

const cardHeaderPropsData: PropRow[] = [
  {
    name: "title",
    type: "ReactNode",
    default: "undefined",
    description: "Primary header title text or custom node.",
  },
  {
    name: "subheader",
    type: "ReactNode",
    default: "undefined",
    description: "Secondary subheader or timestamp string.",
  },
  {
    name: "avatar",
    type: "ReactNode",
    default: "undefined",
    description: "Leading avatar, badge, or icon node.",
  },
  {
    name: "action",
    type: "ReactNode",
    default: "undefined",
    description: "Trailing action trigger (e.g. icon button, menu trigger).",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates header wrapper rendering to child element via Slot.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop.",
  },
];

const cardMediaPropsData: PropRow[] = [
  {
    name: "image",
    type: "string",
    default: "undefined",
    description: "Source URL for background banner image.",
  },
  {
    name: "alt",
    type: "string",
    default: "undefined",
    description: "Accessible description applied as aria-label for image media.",
  },
  {
    name: "aspectRatio",
    type: "string",
    default: '"16/9"',
    description: "CSS aspect-ratio constraint (e.g. '16/9', '4/3', '1/1').",
  },
  {
    name: "component",
    type: "ElementType",
    default: '"div"',
    description: "Underlying HTML element to render (e.g. 'img', 'video', 'div').",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop.",
  },
];

const cardFooterPropsData: PropRow[] = [
  {
    name: "divider",
    type: "boolean",
    default: "false",
    description: "Renders a 1px top border separating body content from the footer.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop.",
  },
];

const cardActionsPropsData: PropRow[] = [
  {
    name: "align",
    type: '"start" | "center" | "end" | "between"',
    default: '"start"',
    description: "Horizontal justification of action buttons.",
  },
  {
    name: "disableSpacing",
    type: "boolean",
    default: "false",
    description: "Removes default negative horizontal margins for flush icon alignment.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "Semantic Article",
    description:
      "When Card represents a self-contained content piece (e.g. blog post, product preview), use component='article' to provide appropriate document structure.",
  },
  {
    attributeOrKey: "Interactive Card (isClickable)",
    description:
      "Setting isClickable={true} assigns tabIndex={0} and role='button' (or native <a> with asChild), enabling keyboard Enter and Space activation.",
  },
  {
    attributeOrKey: "Media Alt Text",
    description:
      "Always supply the alt prop on CardMedia or wrap an <img> with descriptive alternative text for screen readers.",
  },
];

const a11yKeyboard = [
  {
    attributeOrKey: "Tab Focus",
    description:
      "Clickable cards receive high-contrast focus rings and participate in standard keyboard tab order.",
  },
  {
    attributeOrKey: "Enter / Space",
    description:
      "Triggers the card's onClick handler when isClickable is true.",
  },
];

export function CardDocPage() {
  return (
    <ComponentDocLayout
      title="Card"
      description="Material Design 3-aligned compound surface container for structured content presentation with header, media, body, footer, and actions."
      status="stable"
      version="v0.2.0"
      storybookId="components-data-display-card--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardMedia,
  CardBody,
  CardFooter,
  CardActions,
} from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Card variant="elevated" elevation={2} sx={{ maxWidth: 400 }}>
            <CardHeader title="Project Settings" subheader="Updated 2 hours ago" />
            <CardBody>
              <Text size="sm">Manage repository branch protection rules and CI/CD triggers.</Text>
            </CardBody>
            <CardActions>
              <Button size="sm" variant="solid" colorScheme="primary">Configure</Button>
            </CardActions>
          </Card>
        </Box>
        <CodeBlock
          code={`<Card variant="elevated" elevation={2} sx={{ maxWidth: 400 }}>
  <CardHeader title="Project Settings" subheader="Updated 2 hours ago" />
  <CardBody>
    <Text size="sm">Manage repository branch protection rules.</Text>
  </CardBody>
  <CardActions>
    <Button size="sm" colorScheme="primary">Configure</Button>
  </CardActions>
</Card>`}
          language="tsx"
        />
      </section>

      <section id="compound-components" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Compound Hierarchy</span>
          <a href="#compound-components" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Card variant="elevated" elevation={2} hoverable sx={{ maxWidth: 400 }}>
            <CardMedia
              image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60"
              alt="Code Banner"
              aspectRatio="16/9"
            />
            <CardHeader
              title="Hybrid Styling Architecture"
              subheader="Static CSS + Dynamic Emotion"
            />
            <CardBody>
              <CardTitle>Zero-Runtime CSS Layers</CardTitle>
              <CardDescription>
                Collocated static CSS under @layer cl-components with 0ms runtime cost and full token awareness.
              </CardDescription>
            </CardBody>
            <CardFooter divider>
              <Text size="xs" color="text.secondary">Version 0.2.0 • 34 Public Component Families</Text>
            </CardFooter>
            <CardActions align="between">
              <Button size="sm" variant="outline">Learn More</Button>
              <Button size="sm" colorScheme="primary">Read Guide</Button>
            </CardActions>
          </Card>
        </Box>
        <CodeBlock
          code={`<Card variant="elevated" elevation={2} hoverable sx={{ maxWidth: 400 }}>
  <CardMedia
    image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600"
    alt="Code Banner"
    aspectRatio="16/9"
  />
  <CardHeader
    title="Hybrid Styling Architecture"
    subheader="Static CSS + Dynamic Emotion"
  />
  <CardBody>
    <CardTitle>Zero-Runtime CSS Layers</CardTitle>
    <CardDescription>
      Collocated static CSS under @layer cl-components with 0ms runtime cost.
    </CardDescription>
  </CardBody>
  <CardFooter divider>
    <Text size="xs">Version 0.2.0</Text>
  </CardFooter>
  <CardActions align="between">
    <Button size="sm" variant="outline">Learn More</Button>
    <Button size="sm" colorScheme="primary">Read Guide</Button>
  </CardActions>
</Card>`}
          language="tsx"
        />
      </section>

      <section id="clickable-card" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Clickable & Interactive Lift</span>
          <a href="#clickable-card" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Card
            variant="outlined"
            isClickable
            hoverable
            sx={{ maxWidth: 400, p: 2 }}
            onClick={() => alert("Card clicked!")}
          >
            <CardBody>
              <CardTitle>Interactive Clickable Card</CardTitle>
              <CardDescription>
                Click or press Enter/Space on this card to trigger an action with accessible keyboard focus.
              </CardDescription>
            </CardBody>
          </Card>
        </Box>
        <CodeBlock
          code={`<Card
  variant="outlined"
  isClickable
  hoverable
  onClick={() => handleSelect()}
>
  <CardBody>
    <CardTitle>Interactive Clickable Card</CardTitle>
    <CardDescription>
      Click or press Enter/Space on this card.
    </CardDescription>
  </CardBody>
</Card>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Card"
        roles={a11yRoles}
        keyboardKeys={a11yKeyboard}
      />

      <section id="api-reference">
        <h2 className="docs-heading-2">
          <span>API Reference — Card (Root)</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Card" props={cardPropsData} />
      </section>

      <section id="subcomponents-api" style={{ marginTop: "40px" }}>
        <h2 className="docs-heading-2">
          <span>Subcomponents API</span>
          <a href="#subcomponents-api" className="docs-heading-anchor">#</a>
        </h2>
        <h3 className="docs-heading-3" style={{ marginTop: "24px" }}>CardHeader</h3>
        <ApiTable componentName="CardHeader" props={cardHeaderPropsData} />

        <h3 className="docs-heading-3" style={{ marginTop: "32px" }}>CardMedia</h3>
        <ApiTable componentName="CardMedia" props={cardMediaPropsData} />

        <h3 className="docs-heading-3" style={{ marginTop: "32px" }}>CardFooter</h3>
        <ApiTable componentName="CardFooter" props={cardFooterPropsData} />

        <h3 className="docs-heading-3" style={{ marginTop: "32px" }}>CardActions</h3>
        <ApiTable componentName="CardActions" props={cardActionsPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
