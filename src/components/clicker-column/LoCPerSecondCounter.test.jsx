import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoCPerSecondCounter from "./LoCPerSecondCounter";
import {
  LoCPerSecondProvider,
  useLoCPerSecondDispatch,
} from "../contexts/LoCPerSecondContext";
import Big from "big.js";

function TestWrapper() {
  const dispatch = useLoCPerSecondDispatch();

  return (
    <>
      <LoCPerSecondCounter />
      <button onClick={() => dispatch({ type: "increase", amount: Big(5) })}>
        Add 5
      </button>
    </>
  );
}

describe("LoCPerSecondCounter", () => {
  test("renders initial LoC value as '0 LoC'", () => {
    render(
      <LoCPerSecondProvider>
        <LoCPerSecondCounter />
      </LoCPerSecondProvider>
    );

    expect(screen.getByRole("heading", { name: /0 LoC/ })).toBeInTheDocument();
  });

  test("updates display when LoC changes", async () => {
    render(
      <LoCPerSecondProvider>
        <TestWrapper />
      </LoCPerSecondProvider>
    );

    expect(screen.getByRole("heading", { name: /0 LoC/ })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /Add 5/ }));

    expect(screen.getByRole("heading", { name: /5 LoC/ })).toBeInTheDocument();
  });
});
