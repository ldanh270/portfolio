"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

type RoleDetailSectionProps = {
	data: string;
};

export function RoleDetailSection({ data }: RoleDetailSectionProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<div className="border-b border-brand-border py-16">
			<div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
				<div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
					<FadeIn>
						<p className="font-mono text-xs uppercase tracking-widest text-brand-gray lg:sticky lg:top-24 lg:self-start">
							My Role
						</p>
					</FadeIn>
					<div>
						<FadeIn>
							<motion.div
								className="border-l-2 border-brand-black pl-6"
								initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0, originY: 0 }}
								whileInView={{ scaleY: 1 }}
								viewport={{ once: true }}
								transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
							>
								<p className="max-w-[60ch] text-base leading-8 text-[#444]">{data}</p>
							</motion.div>
						</FadeIn>
					</div>
				</div>
			</div>
		</div>
	);
}
