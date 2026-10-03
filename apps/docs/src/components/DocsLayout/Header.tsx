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
          <span className="docs-search-trigger-icon">🔍</span>
          <span className="docs-search-trigger-text">
            Search documentation...
          </span>
          <kbd className="docs-search-trigger-kbd">⌘K</kbd>
        </button>
      </div>

      <div className="docs-header-right">
        <Button
          size="sm"
          variant="outline"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </Button>
        <Button asChild size="sm" variant="ghost">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            title="Open Application Playground"
          >
            Playground ↗
          </a>
        </Button>
      </div>
    </header>
  );
}
