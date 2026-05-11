import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerItem, StaggerList } from "@/components/ui/StaggerList";

type Experience = {
	period: string;
	role: string;
	company: string;
	type: string;
	description: string;
	tags: string[];
};

const experiences: Experience[] = [
	{
		period: "2024 — Now",
		role: "Software Engineer Intern (Part-time)",
		company: "[Company Name]",
		type: "Internship",
		description:
			"Building and maintaining production features across the full stack. Working with React, Node.js, and PostgreSQL in a real-world engineering team.",
		tags: ["React", "Node.js", "PostgreSQL"],
	},
	{
		period: "2023 — Now",
		role: "Freelance Fullstack Developer",
		company: "Independent",
		type: "Freelance",
		description:
			"Delivering web apps, mobile apps, and AI-powered chatbot solutions for clients across various industries.",
		tags: ["Next.js", "React Native", "LangChain"],
	},
];

export function AboutExperience() {
	return (
		<section className="grid border-b border-brand-border px-6 py-12 sm:px-12 lg:grid-cols-[0.32fr_1fr] lg:gap-14">
			<FadeIn className="mb-10 lg:mb-0" y={28}>
				<p className="mb-5 font-mono text-[10px] uppercase leading-5 tracking-[0.24em] text-brand-gray">
					Experience
				</p>
				<h2 className="text-[clamp(2.6rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.07em]">
					Work
				</h2>
				<p className="mt-5 max-w-xs text-sm leading-7 text-[#444]">
					Production work across web, mobile, and AI products.
				</p>
			</FadeIn>

			<StaggerList className="relative border-t border-brand-border before:absolute before:left-[92px] before:top-0 before:hidden before:h-full before:w-px before:bg-brand-border md:before:block">
				{experiences.map((exp, index) => (
					<StaggerItem key={`${exp.period}-${exp.role}`}>
						<article className="group grid gap-5 border-b border-brand-border py-7 transition-colors duration-300 hover:bg-brand-black hover:px-5 hover:text-brand-white md:grid-cols-[92px_28px_1fr]">
							<time className="font-mono text-[10px] uppercase leading-5 tracking-widest text-brand-gray group-hover:text-brand-white/60">
								{exp.period}
							</time>
							<div className="relative hidden md:block">
								<span className="absolute left-1/2 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border border-brand-black bg-brand-white group-hover:border-brand-white group-hover:bg-brand-black" />
							</div>
							<div>
								<div className="mb-3 flex flex-wrap items-center gap-3">
									<span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray group-hover:text-brand-white/60">
										{String(index + 1).padStart(2, "0")} / {exp.type}
									</span>
									<span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray group-hover:text-brand-white/60">
										{exp.company}
									</span>
								</div>
								<h3 className="text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-3xl">
									{exp.role}
								</h3>
								<p className="mt-3 max-w-2xl text-sm leading-7 text-[#444] group-hover:text-brand-white/75">
									{exp.description}
								</p>
								<div className="mt-5 flex flex-wrap gap-2">
									{exp.tags.map((tag) => (
										<span
											key={tag}
											className="border border-brand-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest group-hover:border-brand-white/30"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</article>
					</StaggerItem>
				))}
			</StaggerList>
		</section>
	);
}
