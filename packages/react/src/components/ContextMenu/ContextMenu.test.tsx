import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { axe } from "vitest-axe";
import {
  ContextMenu,
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuLabel,
} from "./ContextMenu";

describe("ContextMenu Component (SPEC-034)", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ["requestAnimationFrame", "cancelAnimationFrame", "setTimeout", "clearTimeout"],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderStandardContextMenu = (
    triggerProps: Partial<React.ComponentProps<typeof ContextMenuTrigger>> = {},
    itemHandlers: { onCut?: () => void; onCopy?: () => void } = {},
  ) => {
    return render(
      <div>
        <div data-testid="outside-region">Outside Area</div>
        <ContextMenu>
          <ContextMenuTrigger
            data-testid="context-trigger"
            {...triggerProps}
          >
            Right-click or Shift+F10 here
          </ContextMenuTrigger>
          <ContextMenuContent data-testid="context-content">
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuItem data-testid="item-cut" onSelect={itemHandlers.onCut}>
              Cut
            </ContextMenuItem>
            <ContextMenuItem data-testid="item-copy" onSelect={itemHandlers.onCopy}>
              Copy
            </ContextMenuItem>
            <ContextMenuItem data-testid="item-disabled" disabled>
              Paste (Disabled)
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem data-testid="item-wrap" defaultChecked>
              Word Wrap
            </ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>,
    );
  };

  it("renders trigger element with context-menu semantics", () => {
    renderStandardContextMenu();
    const trigger = screen.getByTestId("context-trigger");
    expect(trigger).toBeInTheDocument();
    expect(screen.queryByTestId("context-content")).not.toBeInTheDocument();
  });

  it("opens at pointer coordinates and prevents native contextmenu event", () => {
    renderStandardContextMenu();
    const trigger = screen.getByTestId("context-trigger");

    const event = fireEvent.contextMenu(trigger, {
      clientX: 150,
      clientY: 200,
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByTestId("context-content")).toBeInTheDocument();
    const cutItem = screen.getByTestId("item-cut");
    expect(cutItem).toBeInTheDocument();
  });

  it("preserves native context menu outside the trigger area", () => {
    renderStandardContextMenu();
    const outside = screen.getByTestId("outside-region");

    const event = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
      clientX: 50,
      clientY: 50,
    });
    outside.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(screen.queryByTestId("context-content")).not.toBeInTheDocument();
  });

  it("does not open when trigger is disabled", () => {
    renderStandardContextMenu({ disabled: true });
    const trigger = screen.getByTestId("context-trigger");

    const event = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
      clientX: 150,
      clientY: 200,
    });
    trigger.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(screen.queryByTestId("context-content")).not.toBeInTheDocument();
  });

  it("opens via keyboard with Shift+F10 on focused trigger", () => {
    renderStandardContextMenu();
    const trigger = screen.getByTestId("context-trigger");
    trigger.focus();

    fireEvent.keyDown(trigger, { key: "F10", shiftKey: true });
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByTestId("context-content")).toBeInTheDocument();
    expect(screen.getByTestId("item-cut")).toHaveFocus();
  });

  it("opens via keyboard with ContextMenu key on focused trigger", () => {
    renderStandardContextMenu();
    const trigger = screen.getByTestId("context-trigger");
    trigger.focus();

    fireEvent.keyDown(trigger, { key: "ContextMenu" });
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByTestId("context-content")).toBeInTheDocument();
    expect(screen.getByTestId("item-cut")).toHaveFocus();
  });

  it("dismisses on Escape and returns focus to trigger", () => {
    renderStandardContextMenu();
    const trigger = screen.getByTestId("context-trigger");

    fireEvent.contextMenu(trigger, { clientX: 100, clientY: 100 });
    act(() => {
      vi.runAllTimers();
    });

    const content = screen.getByTestId("context-content");
    fireEvent.keyDown(content, { key: "Escape" });

    expect(screen.queryByTestId("context-content")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("selects item and dismisses menu", () => {
    const onCut = vi.fn();
    renderStandardContextMenu({}, { onCut });
    const trigger = screen.getByTestId("context-trigger");

    fireEvent.contextMenu(trigger, { clientX: 100, clientY: 100 });
    act(() => {
      vi.runAllTimers();
    });

    const cutItem = screen.getByTestId("item-cut");
    fireEvent.click(cutItem);

    expect(onCut).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("context-content")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("cleans up event listeners and state on unmount", () => {
    const { unmount } = renderStandardContextMenu();
    const trigger = screen.getByTestId("context-trigger");

    fireEvent.contextMenu(trigger, { clientX: 100, clientY: 100 });
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByTestId("context-content")).toBeInTheDocument();
    expect(() => unmount()).not.toThrow();
  });

  it("passes axe-core accessibility checks with 0 violations", async () => {
    vi.useRealTimers();
    const { container } = render(
      <main>
        <ContextMenu>
          <ContextMenuTrigger>Right click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Options</ContextMenuLabel>
            <ContextMenuItem>Item 1</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked>Enabled</ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenu>
      </main>,
    );

    let results = await axe(container);
    expect(results).toHaveNoViolations();

    fireEvent.contextMenu(screen.getByText("Right click here"), {
      clientX: 50,
      clientY: 50,
    });

    results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
