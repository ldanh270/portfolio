"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Service } from "@/data/services";

type ServiceCardProps = {
	service: Service;
	index: number;
};

const ease = [0.22, 1, 0.36, 1] as const;
const tagDelayStep = 0.04;

const cardVariants = {
	rest: { y: 0, boxShadow: "0 0 0 rgba(10,10,10,0)" },
	hover: {
		y: -6,
		boxShadow: "0 18px 45px rgba(10,10,10,0.08)",
	},
};

const surfaceVariants = {
	rest: { opacity: 0, scale: 0.985 },
	hover: { opacity: 1, scale: 1 },
};

const lineVariants = {
	rest: { scaleX: 0 },
	hover: { scaleX: 1 },
};

const titleVariants = {
	rest: { x: 0 },
	hover: { x: 6 },
};

const arrowVariants = {
	rest: { x: -6, rotate: -30, opacity: 0.45 },
	hover: { x: 0, rotate: 0, opacity: 1 },
};

export default function ServiceCard({ service, index }: ServiceCardProps) {
	const shouldReduceMotion = useReducedMotion();
	const motionEnabled = !shouldReduceMotion;

	return (
		<FadeIn
			delay={index * 0.09}
			y={24}
			className="group relative border-b border-brand-border"
		>
			<motion.article
				initial="rest"
				whileHover="hover"
				whileTap={motionEnabled ? { scale: 0.996 } : undefined}
				variants={cardVariants}
				transition={{ duration: motionEnabled ? 0.45 : 0, ease }}
				className="relative isolate overflow-hidden bg-brand-white px-8 py-12 sm:px-16 md:px-24 lg:px-32"
			>
				<motion.p
					aria-hidden="true"
					variants={surfaceVariants}
					transition={{ duration: motionEnabled ? 0.32 : 0, ease }}
					className="absolute inset-3 z-0 border border-brand-border bg-[rgba(10,10,10,0.02)]"
				/>
				<motion.span
					aria-hidden="true"
					variants={lineVariants}
					transition={{ duration: motionEnabled ? 0.38 : 0, ease }}
					className="absolute left-8 right-8 top-0 z-10 h-px origin-left bg-brand-black/70 sm:left-16 sm:right-16 md:left-24 md:right-24 lg:left-32 lg:right-32"
				/>

				<div className="relative z-10 grid gap-8 lg:grid-cols-[15rem_1fr] lg:gap-12">
					<div className="flex items-start justify-between gap-4 lg:block">
						<div>
							<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-gray">
								{service.number}
							</p>
							<motion.span
								aria-hidden="true"
								variants={lineVariants}
								transition={{ duration: motionEnabled ? 0.3 : 0, ease }}
								className="mt-4 hidden h-px w-10 origin-left bg-brand-black/30 lg:block"
							/>
						</div>

						<motion.h3
							className="max-w-[18rem] text-2xl font-bold leading-[0.95] tracking-tight text-brand-black sm:text-3xl"
							variants={titleVariants}
							transition={{ duration: motionEnabled ? 0.35 : 0, ease }}
						>
							{service.title}
						</motion.h3>
					</div>

					<div>
						<motion.div
							variants={{
								rest: { y: 0 },
								hover: { y: -2 },
							}}
							transition={{ duration: motionEnabled ? 0.35 : 0, ease }}
						>
							<div className="mb-5 flex flex-wrap items-start justify-between gap-4">
								{service.tags.length > 0 && (
									<div className="flex flex-wrap gap-2">
										{service.tags.map((tag, i) => (
											<motion.span
												key={tag}
												className="border border-brand-border bg-brand-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-gray"
												variants={{
													rest: { opacity: 0.82 },
													hover: { opacity: 1 },
												}}
												transition={{
													duration: motionEnabled ? 0.22 : 0,
													delay: i * tagDelayStep,
													ease,
												}}
											>
												{tag}
											</motion.span>
										))}
									</div>
								)}

								<motion.span
									aria-hidden="true"
									variants={arrowVariants}
									transition={{ duration: motionEnabled ? 0.35 : 0, ease }}
									className="grid size-9 shrink-0 place-items-center rounded-full border border-brand-border bg-brand-white font-mono text-sm text-brand-black shadow-[0_1px_0_rgba(10,10,10,0.04)]"
								>
									↗
								</motion.span>
							</div>

							<div className="h-px overflow-hidden bg-brand-border">
								<motion.div
									aria-hidden="true"
									variants={lineVariants}
									transition={{ duration: motionEnabled ? 0.38 : 0, ease }}
									className="h-full origin-left bg-brand-black"
								/>
							</div>

							<p className="mt-5 max-w-3xl text-sm leading-7 text-[#555]">
								{service.description}
							</p>
						</motion.div>
					</div>
				</div>
			</motion.article>
		</FadeIn>
	);
}
