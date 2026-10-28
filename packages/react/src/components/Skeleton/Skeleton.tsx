"use client";

import * as React from "react";
import { classNames } from "../../utils/classNames";
import type { SkeletonProps } from "./Skeleton.types";

function formatDimension(dim?: string | number): string | undefined {
  if (dim === undefined || dim === null) return undefined;
  if (typeof dim === "number") return `${dim}px`;
  return dim;
}

/**
 * Skeleton displays a placeholder preview of content while data is loading.
 *
 * @example
 * ```tsx
 * <Skeleton variant="circular" width={40} height={40} />
 * <Skeleton variant="rectangular" width="100%" height={200} />
 * <Skeleton isLoaded={!isLoading}><ProfileCard /></Skeleton>
 * ```
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      width,
      height,
      isLoaded = false,
      animation = "pulse",
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    if (isLoaded) {
      return <>{children}</>;
    }

    const inlineStyles: React.CSSProperties = {
      ...style,
      width: formatDimension(width) ?? style?.width,
      height: formatDimension(height) ?? style?.height,
    };

    return (
      <div
        ref={ref}
        className={classNames(
          "cl-skeleton",
          `cl-skeleton--${variant}`,
          `cl-skeleton--${animation}`,
          className,
        )}
        style={inlineStyles}
        aria-hidden="true"
        {...rest}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
