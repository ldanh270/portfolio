"use client";

import { CountUp } from "@/components/ui/CountUp";
import { FadeIn } from "@/components/ui/FadeIn";

const stats = [
	{ number: 5, suffix: "+", label: "Years Experience" },
	{ number: 30, suffix: "+", label: "Projects Delivered" },
	{ number: 15, suffix: "+", label: "Happy Clients" },
	{ number: 3, suffix: "", label: "Open Source Libs" },
] as const;

export function AboutGrid() {
	return (
		<div className="grid border-b border-brand-border sm:grid-cols-2 lg:grid-cols-4">
			{stats.map(({ number, suffix, label }, index) => (
				<FadeIn
					key={label}
					delay={index * 0.08}
					y={20}
					className="border-r border-brand-border px-6 py-10 sm:px-12"
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
