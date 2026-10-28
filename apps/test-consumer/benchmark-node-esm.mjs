import {
  // Theming
  ThemeProvider,
  useTheme,
  createTheme,
  ThemeScript,
  // 1. Button & ButtonGroup
  Button,
  ButtonGroup,
  useButtonGroupContext,
  // 2. Input & TextField
  Input,
  InputBase,
  TextField,
  InputAdornment,
  // 3. Textarea
  Textarea,
  // 4. FormField
  FormField,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  useFormField,
  // 5. Checkbox & CheckboxGroup
  Checkbox,
  CheckboxGroup,
  useCheckboxGroup,
  // 6. Radio & RadioGroup
  Radio,
  RadioGroup,
  useRadioGroup,
  // 7. Switch
  Switch,
  // 8. Paper
  Paper,
  // 9. Card
  Card,
  CardHeader,
  CardMedia,
  CardBody,
  CardFooter,
  CardActions,
  // 10. Typography, Heading, Text, Paragraph, Code
  Typography,
  Heading,
  Text,
  Paragraph,
  Code,
  resolveTypographyColor,
  // 11. Kbd
  Kbd,
  MODIFIER_SYMBOLS,
  // 12. Layout Primitives (Workflow F3)
  Box,
  Container,
  Divider,
  Stack,
  Flex,
  Grid,
  // 13. Headless Primitives (Wave 1)
  Portal,
  Slot,
  // 14. Floating Overlays (Wave 2)
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  // 15. Feedback & Notification Primitives (Wave 2B)
  Alert,
  AlertTitle,
  AlertDescription,
  AlertCloseButton,
  AlertIcon,
  AlertAction,
  AlertBody,
  Snackbar,
  Toast,
  ToastProvider,
  useToast,
  // 16. Visual Data Display & Identity Primitives (Wave 3)
  Avatar,
  AvatarGroup,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  getInitials,
  // 18. Disclosure Primitives (Wave 3)
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionIcon,
  // 19. Navigation Primitives (Wave 3)
  Tabs,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsIndicator,
  // 20. Pagination Navigation Primitives (Wave 3)
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
  getPaginationRange,
  // 21. Combobox & Autocomplete Organisms (Wave 3)
  Combobox,
  Autocomplete,
  ComboboxRoot,
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
  useCombobox,
  // Wave 3: DropdownMenu, ContextMenu, Drawer / Sheet
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
  // Wave 4: Navigation, Form Validation & Date Extensions
  Breadcrumbs,
  Breadcrumb,
  BreadcrumbsRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  Link,
  useFormValidation,
  DateRangePicker,
  TimePicker,
  // Wave 5: Data Components & Advanced Form Controls
  MultiSelect,
  DataGrid,
  FileUpload,
  Slider,
  RangeSlider,
  // Wave 6
  TreeView,
  Stepper,
  Carousel,
  CarouselSlide,
} from "@chellaa/react";

console.log("[Benchmark Node ESM] Testing module resolution for all library components...");

function assertComponent(name, comp) {
  if (typeof comp !== "object" && typeof comp !== "function") {
    throw new Error(`${name} is not a valid component in ESM (got ${typeof comp})`);
  }
}

function assertFunction(name, fn) {
  if (typeof fn !== "function") {
    throw new Error(`${name} is not a function in ESM (got ${typeof fn})`);
  }
}

// 1. Theme APIs
assertFunction("ThemeProvider", ThemeProvider);
assertFunction("useTheme", useTheme);
assertFunction("createTheme", createTheme);
assertFunction("ThemeScript", ThemeScript);

// 2. Button & ButtonGroup
assertComponent("Button", Button);
assertComponent("ButtonGroup", ButtonGroup);
assertFunction("useButtonGroupContext", useButtonGroupContext);

// 3. Input & TextField
assertComponent("Input", Input);
assertComponent("InputBase", InputBase);
assertComponent("TextField", TextField);
assertComponent("InputAdornment", InputAdornment);

// 4. Textarea
assertComponent("Textarea", Textarea);

// 5. FormField
assertComponent("FormField", FormField);
assertComponent("FormLabel", FormLabel);
assertComponent("FormHelperText", FormHelperText);
assertComponent("FormErrorMessage", FormErrorMessage);
assertFunction("useFormField", useFormField);

// 6. Checkbox & CheckboxGroup
assertComponent("Checkbox", Checkbox);
assertComponent("CheckboxGroup", CheckboxGroup);
assertFunction("useCheckboxGroup", useCheckboxGroup);

// 7. Radio & RadioGroup
assertComponent("Radio", Radio);
assertComponent("RadioGroup", RadioGroup);
assertFunction("useRadioGroup", useRadioGroup);

// 8. Switch
assertComponent("Switch", Switch);

// 9. Paper
assertComponent("Paper", Paper);

// 10. Card
assertComponent("Card", Card);
assertComponent("CardHeader", CardHeader);
assertComponent("CardMedia", CardMedia);
assertComponent("CardBody", CardBody);
assertComponent("CardFooter", CardFooter);
assertComponent("CardActions", CardActions);

// 11. Typography
assertComponent("Typography", Typography);
assertComponent("Heading", Heading);
assertComponent("Text", Text);
assertComponent("Paragraph", Paragraph);
assertComponent("Code", Code);
assertFunction("resolveTypographyColor", resolveTypographyColor);

// 12. Kbd
assertComponent("Kbd", Kbd);
if (!MODIFIER_SYMBOLS || typeof MODIFIER_SYMBOLS !== "object" || MODIFIER_SYMBOLS.command !== "⌘") {
  throw new Error("MODIFIER_SYMBOLS is not a valid dictionary in ESM");
}

// 13. Layout Primitives (Workflow F3)
assertComponent("Box", Box);
assertComponent("Container", Container);
assertComponent("Divider", Divider);
assertComponent("Stack", Stack);
assertComponent("Flex", Flex);
assertComponent("Grid", Grid);

// 14. Headless Primitives (Wave 1)
assertComponent("Portal", Portal);
assertComponent("Slot", Slot);

// 15. Floating Overlays (Wave 2)
assertComponent("Tooltip", Tooltip);
assertComponent("Popover", Popover);
assertComponent("Popover.Trigger", PopoverTrigger);
assertComponent("Popover.Content", PopoverContent);
assertComponent("Popover.Close", PopoverClose);

// 16. Feedback & Notification Primitives (Wave 2B)
assertComponent("Alert", Alert);
assertComponent("Alert.Root", Alert.Root);
assertComponent("Alert.Icon", Alert.Icon);
assertComponent("Alert.Title", Alert.Title);
assertComponent("Alert.Description", Alert.Description);
assertComponent("Alert.CloseButton", Alert.CloseButton);
assertComponent("Alert.Action", Alert.Action);
assertComponent("Alert.Body", Alert.Body);
assertComponent("Snackbar", Snackbar);
assertComponent("Toast", Toast);
assertFunction("ToastProvider", ToastProvider);
assertFunction("useToast", useToast);

// 17. Visual Data Display & Identity Primitives (Wave 3)
assertComponent("Avatar", Avatar);
assertComponent("AvatarGroup", AvatarGroup);
assertComponent("Avatar.Image", AvatarImage);
assertComponent("Avatar.Fallback", AvatarFallback);
assertComponent("Avatar.Badge", AvatarBadge);
assertFunction("getInitials", getInitials);

// 18. Disclosure Primitives (Wave 3)
assertComponent("Accordion", Accordion);
assertComponent("Accordion.Root", Accordion.Root);
assertComponent("Accordion.Item", Accordion.Item);
assertComponent("Accordion.Header", Accordion.Header);
assertComponent("Accordion.Trigger", Accordion.Trigger);
assertComponent("Accordion.Content", Accordion.Content);
assertComponent("Accordion.Icon", Accordion.Icon);
assertComponent("AccordionItem", AccordionItem);
assertComponent("AccordionHeader", AccordionHeader);
assertComponent("AccordionTrigger", AccordionTrigger);
assertComponent("AccordionContent", AccordionContent);
assertComponent("AccordionIcon", AccordionIcon);

// 19. Navigation Primitives (Wave 3)
assertComponent("Tabs", Tabs);
assertComponent("Tabs.Root", Tabs.Root);
assertComponent("Tabs.List", Tabs.List);
assertComponent("Tabs.Trigger", Tabs.Trigger);
assertComponent("Tabs.Content", Tabs.Content);
assertComponent("Tabs.Indicator", Tabs.Indicator);
assertComponent("TabsRoot", TabsRoot);
assertComponent("TabsList", TabsList);
assertComponent("TabsTrigger", TabsTrigger);
assertComponent("TabsContent", TabsContent);
assertComponent("TabsIndicator", TabsIndicator);

// 20. Pagination Navigation Primitives (Wave 3)
assertComponent("Pagination", Pagination);
assertComponent("Pagination.Root", Pagination.Root);
assertComponent("Pagination.List", Pagination.List);
assertComponent("Pagination.Item", Pagination.Item);
assertComponent("Pagination.Prev", Pagination.Prev);
assertComponent("Pagination.Next", Pagination.Next);
assertComponent("Pagination.First", Pagination.First);
assertComponent("Pagination.Last", Pagination.Last);
assertComponent("Pagination.Ellipsis", Pagination.Ellipsis);
assertComponent("Pagination.SizeSelect", Pagination.SizeSelect);
assertComponent("Pagination.Jumper", Pagination.Jumper);
assertComponent("PaginationRoot", PaginationRoot);
assertComponent("PaginationList", PaginationList);
assertComponent("PaginationItem", PaginationItem);
assertComponent("PaginationPrev", PaginationPrev);
assertComponent("PaginationNext", PaginationNext);
assertComponent("PaginationFirst", PaginationFirst);
assertComponent("PaginationLast", PaginationLast);
assertComponent("PaginationEllipsis", PaginationEllipsis);
assertComponent("PaginationSizeSelect", PaginationSizeSelect);
assertComponent("PaginationJumper", PaginationJumper);
assertFunction("getPaginationRange", getPaginationRange);

// 21. Combobox & Autocomplete Organisms (Wave 3)
assertComponent("Combobox", Combobox);
assertComponent("Autocomplete", Autocomplete);
assertComponent("Combobox.Root", Combobox.Root);
assertComponent("Combobox.Input", Combobox.Input);
assertComponent("Combobox.Trigger", Combobox.Trigger);
assertComponent("Combobox.Portal", Combobox.Portal);
assertComponent("Combobox.Content", Combobox.Content);
assertComponent("Combobox.Item", Combobox.Item);
assertComponent("Combobox.Group", Combobox.Group);
assertComponent("Combobox.GroupLabel", Combobox.GroupLabel);
assertComponent("Combobox.Empty", Combobox.Empty);
assertComponent("Combobox.Tag", Combobox.Tag);
assertComponent("Combobox.Clear", Combobox.Clear);
assertComponent("ComboboxRoot", ComboboxRoot);
assertComponent("ComboboxInput", ComboboxInput);
assertComponent("ComboboxTrigger", ComboboxTrigger);
assertComponent("ComboboxPortal", ComboboxPortal);
assertComponent("ComboboxContent", ComboboxContent);
assertComponent("ComboboxItem", ComboboxItem);
assertComponent("ComboboxGroup", ComboboxGroup);
assertComponent("ComboboxGroupLabel", ComboboxGroupLabel);
assertComponent("ComboboxEmpty", ComboboxEmpty);
assertComponent("ComboboxTag", ComboboxTag);
assertComponent("ComboboxClear", ComboboxClear);
assertFunction("useCombobox", useCombobox);

// 22. DropdownMenu (Wave 3)
assertComponent("DropdownMenu", DropdownMenu);
assertComponent("DropdownMenu.Trigger", DropdownMenuTrigger);
assertComponent("DropdownMenu.Content", DropdownMenuContent);
assertComponent("DropdownMenu.Item", DropdownMenuItem);
assertComponent("DropdownMenu.CheckboxItem", DropdownMenuCheckboxItem);
assertComponent("DropdownMenu.RadioGroup", DropdownMenuRadioGroup);
assertComponent("DropdownMenu.RadioItem", DropdownMenuRadioItem);
assertComponent("DropdownMenu.Separator", DropdownMenuSeparator);
assertComponent("DropdownMenu.Label", DropdownMenuLabel);
assertComponent("DropdownMenuRoot", DropdownMenuRoot);

// 23. ContextMenu (Wave 3)
assertComponent("ContextMenu", ContextMenu);
assertComponent("ContextMenu.Trigger", ContextMenuTrigger);
assertComponent("ContextMenu.Content", ContextMenuContent);
assertComponent("ContextMenu.Item", ContextMenuItem);
assertComponent("ContextMenu.CheckboxItem", ContextMenuCheckboxItem);
assertComponent("ContextMenu.RadioGroup", ContextMenuRadioGroup);
assertComponent("ContextMenu.RadioItem", ContextMenuRadioItem);
assertComponent("ContextMenu.Separator", ContextMenuSeparator);
assertComponent("ContextMenu.Label", ContextMenuLabel);
assertComponent("ContextMenuRoot", ContextMenuRoot);

// 24. Drawer / Sheet (Wave 3)
assertComponent("Drawer", Drawer);
assertComponent("Drawer.Trigger", DrawerTrigger);
assertComponent("Drawer.Portal", DrawerPortal);
assertComponent("Drawer.Overlay", DrawerOverlay);
assertComponent("Drawer.Content", DrawerContent);
assertComponent("Drawer.Header", DrawerHeader);
assertComponent("Drawer.Title", DrawerTitle);
assertComponent("Drawer.Description", DrawerDescription);
assertComponent("Drawer.Body", DrawerBody);
assertComponent("Drawer.Footer", DrawerFooter);
assertComponent("Drawer.Close", DrawerClose);
assertComponent("DrawerRoot", DrawerRoot);
assertComponent("Sheet", Sheet);
assertComponent("Sheet.Trigger", SheetTrigger);
assertComponent("Sheet.Content", SheetContent);
assertComponent("SheetRoot", SheetRoot);

// 25. Breadcrumbs (Wave 4)
assertComponent("Breadcrumbs", Breadcrumbs);
assertComponent("Breadcrumb", Breadcrumb);
assertComponent("Breadcrumb.List", BreadcrumbList);
assertComponent("Breadcrumb.Item", BreadcrumbItem);
assertComponent("Breadcrumb.Link", BreadcrumbLink);
assertComponent("Breadcrumb.Page", BreadcrumbPage);
assertComponent("Breadcrumb.Separator", BreadcrumbSeparator);
assertComponent("Breadcrumb.Ellipsis", BreadcrumbEllipsis);
assertComponent("BreadcrumbsRoot", BreadcrumbsRoot);

// 26. Link (Wave 4)
assertComponent("Link", Link);

// 27. Form Validation (Wave 4)
assertFunction("useFormValidation", useFormValidation);

// 28. DateRangePicker (Wave 4)
assertComponent("DateRangePicker", DateRangePicker);

// 29. TimePicker (Wave 4)
assertComponent("TimePicker", TimePicker);

// 30. MultiSelect (Wave 5)
assertComponent("MultiSelect", MultiSelect);

// 31. DataGrid (Wave 5)
assertComponent("DataGrid", DataGrid);

// 32. FileUpload (Wave 5)
assertComponent("FileUpload", FileUpload);

// 33. Slider & RangeSlider (Wave 5)
assertComponent("Slider", Slider);
assertComponent("RangeSlider", RangeSlider);

// 34. TreeView (Wave 6)
assertComponent("TreeView", TreeView);

// 35. Stepper (Wave 6)
assertComponent("Stepper", Stepper);

// 36. Carousel & CarouselSlide (Wave 6)
assertComponent("Carousel", Carousel);
assertComponent("CarouselSlide", CarouselSlide);

console.log(
  "[Benchmark Node ESM] PASSED: All library components including Wave 6 (TreeView, Stepper, Carousel) imported cleanly in Node ESM.",
);

