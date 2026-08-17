"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerItem, StaggerList } from "@/components/ui/StaggerList";
import { SKILLS } from "@/data/about";
import SkillRow from "@/components/sections/about/skills/SkillRow";
import type { AboutContent } from "@/types/content";

export default function AboutSkills({ skills, description = "Fullstack engineering toolkit for product interfaces, server systems, mobile builds, AI workflows, and deployment." }: { skills?: AboutContent["skills"]; description?: string }) {
	const skillGroups = Object.entries(skills ?? SKILLS);
	return (
		<section className="grid border-b border-brand-border px-6 py-14 sm:px-12 lg:grid-cols-[0.4fr_1fr] lg:gap-20">
			<FadeIn
				className="mb-10 lg:mb-0"
				y={32}
			>
				<h2 className="text-[clamp(3rem,10vw,5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.09em]">
					Skills
				</h2>
				<p className="mt-8 max-w-[18rem] font-mono text-[10px] uppercase leading-5 tracking-tight text-brand-gray">
					{description}
				</p>
			</FadeIn>

			<StaggerList className="grid auto-rows-fr">
				{skillGroups.map(([group, items], groupIndex) => (
					<StaggerItem key={group}>
						<SkillRow
							group={group}
							groupIndex={groupIndex}
							items={items}
							isLast={groupIndex === skillGroups.length - 1}
						/>
					</StaggerItem>
				))}
			</StaggerList>
		</section>
	);
}
