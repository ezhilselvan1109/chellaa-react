import * as React from "react";
import { ThemeProvider } from "@chellaa/react";
import { DocsLayout } from "./components/DocsLayout/DocsLayout";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
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

// 1. Actions
import { ButtonDocPage, buttonToc } from "./content/components/ButtonDocPage";
import { ButtonGroupDocPage, buttonGroupToc } from "./content/components/ButtonGroupDocPage";

// 2. Forms & Inputs
import { InputDocPage, inputToc } from "./content/components/InputDocPage";
import { TextareaDocPage, textareaToc } from "./content/components/TextareaDocPage";
import { FormFieldDocPage, formFieldToc } from "./content/components/FormFieldDocPage";
import { CheckboxDocPage, checkboxToc } from "./content/components/CheckboxDocPage";
import { RadioDocPage, radioToc } from "./content/components/RadioDocPage";
import { SwitchDocPage, switchToc } from "./content/components/SwitchDocPage";
import { SelectDocPage, selectToc } from "./content/components/SelectDocPage";
import { ComboboxDocPage, comboboxToc } from "./content/components/ComboboxDocPage";

// 3. Navigation
import { AccordionDocPage, accordionToc } from "./content/components/AccordionDocPage";
import { TabsDocPage, tabsToc } from "./content/components/TabsDocPage";
import { PaginationDocPage, paginationToc } from "./content/components/PaginationDocPage";

// 4. Overlays
import { DialogDocPage, dialogToc } from "./content/components/DialogDocPage";
import { PopoverDocPage, popoverToc } from "./content/components/PopoverDocPage";
import { TooltipDocPage, tooltipToc } from "./content/components/TooltipDocPage";

// 5. Feedback
import { AlertDocPage, alertToc } from "./content/components/AlertDocPage";
import { SnackbarDocPage, snackbarToc } from "./content/components/SnackbarDocPage";
import { TouchRippleDocPage, touchRippleToc } from "./content/components/TouchRippleDocPage";

// 6. Data Display
import { AvatarDocPage, avatarToc } from "./content/components/AvatarDocPage";
import { BadgeDocPage, badgeToc } from "./content/components/BadgeDocPage";
import { CardDocPage, cardToc } from "./content/components/CardDocPage";
import { KbdDocPage, kbdToc } from "./content/components/KbdDocPage";
import { TableDocPage, tableToc } from "./content/components/TableDocPage";
import { TypographyDocPage, typographyToc } from "./content/components/TypographyDocPage";

// 7. Layout Primitives
import { BoxDocPage, boxToc } from "./content/components/BoxDocPage";
import { ContainerDocPage, containerToc } from "./content/components/ContainerDocPage";
import { DividerDocPage, dividerToc } from "./content/components/DividerDocPage";
import { StackDocPage, stackToc } from "./content/components/StackDocPage";
import { FlexDocPage, flexToc } from "./content/components/FlexDocPage";
import { GridDocPage, gridToc } from "./content/components/GridDocPage";
import { PaperDocPage, paperToc } from "./content/components/PaperDocPage";

// 8. Utilities
import { PortalDocPage, portalToc } from "./content/components/PortalDocPage";
import { SlotDocPage, slotToc } from "./content/components/SlotDocPage";

const titleMap: Record<string, string> = {
  "/": "Chellaa React — Production Component Library",
  "/overview": "Overview — Chellaa React",
  "/installation": "Installation — Chellaa React",
  "/quick-start": "Quick Start — Chellaa React",
  "/tokens": "Design Tokens — Chellaa React",
  "/colors": "Colors & Palettes — Chellaa React",
  "/theming": "Theming & Dark Mode — Chellaa React",
  // Actions
  "/components/button": "Button Component — Chellaa React",
  "/components/button-group": "ButtonGroup Component — Chellaa React",
  // Forms & Inputs
  "/components/input": "Input & TextField Component — Chellaa React",
  "/components/textarea": "Textarea Component — Chellaa React",
  "/components/form-field": "FormField Component — Chellaa React",
  "/components/checkbox": "Checkbox Component — Chellaa React",
  "/components/radio": "Radio Component — Chellaa React",
  "/components/switch": "Switch Component — Chellaa React",
  "/components/select": "Select Component — Chellaa React",
  "/components/combobox": "Combobox Component — Chellaa React",
  // Navigation
  "/components/accordion": "Accordion Component — Chellaa React",
  "/components/tabs": "Tabs Component — Chellaa React",
  "/components/pagination": "Pagination Component — Chellaa React",
  // Overlays
  "/components/dialog": "Dialog & Modal Component — Chellaa React",
  "/components/modal": "Dialog & Modal Component — Chellaa React",
  "/components/popover": "Popover Component — Chellaa React",
  "/components/tooltip": "Tooltip Component — Chellaa React",
  // Feedback
  "/components/alert": "Alert Component — Chellaa React",
  "/components/snackbar": "Snackbar & Toast Component — Chellaa React",
  "/components/toast": "Snackbar & Toast Component — Chellaa React",
  "/components/touch-ripple": "TouchRipple Primitive — Chellaa React",
  // Data Display
  "/components/avatar": "Avatar Component — Chellaa React",
  "/components/badge": "Badge Component — Chellaa React",
  "/components/card": "Card Component — Chellaa React",
  "/components/kbd": "Kbd Component — Chellaa React",
  "/components/table": "Table Component — Chellaa React",
  "/components/typography": "Typography Component — Chellaa React",
  // Layouts
  "/components/box": "Box Component — Chellaa React",
  "/components/container": "Container Component — Chellaa React",
  "/components/divider": "Divider Component — Chellaa React",
  "/components/stack": "Stack Component — Chellaa React",
  "/components/flex": "Flex Component — Chellaa React",
  "/components/grid": "Grid Component — Chellaa React",
  "/components/paper": "Paper Surface — Chellaa React",
  // Utilities
  "/components/portal": "Portal Primitive — Chellaa React",
  "/components/slot": "Slot Primitive — Chellaa React",
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
    const title = titleMap[currentPath] || "Page Not Found — Chellaa React";
    document.title = title;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPath]);

  const isLandingPage =
    currentPath === "/" || currentPath === "" || currentPath === "#/";

  const { content, toc } = React.useMemo(() => {
    switch (currentPath) {
      case "/overview":
        return { content: <OverviewPage onNavigate={handleNavigate} />, toc: overviewToc };
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

      // 1. Actions
      case "/components/button":
        return { content: <ButtonDocPage />, toc: buttonToc };
      case "/components/button-group":
        return { content: <ButtonGroupDocPage />, toc: buttonGroupToc };

      // 2. Forms & Inputs
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
      case "/components/select":
        return { content: <SelectDocPage />, toc: selectToc };
      case "/components/combobox":
        return { content: <ComboboxDocPage />, toc: comboboxToc };

      // 3. Navigation
      case "/components/accordion":
        return { content: <AccordionDocPage />, toc: accordionToc };
      case "/components/tabs":
        return { content: <TabsDocPage />, toc: tabsToc };
      case "/components/pagination":
        return { content: <PaginationDocPage />, toc: paginationToc };

      // 4. Overlays
      case "/components/dialog":
      case "/components/modal":
        return { content: <DialogDocPage />, toc: dialogToc };
      case "/components/popover":
        return { content: <PopoverDocPage />, toc: popoverToc };
      case "/components/tooltip":
        return { content: <TooltipDocPage />, toc: tooltipToc };

      // 5. Feedback
      case "/components/alert":
        return { content: <AlertDocPage />, toc: alertToc };
      case "/components/snackbar":
      case "/components/toast":
        return { content: <SnackbarDocPage />, toc: snackbarToc };
      case "/components/touch-ripple":
        return { content: <TouchRippleDocPage />, toc: touchRippleToc };

      // 6. Data Display
      case "/components/avatar":
        return { content: <AvatarDocPage />, toc: avatarToc };
      case "/components/badge":
        return { content: <BadgeDocPage />, toc: badgeToc };
      case "/components/card":
        return { content: <CardDocPage />, toc: cardToc };
      case "/components/kbd":
        return { content: <KbdDocPage />, toc: kbdToc };
      case "/components/table":
        return { content: <TableDocPage />, toc: tableToc };
      case "/components/typography":
        return { content: <TypographyDocPage />, toc: typographyToc };

      // 7. Layout Primitives
      case "/components/paper":
        return { content: <PaperDocPage />, toc: paperToc };
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

      // 8. Utilities
      case "/components/portal":
        return { content: <PortalDocPage />, toc: portalToc };
      case "/components/slot":
        return { content: <SlotDocPage />, toc: slotToc };

      // Guides & Resources
      case "/guides/as-child":
        return { content: <SlotCompositionPage />, toc: [] };
      case "/guides/accessibility":
        return { content: <AccessibilityGuidePage />, toc: [] };
      case "/changelog":
        return { content: <ChangelogPage />, toc: [] };
      default:
        return {
          content: (
            <NotFoundPage
              onNavigate={handleNavigate}
              currentPath={currentPath}
            />
          ),
          toc: [],
        };
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
