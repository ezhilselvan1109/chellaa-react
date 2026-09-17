import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnnouncementBanner } from "./components/AnnouncementBanner";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { SearchModal } from "./components/SearchModal";
import { LandingPage } from "./pages/LandingPage";
import { InstallationPage } from "./pages/InstallationPage";
import { ThemingPage } from "./pages/ThemingPage";
import { TokensPage } from "./pages/TokensPage";
import { ButtonDocPage } from "./pages/components/ButtonDocPage";
import { SpinnerDocPage } from "./pages/components/SpinnerDocPage";

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
            <Route path="/docs/installation" element={<InstallationPage />} />
            <Route path="/docs/theming" element={<ThemingPage />} />
            <Route path="/docs/tokens" element={<TokensPage />} />
            <Route path="/docs/components/button" element={<ButtonDocPage />} />
            <Route path="/docs/components/spinner" element={<SpinnerDocPage />} />
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
