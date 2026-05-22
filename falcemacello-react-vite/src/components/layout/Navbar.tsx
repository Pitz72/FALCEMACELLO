import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAudioStore } from "@/lib/audioStore";
import { soundEffects } from "@/lib/soundEffects";
import { Radio, Volume2, Wifi } from "lucide-react";

export default function Navbar() {
    const location = useLocation();
    const { soundEffectsEnabled, setSoundEffectsEnabled } = useAudioStore();

    const handleHover = () => {
        soundEffects.playClick();
    };

    const handleClick = () => {
        soundEffects.playClick();
    };

    const toggleSounds = () => {
        const nextState = !soundEffectsEnabled;
        setSoundEffectsEnabled(nextState);
        soundEffects.setEnabled(nextState);
        if (nextState) {
            setTimeout(() => soundEffects.playSuccess(), 50);
        } else {
            soundEffects.playClick();
        }
    };

    const menuItems = [
        { path: "/", label: "HOME" },
        { path: "/manifesto", label: "MANIFESTO" },
        { path: "/ep", label: "EP BRANI" }
    ];

    return (
        <nav className="fixed top-4 left-4 right-4 z-50 pointer-events-none">
            <div className="max-w-6xl mx-auto bg-brand-dark-950/70 backdrop-blur-md border border-brand-red/20 rounded-md p-3 sm:px-6 flex items-center justify-between pointer-events-auto shadow-[0_0_20px_rgba(204,0,0,0.15)]">
                {/* Logo con Glitch ed Effetto Hover */}
                <Link 
                    to="/" 
                    onClick={handleClick}
                    onMouseEnter={handleHover}
                    className="flex items-center gap-2 group cursor-pointer"
                >
                    <motion.div
                        animate={{ 
                            rotate: [0, -5, 5, 0],
                            scale: [1, 1.05, 0.98, 1] 
                        }}
                        transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        className="text-brand-red group-hover:text-brand-red-neon transition-colors"
                    >
                        <Radio className="w-6 h-6 filter drop-shadow-[0_0_5px_rgba(204,0,0,0.7)]" />
                    </motion.div>
                    <span 
                        className="font-orbitron font-black text-sm sm:text-base tracking-widest text-white group-hover:text-brand-red-neon transition-colors glitch-text"
                        data-text="F&M COMT"
                    >
                        F&M <span className="text-brand-red">COMT</span>
                    </span>
                </Link>

                {/* Menu di Navigazione */}
                <div className="flex items-center gap-2 sm:gap-6">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={handleClick}
                                onMouseEnter={handleHover}
                                className="relative py-1.5 px-3 rounded-sm font-orbitron font-bold text-xs tracking-wider transition-colors cursor-pointer"
                            >
                                <span className={isActive ? "text-brand-red-neon text-shadow-[0_0_8px_rgba(255,26,26,0.6)]" : "text-brand-light/80 hover:text-brand-red transition-colors"}>
                                    {item.label}
                                </span>
                                
                                {/* Linea di selezione in stile costruttivista sotto il link attivo */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavLine"
                                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-red-neon shadow-[0_0_8px_#ff1a1a]"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Controlli Console (Radar / Sound Toggle) */}
                <div className="hidden sm:flex items-center gap-4 border-l border-white/10 pl-4">
                    {/* Indicatore Stato Connessione / PWA */}
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-brand-light/60 tracking-wider">
                        <Wifi className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                        <span>K-SYS: <span className="text-emerald-500 font-bold">ONLINE</span></span>
                    </div>

                    {/* Toggle Suoni Globale */}
                    <button
                        onClick={toggleSounds}
                        onMouseEnter={handleHover}
                        className={`p-1.5 rounded-sm border transition-all cursor-pointer ${
                            soundEffectsEnabled 
                                ? "bg-brand-red/10 border-brand-red/40 text-brand-red-neon shadow-[0_0_8px_rgba(204,0,0,0.3)]" 
                                : "bg-white/5 border-white/10 text-brand-light/40"
                        }`}
                        title={soundEffectsEnabled ? "Disattiva effetti sonori" : "Attiva effetti sonori"}
                    >
                        <Volume2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
