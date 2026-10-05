// Import master styles to ensure zero-configuration styling delivery
import "./styles/index.css";

// Public Theme APIs
export {
  ThemeProvider,
  type ThemeProviderProps,
  type ThemeMode,
  type ThemeContextValue,
  useTheme,
  type ExtendedThemeContextValue,
  createTheme,
  defaultTheme,
  defaultDarkTheme,
  createShadows,
  defaultShadows,
  createSpacing,
  defaultSpacing,
  createBreakpoints,
  defaultBreakpoints,
  breakpointKeys,
  createPalette,
  lightPalette,
  darkPalette,
  defaultTypography,
  defaultTransitions,
  defaultZIndex,
  ThemeScript,
  type ThemeScriptProps,
  type ChellaaTheme,
  type ThemeOptions,
  type ColorMode,
  type Palette,
  type PaletteColor,
  type TypeText,
  type TypeBackground,
  type TypeAction,
  type Breakpoints,
  type BreakpointKey,
  type TypographyTheme,
  type TypographyVariant,
  type TypographyStyle,
  type Transitions,
  type ZIndex,
  type ComponentOverride,
  type DeepPartial,
} from "./theme";

// Public Styling Engine APIs
export * from "./system";

// Public Component APIs
export {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
  type ButtonColorScheme,
  type ButtonLoadingPosition,
} from "./components/Button";

export {
  ButtonGroup,
  type ButtonGroupProps,
  type ButtonGroupOrientation,
  type ButtonGroupContextValue,
  ButtonGroupContext,
  useButtonGroupContext,
} from "./components/ButtonGroup";

// Material DOM Composition Primitives
export { Box, type BoxProps } from "./components/Box";
export {
  Stack,
  type StackProps,
  type StackDirection,
  type StackOwnerState,
} from "./components/Stack";
export {
  Container,
  type ContainerProps,
  type ContainerOwnerState,
} from "./components/Container";
export {
  Grid,
  type GridProps,
  type GridOwnerState,
  type GridSize,
  type GridDirection,
  type GridWrap,
} from "./components/Grid";

