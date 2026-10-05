import * as React from "react";
import { Box, type BoxProps } from "./Box";
import { ThemeProvider } from "../../theme/ThemeProvider";

export default {
  title: "Layout/Box",
  component: Box,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <ThemeProvider>
      <Box
        sx={{
          p: 3,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          borderRadius: 2,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Universal Material Box with sx prop
      </Box>
    </ThemeProvider>
  ),
};

export const ResponsiveBox = {
  render: () => (
    <ThemeProvider>
      <Box
        sx={{
          p: [2, 3, 5],
          width: { xs: "100%", sm: "80%", md: "60%" },
          bgcolor: "background.paper",
          color: "text.primary",
          boxShadow: 3,
          borderRadius: 3,
          mx: "auto",
          textAlign: "center",
        }}
      >
        Resize browser: padding & width scale responsively
      </Box>
    </ThemeProvider>
  ),
};

export const PolymorphicSection = {
  render: () => (
    <ThemeProvider>
      <Box
        component="section"
        sx={{
          p: 3,
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        Rendered as HTML5 &lt;section&gt; element
      </Box>
    </ThemeProvider>
  ),
};
