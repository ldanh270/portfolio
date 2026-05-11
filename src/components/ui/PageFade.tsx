"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function PageFade({ children, className }: { children: ReactNode; className?: string }) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.main
			initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
			transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease }}
			className={className}
		>
			{children}
		</motion.main>
	);
}
