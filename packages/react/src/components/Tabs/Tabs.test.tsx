import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  Tabs,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsIndicator,
} from "./index";

describe("Tabs Component (SPEC-027)", () => {
  describe("Rendering & Semantic Structure", () => {
    it("renders semantic compound structure with WAI-ARIA tablist, tab, and tabpanel roles", () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List aria-label="Test Tabs">
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Panel 1 Content</Tabs.Content>
          <Tabs.Content value="tab2">Panel 2 Content</Tabs.Content>
        </Tabs>,
      );

      const list = screen.getByRole("tablist", { name: "Test Tabs" });
      expect(list).toBeInTheDocument();
      expect(list).toHaveAttribute("aria-orientation", "horizontal");

      const tabs = screen.getAllByRole("tab");
      expect(tabs).toHaveLength(2);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab1).toHaveAttribute("tabindex", "0");
      expect(tab1).toHaveAttribute("data-state", "active");

      expect(tab2).toHaveAttribute("aria-selected", "false");
      expect(tab2).toHaveAttribute("tabindex", "-1");
      expect(tab2).toHaveAttribute("data-state", "inactive");

      // Panels
      const panel1 = screen.getByText("Panel 1 Content");
      expect(panel1).toHaveAttribute("role", "tabpanel");
      expect(panel1).not.toHaveAttribute("hidden");
      expect(panel1).toHaveAttribute("tabindex", "0");

      const panel2 = screen.getByText("Panel 2 Content");
      expect(panel2).toHaveAttribute("role", "tabpanel");
      expect(panel2).toHaveAttribute("hidden");
    });

    it("establishes deterministic bi-directional aria-controls and aria-labelledby associations", () => {
      render(
        <Tabs defaultValue="tabA">
          <Tabs.List>
            <Tabs.Trigger value="tabA">Tab A</Tabs.Trigger>
            <Tabs.Trigger value="tabB">Tab B</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tabA">Content A</Tabs.Content>
          <Tabs.Content value="tabB">Content B</Tabs.Content>
        </Tabs>,
      );

      const tabA = screen.getByRole("tab", { name: "Tab A" });
      const panelA = screen.getByText("Content A");

      const tabAId = tabA.getAttribute("id");
      const tabAControls = tabA.getAttribute("aria-controls");

      const panelAId = panelA.getAttribute("id");
      const panelALabelledBy = panelA.getAttribute("aria-labelledby");

      expect(tabAControls).toBe(panelAId);
      expect(panelALabelledBy).toBe(tabAId);
    });

    it("applies variant and orientation classes to root", () => {
      const { container } = render(
        <Tabs orientation="vertical" variant="pill" size="lg" defaultValue="t1">
          <Tabs.List>
            <Tabs.Trigger value="t1">T1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="t1">C1</Tabs.Content>
        </Tabs>,
      );

      const root = container.firstElementChild;
      expect(root).toHaveClass("cl-tabs");
      expect(root).toHaveClass("cl-tabs--vertical");
      expect(root).toHaveClass("cl-tabs--pill");
      expect(root).toHaveClass("cl-tabs--lg");
      expect(root).toHaveAttribute("data-orientation", "vertical");

      const list = screen.getByRole("tablist");
      expect(list).toHaveAttribute("aria-orientation", "vertical");
      expect(list).toHaveAttribute("data-orientation", "vertical");
    });

    it("renders optional Tabs.Indicator track element", () => {
      render(
        <Tabs defaultValue="t1">
          <Tabs.List>
            <Tabs.Trigger value="t1">T1</Tabs.Trigger>
            <Tabs.Indicator data-testid="test-indicator" />
          </Tabs.List>
          <Tabs.Content value="t1">C1</Tabs.Content>
        </Tabs>,
      );

      const indicator = screen.getByTestId("test-indicator");
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveClass("cl-tabs__indicator");
      expect(indicator).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Mouse Interactions & Selection", () => {
    it("switches active tab and panel on click", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Tabs defaultValue="profile" onValueChange={onValueChange}>
          <Tabs.List>
            <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
            <Tabs.Trigger value="password">Password</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="profile">Profile Form</Tabs.Content>
          <Tabs.Content value="password">Password Form</Tabs.Content>
        </Tabs>,
      );

      const profileTab = screen.getByRole("tab", { name: "Profile" });
      const passwordTab = screen.getByRole("tab", { name: "Password" });

      expect(profileTab).toHaveAttribute("aria-selected", "true");
      expect(passwordTab).toHaveAttribute("aria-selected", "false");

      await user.click(passwordTab);

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledWith("password");

      expect(profileTab).toHaveAttribute("aria-selected", "false");
      expect(profileTab).toHaveAttribute("tabindex", "-1");
      expect(passwordTab).toHaveAttribute("aria-selected", "true");
      expect(passwordTab).toHaveAttribute("tabindex", "0");

      expect(screen.getByText("Profile Form")).toHaveAttribute("hidden");
      expect(screen.getByText("Password Form")).not.toHaveAttribute("hidden");
    });

    it("does not activate disabled tab on click", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Tabs defaultValue="first" onValueChange={onValueChange}>
          <Tabs.List>
            <Tabs.Trigger value="first">First</Tabs.Trigger>
            <Tabs.Trigger value="disabled" isDisabled>
              Disabled
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="first">First Content</Tabs.Content>
          <Tabs.Content value="disabled">Disabled Content</Tabs.Content>
        </Tabs>,
      );

      const disabledTab = screen.getByRole("tab", { name: "Disabled" });
      expect(disabledTab).toBeDisabled();
      expect(disabledTab).toHaveAttribute("data-disabled", "");

      await user.click(disabledTab);

      expect(onValueChange).not.toHaveBeenCalled();
      expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByText("First Content")).not.toHaveAttribute("hidden");
    });
  });

  describe("Keyboard Navigation (WAI-ARIA APG Roving Tabindex)", () => {
    it("navigates with ArrowRight and ArrowLeft in automatic mode (horizontal)", async () => {
      render(
        <Tabs defaultValue="t1" orientation="horizontal" activationMode="automatic">
          <Tabs.List>
            <Tabs.Trigger value="t1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="t2">Tab 2</Tabs.Trigger>
            <Tabs.Trigger value="t3">Tab 3</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="t1">Content 1</Tabs.Content>
          <Tabs.Content value="t2">Content 2</Tabs.Content>
          <Tabs.Content value="t3">Content 3</Tabs.Content>
        </Tabs>,
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      const tab3 = screen.getByRole("tab", { name: "Tab 3" });

      tab1.focus();
      expect(document.activeElement).toBe(tab1);

      // Press ArrowRight -> Focus & activates Tab 2
      fireEvent.keyDown(tab1, { key: "ArrowRight" });
      expect(document.activeElement).toBe(tab2);
      expect(tab2).toHaveAttribute("aria-selected", "true");

      // Press ArrowRight -> Focus & activates Tab 3
      fireEvent.keyDown(tab2, { key: "ArrowRight" });
      expect(document.activeElement).toBe(tab3);
      expect(tab3).toHaveAttribute("aria-selected", "true");

      // Press ArrowRight loops to Tab 1
      fireEvent.keyDown(tab3, { key: "ArrowRight" });
      expect(document.activeElement).toBe(tab1);
      expect(tab1).toHaveAttribute("aria-selected", "true");

      // Press ArrowLeft loops to Tab 3
      fireEvent.keyDown(tab1, { key: "ArrowLeft" });
      expect(document.activeElement).toBe(tab3);
      expect(tab3).toHaveAttribute("aria-selected", "true");
    });

    it("navigates with ArrowDown and ArrowUp in vertical mode", async () => {
      render(
        <Tabs defaultValue="v1" orientation="vertical">
          <Tabs.List>
            <Tabs.Trigger value="v1">Vertical 1</Tabs.Trigger>
            <Tabs.Trigger value="v2">Vertical 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="v1">Content V1</Tabs.Content>
          <Tabs.Content value="v2">Content V2</Tabs.Content>
        </Tabs>,
      );

      const tab1 = screen.getByRole("tab", { name: "Vertical 1" });
      const tab2 = screen.getByRole("tab", { name: "Vertical 2" });

      tab1.focus();
      fireEvent.keyDown(tab1, { key: "ArrowDown" });
      expect(document.activeElement).toBe(tab2);
      expect(tab2).toHaveAttribute("aria-selected", "true");

      fireEvent.keyDown(tab2, { key: "ArrowUp" });
      expect(document.activeElement).toBe(tab1);
      expect(tab1).toHaveAttribute("aria-selected", "true");
    });

    it("skips disabled tabs during arrow navigation", () => {
      render(
        <Tabs defaultValue="t1">
          <Tabs.List>
            <Tabs.Trigger value="t1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="t2" isDisabled>
              Tab 2 Disabled
            </Tabs.Trigger>
            <Tabs.Trigger value="t3">Tab 3</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="t1">Content 1</Tabs.Content>
          <Tabs.Content value="t2">Content 2</Tabs.Content>
          <Tabs.Content value="t3">Content 3</Tabs.Content>
        </Tabs>,
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab3 = screen.getByRole("tab", { name: "Tab 3" });

      tab1.focus();
      fireEvent.keyDown(tab1, { key: "ArrowRight" });

      // Skips Tab 2 and focuses Tab 3 directly
      expect(document.activeElement).toBe(tab3);
      expect(tab3).toHaveAttribute("aria-selected", "true");
    });

    it("supports Home and End keys to jump to first and last enabled tab", () => {
      render(
        <Tabs defaultValue="t2">
          <Tabs.List>
            <Tabs.Trigger value="t1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="t2">Tab 2</Tabs.Trigger>
            <Tabs.Trigger value="t3">Tab 3</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="t1">Content 1</Tabs.Content>
          <Tabs.Content value="t2">Content 2</Tabs.Content>
          <Tabs.Content value="t3">Content 3</Tabs.Content>
        </Tabs>,
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      const tab3 = screen.getByRole("tab", { name: "Tab 3" });

      tab2.focus();

      // Home moves to first tab
      fireEvent.keyDown(tab2, { key: "Home" });
      expect(document.activeElement).toBe(tab1);
      expect(tab1).toHaveAttribute("aria-selected", "true");

      // End moves to last tab
      fireEvent.keyDown(tab1, { key: "End" });
      expect(document.activeElement).toBe(tab3);
      expect(tab3).toHaveAttribute("aria-selected", "true");
    });

    it("supports manual activation mode: arrow moves focus without selection until Enter/Space is pressed", () => {
      render(
        <Tabs defaultValue="m1" activationMode="manual">
          <Tabs.List>
            <Tabs.Trigger value="m1">Manual 1</Tabs.Trigger>
            <Tabs.Trigger value="m2">Manual 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="m1">Content M1</Tabs.Content>
          <Tabs.Content value="m2">Content M2</Tabs.Content>
        </Tabs>,
      );

      const tab1 = screen.getByRole("tab", { name: "Manual 1" });
      const tab2 = screen.getByRole("tab", { name: "Manual 2" });

      tab1.focus();
      fireEvent.keyDown(tab1, { key: "ArrowRight" });

      // In manual mode: focus moved to tab2, but tab1 is still selected!
      expect(document.activeElement).toBe(tab2);
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveAttribute("aria-selected", "false");
      expect(screen.getByText("Content M1")).not.toHaveAttribute("hidden");
      expect(screen.getByText("Content M2")).toHaveAttribute("hidden");

      // Press Enter to activate tab2
      fireEvent.keyDown(tab2, { key: "Enter" });
      expect(tab1).toHaveAttribute("aria-selected", "false");
      expect(tab2).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText("Content M1")).toHaveAttribute("hidden");
      expect(screen.getByText("Content M2")).not.toHaveAttribute("hidden");

      // Move back to tab1 and activate with Space
      fireEvent.keyDown(tab2, { key: "ArrowLeft" });
      expect(document.activeElement).toBe(tab1);
      expect(tab2).toHaveAttribute("aria-selected", "true"); // still tab2

      fireEvent.keyDown(tab1, { key: " " });
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveAttribute("aria-selected", "false");
    });
  });

  describe("Controlled and Uncontrolled State", () => {
    it("respects controlled value prop and notifies onValueChange", async () => {
      const handleValueChange = vi.fn();
      const { rerender } = render(
        <Tabs value="ctrl1" onValueChange={handleValueChange}>
          <Tabs.List>
            <Tabs.Trigger value="ctrl1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="ctrl2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="ctrl1">Content 1</Tabs.Content>
          <Tabs.Content value="ctrl2">Content 2</Tabs.Content>
        </Tabs>,
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveAttribute("aria-selected", "false");

      fireEvent.click(tab2);
      expect(handleValueChange).toHaveBeenCalledWith("ctrl2");

      // Rerender with updated value
      rerender(
        <Tabs value="ctrl2" onValueChange={handleValueChange}>
          <Tabs.List>
            <Tabs.Trigger value="ctrl1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="ctrl2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="ctrl1">Content 1</Tabs.Content>
          <Tabs.Content value="ctrl2">Content 2</Tabs.Content>
        </Tabs>,
      );

      expect(tab1).toHaveAttribute("aria-selected", "false");
      expect(tab2).toHaveAttribute("aria-selected", "true");
    });

    it("auto-selects first enabled tab if no value or defaultValue is provided", () => {
      render(
        <Tabs>
          <Tabs.List>
            <Tabs.Trigger value="auto1">Auto 1</Tabs.Trigger>
            <Tabs.Trigger value="auto2">Auto 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="auto1">Auto 1 Content</Tabs.Content>
          <Tabs.Content value="auto2">Auto 2 Content</Tabs.Content>
        </Tabs>,
      );

      const tab1 = screen.getByRole("tab", { name: "Auto 1" });
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText("Auto 1 Content")).not.toHaveAttribute("hidden");
    });
  });

  describe("Lazy Panel Rendering (isLazy)", () => {
    it("unmounts inactive panels completely when isLazy={true}", () => {
      render(
        <Tabs defaultValue="lazy1" isLazy>
          <Tabs.List>
            <Tabs.Trigger value="lazy1">Lazy 1</Tabs.Trigger>
            <Tabs.Trigger value="lazy2">Lazy 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="lazy1">Lazy Content 1</Tabs.Content>
          <Tabs.Content value="lazy2">Lazy Content 2</Tabs.Content>
        </Tabs>,
      );

      expect(screen.getByText("Lazy Content 1")).toBeInTheDocument();
      expect(screen.queryByText("Lazy Content 2")).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole("tab", { name: "Lazy 2" }));

      expect(screen.queryByText("Lazy Content 1")).not.toBeInTheDocument();
      expect(screen.getByText("Lazy Content 2")).toBeInTheDocument();
    });
  });

  describe("asChild Composition", () => {
    it("renders custom element via Slot when asChild={true}", () => {
      render(
        <Tabs defaultValue="home">
          <Tabs.List>
            <Tabs.Trigger value="home" asChild>
              <a href="#home">Home Link</a>
            </Tabs.Trigger>
            <Tabs.Trigger value="about" asChild>
              <a href="#about">About Link</a>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="home">Home Content</Tabs.Content>
          <Tabs.Content value="about">About Content</Tabs.Content>
        </Tabs>,
      );

      const link = screen.getByRole("tab", { name: "Home Link" });
      expect(link.tagName.toLowerCase()).toBe("a");
      expect(link).toHaveAttribute("href", "#home");
      expect(link).toHaveAttribute("aria-selected", "true");
      expect(link).toHaveAttribute("tabindex", "0");
      expect(link).toHaveClass("cl-tabs__trigger");
    });
  });

  describe("Ref Forwarding and Error Handling", () => {
    it("forwards ref to underlying DOM elements", () => {
      const rootRef = React.createRef<HTMLDivElement>();
      const listRef = React.createRef<HTMLDivElement>();
      const triggerRef = React.createRef<HTMLButtonElement>();
      const contentRef = React.createRef<HTMLDivElement>();
      const indicatorRef = React.createRef<HTMLDivElement>();

      render(
        <Tabs ref={rootRef} defaultValue="r1">
          <Tabs.List ref={listRef}>
            <Tabs.Trigger ref={triggerRef} value="r1">
              R1
            </Tabs.Trigger>
            <Tabs.Indicator ref={indicatorRef} />
          </Tabs.List>
          <Tabs.Content ref={contentRef} value="r1">
            CR1
          </Tabs.Content>
        </Tabs>,
      );

      expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
      expect(listRef.current).toBeInstanceOf(HTMLDivElement);
      expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
      expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
      expect(indicatorRef.current).toBeInstanceOf(HTMLDivElement);
    });

    it("throws helpful error when subcomponents rendered outside Tabs", () => {
      // Suppress console.error during throw test
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});

      expect(() => render(<TabsTrigger value="orphan">Orphan</TabsTrigger>)).toThrow(
        "Tabs compound components must be rendered inside <Tabs /> or <Tabs.Root />",
      );

      spy.mockRestore();
    });
  });

  describe("Accessibility (WCAG 2.2 AA Conformance)", () => {
    it("has zero accessibility violations with default tabs", async () => {
      const { container } = render(
        <Tabs defaultValue="a11y1">
          <Tabs.List aria-label="Accessible Navigation">
            <Tabs.Trigger value="a11y1">Tab One</Tabs.Trigger>
            <Tabs.Trigger value="a11y2">Tab Two</Tabs.Trigger>
            <Tabs.Trigger value="a11y3" isDisabled>
              Tab Three
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a11y1">Panel One Content</Tabs.Content>
          <Tabs.Content value="a11y2">Panel Two Content</Tabs.Content>
          <Tabs.Content value="a11y3">Panel Three Content</Tabs.Content>
        </Tabs>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero accessibility violations with vertical orientation", async () => {
      const { container } = render(
        <Tabs orientation="vertical" defaultValue="v1">
          <Tabs.List aria-label="Vertical Navigation">
            <Tabs.Trigger value="v1">Vertical Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="v2">Vertical Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="v1">Vertical Panel 1</Tabs.Content>
          <Tabs.Content value="v2">Vertical Panel 2</Tabs.Content>
        </Tabs>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
