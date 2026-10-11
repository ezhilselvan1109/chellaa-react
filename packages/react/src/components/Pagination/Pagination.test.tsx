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

  describe("Page Size Changer (Select Integration) & Quick Jumper", () => {
    it("renders shared Select combobox with current page size", () => {
      render(<Pagination total={100} pageSize={10} showSizeChanger />);

      const trigger = screen.getByRole("combobox", { name: "Page size" });
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent("10 / page");
      expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("opens dropdown and updates page size and page calculation on option click", async () => {
      const user = userEvent.setup();
      const handlePageSizeChange = vi.fn();

      render(
        <Pagination
          total={100}
          pageSize={10}
          defaultPage={1}
          showSizeChanger
          onPageSizeChange={handlePageSizeChange}
        />,
      );

      const trigger = screen.getByRole("combobox", { name: "Page size" });
      expect(screen.getByRole("button", { name: "Page 10" })).toBeInTheDocument();

      // Open Select dropdown
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      const option20 = await screen.findByRole("option", { name: /20 \/ page/i });
      expect(option20).toBeInTheDocument();

      // Click option
      await user.click(option20);

      expect(handlePageSizeChange).toHaveBeenCalledWith(20);
      expect(trigger).toHaveTextContent("20 / page");

      // Total pages recalculates from 10 to 5 (100 / 20 = 5)
      expect(screen.getByRole("button", { name: "Page 5" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Page 10" })).not.toBeInTheDocument();
    });

    it("clamps active page to new totalPages when page size increase reduces total pages", async () => {
      const user = userEvent.setup();
      const handlePageSizeChange = vi.fn();
      const handlePageChange = vi.fn();

      render(
        <Pagination
          total={100}
          pageSize={10}
          defaultPage={8}
          showSizeChanger
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />,
      );

      // Initially on page 8
      expect(screen.getByRole("button", { name: "Page 8" })).toHaveAttribute(
        "aria-current",
        "page",
      );

      const trigger = screen.getByRole("combobox", { name: "Page size" });
      await user.click(trigger);

      const option50 = await screen.findByRole("option", { name: /50 \/ page/i });
      await user.click(option50);

      expect(handlePageSizeChange).toHaveBeenCalledWith(50);
      // New total pages is 100 / 50 = 2. Page 8 was clamped to 2!
      expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    it("works with compound subcomponent <Pagination.SizeSelect />", async () => {
      const user = userEvent.setup();
      const handlePageSizeChange = vi.fn();

      render(
        <Pagination total={60} pageSize={20}>
          <Pagination.List>
            <Pagination.Prev />
            <Pagination.Item page={1}>1</Pagination.Item>
            <Pagination.Item page={2}>2</Pagination.Item>
            <Pagination.Item page={3}>3</Pagination.Item>
            <Pagination.Next />
          </Pagination.List>
          <Pagination.SizeSelect
            options={[20, 30, 60]}
            onChange={handlePageSizeChange}
          />
        </Pagination>,
      );

      const trigger = screen.getByRole("combobox", { name: "Page size" });
      expect(trigger).toHaveTextContent("20 / page");

      await user.click(trigger);
      const option60 = await screen.findByRole("option", { name: /60 \/ page/i });
      await user.click(option60);

      expect(handlePageSizeChange).toHaveBeenCalledWith(60);
      expect(trigger).toHaveTextContent("60 / page");
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
