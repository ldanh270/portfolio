"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type FadeInProps = {
	children: ReactNode;
	delay?: number;
	duration?: number;
	y?: number;
	className?: string;
};

// Punchy tech-dev ease (expo.out equivalent)
const techEase = [0.16, 1, 0.3, 1] as const;

/**
 * FadeIn — High-performance re-entrant in/out animation wrapper.
 * Exactly like Footer: enters when scrolled into view, resets when scrolled away,
 * and re-animates every time you scroll back into frame.
 */
export function FadeIn({
	children,
	delay = 0,
	duration = 0.42,
	y = 20,
	className,
}: FadeInProps) {
	const shouldReduceMotion = useReducedMotion();
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: false, margin: "-50px" });

	return (
		<motion.div
			ref={ref}
			initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y }}
			animate={
				shouldReduceMotion
					? { opacity: 1, y: 0 }
					: isInView
						? { opacity: 1, y: 0 }
						: { opacity: 0, y }
			}
			transition={{
				duration: shouldReduceMotion ? 0 : duration,
				delay: isInView ? delay : 0,
				ease: techEase,
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
