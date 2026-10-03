import * as React from "react";
import { ThemeProvider } from "@chellaa/react";
import { DocsLayout } from "./components/DocsLayout/DocsLayout";
import { TocItem } from "./components/DocsLayout/TableOfContents";
import { OverviewPage } from "./content/getting-started/OverviewPage";
import { InstallationPage } from "./content/getting-started/InstallationPage";
import { QuickStartPage } from "./content/getting-started/QuickStartPage";
import { TokensPage } from "./content/foundations/TokensPage";
import { ColorsPage } from "./content/foundations/ColorsPage";
import { ThemingPage } from "./content/theming/ThemingPage";
import { ButtonDocPage, buttonToc } from "./content/components/ButtonDocPage";
import {
  ButtonGroupDocPage,
  buttonGroupToc,
} from "./content/components/ButtonGroupDocPage";
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

const overviewToc: TocItem[] = [
  { id: "pillars", title: "Architectural Pillars" },
  { id: "frameworks", title: "Framework Support" },
];

const installationToc: TocItem[] = [
  { id: "package-install", title: "Package Installation" },
  { id: "peer-dependencies", title: "Peer Dependencies" },
  { id: "zero-config", title: "Zero-Config Delivery" },
];

const tokensToc: TocItem[] = [
  { id: "token-tiers", title: "3 Token Tiers" },
  { id: "overrides", title: "Overriding in CSS" },
];

const themingToc: TocItem[] = [
  { id: "use-theme", title: "Using useTheme" },
  { id: "theme-script", title: "Preventing SSR FOUC" },
];

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

  const { content, toc } = React.useMemo(() => {
    switch (currentPath) {
      case "#/overview":
        return { content: <OverviewPage />, toc: overviewToc };
      case "#/installation":
        return { content: <InstallationPage />, toc: installationToc };
      case "#/quick-start":
        return { content: <QuickStartPage />, toc: [] };
      case "#/tokens":
        return { content: <TokensPage />, toc: tokensToc };
      case "#/colors":
        return { content: <ColorsPage />, toc: [] };
      case "#/theming":
        return { content: <ThemingPage />, toc: themingToc };
      case "#/components/button":
        return { content: <ButtonDocPage />, toc: buttonToc };
      case "#/components/button-group":
        return { content: <ButtonGroupDocPage />, toc: buttonGroupToc };
      case "#/guides/as-child":
        return { content: <SlotCompositionPage />, toc: [] };
      case "#/guides/accessibility":
        return { content: <AccessibilityGuidePage />, toc: [] };
      case "#/changelog":
        return { content: <ChangelogPage />, toc: [] };
      default:
        return { content: <ButtonDocPage />, toc: buttonToc };
    }
  }, [currentPath]);

  return (
    <ThemeProvider defaultTheme="light">
      <DocsLayout
        currentPath={currentPath}
        tocItems={toc}
        onNavigate={(path) => {
          setCurrentPath(path);
          window.location.hash = path.replace("#", "");
        }}
      >
        {content}
      </DocsLayout>
    </ThemeProvider>
  );
}
