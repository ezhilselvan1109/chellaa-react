import { BreakpointKey, Breakpoints } from "./types";

export const defaultBreakpointValues: Record<BreakpointKey, number> = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const breakpointKeys: BreakpointKey[] = ["xs", "sm", "md", "lg", "xl"];

export function createBreakpoints(
  customValues?: Partial<Record<BreakpointKey, number>>
): Breakpoints {
  const values: Record<BreakpointKey, number> = {
    ...defaultBreakpointValues,
    ...customValues,
  };

  const step = 5 / 100; // 0.05px

  const up = (key: BreakpointKey | number): string => {
    const value = typeof key === "number" ? key : values[key];
    return `@media (min-width:${value}px)`;
  };

  const down = (key: BreakpointKey | number): string => {
    const value = typeof key === "number" ? key : values[key];
    return `@media (max-width:${value - step}px)`;
  };

  const between = (
    start: BreakpointKey | number,
    end: BreakpointKey | number
  ): string => {
    const min = typeof start === "number" ? start : values[start];
    const max = typeof end === "number" ? end : values[end];
    return `@media (min-width:${min}px) and (max-width:${max - step}px)`;
  };

  const only = (key: BreakpointKey): string => {
    const index = breakpointKeys.indexOf(key);
    if (index === breakpointKeys.length - 1) {
      return up(key);
    }
    const nextKey = breakpointKeys[index + 1];
    return nextKey ? between(key, nextKey) : up(key);
  };

  return {
    values,
    up,
    down,
    between,
    only,
  };
}

export const defaultBreakpoints = createBreakpoints();
