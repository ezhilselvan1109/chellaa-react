import * as React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { SearchModal } from "../../search/SearchModal";
import "./DocsLayout.css";

interface DocsLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export function DocsLayout({
  currentPath,
  onNavigate,
  children,
}: DocsLayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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

  return (
    <div className="docs-shell">
      {/* Skip to Content Link for Keyboard / Screen Readers */}
      <a href="#docs-main-content" className="docs-skip-link">
        Skip to main content
      </a>

      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div className="docs-main-container">
        <Sidebar currentPath={currentPath} />

        <main
          id="docs-main-content"
          className="docs-content-area"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={(path: string) => {
          onNavigate(path);
          window.location.hash = path.replace("#", "");
        }}
      />

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPath={currentPath}
      />
    </div>
  );
}
