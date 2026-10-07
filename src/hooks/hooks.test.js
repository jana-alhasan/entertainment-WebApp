import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import useDebounce from "./useDebounce";
import useLocalStorage from "./useLocalStorage";

function LocalStorageHarness({ storageKey, initialValue }) {
  const [value, setValue] = useLocalStorage(storageKey, initialValue);

  return (
    <div>
      <span data-testid="value">{String(value)}</span>
      <button type="button" onClick={() => setValue(false)}>
        set false
      </button>
    </div>
  );
}

function DebounceHarness({ onFire, delay = 300 }) {
  const reset = useDebounce(onFire, delay);

  return (
    <button type="button" onClick={reset}>
      trigger
    </button>
  );
}

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("preserves a stored falsy value instead of replacing it with the initial value", () => {
    localStorage.setItem("saved-mode", JSON.stringify(false));

    render(
      <LocalStorageHarness storageKey="saved-mode" initialValue={true} />
    );

    expect(screen.getByTestId("value")).toHaveTextContent("false");
  });

  test("falls back to the initial value when stored JSON is invalid", () => {
    localStorage.setItem("broken-value", "not-valid-json");

    render(
      <LocalStorageHarness storageKey="broken-value" initialValue="fallback" />
    );

    expect(screen.getByTestId("value")).toHaveTextContent("fallback");
  });

  test("writes state updates back to localStorage", () => {
    render(
      <LocalStorageHarness storageKey="persisted-value" initialValue={true} />
    );

    fireEvent.click(screen.getByRole("button", { name: /set false/i }));

    expect(screen.getByTestId("value")).toHaveTextContent("false");
    expect(localStorage.getItem("persisted-value")).toBe("false");
  });
});

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("runs only the latest scheduled callback after the delay", () => {
    const onFire = jest.fn();

    render(<DebounceHarness onFire={onFire} delay={300} />);
    const trigger = screen.getByRole("button", { name: /trigger/i });

    fireEvent.click(trigger);
    fireEvent.click(trigger);
    fireEvent.click(trigger);

    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(onFire).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(onFire).toHaveBeenCalledTimes(1);
  });

  test("clears a pending callback when the component unmounts", () => {
    const onFire = jest.fn();
    const { unmount } = render(
      <DebounceHarness onFire={onFire} delay={300} />
    );

    fireEvent.click(screen.getByRole("button", { name: /trigger/i }));
    unmount();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(onFire).not.toHaveBeenCalled();
  });
});
