import * as React from "react";
import { classNames } from "../../utils/classNames";
import type { CarouselSlideProps } from "./Carousel.types";

export const CarouselSlide = React.forwardRef<HTMLDivElement, CarouselSlideProps>(
  function CarouselSlide(props, ref) {
    const { children, className, ...rest } = props;
    return (
      <div
        ref={ref}
        className={classNames("cl-carousel__slide", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

CarouselSlide.displayName = "CarouselSlide";
