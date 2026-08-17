import type { Metadata } from "next";
import { WorkList } from "@/components/sections/work/WorkList";
import { SectionLabel } from "@/components/ui/SectionLabel";
import PageMarqueeText from "@/components/common/PageMarqueeText";
import { FadeIn } from "@/components/ui/FadeIn";
import { getPortfolioContent } from "@/lib/content/portfolio-content";
import type { WorkCopy } from "@/types/content";

export const metadata: Metadata = {
	title: "Work — Le Duc Anh",
	description: "Selected engineering and design projects by Le Duc Anh.",
};

export const dynamic = "force-dynamic";

export default async function WorkPage() {
	const content = await getPortfolioContent();
	const copy = content.copy.work as WorkCopy;
	return (
		<main className="pt-16">
			<FadeIn y={18}>
				<PageMarqueeText text={copy.marquee} />
			</FadeIn>
			<FadeIn
				delay={0.1}
				y={18}
			>
				<SectionLabel label={copy.section.label} description={copy.section.description} />
			</FadeIn>
			<WorkList projects={content.projects} />
		</main>
	);
}
