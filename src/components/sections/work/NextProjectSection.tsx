"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type NextProjectSectionProps = {
	slug: string;
	title: string;
	number: string;
	role: string;
	image?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function NextProjectSection({ slug, title, number, role, image }: NextProjectSectionProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<Link href={`/work/${slug}`} className="group relative block overflow-hidden">
			{/* Background image — subtle, desaturated */}
			{image && (
				<div className="absolute inset-0 z-0">
					<Image
						src={image}
						alt=""
						fill
						className="object-cover opacity-0 grayscale transition-all duration-1000 group-hover:opacity-[0.07] group-hover:scale-105"
						loading="lazy"
					/>
				</div>
			)}

			<div className="relative z-10 border-t border-brand-border">
				<div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
					{/* Label */}
					<motion.p
						className="mb-4 font-mono text-xs uppercase tracking-widest text-brand-gray"
						initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-10% 0px" }}
						transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease }}
					>
						Next project
					</motion.p>

					{/* Project number + title */}
					<div className="flex items-baseline gap-4">
						<motion.span
							className="hidden font-mono text-sm text-brand-gray/50 sm:inline-block"
							initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -8 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.1, ease }}
						>
							{number}
						</motion.span>

						<motion.h2
							className="text-[clamp(1.5rem,4vw,3.5rem)] font-extrabold leading-[0.9] tracking-tighter transition-colors duration-500 group-hover:text-brand-gray"
							initial={
								shouldReduceMotion
									? { opacity: 1 }
									: { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }
							}
							whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
							viewport={{ once: true, margin: "-5% 0px" }}
							transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.1, ease }}
						>
							{title}
						</motion.h2>
					</div>

					{/* Role + arrow */}
					<motion.div
						className="mt-5 flex items-center gap-4"
						initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.25, ease }}
					>
						<span className="font-mono text-xs uppercase tracking-widest text-brand-gray">
							{role}
						</span>
						<span className="inline-block font-mono text-xs text-brand-gray transition-transform duration-500 group-hover:translate-x-2">
							→
						</span>
					</motion.div>

					{/* Animated underline on hover */}
					<motion.div
						className="mt-5 h-px w-full origin-left bg-brand-border"
						initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						viewport={{ once: true }}
						transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.3, ease }}
					/>
				</div>
			</div>
		</Link>
	);
}
