import * as React from "react";

export interface CarouselSlideData {
  id?: string | number;
  content: React.ReactNode;
  ariaLabel?: string;
}

export interface CarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Slide items to display. Alternatively pass children as slides.
   */
  slides?: (React.ReactNode | CarouselSlideData)[];

  /**
   * Direct child slide elements.
   */
  children?: React.ReactNode;

  /**
   * Controlled 0-based index of the active slide.
   */
  activeSlide?: number;

  /**
   * Initial uncontrolled 0-based index of the active slide.
   * @default 0
   */
  defaultActiveSlide?: number;

  /**
   * Callback fired when active slide index changes.
   */
  onSlideChange?: (index: number) => void;

  /**
   * Whether navigation loops continuously from end to start.
   * @default false
   */
  loop?: boolean;

  /**
   * Whether to display previous/next navigation arrow buttons.
   * @default true
   */
  showControls?: boolean;

  /**
   * Whether to display pagination dot indicators.
   * @default true
   */
  showPagination?: boolean;

  /**
   * Whether automatic slide progression is enabled.
   * @default false
   */
  autoPlay?: boolean;

  /**
   * Duration in milliseconds between automatic slide transitions.
   * @default 5000
   */
  autoPlayInterval?: number;

  /**
   * Whether to pause autoplay when hovered.
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Whether to pause autoplay when any element receives focus.
   * @default true
   */
  pauseOnFocus?: boolean;

  /**
   * Whether the carousel is disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Accessible name for the carousel landmark region.
   * @default "Content Carousel"
   */
  ariaLabel?: string;
}

export interface CarouselSlideProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
