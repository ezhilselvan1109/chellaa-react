import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { axe } from "vitest-axe";
import {
  Avatar,
  AvatarRoot,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  getInitials,
} from "./index";
import type { AvatarSize, AvatarShape, AvatarStatus } from "./Avatar.types";

describe("Avatar Component", () => {
  describe("Initials Helper (getInitials)", () => {
    it("extracts two uppercase initials from a first and last name", () => {
      expect(getInitials("Ezhil Selvan")).toBe("ES");
      expect(getInitials("Jane Doe")).toBe("JD");
      expect(getInitials("John Ronald Reuel Tolkien")).toBe("JT");
    });

    it("extracts single initial for single-word names", () => {
      expect(getInitials("Admin")).toBe("A");
      expect(getInitials("chella")).toBe("C");
    });

    it("handles hyphenated names correctly", () => {
      expect(getInitials("Jean-Luc Picard")).toBe("JP");
      expect(getInitials("Mary-Jane")).toBe("MJ");
    });

    it("handles leading, trailing, and multiple spaces", () => {
      expect(getInitials("  Mary   Jane  ")).toBe("MJ");
      expect(getInitials("  Sarah   ")).toBe("S");
    });

    it("returns empty string for empty or invalid input", () => {
      expect(getInitials("")).toBe("");
      expect(getInitials("   ")).toBe("");
      expect(getInitials(undefined)).toBe("");
    });

    it("handles unicode and accented characters without crashing", () => {
      expect(getInitials("Émilie Dupont")).toBe("ÉD");
      expect(getInitials("李 小龙")).toBe("李小");
    });
  });

  describe("Rendering & Fallbacks", () => {
    it("renders initials fallback when name is provided without src", () => {
      render(<Avatar name="Ezhil Selvan" />);
      const fallback = screen.getByText("ES");
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveClass("cl-avatar__fallback");
      const root = screen.getByRole("img");
      expect(root).toHaveAttribute("aria-label", "Ezhil Selvan");
      expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
    });

    it("renders custom fallback prop when provided", () => {
      render(
        <Avatar
          name="Ezhil Selvan"
          fallback={<span data-testid="custom-fallback">Custom FB</span>}
        />,
      );
      expect(screen.getByTestId("custom-fallback")).toBeInTheDocument();
      expect(screen.queryByText("ES")).not.toBeInTheDocument();
    });

    it("renders custom icon when name and src are absent", () => {
      render(
        <Avatar
          icon={<span data-testid="custom-icon">👤</span>}
          aria-label="User Icon"
        />,
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("renders default silhouette SVG when no src, name, fallback, or icon are provided", () => {
      const { container } = render(<Avatar />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("forwards ref to the root HTMLDivElement", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Avatar ref={ref} name="John Doe" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass("cl-avatar");
    });
  });

  describe("Image Loading & Error Handling", () => {
    it("renders image element when src is provided", () => {
      const { container } = render(
        <Avatar src="https://example.com/photo.jpg" alt="User Profile" />,
      );
      const img = container.querySelector("img");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "https://example.com/photo.jpg");
      expect(img).toHaveAttribute("alt", "User Profile");
      expect(img).toHaveClass("cl-avatar__image");
    });

    it("updates opacity and calls onLoad when image loads successfully", () => {
      const onLoad = vi.fn();
      const { container } = render(
        <Avatar
          src="https://example.com/photo.jpg"
          alt="User Profile"
          onLoad={onLoad}
        />,
      );
      const img = container.querySelector("img")!;
      expect(img).toBeInTheDocument();

      fireEvent.load(img);
      expect(onLoad).toHaveBeenCalledTimes(1);
      expect(img.style.opacity).toBe("1");
    });

    it("unmounts image and displays fallback when image fails to load", () => {
      const onError = vi.fn();
      const { container } = render(
        <Avatar
          src="https://example.com/invalid.jpg"
          name="Jane Doe"
          onError={onError}
        />,
      );
      const img = container.querySelector("img")!;
      expect(img).toBeInTheDocument();

      fireEvent.error(img);
      expect(onError).toHaveBeenCalledTimes(1);

      // After error, img unmounts and initials render permanently
      expect(container.querySelector("img")).not.toBeInTheDocument();
      expect(screen.getByText("JD")).toBeInTheDocument();
    });
  });

  describe("Sizes and Shapes", () => {
    const sizes: AvatarSize[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
    sizes.forEach((size) => {
      it(`applies size class .cl-avatar--${size}`, () => {
        const { container } = render(<Avatar size={size} name="Test User" />);
        const avatar = container.querySelector(".cl-avatar");
        expect(avatar).toHaveClass(`cl-avatar--${size}`);
      });
    });

    const shapes: AvatarShape[] = ["circular", "rounded", "square"];
    shapes.forEach((shape) => {
      it(`applies shape class .cl-avatar--${shape}`, () => {
        const { container } = render(<Avatar shape={shape} name="Test User" />);
        const avatar = container.querySelector(".cl-avatar");
        expect(avatar).toHaveClass(`cl-avatar--${shape}`);
      });
    });

    it("defaults to md size and circular shape", () => {
      const { container } = render(<Avatar name="Test User" />);
      const avatar = container.querySelector(".cl-avatar");
      expect(avatar).toHaveClass("cl-avatar--md");
      expect(avatar).toHaveClass("cl-avatar--circular");
    });
  });

  describe("Presence Badges", () => {
    const statuses: AvatarStatus[] = ["online", "offline", "busy", "away"];
    statuses.forEach((status) => {
      it(`renders status badge with .cl-avatar__badge--${status}`, () => {
        render(
          <Avatar name="Test User">
            <Avatar.Fallback>TU</Avatar.Fallback>
            <Avatar.Badge status={status} />
          </Avatar>,
        );
        const badge = screen.getByRole("status");
        expect(badge).toHaveClass(`cl-avatar__badge--${status}`);
        expect(badge).toHaveAttribute("aria-label", `Status: ${status}`);
      });
    });

    it("supports custom placement for badge", () => {
      render(
        <Avatar name="Test User">
          <Avatar.Fallback>TU</Avatar.Fallback>
          <Avatar.Badge status="online" placement="top-start" />
        </Avatar>,
      );
      const badge = screen.getByRole("status");
      expect(badge).toHaveClass("cl-avatar__badge--top-start");
    });

    it("supports custom aria-label on badge", () => {
      render(
        <Avatar name="Test User">
          <Avatar.Fallback>TU</Avatar.Fallback>
          <Avatar.Badge status="online" aria-label="Available for chat" />
        </Avatar>,
      );
      const badge = screen.getByRole("status");
      expect(badge).toHaveAttribute("aria-label", "Available for chat");
    });
  });

  describe("AvatarGroup Component", () => {
    it("renders group container with role='group' and .cl-avatar-group", () => {
      render(
        <AvatarGroup>
          <Avatar name="Alice" />
          <Avatar name="Bob" />
        </AvatarGroup>,
      );
      const group = screen.getByRole("group");
      expect(group).toHaveClass("cl-avatar-group");
      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("B")).toBeInTheDocument();
    });

    it("propagates size and shape to child avatars", () => {
      const { container } = render(
        <AvatarGroup size="lg" shape="square">
          <Avatar name="Alice" />
          <Avatar name="Bob" />
        </AvatarGroup>,
      );
      const avatars = container.querySelectorAll(".cl-avatar");
      avatars.forEach((avatar) => {
        expect(avatar).toHaveClass("cl-avatar--lg");
        expect(avatar).toHaveClass("cl-avatar--square");
      });
    });

    it("truncates children when max is provided and renders +N excess count", () => {
      render(
        <AvatarGroup max={2}>
          <Avatar name="Alice" />
          <Avatar name="Bob" />
          <Avatar name="Charlie" />
          <Avatar name="David" />
        </AvatarGroup>,
      );
      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("B")).toBeInTheDocument();
      expect(screen.queryByText("C")).not.toBeInTheDocument();
      expect(screen.queryByText("D")).not.toBeInTheDocument();

      const excess = screen.getByText("+2");
      expect(excess).toBeInTheDocument();
      expect(excess).toHaveClass("cl-avatar-group__excess");
      expect(excess).toHaveAttribute("aria-label", "+2 others");
    });

    it("does not render excess badge when children count <= max", () => {
      render(
        <AvatarGroup max={3}>
          <Avatar name="Alice" />
          <Avatar name="Bob" />
        </AvatarGroup>,
      );
      expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
    });

    it("applies custom spacing style property", () => {
      render(
        <AvatarGroup spacing="-12px">
          <Avatar name="Alice" />
        </AvatarGroup>,
      );
      const group = screen.getByRole("group");
      expect(group.style.getPropertyValue("--cl-avatar-group-spacing")).toBe(
        "-12px",
      );
    });
  });

  describe("Compound Architecture & Slot Delegation", () => {
    it("renders using Avatar.Root, Avatar.Image, Avatar.Fallback, and Avatar.Badge", () => {
      render(
        <Avatar.Root size="xl" shape="rounded">
          <Avatar.Fallback>CR</Avatar.Fallback>
          <Avatar.Badge status="away" />
        </Avatar.Root>,
      );
      expect(screen.getByText("CR")).toBeInTheDocument();
      const badge = screen.getByRole("status");
      expect(badge).toHaveClass("cl-avatar__badge--away");
    });

    it("supports asChild on Avatar root", () => {
      render(
        <Avatar asChild name="Slotted Avatar">
          <section data-testid="slotted-section">
            <Avatar.Fallback>SA</Avatar.Fallback>
          </section>
        </Avatar>,
      );
      const section = screen.getByTestId("slotted-section");
      expect(section).toHaveClass("cl-avatar");
      expect(section.tagName).toBe("SECTION");
    });
  });

  describe("Accessibility (axe-core)", () => {
    it("has zero axe violations for default avatar with initials", async () => {
      const { container } = render(<Avatar name="Ezhil Selvan" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations across all 6 sizes and 3 shapes", async () => {
      const { container } = render(
        <div>
          <Avatar size="xs" shape="circular" name="User XS" />
          <Avatar size="sm" shape="rounded" name="User SM" />
          <Avatar size="md" shape="square" name="User MD" />
          <Avatar size="lg" shape="circular" name="User LG" />
          <Avatar size="xl" shape="rounded" name="User XL" />
          <Avatar size="2xl" shape="square" name="User 2XL" />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for avatar with status badge", async () => {
      const { container } = render(
        <Avatar name="Ezhil Selvan">
          <Avatar.Fallback>ES</Avatar.Fallback>
          <Avatar.Badge status="online" />
        </Avatar>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for AvatarGroup with excess truncation", async () => {
      const { container } = render(
        <AvatarGroup max={2}>
          <Avatar name="Alice Smith" />
          <Avatar name="Bob Jones" />
          <Avatar name="Charlie Brown" />
        </AvatarGroup>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
