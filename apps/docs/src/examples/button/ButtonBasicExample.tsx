import { Button } from "@chellaa/react";
import { ComponentPreview } from "../../components/ComponentDoc/ComponentPreview";

const code = `import { Button } from "@chellaa/react";

export function ButtonBasic() {
  return (
    <>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="link">Link</Button>
    </>
  );
}`;

export function ButtonBasicExample() {
  return (
    <ComponentPreview
      title="Aesthetic Variants"
      description="Chellaa Button supports 5 distinct visual treatments configured via the variant prop."
      code={code}
    >
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="link">Link</Button>
    </ComponentPreview>
  );
}
