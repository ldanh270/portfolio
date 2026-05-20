"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

type OverviewSectionProps = {
	data: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function OverviewSection({ data }: OverviewSectionProps) {
	const shouldReduceMotion = useReducedMotion();
	const words = data.split(" ");

	return (
		<div className="border-b border-brand-border py-20">
			<div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
				<FadeIn>
					<p className="mb-10 font-mono text-xs uppercase tracking-widest text-brand-gray">
						Overview
					</p>
				</FadeIn>
				<div className="max-w-[72ch]">
					<p className="text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.8] text-brand-black/85">
						{words.map((word, i) => (
							<motion.span
								key={i}
								className="inline-block"
								initial={
									shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
								}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-5% 0px -5% 0px" }}
								transition={{
									duration: shouldReduceMotion ? 0 : 0.5,
									delay: shouldReduceMotion ? 0 : i * 0.018,
									ease,
								}}
							>
								{word}&nbsp;
							</motion.span>
						))}
					</p>
				</div>
			</div>
		</div>
	);
}
