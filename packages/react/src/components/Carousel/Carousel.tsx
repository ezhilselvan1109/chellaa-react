import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { classNames } from "../../utils/classNames";
import type {
  CarouselProps,
  CarouselSlideData,
} from "./Carousel.types";

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel(props, ref) {
    const {
      slides,
      children,
      activeSlide: activeSlideProp,
      defaultActiveSlide = 0,
      onSlideChange,
      loop = false,
      showControls = true,
      showPagination = true,
      autoPlay = false,
      autoPlayInterval = 5000,
      pauseOnHover = true,
      pauseOnFocus = true,
      isDisabled = false,
      ariaLabel = "Content Carousel",
      className,
      ...rest
    } = props;

    // Normalize slides array from slides prop or children
    const normalizedSlides = React.useMemo<{
      content: React.ReactNode;
      ariaLabel?: string | undefined;
    }[]>(() => {
      if (slides && slides.length > 0) {
        return slides.map((item) => {
          if (
            typeof item === "object" &&
            item !== null &&
            "content" in item
          ) {
            const slideData = item as CarouselSlideData;
            return {
              content: slideData.content,
              ariaLabel: slideData.ariaLabel,
            };
          }
          return { content: item, ariaLabel: undefined };
        });
      }

      if (children) {
        return React.Children.toArray(children).map((child) => ({
          content: child,
          ariaLabel: undefined,
        }));
      }

      return [];
    }, [slides, children]);

    const totalSlides = normalizedSlides.length;

    const [activeSlide, setActiveSlide] = useControllableState<number>({
      value: activeSlideProp,
      defaultValue: defaultActiveSlide,
      onChange: onSlideChange,
    });

    // Safely clamp active slide index
    const clampedActiveIndex = React.useMemo(() => {
      if (totalSlides === 0) return 0;
      return Math.max(0, Math.min(activeSlide, totalSlides - 1));
    }, [activeSlide, totalSlides]);

    // Autoplay & motion state
    const [isPlaying, setIsPlaying] = React.useState(autoPlay);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

    React.useEffect(() => {
      if (typeof window === "undefined" || !window.matchMedia) return;
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const listener = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      mediaQuery.addEventListener?.("change", listener);
      return () => mediaQuery.removeEventListener?.("change", listener);
    }, []);

    const goToNext = React.useCallback(() => {
      if (totalSlides <= 1 || isDisabled) return;
      if (clampedActiveIndex < totalSlides - 1) {
        setActiveSlide(clampedActiveIndex + 1);
      } else if (loop) {
        setActiveSlide(0);
      }
    }, [totalSlides, isDisabled, clampedActiveIndex, loop, setActiveSlide]);

    const goToPrev = React.useCallback(() => {
      if (totalSlides <= 1 || isDisabled) return;
      if (clampedActiveIndex > 0) {
        setActiveSlide(clampedActiveIndex - 1);
      } else if (loop) {
        setActiveSlide(totalSlides - 1);
      }
    }, [totalSlides, isDisabled, clampedActiveIndex, loop, setActiveSlide]);

    const goToSlide = React.useCallback(
      (index: number) => {
        if (isDisabled) return;
        const target = Math.max(0, Math.min(index, totalSlides - 1));
        setActiveSlide(target);
      },
      [isDisabled, totalSlides, setActiveSlide]
    );

    // Autoplay timer effect
    React.useEffect(() => {
      if (
        !autoPlay ||
        !isPlaying ||
        isDisabled ||
        totalSlides <= 1 ||
        prefersReducedMotion ||
        (pauseOnHover && isHovered) ||
        (pauseOnFocus && isFocused)
      ) {
        return;
      }

      const timer = setInterval(() => {
        goToNext();
      }, autoPlayInterval);

      return () => clearInterval(timer);
    }, [
      autoPlay,
      isPlaying,
      isDisabled,
      totalSlides,
      prefersReducedMotion,
      pauseOnHover,
      isHovered,
      pauseOnFocus,
      isFocused,
      autoPlayInterval,
      goToNext,
    ]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isDisabled || totalSlides <= 1) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
        default:
          break;
      }
    };

    // Touch & pointer gesture swiping
    const touchStartX = React.useRef<number | null>(null);

    const handlePointerDown = (e: React.PointerEvent) => {
      if (isDisabled) return;
      touchStartX.current = e.clientX;
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      if (isDisabled || touchStartX.current === null) return;
      const diffX = e.clientX - touchStartX.current;
      touchStartX.current = null;

      if (Math.abs(diffX) > 40) {
        if (diffX < 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    };

    const isPrevDisabled =
      isDisabled || (!loop && clampedActiveIndex === 0) || totalSlides <= 1;
    const isNextDisabled =
      isDisabled ||
      (!loop && clampedActiveIndex === totalSlides - 1) ||
      totalSlides <= 1;

    return (
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        className={classNames(
          "cl-carousel",
          isDisabled && "cl-carousel--disabled",
          className
        )}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      >
        <div className="cl-carousel__viewport">
          <div
            className="cl-carousel__track"
            aria-live={isPlaying ? "off" : "polite"}
            style={{
              transform: `translateX(-${clampedActiveIndex * 100}%)`,
            }}
          >
            {normalizedSlides.map((slide, index) => {
              const isActive = index === clampedActiveIndex;
              const label = slide.ariaLabel ?? `${index + 1} of ${totalSlides}`;

              return (
                <div
                  key={index}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={label}
                  aria-hidden={isActive ? "false" : "true"}
                  className={classNames(
                    "cl-carousel__slide",
                    isActive && "cl-carousel__slide--active"
                  )}
                >
                  {slide.content}
                </div>
              );
            })}
          </div>
        </div>

        {/* Previous & Next Control Buttons */}
        {showControls && totalSlides > 0 && (
          <div className="cl-carousel__controls" aria-label="Carousel navigation">
            <button
              type="button"
              className="cl-carousel__arrow-btn cl-carousel__arrow-btn--prev"
              aria-label="Previous slide"
              disabled={isPrevDisabled}
              onClick={goToPrev}
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {autoPlay && (
              <button
                type="button"
                className="cl-carousel__autoplay-btn"
                aria-label={
                  isPlaying
                    ? "Pause automatic slide rotation"
                    : "Start automatic slide rotation"
                }
                onClick={() => setIsPlaying((p) => !p)}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <rect x="3" y="3" width="3.5" height="10" rx="1" />
                    <rect x="9.5" y="3" width="3.5" height="10" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M4.5 3.5V12.5L12 8L4.5 3.5Z" />
                  </svg>
                )}
              </button>
            )}

            <button
              type="button"
              className="cl-carousel__arrow-btn cl-carousel__arrow-btn--next"
              aria-label="Next slide"
              disabled={isNextDisabled}
              onClick={goToNext}
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Pagination Indicators */}
        {showPagination && totalSlides > 1 && (
          <div className="cl-carousel__pagination" role="group" aria-label="Slides pagination">
            {normalizedSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={classNames(
                  "cl-carousel__dot-btn",
                  i === clampedActiveIndex && "cl-carousel__dot-btn--active"
                )}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === clampedActiveIndex ? "true" : undefined}
                disabled={isDisabled}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = "Carousel";
