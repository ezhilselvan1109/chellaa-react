const {
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
  // 17. Visual Data Display & Identity Primitives (Wave 3)
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
} = require("@chellaa/react");

console.log("[Benchmark Node CJS] Testing CommonJS require for all 18 library components...");

function assertComponent(name, comp) {
  if (typeof comp !== "object" && typeof comp !== "function") {
    throw new Error(`${name} is not a valid component in CJS (got ${typeof comp})`);
  }
}

function assertFunction(name, fn) {
  if (typeof fn !== "function") {
    throw new Error(`${name} is not a function in CJS (got ${typeof fn})`);
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
  throw new Error("MODIFIER_SYMBOLS is not a valid dictionary in CJS");
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

console.log(
  "[Benchmark Node CJS] PASSED: All library components, primitives, Tooltip, Popover, Alert, Snackbar, Avatar, Accordion, Tabs, and Pagination required cleanly in CommonJS without CSS syntax errors.",
);
