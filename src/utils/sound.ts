// Simple sound generator using Web Audio API
export class SoundEffect {
    private audioContext: AudioContext | null = null;

    private initContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        return this.audioContext;
    }

    playThreatDetected(severity: 'low' | 'high') {
        const ctx = this.initContext();
        if (!ctx) return;

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = severity === 'high' ? 'sawtooth' : 'sine';
        oscillator.frequency.setValueAtTime(severity === 'high' ? 440 : 330, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.3);
    }

    playSafeTraffic() {
        const ctx = this.initContext();
        if (!ctx) return;

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5

        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.2);
    }
}

export const soundFX = new SoundEffect();