import type { Preview } from "@storybook/react";
import "@chellaa/react/styles.css";

const preview: Preview = {
  parameters: {
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
