import { useState } from "react";
import { useLoC } from "../contexts/LoCContext";
import { useUpgrades } from "../contexts/UpgradesContext";
import { useGameVersion } from "../contexts/GameVersionContext";
import { useLoCPerSecond } from "../contexts/LoCPerSecondContext";
import { useLoCOnClick } from "../contexts/LoCOnClickContext";
import { useBuildings } from "../contexts/BuildingsContext";
import { saveGame } from "../../services/api";

export default function SaveButton() {
  const gameVersion = useGameVersion();
  const LoC = useLoC();
  const LoCPerSecond = useLoCPerSecond();
  const LoCOnClick = useLoCOnClick();
  const upgrades = useUpgrades();
  const buildings = useBuildings();

  const [isModalShowing, setIsModalShowing] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [saveError, setSaveError] = useState("");

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSaveError("Please log in to save your game");
      setIsModalShowing(true);
      return;
    }

    try {
      setSaveStatus("Saving...");
      setSaveError("");
      setIsModalShowing(true);

      // Convert upgrades Map to array of entries
      const upgradesArray = Array.from(upgrades.entries());

      // Convert buildings to a format that can be serialized safely
      const serializedBuildings = buildings.map(building => ({
        id: building.id,
        name: building.name,
        description: building.description,
        basePrice: building.basePrice.toString(),
        baseProduction: building.baseProduction.toString(),
        count: building.count,
        src: building.src,
        alt: building.alt
      }));

      console.log("Serialized buildings:", serializedBuildings);
      console.log("Upgrades array:", upgradesArray);

      await saveGame({
        loc: LoC.toString(),
        locPerSecond: LoCPerSecond.toString(),
        locPerClick: LoCOnClick.toString(),
        upgrades: upgradesArray,
        buildings: serializedBuildings,
        gameVersion,
      });

      setSaveStatus("Game saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
      setSaveError(err.response?.data?.error || "Failed to save game");
      setSaveStatus("");
    }
  };

  return (
    <>
      <button
        className="mt-1 ml-4 p-0.5 border-2 rounded-sm hover:border-green-700"
        onClick={handleSave}
      >
        Save
      </button>

      {isModalShowing && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-950/80 z-99">
          <div className="bg-gray-800 p-4 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-2">Save Game</h2>

            {saveStatus && <p className="mb-2">{saveStatus}</p>}
            {saveError && <p className="mb-2 text-red-400">{saveError}</p>}

            {!localStorage.getItem("token") && (
              <p className="mb-2">
                To save your game online and compete on the leaderboard, please
                log in or create an account.
              </p>
            )}

            <div className="mt-2">
              <button
                onClick={() => setIsModalShowing(false)}
                className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}