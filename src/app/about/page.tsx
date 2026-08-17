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
import { getPortfolioContent } from "@/lib/content/portfolio-content";
import type { AboutCopy } from "@/types/content";

export const metadata: Metadata = {
	title: "About — Le Duc Anh",
	description: "About Le Duc Anh, software engineer and designer in Da Nang, Vietnam.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
	const content = await getPortfolioContent();
	const copy = content.copy.about as AboutCopy;
	return (
		<PageFade className="pt-16">
			{/* Marquee */}
			<div className="border-y border-brand-border py-8">
				<MarqueeText
					text={copy.marquee}
					size="xl"
					direction="right"
				/>
			</div>

			<AboutHero copy={copy.hero} />
			<AboutGrid stats={content.about.stats} />
			<AboutSkills skills={content.about.skills} description={copy.skills.description} />
			<RevealLine />
			<AboutTimeline entries={content.about.careerEntries} years={content.about.timelineYears} yearWidth={content.about.yearWidth} />
			<AboutCertificates certificates={content.about.certificates} />
			<AboutAwards awards={content.about.awards} />
		</PageFade>
	);
}
