import { Button, ButtonGroup } from "@chellaa/react";
import { ComponentPreview } from "../../components/ComponentDoc/ComponentPreview";

const code = `import { Button, ButtonGroup } from "@chellaa/react";

export function ButtonGroupVertical() {
  return (
    <ButtonGroup orientation="vertical" isAttached variant="ghost" colorScheme="neutral">
      <Button>Profile</Button>
      <Button>Security</Button>
      <Button>Notifications</Button>
      <Button colorScheme="danger">Delete Account</Button>
    </ButtonGroup>
  );
}`;

export function ButtonGroupVerticalExample() {
  return (
    <ComponentPreview
      title="Vertical Stack with Child Overrides"
      description="Vertical orientation stacks buttons cleanly. Individual buttons can override inherited props like colorScheme."
      code={code}
    >
      <ButtonGroup
        orientation="vertical"
        isAttached
        variant="ghost"
        colorScheme="neutral"
      >
        <Button>Profile</Button>
        <Button>Security</Button>
        <Button>Notifications</Button>
        <Button colorScheme="danger">Delete Account</Button>
      </ButtonGroup>
    </ComponentPreview>
  );
}
