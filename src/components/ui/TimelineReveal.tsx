"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const timelineContainer: Variants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.09,
			delayChildren: 0.14,
		},
	},
};

const timelineItem: Variants = {
	hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
	show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease } },
};

const timelineLine: Variants = {
	hidden: { scaleX: 0 },
	show: { scaleX: 1, transition: { duration: 1, ease } },
};

type TimelineRevealProps = {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
};

export function TimelineReveal({ children, className }: TimelineRevealProps) {
	return (
		<motion.div
			variants={timelineContainer}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export function TimelineRevealItem({ children, className, style }: TimelineRevealProps) {
	return (
		<motion.div variants={timelineItem} className={className} style={style}>
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
