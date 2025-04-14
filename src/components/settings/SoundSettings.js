import { useState } from 'react';
import soundManager from '../../managers/SoundManager';

export default function SoundSettings() {
  const [volume, setVolume] = useState(soundManager.settings.volume);
  const [enabled, setEnabled] = useState(soundManager.settings.enabled);
  const [musicVolume, setMusicVolume] = useState(soundManager.settings.musicVolume);
  const [musicEnabled, setMusicEnabled] = useState(soundManager.settings.musicEnabled);

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

  const handleMusicVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setMusicVolume(newVolume);
    soundManager.setMusicVolume(newVolume);
  };

  const handleToggleMusic = () => {
    const newEnabled = !musicEnabled;
    setMusicEnabled(newEnabled);
    soundManager.setMusicEnabled(newEnabled);
  };

  const playTestSound = () => {
    if (enabled) {
      soundManager.play("eurekaMoment");
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded shadow-lg">
      <h3 className="text-lg font-bold mb-2">Sound Settings</h3>
      
      <div className="mt-4 border-b pb-4">
        <h4 className="font-bold">Sound Effects</h4>

        <div className="mb-4 mt-2">
          <label className="flex items-center cursor-pointer">
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
      
      <div className="mt-4">
        <h4 className="font-bold">Background Music</h4>

        <div className="mb-4 mt-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={musicEnabled}
              onChange={handleToggleMusic}
              className="mr-2"
            />
            <span>Enable Background Music</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Music Volume: {Math.round(musicVolume * 100)}%
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={musicVolume}
              onChange={handleMusicVolumeChange}
              className="w-full"
              disabled={!musicEnabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}