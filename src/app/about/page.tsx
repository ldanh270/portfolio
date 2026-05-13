import type { Metadata } from "next";
import Link from "next/link";
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
			<AboutCertificates />
		</PageFade>
	);
}
