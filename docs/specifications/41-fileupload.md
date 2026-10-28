# SPEC-041: FileUpload Specification

## 1. Overview
The `FileUpload` component is a file selection and validation UI control. It supports native file dialog browsing, drag-and-drop file target zones, single-file and multi-file selection, accepted MIME type / extension restrictions, maximum file size validation, maximum file count validation, an accessible selected files list with individual remove actions, disabled state, and `FormField` error integration.

### Boundary Disclaimer
`FileUpload` is strictly a client-side selection and validation UI primitive. It does NOT automatically perform HTTP requests, cloud uploads, or data streaming. Consumers attach an `onFilesChange` or submit listener to handle the actual file transfer. Client-side MIME validation does not guarantee file security.

---

## 2. Public API & Type Definitions

```typescript
export interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
}

export interface FileValidationError {
  file: File;
  type: "file-too-large" | "file-invalid-type" | "too-many-files";
  message: string;
}

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * Controlled array of selected files.
   */
  value?: File[];

  /**
   * Initial default selected files.
   * @default []
   */
  defaultValue?: File[];

  /**
   * Callback fired when selected files change.
   */
  onValueChange?: (files: File[]) => void;

  /**
   * Callback fired when validation errors occur.
   */
  onValidationErrors?: (errors: FileValidationError[]) => void;

  /**
   * Whether multiple files can be selected.
   * @default false
   */
  isMultiple?: boolean;

  /**
   * Accepted file types (comma-separated MIME types or extensions, e.g., 'image/*', '.pdf').
   */
  accept?: string;

  /**
   * Maximum file size in bytes.
   */
  maxSize?: number;

  /**
   * Maximum number of files permitted.
   */
  maxFiles?: number;

  /**
   * Whether the component is disabled.
   * Cascades from parent FormField if unset.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the component is in an invalid state.
   * Cascades from parent FormField if unset.
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Dropzone prompt title.
   * @default "Click or drag files here to upload"
   */
  dropzoneText?: string;

  /**
   * Dropzone secondary helper text.
   */
  dropzoneHint?: string;

  /**
   * Browse button text.
   * @default "Browse Files"
   */
  browseText?: string;

  /**
   * Whether to show the file list inside the component.
   * @default true
   */
  showFileList?: boolean;

  /**
   * Custom format function for file size bytes.
   */
  formatFileSize?: (bytes: number) => string;
}
```

---

## 3. Keyboard Interactions & Accessibility
- **Dropzone Area**: Keyboard focusable (`tabIndex={0}`), activates file chooser on `Enter` or `Space`.
- **Hidden Input**: `<input type="file" tabIndex={-1} aria-hidden="true" style="display:none" />`.
- **Drag & Drop Events**: Accessible drop targets with `aria-dropeffect="copy"`, active visual feedback on drag-over.
- **File List Items**: Each item exposes `<button type="button" aria-label="Remove file {name}">` with visible focus ring.
- **Validation Messages**: Linked via `aria-describedby` to parent `FormField` error message.
