import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
// Verify direct import from root package entry point
import {
  Portal,
  Slot,
  type PortalProps,
  type SlotProps,
} from "../index";

describe("Public Exports: Primitives (Portal & Slot)", () => {
  describe("Portal Public Export", () => {
    it("is exported as a valid React component from package index with proper prop typing", () => {
      const portalProps: PortalProps = {
        container: null,
      };
      expect(Portal).toBeDefined();
      expect(typeof Portal).toBe("function");
      expect(Portal.displayName).toBe("Portal");
      expect(portalProps.container).toBeNull();
    });

    it("renders into document.body and unmounts cleanly", () => {
      const { unmount } = render(
        <Portal>
          <div data-testid="public-portal-node">Public Portal Body</div>
        </Portal>,
      );

      const portalElement = screen.getByTestId("public-portal-node");
      expect(portalElement).toBeInTheDocument();
      expect(portalElement.parentElement).toBe(document.body);

      unmount();
      expect(screen.queryByTestId("public-portal-node")).not.toBeInTheDocument();
    });

    it("passes axe accessibility checks when rendered", async () => {
      const { container } = render(
        <main>
          <Portal>
            <div role="region" aria-label="Portal Region">
              Accessible Content
            </div>
          </Portal>
        </main>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Slot Public Export", () => {
    it("is exported as a forwardRef component from package index with proper prop typing", () => {
      const slotProps: SlotProps = {
        className: "test-slot",
      };
      expect(Slot).toBeDefined();
      expect(typeof Slot === "object" || typeof Slot === "function").toBe(true);
      expect(Slot.displayName).toBe("Slot");
      expect(slotProps.className).toBe("test-slot");
    });

    it("delegates props and merges classNames onto child element", () => {
      render(
        <Slot className="cl-custom-slot" id="slot-id">
          <button type="button" className="child-btn">
            Slotted Button
          </button>
        </Slot>,
      );

      const btn = screen.getByRole("button", { name: "Slotted Button" });
      expect(btn).toHaveClass("cl-custom-slot");
      expect(btn).toHaveClass("child-btn");
      expect(btn).toHaveAttribute("id", "slot-id");
    });

    it("composes event handlers and forwards refs cleanly", async () => {
      const user = userEvent.setup();
      const slotClick = vi.fn();
      const childClick = vi.fn();
      const ref = React.createRef<HTMLButtonElement>();

      render(
        <Slot ref={ref} onClick={slotClick}>
          <button type="button" onClick={childClick}>
            Action
          </button>
        </Slot>,
      );

      const btn = screen.getByRole("button", { name: "Action" });
      expect(ref.current).toBe(btn);

      await user.click(btn);
      expect(childClick).toHaveBeenCalledTimes(1);
      expect(slotClick).toHaveBeenCalledTimes(1);
    });

    it("passes axe accessibility checks without DOM pollution", async () => {
      const { container } = render(
        <Slot aria-label="Accessible Slot Action">
          <button type="button">Action</button>
        </Slot>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
