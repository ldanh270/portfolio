"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const timelineContainer: Variants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.12,
		},
	},
};

const timelineItem: Variants = {
	hidden: { opacity: 0, y: 18 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const timelineLine: Variants = {
	hidden: { scaleX: 0 },
	show: { scaleX: 1, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
};

type TimelineRevealProps = {
	children: ReactNode;
	className?: string;
};

export function TimelineReveal({ children, className }: TimelineRevealProps) {
	return (
		<motion.div
			variants={timelineContainer}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, margin: "-80px" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export function TimelineRevealItem({ children, className }: TimelineRevealProps) {
	return (
		<motion.div variants={timelineItem} className={className}>
			{children}
		</motion.div>
	);
}

export function TimelineRevealLine({ className }: { className?: string }) {
	return (
		<motion.div
			variants={timelineLine}
			style={{ originX: 0 }}
			className={className}
		/>
	);
}
