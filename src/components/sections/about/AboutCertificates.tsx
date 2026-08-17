"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import CertificateCard from "@/components/sections/about/certificates/CertificateCard";
import { CERTIFICATES } from "@/data/about";
import type { AboutContent } from "@/types/content";

const CARD_W = 550;
const CARD_W_MOBILE = 320;
const ROWS = 2;
const GAP = 32;

export default function AboutCertificates({ certificates = CERTIFICATES }: { certificates?: AboutContent["certificates"] }) {
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
			{/* Header */}
			<header className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.36fr]">
				<FadeIn
					y={20}
					className="order-2 w-full max-w-2xl lg:order-1 lg:ml-auto lg:self-end"
				>
					<p className="text-sm leading-8 text-[#444] lg:text-right">
						Transforming academic knowledge into verified expertise. Explore the
						credentials that mark my evolution as a developer.
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

			{/* Desktop: 2-row scrollable with gap */}
			<div
				ref={containerRef}
				className="relative -my-8 hidden overflow-x-auto overflow-y-hidden py-8 no-scrollbar lg:block"
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
								<CertificateCard
									cert={cert}
									isDragging={isDragging}
									onClick={() => openUrl(cert.url)}
								/>
							</div>
						))}
					</div>
				</motion.div>
			</div>

			{/* Mobile: 1-row scroll with gap */}
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
							<CertificateCard
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
