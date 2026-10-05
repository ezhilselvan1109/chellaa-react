import React from "react";
import emotionStyled from "@emotion/styled";
import type { ChellaaTheme } from "../theme/types";
import { defaultTheme } from "../theme/createTheme";
import { rootShouldForwardProp } from "./shouldForwardProp";
import { parseSx } from "./sx";
import { resolveComponentOverrides } from "./componentOverrides";
import type { StyledOptions, SxProps } from "./types";

export type StyleInterpolation<Props extends object = {}> =
  | Record<string, any>
  | ((props: Props & { theme: ChellaaTheme }) => Record<string, any> | undefined | null | false);

/**
 * Creates an Emotion-powered styled component with:
 * 1. Automatic `sx` prop parsing with responsive breakpoints & 8px theme spacing.
 * 2. Automatic resolution of `theme.components[name].styleOverrides[slot]`.
 * 3. Safe DOM prop filtering via `shouldForwardProp` preventing `sx` and private props from leaking.
 * 4. First-class polymorphism via `as` prop.
 *
 * @example
 * const MyBox = styled('div', {
 *   name: 'ChellaaBox',
 *   slot: 'Root'
 * })({
 *   boxSizing: 'border-box'
 * });
 */
export function styled<
  Component extends React.ElementType,
  ExtraProps extends object = {}
>(
  component: Component,
  options: StyledOptions<ExtraProps> = {}
) {
  const {
    name,
    slot = "Root",
    label,
    target,
    shouldForwardProp: customShouldForwardProp,
    skipSx = false,
  } = options;

  const resolvedShouldForwardProp = customShouldForwardProp
    ? (prop: PropertyKey) =>
        rootShouldForwardProp(prop) && customShouldForwardProp(prop)
    : rootShouldForwardProp;

  const resolvedLabel = label ?? (name ? `${name}-${slot}` : undefined);

  const emotionOptions: {
    shouldForwardProp?: (prop: PropertyKey) => boolean;
    label?: string;
    target?: string;
  } = {
    shouldForwardProp: resolvedShouldForwardProp,
  };

  if (resolvedLabel !== undefined) {
    emotionOptions.label = resolvedLabel;
  }
  if (target !== undefined) {
    emotionOptions.target = target;
  }

  const emotionCreator = emotionStyled(component as any, emotionOptions);

  return <Props extends object = ExtraProps>(
    ...interpolations: StyleInterpolation<
      Props & { sx?: SxProps; as?: React.ElementType }
    >[]
  ) => {
    const wrappedInterpolations = interpolations.map((interpolation) => {
      if (typeof interpolation === "function") {
        return (rawProps: any) => {
          const activeTheme =
            rawProps.theme && typeof rawProps.theme.spacing === "function"
              ? (rawProps.theme as ChellaaTheme)
              : defaultTheme;
          return interpolation({
            ...rawProps,
            theme: activeTheme,
          });
        };
      }
      return interpolation;
    });

    return emotionCreator(
      // 1. Base component styles
      ...(wrappedInterpolations as any[]),

      // 2. Global theme overrides from theme.components[name].styleOverrides[slot]
      (props: any) => {
        if (!name) return null;
        const activeTheme =
          props.theme && typeof props.theme.spacing === "function"
            ? (props.theme as ChellaaTheme)
            : defaultTheme;
        return resolveComponentOverrides(activeTheme, options, props);
      },

      // 3. Local sx prop styles (highest precedence)
      (props: any) => {
        if (skipSx || !props.sx) return null;
        const activeTheme =
          props.theme && typeof props.theme.spacing === "function"
            ? (props.theme as ChellaaTheme)
            : defaultTheme;
        return parseSx(activeTheme, props.sx);
      }
    );
  };
}
