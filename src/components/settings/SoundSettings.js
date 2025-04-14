import { useState } from 'react';
import soundManager from '../../managers/SoundManager';

export default function SoundSettings() {
  const [volume, setVolume] = useState(soundManager.settings.volume);
  const [enabled, setEnabled] = useState(soundManager.settings.enabled);
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    soundManager.setVolume(newVolume);
  };
  
  const handleToggleSound = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    soundManager.setEnabled(newEnabled);
  };
  
  const playTestSound = () => {
    if (enabled) {
      soundManager.play("eurekaMoment");
    }
  };
  
  return (
    <div className="p-4 bg-gray-800 rounded shadow-lg">
      <h3 className="text-lg font-bold mb-2">Sound Settings</h3>
      
      <div className="mb-4">
        <label className="m-2 flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={enabled} 
            onChange={handleToggleSound}
            className="mr-2"
          />
          <span>Enable Sound Effects</span>
        </label>
      </div>
      
      <div className="mb-4">
        <label className="block mb-2">
          Volume: {Math.round(volume * 100)}%
        </label>
        <div className="flex items-center">
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={handleVolumeChange}
            onMouseUp={playTestSound}
            onTouchEnd={playTestSound}
            className="w-full"
            disabled={!enabled}
          />
        </div>
      </div>
      
      <button 
        onClick={playTestSound}
        disabled={!enabled}
        className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700 disabled:opacity-50"
      >
        Test Sound
      </button>
    </div>
  );
}