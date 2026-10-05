import * as React from "react";
import { Typography } from "./Typography";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { Paragraph } from "./Paragraph";
import { Code } from "./Code";
import { Stack } from "../Stack";
import { Box } from "../Box";
import { ThemeProvider } from "../../theme/ThemeProvider";

export default {
  title: "Layout/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle1",
        "subtitle2",
        "body1",
        "body2",
        "button",
        "caption",
        "overline",
      ],
    },
    align: {
      control: "select",
      options: ["inherit", "left", "center", "right", "justify"],
    },
    gutterBottom: { control: "boolean" },
    noWrap: { control: "boolean" },
    lineClamp: { control: "number" },
  },
};

export const TypeScale = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={2} sx={{ p: 4 }}>
        <Typography variant="h1">h1. Heading (96px)</Typography>
        <Typography variant="h2">h2. Heading (60px)</Typography>
        <Typography variant="h3">h3. Heading (48px)</Typography>
        <Typography variant="h4">h4. Heading (34px)</Typography>
        <Typography variant="h5">h5. Heading (24px)</Typography>
        <Typography variant="h6">h6. Heading (20px)</Typography>
        <Typography variant="subtitle1">
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Typography variant="subtitle2">
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Typography variant="body1">
          body1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat.
        </Typography>
        <Typography variant="body2">
          body2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat.
        </Typography>
        <Typography variant="button">button text</Typography>
        <Typography variant="caption">caption text</Typography>
        <Typography variant="overline">overline text</Typography>
      </Stack>
    </ThemeProvider>
  ),
};

export const ErgonomicPrimitives = {
  render: () => (
    <ThemeProvider>
      <Box sx={{ maxWidth: 640, p: 4, bgcolor: "background.paper", borderRadius: 2 }}>
        <Heading level={1} gutterBottom>
          Article Headline
        </Heading>
        <Heading level={2} variant="h5" color="text.secondary" gutterBottom>
          Subheading with secondary color
        </Heading>
        <Paragraph>
          Modern web applications require rigorous component design. Using{" "}
          <Code colorScheme="primary">@chellaa/react</Code>, developers can
          combine <Code>Heading</Code>, <Code>Text</Code>, and{" "}
          <Code>Paragraph</Code> with unified design tokens.
        </Paragraph>
        <Paragraph>
          <Text size="sm" color="text.secondary">
            Published on October 5, 2026 • 5 min read
          </Text>
        </Paragraph>
      </Box>
    </ThemeProvider>
  ),
};

export const TruncationAndClamping = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={3} sx={{ maxWidth: 400, p: 4 }}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Single-line Ellipsis (noWrap):
          </Typography>
          <Typography noWrap sx={{ bgcolor: "action.hover", p: 1, borderRadius: 1 }}>
            This is an exceptionally long title that will be gracefully truncated with an ellipsis.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Multi-line Clamping (lineClamp=2):
          </Typography>
          <Typography lineClamp={2} sx={{ bgcolor: "action.hover", p: 1, borderRadius: 1 }}>
            This is a long descriptive excerpt that spans several lines of text. When lineClamp
            is set to two, WebKit box orienting will restrict it precisely to two lines and
            truncate with a trailing ellipsis.
          </Typography>
        </Box>
      </Stack>
    </ThemeProvider>
  ),
};

export const CodeColors = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={2} sx={{ p: 4 }}>
        <Box>
          Default Code: <Code>git status</Code>
        </Box>
        <Box>
          Primary Code: <Code colorScheme="primary">npm run build</Code>
        </Box>
        <Box>
          Secondary Code: <Code colorScheme="secondary">export const config = &#123;&#125;</Code>
        </Box>
      </Stack>
    </ThemeProvider>
  ),
};
