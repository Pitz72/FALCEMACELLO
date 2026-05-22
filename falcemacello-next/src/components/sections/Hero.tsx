"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
            {/* Background Parallax */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <Image
                    src="/images/cyber-soviet-banner.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-brand-dark/60 to-brand-dark" />
                <div className="absolute inset-0 bg-[url('/images/soviet-grid-pattern.png')] opacity-10 mix-blend-overlay" />
                
                {/* Analog Grain / Noise Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" aria-hidden="true" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                        opacity: 1, 
                        scale: 1,
                        y: [0, -10, 0] 
                    }}
                    transition={{ 
                        opacity: { duration: 1 },
                        scale: { duration: 1 },
                        y: { 
                            duration: 4, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }
                    }}
                    className="mb-8"
                >
                    <Image
                        src="/images/falce-macello-logo-main.png"
                        alt="FALCE e MACELLO"
                        width={300}
                        height={300}
                        className="mx-auto drop-shadow-[0_0_25px_rgba(185,54,59,0.5)]"
                    />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-6 tracking-tighter glitch-text"
                    data-text="FALCE e MACELLO"
                >
                    FALCE <span className="text-brand-red">e</span> MACELLO
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-xl md:text-2xl text-brand-light/80 max-w-2xl mx-auto mb-12 font-light"
                >
                    MUSICA AI • IDEOLOGIA POLITICA • EREDITÀ DEL PCI
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="flex flex-col md:flex-row gap-4 justify-center"
                >
                    <Link href="/ep">
                        <Button size="lg" variant="primary">
                            ASCOLTA L'EP
                        </Button>
                    </Link>
                    <Link href="/manifesto">
                        <Button size="lg" variant="outline">
                            LEGGI IL MANIFESTO
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-24 bg-gradient-to-b from-brand-red to-transparent animate-pulse" />
            </motion.div>
        </section>
    );
}
