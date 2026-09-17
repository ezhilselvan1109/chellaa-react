import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
} from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { masonryCssText } from "./Masonry.style";
import { useBreakpoint } from "../Grid/useBreakpoint";
import type { Breakpoint, BreakpointMap } from "../Grid/Grid.types";
import type {
  MasonryProps,
  MasonryItem,
  Gap,
} from "./Masonry.types";

const breakpointOrder: Breakpoint[] = ["xxl", "xl", "lg", "md", "sm", "xs"];

function resolveNumber(
  val: Gap | undefined,
  screens: BreakpointMap,
  fallback = 0
): number {
  if (val === undefined || val === null) return fallback;
  if (typeof val === "number") return val;
  for (const bp of breakpointOrder) {
    if (screens[bp] && val[bp] !== undefined) {
      return val[bp]!;
    }
  }
  return val.xs ?? fallback;
}

function resolveColumns(
  cols: number | Partial<Record<Breakpoint, number>> | undefined,
  screens: BreakpointMap
): number {
  if (cols === undefined) return 3;
  if (typeof cols === "number") return Math.max(1, cols);
  for (const bp of breakpointOrder) {
    if (screens[bp] && cols[bp] !== undefined) {
      return Math.max(1, cols[bp]!);
    }
  }
  return Math.max(1, cols.xs ?? 3);
}

function resolveGutter(
  gutter: Gap | [Gap, Gap] | undefined,
  screens: BreakpointMap
): [number, number] {
  if (Array.isArray(gutter)) {
    return [
      resolveNumber(gutter[0], screens, 0),
      resolveNumber(gutter[1], screens, 0),
    ];
  }
  const g = resolveNumber(gutter, screens, 0);
  return [g, g];
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const Masonry = forwardRef<HTMLDivElement, MasonryProps>(
  (props, ref) => {
    const {
      rootClassName,
      columns = 3,
      gutter = 0,
      items: rawItems,
      itemRender,
      children,
      fresh = false,
      onLayoutChange,
      classNames,
      styles,
      className,
      style,
      ...restProps
    } = props;

    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-masonry", masonryCssText);
    }

    const containerRef = useRef<HTMLDivElement | null>(null);
    const itemElementsRef = useRef<Map<React.Key, HTMLElement>>(new Map());
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [measuredHeights, setMeasuredHeights] = useState<Map<React.Key, number>>(
      new Map()
    );
    const lastSummaryJsonRef = useRef<string>("");

    const screens = useBreakpoint();
    const resolvedColumns = resolveColumns(columns, screens);
    const [gutterH, gutterV] = resolveGutter(gutter, screens);

    // Normalize items: support both items prop and children
    const normalizedItems = useMemo<MasonryItem[]>(() => {
      if (rawItems && rawItems.length > 0) {
        return rawItems;
      }
      if (children) {
        return React.Children.toArray(children).map((child, index) => {
          if (React.isValidElement(child)) {
            return {
              key: child.key ?? `masonry-child-${index}`,
              children: child,
            };
          }
          return {
            key: `masonry-child-${index}`,
            children: child,
          };
        });
      }
      return [];
    }, [rawItems, children]);

    // Measure container width
    const measureContainer = useCallback(() => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setContainerWidth((prev) => (prev !== width ? width : prev));
      }
    }, []);

    useIsomorphicLayoutEffect(() => {
      measureContainer();
      if (typeof window === "undefined") return;

      window.addEventListener("resize", measureContainer);

      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined" && containerRef.current) {
        resizeObserver = new ResizeObserver(() => measureContainer());
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        window.removeEventListener("resize", measureContainer);
        if (resizeObserver) resizeObserver.disconnect();
      };
    }, [measureContainer]);

    // Measure item heights
    const measureItemHeights = useCallback(() => {
      const nextHeights = new Map<React.Key, number>();
      let hasChange = false;

      normalizedItems.forEach((item) => {
        if (item.height !== undefined) {
          nextHeights.set(item.key, item.height);
          if (measuredHeights.get(item.key) !== item.height) hasChange = true;
          return;
        }

        const el = itemElementsRef.current.get(item.key);
        if (el) {
          const height = el.offsetHeight;
          nextHeights.set(item.key, height);
          if (measuredHeights.get(item.key) !== height) hasChange = true;
        }
      });

      if (hasChange || nextHeights.size !== measuredHeights.size) {
        setMeasuredHeights(nextHeights);
      }
    }, [normalizedItems, measuredHeights]);

    useIsomorphicLayoutEffect(() => {
      measureItemHeights();
    });

    // Observe item size changes if fresh is true
    useEffect(() => {
      if (!fresh || typeof ResizeObserver === "undefined") return;

      const observer = new ResizeObserver(() => {
        measureItemHeights();
      });

      itemElementsRef.current.forEach((el) => {
        observer.observe(el);
      });

      return () => {
        observer.disconnect();
      };
    }, [fresh, measureItemHeights, normalizedItems]);

    // Compute column layouts and shortest-column placement
    const { layoutPositions, totalHeight, layoutSummary } = useMemo(() => {
      const positions = new Map<
        React.Key,
        { x: number; y: number; width: number; column: number }
      >();
      const colHeights = new Array(resolvedColumns).fill(0);

      const colWidth =
        containerWidth > 0
          ? (containerWidth - (resolvedColumns - 1) * gutterH) / resolvedColumns
          : 0;

      const summary: { key: React.Key; column: number }[] = [];

      normalizedItems.forEach((item) => {
        let targetCol: number;

        if (
          item.column !== undefined &&
          item.column >= 0 &&
          item.column < resolvedColumns
        ) {
          targetCol = item.column;
        } else {
          // Place into currently shortest column
          targetCol = colHeights.indexOf(Math.min(...colHeights));
        }

        const x = targetCol * (colWidth + gutterH);
        const y = colHeights[targetCol];
        const h = item.height ?? measuredHeights.get(item.key) ?? 0;

        positions.set(item.key, {
          x,
          y,
          width: colWidth,
          column: targetCol,
        });

        colHeights[targetCol] += h + gutterV;
        summary.push({ key: item.key, column: targetCol });
      });

      const maxColHeight = Math.max(0, ...colHeights);
      const computedTotalHeight =
        maxColHeight > 0 ? maxColHeight - gutterV : 0;

      return {
        layoutPositions: positions,
        totalHeight: computedTotalHeight,
        layoutSummary: summary,
      };
    }, [
      normalizedItems,
      resolvedColumns,
      containerWidth,
      gutterH,
      gutterV,
      measuredHeights,
    ]);

    // Safely trigger onLayoutChange when layout column assignments actually change
    useEffect(() => {
      if (!onLayoutChange || layoutSummary.length === 0) return;
      const currentJson = JSON.stringify(layoutSummary);
      if (lastSummaryJsonRef.current !== currentJson) {
        lastSummaryJsonRef.current = currentJson;
        onLayoutChange(layoutSummary);
      }
    }, [layoutSummary, onLayoutChange]);

    // Resolve semantic DOM classNames & styles (Ant Design 6.0 supports object or function)
    const resolvedClassNames =
      typeof classNames === "function"
        ? classNames({ props })
        : classNames || {};
    const resolvedStyles =
      typeof styles === "function" ? styles({ props }) : styles || {};

    const rootClasses = [
      "ch-masonry",
      rootClassName,
      resolvedClassNames.root,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const rootStyle: React.CSSProperties = {
      height: totalHeight > 0 ? `${totalHeight}px` : undefined,
      minHeight: totalHeight > 0 ? `${totalHeight}px` : undefined,
      ...resolvedStyles.root,
      ...style,
    };

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (node) {
            (node as any).nativeElement = node;
          }
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as any).current = node;
          }
        }}
        className={rootClasses}
        style={rootStyle}
        onLoadCapture={measureItemHeights}
        {...restProps}
      >
        {normalizedItems.map((item, index) => {
          const pos = layoutPositions.get(item.key);
          const isMeasured =
            typeof window === "undefined" ||
            item.height !== undefined ||
            measuredHeights.has(item.key);

          const itemWidth =
            pos && pos.width > 0
              ? `${pos.width}px`
              : `calc((100% - ${(resolvedColumns - 1) * gutterH}px) / ${resolvedColumns})`;

          const itemStyle: React.CSSProperties = {
            width: itemWidth,
            transform: pos
              ? `translate3d(${pos.x}px, ${pos.y}px, 0)`
              : undefined,
            visibility: isMeasured ? "visible" : "hidden",
            ...resolvedStyles.item,
          };

          const itemWithIndex = { ...item, index };
          const itemContent =
            item.children ??
            (itemRender ? itemRender(itemWithIndex, index) : null);

          return (
            <div
              key={item.key}
              ref={(el) => {
                if (el) {
                  itemElementsRef.current.set(item.key, el);
                } else {
                  itemElementsRef.current.delete(item.key);
                }
              }}
              className={["ch-masonry-item", resolvedClassNames.item]
                .filter(Boolean)
                .join(" ")}
              style={itemStyle}
            >
              {itemContent}
            </div>
          );
        })}
      </div>
    );
  }
);

Masonry.displayName = "Masonry";
