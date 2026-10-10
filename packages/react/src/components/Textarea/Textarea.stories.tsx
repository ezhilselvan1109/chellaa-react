import * as React from "react";
import { Textarea } from "./Textarea";
import { Stack } from "../Stack";
import { Box } from "../Box";
import { Typography } from "../Typography";

export default {
  title: "Forms/Textarea",
  component: Textarea,
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
    autoResize: { control: "boolean" },
    showCount: { control: "boolean" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    fullWidth: { control: "boolean" },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
    },
  },
};

export const Default = {
  render: () => (
    <Box sx={{ maxWidth: 440, p: 4 }}>
      <Textarea placeholder="Write your comments here..." />
    </Box>
  ),
};

export const Variants = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 440, p: 4 }}>
      <Box>
        <Typography variant="caption" display="block" gutterBottom>Outlined (Default):</Typography>
        <Textarea variant="outlined" placeholder="Outlined multiline textarea..." />
      </Box>
      <Box>
        <Typography variant="caption" display="block" gutterBottom>Filled:</Typography>
        <Textarea variant="filled" placeholder="Filled multiline textarea..." />
      </Box>
      <Box>
        <Typography variant="caption" display="block" gutterBottom>Standard (Flushed):</Typography>
        <Textarea variant="standard" placeholder="Standard multiline textarea..." />
      </Box>
    </Stack>
  ),
};

export const AutoExpanding = {
  render: () => (
    <Box sx={{ maxWidth: 440, p: 4 }}>
      <Typography variant="caption" display="block" gutterBottom>
        Type several lines of text. The box expands automatically without vertical scrollbars:
      </Typography>
      <Textarea
        autoResize
        minRows={3}
        maxRows={8}
        placeholder="Start typing multiple paragraphs..."
        fullWidth
      />
    </Box>
  ),
};

export const WithCharacterCounter = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 440, p: 4 }}>
      <Box>
        <Typography variant="caption" display="block" gutterBottom>With Max Length (160 characters):</Typography>
        <Textarea
          showCount
          maxLength={160}
          defaultValue="Software architect passionate about design systems."
          fullWidth
        />
      </Box>
      <Box>
        <Typography variant="caption" display="block" gutterBottom>Without Max Length Cap:</Typography>
        <Textarea
          showCount
          placeholder="Unlimited text with character counter..."
          fullWidth
        />
      </Box>
    </Stack>
  ),
};

export const ValidationStates = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 440, p: 4 }}>
      <Textarea error defaultValue="Invalid feedback content" fullWidth />
      <Textarea disabled defaultValue="Disabled multiline content" fullWidth />
      <Textarea readOnly defaultValue="Read-only text field content" fullWidth />
    </Stack>
  ),
};
