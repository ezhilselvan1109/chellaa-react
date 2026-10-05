import type { CSSProperties } from "react";
import type { BreakpointKey, ChellaaTheme } from "../theme/types";

/**
 * Responsive value supports:
 * 1. Single value: 2 | "100%"
 * 2. Array syntax: [1, 2, 4] (mapped to xs, sm, md...)
 * 3. Object syntax: { xs: 1, sm: 2, md: 4 }
 */
export type ResponsiveValue<T> =
  | T
  | (T | null | undefined)[]
  | Partial<Record<BreakpointKey, T>>;

/**
 * Shorthand and theme-aware system properties
 */
export interface SystemStyleProperties {
  // Spacing shorthands (numbers map to theme.spacing(n))
  m?: ResponsiveValue<number | string>;
  margin?: ResponsiveValue<number | string>;
  mt?: ResponsiveValue<number | string>;
  marginTop?: ResponsiveValue<number | string>;
  mr?: ResponsiveValue<number | string>;
  marginRight?: ResponsiveValue<number | string>;
  mb?: ResponsiveValue<number | string>;
  marginBottom?: ResponsiveValue<number | string>;
  ml?: ResponsiveValue<number | string>;
  marginLeft?: ResponsiveValue<number | string>;
  mx?: ResponsiveValue<number | string>;
  marginInline?: ResponsiveValue<number | string>;
  my?: ResponsiveValue<number | string>;
  marginBlock?: ResponsiveValue<number | string>;

  p?: ResponsiveValue<number | string>;
  padding?: ResponsiveValue<number | string>;
  pt?: ResponsiveValue<number | string>;
  paddingTop?: ResponsiveValue<number | string>;
  pr?: ResponsiveValue<number | string>;
  paddingRight?: ResponsiveValue<number | string>;
  pb?: ResponsiveValue<number | string>;
  paddingBottom?: ResponsiveValue<number | string>;
  pl?: ResponsiveValue<number | string>;
  paddingLeft?: ResponsiveValue<number | string>;
  px?: ResponsiveValue<number | string>;
  paddingInline?: ResponsiveValue<number | string>;
  py?: ResponsiveValue<number | string>;
  paddingBlock?: ResponsiveValue<number | string>;

  gap?: ResponsiveValue<number | string>;
  rowGap?: ResponsiveValue<number | string>;
  columnGap?: ResponsiveValue<number | string>;

  // Colors & Palette resolution (e.g. 'primary.main', 'background.paper')
  color?: ResponsiveValue<string>;
  bgcolor?: ResponsiveValue<string>;
  backgroundColor?: ResponsiveValue<string>;
  borderColor?: ResponsiveValue<string>;

  // Elevation & Shadows (number 0..24 maps to theme.shadows)
  elevation?: ResponsiveValue<number>;
  boxShadow?: ResponsiveValue<number | string>;

  // Borders & Shape
  borderRadius?: ResponsiveValue<number | string>;

  // Typography & Layout
  zIndex?: ResponsiveValue<number | string>;
  display?: ResponsiveValue<CSSProperties["display"]>;
  flexDirection?: ResponsiveValue<CSSProperties["flexDirection"]>;
  flexWrap?: ResponsiveValue<CSSProperties["flexWrap"]>;
  justifyContent?: ResponsiveValue<CSSProperties["justifyContent"]>;
  alignItems?: ResponsiveValue<CSSProperties["alignItems"]>;
  alignContent?: ResponsiveValue<CSSProperties["alignContent"]>;
  flexGrow?: ResponsiveValue<CSSProperties["flexGrow"]>;
  flexShrink?: ResponsiveValue<CSSProperties["flexShrink"]>;
  flexBasis?: ResponsiveValue<CSSProperties["flexBasis"]>;
  flex?: ResponsiveValue<CSSProperties["flex"]>;

  width?: ResponsiveValue<number | string>;
  minWidth?: ResponsiveValue<number | string>;
  maxWidth?: ResponsiveValue<number | string>;
  height?: ResponsiveValue<number | string>;
  minHeight?: ResponsiveValue<number | string>;
  maxHeight?: ResponsiveValue<number | string>;

  position?: ResponsiveValue<CSSProperties["position"]>;
  top?: ResponsiveValue<number | string>;
  right?: ResponsiveValue<number | string>;
  bottom?: ResponsiveValue<number | string>;
  left?: ResponsiveValue<number | string>;

  overflow?: ResponsiveValue<CSSProperties["overflow"]>;
  opacity?: ResponsiveValue<CSSProperties["opacity"]>;
}

export type StandardCSSProperties = {
  [K in keyof CSSProperties]?: ResponsiveValue<CSSProperties[K]>;
};

export type SystemCssProperties = SystemStyleProperties & StandardCSSProperties;

export interface SxObject extends SystemCssProperties {
  [key: string]:
    | ResponsiveValue<any>
    | SxObject
    | ((theme: ChellaaTheme) => SxObject)
    | undefined;
}

export type SxPropValue =
  | SxObject
  | ((theme: ChellaaTheme) => SxObject)
  | boolean
  | undefined
  | null;

export type SxProps = SxPropValue | SxPropValue[];

export interface StyledOptions<Props extends object = {}> {
  /**
   * Component name for theme overrides and debugging (e.g. 'ChellaaButton')
   */
  name?: string;
  /**
   * Component slot name (e.g. 'root', 'startIcon', 'thumb')
   */
  slot?: string;
  /**
   * Filter predicate determining which props should be forwarded to DOM element
   */
  shouldForwardProp?: (prop: PropertyKey) => boolean;
  /**
   * Descriptive label for generated emotion classes
   */
  label?: string;
  /**
   * CSS target class
   */
  target?: string;
  /**
   * If true, bypasses automatic sx prop resolution
   */
  skipSx?: boolean;
  /**
   * Optional custom resolver for theme style overrides
   */
  overridesResolver?: (
    props: Props,
    styles: Record<string, any>
  ) => Record<string, any> | undefined;
}
