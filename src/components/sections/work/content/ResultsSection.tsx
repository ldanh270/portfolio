"use client";

import { CountUp } from "@/components/ui/CountUp";
import { FadeIn } from "@/components/ui/FadeIn";
import type { ResultMetric } from "./types";

type ResultsSectionProps = {
	data: ResultMetric[];
};

function parseMetricValue(value: string): { num: number; suffix: string } {
	const match = value.match(/^(\d+(?:\.\d+)?)(.*)/);
	if (!match) return { num: 0, suffix: value };
	return {
		num: parseFloat(match[1]),
		suffix: match[2].trim(),
	};
}

export function ResultsSection({ data }: ResultsSectionProps) {
	return (
		<div className="border-b border-brand-border py-16">
			<div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
				<p className="mb-12 font-mono text-xs uppercase tracking-widest text-brand-gray">
					Results
				</p>

				<div className="grid grid-cols-2 gap-px border border-brand-border bg-brand-border lg:grid-cols-4">
					{data.map((item) => {
						const { num, suffix } = parseMetricValue(item.value);
						return (
							<FadeIn key={item.metric} className="bg-brand-white p-6 sm:p-8">
								<p className="mb-2 font-display text-[clamp(2.5rem,5vw,5rem)] font-extrabold leading-none tracking-tighter">
									<CountUp end={num} suffix={suffix} duration={1600} />
								</p>
								<p className="font-mono text-xs uppercase tracking-widest text-brand-gray">
									{item.metric}
								</p>
							</FadeIn>
						);
					})}
				</div>
			</div>
		</div>
	);
}
