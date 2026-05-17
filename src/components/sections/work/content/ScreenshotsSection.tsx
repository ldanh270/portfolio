"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";

type ScreenshotsSectionProps = {
	data: string[];
};

export function ScreenshotsSection({ data }: ScreenshotsSectionProps) {
	const shouldReduceMotion = useReducedMotion();
	const [lightbox, setLightbox] = useState<string | null>(null);

	if (data.length === 0) return null;

	return (
		<>
			<div className="border-b border-brand-border py-16">
				<div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
					<FadeIn>
						<p className="mb-12 font-mono text-xs uppercase tracking-widest text-brand-gray">
							Screenshots
						</p>
					</FadeIn>

					<div className="columns-1 gap-4 sm:columns-2" style={{ columnFill: "balance" }}>
						{data.map((src, i) => (
							<motion.div
								key={src}
								className="mb-4 break-inside-avoid cursor-zoom-in overflow-hidden rounded-sm bg-[#e0ddd8]"
								initial={
									shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 }
								}
								whileInView={{ opacity: 1, y: 0, scale: 1 }}
								whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
								viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
								transition={{
									duration: shouldReduceMotion ? 0 : 0.6,
									delay: shouldReduceMotion ? 0 : i * 0.08,
									ease: [0.22, 1, 0.36, 1],
								}}
								onClick={() => setLightbox(src)}
							>
								<Image
									src={src}
									alt={`Screenshot ${i + 1}`}
									width={900}
									height={600}
									className="w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
									loading="lazy"
								/>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Lightbox */}
			{lightbox && (
				<motion.div
					className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/90 p-4 sm:p-12"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={() => setLightbox(null)}
				>
					<motion.div
						className="relative max-h-full w-full max-w-5xl overflow-hidden rounded-sm"
						initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.92 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
						onClick={(e) => e.stopPropagation()}
					>
						<Image
							src={lightbox}
							alt="Screenshot fullsize"
							width={1400}
							height={900}
							className="w-full rounded-sm object-contain"
						/>
						<button
							onClick={() => setLightbox(null)}
							className="absolute right-4 top-4 font-mono text-xs text-brand-white/60 hover:text-brand-white"
						>
							✕ CLOSE
						</button>
					</motion.div>
				</motion.div>
			)}
		</>
	);
}
