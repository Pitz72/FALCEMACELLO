import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { useAudioStore } from "@/lib/audioStore";

const GlobalAudioPlayer = () => {
    const audioContainerRef = useRef<HTMLDivElement>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
    
    const { 
        tracks, 
        currentTrackIndex, 
        isPlaying, 
        isMuted, 
        volume,
        nextTrack,
        setCurrentTime,
        setDuration,
        setAudioAnalyzer,
        setIsPlaying
    } = useAudioStore();

    useEffect(() => {
        if (!audioContainerRef.current) return;

        // Inizializzazione WaveSurfer nascosto come motore audio globale
        const ws = WaveSurfer.create({
            container: audioContainerRef.current,
            height: 0,
            width: 0,
            waveColor: "transparent",
            progressColor: "transparent",
            mediaControls: false
        });

        wavesurferRef.current = ws;

        // Gestione degli eventi di progresso
        ws.on("timeupdate", (currentTime) => {
            setCurrentTime(currentTime);
        });

        ws.on("ready", () => {
            setDuration(ws.getDuration());
        });

        ws.on("finish", () => {
            nextTrack();
        });

        // Configurazione della Web Audio API per il Visualizzatore
        const setupWebAudio = () => {
            try {
                const audioElement = ws.getMediaElement();
                if (!audioElement) return;

                // Evitiamo restrizioni CORS impostando anonymous crossOrigin se necessario
                audioElement.crossOrigin = "anonymous";

                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                const audioCtx = new AudioContextClass();
                audioContextRef.current = audioCtx;

                const analyser = audioCtx.createAnalyser();
                analyser.fftSize = 128; // Risoluzione ottimizzata per visualizzatore a barre neon
                analyser.smoothingTimeConstant = 0.8;

                // Connettiamo la sorgente audio se non l'abbiamo già creata
                if (!sourceNodeRef.current) {
                    const source = audioCtx.createMediaElementSource(audioElement);
                    sourceNodeRef.current = source;
                    source.connect(analyser);
                    analyser.connect(audioCtx.destination);
                }

                setAudioAnalyzer(analyser);
            } catch (e) {
                console.warn("Web Audio API non inizializzata a causa delle restrizioni di sicurezza del browser (sarà attiva dopo l'interazione utente):", e);
            }
        };

        ws.once("interaction", () => {
            if (audioContextRef.current && audioContextRef.current.state === "suspended") {
                audioContextRef.current.resume();
            }
        });

        ws.on("play", () => {
            if (!audioContextRef.current) {
                setupWebAudio();
            } else if (audioContextRef.current.state === "suspended") {
                audioContextRef.current.resume();
            }
        });

        return () => {
            ws.destroy();
            if (audioContextRef.current) {
                audioContextRef.current.close().catch(console.error);
            }
        };
    }, []);

    // Sincronizzazione cambio traccia
    useEffect(() => {
        const ws = wavesurferRef.current;
        if (!ws) return;

        ws.load(tracks[currentTrackIndex].url);
        
        ws.once("ready", () => {
            if (isPlaying) {
                ws.play().catch((err) => {
                    console.warn("Autoplay impedito dal browser. In attesa di interazione dell'utente:", err);
                    setIsPlaying(false);
                });
            }
        });
    }, [currentTrackIndex]);

    // Sincronizzazione riproduzione
    useEffect(() => {
        const ws = wavesurferRef.current;
        if (!ws) return;

        if (isPlaying) {
            ws.play().catch((err) => {
                console.warn("Impossibile avviare riproduzione:", err);
                setIsPlaying(false);
            });
            // Sblocchiamo l'AudioContext se sospeso
            if (audioContextRef.current && audioContextRef.current.state === "suspended") {
                audioContextRef.current.resume();
            }
        } else {
            ws.pause();
        }
    }, [isPlaying]);

    // Sincronizzazione Mute
    useEffect(() => {
        const ws = wavesurferRef.current;
        if (!ws) return;
        ws.setMuted(isMuted);
    }, [isMuted]);

    // Sincronizzazione Volume
    useEffect(() => {
        const ws = wavesurferRef.current;
        if (!ws) return;
        ws.setVolume(volume);
    }, [volume]);

    return <div ref={audioContainerRef} className="hidden" aria-hidden="true" />;
};

export default GlobalAudioPlayer;
