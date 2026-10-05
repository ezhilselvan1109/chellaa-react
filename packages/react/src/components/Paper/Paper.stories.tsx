import * as React from "react";
import { Paper, type PaperProps } from "./Paper";
import { Stack } from "../Stack";
import { ThemeProvider } from "../../theme/ThemeProvider";

export default {
  title: "Surfaces/Paper",
  component: Paper,
  tags: ["autodocs"],
  argTypes: {
    elevation: {
      control: { type: "range", min: 0, max: 24, step: 1 },
    },
    variant: {
      control: "select",
      options: ["elevation", "outlined"],
    },
    square: { control: "boolean" },
  },
};

export const Elevations = {
  render: () => (
    <ThemeProvider>
      <Stack direction="row" spacing={3} flexWrap="wrap">
        {[0, 1, 2, 4, 8, 16, 24].map((level) => (
          <Paper
            key={level}
            elevation={level}
            sx={{
              width: 120,
              height: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Elevation {level}
          </Paper>
        ))}
      </Stack>
    </ThemeProvider>
  ),
};

export const Outlined = {
  render: () => (
    <ThemeProvider>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          maxWidth: 400,
        }}
      >
        Outlined Paper Surface with 1px divider border
      </Paper>
    </ThemeProvider>
  ),
};
