import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Chellaa React — Automated No-Decorative-Emoji Checker
 *
 * Enforces the permanent repository-wide Decorative Emoji Policy established in AGENTS.md.
 * Prohibits decorative Unicode emoji characters in product UI, stories, maintained documentation,
 * examples, marketing copy, and notifications.
 *
 * Preserves:
 * - Meaningful mathematical symbols (±, ×, ≤, ≥, √, ∞)
 * - Ordinary Unicode typography (©, ®, ™, —, ↗, →, ★, ⋮, ✕)
 * - Language characters (Tamil, accents, CJK)
 * - Legitimate SVG assets and icon-library components
 */

const LEGITIMATE_TYPOGRAPHIC_SYMBOLS = new Set([
  "\u00A9", // © copyright
  "\u00AE", // ® registered
  "\u2122", // ™ trademark
  "\u2197", // ↗ north-east arrow (external link)
  "\u2196", // ↖
  "\u2198", // ↘
  "\u2199", // ↙
  "\u2192", // → right arrow
  "\u2190", // ← left arrow
  "\u2191", // ↑ up arrow
  "\u2193", // ↓ down arrow
  "\u2605", // ★ black star
  "\u2606", // ☆ white star
  "\u2715", // ✕ multiplication x / close button
  "\u2713", // ✓ checkmark (text mode)
  "\u2022", // • bullet
  "\u22EE", // ⋮ vertical ellipsis (menu)
  "\u2026", // … horizontal ellipsis
  "\u2014", // — em dash
  "\u2013", // – en dash
]);

/**
 * Checks whether a character at the current index is a prohibited decorative emoji.
 */
export function isDecorativeEmoji(char, nextChar) {
  const hasEmojiVariation = nextChar === "\uFE0F";
  // If character is a legitimate typographic symbol and does not use explicit emoji variation selector
  if (LEGITIMATE_TYPOGRAPHIC_SYMBOLS.has(char) && !hasEmojiVariation) {
    return false;
  }
  // Check if character has Unicode Extended_Pictographic or Emoji_Presentation property
  return /(?:\p{Extended_Pictographic}|\p{Emoji_Presentation})/u.test(char);
}

/**
 * Finds all prohibited decorative emoji occurrences within a line of text.
 */
export function findEmojisInLine(text) {
  const matches = [];
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    const next = chars[i + 1];
    if (isDecorativeEmoji(c, next)) {
      matches.push({
        char: c + (next === "\uFE0F" ? "\uFE0F" : ""),
        index: i,
      });
    }
  }
  return matches;
}

const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  ".turbo",
  "dist",
  "build",
  ".next",
  "storybook-static",
  ".system_generated",
]);

const IGNORE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".ico",
  ".webp",
  ".svg",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".lock",
  ".log",
]);

/**
 * Narrowly justified exceptions:
 * Only files explicitly designed to test or demonstrate input validation of emojis.
 */
const DOCUMENTED_EXCLUSIONS = new Set([
  "scripts/check-no-emojis.test.mjs",
  "scripts/check-no-emojis.mjs",
]);

function scanDirectory(dir) {
  let fileList = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fileList = fileList.concat(scanDirectory(fullPath));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (!IGNORE_EXTENSIONS.has(ext) && entry.name !== "pnpm-lock.yaml") {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

export function runEmojiCheck(rootDir = ".") {
  console.log("=================================================");
  console.log("CHELLAA REACT — AUTOMATED NO-DECORATIVE-EMOJI CHECK");
  console.log("=================================================");

  const allFiles = scanDirectory(rootDir);
  const violations = [];

  for (const filePath of allFiles) {
    const relativePath = path.relative(rootDir, filePath).replace(/\\/g, "/");
    if (DOCUMENTED_EXCLUSIONS.has(relativePath)) {
      continue;
    }

    let fileContent;
    try {
      fileContent = fs.readFileSync(filePath, "utf8");
    } catch {
      continue;
    }

    const lines = fileContent.split(/\r?\n/);
    lines.forEach((lineText, lineIndex) => {
      const emojiMatches = findEmojisInLine(lineText);
      if (emojiMatches.length > 0) {
        for (const match of emojiMatches) {
          violations.push({
            file: relativePath,
            line: lineIndex + 1,
            char: match.char,
            text: lineText.trim(),
          });
        }
      }
    });
  }

  if (violations.length > 0) {
    console.error(`\n[FAILED] Found ${violations.length} prohibited decorative emoji character(s):\n`);
    for (const v of violations) {
      console.error(`  - ${v.file}:${v.line} [${v.char}] ${v.text}`);
    }
    console.error("\nDecorative Emoji Policy Violation: Remove or replace with SVG icons or semantic text.");
    console.error("See AGENTS.md for policy guidelines and allowable exemptions.\n");
    return { success: false, violations };
  }

  console.log(`\n[SUCCESS] Scanned ${allFiles.length} files. Zero decorative emoji violations found.`);
  console.log("All UI components, stories, maintained documentation, and scripts conform to policy.\n");
  return { success: true, violations: [] };
}

// When executed directly from CLI
const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
if (isDirectRun || process.argv[1]?.endsWith("check-no-emojis.mjs")) {
  const result = runEmojiCheck(".");
  if (!result.success) {
    process.exit(1);
  }
}
