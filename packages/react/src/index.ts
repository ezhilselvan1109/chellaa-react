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

// Headless Composition & DOM Primitives
export {
  Portal,
  type PortalProps,
  Slot,
  type SlotProps,
} from "./primitives";

// Overlays & Floating Anchored Primitives
export {
  Tooltip,
  type TooltipProps,
  type TooltipPlacement,
  type TooltipOwnerState,
} from "./components/Tooltip";

export {
  Popover,
  PopoverRoot,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverClose,
  PopoverArrow,
  PopoverHeader,
  PopoverTitle,
  PopoverBody,
  PopoverFooter,
  usePopoverContext,
  type PopoverProps,
  type PopoverRootProps,
  type PopoverTriggerProps,
  type PopoverPortalProps,
  type PopoverContentProps,
  type PopoverCloseProps,
  type PopoverArrowProps,
  type PopoverHeaderProps,
  type PopoverTitleProps,
  type PopoverBodyProps,
  type PopoverFooterProps,
  type PopoverPlacement,
  type PopoverContextValue,
} from "./components/Popover";

// Feedback & Notification Primitives
export {
  Alert,
  AlertRoot,
  AlertIcon,
  AlertBody,
  AlertTitle,
  AlertDescription,
  AlertAction,
  AlertCloseButton,
  useAlertContext,
  type AlertProps,
  type AlertRootProps,
  type AlertIconProps,
  type AlertBodyProps,
  type AlertTitleProps,
  type AlertDescriptionProps,
  type AlertActionProps,
  type AlertCloseButtonProps,
  type AlertStatus,
  type AlertVariant,
  type AlertContextValue,
} from "./components/Alert";

export {
  Snackbar,
  Toast,
  ToastProvider,
  ToastContext,
  ToastItem,
  useToast,
  type SnackbarProps,
  type ToastOptions,
  type ToastRecord,
  type ToastPosition,
  type ToastStatus,
  type ToastProviderProps,
  type UseToastReturn,
} from "./components/Snackbar";

// Visual Data Display & Identity Primitives
export {
  Avatar,
  AvatarRoot,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarContext,
  useAvatarContext,
  AvatarGroupContext,
  useAvatarGroupContext,
  getInitials,
  type AvatarProps,
  type AvatarImageProps,
  type AvatarFallbackProps,
  type AvatarBadgeProps,
  type AvatarGroupProps,
  type AvatarSize,
  type AvatarShape,
  type AvatarStatus,
  type AvatarPlacement,
  type AvatarContextValue,
  type AvatarGroupContextValue,
  type ImageLoadingStatus,
} from "./components/Avatar";

// Disclosure & Collapsible Primitives
export {
  Accordion,
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionIcon,
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext,
  type AccordionType,
  type AccordionVariant,
  type AccordionSingleProps,
  type AccordionMultipleProps,
  type AccordionRootProps,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionHeaderProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
  type AccordionIconProps,
  type AccordionContextValue,
  type AccordionItemContextValue,
} from "./components/Accordion";

// Navigation & Rich Controls (Phase 5 / Wave 3)
export {
  Tabs,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsIndicator,
  TabsContext,
  useTabsContext,
  type TabsOrientation,
  type TabsVariant,
  type TabsSize,
  type TabsActivationMode,
  type TabsRootProps,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
  type TabsIndicatorProps,
  type TabsContextValue,
} from "./components/Tabs";

export {
  Pagination,
  PaginationRoot,
  PaginationList,
  PaginationItem,
  PaginationPrev,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
  PaginationSizeSelect,
  PaginationJumper,
  PaginationContext,
  usePaginationContext,
  getPaginationRange,
  type PaginationSize,
  type PaginationVariant,
  type PaginationProps,
  type PaginationRootProps,
  type PaginationListProps,
  type PaginationItemProps,
  type PaginationActionProps,
  type PaginationEllipsisProps,
  type PaginationSizeSelectProps,
  type PaginationJumperProps,
  type PaginationContextValue,
} from "./components/Pagination";



