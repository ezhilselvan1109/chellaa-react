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

console.log(
  "[Benchmark Node CJS] PASSED: All 18 library components and public primitives required cleanly in CommonJS without CSS syntax errors.",
);
