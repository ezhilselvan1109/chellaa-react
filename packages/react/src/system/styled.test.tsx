import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { styled } from "./styled";
import { createTheme } from "../theme/createTheme";
import { ThemeProvider } from "../theme/ThemeProvider";

describe("styled() Component Factory", () => {
  it("renders an element with base styles", () => {
    const TestComponent = styled("div")({
      backgroundColor: "rgb(0, 128, 0)",
      padding: "10px",
    });

    render(<TestComponent data-testid="test-elem">Hello</TestComponent>);
    const elem = screen.getByTestId("test-elem");
    expect(elem).toBeInTheDocument();
    expect(elem.tagName).toBe("DIV");
    expect(elem).toHaveTextContent("Hello");
  });

  it("renders with theme injection", () => {
    const ThemedBox = styled("div")(({ theme }) => ({
      color: theme.palette.primary.main,
    }));

    render(
      <ThemeProvider>
        <ThemedBox data-testid="themed-box">Themed</ThemedBox>
      </ThemeProvider>
    );

    const elem = screen.getByTestId("themed-box");
    expect(elem).toBeInTheDocument();
  });

  it("supports polymorphism via as prop", () => {
    const PolymorphicBox = styled("div")({
      display: "inline-block",
    });

    render(
      <PolymorphicBox as="span" data-testid="span-elem">
        Span Content
      </PolymorphicBox>
    );

    const elem = screen.getByTestId("span-elem");
    expect(elem.tagName).toBe("SPAN");
    expect(elem).toHaveTextContent("Span Content");
  });

  it("does not leak sx, transient props, or blocked props to the DOM", () => {
    const CleanComponent = styled("div", {
      name: "CleanComp",
      shouldForwardProp: (prop) => prop !== "customProp",
    })({
      margin: "0",
    });

    render(
      <CleanComponent
        data-testid="clean-elem"
        sx={{ p: 2 }}
        $isTransient="secret"
        {...({ customProp: "ignored" } as any)}
      >
        Clean
      </CleanComponent>
    );

    const elem = screen.getByTestId("clean-elem");
    expect(elem).toBeInTheDocument();
    expect(elem).not.toHaveAttribute("sx");
    expect(elem).not.toHaveAttribute("$isTransient");
    expect(elem).not.toHaveAttribute("customProp");
  });

  it("resolves global theme component styleOverrides", () => {
    const customTheme = createTheme({
      components: {
        CustomCard: {
          styleOverrides: {
            root: {
              borderRadius: "16px",
            },
          },
        },
      },
    });

    const CustomCard = styled("div", {
      name: "CustomCard",
      slot: "Root",
    })({
      backgroundColor: "white",
    });

    render(
      <ThemeProvider theme={customTheme}>
        <CustomCard data-testid="custom-card">Card</CustomCard>
      </ThemeProvider>
    );

    const elem = screen.getByTestId("custom-card");
    expect(elem).toBeInTheDocument();
  });
});
