"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { TimelineReveal } from "@/components/ui/TimelineReveal";
import { CAREER_ENTRIES, TIMELINE_YEARS, YEAR_WIDTH } from "@/data/about.ts";
import TimelineLane from "./timeline/TimelineLane.tsx";
import { createTimelineScale } from "./timeline/timelineScale.ts";
import type { AboutContent } from "@/types/content";


type AboutTimelineProps = {
	entries?: AboutContent["careerEntries"];
	now?: string;
	years?: string[];
	yearWidth?: number;
};

export function AboutTimeline({ entries = CAREER_ENTRIES, now = new Date().toISOString(), years = TIMELINE_YEARS, yearWidth = YEAR_WIDTH }: AboutTimelineProps) {
	const scale = createTimelineScale(years, yearWidth, new Date(now));
	const dragLimit = Math.max(0, scale.currentOffset - scale.ticks.length * 48 * 2);

	return (
		<section className="relative border-b border-brand-border px-6 py-18 sm:px-12">
			<TimelineReveal>
				<header className="mb-12 grid gap-6 lg:grid-cols-[0.36fr_1fr]">
					<FadeIn y={24}>
						<p className="mb-5 font-mono text-[10px] uppercase leading-5 tracking-[0.24em] text-brand-gray">
							Career Timeline
						</p>
						<h2 className="text-[clamp(2.6rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.07em]">
							Journey
						</h2>
					</FadeIn>
					<FadeIn
						y={20}
						className="max-w-2xl lg:self-end"
					>
						<p className="text-sm leading-8 text-[#444]">
							Bridging the gap between university classrooms and production
							environments. Discover the milestones that shape my career evolution.
						</p>
					</FadeIn>
				</header>

				<div
					className="relative overflow-x-auto overflow-y-hidden no-scrollbar"
					style={{
						minHeight: `${entries.length}px`,
						WebkitOverflowScrolling: "touch",
					}}
				>
					<motion.div
						drag="x"
						dragConstraints={{
							left: -dragLimit,
							right: 0,
						}}
						dragElastic={0.08}
						className="relative cursor-grab active:cursor-grabbing flex-none"
						style={{
							minHeight: `${entries.length * 66 + 180}px`,
							width: `${scale.totalWidth}px`,
							flexShrink: 0,
							display: "block",
						}}
					>
						<div
							className="pointer-events-none absolute left-0 top-10 h-px bg-brand-black"
							style={{ width: `${scale.currentOffset}px` }}
						/>
						<div
							className="absolute left-0 top-0"
							style={{
								minHeight: `${entries.length * 66 + 180}px`,
								width: `${scale.totalWidth}px`,
							}}
						>
							{scale.ticks.map((tick) => (
								<div
									key={tick.label}
									className="absolute top-0 h-full border-l border-dashed border-brand-border first:border-l-0"
									style={{ left: `${tick.offset}px` }}
								>
									<span className="absolute top-0 font-mono text-[10px] uppercase tracking-widest text-brand-gray">
										{tick.label}
									</span>
								</div>
							))}
						</div>

						<div className="absolute left-0 right-0 top-24">
							{entries.map((entry) => (
								<TimelineLane
									key={`${entry.type}-${entry.start}-${entry.title}`}
									entry={entry}
									scale={scale}
								/>
							))}
						</div>
					</motion.div>
				</div>
			</TimelineReveal>
		</section>
	);
}
