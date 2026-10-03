import { Button, useTheme } from "@chellaa/react";

interface HeaderProps {
  onOpenSearch: () => void;
  onToggleMobileMenu: () => void;
}

export function Header({ onOpenSearch, onToggleMobileMenu }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="docs-header" role="banner">
      <div className="docs-header-left">
        <button
          type="button"
          className="docs-mobile-menu-btn"
          onClick={onToggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
        <a href="#/overview" className="docs-logo">
          <svg
            width="26"
            height="26"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ borderRadius: "6px" }}
          >
            <rect width="32" height="32" rx="8" fill="url(#brand-grad)" />
            <path
              d="M10 16L14 20L22 12"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="brand-grad"
                x1="0"
                y1="0"
                x2="32"
                y2="32"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2563eb" />
                <stop offset="1" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
          <span className="docs-logo-brand">Chellaa</span>
          <span className="docs-logo-react">React</span>
          <span className="docs-version-tag">v0.1.0</span>
        </a>
      </div>

      <div className="docs-header-center">
        <button
          type="button"
          className="docs-search-trigger"
          onClick={onOpenSearch}
          aria-label="Search documentation (Press Cmd+K or Ctrl+K)"
        >
          <span aria-hidden="true" style={{ fontSize: "0.95rem" }}>
            🔍
          </span>
          <span className="docs-search-trigger-text">
            Search components, tokens, guides...
          </span>
          <kbd className="docs-search-trigger-kbd">⌘K</kbd>
        </button>
      </div>

      <div className="docs-header-right">
        <a
          href="http://localhost:6006"
          target="_blank"
          rel="noreferrer"
          className="docs-icon-btn"
          title="Open Storybook Lab"
          aria-label="Storybook"
        >
          <span role="img" aria-label="Storybook">
            📕
          </span>
        </a>

        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="docs-icon-btn"
          title="Open Application Playground"
          aria-label="Playground"
        >
          <span role="img" aria-label="Playground">
            ⚡
          </span>
        </a>

        <Button
          size="sm"
          variant="outline"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </Button>
      </div>
    </header>
  );
}
