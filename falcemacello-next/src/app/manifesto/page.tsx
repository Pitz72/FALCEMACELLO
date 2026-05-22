"use client";

import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ManifestoPage() {
    return (
        <main className="min-h-screen bg-brand-dark text-white pt-10 pb-20">
            <Section>
                {/* Navigation */}
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="group pl-0 hover:bg-transparent hover:text-brand-red">
                            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                            TORNA ALLA HOME
                        </Button>
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-brand-red mb-4 tracking-widest">
                            MANIFESTO
                        </h1>
                        <h2 className="text-xl md:text-2xl text-brand-light/60 tracking-widest uppercase">
                            POLITICO E ARTISTICO
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="space-y-8 text-lg md:text-xl leading-relaxed text-brand-light/90 font-light text-justify"
                    >
                        <p className="font-bold text-white text-2xl mb-8">
                            Uno spettro si aggira per la rete...
                        </p>

                        <div className="w-full h-[1px] bg-brand-red/30 my-8" />

                        <p>
                            Oggi come oggi l'Artista è una puttana il cui valore è deciso dal Pappone e
                            confermato dal Mercato. La lettura della realtà, del mondo e del sociale, sono
                            appiattiti su una visione globale impostata dal Capitale e strutturata su valori
                            individualisti propedeutici al produrre e consumare. Il cerchio della vita
                            dell'uomo moderno che parte dalla nascita e finisce nella morte racchiude un
                            unico leit motiv: produrre e consumare.
                        </p>

                        <p>
                            Eppure la realtà non è così complicata come te la raccontano editorialisti,
                            presentatori tv, politici o influencer. La realtà è che il Capitale, o turbo-capitalismo
                            o finanza globale, o come volete definire questo sistema oligarchico che domina il mondo,
                            utilizza oggi come ieri le stesse forme di dominio. Il capitalismo si adatta ai cambiamenti
                            o meglio guida e determina i cambiamenti a proprio vantaggio.
                        </p>

                        <p>
                            Lo scopo è dichiarato ed estremamente semplice oltre che preciso: fare profitto,
                            accumulare ed accrescere la ricchezza di pochi. I pilastri sui quali si fonda sono:
                            la guerra, il consenso-omologazione, la tecnologia funzionale, e la politica formale.
                        </p>

                        <p>
                            Negli anni 90 il capitale era in mano a pochissime persone. 300 Famiglie decidevano
                            il destino di tutto il mondo. Tre di queste possedevano l'equivalente in ricchezza del PIL
                            di 48 stati africani ovvero di oltre 600 milioni di persone. Questo processo è continuato
                            accumulando ulteriormente nelle mani di pochi denaro e potere.
                        </p>

                        <p>
                            Questo accentramento ha subito un'accelerata dagli albori del terzo millennio
                            coadiuvato dalla tecnologia funzionale. Internet, social network, cellulari,
                            dispositivi smart, l'on demand e lo shopping online, si sono rivelati potentissimi
                            strumenti di propaganda oltre che di profitto.
                        </p>

                        <p>
                            Tra l'indifferenza della politica, e di quella sinistra che cercava, e cerca ancora
                            in larga parte, una terza via che si è rivelata essere una scorciatoia verso il
                            disastro umano. I finanzieri di fatto governano senza alcuna investitura da parte del popolo.
                        </p>

                        <p>
                            A tutto questo si affiancata la meravigliosa macchina di propaganda che sono
                            i social network ed internet, dove tutto è vero e nulla è vero, tranne l'apparenza.
                            Dove l'immagine della povertà, del lavoro, delle difficoltà della vita reale,
                            stridono con l'immagine fashion propagandata da influencer d'accatto.
                        </p>

                        <div className="w-full h-[1px] bg-brand-red/30 my-12" />

                        <h3 className="text-3xl font-bold text-brand-red text-center font-orbitron mb-8">
                            LA NOSTRA RISPOSTA
                        </h3>

                        <p>
                            Per scuotere le catene e liberare le coscienze, o ridere provandoci, siamo nati.
                            Falce e Macello è un duo di artisti ed amici che si esprimono, o tornano ad esprimersi,
                            tramite le musiche generate con AI. Il loro lavoro non è di fare semplici generazioni
                            ma di lavorare con cura e struttura alle loro produzioni, con testi originali e di
                            valore politico o sociale, ed una attenta post produzione.
                        </p>

                        <p>
                            La loro estrazione culturale è quella ereditata dai grandi pensatori dimenticati
                            come Gramsci, o Pasolini o Neruda, o l'amato Enrico Berlinguer, e loro, nelle canzoni,
                            vogliono sostenere l'intramontato valore politico, ideale ed ideologico di un certo tipo
                            di sinistra italiana, quella concreta, aderente, con le radici ben piantate nel proprio
                            passato e che esprime la propria eredità in una visione contemporanea.
                        </p>

                        <p>
                            Anche le canzoni sono il frutto di uno spirito aderente a questi principi, dagli anni 80 e 90
                            alle sonorità più dure ed avanguardistiche dell'elettronica moderna. Falce e Macello vogliono
                            ribadire con forza il fatto che certe idee, un certo modo di pensare, non è e non può essere
                            passato di moda, ma è stato semplicemente spazzato via dall'orizzonte della discussione civile
                            per colpa di una propaganda attiva e strutturata in favore della cancellazione del dissenso
                            e del senso critico reale.
                        </p>

                        <p>
                            Falce e Macello utilizzano i moderni strumenti della IA per fare musica perché vogliono
                            affermare anche nei fatti che esiste un altro modo, un altro uso che si può e si deve
                            fare della tecnologia.
                        </p>

                        <div className="w-full h-[1px] bg-brand-red/30 my-12" />

                        <div className="text-center py-8">
                            <h3 className="text-3xl md:text-4xl font-bold text-brand-red font-orbitron tracking-widest">
                                UMANI DI TUTTI I PAESI UNITEVI!
                            </h3>
                        </div>
                    </motion.div>
                </div>
            </Section>
        </main>
    );
}
