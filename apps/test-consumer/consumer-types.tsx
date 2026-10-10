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
  Popover,
  type PopoverProps,
  type PopoverPlacement,
  // Feedback & Alert (Wave 2B)
  Alert,
  type AlertProps,
  type AlertStatus,
  type AlertVariant,
  Snackbar,
  type SnackbarProps,
  Toast,
  ToastProvider,
  type ToastProviderProps,
  useToast,
  type UseToastReturn,
  type ToastOptions,
  type ToastPosition,
  type ToastStatus,
  // Visual Data Display & Identity (Wave 3)
  Avatar,
  type AvatarProps,
  AvatarGroup,
  type AvatarGroupProps,
  type AvatarSize,
  type AvatarShape,
  type AvatarStatus,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
  getInitials,
  // Disclosure Primitives (Wave 3)
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionIcon,
  type AccordionProps,
  type AccordionSingleProps,
  type AccordionMultipleProps,
  type AccordionItemProps,
  type AccordionHeaderProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
  type AccordionIconProps,
  type AccordionVariant,
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
        {/* 18. Popover Compound Overlays (Wave 2) */}
        {(() => {
          const _popoverProps: PopoverProps = {
            placement: "top-start" as PopoverPlacement,
            trapFocus: true,
            children: (
              <>
                <Popover.Trigger asChild>
                  <button type="button" id="consumer-popover-trigger">Open Popover</button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content>
                    <Popover.Header>
                      <Popover.Title>Consumer Title</Popover.Title>
                      <Popover.Close />
                    </Popover.Header>
                    <Popover.Body>Consumer Popover Body</Popover.Body>
                  </Popover.Content>
                </Popover.Portal>
              </>
            ),
          };
          return <Popover {..._popoverProps} />;
        })()}
        {/* 19. Alert Compound Feedback (Wave 2B) */}
        {(() => {
          const _alertProps: AlertProps = {
            status: "info" as AlertStatus,
            variant: "subtle" as AlertVariant,
            isClosable: true,
            onClose: () => {},
            children: (
              <>
                <Alert.Icon />
                <Alert.Body>
                  <Alert.Title>Consumer Alert Title</Alert.Title>
                  <Alert.Description>Consumer Alert Description</Alert.Description>
                </Alert.Body>
                <Alert.Action>
                  <button type="button">Action</button>
                </Alert.Action>
                <Alert.CloseButton />
              </>
            ),
          };
          return <Alert {..._alertProps} />;
        })()}
        {/* 20. Snackbar & Toast Notifications (Wave 2B) */}
        {(() => {
          const _providerProps: ToastProviderProps = {
            maxVisibleToasts: 5,
            defaultDuration: 4000,
            defaultPosition: "bottom-left" as ToastPosition,
          };
          const _snackbarProps: SnackbarProps = {
            isOpen: true,
            message: "Consumer Snackbar",
            status: "success" as ToastStatus,
            position: "bottom-left" as ToastPosition,
            duration: 4000,
            isClosable: true,
            action: <button type="button">Undo</button>,
          };
          return (
            <ToastProvider {..._providerProps}>
              <Snackbar {..._snackbarProps} />
              <Toast isOpen={false} message="Toast Alias" />
              <ToastConsumerDemo />
            </ToastProvider>
          );
        })()}
        {/* 21. Avatar & AvatarGroup Identity Primitives (Wave 3) */}
        {(() => {
          const _avatarProps: AvatarProps = {
            src: "https://example.com/photo.jpg",
            name: "Ezhil Selvan",
            size: "lg" as AvatarSize,
            shape: "rounded" as AvatarShape,
          };
          const _groupProps: AvatarGroupProps = {
            max: 3,
            size: "md" as AvatarSize,
            shape: "circular" as AvatarShape,
            spacing: -8,
            children: (
              <>
                <Avatar name="Alice" />
                <Avatar name="Bob" />
                <Avatar name="Charlie" />
                <Avatar name="David" />
              </>
            ),
          };
          const initials = getInitials("Ezhil Selvan");
          void initials;
          return (
            <div data-testid="avatar-fixture">
              <Avatar {..._avatarProps}>
                <AvatarImage src="https://example.com/photo.jpg" alt="Photo" />
                <AvatarFallback>ES</AvatarFallback>
                <AvatarBadge status={"online" as AvatarStatus} />
              </Avatar>
              <AvatarGroup {..._groupProps} />
            </div>
          );
        })()}

        {/* 22. Accordion Disclosure Primitives (Wave 3) */}
        {(() => {
          const _accordionProps: AccordionProps = {
            type: "single",
            collapsible: true,
            defaultValue: "item-1",
            variant: "outline" as AccordionVariant,
            children: null,
          };
          const _singleProps: AccordionSingleProps = {
            type: "single",
            collapsible: true,
            defaultValue: "item-1",
          };
          const _multiProps: AccordionMultipleProps = {
            type: "multiple",
            defaultValue: ["item-1"],
          };
          const _itemProps: AccordionItemProps = {
            value: "item-1",
            children: null,
          };
          const _headerProps: AccordionHeaderProps = {
            level: 3,
            children: null,
          };
          const _triggerProps: AccordionTriggerProps = {
            asChild: false,
            children: null,
          };
          const _contentProps: AccordionContentProps = {
            children: null,
          };
          const _iconProps: AccordionIconProps = {
            className: "custom-icon",
          };
          void _accordionProps;
          void _singleProps;
          void _multiProps;
          void _itemProps;
          void _headerProps;
          void _triggerProps;
          void _contentProps;
          void _iconProps;
          return (
            <div data-testid="accordion-fixture">
              <Accordion type="single" collapsible defaultValue="item-1" variant="outline">
                <Accordion.Item value="item-1">
                  <Accordion.Header level={3}>
                    <Accordion.Trigger>
                      Section 1
                      <Accordion.Icon />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content>Section 1 body content</Accordion.Content>
                </Accordion.Item>
              </Accordion>
              <Accordion type="multiple" defaultValue={["flat-1"]}>
                <AccordionItem value="flat-1">
                  <AccordionHeader>
                    <AccordionTrigger>
                      Flat Header
                      <AccordionIcon />
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>Flat Content</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
        })()}
      </Container>
    </ThemeProvider>
  );
}

function ToastConsumerDemo() {
  const toast: UseToastReturn = useToast();
  const options: ToastOptions = {
    title: "Consumer hook toast",
    status: "info",
    duration: 3000,
  };
  return (
    <button
      type="button"
      onClick={() => {
        const id = toast(options);
        toast.close(id);
        toast.closeAll();
        toast.update(id, { title: "Updated" });
        const _active: boolean = toast.isActive(id);
        void _active;
      }}
    >
      Trigger Toast
    </button>
  );
}
