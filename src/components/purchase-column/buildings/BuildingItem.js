import { useState } from "react";
import { useBuildingsDispatch, calculatePrice } from "../../contexts/BuildingsContext";
import { useLoC } from "../../contexts/LoCContext";
import numeral from "numeral";

export default function BuildingItem({ building }) {
  const LoC = useLoC();
  const { purchaseBuilding } = useBuildingsDispatch();
  const [showTooltip, setShowTooltip] = useState(false);
  const price = calculatePrice(building);
  const canAfford = LoC.gte(price);
  const formattedPrice = numeral(price.toString()).format("0,0");
  const formattedProduction = numeral(building.baseProduction.toString()).format("0,0.0");
  const formattedTotalProduction = numeral(building.baseProduction.times(building.count).toString()).format("0,0.0");
  
  return (
    <div 
      className={`relative group p-2 border-2 rounded ${canAfford ? 'hover:border-green-700 cursor-pointer' : 'opacity-70'}`}
      onClick={() => canAfford && purchaseBuilding(building.id)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-center">
        <img 
          src={building.src} 
          alt={building.alt} 
          className="w-16 h-16 p-1"
        />
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">{building.name}</h3>
            <span className="bg-gray-900 px-3 py-1 rounded">{building.count}</span>
          </div>
          <p className={`mt-1 ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
            {formattedPrice} LoC
          </p>
        </div>
      </div>
      
      {showTooltip && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 p-2 bg-gray-900 rounded text-sm min-w-52 z-[500]">
          <p>{building.description}</p>
          <p className="mt-1">Currently producing: {formattedTotalProduction} LoC/s</p>
          <p className="mt-1">Each produces: {formattedProduction} LoC/s</p>
        </div>
      )}
    </div>
  );
}