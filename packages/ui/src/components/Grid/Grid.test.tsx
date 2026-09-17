import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Row, Col, Grid, useBreakpoint } from "./index";

describe("24-Column Grid System (Ant Design Specification)", () => {
  it("renders Row and Col with 24-column span classes", () => {
    render(
      <Row data-testid="test-row">
        <Col span={12} data-testid="col-1">
          Col 12
        </Col>
        <Col span={12} data-testid="col-2">
          Col 12
        </Col>
      </Row>
    );

    const row = screen.getByTestId("test-row");
    expect(row).toBeInTheDocument();
    expect(row).toHaveClass("ch-row");

    const col1 = screen.getByTestId("col-1");
    expect(col1).toHaveClass("ch-col");
    expect(col1).toHaveClass("ch-col-12");

    const col2 = screen.getByTestId("col-2");
    expect(col2).toHaveClass("ch-col-12");
  });

  it("calculates negative margins on Row and positive padding on Col with numeric gutter", () => {
    render(
      <Row gutter={16} data-testid="test-row">
        <Col span={8} data-testid="test-col">
          Col 8
        </Col>
      </Row>
    );

    const row = screen.getByTestId("test-row");
    expect(row).toHaveStyle({
      marginLeft: "-8px",
      marginRight: "-8px",
    });

    const col = screen.getByTestId("test-col");
    expect(col).toHaveStyle({
      paddingLeft: "8px",
      paddingRight: "8px",
    });
  });

  it("supports [horizontal, vertical] array gutter", () => {
    render(
      <Row gutter={[16, 24]} data-testid="test-row">
        <Col span={8} data-testid="test-col">
          Col 8
        </Col>
      </Row>
    );

    const row = screen.getByTestId("test-row");
    expect(row).toHaveStyle({
      marginLeft: "-8px",
      marginRight: "-8px",
      marginTop: "-12px",
      marginBottom: "-12px",
    });

    const col = screen.getByTestId("test-col");
    expect(col).toHaveStyle({
      paddingLeft: "8px",
      paddingRight: "8px",
      paddingTop: "12px",
      paddingBottom: "12px",
    });
  });

  it("supports offset, push, pull, and order props on Col", () => {
    render(
      <Row>
        <Col
          span={6}
          offset={2}
          push={4}
          pull={1}
          order={3}
          data-testid="advanced-col"
        >
          Advanced Col
        </Col>
      </Row>
    );

    const col = screen.getByTestId("advanced-col");
    expect(col).toHaveClass("ch-col-6");
    expect(col).toHaveClass("ch-col-offset-2");
    expect(col).toHaveClass("ch-col-push-4");
    expect(col).toHaveClass("ch-col-pull-1");
    expect(col).toHaveClass("ch-col-order-3");
  });

  it("supports flex stretching props on Col", () => {
    const { rerender } = render(
      <Row>
        <Col flex="100px" data-testid="flex-col">
          Fixed 100px
        </Col>
      </Row>
    );

    let col = screen.getByTestId("flex-col");
    expect(col).toHaveStyle({ flex: "100px" });

    rerender(
      <Row>
        <Col flex={2} data-testid="flex-col">
          Flex 2
        </Col>
      </Row>
    );
    col = screen.getByTestId("flex-col");
    expect(col).toHaveStyle({ flex: "2 2 auto" });
  });

  it("supports responsive breakpoint props (numeric and object form)", () => {
    render(
      <Row>
        <Col
          xs={24}
          sm={12}
          md={{ span: 8, offset: 2 }}
          lg={6}
          data-testid="responsive-col"
        >
          Responsive Col
        </Col>
      </Row>
    );

    const col = screen.getByTestId("responsive-col");
    expect(col).toHaveClass("ch-col-xs-24");
    expect(col).toHaveClass("ch-col-sm-12");
    expect(col).toHaveClass("ch-col-md-8");
    expect(col).toHaveClass("ch-col-md-offset-2");
    expect(col).toHaveClass("ch-col-lg-6");
  });

  it("supports align and justify on Row", () => {
    render(
      <Row align="middle" justify="space-between" data-testid="aligned-row">
        <Col span={4}>Item</Col>
      </Row>
    );

    const row = screen.getByTestId("aligned-row");
    expect(row).toHaveClass("ch-row--align-middle");
    expect(row).toHaveClass("ch-row--justify-space-between");
  });

  it("supports Grid.useBreakpoint and useBreakpoint hook", () => {
    function TestConsumer() {
      const screens = Grid.useBreakpoint();
      return (
        <div data-testid="screens-info">
          {Object.keys(screens).length === 7 ? "All Breakpoints Ready" : "Error"}
        </div>
      );
    }

    render(<TestConsumer />);
    expect(screen.getByTestId("screens-info")).toHaveTextContent("All Breakpoints Ready");
    expect(Grid.useBreakpoint).toBe(useBreakpoint);
  });

  it("forwards ref to underlying HTMLDivElement on Row and Col", () => {
    const rowRef = React.createRef<HTMLDivElement>();
    const colRef = React.createRef<HTMLDivElement>();

    render(
      <Row ref={rowRef}>
        <Col ref={colRef} span={24}>
          Ref Content
        </Col>
      </Row>
    );

    expect(rowRef.current).toBeInstanceOf(HTMLDivElement);
    expect(rowRef.current).toHaveClass("ch-row");
    expect(colRef.current).toBeInstanceOf(HTMLDivElement);
    expect(colRef.current).toHaveClass("ch-col");
  });
});
