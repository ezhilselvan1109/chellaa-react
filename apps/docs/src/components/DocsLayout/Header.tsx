import { Button, useTheme } from "@chellaa/react";
import {
  FiMenu,
  FiSearch,
  FiBookOpen,
  FiPlay,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";

interface HeaderProps {
  currentPath?: string | undefined;
  onOpenSearch: () => void;
  onToggleMobileMenu: () => void;
}

export function Header({
  currentPath = "",
  onOpenSearch,
  onToggleMobileMenu,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isHome =
    currentPath === "#/" || currentPath === "" || currentPath === "#";
  const isDocs =
    currentPath.startsWith("#/overview") ||
    currentPath.startsWith("#/installation") ||
    currentPath.startsWith("#/quick-start");
  const isComponents = currentPath.startsWith("#/components");
  const isFoundations =
    currentPath.startsWith("#/tokens") ||
    currentPath.startsWith("#/colors") ||
    currentPath.startsWith("#/theming");

  return (
    <header className="docs-header" role="banner">
      <div className="docs-header-left">
        <button
          type="button"
          className="docs-mobile-menu-btn"
          onClick={onToggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <FiMenu size={18} />
        </button>
        <a href="#/" className="docs-logo">
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 2px 8px rgba(37, 99, 235, 0.3)",
              flexShrink: 0,
            }}
          >
            <LuSparkles size={16} />
          </div>
          <span className="docs-logo-brand">Chellaa</span>
          <span className="docs-logo-react">React</span>
          <span className="docs-version-tag">v0.1.0</span>
        </a>

        {/* Primary Navigation Links */}
        <nav className="docs-top-nav" aria-label="Main Navigation">
          <a
            href="#/"
            className={`docs-top-nav-link ${isHome ? "active" : ""}`}
          >
            Home
          </a>
          <a
            href="#/overview"
            className={`docs-top-nav-link ${isDocs ? "active" : ""}`}
          >
            Docs
          </a>
          <a
            href="#/components/button"
            className={`docs-top-nav-link ${isComponents ? "active" : ""}`}
          >
            Components
          </a>
          <a
            href="#/tokens"
            className={`docs-top-nav-link ${isFoundations ? "active" : ""}`}
          >
            Tokens
          </a>
        </nav>
      </div>

      <div className="docs-header-center">
        <button
          type="button"
          className="docs-search-trigger"
          onClick={onOpenSearch}
          aria-label="Search documentation (Press Cmd+K or Ctrl+K)"
        >
          <FiSearch
            size={16}
            aria-hidden="true"
            style={{ color: "var(--docs-text-dim)" }}
          />
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
          <FiBookOpen size={16} />
        </a>

        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="docs-icon-btn"
          title="Open Application Playground"
          aria-label="Playground"
        >
          <FiPlay size={15} />
        </a>

        <Button
          size="sm"
          variant="outline"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          {theme === "dark" ? <FiSun size={15} /> : <FiMoon size={15} />}
          <span>{theme === "dark" ? "Light" : "Dark"}</span>
        </Button>
      </div>
    </header>
  );
}
