import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Menu } from "./Menu";
import type { ItemType } from "./Menu.types";

describe("Menu Component (Ant Design Exact Specification)", () => {
  const sampleItems: ItemType[] = [
    { key: "item-1", label: "Option 1" },
    { key: "item-2", label: "Option 2" },
    {
      key: "sub-1",
      label: "Navigation One",
      children: [
        { key: "sub-1-1", label: "Sub Option 1" },
        {
          key: "sub-2",
          label: "Submenu Level 2",
          children: [
            {
              key: "sub-3",
              label: "Submenu Level 3 (Deep)",
              children: [
                { key: "deep-opt", label: "Deep Nested Option" },
              ],
            },
          ],
        },
      ],
    },
  ];

  it("renders menu with items in vertical mode by default", () => {
    const { container } = render(<Menu items={sampleItems} />);

    expect(container.querySelector(".ch-menu")).toHaveClass("ch-menu-vertical");
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Navigation One")).toBeInTheDocument();
  });

  it("supports horizontal and inline modes", () => {
    const { container, rerender } = render(
      <Menu mode="horizontal" items={sampleItems} />
    );
    expect(container.querySelector(".ch-menu")).toHaveClass("ch-menu-horizontal");

    rerender(<Menu mode="inline" items={sampleItems} />);
    expect(container.querySelector(".ch-menu")).toHaveClass("ch-menu-inline");
  });

  it("supports light and dark themes", () => {
    const { container, rerender } = render(
      <Menu theme="light" items={sampleItems} />
    );
    expect(container.querySelector(".ch-menu")).toHaveClass("ch-menu-light");

    rerender(<Menu theme="dark" items={sampleItems} />);
    expect(container.querySelector(".ch-menu")).toHaveClass("ch-menu-dark");
  });

  it("selects items and triggers onSelect and onClick with keyPath", () => {
    const handleSelect = vi.fn();
    const handleClick = vi.fn();

    render(
      <Menu
        items={sampleItems}
        onSelect={handleSelect}
        onClick={handleClick}
      />
    );

    const opt1 = screen.getByText("Option 1");
    fireEvent.click(opt1);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "item-1",
        keyPath: ["item-1"],
      })
    );

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "item-1",
        keyPath: ["item-1"],
        selectedKeys: ["item-1"],
      })
    );
  });

  it("supports multiple selection mode with onSelect and onDeselect", () => {
    const handleSelect = vi.fn();
    const handleDeselect = vi.fn();

    render(
      <Menu
        multiple
        defaultSelectedKeys={["item-1"]}
        items={sampleItems}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
      />
    );

    // Select second item
    const opt2 = screen.getByText("Option 2");
    fireEvent.click(opt2);
    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "item-2",
        selectedKeys: ["item-1", "item-2"],
      })
    );

    // Deselect first item
    const opt1 = screen.getByText("Option 1");
    fireEvent.click(opt1);
    expect(handleDeselect).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "item-1",
        selectedKeys: ["item-2"],
      })
    );
  });

  it("supports recursive multi-level submenus (submenu into submenu into submenu)", () => {
    const handleSelect = vi.fn();
    const handleOpenChange = vi.fn();

    // Render in inline mode with all 3 levels opened by default
    render(
      <Menu
        mode="inline"
        defaultOpenKeys={["sub-1", "sub-2", "sub-3"]}
        items={sampleItems}
        onSelect={handleSelect}
        onOpenChange={handleOpenChange}
      />
    );

    // All 3 levels of submenus should be expanded and visible
    expect(screen.getByText("Navigation One")).toBeInTheDocument();
    expect(screen.getByText("Sub Option 1")).toBeInTheDocument();
    expect(screen.getByText("Submenu Level 2")).toBeInTheDocument();
    expect(screen.getByText("Submenu Level 3 (Deep)")).toBeInTheDocument();
    expect(screen.getByText("Deep Nested Option")).toBeInTheDocument();

    // Click the deep nested option
    const deepOpt = screen.getByText("Deep Nested Option");
    fireEvent.click(deepOpt);

    // Verify keyPath traces back through all levels of parent submenus
    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "deep-opt",
        keyPath: ["deep-opt", "sub-3", "sub-2", "sub-1"],
      })
    );
  });

  it("toggles inline submenus on title click", () => {
    const handleOpenChange = vi.fn();

    render(
      <Menu
        mode="inline"
        items={sampleItems}
        onOpenChange={handleOpenChange}
      />
    );

    const subTitle = screen.getByText("Navigation One");
    fireEvent.click(subTitle);

    expect(handleOpenChange).toHaveBeenCalledWith(["sub-1"]);
    expect(screen.getByText("Sub Option 1")).toBeInTheDocument();
  });

  it("supports compound JSX children syntax (<Menu.Item>, <Menu.SubMenu>, <Menu.ItemGroup>, <Menu.Divider>)", () => {
    const { container } = render(
      <Menu mode="inline" defaultOpenKeys={["sub-compound"]}>
        <Menu.Item key="comp-1">Compound Item 1</Menu.Item>
        <Menu.Divider dashed />
        <Menu.ItemGroup title="Group Title">
          <Menu.Item key="comp-grp">Group Item</Menu.Item>
        </Menu.ItemGroup>
        <Menu.SubMenu key="sub-compound" title="Compound Sub">
          <Menu.Item key="comp-sub-item">Nested Sub Item</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    expect(screen.getByText("Compound Item 1")).toBeInTheDocument();
    expect(screen.getByText("Group Title")).toBeInTheDocument();
    expect(screen.getByText("Group Item")).toBeInTheDocument();
    expect(screen.getByText("Compound Sub")).toBeInTheDocument();
    expect(screen.getByText("Nested Sub Item")).toBeInTheDocument();
    expect(container.querySelector(".ch-menu-divider-dashed")).toBeInTheDocument();
  });

  it("does not fire onSelect or onClick when disabled item is clicked", () => {
    const handleClick = vi.fn();
    const handleSelect = vi.fn();

    const itemsWithDisabled: ItemType[] = [
      { key: "enabled", label: "Enabled" },
      { key: "disabled", label: "Disabled", disabled: true },
    ];

    render(
      <Menu
        items={itemsWithDisabled}
        onClick={handleClick}
        onSelect={handleSelect}
      />
    );

    const disabledItem = screen.getByText("Disabled");
    fireEvent.click(disabledItem);

    expect(handleClick).not.toHaveBeenCalled();
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it("supports danger styling on menu items", () => {
    const itemsWithDanger: ItemType[] = [
      { key: "danger-opt", label: "Delete Account", danger: true },
    ];

    const { container } = render(<Menu items={itemsWithDanger} />);
    expect(container.querySelector(".ch-menu-item-danger")).toBeInTheDocument();
  });

  it("supports inlineCollapsed state", () => {
    const { container } = render(
      <Menu mode="inline" inlineCollapsed items={sampleItems} />
    );
    expect(container.querySelector(".ch-menu")).toHaveClass("ch-menu-inline-collapsed");
  });

  it("supports custom semantic DOM classNames and styles", () => {
    const { container } = render(
      <Menu
        items={sampleItems}
        classNames={{
          root: "custom-menu-root",
          item: "custom-menu-item",
        }}
        styles={{
          root: { maxWidth: 300 },
        }}
      />
    );

    expect(container.querySelector(".custom-menu-root")).toBeInTheDocument();
    expect(container.querySelector(".custom-menu-item")).toBeInTheDocument();
  });
});
