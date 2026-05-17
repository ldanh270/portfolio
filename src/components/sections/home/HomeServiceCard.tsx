"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { Service } from "@/data/services";

type HomeServiceCardProps = {
	service: Service;
};

const ease = [0.22, 1, 0.36, 1] as const;
const TAG_LIMIT = 3;

const surface: Variants = {
	rest: { opacity: 0, scale: 0.96 },
	hover: { opacity: 1, scale: 1 },
};

const accentLine: Variants = {
	rest: { scaleX: 0 },
	hover: { scaleX: 1 },
};

const tagList: Variants = {
	rest: { y: 0 },
	hover: { y: -2 },
};

export function HomeServiceCard({ service }: HomeServiceCardProps) {
	const shouldReduceMotion = useReducedMotion();
	const duration = shouldReduceMotion ? 0 : 0.55;

	return (
		<Link
			href="/services"
			className="group block h-full focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-black"
		>
			<motion.article
				initial="rest"
				whileHover="hover"
				whileTap={shouldReduceMotion ? undefined : { scale: 0.992 }}
				variants={{
					rest: { y: 0, boxShadow: "0 0 0 rgba(10,10,10,0)" },
					hover:
						shouldReduceMotion ?
							{}
						:	{
								y: -6,
								boxShadow: "0 22px 55px rgba(10,10,10,0.1)",
							},
				}}
				transition={{ duration, ease }}
				className="relative isolate h-full min-h-72 overflow-hidden border-b border-brand-border bg-brand-white px-6 py-10 transition-colors duration-300 group-hover:border-brand-black/25 sm:px-12 md:border-r"
			>
				<motion.span
					aria-hidden="true"
					variants={surface}
					transition={{ duration: shouldReduceMotion ? 0 : 0.38, ease }}
					className="absolute inset-3 z-0 border border-brand-border bg-[rgba(10,10,10,0.018)]"
				/>
				<motion.span
					aria-hidden="true"
					variants={accentLine}
					transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease }}
					className="absolute left-6 right-6 top-0 z-10 h-px origin-left bg-brand-black sm:left-12 sm:right-12"
				/>

				<div className="relative z-20 flex h-full flex-col">
					<div className="mb-8 flex items-center justify-between gap-4">
						<p className="font-mono text-xs tracking-wide text-brand-gray transition-colors duration-300 group-hover:text-brand-black">
							{service.number}
						</p>
						<motion.span
							aria-hidden="true"
							variants={{
								rest: { x: -6, rotate: -35 },
								hover: { x: 0, rotate: 0 },
							}}
							transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease }}
							className="grid size-9 place-items-center rounded-full border border-brand-border bg-brand-white font-mono text-sm text-brand-black transition-colors duration-300 group-hover:border-brand-black"
						>
							↗
						</motion.span>
					</div>

					<motion.div
						variants={{
							rest: { y: 0 },
							hover: { y: -3 },
						}}
						transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease }}
					>
						<h2 className="max-w-72 text-2xl font-bold tracking-tight text-brand-black">
							{service.title}
						</h2>
						<div className="mt-5 h-px overflow-hidden bg-brand-border">
							<motion.span
								aria-hidden="true"
								variants={accentLine}
								transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease }}
								className="block h-full origin-left bg-brand-black"
							/>
						</div>
						<p className="mt-5 max-w-sm text-sm leading-relaxed text-[#555]">
							{service.description}
						</p>
					</motion.div>

					<motion.div
						variants={tagList}
						transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease }}
						className="mt-auto flex flex-wrap gap-2 pt-8"
					>
						{service.tags.slice(0, TAG_LIMIT).map((tag) => (
							<span
								key={tag}
								className="border border-brand-border bg-brand-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-gray transition-colors duration-300 group-hover:border-brand-black/20 group-hover:text-brand-black"
							>
								{tag}
							</span>
						))}
					</motion.div>
				</div>
			</motion.article>
		</Link>
	);
}
