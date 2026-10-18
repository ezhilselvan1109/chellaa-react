import * as React from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circular" | "rounded" | "square";
export type AvatarStatus = "online" | "offline" | "busy" | "away";
export type AvatarPlacement =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end";

export type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

export interface AvatarContextValue {
  size: AvatarSize;
  shape: AvatarShape;
  imageStatus: ImageLoadingStatus;
  setImageStatus: (status: ImageLoadingStatus) => void;
}

export interface AvatarGroupContextValue {
  size?: AvatarSize | undefined;
  shape?: AvatarShape | undefined;
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Source URL of the avatar image */
  src?: string | undefined;
  /** Responsive image srcset attribute */
  srcSet?: string | undefined;
  /** Alternate text for accessibility and screen readers */
  alt?: string | undefined;
  /** Entity or user name used to automatically derive initials */
  name?: string | undefined;
  /** Standardized optical size scale */
  size?: AvatarSize | undefined;
  /** Geometric border radius shape */
  shape?: AvatarShape | undefined;
  /** Custom fallback element rendered when image is absent or errors */
  fallback?: React.ReactNode | undefined;
  /** Custom generic icon rendered when initials and image are absent */
  icon?: React.ReactNode | undefined;
  /** Delegate root DOM element rendering via Slot primitive */
  asChild?: boolean | undefined;
  /** Callback fired when image fails to load */
  onError?: React.ReactEventHandler<HTMLImageElement> | undefined;
  /** Callback fired when image loads successfully */
  onLoad?: React.ReactEventHandler<HTMLImageElement> | undefined;
}

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Delegate image DOM element rendering via Slot primitive */
  asChild?: boolean | undefined;
}

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Delegate fallback DOM element rendering via Slot primitive */
  asChild?: boolean | undefined;
  /** Optional delay in ms before rendering fallback to avoid flashing */
  delayMs?: number | undefined;
}

export interface AvatarBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Presence indicator status intent */
  status?: AvatarStatus | undefined;
  /** Corner anchor position relative to avatar */
  placement?: AvatarPlacement | undefined;
  /** Delegate badge DOM element rendering via Slot primitive */
  asChild?: boolean | undefined;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of avatars to render before displaying +N excess count */
  max?: number | undefined;
  /** Propagated size scale across all child avatars */
  size?: AvatarSize | undefined;
  /** Propagated geometric shape across all child avatars */
  shape?: AvatarShape | undefined;
  /** Overlap margin offset (default: -8px) */
  spacing?: number | string | undefined;
  /** Avatar elements to group */
  children: React.ReactNode;
}
