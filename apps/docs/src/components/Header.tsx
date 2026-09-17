import React from "react";
import { Link } from "react-router-dom";
import { useTheme, Button } from "@chella-ui/react";

export interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <header className="docs-header">
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <Link to="/" className="docs-logo">
          <div className="docs-logo-mark">C</div>
          <span>Chella UI</span>
        </Link>
      </div>

      <div className="docs-header-actions">
        <button
          type="button"
          className="docs-search-trigger"
          onClick={onOpenSearch}
          aria-label="Search documentation"
        >
          <span>Search docs...</span>
          <kbd className="docs-search-kbd">Ctrl K</kbd>
        </button>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {resolvedTheme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <a
            href="https://github.com/ezhilselvan1109/chellaa-react"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </Button>
      </div>
    </header>
  );
};
