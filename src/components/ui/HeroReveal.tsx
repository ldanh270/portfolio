"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

const techEase = [0.16, 1, 0.3, 1] as const;

export function HeroReveal({ children, className }: { children: ReactNode; className?: string }) {
	const shouldReduceMotion = useReducedMotion();
	const ref = useRef<HTMLHeadingElement>(null);
	const isInView = useInView(ref, { once: false, margin: "-40px" });

	return (
		<motion.h1
			ref={ref}
			initial={shouldReduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 100% 0)", y: 18, opacity: 0 }}
			animate={
				shouldReduceMotion
					? { clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 }
					: isInView
						? { clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 }
						: { clipPath: "inset(0 0 100% 0)", y: 18, opacity: 0 }
			}
			transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: techEase, delay: isInView ? 0.1 : 0 }}
			className={className}
		>
			{children}
		</motion.h1>
	);
}
