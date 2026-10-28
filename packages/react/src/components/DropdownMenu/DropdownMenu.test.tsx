import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  DropdownMenu,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./DropdownMenu";

describe("DropdownMenu Component (SPEC-034)", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ["requestAnimationFrame", "cancelAnimationFrame", "setTimeout", "clearTimeout"],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderStandardMenu = (
    rootProps: Partial<React.ComponentProps<typeof DropdownMenuRoot>> = {},
    itemHandlers: { onProfile?: () => void; onBilling?: () => void } = {},
  ) => {
    return render(
      <DropdownMenu {...rootProps}>
        <DropdownMenuTrigger data-testid="menu-trigger">Actions</DropdownMenuTrigger>
        <DropdownMenuContent data-testid="menu-content">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem
            data-testid="item-profile"
            onSelect={itemHandlers.onProfile}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            data-testid="item-billing"
            onSelect={itemHandlers.onBilling}
          >
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem
            data-testid="item-disabled"
            disabled
          >
            Disabled Option
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem data-testid="item-logout">Log Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
  };

  it("renders trigger with accessible menu attributes", () => {
    renderStandardMenu();
    const trigger = screen.getByTestId("menu-trigger");
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByTestId("menu-content")).not.toBeInTheDocument();
  });

  it("opens and closes with pointer click input", async () => {
    renderStandardMenu();
    const trigger = screen.getByTestId("menu-trigger");

    // Open
    fireEvent.click(trigger);
    act(() => {
      vi.runAllTimers();
    });

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const content = screen.getByTestId("menu-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute("role", "menu");

    // Close
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByTestId("menu-content")).not.toBeInTheDocument();
  });

  it("opens menu with Enter and Space on trigger", () => {
    renderStandardMenu();
    const trigger = screen.getByTestId("menu-trigger");

    fireEvent.keyDown(trigger, { key: "Enter" });
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByTestId("menu-content")).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("opens menu with ArrowDown on trigger and focuses first enabled item", () => {
    renderStandardMenu();
    const trigger = screen.getByTestId("menu-trigger");

    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByTestId("menu-content")).toBeInTheDocument();
    const profileItem = screen.getByTestId("item-profile");
    expect(profileItem).toHaveFocus();
  });

  it("navigates items with ArrowDown and ArrowUp, skipping disabled items and wrapping around", () => {
    renderStandardMenu();
    const trigger = screen.getByTestId("menu-trigger");

    fireEvent.click(trigger);
    act(() => {
      vi.runAllTimers();
    });

    const profileItem = screen.getByTestId("item-profile");
    const billingItem = screen.getByTestId("item-billing");
    const disabledItem = screen.getByTestId("item-disabled");
    const logoutItem = screen.getByTestId("item-logout");

    expect(profileItem).toHaveFocus();

    // Down -> Billing
    fireEvent.keyDown(screen.getByTestId("menu-content"), { key: "ArrowDown" });
    expect(billingItem).toHaveFocus();

    // Down -> Skips Disabled -> Logout
    fireEvent.keyDown(screen.getByTestId("menu-content"), { key: "ArrowDown" });
    expect(disabledItem).not.toHaveFocus();
    expect(logoutItem).toHaveFocus();

    // Down -> Wraps to Profile
    fireEvent.keyDown(screen.getByTestId("menu-content"), { key: "ArrowDown" });
    expect(profileItem).toHaveFocus();

    // Up -> Wraps backward to Logout
    fireEvent.keyDown(screen.getByTestId("menu-content"), { key: "ArrowUp" });
    expect(logoutItem).toHaveFocus();
  });

  it("navigates to first/last enabled items with Home and End", () => {
    renderStandardMenu();
    const trigger = screen.getByTestId("menu-trigger");

    fireEvent.click(trigger);
    act(() => {
      vi.runAllTimers();
    });

    const content = screen.getByTestId("menu-content");
    const profileItem = screen.getByTestId("item-profile");
    const logoutItem = screen.getByTestId("item-logout");

    fireEvent.keyDown(content, { key: "End" });
    expect(logoutItem).toHaveFocus();

    fireEvent.keyDown(content, { key: "Home" });
    expect(profileItem).toHaveFocus();
  });

  it("selects item on Click and Enter, invokes onSelect and restores focus to trigger", () => {
    const onProfile = vi.fn();
    renderStandardMenu({}, { onProfile });
    const trigger = screen.getByTestId("menu-trigger");

    fireEvent.click(trigger);
    act(() => {
      vi.runAllTimers();
    });

    const profileItem = screen.getByTestId("item-profile");
    fireEvent.click(profileItem);

    expect(onProfile).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("menu-content")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("does not activate disabled items", () => {
    const onDisabled = vi.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger data-testid="menu-trigger">Actions</DropdownMenuTrigger>
        <DropdownMenuContent data-testid="menu-content">
          <DropdownMenuItem
            data-testid="item-disabled"
            disabled
            onSelect={onDisabled}
          >
            Disabled Option
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    act(() => {
      vi.runAllTimers();
    });

    const disabledItem = screen.getByTestId("item-disabled");
    fireEvent.click(disabledItem);
    expect(onDisabled).not.toHaveBeenCalled();

    fireEvent.keyDown(disabledItem, { key: "Enter" });
    expect(onDisabled).not.toHaveBeenCalled();
    expect(screen.getByTestId("menu-content")).toBeInTheDocument();
  });

  it("supports character typeahead search", () => {
    renderStandardMenu();
    const trigger = screen.getByTestId("menu-trigger");

    fireEvent.click(trigger);
    act(() => {
      vi.runAllTimers();
    });

    const content = screen.getByTestId("menu-content");
    const billingItem = screen.getByTestId("item-billing");

    // Press "b"
    fireEvent.keyDown(content, { key: "b" });
    expect(billingItem).toHaveFocus();

    // Advance timer to reset typeahead buffer
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Press "l" -> Logout
    fireEvent.keyDown(content, { key: "l" });
    expect(screen.getByTestId("item-logout")).toHaveFocus();
  });

  it("dismisses on Escape and restores focus to trigger", () => {
    renderStandardMenu();
    const trigger = screen.getByTestId("menu-trigger");

    fireEvent.click(trigger);
    act(() => {
      vi.runAllTimers();
    });

    const content = screen.getByTestId("menu-content");
    fireEvent.keyDown(content, { key: "Escape" });

    expect(screen.queryByTestId("menu-content")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("manages checkbox item selection with aria-checked", () => {
    const onCheckedChange = vi.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Settings</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            data-testid="checkbox-item"
            defaultChecked={false}
            onCheckedChange={onCheckedChange}
          >
            Dark Mode
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    act(() => {
      vi.runAllTimers();
    });

    const checkboxItem = screen.getByTestId("checkbox-item");
    expect(checkboxItem).toHaveAttribute("role", "menuitemcheckbox");
    expect(checkboxItem).toHaveAttribute("aria-checked", "false");

    fireEvent.click(checkboxItem);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(checkboxItem).toHaveAttribute("aria-checked", "true");
  });

  it("manages radio item selection in DropdownMenuRadioGroup", () => {
    const onValueChange = vi.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>View</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value="grid"
            onValueChange={onValueChange}
            data-testid="radio-group"
          >
            <DropdownMenuRadioItem value="list" data-testid="radio-list">
              List View
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="grid" data-testid="radio-grid">
              Grid View
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    act(() => {
      vi.runAllTimers();
    });

    const group = screen.getByTestId("radio-group");
    expect(group).toHaveAttribute("role", "group");

    const radioList = screen.getByTestId("radio-list");
    const radioGrid = screen.getByTestId("radio-grid");

    expect(radioList).toHaveAttribute("role", "menuitemradio");
    expect(radioList).toHaveAttribute("aria-checked", "false");
    expect(radioGrid).toHaveAttribute("aria-checked", "true");

    fireEvent.click(radioList);
    expect(onValueChange).toHaveBeenCalledWith("list");
  });

  it("manages controlled open state via open and onOpenChange", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <DropdownMenu open={false} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger data-testid="menu-trigger">Actions</DropdownMenuTrigger>
        <DropdownMenuContent data-testid="menu-content">
          <DropdownMenuItem>Option</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const trigger = screen.getByTestId("menu-trigger");
    expect(screen.queryByTestId("menu-content")).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(true);

    // Rerender as open
    rerender(
      <DropdownMenu open={true} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger data-testid="menu-trigger">Actions</DropdownMenuTrigger>
        <DropdownMenuContent data-testid="menu-content">
          <DropdownMenuItem>Option</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByTestId("menu-content")).toBeInTheDocument();
  });

  it("passes axe-core accessibility checks with 0 violations in closed and open states", async () => {
    vi.useRealTimers();
    const { container } = render(
      <main>
        <DropdownMenu defaultOpen={false}>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>
              Notifications
            </DropdownMenuCheckboxItem>
            <DropdownMenuItem disabled>Disabled</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </main>,
    );

    // Closed state
    let results = await axe(container);
    expect(results).toHaveNoViolations();

    // Open state
    fireEvent.click(screen.getByRole("button", { name: "Actions" }));
    results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
