import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  Button,
  Box,
} from "@chellaa/react";

export const drawerToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "directional-placements", title: "4 Directional Placements" },
  { id: "sizing-scale", title: "Sizing Scale" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const drawerRootPropsData: PropRow[] = [
  {
    name: "open",
    type: "boolean",
    default: "undefined",
    description: "Controlled open state of the drawer.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Initial open state in uncontrolled mode.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: "undefined",
    description: "Callback fired when open state changes.",
  },
  {
    name: "placement",
    type: '"left" | "right" | "top" | "bottom"',
    default: '"right"',
    description: "Edge from which the drawer slides into view.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl" | "full"',
    default: '"md"',
    description: "Spatial width (side drawers) or height (vertical drawers) scale.",
  },
  {
    name: "closeOnEsc",
    type: "boolean",
    default: "true",
    description: "Whether pressing Escape closes the drawer.",
  },
  {
    name: "closeOnOverlayClick",
    type: "boolean",
    default: "true",
    description: "Whether clicking the backdrop overlay closes the drawer.",
  },
];

export function DrawerDocPage() {
  return (
    <ComponentDocLayout
      title="Drawer / Sheet"
      description="Edge-anchored modal panel specializing the Dialog architecture with reference-counted scroll locking and directional slide animations."
      status="stable"
      version="0.2.3"
    >
      <section id="import">
        <h2>Import</h2>
        <CodeBlock
          code={`import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  Sheet, // Alias for Drawer
} from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage">
        <h2>Basic Usage</h2>
        <p>
          The Drawer component provides an edge-anchored sliding surface that retains full focus trap and backdrop dismissal capabilities.
        </p>
        <Box
          style={{
            padding: "32px",
            background: "var(--cl-color-bg-subtle, #f8fafc)",
            borderRadius: "8px",
            border: "1px solid var(--cl-color-border, #e2e8f0)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="solid" colorScheme="primary">
                Open Profile Drawer
              </Button>
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>User Settings</DrawerTitle>
                  <DrawerDescription>Manage account profile information</DrawerDescription>
                </DrawerHeader>
                <DrawerBody>
                  <p>Drawer content goes here with automatic scrollbars on long content.</p>
                </DrawerBody>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                  <Button variant="solid" colorScheme="primary">Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </DrawerPortal>
          </Drawer>
        </Box>
        <CodeBlock
          code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="solid" colorScheme="primary">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>User Settings</DrawerTitle>
        <DrawerDescription>Manage account profile information</DrawerDescription>
      </DrawerHeader>
      <DrawerBody>
        <p>Drawer content goes here.</p>
      </DrawerBody>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
        <Button variant="solid" colorScheme="primary">Save</Button>
      </DrawerFooter>
    </DrawerContent>
  </DrawerPortal>
</Drawer>`}
          language="tsx"
        />
      </section>

      <section id="directional-placements">
        <h2>4 Directional Placements</h2>
        <p>
          Configure the <code>placement</code> prop to slide from <code>left</code>, <code>right</code> (default), <code>top</code>, or <code>bottom</code>.
        </p>
        <CodeBlock
          code={`<Drawer placement="left">
  {/* Navigation sidebar */}
</Drawer>

<Drawer placement="bottom">
  {/* Mobile action sheet */}
</Drawer>`}
          language="tsx"
        />
      </section>

      <section id="sizing-scale">
        <h2>Sizing Scale</h2>
        <p>
          Six standardized sizing presets: <code>xs</code>, <code>sm</code>, <code>md</code> (default), <code>lg</code>, <code>xl</code>, and <code>full</code>.
        </p>
      </section>

      <AccessibilitySection
        componentName="Drawer"
        roles={[
          { attributeOrKey: 'role="dialog"', description: "Applied to the drawer content surface." },
          { attributeOrKey: 'aria-modal="true"', description: "Informs assistive tech that content outside the drawer is inert." },
          { attributeOrKey: "aria-labelledby", description: "Automatically linked to DrawerTitle ID." },
          { attributeOrKey: "aria-describedby", description: "Automatically linked to DrawerDescription ID." },
        ]}
        keyboardKeys={[
          { attributeOrKey: "Escape", description: "Dismisses drawer and restores focus to the trigger button." },
          { attributeOrKey: "Tab / Shift + Tab", description: "Traps focus inside the drawer without escaping to background content." },
        ]}
      />

      <section id="api-reference">
        <h2>API Reference</h2>
        <ApiTable componentName="Drawer (Root)" props={drawerRootPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
