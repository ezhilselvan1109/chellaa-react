import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useControllableState } from "./useControllableState";

describe("useControllableState", () => {
  it("operates in uncontrolled mode with defaultValue", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function UncontrolledComponent() {
      const [value, setValue] = useControllableState({
        defaultValue: "initial",
        onChange,
      });

      return (
        <div>
          <span data-testid="value">{value}</span>
          <button onClick={() => setValue("updated")}>Update</button>
        </div>
      );
    }

    render(<UncontrolledComponent />);
    expect(screen.getByTestId("value").textContent).toBe("initial");

    await user.click(screen.getByRole("button", { name: "Update" }));
    expect(screen.getByTestId("value").textContent).toBe("updated");
    expect(onChange).toHaveBeenCalledWith("updated");
  });

  it("operates in controlled mode with value prop", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function ControlledComponent({ value }: { value: string }) {
      const [currentValue, setValue] = useControllableState({
        value,
        onChange,
      });

      return (
        <div>
          <span data-testid="value">{currentValue}</span>
          <button onClick={() => setValue("attempt-change")}>Click</button>
        </div>
      );
    }

    const { rerender } = render(<ControlledComponent value="controlled-1" />);
    expect(screen.getByTestId("value").textContent).toBe("controlled-1");

    await user.click(screen.getByRole("button", { name: "Click" }));
    expect(onChange).toHaveBeenCalledWith("attempt-change");
    // Since it's controlled and parent didn't update prop, value stays controlled-1
    expect(screen.getByTestId("value").textContent).toBe("controlled-1");

    // Parent updates prop
    rerender(<ControlledComponent value="controlled-2" />);
    expect(screen.getByTestId("value").textContent).toBe("controlled-2");
  });

  it("supports functional state updates", () => {
    let stateValue = 0;
    let updateState!: (val: number | ((prev: number) => number)) => void;

    function TestComponent() {
      const [val, setVal] = useControllableState({ defaultValue: 0 });
      stateValue = val;
      updateState = setVal;
      return <div>{val}</div>;
    }

    render(<TestComponent />);
    expect(stateValue).toBe(0);

    act(() => {
      updateState((prev) => prev + 5);
    });
    expect(stateValue).toBe(5);
  });
});
