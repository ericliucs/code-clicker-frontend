import { Howl } from "howler";

import backgroundMusic from "../assets/sounds/background-music.mp3"
import keyboardSound from "../assets/sounds/keyboard-click.mp3";
import eurekaMomentSound from "../assets/sounds/eureka-moment.mp3"
import upgradeSound from "../assets/sounds/upgrade.mp3"

class SoundManager {
  constructor() {
    this.settings = {
      enabled: true,
      volume: 1,
      musicEnabled: true,
      musicVolume: 0.5
    }

    this.sounds = {
      click: new Howl({
        src: [keyboardSound],
        volume: 0.7,
        preload: true
      }),
      eurekaMoment: new Howl({
        src: [eurekaMomentSound],
        volume: 0.7,
        preload: true
      }),
      upgrade: new Howl({
        src: [upgradeSound],
        volume: 0.7,
        preload: true
      })
    }
    
    this.music = new Howl({
      src: [backgroundMusic],
      volume: this.settings.musicVolume,
      loop: true,
      preload: true,
      html5: true // This helps with longer files
    });

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
        this.setMusicVolume(this.settings.musicVolume);
        this.setMusicEnabled(this.settings.musicEnabled);
      } catch (error) {
        console.error('Error loading sound settings:', error);
      }
    }
    return this;
  }

  play(sound, rateVariation = null) {
    if (!this.settings.enabled || !this.sounds[sound]) {
      return;
    }

    const currentSound = this.sounds[sound];

    if (rateVariation !== null) {
      currentSound.rate(rateVariation);
    }

    currentSound.play();
  }

  playWithRandomPitch(soundName, minRate = 0.65, maxRate = 1.35) {
    if (!this.settings.enabled || !this.sounds[soundName]) {
      return;
    }

    const pitchVariation = minRate + Math.random() * (maxRate - minRate);
    this.play(soundName, pitchVariation);
  }

  stop(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].stop();
    }
  }
  
  playMusic() {
    if (this.settings.musicEnabled && !this.music.playing()) {
      this.music.play();
    }
  }

  stopMusic() {
    if (this.music.playing()) {
      this.music.stop();
    }
  }

  pauseMusic() {
    if (this.music.playing()) {
      this.music.pause();
    }
  }
  
  setVolume(volume) {
    this.settings.volume = volume;
    
    Object.values(this.sounds).forEach(sound => {
      sound.volume(volume);
    });

    this.saveSettings();
  }

  setMusicVolume(volume) {
    this.settings.musicVolume = volume;
    this.music.volume(volume);
    this.saveSettings();
  }

  setEnabled(enabled) {
    this.settings.enabled = enabled;

    // Mute/unmute all sound effects
    Object.values(this.sounds).forEach(sound => {
      sound.mute(!enabled);
    });

    this.saveSettings();
  }

  setMusicEnabled(enabled) {
    this.settings.musicEnabled = enabled;

    if (enabled) {
      this.playMusic();
    } else {
      this.pauseMusic();
    }

    this.saveSettings();
  }

  saveSettings() {
    localStorage.setItem('soundSettings', JSON.stringify(this.settings));
  }
}

const soundManager = new SoundManager();

export default soundManager;