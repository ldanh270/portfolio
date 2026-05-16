"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

// ── Types ─────────────────────────────────────────────────────────

type Certification = {
	label: string;
	title: string;
	description: string;
	tags: string[];
	url: string;
	issuer: string;
};

// ── Data ──────────────────────────────────────────────────────────

const certificates: Certification[] = [
	{
		label: "02/2025",
		title: "AI for Everyone",
		description:
			"The meaning behind common AI terminology, including neural networks, machine learning, deep learning, and data science.",
		tags: [
			"AI/ML",
			"Generative AI",
			"Data Ethics",
			"Artificial Intelligence",
			"Business Ethics",
			"Technology Strategies",
			"Business Intelligence",
		],
		url: "https://www.coursera.org/account/accomplishments/verify/TNLHD0SMK05P",
		issuer: "DeepLearning.AI",
	},
	{
		label: "03/2025",
		title: "Academic Skills for University Success",
		description:
			"Build Learning Skills to Excel at University. Learn to solve problems, think critically, and communicate effectively in your university courses.",
		tags: [
			"Critical Thinking",
			"Analytical Skills",
			"Research",
			"Information Management",
			"Systems Thinking",
			"Logical Reasoning",
			"Problem Solving",
		],
		url: "https://coursera.org/share/e21300c8c048091947ec95f08708a001",
		issuer: "The University of Sydney Business School",
	},
	{
		label: "06/2025",
		title: "Web Design for Everybody: Basics of Web Development & Coding",
		description:
			"Learn to Design and Create Websites. Build a responsive and accessible web portfolio using HTML5, CSS3, and JavaScript.",
		tags: [
			"Web Design",
			"Event-Driven Programming",
			"User Interface (UI)",
			"Usability",
			"JavaScript",
			"Web Applications",
			"HTML5",
			"Cascading Style Sheets (CSS)",
			"Wireframing",
			"Bootstrap (Front-End Framework)",
			"Web Content Accessibility Guidelines",
			"Web Development Tools",
			"Web Content",
		],
		url: "https://www.coursera.org/account/accomplishments/specialization/certificate/463Z20U8VUU2",
		issuer: "University of Michigan",
	},
	{
		label: "12/2025",
		title: "Google Certified Educator Level 1 & 2",
		description:
			"For educators who are super users and enthusiasts of Google’s tools in the classroom, this Level 2 certification validates advanced technology implementation skills.",
		tags: ["Google Tools", "Education Technology", "Classroom Integration", "Digital Literacy"],
		url: "https://edu.google.accredible.com/d771e24f-f83f-496d-9538-a3442e886cd6#acc.ClpJu2fL",
		issuer: "Google for Education",
	},
	{
		label: "01/2026",
		title: "Generative AI in Software Development",
		description:
			"Discuss the principles, applications, and role of Generative AI in automating repetitive tasks in software development.",
		tags: [
			"Generative AI",
			"Prompt Engineering",
			"Software Development Tools",
			"AI Enablement",
			"Strategic Decision-Making",
			"LLM Application",
			"ChatGPT",
			"Artificial Intelligence",
			"Digital Transformation",
			"Debugging",
		],
		url: "https://www.coursera.org/account/accomplishments/verify/2CIWJBYR7YH3",
		issuer: "Amazon",
	},
	{
		label: "01/2026",
		title: "Software Engineering: Modeling Software Systems using UML",
		description:
			"Discuss the principles, applications, and role of Generative AI in automating repetitive tasks in software development.",
		tags: [
			"Project Planning",
			"Software Engineering",
			"Object Oriented Design",
			"Unified Modeling Language (UML)",
			"Systems Design",
			"Project Management",
			"Software Design",
			"System Development",
			"Software Architecture",
			"Quality Assurance",
			"Process Driven Development",
			"Software Development Life Cycle (SDLC)",
		],
		url: "https://www.coursera.org/account/accomplishments/verify/B02GH2J0LJBS",
		issuer: "The Hong Kong University of Science and Technology",
	},
	{
		label: "01/2026",
		title: "Software Engineering: Implementation and Testing",
		description:
			"Discuss the principles, applications, and role of Generative AI in automating repetitive tasks in software development.",
		tags: [
			"Requirements Analysis",
			"Software Development",
			"Integration Testing",
			"Unified Modeling Language (UML)",
			"White-Box Testing",
			"System Testing",
			"Acceptance Testing",
			"Software Development Methodologies",
			"Test Cases",
			"Software Engineering",
			"Software Development Life Cycle (SDLC)",
			"Configuration Management",
		],
		url: "https://www.coursera.org/account/accomplishments/verify/OVCD5P8A4A0H",
		issuer: "The Hong Kong University of Science and Technology",
	},
	{
		label: "01/2026",
		title: "Software Engineering: Software Design and Project Management",
		description:
			"Discuss the principles, applications, and role of Generative AI in automating repetitive tasks in software development.",
		tags: [
			"Project Planning",
			"Software Engineering",
			"Object Oriented Design",
			"Unified Modeling Language (UML)",
			"Systems Design",
			"Project Management",
			"Software Design",
			"System Development",
			"Software Architecture",
			"Quality Assurance",
			"Process Driven Development",
			"Software Development Life Cycle (SDLC)",
		],
		url: "https://www.coursera.org/account/accomplishments/verify/GU5ZRUURCN4Q",
		issuer: "The Hong Kong University of Science and Technology",
	},
	{
		label: "02/2026",
		title: "Gemini Certified Faculty",
		description:
			"A Google Certified Gemini Faculty member can articulate and demonstrate foundational knowledge of generative AI concepts and the core features and capabilities of Gemini within the educational context.",
		tags: ["Generative AI", "Google Gemini", "Education Technology", "AI in Education"],
		url: "https://edu.google.accredible.com/50922889-7d59-4f25-93bf-8fde89a93eb7",
		issuer: "Google for Education",
	},
];

// ── Constants ─────────────────────────────────────────────────────

const CARD_W = 550;
const CARD_W_MOBILE = 320;
const ROWS = 2;
const GAP = 32;

// ── Card ──────────────────────────────────────────────────────────

function CertCard({
	cert,
	isDragging,
	onClick,
}: {
	cert: Certification;
	isDragging: boolean;
	onClick: () => void;
}) {
	return (
		<motion.button
			type="button"
			data-cursor="view"
			onClick={(e) => {
				if (isDragging) {
					e.preventDefault();
					return;
				}
				onClick();
			}}
			whileHover="hover"
			className="group relative flex h-full w-full flex-col overflow-hidden border border-brand-border px-8 py-8 text-left transition-colors duration-300 hover:bg-[rgba(10,10,10,0.015)] hover:border-brand-black/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black"
		>
			{/* Left Border */}
			<motion.span
				className="absolute left-0 top-0 h-full w-[0.5px] bg-brand-black"
				initial={{ height: 0 }}
				variants={{
					hover: { height: "100%" },
				}}
				transition={{ duration: 0.2, ease: "easeOut" }}
			/>
			{/* Top Border */}
			<motion.span
				className="absolute left-0 top-0 h-[0.5px] w-full bg-brand-black"
				initial={{ width: 0 }}
				variants={{
					hover: { width: "100%" },
				}}
				transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }}
			/>

			{/* Right Border */}
			<motion.span
				className="absolute bottom-0 right-0 h-full w-px bg-brand-black"
				initial={{ height: 0 }}
				variants={{
					hover: { height: "100%" },
				}}
				transition={{ duration: 0.2, delay: 0.4, ease: "easeOut" }}
			/>

			{/* Bottom Border */}
			<motion.span
				className="absolute bottom-0 right-0 h-px w-full bg-brand-black"
				initial={{ width: 0 }}
				variants={{
					hover: { width: "100%" },
				}}
				transition={{ duration: 0.2, delay: 0.6, ease: "easeOut" }}
			/>

			<header className="relative z-10 mb-3 flex items-center gap-3">
				<span className="min-w-0 truncate font-mono text-[10px] uppercase tracking-widest text-brand-gray">
					{cert.issuer}
				</span>
				<span className="flex-none font-mono text-[10px] uppercase tracking-widest text-brand-gray">
					{cert.label}
				</span>
			</header>
			<h3 className="relative z-10 text-xl font-bold leading-snug tracking-tight transition-transform duration-200 group-hover:translate-x-0.5">
				{cert.title}
			</h3>
			<p className="relative z-10 mt-3 text-sm leading-7 text-[#444] line-clamp-2">
				{cert.description}
			</p>
			<div className="relative z-10 mt-auto overflow-x-auto no-scrollbar pt-5">
				<div className="flex items-center gap-2">
					{cert.tags.map((t) => (
						<span
							key={t}
							className="flex-none rounded-full border border-brand-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors duration-200 group-hover:border-black/40"
						>
							{t}
						</span>
					))}
				</div>
			</div>
		</motion.button>
	);
}

// ── Main Component ────────────────────────────────────────────────

export function AboutLicences() {
	const [isDragging, setIsDragging] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const update = () => setContainerWidth(el.clientWidth);
		update();
		const ro = new ResizeObserver(update);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	const cols = Math.ceil(certificates.length / ROWS);
	const gridW = cols * CARD_W + (cols - 1) * GAP;
	const dragLeft = containerWidth > 0 && gridW > containerWidth ? -(gridW - containerWidth) : 0;

	const openUrl = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

	return (
		<section className="relative border-b border-brand-border px-6 py-18 sm:px-12">
			{/* ── Header ──────────────────────────────────── */}
			<header className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.36fr]">
				<FadeIn
					y={20}
					className="order-2 w-full max-w-2xl lg:order-1 lg:ml-auto lg:self-end"
				>
					<p className="text-sm leading-8 text-[#444] lg:text-right">
						Transforming academic knowledge into verified expertise. Explore the credentials that
						mark my evolution as a developer.
					</p>
				</FadeIn>
				<FadeIn
					y={24}
					className="order-1 lg:order-2"
				>
					<p className="mb-5 font-mono text-[10px] uppercase leading-5 tracking-[0.24em] text-brand-gray lg:text-right">
						Verified Credentials
					</p>
					<h2 className="text-[clamp(2.6rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.07em] lg:text-right">
						Certificates
					</h2>
				</FadeIn>
			</header>

			{/* ── Desktop: 2-row scrollable with gap ────── */}
			<div
				ref={containerRef}
				className="relative hidden overflow-x-auto overflow-y-hidden no-scrollbar lg:block"
			>
				<motion.div
					drag="x"
					dragConstraints={{ left: dragLeft, right: 0 }}
					dragElastic={0.08}
					onDragStart={() => setIsDragging(true)}
					onDragEnd={() => setTimeout(() => setIsDragging(false), 150)}
					className="cursor-grab active:cursor-grabbing"
					style={{ width: gridW }}
				>
					<div
						className="grid grid-flow-col grid-rows-2"
						style={{ gap: GAP, gridAutoColumns: CARD_W }}
					>
						{certificates.map((cert) => (
							<div
								key={cert.title}
								className={`min-w-0 ${isDragging ? "pointer-events-none" : ""}`}
							>
								<CertCard
									cert={cert}
									isDragging={isDragging}
									onClick={() => openUrl(cert.url)}
								/>
							</div>
						))}
					</div>
				</motion.div>
			</div>

			{/* ── Mobile: 1-row scroll with gap ──────────── */}
			<div className="overflow-x-auto no-scrollbar lg:hidden">
				<div
					className="flex"
					style={{ gap: GAP }}
				>
					{certificates.map((cert) => (
						<div
							key={cert.title}
							className="flex-none"
							style={{ width: CARD_W_MOBILE }}
						>
							<CertCard
								cert={cert}
								isDragging={false}
								onClick={() => openUrl(cert.url)}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
