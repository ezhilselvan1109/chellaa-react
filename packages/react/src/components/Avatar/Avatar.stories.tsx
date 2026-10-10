import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import { AvatarGroup } from "./AvatarGroup";
import type { AvatarSize, AvatarShape, AvatarStatus } from "./Avatar.types";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar
      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
      alt="Sarah Connor"
      name="Sarah Connor"
    />
  ),
};

export const AllSizes: Story = {
  render: () => {
    const sizes: AvatarSize[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
    return (
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {sizes.map((size) => (
          <Avatar
            key={size}
            size={size}
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            alt={`Avatar size ${size}`}
            name="Sarah Connor"
          />
        ))}
      </div>
    );
  },
};

export const AllShapes: Story = {
  render: () => {
    const shapes: AvatarShape[] = ["circular", "rounded", "square"];
    return (
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {shapes.map((shape) => (
          <Avatar
            key={shape}
            shape={shape}
            size="lg"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            alt={`Avatar shape ${shape}`}
            name="Sarah Connor"
          />
        ))}
      </div>
    );
  },
};

export const InitialsFallback: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar name="Ezhil Selvan" size="md" />
      <Avatar name="Jane Doe" size="md" />
      <Avatar name="Admin" size="md" />
      <Avatar name="Jean-Luc Picard" size="md" />
      <Avatar size="md" />
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => {
    const statuses: AvatarStatus[] = ["online", "offline", "busy", "away"];
    return (
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        {statuses.map((status) => (
          <Avatar
            key={status}
            size="lg"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            alt={`User ${status}`}
          >
            <Avatar.Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" />
            <Avatar.Badge status={status} />
          </Avatar>
        ))}
      </div>
    );
  },
};

export const GroupStacking: Story = {
  render: () => (
    <AvatarGroup max={3} size="md">
      <Avatar
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
        name="Sarah Connor"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
        name="Alex Smith"
      />
      <Avatar name="Michael Brown" />
      <Avatar name="Emily Davis" />
      <Avatar name="David Wilson" />
    </AvatarGroup>
  ),
};

export const BrokenImageFallback: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar
        src="https://invalid-domain.example.com/broken-avatar.jpg"
        name="John Wick"
        size="lg"
      />
      <Avatar
        src="https://invalid-domain.example.com/broken-avatar.jpg"
        fallback={<span>JW</span>}
        size="lg"
      />
    </div>
  ),
};
