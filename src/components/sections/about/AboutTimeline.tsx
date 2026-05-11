import { FadeIn } from "@/components/ui/FadeIn";
import {
	TimelineReveal,
	TimelineRevealItem,
	TimelineRevealLine,
} from "@/components/ui/TimelineReveal";

type TimelineSide = "experience" | "education";

type TimelineEntry = {
	side: TimelineSide;
	period: string;
	title: string;
	meta: string;
	description: string;
	tags: string[];
};

const timelineEntries: TimelineEntry[] = [
	{
		side: "education",
		period: "2021 — 2025",
		title: "Bachelor of Software Engineering",
		meta: "[University Name] · GPA 3.X / 4.0",
		description:
			"Software engineering foundation with systems, architecture, algorithms, and AI coursework.",
		tags: ["Architecture", "Algorithms", "AI"],
	},
	{
		side: "experience",
		period: "2023 — Now",
		title: "Freelance Fullstack Developer",
		meta: "Independent · Freelance",
		description:
			"Delivering web apps, mobile apps, and AI-powered chatbot solutions for clients across various industries.",
		tags: ["Next.js", "React Native", "LangChain"],
	},
	{
		side: "experience",
		period: "2024 — Now",
		title: "Software Engineer Intern (Part-time)",
		meta: "[Company Name] · Internship",
		description:
			"Building and maintaining production features across the full stack with React, Node.js, and PostgreSQL.",
		tags: ["React", "Node.js", "PostgreSQL"],
	},
];

const sectionMeta: Record<TimelineSide, { label: string; title: string }> = {
	experience: {
		label: "Experience",
		title: "Work",
	},
	education: {
		label: "Education",
		title: "Study",
	},
};

function TimelineCard({ entry }: { entry: TimelineEntry }) {
	return (
		<article className="group h-full border border-brand-border bg-brand-white p-5 transition-colors duration-300 hover:bg-brand-black hover:text-brand-white">
			<div className="mb-5 flex items-start justify-between gap-4">
				<span className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand-gray group-hover:text-brand-white/60">
					{sectionMeta[entry.side].label}
				</span>
				<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray group-hover:text-brand-white/60">
					{entry.period}
				</span>
			</div>
			<h3 className="text-xl font-extrabold uppercase leading-tight tracking-tight sm:text-2xl">
				{entry.title}
			</h3>
			<p className="mt-3 font-mono text-[10px] uppercase leading-5 tracking-widest text-brand-gray group-hover:text-brand-white/60">
				{entry.meta}
			</p>
			<p className="mt-4 text-sm leading-7 text-[#444] group-hover:text-brand-white/75">
				{entry.description}
			</p>
			<div className="mt-5 flex flex-wrap gap-2">
				{entry.tags.map((tag) => (
					<span
						key={tag}
						className="border border-brand-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest group-hover:border-brand-white/30"
					>
						{tag}
					</span>
				))}
			</div>
		</article>
	);
}

function TimelineSideColumn({ side }: { side: TimelineSide }) {
	const entries = timelineEntries.filter((entry) => entry.side === side);
	const isExperience = side === "experience";

	return (
		<div className={isExperience ? "lg:pt-16" : "lg:pb-16"}>
			<FadeIn y={24} className="mb-6">
				<p className="mb-4 font-mono text-[10px] uppercase leading-5 tracking-[0.24em] text-brand-gray">
					{sectionMeta[side].label}
				</p>
				<h2 className="text-[clamp(2.4rem,5vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.07em]">
					{sectionMeta[side].title}
				</h2>
			</FadeIn>

			<div className="grid gap-4">
				{entries.map((entry) => (
					<TimelineRevealItem key={`${entry.side}-${entry.period}-${entry.title}`}>
						<TimelineCard entry={entry} />
					</TimelineRevealItem>
				))}
			</div>
		</div>
	);
}

function TimelineMarker({ entry }: { entry: TimelineEntry }) {
	return (
		<TimelineRevealItem className="relative min-w-[210px] flex-1">
			<div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-brand-black bg-brand-white" />
			<time className="absolute left-0 top-[calc(50%+1.25rem)] font-mono text-[10px] uppercase tracking-widest text-brand-gray">
				{entry.period}
			</time>
		</TimelineRevealItem>
	);
}

export function AboutTimeline() {
	return (
		<section className="overflow-hidden border-b border-brand-border px-6 py-14 sm:px-12">
			<TimelineReveal className="grid gap-10 lg:grid-cols-[1fr_minmax(300px,0.72fr)_1fr] lg:items-center">
				<TimelineSideColumn side="education" />

				<div className="relative order-first min-h-28 lg:order-none lg:min-h-[520px]">
					<div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-brand-border" />
					<TimelineRevealLine className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-brand-black" />
					<div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between gap-8">
						{timelineEntries.map((entry) => (
							<TimelineMarker key={`${entry.side}-${entry.period}-${entry.title}`} entry={entry} />
						))}
					</div>
				</div>

				<TimelineSideColumn side="experience" />
			</TimelineReveal>
		</section>
	);
}
