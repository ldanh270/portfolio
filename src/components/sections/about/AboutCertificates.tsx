"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

// ── Types ─────────────────────────────────────────────────────────

type Certification = {
	label: string;
	title: string;
	description: string;
	tag: string;
	image: string;
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
		tag: "AI",
		image: "/images/certificates/ai-for-everyone.svg",
		url: "https://coursera.org/verify/ai-for-everyone",
		issuer: "DeepLearning.AI",
	},
	{
		label: "01/2025",
		title: "Machine Learning",
		description:
			"Supervised learning, unsupervised learning, best practices for ML development, and neural network design.",
		tag: "ML",
		image: "/images/certificates/machine-learning.svg",
		url: "https://coursera.org/verify/machine-learning",
		issuer: "Stanford University",
	},
	{
		label: "03/2025",
		title: "Front-End Development",
		description:
			"Modern front-end frameworks, responsive design, accessibility, and performance optimization techniques.",
		tag: "React",
		image: "/images/certificates/front-end-dev.svg",
		url: "https://coursera.org/verify/front-end",
		issuer: "Meta",
	},
	{
		label: "04/2025",
		title: "Rust Programming",
		description:
			"Systems programming with Rust: ownership, borrowing, lifetimes, concurrency, and unsafe Rust patterns.",
		tag: "Rust",
		image: "/images/certificates/rust-programming.svg",
		url: "https://coursera.org/verify/rust",
		issuer: "Duke University",
	},
	{
		label: "05/2025",
		title: "TypeScript Advanced",
		description:
			"Advanced type system features, conditional types, mapped types, template literal types, and declaration files.",
		tag: "TS",
		image: "/images/certificates/ai-for-everyone.svg",
		url: "https://coursera.org/verify/typescript",
		issuer: "Microsoft",
	},
];

// ── Constants ─────────────────────────────────────────────────────

const CARD_W = 340;
const CARD_W_MOBILE = 300;
const ROWS = 2;

// ── Card ──────────────────────────────────────────────────────────

function CertCard({
	cert,
	width,
	isDragging,
	onClick,
}: {
	cert: Certification;
	width: number;
	isDragging: boolean;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={(e) => {
				if (isDragging) {
					e.preventDefault();
					return;
				}
				onClick();
			}}
			className="group flex-none border-b border-r border-brand-border text-left transition-colors duration-300 hover:bg-[rgba(10,10,10,0.015)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-black"
			style={{ width }}
		>
			{/* Image */}
			<div className="relative h-[160px] overflow-hidden">
				<img
					src={cert.image}
					alt={cert.title}
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				{/* Hover indicator */}
				<div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
					<span className="translate-y-2 rounded-full bg-brand-white px-4 py-2 text-[10px] font-semibold uppercase tracking-widest opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
						Verify →
					</span>
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-col gap-2.5 px-6 py-6">
				<span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
					{cert.issuer} · {cert.label}
				</span>
				<h3 className="text-xl font-bold leading-snug tracking-tight transition-transform duration-200 group-hover:translate-x-0.5">
					{cert.title}
				</h3>
				<p className="text-sm leading-7 text-[#444] line-clamp-2">{cert.description}</p>
				<span className="mt-auto self-start rounded-full border border-brand-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
					{cert.tag}
				</span>
			</div>
		</button>
	);
}

// ── Main Component ────────────────────────────────────────────────

export function AboutCertificates() {
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
	const gridW = cols * CARD_W;
	const dragLeft = containerWidth > 0 && gridW > containerWidth ? -(gridW - containerWidth) : 0;

	const openUrl = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

	return (
		<section className="relative border-b border-brand-border px-6 py-18 sm:px-12">
			{/* ── Header ──────────────────────────────────── */}
			<header className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.36fr]">
				<FadeIn
					y={20}
					className="w-full max-w-2xl lg:self-end"
				>
					<p className="ml-auto block text-right text-sm leading-8 text-[#444]">
						Transforming academic knowledge into verified expertise. Explore the credentials that
						mark my evolution as a developer.
					</p>
				</FadeIn>
				<FadeIn y={24}>
					<p className="mb-5 text-right font-mono text-[10px] uppercase leading-5 tracking-[0.24em] text-brand-gray">
						Verified Credentials
					</p>
					<h2 className="text-right text-[clamp(2.6rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.07em]">
						Certificates
					</h2>
				</FadeIn>
			</header>

			{/* ── Desktop: 2-row scrollable + drag ──────── */}
			<div
				ref={containerRef}
				className="relative hidden overflow-x-auto overflow-y-hidden no-scrollbar lg:block"
			>
				<motion.div
					drag="x"
					dragConstraints={{ left: dragLeft, right: 0 }}
					dragElastic={0.08}
					onDragStart={() => setIsDragging(true)}
					onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
					className="grid cursor-grab active:cursor-grabbing grid-flow-col grid-rows-2"
					style={{ width: gridW, gridAutoColumns: CARD_W }}
				>
					{certificates.map((cert) => (
						<CertCard
							key={cert.title}
							cert={cert}
							width={CARD_W}
							isDragging={isDragging}
							onClick={() => openUrl(cert.url)}
						/>
					))}
				</motion.div>
			</div>

			{/* ── Mobile: 1-row horizontal scroll ────────── */}
			<div className="overflow-x-auto no-scrollbar lg:hidden">
				<div className="flex">
					{certificates.map((cert) => (
						<CertCard
							key={cert.title}
							cert={cert}
							width={CARD_W_MOBILE}
							isDragging={false}
							onClick={() => openUrl(cert.url)}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
