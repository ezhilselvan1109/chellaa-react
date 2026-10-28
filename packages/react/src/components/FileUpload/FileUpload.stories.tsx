import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FileUpload } from "./FileUpload";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormHelperText } from "../FormField/FormHelperText";
import { FormErrorMessage } from "../FormField/FormErrorMessage";

const meta: Meta<typeof FileUpload> = {
  title: "Components/Forms & Inputs/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible file selection control with drag-and-drop support, client-side MIME/size validation, FormField cascade, and keyboard navigation.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: () => <FileUpload />,
};

export const MultipleFiles: Story = {
  render: () => (
    <FileUpload
      isMultiple
      dropzoneText="Drag and drop multiple files here"
      dropzoneHint="PNG, JPG, PDF up to 10MB each"
    />
  ),
};

export const AcceptedTypesAndSize: Story = {
  render: () => (
    <FileUpload
      accept="image/*,.pdf"
      maxSize={5 * 1024 * 1024} // 5 MB
      dropzoneText="Upload profile images or resumes"
      dropzoneHint="Images or PDF files up to 5MB"
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <FileUpload
      isDisabled
      dropzoneText="File uploads currently disabled"
    />
  ),
};

export const WithFormField: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "500px" }}>
      <FormField id="resume-upload" required>
        <FormLabel>Curriculum Vitae</FormLabel>
        <FileUpload
          accept=".pdf,.docx"
          maxSize={10 * 1024 * 1024}
          dropzoneText="Attach your CV (PDF or DOCX)"
          dropzoneHint="Maximum file size 10MB"
        />
        <FormHelperText>We will review your resume within 48 hours</FormHelperText>
      </FormField>

      <FormField id="id-proof-upload" isInvalid>
        <FormLabel>Identity Proof</FormLabel>
        <FileUpload accept="image/*" />
        <FormErrorMessage>An identity document is mandatory</FormErrorMessage>
      </FormField>
    </div>
  ),
};
