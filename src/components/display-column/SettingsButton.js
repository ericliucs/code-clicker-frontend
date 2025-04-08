import SoundSettings from "../settings/SoundSettings";
import { useState } from "react";

export default function SettingsButton() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  return <>
    <button
      className="mt-1 ml-4 p-0.5 border-2 rounded-sm hover:border-green-700"
      onClick={() => setIsSettingsModalOpen(true)}
    >
      Settings
    </button>
    
    {isSettingsModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-blue-950/80 z-99">
        <div className="bg-gray-800 p-4 rounded shadow-lg max-w-md w-full">
          <h2 className="text-lg font-bold mb-2">Game Settings</h2>
  
          <SoundSettings />
  
          {/* Add additional settings sections here */}
  
          <div className="mt-4">
            <button
              onClick={() => setIsSettingsModalOpen(false)}
              className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </>;
}