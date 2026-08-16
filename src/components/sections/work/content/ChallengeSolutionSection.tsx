"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import type { ChallengeSolution } from "./types";

type ChallengeSolutionSectionProps = {
	data: ChallengeSolution;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ChallengeSolutionSection({ data }: ChallengeSolutionSectionProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<div className="overflow-hidden">
			{/* Challenge — inverted full-bleed */}
			<div className="bg-brand-white py-20 text-brand-black">
				<div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
					<FadeIn>
						<p className="mb-10 font-mono text-xs uppercase tracking-widest text-brand-black/40">
							The Challenge
						</p>
					</FadeIn>
					<div className="max-w-[65ch]">
						<motion.p
							className="text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.8] text-brand-black/85"
							initial={
								shouldReduceMotion ?
									{ opacity: 1 }
								:	{ opacity: 0, y: 30, filter: "blur(8px)" }
							}
							whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
							transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease }}
						>
							{data.challenge}
						</motion.p>
					</div>
				</div>
			</div>

			{/* Solution — light */}
			<div className="pb-16 pt-6 sm:pt-8">
				<div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
					<FadeIn>
						<p className="mb-10 font-mono text-xs uppercase tracking-widest text-brand-gray">
							The Solution
						</p>
					</FadeIn>
					<div className="max-w-[65ch]">
						<motion.p
							className="text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.8] text-[#444]"
							initial={
								shouldReduceMotion ?
									{ opacity: 1 }
								:	{ opacity: 0, y: 30, filter: "blur(8px)" }
							}
							whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
							transition={{
								duration: shouldReduceMotion ? 0 : 0.9,
								delay: 0.15,
								ease,
							}}
						>
							{data.solution}
						</motion.p>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
				<div className="h-px bg-brand-border" />
			</div>
		</div>
	);
}
