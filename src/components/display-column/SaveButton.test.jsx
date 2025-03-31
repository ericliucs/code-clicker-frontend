import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SaveButton from "./SaveButton";

jest.mock("../contexts/LoCContext", () => ({
  useLoC: () => "123",
}));

jest.mock("../contexts/UpgradesContext", () => ({
  useUpgrades: () =>
    new Map([
      [1, { name: "Watch YouTube Video", purchased: true, effects: [] }],
    ]),
}));

describe("SaveButton", () => {
  test("modal opens and closes without duplicates", async () => {
    render(<SaveButton />);

    // Check that modal doesn't start open
    expect(screen.queryByRole("heading", { name: /Save Data/i })).toBeNull();

    // Open modal
    await userEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(
      screen.getByRole("heading", { name: /save data/i })
    ).toBeInTheDocument();

    // Close modal
    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    // Verify modal is gone
    expect(screen.queryByRole("heading", { name: /save data/i })).toBeNull();
  });
});
