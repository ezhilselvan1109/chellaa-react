import * as React from "react";
import { Grid, type GridProps } from "./Grid";
import { Box } from "../Box";
import { ThemeProvider } from "../../theme/ThemeProvider";

export default {
  title: "Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
};

export const TwelveColumnGrid = {
  render: () => (
    <ThemeProvider>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ p: 2, bgcolor: "primary.light", textAlign: "center", borderRadius: 1 }}>
            xs=12 (Full Width)
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ p: 2, bgcolor: "primary.light", textAlign: "center", borderRadius: 1 }}>
            xs=12 sm=6
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ p: 2, bgcolor: "primary.light", textAlign: "center", borderRadius: 1 }}>
            xs=12 sm=6
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ p: 2, bgcolor: "primary.light", textAlign: "center", borderRadius: 1 }}>
            xs=6 md=3
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ p: 2, bgcolor: "primary.light", textAlign: "center", borderRadius: 1 }}>
            xs=6 md=3
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ p: 2, bgcolor: "primary.light", textAlign: "center", borderRadius: 1 }}>
            xs=6 md=3
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ p: 2, bgcolor: "primary.light", textAlign: "center", borderRadius: 1 }}>
            xs=6 md=3
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  ),
};
