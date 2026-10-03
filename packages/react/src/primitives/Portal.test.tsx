import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Portal } from "./Portal";

describe("Portal", () => {
  it("renders children into document.body after mounting", () => {
    render(
      <Portal>
        <div data-testid="portal-content">Portal Content</div>
      </Portal>,
    );

    const portalContent = screen.getByTestId("portal-content");
    expect(portalContent).toBeDefined();
    expect(portalContent.parentElement).toBe(document.body);
  });

  it("renders into a custom container when provided", () => {
    const customContainer = document.createElement("div");
    customContainer.setAttribute("id", "custom-portal-target");
    document.body.appendChild(customContainer);

    render(
      <Portal container={customContainer}>
        <span data-testid="custom-child">Targeted Content</span>
      </Portal>,
    );

    const child = screen.getByTestId("custom-child");
    expect(child.parentElement).toBe(customContainer);

    document.body.removeChild(customContainer);
  });

  it("cleans up portal DOM node upon unmount", () => {
    const { unmount } = render(
      <Portal>
        <div data-testid="portal-content">Will Unmount</div>
      </Portal>,
    );

    expect(screen.getByTestId("portal-content")).toBeDefined();

    unmount();
    expect(screen.queryByTestId("portal-content")).toBeNull();
  });
});
