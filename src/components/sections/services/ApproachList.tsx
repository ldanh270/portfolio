"use client";

import { APPROACH_STEPS, type ApproachStep } from "@/data/services";
import { ApproachStepCard } from "./approach/ApproachStepCard";

export function ApproachList({ steps = APPROACH_STEPS }: { steps?: ApproachStep[] }) {
	return (
		<div className="relative border-y border-brand-border px-6 py-10 sm:px-12 lg:px-16">
			<div className="pointer-events-none absolute bottom-10 left-12 top-10 hidden w-px bg-brand-border lg:block" />
			{steps.map((step, index) => (
				<ApproachStepCard
					key={step.id}
					step={step}
					index={index}
					isLast={index === steps.length - 1}
				/>
			))}
		</div>
	);
}
