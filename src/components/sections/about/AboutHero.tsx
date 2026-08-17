import { FadeIn } from "@/components/ui/FadeIn";
import { HeroReveal } from "@/components/ui/HeroReveal";
import Link from "next/link";
import type { AboutCopy } from "@/types/content";

const defaultCopy: AboutCopy["hero"] = {
	headline: "Software engineer building scalable, high-impact products based on strong algorithms foundation.",
	cta: "Let's work together →",
	paragraphs: [
		"I'm Le Duc Anh, a software engineer based in Da Nang, Vietnam. I bridge the gap between robust backend engineering and thoughtful interface design.",
		"I got into programming through competitive coding — spending weekends grinding algorithms, graph problems, and optimisation challenges. That foundation gave me something most developers don't have: the ability to think before I write a single line.",
		"Today I build full-stack products — web, mobile, and AI-powered systems — for clients who need things done right the first time.",
		"I don't do cookie-cutter. Every project starts with understanding the problem, then I build the simplest solution that works at scale.",
		"With experience across the full stack, I specialise in architecting performant applications that hold up under real-world conditions. Every project starts with understanding people — their goals, constraints, and workflows.",
	],
};

export default function AboutHero({ copy = defaultCopy }: { copy?: AboutCopy["hero"] }) {
	return (
		<section className="grid border-b border-brand-border lg:grid-cols-2">
			<div className="border-b border-brand-border px-6 py-16 sm:px-12 lg:border-b-0 lg:border-r">
				<HeroReveal className="mb-10 text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-tight tracking-tight">
					{copy.headline}
				</HeroReveal>
				<FadeIn
					delay={0.25}
					y={16}
				>
					<Link
						href="/contact"
						data-cursor="view"
						className="inline-flex rounded-full border border-brand-border px-6 py-4 text-sm font-semibold tracking-wide transition hover:bg-[rgba(10,10,10,0.02)]"
					>
						{copy.cta}
					</Link>
				</FadeIn>
			</div>
			<div className="flex flex-col justify-between gap-8 px-6 py-16 text-sm leading-8 text-[#444] sm:px-12">
				{copy.paragraphs.map((paragraph, index) => <FadeIn key={index} delay={0.3 + index * 0.1}><p>{paragraph}</p></FadeIn>)}
			</div>
		</section>
	);
}
