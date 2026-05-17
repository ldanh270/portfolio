"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Feature } from "./types";

type FeaturesSectionProps = {
	data: Feature[];
};

export function FeaturesSection({ data }: FeaturesSectionProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<div className="border-b border-brand-border py-16">
			<div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
				<FadeIn>
					<p className="mb-12 font-mono text-xs uppercase tracking-widest text-brand-gray">
						Key Features
					</p>
				</FadeIn>

				<div className="grid gap-px border border-brand-border bg-brand-border sm:grid-cols-2">
					{data.map((feature, i) => (
						<motion.div
							key={feature.title}
							className="group relative overflow-hidden bg-brand-white p-6 sm:p-8"
							initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
							transition={{
								duration: shouldReduceMotion ? 0 : 0.55,
								delay: shouldReduceMotion ? 0 : (i % 2) * 0.1,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							<motion.div
								className="absolute inset-0 bg-brand-black"
								initial={{ scaleY: 0, originY: 1 }}
								whileHover={shouldReduceMotion ? {} : { scaleY: 1 }}
								transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
							/>
							<div className="relative z-10">
								<div className="mb-4 flex items-start justify-between">
									<span className="font-mono text-xs text-brand-gray transition-colors duration-300 group-hover:text-brand-white/50">
										{String(i + 1).padStart(2, "0")}
									</span>
								</div>
								<h3 className="mb-3 text-base font-semibold tracking-tight transition-colors duration-300 group-hover:text-brand-white">
									{feature.title}
								</h3>
								<p className="text-sm leading-6 text-[#666] transition-colors duration-300 group-hover:text-brand-white/70">
									{feature.description}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
