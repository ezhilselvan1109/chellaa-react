import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { SearchModal } from "./components/SearchModal";
import { IntroductionPage } from "./pages/IntroductionPage";
import { InstallationPage } from "./pages/InstallationPage";
import { ThemingPage } from "./pages/ThemingPage";
import { TokensPage } from "./pages/TokensPage";
import { ButtonDocPage } from "./pages/components/ButtonDocPage";
import { SpinnerDocPage } from "./pages/components/SpinnerDocPage";

export const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    <BrowserRouter>
      <div className="docs-layout">
        <Header onOpenSearch={() => setIsSearchOpen(true)} />
        <div className="docs-main-container">
          <Sidebar />
          <Routes>
            <Route path="/" element={<IntroductionPage />} />
            <Route path="/docs/installation" element={<InstallationPage />} />
            <Route path="/docs/theming" element={<ThemingPage />} />
            <Route path="/docs/tokens" element={<TokensPage />} />
            <Route path="/docs/components/button" element={<ButtonDocPage />} />
            <Route path="/docs/components/spinner" element={<SpinnerDocPage />} />
          </Routes>
        </div>
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    </BrowserRouter>
  );
};
