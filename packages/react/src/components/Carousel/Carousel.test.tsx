import * as React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { axe } from "vitest-axe";
import { Carousel } from "./Carousel";
import { CarouselSlide } from "./CarouselSlide";

const testSlides = [
  <div key="1">Slide 1 Content</div>,
  <div key="2">Slide 2 Content</div>,
  <div key="3">Slide 3 Content</div>,
];

function getSlides(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('[aria-roledescription="slide"]'));
}

describe("Carousel Component", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with correct WAI-ARIA region and slide semantics", () => {
    const { container } = render(
      <Carousel slides={testSlides} ariaLabel="Featured Projects" />
    );

    const region = screen.getByRole("region", { name: "Featured Projects" });
    expect(region).toHaveAttribute("aria-roledescription", "carousel");

    const slides = getSlides(container);
    expect(slides).toHaveLength(3);
    expect(slides[0]).toHaveAttribute("aria-roledescription", "slide");
    expect(slides[0]).toHaveAttribute("aria-label", "1 of 3");
    expect(slides[0]).toHaveAttribute("aria-hidden", "false");
    expect(slides[1]).toHaveAttribute("aria-hidden", "true");
    expect(slides[2]).toHaveAttribute("aria-hidden", "true");
  });

  it("navigates forward and backward with control buttons", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { container } = render(<Carousel slides={testSlides} />);

    const prevBtn = screen.getByRole("button", { name: /previous slide/i });
    const nextBtn = screen.getByRole("button", { name: /next slide/i });

    // Initially at slide 1, prev is disabled (loop is false)
    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    // Click next -> slide 2
    await user.click(nextBtn);
    let slides = getSlides(container);
    expect(slides[1]).toHaveAttribute("aria-hidden", "false");
    expect(prevBtn).not.toBeDisabled();

    // Click next again -> slide 3
    await user.click(nextBtn);
    slides = getSlides(container);
    expect(slides[2]).toHaveAttribute("aria-hidden", "false");
    expect(nextBtn).toBeDisabled();

    // Click prev -> slide 2
    await user.click(prevBtn);
    slides = getSlides(container);
    expect(slides[1]).toHaveAttribute("aria-hidden", "false");
  });

  it("loops continuously when loop=true", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { container } = render(<Carousel slides={testSlides} loop />);

    const prevBtn = screen.getByRole("button", { name: /previous slide/i });
    const nextBtn = screen.getByRole("button", { name: /next slide/i });

    expect(prevBtn).not.toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    // At slide 1, click prev -> wraps to slide 3
    await user.click(prevBtn);
    let slides = getSlides(container);
    expect(slides[2]).toHaveAttribute("aria-hidden", "false");

    // At slide 3, click next -> wraps to slide 1
    await user.click(nextBtn);
    slides = getSlides(container);
    expect(slides[0]).toHaveAttribute("aria-hidden", "false");
  });

  it("supports pagination dots navigation", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { container } = render(<Carousel slides={testSlides} />);

    const dots = screen.getAllByRole("button", { name: /go to slide/i });
    expect(dots).toHaveLength(3);
    expect(dots[0]).toHaveAttribute("aria-current", "true");

    const dot3 = dots[2];
    expect(dot3).toBeDefined();
    if (dot3) {
      await user.click(dot3);
      expect(dot3).toHaveAttribute("aria-current", "true");
    }

    const slides = getSlides(container);
    expect(slides[2]).toHaveAttribute("aria-hidden", "false");
  });

  it("supports controlled activeSlide and onSlideChange", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onSlideChange = vi.fn();

    const { rerender, container } = render(
      <Carousel
        slides={testSlides}
        activeSlide={0}
        onSlideChange={onSlideChange}
      />
    );

    const nextBtn = screen.getByRole("button", { name: /next slide/i });
    await user.click(nextBtn);
    expect(onSlideChange).toHaveBeenCalledWith(1);

    rerender(
      <Carousel
        slides={testSlides}
        activeSlide={1}
        onSlideChange={onSlideChange}
      />
    );

    const slides = getSlides(container);
    expect(slides[1]).toHaveAttribute("aria-hidden", "false");
  });

  it("supports keyboard navigation with Arrow and Home/End keys", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { container } = render(<Carousel slides={testSlides} />);

    const region = screen.getByRole("region");
    region.focus();

    await user.keyboard("{ArrowRight}");
    let slides = getSlides(container);
    expect(slides[1]).toHaveAttribute("aria-hidden", "false");

    await user.keyboard("{End}");
    slides = getSlides(container);
    expect(slides[2]).toHaveAttribute("aria-hidden", "false");

    await user.keyboard("{Home}");
    slides = getSlides(container);
    expect(slides[0]).toHaveAttribute("aria-hidden", "false");

    await user.keyboard("{ArrowLeft}");
    slides = getSlides(container);
    expect(slides[0]).toHaveAttribute("aria-hidden", "false");
  });

  it("handles empty slides and single slide gracefully", () => {
    const { rerender } = render(<Carousel slides={[]} />);
    expect(screen.getByRole("region")).toBeInTheDocument();

    rerender(<Carousel slides={[<div key="1">Solo Slide</div>]} />);
    expect(screen.getByText("Solo Slide")).toBeInTheDocument();
    const prevBtn = screen.getByRole("button", { name: /previous slide/i });
    expect(prevBtn).toBeDisabled();
  });

  it("supports compound slide components via CarouselSlide", () => {
    render(
      <Carousel>
        <CarouselSlide><div>Slide A</div></CarouselSlide>
        <CarouselSlide><div>Slide B</div></CarouselSlide>
      </Carousel>
    );

    expect(screen.getByText("Slide A")).toBeInTheDocument();
    expect(screen.getByText("Slide B")).toBeInTheDocument();
  });

  it("advances slides automatically when autoPlay is enabled and respects timer", () => {
    const { container } = render(
      <Carousel slides={testSlides} autoPlay autoPlayInterval={2000} loop />
    );

    let slides = getSlides(container);
    expect(slides[0]).toHaveAttribute("aria-hidden", "false");

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    slides = getSlides(container);
    expect(slides[1]).toHaveAttribute("aria-hidden", "false");

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    slides = getSlides(container);
    expect(slides[2]).toHaveAttribute("aria-hidden", "false");
  });

  it("passes axe accessibility checks with 0 violations", async () => {
    const { container } = render(
      <Carousel slides={testSlides} ariaLabel="Test Accessibility Carousel" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
