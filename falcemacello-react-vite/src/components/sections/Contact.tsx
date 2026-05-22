import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal, CheckCircle } from "lucide-react";
import { useState } from "react";
import { soundEffects } from "@/lib/soundEffects";

export function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    
    // Stati per la simulazione del terminale di sicurezza
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleKeyDown = () => {
        // Riproduciamo il click meccanico a tempo di battitura!
        soundEffects.playKeypress();
    };

    const handleHover = () => {
        soundEffects.playClick();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) {
            soundEffects.playFailure();
            alert("Compila tutti i campi di comunicazione cifrata prima dell'invio!");
            return;
        }

        soundEffects.playClick();
        setIsSubmitting(true);
        setLogs([]);

        const steps = [
            "STABILENDO CONNESSIONE CIFRATA HTTPS...",
            "CONTATTANDO IL DATABASE DEL COMITATO CENTRALE...",
            `CRITTOGRAFANDO I DATI DI: COMPAGNO / COMPAGNA ${name.toUpperCase()}...`,
            "RICHIEDENDO AUTORIZZAZIONE DI SICUREZZA...",
            "INVIO PACCHETTI DATI COMPILATI CON AES-256...",
            "CONNESSIONE COMPLETATA CON SUCCESSO! SALUTI RIVOLUZIONARI."
        ];

        // Simulazione caricamento terminale passo-passo
        for (let i = 0; i < steps.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 600));
            setLogs((prev) => [...prev, `[LOG-K]: ${steps[i]}`]);
            soundEffects.playKeypress();
        }

        setIsSubmitting(false);
        setIsSubmitted(true);
        soundEffects.playSuccess();
    };

    const resetForm = () => {
        soundEffects.playClick();
        setName("");
        setEmail("");
        setMessage("");
        setIsSubmitted(false);
        setLogs([]);
    };

    return (
        <Section className="bg-brand-dark-950 relative overflow-hidden pb-32">
            {/* Elementi geometrici rossi stile Rodchenko in background */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-red/[0.02] skew-x-12 pointer-events-none border-l border-brand-red/5" aria-hidden="true" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Testo di propaganda a sinistra */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="font-mono text-xs text-brand-gold font-bold tracking-widest uppercase block mb-2">
                            SEZIONE COMUNICAZIONI CIBERNETICHE
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                            UNITEVI ALLA <br />
                            <span className="text-brand-red-neon text-shadow-[0_0_12px_rgba(255,26,26,0.6)]">LOTTA</span>
                        </h2>
                        <div className="w-20 h-2 bg-brand-red-neon mb-8" />
                        
                        <p className="text-lg md:text-xl text-brand-light/80 mb-10 font-light leading-relaxed">
                            Vuoi inviare un segnale al Comitato Centrale? Vuoi collaborare con il duo per una traccia di rottura ideologica? O semplicemente vuoi scuotere le catene della propaganda? Invia un messaggio crittografato.
                        </p>

                        <div className="space-y-4 font-mono text-sm text-brand-light/60">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-[2px] bg-brand-red-neon shadow-[0_0_5px_#ff1a1a]" />
                                <span>CANALE SICURO: <strong className="text-white">info@falcemacello.it</strong></span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-[2px] bg-brand-red-neon shadow-[0_0_5px_#ff1a1a]" />
                                <span>MONITORAGGIO SOCIALE: <strong className="text-white">@falcemacello</strong></span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Form / Terminale di sicurezza a destra */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Card 
                        variant="glass" 
                        className="p-8 border-neon-red bg-black/40 backdrop-blur-xl relative overflow-hidden"
                    >
                        {/* Header del Terminale */}
                        <div className="flex items-center justify-between border-b border-brand-red/30 pb-4 mb-6" aria-hidden="true">
                            <div className="flex items-center gap-2 font-mono text-xs text-brand-red-neon font-bold tracking-widest uppercase">
                                <Terminal className="w-4 h-4 text-brand-red-neon animate-pulse" />
                                K-SYS SECURE COM-PORT N. 82
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-brand-red animate-ping" />
                                <div className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.form 
                                    key="form"
                                    onSubmit={handleSubmit} 
                                    className="space-y-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-[10px] font-mono font-bold text-brand-light/80 uppercase tracking-widest">NOME DEL COMPAGNO / COMPAGNA</label>
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                disabled={isSubmitting}
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                className="w-full bg-black/60 border border-brand-red/20 rounded-sm p-3 text-sm font-mono text-white focus:border-brand-red-neon focus:ring-1 focus:ring-brand-red-neon outline-none transition-all"
                                                placeholder="NOME / IDENTIFICATIVO"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-[10px] font-mono font-bold text-brand-light/80 uppercase tracking-widest">CANALE CIFRATO EMAIL</label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                disabled={isSubmitting}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                className="w-full bg-black/60 border border-brand-red/20 rounded-sm p-3 text-sm font-mono text-white focus:border-brand-red-neon focus:ring-1 focus:ring-brand-red-neon outline-none transition-all"
                                                placeholder="COMPAGNO@ESEMPIO.IT"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-[10px] font-mono font-bold text-brand-light/80 uppercase tracking-widest">TRASMISSIONE CIFRATA</label>
                                        <textarea
                                            id="message"
                                            required
                                            rows={4}
                                            disabled={isSubmitting}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="w-full bg-black/60 border border-brand-red/20 rounded-sm p-3 text-sm font-mono text-white focus:border-brand-red-neon focus:ring-1 focus:ring-brand-red-neon outline-none transition-all resize-none"
                                            placeholder="SCRIVI IL TUO MESSAGGIO POLITICO O SOCIALE QUI..."
                                        />
                                    </div>

                                    {/* Terminal Logging durante l'invio */}
                                    {isSubmitting && (
                                        <div className="bg-black/80 rounded border border-brand-red/30 p-4 font-mono text-[10px] text-brand-red-neon leading-relaxed max-h-32 overflow-y-auto space-y-1">
                                            {logs.map((log, i) => (
                                                <div key={i}>{log}</div>
                                            ))}
                                            <div className="animate-pulse">_</div>
                                        </div>
                                    )}

                                    <Button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        onMouseEnter={handleHover}
                                        className="w-full group hover:glow-red select-none cursor-pointer" 
                                        size="lg"
                                    >
                                        <span>INVIA SEGNALE</span>
                                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                                    </Button>
                                </motion.form>
                            ) : (
                                // Schermata di Successo Cifrata
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-10 space-y-6 font-mono"
                                >
                                    <div className="flex justify-center" aria-hidden="true">
                                        <CheckCircle className="w-16 h-16 text-emerald-500 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-bounce" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold font-orbitron text-emerald-400 tracking-widest uppercase">
                                            MESSAGGIO INVIATO
                                        </h3>
                                        <p className="text-xs text-brand-light/60 mt-2">
                                            LA TRASMISSIONE È STATA CRITTOGRAFATA ED INVIATA CON SUCCESSO.
                                        </p>
                                    </div>
                                    <div className="bg-black/60 rounded border border-emerald-500/20 p-4 text-[10px] text-emerald-400 text-left space-y-1.5">
                                        <div>[K-NET]: PACCHETTI SPEDITI: 128/128 KB</div>
                                        <div>[K-NET]: CODICE DI SICUREZZA: SHA-256 ACCETTATO</div>
                                        <div>[K-NET]: STATO TRASMISSIONE: RICEVUTO DALLA CENTRALE</div>
                                    </div>
                                    <Button 
                                        onClick={resetForm}
                                        onMouseEnter={handleHover}
                                        variant="outline"
                                        size="sm"
                                        className="border-brand-red text-brand-red-neon hover:bg-brand-red/10 cursor-pointer"
                                    >
                                        NUOVA TRASMISSIONE
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </motion.div>
            </div>
        </Section>
    );
}
