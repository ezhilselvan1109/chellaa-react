import {
  ThemeProvider,
  createTheme,
  ThemeScript,
  Button,
  ButtonGroup,
  Input,
  InputBase,
  TextField,
  InputAdornment,
  Textarea,
  FormField,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Switch,
  Paper,
  Card,
  CardHeader,
  CardMedia,
  CardBody,
  CardFooter,
  CardActions,
  Typography,
  Heading,
  Text,
  Paragraph,
  Code,
  Kbd,
  MODIFIER_SYMBOLS,
  // Layout Primitives (Workflow F3)
  Box,
  Container,
  Divider,
  Stack,
  Flex,
  Grid,
  // Headless Primitives (Wave 1)
  Portal,
  Slot,
  // Floating Overlays (Wave 2)
  Tooltip,
  type TooltipProps,
  type TooltipPlacement,
} from "@chellaa/react";

export function ConsumerTypeFixture() {
  const customTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <ThemeScript defaultTheme="dark" storageKey="app-theme" />
      
      {/* 1. Button & ButtonGroup */}
      <ButtonGroup isAttached orientation="horizontal" variant="outline" size="md">
        <Button variant="solid" size="lg" colorScheme="primary" isLoading loadingText="Saving...">
          Submit
        </Button>
        <Button variant="outline" colorScheme="neutral">
          Cancel
        </Button>
      </ButtonGroup>

      {/* 2. Input & TextField */}
      <FormField id="test-field" required error>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Enter username"
          variant="outlined"
          size="md"
          startAdornment={<InputAdornment position="start">@</InputAdornment>}
        />
        <FormHelperText>Must be unique</FormHelperText>
        <FormErrorMessage>Username is required</FormErrorMessage>
      </FormField>

      <InputBase placeholder="Base input" />
      <TextField label="Email" placeholder="user@example.com" helperText="Work email" />

      {/* 3. Textarea */}
      <Textarea placeholder="Bio" resize="vertical" size="sm" variant="filled" rows={4} />

      {/* 4. Checkbox & CheckboxGroup */}
      <CheckboxGroup defaultValue={["opt1"]} size="md" colorScheme="secondary">
        <Checkbox value="opt1">Option 1</Checkbox>
        <Checkbox value="opt2" indeterminate>Option 2</Checkbox>
      </CheckboxGroup>

      {/* 5. Radio & RadioGroup */}
      <RadioGroup defaultValue="choice1" size="sm" colorScheme="primary">
        <Radio value="choice1">Choice 1</Radio>
        <Radio value="choice2">Choice 2</Radio>
      </RadioGroup>

      {/* 6. Switch */}
      <Switch labelPlacement="end" size="lg" colorScheme="success" defaultChecked>
        Notifications
      </Switch>

      {/* 7. Paper */}
      <Paper elevation={4} square variant="elevation" sx={{ p: 2 }}>
        Paper Content
      </Paper>

      {/* 8. Card compound hierarchy */}
      <Card variant="elevated" elevation={2} size="md" hoverable>
        <CardMedia image="/test.jpg" alt="Preview" aspectRatio="16/9" />
        <CardHeader
          title="Card Title"
          subheader="Card Subtitle"
          avatar={<span>👤</span>}
          action={<button type="button">⋮</button>}
        />
        <CardBody>
          <Typography variant="body1">Body text</Typography>
        </CardBody>
        <CardFooter divider>
          <Text size="sm">Footer info</Text>
        </CardFooter>
        <CardActions disableSpacing>
          <Button size="sm">Action</Button>
        </CardActions>
      </Card>

      {/* 9. Typography, Heading, Text, Paragraph, Code */}
      <Heading level={1} variant="h2">Heading 1 with h2 style</Heading>
      <Paragraph gutterBottom>
        Prose paragraph with <Code colorScheme="primary">inline code</Code>.
      </Paragraph>
      <Text size="lg" block>Block text</Text>

      {/* 10. Kbd */}
      <Kbd modifier="command" size="sm" variant="outline" />
      <Kbd size="md" variant="subtle">Ctrl</Kbd>
      <span>{MODIFIER_SYMBOLS.shift}</span>

      {/* 11. Container */}
      <Container maxWidth="lg" fixed disableGutters component="main" sx={{ my: 4 }}>
        {/* 12. Box */}
        <Box component="section" sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
          Section Box Content
        </Box>

        {/* 13. Stack with Divider */}
        <Stack
          direction="column"
          spacing={3}
          divider={<Divider variant="middle" lineStyle="dashed" />}
        >
          <Box>Stack Item A</Box>
          <Box>Stack Item B</Box>
        </Stack>

        {/* 14. Flex */}
        <Flex center inline gap={2} direction="row" sx={{ mt: 2 }}>
          <span>Flex Item 1</span>
          <Divider orientation="vertical" flexItem />
          <span>Flex Item 2</span>
        </Flex>

        {/* 15. Grid */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={1} sx={{ p: 2 }}>Col 1</Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Paper elevation={1} sx={{ p: 2 }}>Col 2</Paper>
          </Grid>
        </Grid>
        {/* 16. Headless Primitives (Wave 1) */}
        <Portal>
          <div data-testid="consumer-portal-content">Portal Consumer Render</div>
        </Portal>
        <Slot id="consumer-slot">
          <span>Slotted Consumer Element</span>
        </Slot>
        {/* 17. Floating Overlays (Wave 2) */}
        {(() => {
          const _tooltipProps: TooltipProps = {
            content: "Consumer Tooltip Info",
            placement: "bottom-end" as TooltipPlacement,
            shortcut: "Ctrl+S",
            children: <button type="button" id="consumer-tooltip-btn">Consumer Hover</button>,
          };
          return (
            <Tooltip {..._tooltipProps}>
              <button type="button" id="consumer-tooltip-btn">Consumer Hover</button>
            </Tooltip>
          );
        })()}
      </Container>
    </ThemeProvider>
  );
}
