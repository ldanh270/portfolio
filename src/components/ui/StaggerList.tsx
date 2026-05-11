"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const container: Variants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.07,
			delayChildren: 0.1,
		},
	},
};

const item: Variants = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
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
			viewport={{ once: true, margin: "-60px" }}
			className={`grid grid-auto-rows ${className}`}
		>
			{children}
		</motion.div>
	);
}

export function StaggerItem({ children, className }: StaggerProps) {
	return (
		<motion.div
			variants={item}
			className={`h-full ${className}`}
		>
			{children}
		</motion.div>
	);
}
