"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    variant?: "default" | "glass" | "solid";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, variant = "default", ...props }, ref) => {
        const variants = {
            default: "bg-brand-dark/80 border border-brand-light/10 backdrop-blur-sm",
            glass: "bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
            solid: "bg-brand-dark border border-brand-light/20",
        };

        return (
            <motion.div
                ref={ref}
                className={cn(
                    "rounded-lg p-6 transition-all duration-300 hover:border-brand-red/50",
                    variants[variant],
                    className
                )}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);
Card.displayName = "Card";

export { Card };
