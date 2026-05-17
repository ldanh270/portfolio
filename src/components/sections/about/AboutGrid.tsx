"use client";

import { CountUp } from "@/components/ui/CountUp";
import { FadeIn } from "@/components/ui/FadeIn";
import { STATS } from "@/data/about";

export function AboutGrid() {
	return (
		<div className="grid border-b border-brand-border sm:grid-cols-2 lg:grid-cols-4">
			{STATS.map(({ number, suffix, label }, index) => (
				<FadeIn
					key={label}
					delay={index * 0.08}
					y={20}
					className="border-r border-brand-border px-6 py-10 text-center sm:px-12 sm:text-left"
				>
					<p className="text-5xl font-extrabold tracking-tighter">
						<CountUp
							end={number}
							suffix={suffix}
						/>
					</p>
					<p className="mt-1 font-mono text-xs uppercase tracking-widest text-brand-gray">
						{label}
					</p>
				</FadeIn>
			))}
		</div>
	);
}
