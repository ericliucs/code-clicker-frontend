import UpgradeSection from "./upgrades/UpgradeSection";
import BuildingsSection from "./buildings/BuildingsSection";

export default function PurchaseColumn() {
  return (
    <div className="basis-1/3">
      <UpgradeSection />
      <BuildingsSection />
    </div>
  );
}