"use client";

import { Button } from "@/components/ui/Button";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useAudioStore } from "@/lib/audioStore";

export function AudioPlayer() {
    const { 
        tracks, 
        currentTrackIndex, 
        isPlaying, 
        isMuted, 
        setIsPlaying, 
        setIsMuted,
        setCurrentTrackIndex,
        nextTrack,
        prevTrack
    } = useAudioStore();

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className="w-full bg-brand-dark/80 backdrop-blur-md border border-brand-red/20 rounded-lg p-6 shadow-[0_0_30px_rgba(185,54,59,0.2)]" role="region" aria-label="Audio Player">
            <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-white font-orbitron mb-1">{tracks[currentTrackIndex].title}</h3>
                <p className="text-brand-red text-sm uppercase tracking-widest">FALCE e MACELLO</p>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-brand-light/60 font-mono w-16" aria-label="Audio in riproduzione">
                    {isPlaying ? "ON" : "OFF"}
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={prevTrack}
                        aria-label="Traccia precedente"
                    >
                        <SkipBack className="w-6 h-6" />
                    </Button>

                    <Button
                        variant="primary"
                        size="lg"
                        className="rounded-full w-16 h-16 !p-0 flex items-center justify-center"
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Metti in pausa" : "Riproduci"}
                    >
                        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={nextTrack}
                        aria-label="Prossima traccia"
                    >
                        <SkipForward className="w-6 h-6" />
                    </Button>
                </div>

                <div className="flex items-center gap-2 w-16 justify-end">
                    <Button variant="ghost" size="sm" onClick={toggleMute} className="px-2" aria-label={isMuted ? "Attiva audio" : "Disattiva audio"}>
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
