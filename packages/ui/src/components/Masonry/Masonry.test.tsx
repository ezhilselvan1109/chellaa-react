import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Masonry } from "./Masonry";

describe("Masonry Component (Ant Design 6.0 Specification)", () => {
  it("renders masonry items using items array and itemRender", () => {
    const items = [
      { key: "1", data: { title: "Item 1" } },
      { key: "2", data: { title: "Item 2" } },
    ];

    render(
      <Masonry
        data-testid="test-masonry"
        items={items}
        itemRender={(item) => <div>{item.data.title}</div>}
      />
    );

    const masonry = screen.getByTestId("test-masonry");
    expect(masonry).toBeInTheDocument();
    expect(masonry).toHaveClass("ch-masonry");
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders masonry items directly from children", () => {
    render(
      <Masonry data-testid="test-masonry">
        <div key="c-1">Child 1</div>
        <div key="c-2">Child 2</div>
      </Masonry>
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("renders with custom column count and gutter spacing", () => {
    const items = [
      { key: "1", height: 100, children: <div>Card 1</div> },
      { key: "2", height: 150, children: <div>Card 2</div> },
    ];

    render(<Masonry columns={2} gutter={16} items={items} />);

    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
  });

  it("supports manual column pinning using item.column", () => {
    const items = [
      { key: "1", column: 0, height: 100, children: <div>Pinned Col 0</div> },
      { key: "2", column: 1, height: 100, children: <div>Pinned Col 1</div> },
    ];

    render(<Masonry columns={3} items={items} />);

    expect(screen.getByText("Pinned Col 0")).toBeInTheDocument();
    expect(screen.getByText("Pinned Col 1")).toBeInTheDocument();
  });

  it("triggers onLayoutChange callback with item placements", () => {
    const onLayoutChange = vi.fn();
    const items = [
      { key: "1", height: 100, children: <div>Item 1</div> },
      { key: "2", height: 100, children: <div>Item 2</div> },
    ];

    render(<Masonry items={items} onLayoutChange={onLayoutChange} />);

    expect(onLayoutChange).toHaveBeenCalled();
    const firstCallArg = onLayoutChange.mock.calls[0][0];
    expect(firstCallArg).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: "1" }),
        expect.objectContaining({ key: "2" }),
      ])
    );
  });

  it("supports custom semantic DOM classNames and styles as object", () => {
    const items = [{ key: "1", height: 80, children: <div>Item</div> }];

    render(
      <Masonry
        items={items}
        classNames={{ root: "custom-masonry-root", item: "custom-masonry-item" }}
        styles={{ root: { backgroundColor: "rgb(250, 250, 250)" } }}
      />
    );

    const root = document.querySelector(".custom-masonry-root");
    expect(root).toBeInTheDocument();
    expect(root).toHaveStyle({ backgroundColor: "rgb(250, 250, 250)" });

    const item = document.querySelector(".custom-masonry-item");
    expect(item).toBeInTheDocument();
  });

  it("supports functional classNames and styles (Ant Design 6.0 specification)", () => {
    const items = [{ key: "1", height: 80, children: <div>Item</div> }];

    render(
      <Masonry
        columns={4}
        items={items}
        classNames={({ props }) => ({
          root: `fn-root-${props.columns}`,
          item: "fn-item",
        })}
        styles={({ props }) => ({
          root: { padding: props.columns ? "10px" : "0px" },
        })}
      />
    );

    const root = document.querySelector(".fn-root-4");
    expect(root).toBeInTheDocument();
    expect(root).toHaveStyle({ padding: "10px" });

    const item = document.querySelector(".fn-item");
    expect(item).toBeInTheDocument();
  });

  it("forwards ref to HTMLDivElement root container", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Masonry ref={ref} items={[{ key: "1", children: "Content" }]} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass("ch-masonry");
  });
});
