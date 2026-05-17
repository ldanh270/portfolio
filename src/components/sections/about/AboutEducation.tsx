import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerItem, StaggerList } from "@/components/ui/StaggerList";

type Education = {
	degree: string;
	university: string;
	period: string;
	gpa: string;
	highlights: string[];
};

const education: Education = {
	degree: "Bachelor of Software Engineering",
	university: "[University Name]",
	period: "2021 — 2025",
	gpa: "3.X / 4.0",
	highlights: [
		"Algorithms & Data Structures",
		"Database Systems",
		"Software Architecture",
		"Artificial Intelligence",
		"Operating Systems",
	],
};

export default function AboutEducation() {
	return (
		<section className="grid border-b border-brand-border px-6 py-12 sm:px-12 lg:grid-cols-[0.32fr_1fr] lg:gap-14">
			<FadeIn
				className="mb-10 lg:mb-0"
				y={28}
			>
				<p className="mb-5 font-mono text-[10px] uppercase leading-5 tracking-[0.24em] text-brand-gray">
					Study
				</p>
				<h2 className="text-[clamp(2.6rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.07em]">
					Education
				</h2>
				<p className="mt-5 max-w-xs text-sm leading-7 text-[#444]">
					Software engineering foundation with systems, architecture, algorithms, and AI
					coursework.
				</p>
			</FadeIn>

			<div className="border-t border-brand-border">
				<FadeIn
					className="group grid gap-5 border-b border-brand-border bg-brand-black px-5 py-7 text-brand-white md:grid-cols-[92px_28px_1fr]"
					y={20}
				>
					<time className="font-mono text-[10px] uppercase leading-5 tracking-widest text-brand-white/60">
						{education.period}
					</time>
					<div className="relative hidden md:block">
						<span className="absolute left-1/2 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border border-brand-white bg-brand-black" />
					</div>
					<div>
						<div className="mb-3 flex flex-wrap items-center gap-3">
							<span className="font-mono text-[10px] uppercase tracking-widest text-brand-white/60">
								GPA {education.gpa}
							</span>
						</div>
						<h3 className="text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-3xl">
							{education.university}
						</h3>
						<p className="mt-3 max-w-2xl text-sm leading-7 text-brand-white/75">
							{education.degree}
						</p>
					</div>
				</FadeIn>

				<StaggerList className="relative before:absolute before:left-23 before:top-0 before:hidden before:h-full before:w-px before:bg-brand-border md:before:block">
					{education.highlights.map((highlight, index) => (
						<StaggerItem key={highlight}>
							<div className="group grid gap-5 border-b border-brand-border py-5 transition-colors duration-300 hover:bg-brand-black hover:px-5 hover:text-brand-white md:grid-cols-[92px_28px_1fr]">
								<span className="font-mono text-[10px] uppercase leading-5 tracking-widest text-brand-gray group-hover:text-brand-white/60">
									Course {String(index + 1).padStart(2, "0")}
								</span>
								<div className="relative hidden md:block">
									<span className="absolute left-1/2 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-brand-border bg-brand-white group-hover:border-brand-white group-hover:bg-brand-black" />
								</div>
								<p className="text-lg font-extrabold uppercase leading-tight tracking-tight sm:text-xl">
									{highlight}
								</p>
							</div>
						</StaggerItem>
					))}
				</StaggerList>
			</div>
		</section>
	);
}
