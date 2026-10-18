import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverBody,
  PopoverFooter,
  PopoverClose,
  PopoverArrow,
  Button,
  Box,
  Text,
} from "@chellaa/react";

export const popoverToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "placement-options", title: "Positioning & Placements" },
  { id: "focus-and-dismissal", title: "Focus & Dismissal Control" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const popoverRootPropsData: PropRow[] = [
  {
    name: "isOpen",
    type: "boolean",
    default: "undefined",
    description: "Controlled open state of the popover card.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Initial open state when uncontrolled.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: "undefined",
    description: "Callback fired when the open state changes.",
  },
  {
    name: "placement",
    type: '"top" | "bottom" | "left" | "right" (plus -start / -end)',
    default: '"bottom"',
    description: "Preferred floating position relative to the trigger element.",
  },
  {
    name: "offset",
    type: "number",
    default: "8",
    description: "Distance in pixels between trigger element and popover card.",
  },
  {
    name: "trapFocus",
    type: "boolean",
    default: "true",
    description: "Constrains keyboard Tab navigation within the popover while open.",
  },
  {
    name: "closeOnBlur",
    type: "boolean",
    default: "true",
    description: "Closes the popover when clicking or focusing outside its boundary.",
  },
  {
    name: "closeOnEsc",
    type: "boolean",
    default: "true",
    description: "Dismisses the popover when the Escape key is pressed.",
  },
];

const popoverA11yRoles = [
  {
    attributeOrKey: "role='dialog'",
    description: "Exposed by PopoverContent with aria-modal='false' for non-modal floating overlays.",
  },
  {
    attributeOrKey: "aria-haspopup='dialog'",
    description: "Applied to PopoverTrigger button communicating popup capability to screen readers.",
  },
  {
    attributeOrKey: "aria-expanded='true | false'",
    description: "Reflects the current open state on the trigger button.",
  },
];

const popoverKeyboardKeys = [
  {
    attributeOrKey: "Enter / Space",
    description: "Toggles the popover open from the trigger button.",
  },
  {
    attributeOrKey: "Escape",
    description: "Closes the open popover and restores keyboard focus to the trigger.",
  },
  {
    attributeOrKey: "Tab / Shift+Tab",
    description: "Navigates between focusable controls inside the popover card.",
  },
];

export function PopoverDocPage() {
  return (
    <ComponentDocLayout
      title="Popover"
      description="Anchored floating disclosure card displaying rich contextual information, forms, or controls positioned relative to a target trigger."
      status="stable"
      version="v0.2.0"
      storybookId="components-overlays-popover--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverBody,
  PopoverFooter,
  PopoverClose,
  PopoverArrow,
} from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Wrap the trigger and floating card inside <code>Popover</code>. Clicking the trigger toggles the anchored card with automatic viewport collision detection.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Popover placement="bottom-start">
            <PopoverTrigger asChild>
              <Button variant="outline">View Release Info</Button>
            </PopoverTrigger>
            <PopoverContent style={{ width: "280px" }}>
              <PopoverArrow />
              <PopoverHeader>
                <PopoverTitle>Version v0.2.0</PopoverTitle>
                <PopoverClose />
              </PopoverHeader>
              <PopoverBody>
                <Text size="sm">
                  Includes precompiled LightningCSS distribution, zero-runtime static styles, and complete WAI-ARIA accessibility.
                </Text>
              </PopoverBody>
              <PopoverFooter>
                <Button size="sm" variant="solid" colorScheme="primary">View Changelog</Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Box>
        <CodeBlock
          code={`<Popover placement="bottom-start">
  <PopoverTrigger asChild>
    <Button variant="outline">View Release Info</Button>
  </PopoverTrigger>
  <PopoverContent style={{ width: "280px" }}>
    <PopoverArrow />
    <PopoverHeader>
      <PopoverTitle>Version v0.2.0</PopoverTitle>
      <PopoverClose />
    </PopoverHeader>
    <PopoverBody>
      <Text size="sm">Includes precompiled LightningCSS distribution...</Text>
    </PopoverBody>
    <PopoverFooter>
      <Button size="sm" variant="solid" colorScheme="primary">View Changelog</Button>
    </PopoverFooter>
  </PopoverContent>
</Popover>`}
          language="tsx"
        />
      </section>

      <section id="placement-options" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Positioning & Placements</span>
          <a href="#placement-options" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Configure floating placement with 12 directional anchors: <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code> (with <code>-start</code> and <code>-end</code> alignment).
        </p>
        <CodeBlock
          code={`<Popover placement="top">...</Popover>
<Popover placement="right-start">...</Popover>
<Popover placement="bottom-end">...</Popover>`}
          language="tsx"
        />
      </section>

      <section id="focus-and-dismissal" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Focus & Dismissal Control</span>
          <a href="#focus-and-dismissal" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Configure focus trapping (<code>trapFocus=&#123;true&#125;</code>), outside-click dismissal (<code>closeOnBlur=&#123;true&#125;</code>), and keyboard escape dismissal (<code>closeOnEsc=&#123;true&#125;</code>).
        </p>
        <CodeBlock
          code={`<Popover trapFocus closeOnBlur closeOnEsc>
  <PopoverTrigger asChild><Button>Filter Results</Button></PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Popover"
        roles={popoverA11yRoles}
        keyboardKeys={popoverKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Popover (PopoverRoot)" props={popoverRootPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
