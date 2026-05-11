"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealTextProps = {
	delay?: number;
	className?: string;
	children: ReactNode;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function RevealText({ delay = 0, className, children }: RevealTextProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<span className={`inline-block overflow-hidden ${className ?? ""}`}>
			<motion.span
				className="inline-block"
				initial={shouldReduceMotion ? { opacity: 1 } : { y: "115%", rotate: 2, opacity: 0 }}
				whileInView={{ y: "0%", rotate: 0, opacity: 1 }}
				transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease, delay }}
				viewport={{ once: true, margin: "-10% 0px" }}
			>
				{children}
			</motion.span>
		</span>
	);
}
