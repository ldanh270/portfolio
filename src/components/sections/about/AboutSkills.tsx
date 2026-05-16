"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerItem, StaggerList } from "@/components/ui/StaggerList";

type Skills = Record<string, string[]>;

type SkillRowProps = {
	group: string;
	groupIndex: number;
	items: string[];
	isLast: boolean;
};

const skills: Skills = {
	Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
	Backend: ["Express.js", "PostgreSQL", "MongoDB", "Redis"],
	Mobile: ["React Native", "Expo", "Flutter"],
	DevOps: ["Docker", "CI/CD", "Nginx", "Git"],
	Tools: ["Figma", "Postman", "VS Code", "Notion"],
};

const ease = [0.22, 1, 0.36, 1] as const;
const skillGroups = Object.entries(skills);

const rowVariants = {
	rest: { y: 0, boxShadow: "0 0 0 rgba(10,10,10,0)" },
	hover: { y: -4, boxShadow: "0 18px 45px rgba(10,10,10,0.07)" },
};

const surfaceVariants = {
	rest: { opacity: 0, scale: 0.985 },
	hover: { opacity: 1, scale: 1 },
};

const lineVariants = {
	rest: { scaleX: 0 },
	hover: { scaleX: 1 },
};

const titleVariants = {
	rest: { x: 0 },
	hover: { x: 8 },
};

const chipVariants = {
	rest: { y: 0, opacity: 0.78 },
	hover: { y: -2, opacity: 1 },
};

function formatSkillIndex(index: number): string {
	return `${String(index + 1).padStart(2, "0")}.`;
}

function SkillRow({ group, groupIndex, items, isLast }: SkillRowProps) {
	const shouldReduceMotion = useReducedMotion();
	const motionEnabled = !shouldReduceMotion;

	return (
		<motion.article
			initial="rest"
			whileHover="hover"
			whileTap={motionEnabled ? { scale: 0.997 } : undefined}
			variants={rowVariants}
			transition={{ duration: motionEnabled ? 0.4 : 0, ease }}
			className={`group relative isolate min-h-28 overflow-hidden bg-brand-white px-5 py-6 ${
				isLast ? "" : "border-b border-brand-border"
			}`}
		>
			<motion.span
				aria-hidden="true"
				variants={surfaceVariants}
				transition={{ duration: motionEnabled ? 0.3 : 0, ease }}
				className="absolute inset-2 z-0 border border-brand-border bg-[rgba(10,10,10,0.018)]"
			/>
			<motion.span
				aria-hidden="true"
				variants={lineVariants}
				transition={{ duration: motionEnabled ? 0.36 : 0, ease }}
				className="absolute left-5 right-5 top-0 z-10 h-px origin-left bg-brand-black"
			/>

			<div className="relative z-10 grid h-full items-center gap-6 lg:grid-cols-[4rem_0.8fr_1fr] lg:gap-10">
				<div className="flex items-center gap-4 lg:block">
					<span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-gray transition-colors duration-300 group-hover:text-brand-black">
						{formatSkillIndex(groupIndex)}
					</span>
					<motion.span
						aria-hidden="true"
						variants={lineVariants}
						transition={{ duration: motionEnabled ? 0.3 : 0, ease }}
						className="hidden h-px w-8 origin-left bg-brand-black/35 lg:mt-4 lg:block"
					/>
				</div>

				<motion.h3
					variants={titleVariants}
					transition={{ duration: motionEnabled ? 0.35 : 0, ease }}
					className="text-[clamp(2rem,3vw,4.2rem)] font-bold uppercase leading-tight tracking-tight"
				>
					{group}
				</motion.h3>

				<div className="flex flex-wrap gap-2">
					{items.map((skill, skillIndex) => (
						<motion.span
							key={skill}
							variants={chipVariants}
							transition={{
								duration: motionEnabled ? 0.24 : 0,
								delay: skillIndex * 0.025,
								ease,
							}}
							className="border border-brand-border bg-brand-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-gray transition-colors duration-300 group-hover:border-brand-black/20 group-hover:text-brand-black"
						>
							{skill}
						</motion.span>
					))}
				</div>
			</div>
		</motion.article>
	);
}

export default function AboutSkills() {
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
					Fullstack engineering toolkit for product interfaces, server systems, mobile builds, AI
					workflows, and deployment.
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
