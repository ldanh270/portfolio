"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
	children: ReactNode;
	delay?: number;
	duration?: number;
	y?: number;
	className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function FadeIn({ children, delay = 0, duration = 0.8, y = 28, className }: FadeInProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y, filter: "blur(8px)" }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
			transition={{ duration: shouldReduceMotion ? 0 : duration, delay, ease }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
