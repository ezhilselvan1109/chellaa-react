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
  Flex,
  type FlexProps,
  type FlexOwnerState,
} from "./components/Flex";
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
export {
  Divider,
  type DividerProps,
  type DividerOwnerState,
  type DividerOrientation,
  type DividerVariant,
  type DividerTextAlign,
  type DividerLineStyle,
} from "./components/Divider";
export {
  Typography,
  type TypographyProps,
  type TypographyOwnerState,
  type TypographyAlign,
  Heading,
  type HeadingProps,
  type HeadingLevel,
  Text,
  type TextProps,
  type TextSize,
  Paragraph,
  type ParagraphProps,
  Code,
  type CodeProps,
  type CodeOwnerState,
  type CodeColorScheme,
  resolveTypographyColor,
} from "./components/Typography";
export {
  Kbd,
  type KbdProps,
  type KbdOwnerState,
  type KbdSize,
  type KbdVariant,
  type KbdModifier,
  MODIFIER_SYMBOLS,
} from "./components/Kbd";
export {
  Input,
  InputBase,
  type InputProps,
  type InputOwnerState,
  type InputVariant,
  type InputSize,
  TextField,
  type TextFieldProps,
  InputAdornment,
  type InputAdornmentProps,
} from "./components/Input";
export {
  Textarea,
  type TextareaProps,
  type TextareaOwnerState,
  type TextareaVariant,
  type TextareaSize,
  type TextareaResize,
} from "./components/Textarea";
export {
  FormField,
  type FormFieldProps,
  FormLabel,
  type FormLabelProps,
  FormHelperText,
  type FormHelperTextProps,
  FormErrorMessage,
  type FormErrorMessageProps,
  FormFieldContext,
  useFormField,
  type FormFieldContextValue,
} from "./components/FormField";
export {
  Checkbox,
  type CheckboxProps,
  CheckboxGroup,
  type CheckboxGroupProps,
  CheckboxContext,
  useCheckboxGroup,
  type CheckboxSize,
  type CheckboxColorScheme,
  type CheckboxOwnerState,
  type CheckboxContextValue,
} from "./components/Checkbox";
export {
  Radio,
  type RadioProps,
  RadioGroup,
  type RadioGroupProps,
  RadioContext,
  useRadioGroup,
  type RadioSize,
  type RadioColorScheme,
  type RadioOwnerState,
  type RadioContextValue,
} from "./components/Radio";
export {
  Switch,
  type SwitchProps,
  type SwitchSize,
  type SwitchColorScheme,
  type SwitchLabelPlacement,
  type SwitchOwnerState,
} from "./components/Switch";

// Material Elevation Surfaces
export {
  Paper,
  type PaperProps,
  type PaperOwnerState,
  type PaperVariant,
} from "./components/Paper";

// Card Compound Surface
export {
  Card,
  type CardProps,
  type CardOwnerState,
  type CardVariant,
  type CardSize,
  CardHeader,
  type CardHeaderProps,
  CardMedia,
  type CardMediaProps,
  CardBody,
  type CardBodyProps,
  CardFooter,
  type CardFooterProps,
  CardActions,
  type CardActionsProps,
} from "./components/Card";

// Material Touch Ripple & Tactile Feedback
export {
  TouchRipple,
  type TouchRippleProps,
  type TouchRippleRef,
  type RippleItem,
  useRipple,
  type UseRippleOptions,
  type UseRippleReturn,
} from "./ripple";


