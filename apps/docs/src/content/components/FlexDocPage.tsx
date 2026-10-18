import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Flex, Button, Text, Box } from "@chellaa/react";

export const flexToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "center-inline", title: "Center & Inline Shorthands" },
  { id: "responsive-direction", title: "Responsive Direction & Wrap" },
  { id: "dividers", title: "Embedded Dividers" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const flexPropsData: PropRow[] = [
  {
    name: "direction",
    type: '"row" | "column" | "row-reverse" | "column-reverse" | Array | Object',
    default: '"row"',
    description: "Flex direction layout flow supporting responsive breakpoint arrays/objects.",
  },
  {
    name: "gap",
    type: "number | string | Array | Object",
    default: "0",
    description: "Gap spacing between flex items mapped to theme spacing tokens.",
  },
  {
    name: "center",
    type: "boolean",
    default: "false",
    description: "Shorthand setting alignItems='center' and justifyContent='center'.",
  },
  {
    name: "inline",
    type: "boolean",
    default: "false",
    description: "Renders display='inline-flex' instead of block flex.",
  },
  {
    name: "align",
    type: "CSSProperties['alignItems'] | Array | Object",
    default: "undefined",
    description: "Alignment along the cross axis (alias of alignItems).",
  },
  {
    name: "justify",
    type: "CSSProperties['justifyContent'] | Array | Object",
    default: "undefined",
    description: "Distribution along the main axis (alias of justifyContent).",
  },
  {
    name: "wrap",
    type: "CSSProperties['flexWrap'] | Array | Object",
    default: "undefined",
    description: "Flex item wrapping behavior (alias of flexWrap).",
  },
  {
    name: "divider",
    type: "ReactNode",
    default: "undefined",
    description: "Custom element injected automatically between each child node.",
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
    description: "Semantic HTML element to render (e.g. 'nav', 'ul', 'section').",
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
    description: "Content nodes to be rendered within the flex container.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "Logical DOM Flow",
    description:
      "Flex maintains standard visual reading order aligned with DOM tab sequence. Avoid reversing visually without adjusting DOM order for screen reader accessibility.",
  },
  {
    attributeOrKey: "Semantic Groups",
    description:
      "When using Flex to display navigation items or toolbars, use component='nav' or role='toolbar' to communicate semantic landmarks.",
  },
];

const a11yKeyboard = [
  {
    attributeOrKey: "Presentational Wrapper",
    description:
      "Flex containers are structural layout wrappers that do not receive tab focus and do not disrupt internal child keyboard tab order.",
  },
];

export function FlexDocPage() {
  return (
    <ComponentDocLayout
      title="Flex"
      description="Ergonomic flexbox layout component with built-in centering, inline shorthands, and tokenized gap distribution."
      status="stable"
      version="v0.2.0"
      storybookId="components-layout-flex--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Flex } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={2}>
            <Button size="sm" variant="solid" colorScheme="primary">Save Changes</Button>
            <Button size="sm" variant="outline">Cancel</Button>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Flex gap={2}>
  <Button size="sm" colorScheme="primary">Save Changes</Button>
  <Button size="sm" variant="outline">Cancel</Button>
</Flex>`}
          language="tsx"
        />
      </section>

      <section id="center-inline" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Center & Inline Shorthands</span>
          <a href="#center-inline" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex center gap={2} sx={{ p: 4, bgcolor: "var(--docs-primary-bg)", borderRadius: 1 }}>
            <Text variant="subtitle1">Perfect Center Alignment (center=true)</Text>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Flex center gap={2} sx={{ p: 4 }}>
  <Text>Perfect Center Alignment</Text>
</Flex>`}
          language="tsx"
        />
      </section>

      <section id="responsive-direction" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Responsive Direction & Wrap</span>
          <a href="#responsive-direction" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex direction={{ xs: "column", sm: "row" }} gap={2} wrap="wrap">
            <Box sx={{ p: 2, flex: 1, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1 }}>
              Column on mobile, Row on tablet+
            </Box>
            <Box sx={{ p: 2, flex: 1, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1 }}>
              Responsive Layout Flow
            </Box>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Flex direction={{ xs: "column", sm: "row" }} gap={2} wrap="wrap">
  <Box sx={{ flex: 1 }}>Item 1</Box>
  <Box sx={{ flex: 1 }}>Item 2</Box>
</Flex>`}
          language="tsx"
        />
      </section>

      <section id="dividers" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Embedded Dividers</span>
          <a href="#dividers" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex
            inline
            gap={2}
            align="center"
            divider={<span style={{ color: "var(--docs-text-muted)" }}>•</span>}
          >
            <Text size="sm">Overview</Text>
            <Text size="sm">Specifications</Text>
            <Text size="sm">Releases</Text>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Flex inline gap={2} align="center" divider={<span>•</span>}>
  <Text>Overview</Text>
  <Text>Specifications</Text>
  <Text>Releases</Text>
</Flex>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Flex"
        roles={a11yRoles}
        keyboardKeys={a11yKeyboard}
      />

      <ApiTable componentName="Flex" props={flexPropsData} />
    </ComponentDocLayout>
  );
}
