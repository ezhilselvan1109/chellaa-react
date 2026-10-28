import * as React from "react";

export interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
}

export type FileValidationErrorCode =
  | "file-too-large"
  | "file-invalid-type"
  | "too-many-files";

export interface FileValidationError {
  file: File;
  code: FileValidationErrorCode;
  message: string;
}

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * Controlled array of selected files.
   */
  value?: File[];

  /**
   * Initial uncontrolled array of selected files.
   * @default []
   */
  defaultValue?: File[];

  /**
   * Callback fired when selected files change.
   */
  onValueChange?: (files: File[]) => void;

  /**
   * Callback fired when files fail client-side validation rules.
   */
  onValidationErrors?: (errors: FileValidationError[]) => void;

  /**
   * Whether multiple files can be selected.
   * @default false
   */
  isMultiple?: boolean;

  /**
   * Comma-separated accepted file extensions or MIME patterns (e.g. "image/*,.pdf").
   */
  accept?: string;

  /**
   * Maximum allowed file size in bytes.
   */
  maxSize?: number;

  /**
   * Maximum allowed total number of files.
   */
  maxFiles?: number;

  /**
   * Whether the component is disabled.
   * Cascades from parent FormField if unset.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the component is in an invalid error state.
   * Cascades from parent FormField if unset.
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Primary title text inside the dropzone.
   * @default "Click or drag files here to upload"
   */
  dropzoneText?: string;

  /**
   * Secondary hint text below the primary prompt.
   */
  dropzoneHint?: string;

  /**
   * Button label for browsing files.
   * @default "Browse Files"
   */
  browseText?: string;

  /**
   * Whether to display the selected files list within the component.
   * @default true
   */
  showFileList?: boolean;

  /**
   * Custom file size formatter.
   */
  formatFileSize?: (bytes: number) => string;
}
