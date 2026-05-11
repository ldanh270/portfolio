import type { Metadata } from "next";
import Link from "next/link";
import { AboutAwards } from "@/components/sections/about/AboutAwards";
import { AboutCertificates } from "@/components/sections/about/AboutCertificates";
import { AboutTimeline } from "@/components/sections/about/AboutTimeline";
import { AboutGrid } from "@/components/sections/about/AboutGrid";
import { FadeIn } from "@/components/ui/FadeIn";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { PageFade } from "@/components/ui/PageFade";
import { RevealLine } from "@/components/ui/RevealLine";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutSkills from "@/components/sections/about/AboutSkills";

export const metadata: Metadata = {
	title: "About — Le Duc Anh",
	description: "About Le Duc Anh, software engineer and designer in Da Nang, Vietnam.",
};

type Interest = {
	label: string;
	title: string;
	description: string;
	tag: string;
};

const interests: Interest[] = [
	{
		label: "When I'm not coding",
		title: "[Your hobby/interest]",
		description:
			"[One line about it — e.g. 'Competitive chess keeps my pattern recognition sharp.']",
		tag: "[HOBBY TAG]",
	},
	{
		label: "How I recharge",
		title: "[Another interest]",
		description: "[e.g. 'Long rides through Da Nang at 5am — best time to think.']",
		tag: "[TAG]",
	},
	{
		label: "What drives me",
		title: "[Philosophy/Motivation]",
		description: "[e.g. 'I believe the best software is invisible — you only notice bad UX.']",
		tag: "[TAG]",
	},
];

const closingCta = {
	label: "Available for",
	title: "Freelance Projects.",
	titleSecondLine: "Full-time Roles.",
	description:
		"Whether you need a web app, a mobile product, or an AI-powered solution — I'm ready to build it. Let's talk about your project.",
	primaryHref: "/contact",
	primaryLabel: "Get in touch →",
	secondaryHref: "/cv.pdf",
	secondaryLabel: "Download CV ↓",
};

export default function AboutPage() {
	return (
		<PageFade className="pt-16">
			{/* Marquee */}
			<div className="border-y border-brand-border py-8">
				<MarqueeText
					text="About me."
					size="lg"
					direction="right"
				/>
			</div>

			<AboutHero />

			<AboutGrid />

			<AboutSkills />

			<RevealLine />
			<AboutTimeline />

			
			<AboutAwards />
			<AboutCertificates />

			<div className="border-y border-brand-border py-8">
				<MarqueeText
					text="Beyond Code."
					size="lg"
					direction="left"
				/>
			</div>
			<section className="grid border-b border-brand-border sm:grid-cols-2 lg:grid-cols-3">
				{interests.map((item, index) => (
					<FadeIn
						key={item.title}
						delay={index * 0.1}
						y={20}
					>
						<div className="group flex flex-col gap-4 border-b border-r border-brand-border px-6 py-10 transition-colors duration-300 hover:bg-[rgba(10,10,10,0.015)] sm:px-10 lg:border-b-0">
							<span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
								{item.label}
							</span>
							<h3 className="text-xl font-bold leading-snug tracking-tight transition-transform duration-200 group-hover:translate-x-1">
								{item.title}
							</h3>
							<p className="text-sm leading-7 text-[#444]">{item.description}</p>
							<span className="mt-auto self-start rounded-full border border-brand-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
								{item.tag}
							</span>
						</div>
					</FadeIn>
				))}
			</section>

			<section className="grid border-b border-brand-border px-6 py-14 sm:px-12 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
				<FadeIn
					className="mb-10 lg:mb-0"
					y={32}
				>
					<p className="mb-6 font-mono text-[10px] uppercase leading-5 tracking-tight text-brand-gray">
						{closingCta.label}
					</p>
					<h2 className="text-[clamp(3rem,8vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.08em]">
						Available
					</h2>
				</FadeIn>
				<FadeIn
					y={20}
					className="grid items-center gap-6 border-b border-brand-border bg-brand-black px-5 py-7 text-brand-white lg:grid-cols-[1fr_auto]"
				>
					<div>
						<h3 className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold uppercase leading-none tracking-tighter">
							{closingCta.title}
							<br />
							{closingCta.titleSecondLine}
						</h3>
						<p className="mt-5 max-w-2xl text-sm leading-8 text-brand-white">
							{closingCta.description}
						</p>
					</div>
					<div className="flex flex-wrap gap-3 lg:justify-end">
						<Link
							href={closingCta.primaryHref}
							className="inline-flex rounded-full border border-brand-white px-6 py-3 text-sm font-semibold tracking-wide text-brand-white transition hover:bg-brand-white hover:text-brand-black"
						>
							{closingCta.primaryLabel}
						</Link>
						<a
							href={closingCta.secondaryHref}
							download
							className="inline-flex rounded-full border border-brand-white px-6 py-3 text-sm font-semibold tracking-wide text-brand-white transition hover:bg-brand-white hover:text-brand-black"
						>
							{closingCta.secondaryLabel}
						</a>
					</div>
				</FadeIn>
			</section>
		</PageFade>
	);
}
