import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Big from "big.js";

import {
  LoCPerSecondProvider,
  useLoCPerSecond,
  useLoCPerSecondDispatch
} from "./LoCPerSecondContext";

function TestComponent() {
  const locPerSecond = useLoCPerSecond();
  const dispatch = useLoCPerSecondDispatch();

  return (
    <div>
      <p data-testid="locPerSecondValue">{locPerSecond.toString()}</p>
      <button onClick={() => dispatch({ type: "increase", amount: Big(5) })}>
        Inc 5
      </button>
      <button onClick={() => dispatch({ type: "unknown", amount: Big(3) })}>
        Unknown Action
      </button>
    </div>
  );
}

function UnknownActionTester() {
  const locPerSecond = useLoCPerSecond();
  const dispatch = useLoCPerSecondDispatch();

  useEffect(() => {
    dispatch({ type: "unknown", amount: Big(50) });
  }, [dispatch]);

  return <p data-testid="locPerSecondValue">{locPerSecond.toString()}</p>;
}

describe("LoCPerSecondContext", () => {
  test("initial value is 0", () => {
    render(
      <LoCPerSecondProvider>
        <TestComponent />
      </LoCPerSecondProvider>
    );
    expect(screen.getByTestId("locPerSecondValue")).toHaveTextContent("0");
  });

  test("increase action adds to LoCPerSecond", async () => {
    render(
      <LoCPerSecondProvider>
        <TestComponent />
      </LoCPerSecondProvider>
    );
    await userEvent.click(screen.getByRole("button", { name: /inc 5/i }));
    expect(screen.getByTestId("locPerSecondValue")).toHaveTextContent("5");
  });

  test("default case does not change LoCPerSecond", async () => {
    render(
      <LoCPerSecondProvider>
        <TestComponent />
      </LoCPerSecondProvider>
    );
    await userEvent.click(screen.getByRole("button", { name: /unknown action/i }));
    expect(screen.getByTestId("locPerSecondValue")).toHaveTextContent("0");
  });

  test("unknown action type doesn't change state", () => {
    render(
      <LoCPerSecondProvider>
        <UnknownActionTester />
      </LoCPerSecondProvider>
    );

    expect(screen.getByTestId("locPerSecondValue")).toHaveTextContent("0");
  });

  test("multiple increases accumulate correctly", async () => {
    render(
      <LoCPerSecondProvider>
        <TestComponent />
      </LoCPerSecondProvider>
    );

    await userEvent.click(screen.getByRole("button", { name: /inc 5/i }));
    await userEvent.click(screen.getByRole("button", { name: /inc 5/i }));
    await userEvent.click(screen.getByRole("button", { name: /inc 5/i }));

    expect(screen.getByTestId("locPerSecondValue")).toHaveTextContent("15");
  });
});