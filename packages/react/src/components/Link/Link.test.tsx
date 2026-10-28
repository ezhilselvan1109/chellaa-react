import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import * as React from "react";
import { Link } from "./Link";

describe("Link Component", () => {
  it("renders a semantic anchor with href and text content", () => {
    render(<Link href="/dashboard">Dashboard</Link>);
    const link = screen.getByRole("link", { name: "Dashboard" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/dashboard");
    expect(link).toHaveClass("cl-link", "cl-link--color-primary", "cl-link--underline-hover");
  });

  it("supports underline variants", () => {
    const { rerender } = render(<Link href="#" underline="always">Always</Link>);
    expect(screen.getByRole("link")).toHaveClass("cl-link--underline-always");

    rerender(<Link href="#" underline="none">None</Link>);
    expect(screen.getByRole("link")).toHaveClass("cl-link--underline-none");
  });

  it("supports colorScheme variants", () => {
    const { rerender } = render(<Link href="#" colorScheme="neutral">Neutral</Link>);
    expect(screen.getByRole("link")).toHaveClass("cl-link--color-neutral");

    rerender(<Link href="#" colorScheme="subtle">Subtle</Link>);
    expect(screen.getByRole("link")).toHaveClass("cl-link--color-subtle");
  });

  it("handles isExternal by setting target=_blank, rel=noopener noreferrer, and rendering icon", () => {
    render(<Link href="https://example.com" isExternal>External Site</Link>);
    const link = screen.getByRole("link", { name: "External Site" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");

    const svg = link.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("preserves custom rel when target=_blank is used and adds noopener noreferrer", () => {
    render(<Link href="https://example.com" target="_blank" rel="author">Author Profile</Link>);
    const link = screen.getByRole("link");
    expect(link.getAttribute("rel")).toContain("author");
    expect(link.getAttribute("rel")).toContain("noopener");
    expect(link.getAttribute("rel")).toContain("noreferrer");
  });

  it("handles isDisabled state gracefully", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Link href="/secret" isDisabled onClick={handleClick}>Disabled Link</Link>);

    const link = screen.getByText("Disabled Link");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
    expect(link).not.toHaveAttribute("href");
    expect(link).toHaveClass("cl-link--disabled");

    await user.click(link);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("supports asChild composition via Slot", () => {
    render(
      <Link asChild underline="always">
        <button type="button">Button As Link</button>
      </Link>,
    );
    const button = screen.getByRole("button", { name: "Button As Link" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("cl-link", "cl-link--underline-always");
  });

  it("passes axe-core accessibility audit with 0 violations", async () => {
    const { container } = render(
      <main>
        <Link href="/about">About Us</Link>
        <Link href="https://github.com" isExternal>GitHub</Link>
      </main>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
