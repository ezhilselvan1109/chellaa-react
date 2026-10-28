import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Button,
  Box,
} from "@chellaa/react";

export const dropdownMenuToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "checkbox-and-radio", title: "Checkbox & Radio Items" },
  { id: "accessibility", title: "Accessibility (WAI-ARIA APG)" },
  { id: "api-reference", title: "API Reference" },
];

const dropdownMenuRootPropsData: PropRow[] = [
  {
    name: "open",
    type: "boolean",
    default: "undefined",
    description: "Controlled open state of the dropdown menu.",
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
    description: "Callback fired when the open state changes.",
  },
  {
    name: "modal",
    type: "boolean",
    default: "true",
    description: "Whether pointer events outside the menu are blocked.",
  },
];

const dropdownMenuContentPropsData: PropRow[] = [
  {
    name: "side",
    type: '"top" | "bottom" | "left" | "right"',
    default: '"bottom"',
    description: "Preferred edge of the trigger to position the menu content.",
  },
  {
    name: "align",
    type: '"start" | "center" | "end"',
    default: '"start"',
    description: "Alignment along the specified side axis.",
  },
  {
    name: "sideOffset",
    type: "number",
    default: "4",
    description: "Distance in pixels between trigger and menu content.",
  },
  {
    name: "collisionPadding",
    type: "number",
    default: "8",
    description: "Minimum distance from viewport boundary to avoid clipping.",
  },
];

export function DropdownMenuDocPage() {
  return (
    <ComponentDocLayout
      title="DropdownMenu"
      description="Accessible action and command menu displayed in a floating overlay anchored to a trigger button, adhering to the WAI-ARIA APG Menu Pattern."
      status="stable"
      version="0.2.3"
    >
      <section id="import">
        <h2>Import</h2>
        <CodeBlock
          code={`import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage">
        <h2>Basic Usage</h2>
        <p>
          DropdownMenu is an action menu composed of compound components: <code>Trigger</code>, <code>Content</code>, <code>Item</code>, <code>Separator</code>, and <code>Label</code>.
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="solid" colorScheme="primary">
                Actions ▾
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => alert("Profile clicked")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => alert("Billing clicked")}>
                Billing & Plans
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => alert("Logout clicked")}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Box>
        <CodeBlock
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="solid" colorScheme="primary">Actions ▾</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuItem onSelect={() => console.log("Profile")}>Profile</DropdownMenuItem>
    <DropdownMenuItem onSelect={() => console.log("Billing")}>Billing & Plans</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onSelect={() => console.log("Logout")}>Log Out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
          language="tsx"
        />
      </section>

      <section id="checkbox-and-radio">
        <h2>Checkbox & Radio Items</h2>
        <p>
          Support togglable options using <code>DropdownMenuCheckboxItem</code> and mutually exclusive choices with <code>DropdownMenuRadioGroup</code> and <code>DropdownMenuRadioItem</code>.
        </p>
        <CodeBlock
          code={`<DropdownMenuContent>
  <DropdownMenuLabel>Preferences</DropdownMenuLabel>
  <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
    Show Status Bar
  </DropdownMenuCheckboxItem>
  <DropdownMenuSeparator />
  <DropdownMenuLabel>View Mode</DropdownMenuLabel>
  <DropdownMenuRadioGroup value={view} onValueChange={setView}>
    <DropdownMenuRadioItem value="list">List View</DropdownMenuRadioItem>
    <DropdownMenuRadioItem value="grid">Grid View</DropdownMenuRadioItem>
  </DropdownMenuRadioGroup>
</DropdownMenuContent>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="DropdownMenu"
        roles={[
          { attributeOrKey: 'role="menu"', description: "Applied to the content popup container." },
          { attributeOrKey: 'aria-haspopup="menu"', description: "Applied to the trigger button indicating a menu popup." },
          { attributeOrKey: "aria-expanded", description: "Indicates whether the floating menu is currently expanded." },
          { attributeOrKey: "aria-checked", description: 'Reflects boolean checked state on role="menuitemcheckbox" and role="menuitemradio".' },
          { attributeOrKey: "aria-disabled", description: "Marks disabled menu items; disabled items are skipped during keyboard traversal." },
        ]}
        keyboardKeys={[
          { attributeOrKey: "Enter / Space / ArrowDown", description: "Opens the menu from the trigger and focuses the first item." },
          { attributeOrKey: "ArrowDown / ArrowUp", description: "Traverses enabled menu items with circular wrapping." },
          { attributeOrKey: "Home / End", description: "Moves focus to the first or last enabled menu item." },
          { attributeOrKey: "Typeahead alphanumeric keys", description: "Typing alphanumeric characters searches matching item labels." },
          { attributeOrKey: "Escape", description: "Closes the menu and restores focus to the trigger button." },
        ]}
      />

      <section id="api-reference">
        <h2>API Reference</h2>
        <ApiTable componentName="DropdownMenu (Root)" props={dropdownMenuRootPropsData} />
        <ApiTable componentName="DropdownMenuContent" props={dropdownMenuContentPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
