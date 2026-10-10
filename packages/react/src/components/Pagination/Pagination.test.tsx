import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  Pagination,
  PaginationRoot,
  PaginationList,
  PaginationItem,
  PaginationPrev,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
  PaginationSizeSelect,
  PaginationJumper,
  getPaginationRange,
} from "./index";

describe("Pagination Component (SPEC-029)", () => {
  describe("Mathematical Calculation & Windowing Algorithm", () => {
    it("calculates exact page range when totalPages <= max visible slots", () => {
      const range = getPaginationRange({
        totalPages: 5,
        currentPage: 1,
      });
      expect(range).toEqual([1, 2, 3, 4, 5]);
    });

    it("inserts right ellipsis when on page 1 with 100 total pages", () => {
      const range = getPaginationRange({
        totalPages: 100,
        currentPage: 1,
        siblingCount: 1,
        boundaryCount: 1,
      });
      // 1, 2, 3, 4, ellipsis-end, 100
      expect(range).toContain(1);
      expect(range).toContain("ellipsis-end");
      expect(range).toContain(100);
      expect(range).not.toContain("ellipsis-start");
    });

    it("inserts left ellipsis when on final page", () => {
      const range = getPaginationRange({
        totalPages: 100,
        currentPage: 100,
        siblingCount: 1,
        boundaryCount: 1,
      });
      expect(range).toContain(1);
      expect(range).toContain("ellipsis-start");
      expect(range).toContain(100);
      expect(range).not.toContain("ellipsis-end");
    });

    it("inserts dual ellipses when in middle page range", () => {
      const range = getPaginationRange({
        totalPages: 100,
        currentPage: 50,
        siblingCount: 1,
        boundaryCount: 1,
      });
      expect(range).toEqual([1, "ellipsis-start", 49, 50, 51, "ellipsis-end", 100]);
    });
  });

  describe("Rendering & Semantic Structure", () => {
    it("renders semantic <nav aria-label='Pagination'> with <ul role='list'>", () => {
      render(<Pagination total={100} pageSize={10} defaultPage={1} />);

      const nav = screen.getByRole("navigation", { name: "Pagination" });
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass("cl-pagination");
      expect(nav).toHaveClass("cl-pagination--md");
      expect(nav).toHaveClass("cl-pagination--outline");

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass("cl-pagination__list");

      // 10 total pages: 1 to 10 fits within window
      const page1 = screen.getByRole("button", { name: "Page 1" });
      expect(page1).toHaveAttribute("aria-current", "page");

      const prev = screen.getByRole("button", { name: "Go to previous page" });
      expect(prev).toBeDisabled();

      const next = screen.getByRole("button", { name: "Go to next page" });
      expect(next).not.toBeDisabled();
    });

    it("applies variant and size classes", () => {
      const { container } = render(
        <Pagination total={50} pageSize={10} size="lg" variant="solid" />,
      );
      const nav = container.querySelector("nav");
      expect(nav).toHaveClass("cl-pagination--lg");
      expect(nav).toHaveClass("cl-pagination--solid");
    });
  });

  describe("Page Switching & Boundary Interactions", () => {
    it("changes page and notifies onPageChange on page click", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();

      render(
        <Pagination
          total={100}
          pageSize={10}
          defaultPage={1}
          onPageChange={onPageChange}
        />,
      );

      const page2 = screen.getByRole("button", { name: "Page 2" });
      expect(page2).not.toHaveAttribute("aria-current");

      await user.click(page2);

      expect(onPageChange).toHaveBeenCalledWith(2);
      expect(page2).toHaveAttribute("aria-current", "page");

      const prev = screen.getByRole("button", { name: "Go to previous page" });
      expect(prev).not.toBeDisabled();
    });

    it("disables Prev button on page 1 and Next button on last page", async () => {
      const user = userEvent.setup();

      render(<Pagination total={30} pageSize={10} defaultPage={1} />);

      const prev = screen.getByRole("button", { name: "Go to previous page" });
      const next = screen.getByRole("button", { name: "Go to next page" });

      expect(prev).toBeDisabled();
      expect(next).not.toBeDisabled();

      // Go to page 3 (last page)
      await user.click(screen.getByRole("button", { name: "Page 3" }));

      expect(prev).not.toBeDisabled();
      expect(next).toBeDisabled();
    });

    it("navigates with Prev and Next buttons", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();

      render(
        <Pagination
          total={50}
          pageSize={10}
          defaultPage={2}
          onPageChange={onPageChange}
        />,
      );

      const prev = screen.getByRole("button", { name: "Go to previous page" });
      const next = screen.getByRole("button", { name: "Go to next page" });

      await user.click(next);
      expect(onPageChange).toHaveBeenCalledWith(3);

      await user.click(prev);
      expect(onPageChange).toHaveBeenCalledWith(2);
    });
  });

  describe("Controlled State", () => {
    it("respects controlled page prop and updates on rerender", () => {
      const handlePageChange = vi.fn();
      const { rerender } = render(
        <Pagination
          total={100}
          pageSize={10}
          page={3}
          onPageChange={handlePageChange}
        />,
      );

      expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute(
        "aria-current",
        "page",
      );

      fireEvent.click(screen.getByRole("button", { name: "Page 4" }));
      expect(handlePageChange).toHaveBeenCalledWith(4);

      rerender(
        <Pagination
          total={100}
          pageSize={10}
          page={4}
          onPageChange={handlePageChange}
        />,
      );

      expect(screen.getByRole("button", { name: "Page 4" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });
  });

  describe("Page Size Changer & Quick Jumper", () => {
    it("changes page size with showSizeChanger dropdown", () => {
      const handlePageSizeChange = vi.fn();

      render(
        <Pagination
          total={100}
          pageSize={10}
          showSizeChanger
          onPageSizeChange={handlePageSizeChange}
        />,
      );

      const select = screen.getByRole("combobox", { name: "Page size" });
      expect(select).toBeInTheDocument();
      expect(select).toHaveValue("10");

      fireEvent.change(select, { target: { value: "20" } });
      expect(handlePageSizeChange).toHaveBeenCalledWith(20);
    });

    it("jumps to page with showQuickJumper input on Enter key", () => {
      const handlePageChange = vi.fn();

      render(
        <Pagination
          total={100}
          pageSize={10}
          showQuickJumper
          onPageChange={handlePageChange}
        />,
      );

      const input = screen.getByRole("spinbutton", { name: "Jump to page" });
      expect(input).toBeInTheDocument();

      fireEvent.change(input, { target: { value: "7" } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(handlePageChange).toHaveBeenCalledWith(7);
    });
  });

  describe("First and Last Shortcuts", () => {
    it("jumps to first and last page with compound subcomponents", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination
          total={100}
          pageSize={10}
          defaultPage={5}
          onPageChange={handlePageChange}
        >
          <Pagination.List>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item page={5}>5</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination.List>
        </Pagination>,
      );

      const firstBtn = screen.getByRole("button", { name: "Go to first page" });
      const lastBtn = screen.getByRole("button", { name: "Go to last page" });

      await user.click(firstBtn);
      expect(handlePageChange).toHaveBeenCalledWith(1);

      await user.click(lastBtn);
      expect(handlePageChange).toHaveBeenCalledWith(10);
    });
  });

  describe("Disabled State", () => {
    it("disables all controls when isDisabled is true", () => {
      render(
        <Pagination
          total={100}
          pageSize={10}
          defaultPage={3}
          isDisabled
          showSizeChanger
          showQuickJumper
        />,
      );

      const pageButtons = screen.getAllByRole("button");
      pageButtons.forEach((btn) => {
        expect(btn).toBeDisabled();
      });

      const select = screen.getByRole("combobox", { name: "Page size" });
      expect(select).toBeDisabled();

      const input = screen.getByRole("spinbutton", { name: "Jump to page" });
      expect(input).toBeDisabled();
    });
  });

  describe("Slot Composition (asChild)", () => {
    it("supports asChild on Pagination.Item", () => {
      render(
        <Pagination total={30} pageSize={10}>
          <Pagination.List>
            <Pagination.Item page={1} asChild>
              <a href="#page-1">Page One Link</a>
            </Pagination.Item>
          </Pagination.List>
        </Pagination>,
      );

      const link = screen.getByRole("link", { name: "Page One Link" });
      expect(link).toHaveAttribute("href", "#page-1");
      expect(link).toHaveClass("cl-pagination__item");
    });
  });

  describe("Error Handling", () => {
    it("throws helpful error when subcomponents rendered outside Pagination", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});

      expect(() => render(<PaginationItem page={1}>1</PaginationItem>)).toThrow(
        "Pagination compound components must be rendered inside <Pagination /> or <Pagination.Root />",
      );

      spy.mockRestore();
    });
  });

  describe("Accessibility (WCAG 2.2 AA Conformance)", () => {
    it("has zero accessibility violations with default pagination", async () => {
      const { container } = render(
        <Pagination total={100} pageSize={10} defaultPage={1} />,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero accessibility violations with many pages and jumper", async () => {
      const { container } = render(
        <Pagination
          total={1000}
          pageSize={10}
          defaultPage={50}
          showSizeChanger
          showQuickJumper
        />,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
