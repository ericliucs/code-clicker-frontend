// UpgradeButton.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("../../contexts/UpgradesContext", () => {
  const originalModule = jest.requireActual("../../contexts/UpgradesContext");
  return {
    ...originalModule,
    useUpgradesDispatch: jest.fn(),
  };
});

import { useUpgradesDispatch } from "../../contexts/UpgradesContext";
import UpgradeButton from "./UpgradeButton";

describe("UpgradeButton", () => {
  const mockPurchaseUpgrade = jest.fn();

  beforeEach(() => {
    mockPurchaseUpgrade.mockClear();

    useUpgradesDispatch.mockReturnValue({
      purchaseUpgrade: mockPurchaseUpgrade,
    });
  });

  test("renders upgrade image with given alt text", () => {
    render(
      <UpgradeButton
        upgradeID={42}
        upgrade={{
          name: "Test Upgrade",
          cost: "100",
          src: "/some/path.png",
          alt: "blreaaagh",
          description: "Test description",
        }}
      />
    );

    const img = screen.getByAltText(/blreaaagh/i);
    expect(img).toBeInTheDocument();
  });

  test("calls purchaseUpgrade with correct upgradeID when clicked", async () => {
    render(
      <UpgradeButton
        upgradeID={191919}
        upgrade={{
          name: "Test Upgrade",
          cost: "100",
          src: "/some/path.png",
          alt: "blreaaagh but TWO",
          description: "Test description electric boogaloo",
        }}
      />
    );

    const img = screen.getByAltText(/blreaaagh but TWO/i);

    await userEvent.click(img);

    expect(mockPurchaseUpgrade).toHaveBeenCalledTimes(1);
    expect(mockPurchaseUpgrade).toHaveBeenCalledWith(191919);
  });
});
