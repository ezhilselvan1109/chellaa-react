import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Badge, Box, Flex, Text } from "@chellaa/react";

export const badgeToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "variants", title: "Aesthetic Variants" },
  { id: "colors", title: "Color Schemes" },
  { id: "sizes", title: "Sizes Scale" },
  { id: "features", title: "Dots & Pill Shapes" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const badgePropsData: PropRow[] = [
  {
    name: "variant",
    type: '"subtle" | "solid" | "outline"',
    default: '"subtle"',
    description: "Visual aesthetic treatment of the badge.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Spatial sizing scale controlling padding, font size, and dot dimensions.",
  },
  {
    name: "colorScheme",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"neutral"',
    description: "Semantic color intent mapped to design system tokens.",
  },
  {
    name: "isPill",
    type: "boolean",
    default: "false",
    description: "Renders badge with fully rounded pill corners (border-radius: full).",
  },
  {
    name: "hasDot",
    type: "boolean",
    default: "false",
    description: "Renders a small circular status indicator dot preceding children.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to immediate child element via Slot primitive.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop for custom theme overrides.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "role='status'",
    description:
      "When badges communicate dynamic status updates, add role='status' or aria-live='polite' to the container.",
  },
  {
    attributeOrKey: "aria-label",
    description:
      "When using dot-only badges or numeric indicators, supply an accessible label (e.g. aria-label='3 unread notifications').",
  },
];

const a11yKeyboard = [
  {
    attributeOrKey: "Non-interactive",
    description: "Badges are purely presentational by default and do not receive keyboard tab focus.",
  },
];

export function BadgeDocPage() {
  return (
    <ComponentDocLayout
      title="Badge"
      description="Compact visual indicator for labeling, categorization, status announcement, and numeric count tags."
      status="stable"
      version="v0.2.0"
      storybookId="components-data-display-badge--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Badge } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={2} sx={{ alignItems: "center" }}>
            <Text variant="body1">Production Release</Text>
            <Badge colorScheme="success">Verified</Badge>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Flex gap={2} sx={{ alignItems: "center" }}>
  <Text variant="body1">Production Release</Text>
  <Badge colorScheme="success">Verified</Badge>
</Flex>`}
          language="tsx"
        />
      </section>

      <section id="variants" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Aesthetic Variants</span>
          <a href="#variants" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={3} sx={{ flexWrap: "wrap", alignItems: "center" }}>
            <Badge variant="subtle" colorScheme="primary">Subtle Variant</Badge>
            <Badge variant="solid" colorScheme="primary">Solid Variant</Badge>
            <Badge variant="outline" colorScheme="primary">Outline Variant</Badge>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Badge variant="subtle" colorScheme="primary">Subtle Variant</Badge>
<Badge variant="solid" colorScheme="primary">Solid Variant</Badge>
<Badge variant="outline" colorScheme="primary">Outline Variant</Badge>`}
          language="tsx"
        />
      </section>

      <section id="colors" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Color Schemes</span>
          <a href="#colors" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={2} sx={{ flexWrap: "wrap", alignItems: "center" }}>
            <Badge colorScheme="neutral">Neutral</Badge>
            <Badge colorScheme="primary">Primary</Badge>
            <Badge colorScheme="secondary">Secondary</Badge>
            <Badge colorScheme="success">Success</Badge>
            <Badge colorScheme="warning">Warning</Badge>
            <Badge colorScheme="danger">Danger</Badge>
            <Badge colorScheme="info">Info</Badge>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Badge colorScheme="neutral">Neutral</Badge>
<Badge colorScheme="primary">Primary</Badge>
<Badge colorScheme="secondary">Secondary</Badge>
<Badge colorScheme="success">Success</Badge>
<Badge colorScheme="warning">Warning</Badge>
<Badge colorScheme="danger">Danger</Badge>
<Badge colorScheme="info">Info</Badge>`}
          language="tsx"
        />
      </section>

      <section id="sizes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Sizes Scale</span>
          <a href="#sizes" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={3} sx={{ alignItems: "center" }}>
            <Badge size="sm" colorScheme="primary">Small (sm)</Badge>
            <Badge size="md" colorScheme="primary">Medium (md)</Badge>
            <Badge size="lg" colorScheme="primary">Large (lg)</Badge>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Badge size="sm">Small (sm)</Badge>
<Badge size="md">Medium (md)</Badge>
<Badge size="lg">Large (lg)</Badge>`}
          language="tsx"
        />
      </section>

      <section id="features" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Dots & Pill Shapes</span>
          <a href="#features" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={3} sx={{ flexWrap: "wrap", alignItems: "center" }}>
            <Badge hasDot colorScheme="success">Online</Badge>
            <Badge hasDot colorScheme="warning">Away</Badge>
            <Badge hasDot colorScheme="danger">Offline</Badge>
            <Badge isPill colorScheme="primary">Pill Shape</Badge>
            <Badge isPill hasDot colorScheme="info">Pill with Dot</Badge>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Badge hasDot colorScheme="success">Online</Badge>
<Badge hasDot colorScheme="warning">Away</Badge>
<Badge hasDot colorScheme="danger">Offline</Badge>
<Badge isPill colorScheme="primary">Pill Shape</Badge>
<Badge isPill hasDot colorScheme="info">Pill with Dot</Badge>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Badge"
        roles={a11yRoles}
        keyboardKeys={a11yKeyboard}
      />

      <ApiTable componentName="Badge" props={badgePropsData} />
    </ComponentDocLayout>
  );
}
