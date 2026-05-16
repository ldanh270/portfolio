"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { TimelineReveal, TimelineRevealLine } from "@/components/ui/TimelineReveal";
import { careerEntries, TIMELINE_YEARS, YEAR_WIDTH } from "@/data/about.ts";
import TimelineLane from "./timeline/TimelineLane.tsx";

export function AboutTimeline() {
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
							Bridging the gap between university classrooms and production environments. Discover
							the milestones that shape my career evolution.
						</p>
					</FadeIn>
				</header>

				<div
					className="relative overflow-x-auto overflow-y-hidden no-scrollbar"
					style={{
						minHeight: `${careerEntries.length}px`,
						WebkitOverflowScrolling: "touch",
					}}
				>
					<div className="pointer-events-none absolute inset-x-0 top-10 h-px bg-brand-border" />
					<TimelineRevealLine className="pointer-events-none absolute inset-x-0 top-10 h-px bg-brand-black" />
					<motion.div
						drag="x"
						dragConstraints={{
							left: -((TIMELINE_YEARS.length - 1) * YEAR_WIDTH - TIMELINE_YEARS.length * 48 * 2),
							right: 0,
						}}
						dragElastic={0.08}
						className="relative cursor-grab active:cursor-grabbing flex-none"
						style={{
							minHeight: `${careerEntries.length * 66 + 180}px`,
							width: `${TIMELINE_YEARS.length * YEAR_WIDTH}px`,
							flexShrink: 0,
							display: "block",
						}}
					>
						<div
							className="absolute left-0 top-0"
							style={{
								minHeight: `${careerEntries.length * 66 + 180}px`,
								display: "grid",
								gridTemplateColumns: `repeat(${TIMELINE_YEARS.length}, ${YEAR_WIDTH}px)`,
								gridTemplateRows: 1,
								width: `${TIMELINE_YEARS.length * YEAR_WIDTH}px`,
							}}
						>
							{TIMELINE_YEARS.map((year) => (
								<div
									key={year}
									className="relative h-full border-l border-dashed border-brand-border first:border-l-0"
								>
									<span className="absolute top-0 font-mono text-[10px] uppercase tracking-widest text-brand-gray">
										{year}
									</span>
								</div>
							))}
						</div>

						<div className="absolute left-0 right-0 top-24">
							{careerEntries.map((entry) => (
								<TimelineLane
									key={`${entry.type}-${entry.start}-${entry.title}`}
									entry={entry}
								/>
							))}
						</div>
					</motion.div>
				</div>
			</TimelineReveal>
		</section>
	);
}
