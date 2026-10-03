import { Button } from "@chellaa/react";
import { ComponentPreview } from "../../components/ComponentDoc/ComponentPreview";

const code = `import { Button } from "@chellaa/react";

export function ButtonSizes() {
  return (
    <>
      <Button size="xs">Extra Small (28px)</Button>
      <Button size="sm">Small (32px)</Button>
      <Button size="md">Medium (40px)</Button>
      <Button size="lg">Large (48px)</Button>
      <Button size="xl">Extra Large (56px)</Button>
    </>
  );
}`;

export function ButtonSizesExample() {
  return (
    <ComponentPreview
      title="Spatial Sizes Scale"
      description="Mapped to the 4px/8px design grid with heights matching form controls."
      code={code}
    >
      <Button size="xs">Extra Small (28px)</Button>
      <Button size="sm">Small (32px)</Button>
      <Button size="md">Medium (40px)</Button>
      <Button size="lg">Large (48px)</Button>
      <Button size="xl">Extra Large (56px)</Button>
    </ComponentPreview>
  );
}
