import * as React from "react";
import { Button, ButtonGroup } from "@chellaa/react";
import { Header } from "../../components/DocsLayout/Header";
import { SearchModal } from "../../search/SearchModal";
import { CodeBlock } from "../../components/Common/CodeBlock";
import "./LandingPage.css";

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [copiedInstall, setCopiedInstall] = React.useState(false);
  const [heroLoading, setHeroLoading] = React.useState(false);

  React.useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    }
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText("pnpm add @chellaa/react");
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } catch {
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    }
  };

  const [stepPkg, setStepPkg] = React.useState<
    "pnpm" | "npm" | "yarn" | "bun"
  >("pnpm");

  const stepCommands = {
    pnpm: "pnpm add @chellaa/react",
    npm: "npm install @chellaa/react",
    yarn: "yarn add @chellaa/react",
    bun: "bun add @chellaa/react",
  };

  return (
    <div className="landing-container">
      <div className="landing-aurora" />

      {/* Global Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleMobileMenu={() => {}}
      />

      {/* Hero Section */}
      <section className="landing-hero">
        <a
          href="#/overview"
          className="landing-badge"
          onClick={() => onNavigate("#/overview")}
        >
          <span className="landing-badge-pill">NEW</span>
          <span>Chellaa React v0.1.0 Released — Zero-Config Styling</span>
          <span>→</span>
        </a>

        <h1 className="landing-title">
          The React Component Library{" "}
          <span className="landing-title-gradient">
            Engineered for Precision.
          </span>
        </h1>

        <p className="landing-subtitle">
          Build enterprise-grade web applications with zero-configuration
          styling, strict WCAG 2.2 AA accessibility, and 3-tier design tokens.
        </p>

        {/* Hero Actions */}
        <div className="landing-cta-row">
          <Button
            size="lg"
            variant="solid"
            colorScheme="primary"
            onClick={() => onNavigate("#/overview")}
          >
            Get Started →
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate("#/components/button")}
          >
            Explore Components
          </Button>

          <div
            className="landing-install-pill"
            onClick={handleCopyInstall}
            title="Click to copy command"
            role="button"
            tabIndex={0}
          >
            <span>$ pnpm add @chellaa/react</span>
            <span className="landing-install-copy-btn">
              {copiedInstall ? "✓ Copied" : "📋"}
            </span>
          </div>
        </div>

        {/* Live Hero Showcase Card */}
        <div className="landing-hero-showcase">
          <div className="landing-showcase-header">
            <div className="landing-window-dots">
              <span className="landing-dot landing-dot-red" />
              <span className="landing-dot landing-dot-yellow" />
              <span className="landing-dot landing-dot-green" />
            </div>
            <span
              style={{
                fontSize: "0.82rem",
                color: "var(--docs-text-dim)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              Chellaa Component Lab — Live Interactive Showcase
            </span>
            <div />
          </div>

          <div className="landing-showcase-body">
            {/* Live Interactive Buttons */}
            <div className="landing-showcase-buttons-row">
              <Button variant="solid" colorScheme="primary" size="md">
                Primary Solid
              </Button>
              <Button variant="outline" colorScheme="primary" size="md">
                Outline
              </Button>
              <Button variant="ghost" colorScheme="primary" size="md">
                Ghost
              </Button>
              <Button variant="subtle" colorScheme="secondary" size="md">
                Subtle Accent
              </Button>
              <Button
                variant="solid"
                colorScheme="primary"
                size="md"
                isLoading={heroLoading}
                onClick={() => {
                  setHeroLoading(true);
                  setTimeout(() => setHeroLoading(false), 1500);
                }}
              >
                {heroLoading ? "Saving..." : "Click to Test Loading"}
              </Button>
            </div>

            {/* Attached Segmented Group */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--docs-text-dim)",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                ButtonGroup Context Propagation
              </span>
              <ButtonGroup
                isAttached
                variant="outline"
                colorScheme="primary"
                size="sm"
              >
                <Button>Daily</Button>
                <Button>Weekly</Button>
                <Button>Monthly</Button>
                <Button>Annual</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="landing-features-section">
        <div className="landing-section-header">
          <span className="landing-section-tag">Architecture & Design</span>
          <h2 className="landing-section-title">
            Built for Modern React Engineering
          </h2>
          <p className="landing-section-desc">
            Engineered from first principles to eliminate styling friction,
            runtime overhead, and accessibility gaps.
          </p>
        </div>

        <div className="landing-bento-grid">
          {/* Card 1 */}
          <div className="landing-bento-card">
            <div className="landing-bento-icon">⚡</div>
            <h3 className="landing-bento-title">Zero-Configuration Styling</h3>
            <p className="landing-bento-desc">
              Importing components automatically delivers styling via modern{" "}
              <code>@layer cl-components</code>. No Tailwind dependency, no
              manual CSS import, zero CSS-in-JS runtime overhead.
            </p>
          </div>

          {/* Card 2 */}
          <div className="landing-bento-card">
            <div className="landing-bento-icon">♿</div>
            <h3 className="landing-bento-title">WCAG 2.2 AA by Default</h3>
            <p className="landing-bento-desc">
              Native HTML semantics first, complete keyboard keymaps, visible{" "}
              <code>:focus-visible</code> rings, and automated{" "}
              <code>axe-core</code> testing with 0 accessibility violations.
            </p>
          </div>

          {/* Card 3 */}
          <div className="landing-bento-card">
            <div className="landing-bento-icon">🎨</div>
            <h3 className="landing-bento-title">3-Tier Design Tokens</h3>
            <p className="landing-bento-desc">
              Primitive, semantic, and component tokens powered by standard CSS
              Custom Properties. Easily theme or customize without touching
              JavaScript bundles.
            </p>
          </div>

          {/* Card 4 */}
          <div className="landing-bento-card">
            <div className="landing-bento-icon">🧩</div>
            <h3 className="landing-bento-title">Polymorphic Slot (asChild)</h3>
            <p className="landing-bento-desc">
              Compose seamlessly with Next.js <code>&lt;Link&gt;</code> or React
              Router using Radix-style <code>asChild</code> slot delegation.
              Zero redundant wrapper DOM nodes.
            </p>
          </div>

          {/* Card 5 */}
          <div className="landing-bento-card">
            <div className="landing-bento-icon">🌙</div>
            <h3 className="landing-bento-title">Zero-FOUC SSR Theming</h3>
            <p className="landing-bento-desc">
              <code>ThemeProvider</code> and <code>ThemeScript</code> work
              seamlessly across client and server components, completely
              eliminating flash-of-wrong-theme on page load.
            </p>
          </div>

          {/* Card 6 */}
          <div className="landing-bento-card">
            <div className="landing-bento-icon">📦</div>
            <h3 className="landing-bento-title">Micro Bundle Footprint</h3>
            <p className="landing-bento-desc">
              Engineered with strict tree-shaking and aggressive size budgets.
              Button is just 1.58 KB brotlied; the entire core bundle is under
              2.53 KB.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start Code Walkthrough */}
      <section className="landing-quickstart-section">
        <div className="landing-section-header">
          <span className="landing-section-tag">Developer Experience</span>
          <h2 className="landing-section-title">
            Get Up and Running in 3 Steps
          </h2>
          <p className="landing-section-desc">
            Start building accessible, responsive interfaces in minutes.
          </p>
        </div>

        <div className="landing-steps-container">
          {/* Step 1 */}
          <div className="landing-step-card">
            <div className="landing-step-num">1</div>
            <div className="landing-step-content">
              <h3 className="landing-step-title">Install the Package</h3>
              <p className="landing-step-desc">
                Add <code>@chellaa/react</code> to your existing React 18 or 19
                project using your package manager of choice.
              </p>
              <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
                {(["pnpm", "npm", "yarn", "bun"] as const).map((pkg) => (
                  <button
                    key={pkg}
                    type="button"
                    onClick={() => setStepPkg(pkg)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "6px",
                      border: "1px solid var(--docs-border)",
                      backgroundColor:
                        stepPkg === pkg
                          ? "var(--docs-primary-bg)"
                          : "var(--docs-surface)",
                      color:
                        stepPkg === pkg
                          ? "var(--docs-primary)"
                          : "var(--docs-text-muted)",
                      fontWeight: stepPkg === pkg ? 700 : 500,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {pkg.toUpperCase()}
                  </button>
                ))}
              </div>
              <CodeBlock
                code={stepCommands[stepPkg]}
                language="bash"
                title={`${stepPkg.toUpperCase()} TERMINAL`}
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="landing-step-card">
            <div className="landing-step-num">2</div>
            <div className="landing-step-content">
              <h3 className="landing-step-title">Wrap with ThemeProvider</h3>
              <p className="landing-step-desc">
                Enables automatic theme management, dark mode, and design token
                propagation.
              </p>
              <CodeBlock
                code={`import { ThemeProvider } from "@chellaa/react";

export function AppRoot({ children }) {
  return (
    <ThemeProvider defaultTheme="system">
      {children}
    </ThemeProvider>
  );
}`}
                language="tsx"
                title="Root Layout"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="landing-step-card">
            <div className="landing-step-num">3</div>
            <div className="landing-step-content">
              <h3 className="landing-step-title">Import &amp; Render</h3>
              <p className="landing-step-desc">
                Import any component directly. Styles are delivered
                automatically with zero manual CSS imports!
              </p>
              <CodeBlock
                code={`import { Button, ButtonGroup } from "@chellaa/react";

export function ActionToolbar() {
  return (
    <ButtonGroup isAttached variant="solid" colorScheme="primary">
      <Button>Create</Button>
      <Button>Edit</Button>
      <Button colorScheme="danger">Delete</Button>
    </ButtonGroup>
  );
}`}
                language="tsx"
                title="ActionToolbar.tsx"
              />

              {/* Live Rendered Component Result */}
              <div
                style={{
                  marginTop: "12px",
                  padding: "16px 20px",
                  borderRadius: "10px",
                  background: "var(--docs-surface)",
                  border: "1px solid var(--docs-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#10b981",
                      boxShadow: "0 0 8px #10b981",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      color: "var(--docs-text-muted)",
                      textTransform: "uppercase",
                    }}
                  >
                    Live Rendered Component
                  </span>
                </div>

                <ButtonGroup isAttached variant="solid" colorScheme="primary">
                  <Button size="sm">Create</Button>
                  <Button size="sm">Edit</Button>
                  <Button size="sm" colorScheme="danger">
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="landing-cta-banner">
        <div className="landing-cta-banner-content">
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              marginBottom: "16px",
            }}
          >
            Ready to Build With Chellaa React?
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--docs-text-muted)",
              marginBottom: "32px",
              lineHeight: 1.6,
            }}
          >
            Explore our comprehensive component documentation, interactive
            sandboxes, and architectural guides.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              size="lg"
              variant="solid"
              colorScheme="primary"
              onClick={() => onNavigate("#/overview")}
            >
              Read Documentation →
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate("#/components/button")}
            >
              Browse Components
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontWeight: 800, color: "var(--docs-text)" }}>
            Chellaa React
          </span>
          <span>— Open-source React Component Library</span>
        </div>

        <div className="landing-footer-links">
          <a
            href="#/overview"
            className="landing-footer-link"
            onClick={() => onNavigate("#/overview")}
          >
            Documentation
          </a>
          <a
            href="#/components/button"
            className="landing-footer-link"
            onClick={() => onNavigate("#/components/button")}
          >
            Components
          </a>
          <a
            href="http://localhost:6006"
            target="_blank"
            rel="noreferrer"
            className="landing-footer-link"
          >
            Storybook Lab
          </a>
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="landing-footer-link"
          >
            Playground
          </a>
          <a
            href="#/changelog"
            className="landing-footer-link"
            onClick={() => onNavigate("#/changelog")}
          >
            Changelog
          </a>
        </div>
      </footer>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={(path: string) => {
          onNavigate(path);
          window.location.hash = path.replace("#", "");
        }}
      />
    </div>
  );
}
