import * as React from "react";
import { Flex } from "./Flex";
import { Box } from "../Box";

export default {
  title: "Layout/Flex",
  component: Flex,
  tags: ["autodocs"],
  argTypes: {
    center: { control: "boolean" },
    inline: { control: "boolean" },
    direction: {
      control: "select",
      options: ["row", "row-reverse", "column", "column-reverse"],
    },
  },
};

export const DefaultRow = {
  render: () => (
    <Flex gap={2}>
      <Box sx={{ p: 2, bgcolor: "primary.light", borderRadius: 1 }}>Item A</Box>
      <Box sx={{ p: 2, bgcolor: "primary.light", borderRadius: 1 }}>Item B</Box>
      <Box sx={{ p: 2, bgcolor: "primary.light", borderRadius: 1 }}>Item C</Box>
    </Flex>
  ),
};

export const PerfectlyCentered = {
  render: () => (
    <Flex
      center
      sx={{
        height: 180,
        border: "2px dashed",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Box sx={{ p: 2, bgcolor: "secondary.main", color: "white", borderRadius: 1 }}>
        Perfect Center (center=true)
      </Box>
    </Flex>
  ),
};

export const InlineFlexWithDividers = {
  render: () => (
    <Flex
      inline
      gap={2}
      align="center"
      divider={<span style={{ color: "#999" }}>•</span>}
      sx={{
        p: 1.5,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <span>Profile</span>
      <span>Settings</span>
      <span>Help</span>
    </Flex>
  ),
};
