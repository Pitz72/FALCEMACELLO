import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function NewsTicker() {
    return (
        <div className="w-full bg-brand-red text-white overflow-hidden py-2 relative z-20 border-y border-brand-gold/20">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-8 items-center"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-8">
                            <Link to="/ep" className="hover:text-brand-gold transition-colors font-bold tracking-wider flex items-center gap-4">
                                <span className="bg-white text-brand-red px-2 py-0.5 text-xs rounded-sm font-bold">NUOVO BRANO</span>
                                <span>LA PIÙ BELLA CANZONE - ASCOLTALA ORA!</span>
                            </Link>
                            <span className="text-brand-dark/40">•</span>
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    className="flex gap-8 items-center"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-8">
                            <Link to="/ep" className="hover:text-brand-gold transition-colors font-bold tracking-wider flex items-center gap-4">
                                <span className="bg-white text-brand-red px-2 py-0.5 text-xs rounded-sm font-bold">NUOVO BRANO</span>
                                <span>LA PIÙ BELLA CANZONE - ASCOLTALA ORA!</span>
                            </Link>
                            <span className="text-brand-dark/40">•</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
