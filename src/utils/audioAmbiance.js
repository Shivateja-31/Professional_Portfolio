// Subtle, high-end cinematic soundscape generator using Web Audio API
// Clean, low-frequency atmospheric drone and tactile UI click feedback

class CinematicAudioSystem {
  constructor() {
    this.ctx = null;
    this.droneGain = null;
    this.isPlaying = false;
    this.oscillators = [];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startDrone() {
    try {
      this.init();
      if (!this.ctx || this.isPlaying) return;

      const now = this.ctx.currentTime;
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.0001, now);
      // Very soft, deep cinematic sub-ambiance (55Hz and 110Hz harmonics)
      this.droneGain.gain.exponentialRampToValueAtTime(0.045, now + 3);

      // Lowpass filter for warm, dark cinematic texture
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);
      filter.Q.setValueAtTime(2.5, now);

      // Oscillator 1: 55Hz sub drone (A1 note)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, now);

      // Oscillator 2: 55.4Hz slight detune for slow cinematic beating
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(55.35, now);

      // Connect nodes
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);

      this.oscillators = [osc1, osc2];
      this.isPlaying = true;
    } catch (err) {
      console.warn('Audio ambiance initialized silently:', err);
    }
  }

  stopDrone() {
    if (!this.ctx || !this.isPlaying || !this.droneGain) return;
    try {
      const now = this.ctx.currentTime;
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch (_) {}
        });
        this.oscillators = [];
        this.isPlaying = false;
      }, 1300);
    } catch (err) {
      this.isPlaying = false;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stopDrone();
      return false;
    } else {
      this.startDrone();
      return true;
    }
  }

  // Soft tactile tick for button clicks or hover reveals
  playTactileTick(freq = 800) {
    if (!this.isPlaying || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.04);
      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    } catch (_) {}
  }
}

export const cinematicAudio = new CinematicAudioSystem();

