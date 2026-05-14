"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

// ── Types ─────────────────────────────────────────────────────────

type Award = {
	title: string;
	organization: string;
	date: string;
	description: string;
	category: string;
	url?: string;
};

// ── Data ──────────────────────────────────────────────────────────

const awards: Award[] = [
	{
		title: "Best Innovation Award",
		organization: "FPT University Da Nang",
		date: "2025",
		description:
			"Recognized for developing an innovative AI-powered code review tool that streamlined the development workflow for student teams across the university.",
		category: "Innovation",
		url: "#",
	},
	{
		title: "Dean's List Honor",
		organization: "FPT University",
		date: "2024",
		description:
			"Awarded for maintaining exceptional academic performance in Software Engineering with a GPA in the top 5% of the cohort.",
		category: "Academic",
	},
	{
		title: "1st Place — National Hackathon",
		organization: "Vietnam Developer Summit",
		date: "2025",
		description:
			"Led a team of four to build a real-time collaborative design tool in 48 hours, winning first place among 120+ participating teams.",
		category: "Competition",
		url: "#",
	},
	{
		title: "Outstanding Community Contributor",
		organization: "Open Source Vietnam",
		date: "2024",
		description:
			"Recognized for significant contributions to open-source projects in the Vietnamese developer community, including maintaining three widely-used libraries.",
		category: "Open Source",
	},
	{
		title: "Best UI/UX Design Project",
		organization: "FPT Edu Design Awards",
		date: "2025",
		description:
			"Portfolio website recognized for exceptional visual design, accessibility compliance, and creative use of micro-interactions and animations.",
		category: "Design",
		url: "#",
	},
];

// ── Constants ─────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

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
		<FadeIn y={20} delay={index * 0.06}>
			<div className="border-b border-brand-border">
				<button
					type="button"
					data-cursor="view"
					onClick={onToggle}
					className="group flex w-full items-center gap-6 px-2 py-6 text-left transition-colors duration-300 hover:bg-[rgba(10,10,10,0.015)] sm:gap-10 sm:px-4 sm:py-8"
				>
					{/* Index */}
					<span className="flex-none font-mono text-2xl font-light tracking-tight text-brand-gray transition-colors duration-300 group-hover:text-brand-black sm:text-4xl">
						{formatIndex(index)}
					</span>

					{/* Title */}
					<span className="min-w-0 flex-1">
						<span className="block text-lg font-bold leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
							{award.title}
						</span>
						<span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-brand-gray">
							{award.organization}
						</span>
					</span>

					{/* Category + Date */}
					<span className="hidden flex-none items-center gap-4 sm:flex">
						<span className="rounded-full border border-brand-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors duration-200 group-hover:border-black/40">
							{award.category}
						</span>
						<span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
							{award.date}
						</span>
					</span>

					{/* Toggle indicator */}
					<motion.span
						animate={{ rotate: isOpen ? 45 : 0 }}
						transition={{
							duration: shouldReduceMotion ? 0 : 0.4,
							ease,
						}}
						className="flex-none text-xl leading-none text-brand-gray transition-colors duration-200 group-hover:text-brand-black"
					>
						+
					</motion.span>
				</button>

				{/* Expandable content */}
				<AnimatePresence initial={false}>
					{isOpen && (
						<motion.div
							initial={
								shouldReduceMotion
									? { height: "auto", opacity: 1 }
									: { height: 0, opacity: 0 }
							}
							animate={{ height: "auto", opacity: 1 }}
							exit={
								shouldReduceMotion
									? { height: "auto", opacity: 1 }
									: { height: 0, opacity: 0 }
							}
							transition={{
								duration: shouldReduceMotion ? 0 : 0.5,
								ease,
							}}
							className="overflow-hidden"
						>
							<div className="grid gap-4 px-2 pb-8 sm:grid-cols-[auto_1fr] sm:gap-10 sm:px-4">
								{/* Spacer to align with title */}
								<span className="hidden font-mono text-4xl font-light tracking-tight text-transparent sm:block">
									{formatIndex(index)}
								</span>

								<div className="max-w-xl">
									<p className="text-sm leading-7 text-[#444]">
										{award.description}
									</p>

									{/* Mobile meta */}
									<div className="mt-3 flex items-center gap-3 sm:hidden">
										<span className="rounded-full border border-brand-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
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
			</div>
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
						Milestones of recognition across competitions,
						academics, and open-source contributions that fuel my
						drive to build better software.
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
