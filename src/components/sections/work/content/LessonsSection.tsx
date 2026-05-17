"use client";

import { RevealLine } from "@/components/ui/RevealLine";
import { StaggerItem, StaggerList } from "@/components/ui/StaggerList";

type LessonsSectionProps = {
	data: string[];
};

export function LessonsSection({ data }: LessonsSectionProps) {
	return (
		<div className="border-b border-brand-border py-16">
			<div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
				<p className="mb-12 font-mono text-xs uppercase tracking-widest text-brand-gray">
					Lessons Learned
				</p>

				<StaggerList className="gap-0 lg:grid-cols-1">
					{data.map((lesson, i) => (
						<StaggerItem key={i}>
							<RevealLine />
							<div className="grid gap-4 py-7 lg:grid-cols-[80px_1fr] lg:gap-8">
								<p className="font-mono text-sm text-brand-gray">
									{String(i + 1).padStart(2, "0")}
								</p>
								<p className="max-w-[65ch] text-sm leading-7 text-[#444]">{lesson}</p>
							</div>
						</StaggerItem>
					))}
				</StaggerList>
			</div>
		</div>
	);
}
