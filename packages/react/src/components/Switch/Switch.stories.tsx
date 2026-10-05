import * as React from "react";
import { Switch } from "./Switch";
import { Stack } from "../Stack";
import { Box } from "../Box";
import { Typography } from "../Typography";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormHelperText } from "../FormField/FormHelperText";
import { FormErrorMessage } from "../FormField/FormErrorMessage";
import { ThemeProvider } from "../../theme/ThemeProvider";

export default {
  title: "Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    error: { control: "boolean" },
    loading: { control: "boolean" },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    colorScheme: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
        "default",
      ],
    },
    labelPlacement: {
      control: "select",
      options: ["end", "start", "top", "bottom"],
    },
  },
};

export const Default = {
  render: () => (
    <ThemeProvider>
      <Box sx={{ p: 4 }}>
        <Switch defaultChecked>Enable Push Notifications</Switch>
      </Box>
    </ThemeProvider>
  ),
};

export const Sizes = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={3} sx={{ p: 4 }}>
        <Switch size="sm" defaultChecked>Small (sm - 18px)</Switch>
        <Switch size="md" defaultChecked>Medium (md - 24px, Default)</Switch>
        <Switch size="lg" defaultChecked>Large (lg - 30px)</Switch>
      </Stack>
    </ThemeProvider>
  ),
};

export const ColorSchemes = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={2} sx={{ p: 4 }}>
        <Switch colorScheme="primary" defaultChecked>Primary Accent</Switch>
        <Switch colorScheme="secondary" defaultChecked>Secondary (Violet)</Switch>
        <Switch colorScheme="success" defaultChecked>Success (Emerald)</Switch>
        <Switch colorScheme="warning" defaultChecked>Warning (Amber)</Switch>
        <Switch colorScheme="error" defaultChecked>Error (Red)</Switch>
        <Switch colorScheme="info" defaultChecked>Info (Sky)</Switch>
        <Switch colorScheme="default" defaultChecked>Default (Neutral)</Switch>
      </Stack>
    </ThemeProvider>
  ),
};

export const WithIcons = {
  render: function ThemeToggleDemo() {
    const [isDark, setIsDark] = React.useState(true);

    const sunIcon = (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: "70%", height: "70%", color: "#f59e0b" }}
        aria-hidden="true"
      >
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" />
      </svg>
    );

    const moonIcon = (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: "70%", height: "70%", color: "#6366f1" }}
        aria-hidden="true"
      >
        <path d="M12.3 2a10 10 0 0 0-.19 14 10 10 0 0 0 11.89.19A1 1 0 0 0 23.44 15 10 10 0 1 1 12.3 2z" />
      </svg>
    );

    return (
      <ThemeProvider>
        <Box sx={{ p: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Theme Switcher: {isDark ? "Dark Theme Active" : "Light Theme Active"}
          </Typography>
          <Switch
            size="lg"
            colorScheme="secondary"
            checked={isDark}
            onChange={(e) => setIsDark(e.target.checked)}
            checkedIcon={moonIcon}
            uncheckedIcon={sunIcon}
          >
            {isDark ? "Dark Mode" : "Light Mode"}
          </Switch>
        </Box>
      </ThemeProvider>
    );
  },
};

export const LabelPlacements = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={4} sx={{ p: 4 }}>
        <Switch labelPlacement="end" defaultChecked>Label at End (Default)</Switch>
        <Switch labelPlacement="start" defaultChecked>Label at Start</Switch>
        <Switch labelPlacement="top" defaultChecked>Label on Top</Switch>
        <Switch labelPlacement="bottom" defaultChecked>Label at Bottom</Switch>
      </Stack>
    </ThemeProvider>
  ),
};

export const States = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={2} sx={{ p: 4 }}>
        <Switch>Unchecked Normal</Switch>
        <Switch defaultChecked>Checked Normal</Switch>
        <Switch disabled>Disabled Unchecked</Switch>
        <Switch disabled defaultChecked>Disabled Checked</Switch>
        <Switch loading>Loading Async Operation</Switch>
        <Switch error defaultChecked>Error State</Switch>
      </Stack>
    </ThemeProvider>
  ),
};

export const WithFormField = {
  render: () => (
    <ThemeProvider>
      <Box sx={{ maxWidth: 440, p: 4 }}>
        <FormField id="cloud-backup-field" required error>
          <FormLabel>Automated Backups</FormLabel>
          <Switch>Enable hourly database snapshot sync</Switch>
          <FormErrorMessage>Cloud backup quota has been exceeded.</FormErrorMessage>
          <FormHelperText>Snapshots are stored encrypted in cold cloud storage.</FormHelperText>
        </FormField>
      </Box>
    </ThemeProvider>
  ),
};
