"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import type { TechCategory } from "./types";

type TechStackSectionProps = {
	data: TechCategory[];
};

export function TechStackSection({ data }: TechStackSectionProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<div className="border-b border-brand-border py-16">
			<div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
				<FadeIn>
					<p className="mb-12 font-mono text-xs uppercase tracking-widest text-brand-gray">
						Tech Stack
					</p>
				</FadeIn>

				<div className="space-y-10">
					{data.map((cat, ci) => (
						<FadeIn key={cat.category} delay={ci * 0.08}>
							<div className="grid gap-4 lg:grid-cols-[160px_1fr]">
								<p className="font-mono text-xs uppercase tracking-widest text-brand-gray lg:pt-1">
									{cat.category}
								</p>
								<div className="flex flex-wrap gap-2">
									{cat.tools.map((tool, ti) => (
										<motion.span
											key={tool}
											className="border border-brand-border px-3 py-1.5 font-mono text-xs tracking-wide text-brand-black transition-colors hover:border-brand-black hover:bg-brand-black hover:text-brand-white"
											initial={
												shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.88 }
											}
											whileInView={{ opacity: 1, scale: 1 }}
											viewport={{ once: false }}
											transition={{
												duration: shouldReduceMotion ? 0 : 0.3,
												delay: shouldReduceMotion ? 0 : ci * 0.08 + ti * 0.04,
												ease: [0.22, 1, 0.36, 1],
											}}
										>
											{tool}
										</motion.span>
									))}
								</div>
							</div>
						</FadeIn>
					))}
				</div>
			</div>
		</div>
	);
}
