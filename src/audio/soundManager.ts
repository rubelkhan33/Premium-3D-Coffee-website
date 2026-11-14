/**
 * Web Audio API Ambient Sound Synthesizer & Tactile Audio Engine
 * Synthesizes warm room tone, subtle café hum, ceramic clicks, grinder rumble, and steam hiss.
 * Strictly opt-in (Default: OFF)
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private ambientGain: GainNode | null = null;
  private brownNoiseNode: AudioNode | null = null;
  private humOsc: OscillatorNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    if (this.isEnabled) {
      this.stopAmbient();
      this.isEnabled = false;
    } else {
      this.initContext();
      this.startAmbient();
      this.isEnabled = true;
    }
    return this.isEnabled;
  }

  public getSoundState(): boolean {
    return this.isEnabled;
  }

  private startAmbient() {
    if (!this.ctx) return;

    try {
      // Master ambient gain with smooth gradual fade in
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.038, this.ctx.currentTime + 2.0);
      masterGain.connect(this.ctx.destination);
      this.ambientGain = masterGain;

      // 1. Warm Brown Noise buffer for restful café acoustic room tone
      const bufferSize = this.ctx.sampleRate * 3;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 2.2;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Warm low-pass filter (subtle acoustic insulation)
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(240, this.ctx.currentTime);
      lowpass.Q.setValueAtTime(1.2, this.ctx.currentTime);

      whiteNoise.connect(lowpass);
      lowpass.connect(masterGain);
      whiteNoise.start();
      this.brownNoiseNode = whiteNoise;

      // 2. Subtle 55Hz warm espresso machine boiler harmonic hum
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.006, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      this.humOsc = osc;
    } catch {
      // Audio autoplay gracefully handled
    }
  }

  private stopAmbient() {
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        try {
          if (this.brownNoiseNode && 'stop' in this.brownNoiseNode) {
            (this.brownNoiseNode as AudioScheduledSourceNode).stop();
          }
          if (this.humOsc) {
            this.humOsc.stop();
          }
        } catch {
          // cleanup safe
        }
      }, 600);
    }
  }

  // Soft ceramic / tactile interaction micro-sound
  public playClick(pitch = 540) {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.45, now + 0.07);

      gain.gain.setValueAtTime(0.018, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Fail silently
    }
  }

  // Soft ceramic cup placement resonance
  public playCupThump() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.14);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Fail silently
    }
  }

  // Delicate espresso pre-infusion steam hiss
  public playSteamHiss() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.015;
      }

      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.Q.setValueAtTime(1.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.02, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      source.start(now);
      source.stop(now + 0.35);
    } catch {
      // Fail silently
    }
  }
}

export const soundManager = new SoundManager();
