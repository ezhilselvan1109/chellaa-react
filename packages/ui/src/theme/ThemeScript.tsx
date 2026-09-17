import React from "react";

export interface ThemeScriptProps {
  storageKey?: string;
  defaultTheme?: string;
  attribute?: string;
}

/**
 * Inline script to run before React hydrates to prevent theme flash (FOUC) in SSR applications.
 */
export const ThemeScript: React.FC<ThemeScriptProps> = ({
  storageKey = "chella-theme",
  defaultTheme = "system",
  attribute = "data-theme",
}) => {
  const scriptContent = `
    (function() {
      try {
        var key = "${storageKey}";
        var def = "${defaultTheme}";
        var attr = "${attribute}";
        var stored = localStorage.getItem(key);
        var theme = stored || def;
        var resolved = theme;
        if (theme === 'system') {
          resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute(attr, resolved);
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
};
