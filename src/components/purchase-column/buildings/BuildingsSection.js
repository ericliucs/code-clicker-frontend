import { useBuildings } from "../../contexts/BuildingsContext";
import BuildingItem from "./BuildingItem";

export default function BuildingsSection() {
  const buildings = useBuildings();

  return (
    <div className="mt-4 p-2 border-4 border-indigo-600 overflow-y-auto max-h-[500px]">
      <h2 className="text-xl font-bold mb-4">Buildings</h2>
      <div className="space-y-2">
        {buildings.map((building) => (
          <BuildingItem
            key={building.id}
            building={building}
          />
        ))}
      </div>
    </div>
  );
}