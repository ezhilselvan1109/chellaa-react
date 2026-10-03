import * as React from "react";
import { ThemeProvider } from "@chellaa/react";
import { DocsLayout } from "./components/DocsLayout/DocsLayout";
import { OverviewPage } from "./content/getting-started/OverviewPage";
import { InstallationPage } from "./content/getting-started/InstallationPage";
import { QuickStartPage } from "./content/getting-started/QuickStartPage";
import { TokensPage } from "./content/foundations/TokensPage";
import { ColorsPage } from "./content/foundations/ColorsPage";
import { ThemingPage } from "./content/theming/ThemingPage";
import { ButtonDocPage } from "./content/components/ButtonDocPage";
import { ButtonGroupDocPage } from "./content/components/ButtonGroupDocPage";
import { SlotCompositionPage } from "./content/guides/SlotCompositionPage";
import { AccessibilityGuidePage } from "./content/guides/AccessibilityGuidePage";
import { ChangelogPage } from "./content/resources/ChangelogPage";

const titleMap: Record<string, string> = {
  "#/overview": "Overview — Chellaa React",
  "#/installation": "Installation — Chellaa React",
  "#/quick-start": "Quick Start — Chellaa React",
  "#/tokens": "Design Tokens — Chellaa React",
  "#/colors": "Colors & Palettes — Chellaa React",
  "#/theming": "Theming & Dark Mode — Chellaa React",
  "#/components/button": "Button Component — Chellaa React",
  "#/components/button-group": "ButtonGroup Component — Chellaa React",
  "#/guides/as-child": "Polymorphism (asChild) — Chellaa React",
  "#/guides/accessibility": "Accessibility Standards — Chellaa React",
  "#/changelog": "Changelog & Releases — Chellaa React",
};

export function DocsApp() {
  const [currentPath, setCurrentPath] = React.useState<string>(() => {
    return window.location.hash || "#/components/button";
  });

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || "#/components/button");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  React.useEffect(() => {
    const title = titleMap[currentPath] || "Chellaa React Documentation";
    document.title = title;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPath]);

  const renderContent = () => {
    switch (currentPath) {
      case "#/overview":
        return <OverviewPage />;
      case "#/installation":
        return <InstallationPage />;
      case "#/quick-start":
        return <QuickStartPage />;
      case "#/tokens":
        return <TokensPage />;
      case "#/colors":
        return <ColorsPage />;
      case "#/theming":
        return <ThemingPage />;
      case "#/components/button":
        return <ButtonDocPage />;
      case "#/components/button-group":
        return <ButtonGroupDocPage />;
      case "#/guides/as-child":
        return <SlotCompositionPage />;
      case "#/guides/accessibility":
        return <AccessibilityGuidePage />;
      case "#/changelog":
        return <ChangelogPage />;
      default:
        return <ButtonDocPage />;
    }
  };

  return (
    <ThemeProvider defaultTheme="light">
      <DocsLayout
        currentPath={currentPath}
        onNavigate={(path) => {
          setCurrentPath(path);
          window.location.hash = path.replace("#", "");
        }}
      >
        {renderContent()}
      </DocsLayout>
    </ThemeProvider>
  );
}
