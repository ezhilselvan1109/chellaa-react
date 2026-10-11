import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  Dialog,
  Modal,
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "./Dialog";

describe("Dialog / Modal Component (SPEC-004)", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.style.overflow = "";
  });

  const renderStandardDialog = (props: Partial<React.ComponentProps<typeof DialogRoot>> = {}) => {
    return render(
      <DialogRoot defaultOpen={false} {...props}>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogPortal>
          <DialogOverlay data-testid="dialog-overlay">
            <DialogContent data-testid="dialog-content">
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>Dialog description text</DialogDescription>
              </DialogHeader>
              <DialogBody>
                <p>This is the dialog body.</p>
                <input data-testid="first-input" placeholder="First input" />
                <button type="button" data-testid="middle-button">Middle Button</button>
              </DialogBody>
              <DialogFooter>
                <DialogClose data-testid="close-button">Cancel</DialogClose>
                <button type="button" data-testid="confirm-button">Confirm</button>
              </DialogFooter>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </DialogRoot>
    );
  };

  it("FR-DLG-01: renders compound dialog structure correctly", async () => {
    renderStandardDialog({ defaultOpen: true });
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Dialog description text")).toBeInTheDocument();
    expect(screen.getByText("This is the dialog body.")).toBeInTheDocument();
    expect(screen.getByTestId("close-button")).toBeInTheDocument();
  });

  it("FR-DLG-02: exports Modal alias identical to Dialog", () => {
    expect(Modal).toBe(Dialog);
    expect(Modal.Root).toBe(Dialog.Root);
    expect(Modal.Trigger).toBe(Dialog.Trigger);
    expect(Modal.Content).toBe(Dialog.Content);
  });

  it("FR-DLG-03: supports controlled and uncontrolled open state", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onClose = vi.fn();

    const { rerender } = render(
      <DialogRoot isOpen={false} onClose={onClose}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogPortal>
          <DialogOverlay>
            <DialogContent>
              <DialogTitle>Controlled Modal</DialogTitle>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </DialogRoot>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(
      <DialogRoot isOpen={true} onClose={onClose}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogPortal>
          <DialogOverlay>
            <DialogContent>
              <DialogTitle>Controlled Modal</DialogTitle>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </DialogRoot>
    );

    act(() => {
      vi.runAllTimers();
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("FR-DLG-04: applies centered overlay class and static flex centering", () => {
    renderStandardDialog({ defaultOpen: true, isCentered: true });
    act(() => {
      vi.runAllTimers();
    });

    const overlay = screen.getByTestId("dialog-overlay");
    expect(overlay).toHaveClass("cl-dialog__overlay");
    expect(overlay).not.toHaveClass("cl-dialog__overlay--top");
  });

  it("FR-DLG-04: applies top-aligned class when isCentered is false", () => {
    renderStandardDialog({ defaultOpen: true, isCentered: false });
    act(() => {
      vi.runAllTimers();
    });

    const overlay = screen.getByTestId("dialog-overlay");
    const content = screen.getByTestId("dialog-content");
    expect(overlay).toHaveClass("cl-dialog__overlay--top");
    expect(content).toHaveClass("cl-dialog__content--top");
  });

  it("FR-DLG-05: traps Tab and Shift+Tab navigation within content", async () => {
    renderStandardDialog({ defaultOpen: true });
    act(() => {
      vi.runAllTimers();
    });

    const content = screen.getByTestId("dialog-content");
    const firstInput = screen.getByTestId("first-input");
    const confirmButton = screen.getByTestId("confirm-button");

    firstInput.focus();
    expect(document.activeElement).toBe(firstInput);

    // Shift+Tab from first focusable element should cycle to last focusable element
    fireEvent.keyDown(content, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(confirmButton);

    // Tab from last focusable element should cycle back to first focusable element
    fireEvent.keyDown(content, { key: "Tab", shiftKey: false });
    expect(document.activeElement).toBe(firstInput);
  });

  it("FR-DLG-06: focuses initialFocusRef element on open", async () => {
    const TestComponent = () => {
      const initialRef = React.useRef<HTMLInputElement | null>(null);
      return (
        <DialogRoot defaultOpen={true} initialFocusRef={initialRef}>
          <DialogPortal>
            <DialogOverlay>
              <DialogContent>
                <DialogTitle>Initial Focus</DialogTitle>
                <input placeholder="Ignored Input" />
                <input ref={initialRef} data-testid="target-input" placeholder="Target" />
              </DialogContent>
            </DialogOverlay>
          </DialogPortal>
        </DialogRoot>
      );
    };

    render(<TestComponent />);
    act(() => {
      vi.runAllTimers();
    });

    expect(document.activeElement).toBe(screen.getByTestId("target-input"));
  });

  it("FR-DLG-07: restores focus to trigger element on close", async () => {
    const { unmount } = render(
      <div>
        <button id="outside-button">Outside</button>
        <DialogRoot defaultOpen={false}>
          <DialogTrigger data-testid="trigger-btn">Open Dialog</DialogTrigger>
          <DialogPortal>
            <DialogOverlay>
              <DialogContent>
                <DialogTitle>Restore Focus</DialogTitle>
                <DialogClose data-testid="close-btn">Close</DialogClose>
              </DialogContent>
            </DialogOverlay>
          </DialogPortal>
        </DialogRoot>
      </div>
    );

    const triggerBtn = screen.getByTestId("trigger-btn");
    triggerBtn.focus();
    expect(document.activeElement).toBe(triggerBtn);

    // Click trigger to open
    fireEvent.click(triggerBtn);
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Click close button
    const closeBtn = screen.getByTestId("close-btn");
    fireEvent.click(closeBtn);
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(triggerBtn);
  });

  it("FR-DLG-08: dismisses on Escape", async () => {
    const onClose = vi.fn();
    renderStandardDialog({ defaultOpen: true, onClose });
    act(() => {
      vi.runAllTimers();
    });

    const content = screen.getByTestId("dialog-content");
    fireEvent.keyDown(content, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("FR-DLG-08: dismisses on backdrop click", async () => {
    const onClose = vi.fn();
    renderStandardDialog({ defaultOpen: true, onClose });
    act(() => {
      vi.runAllTimers();
    });

    const overlay = screen.getByTestId("dialog-overlay");
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("FR-DLG-08: does not dismiss on Escape if closeOnEsc is false", async () => {
    const onClose = vi.fn();
    renderStandardDialog({ defaultOpen: true, closeOnEsc: false, onClose });
    act(() => {
      vi.runAllTimers();
    });

    const content = screen.getByTestId("dialog-content");
    fireEvent.keyDown(content, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("FR-DLG-08: does not dismiss on overlay click if closeOnOverlayClick is false", async () => {
    const onClose = vi.fn();
    renderStandardDialog({ defaultOpen: true, closeOnOverlayClick: false, onClose });
    act(() => {
      vi.runAllTimers();
    });

    const overlay = screen.getByTestId("dialog-overlay");
    fireEvent.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("FR-DLG-09: locks and restores document.body overflow", () => {
    document.body.style.overflow = "auto";
    const { unmount } = renderStandardDialog({ defaultOpen: true });
    act(() => {
      vi.runAllTimers();
    });

    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("auto");
  });

  it("FR-DLG-10: sets aria-labelledby and aria-describedby accessibility relationships", () => {
    renderStandardDialog({ defaultOpen: true });
    act(() => {
      vi.runAllTimers();
    });

    const dialog = screen.getByRole("dialog");
    const title = screen.getByText("Dialog Title");
    const desc = screen.getByText("Dialog description text");

    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", title.id);
    expect(dialog).toHaveAttribute("aria-describedby", desc.id);
  });

  it("FR-DLG-10: passes axe-core accessibility audit with zero violations", async () => {
    const { container } = renderStandardDialog({ defaultOpen: true });
    act(() => {
      vi.runAllTimers();
    });

    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });

  it("FR-DLG-11: applies size modifier classes", () => {
    const sizes = ["sm", "md", "lg", "xl", "full"] as const;
    sizes.forEach((size) => {
      const { unmount } = renderStandardDialog({ defaultOpen: true, size });
      act(() => {
        vi.runAllTimers();
      });

      const content = screen.getByTestId("dialog-content");
      expect(content).toHaveClass(`cl-dialog__content--${size}`);
      unmount();
    });
  });
});
