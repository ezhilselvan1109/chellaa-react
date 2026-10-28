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
  AccordionActions,
  AccordionExpandAll,
  AccordionCollapseAll,
  type AccordionProps,
  type AccordionSingleProps,
  type AccordionMultipleProps,
  type AccordionItemProps,
  type AccordionHeaderProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
  type AccordionIconProps,
  type AccordionVariant,
  type AccordionSize,
  type AccordionIndicatorPosition,
  // Navigation Primitives (Wave 3)
  Tabs,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsIndicator,
  type TabsProps,
  type TabsRootProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
  type TabsIndicatorProps,
  type TabsOrientation,
  type TabsVariant,
  type TabsSize,
  type TabsActivationMode,
  // Navigation Primitives - Pagination (Wave 3)
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
  type PaginationProps,
  type PaginationRootProps,
  type PaginationListProps,
  type PaginationItemProps,
  type PaginationActionProps,
  type PaginationEllipsisProps,
  type PaginationSizeSelectProps,
  type PaginationJumperProps,
  type PaginationSize,
  type PaginationVariant,
  // 21. Combobox & Autocomplete (Wave 3)
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
  type ComboboxProps,
  type ComboboxRootProps,
  type ComboboxInputProps,
  type ComboboxTriggerProps,
  type ComboboxPortalProps,
  type ComboboxContentProps,
  type ComboboxItemProps,
  type ComboboxGroupProps,
  type ComboboxGroupLabelProps,
  type ComboboxEmptyProps,
  type ComboboxTagProps,
  type ComboboxClearProps,
  type ComboboxSize,
  type ComboboxVariant,
  // 22. Select (Wave 2C)
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
  type SelectVariant,
  type SelectSize,
  type SelectContextValue,
  // 23. Dialog & Modal Compatibility Alias (Wave 2C)
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
  // 24. Badge (Wave 2C)
  Badge,
  type BadgeProps,
  type BadgeVariant,
  type BadgeSize,
  type BadgeColorScheme,
  // 25. Table (Wave 2C)
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
  // Wave 3: DropdownMenu, ContextMenu, Drawer / Sheet
  DropdownMenu,
  type DropdownMenuRootProps,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  ContextMenu,
  type ContextMenuRootProps,
  type ContextMenuContentProps,
  type ContextMenuItemProps,
  Drawer,
  type DrawerRootProps,
  type DrawerContentProps,
  Sheet,
  type SheetRootProps,
  type SheetContentProps,
  // Wave 4: Navigation, Form Validation & Date Extensions
  Breadcrumbs,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  type BreadcrumbsProps,
  type BreadcrumbItemProps,
  Link,
  type LinkProps,
  type LinkUnderline,
  type LinkColorScheme,
  useFormValidation,
  type FieldValidationError,
  type FieldValidationResult,
  type FieldValidator,
  type UseFormValidationOptions,
  type UseFormValidationReturn,
  DateRangePicker,
  type DateRangePickerProps,
  type DateRange,
  TimePicker,
  type TimePickerProps,
  type TimeFormat,
  MultiSelect,
  type MultiSelectProps,
  type MultiSelectOption,
  DataGrid,
  type DataGridProps,
  type DataGridColumn,
  type DataGridSort,
  FileUpload,
  type FileUploadProps,
  type FileItem,
  type FileValidationError,
  Slider,
  RangeSlider,
  type SliderProps,
  type RangeSliderProps,
  type SliderMark,
  // Wave 6: TreeView, Stepper & Carousel
  TreeView,
  type TreeViewProps,
  type TreeNode,
  type TreeNodeState,
  type TreeViewSelectionMode,
  Stepper,
  type StepperProps,
  type StepItem,
  type StepperOrientation,
  type StepperSize,
  Carousel,
  CarouselSlide,
  type CarouselProps,
  type CarouselSlideProps,
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
          avatar={<span>CR</span>}
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
          const _size: AccordionSize = "md";
          const _indicatorPos: AccordionIndicatorPosition = "end";
          const _accordionProps: AccordionProps = {
            type: "single",
            collapsible: true,
            defaultValue: "item-1",
            variant: "outline" as AccordionVariant,
            size: _size,
            indicatorPosition: _indicatorPos,
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
            title: "Title",
            description: "Desc",
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
            <>
              <div data-testid="accordion-fixture">
                <AccordionActions>
                  <AccordionExpandAll />
                  <AccordionCollapseAll />
                </AccordionActions>
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

              {/* 19. Navigation Primitives: Tabs */}
              <div style={{ marginTop: "24px" }}>
                <Typography variant="h3">Tabs Fixture</Typography>
                {(() => {
                  const orientation: TabsOrientation = "horizontal";
                  const variant: TabsVariant = "line";
                  const size: TabsSize = "md";
                  const activationMode: TabsActivationMode = "automatic";
                  const _rootProps: TabsRootProps = {
                    orientation,
                    children: null,
                  };
                  const _listProps: TabsListProps = {
                    "aria-label": "Test",
                    children: null,
                  };
                  const _triggerProps: TabsTriggerProps = {
                    value: "t1",
                    isDisabled: false,
                    asChild: false,
                    children: "T1",
                  };
                  const _contentProps: TabsContentProps = {
                    value: "t1",
                    children: null,
                  };
                  const _indicatorProps: TabsIndicatorProps = {
                    className: "custom-indicator",
                  };
                  void TabsRoot;
                  void TabsList;
                  void TabsTrigger;
                  void TabsContent;
                  void TabsIndicator;
                  void _rootProps;
                  void _listProps;
                  void _triggerProps;
                  void _contentProps;
                  void _indicatorProps;

                  const tabsProps: TabsProps = {
                    orientation,
                    variant,
                    size,
                    activationMode,
                    defaultValue: "tab-1",
                    onValueChange: (val: string) => {
                      const _v: string = val;
                      void _v;
                    },
                    children: (
                      <>
                        <Tabs.List aria-label="Consumer Navigation Tabs">
                          <Tabs.Trigger value="tab-1">Overview</Tabs.Trigger>
                          <Tabs.Trigger value="tab-2" isDisabled>
                            Billing (Disabled)
                          </Tabs.Trigger>
                          <Tabs.Trigger value="tab-3" asChild>
                            <a href="#settings">Settings</a>
                          </Tabs.Trigger>
                          <Tabs.Indicator />
                        </Tabs.List>
                        <Tabs.Content value="tab-1">Overview Content</Tabs.Content>
                        <Tabs.Content value="tab-2">Billing Content</Tabs.Content>
                        <Tabs.Content value="tab-3">Settings Content</Tabs.Content>
                      </>
                    ),
                  };
                  return <Tabs {...tabsProps} />;
                })()}
              </div>

              {/* 20. Pagination (Wave 3) */}
              <div style={{ marginTop: "1rem" }}>
                {(() => {
                  const size: PaginationSize = "md";
                  const variant: PaginationVariant = "outline";
                  const rootProps: PaginationRootProps = {
                    total: 100,
                    pageSize: 10,
                    size,
                    variant,
                  };
                  const listProps: PaginationListProps = {};
                  const itemProps: PaginationItemProps = { page: 1, isCurrent: true };
                  const prevProps: PaginationActionProps = {};
                  const nextProps: PaginationActionProps = {};
                  const firstProps: PaginationActionProps = {};
                  const lastProps: PaginationActionProps = {};
                  const ellipsisProps: PaginationEllipsisProps = {};
                  const sizeSelectProps: PaginationSizeSelectProps = {
                    options: [10, 20, 50],
                  };
                  const jumperProps: PaginationJumperProps = {};
                  const paginationProps: PaginationProps = {
                    total: 200,
                    pageSize: 20,
                    page: 2,
                    onPageChange: (page: number) => console.log(page),
                  };

                  return (
                    <>
                      <Pagination {...paginationProps} />
                      <PaginationRoot {...rootProps}>
                        <PaginationPrev {...prevProps} />
                        <PaginationFirst {...firstProps} />
                        <PaginationList {...listProps}>
                          <PaginationItem {...itemProps}>1</PaginationItem>
                          <PaginationEllipsis {...ellipsisProps} />
                          <PaginationItem page={10}>10</PaginationItem>
                        </PaginationList>
                        <PaginationLast {...lastProps} />
                        <PaginationNext {...nextProps} />
                        <PaginationSizeSelect {...sizeSelectProps} />
                        <PaginationJumper {...jumperProps} />
                      </PaginationRoot>
                    </>
                  );
                })()}
              </div>

              {/* 21. Combobox & Autocomplete (Wave 3) */}
              <div style={{ marginTop: "1rem" }}>
                {(() => {
                  const size: ComboboxSize = "md";
                  const variant: ComboboxVariant = "outline";
                  const rootProps: ComboboxRootProps = {
                    size,
                    variant,
                    isMulti: true,
                    value: ["us"],
                  };
                  const inputProps: ComboboxInputProps = {
                    placeholder: "Search...",
                  };
                  const triggerProps: ComboboxTriggerProps = {};
                  const portalProps: ComboboxPortalProps = {
                    children: null,
                  };
                  const contentProps: ComboboxContentProps = {};
                  const groupProps: ComboboxGroupProps = {
                    heading: "Countries",
                  };
                  const groupLabelProps: ComboboxGroupLabelProps = {};
                  const itemProps: ComboboxItemProps = {
                    value: "us",
                    children: "United States",
                  };
                  const emptyProps: ComboboxEmptyProps = {};
                  const tagProps: ComboboxTagProps = {
                    value: "us",
                  };
                  const clearProps: ComboboxClearProps = {};
                  const comboboxProps: ComboboxProps = {
                    options: [{ value: "us", label: "USA" }],
                  };

                  return (
                    <>
                      <Combobox {...comboboxProps} />
                      <Autocomplete {...comboboxProps} />
                      <ComboboxRoot {...rootProps}>
                        <div className="cl-combobox__control">
                          <ComboboxTag {...tagProps}>US</ComboboxTag>
                          <ComboboxInput {...inputProps} />
                          <ComboboxClear {...clearProps} />
                          <ComboboxTrigger {...triggerProps} />
                        </div>
                        <ComboboxPortal {...portalProps}>
                          <ComboboxContent {...contentProps}>
                            <ComboboxEmpty {...emptyProps}>Empty</ComboboxEmpty>
                            <ComboboxGroup {...groupProps}>
                              <ComboboxGroupLabel {...groupLabelProps}>Group</ComboboxGroupLabel>
                              <ComboboxItem {...itemProps} />
                            </ComboboxGroup>
                          </ComboboxContent>
                        </ComboboxPortal>
                      </ComboboxRoot>
                    </>
                  );
                })()}
              </div>

              {/* 22. Select (Wave 2C / W2-F08) */}
              <div style={{ marginTop: "1rem" }}>
                {(() => {
                  const variant: SelectVariant = "outline";
                  const size: SelectSize = "md";
                  const options: SelectOption[] = [
                    { value: "react", label: "React" },
                    { value: "vue", label: "Vue", disabled: true },
                    { value: "svelte", label: "Svelte" },
                  ];

                  const rootProps: SelectRootProps = {
                    variant,
                    size,
                    placeholder: "Choose framework...",
                    defaultValue: "react",
                    isDisabled: false,
                    isInvalid: false,
                    isRequired: true,
                    name: "framework-select",
                    onValueChange: (val: string) => {
                      const _selectedVal: string = val;
                      void _selectedVal;
                    },
                    onOpenChange: (open: boolean) => {
                      const _isOpen: boolean = open;
                      void _isOpen;
                    },
                  };

                  const triggerProps: SelectTriggerProps = {
                    "aria-label": "Select framework",
                  };
                  const valueProps: SelectValueProps = {
                    placeholder: "Select an option",
                  };
                  const iconProps: SelectIconProps = {};
                  const portalProps: SelectPortalProps = { children: null };
                  const contentProps: SelectContentProps = {};
                  const groupProps: SelectGroupProps = {};
                  const labelProps: SelectLabelProps = {};
                  const separatorProps: SelectSeparatorProps = {};
                  const itemProps: SelectItemProps = { value: "react" };
                  const itemTextProps: SelectItemTextProps = {};
                  const itemIndicatorProps: SelectItemIndicatorProps = {};

                  void useSelectContext;
                  void SelectRoot;
                  void SelectTrigger;
                  void SelectValue;
                  void SelectIcon;
                  void SelectPortal;
                  void SelectContent;
                  void SelectGroup;
                  void SelectLabel;
                  void SelectSeparator;
                  const _selectCtx: SelectContextValue | null = null;
                  void _selectCtx;

                  return (
                    <>
                      {/* Shortcut options array contract */}
                      <Select options={options} defaultValue="react" />

                      {/* Compound pattern contract */}
                      <Select.Root {...rootProps}>
                        <Select.Trigger {...triggerProps}>
                          <Select.Value {...valueProps} />
                          <Select.Icon {...iconProps} />
                        </Select.Trigger>
                        <Select.Portal {...portalProps}>
                          <Select.Content {...contentProps}>
                            <Select.Group {...groupProps}>
                              <Select.Label {...labelProps}>Frameworks</Select.Label>
                              <Select.Item {...itemProps}>
                                <Select.ItemIndicator {...itemIndicatorProps}>✓</Select.ItemIndicator>
                                <Select.ItemText {...itemTextProps}>React</Select.ItemText>
                              </Select.Item>
                              <Select.Separator {...separatorProps} />
                              <SelectItem value="svelte">
                                <SelectItemIndicator>✓</SelectItemIndicator>
                                <SelectItemText>Svelte</SelectItemText>
                              </SelectItem>
                            </Select.Group>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </>
                  );
                })()}
              </div>

              {/* 23. Dialog & Modal Compatibility Alias (Wave 2C / W2-F08) */}
              <div style={{ marginTop: "1rem" }}>
                {(() => {
                  const dialogSize: DialogSize = "md";
                  const modalSize: ModalSize = "lg";

                  const dialogRootProps: DialogRootProps = {
                    size: dialogSize,
                    isOpen: false,
                    closeOnEsc: true,
                    closeOnOverlayClick: true,
                    isCentered: true,
                    onClose: () => {},
                    children: null,
                  };

                  const dialogTriggerProps: DialogTriggerProps = { asChild: true, children: null };
                  const dialogPortalProps: DialogPortalProps = { children: null };
                  const dialogOverlayProps: DialogOverlayProps = {};
                  const dialogContentProps: DialogContentProps = {};
                  const dialogHeaderProps: DialogHeaderProps = {};
                  const dialogTitleProps: DialogTitleProps = {};
                  const dialogDescriptionProps: DialogDescriptionProps = {};
                  const dialogBodyProps: DialogBodyProps = {};
                  const dialogFooterProps: DialogFooterProps = {};
                  const dialogCloseProps: DialogCloseProps = { asChild: true };

                  const modalRootProps: ModalRootProps = {
                    size: modalSize,
                    isOpen: false,
                    onClose: () => {},
                    children: null,
                  };
                  const modalTriggerProps: ModalTriggerProps = { asChild: true, children: null };
                  const modalPortalProps: ModalPortalProps = { children: null };
                  const modalOverlayProps: ModalOverlayProps = {};
                  const modalContentProps: ModalContentProps = {};
                  const modalHeaderProps: ModalHeaderProps = {};
                  const modalTitleProps: ModalTitleProps = {};
                  const modalDescriptionProps: ModalDescriptionProps = {};
                  const modalBodyProps: ModalBodyProps = {};
                  const modalFooterProps: ModalFooterProps = {};
                  const modalCloseProps: ModalCloseProps = { asChild: true };

                  void dialogRootProps;
                  void modalRootProps;
                  void DialogRoot;
                  void DialogTrigger;
                  void DialogPortal;
                  void DialogOverlay;
                  void DialogContent;
                  void DialogHeader;
                  void DialogTitle;
                  void DialogDescription;
                  void DialogBody;
                  void DialogFooter;
                  void DialogClose;

                  return (
                    <>
                      {/* Dialog compound component usage */}
                      <Dialog.Root size={dialogSize} isOpen={false} onClose={() => {}}>
                        <Dialog.Trigger {...dialogTriggerProps}>
                          <button type="button">Open Dialog</button>
                        </Dialog.Trigger>
                        <Dialog.Portal {...dialogPortalProps}>
                          <Dialog.Overlay {...dialogOverlayProps} />
                          <Dialog.Content {...dialogContentProps}>
                            <Dialog.Header {...dialogHeaderProps}>
                              <Dialog.Title {...dialogTitleProps}>Confirm Delete</Dialog.Title>
                              <Dialog.Description {...dialogDescriptionProps}>
                                Are you sure you want to proceed?
                              </Dialog.Description>
                            </Dialog.Header>
                            <Dialog.Body {...dialogBodyProps}>
                              <p>Dialog body content</p>
                            </Dialog.Body>
                            <Dialog.Footer {...dialogFooterProps}>
                              <Dialog.Close {...dialogCloseProps}>
                                <button type="button">Cancel</button>
                              </Dialog.Close>
                              <button type="button">Confirm</button>
                            </Dialog.Footer>
                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>

                      {/* Modal compatibility alias contract verification */}
                      <Modal.Root size={modalSize} isOpen={false} onClose={() => {}}>
                        <Modal.Trigger {...modalTriggerProps}>
                          <button type="button">Open Modal Alias</button>
                        </Modal.Trigger>
                        <Modal.Portal {...modalPortalProps}>
                          <Modal.Overlay {...modalOverlayProps} />
                          <Modal.Content {...modalContentProps}>
                            <Modal.Header {...modalHeaderProps}>
                              <Modal.Title {...modalTitleProps}>Modal Title</Modal.Title>
                              <Modal.Description {...modalDescriptionProps}>
                                Modal description alias
                              </Modal.Description>
                            </Modal.Header>
                            <Modal.Body {...modalBodyProps}>
                              <p>Modal body content</p>
                            </Modal.Body>
                            <Modal.Footer {...modalFooterProps}>
                              <Modal.Close {...modalCloseProps}>
                                <button type="button">Close</button>
                              </Modal.Close>
                            </Modal.Footer>
                          </Modal.Content>
                        </Modal.Portal>
                      </Modal.Root>
                    </>
                  );
                })()}
              </div>

              {/* 24. Badge (Wave 2C / W2-F08) */}
              <div style={{ marginTop: "1rem" }}>
                {(() => {
                  const variant: BadgeVariant = "subtle";
                  const size: BadgeSize = "md";
                  const colorScheme: BadgeColorScheme = "primary";

                  const badgeProps: BadgeProps = {
                    variant,
                    size,
                    colorScheme,
                    children: "New Feature",
                  };

                  return (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Badge {...badgeProps} />
                      <Badge variant="solid" colorScheme="success" size="lg">
                        Active
                      </Badge>
                      <Badge variant="outline" colorScheme="danger" size="sm">
                        Failed
                      </Badge>
                    </div>
                  );
                })()}
              </div>

              {/* 25. Table (Wave 2C / W2-F08) */}
              <div style={{ marginTop: "1rem" }}>
                {(() => {
                  const variant: TableVariant = "simple";
                  const size: TableSize = "md";

                  const rootProps: TableRootProps = {
                    variant,
                    size,
                    isHoverable: true,
                    children: null,
                  };
                  const containerProps: TableContainerProps = {
                    bordered: true,
                    children: null,
                  };
                  const captionProps: TableCaptionProps = { placement: "bottom" };
                  const theadProps: TableTheadProps = {};
                  const tbodyProps: TableTbodyProps = {};
                  const tfootProps: TableTfootProps = {};
                  const rowProps: TableRowProps = { isSelected: false };
                  const thProps: TableHeaderCellProps = { isNumeric: false };
                  const thNumericProps: TableHeaderCellProps = { isNumeric: true };
                  const tdProps: TableCellProps = {};
                  const tdNumericProps: TableCellProps = { isNumeric: true };

                  void rootProps;
                  void containerProps;
                  void TableRoot;
                  void TableContainer;
                  void TableCaption;
                  void TableThead;
                  void TableTbody;
                  void TableTfoot;
                  const _tableCtx: TableContextValue | null = null;
                  void _tableCtx;

                  return (
                    <Table.Container bordered>
                      <Table.Root variant={variant} size={size} isHoverable>
                        <Table.Caption {...captionProps}>User Metrics Summary</Table.Caption>
                        <Table.Thead {...theadProps}>
                          <Table.Tr {...rowProps}>
                            <Table.Th {...thProps}>User</Table.Th>
                            <Table.Th {...thProps}>Role</Table.Th>
                            <Table.Th {...thNumericProps}>Score</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody {...tbodyProps}>
                          <Table.Tr>
                            <Table.Td {...tdProps}>Sarah Connor</Table.Td>
                            <Table.Td {...tdProps}>Admin</Table.Td>
                            <Table.Td {...tdNumericProps}>98.5</Table.Td>
                          </Table.Tr>
                        </Table.Tbody>
                        <Table.Tfoot {...tfootProps}>
                          <TableTr>
                            <TableTh>Total</TableTh>
                            <TableTd colSpan={2}>1 Active</TableTd>
                          </TableTr>
                        </Table.Tfoot>
                      </Table.Root>
                    </Table.Container>
                  );
                })()}
              </div>

              {/* 25. DropdownMenu */}
              {(() => {
                const rootProps: DropdownMenuRootProps = { open: true, modal: false };
                const contentProps: DropdownMenuContentProps = { side: "bottom", align: "start" };
                const itemProps: DropdownMenuItemProps = { disabled: false };
                return (
                  <DropdownMenu {...rootProps}>
                    <DropdownMenu.Trigger asChild>
                      <Button>Options</Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content {...contentProps}>
                      <DropdownMenu.Label>Navigation</DropdownMenu.Label>
                      <DropdownMenu.Item {...itemProps} onSelect={() => {}}>Profile</DropdownMenu.Item>
                      <DropdownMenu.CheckboxItem checked onCheckedChange={(_c: boolean) => {}}>
                        Show Status
                      </DropdownMenu.CheckboxItem>
                      <DropdownMenu.Separator />
                      <DropdownMenu.RadioGroup value="dark" onValueChange={(_v: string) => {}}>
                        <DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
                        <DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
                      </DropdownMenu.RadioGroup>
                    </DropdownMenu.Content>
                  </DropdownMenu>
                );
              })()}

              {/* 26. ContextMenu */}
              {(() => {
                const rootProps: ContextMenuRootProps = {};
                const contentProps: ContextMenuContentProps = { sideOffset: 4 };
                const itemProps: ContextMenuItemProps = {};
                return (
                  <ContextMenu {...rootProps}>
                    <ContextMenu.Trigger>
                      <div>Right click region</div>
                    </ContextMenu.Trigger>
                    <ContextMenu.Content {...contentProps}>
                      <ContextMenu.Item {...itemProps} onSelect={() => {}}>Copy</ContextMenu.Item>
                      <ContextMenu.Separator />
                      <ContextMenu.Item {...itemProps} onSelect={() => {}}>Paste</ContextMenu.Item>
                    </ContextMenu.Content>
                  </ContextMenu>
                );
              })()}

              {/* 27. Drawer & Sheet */}
              {(() => {
                const drawerProps: DrawerRootProps = { placement: "right", size: "md", open: true };
                const drawerContentProps: DrawerContentProps = { placement: "right" };
                const sheetProps: SheetRootProps = { placement: "left", size: "full" };
                const sheetContentProps: SheetContentProps = { placement: "left" };
                return (
                  <>
                    <Drawer {...drawerProps}>
                      <Drawer.Trigger asChild>
                        <Button>Open Drawer</Button>
                      </Drawer.Trigger>
                      <Drawer.Portal>
                        <Drawer.Overlay />
                        <Drawer.Content {...drawerContentProps}>
                          <Drawer.Header>
                            <Drawer.Title>Drawer Heading</Drawer.Title>
                            <Drawer.Description>Accessible drawer description</Drawer.Description>
                          </Drawer.Header>
                          <Drawer.Body>Content</Drawer.Body>
                          <Drawer.Footer>
                            <Drawer.Close asChild>
                              <Button>Close</Button>
                            </Drawer.Close>
                          </Drawer.Footer>
                        </Drawer.Content>
                      </Drawer.Portal>
                    </Drawer>

                    <Sheet {...sheetProps}>
                      <Sheet.Trigger asChild>
                        <Button>Open Sheet</Button>
                      </Sheet.Trigger>
                      <Sheet.Portal>
                        <Sheet.Overlay />
                        <Sheet.Content {...sheetContentProps}>
                          <Sheet.Header>
                            <Sheet.Title>Sheet Heading</Sheet.Title>
                          </Sheet.Header>
                        </Sheet.Content>
                      </Sheet.Portal>
                    </Sheet>
                  </>
                );
              })()}

              {/* 28. Breadcrumbs (Wave 4) */}
              {(() => {
                void Breadcrumb;
                void BreadcrumbList;
                void BreadcrumbItem;
                void BreadcrumbLink;
                void BreadcrumbPage;
                void BreadcrumbSeparator;
                void BreadcrumbEllipsis;
                type _FV = FieldValidator<string>;
                void (null as unknown as _FV);

                const breadcrumbProps: BreadcrumbsProps = {
                  "aria-label": "Site Navigation",
                  separator: "/",
                  itemsBeforeCollapse: 1,
                  itemsAfterCollapse: 1,
                  children: null,
                };
                const itemProps: BreadcrumbItemProps = {
                  children: null,
                };
                return (
                  <Breadcrumbs {...breadcrumbProps}>
                    <Breadcrumbs.List>
                      <Breadcrumbs.Item {...itemProps}>
                        <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
                      </Breadcrumbs.Item>
                      <Breadcrumbs.Separator />
                      <Breadcrumbs.Item>
                        <Breadcrumbs.Ellipsis />
                      </Breadcrumbs.Item>
                      <Breadcrumbs.Separator />
                      <Breadcrumbs.Item>
                        <Breadcrumbs.Page>Current Page</Breadcrumbs.Page>
                      </Breadcrumbs.Item>
                    </Breadcrumbs.List>
                  </Breadcrumbs>
                );
              })()}

              {/* 29. Link (Wave 4) */}
              {(() => {
                const underline: LinkUnderline = "hover";
                const colorScheme: LinkColorScheme = "primary";
                const linkProps: LinkProps = {
                  href: "https://example.com",
                  isExternal: true,
                  underline,
                  colorScheme,
                };
                return <Link {...linkProps}>External Link Example</Link>;
              })()}

              {/* 30. Form Validation (Wave 4) */}
              <FormValidationConsumerDemo />

              {/* 31. DateRangePicker (Wave 4) */}
              {(() => {
                const range: DateRange = {
                  startDate: new Date(2026, 0, 1),
                  endDate: new Date(2026, 0, 15),
                };
                const dateRangeProps: DateRangePickerProps = {
                  value: range,
                  onValueChange: (_next: DateRange | null) => {},
                  isClearable: true,
                  placeholder: "Choose range...",
                };
                return <DateRangePicker {...dateRangeProps} />;
              })()}

              {/* 32. TimePicker (Wave 4) */}
              {(() => {
                const format: TimeFormat = "12h";
                const timeProps: TimePickerProps = {
                  format,
                  minuteStep: 15,
                  value: "09:30",
                  onValueChange: (_val: string) => {},
                  isClearable: true,
                  placeholder: "Select meeting time...",
                };
                return <TimePicker {...timeProps} />;
              })()}

              {/* 33. MultiSelect (Wave 5) */}
              {(() => {
                const options: MultiSelectOption<string>[] = [
                  { label: "React", value: "react" },
                  { label: "Vue", value: "vue" },
                ];
                const multiProps: MultiSelectProps<string> = {
                  options,
                  defaultValue: ["react"],
                  onValueChange: (_vals: string[]) => {},
                  isSearchable: true,
                  isClearable: true,
                };
                return <MultiSelect {...multiProps} />;
              })()}

              {/* 34. DataGrid (Wave 5) */}
              {(() => {
                interface UserRow {
                  id: string;
                  name: string;
                }
                const cols: DataGridColumn<UserRow>[] = [
                  { key: "name", header: "Name", accessor: (r) => r.name, isSortable: true },
                ];
                const data: UserRow[] = [{ id: "1", name: "Alice" }];
                const sort: DataGridSort<string> = { columnKey: "name", direction: "asc" };
                const dgProps: DataGridProps<UserRow> = {
                  columns: cols,
                  data,
                  getRowId: (r) => r.id,
                  isSelectable: true,
                  sort,
                };
                return <DataGrid {...dgProps} />;
              })()}

              {/* 35. FileUpload (Wave 5) */}
              {(() => {
                type _ConsumerFileItem = FileItem;
                const _mockItem: _ConsumerFileItem = {
                  id: "f-1",
                  file: new File([], "test.txt"),
                  name: "test.txt",
                  size: 0,
                  type: "text/plain",
                };
                void _mockItem;

                const fuProps: FileUploadProps = {
                  isMultiple: true,
                  accept: "image/*",
                  maxSize: 1024 * 1024,
                  onValueChange: (_files: File[]) => {},
                  onValidationErrors: (_errs: FileValidationError[]) => {},
                };
                return <FileUpload {...fuProps} />;
              })()}

              {/* 36. Slider & RangeSlider (Wave 5) */}
              {(() => {
                const marks: SliderMark[] = [{ value: 0, label: "0" }, { value: 100, label: "100" }];
                const sliderProps: SliderProps = {
                  defaultValue: 50,
                  min: 0,
                  max: 100,
                  step: 5,
                  marks,
                  onChange: (_val: number) => {},
                };
                const rangeProps: RangeSliderProps = {
                  defaultValue: [20, 80],
                  minDistance: 10,
                  onChange: (_range: [number, number]) => {},
                };
                return (
                  <>
                    <Slider {...sliderProps} />
                    <RangeSlider {...rangeProps} />
                  </>
                );
              })()}

              {/* 37. TreeView (Wave 6) */}
              {(() => {
                const nodes: TreeNode[] = [
                  { id: "1", label: "Folder 1", children: [{ id: "1-1", label: "File 1" }] },
                ];
                const mode: TreeViewSelectionMode = "single";
                const treeProps: TreeViewProps = {
                  nodes,
                  selectionMode: mode,
                  defaultExpandedIds: ["1"],
                  renderNode: (_node: TreeNode, _state: TreeNodeState) => <span>Node</span>,
                  onSelectionChange: (_ids: string[]) => {},
                };
                return <TreeView {...treeProps} />;
              })()}

              {/* 38. Stepper (Wave 6) */}
              {(() => {
                const steps: StepItem[] = [
                  { id: "step-1", label: "Step 1", description: "Details" },
                  { id: "step-2", label: "Step 2" },
                ];
                const orientation: StepperOrientation = "horizontal";
                const size: StepperSize = "md";
                const stepperProps: StepperProps = {
                  steps,
                  activeStep: "step-1",
                  orientation,
                  size,
                  isClickable: true,
                  onStepChange: (_id: string | number) => {},
                };
                return <Stepper {...stepperProps} />;
              })()}

              {/* 39. Carousel (Wave 6) */}
              {(() => {
                const carouselProps: CarouselProps = {
                  slides: [<div>Slide 1</div>, <div>Slide 2</div>],
                  loop: true,
                  autoPlay: true,
                  autoPlayInterval: 3000,
                  onSlideChange: (_idx: number) => {},
                };
                const slideProps: CarouselSlideProps = {
                  children: <div>Slide A</div>,
                };
                return (
                  <Carousel {...carouselProps}>
                    <CarouselSlide {...slideProps} />
                  </Carousel>
                );
              })()}
            </>
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

function FormValidationConsumerDemo() {
  type FormState = Record<string, unknown> & {
    email: string;
  };
  const formOptions: UseFormValidationOptions<FormState> = {
    initialValues: { email: "" },
    validators: {
      email: (val: unknown) => {
        if (!val || typeof val !== "string" || !val.trim()) {
          const err: FieldValidationError = { message: "Email is required" };
          const res: FieldValidationResult = { valid: false, error: err };
          return res;
        }
        return { valid: true };
      },
    },
  };
  const form: UseFormValidationReturn<FormState> = useFormValidation<FormState>(formOptions);

  return (
    <form onSubmit={(e) => void form.handleSubmit(e)}>
      <FormField {...form.getFieldProps("email")}>
        <FormLabel>Email</FormLabel>
        <Input {...form.getInputProps("email")} />
        <FormErrorMessage />
      </FormField>
      <Button type="submit" isLoading={form.isSubmitting}>
        Submit
      </Button>
    </form>
  );
}

