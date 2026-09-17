import React from "react";
import { Button, Spinner, useTheme } from "@chella-ui/react";

export function App() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Chella UI Consumer Verification</h1>
      <p>Current Theme: {theme} (Resolved: {resolvedTheme})</p>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
        <Button variant="primary" onClick={toggleTheme}>
          Toggle Theme
        </Button>
        <Button variant="secondary">Secondary Action</Button>
        <Button variant="outline">Outline Action</Button>
        <Button variant="danger">Danger Action</Button>
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button isLoading loadingText="Processing...">
          Save
        </Button>
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button asChild variant="outline">
          <a href="#test">Polymorphic Link</a>
        </Button>
        <Spinner size="md" />
      </div>
    </div>
  );
}
