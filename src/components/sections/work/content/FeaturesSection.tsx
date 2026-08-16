"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Feature } from "./types";

type FeaturesSectionProps = {
	data: Feature[];
};

type FeatureRowProps = {
	feature: Feature;
	index: number;
	motionEnabled: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;
const FEATURE_STAGGER_DELAY = 0.08;

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

const numberVariants = {
	rest: { x: 0, opacity: 0.46 },
	hover: { x: 6, opacity: 1 },
};

function formatFeatureNumber(index: number): string {
	return String(index + 1).padStart(2, "0");
}

function getFeatureCountLabel(count: number): string {
	const itemLabel = count === 1 ? "Item" : "Items";
	return `${formatFeatureNumber(count - 1)} ${itemLabel}`;
}

function FeatureRow({ feature, index, motionEnabled }: FeatureRowProps) {
	const featureNumber = formatFeatureNumber(index);

	return (
		<motion.article
			initial={motionEnabled ? { opacity: 0, y: 24, filter: "blur(6px)" } : { opacity: 1 }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			viewport={{ once: false, margin: "-10% 0px" }}
			transition={{
				duration: motionEnabled ? 0.7 : 0,
				delay: motionEnabled ? index * FEATURE_STAGGER_DELAY : 0,
				ease,
			}}
		>
			<motion.div
				initial="rest"
				whileHover={motionEnabled ? "hover" : undefined}
				variants={rowVariants}
				transition={{ duration: motionEnabled ? 0.42 : 0, ease }}
				className="group relative isolate overflow-hidden border border-brand-border bg-brand-white px-5 py-7 sm:px-8 sm:py-9 lg:grid lg:grid-cols-[8rem_1fr] lg:gap-10"
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

				<div className="relative z-10 flex items-end justify-between gap-6 lg:block">
					<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray">
						Feature
					</p>
					<motion.p
						aria-hidden="true"
						variants={numberVariants}
						transition={{ duration: motionEnabled ? 0.35 : 0, ease }}
						className="font-mono text-4xl font-light leading-none tracking-tight text-brand-gray lg:mt-5 lg:text-5xl"
					>
						{featureNumber}
					</motion.p>
				</div>

				<div className="relative z-10 mt-6 lg:mt-0">
					<h3 className="max-w-2xl text-[clamp(1.35rem,2.5vw,2.15rem)] font-bold leading-[1.05] tracking-tight text-brand-black">
						{feature.title}
					</h3>
					<div className="mt-5 h-px overflow-hidden bg-brand-border">
						<motion.div
							aria-hidden="true"
							variants={lineVariants}
							transition={{ duration: motionEnabled ? 0.38 : 0, ease }}
							className="h-full origin-left bg-brand-black"
						/>
					</div>
					<p className="mt-5 max-w-[65ch] text-sm leading-7 text-[#444]">
						{feature.description}
					</p>
				</div>
			</motion.div>
		</motion.article>
	);
}

export function FeaturesSection({ data }: FeaturesSectionProps) {
	const shouldReduceMotion = useReducedMotion();
	const motionEnabled = !shouldReduceMotion;

	return (
		<div className="border-b border-brand-border py-16 sm:py-20">
			<div className="mx-auto grid max-w-5xl gap-10 px-6 sm:px-8 lg:grid-cols-[180px_1fr] lg:gap-16 lg:px-12">
				<FadeIn>
					<div className="lg:sticky lg:top-24">
						<p className="font-mono text-xs uppercase tracking-widest text-brand-gray">
							Key Features
						</p>
						<div className="mt-6 hidden h-px w-16 bg-brand-black/35 lg:block" />
						<p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray">
							{getFeatureCountLabel(data.length)}
						</p>
					</div>
				</FadeIn>

				<div className="space-y-4">
					{data.map((feature, i) => (
						<FeatureRow
							key={feature.title}
							feature={feature}
							index={i}
							motionEnabled={motionEnabled}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
