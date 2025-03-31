import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoCCounter from "./LoCCounter";
import { LoCProvider, useLoCDispatch } from "../contexts/LoCContext";
import Big from "big.js";

function TestWrapper() {
  const dispatch = useLoCDispatch();

  return (
    <>
      <LoCCounter />
      <button onClick={() => dispatch({ type: "increase", amount: Big(5) })}>
        Add 5
      </button>
    </>
  );
}

describe("LoCCounter", () => {
  test("renders initial LoC value as '0 LoC'", () => {
    render(
      <LoCProvider>
        <LoCCounter />
      </LoCProvider>
    );

    expect(screen.getByRole("heading", { name: /0 LoC/i })).toBeInTheDocument();
  });

  test("updates display when LoC changes", async () => {
    render(
      <LoCProvider>
        <TestWrapper />
      </LoCProvider>
    );

    expect(screen.getByRole("heading", { name: /0 LoC/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /add 5/i }));

    expect(screen.getByRole("heading", { name: /5 LoC/i })).toBeInTheDocument();
  });
});
