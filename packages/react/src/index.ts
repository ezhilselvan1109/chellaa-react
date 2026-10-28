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
  useFormValidation,
  type FieldValidationError,
  type FieldValidationResult,
  type FieldValidator,
  type UseFormValidationOptions,
  type UseFormValidationReturn,
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
  CardRoot,
  type CardProps,
  type CardOwnerState,
  type CardVariant,
  type CardSize,
  CardHeader,
  type CardHeaderProps,
  CardTitle,
  type CardTitleProps,
  CardDescription,
  type CardDescriptionProps,
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
  AccordionActions,
  AccordionExpandAll,
  AccordionCollapseAll,
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext,
  type AccordionType,
  type AccordionVariant,
  type AccordionSize,
  type AccordionIndicatorPosition,
  type AccordionSingleProps,
  type AccordionMultipleProps,
  type AccordionRootProps,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionHeaderProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
  type AccordionIconProps,
  type AccordionActionsProps,
  type AccordionExpandAllProps,
  type AccordionCollapseAllProps,
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
export {
  Combobox,
  Autocomplete,
  ComboboxRoot,
  ComboboxControl,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxPortal,
  ComboboxContent,
  ComboboxItem,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxEmpty,
  ComboboxTag,
  ComboboxClear,
  ComboboxActions,
  useCombobox,
  useComboboxContext,
  type ComboboxSize,
  type ComboboxVariant,
  type ComboboxOption,
  type ComboboxProps,
  type ComboboxRootProps,
  type ComboboxControlProps,
  type ComboboxInputProps,
  type ComboboxActionsProps,
  type ComboboxTriggerProps,
  type ComboboxPortalProps,
  type ComboboxContentProps,
  type ComboboxItemProps,
  type ComboboxGroupProps,
  type ComboboxGroupLabelProps,
  type ComboboxEmptyProps,
  type ComboboxTagProps,
  type ComboboxClearProps,
  type ComboboxContextValue,
  type RegisteredItem,
} from "./components/Combobox";

export {
  Select,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  useSelectContext,
  type SelectVariant,
  type SelectSize,
  type SelectOption,
  type SelectRootProps,
  type SelectTriggerProps,
  type SelectValueProps,
  type SelectIconProps,
  type SelectPortalProps,
  type SelectContentProps,
  type SelectItemProps,
  type SelectItemTextProps,
  type SelectItemIndicatorProps,
  type SelectGroupProps,
  type SelectLabelProps,
  type SelectSeparatorProps,
  type SelectContextValue,
} from "./components/Select";

export {
  Dialog,
  Modal,
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  type DialogSize,
  type DialogRootProps,
  type DialogTriggerProps,
  type DialogPortalProps,
  type DialogOverlayProps,
  type DialogContentProps,
  type DialogHeaderProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
  type DialogBodyProps,
  type DialogFooterProps,
  type DialogCloseProps,
  type ModalSize,
  type ModalRootProps,
  type ModalTriggerProps,
  type ModalPortalProps,
  type ModalOverlayProps,
  type ModalContentProps,
  type ModalHeaderProps,
  type ModalTitleProps,
  type ModalDescriptionProps,
  type ModalBodyProps,
  type ModalFooterProps,
  type ModalCloseProps,
} from "./components/Dialog";

export {
  Badge,
  type BadgeProps,
  type BadgeVariant,
  type BadgeSize,
  type BadgeColorScheme,
} from "./components/Badge";

export {
  Table,
  TableRoot,
  TableContainer,
  TableCaption,
  TableThead,
  TableTbody,
  TableTfoot,
  TableTr,
  TableTh,
  TableTd,
  type TableVariant,
  type TableSize,
  type TableRootProps,
  type TableContainerProps,
  type TableCaptionProps,
  type TableTheadProps,
  type TableTbodyProps,
  type TableTfootProps,
  type TableRowProps,
  type TableHeaderCellProps,
  type TableCellProps,
  type TableContextValue,
} from "./components/Table";

// Feedback Components (Wave 2)
export {
  Spinner,
  type SpinnerProps,
  type SpinnerSize,
  type SpinnerColorScheme,
} from "./components/Spinner";

export {
  Skeleton,
  type SkeletonProps,
  type SkeletonVariant,
  type SkeletonAnimation,
} from "./components/Skeleton";

export {
  Progress,
  type ProgressProps,
  type ProgressVariant,
  type ProgressSize,
  type ProgressColorScheme,
} from "./components/Progress";

// Calendar & DatePicker Components (Wave 2)
export {
  Calendar,
  type CalendarProps,
  type DateRange,
} from "./components/Calendar";

export {
  DatePicker,
  type DatePickerProps,
} from "./components/DatePicker";

// Pure Date Utilities
export {
  isLeapYear,
  getDaysInMonth,
  createLocalDate,
  isSameDay,
  isSameMonth,
  isDateBefore,
  isDateAfter,
  isDateInRange,
  addDays,
  addMonths,
  addYears,
  getCalendarGrid,
  getWeekdayLabels,
  getMonthLabel,
  formatLocalDate,
  parseLocalDate,
  type CalendarGridDay,
} from "./utils/date";

// Menus & Drawer Overlays (Wave 3)
export {
  DropdownMenu,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  useDropdownMenuContext,
  type DropdownMenuRootProps,
  type DropdownMenuTriggerProps,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuRadioGroupProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuLabelProps,
  type DropdownMenuSide,
  type DropdownMenuAlign,
} from "./components/DropdownMenu";

export {
  ContextMenu,
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  type ContextMenuRootProps,
  type ContextMenuTriggerProps,
  type ContextMenuContentProps,
  type ContextMenuItemProps,
  type ContextMenuCheckboxItemProps,
  type ContextMenuRadioGroupProps,
  type ContextMenuRadioItemProps,
  type ContextMenuSeparatorProps,
  type ContextMenuLabelProps,
} from "./components/ContextMenu";

export {
  Drawer,
  DrawerRoot,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  Sheet,
  SheetRoot,
  SheetTrigger,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
  useDrawerContext,
  type DrawerPlacement,
  type DrawerSize,
  type DrawerRootProps,
  type DrawerTriggerProps,
  type DrawerPortalProps,
  type DrawerOverlayProps,
  type DrawerContentProps,
  type DrawerHeaderProps,
  type DrawerTitleProps,
  type DrawerDescriptionProps,
  type DrawerBodyProps,
  type DrawerFooterProps,
  type DrawerCloseProps,
  type SheetPlacement,
  type SheetSize,
  type SheetRootProps,
  type SheetTriggerProps,
  type SheetPortalProps,
  type SheetOverlayProps,
  type SheetContentProps,
  type SheetHeaderProps,
  type SheetTitleProps,
  type SheetDescriptionProps,
  type SheetBodyProps,
  type SheetFooterProps,
  type SheetCloseProps,
} from "./components/Drawer";

// Navigation, Form Validation & Date Extensions (Wave 4)
export {
  Breadcrumbs,
  Breadcrumb,
  BreadcrumbsRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  type BreadcrumbsProps,
  type BreadcrumbListProps,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
  type BreadcrumbPageProps,
  type BreadcrumbSeparatorProps,
  type BreadcrumbEllipsisProps,
} from "./components/Breadcrumbs";

export {
  Link,
  type LinkProps,
  type LinkUnderline,
  type LinkColorScheme,
} from "./components/Link";

export {
  DateRangePicker,
  type DateRangePickerProps,
} from "./components/DateRangePicker";

export {
  TimePicker,
  type TimePickerProps,
  type TimeFormat,
} from "./components/TimePicker";

// Data Components & Advanced Form Controls (Wave 5)
export {
  MultiSelect,
  type MultiSelectProps,
  type MultiSelectOption,
  type MultiSelectSize,
  type MultiSelectVariant,
} from "./components/MultiSelect";

export {
  DataGrid,
  type DataGridProps,
  type DataGridColumn,
  type DataGridSort,
  type DataGridPaginationProps,
  type SortDirection,
} from "./components/DataGrid";

export {
  FileUpload,
  type FileUploadProps,
  type FileItem,
  type FileValidationError,
  type FileValidationErrorCode,
} from "./components/FileUpload";

export {
  Slider,
  RangeSlider,
  type SliderProps,
  type RangeSliderProps,
  type SliderMark,
  type SliderSize,
  type SliderColorScheme,
} from "./components/Slider";

// Hierarchical, Workflow & Rotator Controls (Wave 6)
export {
  TreeView,
  type TreeViewProps,
  type TreeNode,
  type TreeNodeState,
  type TreeViewSelectionMode,
} from "./components/TreeView";

export {
  Stepper,
  type StepperProps,
  type StepItem,
  type StepperOrientation,
  type StepperSize,
} from "./components/Stepper";

export {
  Carousel,
  CarouselSlide,
  type CarouselProps,
  type CarouselSlideProps,
  type CarouselSlideData,
} from "./components/Carousel";

