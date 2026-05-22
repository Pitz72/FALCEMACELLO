"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLMotionProps<"section"> {
    children: React.ReactNode;
    container?: boolean;
    delay?: number;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, children, container = true, delay = 0, ...props }, ref) => {
        return (
            <motion.section
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay, ease: "easeOut" }}
                className={cn("py-20 relative overflow-hidden", className)}
                {...props}
            >
                {container ? (
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        {children}
                    </div>
                ) : (
                    children
                )}
            </motion.section>
        );
    }
);
Section.displayName = "Section";

export { Section };
