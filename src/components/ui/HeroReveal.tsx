"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroReveal({ children, className }: { children: ReactNode; className?: string }) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.h1
			initial={shouldReduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 100% 0)", y: 32 }}
			animate={{ clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 }}
			transition={{ duration: shouldReduceMotion ? 0 : 1, ease, delay: 0.15 }}
			className={className}
		>
			{children}
		</motion.h1>
	);
}
