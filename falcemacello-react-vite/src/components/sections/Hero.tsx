import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { soundEffects } from "@/lib/soundEffects";
import { Star } from "lucide-react";

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const handleHover = () => {
        soundEffects.playClick();
    };

    const handleClick = () => {
        soundEffects.playClick();
    };

    return (
        <section ref={ref} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-brand-dark-950">
            {/* Background Parallax */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <img
                    src="/images/cyber-soviet-banner.png"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105"
                    loading="eager"
                />
                
                {/* Sfumature costruttiviste scure e rosse */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark-950/20 via-brand-dark-950/60 to-brand-dark-950" />
                <div className="absolute inset-0 bg-[url('/images/soviet-grid-pattern.png')] opacity-15 mix-blend-overlay pointer-events-none" />
                
                {/* Analog Grain / Noise Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" aria-hidden="true" />
            </motion.div>

            {/* Linee di impatto costruttiviste diagonali rosse giganti sullo sfondo */}
            <div className="absolute top-1/3 left-0 w-full h-[3px] bg-brand-red/10 -rotate-6 pointer-events-none" aria-hidden="true" />
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-red/5 -rotate-12 pointer-events-none" aria-hidden="true" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                {/* Stella Comunista / Icona in cima */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                    animate={{ opacity: 0.9, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-6 flex justify-center"
                    aria-hidden="true"
                >
                    <div className="p-3 bg-brand-red/10 border border-brand-red/30 rounded-full shadow-[0_0_15px_rgba(204,0,0,0.3)]">
                        <Star className="w-6 h-6 text-brand-red-neon fill-brand-red-neon animate-pulse" />
                    </div>
                </motion.div>

                {/* Logo Principal con animazione di pulsazione lenta */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                        opacity: 1, 
                        scale: 1,
                        y: [0, -8, 0] 
                    }}
                    transition={{ 
                        opacity: { duration: 1 },
                        scale: { duration: 1 },
                        y: { 
                            duration: 5, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }
                    }}
                    className="mb-8"
                >
                    <img
                        src="/images/falce-macello-logo-main.png"
                        alt="FALCE e MACELLO"
                        width={280}
                        height={280}
                        className="mx-auto filter drop-shadow-[0_0_35px_rgba(204,0,0,0.6)] hover:scale-105 transition-transform duration-500"
                        onMouseEnter={handleHover}
                    />
                </motion.div>

                {/* Titolo Principale Glitch Neon */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-6 tracking-tighter uppercase glitch-text leading-none select-none text-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                    data-text="FALCE e MACELLO"
                    onMouseEnter={handleHover}
                >
                    FALCE <span className="text-brand-red-neon text-shadow-[0_0_10px_rgba(255,26,26,0.6)]">e</span> MACELLO
                </motion.h1>

                {/* Sottotitolo stile manifesto */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-lg md:text-2xl text-brand-light/80 max-w-3xl mx-auto mb-14 font-mono uppercase tracking-widest font-semibold flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
                >
                    <span>MUSICA AI</span>
                    <span className="text-brand-red-neon">•</span>
                    <span>IDEOLOGIA POLITICA</span>
                    <span className="text-brand-red-neon">•</span>
                    <span>EREDITÀ DEL PCI</span>
                </motion.p>

                {/* Pulsanti di Azione Principali */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto sm:max-w-none"
                >
                    <Link to="/ep" onClick={handleClick} onMouseEnter={handleHover}>
                        <Button size="lg" className="w-full sm:w-auto glow-red hover:bg-brand-red-neon cursor-pointer">
                            ASCOLTA L'EP
                        </Button>
                    </Link>
                    <Link to="/manifesto" onClick={handleClick} onMouseEnter={handleHover}>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto border-brand-red text-brand-red-neon hover:bg-brand-red/10 cursor-pointer">
                            LEGGI IL MANIFESTO
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Indicatore di Scorrimento Lineare in stile Radar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none"
                aria-hidden="true"
            >
                <span className="font-mono text-[9px] text-brand-light/30 tracking-widest uppercase">SCORRI GIÙ</span>
                <div className="w-[1px] h-20 bg-gradient-to-b from-brand-red-neon to-transparent animate-pulse shadow-[0_0_5px_#ff1a1a]" />
            </motion.div>
        </section>
    );
}
