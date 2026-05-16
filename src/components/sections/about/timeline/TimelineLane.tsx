import { TimelineRevealItem } from "@/components/ui/TimelineReveal.tsx";
import { CareerEntry, TIMELINE_YEARS, YEAR_WIDTH } from "@/data/about.ts";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic.js";
import { CSSProperties, useRef, useState } from "react";

const TimelinePopup = dynamic(() => import("./TimelinePopup"), {
	ssr: false,
	loading: () => <div style={{ display: "block" }}>Loading...</div>, // Optional placeholder
});

const ease = [0.22, 1, 0.36, 1] as const;

const laneVariants = {
	rest: { y: 0, boxShadow: "0 0 0 rgba(10,10,10,0)" },
	hover: { y: -3, boxShadow: "0 14px 35px rgba(10,10,10,0.08)" },
};

const surfaceVariants = {
	rest: { opacity: 0, scale: 0.985 },
	hover: { opacity: 1, scale: 1 },
};

const lineVariants = {
	rest: { scaleX: 0 },
	hover: { scaleX: 1 },
};

const dotVariants = {
	rest: { scale: 1, backgroundColor: "#fafaf8" },
	hover: { scale: 1.16, backgroundColor: "#0a0a0a" },
};

const labelVariants = {
	rest: { x: 0 },
	hover: { x: 4 },
};

export default function TimelineLane({ entry }: { entry: CareerEntry }) {
	const triggerRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);
	const shouldReduceMotion = useReducedMotion();
	const motionEnabled = !shouldReduceMotion;

	const getStartOffset = (year: string): number => {
		const index = TIMELINE_YEARS.indexOf(year);
		return index >= 0 ? index * YEAR_WIDTH : 0;
	};

	const getEndOffset = (year: string): number => {
		const index = TIMELINE_YEARS.indexOf(year);
		return index >= 0 ? index * YEAR_WIDTH : TIMELINE_YEARS.length * YEAR_WIDTH;
	};

	const getLaneWidth = (entry: CareerEntry) => {
		return `${getEndOffset(entry.end) - getStartOffset(entry.start)}px`;
	};

	return (
		<>
			<TimelineRevealItem
				ref={triggerRef}
				className="group absolute z-10 h-11 hover:z-50 focus-within:z-50"
				style={
					{
						left: `${getStartOffset(entry.start)}px`,
						top: `${entry.lane * 4.25}rem`,
						width: getLaneWidth(entry),
					} as CSSProperties
				}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<motion.div
					initial="rest"
					whileHover="hover"
					whileTap={motionEnabled ? { scale: 0.995 } : undefined}
					variants={laneVariants}
					transition={{ duration: motionEnabled ? 0.35 : 0, ease }}
					aria-label={`${entry.title}, ${entry.start} to ${entry.end}`}
					className="relative z-10 h-full w-full cursor-grab overflow-visible border border-brand-border bg-brand-white active:cursor-grabbing"
				>
					<motion.span
						aria-hidden="true"
						variants={surfaceVariants}
						transition={{ duration: motionEnabled ? 0.28 : 0, ease }}
						className="absolute inset-1 z-0 border border-brand-border bg-[rgba(10,10,10,0.018)]"
					/>
					<motion.span
						aria-hidden="true"
						variants={lineVariants}
						transition={{ duration: motionEnabled ? 0.32 : 0, ease }}
						className="absolute left-3 right-3 top-0 z-10 h-px origin-left bg-brand-black"
					/>
					<div className="relative z-10 flex h-full w-full items-center justify-between px-3">
						<motion.span
							aria-hidden="true"
							variants={dotVariants}
							transition={{ duration: motionEnabled ? 0.24 : 0, ease }}
							className="size-2.5 rounded-full border border-brand-black"
						/>
						<motion.span
							variants={labelVariants}
							transition={{ duration: motionEnabled ? 0.3 : 0, ease }}
							className="truncate px-3 font-mono text-[10px] uppercase tracking-widest"
						>
							{entry.title}
						</motion.span>
						<motion.span
							aria-hidden="true"
							variants={dotVariants}
							transition={{ duration: motionEnabled ? 0.24 : 0, ease }}
							className="size-2.5 rounded-full border border-brand-black"
						/>
					</div>
					<span className="absolute -bottom-5 left-0 font-mono text-[10px] uppercase tracking-widest text-brand-gray">
						{entry.start}
					</span>
					<span className="absolute -bottom-5 right-0 font-mono text-[10px] uppercase tracking-widest text-brand-gray">
						{entry.end}
					</span>
				</motion.div>
			</TimelineRevealItem>
			<TimelinePopup
				entry={entry}
				triggerRef={triggerRef}
				isHovered={isHovered}
			/>
		</>
	);
}
