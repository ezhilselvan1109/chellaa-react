import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { FileUpload } from "./FileUpload";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormErrorMessage } from "../FormField/FormErrorMessage";

describe("FileUpload Component", () => {
  it("renders dropzone prompt and browse button", () => {
    render(
      <FileUpload
        dropzoneText="Upload documents here"
        browseText="Choose Files"
      />
    );

    expect(screen.getByText("Upload documents here")).toBeInTheDocument();
    expect(screen.getByText("Choose Files")).toBeInTheDocument();
  });

  it("handles file selection via input change", () => {
    const handleChange = vi.fn();
    const { container } = render(
      <FileUpload onValueChange={handleChange} />
    );

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["test content"], "document.txt", { type: "text/plain" });

    fireEvent.change(input, { target: { files: [file] } });

    expect(handleChange).toHaveBeenCalledWith([file]);
    expect(screen.getByText("document.txt")).toBeInTheDocument();
  });

  it("handles drag and drop files", () => {
    const handleChange = vi.fn();
    render(<FileUpload onValueChange={handleChange} />);

    const dropzone = screen.getByRole("button", { name: "File Upload" });
    const file = new File(["photo data"], "avatar.png", { type: "image/png" });

    fireEvent.dragOver(dropzone);
    expect(dropzone).toHaveClass("cl-fileupload__dropzone--dragging");

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(dropzone).not.toHaveClass("cl-fileupload__dropzone--dragging");
    expect(handleChange).toHaveBeenCalledWith([file]);
    expect(screen.getByText("avatar.png")).toBeInTheDocument();
  });

  it("validates file size limit and triggers error", () => {
    const handleErrors = vi.fn();
    const { container } = render(
      <FileUpload
        maxSize={500} // 500 bytes
        onValidationErrors={handleErrors}
      />
    );

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const bigFile = new File([new ArrayBuffer(1024)], "heavy.zip", { type: "application/zip" });

    fireEvent.change(input, { target: { files: [bigFile] } });

    expect(handleErrors).toHaveBeenCalled();
    expect(screen.getByText(/exceeds maximum limit/i)).toBeInTheDocument();
  });

  it("validates accepted file types", () => {
    const handleErrors = vi.fn();
    const { container } = render(
      <FileUpload
        accept="image/*,.pdf"
        onValidationErrors={handleErrors}
      />
    );

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const exeFile = new File(["malware"], "script.exe", { type: "application/x-msdownload" });

    fireEvent.change(input, { target: { files: [exeFile] } });

    expect(handleErrors).toHaveBeenCalled();
    expect(screen.getByText(/is not accepted/i)).toBeInTheDocument();
  });

  it("removes selected file when remove button is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const file = new File(["data"], "test.png", { type: "image/png" });

    render(
      <FileUpload
        defaultValue={[file]}
        onValueChange={handleChange}
      />
    );

    const removeBtn = screen.getByRole("button", { name: "Remove file test.png" });
    await user.click(removeBtn);

    expect(handleChange).toHaveBeenCalledWith([]);
    expect(screen.queryByText("test.png")).not.toBeInTheDocument();
  });

  it("integrates with FormField for id, error state, and aria-describedby", () => {
    render(
      <FormField id="resume-field" isInvalid>
        <FormLabel>Resume</FormLabel>
        <FileUpload />
        <FormErrorMessage>Resume required</FormErrorMessage>
      </FormField>
    );

    const dropzone = screen.getByRole("button", { name: "File Upload" });
    expect(dropzone).toHaveAttribute("aria-invalid", "true");
    expect(dropzone).toHaveAttribute("aria-describedby");
  });

  it("passes axe accessibility tests", async () => {
    const file = new File(["accessible content"], "report.pdf", { type: "application/pdf" });
    const { container } = render(
      <FileUpload
        defaultValue={[file]}
        aria-label="Upload resumes"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
