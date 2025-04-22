import { createContext, useContext, useReducer } from "react";
import Big from "big.js";
import { useLoC, useLoCDispatch } from "./LoCContext";
import { useLoCPerSecondDispatch} from "./LoCPerSecondContext";
import soundManager from "../../managers/SoundManager";

export const BuildingsContext = createContext([]);
export const BuildingsDispatchContext = createContext(null);

const initialBuildings = [
  {
    id: 1,
    name: "Junior Developer",
    description: "A fresh computer science graduate eager to prove themselves. Generates 0.1 LoC/s.",
    basePrice: Big(15),
    baseProduction: Big(0.1),
    count: 0,
    src: "https://via.placeholder.com/64",
    alt: "Junior Developer building",
  },
  {
    id: 2,
    name: "Senior Developer",
    description: "An experienced programmer who's seen it all. Generates 1 LoC/s.",
    basePrice: Big(100),
    baseProduction: Big(1),
    count: 0,
    src: "https://via.placeholder.com/64",
    alt: "Senior Developer building",
  },
  {
    id: 3,
    name: "Tech Lead",
    description: "Guides the team and makes architectural decisions. Generates 8 LoC/s.",
    basePrice: Big(1100),
    baseProduction: Big(8),
    count: 0,
    src: "https://via.placeholder.com/64",
    alt: "Tech Lead building",
  },
  {
    id: 4,
    name: "AI Assistant",
    description: "Helps with code generation and refactoring. Generates 47 LoC/s.",
    basePrice: Big(12000),
    baseProduction: Big(47),
    count: 0,
    src: "https://via.placeholder.com/64",
    alt: "AI Assistant building",
  },
  {
    id: 5,
    name: "Quantum Developer",
    description: "Operates in multiple states simultaneously. Generates 260 LoC/s.",
    basePrice: Big(130000),
    baseProduction: Big(260),
    count: 0,
    src: "https://via.placeholder.com/64",
    alt: "Quantum Developer building",
  },
];

export const calculatePrice = (building) => {
  const INCREASE_PER_PURCHASE = 1.15;
  return building.basePrice.times(Big(INCREASE_PER_PURCHASE).pow(building.count));
};

export const calculateTotalProduction = (buildings) => {
  return buildings.reduce((total, building) => {
    return total.plus(building.baseProduction.times(building.count));
  }, Big(0));
};

export function BuildingsProvider({ children }) {
  const LoC = useLoC();
  const LoCDispatch = useLoCDispatch();
  const LoCPerSecondDispatch = useLoCPerSecondDispatch();

  const [buildings, dispatch] = useReducer(buildingsReducer, initialBuildings);

  function purchaseBuilding(buildingId) {
    const building = buildings.find((building) => building.id === buildingId);
    if (!building) return;

    const price = calculatePrice(building);

    if (LoC.gte(price)) {
      soundManager.play("upgrade");

      const incrementalProduction = building.baseProduction;

      dispatch({ type: "purchase", buildingId });

      LoCDispatch({ type: "decrease", amount: price });

      LoCPerSecondDispatch({
        type: "increase",
        amount: incrementalProduction,
      });
    }
  }

  function setAllBuildings(buildingsData) {
    dispatch({ type: "set", buildings: buildingsData });
  }

  return (
    <BuildingsContext.Provider value={buildings}>
      <BuildingsDispatchContext.Provider value={{ purchaseBuilding, setAllBuildings }}>
        {children}
      </BuildingsDispatchContext.Provider>
    </BuildingsContext.Provider>
  );
}

function buildingsReducer(state, action) {
  switch (action.type) {
    case "purchase":
      return state.map((building) => {
        if (building.id === action.buildingId) {
          return { ...building, count: building.count + 1 };
        }
        return building;
      });
    case "set":
      return action.buildings;
    default:
      return state;
  }
}

export function useBuildings() {
  return useContext(BuildingsContext);
}

export function useBuildingsDispatch() {
  return useContext(BuildingsDispatchContext);
}