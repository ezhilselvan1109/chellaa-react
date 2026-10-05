import * as React from "react";
import { Kbd } from "./Kbd";
import { Flex } from "../Flex";
import { Stack } from "../Stack";
import { Box } from "../Box";
import { Typography } from "../Typography";
import { ThemeProvider } from "../../theme/ThemeProvider";

export default {
  title: "Layout/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["outline", "subtle", "solid"],
    },
    modifier: {
      control: "select",
      options: [
        "command",
        "shift",
        "option",
        "control",
        "enter",
        "escape",
        "tab",
        "backspace",
        "delete",
        "up",
        "down",
        "left",
        "right",
      ],
    },
  },
};

export const Default = {
  render: () => (
    <ThemeProvider>
      <Flex align="center" gap={1} sx={{ p: 4 }}>
        <Kbd modifier="command" />
        <Typography variant="body2" color="text.secondary">+</Typography>
        <Kbd>K</Kbd>
      </Flex>
    </ThemeProvider>
  ),
};

export const Sizes = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={3} sx={{ p: 4 }}>
        <Flex align="center" gap={1}>
          <Typography variant="caption" sx={{ width: 80 }}>Small (18px):</Typography>
          <Kbd size="sm" modifier="command" />
          <Kbd size="sm">K</Kbd>
        </Flex>
        <Flex align="center" gap={1}>
          <Typography variant="caption" sx={{ width: 80 }}>Medium (22px):</Typography>
          <Kbd size="md" modifier="command" />
          <Kbd size="md">K</Kbd>
        </Flex>
        <Flex align="center" gap={1}>
          <Typography variant="caption" sx={{ width: 80 }}>Large (28px):</Typography>
          <Kbd size="lg" modifier="command" />
          <Kbd size="lg">K</Kbd>
        </Flex>
      </Stack>
    </ThemeProvider>
  ),
};

export const Variants = {
  render: () => (
    <ThemeProvider>
      <Flex align="center" gap={3} sx={{ p: 4 }}>
        <Box>
          <Typography variant="caption" display="block" gutterBottom>Outline (Default):</Typography>
          <Kbd variant="outline">Esc</Kbd>
        </Box>
        <Box>
          <Typography variant="caption" display="block" gutterBottom>Subtle:</Typography>
          <Kbd variant="subtle">Esc</Kbd>
        </Box>
        <Box>
          <Typography variant="caption" display="block" gutterBottom>Solid:</Typography>
          <Kbd variant="solid">Esc</Kbd>
        </Box>
      </Flex>
    </ThemeProvider>
  ),
};

export const CommonShortcuts = {
  render: () => (
    <ThemeProvider>
      <Stack spacing={2} sx={{ maxWidth: 360, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <Flex justify="space-between" align="center">
          <Typography variant="body2">Open Command Palette</Typography>
          <Flex align="center" gap={0.5}>
            <Kbd size="sm" modifier="shift" />
            <Kbd size="sm" modifier="command" />
            <Kbd size="sm">P</Kbd>
          </Flex>
        </Flex>
        <Flex justify="space-between" align="center">
          <Typography variant="body2">Quick Search</Typography>
          <Flex align="center" gap={0.5}>
            <Kbd size="sm" modifier="command" />
            <Kbd size="sm">K</Kbd>
          </Flex>
        </Flex>
        <Flex justify="space-between" align="center">
          <Typography variant="body2">Save All Changes</Typography>
          <Flex align="center" gap={0.5}>
            <Kbd size="sm" modifier="option" />
            <Kbd size="sm" modifier="command" />
            <Kbd size="sm">S</Kbd>
          </Flex>
        </Flex>
        <Flex justify="space-between" align="center">
          <Typography variant="body2">Cancel / Close</Typography>
          <Kbd size="sm" modifier="escape" />
        </Flex>
      </Stack>
    </ThemeProvider>
  ),
};
