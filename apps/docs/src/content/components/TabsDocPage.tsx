import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsIndicator,
  Box,
  Stack,
  Text,
} from "@chellaa/react";

export const tabsToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "variants", title: "Visual Variants" },
  { id: "vertical-orientation", title: "Vertical Orientation" },
  { id: "lazy-loading", title: "Lazy Unmounted Panels" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const tabsRootPropsData: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    description: "Controlled active tab value.",
  },
  {
    name: "defaultValue",
    type: "string",
    default: "First tab value",
    description: "Initial active tab value when uncontrolled.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    default: "undefined",
    description: "Callback fired when the active tab changes.",
  },
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Layout direction of the tabs list and keyboard arrow axis.",
  },
  {
    name: "variant",
    type: '"line" | "enclosed" | "pill" | "unstyled"',
    default: '"line"',
    description: "Visual aesthetic treatment for active tab indicators and borders.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Spatial sizing scale controlling tab padding, height, and typography.",
  },
  {
    name: "activationMode",
    type: '"automatic" | "manual"',
    default: '"automatic"',
    description: "Automatic switches tab on arrow focus; manual requires Enter or Space to activate.",
  },
  {
    name: "isLazy",
    type: "boolean",
    default: "false",
    description: "When true, inactive tab panels are unmounted from the DOM rather than visually hidden.",
  },
];

const tabsTriggerPropsData: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "Required",
    description: "Unique string value matching a corresponding TabsContent panel.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction with this specific tab trigger.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to immediate child element using Slot.",
  },
];

const tabsA11yRoles = [
  {
    attributeOrKey: "role='tablist'",
    description: "Applied to TabsList with aria-orientation matching the layout direction.",
  },
  {
    attributeOrKey: "role='tab'",
    description: "Applied to TabsTrigger with aria-selected='true|false' and aria-controls.",
  },
  {
    attributeOrKey: "role='tabpanel'",
    description: "Applied to TabsContent with aria-labelledby pointing to the corresponding tab trigger.",
  },
];

const tabsKeyboardKeys = [
  {
    attributeOrKey: "Arrow Left / Arrow Right",
    description: "Navigates between horizontal tabs with automatic focus synchronization.",
  },
  {
    attributeOrKey: "Arrow Up / Arrow Down",
    description: "Navigates between vertical tabs with automatic focus synchronization.",
  },
  {
    attributeOrKey: "Home / End",
    description: "Jumps focus directly to the first or last available tab in the list.",
  },
  {
    attributeOrKey: "Space / Enter",
    description: "Activates the focused tab when activationMode is set to 'manual'.",
  },
];

export function TabsDocPage() {
  return (
    <ComponentDocLayout
      title="Tabs"
      description="Organized views of content where only one panel is visible at a time, featuring fluid animated indicators, vertical layouts, and WAI-ARIA tablist patterns."
      status="stable"
      version="v0.2.0"
      storybookId="components-navigation-tabs--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsIndicator,
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
          Compose <code>Tabs</code> with <code>TabsList</code> and <code>TabsContent</code> panels. The active indicator highlights the selected tab.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Tabs defaultValue="account">
            <TabsList aria-label="Account Settings Tabs">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsIndicator />
            </TabsList>
            <TabsContent value="account">
              <Box sx={{ pt: 3 }}>
                <Text>Manage personal account credentials and profile preferences.</Text>
              </Box>
            </TabsContent>
            <TabsContent value="password">
              <Box sx={{ pt: 3 }}>
                <Text>Update your login password and manage two-factor authentication.</Text>
              </Box>
            </TabsContent>
            <TabsContent value="billing">
              <Box sx={{ pt: 3 }}>
                <Text>View past transaction invoices and active subscription tiers.</Text>
              </Box>
            </TabsContent>
          </Tabs>
        </Box>
        <CodeBlock
          code={`<Tabs defaultValue="account">
  <TabsList aria-label="Account Settings Tabs">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
    <TabsIndicator />
  </TabsList>
  <TabsContent value="account">Manage account credentials...</TabsContent>
  <TabsContent value="password">Update password...</TabsContent>
  <TabsContent value="billing">View past invoices...</TabsContent>
</Tabs>`}
          language="tsx"
        />
      </section>

      <section id="variants" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Visual Variants</span>
          <a href="#variants" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Choose between <code>line</code> (underlined indicator), <code>enclosed</code> (folder-style borders), or <code>pill</code> (segmented buttons).
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={4}>
            <Box>
              <Text size="sm" color="text.secondary" block sx={{ mb: 1 }}>Pill Variant</Text>
              <Tabs variant="pill" defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Items</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
              </Tabs>
            </Box>
            <Box>
              <Text size="sm" color="text.secondary" block sx={{ mb: 1 }}>Enclosed Variant</Text>
              <Tabs variant="enclosed" defaultValue="general">
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="team">Team Members</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                </TabsList>
              </Tabs>
            </Box>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Tabs variant="pill" defaultValue="all">...</Tabs>
<Tabs variant="enclosed" defaultValue="general">...</Tabs>`}
          language="tsx"
        />
      </section>

      <section id="vertical-orientation" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Vertical Orientation</span>
          <a href="#vertical-orientation" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Set <code>orientation="vertical"</code> for sidebar layouts. Arrow key navigation switches from horizontal to vertical axes automatically.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Tabs orientation="vertical" defaultValue="general">
            <Stack direction="row" spacing={3}>
              <TabsList style={{ minWidth: "160px" }}>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              <Box sx={{ flex: 1 }}>
                <TabsContent value="general">
                  <Text>General profile and system settings.</Text>
                </TabsContent>
                <TabsContent value="security">
                  <Text>Security protocols and active API keys.</Text>
                </TabsContent>
                <TabsContent value="advanced">
                  <Text>Advanced developer webhooks and telemetry options.</Text>
                </TabsContent>
              </Box>
            </Stack>
          </Tabs>
        </Box>
        <CodeBlock
          code={`<Tabs orientation="vertical" defaultValue="general">
  <Stack direction="row" spacing={3}>
    <TabsList>
      <TabsTrigger value="general">General</TabsTrigger>
      <TabsTrigger value="security">Security</TabsTrigger>
    </TabsList>
    <TabsContent value="general">General settings...</TabsContent>
  </Stack>
</Tabs>`}
          language="tsx"
        />
      </section>

      <section id="lazy-loading" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Lazy Unmounted Panels</span>
          <a href="#lazy-loading" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Pass <code>isLazy=&#123;true&#125;</code> to unmount hidden tab panels from the DOM until their trigger is selected, optimizing rendering performance.
        </p>
        <CodeBlock
          code={`<Tabs isLazy defaultValue="tab-1">
  <TabsList>
    <TabsTrigger value="tab-1">Dashboard</TabsTrigger>
    <TabsTrigger value="tab-2">Analytics Chart (Heavy Component)</TabsTrigger>
  </TabsList>
  <TabsContent value="tab-1"><DashboardSummary /></TabsContent>
  <TabsContent value="tab-2"><HeavyAnalyticsChart /></TabsContent>
</Tabs>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Tabs"
        roles={tabsA11yRoles}
        keyboardKeys={tabsKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Tabs (TabsRoot)" props={tabsRootPropsData} />
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="TabsTrigger" props={tabsTriggerPropsData} />
        </div>
      </section>
    </ComponentDocLayout>
  );
}
