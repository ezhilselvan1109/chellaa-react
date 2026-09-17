import { useState, useEffect } from "react";
import type { Breakpoint, BreakpointMap } from "./Grid.types";

export const responsiveMap: Record<Breakpoint, string> = {
  xs: "(max-width: 575.98px)",
  sm: "(min-width: 576px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  xxl: "(min-width: 1600px)",
  xxxl: "(min-width: 1920px)",
};

const getInitialScreens = (): BreakpointMap => {
  const screens: BreakpointMap = {
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
    xxxl: false,
  };

  if (typeof window === "undefined" || !window.matchMedia) {
    return screens;
  }

  (Object.keys(responsiveMap) as Breakpoint[]).forEach((bp) => {
    screens[bp] = window.matchMedia(responsiveMap[bp]).matches;
  });

  return screens;
};

export function useBreakpoint(): BreakpointMap {
  const [screens, setScreens] = useState<BreakpointMap>(getInitialScreens);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQueryLists: { bp: Breakpoint; mql: MediaQueryList }[] = [];

    const updateScreens = () => {
      const nextScreens: BreakpointMap = {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        xxl: false,
        xxxl: false,
      };

      mediaQueryLists.forEach(({ bp, mql }) => {
        nextScreens[bp] = mql.matches;
      });

      setScreens((prev) => {
        const isDifferent = (Object.keys(nextScreens) as Breakpoint[]).some(
          (key) => nextScreens[key] !== prev[key]
        );
        return isDifferent ? nextScreens : prev;
      });
    };

    (Object.keys(responsiveMap) as Breakpoint[]).forEach((bp) => {
      const mql = window.matchMedia(responsiveMap[bp]);
      mediaQueryLists.push({ bp, mql });

      if (mql.addEventListener) {
        mql.addEventListener("change", updateScreens);
      } else {
        mql.addListener(updateScreens);
      }
    });

    // Initial check
    updateScreens();

    return () => {
      mediaQueryLists.forEach(({ mql }) => {
        if (mql.removeEventListener) {
          mql.removeEventListener("change", updateScreens);
        } else {
          mql.removeListener(updateScreens);
        }
      });
    };
  }, []);

  return screens;
}
