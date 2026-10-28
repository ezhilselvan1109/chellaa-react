import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { FileUpload, FormField, FormLabel, FormHelperText } from "@chellaa/react";

export const fileUploadToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "validation-rules", title: "Type & Size Validation" },
  { id: "formfield-integration", title: "FormField Integration" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const fileUploadPropsData: PropRow[] = [
  {
    name: "value",
    type: "File[]",
    default: "undefined",
    description: "Controlled array of selected File objects.",
  },
  {
    name: "defaultValue",
    type: "File[]",
    default: "[]",
    description: "Initial files when uncontrolled.",
  },
  {
    name: "onValueChange",
    type: "(files: File[]) => void",
    default: "undefined",
    description: "Callback fired when file selection is updated.",
  },
  {
    name: "onValidationErrors",
    type: "(errors: FileValidationError[]) => void",
    default: "undefined",
    description: "Callback triggered when client-side validation rules fail.",
  },
  {
    name: "isMultiple",
    type: "boolean",
    default: "false",
    description: "Allows selection of more than one file.",
  },
  {
    name: "accept",
    type: "string",
    default: "undefined",
    description: "Comma-separated MIME types or file extensions (e.g. 'image/*,.pdf').",
  },
  {
    name: "maxSize",
    type: "number",
    default: "undefined",
    description: "Maximum file size in bytes.",
  },
  {
    name: "maxFiles",
    type: "number",
    default: "undefined",
    description: "Maximum total number of files allowed.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Disables file selection and drag-drop interactions.",
  },
];

export function FileUploadDocPage() {
  return (
    <ComponentDocLayout
      title="FileUpload"
      description="Accessible file dropzone and browse button with client-side type/size validation and FormField integration."
    >
      <div id="import" style={{ marginBottom: "2rem" }}>
        <h2>Import</h2>
        <CodeBlock
          code={`import { FileUpload } from "@chellaa/react";\nimport type { FileUploadProps, FileValidationError } from "@chellaa/react";`}
          language="tsx"
        />
      </div>

      <div id="basic-usage" style={{ marginBottom: "2rem" }}>
        <h2>Basic Usage</h2>
        <p>A drag-and-drop dropzone with an accessible file browsing button:</p>
        <div style={{ maxWidth: 500, marginTop: 12 }}>
          <FileUpload
            dropzoneText="Drag and drop files here, or browse"
            dropzoneHint="PNG, JPG, or PDF documents up to 5MB"
          />
        </div>
      </div>

      <div id="validation-rules" style={{ marginBottom: "2rem" }}>
        <h2>Type & Size Validation</h2>
        <p>Client-side validation restricts unaccepted formats or oversized payloads:</p>
        <div style={{ maxWidth: 500, marginTop: 12 }}>
          <FileUpload
            accept="image/*,.pdf"
            maxSize={2 * 1024 * 1024}
            dropzoneText="Upload profile avatar"
            dropzoneHint="Images or PDF under 2MB"
          />
        </div>
      </div>

      <div id="formfield-integration" style={{ marginBottom: "2rem" }}>
        <h2>FormField Integration</h2>
        <p>Combines with FormField for automatic labeling and helper descriptions:</p>
        <div style={{ maxWidth: 500, marginTop: 12 }}>
          <FormField id="resume-field">
            <FormLabel>Curriculum Vitae (PDF)</FormLabel>
            <FileUpload accept=".pdf" />
            <FormHelperText>Upload your latest resume in PDF format</FormHelperText>
          </FormField>
        </div>
      </div>

      <div id="accessibility" style={{ marginBottom: "2rem" }}>
        <AccessibilitySection
          componentName="FileUpload"
          roles={[
            { attributeOrKey: "role='button'", description: "Applied to the dropzone container." },
            { attributeOrKey: "aria-invalid", description: "Set to true when validation errors occur or parent FormField has error." },
            { attributeOrKey: "aria-describedby", description: "Links to helper text or validation error messages." },
          ]}
          keyboardKeys={[
            { attributeOrKey: "Enter / Space", description: "Opens native OS file picker." },
            { attributeOrKey: "Tab", description: "Focuses the dropzone and individual file remove buttons." },
          ]}
        />
      </div>

      <div id="api-reference" style={{ marginBottom: "2rem" }}>
        <h2>API Reference</h2>
        <ApiTable componentName="FileUpload" props={fileUploadPropsData} />
      </div>
    </ComponentDocLayout>
  );
}
