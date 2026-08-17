import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { HomeServices } from "@/components/sections/home/HomeServices";
import { HomeWorks } from "@/components/sections/home/HomeWorks";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { getPortfolioContent } from "@/lib/content/portfolio-content";
import type { HomeCopy } from "@/types/content";

export const metadata: Metadata = {
	title: "Home — Le Duc Anh",
	description:
		"Software engineer and designer in Da Nang building scalable products with precise editorial interfaces.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
	const content = await getPortfolioContent();
	const copy = content.copy.home as HomeCopy;
	return (
		<main>
			<Hero hero={copy.hero} socialLinks={content.site.socialLinks} />
			<section className="overflow-hidden border-y border-brand-black bg-brand-black py-5 text-brand-white">
				<MarqueeText
					text={content.site.tags.join(" • ")}
					size="sm"
					speed={15}
				/>
			</section>
			<HomeWorks projects={content.projects} label={copy.projects.label} description={copy.projects.description} viewAllLabel={copy.projects.viewAllLabel} />
			<HomeServices services={content.services.services} marquee={copy.services.marquee} viewAllLabel={copy.services.viewAllLabel} />
		</main>
	);
}
