"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type HoverRowProps = {
	children: ReactNode;
	className: string;
	featured?: boolean;
	movex?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function HoverRow({ movex = 0, children, className, featured = false }: HoverRowProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			whileHover={
				featured || shouldReduceMotion
					? undefined
					: {
							x: movex,
							y: -2,
							backgroundColor: "#0a0a0a",
							transition: { duration: 0.35, ease },
						}
			}
			whileTap={featured || shouldReduceMotion ? undefined : { scale: 0.992 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
