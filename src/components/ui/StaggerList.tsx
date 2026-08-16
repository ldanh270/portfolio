"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.08,
		},
	},
};

const item: Variants = {
	hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
	show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease } },
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
