import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { useFormField } from "../FormField/FormFieldContext";
import { classNames } from "../../utils/classNames";
import type {
  FileUploadProps,
  FileValidationError,
} from "./FileUpload.types";

function defaultFormatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function matchesAccept(file: File, acceptString?: string): boolean {
  if (!acceptString) return true;
  const rules = acceptString.split(",").map((rule) => rule.trim().toLowerCase());

  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  return rules.some((rule) => {
    if (rule.startsWith(".")) {
      return fileName.endsWith(rule);
    }
    if (rule.endsWith("/*")) {
      const prefix = rule.slice(0, -2);
      return fileType.startsWith(prefix);
    }
    return fileType === rule;
  });
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  function FileUpload(props, ref) {
    const {
      value: valueProp,
      defaultValue,
      onValueChange,
      onValidationErrors,
      isMultiple = false,
      accept,
      maxSize,
      maxFiles,
      isDisabled = false,
      isInvalid = false,
      dropzoneText = "Click or drag files here to upload",
      dropzoneHint,
      browseText = "Browse Files",
      showFileList = true,
      formatFileSize = defaultFormatBytes,
      className,
      id,
      "aria-label": ariaLabel = "File Upload",
      "aria-describedby": ariaDescribedByProp,
      ...rest
    } = props;

    // 1. FormField integration
    const formField = useFormField();
    const effectiveId = id ?? formField?.id;
    const effectiveDisabled = isDisabled || (formField?.disabled ?? false);
    const effectiveInvalid = isInvalid || (formField?.error ?? false);
    const ariaDescribedBy = [
      ariaDescribedByProp,
      formField?.error && formField?.hasErrorMessage ? formField.errorMessageId : null,
      formField?.hasHelperText ? formField.helperTextId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    // 2. Controlled / uncontrolled file selection
    const [files, setFiles] = useControllableState<File[]>({
      value: valueProp,
      defaultValue: defaultValue ?? [],
      onChange: onValueChange,
    });

    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const [localErrors, setLocalErrors] = React.useState<string[]>([]);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const validateAndAddFiles = (incomingList: FileList | File[]) => {
      if (effectiveDisabled) return;

      const incoming = Array.from(incomingList);
      const validFiles: File[] = [];
      const errorList: FileValidationError[] = [];
      const errorMessages: string[] = [];

      // Check max count
      const totalCount = isMultiple ? files.length + incoming.length : incoming.length;
      const firstIncoming = incoming[0];
      if (maxFiles !== undefined && totalCount > maxFiles && firstIncoming) {
        const error: FileValidationError = {
          file: firstIncoming,
          code: "too-many-files",
          message: `Maximum of ${maxFiles} file(s) allowed.`,
        };
        errorList.push(error);
        errorMessages.push(error.message);
      }

      for (const file of incoming) {
        // Check accepted type
        if (!matchesAccept(file, accept)) {
          const error: FileValidationError = {
            file,
            code: "file-invalid-type",
            message: `File type '${file.type || file.name}' is not accepted.`,
          };
          errorList.push(error);
          errorMessages.push(error.message);
          continue;
        }

        // Check max size
        if (maxSize !== undefined && file.size > maxSize) {
          const error: FileValidationError = {
            file,
            code: "file-too-large",
            message: `File '${file.name}' (${formatFileSize(file.size)}) exceeds maximum limit of ${formatFileSize(maxSize)}.`,
          };
          errorList.push(error);
          errorMessages.push(error.message);
          continue;
        }

        validFiles.push(file);
      }

      if (errorList.length > 0) {
        setLocalErrors(errorMessages);
        onValidationErrors?.(errorList);
      } else {
        setLocalErrors([]);
      }

      if (validFiles.length > 0) {
        const firstValid = validFiles[0];
        const next = isMultiple ? [...files, ...validFiles] : (firstValid ? [firstValid] : []);
        setFiles(next);
      }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        validateAndAddFiles(e.target.files);
        // Reset file input value so selecting the same file again triggers change
        e.target.value = "";
      }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!effectiveDisabled) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (!effectiveDisabled && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        validateAndAddFiles(e.dataTransfer.files);
      }
    };

    const handleRemoveFile = (index: number) => {
      if (effectiveDisabled) return;
      const next = files.filter((_, idx) => idx !== index);
      setFiles(next);
      if (next.length === 0) {
        setLocalErrors([]);
      }
    };

    const triggerBrowse = () => {
      if (!effectiveDisabled) {
        inputRef.current?.click();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (effectiveDisabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerBrowse();
      }
    };

    return (
      <div
        {...rest}
        ref={ref}
        id={effectiveId}
        className={classNames(
          "cl-fileupload",
          effectiveDisabled && "cl-fileupload--disabled",
          effectiveInvalid && "cl-fileupload--error",
          className
        )}
      >
        {/* Hidden File Input */}
        <input
          ref={inputRef}
          type="file"
          multiple={isMultiple}
          accept={accept}
          disabled={effectiveDisabled}
          onChange={handleFileInputChange}
          tabIndex={-1}
          aria-hidden="true"
          style={{ display: "none" }}
        />

        {/* Dropzone Interactive Area */}
        <div
          role="button"
          tabIndex={effectiveDisabled ? -1 : 0}
          aria-disabled={effectiveDisabled ? true : undefined}
          aria-invalid={effectiveInvalid ? true : undefined}
          aria-describedby={ariaDescribedBy}
          aria-label={ariaLabel}
          onKeyDown={handleKeyDown}
          onClick={triggerBrowse}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={classNames(
            "cl-fileupload__dropzone",
            isDragging && "cl-fileupload__dropzone--dragging"
          )}
        >
          <div className="cl-fileupload__icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>

          <div className="cl-fileupload__content">
            <span className="cl-fileupload__prompt">{dropzoneText}</span>
            {dropzoneHint && (
              <span className="cl-fileupload__hint">{dropzoneHint}</span>
            )}
          </div>

          <span className="cl-fileupload__browse-btn" aria-hidden="true">
            {browseText}
          </span>
        </div>

        {/* Validation Errors Display */}
        {localErrors.length > 0 && (
          <div className="cl-fileupload__errors" role="alert">
            {localErrors.map((msg, i) => (
              <span key={i} className="cl-fileupload__error-item">
                {msg}
              </span>
            ))}
          </div>
        )}

        {/* Selected Files List */}
        {showFileList && files.length > 0 && (
          <ul className="cl-fileupload__list" aria-label="Selected files">
            {files.map((file, idx) => (
              <li key={`${file.name}-${file.size}-${idx}`} className="cl-fileupload__item">
                <div className="cl-fileupload__file-info">
                  <span className="cl-fileupload__file-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </span>
                  <span className="cl-fileupload__file-name">{file.name}</span>
                  <span className="cl-fileupload__file-size">
                    ({formatFileSize(file.size)})
                  </span>
                </div>

                {!effectiveDisabled && (
                  <button
                    type="button"
                    aria-label={`Remove file ${file.name}`}
                    className="cl-fileupload__remove-btn"
                    onClick={() => handleRemoveFile(idx)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
