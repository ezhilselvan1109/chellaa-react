import * as React from "react";
import { Button, ButtonGroup } from "@chellaa/react";
import {
  FiZap,
  FiShield,
  FiLayers,
  FiMoon,
  FiPackage,
  FiCopy,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";
import { LuPalette } from "react-icons/lu";
import { Header } from "../../components/DocsLayout/Header";
import { SearchModal } from "../../search/SearchModal";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { STORYBOOK_URL, PLAYGROUND_URL } from "../../config/env";
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

  const [step3Variant, setStep3Variant] = React.useState<
    "solid" | "outline" | "subtle" | "ghost"
  >("solid");
  const [step3Count, setStep3Count] = React.useState(0);

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
        currentPath="/"
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleMobileMenu={() => {}}
        onNavigate={onNavigate}
      />

      {/* Hero Section */}
      <section className="landing-hero">
        <a
          href="/overview"
          className="landing-badge"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/overview");
          }}
        >
          <span className="landing-badge-pill">NEW</span>
          <span>Chellaa React v0.2.3 Released — Zero-Config Styling</span>
          <FiArrowRight size={13} />
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
            endIcon={<FiArrowRight size={16} />}
            onClick={() => onNavigate("/overview")}
          >
            Get Started
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate("/components/button")}
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
            <span className="landing-install-copy-btn" aria-label="Copy install command">
              {copiedInstall ? (
                <FiCheck size={14} style={{ color: "#34d399" }} />
              ) : (
                <FiCopy size={14} />
              )}
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
            <div className="landing-bento-icon">
              <FiZap size={22} style={{ color: "var(--docs-primary)" }} />
            </div>
            <h3 className="landing-bento-title">Zero-Configuration Styling</h3>
            <p className="landing-bento-desc">
              Importing components automatically delivers styling via modern{" "}
              <code>@layer cl-components</code>. No Tailwind dependency, no
              manual CSS import, zero CSS-in-JS runtime overhead.
            </p>
          </div>

          {/* Card 2 */}
          <div className="landing-bento-card">
            <div className="landing-bento-icon">
              <FiShield size={22} style={{ color: "#10b981" }} />
            </div>
            <h3 className="landing-bento-title">WCAG 2.2 AA by Default</h3>
            <p className="landing-bento-desc">
              Native HTML semantics first, complete keyboard keymaps, visible{" "}
              <code>:focus-visible</code> rings, and automated{" "}
              <code>axe-core</code> testing with 0 accessibility violations.
            </p>
          </div>

          {/* Card 3 */}
          <div className="landing-bento-card">
            <div className="landing-bento-icon">
              <LuPalette size={22} style={{ color: "#f59e0b" }} />
            </div>
            <h3 className="landing-bento-title">3-Tier Design Tokens</h3>
            <p className="landing-bento-desc">
              Primitive, semantic, and component tokens powered by standard CSS
              Custom Properties. Easily theme or customize without touching
              JavaScript bundles.
            </p>
          </div>

          {/* Card 4 */}
          <div className="landing-bento-card">
            <div className="landing-bento-icon">
              <FiLayers size={22} style={{ color: "#7c3aed" }} />
            </div>
            <h3 className="landing-bento-title">Polymorphic Slot (asChild)</h3>
            <p className="landing-bento-desc">
              Compose seamlessly with Next.js <code>&lt;Link&gt;</code> or React
              Router using Radix-style <code>asChild</code> slot delegation.
              Zero redundant wrapper DOM nodes.
            </p>
          </div>

          {/* Card 5 */}
          <div className="landing-bento-card">
            <div className="landing-bento-icon">
              <FiMoon size={22} style={{ color: "#38bdf8" }} />
            </div>
            <h3 className="landing-bento-title">Zero-FOUC SSR Theming</h3>
            <p className="landing-bento-desc">
              <code>ThemeProvider</code> and <code>ThemeScript</code> work
              seamlessly across client and server components, completely
              eliminating flash-of-wrong-theme on page load.
            </p>
          </div>

          {/* Card 6 */}
          <div className="landing-bento-card">
            <div className="landing-bento-icon">
              <FiPackage size={22} style={{ color: "#ec4899" }} />
            </div>
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
          <span className="landing-section-tag">DEVELOPER EXPERIENCE</span>
          <h2 className="landing-section-title">
            Get Up and Running in 3 Steps
          </h2>
          <p className="landing-section-desc">
            Start building accessible, responsive interfaces in minutes. Zero
            CSS-in-JS runtime overhead and zero complex build plugins.
          </p>
        </div>

        <div className="landing-steps-container">
          {/* Step 1 */}
          <div className="landing-step-card">
            <div className="landing-step-card-header">
              <div className="landing-step-meta">
                <span className="landing-step-pill">Step 01</span>
                <h3 className="landing-step-title">Install @chellaa/react</h3>
              </div>
              <span className="landing-step-category">Package Manager</span>
            </div>

            <p className="landing-step-desc">
              Add <code>@chellaa/react</code> to your existing React 18 or 19
              application using your package manager of choice.
            </p>

            <div className="landing-pkg-switcher" role="tablist" aria-label="Package Manager">
              {(["pnpm", "npm", "yarn", "bun"] as const).map((pkg) => (
                <button
                  key={pkg}
                  type="button"
                  role="tab"
                  aria-selected={stepPkg === pkg}
                  onClick={() => setStepPkg(pkg)}
                  className={`landing-pkg-btn ${stepPkg === pkg ? "active" : ""}`}
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

            <div className="landing-step-info-row">
              <span><strong>Peer Requirements:</strong> React &ge; 18.2.0, React-DOM &ge; 18.2.0</span>
              <span><strong>TypeScript:</strong> Built-in full type definitions</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="landing-step-card">
            <div className="landing-step-card-header">
              <div className="landing-step-meta">
                <span className="landing-step-pill">Step 02</span>
                <h3 className="landing-step-title">Wrap with ThemeProvider</h3>
              </div>
              <span className="landing-step-category">Root Context</span>
            </div>

            <p className="landing-step-desc">
              Mount <code>&lt;ThemeProvider&gt;</code> at your application root. It automatically
              synchronizes with system dark mode, prevents SSR theme flicker (FOUC), and cascades
              3-tier CSS variables without JavaScript runtime overhead.
            </p>

            <CodeBlock
              code={`import { ThemeProvider } from "@chellaa/react";

export function AppRoot({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}`}
              language="tsx"
              title="AppRoot.tsx"
            />

            <div className="landing-step-info-row">
              <span><strong>Zero-Config:</strong> CSS styles are delivered automatically</span>
              <span><strong>Modes:</strong> Light, Dark, System Automatic</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="landing-step-card">
            <div className="landing-step-card-header">
              <div className="landing-step-meta">
                <span className="landing-step-pill">Step 03</span>
                <h3 className="landing-step-title">Import &amp; Compose Components</h3>
              </div>
              <span className="landing-step-category">Interactive UI</span>
            </div>

            <p className="landing-step-desc">
              Import production-ready components and use them directly in your views.
              Polymorphic <code>asChild</code> composition, full keyboard navigation,
              and design token color schemes work out of the box.
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

            {/* Live Interactive Playground */}
            <div className="landing-step-live-panel">
              <div className="landing-step-live-header">
                <div className="landing-step-live-indicator">
                  <span className="landing-step-live-dot" />
                  <span>Interactive Live Preview</span>
                </div>

                <div className="landing-step-live-controls">
                  {(["solid", "outline", "subtle", "ghost"] as const).map((variant) => (
                    <button
                      key={variant}
                      type="button"
                      onClick={() => setStep3Variant(variant)}
                      className={`landing-step-live-control-btn ${step3Variant === variant ? "active" : ""}`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>

              <div className="landing-step-live-stage">
                <ButtonGroup isAttached variant={step3Variant} colorScheme="primary">
                  <Button
                    size="sm"
                    onClick={() => setStep3Count((c) => c + 1)}
                  >
                    Click Me ({step3Count})
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="neutral"
                    onClick={() => setStep3Count(0)}
                  >
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="danger"
                    onClick={() => setStep3Count((c) => Math.max(0, c - 1))}
                  >
                    Decrement
                  </Button>
                </ButtonGroup>
              </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outline"
                size="sm"
                endIcon={<FiArrowRight size={13} />}
                onClick={() => onNavigate("/overview")}
              >
                Explore Full Documentation
              </Button>
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
              endIcon={<FiArrowRight size={16} />}
              onClick={() => onNavigate("/overview")}
            >
              Read Documentation
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate("/components/button")}
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
            href="/overview"
            className="landing-footer-link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/overview");
            }}
          >
            Documentation
          </a>
          <a
            href="/components/button"
            className="landing-footer-link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/components/button");
            }}
          >
            Components
          </a>
          <a
            href={STORYBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="landing-footer-link"
          >
            Storybook Lab
          </a>
          <a
            href={PLAYGROUND_URL}
            target="_blank"
            rel="noreferrer"
            className="landing-footer-link"
          >
            Playground
          </a>
          <a
            href="/changelog"
            className="landing-footer-link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/changelog");
            }}
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
        }}
      />
    </div>
  );
}
