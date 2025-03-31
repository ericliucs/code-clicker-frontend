import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Big from "big.js";
import { LoCContext, useLoCDispatch } from "../../contexts/LoCContext";
import LaptopClicker from "./LaptopClicker";

jest.mock("../../contexts/LoCContext", () => {
  const originalModule = jest.requireActual("../../contexts/LoCContext");

  return {
    ...originalModule,
    useLoCDispatch: jest.fn(),
  };
});

describe("LaptopClicker component", () => {
  test("renders image with correct alt text", () => {
    render(
      <LoCContext.Provider value={Big(5)}>
        <LaptopClicker />
      </LoCContext.Provider>
    );

    const clickerImage = screen.getByAltText(/computer clicker button/i);
    expect(clickerImage).toBeInTheDocument();
  });

  test("calls LoCDispatch on click with { type: 'increase', amount: Big(1) }", async () => {
    const mockDispatch = jest.fn();
    useLoCDispatch.mockReturnValue(mockDispatch);

    render(
      <LoCContext.Provider value={Big(10)}>
        <LaptopClicker />
      </LoCContext.Provider>
    );

    const clickerImage = screen.getByAltText(/computer clicker button/i);
    await userEvent.click(clickerImage);
    ``;
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "increase",
      amount: Big(1),
    });
  });
});
