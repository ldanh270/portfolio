"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function RevealLine({ className }: { className?: string }) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0, originX: 0 }}
			whileInView={{ scaleX: 1 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: shouldReduceMotion ? 0 : 1, ease }}
			className={`h-px bg-brand-border ${className ?? ""}`}
		/>
	);
}
