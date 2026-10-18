import type { Preview, Decorator } from "@storybook/react";
import { ThemeProvider } from "@chellaa/react";
import "@chellaa/react/styles.css";

/**
 * Global ThemeProvider decorator — wraps every story in Storybook with the
 * Chellaa React theme context. This ensures Emotion `styled()` components
 * receive a valid `theme` object (palette, shadows, spacing, transitions)
 * and dark/light switching works across the whole story canvas.
 *
 * Stories that need a different mode (e.g. dark) should render their own
 * inner ThemeProvider with `defaultTheme="dark"` around just their content.
 */
const withThemeProvider: Decorator = (Story, context) => {
  const theme = context.globals?.theme ?? "light";
  return (
    <ThemeProvider defaultTheme={theme as "light" | "dark"}>
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global color mode for all components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [withThemeProvider],

  parameters: {
    options: {
      storySort: {
        order: [
          "Introduction",
          ["Welcome", "Getting Started"],
          "Foundations",
          [
            "Design Tokens Overview",
            "Colors & Semantic Tokens",
            "Typography Scale",
            "Spacing & Layout Tokens",
            "Radius, Shadows & Motion",
            "Theming & Dark Mode",
          ],
          "Components",
          [
            "Actions",
            "Forms & Inputs",
            "Data Display",
            "Navigation",
            "Overlays",
            "Feedback",
            "Layout",
            "Utilities",
          ],
          "Patterns & Recipes",
          [
            "Form Validation",
            "Confirmation Workflows",
            "Search and Selection",
            "Data Table Workflows",
            "Notifications & Feedback",
          ],
          "Accessibility & Contribution",
          [
            "Keyboard Navigation Matrix",
            "ARIA & Focus Standards",
            "Testing & Contributing Guide",
          ],
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#090d16" },
      ],
    },
  },
};

export default preview;
