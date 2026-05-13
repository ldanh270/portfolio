"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { RadialHover } from "@/components/ui/RadialHover";

type Experience = {
	year: string;
	role: string;
	company: string;
	type: string;
	description: string;
	tags: string[];
	startYear: number;
	durationYears: number;
};

const YEAR_WIDTH = 150; // px per year

const experiences: Experience[] = [
	{
		year: "2023",
		role: "Freelance Fullstack Developer",
		company: "Independent",
		type: "Freelance",
		description:
			"Delivering web apps, mobile apps, and AI-powered chatbot solutions for clients across various industries.",
		tags: ["Next.js", "React Native", "LangChain"],
		startYear: 0,
		durationYears: 2,
	},
	{
		year: "2024",
		role: "Software Engineer Intern (Part-time)",
		company: "[Company Name]",
		type: "Internship",
		description:
			"Building and maintaining production features across the full stack. Working with React, Node.js, and PostgreSQL in a real-world engineering team.",
		tags: ["React", "Node.js", "PostgreSQL"],
		startYear: 1,
		durationYears: 2,
	},
	{
		year: "2025",
		role: "Full-stack Developer",
		company: "OUTFIZ",
		type: "Full-time",
		description: "Production frontend work across real product flows, interface details, and feature delivery.",
		tags: ["React", "TypeScript", "Tailwind"],
		startYear: 2,
		durationYears: 1,
	},
	{
		year: "2026",
		role: "Senior Fullstack Engineer",
		company: "TechCorp",
		type: "Full-time",
		description: "Building scalable, modern applications with a strong eye for interface detail and long-term maintainability.",
		tags: ["React", "Node.js", "TypeScript", "AWS"],
		startYear: 3,
		durationYears: 2,
	},
	{
		year: "2028",
		role: "Tech Lead",
		company: "FutureVentures",
		type: "Full-time",
		description: "Leading engineering teams on AI-powered products and cloud infrastructure.",
		tags: ["React", "Node.js", "AI/ML", "Kubernetes"],
		startYear: 5,
		durationYears: 1,
	},
];

const years = ["2023", "2024", "2025", "2026", "2027", "2028", "2029"];

function ExperienceCard({ experience }: { experience: Experience }) {
	const left = experience.startYear * YEAR_WIDTH;
	const width = experience.durationYears * YEAR_WIDTH;

	return (
		<div
			className="group absolute z-10 h-24 hover:z-50 focus-within:z-50"
			style={
				{
					left: `${left}px`,
					top: 0,
					width: `${width}px`,
				} as CSSProperties
			}
		>
			<article className="pointer-events-none absolute bottom-full left-0 z-60 w-fit border border-brand-border bg-brand-white p-4 opacity-0 shadow-[8px_8px_0_#0a0a0a] transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:-translate-y-2 mb-2">
				<header className="mb-3 flex items-start justify-between gap-4">
					<p className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
						{experience.type}
					</p>
					<time className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
						{experience.year}
					</time>
				</header>
				<h3 className="text-lg font-extrabold uppercase leading-tight tracking-tighter w-fit max-w-xs">
					{experience.role}
				</h3>
				<p className="mt-2 font-mono text-[10px] uppercase leading-5 tracking-widest text-brand-gray">
					{experience.company}
				</p>
				<p className="mt-3 text-sm leading-6 text-[#444] max-w-sm">{experience.description}</p>
				<div className="mt-3 flex flex-wrap gap-2">
					{experience.tags.map((tag) => (
						<span
							key={tag}
							className="border border-brand-border px-2 py-1 font-mono text-[9px] uppercase tracking-widest"
						>
							{tag}
						</span>
					))}
				</div>
			</article>
			<RadialHover
				className="z-10 h-full w-full cursor-grab border border-brand-border bg-brand-white active:cursor-grabbing transition-all group-hover:bg-brand-black group-hover:text-brand-white"
				contentClassName="flex h-full w-full items-center justify-center px-3 text-center"
				ariaLabel={`${experience.role}, ${experience.year}`}
			>
				<div className="flex flex-col items-center gap-1">
					<span className="h-2 w-2 rounded-full border border-current bg-brand-white group-hover:bg-brand-black" />
					<span className="truncate px-2 font-mono text-[9px] uppercase tracking-widest">
						{experience.role.split(" ").slice(0, 2).join(" ")}
					</span>
					<span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray group-hover:text-brand-white/60">
						{experience.year}
					</span>
				</div>
			</RadialHover>
		</div>
	);
}

export function AboutExperience() {
	return (
		<section className="relative border-b border-brand-border px-6 py-18 sm:px-12 overflow-hidden">
			<header className="mb-12 grid gap-6 lg:grid-cols-[0.36fr_1fr]">
				<FadeIn y={24}>
					<p className="mb-5 font-mono text-[10px] uppercase leading-5 tracking-[0.24em] text-brand-gray">
						Experience
					</p>
					<h2 className="text-[clamp(2.6rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.07em]">
						Work
					</h2>
				</FadeIn>
				<FadeIn
					y={20}
					className="max-w-2xl lg:self-end"
				>
					<p className="text-sm leading-8 text-[#444]">
						Drag horizontally to explore my work journey. Hover over each card to see details and technologies used.
					</p>
				</FadeIn>
			</header>

			<div className="overflow-x-auto overflow-y-hidden no-scrollbar" style={{ minHeight: "320px", WebkitOverflowScrolling: "touch" }}>
				<motion.div
					drag="x"
					dragConstraints={{ left: -(years.length * YEAR_WIDTH - 800), right: 0 }}
					dragElastic={0.08}
					className="relative cursor-grab active:cursor-grabbing flex-none"
					style={{ 
						minHeight: "320px", 
						width: `${years.length * YEAR_WIDTH}px`,
						flexShrink: 0,
						display: "block"
					}}
				>
					<div className="absolute left-0 right-0 top-10 h-px bg-brand-border" />

					<div
						className="absolute left-0 right-0 top-0 gap-x-6"
						style={{
							minHeight: "320px",
							display: "grid",
							gridTemplateColumns: `repeat(${years.length}, ${YEAR_WIDTH}px)`,
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
						{experiences.map((exp) => (
							<ExperienceCard
								key={`${exp.year}-${exp.role}`}
								experience={exp}
							/>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
