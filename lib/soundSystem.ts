'use client';

export class SoundSystem {
  private static audioContext: AudioContext | null = null;
  private static isInitialized = false;
  private static muted = false;
  private static soundIndex = 0;
  private static lastSoundTime = 0;

  static init() {
    if (typeof window === 'undefined') return;
    if (this.isInitialized) return;
    
    try {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
        this.isInitialized = true;
      }
    } catch (error) {
      console.warn('AudioContext not available:', error);
    }
  }

  static setMuted(muted: boolean) {
    this.muted = muted;
  }

  static isMuted() {
    return this.muted;
  }

  static ensureAudioContext() {
    if (!this.audioContext) {
      this.init();
    }
    return this.audioContext;
  }

  // Hacker-style access granted sound
  static playHackerAccess() {
    if (this.muted) return;
    const audioContext = this.ensureAudioContext();
    if (!audioContext) return;

    try {
      // First beep - low to high sweep
      this.frequencySweep(200, 800, 150, 0.2);
      
      // Second beep - high pitch confirm
      setTimeout(() => this.frequencySweep(800, 1200, 100, 0.15), 180);
      
      // Third beep - double tone secured
      setTimeout(() => {
        this.doubleFrequency(600, 900, 120, 0.2);
      }, 320);
    } catch (error) {
      console.warn('Error playing hacker access:', error);
    }
  }

  // Frequency sweep effect
  private static frequencySweep(
    startFreq: number,
    endFreq: number,
    duration: number,
    volume: number
  ) {
    const audioContext = this.ensureAudioContext();
    if (!audioContext) return;
    if (this.muted) return;

    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.type = 'square';

      // Frequency sweep
      oscillator.frequency.setValueAtTime(startFreq, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        endFreq,
        audioContext.currentTime + duration / 1000
      );

      // Volume envelope
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration / 1000
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.warn('Error in frequency sweep:', error);
    }
  }

  // Double frequency tone
  private static doubleFrequency(
    freq1: number,
    freq2: number,
    duration: number,
    volume: number
  ) {
    const audioContext = this.ensureAudioContext();
    if (!audioContext) return;
    if (this.muted) return;

    try {
      // First oscillator
      const osc1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      
      osc1.connect(gain1);
      gain1.connect(audioContext.destination);
      osc1.type = 'square';
      osc1.frequency.value = freq1;
      gain1.gain.setValueAtTime(volume * 0.5, audioContext.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

      // Second oscillator
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      osc2.type = 'sine';
      osc2.frequency.value = freq2;
      gain2.gain.setValueAtTime(volume * 0.5, audioContext.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

      osc1.start(audioContext.currentTime);
      osc1.stop(audioContext.currentTime + duration / 1000);
      osc2.start(audioContext.currentTime);
      osc2.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.warn('Error in double frequency:', error);
    }
  }

  // Rotating hacker sounds (cycles every 1 second)
  static playRotatingHackerSound() {
    if (this.muted) return;
    const now = Date.now();
    
    // Auto-rotate sound every 1 second
    if (now - this.lastSoundTime < 1000) return;
    
    this.lastSoundTime = now;
    this.soundIndex = (this.soundIndex + 1) % 5;

    const audioContext = this.ensureAudioContext();
    if (!audioContext) return;

    try {
      switch (this.soundIndex) {
        case 0:
          // Ascending glitch
          this.frequencySweep(300, 900, 80, 0.2);
          break;
        case 1:
          // Descending scan
          this.frequencySweep(1000, 200, 100, 0.18);
          break;
        case 2:
          // Digital secure
          this.doubleFrequency(550, 750, 90, 0.2);
          break;
        case 3:
          // System ping
          this.frequencySweep(400, 1100, 110, 0.22);
          break;
        case 4:
          // Network access
          this.doubleFrequency(680, 940, 85, 0.2);
          break;
      }
    } catch (error) {
      console.warn('Error playing rotating sound:', error);
    }
  }

  // Click sound
  static playClick() {
    if (this.muted) return;
    const audioContext = this.ensureAudioContext();
    if (!audioContext) return;

    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.type = 'square';
      osc.frequency.value = 800;
      
      gain.gain.setValueAtTime(0.15, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      
      osc.start(audioContext.currentTime);
      osc.stop(audioContext.currentTime + 0.05);
    } catch (error) {
      console.warn('Error playing click:', error);
    }
  }

  // Success multi-tone
  static playSuccess() {
    if (this.muted) return;
    this.frequencySweep(600, 900, 150, 0.2);
    setTimeout(() => this.frequencySweep(800, 1100, 150, 0.2), 120);
    setTimeout(() => this.doubleFrequency(900, 1200, 100, 0.25), 280);
  }

  // Loading tick
  static playLoadingTick() {
    if (this.muted) return;
    this.frequencySweep(400, 600, 60, 0.15);
  }

  // Chime sound
  static playChime() {
    if (this.muted) return;
    this.doubleFrequency(523, 784, 200, 0.2);
    setTimeout(() => this.doubleFrequency(659, 988, 200, 0.2), 150);
  }

  // Notification sound
  static playNotification() {
    if (this.muted) return;
    this.frequencySweep(600, 800, 100, 0.18);
    setTimeout(() => this.frequencySweep(700, 900, 100, 0.18), 80);
  }

  // Section transition with hacker vibe
  static playSectionTransition() {
    if (this.muted) return;
    this.frequencySweep(300, 700, 120, 0.2);
    setTimeout(() => this.frequencySweep(500, 900, 100, 0.18), 100);
    setTimeout(() => this.doubleFrequency(700, 1000, 80, 0.2), 240);
  }
}
