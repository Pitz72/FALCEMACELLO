"use client";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export function Contact() {
    return (
        <Section className="bg-brand-dark relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-red/5 skew-x-12 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                    >
                        UNITEVI ALLA <span className="text-brand-red">LOTTA</span>
                    </motion.h2>
                    <p className="text-xl text-brand-light/80 mb-8 font-light">
                        Per scuotere le catene e liberare le coscienze. Contattaci per collaborazioni, informazioni o per unirti al movimento.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-brand-light/60">
                            <div className="w-12 h-[1px] bg-brand-red" />
                            <span>info@falcemacello.com</span>
                        </div>
                        <div className="flex items-center gap-4 text-brand-light/60">
                            <div className="w-12 h-[1px] bg-brand-red" />
                            <span>Social: @falcemacello</span>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Card variant="glass" className="p-8">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-bold text-brand-light/80 uppercase tracking-wider">Nome</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full bg-brand-dark/50 border border-brand-light/10 rounded p-3 text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all"
                                        placeholder="Compagno"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-brand-light/80 uppercase tracking-wider">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full bg-brand-dark/50 border border-brand-light/10 rounded p-3 text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all"
                                        placeholder="email@esempio.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-brand-light/80 uppercase tracking-wider">Messaggio</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full bg-brand-dark/50 border border-brand-light/10 rounded p-3 text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all resize-none"
                                    placeholder="Il tuo messaggio..."
                                />
                            </div>

                            <Button className="w-full group" size="lg">
                                <span>INVIA MESSAGGIO</span>
                                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </Section>
    );
}
