import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Share2, ArrowLeft, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAudioStore } from "@/lib/audioStore";
import { soundEffects } from "@/lib/soundEffects";
import SEO from "@/components/ui/SEO";
import WaveSurfer from "wavesurfer.js";

export default function EPPage() {
    const { 
        tracks, 
        currentTrackIndex, 
        isPlaying,
        setCurrentTrackIndex,
        setIsPlaying
    } = useAudioStore();

    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Stato per monitorare il caricamento del player locale
    const [playerReady, setPlayerReady] = useState(false);

    // --- EFFETTO PARALLASSE 3D CARD CON FRAMER MOTION ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Spring per rendere il movimento morbido
    const rotateX = useSpring(useTransform(y, [-300, 300], [15, -15]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-300, 300], [-15, 15]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Calcolo della distanza del cursore dal centro della copertina
        const mouseX = event.clientX - rect.left - width / 2;
        const mouseY = event.clientY - rect.top - height / 2;

        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        soundEffects.playClick();
    };

    const handleMouseEnter = () => {
        soundEffects.playClick();
    };

    // --- AGGANCIO WAVESURFER SU AUDIO ELEMENT GLOBALE ---
    useEffect(() => {
        if (!waveformRef.current) return;

        // Cerchiamo l'elemento audio globale generato da GlobalAudioPlayer nel DOM
        const globalAudioElement = document.querySelector('div[aria-hidden="true"] audio') as HTMLAudioElement;

        if (!globalAudioElement) {
            // Se non è ancora montato, riproviamo dopo un breve delay
            const timer = setTimeout(() => {
                setPlayerReady(prev => !prev); // Forza un re-render
            }, 300);
            return () => clearTimeout(timer);
        }

        // Creiamo il visualizzatore WaveSurfer agganciato al media element globale
        const ws = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "rgba(204, 0, 0, 0.2)", // Rosso scuro semi-trasparente
            progressColor: "#ff1a1a", // Rosso neon
            cursorColor: "#ffd700", // Cursore d'oro
            cursorWidth: 2,
            height: 80,
            barWidth: 3,
            barGap: 3,
            barRadius: 2,
            media: globalAudioElement, // Connessione diretta senza duplicazioni audio!
            interact: true
        });

        wavesurferRef.current = ws;

        ws.on("ready", () => {
            setPlayerReady(true);
        });

        // Gestione suoni all'interazione con la waveform
        ws.on("interaction", () => {
            soundEffects.playClick();
            if (!isPlaying) {
                setIsPlaying(true);
            }
        });

        return () => {
            ws.destroy();
        };
    }, [currentTrackIndex, playerReady]);

    const handleTrackSelect = (index: number) => {
        soundEffects.playClick();
        setCurrentTrackIndex(index);
        setIsPlaying(true);
    };

    const handlePlayPause = () => {
        soundEffects.playClick();
        setIsPlaying(!isPlaying);
    };

    const handleShare = (e: React.MouseEvent, title: string) => {
        e.stopPropagation();
        soundEffects.playSuccess();
        
        if (navigator.share) {
            navigator.share({
                title: `${title} | FALCE e MACELLO`,
                text: `Ascolta "${title}" di Falce e Macello - Musica AI & Ideologia Politica`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            // Fallback copia link negli appunti
            navigator.clipboard.writeText(window.location.href);
            alert(`Link di condivisione copiato per la traccia: ${title}`);
        }
    };

    return (
        <main className="min-h-screen bg-brand-dark-950 text-white pb-24 relative overflow-hidden">
            <SEO 
                title="The Hopeful Children of Mr. Brandt - EP" 
                description="Ascolta l'EP di debutto di Falce e Macello. Musica generata con AI, testi di forte spessore e valore politico-sociale." 
            />

            {/* Ingranaggio decorativo sovietico in background */}
            <div className="absolute -top-16 -right-16 w-96 h-96 bg-brand-red/5 rounded-full border-8 border-dashed border-brand-red/10 animate-[spin_60s_linear_infinite] pointer-events-none" />

            <Section>
                {/* Pulsante Torna alla Home */}
                <div className="mb-10">
                    <Link to="/">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="group pl-0 hover:bg-transparent hover:text-brand-red-neon text-brand-light/80" 
                            onClick={handlePlayPause}
                            aria-label="Torna alla home page"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1.5 transition-transform" />
                            TORNA ALLA HOME
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* --- COPERTINA INTERATTIVA 3D E EFFETTO VINILE --- */}
                    <div className="flex flex-col items-center">
                        <motion.div
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            onMouseEnter={handleMouseEnter}
                            style={{ 
                                rotateX, 
                                rotateY, 
                                transformStyle: "preserve-3d" 
                            }}
                            className="relative w-full max-w-sm aspect-[2/3] shadow-[0_0_50px_rgba(204,0,0,0.25)] rounded-lg cursor-pointer group"
                        >
                            {/* Bagliore neon sullo sfondo */}
                            <div className="absolute inset-0 bg-brand-red/15 blur-3xl rounded-full scale-95 opacity-80 animate-pulse pointer-events-none" />

                            {/* Contenitore Immagine Copertina */}
                            <div 
                                style={{ transform: "translateZ(30px)" }}
                                className="relative w-full h-full rounded-lg overflow-hidden border border-brand-red/30 z-20"
                            >
                                <img
                                    src="/images/the-hopeful-children-ep-cover.png"
                                    alt="Copertina EP: The Hopeful Children of Mr. Brandt"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="eager"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-brand-dark/20 opacity-60" />
                            </div>

                            {/* Vinile Fotorealistico che Esce dal Retro in 3D */}
                            <motion.div
                                animate={{ 
                                    x: isPlaying ? "55%" : "15%",
                                    rotate: isPlaying ? 360 : 0
                                }}
                                transition={{ 
                                    x: { duration: 0.8, ease: "easeOut" },
                                    rotate: isPlaying 
                                        ? { duration: 8, repeat: Infinity, ease: "linear" } 
                                        : { duration: 0.8, ease: "easeOut" }
                                }}
                                className="absolute top-1/2 -translate-y-1/2 w-[90%] aspect-square bg-black rounded-full z-0 border-[6px] border-neutral-900 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-center"
                                style={{ 
                                    transform: "translateZ(10px)",
                                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.9), inset 0 0 40px rgba(255,255,255,0.05)"
                                }}
                            >
                                {/* Solchi del vinile */}
                                <div className="absolute inset-2 rounded-full border border-neutral-800/40" />
                                <div className="absolute inset-4 rounded-full border border-neutral-800/40" />
                                <div className="absolute inset-6 rounded-full border border-neutral-800/40" />
                                <div className="absolute inset-8 rounded-full border border-neutral-800/40" />
                                
                                {/* Etichetta centrale rossa */}
                                <div className="w-[35%] h-[35%] bg-brand-red rounded-full flex items-center justify-center border-2 border-brand-gold/30">
                                    <div className="w-4 h-4 bg-brand-gold rounded-full border border-neutral-900" />
                                </div>
                            </motion.div>
                        </motion.div>

                        <p className="mt-8 text-xs font-mono text-brand-light/40 uppercase tracking-widest text-center">
                            Sposta il cursore per inclinare in 3D • Il vinile ruota durante la riproduzione
                        </p>
                    </div>

                    {/* --- PLAYER E TRACKLIST IN CLASSE CYBER-SOVIET --- */}
                    <div className="lg:pt-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <span className="bg-brand-red/10 border border-brand-red/40 text-brand-red-neon px-3 py-1 text-xs font-mono font-bold tracking-widest rounded-sm uppercase">
                                DEBUTTO DISCOGRAFICO
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-orbitron mt-4 mb-2 leading-tight tracking-wider text-white uppercase">
                                THE HOPEFUL CHILDREN <br />
                                <span className="text-brand-red-neon text-shadow-[0_0_10px_rgba(255,26,26,0.5)]">OF MR. BRANDT</span>
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-brand-light/60 font-mono">
                                <span>EP • 2024</span>
                                <span>•</span>
                                <span>3 BRANI</span>
                                <span>•</span>
                                <span className="text-brand-gold font-bold">11:55 TOTALI</span>
                            </div>
                        </motion.div>

                        {/* Visualizzatore Waveform Custom */}
                        <div className="bg-brand-dark-800/90 border border-brand-red/20 rounded-md p-6 mb-8 relative shadow-lg">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-xs font-mono text-brand-red-neon font-bold tracking-widest uppercase flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-brand-red-neon rounded-full animate-ping" />
                                    OSCILLOSCOPIO D'ONDA IN TEMPO REALE
                                </span>
                                <span className="text-xs font-mono text-brand-light/40 uppercase">
                                    {tracks[currentTrackIndex].title}
                                </span>
                            </div>

                            {/* Contenitore WaveSurfer */}
                            <div ref={waveformRef} className="w-full bg-black/40 rounded p-2" />
                            
                            {/* Controller Waveform Integrato */}
                            <div className="mt-4 flex items-center gap-4 justify-between">
                                <button
                                    onClick={handlePlayPause}
                                    className="bg-brand-red hover:bg-brand-red-neon text-white font-orbitron font-bold text-xs tracking-wider px-4 py-2 rounded-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
                                >
                                    {isPlaying ? (
                                        <>
                                            <Pause className="w-3.5 h-3.5" />
                                            PAUSA
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-3.5 h-3.5 ml-0.5" />
                                            ASCOLTA
                                        </>
                                    )}
                                </button>
                                <span className="text-[10px] font-mono text-brand-light/30 uppercase">
                                    Clicca sull'onda per spostare la traccia
                                </span>
                            </div>
                        </div>

                        {/* Tracklist con stili militanti */}
                        <nav className="space-y-3" aria-label="Tracklist dell'EP">
                            {tracks.map((track: any, index: number) => {
                                const isActive = currentTrackIndex === index;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleTrackSelect(index)}
                                        onMouseEnter={handleMouseEnter}
                                        aria-current={isActive ? "true" : "false"}
                                        className={cn(
                                            "w-full flex items-center justify-between p-4 rounded-sm border transition-all text-left focus:outline-none focus:ring-1 focus:ring-brand-red-neon cursor-pointer",
                                            isActive
                                                ? "bg-brand-red/10 border-brand-red/50 shadow-[0_0_15px_rgba(204,0,0,0.15)]"
                                                : "bg-brand-dark-800/40 border-white/5 hover:bg-white/5 hover:border-white/10"
                                        )}
                                    >
                                        <div className="flex items-center gap-4 min-w-0">
                                            {/* Numero traccia con frequenze o play icon */}
                                            <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-black/40 flex items-center justify-center border border-white/5 font-mono text-xs text-brand-red font-bold">
                                                {isActive && isPlaying ? (
                                                    // Equalizzatore a barre animate per indicare la traccia corrente attiva
                                                    <div className="flex items-end gap-0.5 h-3">
                                                        <div className="w-0.5 bg-brand-red-neon rounded-full animate-[pulse_0.5s_infinite_alternate]" style={{ height: '100%' }} />
                                                        <div className="w-0.5 bg-brand-red-neon rounded-full animate-[pulse_0.7s_infinite_alternate]" style={{ height: '60%' }} />
                                                        <div className="w-0.5 bg-brand-red-neon rounded-full animate-[pulse_0.6s_infinite_alternate]" style={{ height: '80%' }} />
                                                    </div>
                                                ) : (
                                                    (index + 1).toString().padStart(2, "0")
                                                )}
                                            </div>
                                            
                                            <div className="min-w-0">
                                                <span className={cn(
                                                    "font-orbitron font-bold text-sm tracking-wide block uppercase",
                                                    isActive ? "text-brand-red-neon" : "text-white"
                                                )}>
                                                    {track.title}
                                                </span>
                                                <span className="text-[10px] font-mono text-brand-light/40 uppercase tracking-widest font-semibold block">
                                                    FALCE e MACELLO
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className="text-xs text-brand-light/50 font-mono">{track.duration}</span>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-8 w-8 p-0 hover:text-brand-red-neon" 
                                                aria-label={`Condividi la traccia ${track.title}`}
                                                onClick={(e) => handleShare(e, track.title)}
                                            >
                                                <Share2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </Section>
        </main>
    );
}
