import { FadeIn } from "@/components/ui/FadeIn";
import { RadialHover } from "@/components/ui/RadialHover";
import { StaggerItem, StaggerList } from "@/components/ui/StaggerList";

type Skills = Record<string, string[]>;

const skills: Skills = {
	Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
	Backend: ["Express.js", "PostgreSQL", "MongoDB", "Redis"],
	Mobile: ["React Native", "Expo", "Flutter"],
	// "AI/LM": ["RAG Pipeline", "Openclaw", "Vector DB", "Context Engineering"],
	DevOps: ["Docker", "CI/CD", "Nginx", "Git"],
	Tools: ["Figma", "Postman", "VS Code", "Notion"],
};

export default function AboutSkills() {
	return (
		<section className="grid border-b border-brand-border px-6 py-14 sm:px-12 lg:grid-cols-[0.4fr_1fr] lg:gap-20">
			{/* Section Title */}
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

			{/* Skill Items */}
			<StaggerList className="grid auto-rows-fr">
				{Object.entries(skills).map(([group, items], groupIndex) => {
					return (
						<StaggerItem key={group}>
							<RadialHover
								as="div"
								shape="parallelVertical"
							>
								<div
									className={`group relative grid h-full min-h-24 cursor-default items-center gap-10 overflow-hidden ${groupIndex < Object.keys(skills).length - 1 ? "border-b" : ""} border-brand-border px-5 py-6 transition-colors lg:grid-cols-[auto_0.75fr_1fr] lg:grid-rows-1 hover:text-brand-white`}
								>
									{/* Group Number */}
									<span
										className={`relative z-10 font-mono text-xs font-bold uppercase tracking-widest text-brand-gray group-hover:text-brand-white`}
									>
										{String(groupIndex + 1).padStart(2, "0")}.
									</span>

									{/* Group Title */}
									<h3 className="relative z-10 text-[clamp(2rem,3vw,4.2rem)] font-bold uppercase leading-tight tracking-tight">
										{group}
									</h3>

									{/* Skill Items */}
									<div
										className={`relative z-10 grid gap-1 font-mono text-[10px] uppercase leading-5 tracking-tight lg:grid-cols-2 text-brand-white group-hover:text-brand-white`}
									>
										{items.map((skill) => (
											<span key={skill}>{skill}</span>
										))}
									</div>
								</div>
							</RadialHover>
						</StaggerItem>
					);
				})}
			</StaggerList>
		</section>
	);
}
