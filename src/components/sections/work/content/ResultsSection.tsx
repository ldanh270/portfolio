"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "@/components/ui/CountUp";
import { FadeIn } from "@/components/ui/FadeIn";
import type { ResultMetric } from "./types";

type ResultsSectionProps = {
	data: ResultMetric[];
};

type ResultMetricRowProps = {
	item: ResultMetric;
	index: number;
	motionEnabled: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;
const RESULT_STAGGER_DELAY = 0.08;

const rowVariants = {
	rest: { y: 0, boxShadow: "0 0 0 rgba(10,10,10,0)" },
	hover: { y: -4, boxShadow: "0 18px 48px rgba(10,10,10,0.07)" },
};

const surfaceVariants = {
	rest: { opacity: 0, scale: 0.985 },
	hover: { opacity: 1, scale: 1 },
};

const lineVariants = {
	rest: { scaleX: 0 },
	hover: { scaleX: 1 },
};

const indexVariants = {
	rest: { x: 0, opacity: 0.46 },
	hover: { x: 6, opacity: 1 },
};

const valueVariants = {
	rest: { x: 0 },
	hover: { x: -8 },
};

const formatResultNumber = (index: number): string => {
	return String(index + 1).padStart(2, "0");
};

const getResultCountLabel = (count: number): string => {
	const itemLabel = count === 1 ? "Metric" : "Metrics";
	return `${formatResultNumber(count - 1)} ${itemLabel}`;
};

const parseMetricValue = (value: string): { num: number; suffix: string } => {
	const match = value.match(/^(\d+(?:\.\d+)?)(.*)/);
	if (!match) return { num: 0, suffix: value };
	return {
		num: parseFloat(match[1]),
		suffix: match[2].trim(),
	};
};

const ResultMetricRow = ({ item, index, motionEnabled }: ResultMetricRowProps) => {
	const { num, suffix } = parseMetricValue(item.value);
	const metricNumber = formatResultNumber(index);

	return (
		<motion.article
			initial={motionEnabled ? { opacity: 0, y: 24, filter: "blur(6px)" } : { opacity: 1 }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			viewport={{ once: false, margin: "-10% 0px" }}
			transition={{
				duration: motionEnabled ? 0.7 : 0,
				delay: motionEnabled ? index * RESULT_STAGGER_DELAY : 0,
				ease,
			}}
		>
			<motion.div
				initial="rest"
				whileHover={motionEnabled ? "hover" : undefined}
				variants={rowVariants}
				transition={{ duration: motionEnabled ? 0.42 : 0, ease }}
				className="group relative isolate overflow-hidden border border-brand-border bg-brand-white px-5 py-7 sm:px-8 sm:py-9 lg:grid lg:grid-cols-[7rem_1fr_auto] lg:items-end lg:gap-10"
			>
				<motion.span
					aria-hidden="true"
					variants={surfaceVariants}
					transition={{ duration: motionEnabled ? 0.32 : 0, ease }}
					className="absolute inset-3 z-0 border border-brand-border bg-[rgba(10,10,10,0.018)]"
				/>
				<motion.span
					aria-hidden="true"
					variants={lineVariants}
					transition={{ duration: motionEnabled ? 0.38 : 0, ease }}
					className="absolute left-5 right-5 top-0 z-10 h-px origin-left bg-brand-black sm:left-8 sm:right-8"
				/>

				<motion.p
					aria-hidden="true"
					variants={indexVariants}
					transition={{ duration: motionEnabled ? 0.35 : 0, ease }}
					className="relative z-10 font-mono text-4xl font-light leading-none tracking-tight text-brand-gray lg:text-5xl"
				>
					{metricNumber}
				</motion.p>

				<div className="relative z-10 mt-6 lg:mt-0">
					<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray">
						Impact
					</p>
					<h3 className="mt-3 max-w-xl text-[clamp(1.2rem,2vw,1.75rem)] font-bold leading-tight tracking-tight text-brand-black">
						{item.metric}
					</h3>
					<div className="mt-5 h-px overflow-hidden bg-brand-border lg:hidden">
						<motion.div
							aria-hidden="true"
							variants={lineVariants}
							transition={{ duration: motionEnabled ? 0.38 : 0, ease }}
							className="h-full origin-left bg-brand-black"
						/>
					</div>
				</div>

				<motion.p
					variants={valueVariants}
					transition={{ duration: motionEnabled ? 0.35 : 0, ease }}
					className="relative z-10 mt-6 font-display text-[clamp(3.25rem,10vw,7rem)] font-extrabold leading-[0.82] tracking-tighter text-brand-black lg:mt-0 lg:text-right"
				>
					<CountUp
						end={num}
						suffix={suffix}
						duration={1600}
					/>
				</motion.p>
			</motion.div>
		</motion.article>
	);
};

export function ResultsSection({ data }: ResultsSectionProps) {
	const shouldReduceMotion = useReducedMotion();
	const motionEnabled = !shouldReduceMotion;

	return (
		<div className="border-b border-brand-border py-16 sm:py-20">
			<div className="mx-auto grid max-w-5xl gap-10 px-6 sm:px-8 lg:grid-cols-[180px_1fr] lg:gap-16 lg:px-12">
				<FadeIn className="min-w-0">
					<div className="lg:sticky lg:top-24">
						<p className="font-mono text-xs uppercase tracking-widest text-brand-gray">
							Results
						</p>
						<div className="mt-6 hidden h-px w-16 bg-brand-black/35 lg:block" />
						<p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray">
							{getResultCountLabel(data.length)}
						</p>
					</div>
				</FadeIn>

				<div className="min-w-0 space-y-4">
					{data.map((item, index) => (
						<ResultMetricRow
							key={item.metric}
							item={item}
							index={index}
							motionEnabled={motionEnabled}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
