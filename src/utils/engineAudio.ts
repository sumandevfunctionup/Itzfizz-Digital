"use client";

class EngineSynthesizer {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isRunning: boolean = false;
  private targetFreq: number = 55;
  private currentFreq: number = 55;
  private animFrameId: number | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);

      // Low pass filter for engine exhaust resonance
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(260, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(4.0, this.ctx.currentTime);

      // Primary engine rumble oscillator (sawtooth)
      this.osc = this.ctx.createOscillator();
      this.osc.type = "sawtooth";
      this.osc.frequency.setValueAtTime(55, this.ctx.currentTime);

      // Sub-bass tone oscillator (triangle)
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = "triangle";
      this.subOsc.frequency.setValueAtTime(27.5, this.ctx.currentTime);

      // Wire nodes
      this.osc.connect(this.filter);
      this.subOsc.connect(this.filter);
      this.filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc.start();
      this.subOsc.start();
      this.isRunning = true;
      this.startFreqLoop();
    } catch {
      // AudioContext unavailable or restricted
    }
  }

  private startFreqLoop() {
    const loop = () => {
      if (this.ctx && this.osc && this.subOsc && this.filter) {
        // Smooth interpolation
        this.currentFreq += (this.targetFreq - this.currentFreq) * 0.12;
        this.osc.frequency.setValueAtTime(this.currentFreq, this.ctx.currentTime);
        this.subOsc.frequency.setValueAtTime(this.currentFreq * 0.5, this.ctx.currentTime);
        this.filter.frequency.setValueAtTime(this.currentFreq * 4.5 + 150, this.ctx.currentTime);
      }
      this.animFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  public setThrottle(normalizedVelocity: number) {
    if (!this.ctx || !this.isRunning) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    // Speed range: 55Hz idle to 320Hz redline
    const clamped = Math.max(0, Math.min(normalizedVelocity, 1));
    this.targetFreq = 55 + clamped * 265;

    if (this.gainNode) {
      const targetGain = 0.04 + clamped * 0.12;
      this.gainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
  }

  public stop() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
    this.isRunning = false;
  }
}

export const engineSound = new EngineSynthesizer();
