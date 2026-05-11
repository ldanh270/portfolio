"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type HoverRowProps = {
	children: ReactNode;
	className: string;
	featured?: boolean;
	movex?: number;
};

export function HoverRow({ movex = 0, children, className, featured = false }: HoverRowProps) {
	return (
		<motion.div
			whileHover={featured ? undefined : { x: movex, backgroundColor: "#0a0a0a" }}
			transition={{ duration: 0.15 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
