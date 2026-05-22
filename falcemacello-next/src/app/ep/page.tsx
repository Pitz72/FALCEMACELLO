"use client";

import { Section } from "@/components/ui/Section";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { motion } from "framer-motion";
import Image from "next/image";
import { Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAudioStore } from "@/lib/audioStore";

export default function EPPage() {
    const { 
        tracks, 
        currentTrackIndex, 
        setCurrentTrackIndex 
    } = useAudioStore();

    return (
        <main className="min-h-screen bg-brand-dark text-white pt-10 pb-20">
            <Section>
                {/* Navigation */}
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="group pl-0 hover:bg-transparent hover:text-brand-red" aria-label="Torna alla home page">
                            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                            TORNA ALLA HOME
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Cover Art & Visuals */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full max-w-md mx-auto lg:mx-0"
                    >
                        <div className="absolute inset-0 bg-brand-red/20 blur-3xl rounded-full animate-pulse" aria-hidden="true" />

                        {/* Vertical Cover Container */}
                        <div className="relative aspect-[2/3] w-full shadow-2xl rounded-lg overflow-hidden border border-white/10">
                            <Image
                                src="/images/the-hopeful-children-ep-cover.png"
                                alt="Copertina EP: The Hopeful Children of Mr. Brandt"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>

                        {/* Vinyl Effect */}
                        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-[80%] aspect-square bg-black rounded-full z-[-1] animate-[spin_10s_linear_infinite] hidden xl:block border-8 border-neutral-900 shadow-xl" aria-hidden="true">
                            <div className="absolute inset-0 m-auto w-1/3 h-1/3 bg-brand-red rounded-full" />
                        </div>
                    </motion.div>

                    {/* Player & Tracklist */}
                    <div className="lg:pt-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold font-orbitron mb-2 leading-tight">
                                THE HOPEFUL CHILDREN <br />
                                <span className="text-brand-red">OF MR. BRANDT</span>
                            </h1>
                            <p className="text-xl text-brand-light/60">EP • 2024</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-8"
                        >
                            <AudioPlayer />
                        </motion.div>

                        <nav className="space-y-2" aria-label="Tracklist dell'EP">
                            {tracks.map((track, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTrackIndex(index)}
                                    aria-current={currentTrackIndex === index ? "true" : "false"}
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 rounded-md cursor-pointer transition-all border border-transparent text-left focus:outline-none focus:ring-2 focus:ring-brand-red",
                                        currentTrackIndex === index
                                            ? "bg-brand-red/10 border-brand-red/30"
                                            : "hover:bg-white/5"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={cn("text-sm font-mono w-6", currentTrackIndex === index ? "text-brand-red" : "text-brand-light/40")}>
                                            {(index + 1).toString().padStart(2, "0")}
                                        </span>
                                        <span className={cn("font-medium", currentTrackIndex === index ? "text-white" : "text-brand-light/80")}>
                                            {track.title}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-brand-light/40 font-mono">{track.duration}</span>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-8 w-8 p-0" 
                                            aria-label={`Condividi la traccia ${track.title}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Share logic
                                            }}
                                        >
                                            <Share2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </Section>
        </main>
    );
}
