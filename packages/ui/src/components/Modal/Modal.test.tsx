import React, { useState } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal Component (Ant Design Specification)", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders modal content when open=true in portal and hides when open=false", () => {
    const { rerender } = render(
      <Modal open={true} title="Test Title">
        <p>Modal Body Content</p>
      </Modal>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Modal Body Content")).toBeInTheDocument();

    rerender(
      <Modal open={false} title="Test Title">
        <p>Modal Body Content</p>
      </Modal>
    );

    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Modal Body Content")).not.toBeInTheDocument();
  });

  it("calls onCancel when Cancel button is clicked", () => {
    const handleCancel = vi.fn();
    render(
      <Modal open={true} onCancel={handleCancel}>
        Content
      </Modal>
    );

    const cancelBtn = screen.getByText("Cancel");
    fireEvent.click(cancelBtn);
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onOk when OK button is clicked", () => {
    const handleOk = vi.fn();
    render(
      <Modal open={true} onOk={handleOk}>
        Content
      </Modal>
    );

    const okBtn = screen.getByText("OK");
    fireEvent.click(okBtn);
    expect(handleOk).toHaveBeenCalledTimes(1);
  });

  it("supports custom button texts via okText and cancelText", () => {
    render(
      <Modal open={true} okText="Submit Form" cancelText="Discard">
        Content
      </Modal>
    );

    expect(screen.getByText("Submit Form")).toBeInTheDocument();
    expect(screen.getByText("Discard")).toBeInTheDocument();
  });

  it("hides footer when footer=null", () => {
    render(
      <Modal open={true} footer={null}>
        Content Without Footer
      </Modal>
    );

    expect(screen.queryByText("OK")).not.toBeInTheDocument();
    expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
  });

  it("supports custom footer render function with OkBtn and CancelBtn", () => {
    render(
      <Modal
        open={true}
        footer={(_, { OkBtn, CancelBtn }) => (
          <div className="custom-footer">
            <span>Extra Action</span>
            <CancelBtn />
            <OkBtn />
          </div>
        )}
      >
        Content
      </Modal>
    );

    expect(screen.getByText("Extra Action")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("calls onCancel when pressing Escape key", () => {
    const handleCancel = vi.fn();
    render(
      <Modal open={true} keyboard={true} onCancel={handleCancel}>
        Content
      </Modal>
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when clicking backdrop mask", () => {
    const handleCancel = vi.fn();
    const { container } = render(
      <Modal open={true} maskClosable={true} onCancel={handleCancel}>
        Content
      </Modal>
    );

    const mask = document.querySelector(".ch-modal-mask") as HTMLElement;
    expect(mask).toBeInTheDocument();
    fireEvent.click(mask);
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("applies centered class when centered=true", () => {
    render(
      <Modal open={true} centered>
        Centered Dialog
      </Modal>
    );

    const wrap = document.querySelector(".ch-modal-wrap");
    const modal = document.querySelector(".ch-modal");
    expect(wrap).toHaveClass("ch-modal-wrap--centered");
    expect(modal).toHaveClass("ch-modal--centered");
  });

  it("Modal.confirm renders dynamic dialog and closes on OK", async () => {
    const handleOk = vi.fn();

    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this task?",
      onOk: handleOk,
    });

    expect(await screen.findByText("Confirm Delete")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to delete this task?")).toBeInTheDocument();

    const okBtn = screen.getByText("OK");
    fireEvent.click(okBtn);

    expect(handleOk).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByText("Confirm Delete")).not.toBeInTheDocument();
    });
  });

  it("Modal.destroyAll destroys all active confirmation dialogs", async () => {
    Modal.confirm({ title: "Modal 1", content: "Content 1" });
    Modal.info({ title: "Modal 2", content: "Content 2" });

    expect(await screen.findByText("Modal 1")).toBeInTheDocument();
    expect(await screen.findByText("Modal 2")).toBeInTheDocument();

    Modal.destroyAll();

    await waitFor(() => {
      expect(screen.queryByText("Modal 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Modal 2")).not.toBeInTheDocument();
    });
  });

  it("supports custom semantic DOM classNames and styles", () => {
    render(
      <Modal
        open={true}
        title="Styled Modal"
        classNames={{
          root: "custom-root",
          header: "custom-header",
          body: "custom-body",
          footer: "custom-footer",
        }}
        styles={{
          header: { color: "blue" },
        }}
      >
        Styled Content
      </Modal>
    );

    const root = document.querySelector(".ch-modal-root");
    const header = document.querySelector(".ch-modal-header");
    const body = document.querySelector(".ch-modal-body");
    const footer = document.querySelector(".ch-modal-footer");

    expect(root).toHaveClass("custom-root");
    expect(header).toHaveClass("custom-header");
    expect(body).toHaveClass("custom-body");
    expect(footer).toHaveClass("custom-footer");
  });
});
