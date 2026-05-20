"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import AwardRow from "@/components/sections/about/award/AwardRow";
import { AWARDS } from "@/data/about";

export default function AboutAwards() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	function handleToggle(index: number) {
		setOpenIndex((prev) => (prev === index ? null : index));
	}

	return (
		<section className="relative border-b border-brand-border px-6 py-18 sm:px-12">
			{/* Header */}
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
						Milestones of recognition across competitions, academics, and open-source
						contributions that fuel my drive to build better software.
					</p>
				</FadeIn>
			</header>

			{/* Award List */}
			<div className="border-t border-brand-border">
				{AWARDS.map((award, index) => (
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
