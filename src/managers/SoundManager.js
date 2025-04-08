import { Howl, Howler } from "howler";

import keyboardSound from "../assets/sounds/keyboard-click.mp3";
import eurekaMomentSound from "../assets/sounds/eureka-moment.mp3"
import upgradeSound from "../assets/sounds/upgrade.mp3"

class SoundManager {
  constructor() {
    this.settings = {
      enabled: true,
      volume: 1
    }
    
    this.sounds = {
      click: new Howl({
        src: [keyboardSound],
        volume: 0.8,
        preload: true
      }),
        eurekaMoment: new Howl({
        src: [eurekaMomentSound],
        volume: 0.5,
        preload: true
      }),
      upgrade: new Howl({
        src: [upgradeSound],
        volume: 0.7,
        preload: true
      })
    }
    
    this.loadSettings();
  }
  
  loadSettings() {
    const savedSettings = localStorage.getItem('soundSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        this.settings = { ...this.settings, ...parsedSettings };
        this.setVolume(this.settings.volume);
        this.setEnabled(this.settings.enabled);
      } catch (error) {
        console.error('Error loading sound settings:', error);
      }
    }
    return this;
  }

  play(sound, rateVariation = null) {
    if (!this.settings.enabled || !this.sounds[sound]) return;

    const currentSound = this.sounds[sound];
    
    if (rateVariation !== null) {
      currentSound.rate(rateVariation);
    }

    currentSound.play();
  }

  playWithRandomPitch(soundName, minRate = 0.7, maxRate = 1.3) {
    if (!this.settings.enabled || !this.sounds[soundName]) return;

    const pitchVariation = minRate + Math.random() * (maxRate - minRate);
    this.play(soundName, pitchVariation);
  }
  
  stop(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].stop();
    }
  }
  
  setVolume(volume) {
    this.settings.volume = volume;
    Howler.volume(volume);
    this.saveSettings();
  }
  
  setEnabled(enabled) {
    this.settings.enabled = enabled;
    Howler.mute(!enabled);
    this.saveSettings();
  }
  
  saveSettings() {
    localStorage.setItem('soundSettings', JSON.stringify(this.settings));
  }
}

const soundManager = new SoundManager();

export default soundManager;
