import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { axe } from "vitest-axe";
import {
  Drawer,
  DrawerRoot,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  Sheet,
} from "./Drawer";
import { __resetBodyScrollLockForTesting } from "../Dialog/Dialog";

describe("Drawer / Sheet Component (SPEC-036)", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ["requestAnimationFrame", "cancelAnimationFrame"],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    __resetBodyScrollLockForTesting();
  });

  const renderStandardDrawer = (
    rootProps: Partial<React.ComponentProps<typeof DrawerRoot>> = {},
  ) => {
    return render(
      <Drawer defaultOpen={false} {...rootProps}>
        <DrawerTrigger data-testid="drawer-trigger">Open Drawer</DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay data-testid="drawer-overlay" />
          <DrawerContent data-testid="drawer-content">
            <DrawerHeader>
              <DrawerTitle>Edit Settings</DrawerTitle>
              <DrawerDescription>Configure application settings</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p>Drawer body content</p>
              <input data-testid="drawer-input" placeholder="Type here..." />
              <button type="button" data-testid="inner-button">Action</button>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose data-testid="drawer-close">Cancel</DrawerClose>
              <button type="button" data-testid="drawer-save">Save</button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>,
    );
  };

  it("renders trigger button with dialog aria attributes", () => {
    renderStandardDrawer();
    const trigger = screen.getByTestId("drawer-trigger");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
  });

  it("opens drawer on trigger click with role=dialog and aria-modal=true", () => {
    renderStandardDrawer();
    const trigger = screen.getByTestId("drawer-trigger");

    fireEvent.click(trigger);
    act(() => {
      vi.runAllTimers();
    });

    const content = screen.getByTestId("drawer-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute("role", "dialog");
    expect(content).toHaveAttribute("aria-modal", "true");
  });

  it("applies placement attribute and classes for all 4 directions", () => {
    const placements = ["left", "right", "top", "bottom"] as const;

    for (const placement of placements) {
      const { unmount } = render(
        <Drawer defaultOpen placement={placement}>
          <DrawerPortal>
            <DrawerContent data-testid={`drawer-${placement}`}>
              <DrawerTitle>Title</DrawerTitle>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>,
      );

      const content = screen.getByTestId(`drawer-${placement}`);
      expect(content).toHaveAttribute("data-placement", placement);
      expect(content).toHaveClass(`cl-drawer__content--${placement}`);
      unmount();
    }
  });

  it("applies size attribute and classes across the sizing scale", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "full"] as const;

    for (const size of sizes) {
      const { unmount } = render(
        <Drawer defaultOpen size={size}>
          <DrawerPortal>
            <DrawerContent data-testid={`drawer-size-${size}`}>
              <DrawerTitle>Title</DrawerTitle>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>,
      );

      const content = screen.getByTestId(`drawer-size-${size}`);
      expect(content).toHaveAttribute("data-size", size);
      expect(content).toHaveClass(`cl-drawer__content--${size}`);
      unmount();
    }
  });

  it("links aria-labelledby with DrawerTitle and aria-describedby with DrawerDescription", () => {
    renderStandardDrawer({ defaultOpen: true });
    act(() => {
      vi.runAllTimers();
    });

    const content = screen.getByTestId("drawer-content");
    const title = screen.getByRole("heading", { name: "Edit Settings" });
    const description = screen.getByText("Configure application settings");

    expect(content).toHaveAttribute("aria-labelledby", title.id);
    expect(content).toHaveAttribute("aria-describedby", description.id);
  });

  it("closes on Escape and restores focus to trigger", () => {
    renderStandardDrawer();
    const trigger = screen.getByTestId("drawer-trigger");

    fireEvent.click(trigger);
    act(() => {
      vi.runAllTimers();
    });

    const content = screen.getByTestId("drawer-content");
    fireEvent.keyDown(content, { key: "Escape" });

    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on backdrop overlay click when closeOnOverlayClick is true", () => {
    renderStandardDrawer({ defaultOpen: true, closeOnOverlayClick: true });
    act(() => {
      vi.runAllTimers();
    });

    const overlay = screen.getByTestId("drawer-overlay");
    fireEvent.click(overlay);

    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
  });

  it("closes on DrawerClose button click", () => {
    renderStandardDrawer({ defaultOpen: true });
    act(() => {
      vi.runAllTimers();
    });

    const closeBtn = screen.getByTestId("drawer-close");
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
  });

  it("traps focus inside the drawer on Tab and Shift+Tab", () => {
    renderStandardDrawer({ defaultOpen: true });
    act(() => {
      vi.runAllTimers();
    });

    const content = screen.getByTestId("drawer-content");
    const input = screen.getByTestId("drawer-input");
    const closeBtn = screen.getByTestId("drawer-close");
    const saveBtn = screen.getByTestId("drawer-save");

    // Initially focused on first focusable element (input)
    expect(input).toHaveFocus();

    // Tab from last focusable element (saveBtn) wraps to first focusable (input)
    saveBtn.focus();
    expect(saveBtn).toHaveFocus();
    fireEvent.keyDown(content, { key: "Tab" });
    expect(input).toHaveFocus();

    // Shift+Tab from first focusable element (input) wraps to last focusable (saveBtn)
    input.focus();
    fireEvent.keyDown(content, { key: "Tab", shiftKey: true });
    expect(saveBtn).toHaveFocus();
  });

  it("focuses initialFocusRef upon opening if provided", () => {
    const TestComponent = () => {
      const inputRef = React.useRef<HTMLInputElement | null>(null);
      return (
        <Drawer defaultOpen initialFocusRef={inputRef}>
          <DrawerPortal>
            <DrawerContent>
              <DrawerTitle>Title</DrawerTitle>
              <button type="button">First Button</button>
              <input ref={inputRef} data-testid="target-input" />
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      );
    };

    render(<TestComponent />);
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByTestId("target-input")).toHaveFocus();
  });

  it("manages reference-counted body scroll lock shared with Dialog", () => {
    expect(document.body.style.overflow).toBe("");

    const { rerender, unmount } = render(
      <Drawer open={true}>
        <DrawerPortal>
          <DrawerContent>
            <DrawerTitle>Drawer 1</DrawerTitle>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>,
    );

    expect(document.body.style.overflow).toBe("hidden");

    // Close
    rerender(
      <Drawer open={false}>
        <DrawerPortal>
          <DrawerContent>
            <DrawerTitle>Drawer 1</DrawerTitle>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>,
    );

    expect(document.body.style.overflow).toBe("");
    unmount();
  });

  it("supports Sheet alias identically to Drawer", () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Portal>
          <Sheet.Content data-testid="sheet-content">
            <Sheet.Header>
              <Sheet.Title>Sheet Title</Sheet.Title>
            </Sheet.Header>
          </Sheet.Content>
        </Sheet.Portal>
      </Sheet>,
    );

    expect(screen.getByTestId("sheet-content")).toBeInTheDocument();
  });

  it("passes axe-core accessibility checks with 0 violations", async () => {
    vi.useRealTimers();
    render(
      <main>
        <Drawer defaultOpen>
          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Accessible Drawer</DrawerTitle>
                <DrawerDescription>Accessible drawer description</DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <p>Content goes here.</p>
                <button type="button">Action</button>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose>Done</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </main>,
    );

    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });
});
