import * as React from "react";
import { Input } from "./Input";
import { TextField } from "./TextField";
import { InputAdornment } from "./InputAdornment";
import { Stack } from "../Stack";
import { Flex } from "../Flex";
import { Kbd } from "../Kbd";
import { ThemeProvider } from "../../theme/ThemeProvider";

export default {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "filled", "standard", "unstyled"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    fullWidth: { control: "boolean" },
    clearable: { control: "boolean" },
  },
};

export const Default = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={2} sx={{ maxWidth: 360, p: 4 }}>
        <Input placeholder="Default Outlined Input" />
      </Stack>
    </ThemeProvider>
  ),
};

export const Variants = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={3} sx={{ maxWidth: 360, p: 4 }}>
        <Input variant="outlined" placeholder="Outlined Variant (Default)" />
        <Input variant="filled" placeholder="Filled Variant" />
        <Input variant="standard" placeholder="Standard Flushed Variant" />
        <Input variant="unstyled" placeholder="Unstyled Variant" />
      </Stack>
    </ThemeProvider>
  ),
};

export const Sizes = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={3} sx={{ maxWidth: 360, p: 4 }}>
        <Input size="sm" placeholder="Small (32px height)" />
        <Input size="md" placeholder="Medium (40px height)" />
        <Input size="lg" placeholder="Large (48px height)" />
      </Stack>
    </ThemeProvider>
  ),
};

export const WithAdornments = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={3} sx={{ maxWidth: 400, p: 4 }}>
        <Input
          placeholder="Search components..."
          startAdornment={
            <InputAdornment position="start" disablePointerEvents>
              🔍
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <Flex align="center" gap={0.5}>
                <Kbd size="sm" modifier="command" />
                <Kbd size="sm">K</Kbd>
              </Flex>
            </InputAdornment>
          }
        />
        <Input
          type="number"
          placeholder="0.00"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          endAdornment={<InputAdornment position="end">USD</InputAdornment>}
        />
      </Stack>
    </ThemeProvider>
  ),
};

export const Clearable = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={2} sx={{ maxWidth: 360, p: 4 }}>
        <Input
          clearable
          defaultValue="Click the clear cross icon"
          placeholder="Type to see clear button"
        />
      </Stack>
    </ThemeProvider>
  ),
};

export const ValidationStates = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={3} sx={{ maxWidth: 360, p: 4 }}>
        <Input error defaultValue="invalid@email" placeholder="Error state" />
        <Input disabled defaultValue="Disabled content" placeholder="Disabled" />
        <Input readOnly defaultValue="Read-only token" placeholder="Read only" />
      </Stack>
    </ThemeProvider>
  ),
};

export const CompositeTextField = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={3} sx={{ maxWidth: 400, p: 4 }}>
        <TextField
          label="Email Address"
          type="email"
          placeholder="alex@company.com"
          helperText="We will never share your personal information."
          required
        />
        <TextField
          label="Password"
          type="password"
          defaultValue="12345"
          error
          errorMessage="Password must be at least 8 characters long."
          required
        />
      </Stack>
    </ThemeProvider>
  ),
};
