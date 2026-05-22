// Helper per la generazione sintetica di effetti sonori retrò tramite la Web Audio API nativa.
// Evita il caricamento di file statici pesanti ed è compatibile al 100% offline per la PWA.

class SoundEffectsManager {
    private ctx: AudioContext | null = null;
    private enabled: boolean = true;

    private initContext() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return this.ctx;
    }

    public setEnabled(enabled: boolean) {
        this.enabled = enabled;
    }

    public isEnabled(): boolean {
        return this.enabled;
    }

    // Suono di click metallico e leggero per i bottoni
    public playClick() {
        if (!this.enabled) return;
        try {
            const ctx = this.initContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(1200, ctx.currentTime);
            // Veloce decrescita di frequenza per dare l'effetto "click"
            osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        } catch (e) {
            console.error("Impossibile riprodurre click sound:", e);
        }
    }

    // Suono di tasto meccanico per la tastiera del terminale
    public playKeypress() {
        if (!this.enabled) return;
        try {
            const ctx = this.initContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            // Onda triangolare per un suono più morbido e cupo
            osc.type = "triangle";
            // Frequenza leggermente casuale per dare naturalezza alla battitura
            const freq = 120 + Math.random() * 40;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.07);
        } catch (e) {
            console.error("Impossibile riprodurre keypress sound:", e);
        }
    }

    // Suono di trasmissione cifrata inviata con successo
    public playSuccess() {
        if (!this.enabled) return;
        try {
            const ctx = this.initContext();
            const now = ctx.currentTime;

            // Tre toni ascendenti veloci
            const notes = [440, 554, 659]; // Accordo di La Maggiore
            notes.forEach((freq, index) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now + index * 0.1);

                gain.gain.setValueAtTime(0, now + index * 0.1);
                gain.gain.linearRampToValueAtTime(0.1, now + index * 0.1 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.1 + 0.18);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now + index * 0.1);
                osc.stop(now + index * 0.1 + 0.2);
            });
        } catch (e) {
            console.error("Impossibile riprodurre success sound:", e);
        }
    }

    // Suono di errore del terminale (Canale disturbato)
    public playFailure() {
        if (!this.enabled) return;
        try {
            const ctx = this.initContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(120, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.25);

            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.25);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.26);
        } catch (e) {
            console.error("Impossibile riprodurre failure sound:", e);
        }
    }
}

export const soundEffects = new SoundEffectsManager();
