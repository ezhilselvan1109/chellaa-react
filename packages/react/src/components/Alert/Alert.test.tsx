import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import {
  Alert,
  AlertRoot,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertAction,
  AlertCloseButton,
  AlertBody,
  useAlertContext,
} from "./Alert";

describe("Alert Component", () => {
  // ---------------------------------------------------------------------------
  // 1. Rendering & Compound Composition
  // ---------------------------------------------------------------------------
  describe("Rendering & Compound Composition", () => {
    it("renders Alert with complete compound structure", () => {
      render(
        <Alert status="info" variant="subtle" data-testid="alert-root">
          <Alert.Icon data-testid="alert-icon" />
          <Alert.Body data-testid="alert-body">
            <Alert.Title data-testid="alert-title">System Update</Alert.Title>
            <Alert.Description data-testid="alert-desc">
              A new update is available.
            </Alert.Description>
          </Alert.Body>
          <Alert.Action data-testid="alert-action">
            <button type="button">Update now</button>
          </Alert.Action>
          <Alert.CloseButton data-testid="alert-close" />
        </Alert>,
      );

      const root = screen.getByTestId("alert-root");
      expect(root).toBeInTheDocument();
      expect(root).toHaveClass("cl-alert", "cl-alert--info", "cl-alert--subtle");

      expect(screen.getByTestId("alert-icon")).toBeInTheDocument();
      expect(screen.getByTestId("alert-body")).toHaveClass("cl-alert__body");
      expect(screen.getByTestId("alert-title")).toHaveTextContent("System Update");
      expect(screen.getByTestId("alert-desc")).toHaveTextContent(
        "A new update is available.",
      );
      expect(screen.getByTestId("alert-action")).toHaveClass("cl-alert__action");
      expect(screen.getByTestId("alert-close")).toBeInTheDocument();
    });

    it("renders simple alert with text and auto-renders close button when isClosable is true", () => {
      const handleClose = vi.fn();
      render(
        <Alert isClosable onClose={handleClose} data-testid="simple-alert">
          Simple notice message
        </Alert>,
      );

      const root = screen.getByTestId("simple-alert");
      expect(root).toHaveTextContent("Simple notice message");
      const closeButton = screen.getByRole("button", { name: "Close alert" });
      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("does not render duplicate close button if Alert.CloseButton is explicitly provided with isClosable", () => {
      render(
        <Alert isClosable>
          <Alert.Title>Notice</Alert.Title>
          <Alert.CloseButton data-testid="custom-close" />
        </Alert>,
      );

      const closeButtons = screen.getAllByRole("button", { name: "Close alert" });
      expect(closeButtons).toHaveLength(1);
    });

    it("throws informative error when useAlertContext is called outside provider", () => {
      function OrphanSubcomponent() {
        useAlertContext();
        return null;
      }

      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      expect(() => render(<OrphanSubcomponent />)).toThrowError(
        "Alert compound subcomponents must be rendered within an <Alert> or <Alert.Root>",
      );
      consoleSpy.mockRestore();
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Semantic Statuses & Live Regions
  // ---------------------------------------------------------------------------
  describe("Semantic Statuses & Live Regions", () => {
    it("sets role='alert' and aria-live='assertive' when status is danger", () => {
      render(
        <Alert status="danger" data-testid="danger-alert">
          <Alert.Title>Critical Failure</Alert.Title>
        </Alert>,
      );

      const root = screen.getByTestId("danger-alert");
      expect(root).toHaveAttribute("role", "alert");
      expect(root).toHaveAttribute("aria-live", "assertive");
      expect(root).toHaveClass("cl-alert--danger");
    });

    it("sets role='status' and aria-live='polite' when status is info", () => {
      render(
        <Alert status="info" data-testid="info-alert">
          <Alert.Title>Notice</Alert.Title>
        </Alert>,
      );

      const root = screen.getByTestId("info-alert");
      expect(root).toHaveAttribute("role", "status");
      expect(root).toHaveAttribute("aria-live", "polite");
      expect(root).toHaveClass("cl-alert--info");
    });

    it("sets role='status' and aria-live='polite' when status is success", () => {
      render(
        <Alert status="success" data-testid="success-alert">
          <Alert.Title>Completed</Alert.Title>
        </Alert>,
      );

      const root = screen.getByTestId("success-alert");
      expect(root).toHaveAttribute("role", "status");
      expect(root).toHaveAttribute("aria-live", "polite");
      expect(root).toHaveClass("cl-alert--success");
    });

    it("sets role='status' and aria-live='polite' when status is warning", () => {
      render(
        <Alert status="warning" data-testid="warning-alert">
          <Alert.Title>Heads up</Alert.Title>
        </Alert>,
      );

      const root = screen.getByTestId("warning-alert");
      expect(root).toHaveAttribute("role", "status");
      expect(root).toHaveAttribute("aria-live", "polite");
      expect(root).toHaveClass("cl-alert--warning");
    });

    it("sets role='status' and aria-live='polite' when status is neutral", () => {
      render(
        <Alert status="neutral" data-testid="neutral-alert">
          <Alert.Title>Neutral notice</Alert.Title>
        </Alert>,
      );

      const root = screen.getByTestId("neutral-alert");
      expect(root).toHaveAttribute("role", "status");
      expect(root).toHaveAttribute("aria-live", "polite");
      expect(root).toHaveClass("cl-alert--neutral");
    });

    it("allows caller to override role and aria-live via props", () => {
      render(
        <Alert
          status="danger"
          role="region"
          aria-live="off"
          data-testid="custom-role-alert"
        >
          <Alert.Title>Custom announcement</Alert.Title>
        </Alert>,
      );

      const root = screen.getByTestId("custom-role-alert");
      expect(root).toHaveAttribute("role", "region");
      expect(root).toHaveAttribute("aria-live", "off");
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Visual Variants & Styling
  // ---------------------------------------------------------------------------
  describe("Visual Variants & Styling", () => {
    it("renders subtle variant by default", () => {
      render(<Alert data-testid="default-variant">Default</Alert>);
      expect(screen.getByTestId("default-variant")).toHaveClass("cl-alert--subtle");
    });

    it("renders solid variant modifier class", () => {
      render(<Alert variant="solid" data-testid="solid-variant">Solid</Alert>);
      expect(screen.getByTestId("solid-variant")).toHaveClass("cl-alert--solid");
    });

    it("renders outline variant modifier class", () => {
      render(<Alert variant="outline" data-testid="outline-variant">Outline</Alert>);
      expect(screen.getByTestId("outline-variant")).toHaveClass("cl-alert--outline");
    });

    it("renders left-accent variant modifier class", () => {
      render(
        <Alert variant="left-accent" data-testid="left-accent-variant">
          Left Accent
        </Alert>,
      );
      expect(screen.getByTestId("left-accent-variant")).toHaveClass(
        "cl-alert--left-accent",
      );
    });

    it("merges custom className and style props", () => {
      render(
        <Alert
          className="custom-user-class"
          style={{ maxWidth: 400 }}
          data-testid="styled-alert"
        >
          Custom
        </Alert>,
      );

      const root = screen.getByTestId("styled-alert");
      expect(root).toHaveClass("cl-alert", "custom-user-class");
      expect(root).toHaveStyle({ maxWidth: "400px" });
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Icons & Overrides
  // ---------------------------------------------------------------------------
  describe("Icons & Overrides", () => {
    it("renders default semantic SVG icon for info status", () => {
      const { container } = render(
        <Alert status="info">
          <Alert.Icon />
          <Alert.Title>Title</Alert.Title>
        </Alert>,
      );

      const icon = container.querySelector(".cl-alert__icon");
      expect(icon).toBeInTheDocument();
      expect(icon?.tagName.toLowerCase()).toBe("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("renders custom icon element via icon prop", () => {
      render(
        <Alert status="info">
          <Alert.Icon
            icon={<span data-testid="custom-icon-prop">★</span>}
            data-testid="icon-wrapper"
          />
          <Alert.Title>Title</Alert.Title>
        </Alert>,
      );

      expect(screen.getByTestId("custom-icon-prop")).toBeInTheDocument();
    });

    it("renders custom icon element via children", () => {
      render(
        <Alert status="info">
          <Alert.Icon>
            <span data-testid="custom-icon-child">🔔</span>
          </Alert.Icon>
          <Alert.Title>Title</Alert.Title>
        </Alert>,
      );

      expect(screen.getByTestId("custom-icon-child")).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Dismissibility & Action Behavior
  // ---------------------------------------------------------------------------
  describe("Dismissibility & Action Behavior", () => {
    it("renders accessible close button with default aria-label='Close alert'", () => {
      render(
        <Alert>
          <Alert.Title>Notice</Alert.Title>
          <Alert.CloseButton />
        </Alert>,
      );

      const button = screen.getByRole("button", { name: "Close alert" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "button");
    });

    it("unmounts uncontrolled alert when close button is clicked", () => {
      render(
        <Alert data-testid="uncontrolled-alert">
          <Alert.Title>Removable notice</Alert.Title>
          <Alert.CloseButton />
        </Alert>,
      );

      expect(screen.getByTestId("uncontrolled-alert")).toBeInTheDocument();
      const button = screen.getByRole("button", { name: "Close alert" });
      fireEvent.click(button);
      expect(screen.queryByTestId("uncontrolled-alert")).not.toBeInTheDocument();
    });

    it("invokes onClose callback when close button is clicked", () => {
      const handleClose = vi.fn();
      render(
        <Alert onClose={handleClose}>
          <Alert.Title>Controlled</Alert.Title>
          <Alert.CloseButton />
        </Alert>,
      );

      const button = screen.getByRole("button", { name: "Close alert" });
      fireEvent.click(button);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("prevents multiple onClose callback calls on rapid multi-click", () => {
      const handleClose = vi.fn();
      render(
        <Alert onClose={handleClose}>
          <Alert.Title>Multi-click test</Alert.Title>
          <Alert.CloseButton />
        </Alert>,
      );

      const button = screen.getByRole("button", { name: "Close alert" });
      fireEvent.click(button);
      fireEvent.click(button);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("allows custom aria-label and custom children on Alert.CloseButton", () => {
      render(
        <Alert>
          <Alert.Title>Notice</Alert.Title>
          <Alert.CloseButton aria-label="Dismiss this announcement">
            Dismiss
          </Alert.CloseButton>
        </Alert>,
      );

      const button = screen.getByRole("button", {
        name: "Dismiss this announcement",
      });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Dismiss");
    });

    it("renders action slot and dispatches action click event", () => {
      const handleAction = vi.fn();
      render(
        <Alert>
          <Alert.Title>Action needed</Alert.Title>
          <Alert.Action>
            <button type="button" onClick={handleAction}>
              Retry
            </button>
          </Alert.Action>
        </Alert>,
      );

      const actionButton = screen.getByRole("button", { name: "Retry" });
      fireEvent.click(actionButton);
      expect(handleAction).toHaveBeenCalledTimes(1);
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Keyboard Interactions
  // ---------------------------------------------------------------------------
  describe("Keyboard Interactions", () => {
    it("activates close button and dismisses alert when pressing Enter", () => {
      const handleClose = vi.fn();
      render(
        <Alert onClose={handleClose}>
          <Alert.Title>Keyboard Alert</Alert.Title>
          <Alert.CloseButton />
        </Alert>,
      );

      const button = screen.getByRole("button", { name: "Close alert" });
      button.focus();
      expect(document.activeElement).toBe(button);

      fireEvent.click(button);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  // ---------------------------------------------------------------------------
  // 7. Polymorphism & Slot Delegation
  // ---------------------------------------------------------------------------
  describe("Polymorphism & Slot Delegation", () => {
    it("supports asChild delegation to custom element via Slot", () => {
      render(
        <Alert asChild status="warning" data-testid="slot-section">
          <section>
            <Alert.Title>Section Alert</Alert.Title>
          </section>
        </Alert>,
      );

      const section = screen.getByTestId("slot-section");
      expect(section.tagName.toLowerCase()).toBe("section");
      expect(section).toHaveAttribute("role", "status");
      expect(section).toHaveAttribute("aria-live", "polite");
      expect(section).toHaveClass("cl-alert", "cl-alert--warning");
    });
  });

  // ---------------------------------------------------------------------------
  // 8. Ref Forwarding
  // ---------------------------------------------------------------------------
  describe("Ref Forwarding", () => {
    it("forwards ref to Alert.Root HTMLDivElement", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Alert ref={ref}>Content</Alert>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref to Alert.Icon SVGSVGElement", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(
        <Alert>
          <Alert.Icon ref={ref} />
        </Alert>,
      );
      expect(ref.current).toBeInstanceOf(SVGSVGElement);
    });

    it("forwards ref to Alert.Title HTMLHeadingElement", () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(
        <Alert>
          <Alert.Title ref={ref}>Title</Alert.Title>
        </Alert>,
      );
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });

    it("forwards ref to Alert.Description HTMLParagraphElement", () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(
        <Alert>
          <Alert.Description ref={ref}>Description</Alert.Description>
        </Alert>,
      );
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it("forwards ref to Alert.CloseButton HTMLButtonElement", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Alert>
          <Alert.CloseButton ref={ref} />
        </Alert>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("forwards ref to Alert.Action HTMLDivElement", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Alert>
          <Alert.Action ref={ref}>Action</Alert.Action>
        </Alert>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref to Alert.Body HTMLDivElement", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Alert>
          <Alert.Body ref={ref}>Body</Alert.Body>
        </Alert>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  // ---------------------------------------------------------------------------
  // 9. Accessibility Audits (axe-core)
  // ---------------------------------------------------------------------------
  describe("Accessibility Audits (axe-core)", () => {
    it("has zero axe violations for info status alert", async () => {
      const { container } = render(
        <Alert status="info">
          <Alert.Icon />
          <Alert.Body>
            <Alert.Title>Info Alert</Alert.Title>
            <Alert.Description>This is informative details.</Alert.Description>
          </Alert.Body>
          <Alert.CloseButton />
        </Alert>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for success status alert", async () => {
      const { container } = render(
        <Alert status="success">
          <Alert.Icon />
          <Alert.Body>
            <Alert.Title>Operation Completed</Alert.Title>
            <Alert.Description>All tasks completed successfully.</Alert.Description>
          </Alert.Body>
          <Alert.CloseButton />
        </Alert>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for warning status alert", async () => {
      const { container } = render(
        <Alert status="warning">
          <Alert.Icon />
          <Alert.Body>
            <Alert.Title>Pending Expiration</Alert.Title>
            <Alert.Description>Your plan expires in 3 days.</Alert.Description>
          </Alert.Body>
          <Alert.CloseButton />
        </Alert>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for danger status alert", async () => {
      const { container } = render(
        <Alert status="danger">
          <Alert.Icon />
          <Alert.Body>
            <Alert.Title>Connection Lost</Alert.Title>
            <Alert.Description>
              Unable to reach server. Please retry.
            </Alert.Description>
          </Alert.Body>
          <Alert.CloseButton />
        </Alert>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations across all 4 visual variants", async () => {
      const { container } = render(
        <div>
          <Alert variant="subtle" status="info">
            <Alert.Title>Subtle</Alert.Title>
            <Alert.Description>Subtle variant description</Alert.Description>
          </Alert>
          <Alert variant="solid" status="success">
            <Alert.Title>Solid</Alert.Title>
            <Alert.Description>Solid variant description</Alert.Description>
          </Alert>
          <Alert variant="outline" status="warning">
            <Alert.Title>Outline</Alert.Title>
            <Alert.Description>Outline variant description</Alert.Description>
          </Alert>
          <Alert variant="left-accent" status="danger">
            <Alert.Title>Left Accent</Alert.Title>
            <Alert.Description>Left accent variant description</Alert.Description>
          </Alert>
        </div>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
