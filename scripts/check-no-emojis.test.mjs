import { isDecorativeEmoji, findEmojisInLine } from "./check-no-emojis.mjs";

console.log("=================================================");
console.log("CHELLAA REACT — NO-DECORATIVE-EMOJI TEST SUITE");
console.log("=================================================");

const testCases = [
  // 1. Prohibited Decorative Emojis (Must be detected)
  { label: "Rocket emoji", input: "🚀 Welcome to Chellaa React!", expectCount: 1, expectChar: "🚀" },
  { label: "Party popper emoji", input: "🎉 Build amazing interfaces!", expectCount: 1, expectChar: "🎉" },
  { label: "Sparkles emoji", input: "✨ Powerful components for everyone!", expectCount: 1, expectChar: "✨" },
  { label: "Sun emoji with text", input: "☀️ Light Theme", expectCount: 1, expectChar: "☀️" },
  { label: "Moon emoji with text", input: "🌙 Dark Theme", expectCount: 1, expectChar: "🌙" },
  { label: "Trash can emoji with variation selector", input: "🗑️ Delete item", expectCount: 1, expectChar: "🗑️" },
  { label: "Star emoji", input: "⭐ Star", expectCount: 1, expectChar: "⭐" },
  { label: "Fruit emojis", input: "Apple 🍎 Banana 🍌", expectCount: 2 },
  { label: "Search icon emoji", input: "🔍 Search input", expectCount: 1, expectChar: "🔍" },
  { label: "Status check emoji", input: "✅ Profile updated", expectCount: 1, expectChar: "✅" },
  { label: "Status cross emoji", input: "❌ Error occurred", expectCount: 1, expectChar: "❌" },
  { label: "Status green circle emoji", input: "🟢 Complete & Enforced", expectCount: 1, expectChar: "🟢" },
  { label: "Palette & accessibility emojis", input: "🎨 ♿ 🧩 Design tokens", expectCount: 3 },
  { label: "Lightning emoji", input: "avatar={<span>⚡</span>}", expectCount: 1, expectChar: "⚡" },

  // 2. Legitimate Unicode & Ordinary Typography (Must NOT be flagged)
  { label: "Copyright sign", input: "MIT © Ezhil Selvan P", expectCount: 0 },
  { label: "Registered and trademark signs", input: "Chellaa React ® — Component Library ™", expectCount: 0 },
  { label: "External link arrow", input: "GitHub ↗ (external link)", expectCount: 0 },
  { label: "Right arrow navigation", input: "Next Step →", expectCount: 0 },
  { label: "Left arrow navigation", input: "← Previous Step", expectCount: 0 },
  { label: "Black star typographic symbol", input: "startIcon={<span>★</span>}", expectCount: 0 },
  { label: "White star typographic symbol", input: "icon={<span>☆</span>}", expectCount: 0 },
  { label: "Vertical ellipsis menu indicator", input: "action={<button>⋮</button>}", expectCount: 0 },
  { label: "Multiplication / close symbol", input: "<button>✕</button>", expectCount: 0 },
  { label: "Bullet point", input: "• First item • Second item", expectCount: 0 },
  { label: "Em dash and en dash", input: "Chellaa React — Universal UI System – 2026", expectCount: 0 },
  { label: "Accented Latin text", input: "Café, naïve, façade, résumé, señor", expectCount: 0 },
  { label: "Tamil script (non-ASCII language)", input: "செல்லா ரியாக்ட் — தமிழ் பயனர் இடைமுக நூலகம்", expectCount: 0 },
  { label: "Mathematical symbols", input: "x ≤ y ± z × w ÷ v ≠ 0; √16 = 4; ∑ x_i → ∞", expectCount: 0 },
  { label: "Clean SVG path code", input: '<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>', expectCount: 0 },
];

let failedTests = 0;

for (const tc of testCases) {
  const matches = findEmojisInLine(tc.input);
  const pass = matches.length === tc.expectCount && (!tc.expectChar || matches[0]?.char === tc.expectChar);

  if (!pass) {
    console.error(`[FAIL] ${tc.label}`);
    console.error(`       Input: "${tc.input}"`);
    console.error(`       Expected ${tc.expectCount} matches, got ${matches.length}: [${matches.map((m) => m.char).join(", ")}]`);
    failedTests++;
  } else {
    console.log(`  ✓ ${tc.label.padEnd(45)} [Matches: ${matches.length}]`);
  }
}

console.log("=================================================");
if (failedTests > 0) {
  console.error(`[RESULT] ${failedTests} of ${testCases.length} tests failed.`);
  process.exit(1);
} else {
  console.log(`[RESULT] All ${testCases.length} unit tests passed successfully.`);
  console.log("=================================================");
}
