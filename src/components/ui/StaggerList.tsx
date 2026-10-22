"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const techEase = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.045,
			delayChildren: 0.04,
		},
	},
};

const item: Variants = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: techEase } },
};

type StaggerProps = {
	children: ReactNode;
	className?: string;
};

export function StaggerList({ children, className }: StaggerProps) {
	return (
		<motion.div
			variants={container}
			initial="hidden"
			whileInView="show"
			viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
			className={`grid grid-auto-rows ${className ?? ""}`}
		>
			{children}
		</motion.div>
	);
}

export function StaggerItem({ children, className }: StaggerProps) {
	return (
		<motion.div
			variants={item}
			className={`h-full ${className ?? ""}`}
		>
			{children}
		</motion.div>
	);
}
