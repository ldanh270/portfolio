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
};

const years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026", "Now"];
const YEAR_WIDTH = 400; // px per year

const careerEntries: CareerEntry[] = [
	{
		type: "education",
		start: "2020",
		end: "2023",
		title: "High School Student",
		place: "Hoang Hoa Tham High School Da Nang",
		description:
			"Advanced math class. Coursework in physics, computer science, and English. Graduated with honors.",
		lane: 0,
	},
	{
		type: "experience",
		start: "2026",
		end: "Now",
		title: "Full-stack Developer",
		place: "OUTFIZ",
		description:
			"Production frontend work across real product flows, interface details, and feature delivery.",
		lane: 1,
	},
	{
		type: "education",
		start: "2023",
		end: "Now",
		title: "University Student - Software Engineering",
		place: "FPT University Da Nang",
		description:
			"Comprehensive software engineering curriculum. Coursework in data structures, algorithms, databases, and web development.",
		lane: 2,
	},
	{
		type: "experience",
		start: "2026",
		end: "Now",
		title: "Freelance Software Developer",
		place: "VieTech Solutions",
		description:
			"Full-stack development for various clients, delivering tailored software solutions to meet specific business needs.",
		lane: 3,
	},
];

function getStartOffset(year: string): number {
	const index = years.indexOf(year);
	return index >= 0 ? index * YEAR_WIDTH : 0;
}

function getEndOffset(year: string): number {
	const index = years.indexOf(year);
	return index >= 0 ? index * YEAR_WIDTH : years.length * YEAR_WIDTH;
}

function getLaneWidth(entry: CareerEntry) {
	return `${getEndOffset(entry.end) - getStartOffset(entry.start)}px`;
}

function TimelinePopup({ entry }: { entry: CareerEntry }) {
	const opensDown = entry.lane < 2;
	const positionClass =
		opensDown ?
			"top-[calc(100%+1.75rem)] group-hover:translate-y-1"
		: 	"bottom-[calc(100%+1.75rem)] group-hover:-translate-y-1";

	return (
		<article
			className={`pointer-events-none absolute left-0 z-60 w-fit border border-brand-border bg-brand-white p-5 opacity-0 shadow-[8px_8px_0_#0a0a0a] transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100 ${positionClass}`}
		>
			<header className="mb-4 flex items-start justify-between gap-4">
				<p className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
					{entry.type}
				</p>
				<time className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
					{entry.start} — {entry.end}
				</time>
			</header>
			<h3 className="text-xl w-fit font-extrabold uppercase leading-tight tracking-tighter">
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
					left: `${getStartOffset(entry.start)}px`,
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

				<div
					className="relative overflow-x-auto overflow-y-hidden no-scrollbar"
					style={{
						minHeight: `${careerEntries.length * 66 + 180}px`,
						WebkitOverflowScrolling: "touch",
					}}
				>
					<div className="pointer-events-none absolute inset-x-0 top-10 h-px bg-brand-border" />
					<TimelineRevealLine className="pointer-events-none absolute inset-x-0 top-10 h-px bg-brand-black" />
					<motion.div
						drag="x"
						dragConstraints={{
							left: -((years.length - 1) * YEAR_WIDTH - years.length * 48 * 2),
							right: 0,
						}}
						dragElastic={0.08}
						className="relative cursor-grab active:cursor-grabbing flex-none"
						style={{
							minHeight: `${careerEntries.length * 66 + 180}px`,
							width: `${years.length * YEAR_WIDTH}px`,
							flexShrink: 0,
							display: "block",
						}}
					>
						<div
							className="absolute left-0 top-0"
							style={{
								minHeight: `${careerEntries.length * 66 + 180}px`,
								display: "grid",
								gridTemplateColumns: `repeat(${years.length}, ${YEAR_WIDTH}px)`,
								gridTemplateRows: 1,
								width: `${years.length * YEAR_WIDTH}px`,
							}}
						>
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
