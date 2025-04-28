import { useLoCDispatch } from "../contexts/LoCContext";
import { useLoCPerSecondDispatch } from "../contexts/LoCPerSecondContext";
import { useLoCOnClickDispatch } from "../contexts/LoCOnClickContext";
import { useState } from "react";
import { loadGame } from "../../services/api";
import { useUpgradesDispatch } from "../contexts/UpgradesContext";
import { useBuildingsDispatch } from "../contexts/BuildingsContext";
import Big from "big.js";

export default function LoadButton() {
  const LoCDispatch = useLoCDispatch();
  const LoCPerSecondDispatch = useLoCPerSecondDispatch();
  const LoCOnClickDispatch = useLoCOnClickDispatch();
  const upgradesDispatch = useUpgradesDispatch();
  const buildingsDispatch = useBuildingsDispatch();

  const [isModalShowing, setIsModalShowing] = useState(false);
  const [loadStatus, setLoadStatus] = useState("");
  const [loadError, setLoadError] = useState("");

  const handleLoad = async () => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      setLoadError("Please log in to load your saved game");
      setIsModalShowing(true);
      return;
    }

    try {
      setLoadStatus("Loading...");
      setLoadError("");
      setIsModalShowing(true);

      const response = await loadGame();
      const saveData = response.data;

      console.log("Loaded save data:", saveData);

      LoCDispatch({
        type: "set",
        amount: Big(saveData.loc),
      });

      LoCPerSecondDispatch({
        type: "set",
        amount: Big(saveData.locPerSecond),
      });

      LoCOnClickDispatch({
        type: "set",
        amount: Big(saveData.locPerClick),
      });

      // Handle upgrades data
      if (Array.isArray(saveData.upgrades)) {
        upgradesDispatch.setAllUpgrades(saveData.upgrades);
      } else {
        console.error("Upgrades data is not an array:", saveData.upgrades);
      }

      // Handle buildings data with proper conversion to Big.js
      if (Array.isArray(saveData.buildings)) {
        const convertedBuildings = saveData.buildings.map(building => ({
          ...building,
          basePrice: Big(building.basePrice || 0),
          baseProduction: Big(building.baseProduction || 0)
        }));

        buildingsDispatch.setAllBuildings(convertedBuildings);
        console.log("Converted buildings:", convertedBuildings);
      } else {
        console.error("Buildings data is not an array:", saveData.buildings);
      }

      setLoadStatus("Game loaded successfully!");
    } catch (err) {
      console.error("Load error:", err);
      setLoadError(err.response?.data?.error || "Failed to load game");
      setLoadStatus("");
    }
  };

  return (
    <>
      <button
        className="mt-1 ml-4 p-0.5 border-2 rounded-sm hover:border-green-700"
        onClick={handleLoad}
      >
        Load
      </button>

      {isModalShowing && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-950/80 z-99">
          <div className="bg-gray-800 p-4 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-2">Load Game</h2>

            {loadStatus && <p className="mb-2">{loadStatus}</p>}
            {loadError && <p className="mb-2 text-red-400">{loadError}</p>}

            {!localStorage.getItem("token") && (
              <p className="mb-2">
                To load your saved game, please log in to your account.
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