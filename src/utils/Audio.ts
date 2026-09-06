// src/utils/audio.ts
class SoundEffects {
  private ctx: AudioContext | null = null;
  public volume: number = 0.1; // Dropped to 1% volume for ultra-quiet playback

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Soft, warm, low-frequency wooden pop for Habits
  playHabitClick() {
    this.init();
    if (!this.ctx || this.volume === 0) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';

    osc.frequency.exponentialRampToValueAtTime(329.63, this.ctx.currentTime + 0.04); 


    gain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  // Soft, subtle chime for Dailies
  playDailyComplete() {
    this.init();
    if (!this.ctx || this.volume === 0) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Deep notes 
    osc.frequency.setValueAtTime(261.63, now);
    osc.frequency.setValueAtTime(392.00, now + 0.05);

    gain.gain.setValueAtTime(this.volume * 0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(now + 0.15);
  }
}

export const sfx = new SoundEffects();