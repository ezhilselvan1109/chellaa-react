"use client";

import * as React from "react";
import { classNames } from "../../utils/classNames";
import { Slot } from "../../primitives/Slot";
import { AvatarGroup, useAvatarGroupContext } from "./AvatarGroup";
import type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
  AvatarBadgeProps,
  AvatarContextValue,
  AvatarSize,
  AvatarShape,
  ImageLoadingStatus,
} from "./Avatar.types";

export const AvatarContext = React.createContext<AvatarContextValue | null>(null);

export const useAvatarContext = (): AvatarContextValue | null =>
  React.useContext(AvatarContext);

/**
 * Extracts up to two uppercase initials from a given name string.
 * Handles single names, multi-word names, hyphens, and unicode characters.
 */
export function getInitials(name?: string): string {
  if (!name || typeof name !== "string") return "";
  const trimmed = name.trim();
  if (!trimmed) return "";

  const parts = trimmed.split(/[\s-]+/).filter(Boolean);
  if (parts.length === 0) return "";

  const firstPart = parts[0];
  if (!firstPart) return "";

  if (parts.length === 1) {
    const chars = Array.from(firstPart);
    return chars[0] ? chars[0].toUpperCase() : "";
  }

  const lastPart = parts[parts.length - 1];
  if (!lastPart) return "";

  const firstChar = Array.from(firstPart)[0] ?? "";
  const lastChar = Array.from(lastPart)[0] ?? "";
  return (firstChar + lastChar).toUpperCase();
}

/**
 * Default generic silhouette icon SVG rendered when image and initials are absent.
 */
function DefaultAvatarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="60%"
      height="60%"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

/**
 * Avatar.Image renders the image element with automatic error and load management.
 */
export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  function AvatarImage(
    { src, srcSet, alt, className, style, asChild = false, onLoad, onError, ...restProps },
    ref,
  ) {
    const context = useAvatarContext();
    const imageStatus = context?.imageStatus ?? (src ? "loading" : "error");

    const handleLoad = React.useCallback(
      (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        context?.setImageStatus("loaded");
        onLoad?.(event);
      },
      [context, onLoad],
    );

    const handleError = React.useCallback(
      (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        context?.setImageStatus("error");
        onError?.(event);
      },
      [context, onError],
    );

    if (imageStatus === "error" || !src) {
      return null;
    }

    const imageClasses = classNames("cl-avatar__image", className);
    const imageStyle: React.CSSProperties = {
      opacity: imageStatus === "loaded" ? 1 : 0,
      ...style,
    };

    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          className={imageClasses}
          style={imageStyle}
          {...(restProps as Record<string, unknown>)}
        />
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        srcSet={srcSet}
        alt={alt ?? ""}
        className={imageClasses}
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
        {...restProps}
      />
    );
  },
);

AvatarImage.displayName = "Avatar.Image";

/**
 * Avatar.Fallback renders fallback initials, icons, or custom elements when image has not loaded.
 */
export const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  AvatarFallbackProps
>(function AvatarFallback(
  { children, className, delayMs, asChild = false, ...restProps },
  ref,
) {
  const context = useAvatarContext();
  const [canRender, setCanRender] = React.useState(delayMs === undefined);

  React.useEffect(() => {
    if (delayMs !== undefined && delayMs > 0) {
      const timer = setTimeout(() => setCanRender(true), delayMs);
      return () => clearTimeout(timer);
    }
    setCanRender(true);
    return undefined;
  }, [delayMs]);

  if (context && context.imageStatus === "loaded") {
    return null;
  }

  if (!canRender) {
    return null;
  }

  const fallbackClasses = classNames("cl-avatar__fallback", className);

  if (asChild) {
    return (
      <Slot
        ref={ref as React.Ref<HTMLElement>}
        className={fallbackClasses}
        {...(restProps as Record<string, unknown>)}
      >
        {children}
      </Slot>
    );
  }

  return (
    <span ref={ref} className={fallbackClasses} {...restProps}>
      {children}
    </span>
  );
});

AvatarFallback.displayName = "Avatar.Fallback";

/**
 * Avatar.Badge renders presence status indicator dot anchored to an avatar corner.
 */
export const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  function AvatarBadge(
    {
      status = "online",
      placement = "bottom-end",
      className,
      asChild = false,
      "aria-label": ariaLabel,
      ...restProps
    },
    ref,
  ) {
    const badgeClasses = classNames(
      "cl-avatar__badge",
      `cl-avatar__badge--${status}`,
      `cl-avatar__badge--${placement}`,
      className,
    );

    const accessibleLabel = ariaLabel ?? `Status: ${status}`;

    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          className={badgeClasses}
          role="status"
          aria-label={accessibleLabel}
          {...(restProps as Record<string, unknown>)}
        />
      );
    }

    return (
      <span
        ref={ref}
        className={badgeClasses}
        role="status"
        aria-label={accessibleLabel}
        {...restProps}
      />
    );
  },
);

AvatarBadge.displayName = "Avatar.Badge";

/**
 * Avatar represents a user, entity, or organization identity with automated fallbacks and presence indicators.
 */
const AvatarBase = React.forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    src,
    srcSet,
    alt,
    name,
    size: sizeProp,
    shape: shapeProp,
    fallback,
    icon,
    asChild = false,
    className,
    children,
    onError,
    onLoad,
    "aria-label": ariaLabel,
    ...restProps
  },
  ref,
) {
  const groupContext = useAvatarGroupContext();
  const size: AvatarSize = sizeProp ?? groupContext.size ?? "md";
  const shape: AvatarShape = shapeProp ?? groupContext.shape ?? "circular";

  const [imageStatus, setImageStatus] = React.useState<ImageLoadingStatus>(
    src ? "loading" : "error",
  );

  React.useEffect(() => {
    setImageStatus(src ? "loading" : "error");
  }, [src]);

  const contextValue = React.useMemo<AvatarContextValue>(
    () => ({
      size,
      shape,
      imageStatus,
      setImageStatus,
    }),
    [size, shape, imageStatus],
  );

  const initials = getInitials(name);
  const computedAriaLabel = ariaLabel ?? alt ?? name;

  const rootClasses = classNames(
    "cl-avatar",
    `cl-avatar--${size}`,
    `cl-avatar--${shape}`,
    className,
  );

  const accessibilityProps: React.HTMLAttributes<HTMLDivElement> = {};
  if (computedAriaLabel) {
    accessibilityProps.role = "img";
    accessibilityProps["aria-label"] = computedAriaLabel;
  }

  // If children are supplied, render in compound mode
  if (children) {
    if (asChild) {
      return (
        <AvatarContext.Provider value={contextValue}>
          <Slot
            ref={ref as React.Ref<HTMLElement>}
            className={rootClasses}
            {...accessibilityProps}
            {...(restProps as Record<string, unknown>)}
          >
            {children}
          </Slot>
        </AvatarContext.Provider>
      );
    }

    return (
      <AvatarContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={rootClasses}
          {...accessibilityProps}
          {...restProps}
        >
          {children}
        </div>
      </AvatarContext.Provider>
    );
  }

  // Self-contained convenience rendering
  const fallbackContent =
    fallback ??
    (initials ? (
      initials
    ) : icon ? (
      icon
    ) : (
      <DefaultAvatarIcon />
    ));

  const content = (
    <>
      {src && imageStatus !== "error" && (
        <AvatarImage
          src={src}
          srcSet={srcSet}
          alt={alt ?? name ?? ""}
          onLoad={onLoad}
          onError={onError}
        />
      )}
      {imageStatus !== "loaded" && (
        <AvatarFallback>{fallbackContent}</AvatarFallback>
      )}
    </>
  );

  if (asChild) {
    return (
      <AvatarContext.Provider value={contextValue}>
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          className={rootClasses}
          {...accessibilityProps}
          {...(restProps as Record<string, unknown>)}
        >
          {content}
        </Slot>
      </AvatarContext.Provider>
    );
  }

  return (
    <AvatarContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={rootClasses}
        {...accessibilityProps}
        {...restProps}
      >
        {content}
      </div>
    </AvatarContext.Provider>
  );
});

AvatarBase.displayName = "Avatar";

export interface AvatarComponent
  extends React.ForwardRefExoticComponent<
    AvatarProps & React.RefAttributes<HTMLDivElement>
  > {
  Root: typeof AvatarBase;
  Image: typeof AvatarImage;
  Fallback: typeof AvatarFallback;
  Badge: typeof AvatarBadge;
  Group: typeof AvatarGroup;
}

export const Avatar = AvatarBase as AvatarComponent;
Avatar.Root = AvatarBase;
Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;
Avatar.Badge = AvatarBadge;
Avatar.Group = AvatarGroup;

export const AvatarRoot = AvatarBase;
