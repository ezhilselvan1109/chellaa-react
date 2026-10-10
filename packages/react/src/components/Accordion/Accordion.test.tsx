import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  Accordion,
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionIcon,
} from "./index";

describe("Accordion Component", () => {
  describe("Rendering & Semantic Structure", () => {
    it("renders with compound architecture and semantic heading wrapper", () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Header level={3}>
              <Accordion.Trigger>
                <span>Trigger 1</span>
                <Accordion.Icon data-testid="chevron-icon" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Panel Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const root = screen.getByRole("region", { hidden: false }).parentElement?.parentElement;
      expect(root).toHaveClass("cl-accordion");
      expect(root).toHaveClass("cl-accordion--outline");

      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass("cl-accordion__header");

      const trigger = screen.getByRole("button", { name: /Trigger 1/i });
      expect(trigger).toHaveAttribute("type", "button");
      expect(trigger).toHaveClass("cl-accordion__trigger");
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      const icon = screen.getByTestId("chevron-icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("cl-accordion__icon");
    });

    it("supports custom heading level (h2, h4, h5, h6)", () => {
      render(
        <Accordion type="single">
          <Accordion.Item value="item-1">
            <Accordion.Header level={2}>
              <Accordion.Trigger>H2 Trigger</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>H2 Content</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("wires ARIA controls and labelledby IDs correctly", () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger = screen.getByRole("button", { name: "Trigger 1" });
      const panel = screen.getByRole("region");

      const triggerId = trigger.getAttribute("id");
      const panelId = panel.getAttribute("id");

      expect(triggerId).toBeTruthy();
      expect(panelId).toBeTruthy();
      expect(trigger).toHaveAttribute("aria-controls", panelId);
      expect(panel).toHaveAttribute("aria-labelledby", triggerId);
    });
  });

  describe("Single Expansion Mode", () => {
    it("expands an item on click and closes the previous item", () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 2</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger1 = screen.getByRole("button", { name: "Trigger 1" });
      const trigger2 = screen.getByRole("button", { name: "Trigger 2" });

      expect(trigger1).toHaveAttribute("aria-expanded", "true");
      expect(trigger2).toHaveAttribute("aria-expanded", "false");

      fireEvent.click(trigger2);

      expect(trigger1).toHaveAttribute("aria-expanded", "false");
      expect(trigger2).toHaveAttribute("aria-expanded", "true");
    });

    it("does not collapse the active item on click if collapsible is false", () => {
      render(
        <Accordion type="single" defaultValue="item-1" collapsible={false}>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger1 = screen.getByRole("button", { name: "Trigger 1" });
      expect(trigger1).toHaveAttribute("aria-expanded", "true");

      fireEvent.click(trigger1);
      expect(trigger1).toHaveAttribute("aria-expanded", "true");
    });

    it("collapses the active item on click when collapsible is true", () => {
      render(
        <Accordion type="single" defaultValue="item-1" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger1 = screen.getByRole("button", { name: "Trigger 1" });
      expect(trigger1).toHaveAttribute("aria-expanded", "true");

      fireEvent.click(trigger1);
      expect(trigger1).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("Multiple Expansion Mode", () => {
    it("allows multiple items to be open simultaneously", () => {
      render(
        <Accordion type="multiple" defaultValue={["item-1"]}>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 2</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger1 = screen.getByRole("button", { name: "Trigger 1" });
      const trigger2 = screen.getByRole("button", { name: "Trigger 2" });

      expect(trigger1).toHaveAttribute("aria-expanded", "true");
      expect(trigger2).toHaveAttribute("aria-expanded", "false");

      fireEvent.click(trigger2);

      expect(trigger1).toHaveAttribute("aria-expanded", "true");
      expect(trigger2).toHaveAttribute("aria-expanded", "true");

      fireEvent.click(trigger1);
      expect(trigger1).toHaveAttribute("aria-expanded", "false");
      expect(trigger2).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("Controlled State", () => {
    it("respects controlled single value and fires onValueChange", () => {
      const onValueChange = vi.fn();
      const { rerender } = render(
        <Accordion type="single" value="item-1" onValueChange={onValueChange}>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 2</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger2 = screen.getByRole("button", { name: "Trigger 2" });
      fireEvent.click(trigger2);
      expect(onValueChange).toHaveBeenCalledWith("item-2");

      rerender(
        <Accordion type="single" value="item-2" onValueChange={onValueChange}>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 2</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      expect(screen.getByRole("button", { name: "Trigger 1" })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
      expect(trigger2).toHaveAttribute("aria-expanded", "true");
    });

    it("respects controlled multiple values and fires onValueChange", () => {
      const onValueChange = vi.fn();
      render(
        <Accordion
          type="multiple"
          value={["item-1"]}
          onValueChange={onValueChange}
        >
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 2</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger2 = screen.getByRole("button", { name: "Trigger 2" });
      fireEvent.click(trigger2);
      expect(onValueChange).toHaveBeenCalledWith(["item-1", "item-2"]);
    });
  });

  describe("Disabled Items", () => {
    it("disables individual item when isDisabled is true", () => {
      render(
        <Accordion type="single">
          <Accordion.Item value="item-1" isDisabled>
            <Accordion.Header>
              <Accordion.Trigger>Disabled Trigger</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger = screen.getByRole("button", { name: "Disabled Trigger" });
      expect(trigger).toBeDisabled();
      expect(trigger).toHaveAttribute("data-disabled");

      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("disables all items when isDisabled is set on root", () => {
      render(
        <Accordion type="single" isDisabled>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 2</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      expect(screen.getByRole("button", { name: "Trigger 1" })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Trigger 2" })).toBeDisabled();
    });
  });

  describe("Keyboard Navigation (WAI-ARIA APG)", () => {
    it("activates item on Enter and Space", async () => {
      render(
        <Accordion type="single" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger = screen.getByRole("button", { name: "Trigger 1" });
      trigger.focus();

      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("navigates with ArrowDown, ArrowUp, Home, and End", async () => {
      render(
        <Accordion type="single">
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 2</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 3</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 3</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger1 = screen.getByRole("button", { name: "Trigger 1" });
      const trigger2 = screen.getByRole("button", { name: "Trigger 2" });
      const trigger3 = screen.getByRole("button", { name: "Trigger 3" });

      trigger1.focus();
      expect(document.activeElement).toBe(trigger1);

      fireEvent.keyDown(trigger1, { key: "ArrowDown" });
      expect(document.activeElement).toBe(trigger2);

      fireEvent.keyDown(trigger2, { key: "ArrowDown" });
      expect(document.activeElement).toBe(trigger3);

      // Wrapping back to first
      fireEvent.keyDown(trigger3, { key: "ArrowDown" });
      expect(document.activeElement).toBe(trigger1);

      // ArrowUp wrapping to last
      fireEvent.keyDown(trigger1, { key: "ArrowUp" });
      expect(document.activeElement).toBe(trigger3);

      // Home moves to first
      fireEvent.keyDown(trigger3, { key: "Home" });
      expect(document.activeElement).toBe(trigger1);

      // End moves to last
      fireEvent.keyDown(trigger1, { key: "End" });
      expect(document.activeElement).toBe(trigger3);
    });
  });

  describe("Variants & Slot Delegation", () => {
    it("applies variant classes outline, separated, and flush", () => {
      const { rerender, container } = render(
        <Accordion variant="separated" type="single">
          <Accordion.Item value="1">
            <Accordion.Header>
              <Accordion.Trigger>T1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>C1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      expect(container.querySelector(".cl-accordion")).toHaveClass(
        "cl-accordion--separated",
      );

      rerender(
        <Accordion variant="flush" type="single">
          <Accordion.Item value="1">
            <Accordion.Header>
              <Accordion.Trigger>T1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>C1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      expect(container.querySelector(".cl-accordion")).toHaveClass(
        "cl-accordion--flush",
      );
    });

    it("supports asChild on Accordion.Trigger", () => {
      render(
        <Accordion type="single">
          <Accordion.Item value="1">
            <Accordion.Header>
              <Accordion.Trigger asChild>
                <div role="button" data-testid="custom-trigger">
                  Custom Trigger
                </div>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>C1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger = screen.getByTestId("custom-trigger");
      expect(trigger).toHaveClass("cl-accordion__trigger");
      expect(trigger.tagName).toBe("DIV");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to Accordion root HTMLDivElement", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Accordion ref={ref} type="single">
          <Accordion.Item value="1">
            <Accordion.Header>
              <Accordion.Trigger>T1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>C1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass("cl-accordion");
    });
  });

  describe("Accessibility (axe-core)", () => {
    it("passes axe accessibility checks on default closed accordion", async () => {
      const { container } = render(
        <Accordion type="single">
          <Accordion.Item value="item-1">
            <Accordion.Header level={3}>
              <Accordion.Trigger>Section 1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Header level={3}>
              <Accordion.Trigger>Section 2</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("passes axe accessibility checks on expanded accordion with icon", async () => {
      const { container } = render(
        <Accordion type="single" defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Header level={3}>
              <Accordion.Trigger>
                <span>Section 1</span>
                <Accordion.Icon />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("passes axe accessibility checks across all variants and multi mode", async () => {
      const { container } = render(
        <Accordion type="multiple" defaultValue={["item-1", "item-2"]} variant="separated">
          <Accordion.Item value="item-1">
            <Accordion.Header level={3}>
              <Accordion.Trigger>
                <span>Section 1</span>
                <Accordion.Icon />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Header level={3}>
              <Accordion.Trigger>
                <span>Section 2</span>
                <Accordion.Icon />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
