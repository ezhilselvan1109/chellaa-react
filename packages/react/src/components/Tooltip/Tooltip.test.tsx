import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Tooltip } from "./Tooltip";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Tooltip Component", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ---------------------------------------------------------------------------
  // 1. Rendering & Initial State
  // ---------------------------------------------------------------------------
  describe("Rendering & Initial State", () => {
    it("renders trigger element while tooltip popup is initially not in DOM", () => {
      render(
        <Tooltip content="Helpful information">
          <button type="button">Trigger Button</button>
        </Tooltip>,
      );

      const trigger = screen.getByRole("button", { name: "Trigger Button" });
      expect(trigger).toBeInTheDocument();
      expect(trigger).not.toHaveAttribute("aria-describedby");
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("renders tooltip initially when defaultOpen is true", () => {
      render(
        <Tooltip content="Always here" defaultOpen>
          <button type="button">Action</button>
        </Tooltip>,
      );

      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent("Always here");
      expect(tooltip).toHaveAttribute("data-state", "open");
    });

    it("returns null gracefully if child is not a valid React element", () => {
      // @ts-expect-error testing invalid children runtime resilience
      const { container } = render(<Tooltip content="Info">invalid child</Tooltip>);
      expect(container.firstChild).toBeNull();
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Keyboard Focus & Blur Interactions
  // ---------------------------------------------------------------------------
  describe("Keyboard Focus & Blur Interactions", () => {
    it("immediately opens tooltip on keyboard focus and links aria-describedby", () => {
      render(
        <Tooltip content="Keyboard hint">
          <button type="button">Focusable Target</button>
        </Tooltip>,
      );

      const trigger = screen.getByRole("button", { name: "Focusable Target" });
      fireEvent.focus(trigger);

      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent("Keyboard hint");

      const tooltipId = tooltip.getAttribute("id");
      expect(tooltipId).toBeTruthy();
      expect(trigger).toHaveAttribute("aria-describedby", tooltipId);
    });

    it("immediately closes tooltip when trigger loses focus", async () => {
      render(
        <Tooltip content="Disappearing hint">
          <button type="button">Focusable Target</button>
        </Tooltip>,
      );

      const trigger = screen.getByRole("button", { name: "Focusable Target" });
      fireEvent.focus(trigger);
      expect(screen.getByRole("tooltip")).toBeInTheDocument();

      fireEvent.blur(trigger);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 20));
      });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      expect(trigger).not.toHaveAttribute("aria-describedby");
    });

    it("merges with pre-existing aria-describedby on the child element", async () => {
      render(
        <Tooltip content="Extra hint">
          <button type="button" aria-describedby="existing-desc-id">
            Custom Target
          </button>
        </Tooltip>,
      );

      const trigger = screen.getByRole("button", { name: "Custom Target" });
      expect(trigger).toHaveAttribute("aria-describedby", "existing-desc-id");

      fireEvent.focus(trigger);
      const tooltip = screen.getByRole("tooltip");
      const tooltipId = tooltip.getAttribute("id");

      expect(trigger.getAttribute("aria-describedby")).toBe(
        `existing-desc-id ${tooltipId}`,
      );

      fireEvent.blur(trigger);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 20));
      });
      expect(trigger).toHaveAttribute("aria-describedby", "existing-desc-id");
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Pointer Hover Interactions & Timing
  // ---------------------------------------------------------------------------
  describe("Pointer Hover Interactions", () => {
    it("opens on pointer enter and closes on pointer leave when delays are 0", () => {
      render(
        <Tooltip content="Instant tooltip" openDelay={0} closeDelay={0}>
          <button type="button">Hover Button</button>
        </Tooltip>,
      );

      const trigger = screen.getByRole("button", { name: "Hover Button" });
      fireEvent.mouseEnter(trigger);

      expect(screen.getByRole("tooltip")).toBeInTheDocument();

      fireEvent.mouseLeave(trigger);
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("respects openDelay before showing the tooltip", () => {
      vi.useFakeTimers();

      render(
        <Tooltip content="Delayed tooltip" openDelay={200} closeDelay={100}>
          <button type="button">Hover Me</button>
        </Tooltip>,
      );

      const trigger = screen.getByRole("button", { name: "Hover Me" });
      fireEvent.mouseEnter(trigger);

      // Initially not visible before delay passes
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(199);
      });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();

      // Pointer leave with closeDelay
      fireEvent.mouseLeave(trigger);
      expect(screen.getByRole("tooltip")).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(100);
      });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

      vi.useRealTimers();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Keyboard Dismissal (Escape Key)
  // ---------------------------------------------------------------------------
  describe("Keyboard Dismissal (Escape Key)", () => {
    it("dismisses open tooltip when Escape key is pressed without blurring trigger", () => {
      render(
        <Tooltip content="Press Escape to hide">
          <button type="button">Action</button>
        </Tooltip>,
      );

      const trigger = screen.getByRole("button", { name: "Action" });
      fireEvent.focus(trigger);

      expect(screen.getByRole("tooltip")).toBeInTheDocument();

      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Controlled vs Uncontrolled State
  // ---------------------------------------------------------------------------
  describe("Controlled vs Uncontrolled State", () => {
    it("honors controlled isOpen={true} prop regardless of mouse events", () => {
      const handleOpenChange = vi.fn();
      render(
        <Tooltip content="Controlled text" isOpen={true} onOpenChange={handleOpenChange}>
          <button type="button">Controlled Trigger</button>
        </Tooltip>,
      );

      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("honors controlled isOpen={false} prop when trigger is focused", () => {
      const handleOpenChange = vi.fn();
      render(
        <Tooltip content="Controlled text" isOpen={false} onOpenChange={handleOpenChange}>
          <button type="button">Controlled Trigger</button>
        </Tooltip>,
      );

      const trigger = screen.getByRole("button", { name: "Controlled Trigger" });
      fireEvent.focus(trigger);

      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      expect(handleOpenChange).toHaveBeenCalledWith(true);
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Disabled State
  // ---------------------------------------------------------------------------
  describe("Disabled State", () => {
    it("prevents tooltip from opening when isDisabled is true", () => {
      render(
        <Tooltip content="Disabled info" isDisabled openDelay={0}>
          <button type="button">Disabled Wrapper</button>
        </Tooltip>,
      );

      const trigger = screen.getByRole("button", { name: "Disabled Wrapper" });
      fireEvent.pointerEnter(trigger);
      fireEvent.focus(trigger);

      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      expect(trigger).not.toHaveAttribute("aria-describedby");
    });

    it("does not render tooltip if content is empty string", () => {
      render(
        <Tooltip content="" openDelay={0}>
          <button type="button">Empty Content</button>
        </Tooltip>,
      );

      const trigger = screen.getByRole("button", { name: "Empty Content" });
      fireEvent.focus(trigger);

      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 7. Props, Placements, Shortcuts & Arrow
  // ---------------------------------------------------------------------------
  describe("Props & Visual Features", () => {
    it("renders shortcut hint inside tooltip", () => {
      render(
        <Tooltip content="Save Document" shortcut="Ctrl+S" defaultOpen>
          <button type="button">Save</button>
        </Tooltip>,
      );

      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toHaveTextContent("Save Document");
      expect(tooltip).toHaveTextContent("Ctrl+S");
      expect(tooltip.querySelector(".cl-tooltip__shortcut")).toBeInTheDocument();
    });

    it("renders decorative arrow by default and allows omitting with hasArrow={false}", () => {
      const { rerender } = render(
        <Tooltip content="Arrow test" hasArrow defaultOpen>
          <button type="button">Btn</button>
        </Tooltip>,
      );

      expect(document.querySelector(".cl-tooltip__arrow")).toBeInTheDocument();

      rerender(
        <Tooltip content="Arrow test" hasArrow={false} defaultOpen>
          <button type="button">Btn</button>
        </Tooltip>,
      );

      expect(document.querySelector(".cl-tooltip__arrow")).not.toBeInTheDocument();
    });

    it("applies placement and custom className / style attributes", () => {
      render(
        <Tooltip
          content="Placement test"
          placement="bottom-start"
          className="custom-tooltip-class"
          style={{ zIndex: 9999 }}
          defaultOpen
        >
          <button type="button">Placement Btn</button>
        </Tooltip>,
      );

      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toHaveClass("cl-tooltip");
      expect(tooltip).toHaveClass("custom-tooltip-class");
      expect(tooltip).toHaveAttribute("data-placement", "bottom-start");
      expect(tooltip.style.zIndex).toBe("9999");
    });

    it("forwards ref to the floating tooltip element when rendered", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Tooltip ref={ref} content="Ref forward test" defaultOpen>
          <button type="button">Ref Btn</button>
        </Tooltip>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute("role", "tooltip");
    });
  });

  // ---------------------------------------------------------------------------
  // 8. Accessibility Audit (axe-core)
  // ---------------------------------------------------------------------------
  describe("Accessibility (axe-core)", () => {
    it("passes axe accessibility checks when tooltip is open", async () => {
      const { container } = render(
        <ThemeProvider>
          <main>
            <Tooltip content="Accessible tooltip action" defaultOpen>
              <button type="button">Accessible Button</button>
            </Tooltip>
          </main>
        </ThemeProvider>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("passes axe accessibility checks when closed", async () => {
      const { container } = render(
        <ThemeProvider>
          <main>
            <Tooltip content="Hidden accessible tooltip">
              <button type="button">Normal Button</button>
            </Tooltip>
          </main>
        </ThemeProvider>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
