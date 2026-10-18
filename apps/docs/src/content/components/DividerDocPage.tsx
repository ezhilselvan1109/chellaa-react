import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Divider, Flex, Text, Box, Stack } from "@chellaa/react";

export const dividerToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "vertical-divider", title: "Vertical Orientation" },
  { id: "labels", title: "Text Labels & Alignment" },
  { id: "variants", title: "Variants & Line Styles" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const dividerPropsData: PropRow[] = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Orientation direction of the separator rule.",
  },
  {
    name: "variant",
    type: '"fullWidth" | "inset" | "middle"',
    default: '"fullWidth"',
    description: "Spatial width treatment (full width, left inset, or centered middle inset).",
  },
  {
    name: "lineStyle",
    type: '"solid" | "dashed" | "dotted"',
    default: '"solid"',
    description: "Border stroke pattern.",
  },
  {
    name: "flexItem",
    type: "boolean",
    default: "false",
    description: "Enables vertical divider to stretch to flex container height without height 0 collapse.",
  },
  {
    name: "light",
    type: "boolean",
    default: "false",
    description: "Renders a more subtle, reduced-opacity separator stroke.",
  },
  {
    name: "textAlign",
    type: '"left" | "center" | "right"',
    default: '"center"',
    description: "Alignment of embedded child text label or badge.",
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
    default: '"hr" (or "div" for vertical/children)',
    description: "Underlying HTML element to render.",
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
  {
    name: "children",
    type: "ReactNode",
    default: "undefined",
    description: "Optional text label, chip, or badge to display centered or aligned within the divider.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "role='separator'",
    description:
      "Native <hr> elements communicate implicit separator semantics. When rendering vertical dividers or dividers with child text, Divider automatically applies role='separator'.",
  },
  {
    attributeOrKey: "aria-orientation",
    description:
      "Automatically set to 'vertical' when orientation='vertical' to communicate directional flow to screen readers.",
  },
];

const a11yKeyboard = [
  {
    attributeOrKey: "Non-interactive",
    description:
      "Dividers are purely structural and visual separators; they do not receive keyboard tab focus.",
  },
];

export function DividerDocPage() {
  return (
    <ComponentDocLayout
      title="Divider"
      description="Visual or semantic separator rule between content sections with support for text chips, vertical flex items, and dashed line styles."
      status="stable"
      version="v0.2.0"
      storybookId="components-layout-divider--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Divider } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Text size="sm">Top content section</Text>
          <Divider sx={{ my: 2 }} />
          <Text size="sm">Bottom content section</Text>
        </Box>
        <CodeBlock
          code={`<Text>Top content section</Text>
<Divider sx={{ my: 2 }} />
<Text>Bottom content section</Text>`}
          language="tsx"
        />
      </section>

      <section id="vertical-divider" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Vertical Orientation</span>
          <a href="#vertical-divider" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex center gap={2}>
            <Text size="sm">Option A</Text>
            <Divider orientation="vertical" flexItem />
            <Text size="sm">Option B</Text>
            <Divider orientation="vertical" flexItem />
            <Text size="sm">Option C</Text>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Flex center gap={2}>
  <Text>Option A</Text>
  <Divider orientation="vertical" flexItem />
  <Text>Option B</Text>
</Flex>`}
          language="tsx"
        />
      </section>

      <section id="labels" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Text Labels & Alignment</span>
          <a href="#labels" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={3}>
            <Divider textAlign="center">CENTER LABEL</Divider>
            <Divider textAlign="left">LEFT LABEL</Divider>
            <Divider textAlign="right">RIGHT LABEL</Divider>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Divider textAlign="center">CENTER LABEL</Divider>
<Divider textAlign="left">LEFT LABEL</Divider>
<Divider textAlign="right">RIGHT LABEL</Divider>`}
          language="tsx"
        />
      </section>

      <section id="variants" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Variants & Line Styles</span>
          <a href="#variants" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Divider lineStyle="dashed" />
            <Divider lineStyle="dotted" />
            <Divider variant="middle" />
          </Stack>
        </Box>
        <CodeBlock
          code={`<Divider lineStyle="dashed" />
<Divider lineStyle="dotted" />
<Divider variant="middle" />`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Divider"
        roles={a11yRoles}
        keyboardKeys={a11yKeyboard}
      />

      <ApiTable componentName="Divider" props={dividerPropsData} />
    </ComponentDocLayout>
  );
}
