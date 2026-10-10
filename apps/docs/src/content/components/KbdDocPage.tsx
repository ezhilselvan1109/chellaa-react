import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Kbd, Flex, Text, Box } from "@chellaa/react";

export const kbdToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "modifier-keys", title: "Modifier Keys" },
  { id: "variants-sizes", title: "Variants & Sizes" },
  { id: "api-reference", title: "API Reference" },
];

const kbdPropsData: PropRow[] = [
  {
    name: "modifier",
    type: '"command" | "shift" | "ctrl" | "option" | "alt" | "enter" | "backspace" | "escape" | "tab"',
    default: "undefined",
    description: "Renders standardized platform shortcut symbol automatically.",
  },
  {
    name: "variant",
    type: '"subtle" | "outline" | "solid"',
    default: '"subtle"',
    description: "Visual appearance of keycap badge.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Keycap dimension and typography size scale.",
  },
];

export function KbdDocPage() {
  return (
    <ComponentDocLayout
      title="Kbd (Keyboard Shortcut)"
      description="Visual keycap chip indicating keyboard shortcuts and key combinations."
      status="stable"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Kbd, MODIFIER_SYMBOLS } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex center gap={2}>
            <Text size="sm">Press</Text>
            <Kbd modifier="command" />
            <Kbd>K</Kbd>
            <Text size="sm">to open command palette.</Text>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Flex center gap={2}>
  <Text>Press</Text>
  <Kbd modifier="command" />
  <Kbd>K</Kbd>
  <Text>to open command palette.</Text>
</Flex>`}
          language="tsx"
        />
      </section>

      <section id="modifier-keys" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Modifier Keys</span>
          <a href="#modifier-keys" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={2}>
            <Kbd modifier="command" />
            <Kbd modifier="shift" />
            <Kbd modifier="ctrl" />
            <Kbd modifier="option" />
            <Kbd modifier="enter" />
          </Flex>
        </Box>
        <CodeBlock
          code={`<Kbd modifier="command" />
<Kbd modifier="shift" />
<Kbd modifier="ctrl" />
<Kbd modifier="option" />
<Kbd modifier="enter" />`}
          language="tsx"
        />
      </section>

      <section id="variants-sizes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Variants & Sizes</span>
          <a href="#variants-sizes" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={3}>
            <Kbd size="sm" variant="subtle">Ctrl</Kbd>
            <Kbd size="md" variant="outline">Shift</Kbd>
            <Kbd size="lg" variant="solid">Alt</Kbd>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Kbd size="sm" variant="subtle">Ctrl</Kbd>
<Kbd size="md" variant="outline">Shift</Kbd>
<Kbd size="lg" variant="solid">Alt</Kbd>`}
          language="tsx"
        />
      </section>

      <ApiTable componentName="Kbd" props={kbdPropsData} />
    </ComponentDocLayout>
  );
}
