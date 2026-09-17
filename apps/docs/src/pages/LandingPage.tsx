import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@chella-ui/react";
import { InteractiveShowcase } from "../components/InteractiveShowcase";

export const LandingPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const command = "npm i @chella-ui/react";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Background Watermark Silhouette */}
        <div className="hero-watermark">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <path d="M120 10 L50 110 L100 110 L80 190 L150 90 L100 90 Z" />
          </svg>
        </div>

        <div className="hero-content">
          {/* Badge */}
          <Link to="/docs/installation" className="hero-badge">
            <span>⚡ Meet Chella UI v0.1</span>
            <span>→</span>
          </Link>

          {/* Main Headline */}
          <h1 className="hero-headline">
            Chella UI is a component system <br />
            for building products <span className="highlight-box">with speed</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Accessible React components for building high-quality web apps and design systems.{" "}
            <strong>Works with Next.js RSC & Zero CSS imports</strong>
          </p>

          {/* Action Row */}
          <div className="hero-actions">
            <Button asChild size="lg" variant="primary">
              <Link to="/docs/installation" className="btn-start-building">
                Start Building
              </Link>
            </Button>

            <button type="button" className="command-pill" onClick={handleCopy}>
              <span className="command-prompt">&gt;_</span>
              <span className="command-text">{command}</span>
              <span className="command-copy-status">{copied ? "✓ Copied" : "Copy"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Showcase Cards */}
      <section className="showcase-section">
        <InteractiveShowcase />
      </section>

      {/* Feature Value Props Section */}
      <section className="features-section">
        <h2 className="features-title">Why Chella UI?</h2>
        <p className="features-subtitle">
          Designed from the ground up for developer velocity, accessibility, and zero-friction ownership.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3 className="feature-heading">Zero CSS Imports Required</h3>
            <p className="feature-desc">
              Inspired by Ant Design v5, components own their styling and automatically inject scoped CSS
              into <code>document.head</code>. Just import and build.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">♿</div>
            <h3 className="feature-heading">100% WAI-ARIA Accessible</h3>
            <p className="feature-desc">
              Full keyboard navigation, focus-visible rings, screen reader announcements, and automated
              axe compliance built into every component.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-heading">Zero-Runtime Token Cascade</h3>
            <p className="feature-desc">
              Switch themes and dark mode in &lt;1ms with 0 React tree re-renders using CSS custom
              properties with automatic SSR anti-flicker protection.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧩</div>
            <h3 className="feature-heading">Polymorphic Composition</h3>
            <p className="feature-desc">
              Radix-inspired <code>asChild</code> Slot pattern guarantees clean element composition
              without brittle TypeScript <code>as</code> prop generic explosions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
