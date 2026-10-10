import * as React from "react";
import { Divider } from "./Divider";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { Stack } from "../Stack";
import { Button } from "../Button";

export default {
  title: "Layout/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    variant: { control: "select", options: ["fullWidth", "inset", "middle"] },
    lineStyle: { control: "select", options: ["solid", "dashed", "dotted"] },
    textAlign: { control: "select", options: ["center", "left", "right"] },
    flexItem: { control: "boolean" },
    light: { control: "boolean" },
  },
};

export const Default = {
  render: () => (
    <Box sx={{ width: 400, p: 2 }}>
      <p>Section A: User Profile</p>
      <Divider sx={{ my: 2 }} />
      <p>Section B: Account Security</p>
    </Box>
  ),
};

export const WithLabelChips = {
  render: () => (
    <Stack spacing={3} sx={{ width: 400, p: 2 }}>
      <Divider>CENTER LABEL</Divider>
      <Divider textAlign="left">LEFT ALIGNED</Divider>
      <Divider textAlign="right">RIGHT ALIGNED</Divider>
      <Divider>
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 1,
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          CUSTOM BADGE
        </Box>
      </Divider>
    </Stack>
  ),
};

export const Variants = {
  render: () => (
    <Stack spacing={3} sx={{ width: 400, p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
      <Box>
        <p>Full Width (Default)</p>
        <Divider sx={{ my: 1 }} />
      </Box>
      <Box>
        <p>Inset (72px Left Margin)</p>
        <Divider variant="inset" sx={{ my: 1 }} />
      </Box>
      <Box>
        <p>Middle (Symmetrical 16px Inset)</p>
        <Divider variant="middle" sx={{ my: 1 }} />
      </Box>
    </Stack>
  ),
};

export const VerticalInToolbar = {
  render: () => (
    <Flex
      align="center"
      gap={1}
      sx={{
        p: 1.5,
        bgcolor: "background.paper",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        width: "fit-content",
      }}
    >
      <Button variant="ghost" size="sm">File</Button>
      <Button variant="ghost" size="sm">Edit</Button>
      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      <Button variant="ghost" size="sm">View</Button>
      <Button variant="ghost" size="sm">Help</Button>
    </Flex>
  ),
};

export const LineStyles = {
  render: () => (
    <Stack spacing={3} sx={{ width: 400, p: 2 }}>
      <Box>
        <p>Solid</p>
        <Divider lineStyle="solid" sx={{ my: 1 }} />
      </Box>
      <Box>
        <p>Dashed</p>
        <Divider lineStyle="dashed" sx={{ my: 1 }} />
      </Box>
      <Box>
        <p>Dotted</p>
        <Divider lineStyle="dotted" sx={{ my: 1 }} />
      </Box>
    </Stack>
  ),
};
