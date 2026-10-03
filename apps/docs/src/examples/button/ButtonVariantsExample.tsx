import { Button } from "@chellaa/react";
import { ComponentPreview } from "../../components/ComponentDoc/ComponentPreview";

const code = `import { Button } from "@chellaa/react";

export function ButtonColorSchemes() {
  return (
    <>
      <Button colorScheme="primary">Primary</Button>
      <Button colorScheme="secondary">Secondary</Button>
      <Button colorScheme="neutral">Neutral</Button>
      <Button colorScheme="success">Success</Button>
      <Button colorScheme="warning">Warning</Button>
      <Button colorScheme="danger">Danger</Button>
      <Button colorScheme="info">Info</Button>
    </>
  );
}`;

export function ButtonVariantsExample() {
  return (
    <ComponentPreview
      title="Semantic Color Schemes"
      description="7 purpose-built semantic color ramps conforming to design system tokens."
      code={code}
    >
      <Button colorScheme="primary">Primary</Button>
      <Button colorScheme="secondary">Secondary</Button>
      <Button colorScheme="neutral">Neutral</Button>
      <Button colorScheme="success">Success</Button>
      <Button colorScheme="warning">Warning</Button>
      <Button colorScheme="danger">Danger</Button>
      <Button colorScheme="info">Info</Button>
    </ComponentPreview>
  );
}
