"use client";

import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { useAudioStore } from "@/lib/audioStore";

const GlobalAudioPlayer = () => {
    const audioContainerRef = useRef<HTMLDivElement>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    
    const { 
        tracks, 
        currentTrackIndex, 
        isPlaying, 
        isMuted, 
        volume,
        setIsPlaying,
        nextTrack
    } = useAudioStore();

    useEffect(() => {
        if (!audioContainerRef.current) return;

        const ws = WaveSurfer.create({
            container: audioContainerRef.current,
            height: 0, // Nascosto
            width: 0,
            waveColor: "transparent",
            progressColor: "transparent",
            mediaControls: false,
        });

        wavesurferRef.current = ws;

        ws.on("finish", () => {
            nextTrack();
        });

        return () => {
            ws.destroy();
        };
    }, []);

    // Sync state to WaveSurfer
    useEffect(() => {
        const ws = wavesurferRef.current;
        if (!ws) return;

        ws.load(tracks[currentTrackIndex].url);
        
        ws.once("ready", () => {
            if (isPlaying) {
                ws.play().catch(console.error);
            }
        });
    }, [currentTrackIndex, tracks]);

    useEffect(() => {
        const ws = wavesurferRef.current;
        if (!ws) return;

        if (isPlaying) {
            ws.play().catch(console.error);
        } else {
            ws.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        const ws = wavesurferRef.current;
        if (!ws) return;
        ws.setMuted(isMuted);
    }, [isMuted]);

    useEffect(() => {
        const ws = wavesurferRef.current;
        if (!ws) return;
        ws.setVolume(volume);
    }, [volume]);

    return <div ref={audioContainerRef} className="hidden" aria-hidden="true" />;
};

export default GlobalAudioPlayer;
