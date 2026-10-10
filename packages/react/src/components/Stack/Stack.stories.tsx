import * as React from "react";
import { Stack } from "./Stack";
import { Box } from "../Box";

export default {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
};

export const DefaultVertical = {
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Box sx={{ p: 2, bgcolor: "primary.light", borderRadius: 1 }}>Item 1</Box>
      <Box sx={{ p: 2, bgcolor: "primary.light", borderRadius: 1 }}>Item 2</Box>
      <Box sx={{ p: 2, bgcolor: "primary.light", borderRadius: 1 }}>Item 3</Box>
    </Stack>
  ),
};

export const HorizontalWithDividers = {
  render: () => (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      divider={
        <Box
          sx={{
            width: "1px",
            height: "24px",
            bgcolor: "divider",
          }}
        />
      }
    >
      <Box sx={{ p: 1.5, bgcolor: "background.paper", borderRadius: 1 }}>Home</Box>
      <Box sx={{ p: 1.5, bgcolor: "background.paper", borderRadius: 1 }}>Docs</Box>
      <Box sx={{ p: 1.5, bgcolor: "background.paper", borderRadius: 1 }}>Components</Box>
    </Stack>
  ),
};

export const ResponsiveDirection = {
  render: () => (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={[1, 2, 4]}
    >
      <Box sx={{ p: 2, bgcolor: "secondary.light", borderRadius: 1, flex: 1 }}>
        Column on mobile, Row on desktop
      </Box>
      <Box sx={{ p: 2, bgcolor: "secondary.light", borderRadius: 1, flex: 1 }}>
        Responsive Gaps
      </Box>
    </Stack>
  ),
};
