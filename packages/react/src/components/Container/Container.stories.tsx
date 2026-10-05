import * as React from "react";
import { Container, type ContainerProps } from "./Container";
import { Box } from "../Box";
import { ThemeProvider } from "../../theme/ThemeProvider";

export default {
  title: "Layout/Container",
  component: Container,
  tags: ["autodocs"],
  argTypes: {
    maxWidth: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", false],
    },
    fixed: { control: "boolean" },
    disableGutters: { control: "boolean" },
  },
};

export const Default = {
  render: () => (
    <ThemeProvider>
      <Container maxWidth="md">
        <Box
          sx={{
            p: 4,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          Fluid Centered Container (maxWidth="md")
        </Box>
      </Container>
    </ThemeProvider>
  ),
};

export const FixedContainer = {
  render: () => (
    <ThemeProvider>
      <Container fixed maxWidth="lg">
        <Box
          sx={{
            p: 4,
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          Fixed Stepped Container (maxWidth="lg")
        </Box>
      </Container>
    </ThemeProvider>
  ),
};
