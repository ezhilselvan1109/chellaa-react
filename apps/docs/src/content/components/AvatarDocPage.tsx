import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Avatar, AvatarBadge, AvatarGroup, Box, Flex } from "@chellaa/react";

export const avatarToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "sizes", title: "Sizing Scale" },
  { id: "shapes", title: "Geometric Shapes" },
  { id: "presence-badges", title: "Presence Badges" },
  { id: "avatar-group", title: "Avatar Group" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const avatarPropsData: PropRow[] = [
  {
    name: "src",
    type: "string",
    default: "undefined",
    description: "Image source URL for the avatar.",
  },
  {
    name: "name",
    type: "string",
    default: "undefined",
    description: "Full name used to derive initials when image is missing or loading.",
  },
  {
    name: "alt",
    type: "string",
    default: "undefined",
    description: "Accessible alternate text for screen readers.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
    default: '"md"',
    description: "Standardized optical sizing scale mapped to spatial tokens.",
  },
  {
    name: "shape",
    type: '"circular" | "rounded" | "square"',
    default: '"circular"',
    description: "Geometric border-radius shape.",
  },
  {
    name: "fallback",
    type: "ReactNode",
    default: "undefined",
    description: "Custom fallback element rendered when image fails or is omitted.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to immediate child element via Slot primitive.",
  },
  {
    name: "onError",
    type: "ReactEventHandler<HTMLImageElement>",
    default: "undefined",
    description: "Callback fired when image fails to load.",
  },
  {
    name: "onLoad",
    type: "ReactEventHandler<HTMLImageElement>",
    default: "undefined",
    description: "Callback fired when image loads successfully.",
  },
];

const avatarBadgePropsData: PropRow[] = [
  {
    name: "status",
    type: '"online" | "offline" | "busy" | "away"',
    default: '"offline"',
    description: "Semantic user presence indicator state.",
  },
  {
    name: "placement",
    type: '"top-start" | "top-end" | "bottom-start" | "bottom-end"',
    default: '"bottom-end"',
    description: "Corner anchor positioning relative to the avatar circle.",
  },
];

const avatarGroupPropsData: PropRow[] = [
  {
    name: "max",
    type: "number",
    default: "undefined",
    description: "Maximum visible avatars rendered before displaying excess counter badge (+N).",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
    default: "undefined",
    description: "Propagates size down to all child avatars via Context.",
  },
  {
    name: "spacing",
    type: "number | string",
    default: '"-8px"',
    description: "Horizontal overlap offset margin between consecutive avatars.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "role='img'",
    description:
      "The root avatar element exposes role='img' with aria-label derived from the name prop or explicit alt text.",
  },
  {
    attributeOrKey: "aria-hidden",
    description:
      "Fallback initials and decorative icons automatically have aria-hidden='true' to prevent redundant screen reader chatter.",
  },
];

const a11yKeyboard = [
  {
    attributeOrKey: "Non-interactive",
    description: "Avatars are non-interactive by default. When wrapped in a button or link via asChild, standard keyboard focus applies.",
  },
];

export function AvatarDocPage() {
  return (
    <ComponentDocLayout
      title="Avatar"
      description="Visual representation of an entity, user profile, or organization, featuring automatic initials generation, image fallbacks, and presence badges."
      status="stable"
      version="v0.2.0"
      storybookId="components-data-display-avatar--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Avatar, AvatarBadge, AvatarGroup } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={4} sx={{ alignItems: "center" }}>
            <Avatar name="Chellaa React" />
            <Avatar name="John Doe" />
            <Avatar name="Sarah Connor" />
          </Flex>
        </Box>
        <CodeBlock
          code={`<Flex gap={4} sx={{ alignItems: "center" }}>
  <Avatar name="Chellaa React" />
  <Avatar name="John Doe" />
  <Avatar name="Sarah Connor" />
</Flex>`}
          language="tsx"
        />
      </section>

      <section id="sizes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Sizing Scale</span>
          <a href="#sizes" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={3} sx={{ alignItems: "center", flexWrap: "wrap" }}>
            <Avatar size="xs" name="Alex Rivera" />
            <Avatar size="sm" name="Alex Rivera" />
            <Avatar size="md" name="Alex Rivera" />
            <Avatar size="lg" name="Alex Rivera" />
            <Avatar size="xl" name="Alex Rivera" />
            <Avatar size="2xl" name="Alex Rivera" />
          </Flex>
        </Box>
        <CodeBlock
          code={`<Avatar size="xs" name="Alex Rivera" />
<Avatar size="sm" name="Alex Rivera" />
<Avatar size="md" name="Alex Rivera" />
<Avatar size="lg" name="Alex Rivera" />
<Avatar size="xl" name="Alex Rivera" />
<Avatar size="2xl" name="Alex Rivera" />`}
          language="tsx"
        />
      </section>

      <section id="shapes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Geometric Shapes</span>
          <a href="#shapes" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={4} sx={{ alignItems: "center" }}>
            <Avatar shape="circular" name="Circle Shape" />
            <Avatar shape="rounded" name="Rounded Shape" />
            <Avatar shape="square" name="Square Shape" />
          </Flex>
        </Box>
        <CodeBlock
          code={`<Avatar shape="circular" name="Circle Shape" />
<Avatar shape="rounded" name="Rounded Shape" />
<Avatar shape="square" name="Square Shape" />`}
          language="tsx"
        />
      </section>

      <section id="presence-badges" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Presence Badges</span>
          <a href="#presence-badges" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={4} sx={{ alignItems: "center" }}>
            <Avatar size="lg" name="Online User">
              <AvatarBadge status="online" />
            </Avatar>
            <Avatar size="lg" name="Busy User">
              <AvatarBadge status="busy" />
            </Avatar>
            <Avatar size="lg" name="Away User">
              <AvatarBadge status="away" />
            </Avatar>
            <Avatar size="lg" name="Offline User">
              <AvatarBadge status="offline" />
            </Avatar>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Avatar size="lg" name="Online User">
  <AvatarBadge status="online" />
</Avatar>
<Avatar size="lg" name="Busy User">
  <AvatarBadge status="busy" />
</Avatar>
<Avatar size="lg" name="Away User">
  <AvatarBadge status="away" />
</Avatar>
<Avatar size="lg" name="Offline User">
  <AvatarBadge status="offline" />
</Avatar>`}
          language="tsx"
        />
      </section>

      <section id="avatar-group" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Avatar Group</span>
          <a href="#avatar-group" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <AvatarGroup max={3} size="md">
            <Avatar name="Emma Watson" />
            <Avatar name="Liam Neeson" />
            <Avatar name="Noah Schnapp" />
            <Avatar name="Olivia Colman" />
            <Avatar name="William Hurt" />
          </AvatarGroup>
        </Box>
        <CodeBlock
          code={`<AvatarGroup max={3} size="md">
  <Avatar name="Emma Watson" />
  <Avatar name="Liam Neeson" />
  <Avatar name="Noah Schnapp" />
  <Avatar name="Olivia Colman" />
  <Avatar name="William Hurt" />
</AvatarGroup>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Avatar"
        roles={a11yRoles}
        keyboardKeys={a11yKeyboard}
      />

      <ApiTable componentName="Avatar" props={avatarPropsData} />
      <div style={{ marginTop: "24px" }}>
        <ApiTable componentName="AvatarBadge" props={avatarBadgePropsData} />
      </div>
      <div style={{ marginTop: "24px" }}>
        <ApiTable componentName="AvatarGroup" props={avatarGroupPropsData} />
      </div>
    </ComponentDocLayout>
  );
}
