import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useAudioStore } from "@/lib/audioStore";
import AudioVisualizer from "./AudioVisualizer";
import { soundEffects } from "@/lib/soundEffects";
import { useEffect } from "react";

export default function FloatingPlayer() {
    const {
        tracks,
        currentTrackIndex,
        isPlaying,
        isMuted,
        currentTime,
        duration,
        soundEffectsEnabled,
        setIsPlaying,
        setIsMuted,
        nextTrack,
        prevTrack,
        setSoundEffectsEnabled
    } = useAudioStore();

    // Sincronizziamo lo stato degli effetti sonori con il manager
    useEffect(() => {
        soundEffects.setEnabled(soundEffectsEnabled);
    }, [soundEffectsEnabled]);

    const togglePlay = () => {
        soundEffects.playClick();
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        soundEffects.playClick();
        setIsMuted(!isMuted);
    };

    const toggleSounds = () => {
        const nextState = !soundEffectsEnabled;
        setSoundEffectsEnabled(nextState);
        soundEffects.setEnabled(nextState);
        // Riproduciamo subito il click se attivo per dare feedback
        if (nextState) {
            setTimeout(() => soundEffects.playSuccess(), 50);
        }
    };

    const handleNext = () => {
        soundEffects.playClick();
        nextTrack();
    };

    const handlePrev = () => {
        soundEffects.playClick();
        prevTrack();
    };

    const currentTrack = tracks[currentTrackIndex];

    // Calcolo percentuale di avanzamento
    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Helper per formattare i secondi in mm:ss
    const formatTime = (time: number) => {
        if (isNaN(time) || time === null) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <AnimatePresence>
            {currentTrack && (
                <motion.div
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 120, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-0 pointer-events-none"
                >
                    <div className="max-w-6xl mx-auto bg-brand-dark-950/90 backdrop-blur-xl border border-brand-red/20 rounded-lg shadow-[0_0_35px_rgba(204,0,0,0.3)] pointer-events-auto overflow-hidden relative">
                        {/* Sottile barra di avanzamento rossa superiore */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10" aria-hidden="true">
                            <div 
                                className="h-full bg-brand-red-neon shadow-[0_0_10px_#ff1a1a]" 
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>

                        <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                            {/* Info brano e copertina */}
                            <div className="flex items-center gap-4 w-full md:w-[30%]">
                                <div className="relative flex-shrink-0">
                                    {/* Copertina rotante a vinile */}
                                    <div 
                                        className={`w-14 h-14 rounded-full overflow-hidden border border-brand-red/30 shadow-lg ${isPlaying ? "animate-[spin_10s_linear_infinite]" : ""}`}
                                    >
                                        <img 
                                            src="/images/the-hopeful-children-ep-cover.png" 
                                            alt="Copertina" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Centro del vinile dorato */}
                                    <div className="absolute inset-0 m-auto w-3 h-3 bg-brand-gold rounded-full border border-black" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-white font-bold font-orbitron text-sm truncate uppercase tracking-wide">
                                        {currentTrack.title}
                                    </h4>
                                    <p className="text-brand-red text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
                                        FALCE e MACELLO
                                    </p>
                                </div>
                            </div>

                            {/* Canvas visualizzatore di frequenze al centro (solo su schermi grandi) */}
                            <div className="hidden lg:block w-[35%] px-4">
                                <AudioVisualizer />
                            </div>

                            {/* Controlli Audio */}
                            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-[35%]">
                                {/* Controlli tempo traccia */}
                                <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-brand-light/40">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>/</span>
                                    <span>{formatTime(duration)}</span>
                                </div>

                                {/* Bottoni Skip/Play */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handlePrev}
                                        className="text-brand-light/60 hover:text-brand-red transition-colors p-1.5 rounded cursor-pointer"
                                        aria-label="Traccia precedente"
                                    >
                                        <SkipBack className="w-5 h-5" />
                                    </button>

                                    <button
                                        onClick={togglePlay}
                                        className="bg-brand-red text-white hover:bg-brand-red-neon w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer glow-red shadow-lg active:scale-95"
                                        aria-label={isPlaying ? "Metti in pausa" : "Riproduci"}
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-5 h-5" />
                                        ) : (
                                            <Play className="w-5 h-5 ml-0.5" />
                                        )}
                                    </button>

                                    <button
                                        onClick={handleNext}
                                        className="text-brand-light/60 hover:text-brand-red transition-colors p-1.5 rounded cursor-pointer"
                                        aria-label="Prossima traccia"
                                    >
                                        <SkipForward className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Controlli Volume e Effetti Sonori */}
                                <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                                    {/* Mute */}
                                    <button
                                        onClick={toggleMute}
                                        className="text-brand-light/60 hover:text-brand-red transition-colors p-1"
                                        aria-label={isMuted ? "Attiva audio" : "Disattiva audio"}
                                    >
                                        {isMuted ? (
                                            <VolumeX className="w-5 h-5 text-brand-red" />
                                        ) : (
                                            <Volume2 className="w-5 h-5" />
                                        )}
                                    </button>

                                    {/* Sound Effects Toggle (Geek/Retrò) */}
                                    <button
                                        onClick={toggleSounds}
                                        className={`px-2 py-1 rounded text-[10px] font-mono font-bold tracking-widest border transition-all cursor-pointer uppercase ${
                                            soundEffectsEnabled
                                                ? "bg-brand-gold/10 text-brand-gold border-brand-gold/30 shadow-[0_0_8px_rgba(255,215,0,0.2)]"
                                                : "bg-white/5 text-brand-light/30 border-white/10"
                                        }`}
                                        title={soundEffectsEnabled ? "Effetti sonori attivi" : "Effetti sonori disattivi"}
                                    >
                                        FX
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
