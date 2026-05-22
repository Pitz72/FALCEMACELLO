import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const variants = {
            primary: "bg-brand-red text-white border border-brand-red hover:bg-red-700 hover:border-red-700 shadow-[0_0_15px_rgba(185,54,59,0.5)]",
            secondary: "bg-brand-dark text-brand-light border border-brand-light/20 hover:border-brand-light/50 hover:bg-brand-light/5",
            outline: "bg-transparent text-brand-red border border-brand-red hover:bg-brand-red/10",
            ghost: "bg-transparent text-brand-light hover:text-brand-red hover:bg-brand-red/5",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg font-bold uppercase tracking-wider",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "relative inline-flex items-center justify-center rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red/50 disabled:opacity-50 disabled:pointer-events-none font-orbitron",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
                {variant === "primary" && (
                    <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                        style={{ skewX: -20 }}
                    />
                )}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
