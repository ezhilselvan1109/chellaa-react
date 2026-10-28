import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import * as React from "react";
import {
  Breadcrumbs,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./Breadcrumbs";

describe("Breadcrumbs Component", () => {
  it("renders a semantic navigation landmark with default label", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumbs>,
    );

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass("cl-breadcrumb");
  });

  it("supports custom aria-label on navigation landmark", () => {
    render(
      <Breadcrumbs aria-label="Order progress">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Step 1</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumbs>,
    );

    expect(screen.getByRole("navigation", { name: "Order progress" })).toBeInTheDocument();
  });

  it("renders an ordered list structure for breadcrumb sequence", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Components</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumbs>,
    );

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.tagName.toLowerCase()).toBe("ol");
  });

  it("marks the current page with aria-current='page'", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumbs>,
    );

    const currentPage = screen.getByText("Current Page");
    expect(currentPage).toHaveAttribute("aria-current", "page");
    expect(currentPage).toHaveClass("cl-breadcrumb__page");
  });

  it("hides decorative separators from screen readers", () => {
    const { container } = render(
      <Breadcrumbs>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumbs>,
    );

    const separator = container.querySelector(".cl-breadcrumb__separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("aria-hidden", "true");
    expect(separator).toHaveAttribute("role", "presentation");
  });

  it("renders ellipsis with accessible screen reader label", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumbs>,
    );

    expect(screen.getByText("More breadcrumb items")).toBeInTheDocument();
    expect(screen.getByText("More breadcrumb items")).toHaveClass("cl-sr-only");
  });

  it("supports asChild composition for Link and Page", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a href="/custom-link">Custom Link</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage asChild>
              <strong>Bold Current</strong>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumbs>,
    );

    const link = screen.getByRole("link", { name: "Custom Link" });
    expect(link).toHaveAttribute("href", "/custom-link");
    expect(link).toHaveClass("cl-breadcrumb__link");

    const page = screen.getByText("Bold Current");
    expect(page.tagName.toLowerCase()).toBe("strong");
    expect(page).toHaveAttribute("aria-current", "page");
    expect(page).toHaveClass("cl-breadcrumb__page");
  });

  it("passes axe-core accessibility audit with 0 violations", async () => {
    const { container } = render(
      <Breadcrumbs>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumbs>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
