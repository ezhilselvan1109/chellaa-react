import { Button } from "@chellaa/react";
import { ComponentPreview } from "../../components/ComponentDoc/ComponentPreview";

const code = `import { Button } from "@chellaa/react";

export function ButtonAsChild() {
  return (
    <Button asChild variant="outline" colorScheme="primary">
      <a href="https://github.com" target="_blank" rel="noreferrer">
        External Anchor Link ↗
      </a>
    </Button>
  );
}`;

export function ButtonAsChildExample() {
  return (
    <ComponentPreview
      title="Polymorphic Slot Delegation (asChild)"
      description="Renders any child element (like a Next.js or React Router Link) with complete Button styling and behaviors without extra DOM wrappers."
      code={code}
    >
      <Button asChild variant="outline" colorScheme="primary">
        <a href="https://github.com" target="_blank" rel="noreferrer">
          External Anchor Link ↗
        </a>
      </Button>
    </ComponentPreview>
  );
}
