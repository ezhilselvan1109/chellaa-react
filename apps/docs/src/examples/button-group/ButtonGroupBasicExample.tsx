import { Button, ButtonGroup } from "@chellaa/react";
import { ComponentPreview } from "../../components/ComponentDoc/ComponentPreview";

const code = `import { Button, ButtonGroup } from "@chellaa/react";

export function ButtonGroupAttached() {
  return (
    <ButtonGroup isAttached variant="outline" colorScheme="primary">
      <Button>Day</Button>
      <Button>Week</Button>
      <Button>Month</Button>
      <Button>Year</Button>
    </ButtonGroup>
  );
}`;

export function ButtonGroupBasicExample() {
  return (
    <ComponentPreview
      title="Attached Segmented Control"
      description="Adjacent buttons collapse interior borders and share unified size and colorScheme from context."
      code={code}
    >
      <ButtonGroup isAttached variant="outline" colorScheme="primary">
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
        <Button>Year</Button>
      </ButtonGroup>
    </ComponentPreview>
  );
}
