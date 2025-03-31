import UpgradeButton from "./UpgradeButton";
import { useUpgrades } from "../../contexts/UpgradesContext";

export default function UpgradeSection() {
  const upgrades = useUpgrades();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2 h-48 border-4 border-indigo-600">
      {Array.from(upgrades).map((upgrade) => {
        if (!upgrade[1].purchased) {
          return (
            <UpgradeButton
              key={upgrade[0]}
              upgradeID={upgrade[0]}
              upgrade={upgrade[1]}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
