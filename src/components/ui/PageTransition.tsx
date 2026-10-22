"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const techEase = [0.16, 1, 0.3, 1] as const;

export function PageTransition({ children }: { children: ReactNode }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.38, ease: techEase }}
		>
			{children}
		</motion.div>
	);
}
