import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Card,
  CardHeader,
  CardMedia,
  CardBody,
  CardFooter,
  CardActions,
  Button,
  Text,
  Box,
} from "@chellaa/react";

export const cardToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "compound-components", title: "Compound Hierarchy" },
  { id: "api-reference", title: "API Reference" },
];

const cardPropsData: PropRow[] = [
  {
    name: "variant",
    type: '"elevated" | "outlined" | "filled"',
    default: '"elevated"',
    description: "Visual container styling treatment.",
  },
  {
    name: "elevation",
    type: "0 | 1 | 2 | 3 | 4 | 5",
    default: "1",
    description: "Shadow depth for elevated variant.",
  },
  {
    name: "hoverable",
    type: "boolean",
    default: "false",
    description: "Applies hover elevation and border transition.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Internal content padding scale.",
  },
];

export function CardDocPage() {
  return (
    <ComponentDocLayout
      title="Card"
      description="Compound surface component for structured content presentation with header, media, body, footer, and actions."
      status="stable"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
  Card,
  CardHeader,
  CardMedia,
  CardBody,
  CardFooter,
  CardActions,
} from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Card variant="elevated" elevation={2} sx={{ maxWidth: 400 }}>
            <CardHeader title="Project Settings" subheader="Updated 2 hours ago" />
            <CardBody>
              <Text size="sm">Manage repository branch protection rules and CI/CD triggers.</Text>
            </CardBody>
            <CardActions>
              <Button size="sm" variant="solid" colorScheme="primary">Configure</Button>
            </CardActions>
          </Card>
        </Box>
        <CodeBlock
          code={`<Card variant="elevated" elevation={2} sx={{ maxWidth: 400 }}>
  <CardHeader title="Project Settings" subheader="Updated 2 hours ago" />
  <CardBody>
    <Text size="sm">Manage repository branch protection rules.</Text>
  </CardBody>
  <CardActions>
    <Button size="sm" variant="solid" colorScheme="primary">Configure</Button>
  </CardActions>
</Card>`}
          language="tsx"
        />
      </section>

      <section id="compound-components" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Compound Hierarchy</span>
          <a href="#compound-components" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Card variant="elevated" elevation={2} hoverable sx={{ maxWidth: 400 }}>
            <CardMedia
              image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60"
              alt="Code Banner"
              aspectRatio="16/9"
            />
            <CardHeader
              title="Hybrid Styling Architecture"
              subheader="Static CSS + Dynamic Emotion"
              avatar={<span>⚡</span>}
            />
            <CardBody>
              <Text size="sm">
                Collocated static CSS under @layer cl-components with 0ms runtime cost.
              </Text>
            </CardBody>
            <CardFooter divider>
              <Text size="xs" color="text.secondary">Version 0.2.0 • 18 Components</Text>
            </CardFooter>
            <CardActions>
              <Button size="sm" colorScheme="primary">Read Architecture</Button>
            </CardActions>
          </Card>
        </Box>
      </section>

      <ApiTable componentName="Card" props={cardPropsData} />
    </ComponentDocLayout>
  );
}
