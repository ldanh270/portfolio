"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ApproachStep } from "@/data/services";

type ApproachStepCardProps = {
	step: ApproachStep;
	index: number;
	isLast: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;
const DELIVERABLE_DELAY = 0.035;

const cardVariants = {
	rest: { y: 0, boxShadow: "0 0 0 rgba(10,10,10,0)" },
	hover: { y: -5, boxShadow: "0 20px 55px rgba(10,10,10,0.08)" },
};

const surfaceVariants = {
	rest: { opacity: 0, scale: 0.985 },
	hover: { opacity: 1, scale: 1 },
};

const lineVariants = {
	rest: { scaleX: 0 },
	hover: { scaleX: 1 },
};

const markerVariants = {
	rest: { scale: 1, backgroundColor: "#fafaf8" },
	hover: { scale: 1.12, backgroundColor: "#0a0a0a" },
};

const numberVariants = {
	rest: { x: 0, opacity: 0.5 },
	hover: { x: 8, opacity: 1 },
};

const contentVariants = {
	rest: { y: 0 },
	hover: { y: -3 },
};

const getStepLabel = (index: number): string => {
	return `Phase ${String(index + 1).padStart(2, "0")}`;
};

export function ApproachStepCard({ step, index, isLast }: ApproachStepCardProps) {
	const shouldReduceMotion = useReducedMotion();
	const motionEnabled = !shouldReduceMotion;

	return (
		<motion.article
			initial={motionEnabled ? { opacity: 0, y: 24, filter: "blur(6px)" } : { opacity: 1 }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			viewport={{ once: true, margin: "-10% 0px" }}
			transition={{ duration: motionEnabled ? 0.7 : 0, delay: index * 0.08, ease }}
			className={`relative ${isLast ? "" : "pb-6"}`}
		>
			<motion.div
				initial="rest"
				whileHover="hover"
				whileTap={motionEnabled ? { scale: 0.997 } : undefined}
				variants={cardVariants}
				transition={{ duration: motionEnabled ? 0.42 : 0, ease }}
				className="group relative isolate overflow-hidden border border-brand-border bg-brand-white px-6 py-7 sm:px-8 lg:ml-12 lg:grid lg:grid-cols-[9rem_1fr] lg:gap-12 lg:px-10 lg:py-9"
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
					className="absolute left-6 right-6 top-0 z-10 h-px origin-left bg-brand-black sm:left-8 sm:right-8 lg:left-10 lg:right-10"
				/>
				<motion.span
					aria-hidden="true"
					variants={markerVariants}
					transition={{ duration: motionEnabled ? 0.28 : 0, ease }}
					className="absolute left-[-3.24rem] top-9 hidden size-3 rounded-full border border-brand-black lg:block"
				/>

				<div className="relative z-10 mb-8 flex items-start justify-between gap-6 lg:mb-0 lg:block">
					<div>
						<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray">
							{getStepLabel(index)}
						</p>
						<motion.p
							aria-hidden="true"
							variants={numberVariants}
							transition={{ duration: motionEnabled ? 0.35 : 0, ease }}
							className="mt-4 font-mono text-5xl font-light leading-none tracking-tight text-brand-gray"
						>
							{step.number}
						</motion.p>
					</div>

					<span className="border border-brand-border bg-brand-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-gray">
						{step.duration}
					</span>
				</div>

				<motion.div
					variants={contentVariants}
					transition={{ duration: motionEnabled ? 0.35 : 0, ease }}
					className="relative z-10"
				>
					<div className="flex flex-wrap items-start justify-between gap-5">
						<h3 className="max-w-2xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
							{step.title}
						</h3>
						<span
							aria-hidden="true"
							className="grid size-9 shrink-0 place-items-center rounded-full border border-brand-border bg-brand-white font-mono text-sm text-brand-black transition-colors duration-300 group-hover:border-brand-black"
						>
							{index + 1}
						</span>
					</div>

					<div className="mt-5 h-px overflow-hidden bg-brand-border">
						<motion.div
							aria-hidden="true"
							variants={lineVariants}
							transition={{ duration: motionEnabled ? 0.38 : 0, ease }}
							className="h-full origin-left bg-brand-black"
						/>
					</div>

					<p className="mt-5 max-w-3xl text-sm leading-7 text-[#555]">
						{step.description}
					</p>

					{step.deliverables.length > 0 && (
						<div className="mt-6 flex flex-wrap gap-2">
							{step.deliverables.map((item, itemIndex) => (
								<motion.span
									key={item}
									variants={{
										rest: { y: 0, opacity: 0.78 },
										hover: { y: -2, opacity: 1 },
									}}
									transition={{
										duration: motionEnabled ? 0.24 : 0,
										delay: itemIndex * DELIVERABLE_DELAY,
										ease,
									}}
									className="border border-brand-border bg-brand-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-gray transition-colors duration-300 group-hover:border-brand-black/20 group-hover:text-brand-black"
								>
									{item}
								</motion.span>
							))}
						</div>
					)}
				</motion.div>
			</motion.div>
		</motion.article>
	);
}
