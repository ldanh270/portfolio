"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

type RevealTextProps = {
	delay?: number;
	className?: string;
	children: ReactNode;
};

// Punchy tech-precision ease (expo.out equivalent)
const techEase = [0.16, 1, 0.3, 1] as const;

export function RevealText({ delay = 0, className, children }: RevealTextProps) {
	const shouldReduceMotion = useReducedMotion();
	const ref = useRef<HTMLSpanElement>(null);
	const isInView = useInView(ref, { once: false, margin: "-40px" });

	return (
		<span ref={ref} className={`inline-block overflow-hidden ${className ?? ""}`}>
			<motion.span
				className="inline-block"
				initial={shouldReduceMotion ? { opacity: 1, y: "0%" } : { y: "105%", opacity: 0 }}
				animate={
					shouldReduceMotion
						? { opacity: 1, y: "0%" }
						: isInView
							? { y: "0%", opacity: 1 }
							: { y: "105%", opacity: 0 }
				}
				transition={{
					duration: shouldReduceMotion ? 0 : 0.45,
					ease: techEase,
					delay: isInView ? delay : 0,
				}}
			>
				{children}
			</motion.span>
		</span>
	);
}
