"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import type { ProjectLink } from "./types";

type LinksSectionProps = {
	data: ProjectLink[];
};

const LINK_ICONS: Record<ProjectLink["type"], string> = {
	live: "↗",
	github: "⌘",
	"case-study": "◉",
	other: "→",
};

export function LinksSection({ data }: LinksSectionProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<div className="border-b border-brand-border py-16">
			<div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
				<FadeIn>
					<p className="mb-10 font-mono text-xs uppercase tracking-widest text-brand-gray">
						Links
					</p>
				</FadeIn>

				<div className="flex flex-wrap gap-3">
					{data.map((link, i) => (
						<motion.a
							key={link.href}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group relative inline-flex items-center gap-2 overflow-hidden border border-brand-border px-5 py-3 font-mono text-xs uppercase tracking-widest text-brand-black transition-colors duration-300 hover:border-brand-black hover:bg-brand-black hover:text-brand-white"
							initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: shouldReduceMotion ? 0 : 0.45,
								delay: shouldReduceMotion ? 0 : i * 0.07,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							<span className="text-sm">{LINK_ICONS[link.type]}</span>
							{link.label}
						</motion.a>
					))}
				</div>
			</div>
		</div>
	);
}
