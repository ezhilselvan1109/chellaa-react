import * as React from "react";
import {
  // Theming
  ThemeProvider,
  useTheme,
  // 1. Button & ButtonGroup
  Button,
  ButtonGroup,
  type ButtonColorScheme,
  type ButtonSize,
  type ButtonVariant,
  // 2. Input & TextField
  Input,
  TextField,
  InputAdornment,
  // 3. Textarea
  Textarea,
  // 4. FormField
  FormField,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  // 5. Checkbox & CheckboxGroup
  Checkbox,
  CheckboxGroup,
  // 6. Radio & RadioGroup
  Radio,
  RadioGroup,
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
  // 10. Typography
  Typography,
  Heading,
  Text,
  Paragraph,
  Code,
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
} from "@chellaa/react";
import "./Playground.css";

// -----------------------------------------------------------------------------
// Header & Navigation
// -----------------------------------------------------------------------------
interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Header({ activeTab, setActiveTab }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="pg-header">
      <div className="pg-brand-wrap">
        <div className="pg-brand">
          Chellaa React
          <span className="pg-brand-badge">v0.2.0 (18 Components)</span>
        </div>
      </div>

      <nav className="pg-nav-tabs">
        <button
          type="button"
          className={`pg-nav-tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Components
        </button>
        <button
          type="button"
          className={`pg-nav-tab ${activeTab === "forms" ? "active" : ""}`}
          onClick={() => setActiveTab("forms")}
        >
          Form Controls
        </button>
        <button
          type="button"
          className={`pg-nav-tab ${activeTab === "surfaces" ? "active" : ""}`}
          onClick={() => setActiveTab("surfaces")}
        >
          Surfaces & Display
        </button>
        <button
          type="button"
          className={`pg-nav-tab ${activeTab === "layout" ? "active" : ""}`}
          onClick={() => setActiveTab("layout")}
        >
          Layout Primitives
        </button>
        <button
          type="button"
          className={`pg-nav-tab ${activeTab === "scenario" ? "active" : ""}`}
          onClick={() => setActiveTab("scenario")}
        >
          Real-World Form
        </button>
      </nav>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </Button>
        <Button asChild variant="solid" colorScheme="primary" size="sm">
          <a
            href="https://github.com/ezhilselvan1109/chellaa-react"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </Button>
      </div>
    </header>
  );
}

// -----------------------------------------------------------------------------
// 1. Form Controls Section
// -----------------------------------------------------------------------------
function FormControlsSection() {
  const [btnVariant, setBtnVariant] = React.useState<ButtonVariant>("solid");
  const [btnSize, setBtnSize] = React.useState<ButtonSize>("md");
  const [btnColorScheme, setBtnColorScheme] =
    React.useState<ButtonColorScheme>("primary");
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const [inputVal, setInputVal] = React.useState("");
  const [hasError, setHasError] = React.useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState<string[]>([
    "react",
  ]);
  const [radioVal, setRadioVal] = React.useState<string | number>("hybrid");
  const [switchChecked, setSwitchChecked] = React.useState(true);

  return (
    <section className="pg-section">
      <div className="pg-section-header">
        <Heading level={2} variant="h3">
          1. Form Controls (8 Components)
        </Heading>
        <Paragraph>
          Interactive demonstrations of Button, ButtonGroup, Input, Textarea,
          FormField, Checkbox, Radio, and Switch.
        </Paragraph>
      </div>

      <Grid container spacing={3}>
        {/* Interactive Button Demo */}
        <Grid item xs={12} md={6}>
          <div className="pg-demo-card">
            <h3 className="pg-demo-title">Button & ButtonGroup</h3>
            <p className="pg-demo-desc">
              Static CSS buttons with tactile active states, loading spinner,
              and attached button group toolbars.
            </p>

            <div className="pg-controls-grid">
              <div className="pg-control-item">
                <span className="pg-control-label">Variant</span>
                <select
                  className="pg-control-select"
                  value={btnVariant}
                  onChange={(e) =>
                    setBtnVariant(e.target.value as ButtonVariant)
                  }
                >
                  <option value="solid">solid</option>
                  <option value="outline">outline</option>
                  <option value="ghost">ghost</option>
                  <option value="subtle">subtle</option>
                  <option value="link">link</option>
                </select>
              </div>

              <div className="pg-control-item">
                <span className="pg-control-label">Size</span>
                <select
                  className="pg-control-select"
                  value={btnSize}
                  onChange={(e) => setBtnSize(e.target.value as ButtonSize)}
                >
                  <option value="xs">xs</option>
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                  <option value="lg">lg</option>
                  <option value="xl">xl</option>
                </select>
              </div>

              <div className="pg-control-item">
                <span className="pg-control-label">Color Scheme</span>
                <select
                  className="pg-control-select"
                  value={btnColorScheme}
                  onChange={(e) =>
                    setBtnColorScheme(e.target.value as ButtonColorScheme)
                  }
                >
                  <option value="primary">primary</option>
                  <option value="secondary">secondary</option>
                  <option value="success">success</option>
                  <option value="warning">warning</option>
                  <option value="danger">danger</option>
                  <option value="neutral">neutral</option>
                </select>
              </div>
            </div>

            <Flex gap={2} sx={{ mb: 3 }}>
              <Switch
                size="sm"
                checked={btnLoading}
                onChange={(e) => setBtnLoading(e.target.checked)}
              >
                Loading
              </Switch>
              <Switch
                size="sm"
                checked={btnDisabled}
                onChange={(e) => setBtnDisabled(e.target.checked)}
              >
                Disabled
              </Switch>
            </Flex>

            <div className="pg-preview-area">
              <Stack direction="column" spacing={3} sx={{ alignItems: "center" }}>
                <Button
                  variant={btnVariant}
                  size={btnSize}
                  colorScheme={btnColorScheme}
                  isLoading={btnLoading}
                  loadingText="Processing..."
                  isDisabled={btnDisabled}
                >
                  Interactive Button
                </Button>

                <ButtonGroup isAttached variant="outline" size={btnSize}>
                  <Button colorScheme="primary">Daily</Button>
                  <Button colorScheme="primary">Weekly</Button>
                  <Button colorScheme="primary">Monthly</Button>
                </ButtonGroup>
              </Stack>
            </div>
          </div>
        </Grid>

        {/* Input, TextField, Textarea */}
        <Grid item xs={12} md={6}>
          <div className="pg-demo-card">
            <h3 className="pg-demo-title">Input, TextField & Textarea</h3>
            <p className="pg-demo-desc">
              Standardized inputs with start/end adornments, floating field
              labels, and vertical resizable textareas.
            </p>

            <Stack direction="column" spacing={3}>
              <FormField id="demo-user-input" required error={hasError}>
                <FormLabel>Username</FormLabel>
                <Input
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    setHasError(e.target.value.length > 0 && e.target.value.length < 3);
                  }}
                  placeholder="e.g. ezhilselvan"
                  startAdornment={<InputAdornment position="start">@</InputAdornment>}
                />
                {!hasError && (
                  <FormHelperText>Must be at least 3 characters.</FormHelperText>
                )}
                {hasError && (
                  <FormErrorMessage>Username is too short (min 3 chars).</FormErrorMessage>
                )}
              </FormField>

              <TextField
                id="demo-email"
                label="Email Address"
                placeholder="name@company.com"
                helperText="We will never spam you."
              />

              <FormField id="demo-bio">
                <FormLabel>Developer Biography</FormLabel>
                <Textarea
                  placeholder="Tell us about your background..."
                  rows={3}
                  resize="vertical"
                />
              </FormField>
            </Stack>
          </div>
        </Grid>

        {/* Checkbox, Radio, Switch */}
        <Grid item xs={12}>
          <div className="pg-demo-card">
            <h3 className="pg-demo-title">Checkbox, Radio & Switch</h3>
            <p className="pg-demo-desc">
              Full suite of accessible selection controls with keyboard focus
              indicators and colorScheme support.
            </p>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, bgcolor: "var(--pg-bg)", borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2 }}>
                    Checkbox Group (Multi-Select)
                  </Typography>
                  <CheckboxGroup
                    value={selectedCheckboxes}
                    onChange={setSelectedCheckboxes}
                  >
                    <Checkbox value="react" colorScheme="primary">
                      React 18 / 19
                    </Checkbox>
                    <Checkbox value="ts" colorScheme="primary">
                      TypeScript 5+
                    </Checkbox>
                    <Checkbox value="lightning" colorScheme="primary">
                      LightningCSS
                    </Checkbox>
                    <Checkbox value="legacy" disabled>
                      Legacy CSS-in-JS (Deprecated)
                    </Checkbox>
                  </CheckboxGroup>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, bgcolor: "var(--pg-bg)", borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2 }}>
                    Radio Group (Single Selection)
                  </Typography>
                  <RadioGroup value={radioVal} onChange={setRadioVal}>
                    <Radio value="static" colorScheme="primary">
                      Pure Static CSS
                    </Radio>
                    <Radio value="hybrid" colorScheme="primary">
                      Hybrid Architecture (ADR-011)
                    </Radio>
                    <Radio value="runtime" colorScheme="primary">
                      Pure Runtime Emotion
                    </Radio>
                  </RadioGroup>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, bgcolor: "var(--pg-bg)", borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2 }}>
                    Switch Controls
                  </Typography>
                  <Stack direction="column" spacing={2}>
                    <Switch
                      checked={switchChecked}
                      onChange={(e) => setSwitchChecked(e.target.checked)}
                      colorScheme="success"
                      size="md"
                    >
                      Production Build Guard
                    </Switch>
                    <Switch defaultChecked colorScheme="primary" size="sm">
                      Zero-Config Injected CSS
                    </Switch>
                    <Switch disabled size="sm">
                      Strict SSR StrictMode
                    </Switch>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

// -----------------------------------------------------------------------------
// 2. Surfaces & Data Display Section
// -----------------------------------------------------------------------------
function SurfacesSection() {
  const [paperElevation, setPaperElevation] = React.useState<number>(2);

  return (
    <section className="pg-section">
      <div className="pg-section-header">
        <Heading level={2} variant="h3">
          2. Surfaces & Data Display (4 Components)
        </Heading>
        <Paragraph>
          Demonstrating Paper, Card (Compound Hierarchy), Typography (Heading,
          Text, Paragraph, Code), and Kbd.
        </Paragraph>
      </div>

      <Grid container spacing={3}>
        {/* Paper Elevations */}
        <Grid item xs={12} md={6}>
          <div className="pg-demo-card">
            <h3 className="pg-demo-title">Paper Surface Elevations</h3>
            <p className="pg-demo-desc">
              Elevation tokens with standardized shadows and light/dark theme
              surface coloring.
            </p>

            <Flex gap={2} sx={{ mb: 3 }}>
              {[0, 1, 2, 3, 4, 5].map((lvl) => (
                <Button
                  key={lvl}
                  size="xs"
                  variant={paperElevation === lvl ? "solid" : "outline"}
                  colorScheme="primary"
                  onClick={() => setPaperElevation(lvl)}
                >
                  Elevation {lvl}
                </Button>
              ))}
            </Flex>

            <Paper
              elevation={paperElevation as 0 | 1 | 2 | 3 | 4 | 5}
              sx={{
                p: 3,
                textAlign: "center",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <Heading level={4}>Elevated Surface Box</Heading>
              <Text size="sm" color="text.secondary">
                Currently rendering elevation level {paperElevation} with
                smooth shadow transitions.
              </Text>
            </Paper>
          </div>
        </Grid>

        {/* Card Compound Hierarchy */}
        <Grid item xs={12} md={6}>
          <div className="pg-demo-card">
            <h3 className="pg-demo-title">Card Compound Component</h3>
            <p className="pg-demo-desc">
              Structured card container with header, media preview, body,
              divider footer, and actions.
            </p>

            <Card variant="elevated" elevation={2} hoverable>
              <CardMedia
                image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60"
                alt="Architecture Code"
                aspectRatio="16/9"
              />
              <CardHeader
                title="Chellaa React Hybrid Architecture"
                subheader="Static CSS Layer + Dynamic Emotion"
                avatar={<span style={{ fontSize: "1.5rem" }}>⚡</span>}
                action={
                  <Button size="xs" variant="ghost">
                    ⋮
                  </Button>
                }
              />
              <CardBody>
                <Text size="sm">
                  Achieved high-speed rendering with 0-runtime overhead for
                  static styles, preserving 100% dynamic Emotion props.
                </Text>
              </CardBody>
              <CardFooter divider>
                <Flex center gap={2}>
                  <Text size="xs" color="text.secondary">
                    CSS Budget: 56 KiB
                  </Text>
                  <Text size="xs" color="text.secondary">
                    •
                  </Text>
                  <Text size="xs" color="text.secondary">
                    ESM Budget: 160 KiB
                  </Text>
                </Flex>
              </CardFooter>
              <CardActions>
                <Button size="sm" variant="solid" colorScheme="primary">
                  Explore Architecture
                </Button>
                <Button size="sm" variant="outline">
                  View Source
                </Button>
              </CardActions>
            </Card>
          </div>
        </Grid>

        {/* Typography & Kbd */}
        <Grid item xs={12}>
          <div className="pg-demo-card">
            <h3 className="pg-demo-title">Typography & Keyboard Shortcuts (Kbd)</h3>
            <p className="pg-demo-desc">
              Fluid typographic scale with semantic heading elements, inline
              code badges, and tactile keyboard shortcuts.
            </p>

            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Stack direction="column" spacing={2}>
                  <Heading level={3}>Modern Fluid Typography</Heading>
                  <Paragraph>
                    Chellaa React integrates harmonized typography with
                    accessible color contrast and automatic design token
                    variables. You can easily highlight code like{" "}
                    <Code colorScheme="primary">pnpm run build</Code> or{" "}
                    <Code colorScheme="secondary">@layer cl-components</Code>.
                  </Paragraph>
                  <Flex gap={2}>
                    <Text size="xs" color="text.secondary">
                      Caption (12px)
                    </Text>
                    <Text size="sm">Small Body (14px)</Text>
                    <Text size="md" variant="subtitle1">
                      Medium Body (16px)
                    </Text>
                    <Text size="lg" variant="h6">
                      Large Heading (20px)
                    </Text>
                  </Flex>
                </Stack>
              </Grid>

              <Grid item xs={12} md={5}>
                <Box sx={{ p: 2, bgcolor: "var(--pg-bg)", borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2 }}>
                    Keyboard Shortcuts (Kbd)
                  </Typography>
                  <Stack direction="column" spacing={2}>
                    <Flex center gap={2} sx={{ justifyContent: "space-between" }}>
                      <Text size="sm">Quick Command Palette</Text>
                      <Flex gap={1}>
                        <Kbd modifier="command" />
                        <Kbd>K</Kbd>
                      </Flex>
                    </Flex>
                    <Flex center gap={2} sx={{ justifyContent: "space-between" }}>
                      <Text size="sm">Global Search</Text>
                      <Flex gap={1}>
                        <Kbd modifier="ctrl" />
                        <Kbd modifier="shift" />
                        <Kbd>F</Kbd>
                      </Flex>
                    </Flex>
                    <Flex center gap={2} sx={{ justifyContent: "space-between" }}>
                      <Text size="sm">Modifier Dictionary</Text>
                      <Text size="xs" color="text.secondary">
                        {MODIFIER_SYMBOLS.command} {MODIFIER_SYMBOLS.shift}{" "}
                        {MODIFIER_SYMBOLS.option} {MODIFIER_SYMBOLS.control}
                      </Text>
                    </Flex>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

// -----------------------------------------------------------------------------
// 3. Layout Primitives Section (Workflow F3)
// -----------------------------------------------------------------------------
function LayoutSection() {
  return (
    <section className="pg-section">
      <div className="pg-section-header">
        <Heading level={2} variant="h3">
          3. Layout Primitives (6 Components)
        </Heading>
        <Paragraph>
          Comprehensive layout primitives: Box, Container, Divider, Stack, Flex,
          and Grid migrated in Workflow F3.
        </Paragraph>
      </div>

      <Grid container spacing={3}>
        {/* Box & Container */}
        <Grid item xs={12} md={6}>
          <div className="pg-demo-card">
            <h3 className="pg-demo-title">Box & Container</h3>
            <p className="pg-demo-desc">
              Polymorphic Box with dynamic `sx` overrides inside centered
              max-width Container wrappers.
            </p>

            <Container maxWidth="sm" disableGutters>
              <Box
                component="section"
                sx={{
                  p: 3,
                  bgcolor: "var(--cl-color-primary-subtle, rgba(59, 130, 246, 0.1))",
                  border: "1px dashed var(--cl-color-primary-base, #3b82f6)",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Heading level={4} sx={{ color: "var(--cl-color-primary-base)" }}>
                  Polymorphic Box (`component="section"`)
                </Heading>
                <Text size="sm">
                  Centered inside a Container with `maxWidth="sm"`.
                </Text>
              </Box>
            </Container>
          </div>
        </Grid>

        {/* Stack & Divider */}
        <Grid item xs={12} md={6}>
          <div className="pg-demo-card">
            <h3 className="pg-demo-title">Stack with Embedded Divider</h3>
            <p className="pg-demo-desc">
              Linear flex layout with design-token spacing and automatic
              divider elements.
            </p>

            <Stack
              direction="column"
              spacing={2}
              divider={<Divider variant="middle" lineStyle="dashed" />}
            >
              <Box sx={{ p: 1, bgcolor: "var(--pg-bg)", borderRadius: 1 }}>
                <Text size="sm" variant="subtitle2">
                  Stack Item 1 — Header Layer
                </Text>
              </Box>
              <Box sx={{ p: 1, bgcolor: "var(--pg-bg)", borderRadius: 1 }}>
                <Text size="sm" variant="subtitle2">
                  Stack Item 2 — Content Body
                </Text>
              </Box>
              <Box sx={{ p: 1, bgcolor: "var(--pg-bg)", borderRadius: 1 }}>
                <Text size="sm" variant="subtitle2">
                  Stack Item 3 — Footer Actions
                </Text>
              </Box>
            </Stack>
          </div>
        </Grid>

        {/* Flex & Divider Variants */}
        <Grid item xs={12} md={6}>
          <div className="pg-demo-card">
            <h3 className="pg-demo-title">Flex & Divider Orientations</h3>
            <p className="pg-demo-desc">
              Horizontal centering with `center`, `inline`, and vertical
              dividers.
            </p>

            <Stack direction="column" spacing={3}>
              <Flex
                center
                gap={2}
                sx={{
                  p: 2,
                  bgcolor: "var(--pg-bg)",
                  borderRadius: 1,
                  justifyContent: "space-around",
                }}
              >
                <Text size="sm">Item Left</Text>
                <Divider orientation="vertical" flexItem />
                <Text size="sm">Centered Item</Text>
                <Divider orientation="vertical" flexItem />
                <Text size="sm">Item Right</Text>
              </Flex>

              <Divider textAlign="center">OR CONTINUE WITH</Divider>

              <Flex center gap={2}>
                <Button size="sm" variant="outline">
                  Google SSO
                </Button>
                <Button size="sm" variant="outline">
                  GitHub OAuth
                </Button>
              </Flex>
            </Stack>
          </div>
        </Grid>

        {/* 12-Column Responsive Grid */}
        <Grid item xs={12} md={6}>
          <div className="pg-demo-card">
            <h3 className="pg-demo-title">12-Column Responsive Grid</h3>
            <p className="pg-demo-desc">
              Fluid multi-column layout with static CSS column spans and gap
              tokens.
            </p>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="pg-grid-sample-box">xs={12} (Full Width)</div>
              </Grid>
              <Grid item xs={6}>
                <div className="pg-grid-sample-box">xs={6} (Half)</div>
              </Grid>
              <Grid item xs={6}>
                <div className="pg-grid-sample-box">xs={6} (Half)</div>
              </Grid>
              <Grid item xs={4}>
                <div className="pg-grid-sample-box">xs={4} (1/3)</div>
              </Grid>
              <Grid item xs={4}>
                <div className="pg-grid-sample-box">xs={4} (1/3)</div>
              </Grid>
              <Grid item xs={4}>
                <div className="pg-grid-sample-box">xs={4} (1/3)</div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

// -----------------------------------------------------------------------------
// 4. Real-World Scenario: Complete Profile / Settings Form
// -----------------------------------------------------------------------------
function ScenarioForm() {
  const [formData, setFormData] = React.useState({
    fullName: "Ezhil Selvan",
    email: "ezhil@example.com",
    role: "engineer",
    bio: "Lead Software Engineer building design systems.",
    notifications: true,
    telemetry: false,
    agreeTerms: true,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitFeedback, setSubmitFeedback] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitFeedback("Saving profile settings securely...");

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitFeedback("✅ Profile configuration successfully updated!");
      setTimeout(() => setSubmitFeedback(null), 4000);
    }, 1200);
  };

  return (
    <section className="pg-section">
      <div className="pg-section-header">
        <Heading level={2} variant="h3">
          4. Realistic Form Composition
        </Heading>
        <Paragraph>
          Demonstrating compound usage of all 18 components in an interactive
          enterprise profile settings screen.
        </Paragraph>
      </div>

      <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, margin: "0 auto" }}>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing={4}>
            <div>
              <Heading level={3}>Account & Developer Settings</Heading>
              <Text size="sm" color="text.secondary">
                Manage your credentials, roles, and communication preferences.
              </Text>
            </div>

            <Divider />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField id="profile-name" required>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Jane Doe"
                  />
                  <FormHelperText>Your legal or professional name.</FormHelperText>
                </FormField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField id="profile-email" required>
                  <FormLabel>Work Email</FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="user@enterprise.com"
                  />
                  <FormHelperText>Used for login and security alerts.</FormHelperText>
                </FormField>
              </Grid>

              <Grid item xs={12}>
                <FormField id="profile-bio">
                  <FormLabel>Biography</FormLabel>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={3}
                    placeholder="Brief background..."
                  />
                </FormField>
              </Grid>

              <Grid item xs={12}>
                <FormLabel>Primary Developer Role</FormLabel>
                <RadioGroup
                  value={formData.role}
                  onChange={(val) => setFormData({ ...formData, role: String(val) })}
                  orientation="horizontal"
                >
                  <Radio value="engineer" colorScheme="primary">
                    Software Engineer
                  </Radio>
                  <Radio value="designer" colorScheme="primary">
                    Product Designer
                  </Radio>
                  <Radio value="architect" colorScheme="primary">
                    System Architect
                  </Radio>
                </RadioGroup>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Heading level={4} sx={{ mb: 2 }}>
                  Preferences & Telemetry
                </Heading>
                <Stack direction="column" spacing={2}>
                  <Switch
                    checked={formData.notifications}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notifications: e.target.checked,
                      })
                    }
                    colorScheme="primary"
                  >
                    Email notifications for critical security events
                  </Switch>

                  <Switch
                    checked={formData.telemetry}
                    onChange={(e) =>
                      setFormData({ ...formData, telemetry: e.target.checked })
                    }
                    colorScheme="primary"
                  >
                    Send anonymous performance telemetry to improve the system
                  </Switch>

                  <Checkbox
                    checked={formData.agreeTerms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        agreeTerms: e.target.checked,
                      })
                    }
                    colorScheme="primary"
                  >
                    I agree to the Enterprise Master Services Agreement
                  </Checkbox>
                </Stack>
              </Grid>
            </Grid>

            {submitFeedback && (
              <Box
                sx={{
                  p: 2,
                  bgcolor: "var(--cl-color-success-subtle, rgba(34, 197, 94, 0.15))",
                  border: "1px solid var(--cl-color-success-base, #22c55e)",
                  borderRadius: 1,
                  color: "var(--cl-color-success-base, #22c55e)",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                {submitFeedback}
              </Box>
            )}

            <Flex gap={2} sx={{ justifyContent: "flex-end" }}>
              <Button
                type="button"
                variant="outline"
                isDisabled={isSubmitting}
                onClick={() =>
                  setFormData({
                    fullName: "",
                    email: "",
                    role: "engineer",
                    bio: "",
                    notifications: false,
                    telemetry: false,
                    agreeTerms: false,
                  })
                }
              >
                Clear Form
              </Button>
              <Button
                type="submit"
                variant="solid"
                colorScheme="primary"
                isLoading={isSubmitting}
                loadingText="Saving Settings..."
              >
                Save Profile
              </Button>
            </Flex>
          </Stack>
        </form>
      </Paper>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Root App Component
// -----------------------------------------------------------------------------
export function App() {
  const [activeTab, setActiveTab] = React.useState<string>("all");

  return (
    <ThemeProvider defaultTheme="light">
      <div className="pg-layout">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="pg-main">
          {(activeTab === "all" || activeTab === "forms") && (
            <FormControlsSection />
          )}
          {(activeTab === "all" || activeTab === "surfaces") && (
            <SurfacesSection />
          )}
          {(activeTab === "all" || activeTab === "layout") && <LayoutSection />}
          {(activeTab === "all" || activeTab === "scenario") && (
            <ScenarioForm />
          )}
        </main>
        <footer className="pg-footer">
          Chellaa React Design System • Hybrid Static CSS Architecture (ADR-011 / ADR-012)
        </footer>
      </div>
    </ThemeProvider>
  );
}
