import UpgradeSection from "./upgrades/UpgradeSection";
import HelpersSection from "./helpers/HelpersSection";

export default function PurchaseColumn() {
  return (
    <div className={"basis-1/3"}>
      <UpgradeSection />
      <HelpersSection />
    </div>
  );
}
