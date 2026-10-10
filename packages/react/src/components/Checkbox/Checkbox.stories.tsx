import * as React from "react";
import { Checkbox } from "./Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";
import { Stack } from "../Stack";
import { Box } from "../Box";
import { Typography } from "../Typography";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormHelperText } from "../FormField/FormHelperText";
import { FormErrorMessage } from "../FormField/FormErrorMessage";

export default {
  title: "Forms/Checkbox",
  component: Checkbox,
  subcomponents: { CheckboxGroup },
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    error: { control: "boolean" },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    colorScheme: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info", "default"],
    },
  },
};

export const Default = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Checkbox defaultChecked>Subscribe to newsletter</Checkbox>
    </Box>
  ),
};

export const TriStateIndeterminate = {
  render: function IndeterminateDemo() {
    const [checkedItems, setCheckedItems] = React.useState([true, false, false]);
    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Master &quot;Select All&quot; Example:
        </Typography>
        <Stack spacing={2}>
          <Checkbox
            checked={allChecked}
            indeterminate={isIndeterminate}
            onChange={(e) =>
              setCheckedItems([e.target.checked, e.target.checked, e.target.checked])
            }
          >
            Select All Services
          </Checkbox>
          <Box sx={{ pl: 4 }}>
            <Stack spacing={1.5}>
              <Checkbox
                checked={checkedItems[0]}
                onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2]])}
              >
                Analytics &amp; Reporting
              </Checkbox>
              <Checkbox
                checked={checkedItems[1]}
                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2]])}
              >
                Cloud Storage Sync
              </Checkbox>
              <Checkbox
                checked={checkedItems[2]}
                onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], e.target.checked])}
              >
                Automated Backups
              </Checkbox>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  },
};

export const Sizes = {
  render: () => (
    <Stack spacing={3} sx={{ p: 4 }}>
      <Checkbox size="sm" defaultChecked>Small (sm — 16px)</Checkbox>
      <Checkbox size="md" defaultChecked>Medium (md — 20px, Default)</Checkbox>
      <Checkbox size="lg" defaultChecked>Large (lg — 24px)</Checkbox>
    </Stack>
  ),
};

export const ColorSchemes = {
  render: () => (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Checkbox colorScheme="primary" defaultChecked>Primary Accent</Checkbox>
      <Checkbox colorScheme="secondary" defaultChecked>Secondary (Violet)</Checkbox>
      <Checkbox colorScheme="success" defaultChecked>Success (Emerald)</Checkbox>
      <Checkbox colorScheme="warning" defaultChecked>Warning (Amber)</Checkbox>
      <Checkbox colorScheme="error" defaultChecked>Error (Red)</Checkbox>
      <Checkbox colorScheme="info" defaultChecked>Info (Sky)</Checkbox>
      <Checkbox colorScheme="default" defaultChecked>Default (Text Neutral)</Checkbox>
    </Stack>
  ),
};

export const States = {
  render: () => (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Checkbox>Unchecked Normal</Checkbox>
      <Checkbox defaultChecked>Checked Normal</Checkbox>
      <Checkbox indeterminate>Indeterminate</Checkbox>
      <Checkbox disabled>Disabled Unchecked</Checkbox>
      <Checkbox disabled defaultChecked>Disabled Checked</Checkbox>
      <Checkbox error defaultChecked>Error State</Checkbox>
    </Stack>
  ),
};

export const CheckboxGroupDemo = {
  render: function GroupDemo() {
    const [selected, setSelected] = React.useState<string[]>(["react", "typescript"]);

    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Selected: {JSON.stringify(selected)}
        </Typography>
        <CheckboxGroup
          value={selected}
          onChange={setSelected}
          orientation="vertical"
          spacing={2}
        >
          <Checkbox value="react">React</Checkbox>
          <Checkbox value="vue">Vue.js</Checkbox>
          <Checkbox value="typescript">TypeScript</Checkbox>
          <Checkbox value="nextjs">Next.js</Checkbox>
        </CheckboxGroup>
      </Box>
    );
  },
};

export const WithFormField = {
  render: () => (
    <Box sx={{ maxWidth: 440, p: 4 }}>
      <FormField id="tos-field" required error>
        <FormLabel>Legal Agreements</FormLabel>
        <Checkbox>I agree to the End User License Agreement</Checkbox>
        <FormErrorMessage>
          You must accept the terms before proceeding.
        </FormErrorMessage>
        <FormHelperText>
          Your account is subject to our terms of service and privacy policy.
        </FormHelperText>
      </FormField>
    </Box>
  ),
};
