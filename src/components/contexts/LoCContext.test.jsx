import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Big from "big.js";

import { LoCProvider, useLoC, useLoCDispatch } from "./LoCContext";

function TestComponent() {
  const loc = useLoC();
  const dispatch = useLoCDispatch();

  return (
    <div>
      <p data-testid="locValue">{loc.toString()}</p>
      <button onClick={() => dispatch({ type: "increase", amount: Big(5) })}>
        Inc 5
      </button>
      <button onClick={() => dispatch({ type: "decrease", amount: Big(2) })}>
        Dec 2
      </button>
      <button onClick={() => dispatch({ type: "set", amount: Big(10) })}>
        Set 10
      </button>
    </div>
  );
}

function UnknownActionTester() {
  const loc = useLoC();
  const dispatch = useLoCDispatch();

  useEffect(() => {
    dispatch({ type: "unknown", amount: Big(50) });
  }, [dispatch]);

  return <p data-testid="locValue">{loc.toString()}</p>;
}

describe("LoCContext", () => {
  test("initial value is 0", () => {
    render(
      <LoCProvider>
        <TestComponent />
      </LoCProvider>
    );
    expect(screen.getByTestId("locValue")).toHaveTextContent("0");
  });

  test("increase action adds to LoC", async () => {
    render(
      <LoCProvider>
        <TestComponent />
      </LoCProvider>
    );
    await userEvent.click(screen.getByRole("button", { name: /inc 5/i }));
    expect(screen.getByTestId("locValue")).toHaveTextContent("5");
  });

  test("decrease action subtracts from LoC", async () => {
    render(
      <LoCProvider>
        <TestComponent />
      </LoCProvider>
    );
    await userEvent.click(screen.getByRole("button", { name: /inc 5/i }));
    await userEvent.click(screen.getByRole("button", { name: /dec 2/i }));
    expect(screen.getByTestId("locValue")).toHaveTextContent("3");
  });

  test("set action directly sets LoC", async () => {
    render(
      <LoCProvider>
        <TestComponent />
      </LoCProvider>
    );
    await userEvent.click(screen.getByRole("button", { name: /set 10/i }));
    expect(screen.getByTestId("locValue")).toHaveTextContent("10");
  });

  test("default case does not change LoC", () => {
    render(
      <LoCProvider>
        <UnknownActionTester />
      </LoCProvider>
    );

    expect(screen.getByTestId("locValue")).toHaveTextContent("0");
  });
});
