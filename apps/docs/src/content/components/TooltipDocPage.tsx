import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Tooltip, Button, Box, Stack } from "@chellaa/react";

export const tooltipToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "placements", title: "Placements" },
  { id: "shortcuts", title: "Keyboard Shortcut Annotations" },
  { id: "delays", title: "Open & Close Delays" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const tooltipPropsData: PropRow[] = [
  {
    name: "content",
    type: "ReactNode",
    default: "Required",
    description: "The text content or React element displayed inside the floating tooltip bubble.",
  },
  {
    name: "children",
    type: "ReactElement",
    default: "Required",
    description: "Single interactive trigger element that activates the tooltip on hover or keyboard focus.",
  },
  {
    name: "placement",
    type: '"top" | "bottom" | "left" | "right" (plus -start / -end)',
    default: '"top"',
    description: "Preferred floating position relative to the target trigger.",
  },
  {
    name: "hasArrow",
    type: "boolean",
    default: "true",
    description: "Whether to render a decorative pointer arrow oriented toward the trigger.",
  },
  {
    name: "openDelay",
    type: "number",
    default: "200",
    description: "Delay in milliseconds before the tooltip appears on pointer hover.",
  },
  {
    name: "closeDelay",
    type: "number",
    default: "150",
    description: "Delay in milliseconds before the tooltip hides when pointer departs.",
  },
  {
    name: "shortcut",
    type: "string",
    default: "undefined",
    description: "Keyboard shortcut string rendered as an inline monospace chip.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Disables tooltip display completely.",
  },
  {
    name: "offset",
    type: "number",
    default: "8",
    description: "Distance in pixels between trigger and tooltip bubble.",
  },
];

const tooltipA11yRoles = [
  {
    attributeOrKey: "role='tooltip'",
    description: "Exposed by the floating tooltip bubble to inform screen readers of descriptive text.",
  },
  {
    attributeOrKey: "aria-describedby",
    description: "Trigger element is automatically linked to the tooltip bubble ID while active.",
  },
];

const tooltipKeyboardKeys = [
  {
    attributeOrKey: "Focus / Blur",
    description: "Focusing the child trigger element activates the tooltip; blurring dismisses it.",
  },
  {
    attributeOrKey: "Escape",
    description: "Dismisses an active tooltip immediately without moving keyboard focus.",
  },
];

export function TooltipDocPage() {
  return (
    <ComponentDocLayout
      title="Tooltip"
      description="Brief descriptive label displayed on hover or keyboard focus to identify or explain an icon or interactive element."
      status="stable"
      version="v0.2.0"
      storybookId="components-overlays-tooltip--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Tooltip } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Wrap any interactive button or focusable control in <code>Tooltip</code> with the <code>content</code> prop.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
            <Tooltip content="Save current document to cloud storage" placement="top">
              <Button variant="solid" colorScheme="primary">Save Changes</Button>
            </Tooltip>
            <Tooltip content="Permanently delete project" placement="bottom">
              <Button variant="outline" colorScheme="danger">Delete</Button>
            </Tooltip>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Tooltip content="Save current document to cloud storage" placement="top">
  <Button variant="solid" colorScheme="primary">Save Changes</Button>
</Tooltip>`}
          language="tsx"
        />
      </section>

      <section id="placements" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Placements</span>
          <a href="#placements" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Position tooltips on any side of the trigger using <code>placement</code> (<code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>).
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", alignItems: "center" }}>
            <Tooltip content="Top placement" placement="top">
              <Button variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="Bottom placement" placement="bottom">
              <Button variant="outline">Bottom</Button>
            </Tooltip>
            <Tooltip content="Left placement" placement="left">
              <Button variant="outline">Left</Button>
            </Tooltip>
            <Tooltip content="Right placement" placement="right">
              <Button variant="outline">Right</Button>
            </Tooltip>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Tooltip content="Top placement" placement="top"><Button>Top</Button></Tooltip>
<Tooltip content="Bottom placement" placement="bottom"><Button>Bottom</Button></Tooltip>`}
          language="tsx"
        />
      </section>

      <section id="shortcuts" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Keyboard Shortcut Annotations</span>
          <a href="#shortcuts" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Pass the <code>shortcut</code> prop to render an inline keyboard keycap indicator beside the description.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Tooltip content="Quick Search Command Palette" shortcut="Ctrl+K" placement="top">
            <Button variant="outline">Search Workspace</Button>
          </Tooltip>
        </Box>
        <CodeBlock
          code={`<Tooltip content="Quick Search Command Palette" shortcut="Ctrl+K" placement="top">
  <Button variant="outline">Search Workspace</Button>
</Tooltip>`}
          language="tsx"
        />
      </section>

      <section id="delays" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Open & Close Delays</span>
          <a href="#delays" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Tune pointer debounce timing using <code>openDelay</code> (default 200ms) and <code>closeDelay</code> (default 150ms).
        </p>
        <CodeBlock
          code={`<Tooltip content="Instant tooltip" openDelay={0} closeDelay={50}>
  <Button>Hover Me</Button>
</Tooltip>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Tooltip"
        roles={tooltipA11yRoles}
        keyboardKeys={tooltipKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Tooltip" props={tooltipPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
