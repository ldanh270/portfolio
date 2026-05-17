"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface HighlightedTextProps {
	children: React.ReactNode;
	className?: string;
	highlightColor?: string;
	delay?: number;
	duration?: number;
	once?: boolean;
}

/**
 * Pulz-style Highlighted Text
 * Uses a pseudo-element background reveal inspired by pulz.ai
 */
export function HighlightedText({
	children,
	className,
	highlightColor = "var(--color-brand-black)",
	delay = 0.2,
	duration = 0.8,
	once = true,
}: HighlightedTextProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once, amount: 0.5 });

	return (
		<span
			ref={ref}
			className={cn("relative inline-block px-1", className)}
		>
			<motion.span
				initial={{ width: "0%" }}
				animate={isInView ? { width: "100%" } : { width: "0%" }}
				transition={{
					duration,
					delay,
					ease: [0.22, 1, 0.36, 1],
				}}
				className="absolute inset-0 -z-10"
				style={{ backgroundColor: highlightColor }}
			/>
			<motion.span
				initial={{ color: "inherit" }}
				animate={isInView ? { color: "var(--color-brand-white)" } : { color: "inherit" }}
				transition={{
					duration: duration * 0.5,
					delay: delay + duration * 0.2,
				}}
			>
				{children}
			</motion.span>
		</span>
	);
}
