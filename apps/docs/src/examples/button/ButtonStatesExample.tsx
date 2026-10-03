import { Button } from "@chellaa/react";
import { ComponentPreview } from "../../components/ComponentDoc/ComponentPreview";

const code = `import { Button } from "@chellaa/react";

export function ButtonStates() {
  return (
    <>
      <Button isDisabled>Disabled</Button>
      <Button isLoading loadingPosition="start">Loading Start</Button>
      <Button isLoading loadingPosition="end">Loading End</Button>
      <Button isLoading loadingPosition="center">Loading Center</Button>
      <Button isLoading loadingText="Saving...">Custom Text</Button>
    </>
  );
}`;

export function ButtonStatesExample() {
  return (
    <ComponentPreview
      title="Interaction & Loading States"
      description="Disabled buttons prevent user interaction, while loading states render accessible SVG spinners."
      code={code}
    >
      <Button isDisabled>Disabled</Button>
      <Button isLoading loadingPosition="start">
        Loading Start
      </Button>
      <Button isLoading loadingPosition="end">
        Loading End
      </Button>
      <Button isLoading loadingPosition="center">
        Loading Center
      </Button>
      <Button isLoading loadingText="Saving...">
        Custom Text
      </Button>
    </ComponentPreview>
  );
}
