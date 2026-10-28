# SPEC-045: Carousel Specification

## 1. Overview
The `Carousel` component is an accessible, touch- and keyboard-operable content rotator for cycling through slides of arbitrary React content. It implements the WAI-ARIA Carousel Pattern with previous/next navigation buttons, pagination indicator dots, optional infinite looping, autoplay with pause/resume controls, responsive slide sizing, touch swiping, and strict focus management for hidden slides.

---

## 2. Public API & Type Definitions

```typescript
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
```

---

## 3. WAI-ARIA & Keyboard Accessibility Contract

### ARIA Semantics
- **Container**: `role="region"`, `aria-roledescription="carousel"`, `aria-label={ariaLabel}`.
- **Slide Track**: Has `aria-live="polite"` when idle, and `aria-live="off"` during drag/animation or hover.
- **Slide Element**:
  - `role="group"`, `aria-roledescription="slide"`, `aria-label={${index + 1} of ${total}}`.
  - Non-active slides: `aria-hidden={!isActive}` and hidden from keyboard tab navigation via `tabIndex={-1}` / `inert` / CSS visibility to prevent unexpected hidden focus traps.
- **Controls**:
  - Previous: `<button aria-label="Previous slide" disabled={!loop && activeSlide === 0}>`.
  - Next: `<button aria-label="Next slide" disabled={!loop && activeSlide === total - 1}>`.
  - Autoplay Toggle: `<button aria-label={isPlaying ? "Pause slide rotation" : "Start slide rotation"}>`.
  - Pagination Indicators: `<button aria-label={Go to slide ${i + 1}} aria-current={i === activeSlide ? "true" : undefined}>`.

### Keyboard Navigation
- `ArrowLeft`: Navigate to previous slide.
- `ArrowRight`: Navigate to next slide.
- `Home`: Navigate to first slide.
- `End`: Navigate to last slide.
- Focus is never trapped inside the carousel.

### Reduced Motion & Autoplay
- When `@media (prefers-reduced-motion: reduce)` is detected, slide transitions occur instantly without smooth transform animations, and autoplay does not automatically cycle without explicit user opt-in.
- Autoplay pauses immediately upon focus within the carousel, hover, or drag gesture.

---

## 4. Controlled & Uncontrolled Behavior
- Controlled via `activeSlide` and `onSlideChange`.
- Uncontrolled via `defaultActiveSlide`.
- Edge cases handled cleanly:
  - 0 slides: Displays empty container safely with no division by zero or errors.
  - 1 slide: Disables previous/next buttons and hides pagination.
  - Out of bounds `activeSlide`: Clamped between `0` and `total - 1`.

---

## 5. CSS Architecture & Scoped Tokens
Component styles reside in `@layer cl-components` under `.cl-carousel`.
Tokens utilized:
- `--cl-color-primary`: Active pagination indicator dot.
- `--cl-color-surface`: Control button backgrounds.
- `--cl-color-border`: Control button borders.
- `--cl-shadow-md`: Control button elevation.
- `--cl-radius-full`: Circular pagination dots and control buttons.
- `--cl-transition-normal`: Smooth transform translation of slide track.
