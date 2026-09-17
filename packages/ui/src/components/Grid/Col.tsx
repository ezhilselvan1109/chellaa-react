import React, { forwardRef, useContext } from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { gridCssText } from "./Grid.style";
import { RowContext } from "./Grid.context";
import type { ColProps, Breakpoint, ColSize } from "./Grid.types";

const breakpoints: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "xxl", "xxxl"];

function getHalfPositivePadding(val: number | string): string {
  if (typeof val === "number") {
    return `${val / 2}px`;
  }
  if (!val || val === "0" || val === "0px") {
    return "0px";
  }
  return `calc(${val} / 2)`;
}

function parseFlex(flex: string | number | undefined): string | undefined {
  if (flex === undefined) return undefined;
  if (typeof flex === "number") {
    return `${flex} ${flex} auto`;
  }
  if (/^\d+(\.\d+)?$/.test(flex)) {
    return `${flex} 1 0%`;
  }
  return flex;
}

export const Col = forwardRef<HTMLDivElement, ColProps>(
  (
    {
      children,
      span,
      offset,
      order,
      pull,
      push,
      flex,
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
      xxxl,
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

    const { gutter } = useContext(RowContext);

    const [gutterH, gutterV] = gutter || [0, 0];

    const colClasses: string[] = ["ch-col"];

    if (span !== undefined) {
      colClasses.push(`ch-col-${span}`);
    }
    if (offset !== undefined && offset > 0) {
      colClasses.push(`ch-col-offset-${offset}`);
    }
    if (push !== undefined && push > 0) {
      colClasses.push(`ch-col-push-${push}`);
    }
    if (pull !== undefined && pull > 0) {
      colClasses.push(`ch-col-pull-${pull}`);
    }
    if (order !== undefined && order > 0) {
      colClasses.push(`ch-col-order-${order}`);
    }

    // Responsive breakpoints
    const bpProps: Record<Breakpoint, number | ColSize | undefined> = {
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
      xxxl,
    };

    breakpoints.forEach((bp) => {
      const config = bpProps[bp];
      if (config === undefined) return;

      if (typeof config === "number") {
        colClasses.push(`ch-col-${bp}-${config}`);
      } else if (typeof config === "object" && config !== null) {
        if (config.span !== undefined) {
          colClasses.push(`ch-col-${bp}-${config.span}`);
        }
        if (config.offset !== undefined && config.offset > 0) {
          colClasses.push(`ch-col-${bp}-offset-${config.offset}`);
        }
        if (config.push !== undefined && config.push > 0) {
          colClasses.push(`ch-col-${bp}-push-${config.push}`);
        }
        if (config.pull !== undefined && config.pull > 0) {
          colClasses.push(`ch-col-${bp}-pull-${config.pull}`);
        }
        if (config.order !== undefined && config.order > 0) {
          colClasses.push(`ch-col-${bp}-order-${config.order}`);
        }
      }
    });

    if (className) {
      colClasses.push(className);
    }

    const resolvedFlex = parseFlex(flex);

    const colStyle: React.CSSProperties = {
      ...(gutterH
        ? {
            paddingLeft: getHalfPositivePadding(gutterH),
            paddingRight: getHalfPositivePadding(gutterH),
          }
        : {}),
      ...(gutterV
        ? {
            paddingTop: getHalfPositivePadding(gutterV),
            paddingBottom: getHalfPositivePadding(gutterV),
          }
        : {}),
      ...(resolvedFlex ? { flex: resolvedFlex } : {}),
      ...style,
    };

    return (
      <div ref={ref} className={colClasses.join(" ")} style={colStyle} {...restProps}>
        {children}
      </div>
    );
  }
);

Col.displayName = "Col";
