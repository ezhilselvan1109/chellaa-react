import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";
import { Stack } from "../Stack/Stack";
import { Text } from "../Typography/Text";

const meta: Meta<typeof Link> = {
  title: "Components/Navigation/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible hyperlink styling native anchors with token-driven color schemes, underline modes, external link guards, and Slot composition.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: "https://chellaa.dev",
    children: "Explore Chellaa Design System",
  },
};

export const UnderlineVariants: Story = {
  render: () => (
    <Stack direction="column" gap={3}>
      <Text>
        Hover underline (default): <Link href="#" underline="hover">Hover over me</Link>
      </Text>
      <Text>
        Always underline: <Link href="#" underline="always">Always underlined</Link>
      </Text>
      <Text>
        No underline: <Link href="#" underline="none">Clean text with no line</Link>
      </Text>
    </Stack>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <Stack direction="column" gap={3}>
      <Text>
        Primary: <Link href="#" colorScheme="primary">Primary Brand Link</Link>
      </Text>
      <Text>
        Neutral: <Link href="#" colorScheme="neutral">Neutral Text Link</Link>
      </Text>
      <Text>
        Subtle: <Link href="#" colorScheme="subtle">Subtle Muted Link</Link>
      </Text>
    </Stack>
  ),
};

export const ExternalLink: Story = {
  render: () => (
    <Stack direction="column" gap={2}>
      <Text>
        Check our source code at{" "}
        <Link href="https://github.com/ezhilselvan1109/chellaa-react" isExternal>
          GitHub Repository
        </Link>
      </Text>
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Stack direction="row" gap={4}>
      <Link href="/settings" isDisabled>
        Disabled Settings Link
      </Link>
      <Link href="https://example.com" isExternal isDisabled>
        Disabled External Link
      </Link>
    </Stack>
  ),
};
