import { Transitions } from "./types";

export const defaultTransitions: Transitions = {
  easing: {
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
  },
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  create(
    props: string | string[] = ["all"],
    options: {
      duration?: number | string;
      easing?: string;
      delay?: number | string;
    } = {}
  ): string {
    const {
      duration = defaultTransitions.duration.standard,
      easing = defaultTransitions.easing.easeInOut,
      delay = 0,
    } = options;

    const formatDuration = (d: number | string) =>
      typeof d === "string" ? d : `${d}ms`;

    const formatDelay = (d: number | string) =>
      typeof d === "string" ? d : `${d}ms`;

    const properties = Array.isArray(props) ? props : [props];

    return properties
      .map(
        (prop) =>
          `${prop} ${formatDuration(duration)} ${easing} ${formatDelay(delay)}`
      )
      .join(", ");
  },
};
