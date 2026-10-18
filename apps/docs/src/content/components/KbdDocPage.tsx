import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Kbd, Flex, Text, Box } from "@chellaa/react";

export const kbdToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "modifier-keys", title: "Modifier Keys" },
  { id: "variants-sizes", title: "Variants & Sizes" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const kbdPropsData: PropRow[] = [
  {
    name: "modifier",
    type: '"command" | "shift" | "ctrl" | "option" | "alt" | "enter" | "backspace" | "escape" | "tab"',
    default: "undefined",
    description: "Renders standardized platform shortcut symbol automatically (e.g. ⌘, ⇧, ⌃, ⌥, ↵).",
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
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to immediate child element using the Slot primitive.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description: "Additional CSS class names appended to the keycap element ('cl-kbd').",
  },
  {
    name: "children",
    type: "ReactNode",
    default: "undefined",
    description: "Key letter, number, or symbol to display inside the keycap.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "Semantic <kbd>",
    description:
      "Kbd renders the semantic HTML5 <kbd> tag representing user keyboard input, conveying keyboard shortcuts to screen readers.",
  },
  {
    attributeOrKey: "Aria Descriptions",
    description:
      "When using symbol modifiers (such as ⌘ or ⌥), ensure surrounding text or an aria-label provides a clear text explanation for screen readers.",
  },
];

const a11yKeyboard = [
  {
    attributeOrKey: "Presentational Indicator",
    description:
      "Keycap badges are inline text elements that do not receive tab focus.",
  },
];

export function KbdDocPage() {
  return (
    <ComponentDocLayout
      title="Kbd (Keyboard Shortcut)"
      description="Visual keycap chip indicating keyboard shortcuts and key combinations using semantic <kbd> markup."
      status="stable"
      version="v0.2.0"
      storybookId="components-data-display-kbd--docs"
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

      <AccessibilitySection
        componentName="Kbd"
        roles={a11yRoles}
        keyboardKeys={a11yKeyboard}
      />

      <ApiTable componentName="Kbd" props={kbdPropsData} />
    </ComponentDocLayout>
  );
}
