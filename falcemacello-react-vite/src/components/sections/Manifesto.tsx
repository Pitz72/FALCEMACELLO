import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut" as const
        }
    }
};

export function Manifesto() {
    return (
        <Section className="bg-brand-dark relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <motion.div 
                className="max-w-4xl mx-auto text-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-4xl md:text-6xl font-bold text-brand-red mb-12 uppercase tracking-widest"
                >
                    Il Manifesto
                </motion.h2>

                <div className="space-y-8 text-lg md:text-xl leading-relaxed text-brand-light/90 font-light">
                    <motion.p variants={itemVariants}>
                        <strong className="text-white font-bold">Uno spettro si aggira per la rete...</strong>
                    </motion.p>
                    
                    <motion.p variants={itemVariants}>
                        Oggi come oggi l'Artista è una puttana il cui valore è deciso dal Pappone e confermato dal Mercato.
                        La lettura della realtà, del mondo e del sociale, sono appiattiti su una visione globale imposta dal Capitale.
                    </motion.p>
                    
                    <motion.p variants={itemVariants}>
                        <span className="text-brand-red font-bold">Falce e Macello</span> è un duo di artisti e amici che si esprimono tramite le musiche generate con AI.
                        Il loro lavoro non è di fare semplici generazioni ma di lavorare con cura e struttura alle loro produzioni, con testi originali e di valore politico.
                    </motion.p>
                    
                    <motion.blockquote 
                        variants={itemVariants}
                        animate={{ 
                            opacity: [1, 0.8, 1, 0.9, 1],
                            transition: { 
                                duration: 2, 
                                repeat: Infinity, 
                                repeatType: "reverse" as const 
                            }
                        }}
                        className="border-l-4 border-brand-red pl-6 py-4 my-12 text-2xl md:text-3xl font-orbitron text-white italic bg-white/5 rounded-r-lg"
                    >
                        "Certe idee non passano mai di moda, vengono solo temporaneamente silenziate."
                    </motion.blockquote>
                    
                    <motion.p variants={itemVariants}>
                        Vogliamo ribadire con forza il fatto che certe idee, un certo modo di pensare, non è e non può essere passato di moda,
                        ma è stato semplicemente spazzato via dalla discussione civile per colpa di una propaganda attiva e scientifica.
                    </motion.p>
                </div>
            </motion.div>
        </Section>
    );
}
