import { useUpgradesDispatch } from "../../contexts/UpgradesContext";
import UpgradeTooltip from "./UpgradeTooltip";

export default function UpgradeButton({ upgradeID, upgrade }) {
  const { purchaseUpgrade } = useUpgradesDispatch();

  return (
    <span
      className="relative group flex items-center justify-center w-full h-16 border-2 hover:border-green-700"
      onClick={() => purchaseUpgrade(upgradeID)}
    >
      <img
        src={upgrade.src}
        alt={upgrade.alt}
        className="max-h-full max-w-full p-1"
      />
      <UpgradeTooltip
        upgradeTitle={upgrade.name}
        upgradeCost={upgrade.cost.toString()}
        upgradeDescription={upgrade.description}
      />
    </span>
  );
}
