"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type RevealTextProps = {
	delay?: number;
	className?: string;
	children: ReactNode;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function RevealText({ delay = 0, className, children }: RevealTextProps) {
	const shouldReduceMotion = useReducedMotion();
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const raf = requestAnimationFrame(() => {
			setIsReady(true);
		});
		return () => cancelAnimationFrame(raf);
	}, []);

	return (
		<span className={`inline-block overflow-hidden ${className ?? ""}`}>
			<motion.span
				className="inline-block"
				initial={shouldReduceMotion ? { opacity: 1 } : { y: "115%", rotate: 2, opacity: 0 }}
				animate={shouldReduceMotion || isReady ? { y: "0%", rotate: 0, opacity: 1 } : undefined}
				transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease, delay }}
			>
				{children}
			</motion.span>
		</span>
	);
}
