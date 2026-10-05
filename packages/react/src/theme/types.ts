import * as React from "react";

export type ColorMode = "light" | "dark";

export interface PaletteColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

export interface TypeText {
  primary: string;
  secondary: string;
  disabled: string;
}

export interface TypeBackground {
  default: string;
  paper: string;
  surface: string;
}

export interface TypeAction {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  selectedOpacity: number;
  disabled: string;
  disabledBackground: string;
  focus: string;
  focusOpacity: number;
}

export interface Palette {
  mode: ColorMode;
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  text: TypeText;
  background: TypeBackground;
  divider: string;
  action: TypeAction;
}

export type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl";

export interface Breakpoints {
  values: Record<BreakpointKey, number>;
  up: (key: BreakpointKey | number) => string;
  down: (key: BreakpointKey | number) => string;
  between: (start: BreakpointKey | number, end: BreakpointKey | number) => string;
  only: (key: BreakpointKey) => string;
}

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "overline";

export interface TypographyStyle {
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize?: string;
  lineHeight?: number | string;
  letterSpacing?: string;
  textTransform?: React.CSSProperties["textTransform"];
}

export interface TypographyTheme {
  fontFamily: string;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: TypographyStyle;
  h2: TypographyStyle;
  h3: TypographyStyle;
  h4: TypographyStyle;
  h5: TypographyStyle;
  h6: TypographyStyle;
  subtitle1: TypographyStyle;
  subtitle2: TypographyStyle;
  body1: TypographyStyle;
  body2: TypographyStyle;
  button: TypographyStyle;
  caption: TypographyStyle;
  overline: TypographyStyle;
}

export interface Transitions {
  easing: {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    sharp: string;
  };
  duration: {
    shortest: number;
    shorter: number;
    short: number;
    standard: number;
    complex: number;
    enteringScreen: number;
    leavingScreen: number;
  };
  create: (
    props: string | string[],
    options?: {
      duration?: number | string;
      easing?: string;
      delay?: number | string;
    }
  ) => string;
}

export interface ZIndex {
  mobileStepper: number;
  fab: number;
  speedDial: number;
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
}

export interface ComponentOverride<P = any> {
  defaultProps?: Partial<P>;
  styleOverrides?: {
    [slot: string]:
      | React.CSSProperties
      | ((params: { theme: ChellaaTheme; ownerState: P }) => React.CSSProperties);
  };
}

export interface ChellaaTheme {
  palette: Palette;
  typography: TypographyTheme;
  spacing: (...factors: (number | string)[]) => string;
  shape: {
    borderRadius: number;
  };
  breakpoints: Breakpoints;
  shadows: string[]; // 25 elevations (0 to 24)
  transitions: Transitions;
  zIndex: ZIndex;
  components?: Record<string, ComponentOverride>;
}

// DeepPartial helper for createTheme options
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Function
    ? T[P]
    : T[P] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : T[P] extends object
        ? DeepPartial<T[P]>
        : T[P];
};

export type ThemeOptions = DeepPartial<ChellaaTheme>;
