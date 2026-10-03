import { CodeBlock } from "../../components/Common/CodeBlock";
import { Callout } from "../../components/Common/Callout";

export function SlotCompositionPage() {
  return (
    <article className="docs-page">
      <h1>
        Polymorphic Slot Delegation (<code>asChild</code>)
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: 1.6,
          color: "var(--cl-color-text-secondary, #4b5563)",
        }}
      >
        Rather than using dangerous dynamic element tags (e.g.{" "}
        <code>as=&quot;div&quot;</code>) which break TypeScript types, Chellaa
        React uses the <code>asChild</code> pattern.
      </p>

      <section style={{ marginTop: "28px" }}>
        <h2>
          Why <code>asChild</code>?
        </h2>
        <p>
          With <code>asChild</code>, the component forwards its props, styles,
          and event handlers directly onto its immediate child element instead
          of rendering its default DOM element.
        </p>

        <h3>Example: Next.js Link Composition</h3>
        <CodeBlock
          code={`import Link from "next/link";
import { Button } from "@chellaa/react";

export function NavigationCTA() {
  return (
    <Button asChild variant="solid" colorScheme="primary">
      <Link href="/dashboard">
        Go to Dashboard →
      </Link>
    </Button>
  );
}`}
          language="tsx"
          title="NavigationCTA.tsx"
        />
        <Callout type="success" title="Clean Rendered Markup">
          The resulting DOM element is a single{" "}
          <code>
            &lt;a href=&quot;/dashboard&quot; class=&quot;cl-button
            ...&quot;&gt;
          </code>{" "}
          with zero wrapper divs or invalid nested buttons!
        </Callout>
      </section>
    </article>
  );
}
