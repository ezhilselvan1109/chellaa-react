import { describe, it, expect } from "vitest";
import { rootShouldForwardProp, createShouldForwardProp } from "./shouldForwardProp";

describe("shouldForwardProp Engine", () => {
  it("blocks default system props: sx, theme, as, ownerState, slotProps", () => {
    expect(rootShouldForwardProp("sx")).toBe(false);
    expect(rootShouldForwardProp("theme")).toBe(false);
    expect(rootShouldForwardProp("as")).toBe(false);
    expect(rootShouldForwardProp("ownerState")).toBe(false);
    expect(rootShouldForwardProp("slotProps")).toBe(false);
  });

  it("blocks transient props starting with $", () => {
    expect(rootShouldForwardProp("$isActive")).toBe(false);
    expect(rootShouldForwardProp("$colorScheme")).toBe(false);
    expect(rootShouldForwardProp("$open")).toBe(false);
  });

  it("forwards standard HTML and ARIA attributes", () => {
    expect(rootShouldForwardProp("id")).toBe(true);
    expect(rootShouldForwardProp("className")).toBe(true);
    expect(rootShouldForwardProp("style")).toBe(true);
    expect(rootShouldForwardProp("onClick")).toBe(true);
    expect(rootShouldForwardProp("disabled")).toBe(true);
    expect(rootShouldForwardProp("aria-label")).toBe(true);
    expect(rootShouldForwardProp("data-testid")).toBe(true);
  });

  it("allows custom prop blocking with createShouldForwardProp", () => {
    const customFilter = createShouldForwardProp(["variant", "colorScheme", "size"]);

    expect(customFilter("sx")).toBe(false);
    expect(customFilter("variant")).toBe(false);
    expect(customFilter("colorScheme")).toBe(false);
    expect(customFilter("size")).toBe(false);
    expect(customFilter("$custom")).toBe(false);

    expect(customFilter("id")).toBe(true);
    expect(customFilter("title")).toBe(true);
  });
});
