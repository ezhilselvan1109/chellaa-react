import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Heading,
  Text,
  Paragraph,
  Code,
  Stack,
  Box,
} from "@chellaa/react";

export const typographyToc = [
  { id: "import", title: "Import" },
  { id: "headings", title: "Heading Component" },
  { id: "paragraphs-text", title: "Text & Paragraph Components" },
  { id: "code", title: "Code Chip Primitive" },
  { id: "api-reference", title: "API Reference" },
];

const typographyPropsData: PropRow[] = [
  {
    name: "variant",
    type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "overline"',
    default: '"body1"',
    description: "Typographic scale style mapped to theme typography tokens.",
  },
  {
    name: "align",
    type: '"inherit" | "left" | "center" | "right" | "justify"',
    default: '"inherit"',
    description: "Text alignment property.",
  },
  {
    name: "gutterBottom",
    type: "boolean",
    default: "false",
    description: "Adds standard bottom margin for vertical rhythm.",
  },
  {
    name: "noWrap",
    type: "boolean",
    default: "false",
    description: "Truncates single line text with ellipsis.",
  },
];

export function TypographyDocPage() {
  return (
    <ComponentDocLayout
      title="Typography"
      description="Typographic family including Heading, Text, Paragraph, and inline Code primitives with fluid theme scale."
      status="stable"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Typography, Heading, Text, Paragraph, Code } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="headings" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Heading Component</span>
          <a href="#headings" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={1}>
            <Heading level={1}>Heading Level 1 (h1)</Heading>
            <Heading level={2}>Heading Level 2 (h2)</Heading>
            <Heading level={3}>Heading Level 3 (h3)</Heading>
            <Heading level={4}>Heading Level 4 (h4)</Heading>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Heading level={1}>Heading Level 1</Heading>
<Heading level={2}>Heading Level 2</Heading>
<Heading level={3}>Heading Level 3</Heading>`}
          language="tsx"
        />
      </section>

      <section id="paragraphs-text" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Text & Paragraph</span>
          <a href="#paragraphs-text" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Paragraph gutterBottom>
            This is a body paragraph designed for readability with comfortable line height and optimal reading width.
          </Paragraph>
          <Text size="sm" color="text.secondary">
            Secondary footnote or caption text.
          </Text>
        </Box>
        <CodeBlock
          code={`<Paragraph gutterBottom>Body text with comfortable line height.</Paragraph>
<Text size="sm" color="text.secondary">Secondary caption text.</Text>`}
          language="tsx"
        />
      </section>

      <section id="code" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Code Primitive</span>
          <a href="#code" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Paragraph>
            Install dependencies with <Code colorScheme="primary">pnpm add @chellaa/react</Code> in your terminal.
          </Paragraph>
        </Box>
        <CodeBlock
          code={`<Code colorScheme="primary">pnpm add @chellaa/react</Code>`}
          language="tsx"
        />
      </section>

      <ApiTable componentName="Typography" props={typographyPropsData} />
    </ComponentDocLayout>
  );
}
