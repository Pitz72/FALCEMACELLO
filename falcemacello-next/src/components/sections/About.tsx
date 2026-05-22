"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Mic2, Music4, Speaker, Radio } from "lucide-react";

export function About() {
    const features = [
        {
            icon: <Mic2 className="w-8 h-8 text-brand-red" />,
            title: "Canzone Cantautorale",
            description: "La tradizione della canzone italiana rivisitata con l'intelligenza artificiale.",
        },
        {
            icon: <Music4 className="w-8 h-8 text-brand-gold" />,
            title: "Rap Politico",
            description: "Rime taglienti e messaggi diretti contro il sistema oligarchico.",
        },
        {
            icon: <Speaker className="w-8 h-8 text-brand-red" />,
            title: "Dubstep & Trap",
            description: "Sonorità aggressive e moderne per un impatto sonoro devastante.",
        },
        {
            icon: <Radio className="w-8 h-8 text-brand-gold" />,
            title: "Eredità PCI",
            description: "I valori di Berlinguer, Gramsci e Pasolini proiettati nel futuro.",
        },
    ];

    return (
        <Section className="bg-brand-dark/95">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-white mb-4"
                >
                    L'Estetica di Rottura
                </motion.h2>
                <p className="text-brand-light/60 max-w-2xl mx-auto">
                    Non facciamo semplici generazioni. Lavoriamo con cura e struttura, unendo passato e futuro.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card variant="glass" className="h-full hover:bg-white/10 transition-colors cursor-default group">
                            <div className="mb-4 p-3 bg-white/5 rounded-full w-fit group-hover:bg-brand-red/20 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 font-orbitron">{feature.title}</h3>
                            <p className="text-brand-light/70 text-sm">{feature.description}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
