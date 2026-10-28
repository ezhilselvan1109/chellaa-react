"use client";

import * as React from "react";
import {
  ThemeProvider,
  useTheme,
  Button,
  Dialog,
  Select,
} from "@chellaa/react";

function ThemeControls() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div data-testid="theme-controls">
      <span data-testid="resolved-theme">{resolvedTheme}</span>
      <div style={{ marginTop: 8 }}>
        <Button
          data-testid="toggle-theme-btn"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          Toggle Theme (Current: {theme})
        </Button>
      </div>
    </div>
  );
}

export function ClientFixture() {
  const [clickCount, setClickCount] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedVal, setSelectedVal] = React.useState("opt1");

  return (
    <ThemeProvider defaultTheme="light">
      <div data-testid="client-fixture-root" style={{ padding: 24 }}>
        <h2>Client Component Boundary</h2>
        <ThemeControls />

        <div style={{ marginTop: 16 }}>
          <Button
            data-testid="counter-btn"
            variant="solid"
            color="primary"
            onClick={() => setClickCount((c) => c + 1)}
          >
            Count: {clickCount}
          </Button>
        </div>

        <div style={{ marginTop: 16 }}>
          <Button
            data-testid="open-dialog-btn"
            variant="outline"
            onClick={() => setDialogOpen(true)}
          >
            Open Dialog
          </Button>

          <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
            <Dialog.Content data-testid="dialog-content">
              <Dialog.Header>
                <Dialog.Title>Interactive Portal Dialog</Dialog.Title>
                <Dialog.Description>
                  Verifying portal rendering and accessibility in Next.js App Router.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Button
                  data-testid="close-dialog-btn"
                  onClick={() => setDialogOpen(false)}
                >
                  Close
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog>
        </div>

        <div style={{ marginTop: 16 }}>
          <Select
            value={selectedVal}
            onValueChange={(val) => setSelectedVal(val)}
            options={[
              { value: "opt1", label: "Option 1" },
              { value: "opt2", label: "Option 2" },
            ]}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
