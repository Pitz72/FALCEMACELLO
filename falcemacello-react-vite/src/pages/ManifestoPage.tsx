import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, BookOpen, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { soundEffects } from "@/lib/soundEffects";
import SEO from "@/components/ui/SEO";

export default function ManifestoPage() {
    const handleHover = () => {
        soundEffects.playClick();
    };

    const handleClick = () => {
        soundEffects.playClick();
    };

    const handleDownload = () => {
        soundEffects.playSuccess();
        // Simulazione del download del manifesto
        alert("Inizializzazione Download del Manifesto in formato PDF cifrato... Trasmissione completata!");
    };

    return (
        <main className="min-h-screen bg-brand-dark-950 text-white pb-24 relative overflow-hidden">
            <SEO 
                title="Il Manifesto" 
                description="Il Manifesto politico e artistico di Falce e Macello. Uno spettro si aggira per la rete..." 
            />

            {/* Simbolo Sovietico di Sfondo sfocato in trasparenza */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/[0.02] rounded-full border border-brand-red/[0.05] pointer-events-none flex items-center justify-center select-none" aria-hidden="true">
                <span className="font-orbitron font-black text-9xl text-brand-red/[0.03] scale-150">★</span>
            </div>

            <Section>
                {/* Navigation */}
                <div className="mb-12">
                    <Link to="/">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="group pl-0 hover:bg-transparent hover:text-brand-red-neon text-brand-light/80"
                            onClick={handleClick}
                            onMouseEnter={handleHover}
                        >
                            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1.5 transition-transform" />
                            TORNA ALLA HOME
                        </Button>
                    </Link>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Header in stile Poster Costruttivista Sovietico */}
                    <div className="relative mb-20">
                        {/* Linee rosse spesse diagonali */}
                        <div className="absolute -left-10 top-0 w-24 h-1 bg-brand-red-neon shadow-[0_0_8px_#ff1a1a]" />
                        <div className="absolute -left-10 top-3 w-40 h-2.5 bg-brand-red" />
                        
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="pl-6"
                        >
                            <span className="font-mono text-xs text-brand-gold font-bold tracking-widest uppercase flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-brand-gold animate-pulse" />
                                DOCUMENTO N. 1921 / COMITATO CENTRALE
                            </span>
                            <h1 
                                className="text-6xl md:text-8xl font-black font-orbitron text-brand-red-neon mt-4 tracking-tighter uppercase glitch-text"
                                data-text="MANIFESTO"
                            >
                                MANIFESTO
                            </h1>
                            <div className="inline-block bg-brand-gold text-brand-dark font-orbitron font-extrabold text-sm sm:text-lg px-4 py-1.5 uppercase tracking-widest transform rotate-[-1.5deg] shadow-lg mt-2 select-none">
                                POLITICO E ARTISTICO CIBERNETICO
                            </div>
                        </motion.div>
                    </div>

                    {/* Griglia asimmetrica stile Pravda / Costruttivista */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Colonna di sinistra: Grande slogan e capilettera */}
                        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-brand-red text-white p-6 border-l-8 border-brand-gold-neon transform rotate-[-2deg] shadow-2xl relative"
                            >
                                {/* Effetto di distorsione costruttivista */}
                                <span className="absolute -top-3 -right-3 text-4xl text-brand-gold-neon font-black">★</span>
                                <h3 className="font-orbitron font-black text-2xl md:text-3xl tracking-wide uppercase leading-tight mb-4">
                                    UMANI DI TUTTI I PAESI UNITEVI!
                                </h3>
                                <p className="font-mono text-xs text-white/95 leading-relaxed">
                                    "Per scuotere le catene e liberare le coscienze, o ridere provandoci, siamo nati."
                                </p>
                            </motion.div>

                            <div className="border border-brand-red/20 bg-brand-dark-800/40 p-6 rounded-sm relative">
                                <span className="text-xs font-mono text-brand-gold font-bold uppercase tracking-widest block mb-4">
                                    ARCHIVIO PROPAGANDA
                                </span>
                                <p className="text-sm text-brand-light/60 font-light leading-relaxed">
                                    Falce e Macello sostiene l'intramontato valore ideale, politico e ideologico di un certo tipo di sinistra italiana, proiettata nel futuro tecnologico dell'Intelligenza Artificiale.
                                </p>
                                <Button 
                                    onClick={handleDownload}
                                    onMouseEnter={handleHover}
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full mt-6 flex items-center justify-center gap-2 border-brand-gold text-brand-gold hover:bg-brand-gold/10"
                                >
                                    <Download className="w-4 h-4" />
                                    SCARICA IL PDF
                                </Button>
                            </div>
                        </div>

                        {/* Colonna di destra: Testo del Manifesto suddiviso a blocchi editoriali */}
                        <div className="lg:col-span-8 space-y-12">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="space-y-8 text-justify font-light text-brand-light/95 text-base md:text-lg leading-relaxed font-inter"
                            >
                                <div className="border-b border-brand-red/30 pb-6">
                                    <p className="font-orbitron font-black text-white text-3xl md:text-4xl tracking-wide uppercase text-left glow-red">
                                        Uno spettro si aggira per la rete...
                                    </p>
                                </div>

                                <p>
                                    <span className="float-left text-brand-red-neon font-orbitron font-black text-7xl mr-4 leading-[0.8] select-none text-shadow-[0_0_10px_rgba(255,26,26,0.6)]">O</span>
                                    ggi come oggi l'Artista è una puttana il cui valore è deciso dal Pappone e
                                    confermato dal Mercato. La lettura della realtà, del mondo e del sociale, sono
                                    appiattiti su una visione globale impostata dal Capitale e strutturata su valori
                                    individualisti propedeutici al produrre e consumare. Il cerchio della vita
                                    dell'uomo moderno che parte dalla nascita e finisce nella morte racchiude un
                                    unico leit motiv: <strong className="text-white font-semibold">produrre e consumare</strong>.
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
                                    A tutto questo si è affiancata la meravigliosa macchina di propaganda che sono
                                    i social network ed internet, dove tutto è vero e nulla è vero, tranne l'apparenza.
                                    Dove l'immagine della povertà, del lavoro, delle difficoltà della vita reale,
                                    stridono con l'immagine fashion propagandata da influencer d'accatto.
                                </p>

                                <div className="border-y border-brand-red/30 py-8 my-10 relative bg-brand-red/[0.02]">
                                    <div className="absolute top-0 left-0 w-2 h-2 bg-brand-gold-neon" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-brand-gold-neon" />
                                    <h3 className="text-3xl font-black font-orbitron text-brand-red-neon text-center uppercase tracking-widest leading-snug">
                                        LA NOSTRA RISPOSTA CIBERNETICA
                                    </h3>
                                </div>

                                <p>
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
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}
