import type { Metadata } from "next";
import { AboutTimeline } from "@/components/sections/about/AboutTimeline";
import { AboutGrid } from "@/components/sections/about/AboutGrid";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { PageFade } from "@/components/ui/PageFade";
import { RevealLine } from "@/components/ui/RevealLine";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutAwards from "@/components/sections/about/AboutAwards";
import AboutSkills from "@/components/sections/about/AboutSkills";
import AboutCertificates from "@/components/sections/about/AboutCertificates";

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
					size="xl"
					direction="right"
				/>
			</div>

			<AboutHero />
			<AboutGrid />
			<AboutSkills />
			<RevealLine />
			<AboutTimeline />
			<AboutCertificates />
			<AboutAwards />
		</PageFade>
	);
}
