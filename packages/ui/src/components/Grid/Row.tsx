import React, { forwardRef, useMemo } from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { gridCssText } from "./Grid.style";
import { RowContext } from "./Grid.context";
import { useBreakpoint } from "./useBreakpoint";
import type {
  RowProps,
  Gutter,
  Breakpoint,
  BreakpointMap,
  RowAlign,
  RowJustify,
} from "./Grid.types";

const breakpointOrder: Breakpoint[] = ["xxxl", "xxl", "xl", "lg", "md", "sm", "xs"];

function resolveSingleGutter(
  gutterVal: Gutter | undefined,
  screens: BreakpointMap
): number | string {
  if (gutterVal === undefined || gutterVal === null) return 0;
  if (typeof gutterVal === "number" || typeof gutterVal === "string") {
    return gutterVal;
  }
  // Responsive object
  for (const bp of breakpointOrder) {
    if (screens[bp] && gutterVal[bp] !== undefined) {
      return gutterVal[bp]!;
    }
  }
  // Fallback to xs if present, otherwise 0
  return gutterVal.xs ?? 0;
}

function resolveGutter(
  gutter: Gutter | [Gutter, Gutter] | undefined,
  screens: BreakpointMap
): [number | string, number | string] {
  if (Array.isArray(gutter)) {
    return [
      resolveSingleGutter(gutter[0], screens),
      resolveSingleGutter(gutter[1], screens),
    ];
  }
  return [resolveSingleGutter(gutter, screens), 0];
}

function getHalfNegativeMargin(val: number | string): string {
  if (typeof val === "number") {
    return `${-val / 2}px`;
  }
  if (!val || val === "0" || val === "0px") {
    return "0px";
  }
  return `calc(-${val} / 2)`;
}

export const Row = forwardRef<HTMLDivElement, RowProps>(
  (
    {
      children,
      gutter = 0,
      align = "top",
      justify = "start",
      wrap = true,
      className,
      style,
      ...restProps
    },
    ref
  ) => {
    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-grid", gridCssText);
    }

    const screens = useBreakpoint();

    const [gutterH, gutterV] = useMemo(
      () => resolveGutter(gutter, screens),
      [gutter, screens]
    );

    // Resolve responsive align if object
    const resolvedAlign: RowAlign = useMemo(() => {
      if (typeof align === "string") return align;
      if (align && typeof align === "object") {
        for (const bp of breakpointOrder) {
          if (screens[bp] && (align as any)[bp]) return (align as any)[bp];
        }
        return (align as any).xs ?? "top";
      }
      return "top";
    }, [align, screens]);

    // Resolve responsive justify if object
    const resolvedJustify: RowJustify = useMemo(() => {
      if (typeof justify === "string") return justify;
      if (justify && typeof justify === "object") {
        for (const bp of breakpointOrder) {
          if (screens[bp] && (justify as any)[bp]) return (justify as any)[bp];
        }
        return (justify as any).xs ?? "start";
      }
      return "start";
    }, [justify, screens]);

    const rowStyle: React.CSSProperties = {
      ...(gutterH
        ? {
            marginLeft: getHalfNegativeMargin(gutterH),
            marginRight: getHalfNegativeMargin(gutterH),
          }
        : {}),
      ...(gutterV
        ? {
            marginTop: getHalfNegativeMargin(gutterV),
            marginBottom: getHalfNegativeMargin(gutterV),
          }
        : {}),
      ...style,
    };

    const rowClasses = [
      "ch-row",
      !wrap && "ch-row--no-wrap",
      resolvedAlign && `ch-row--align-${resolvedAlign}`,
      resolvedJustify && `ch-row--justify-${resolvedJustify}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const contextValue = useMemo(
      () => ({ gutter: [gutterH, gutterV] as [number | string, number | string], wrap }),
      [gutterH, gutterV, wrap]
    );

    return (
      <RowContext.Provider value={contextValue}>
        <div ref={ref} className={rowClasses} style={rowStyle} {...restProps}>
          {children}
        </div>
      </RowContext.Provider>
    );
  }
);

Row.displayName = "Row";
