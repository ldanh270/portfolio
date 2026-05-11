"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { RadialHover } from "@/components/ui/RadialHover";
import {
	TimelineReveal,
	TimelineRevealItem,
	TimelineRevealLine,
} from "@/components/ui/TimelineReveal";

type CareerEntry = {
	type: "experience" | "education";
	start: string;
	end: string;
	title: string;
	place: string;
	description: string;
	lane: number;
	startOffset: number;
	endOffset: number;
};

const careerEntries: CareerEntry[] = [
	{
		type: "education",
		start: "2023",
		end: "2025",
		title: "Software Engineering",
		place: "FUDN",
		description:
			"Systems, algorithms, databases, AI fundamentals, and software architecture foundation.",
		lane: 0,
		startOffset: 0,
		endOffset: 62,
	},
	{
		type: "experience",
		start: "2024",
		end: "Now",
		title: "Internship Developer",
		place: "OUTFIZ · Ohtez project",
		description:
			"Production frontend work across real product flows, interface details, and feature delivery.",
		lane: 1,
		startOffset: 38,
		endOffset: 100,
	},
	{
		type: "experience",
		start: "2024",
		end: "2024",
		title: "Smart PC Store",
		place: "Side Project",
		description: "Commerce interface for PC discovery, product browsing, and configuration flow.",
		lane: 2,
		startOffset: 32,
		endOffset: 58,
	},
	{
		type: "experience",
		start: "2024",
		end: "2024",
		title: "BluPass OCR",
		place: "Side Project",
		description:
			"OCR workflow for extracting, checking, and structuring document data from images.",
		lane: 3,
		startOffset: 52,
		endOffset: 78,
	},
	{
		type: "education",
		start: "2024",
		end: "Now",
		title: "Certifications",
		place: "Google Certified Educator, etc.",
		description:
			"Professional learning signals across education, product thinking, and technical practice.",
		lane: 4,
		startOffset: 66,
		endOffset: 100,
	},
];

const years = ["2023", "2024", "2025", "Now"];

function getLaneWidth(entry: CareerEntry) {
	return `${entry.endOffset - entry.startOffset}%`;
}

function TimelinePopup({ entry }: { entry: CareerEntry }) {
	const opensDown = entry.lane < 3;
	const positionClass =
		opensDown ?
			"top-[calc(100%+1.75rem)] group-hover:translate-y-1"
		:	"bottom-[calc(100%+1.75rem)] group-hover:-translate-y-1";

	return (
		<article
			className={`pointer-events-none absolute left-0 z-60 w-72 border border-brand-border bg-brand-white p-5 opacity-0 shadow-[8px_8px_0_#0a0a0a] transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100 ${positionClass}`}
		>
			<header className="mb-4 flex items-start justify-between gap-4">
				<p className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
					{entry.type}
				</p>
				<time className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
					{entry.start} — {entry.end}
				</time>
			</header>
			<h3 className="text-xl font-extrabold uppercase leading-tight tracking-tighter">
				{entry.title}
			</h3>
			<p className="mt-3 font-mono text-[10px] uppercase leading-5 tracking-widest text-brand-gray">
				{entry.place}
			</p>
			<p className="mt-4 text-sm leading-7 text-[#444]">{entry.description}</p>
		</article>
	);
}

function TimelineLane({ entry }: { entry: CareerEntry }) {
	return (
		<TimelineRevealItem
			className="group absolute z-10 h-11 hover:z-50 focus-within:z-50"
			style={
				{
					left: `${entry.startOffset}%`,
					top: `${entry.lane * 4.25}rem`,
					width: getLaneWidth(entry),
				} as CSSProperties
			}
		>
			<TimelinePopup entry={entry} />
			<RadialHover
				className="z-10 h-full w-full cursor-grab border border-brand-border bg-brand-white active:cursor-grabbing"
				contentClassName="flex h-full w-full items-center justify-between px-3"
				ariaLabel={`${entry.title}, ${entry.start} to ${entry.end}`}
			>
				<span className="h-2.5 w-2.5 rounded-full border border-current bg-brand-white group-hover:bg-brand-black" />
				<span className="truncate px-3 font-mono text-[10px] uppercase tracking-widest">
					{entry.title}
				</span>
				<span className="h-2.5 w-2.5 rounded-full border border-current bg-brand-white group-hover:bg-brand-black" />
				<span className="absolute -bottom-5 left-0 font-mono text-[10px] uppercase tracking-widest text-brand-gray group-hover:text-brand-gray">
					{entry.start}
				</span>
				<span className="absolute -bottom-5 right-0 font-mono text-[10px] uppercase tracking-widest text-brand-gray group-hover:text-brand-gray">
					{entry.end}
				</span>
			</RadialHover>
		</TimelineRevealItem>
	);
}

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
							Drag horizontally to explore. Each compact lane maps its own start and end time; hover
							to open details.
						</p>
					</FadeIn>
				</header>

				<div className="h-auto min-h-136 overflow-x-auto overflow-y-visible pb-8 scrollbar-thin">
					<motion.div
						drag="x"
						dragConstraints={{ left: -520, right: 0 }}
						dragElastic={0.08}
						className="relative min-h-136 min-w-260 cursor-grab active:cursor-grabbing"
					>
						<div className="absolute left-0 right-0 top-10 h-px bg-brand-border" />
						<TimelineRevealLine className="absolute left-0 right-0 top-10 h-px bg-brand-black" />

						<div className="absolute left-0 right-0 top-0 grid min-h-136 grid-cols-4">
							{years.map((year) => (
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
