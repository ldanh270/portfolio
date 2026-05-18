"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import type { ProjectScreenshot, ScreenshotEntry } from "./types";

type ScreenshotsSectionProps = {
	data: ScreenshotEntry[];
};

type NormalizedScreenshot = Required<Pick<ProjectScreenshot, "title" | "variant">> &
	Omit<ProjectScreenshot, "title" | "variant">;

const ease = [0.22, 1, 0.36, 1] as const;
const SCREENSHOT_STAGGER_DELAY = 0.08;

const cardVariants = {
	rest: {
		backgroundColor: "rgba(250,250,248,1)",
		borderColor: "rgba(10,10,10,0.12)",
	},
	hover: {
		backgroundColor: "rgba(10,10,10,0.018)",
		borderColor: "rgba(10,10,10,0.42)",
	},
};

const lineVariants = {
	rest: { scaleX: 0 },
	hover: { scaleX: 1 },
};

const previewVariants = {
	rest: { scale: 1 },
	hover: { scale: 1.015 },
};

function normalizeScreenshot(item: ScreenshotEntry, index: number): NormalizedScreenshot {
	if (typeof item === "string") {
		return {
			title: `Project screen ${String(index + 1).padStart(2, "0")}`,
			image: item,
			variant: "dashboard",
		};
	}

	return {
		title: item.title,
		description: item.description,
		image: item.image,
		variant: item.variant ?? "dashboard",
	};
}

function getScreenshotCountLabel(count: number): string {
	const itemLabel = count === 1 ? "Screen" : "Screens";
	return `${String(count).padStart(2, "0")} ${itemLabel}`;
}

function MockScreen({ screenshot }: { screenshot: NormalizedScreenshot }) {
	const metricBars = ["w-[72%]", "w-[48%]", "w-[62%]"];
	const navItems = ["w-12", "w-16", "w-10", "w-14"];

	if (screenshot.variant === "mobile") {
		return (
			<div className="flex h-full items-center justify-center bg-[rgba(10,10,10,0.035)] p-8">
				<div className="h-full max-h-[28rem] w-[min(13rem,70%)] border border-brand-black bg-brand-white p-3 shadow-[10px_10px_0_rgba(10,10,10,0.08)]">
					<div className="mx-auto mb-5 h-1 w-12 bg-brand-black/30" />
					<div className="mb-5 h-28 border border-brand-border bg-[rgba(10,10,10,0.03)]" />
					<div className="space-y-3">
						<div className="h-3 w-2/3 bg-brand-black" />
						<div className="h-2 w-full bg-brand-border" />
						<div className="h-2 w-4/5 bg-brand-border" />
					</div>
					<div className="mt-8 grid grid-cols-2 gap-3">
						<div className="h-20 border border-brand-border" />
						<div className="h-20 border border-brand-border bg-[rgba(10,10,10,0.03)]" />
					</div>
				</div>
			</div>
		);
	}

	if (screenshot.variant === "commerce") {
		return (
			<div className="h-full bg-[rgba(10,10,10,0.035)] p-6">
				<div className="grid h-full grid-cols-[0.7fr_1fr] gap-4 border border-brand-border bg-brand-white p-4">
					<div className="border border-brand-border bg-[rgba(10,10,10,0.04)]" />
					<div className="flex flex-col">
						<div className="h-3 w-3/4 bg-brand-black" />
						<div className="mt-4 h-2 w-full bg-brand-border" />
						<div className="mt-2 h-2 w-5/6 bg-brand-border" />
						<div className="mt-8 grid grid-cols-3 gap-2">
							<div className="h-16 border border-brand-border" />
							<div className="h-16 border border-brand-border" />
							<div className="h-16 border border-brand-border bg-[rgba(10,10,10,0.03)]" />
						</div>
						<div className="mt-auto h-10 bg-brand-black" />
					</div>
				</div>
			</div>
		);
	}

	if (screenshot.variant === "system") {
		return (
			<div className="h-full bg-[rgba(10,10,10,0.035)] p-6">
				<div className="grid h-full grid-cols-4 gap-px border border-brand-border bg-brand-border">
					{Array.from({ length: 12 }, (_, index) => (
						<div
							key={index}
							className="bg-brand-white p-3"
						>
							<div className="mb-4 h-8 w-8 border border-brand-border" />
							<div className="h-2 w-4/5 bg-brand-black/70" />
							<div className="mt-2 h-2 w-2/3 bg-brand-border" />
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="h-full bg-[rgba(10,10,10,0.035)] p-6">
			<div className="flex h-full flex-col border border-brand-border bg-brand-white">
				<div className="flex h-12 items-center justify-between border-b border-brand-border px-4">
					<div className="flex gap-1.5">
						<span className="size-2 border border-brand-black" />
						<span className="size-2 border border-brand-border" />
						<span className="size-2 border border-brand-border" />
					</div>
					<div className="flex gap-3">
						{navItems.map((width, index) => (
							<span
								key={index}
								className={`h-2 ${width} bg-brand-border`}
							/>
						))}
					</div>
				</div>
				<div className="grid flex-1 grid-cols-[0.35fr_1fr]">
					<div className="border-r border-brand-border p-4">
						<div className="mb-6 h-3 w-20 bg-brand-black" />
						<div className="space-y-3">
							{metricBars.map((width, index) => (
								<div
									key={index}
									className={`h-2 ${width} bg-brand-border`}
								/>
							))}
						</div>
					</div>
					<div className="grid grid-cols-2 gap-3 p-4">
						<div className="col-span-2 border border-brand-border bg-[rgba(10,10,10,0.03)]" />
						<div className="border border-brand-border" />
						<div className="border border-brand-border bg-[rgba(10,10,10,0.025)]" />
					</div>
				</div>
			</div>
		</div>
	);
}

function ScreenshotPreview({ screenshot }: { screenshot: NormalizedScreenshot }) {
	if (screenshot.image) {
		return (
			<Image
				src={screenshot.image}
				alt={screenshot.title}
				fill
				className="object-cover"
				loading="lazy"
				sizes="(min-width: 1024px) 42vw, 100vw"
			/>
		);
	}

	return <MockScreen screenshot={screenshot} />;
}

export function ScreenshotsSection({ data }: ScreenshotsSectionProps) {
	const shouldReduceMotion = useReducedMotion();
	const motionEnabled = !shouldReduceMotion;
	const [lightbox, setLightbox] = useState<NormalizedScreenshot | null>(null);
	const screenshots = data.map(normalizeScreenshot);

	return (
		<>
			<div className="border-b border-brand-border py-16 sm:py-20">
				<div className="mx-auto grid max-w-5xl gap-10 px-6 sm:px-8 lg:grid-cols-[180px_1fr] lg:gap-16 lg:px-12">
					<FadeIn>
						<div className="lg:sticky lg:top-24">
							<p className="font-mono text-xs uppercase tracking-widest text-brand-gray">
								Screenshots
							</p>
							<div className="mt-6 hidden h-px w-16 bg-brand-black/35 lg:block" />
							<p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray">
								{getScreenshotCountLabel(screenshots.length)}
							</p>
						</div>
					</FadeIn>

					<div className="grid gap-4">
						{screenshots.map((screenshot, index) => (
							<motion.button
								key={`${screenshot.title}-${index}`}
								type="button"
								initial={
									motionEnabled ? { opacity: 0, y: 24, filter: "blur(6px)" } : { opacity: 1 }
								}
								whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
								whileHover={motionEnabled ? "hover" : undefined}
								viewport={{ once: true, margin: "-10% 0px" }}
								transition={{
									duration: motionEnabled ? 0.7 : 0,
									delay: motionEnabled ? index * SCREENSHOT_STAGGER_DELAY : 0,
									ease,
								}}
								variants={cardVariants}
								onClick={() => setLightbox(screenshot)}
								className="group relative isolate overflow-hidden border border-brand-border bg-brand-white text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-black"
							>
								<motion.span
									aria-hidden="true"
									variants={lineVariants}
									transition={{ duration: motionEnabled ? 0.38 : 0, ease }}
									className="absolute left-5 right-5 top-0 z-20 h-px origin-left bg-brand-black sm:left-8 sm:right-8"
								/>
								<div className="grid lg:grid-cols-[1fr_14rem]">
									<motion.div
										variants={previewVariants}
										transition={{ duration: motionEnabled ? 0.5 : 0, ease }}
										className="relative aspect-[16/10] overflow-hidden border-b border-brand-border lg:border-b-0 lg:border-r"
									>
										<ScreenshotPreview screenshot={screenshot} />
									</motion.div>
									<div className="flex min-h-52 flex-col justify-between p-5 sm:p-8">
										<div>
											<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray">
												Screen {String(index + 1).padStart(2, "0")}
											</p>
											<h3 className="mt-4 text-2xl font-extrabold leading-[0.98] tracking-tighter text-brand-black">
												{screenshot.title}
											</h3>
											{screenshot.description && (
												<p className="mt-4 text-sm leading-6 text-[#555]">
													{screenshot.description}
												</p>
											)}
										</div>
										<div className="mt-8">
											<div className="mb-5 h-px overflow-hidden bg-brand-border">
												<motion.div
													aria-hidden="true"
													variants={lineVariants}
													transition={{ duration: motionEnabled ? 0.38 : 0, ease }}
													className="h-full origin-left bg-brand-black"
												/>
											</div>
											<span className="font-mono text-xs uppercase tracking-widest text-brand-gray">
												Open preview
											</span>
										</div>
									</div>
								</div>
							</motion.button>
						))}
					</div>
				</div>
			</div>

			<AnimatePresence>
				{lightbox && (
					<motion.div
						className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/90 p-4 sm:p-12"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setLightbox(null)}
					>
						<motion.div
							className="relative w-full max-w-6xl border border-brand-white/20 bg-brand-white"
							initial={motionEnabled ? { scale: 0.94, y: 18 } : { scale: 1 }}
							animate={{ scale: 1, y: 0 }}
							exit={motionEnabled ? { scale: 0.96, y: 12 } : { scale: 1 }}
							transition={{ duration: motionEnabled ? 0.35 : 0, ease }}
							onClick={(event) => event.stopPropagation()}
						>
							<div className="relative aspect-[16/10]">
								<ScreenshotPreview screenshot={lightbox} />
							</div>
							<button
								type="button"
								onClick={() => setLightbox(null)}
								className="absolute right-4 top-4 border border-brand-border bg-brand-white px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-gray transition-colors hover:border-brand-black hover:text-brand-black"
							>
								Close
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
