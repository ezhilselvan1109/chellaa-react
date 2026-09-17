import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnnouncementBanner } from "./components/AnnouncementBanner";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { SearchModal } from "./components/SearchModal";
import { LandingPage } from "./pages/LandingPage";
import { DocsOverviewPage } from "./pages/DocsOverviewPage";
import { ComponentsCatalogPage } from "./pages/ComponentsCatalogPage";
import { InstallationPage } from "./pages/InstallationPage";
import { ThemingPage } from "./pages/ThemingPage";
import { TokensPage } from "./pages/TokensPage";
import { ButtonDocPage } from "./pages/components/ButtonDocPage";
import { FloatButtonDocPage } from "./pages/components/FloatButtonDocPage";
import { BadgeDocPage } from "./pages/components/BadgeDocPage";
import { InputDocPage } from "./pages/components/InputDocPage";
import { SpinnerDocPage } from "./pages/components/SpinnerDocPage";
import { DividerDocPage } from "./pages/components/DividerDocPage";
import { FlexDocPage } from "./pages/components/FlexDocPage";

const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="docs-layout">
      <AnnouncementBanner />
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {isLanding ? (
        <LandingPage />
      ) : (
        <div className="docs-main-container">
          <Sidebar />
          <Routes>
            <Route path="/docs" element={<DocsOverviewPage />} />
            <Route path="/docs/installation" element={<InstallationPage />} />
            <Route path="/docs/theming" element={<ThemingPage />} />
            <Route path="/docs/tokens" element={<TokensPage />} />
            <Route path="/docs/components" element={<ComponentsCatalogPage />} />
            <Route path="/docs/components/button" element={<ButtonDocPage />} />
            <Route path="/docs/components/float-button" element={<FloatButtonDocPage />} />
            <Route path="/docs/components/badge" element={<BadgeDocPage />} />
            <Route path="/docs/components/input" element={<InputDocPage />} />
            <Route path="/docs/components/spinner" element={<SpinnerDocPage />} />
            <Route path="/docs/components/divider" element={<DividerDocPage />} />
            <Route path="/docs/components/flex" element={<FlexDocPage />} />
          </Routes>
        </div>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};
