"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ApproachStep } from "@/data/services";

type ApproachStepCardProps = {
	step: ApproachStep;
	index: number;
	isLast: boolean;
};

export function ApproachStepCard({ step, index, isLast }: ApproachStepCardProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.article
			className={`group relative md:px-26 overflow-hidden ${!isLast ? "border-b border-brand-border" : ""}`}
			initial={{ opacity: 0, x: 24 }}
			whileInView={{ opacity: 1, x: 0 }}
			whileHover="hover"
			transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
			viewport={{ once: true, margin: "-10% 0px" }}
		>
			{/* Black fill */}
			<motion.div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 z-0 bg-brand-white"
				variants={{
					rest: { x: "-100%" },
					hover: shouldReduceMotion ? {} : { x: "0%", backgroundColor: "rgba(10,10,10,1)" },
				}}
				transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			/>

			{/* Grid layout: number col + content col */}
			<div className="relative z-10 grid grid-cols-[6rem_1fr] gap-8 px-6 py-10 sm:grid-cols-[8rem_1fr] sm:gap-12 sm:px-12 md:grid-cols-[10rem_1fr]">
				{/* Number */}
				<motion.p
					aria-hidden="true"
					className="self-start font-extrabold font-mono leading-none tracking-tighter"
					style={{ fontSize: "clamp(3.5rem,8vw,6rem)" }}
					variants={{
						rest: { color: "rgba(255,255,255,0.25)" },
						hover: shouldReduceMotion ? {} : { color: "rgba(255,255,255,0.25)" },
					}}
					transition={{ duration: 0.35 }}
				>
					{step.number}
				</motion.p>

				{/* Content */}
				<div className="flex flex-col justify-center gap-3 py-1">
					{/* Title + duration */}
					<div className="flex flex-wrap items-center gap-3">
						<motion.h3
							className="font-extrabold uppercase leading-tight tracking-tighter"
							style={{ fontSize: "clamp(1.1rem,2.2vw,1.5rem)" }}
							variants={{
								rest: { color: "#0a0a0a" },
								hover: shouldReduceMotion ? {} : { color: "#ffffff" },
							}}
							transition={{ duration: 0.3 }}
						>
							{step.title}
						</motion.h3>
						<motion.span
							className="border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
							variants={{
								rest: { borderColor: "rgba(229,229,229,1)", color: "rgba(120,120,120,1)" },
								hover:
									shouldReduceMotion ?
										{}
									:	{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.45)" },
							}}
							transition={{ duration: 0.3 }}
						>
							{step.duration}
						</motion.span>
					</div>

					{/* Description */}
					<motion.p
						className="text-sm leading-7"
						style={{ maxWidth: "52ch" }}
						variants={{
							rest: { color: "#666666" },
							hover: shouldReduceMotion ? {} : { color: "rgba(255,255,255,0.6)" },
						}}
						transition={{ duration: 0.3 }}
					>
						{step.description}
					</motion.p>

					{/* Deliverables */}
					{step.deliverables.length > 0 && (
						<div className="flex flex-wrap gap-x-4 gap-y-1">
							{step.deliverables.map((item, i) => (
								<motion.span
									key={item}
									className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest"
									variants={{
										rest: { color: "rgba(150,150,150,1)" },
										hover: shouldReduceMotion ? {} : { color: "rgba(255,255,255,0.38)" },
									}}
									transition={{ duration: 0.25, delay: i * 0.04 }}
								>
									<span className="h-1 w-1 rounded-full bg-current" />
									{item}
								</motion.span>
							))}
						</div>
					)}
				</div>
			</div>
		</motion.article>
	);
}
