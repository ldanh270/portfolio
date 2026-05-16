"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

// ── Types ─────────────────────────────────────────────────────────

type Award = {
	title: string;
	position: string;
	date: string;
	description: string;
	category: string;
	tags: string[];
	url?: string;
};

// ── Data ──────────────────────────────────────────────────────────

const awards: Award[] = [
	{
		title: "City-level Excellent Student Contest in Informatics 2020 (Grade C3)",
		position: "Third Prize",
		date: "2020",
		description:
			"Competed against top high-school students citywide in algorithmic problem-solving. Tasks covered graph theory, dynamic programming, and greedy strategies under strict time limits.",
		category: "Algorithm Competition",
		tags: ["C++", "Algorithm", "Graph Theory", "Dynamic Programming"],
	},
	{
		title: "City-level Informatics Contest",
		position: "Third Prize",
		date: "2020",
		description:
			"Solved a set of challenging competitive programming problems focused on data structures and efficient search techniques. Strengthened foundational skills in time-complexity optimization.",
		category: "Algorithm Competition",
		tags: ["Data Structures", "Binary Search", "Sorting", "C++"],
	},
	{
		title: "Central Highlands & Central Vietnam Informatics Olympic – 3rd Edition",
		position: "Third Prize",
		date: "2022",
		description:
			"Regional-scale olympiad bringing together the strongest student programmers from central Vietnam. Tackled advanced problems involving number theory, combinatorics, and segment trees across two contest rounds.",
		category: "Regional Olympiad",
		tags: ["Number Theory", "Combinatorics", "Segment Tree", "Competitive Programming"],
	},
	{
		title: "City-level Youth Informatics Contest – 25th Edition",
		position: "Third Prize",
		date: "2022",
		description:
			"Annual city contest with a legacy of 25 editions. Demonstrated consistent growth in competitive programming with problems spanning string processing, recursion, and brute-force optimization.",
		category: "Algorithm Competition",
		tags: ["String Processing", "Recursion", "Optimization", "Problem Solving"],
	},
	{
		title: "D3 Regional Round – National Youth Informatics Contest - 29th Edition",
		position: "Consolation Prize",
		date: "2023",
		description:
			"Participated in the regional qualifying round of Vietnam's most prestigious youth informatics contest. Gained valuable experience competing at national-level difficulty with problems in graph algorithms and advanced DP.",
		category: "National Contest",
		tags: ["National Level", "Graph Algorithms", "Advanced DP", "C++"],
	},
	{
		title: "D3 City-level Youth Informatics Contest - 28th Edition",
		position: "Second Prize",
		date: "2023",
		description:
			"Achieved runner-up position among city participants. Excelled in problems requiring creative algorithmic design, including shortest-path variants and tree-based computations.",
		category: "Algorithm Competition",
		tags: ["Shortest Path", "Tree Algorithms", "Algorithm Design", "Silver Medal"],
	},
	{
		title: "Provincial Science and Technology Contest for High School Students",
		position: "Third Prize",
		date: "2023",
		description:
			"Presented a research project applying technology to solve real-world problems. Combined software development skills with scientific methodology to deliver a working prototype judged by academic professionals.",
		category: "Science & Technology",
		tags: ["Research", "Prototype", "Innovation", "Scientific Method"],
	},
	{
		title: "City-level Informatics Excellent Student Contest",
		position: "Consolation Prize",
		date: "2023",
		description:
			"Competed in an elite-tier contest reserved for top-performing informatics students. Problems demanded deep understanding of computational geometry and advanced data structures.",
		category: "Algorithm Competition",
		tags: ["Computational Geometry", "Advanced Data Structures", "Elite Tier"],
	},
	{
		title: "NAI Challenge Cup – Hue ICT Challenge",
		position: "Third Prize",
		date: "2023",
		description:
			"Inter-city ICT challenge hosted in Hue, combining algorithmic contests with practical software development tasks. Balanced speed-coding with solution architecture under competition pressure.",
		category: "ICT Challenge",
		tags: ["ICT", "Speed Coding", "Software Development", "Inter-City"],
	},
	{
		title: "D2 Central Highlands & Central Vietnam Informatics Olympiad – 4th Edition",
		position: "Bronze Medal",
		date: "2023",
		description:
			"Earned a bronze medal in the upgraded D2 division of the regional olympiad. Faced harder problem sets involving heavy implementation, math-based algorithms, and multi-step reasoning under a 5-hour session.",
		category: "Regional Olympiad",
		tags: ["Bronze Medal", "Heavy Implementation", "Math Algorithms", "5-Hour Contest"],
	},
	{
		title: "City-level Science and Technology Contest",
		position: "Third Prize",
		date: "2023",
		description:
			"Developed and presented a technology-driven solution addressing local community needs. Project evaluated on innovation, feasibility, and technical execution by a panel of industry and academic judges.",
		category: "Science & Technology",
		tags: ["Community Impact", "Feasibility", "Technical Execution", "Presentation"],
	},
];

// ── Constants ─────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

const awardRowVariants = {
	rest: { y: 0, boxShadow: "0 0 0 rgba(10,10,10,0)" },
	hover: { y: -3, boxShadow: "0 14px 38px rgba(10,10,10,0.06)" },
};

const awardSurfaceVariants = {
	rest: { opacity: 0, scale: 0.99 },
	hover: { opacity: 1, scale: 1 },
};

const awardLineVariants = {
	rest: { scaleX: 0 },
	hover: { scaleX: 1 },
};

const awardTitleVariants = {
	rest: { x: 0 },
	hover: { x: 6 },
};

// ── Helpers ───────────────────────────────────────────────────────

function formatIndex(index: number): string {
	return String(index + 1).padStart(2, "0");
}

// ── Award Row ─────────────────────────────────────────────────────

function AwardRow({
	award,
	index,
	isOpen,
	onToggle,
}: {
	award: Award;
	index: number;
	isOpen: boolean;
	onToggle: () => void;
}) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<FadeIn
			y={20}
			delay={index * 0.06}
		>
			<motion.div
				initial="rest"
				whileHover="hover"
				variants={awardRowVariants}
				transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease }}
				className="group relative isolate overflow-hidden border-b border-brand-border bg-brand-white"
			>
				<motion.span
					aria-hidden="true"
					variants={awardSurfaceVariants}
					transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease }}
					className="absolute inset-2 z-0 border border-brand-border bg-[rgba(10,10,10,0.018)]"
				/>
				<motion.span
					aria-hidden="true"
					variants={awardLineVariants}
					transition={{ duration: shouldReduceMotion ? 0 : 0.34, ease }}
					className="absolute left-2 right-2 top-0 z-10 h-px origin-left bg-brand-black sm:left-4 sm:right-4"
				/>

				<button
					type="button"
					data-cursor="view"
					onClick={onToggle}
					className="relative z-10 flex w-full items-center gap-6 px-2 py-6 text-left sm:gap-10 sm:px-4 sm:py-8"
				>
					<span className="flex-none font-mono text-2xl font-light tracking-tight text-brand-gray transition-colors duration-300 group-hover:text-brand-black sm:text-4xl">
						{formatIndex(index)}
					</span>

					<span className="min-w-0 flex-1">
						<motion.span
							variants={awardTitleVariants}
							transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease }}
							className="block text-lg font-bold leading-tight tracking-tight sm:text-2xl"
						>
							{award.title}
						</motion.span>
						<span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-brand-gray">
							{award.position}
						</span>
					</span>

					<span className="hidden flex-none items-center gap-4 sm:flex">
						<span className="border border-brand-border bg-brand-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors duration-200 group-hover:border-black/30">
							{award.category}
						</span>
						<span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
							{award.date}
						</span>
					</span>

					<motion.span
						animate={{ rotate: isOpen ? 45 : 0 }}
						variants={{
							rest: { scale: 1, borderColor: "rgba(10,10,10,0.12)" },
							hover: { scale: 1.06, borderColor: "rgba(10,10,10,0.55)" },
						}}
						transition={{
							duration: shouldReduceMotion ? 0 : 0.4,
							ease,
						}}
						className="grid size-9 flex-none place-items-center rounded-full border border-brand-border bg-brand-white text-xl leading-none text-brand-gray transition-colors duration-200 group-hover:text-brand-black"
					>
						+
					</motion.span>
				</button>

				<AnimatePresence initial={false}>
					{isOpen && (
						<motion.div
							initial={
								shouldReduceMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
							}
							animate={{ height: "auto", opacity: 1 }}
							exit={shouldReduceMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
							transition={{
								duration: shouldReduceMotion ? 0 : 0.5,
								ease,
							}}
							className="overflow-hidden"
						>
							<div className="relative z-10 grid gap-4 px-2 pb-8 sm:grid-cols-[auto_1fr] sm:gap-10 sm:px-4">
								<span className="hidden font-mono text-4xl font-light tracking-tight text-transparent sm:block">
									{formatIndex(index)}
								</span>

								<div className="max-w-xl">
									<p className="text-sm leading-7 text-[#444]">{award.description}</p>

									<div className="mt-4 flex flex-wrap gap-2">
										{award.tags.map((tag) => (
											<span
												key={tag}
												className="border border-brand-border bg-brand-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
											>
												{tag}
											</span>
										))}
									</div>

									<div className="mt-3 flex items-center gap-3 sm:hidden">
										<span className="border border-brand-border bg-brand-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
											{award.category}
										</span>
										<span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
											{award.date}
										</span>
									</div>

									{award.url && (
										<a
											href={award.url}
											target="_blank"
											rel="noopener noreferrer"
											data-cursor="view"
											className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-brand-gray transition-colors duration-200 hover:text-brand-black"
										>
											View details
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="10"
												height="10"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M7 17L17 7" />
												<path d="M7 7h10v10" />
											</svg>
										</a>
									)}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</FadeIn>
	);
}

// ── Main Component ────────────────────────────────────────────────

export default function AboutAwards() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	function handleToggle(index: number) {
		setOpenIndex((prev) => (prev === index ? null : index));
	}

	return (
		<section className="relative border-b border-brand-border px-6 py-18 sm:px-12">
			{/* ── Header ──────────────────────────────────── */}
			<header className="mb-14 flex flex-col items-start gap-6 lg:items-center">
				<FadeIn y={24}>
					<p className="mb-5 font-mono text-[10px] uppercase leading-5 tracking-[0.24em] text-brand-gray lg:text-center">
						Recognition
					</p>
					<h2 className="text-[clamp(2.6rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.07em] lg:text-center">
						Awards
					</h2>
				</FadeIn>
				<FadeIn
					y={20}
					className="w-full max-w-2xl"
				>
					<p className="text-sm leading-8 text-[#444] lg:text-center">
						Milestones of recognition across competitions, academics, and open-source contributions
						that fuel my drive to build better software.
					</p>
				</FadeIn>
			</header>

			{/* ── Award List ──────────────────────────────── */}
			<div className="border-t border-brand-border">
				{awards.map((award, index) => (
					<AwardRow
						key={`${award.title}-${award.date}`}
						award={award}
						index={index}
						isOpen={openIndex === index}
						onToggle={() => handleToggle(index)}
					/>
				))}
			</div>
		</section>
	);
}
