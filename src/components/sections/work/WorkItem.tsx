"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

export function WorkItem({ project }: { project: Project }) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<Link
			href={`/work/${project.slug}`}
				data-cursor="view"
			className="work-item group block overflow-hidden border-b border-brand-border"
					>
			<motion.article
				className="relative grid gap-6 px-6 py-10 transition-colors sm:px-12 md:grid-cols-[80px_1fr_auto] md:gap-8 md:py-12"
				whileHover={
					shouldReduceMotion
						? undefined
						: { backgroundColor: "rgba(10,10,10,0.025)", transition: { duration: 0.35, ease } }
				}
			>
				<motion.span
					className="font-mono text-xs tracking-wide text-brand-gray md:pt-1"
					whileHover={shouldReduceMotion ? undefined : { x: 4 }}
				>
					{project.number}
				</motion.span>
				<div>
					<motion.h2
						className="mb-3 text-[clamp(1.4rem,2.5vw,2rem)] font-bold leading-tight tracking-[-0.02em]"
						whileHover={shouldReduceMotion ? undefined : { x: 10, transition: { duration: 0.35, ease } }}
					>
						{project.title}
					</motion.h2>
					<p className="mb-5 max-w-xl text-sm leading-relaxed text-[#555]">{project.summary}</p>
					<div className="flex flex-wrap gap-2">
						{project.tags.map((tag) => (
							<span
								key={tag}
								className="rounded-full border border-brand-border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-brand-gray"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
				<motion.span
					className="text-2xl text-brand-gray transition-colors group-hover:text-brand-black"
					whileHover={shouldReduceMotion ? undefined : { x: 8, y: -8, rotate: 8 }}
				>
					↗
				</motion.span>
				<span className="absolute bottom-0 left-0 h-px w-0 bg-brand-black transition-all duration-500 ease-out group-hover:w-full" />
			</motion.article>
		</Link>
	);
}
