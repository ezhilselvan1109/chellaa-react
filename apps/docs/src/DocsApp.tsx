import * as React from "react";
import { ThemeProvider } from "@chellaa/react";
import { DocsLayout } from "./components/DocsLayout/DocsLayout";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { TocItem } from "./components/DocsLayout/TableOfContents";

// Content Pages
import { OverviewPage } from "./content/getting-started/OverviewPage";
import { InstallationPage } from "./content/getting-started/InstallationPage";
import { QuickStartPage } from "./content/getting-started/QuickStartPage";
import { TokensPage } from "./content/foundations/TokensPage";
import { ColorsPage } from "./content/foundations/ColorsPage";
import { ThemingPage } from "./content/theming/ThemingPage";
import { SlotCompositionPage } from "./content/guides/SlotCompositionPage";
import { AccessibilityGuidePage } from "./content/guides/AccessibilityGuidePage";
import { ChangelogPage } from "./content/resources/ChangelogPage";

// 1. Form Controls Pages
import { ButtonDocPage, buttonToc } from "./content/components/ButtonDocPage";
import { ButtonGroupDocPage, buttonGroupToc } from "./content/components/ButtonGroupDocPage";
import { InputDocPage, inputToc } from "./content/components/InputDocPage";
import { TextareaDocPage, textareaToc } from "./content/components/TextareaDocPage";
import { FormFieldDocPage, formFieldToc } from "./content/components/FormFieldDocPage";
import { CheckboxDocPage, checkboxToc } from "./content/components/CheckboxDocPage";
import { RadioDocPage, radioToc } from "./content/components/RadioDocPage";
import { SwitchDocPage, switchToc } from "./content/components/SwitchDocPage";

// 2. Surfaces & Data Display Pages
import { PaperDocPage, paperToc } from "./content/components/PaperDocPage";
import { CardDocPage, cardToc } from "./content/components/CardDocPage";
import { TypographyDocPage, typographyToc } from "./content/components/TypographyDocPage";
import { KbdDocPage, kbdToc } from "./content/components/KbdDocPage";

// 3. Layout Primitives Pages
import { BoxDocPage, boxToc } from "./content/components/BoxDocPage";
import { ContainerDocPage, containerToc } from "./content/components/ContainerDocPage";
import { DividerDocPage, dividerToc } from "./content/components/DividerDocPage";
import { StackDocPage, stackToc } from "./content/components/StackDocPage";
import { FlexDocPage, flexToc } from "./content/components/FlexDocPage";
import { GridDocPage, gridToc } from "./content/components/GridDocPage";

const titleMap: Record<string, string> = {
  "/": "Chellaa React — Production Component Library",
  "/overview": "Overview — Chellaa React",
  "/installation": "Installation — Chellaa React",
  "/quick-start": "Quick Start — Chellaa React",
  "/tokens": "Design Tokens — Chellaa React",
  "/colors": "Colors & Palettes — Chellaa React",
  "/theming": "Theming & Dark Mode — Chellaa React",
  // Form Controls
  "/components/button": "Button Component — Chellaa React",
  "/components/button-group": "ButtonGroup Component — Chellaa React",
  "/components/input": "Input & TextField Component — Chellaa React",
  "/components/textarea": "Textarea Component — Chellaa React",
  "/components/form-field": "FormField Component — Chellaa React",
  "/components/checkbox": "Checkbox Component — Chellaa React",
  "/components/radio": "Radio Component — Chellaa React",
  "/components/switch": "Switch Component — Chellaa React",
  // Surfaces
  "/components/paper": "Paper Surface — Chellaa React",
  "/components/card": "Card Component — Chellaa React",
  "/components/typography": "Typography Component — Chellaa React",
  "/components/kbd": "Kbd Component — Chellaa React",
  // Layouts
  "/components/box": "Box Component — Chellaa React",
  "/components/container": "Container Component — Chellaa React",
  "/components/divider": "Divider Component — Chellaa React",
  "/components/stack": "Stack Component — Chellaa React",
  "/components/flex": "Flex Component — Chellaa React",
  "/components/grid": "Grid Component — Chellaa React",
  // Guides & Resources
  "/guides/as-child": "Polymorphism (asChild) — Chellaa React",
  "/guides/accessibility": "Accessibility Standards — Chellaa React",
  "/changelog": "Changelog & Releases — Chellaa React",
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
    // Gracefully migrate legacy hash routes (e.g. /#/components/button -> /components/button)
    if (typeof window !== "undefined" && window.location.hash.startsWith("#/")) {
      const migrated = window.location.hash.slice(1);
      window.history.replaceState(null, "", migrated);
      return migrated;
    }
    return (typeof window !== "undefined" ? window.location.pathname : "/") || "/";
  });

  const handleNavigate = React.useCallback((path: string) => {
    if (typeof window !== "undefined" && window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
    setCurrentPath(path);
  }, []);

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  React.useEffect(() => {
    const title = titleMap[currentPath] || "Chellaa React Documentation";
    document.title = title;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPath]);

  const isLandingPage =
    currentPath === "/" || currentPath === "" || currentPath === "#/";

  const { content, toc } = React.useMemo(() => {
    switch (currentPath) {
      case "/overview":
        return { content: <OverviewPage />, toc: overviewToc };
      case "/installation":
        return { content: <InstallationPage />, toc: installationToc };
      case "/quick-start":
        return { content: <QuickStartPage />, toc: [] };
      case "/tokens":
        return { content: <TokensPage />, toc: tokensToc };
      case "/colors":
        return { content: <ColorsPage />, toc: [] };
      case "/theming":
        return { content: <ThemingPage />, toc: themingToc };

      // 1. Form Controls
      case "/components/button":
        return { content: <ButtonDocPage />, toc: buttonToc };
      case "/components/button-group":
        return { content: <ButtonGroupDocPage />, toc: buttonGroupToc };
      case "/components/input":
        return { content: <InputDocPage />, toc: inputToc };
      case "/components/textarea":
        return { content: <TextareaDocPage />, toc: textareaToc };
      case "/components/form-field":
        return { content: <FormFieldDocPage />, toc: formFieldToc };
      case "/components/checkbox":
        return { content: <CheckboxDocPage />, toc: checkboxToc };
      case "/components/radio":
        return { content: <RadioDocPage />, toc: radioToc };
      case "/components/switch":
        return { content: <SwitchDocPage />, toc: switchToc };

      // 2. Surfaces & Data Display
      case "/components/paper":
        return { content: <PaperDocPage />, toc: paperToc };
      case "/components/card":
        return { content: <CardDocPage />, toc: cardToc };
      case "/components/typography":
        return { content: <TypographyDocPage />, toc: typographyToc };
      case "/components/kbd":
        return { content: <KbdDocPage />, toc: kbdToc };

      // 3. Layout Primitives
      case "/components/box":
        return { content: <BoxDocPage />, toc: boxToc };
      case "/components/container":
        return { content: <ContainerDocPage />, toc: containerToc };
      case "/components/divider":
        return { content: <DividerDocPage />, toc: dividerToc };
      case "/components/stack":
        return { content: <StackDocPage />, toc: stackToc };
      case "/components/flex":
        return { content: <FlexDocPage />, toc: flexToc };
      case "/components/grid":
        return { content: <GridDocPage />, toc: gridToc };

      // Guides & Resources
      case "/guides/as-child":
        return { content: <SlotCompositionPage />, toc: [] };
      case "/guides/accessibility":
        return { content: <AccessibilityGuidePage />, toc: [] };
      case "/changelog":
        return { content: <ChangelogPage />, toc: [] };
      default:
        return { content: <OverviewPage />, toc: overviewToc };
    }
  }, [currentPath]);

  return (
    <ThemeProvider defaultTheme="light">
      {isLandingPage ? (
        <LandingPage onNavigate={handleNavigate} />
      ) : (
        <DocsLayout
          currentPath={currentPath}
          tocItems={toc}
          onNavigate={handleNavigate}
        >
          {content}
        </DocsLayout>
      )}
    </ThemeProvider>
  );
}
