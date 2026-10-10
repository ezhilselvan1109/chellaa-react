import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverClose,
  PopoverArrow,
  PopoverHeader,
  PopoverTitle,
  PopoverBody,
  PopoverFooter,
} from "./Popover";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Popover Component", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ---------------------------------------------------------------------------
  // 1. Rendering & Compound Component Composition
  // ---------------------------------------------------------------------------
  describe("Rendering & Composition", () => {
    it("renders trigger element while popover content is initially not in DOM", () => {
      render(
        <Popover>
          <PopoverTrigger>
            <button type="button">Open Options</button>
          </PopoverTrigger>
          <PopoverContent>
            <div>Popover Body</div>
          </PopoverContent>
        </Popover>,
      );

      const trigger = screen.getByRole("button", { name: "Open Options" });
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders complete compound anatomy when defaultOpen is true", () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger>
            <button type="button">Trigger</button>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent>
              <PopoverArrow data-testid="popover-arrow" />
              <PopoverHeader data-testid="popover-header">
                <PopoverTitle>Filter Options</PopoverTitle>
                <PopoverClose data-testid="popover-close" />
              </PopoverHeader>
              <PopoverBody data-testid="popover-body">
                <input type="text" placeholder="Search..." data-testid="search-input" />
              </PopoverBody>
              <PopoverFooter data-testid="popover-footer">
                <button type="button">Apply</button>
              </PopoverFooter>
            </PopoverContent>
          </PopoverPortal>
        </Popover>,
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute("data-state", "open");
      expect(screen.getByTestId("popover-header")).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Filter Options" })).toBeInTheDocument();
      expect(screen.getByTestId("popover-close")).toBeInTheDocument();
      expect(screen.getByTestId("popover-body")).toBeInTheDocument();
      expect(screen.getByTestId("search-input")).toBeInTheDocument();
      expect(screen.getByTestId("popover-footer")).toBeInTheDocument();
      expect(screen.getByTestId("popover-arrow")).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Trigger Interaction & Toggle
  // ---------------------------------------------------------------------------
  describe("Trigger Interactions", () => {
    it("toggles popover open and closed on trigger click", async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <PopoverTrigger>
            <button type="button">Toggle</button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Content</p>
          </PopoverContent>
        </Popover>,
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      await user.click(trigger);
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(trigger).toHaveAttribute("aria-controls", dialog.getAttribute("id"));

      await user.click(trigger);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("supports asChild delegation to child element via Slot", async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" className="custom-slotted-btn">
              Slotted Trigger
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Slotted Content</p>
          </PopoverContent>
        </Popover>,
      );

      const trigger = screen.getByRole("button", { name: "Slotted Trigger" });
      expect(trigger).toHaveClass("custom-slotted-btn");
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog");

      await user.click(trigger);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Outside Click & Escape Key Dismissal
  // ---------------------------------------------------------------------------
  describe("Dismissal Ergonomics", () => {
    it("dismisses popover when clicking outside the content", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <div>
          <button type="button" data-testid="outside-element">
            Outside Area
          </button>
          <Popover defaultOpen onOpenChange={onOpenChange}>
            <PopoverTrigger>
              <button type="button">Trigger</button>
            </PopoverTrigger>
            <PopoverContent>
              <p>Popover Content</p>
            </PopoverContent>
          </Popover>
        </div>,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();

      const outsideBtn = screen.getByTestId("outside-element");
      await user.click(outsideBtn);

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("dismisses popover and restores focus to trigger on Escape key", async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <PopoverTrigger>
            <button type="button" data-testid="trigger-btn">
              Open Popover
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <button type="button" data-testid="inside-btn">
              Action Inside
            </button>
          </PopoverContent>
        </Popover>,
      );

      const trigger = screen.getByTestId("trigger-btn");
      await user.click(trigger);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(document.activeElement).toBe(trigger);
    });

    it("dismisses popover when PopoverClose button is clicked", async () => {
      const user = userEvent.setup();
      render(
        <Popover defaultOpen>
          <PopoverTrigger>
            <button type="button">Trigger</button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverClose data-testid="close-btn" />
          </PopoverContent>
        </Popover>,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
      const closeBtn = screen.getByTestId("close-btn");
      await user.click(closeBtn);

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Accessible Naming & WAI-ARIA Semantics
  // ---------------------------------------------------------------------------
  describe("Accessible Naming & ARIA", () => {
    it("associates PopoverTitle with PopoverContent via aria-labelledby", () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger>
            <button type="button">Trigger</button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Account Settings</PopoverTitle>
            </PopoverHeader>
            <PopoverBody>Content</PopoverBody>
          </PopoverContent>
        </Popover>,
      );

      const dialog = screen.getByRole("dialog", { name: "Account Settings" });
      const title = screen.getByRole("heading", { name: "Account Settings" });

      expect(dialog).toHaveAttribute("aria-labelledby", title.getAttribute("id"));
    });

    it("sets aria-modal='true' when trapFocus is true", () => {
      render(
        <Popover defaultOpen trapFocus={true}>
          <PopoverTrigger>
            <button type="button">Trigger</button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Modal Popover</p>
          </PopoverContent>
        </Popover>,
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Controlled vs Uncontrolled State
  // ---------------------------------------------------------------------------
  describe("Controlled State", () => {
    it("honors controlled isOpen={true} prop", () => {
      render(
        <Popover isOpen={true}>
          <PopoverTrigger>
            <button type="button">Trigger</button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Controlled Content</p>
          </PopoverContent>
        </Popover>,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("honors controlled isOpen={false} prop", () => {
      render(
        <Popover isOpen={false}>
          <PopoverTrigger>
            <button type="button">Trigger</button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Controlled Content</p>
          </PopoverContent>
        </Popover>,
      );

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Ref Forwarding & Attributes
  // ---------------------------------------------------------------------------
  describe("Ref Forwarding & Props", () => {
    it("forwards ref to content and trigger DOM elements", () => {
      const contentRef = React.createRef<HTMLDivElement>();
      const triggerRef = React.createRef<HTMLElement>();

      render(
        <Popover defaultOpen>
          <PopoverTrigger ref={triggerRef}>
            <button type="button">Trigger</button>
          </PopoverTrigger>
          <PopoverContent ref={contentRef} className="custom-popover-class">
            <p>Body</p>
          </PopoverContent>
        </Popover>,
      );

      expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
      expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
      expect(contentRef.current).toHaveClass("cl-popover");
      expect(contentRef.current).toHaveClass("custom-popover-class");
      expect(contentRef.current).toHaveAttribute("data-placement", "bottom");
    });
  });

  // ---------------------------------------------------------------------------
  // 7. Accessibility (axe-core)
  // ---------------------------------------------------------------------------
  describe("Accessibility (axe-core)", () => {
    it("passes axe accessibility checks when popover is open", async () => {
      const { container } = render(
        <ThemeProvider>
          <main>
            <Popover defaultOpen>
              <PopoverTrigger>
                <button type="button">Open Menu</button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Accessible Popover Title</PopoverTitle>
                  <PopoverClose />
                </PopoverHeader>
                <PopoverBody>
                  <label htmlFor="user-name">User Name</label>
                  <input id="user-name" type="text" />
                </PopoverBody>
                <PopoverFooter>
                  <button type="button">Save</button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </main>
        </ThemeProvider>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("passes axe accessibility checks when popover is closed", async () => {
      const { container } = render(
        <ThemeProvider>
          <main>
            <Popover>
              <PopoverTrigger>
                <button type="button">Open Menu</button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverTitle>Title</PopoverTitle>
                <PopoverBody>Body</PopoverBody>
              </PopoverContent>
            </Popover>
          </main>
        </ThemeProvider>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
