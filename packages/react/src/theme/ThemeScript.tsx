export interface ThemeScriptProps {
  storageKey?: string;
  defaultTheme?: string;
  attribute?: string;
  nonce?: string;
}

/**
 * Inline synchronous script that prevents theme flash (FOUC) during SSR page load.
 * Place inside the `<head>` of your application layout.
 */
export function ThemeScript({
  storageKey = "chellaa-theme",
  defaultTheme = "system",
  attribute = "data-theme",
  nonce,
}: ThemeScriptProps) {
  const scriptContent = `(function() {
  try {
    var key = '${storageKey}';
    var def = '${defaultTheme}';
    var attr = '${attribute}';
    var stored = localStorage.getItem(key);
    var theme = stored || def;
    var resolved = theme;
    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute(attr, resolved);
  } catch (e) {}
})();`;

  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: scriptContent }}
      suppressHydrationWarning
    />
  );
}
