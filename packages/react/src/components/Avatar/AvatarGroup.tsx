"use client";

import * as React from "react";
import { classNames } from "../../utils/classNames";
import type {
  AvatarGroupProps,
  AvatarGroupContextValue,
} from "./Avatar.types";

export const AvatarGroupContext =
  React.createContext<AvatarGroupContextValue>({});

export const useAvatarGroupContext = (): AvatarGroupContextValue =>
  React.useContext(AvatarGroupContext);

/**
 * AvatarGroup stacks multiple avatars with negative margin overlap and calculates +N excess items.
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(
    {
      max,
      size = "md",
      shape = "circular",
      spacing,
      className,
      style,
      children,
      ...restProps
    },
    ref,
  ) {
    const validChildren = React.Children.toArray(children).filter(
      React.isValidElement,
    );

    const hasExcess = max !== undefined && max > 0 && validChildren.length > max;
    const visibleChildren = hasExcess
      ? validChildren.slice(0, max)
      : validChildren;
    const excessCount = hasExcess ? validChildren.length - max : 0;

    const totalItems = visibleChildren.length + (excessCount > 0 ? 1 : 0);

    const contextValue = React.useMemo<AvatarGroupContextValue>(
      () => ({ size, shape }),
      [size, shape],
    );

    return (
      <div
        ref={ref}
        className={classNames("cl-avatar-group", className)}
        role="group"
        style={{
          ...(spacing !== undefined
            ? ({
                "--cl-avatar-group-spacing":
                  typeof spacing === "number" ? `${spacing}px` : spacing,
              } as React.CSSProperties)
            : {}),
          ...style,
        }}
        {...restProps}
      >
        <AvatarGroupContext.Provider value={contextValue}>
          {visibleChildren.map((child, index) => {
            const element = child as React.ReactElement<{
              style?: React.CSSProperties;
            }>;
            const childStyle: React.CSSProperties = {
              zIndex: totalItems - index,
              ...(element.props?.style || {}),
            };
            return React.cloneElement(element, {
              key: element.key ?? index,
              style: childStyle,
            });
          })}
          {excessCount > 0 && (
            <div
              className={classNames(
                "cl-avatar",
                `cl-avatar--${size}`,
                `cl-avatar--${shape}`,
                "cl-avatar-group__excess",
              )}
              style={{ zIndex: 0 }}
              aria-label={`+${excessCount} others`}
            >
              +{excessCount}
            </div>
          )}
        </AvatarGroupContext.Provider>
      </div>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";
