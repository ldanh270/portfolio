"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { ProjectScreenshot, ScreenshotEntry } from "./types";

type ScreenshotsSectionProps = {
	data: ScreenshotEntry[];
};

type NormalizedScreenshot = Pick<ProjectScreenshot, "description" | "image" | "title">;

const DEFAULT_SCREENSHOT_IMAGE = "/work-placeholder.svg";

function normalizeScreenshot(item: ScreenshotEntry, index: number): NormalizedScreenshot {
	if (typeof item === "string") {
		return {
			title: `Screenshot ${String(index + 1).padStart(2, "0")}`,
			description: "Project interface screenshot.",
			image: item,
		};
	}

	return {
		title: item.title,
		description: item.description ?? "Project interface screenshot.",
		image: item.image ?? DEFAULT_SCREENSHOT_IMAGE,
	};
}

function clampIndex(index: number, count: number): number {
	if (count <= 0) {
		return 0;
	}

	if (index < 0) {
		return count - 1;
	}

	if (index >= count) {
		return 0;
	}

	return index;
}

export function ScreenshotsSection({ data }: ScreenshotsSectionProps) {
	const trackRef = useRef<HTMLDivElement | null>(null);
	const shouldReduceMotion = useReducedMotion() === true;
	const [activeIndex, setActiveIndex] = useState(0);
	const screenshots = data.map(normalizeScreenshot);
	const screenshotCount = screenshots.length;
	const safeActiveIndex = clampIndex(activeIndex, screenshotCount);

	const scrollToIndex = (index: number) => {
		const track = trackRef.current;

		if (!track || screenshotCount === 0) {
			return;
		}

		const nextIndex = clampIndex(index, screenshotCount);
		track.scrollTo({
			left: track.clientWidth * nextIndex,
			behavior: shouldReduceMotion ? "auto" : "smooth",
		});
		setActiveIndex(nextIndex);
	};

	const handleScroll = () => {
		const track = trackRef.current;

		if (!track || screenshotCount === 0) {
			return;
		}

		const nextIndex = clampIndex(
			Math.round(track.scrollLeft / track.clientWidth),
			screenshotCount,
		);
		setActiveIndex(nextIndex);
	};

	if (screenshotCount === 0) {
		return null;
	}

	return (
		<div className="border-b border-brand-border py-16 sm:py-20">
			<div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
				<div className="mb-6 flex items-end justify-between gap-4">
					<div>
						<p className="font-mono text-xs uppercase tracking-widest text-brand-gray">
							Screenshots
						</p>
						<p className="mt-2 text-sm leading-6 text-[#555]">
							Swipe or use the arrows.
						</p>
					</div>

					{screenshots.length > 1 && (
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={() => scrollToIndex(safeActiveIndex - 1)}
								aria-label="Previous screenshot"
								className="inline-flex size-10 items-center justify-center border border-brand-border bg-brand-white text-brand-black transition-colors hover:border-brand-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-black disabled:cursor-not-allowed disabled:opacity-40"
							>
								<ChevronLeft className="size-4" />
							</button>
							<button
								type="button"
								onClick={() => scrollToIndex(safeActiveIndex + 1)}
								aria-label="Next screenshot"
								className="inline-flex size-10 items-center justify-center border border-brand-border bg-brand-white text-brand-black transition-colors hover:border-brand-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-black disabled:cursor-not-allowed disabled:opacity-40"
							>
								<ChevronRight className="size-4" />
							</button>
						</div>
					)}
				</div>

				<div className="space-y-4">
					<div
						ref={trackRef}
						onScroll={handleScroll}
						className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden"
					>
						{screenshots.map((screenshot, index) => (
							<figure
								key={`${screenshot.title}-${index}`}
								className="w-full shrink-0 snap-start"
							>
								<div className="relative aspect-16/10 overflow-hidden border border-brand-border bg-[#e0ddd8]">
									<Image
										src={screenshot.image ?? DEFAULT_SCREENSHOT_IMAGE}
										alt={screenshot.title}
										fill
										className="object-cover"
										loading="lazy"
										sizes="(min-width: 1024px) 84rem, 100vw"
									/>
								</div>
								<figcaption className="mt-3 flex items-start justify-between gap-4">
									<div className="min-w-0">
										<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-gray">
											{String(index + 1).padStart(2, "0")} /{" "}
											{screenshot.title}
										</p>
										<p className="mt-2 text-sm leading-6 text-[#555]">
											{screenshot.description}
										</p>
									</div>
									<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-gray">
										{String(safeActiveIndex + 1).padStart(2, "0")} /{" "}
										{String(screenshotCount).padStart(2, "0")}
									</p>
								</figcaption>
							</figure>
						))}
					</div>

					{screenshots.length > 1 && (
						<div className="flex items-center gap-2">
							{screenshots.map((_, index) => (
								<button
									key={index}
									type="button"
									onClick={() => scrollToIndex(index)}
									aria-label={`Go to screenshot ${String(index + 1).padStart(2, "0")}`}
									aria-current={index === safeActiveIndex ? "true" : undefined}
									className={`size-2 rounded-full border transition-colors ${
										index === safeActiveIndex ?
											"border-brand-black bg-brand-black"
										:	"border-brand-border bg-transparent hover:border-brand-black"
									}`}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
