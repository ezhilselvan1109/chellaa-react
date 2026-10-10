import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { axe } from "vitest-axe";
import {
  Snackbar,
  Toast,
  ToastProvider,
  useToast,
  type ToastPosition,
  type ToastStatus,
} from "./index";

describe("Snackbar & Toast Component System", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ---------------------------------------------------------------------------
  // 1. Declarative Snackbar API
  // ---------------------------------------------------------------------------
  describe("Declarative Snackbar API", () => {
    it("renders nothing when isOpen is false", () => {
      render(
        <Snackbar
          isOpen={false}
          message="Background upload finished"
          data-testid="snackbar"
        />,
      );
      expect(screen.queryByText("Background upload finished")).not.toBeInTheDocument();
    });

    it("renders into portal when isOpen is true", () => {
      render(
        <Snackbar
          isOpen={true}
          message="File saved successfully"
          description="Your document is now up to date"
          status="success"
          data-testid="snackbar"
        />,
      );

      expect(screen.getByText("File saved successfully")).toBeInTheDocument();
      expect(
        screen.getByText("Your document is now up to date"),
      ).toBeInTheDocument();
      const toast = screen.getByRole("status");
      expect(toast).toHaveClass("cl-toast--success");
    });

    it("supports Toast alias identical to Snackbar", () => {
      render(
        <Toast
          isOpen={true}
          message="Alias toast rendered"
          data-testid="alias-toast"
        />,
      );
      expect(screen.getByText("Alias toast rendered")).toBeInTheDocument();
    });

    it("auto-dismisses after duration in declarative mode", () => {
      vi.useFakeTimers();
      const handleClose = vi.fn();
      render(
        <Snackbar
          isOpen={true}
          message="Auto dismiss test"
          duration={3000}
          onClose={handleClose}
        />,
      );

      expect(screen.getByText("Auto dismiss test")).toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(2999);
      });
      expect(handleClose).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(2);
      });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("fires manual dismiss when close button is clicked", () => {
      const handleClose = vi.fn();
      render(
        <Snackbar
          isOpen={true}
          message="Manual close"
          isClosable={true}
          onClose={handleClose}
        />,
      );

      const closeBtn = screen.getByRole("button", { name: "Dismiss" });
      fireEvent.click(closeBtn);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("renders action button and triggers handler", () => {
      const handleAction = vi.fn();
      render(
        <Snackbar
          isOpen={true}
          message="Item deleted"
          action={
            <button type="button" onClick={handleAction}>
              Undo
            </button>
          }
        />,
      );

      const undoBtn = screen.getByRole("button", { name: "Undo" });
      fireEvent.click(undoBtn);
      expect(handleAction).toHaveBeenCalledTimes(1);
    });

    it("forwards ref to toast container div", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Snackbar ref={ref} isOpen={true} message="Ref test" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Imperative useToast Hook API
  // ---------------------------------------------------------------------------
  describe("Imperative useToast Hook API", () => {
    function TestHookComponent({
      onReady,
    }: {
      onReady?: (toast: ReturnType<typeof useToast>) => void;
    }) {
      const toast = useToast();
      React.useEffect(() => {
        onReady?.(toast);
      }, [onReady, toast]);

      return (
        <button
          type="button"
          onClick={() =>
            toast({
              title: "Triggered Toast",
              description: "Triggered detail copy",
              status: "info",
            })
          }
        >
          Trigger
        </button>
      );
    }

    it("throws helpful error when useToast is invoked outside ToastProvider", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      expect(() => render(<TestHookComponent />)).toThrowError(
        "useToast must be used within a <ToastProvider>",
      );
      consoleSpy.mockRestore();
    });

    it("creates a toast imperatively on button click", () => {
      render(
        <ToastProvider>
          <TestHookComponent />
        </ToastProvider>,
      );

      fireEvent.click(screen.getByRole("button", { name: "Trigger" }));
      expect(screen.getByText("Triggered Toast")).toBeInTheDocument();
      expect(screen.getByText("Triggered detail copy")).toBeInTheDocument();
    });

    it("auto-dismisses toast after default 5000ms duration", () => {
      vi.useFakeTimers();
      render(
        <ToastProvider>
          <TestHookComponent />
        </ToastProvider>,
      );

      fireEvent.click(screen.getByRole("button", { name: "Trigger" }));
      expect(screen.getByText("Triggered Toast")).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(4999);
      });
      expect(screen.getByText("Triggered Toast")).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(2);
      });
      expect(screen.queryByText("Triggered Toast")).not.toBeInTheDocument();
    });

    it("allows manual close(id)", () => {
      let toastApi!: ReturnType<typeof useToast>;
      render(
        <ToastProvider>
          <TestHookComponent onReady={(t) => (toastApi = t)} />
        </ToastProvider>,
      );

      let id = "";
      act(() => {
        id = toastApi({ title: "Closeable Toast" });
      });
      expect(screen.getByText("Closeable Toast")).toBeInTheDocument();
      expect(toastApi.isActive(id)).toBe(true);

      act(() => {
        toastApi.close(id);
      });
      expect(screen.queryByText("Closeable Toast")).not.toBeInTheDocument();
      expect(toastApi.isActive(id)).toBe(false);
    });

    it("allows closeAll() to clear all active toasts", () => {
      let toastApi!: ReturnType<typeof useToast>;
      render(
        <ToastProvider>
          <TestHookComponent onReady={(t) => (toastApi = t)} />
        </ToastProvider>,
      );

      act(() => {
        toastApi({ title: "Toast 1" });
        toastApi({ title: "Toast 2" });
        toastApi({ title: "Toast 3" });
      });

      expect(screen.getByText("Toast 1")).toBeInTheDocument();
      expect(screen.getByText("Toast 2")).toBeInTheDocument();
      expect(screen.getByText("Toast 3")).toBeInTheDocument();

      act(() => {
        toastApi.closeAll();
      });

      expect(screen.queryByText("Toast 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Toast 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Toast 3")).not.toBeInTheDocument();
    });

    it("allows update(id, options) to mutate an active toast", () => {
      let toastApi!: ReturnType<typeof useToast>;
      render(
        <ToastProvider>
          <TestHookComponent onReady={(t) => (toastApi = t)} />
        </ToastProvider>,
      );

      let id = "";
      act(() => {
        id = toastApi({ title: "Initial Title", status: "info" });
      });
      expect(screen.getByText("Initial Title")).toBeInTheDocument();

      act(() => {
        toastApi.update(id, {
          title: "Updated Title",
          status: "success",
        });
      });

      expect(screen.queryByText("Initial Title")).not.toBeInTheDocument();
      expect(screen.getByText("Updated Title")).toBeInTheDocument();
      expect(screen.getByRole("status")).toHaveClass("cl-toast--success");
    });

    it("does not auto-dismiss when duration is null (persistent)", () => {
      vi.useFakeTimers();
      let toastApi!: ReturnType<typeof useToast>;
      render(
        <ToastProvider>
          <TestHookComponent onReady={(t) => (toastApi = t)} />
        </ToastProvider>,
      );

      act(() => {
        toastApi({ title: "Persistent Notification", duration: null });
      });

      expect(screen.getByText("Persistent Notification")).toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(60000); // 1 minute
      });
      expect(screen.getByText("Persistent Notification")).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Timing Adjustability (WCAG 2.2 SC 2.2.1 Pause on Hover/Focus)
  // ---------------------------------------------------------------------------
  describe("Timing Adjustability (WCAG SC 2.2.1)", () => {
    it("pauses countdown timer when pointer enters and resumes when pointer leaves", () => {
      vi.useFakeTimers();
      let toastApi!: ReturnType<typeof useToast>;
      function HookConsumer() {
        const toast = useToast();
        toastApi = toast;
        return null;
      }

      render(
        <ToastProvider>
          <HookConsumer />
        </ToastProvider>,
      );

      act(() => {
        toastApi({ title: "Hover Pause", duration: 5000 });
      });

      const toastElem = screen.getByRole("status");

      // Advance 2000ms (3000ms remaining)
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(screen.getByText("Hover Pause")).toBeInTheDocument();

      // Mouse enter pauses
      fireEvent.mouseEnter(toastElem);

      // Advance 5000ms while hovered
      act(() => {
        vi.advanceTimersByTime(5000);
      });
      expect(screen.getByText("Hover Pause")).toBeInTheDocument();

      // Mouse leave resumes
      fireEvent.mouseLeave(toastElem);

      // Advance 2999ms (not dismissed yet)
      act(() => {
        vi.advanceTimersByTime(2999);
      });
      expect(screen.getByText("Hover Pause")).toBeInTheDocument();

      // Final 2ms triggers dismiss
      act(() => {
        vi.advanceTimersByTime(2);
      });
      expect(screen.queryByText("Hover Pause")).not.toBeInTheDocument();
    });

    it("pauses countdown timer when focused and resumes when blurred", () => {
      vi.useFakeTimers();
      let toastApi!: ReturnType<typeof useToast>;
      function HookConsumer() {
        const toast = useToast();
        toastApi = toast;
        return null;
      }

      render(
        <ToastProvider>
          <HookConsumer />
        </ToastProvider>,
      );

      act(() => {
        toastApi({ title: "Focus Pause", duration: 4000 });
      });

      const toastElem = screen.getByRole("status");

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Focus pauses
      fireEvent.focus(toastElem);
      act(() => {
        vi.advanceTimersByTime(5000);
      });
      expect(screen.getByText("Focus Pause")).toBeInTheDocument();

      // Blur resumes
      fireEvent.blur(toastElem);
      act(() => {
        vi.advanceTimersByTime(3001);
      });
      expect(screen.queryByText("Focus Pause")).not.toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Viewport Positions & Stacking Limits
  // ---------------------------------------------------------------------------
  describe("Viewport Positions & Stacking Limits", () => {
    const positions: ToastPosition[] = [
      "top",
      "top-left",
      "top-right",
      "bottom",
      "bottom-left",
      "bottom-right",
    ];

    positions.forEach((pos) => {
      it(`renders toast container for position '${pos}'`, () => {
        render(
          <Snackbar
            isOpen={true}
            position={pos}
            message={`Position ${pos}`}
            data-testid={`toast-${pos}`}
          />,
        );

        const container = document.querySelector(`.cl-toast-container--${pos}`);
        expect(container).toBeInTheDocument();
        expect(screen.getByText(`Position ${pos}`)).toBeInTheDocument();
      });
    });

    it("enforces maxVisibleToasts queue limit by dismissing oldest in position", () => {
      let toastApi!: ReturnType<typeof useToast>;
      function HookConsumer() {
        const toast = useToast();
        toastApi = toast;
        return null;
      }

      render(
        <ToastProvider maxVisibleToasts={3}>
          <HookConsumer />
        </ToastProvider>,
      );

      act(() => {
        toastApi({ title: "Toast 1", position: "bottom-right", duration: null });
        toastApi({ title: "Toast 2", position: "bottom-right", duration: null });
        toastApi({ title: "Toast 3", position: "bottom-right", duration: null });
      });

      expect(screen.getByText("Toast 1")).toBeInTheDocument();
      expect(screen.getByText("Toast 2")).toBeInTheDocument();
      expect(screen.getByText("Toast 3")).toBeInTheDocument();

      // Adding 4th should push out the oldest (Toast 1)
      act(() => {
        toastApi({ title: "Toast 4", position: "bottom-right", duration: null });
      });

      expect(screen.queryByText("Toast 1")).not.toBeInTheDocument();
      expect(screen.getByText("Toast 2")).toBeInTheDocument();
      expect(screen.getByText("Toast 3")).toBeInTheDocument();
      expect(screen.getByText("Toast 4")).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Semantic Statuses & Live Regions
  // ---------------------------------------------------------------------------
  describe("Semantic Statuses & Live Regions", () => {
    it("sets role='alert' and aria-live='assertive' when status is danger", () => {
      render(
        <Snackbar
          isOpen={true}
          status="danger"
          message="Server connection failed"
        />,
      );

      const toast = screen.getByRole("alert");
      expect(toast).toHaveAttribute("aria-live", "assertive");
      expect(toast).toHaveClass("cl-toast--danger");
    });

    const nonCriticalStatuses: ToastStatus[] = [
      "info",
      "success",
      "warning",
      "neutral",
    ];
    nonCriticalStatuses.forEach((st) => {
      it(`sets role='status' and aria-live='polite' for status '${st}'`, () => {
        render(
          <Snackbar
            isOpen={true}
            status={st}
            message={`Status ${st}`}
          />,
        );

        const toast = screen.getByRole("status");
        expect(toast).toHaveAttribute("aria-live", "polite");
        expect(toast).toHaveClass(`cl-toast--${st}`);
      });
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Cleanup on Unmount
  // ---------------------------------------------------------------------------
  describe("Cleanup on Unmount", () => {
    it("clears active timers cleanly when provider unmounts", () => {
      vi.useFakeTimers();
      let toastApi!: ReturnType<typeof useToast>;
      function HookConsumer() {
        const toast = useToast();
        toastApi = toast;
        return null;
      }

      const { unmount } = render(
        <ToastProvider>
          <HookConsumer />
        </ToastProvider>,
      );

      act(() => {
        toastApi({ title: "Unmount Test", duration: 5000 });
      });
      expect(screen.getByText("Unmount Test")).toBeInTheDocument();

      unmount();
      // Should not throw or perform state updates after unmount
      act(() => {
        vi.advanceTimersByTime(10000);
      });
    });
  });

  // ---------------------------------------------------------------------------
  // 7. Accessibility Audits (axe-core)
  // ---------------------------------------------------------------------------
  describe("Accessibility Audits (axe-core)", () => {
    it("has zero axe violations for default info toast", async () => {
      const { container } = render(
        <Snackbar
          isOpen={true}
          status="info"
          message="Account updated"
          description="Your profile changes have been applied"
        />,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for danger toast with action", async () => {
      const { container } = render(
        <Snackbar
          isOpen={true}
          status="danger"
          message="Disk space critical"
          action={<button type="button">Manage</button>}
        />,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations across all 6 viewport positions", async () => {
      const positions: ToastPosition[] = [
        "top",
        "top-left",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-right",
      ];

      for (const pos of positions) {
        const { container } = render(
          <Snackbar
            isOpen={true}
            position={pos}
            status="success"
            message={`Position ${pos}`}
          />,
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });
  });
});
