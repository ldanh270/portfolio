"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Service } from "@/data/services";
import { RadialHover } from "@/components/ui/RadialHover.tsx";

type ServiceCardProps = {
	service: Service;
	index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<FadeIn
			delay={index * 0.09}
			y={24}
			className="group relative border-b border-brand-border"
		>
			<RadialHover
				className="relative h-full cursor-default overflow-hidden px-6 py-12 sm:px-36"
				as="div"
				shape="parallelVertical"
			>
				{/* Watermark number — drifts right on hover */}
				<motion.p
					aria-hidden="true"
					className="pointer-events-none absolute right-24 top-4 select-none font-extrabold leading-none tracking-tighter"
					style={{ fontSize: "clamp(6rem,14vw,11rem)" }}
					variants={{
						rest: { x: 0, color: "rgba(10,10,10,0.06)" },
						hover: shouldReduceMotion ? {} : { x: 32, color: "rgba(255,255,255,0.07)" },
					}}
					transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
				>
					{service.number}
				</motion.p>

				{/* Content */}
				<div className="relative z-10">
					{/* Number label */}
					<motion.p
						className="mb-6 font-mono text-[10px] uppercase tracking-widest"
						variants={{
							rest: { color: "rgba(100,100,100,1)" },
							hover: shouldReduceMotion ? {} : { color: "rgba(255,255,255,0.4)" },
						}}
						transition={{ duration: 0.3 }}
					>
						{service.number}
					</motion.p>

					{/* Title + arrow row */}
					<div className="mb-4 flex items-baseline justify-between gap-4">
						<motion.h3
							className="font-extrabold uppercase leading-[0.92] tracking-tighter"
							style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)" }}
							variants={{
								rest: { color: "#0a0a0a" },
								hover: shouldReduceMotion ? {} : { color: "#ffffff" },
							}}
							transition={{ duration: 0.3 }}
						>
							{service.title}
						</motion.h3>

						{/* Arrow — slides in from left */}
						<motion.span
							aria-hidden="true"
							className="shrink-0 font-mono text-lg text-brand-white"
							variants={{
								rest: { opacity: 0, x: -20 },
								hover: shouldReduceMotion ? {} : { opacity: 1, x: 0 },
							}}
							transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
						>
							↗
						</motion.span>
					</div>

					{/* Underline sweep */}
					<div className="mb-5 h-px w-full overflow-hidden bg-transparent">
						<motion.div
							className="h-px bg-[rgba(255,255,255,0.15)]"
							variants={{
								rest: { scaleX: 0, originX: 0 },
								hover: shouldReduceMotion ? {} : { scaleX: 1, originX: 0 },
							}}
							transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
						/>
					</div>

					{/* Description */}
					<motion.p
						className="max-w-sm text-sm leading-7"
						variants={{
							rest: { color: "#555555" },
							hover: shouldReduceMotion ? {} : { color: "rgba(255,255,255,0.65)" },
						}}
						transition={{ duration: 0.3 }}
					>
						{service.description}
					</motion.p>

					{/* Tags */}
					{service.tags.length > 0 && (
						<div className="mt-6 flex flex-wrap gap-2">
							{service.tags.map((tag, i) => (
								<motion.span
									key={tag}
									className="border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
									variants={{
										rest: { borderColor: "rgba(229,229,229,1)", color: "rgba(100,100,100,1)" },
										hover: shouldReduceMotion
											? {}
											: { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.45)" },
									}}
									transition={{ duration: 0.25, delay: i * 0.04 }}
								>
									{tag}
								</motion.span>
							))}
						</div>
					)}
				</div>
			</RadialHover>
		</FadeIn>
	);
}
