import * as React from "react";
import { ClientFixture } from "./components/ClientFixture";
import { Button } from "@chellaa/react";

export default function Page() {
  return (
    <main data-testid="server-page-root" style={{ fontFamily: "sans-serif", margin: "0 auto", maxWidth: 800 }}>
      <h1>Server Component Page</h1>
      <p data-testid="server-text">
        This text is server-rendered inside a pure Next.js Server Component.
      </p>

      {/* Direct use of a client library component inside Server Component */}
      <section data-testid="server-boundary-section" style={{ border: "1px dashed #cbd5e1", padding: 16, margin: "16px 0" }}>
        <h3>Direct Library Component in Server Component:</h3>
        <Button data-testid="server-imported-btn" variant="subtle">
          Button in Server Component
        </Button>
      </section>

      {/* Composed Client Component boundary */}
      <section data-testid="client-boundary-section" style={{ border: "1px solid #94a3b8", borderRadius: 8 }}>
        <ClientFixture />
      </section>
    </main>
  );
}
